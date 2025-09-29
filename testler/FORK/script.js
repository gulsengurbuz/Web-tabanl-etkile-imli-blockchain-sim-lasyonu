/* quiz.js — “Bloklar, Fork ve Konsensüs” Mini Quiz (BLOK STİLİ)
   HTML id'leriyle tam uyum: 
   quiz-title, quiz-question, quiz-choices, quiz-prev, quiz-next, quiz-submit,
   quiz-progress, quiz-total, quiz-progress-bar, quiz-result, quiz-score-text,
   quiz-review, quiz-retry
*/

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

// Soru seti (sadece alan adları blok stiline uyarlandı)
const quizData = [
  {
    q: "Bir blok, zincire nasıl bağlanır?",
    choices: [
      "Rastgele bir bloğu işaret eder",
      "Kendinden önceki bloğun hash’ine referans verir",
      "Zincirin son iki bloğunu aynı anda referanslar",
      "Hiçbir bloğa referans vermez",
    ],
    answer: 1,
    explain:
      "Yeni blok, önceki bloğun hash’ine referans vererek kronolojik zinciri uzatır.",
  },
  {
    q: "Fork (çatallanma) nedir?",
    choices: [
      "Blok boyutunun artması",
      "Ağın iki farklı kısalıkta zincir tutması",
      "Aynı yükseklikte birden fazla aday blok gelmesiyle zincirin geçici olarak iki kola ayrılması",
      "İşlem ücretlerinin düşmesi",
    ],
    answer: 2,
    explain:
      "Aynı anda farklı aday bloklar geldiğinde zincir geçici olarak dallanır: fork.",
  },
  {
    q: "Çatallanma durumunda hangi kol kazanır?",
    choices: [
      "Daha renkli olan kol",
      "En çok işlem içeren kol",
      "En uzun/ağır (en çok iş gücü harcanmış) zincir",
      "İlk gelen kol",
    ],
    answer: 2,
    explain:
      "Konsensüste genel kural: en uzun/ağır zincir kazanır ve ana zincir olur.",
  },
  {
    q: "Kaybeden kolun bloğundaki (geçersiz sayılan) işlemlere ne olur?",
    choices: [
      "Tamamen silinir, tekrar kullanılamaz",
      "Otomatik olarak ücret iadesi yapılır",
      "Mempool’a döner ve ana zincirde yeniden işlenmeyi deneyebilir",
      "Blok ödülüne eklenir",
    ],
    answer: 2,
    explain:
      "Geçersiz daldaki işlemler mempool’a geri dönerek geçerli zincirde tekrar denenebilir.",
  },
  {
    q: "Soft fork en iyi nasıl tanımlanır?",
    choices: [
      "Geriye dönük uyumsuz kural değişikliği",
      "Geriye dönük uyumlu kural değişikliği; eski düğümler yeni blokları kısmen okuyabilir",
      "Hiç kural değişikliği olmayan bir güncelleme",
      "Zincirin kalıcı ikiye ayrılması",
    ],
    answer: 1,
    explain:
      "Soft fork’ta yeni kurallar geriye dönük uyumludur; eski düğümler blokları görebilir.",
  },
  {
    q: "Soft fork aktivasyonu öncesi hangi süreç tipiktir?",
    choices: [
      "Zorunlu node kapatma",
      "%95 gibi yüksek ‘hazırım’ sinyali ve kilitlenme/aktivasyon pencereleri",
      "Tüm cüzdanların formatlanması",
      "Köprü (bridge) oluşturma",
    ],
    answer: 1,
    explain:
      "Soft fork’larda genellikle sinyalleme, kilitlenme ve aktivasyon adımları bulunur.",
  },
  {
    q: "Hard fork nedir?",
    choices: [
      "Hiç kimsenin görmediği geçici bir dal",
      "Geriye dönük uyumlu küçük düzeltme",
      "Geriye dönük uyumsuz değişiklik; ağ kalıcı olarak ikiye ayrılabilir",
      "Sadece ücretleri etkileyen güncelleme",
    ],
    answer: 2,
    explain:
      "Hard fork, eski sürümle uyumsuzluk yaratır; topluluk ayrılırsa kalıcı iki ağ oluşabilir.",
  },
  {
    q: "Hard fork anında kullanıcı bakiyeleri için tipik durum nedir?",
    choices: [
      "Sıfırlanır",
      "Sadece bir ağda kalır",
      "Her iki ağda da aynı başlangıç bakiyesi ‘kopyalanmış’ olur",
      "Yalnızca yeni ağda ikiye katlanır",
    ],
    answer: 2,
    explain:
      "Fork anı bir ‘snapshot’ gibidir; bakiyeler iki ağda da aynı başlangıç değerine sahiptir.",
  },
  {
    q: "Geçici ayrılıklar sürüm uyumsuzluğundan doğarsa kısa vadede tipik çözüm nedir?",
    choices: [
      "Tüm düğümlerin kapatılması",
      "Hızlı bir yama/güncelleme ile sürümlerin hizalanması",
      "İşlem ücretlerinin sıfırlanması",
      "Tüm blokların geri alınması",
    ],
    answer: 1,
    explain:
      "Hızlı yama (ör. v2.1) ile eski düğümler güncellenir; tek zincire yeniden birleşilir.",
  },
  {
    q: "“En uzun zincir kuralı” neden önemlidir?",
    choices: [
      "Cüzdan arayüzünü hızlandırır",
      "Farklı dallar arasında objektif bir seçim yaparak ağın tek gerçek üzerinde uzlaşmasını sağlar",
      "Blok ödülünü iki katına çıkarır",
      "Sadece test ağlarında geçerlidir",
    ],
    answer: 1,
    explain:
      "Ağın tutarlılığı ve uzlaşması için dallar arasında objektif seçim sunar.",
  },
];

