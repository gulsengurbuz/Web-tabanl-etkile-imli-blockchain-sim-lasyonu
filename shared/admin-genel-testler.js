import { auth, db } from "../firebase-init.js";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_UID = "jpi4UtBz3kXSQnoSjjJtJO6I8Dw1";
const TOPIC_KEY = "genel-testler";

function ensureAdminPanel() {
  if (document.getElementById("genelTestlerAdmin")) return;

  const wrap = document.createElement("div");
  wrap.id = "genelTestlerAdmin";
  wrap.style.cssText = `
    position: fixed; right: 18px; bottom: 18px; z-index: 99999;
    display: flex; flex-direction: column; gap: 10px;
  `;

  const btn1 = document.createElement("button");
  btn1.textContent = "Genel-TESTLER • Oluştur/Merge";
  btn1.style.cssText = baseBtn();
  btn1.onclick = createGenelTestler;

  const btn2 = document.createElement("button");
  btn2.textContent = "Bu sayfadakileri EKLE (append)";
  btn2.style.cssText = baseBtn("#0ea5e9");
  btn2.onclick = appendFromThisPage;

  wrap.appendChild(btn1);
  wrap.appendChild(btn2);
  document.body.appendChild(wrap);
}

function baseBtn(bg = "#10b981") {
  return `
    background:${bg}; color:#fff; border:none; border-radius:10px;
    padding:10px 14px; font:600 14px/1 Inter,system-ui,Arial;
    box-shadow: 0 8px 20px rgba(0,0,0,.15); cursor:pointer;
  `;
}

async function createGenelTestler() {
  try {
    const ref = doc(db, "catalogTopics", TOPIC_KEY);
    await setDoc(
      ref,
      {
        title: "Genel Testler",
        key: TOPIC_KEY,
        order: 50,
        required: { videos: [], animations: [], quizzes: [] },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    alert("✅ catalogTopics/genel-testler oluşturuldu/merge edildi.");
  } catch (e) {
    console.error(e);
    alert("❌ Oluşturma/merge hata: " + (e?.message || e));
  }
}

function pickIdsForThisPage() {
  let animations = [];
  let videos = [];
  let quizzes = [];

  if (Array.isArray(window.animations) && window.animations.length) {
    animations = window.animations
      .map((a) => String(a?.id ?? "").trim())
      .filter(Boolean);
  }

  if (Array.isArray(window.mockVideos) && window.mockVideos.length) {
    videos = window.mockVideos
      .map((v) => String(v?.slug ?? v?.id ?? "").trim())
      .filter(Boolean);
  }

  if (Array.isArray(window.tests) && window.tests.length) {
    quizzes = window.tests
      .map((t) => String(t?.slug ?? t?.id ?? "").trim())
      .filter(Boolean);
  }

  return { animations, videos, quizzes };
}

async function appendFromThisPage() {
  const { animations, videos, quizzes } = pickIdsForThisPage();
  if (animations.length === 0 && videos.length === 0 && quizzes.length === 0) {
    alert(
      "Bu sayfada toplanacak veri bulunamadı. (animations / mockVideos / tests dizileri yok)"
    );
    return;
  }

  const payload = { updatedAt: serverTimestamp() };
  if (animations.length)
    payload["required.animations"] = arrayUnion(...animations);
  if (videos.length) payload["required.videos"] = arrayUnion(...videos);
  if (quizzes.length) payload["required.quizzes"] = arrayUnion(...quizzes);

  try {
    await updateDoc(doc(db, "catalogTopics", TOPIC_KEY), payload);
    alert(
      `✅ Eklendi:\n- animations: ${animations.length}\n- videos: ${videos.length}\n- quizzes: ${quizzes.length}\n(append-only) `
    );
  } catch (e) {
    console.error(e);
    alert("❌ Append hata: " + (e?.message || e));
  }
}

onAuthStateChanged(getAuth(), (u) => {
  if (u?.uid === ADMIN_UID) {
    ensureAdminPanel();
    console.log("Admin panel açıldı. UID:", u.uid);
  } else {
    const el = document.getElementById("genelTestlerAdmin");
    if (el) el.remove();
  }
});
