// quiz.js — “Dijital İmza / SHA-256” Mini Quiz (BLOK KOD YAPISI)
// HTML id’leriyle tam uyumlu: quiz-title, quiz-question, quiz-choices,
// quiz-prev, quiz-next, quiz-submit, quiz-progress, quiz-total,
// quiz-progress-bar, quiz-result, quiz-score-text, quiz-review, quiz-retry

const $id = (id) => document.getElementById(id);

// DOM referansları
let quizTitle,
  quizQuestion,
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

// Soru seti (İÇERİK AYNI KALDI)
const quizData = [
  {
    q: "SHA-256’ın temel özelliği nedir?",
    choices: [
      "Çift yönlü şifreleme yapar",
      "Tek yönlü özet (hash) üretir",
      "Rastgele sayı üretir",
      "Sıkıştırma algoritmasıdır",
    ],
    answer: 1,
    explain:
      "SHA-256 bir ‘tek yönlü’ özet fonksiyonudur; girdiden sabit uzunlukta çıktı üretir, geri dönüş yoktur.",
  },
  {
    q: "Aynı veri için hash çıktısı…",
    choices: [
      "Her çalıştırmada az da olsa değişir",
      "Her zaman aynıdır",
      "Sistemin saatine göre değişir",
      "Salt kullanmadan üretilemez",
    ],
    answer: 1,
    explain: "Deterministiktir: aynı girdi → aynı hash.",
  },
  {
    q: "Girdideki küçücük bir değişiklik (ör. ‘merhaba’ → ‘Merhaba’) hash’i nasıl etkiler?",
    choices: [
      "Çıktının yalnızca ilk 2–3 karakteri değişir",
      "Çıktıda küçük bir yüzdesi değişir",
      "Çıktı tamamen farklılaşır (çığ etkisi)",
      "Hiçbir etkisi olmaz",
    ],
    answer: 2,
    explain:
      "Avalanche (çığ) etkisi: küçük farklar bile tamamen farklı hash üretir.",
  },
  {
    q: "SHA-256 çıktısının tipik uzunluğu nedir?",
    choices: ["32 karakter", "48 karakter", "64 karakter hex", "Değişkendir"],
    answer: 2,
    explain: "SHA-256 256-bit üretir; hex gösterimde 64 karakterdir.",
  },
  {
    q: "Hash fonksiyonlarının ‘tek yönlü’ denmesinin sebebi nedir?",
    choices: [
      "Hash’ten girdiye pratikte geri dönülemez",
      "Sadece kısa veriler üzerinde çalışır",
      "Sadece dosyalarda kullanılır",
      "Salt ile çalışmaz",
    ],
    answer: 0,
    explain: "Hash’i tersine çevirmek pratikte mümkün değildir.",
  },
  {
    q: "Dijital imza süreçlerinde hash neden kullanılır?",
    choices: [
      "Veriyi gizlemek için",
      "Mesajı standart uzunluğa indirip imzalamak ve bütünlüğü doğrulamak için",
      "Anahtar üretmek için",
      "Zaman damgası yerine geçsin diye",
    ],
    answer: 1,
    explain:
      "Önce mesajın hash’i alınır, sonra bu özet özel anahtarla imzalanır. Doğrulamada özet tekrar hesaplanır.",
  },
  {
    q: "Aşağıdakilerden hangisi hash’in yaygın bir kullanım alanıdır?",
    choices: [
      "Ağ bağlantısı kurmak",
      "Dosya bütünlüğünü doğrulamak",
      "RAM yönetimi yapmak",
      "PNG render etmek",
    ],
    answer: 1,
    explain:
      "İndirilen dosyanın hash’i ile yayınlanan resmi hash karşılaştırılarak bütünlük doğrulanır.",
  },
  {
    q: "Hash çakışması (collision) nedir?",
    choices: [
      "Aynı girdinin farklı hash üretmesi",
      "Farklı girdilerin aynı hash’i üretmesi",
      "Hash’in geri çözülebilmesi",
      "Hash’in tuzlanması (salt)",
    ],
    answer: 1,
    explain:
      "Çakışma: farklı iki girdi → aynı hash. SHA-256’da pratikte bulmak çok zordur.",
  },
  {
    q: "Blok zincirde bir blok neden önceki bloğun hash’ini içerir?",
    choices: [
      "Hash, blok boyutunu küçültür",
      "Blok ödülünü hesaplamak için gerekir",
      "Zincirdeki sıralı bağlılığı ve değişmezliği sağlamak için",
      "Mempool’u boşaltmak için",
    ],
    answer: 2,
    explain:
      "Önceki hash’e referans, zincirin bağını ve tahrifata karşı bütünlüğünü garanti eder.",
  },
  {
    q: "Dijital imzada doğrulama adımı nasıl yapılır?",
    choices: [
      "Mesaj şifrelenir ve karşıya yollanır",
      "Alıcı, mesajın hash’ini hesaplar ve imzadaki değerle doğrular",
      "Alıcı, özel anahtarla imza atar",
      "Zaman damgası hash’i değiştirir",
    ],
    answer: 1,
    explain:
      "Alıcı, mesajdan hash üretir ve gönderilen imzayı (gönderenin açık anahtarıyla) kontrol eder.",
  },
];

// Durum
let quizIndex = 0;
let quizAnswers = Array(quizData.length).fill(null);

// Başlat
document.addEventListener("DOMContentLoaded", setupQuiz);

function setupQuiz() {
  // Bağlantılar
  quizTitle = $id("quiz-title");
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

  // Başlık ve toplam
  if (quizTitle) quizTitle.textContent = "Bilgini Test Et";
  if (quizTotalText) quizTotalText.textContent = String(quizData.length);

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
    const pct = Math.round((quizIndex / quizData.length) * 100);
    quizProgressBar.style.width = pct + "%";
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
      input.addEventListener("change", () => (quizAnswers[quizIndex] = i));

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

  // Sonuç panelini gizle
  if (quizResultWrap) quizResultWrap.classList.add("hidden");
}

// Navigasyon
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

// Değerlendirme
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
  quizScoreText.textContent = `Skorun: ${correct} / ${quizData.length} (${scorePct}%)`;

  quizReviewWrap.innerHTML = review
    .map((item) => {
      const user = item.selected == null ? "—" : item.q.choices[item.selected];
      const correctTxt = item.q.choices[item.q.answer];
      return `
      <div class="review-item">
        <div><strong>Soru ${item.idx + 1}:</strong> ${item.q.q}</div>
        <div>Cevabın: <span class="${
          item.isCorrect ? "good" : "bad"
        }">${user}</span></div>
        <div>Doğru: <strong>${correctTxt}</strong></div>
        <div>Açıklama: ${item.explain}</div>
      </div>
    `;
    })
    .join("");

  quizResultWrap.classList.remove("hidden");
  quizProgressBar.style.width = "100%";

  // >>> ENTEGRASYON SATIRI <<<
  // “Anahtar Yaşam Döngüsü” konulu bu testi  testId = 1  diye kaydedelim:
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 9,
      score: correct,
      total: quizData.length,
      topic: "hash-fonkisyonlari",
    });
  }
}
// Reset
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