// Durum
let quizIndex = 0;
let quizAnswers = []; // her soru için seçilen indeks

document.addEventListener("DOMContentLoaded", setupQuiz);

function setupQuiz() {
  // DOM bağla
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

  // Başlangıç durumları
  if (quizTotalText) quizTotalText.textContent = String(quizData.length);
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  // Olaylar
  if (quizPrevBtn) quizPrevBtn.addEventListener("click", onQuizPrev);
  if (quizNextBtn) quizNextBtn.addEventListener("click", onQuizNext);
  if (quizSubmitBtn) quizSubmitBtn.addEventListener("click", onQuizSubmit);
  if (quizRetryBtn) quizRetryBtn.addEventListener("click", onQuizRetry);

  renderQuiz();
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  // İlerleme
  if (quizProgressText) quizProgressText.textContent = String(quizIndex + 1);
  if (quizProgressBar) {
    quizProgressBar.style.width = `${Math.round(
      (quizIndex / quizData.length) * 100
    )}%`;
  }

  // Soru
  if (quizQuestion) quizQuestion.textContent = q.q;

  // Şıklar
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

  // Buton durumları
  if (quizPrevBtn) quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  if (quizNextBtn) quizNextBtn.classList.toggle("hidden", last);
  if (quizSubmitBtn) quizSubmitBtn.classList.toggle("hidden", !last);

  // Sonuç paneli görünmesin
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
    const ok = sel === q.answer;
    if (ok) correct++;
    review.push({ idx, sel, ok, q });
  });

  const pct = Math.round((correct / quizData.length) * 100);
  if (quizScoreText) {
    quizScoreText.textContent = `Skor: ${correct} / ${quizData.length} (${pct}%)`;
  }

  if (quizReviewWrap) {
    quizReviewWrap.innerHTML = review
      .map((item) => {
        const user =
          item.sel == null ? "— (boş)" : escapeHtml(item.q.choices[item.sel]);
        const correctTxt = escapeHtml(item.q.choices[item.q.answer]);
        return `
          <div class="review-item ${item.ok ? "ok" : "nok"}">
            <div class="r-q"><strong>Soru ${
              item.idx + 1
            }:</strong> ${escapeHtml(item.q.q)}</div>
            <div class="r-a">Cevabın: <span class="${
              item.ok ? "good" : "bad"
            }">${user}</span></div>
            <div class="r-c">Doğru: <strong>${correctTxt}</strong></div>
            <div class="r-e">Açıklama: ${escapeHtml(item.q.explain)}</div>
          </div>`;
      })
      .join("");
  }

  if (quizResultWrap) quizResultWrap.classList.remove("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "100%";

  // İsteğe bağlı skor kaydı (varsa)
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 22,
      score: correct,
      total: quizData.length,
      topic: "fork",
    });
  }

  // Submit sonrası ileri/gönder gizle
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
