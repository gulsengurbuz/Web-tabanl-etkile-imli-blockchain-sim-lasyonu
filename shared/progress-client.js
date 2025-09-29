import { auth, db } from "../firebase-init.js";
import {
  onAuthStateChanged,
  signInAnonymously,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const clampPct = (n) => Math.max(0, Math.min(100, Math.round(n || 0)));

async function ensureUid() {
  if (auth.currentUser?.uid) return auth.currentUser.uid;
  try {
    await signInAnonymously(auth);
  } catch {}
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.uid) {
        unsub();
        resolve(u.uid);
      }
    });
  });
}

export async function markAnimationProgress(
  id,
  title,
  percent = 0,
  { onlyCompleted = false, completeAt = 90 } = {}
) {
  const uid = await ensureUid();
  const p = clampPct(percent);
  if (onlyCompleted && p < completeAt) return;

  const ref = doc(db, "users", uid, "progressAnimations", String(id));
  await setDoc(
    ref,
    {
      title: title ?? null,
      progress: p,
      completed: p >= completeAt,
      lastViewed: serverTimestamp(),
      ...(p >= completeAt ? { completedAt: serverTimestamp() } : {}),
    },
    { merge: true }
  );
}

export async function saveQuizResult(id, score, total, title = "") {
  const uid = await ensureUid();
  const passed = total > 0 ? score / total >= 0.6 : false;
  const ref = doc(db, "users", uid, "testsProgress", String(id));
  await setDoc(
    ref,
    {
      title: title ?? "",
      score,
      total,
      passed,
      takenAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function markVideoProgress(
  vidId,
  title,
  percent = 0,
  watchedSec = null,
  durationSec = null,
  videoSlugOrOptions = null,
  maybeOptions = {}
) {
  const uid = await ensureUid();

  let videoSlug = null;
  let options = { completeAt: 90 };
  if (
    videoSlugOrOptions &&
    typeof videoSlugOrOptions === "object" &&
    !Array.isArray(videoSlugOrOptions)
  ) {
    options = { ...options, ...videoSlugOrOptions };
  } else {
    videoSlug = videoSlugOrOptions || null;
    options = { ...options, ...maybeOptions };
  }
  const { completeAt } = options;

  const v1Ref = doc(db, "users", uid, "videoProgress", String(vidId));
  const v2Ref = doc(db, "users", uid, "progressVideos", String(vidId));

  let prev = {};
  try {
    const snap1 = await getDoc(v1Ref);
    if (snap1.exists()) {
      prev = snap1.data() || {};
    } else {
      const snap2 = await getDoc(v2Ref);
      if (snap2.exists()) prev = snap2.data() || {};
    }
  } catch (_) {}

  const p = Math.max(prev.pct || prev.progress || 0, clampPct(percent));
  const cur = Math.max(
    prev.currentTime || prev.currentSec || prev.maxWatchedSec || 0,
    Number(watchedSec) || 0
  );
  const dur = Math.max(
    prev.duration || prev.durationSec || 0,
    Number(durationSec) || 0
  );
  const completed =
    Boolean(prev.completed) ||
    p >= (completeAt ?? 90) ||
    (dur > 0 && cur >= dur - 2);

  const dataV1 = {
    title: title ?? prev.title ?? "",
    pct: p,
    currentTime: Number(watchedSec) || prev.currentTime || prev.currentSec || 0,
    duration: dur,
    updatedAt: serverTimestamp(),
    slug: videoSlug ?? prev.slug ?? null,
  };

  const dataV2 = {
    title: title ?? prev.title ?? "",
    progress: p,
    currentSec: Number(watchedSec) || prev.currentSec || prev.currentTime || 0,
    maxWatchedSec: cur,
    durationSec: dur,
    completed,
    lastViewed: serverTimestamp(),
    ...(completed && !prev.completedAt
      ? { completedAt: serverTimestamp() }
      : {}),
    slug: videoSlug ?? prev.slug ?? null,
  };

  await Promise.all([
    setDoc(v1Ref, dataV1, { merge: true }),
    setDoc(v2Ref, dataV2, { merge: true }),
  ]);
}

export async function saveVideoQuizResult(vidId, score, total, title = "") {
  const uid = await ensureUid();
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  await setDoc(
    doc(db, "users", uid, "videoTests", String(vidId)),
    {
      title,
      score,
      total,
      percent,
      passed: percent >= 60,
      takenAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function saveGeneralTestResult(testId, score, total, title = "") {
  const uid = await ensureUid();
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  await setDoc(
    doc(db, "users", uid, "generalTests", String(testId)),
    {
      title,
      score,
      total,
      percent,
      passed: percent >= 60,
      takenAt: serverTimestamp(),
    },
    { merge: true }
  );
}
