import * as functions from "firebase-functions/v1";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

const DEFAULT_TOPIC_KEY = "genel-testler";
const DEFAULT_TOPIC_TITLE = "Genel Testler";
const TEST_PASS_PCT = 60;
const STRICT_CATALOG_CHECK = false;

const CAT_COL = {
  quizzes: "catalogQuizzes",
  videos: "catalogVideos",
  animations: "catalogAnimations",
};

function percentFrom(x) {
  if (typeof x?.percent === "number") return x.percent;
  if (typeof x?.score === "number" && typeof x?.total === "number" && x.total > 0) {
    return Math.round((x.score / x.total) * 100);
  }
  return 0;
}

async function ensureDefaultTopic() {
  await db.doc(`catalogTopics/${DEFAULT_TOPIC_KEY}`).set({
    title: DEFAULT_TOPIC_TITLE,
    key: DEFAULT_TOPIC_KEY,
    order: 50,
    required: { videos: [], animations: [], quizzes: [] },
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
}

async function existsInAnyTopic(id, bucket) {
  const fp = `required.${bucket}`;
  const snap = await db.collection("catalogTopics").where(fp, "array-contains", id).get();
  return !snap.empty;
}

async function addToDefaultIfMissing(id, bucket) {
  if (await existsInAnyTopic(id, bucket)) return;
  await ensureDefaultTopic();
  await db.doc(`catalogTopics/${DEFAULT_TOPIC_KEY}`).set({
    [`required.${bucket}`]: FieldValue.arrayUnion(id),
    updatedAt: FieldValue.serverTimestamp()
  }, { merge: true });
}

async function isInCatalogCollection(id, bucket) {
  const col = CAT_COL[bucket];
  if (!col) return true;
  const doc = await db.doc(`${col}/${id}`).get();
  return doc.exists;
}

export const onTestWrite = functions.firestore
  .document("users/{uid}/{subCol=(generalTests|testsProgress|videoTests)}/{docId}")
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return null;

    const pct = percentFrom(after);
    const failed = (after?.passed === false) || (pct < TEST_PASS_PCT);
    if (!failed) return null;

    if (STRICT_CATALOG_CHECK) {
      const ok = await isInCatalogCollection(context.params.docId, "quizzes");
      if (!ok) return null;
    }
    await addToDefaultIfMissing(context.params.docId, "quizzes");
    return null;
  });

export const onProgressWrite = functions.firestore
  .document("users/{uid}/{subCol=(progressVideos|progressAnimations)}/{docId}")
  .onWrite(async (change, context) => {
    const after = change.after.exists ? change.after.data() : null;
    if (!after) return null;

    const prog = typeof after?.progress === "number" ? after.progress : 0;
    const done = (after?.completed === true) || prog >= 100;
    if (done) return null;

    const bucket = context.params.subCol === "progressVideos" ? "videos" : "animations";

    if (STRICT_CATALOG_CHECK) {
      const ok = await isInCatalogCollection(context.params.docId, bucket);
      if (!ok) return null;
    }
    await addToDefaultIfMissing(context.params.docId, bucket);
    return null;
  });
