import { auth, db } from "../firebase-init.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  getDocs,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ID_TO_SLUG = {
  1: "veri",
  2: "veri-kaydi",
  3: "veritabani",
  4: "merkezi",
  5: "merkeziyetsiz",
  6: "p2p",
  7: "dagitik-ag",
  8: "anahtar-yonetimi",
  9: "hash-fonksiyonlari",
  10: "dijital-imza",
  11: "zaman-damgasi",
  12: "blok-yapisi",
  13: "merkle-agaclari",
  14: "blockchain",
  15: "islemler-ve-blok-dogrulama",
  16: "pow",
  17: "pos",
  18: "public-blockchain",
  19: "private-blockchain",
  20: "konsorsiyum-blockchain",
  21: "hibrit-modeller",
  22: "fork",
  23: "akilli-sozlesmeler",
  24: "token-coin",
  25: "kullanim-alanlari",
};

const TOPIC_SLUG = "genel-testler";
onAuthStateChanged(auth, (u) => {
  if (!u) return;

  recomputeAndWrite(u.uid, TOPIC_SLUG).catch(console.error);

  onSnapshot(collection(db, "users", u.uid, "videoProgress"), () => {
    recomputeAndWrite(u.uid, TOPIC_SLUG).catch(console.error);
  });
  onSnapshot(collection(db, "users", u.uid, "quizResults"), () => {
    recomputeAndWrite(u.uid, TOPIC_SLUG).catch(console.error);
  });

  onSnapshot(collection(db, "users", u.uid, "animationProgress"), () => {
    recomputeAndWrite(u.uid, TOPIC_SLUG).catch(console.error);
  });
});

async function recomputeAndWrite(uid, topicSlug) {
  const topicSnap = await getDoc(doc(db, "catalogTopics", topicSlug));
  if (!topicSnap.exists()) return;
  const topic = topicSnap.data() || {};
  const req = topic.required || {};
  const reqAnimations = toStrArray(req.animations);
  const reqVideos = toStrArray(req.videos);
  const reqQuizzes = toStrArray(req.quizzes);

  const completedVideos = await getCompletedVideos(uid);
  const completedQuizzes = await getPassedQuizzes(uid);
  const completedAnims = await getCompletedAnimations(uid);

  const remaining = {
    animations: diff(reqAnimations, completedAnims),
    videos: diff(reqVideos, completedVideos),
    quizzes: diff(reqQuizzes, completedQuizzes),
  };

  const doneCount =
    reqAnimations.length -
    remaining.animations.length +
    (reqVideos.length - remaining.videos.length) +
    (reqQuizzes.length - remaining.quizzes.length);
  const reqCount = reqAnimations.length + reqVideos.length + reqQuizzes.length;
  const percent = reqCount ? Math.round((doneCount / reqCount) * 100) : 0;

  await setDoc(
    doc(db, "users", uid, "topics", topicSlug),
    {
      completed: {
        animations: intersect(reqAnimations, completedAnims),
        videos: intersect(reqVideos, completedVideos),
        quizzes: intersect(reqQuizzes, completedQuizzes),
      },
      remaining,
      totals: { done: doneCount, required: reqCount, percent },
      updatedAt: serverTimestamp(),
      topicTitle: topic.title || topicSlug,
    },
    { merge: true }
  );
}

function toStrArray(x) {
  return Array.isArray(x) ? x.map((v) => String(v)) : [];
}
function diff(a, b) {
  const B = new Set((b || []).map(String));
  return (a || []).map(String).filter((x) => !B.has(x));
}
function intersect(a, b) {
  const B = new Set((b || []).map(String));
  return (a || []).map(String).filter((x) => B.has(x));
}

async function getCompletedVideos(uid) {
  const snap = await getDocs(collection(db, "users", uid, "videoProgress"));
  const done = [];
  snap.forEach((d) => {
    const v = d.data() || {};
    const pct = Number(v.pct || 0);
    const slug = v.slug || ID_TO_SLUG[d.id] || d.id;
    if (pct >= 90 && slug) done.push(String(slug));
  });
  return done;
}
async function getPassedQuizzes(uid) {
  const snap = await getDocs(collection(db, "users", uid, "quizResults"));
  const done = [];
  snap.forEach((d) => {
    const v = d.data() || {};
    const passed = !!v.passed || (v.total ? v.score / v.total >= 0.7 : false);
    if (passed) done.push(String(d.id));
  });
  return done;
}
async function getCompletedAnimations(uid) {
  try {
    const snap = await getDocs(
      collection(db, "users", uid, "animationProgress")
    );
    const done = [];
    snap.forEach((d) => {
      const v = d.data() || {};
      const pct = Number(v.pct || 0);
      if (pct >= 90) done.push(String(d.id));
    });
    return done;
  } catch {
    return [];
  }
}
