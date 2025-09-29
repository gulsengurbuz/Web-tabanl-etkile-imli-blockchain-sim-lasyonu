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

async function ensureUid() {
  if (auth.currentUser?.uid) return auth.currentUser.uid;
  return new Promise(async (resolve) => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u?.uid) {
        unsub();
        resolve(u.uid);
        return;
      }
      try {
        await signInAnonymously(auth);
      } catch (_) {}
    });
  });
}

function nowIso() {
  return new Date().toISOString();
}

export async function trackVideo({
  id,
  selector = "video",
  minPercent = 0.7,
  minSeconds = 30,
  title,
}) {
  const uid = await ensureUid();
  const video = document.querySelector(selector);
  if (!video) {
    console.warn("trackVideo: video elementi bulunamadı:", selector);
    return;
  }

  const ref = doc(db, "users", uid, "progressVideos", id);
  try {
    const prev = await getDoc(ref);
    if (prev.exists() && prev.data()?.completed) {
      console.log("trackVideo: zaten tamamlanmış:", id);
      return;
    }
  } catch (_) {}

  let maxWatch = 0;
  let marked = false;

  async function maybeComplete() {
    if (marked) return;
    const dur = Math.max(1, video.duration || 0);
    const percent = maxWatch / dur;
    if (percent >= minPercent && maxWatch >= minSeconds) {
      marked = true;
      await setDoc(
        ref,
        {
          id,
          title: title || document.title || id,
          completed: true,
          completedAt: serverTimestamp(),
          lastUpdateIso: nowIso(),
          durationSec: Math.round(dur),
          maxWatchedSec: Math.round(maxWatch),
          percent: Math.min(1, percent),
        },
        { merge: true }
      );
      console.log("trackVideo: tamamlandı →", id);
    }
  }

  function onTimeUpdate() {
    if (!video.duration || isNaN(video.duration)) return;
    maxWatch = Math.max(maxWatch, video.currentTime || 0);
  }

  function onEnded() {
    maxWatch = Math.max(maxWatch, video.duration || maxWatch);
    maybeComplete();
  }

  const interval = setInterval(maybeComplete, 1500);

  video.addEventListener("timeupdate", onTimeUpdate);
  video.addEventListener("ended", onEnded);
  window.addEventListener("beforeunload", maybeComplete);

  console.log("trackVideo ready:", { id, minPercent, minSeconds });

  return () => {
    clearInterval(interval);
    video.removeEventListener("timeupdate", onTimeUpdate);
    video.removeEventListener("ended", onEnded);
    window.removeEventListener("beforeunload", maybeComplete);
  };
}

window.trackVideo = trackVideo;
