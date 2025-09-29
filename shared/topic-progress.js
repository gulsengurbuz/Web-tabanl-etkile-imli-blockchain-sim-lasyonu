import { auth, db } from "../firebase-init.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const MIN_VIDEO_PCT = 90;
const MIN_ANIM_PCT = 90;
const MIN_QUIZ_PCT = 60;

async function get(uid, pathArr) {
  const ref = doc(db, ...pathArr);
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function hasVideo(uid, vidId) {
  const d = await get(uid, ["users", uid, "progressVideos", String(vidId)]);
  return d && (d.progress ?? 0) >= MIN_VIDEO_PCT;
}
async function hasAnim(uid, animId) {
  const d = await get(uid, [
    "users",
    uid,
    "progressAnimations",
    String(animId),
  ]);
  return d && (d.progress ?? 0) >= MIN_ANIM_PCT;
}
async function hasQuiz(uid, quizId) {
  const locs = [
    ["users", uid, "testsProgress", String(quizId)],
    ["users", uid, "videoTests", String(quizId)],
    ["users", uid, "generalTests", String(quizId)],
  ];
  for (const p of locs) {
    const d = await get(uid, p);
    if (
      d &&
      (d.percent ?? (d.total ? Math.round((d.score / d.total) * 100) : 0)) >=
        MIN_QUIZ_PCT
    ) {
      return true;
    }
  }
  return false;
}

export async function checkTopicAndAward(topicId) {
  const u = auth.currentUser;
  if (!u?.uid) throw new Error("Oturum yok");
  const uid = u.uid;

  const topicSnap = await getDoc(doc(db, "catalogTopics", topicId));
  if (!topicSnap.exists()) {
    console.warn("Topic yok:", topicId);
    return false;
  }
  const topic = topicSnap.data();
  const req = topic.required ?? {};
  const videos = Array.isArray(req.videos) ? req.videos : [];
  const anims = Array.isArray(req.animations) ? req.animations : [];
  const quizzes = Array.isArray(req.quizzes) ? req.quizzes : [];

  const [vOk, aOk, qOk] = await Promise.all([
    Promise.all(videos.map((id) => hasVideo(uid, id))).then((arr) =>
      arr.every(Boolean)
    ),
    Promise.all(anims.map((id) => hasAnim(uid, id))).then((arr) =>
      arr.every(Boolean)
    ),
    Promise.all(quizzes.map((id) => hasQuiz(uid, id))).then((arr) =>
      arr.every(Boolean)
    ),
  ]);

  const allOk = vOk && aOk && qOk;

  await setDoc(
    doc(db, "users", uid, "catalogTopics", topicId),
    {
      title: topic.title ?? topicId,
      completed: allOk,
      completedAt: allOk ? new Date() : null,
      lastCheckedAt: new Date(),
    },
    { merge: true }
  );

  if (allOk && topic.badgeId) {
    await setDoc(
      doc(db, "users", uid, "badges", String(topic.badgeId)),
      { topicId, awardedAt: new Date() },
      { merge: true }
    );
  }

  return allOk;
}

window.checkTopicAndAward = checkTopicAndAward;
