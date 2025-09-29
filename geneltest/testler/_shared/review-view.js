


export function showReview({
  mount = "#app",
  title = "Gözden Geçir",
  questions = [],
  userAnswers = [],
  scorePercent = 0,
  passPercent = 60,
}) {
  const root =
    typeof mount === "string" ? document.querySelector(mount) : mount;
  if (!root) throw new Error("showReview: mount bulunamadı");

  const passed = Math.round(scorePercent) >= passPercent;
  const total = questions.length;
  const correctCount = questions.reduce(
    (n, q, i) => n + ((userAnswers[i] ?? -1) === q.answer ? 1 : 0),
    0
  );

  root.innerHTML = `
    <section class="review-wrap">
      <header class="review-header">
        <h1 class="review-title">${title}</h1>
        <div class="review-meta">
          <span class="badge ${passed ? "ok" : "fail"}">${
    passed ? "Başarılı" : "Başarısız"
  }</span>
          <span class="score">Skor: ${Math.round(
            scorePercent
          )}% (${correctCount}/${total})</span>
          <label class="only-wrong">
            <input id="rvOnlyWrong" type="checkbox" />
            Sadece yanlışları göster
          </label>
        </div>
      </header>
      <div class="review-list" id="rvList"></div>
      <footer class="review-footer">
        <button id="rvRetry" class="btn-primary">Tekrarla</button>
      </footer>
    </section>
  `;

  const listEl = root.querySelector("#rvList");
  const onlyWrongEl = root.querySelector("#rvOnlyWrong");

  const render = () => {
    listEl.innerHTML = questions
      .map((q, i) => {
        const ua = userAnswers[i];
        const isCorrect = ua === q.answer;
        if (onlyWrongEl.checked && isCorrect) return "";
        const optHTML = q.options
          .map((opt, idx) => {
            const isUser = ua === idx;
            const isAns = q.answer === idx;
            return `
              <li class="opt ${isAns ? "correct" : ""} ${isUser ? "user" : ""}">
                <span class="opt-key">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt}</span>
                ${isAns ? `<span class="opt-badge">Doğru</span>` : ""}
                ${
                  isUser && !isAns
                    ? `<span class="opt-badge wrong">Seçimin</span>`
                    : ""
                }
              </li>`;
          })
          .join("");

        return `
          <article class="card ${isCorrect ? "ok" : "wrong"}">
            <div class="card-head">
              <span class="q-index">Soru ${i + 1}</span>
              <span class="q-status ${isCorrect ? "ok" : "wrong"}">${
          isCorrect ? "Doğru" : "Yanlış"
        }</span>
            </div>
            <h3 class="q-text">${q.text}</h3>
            <ul class="options">${optHTML}</ul>
            ${
              q.why ? `<p class="why"><strong>Neden?</strong> ${q.why}</p>` : ""
            }
          </article>
        `;
      })
      .join("");
  };

  render();
  onlyWrongEl.addEventListener("change", render);

  root.querySelector("#rvRetry")?.addEventListener("click", () => {
    
    location.reload();
  });
}

export function calcScorePercent(questions, userAnswers) {
  const total = questions.length || 1;
  const correct = questions.reduce(
    (n, q, i) => n + ((userAnswers[i] ?? -1) === q.answer ? 1 : 0),
    0
  );
  return (correct / total) * 100;
}
