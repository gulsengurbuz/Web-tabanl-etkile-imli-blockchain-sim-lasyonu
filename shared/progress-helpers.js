import { auth, db } from "../firebase-init.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));
export const fmtDate = (d) =>
  (d?.toDate?.() || d || new Date()).toLocaleString("tr-TR");

export async function readAllProgress(uid) {
  const [animSnap, vidSnap, aTestsSnap, vTestsSnap, gTestsSnap] =
    await Promise.all([
      getDocs(collection(db, "users", uid, "progressAnimations")),
      getDocs(collection(db, "users", uid, "progressVideos")),
      getDocs(collection(db, "users", uid, "testsProgress")),
      getDocs(collection(db, "users", uid, "videoTests")),
      getDocs(collection(db, "users", uid, "generalTests")),
    ]);

  const anim = new Map(animSnap.docs.map((d) => [d.id, d.data()]));
  const vids = new Map(vidSnap.docs.map((d) => [d.id, d.data()]));
  const vidsArr = vidSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const tests = new Map();
  const fold = (snap) =>
    snap.docs.forEach((d) => {
      const x = d.data();
      const percent =
        typeof x.percent === "number"
          ? x.percent
          : typeof x.score === "number" &&
            typeof x.total === "number" &&
            x.total > 0
          ? Math.round((x.score / x.total) * 100)
          : 0;
      tests.set(d.id, { ...x, percent, passed: percent >= 60 });
    });
  fold(aTestsSnap);
  fold(vTestsSnap);
  fold(gTestsSnap);

  let totalVideoSec = 0;
  vidSnap.forEach((d) => {
    const x = d.data();
    if (Number.isFinite(x?.durationSec)) totalVideoSec += x.durationSec;
  });

  const animList = [...anim.values()];
  const vidList = [...vids.values()];
  const completedAnims = animList.filter((x) => x?.completed).length;
  const inprogressAnims = animList.filter(
    (x) => !x?.completed && (x?.progress || 0) > 0
  ).length;
  const completedVids = vidList.filter((x) => x?.completed).length;
  const inprogressVids = vidList.filter(
    (x) => !x?.completed && (x?.progress || 0) > 0
  ).length;

  return {
    anim,
    vids,
    vidsArr,
    tests,
    counts: {
      completedAnims,
      inprogressAnims,
      completedVids,
      inprogressVids,
      totalVideoMin: Math.round(totalVideoSec / 60),
    },
  };
}

export function computeAvgTestPercent(allTestsMap) {
  const list = [...allTestsMap.values()];
  const percents = list
    .map((x) => x.percent)
    .filter((n) => typeof n === "number");
  if (!percents.length) return 0;
  return Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
}
export function computeWeeklyScore(progress) {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

  let vCnt = 0,
    aCnt = 0,
    qCnt = 0;
  for (const x of progress.vids.values()) {
    const t = x.lastViewed?.toMillis?.() || 0;
    if (t >= weekAgo) vCnt++;
  }
  for (const x of progress.anim.values()) {
    const t = x.lastViewed?.toMillis?.() || 0;
    if (t >= weekAgo) aCnt++;
  }
  for (const x of progress.tests.values()) {
    const t = x.takenAt?.toMillis?.() || 0;
    if (t >= weekAgo) qCnt++;
  }

  return clamp(Math.round(Math.min(100, (vCnt + aCnt + qCnt) * 20)));
}

export function averageVideoProgress(progress) {
  const arr = [...progress.vids.values()];
  if (!arr.length) return 0;
  const toPct = (v) => {
    if (typeof v?.progress === "number") return clamp(Math.round(v.progress));
    const d = Number(v?.durationSec || 0),
      w = Number(v?.watchedSec || 0);
    return d ? clamp(Math.round((w / d) * 100)) : 0;
  };
  const list = arr.map(toPct);
  return Math.round(list.reduce((a, b) => a + b, 0) / list.length);
}

export function averageAnimProgress(progress) {
  const arr = [...progress.anim.values()];
  if (!arr.length) return 0;
  const toPct = (a) =>
    typeof a?.progress === "number"
      ? clamp(Math.round(a.progress))
      : a?.completed
      ? 100
      : 0;
  const list = arr.map(toPct);
  return Math.round(list.reduce((a, b) => a + b, 0) / list.length);
}
