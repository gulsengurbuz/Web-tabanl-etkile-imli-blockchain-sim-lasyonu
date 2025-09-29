// quiz.js
// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// İçerik: 5 sahne — bloktan zincire, Genesis, PoW madencilik (nonce/hash/zorluk),
// kurallar (prev hash + zorluk + konsensüs), blockchain tanımı

const $id = (id) => document.getElementById(id);

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

// 8 soru — her biri paylaştığın sahne script’inin metinlerine dayanır
const quizData = [
  // 1) Sahne 1 — Bloktan zincire geçiş
  {
    q: "Sahne 1'e göre, birden fazla bloğun hash bağlantılarıyla sırayla bağlanması hangi yapıyı oluşturur?",
    choices: [
      "Veri tabanı kümesi",
      "Blockchain (Blok Zinciri)",
      "Tekil blok arşivi",
      "Yalnızca hash listesi",
    ],
    answer: 1,
    explain:
      "Bloklar arası bağlantılar (link-bar) ile gösterildiği gibi, bu yapı Blockchain’dir.",
  },

  // 2) Sahne 2 — Genesis Block
  {
    q: "Genesis Block ile ilgili doğru ifade hangisidir?",
    choices: [
      "Önceki hash’i rastgele bir bloğa işaret eder",
      "Zincirin ilk halkasıdır ve herhangi bir önceki bloğa bağlı değildir",
      "Her zaman blok numarası 1’dir",
      "Zincirin sonuna eklenir",
    ],
    answer: 1,
    explain:
      "Genesis, başlangıç bloğudur; önceki hash yoktur (genelde 0 veya 0’lar).",
  },

  // 3) Sahne 3 — Proof of Work: hedef zorluk
  {
    q: "Madencilikte 'zorluk' (difficulty) neyi ifade eder?",
    choices: [
      "Bloğun veri boyutunu",
      "Hash’in belirli bir ön-ek (örn. '0000') sağlamasını",
      "Madenci sayısını",
      "İşlem ücretlerinin toplamını",
    ],
    answer: 1,
    explain:
      "Script’te targetPrefix = '0000' ile gösterildiği gibi hash’in hedef desene uyması gerekir.",
  },

  // 4) Sahne 3 — Nonce denemeleri
  {
    q: "Madenciler hedefe uygun hash’i bulmak için neyi değiştirip dener?",
    choices: [
      "Blok yüksekliğini",
      "Zaman damgasını",
      "Nonce değerini",
      "Ağın zorluk parametresini",
    ],
    answer: 2,
    explain: "Nonce her denemede değiştirilir ve hash tekrar hesaplanır.",
  },

  // 5) Sahne 3 — Kazanan madenci ve süreç
  {
    q: "Hedefe uyan hash’i ilk bulan madenci için sahnede hangi akış gösterilir?",
    choices: [
      "Madenci reddedilir ve süreç başa sarar",
      "Kazanan madenci çözümü ilan eder; diğerleri doğrular",
      "Tüm madenciler aynı anda ödül alır",
      "Blok iptal edilir",
    ],
    answer: 1,
    explain:
      "Script’te rastgele 'winner' seçilir, diğer madenciler 'verified' durumuna geçer.",
  },

  // 6) Sahne 4 — Zincire ekleme kuralları
  {
    q: "Yeni bir bloğun zincire eklenmesi için vurgulanan üç ana kontrol nedir?",
    choices: [
      "Veri boyutu, zaman damgası, imza",
      "Önceki hash eşleşmesi, zorluk uygunluğu, ağ (konsensüs) onayı",
      "Cihaz sayısı, bant genişliği, düğüm sayısı",
      "Nonce, işlem ücreti, blok numarası",
    ],
    answer: 1,
    explain:
      "Prev-hash kontrolü, difficulty kontrolü ve node’ların çoğunluk onayı (konsensüs) gösterilir.",
  },

  // 7) Sahne 4 — Konsensüs sonucu
  {
    q: "Sahne 4’te düğümlerin çoğu onayladığında ekranda hangi durum yazısı görünür?",
    choices: [
      "Reddedildi (başarısız)",
      "İşlem Başarılı!",
      "Zorluk düşürüldü",
      "Nonce tekrar denenmeli",
    ],
    answer: 1,
    explain: "Onay çoğunluğa ulaştığında 'İşlem Başarılı!' ibaresi belirir.",
  },

  // 8) Sahne 5 — Blockchain tanımı
  {
    q: "Sahne 5’e göre aşağıdakilerden hangisi blockchain’in bir özelliğidir?",
    choices: [
      "Geriye dönük kolayca değiştirilebilir",
      "Bloklar hash’lerle bağlanır ve ağ tarafından doğrulanır",
      "Madencilik yalnızca test amaçlıdır, zincire eklenmez",
      "Önceki blokların kaydı tutulmaz",
    ],
    answer: 1,
    explain:
      "Tanımda hash’lerle bağlanan blokların madencilikle eklendiği ve ağca doğrulandığı belirtilir.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen index

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

  quizTotalText.textContent = String(quizData.length);
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  // Navigasyon
  quizPrevBtn.addEventListener("click", onQuizPrev);
  quizNextBtn.addEventListener("click", onQuizNext);
  quizSubmitBtn.addEventListener("click", onQuizSubmit);
  quizRetryBtn.addEventListener("click", onQuizRetry);

  renderQuiz(); // sayfa açılır açılmaz görünür
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  quizProgressText.textContent = String(quizIndex + 1);
  quizProgressBar.style.width = `${Math.round(
    (quizIndex / quizData.length) * 100
  )}%`;
  quizQuestion.textContent = q.q;

  // seçenekler
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

  quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  quizNextBtn.classList.toggle("hidden", last);
  quizSubmitBtn.classList.toggle("hidden", !last);
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
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap.classList.add("hidden");
  renderQuiz();
}

document.addEventListener("DOMContentLoaded", setupQuiz);
