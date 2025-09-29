// quiz.js — Dijital İmza / Multisig (Blok mimarisi)
// HTML id'leri: quiz-question, quiz-choices, quiz-prev, quiz-next, quiz-submit,
// quiz-progress, quiz-total, quiz-progress-bar, quiz-result, quiz-score-text,
// quiz-review, quiz-retry

const $id = (id) => document.getElementById(id);

// DOM referansları
let quizQuestion,
  quizChoices,
  quizPrevBtn,
  quizNextBtn,
  quizSubmitBtn,
  quizProgressText,
  quizTotalText,
  quizProgressBar,
  quizResultWrap,
  quizScoreText,
  quizReviewWrap,
  quizRetryBtn;

// Soru seti (içerik korunmuştur)
const quizData = [
  {
    q: "Dijital imzanın temel amacı nedir?",
    choices: [
      "Veriyi sıkıştırmak",
      "Gönderenin kimliğini kanıtlamak ve bütünlüğü sağlamak",
      "Ağ ücretini düşürmek",
      "Veriyi şifrelemek (tek başına)",
    ],
    answer: 1,
    explain:
      "Dijital imza, kimlik doğrulama (kim attı?) ve bütünlük (değişti mi?) garantisi sağlar.",
  },
  {
    q: "Dijital imza hangi anahtarla OLUŞTURULUR ve hangisiyle DOĞRULANIR?",
    choices: [
      "Açık anahtarla oluşturulur, özel ile doğrulanır",
      "Özel anahtarla oluşturulur, açık ile doğrulanır",
      "Her ikisi de açık anahtarla",
      "Her ikisi de özel anahtarla",
    ],
    answer: 1,
    explain: "İmza özel anahtarla oluşturulur; herkes açık anahtarla doğrular.",
  },
  {
    q: "Multisig senaryosunda neden birden fazla imza istenir?",
    choices: [
      "Blok süresi kısalsın diye",
      "İşlemi tek kişinin kontrolünden çıkarıp güvenliği artırmak için",
      "Ücretleri sıfırlamak için",
      "Hash hızını yükseltmek için",
    ],
    answer: 1,
    explain:
      "Yetkiyi dağıtır, tek hata/ele geçirilme noktasını azaltır ve şeffaflık sağlar.",
  },
  {
    q: "Animasyonda ilk imzayı kim atıyordu?",
    choices: ["Ayşe", "Ali", "Mehmet", "Hasan"],
    answer: 1,
    explain: "İlk imza adımında işlemi Ali imzalıyordu.",
  },
  {
    q: "İkinci adımda iki imza peş peşe geliyordu. Kimlerdi?",
    choices: [
      "Ayşe ve Mehmet",
      "Elif ve Hasan",
      "Ali ve Hasan",
      "Mehmet ve Elif",
    ],
    answer: 0,
    explain:
      "Ayşe ardından Mehmet imzalıyor; Elif ve Hasan için 'bekleniyor' ibaresi gösteriliyordu.",
  },
  {
    q: "Tüm gerekli imzalar tamamlandığında ne olur?",
    choices: [
      "İşlem mempool’da beklemeye alınır",
      "İşlem onaylanır ve blockchain’e eklenir",
      "İşlem iptal edilir",
      "Süreç başa döner",
    ],
    answer: 1,
    explain: "Gerekli imza koşulu sağlanırsa işlem onaylanıp zincire yazılır.",
  },
  {
    q: "Dijital imza bir veriye uygulandıktan sonra veri tek bir bit bile değişirse…",
    choices: [
      "İmza yine de geçerli kalır",
      "Sadece ücret artar",
      "İmza doğrulaması başarısız olur",
      "Blok yüksekliği düşer",
    ],
    answer: 2,
    explain: "Bütünlük bozulur; imza artık doğrulanamaz.",
  },
  {
    q: "Multisig yaklaşımının en doğru özeti hangisidir?",
    choices: [
      "Tek imza ile daha hızlı işlem yapılır",
      "Birden çok tarafın yetkisi gerekir, güvenliği ve kurumsal kontrolü güçlendirir",
      "İmzayı tamamen ortadan kaldırır",
      "Yalnızca NFT işlemlerinde kullanılır",
    ],
    answer: 1,
    explain:
      "Birden fazla imza şartı ile yetki paylaşımı ve güvenlik artırılır.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soru için seçilen indeks

document.addEventListener("DOMContentLoaded", setupQuiz);

function setupQuiz() {
  quizQuestion = $id("quiz-question");
  quizChoices = $id("quiz-choices");
  quizPrevBtn = $id("quiz-prev");
  quizNextBtn = $id("quiz-next");
  quizSubmitBtn = $id("quiz-submit");
  quizProgressText = $id("quiz-progress");
  quizTotalText = $id("quiz-total");
  quizProgressBar = $id("quiz-progress-bar");
  quizResultWrap = $id("quiz-result");
  quizScoreText = $id("quiz-score-text");
  quizReviewWrap = $id("quiz-review");
  quizRetryBtn = $id("quiz-retry");

  if (quizTotalText) quizTotalText.textContent = String(quizData.length);
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  if (quizPrevBtn) quizPrevBtn.addEventListener("click", onQuizPrev);
  if (quizNextBtn) quizNextBtn.addEventListener("click", onQuizNext);
  if (quizSubmitBtn) quizSubmitBtn.addEventListener("click", onQuizSubmit);
  if (quizRetryBtn) quizRetryBtn.addEventListener("click", onQuizRetry);

  renderQuiz();
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  // ilerleme
  if (quizProgressText) quizProgressText.textContent = String(quizIndex + 1);
  if (quizProgressBar) {
    quizProgressBar.style.width = `${Math.round(
      (quizIndex / quizData.length) * 100
    )}%`;
  }

  // soru
  if (quizQuestion) quizQuestion.textContent = q.q;

  // seçenekler
  if (quizChoices) {
    quizChoices.innerHTML = "";
    q.choices.forEach((text, i) => {
      const id = `opt-${quizIndex}-${i}`;
      const wrap = document.createElement("label");
      wrap.className = "choice";
      wrap.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q-${quizIndex}`;
      input.id = id;
      input.value = String(i);
      input.checked = quizAnswers[quizIndex] === i;
      input.addEventListener("change", () => {
        quizAnswers[quizIndex] = i;
      });

      const span = document.createElement("span");
      span.textContent = text;

      wrap.appendChild(input);
      wrap.appendChild(span);
      quizChoices.appendChild(wrap);
    });
  }

  // buton durumları
  if (quizPrevBtn) quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  if (quizNextBtn) quizNextBtn.classList.toggle("hidden", last);
  if (quizSubmitBtn) quizSubmitBtn.classList.toggle("hidden", !last);

  // sonuç panelini gizli tut
  if (quizResultWrap) quizResultWrap.classList.add("hidden");
}

function onQuizPrev() {
  if (quizIndex > 0) {
    quizIndex--;
    renderQuiz();
  }
}

function onQuizNext() {
  if (quizIndex < quizData.length - 1) {
    quizIndex++;
    renderQuiz();
  }
}

function onQuizSubmit() {
  let correct = 0;
  const review = [];

  quizData.forEach((q, idx) => {
    const sel = quizAnswers[idx];
    const isCorrect = sel === q.answer;
    if (isCorrect) correct++;
    review.push({ idx, selected: sel, isCorrect, explain: q.explain, q });
  });

  const scorePct = Math.round((correct / quizData.length) * 100);
  if (quizScoreText) {
    quizScoreText.textContent = `Skor: ${correct} / ${quizData.length} (${scorePct}%)`;
  }

  if (quizReviewWrap) {
    quizReviewWrap.innerHTML = review
      .map((item) => {
        const user =
          item.selected == null
            ? "—"
            : escapeHtml(item.q.choices[item.selected]);
        const correctTxt = escapeHtml(item.q.choices[item.q.answer]);
        return `
        <div class="review-item ${item.isCorrect ? "ok" : "nok"}">
          <div class="r-q"><strong>Soru ${item.idx + 1}:</strong> ${escapeHtml(
          item.q.q
        )}</div>
          <div class="r-a">Cevabın: <span class="${
            item.isCorrect ? "good" : "bad"
          }">${user}</span></div>
          <div class="r-c">Doğru: <strong>${correctTxt}</strong></div>
          <div class="r-e">Açıklama: ${escapeHtml(item.explain)}</div>
        </div>`;
      })
      .join("");
  }

  if (quizResultWrap) quizResultWrap.classList.remove("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "100%";

  // Opsiyonel puan kaydı (blok mimarisi standardı)
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 10, // bu konuya özgü bir id
      score: correct,
      total: quizData.length,
      topic: "Dijital İmza / Multisig",
    });
  }

  // submitten sonra karttaki ileri/gönder butonlarını gizle
  if (quizNextBtn) quizNextBtn.classList.add("hidden");
  if (quizSubmitBtn) quizSubmitBtn.classList.add("hidden");
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  if (quizResultWrap) quizResultWrap.classList.add("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "0%";
  renderQuiz();
}

// Basit XSS kaçışı
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
