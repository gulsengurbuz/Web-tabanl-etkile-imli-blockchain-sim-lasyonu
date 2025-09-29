import { auth, db } from "../firebase-init.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function trackAnimation(opts) {
  const { id, minPercent = 80, minSeconds = 30 } = opts || {};
  if (!id) return console.warn("[trackAnimation] id yok!");

  let durationSec = opts?.durationSec ?? null;
  if (!durationSec) {
    try {
      const snap = await getDoc(doc(db, "catalogAnimations", id));
      if (snap.exists()) durationSec = snap.data().durationSec || null;
    } catch (e) {
      console.warn("durationSec okunamadı:", e);
    }
  }

  const start = Date.now();
  const needSec = durationSec
    ? Math.max(minSeconds, Math.floor((durationSec * minPercent) / 100))
    : minSeconds;

  async function saveIfCompleted() {
    const user = auth.currentUser;
    if (!user) return;
    const seenSec = Math.floor((Date.now() - start) / 1000);
    if (seenSec < needSec) return;

    const pct = durationSec
      ? Math.min(100, Math.round((seenSec / durationSec) * 100))
      : 100;

    await setDoc(
      doc(db, "users", user.uid, "progressAnimations", id),
      {
        id,
        completed: true,
        pct,
        watchMs: seenSec * 1000,
        lastWatchedAt: serverTimestamp(),
      },
      { merge: true }
    );

    window.removeEventListener("beforeunload", saveIfCompleted);
    document.removeEventListener("visibilitychange", onHidden);
  }

  function onHidden() {
    if (document.visibilityState === "hidden") saveIfCompleted();
  }

  window.addEventListener("beforeunload", saveIfCompleted);
  document.addEventListener("visibilitychange", onHidden);

  window.markAnimationCompleted = saveIfCompleted;
}

window.trackAnimation = (o) => trackAnimation(o);
