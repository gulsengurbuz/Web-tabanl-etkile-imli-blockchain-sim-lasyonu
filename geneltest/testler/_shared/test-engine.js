
import { auth, db } from "../../../firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function requireLogin() {
  return new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        const ret = encodeURIComponent(location.href);
        location.replace(`/kayit/index.html?returnUrl=${ret}`);
        return;
      }
      unsub();
      resolve(user);
    });
  });
}


export function startTest({
  mount = "#app",
  testId,
  title,
  questions,
  passPercent = 60,
}) {
  const root =
    typeof mount === "string" ? document.querySelector(mount) : mount;
  if (!root) throw new Error("Mount elementi bulunamadı");
  let i = 0,
    submitted = false;
  const answers = new Array(questions.length).fill(null);

  root.innerHTML = `
    <div class="test-card">
      <div class="test-head">
        <span class="badge mono">${testId}</span>
       
      </div>
      <div class="progress"><i style="width:0%"></i></div>
      <div class="qbox">
        <div class="qtext"></div>
        <div class="opts"></div>
        <div class="explain" style="display:none"></div>
        <div class="actions">
          <button class="btn ghost prev">← Geri</button>
          <button class="btn ghost next">İleri →</button>
          <button class="btn primary submit">Bitir & Değerlendir</button>
        </div>
      </div>
      <div class="result" style="display:none"></div>
    </div>
  `;

  const qtext = root.querySelector(".qtext");
  const opts = root.querySelector(".opts");
  const ex = root.querySelector(".explain");
  const prog = root.querySelector(".progress>i");
  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");
  const submit = root.querySelector(".submit");
  const result = root.querySelector(".result");

  function setProgress() {
    const answered = answers.filter((a) => a !== null).length;
    const pct = Math.round((answered / questions.length) * 100);
    prog.style.width = `${pct}%`;
  }

  function render() {
    const q = questions[i];
    qtext.textContent = `${i + 1}. ${q.text}`;
    opts.innerHTML = "";
    q.options.forEach((label, idx) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt";
      b.textContent = label;
      if (answers[i] === idx) b.classList.add("selected");
      b.onclick = () => {
        if (submitted) return;
        answers[i] = idx;
        [...opts.children].forEach((c) => c.classList.remove("selected"));
        b.classList.add("selected");
        setProgress();
      };
      opts.appendChild(b);
    });

    if (submitted) {
      [...opts.children].forEach((btn, idx) => {
        if (idx === q.answer) btn.classList.add("correct");
        if (answers[i] === idx && idx !== q.answer) btn.classList.add("wrong");
      });
      if (q.why) {
        ex.style.display = "block";
        ex.textContent = `Açıklama: ${q.why}`;
      } else {
        ex.style.display = "none";
      }
    } else {
      ex.style.display = "none";
    }

    prev.disabled = i == 0;
    next.disabled = i == questions.length - 1;
  }

  function evaluateAndSave() {
    submitted = true;
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.answer) score++;
    });
    const percent = Math.round((score / questions.length) * 100);
    const passed = percent >= passPercent;

    result.style.display = "block";
    result.innerHTML = `
      <div class="big">${percent} / 100</div>
      <div>Doğru: <b>${score}</b> / ${questions.length} • Geçme eşiği: %${passPercent}</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn ghost review">Soruları Gözden Geçir</button>
        <button class="btn primary retry">Baştan Çöz</button>
      </div>
    `;

    const u = auth.currentUser;
    if (u) {
      const ref = doc(db, "users", u.uid, "generalTests", testId);
      setDoc(
        ref,
        {
          title,
          total: questions.length,
          score,
          percent,
          passed,
          takenAt: serverTimestamp(),
          answers,
        },
        { merge: true }
      ).catch((e) => console.error("[test] save error", e));
    }

    render();
  }

  prev.onclick = () => {
    if (i > 0) {
      i--;
      render();
    }
  };
  next.onclick = () => {
    if (i < questions.length - 1) {
      i++;
      render();
    }
  };
  submit.onclick = () => evaluateAndSave();
  result.addEventListener("click", (e) => {
    if (e.target.closest(".retry")) {
      i = 0;
      submitted = false;
      answers.fill(null);
      result.style.display = "none";
      prog.style.width = "0%";
      render();
    }
    if (e.target.closest(".review")) {
      submitted = true;
      render();
    }
  });

  setProgress();
  render();
}
