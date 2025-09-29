import { auth, db } from "../firebase-init.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const HOME_URL = new URL("../home/index.html", location).href;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const byId = (id) => document.getElementById(id);

document.addEventListener("DOMContentLoaded", () => {
  $$(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      $$(".tab-btn").forEach((b) => b.classList.remove("active"));
      $$(".tab-content").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      byId(tab).classList.add("active");
    });
  });

  $$(".password-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-target");
      const input = byId(targetId);
      const icon = toggle.querySelector("i");
      if (!input) return;
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });

  byId("signupForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = byId("signup-email").value.trim();
    const username = byId("signup-username").value.trim();
    const pass = byId("signup-password").value;
    const pass2 = byId("signup-confirm-password").value;

    if (!email || !username || !pass || !pass2)
      return alert("Tüm alanları doldurun.");
    if (pass !== pass2) return alert("Şifreler eşleşmiyor.");
    if (pass.length < 6) return alert("Şifre en az 6 karakter.");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(cred.user, { displayName: username });

      await setDoc(
        doc(db, "users", cred.user.uid),
        { email, username, createdAt: serverTimestamp() },
        { merge: true }
      );

      alert("Kayıt başarılı! Artık giriş yapabilirsiniz.");
      e.target.reset();
    } catch (err) {
      alert(err.code || err.message);
    }
  });

  byId("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = byId("login-username").value.trim();
    const pass = byId("login-password").value;

    if (!email || !pass) return alert("E-posta ve şifre gerekli.");

    try {
      await signInWithEmailAndPassword(auth, email, pass);

      window.location.replace(HOME_URL);
    } catch (err) {
      alert(err.code || err.message);
    }
  });

  $(".forgot-password .link")?.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = byId("login-username").value.trim();
    if (!email) return alert("Sıfırlama için e-posta yazın.");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Sıfırlama e-postası gönderildi.");
    } catch (err) {
      alert(err.code || err.message);
    }
  });
});
