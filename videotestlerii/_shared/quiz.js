

import { QUESTIONS, QUIZ_INDEX } from "./questions.js";
import { saveVideoQuizResult } from "../../shared/progress-client.js"; 

function $(sel, root=document) { return root.querySelector(sel); }
function el(tag, cls){ const e=document.createElement(tag); if(cls) e.className=cls; return e; }

export function initQuiz({ slug, videoId }) {
  const all = QUESTIONS[slug] || [];
  const total = all.length;

  const titleEl = $("#quizTitle");
  const badgeEl = $("#quizBadge");
  const countEl = $("#quizCount");
  const progressBar = $("#progressBar");
  const qWrap = $("#qWrap");
  const submitBtn = $("#btnSubmit");
  const prevBtn = $("#btnPrev");
  const nextBtn = $("#btnNext");
  const reviewEl = $("#review");
  const resultEl = $("#result");

  const meta = QUIZ_INDEX.find(x => x.slug === slug) || { title: "Mini Quiz" };
  titleEl.textContent = meta.title;
  badgeEl.textContent = "Mini Quiz";
  countEl.textContent = `${total} soru`;

  let current = 0;
  let selected = new Array(total).fill(null);
  let locked = new Array(total).fill(false);

  function renderQuestion(i){
    qWrap.innerHTML = "";
    const q = all[i];
    const qEl = el("div","question");
    qEl.textContent = `${i+1}) ${q.q}`;
    qWrap.appendChild(qEl);

    const choicesEl = el("div","choices");
    q.choices.forEach((c, idx) => {
      const row = el("label","choice");
      const inp = el("input");
      inp.type = "radio";
      inp.name = "q" + i;
      inp.value = String(idx);
      if (selected[i] === idx) inp.checked = true;
      row.appendChild(inp);
      const text = document.createTextNode(" " + c.text);
      row.appendChild(text);

      row.addEventListener("click", () => {
        if (locked[i]) return;
        selected[i] = idx;
        updateProgress();
      });

      choicesEl.appendChild(row);
    });
    qWrap.appendChild(choicesEl);
    updateNav();
  }

  function updateNav(){
    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === total-1);
  }

  function updateProgress(){
    const answered = selected.filter(v => v !== null).length;
    progressBar.style.width = `${Math.round((answered/total)*100)}%`;
  }

  function scoreQuiz(){
    let score = 0;
    reviewEl.innerHTML = "";
    all.forEach((q, i) => {
      const div = el("div","review-item");
      const my = selected[i];
      const okIndex = q.choices.findIndex(c => c.correct);
      const ok = (my === okIndex);
      if (ok) score++;

      const title = el("div");
      title.innerHTML = `<strong>${i+1})</strong> ${q.q}`;
      const line = el("div");
      const s = ok ? `<span class="good">Doğru</span>` : `<span class="bad">Yanlış</span>`;
      const myText = (my!=null) ? q.choices[my].text : "Cevap yok";
      line.innerHTML = `${s} — Senin cevabın: <em>${myText}</em> · Doğru cevap: <strong>${q.choices[okIndex].text}</strong>`;
      div.appendChild(title);
      div.appendChild(line);
      reviewEl.appendChild(div);
    });
    return score;
  }

  
  prevBtn.addEventListener("click", () => { if (current>0){ current--; renderQuestion(current); }});
  nextBtn.addEventListener("click", () => { if (current<total-1){ current++; renderQuestion(current); }});

  
  submitBtn.addEventListener("click", async () => {
    
    all.forEach((q,i)=>{
      locked[i]=true;
      const okIndex = q.choices.findIndex(c=>c.correct);
      const nodes = qWrap.querySelectorAll(`[name="q${i}"]`);
      nodes.forEach((inp,idx)=>{
        const row = inp.closest(".choice");
        row.classList.remove("correct","wrong");
        if (idx===okIndex) row.classList.add("correct");
        if (selected[i]===idx && idx!==okIndex) row.classList.add("wrong");
      });
    });

    const score = scoreQuiz();
    const totalQ = total;
    resultEl.textContent = `Skor: ${score}/${totalQ} — Kaydediliyor...`;

    try {
      const title = meta.title || `Video ${videoId} Mini Quiz`;
      await saveVideoQuizResult(String(videoId), score, totalQ, title);
      resultEl.textContent = `Kaydedildi ✅ Skor: ${score}/${totalQ}`;
    } catch (err) {
      resultEl.textContent = `Kaydetme hatası: ${err?.message || err}`;
      alert(err?.message || err);
    }
  });

  
  renderQuestion(current);
  updateProgress();
}
