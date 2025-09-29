// quiz.js
// Beyaz temalı, butonsuz (sayfa açılır açılmaz görünen) Mini Quiz
// Konu: BLOK — sahne 1–3 (bilgi → blok, fiş analojisi, iç yapı)
// Yapı: Anahtar Yaşam Döngüsü quiz mimarisi (prev/next/submit, skor, review, __saveQuiz)

// Kısa yardımcı
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

// BLOK konulu soru seti (içerikler korunmuştur)
const quizData = [
  {
    q: "Blok nedir?",
    choices: [
      "Sadece görsel bir kutu",
      "Bilgileri güvenli biçimde saklayan dijital bir kap",
      "Madencilerin kullandığı donanım",
      "Cüzdanın yedeği",
    ],
    answer: 1,
    explain:
      "Blok, veriyi düzenli ve değiştirildiğinde fark edilebilir şekilde saklayan dijital kaptır.",
  },
  {
    q: "“Market fişi” benzetiminde aşağıdakilerden hangisi bloktaki alanlara denk gelir?",
    choices: [
      "Ürün listesi → Zaman damgası → Kasiyer imzası",
      "Tarih/Saat → Fiş No (kimlik) → Ürünler",
      "Mağaza logosu → Barkod okuyucu → Reyon",
      "Ödeme tipi → Kasiyer adı → Kampanya",
    ],
    answer: 1,
    explain:
      "Fişteki Tarih/Saat blok zamanını; Fiş No blok kimliğini (hash); Ürünler ise veri alanını temsil eder.",
  },
  {
    q: "Bir bloğun temel bileşenlerinden olmayan hangisidir? (Sahne 3)",
    choices: ["Block No", "Nonce", "Veri", "Wi-Fi SSID"],
    answer: 3,
    explain:
      "İç yapı örneğinde Block No, Nonce, Veri ve Hash varken Wi-Fi SSID yoktur.",
  },
  {
    q: "Nonce ne işe yarar?",
    choices: [
      "Blok numarasını arttırır",
      "Geçerli bir hash bulmak için denenen sayıdır",
      "Zaman damgasını doğrular",
      "Merkle kökünü üretir",
    ],
    answer: 1,
    explain:
      "Nonce, madencilikte hedefe uyan hash’i bulmak için değiştirilen değerdir.",
  },
  {
    q: "“Hash” için doğru ifade hangisidir?",
    choices: [
      "Bloğun fiziksel seri numarasıdır ve değişmez",
      "Bloğun içeriğinden türeyen dijital kimliktir; içerik değişirse hash de değişir",
      "Sadece tarih/saatten hesaplanır",
      "Madenci adresidir",
    ],
    answer: 1,
    explain:
      "Hash, içeriğe hassastır; tek bir karakter değişse hash tamamen değişir.",
  },
  {
    q: "“Block No” alanı neyi anlatır?",
    choices: [
      "Blok içindeki işlem sayısını",
      "Bloğun zincirdeki sırasını/konumunu",
      "Kullanılan algoritmayı",
      "Ağın düğüm sayısını",
    ],
    answer: 1,
    explain: "Block No, bloğun zincirdeki konumunu ifade eder.",
  },
  {
    q: "Fiş benzetiminde “Fiş No (Kimlik)” neyin karşılığıdır?",
    choices: ["Nonce", "Hash", "Veri", "Block No"],
    answer: 1,
    explain: "Fiş No, bloktaki kimlik/özet olan hash’e denktir.",
  },
  {
    q: "Aşağıdakilerden hangisi “Veri” alanına örnek olur?",
    choices: ["0000f7…e5a", "72608", "Ali, Ayşe’ye 10₺ gönderdi", "# 1"],
    answer: 2,
    explain:
      "“Ali, Ayşe’ye 10₺ gönderdi” gibi işlemler/veriler Veri alanında yer alır.",
  },
];

// durum
let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen index (number | null)

// Başlat
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

  // başlangıç değerleri
  if (quizTotalText) quizTotalText.textContent = String(quizData.length);
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  // olaylar
  if (quizPrevBtn) quizPrevBtn.addEventListener("click", onQuizPrev);
  if (quizNextBtn) quizNextBtn.addEventListener("click", onQuizNext);
  if (quizSubmitBtn) quizSubmitBtn.addEventListener("click", onQuizSubmit);
  if (quizRetryBtn) quizRetryBtn.addEventListener("click", onQuizRetry);

  // ilk ekran
  renderQuiz();
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  if (quizProgressText) quizProgressText.textContent = String(quizIndex + 1);
  if (quizProgressBar) {
    quizProgressBar.style.width = `${Math.round(
      (quizIndex / quizData.length) * 100
    )}%`;
  }
  if (quizQuestion) quizQuestion.textContent = q.q;

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

  // navigasyon
  if (quizPrevBtn) quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  if (quizNextBtn) quizNextBtn.classList.toggle("hidden", last);
  if (quizSubmitBtn) quizSubmitBtn.classList.toggle("hidden", !last);
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
    quizScoreText.textContent = `Skorun: ${correct} / ${quizData.length} (${scorePct}%)`;
  }

  if (quizReviewWrap) {
    quizReviewWrap.innerHTML = review
      .map((item) => {
        const user =
          item.selected == null ? "—" : item.q.choices[item.selected];
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
  }

  if (quizResultWrap) quizResultWrap.classList.remove("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "100%";

  // Entegrasyon: test sonucunu kaydet (opsiyonel)
  // Bu quiz BLOK konulu; testId'yi 2 seçtim (1’i Anahtar Yaşam Döngüsü için kullanıyorsun diye).
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 12,
      score: correct,
      total: quizData.length,
      topic: "Blok",
    });
  }
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  if (quizResultWrap) quizResultWrap.classList.add("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "0%";
  renderQuiz();
}
