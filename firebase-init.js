// firebase-init.js  — CDN (ES modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAnalytics,
  isSupported,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// ---- KENDİ CONFIG'İN ----
const firebaseConfig = {
  apiKey: "AIzaSyC4S3YHSbxZFVFr7mjOmOVDfNY7zDqa0LA",
  authDomain: "blockchainedu-ff013.firebaseapp.com",
  projectId: "blockchainedu-ff013",
  storageBucket: "blockchainedu-ff013.firebasestorage.app",
  messagingSenderId: "562653179082",
  appId: "1:562653179082:web:5acd97b50c500fef01d833",
  measurementId: "G-CL7MQ4J7MT",
};
// --------------------------

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Persistence: hataya dayanıklı (local → session → memory)
(async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
  } catch (e1) {
    console.warn(
      "local persistence olmadı, session'a düşülüyor:",
      e1?.code || e1
    );
    try {
      await setPersistence(auth, browserSessionPersistence);
    } catch (e2) {
      console.warn(
        "session persistence olmadı, memory'e düşüldü:",
        e2?.code || e2
      );
      await setPersistence(auth, inMemoryPersistence);
    }
  }
})().catch(() => {});

// Analytics sadece https/localhost’ta
isSupported()
  .then(() => {
    try {
      getAnalytics(app);
    } catch (_) {}
  })
  .catch(() => {});

// İsteğe bağlı: UID’i body data’sına yaz
onAuthStateChanged(auth, (user) => {
  document.body.dataset.uid = user?.uid || "";
});

// global erişim istersen:
window.firebase = { app, auth, db };
