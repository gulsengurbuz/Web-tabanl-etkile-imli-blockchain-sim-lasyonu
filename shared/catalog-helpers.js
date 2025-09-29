import { db } from "../firebase-init.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function readCatalogTopics() {
  const qy = query(collection(db, "catalogTopics"), orderBy("order", "asc"));
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getLatestVideos(n = 3) {
  const qy = query(
    collection(db, "videos"),
    orderBy("createdAt", "desc"),
    limit(n)
  );
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getLatestAnimations(n = 3) {
  const qy = query(
    collection(db, "animations"),
    orderBy("createdAt", "desc"),
    limit(n)
  );
  const snap = await getDocs(qy);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getVideoById(id) {
  const s = await getDoc(doc(db, "videos", id));
  return s.exists() ? { id, ...s.data() } : null;
}
export async function getAnimationById(id) {
  const s = await getDoc(doc(db, "animations", id));
  return s.exists() ? { id, ...s.data() } : null;
}
export async function getQuizById(id) {
  const s = await getDoc(doc(db, "quizzes", id));
  return s.exists() ? { id, ...s.data() } : null;
}

export async function readUserGeneralTests(uid) {
  const qy = query(collection(db, "users", uid, "generalTests"));
  const snap = await getDocs(qy);
  return snap.docs.map((d) => {
    const x = d.data() || {};
    const percent = Number.isFinite(x.percent)
      ? x.percent
      : Number.isFinite(x.score) && Number.isFinite(x.total) && x.total > 0
      ? Math.round((x.score / x.total) * 100)
      : 0;
    return { id: d.id, ...x, percent };
  });
}

export async function upsertCatalogTopic(topicId, payload) {
  const ref = doc(db, "catalogTopics", topicId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, payload);
  } else {
    await setDoc(ref, payload);
  }
}

export async function syncGeneralTestToCatalogTopic({
  uid,
  topicId,
  testId,
  generalTestFolder,
  passThreshold = 60,
}) {
  const tests = await readUserGeneralTests(uid);

  const targetId = testId || topicId;

  const rec = tests.find((t) => String(t.id) === String(targetId));
  const passed = rec ? rec.percent >= passThreshold : false;

  const ref = doc(db, "catalogTopics", topicId);
  const snap = await getDoc(ref);
  const cur = snap.exists() ? snap.data() || {} : {};
  const required = cur.required || {};

  const curArr = Array.isArray(required.generalTests)
    ? required.generalTests
    : [];
  const nextGeneralTests = curArr.includes(targetId)
    ? curArr
    : [...curArr, targetId];

  const prevTF = required.testFolders || {};
  const nextTF = generalTestFolder
    ? { ...prevTF, generalTest: generalTestFolder }
    : prevTF;

  await upsertCatalogTopic(topicId, {
    required: {
      ...required,
      generalTests: nextGeneralTests,
      testFolders: nextTF,
    },
  });

  return {
    topicId,
    testId: targetId,
    userPassed: passed,
    percent: rec?.percent ?? null,
    wrote: {
      generalTests: nextGeneralTests,
      testFolder: nextTF.generalTest || null,
    },
  };
}
