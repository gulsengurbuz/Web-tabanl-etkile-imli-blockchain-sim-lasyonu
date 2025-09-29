// quiz.js
// Beyaz temalı, butonsuz (sayfa açılır açılmaz görünen) Mini Quiz
// Konu: Coin vs Token (S0–S10)
// Yapı: Blok quizindeki mimari (Prev/Next/Submit, skor, review, __saveQuiz)

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

// Soru seti — Coin vs Token animasyonundaki kavramlarla aynı içerik
const quizData = [
  {
    q: "Animasyona göre Coin ve Token arasındaki temel fark nedir?",
    choices: [
      "İkisi de tamamen aynıdır; isimleri farklıdır",
      "Coin zincirin kendi defterinde yaşar, Token akıllı sözleşmede yaşar",
      "Coin sadece NFT’dir, Token ise yalnızca ödeme içindir",
      "Token cüzdanda duramaz, yalnızca borsada tutulur",
    ],
    answer: 1,
    explain:
      "S1: Coin zincirin yerel defterine yazılır; Token sözleşme (örn. ERC-20) durumunda yaşar.",
  },
  {
    q: "Coin’ler nasıl doğar?",
    choices: [
      "Geliştiricinin mint() fonksiyonunu çağırmasıyla",
      "Protokol kurallarıyla (ör. blok ödülü) üretilir",
      "Sadece köprü (bridge) üzerinden gelir",
      "Kullanıcıların rastgele oluşturmasıyla",
    ],
    answer: 1,
    explain:
      "S2: Coin’ler protokol tarafından, örneğin madencilik/validasyon ödülü ile doğar.",
  },
  {
    q: "Token’lar genellikle nasıl üretilir (mint edilir)?",
    choices: [
      "Merkle ağacında dallanarak",
      "Zincirin çekirdeği tarafından otomatik",
      "Akıllı sözleşmede mint() benzeri fonksiyonla",
      "Sadece köprüde paketlenerek (wrapped)",
    ],
    answer: 2,
    explain:
      "S3: Token üretimi için sözleşmedeki mint() gibi fonksiyonlar kullanılır.",
  },
  {
    q: "Transfer farkı: Coin ile Token nasıl aktarılır?",
    choices: [
      "Coin sözleşmeyle, Token defterde doğrudan",
      "Coin defterde doğrudan; Token sözleşme fonksiyonuyla",
      "İkisi de yalnızca köprü üzerinden",
      "İkisi de yalnızca cüzdan ekranında görünür değişir",
    ],
    answer: 1,
    explain:
      "S4: Coin transferleri yerel defterde; Token transferleri sözleşme fonksiyonlarıyla gerçekleşir.",
  },
  {
    q: "Token gönderirken gas ücreti hangi varlıkla ödenir?",
    choices: [
      "Gönderilen Token’ın kendisiyle (her zaman)",
      "Her zaman sabit coin ile",
      "O zincirin yerel Coin’i ile",
      "Gas ücretsizdir",
    ],
    answer: 2,
    explain:
      "S5: Token gönderirken de gas, ilgili zincirin coin’iyle ödenir (örn. Ethereum’da ETH).",
  },
  {
    q: "Aşağıdakilerden hangisi Coin için öne çıkan bir kullanım alanıdır?",
    choices: [
      "DeFi sözleşme fonksiyonları",
      "Oyun içi varlık basımı",
      "Ödeme ve değer saklama",
      "NFT standardı tanımlama",
    ],
    answer: 2,
    explain: "S6: Coin genellikle ödeme ve değer saklama rolünü üstlenir.",
  },
  {
    q: "Aşağıdakilerden hangisi Token kullanım alanına örnektir?",
    choices: [
      "Blok ödülü üretimi",
      "Zincirler arası konsensüs",
      "NFT, DeFi, oyun varlıkları, stablecoin",
      "Node’lar arası blok yayılımı",
    ],
    answer: 2,
    explain:
      "S6: Token tarafında NFT, DeFi, oyun varlıkları ve stablecoin gibi geniş alanlar bulunur.",
  },
  {
    q: "ERC-20 / ERC-721 / ERC-1155 neyi ifade eder?",
    choices: [
      "Cüzdan protokolleri",
      "Köprü (bridge) türleri",
      "Token standartları",
      "Blok zamanlaması ayarları",
    ],
    answer: 2,
    explain:
      "S7: Bunlar token standartlarıdır (fungible, NFT, çoklu varlık vb.).",
  },
  {
    q: "Güvenlik/onay farkı: Coin ve Token tarafında ne vurgulanır?",
    choices: [
      "Coin sözleşme kurallarıyla, Token defter mühürüyle onaylanır",
      "Coin deftere mühürlenir; Token sözleşme kurallarına göre onaylanır",
      "Her ikisi de yalnızca cüzdanın onayıyla geçerli olur",
      "Sadece borsalar onaylar",
    ],
    answer: 1,
    explain:
      "S8: Coin blok/defter onayı alır; Token için sözleşme kuralları ve fonksiyonları çalışır.",
  },
  {
    q: "Köprü (bridge) ve wrapped kavramı için doğru ifade hangisi?",
    choices: [
      "Wrapped, köprüsüz kendi kendine oluşur",
      "Bridge ile başka zincirde token’ın wrapped versiyonu oluşturulabilir (örn. WBTC)",
      "Wrapped yalnızca NFT’ler için geçerlidir",
      "Bridge yalnızca test ağlarında çalışır",
    ],
    answer: 1,
    explain:
      "S9: Köprü mekanizmasıyla diğer zincirde wrapped temsil (WBTC gibi) oluşturulabilir.",
  },
  {
    q: "Kapanış sahnesindeki kilit mesaj nedir?",
    choices: [
      "Coin ve Token aynı yerde doğar",
      "Aynı cüzdanda görünebilirler; ancak doğdukları/yaşadıkları yerler farklıdır",
      "Token’lar cüzdanda görünmez",
      "Coin’ler sözleşmeye taşınamaz",
    ],
    answer: 1,
    explain:
      "S10: Coin ve Token birlikte tutulabilir; fakat köken/yaşam yeri farklıdır (defter vs. sözleşme).",
  },
];

// durum
let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen index

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
        </div>`;
      })
      .join("");
  }

  if (quizResultWrap) quizResultWrap.classList.remove("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "100%";

  // Entegrasyon: sonucu kaydet (opsiyonel)
  // Coin vs Token testi için farklı bir testId kullanalım (ör. 3).
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 24,
      score: correct,
      total: quizData.length,
      topic: "Coin-ve-Token-mantigi",
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
