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

const quizData = [
  {
    q: "Mempool (işlem havuzu) ne için kullanılır?",
    choices: [
      "Onaylı blokları saklamak için",
      "Kullanıcı işlemlerini doğrulanana kadar bekletmek için",
      "Nonce değerlerini depolamak için",
      "Madenci ödüllerini kaydetmek için",
    ],
    answer: 1,
    explain:
      "Mempool, henüz bloğa girmemiş bekleyen işlemlerin tutulduğu havuzdur.",
  },
  {
    q: "Madenci bir blok adayı oluştururken tipik olarak ilk ne yapar?",
    choices: [
      "Önceki blok hash’ini siler",
      "En kârlı/öncelikli işlemleri seçer ve başlık alanlarını doldurur",
      "Zorluk hedefini düşürür",
      "Zincirin son bloğunu değiştirir",
    ],
    answer: 1,
    explain:
      "Blok adayı; seçilen işlemler, önceki blok hash’i, zaman damgası vb. ile hazırlanır.",
  },
  {
    q: "PoW’da nonce değeri neden sürekli değiştirilir?",
    choices: [
      "İşlem ücretlerini artırmak için",
      "Hash çıktısını farklılaştırıp hedefin altında bir değer yakalamak için",
      "Blok süresini kısaltmak için",
      "Ağdaki düğüm sayısını artırmak için",
    ],
    answer: 1,
    explain:
      "Nonce, hash’i her denemede değiştirmek için kullanılır; hedefin altı bulunmaya çalışılır.",
  },
  {
    q: "Hash rate (ör. 10 MH/s) neyi ifade eder?",
    choices: [
      "Saniyede üretilen blok sayısını",
      "Saniyede yapılan hash denemesi sayısını",
      "Ağdaki düğüm sayısını",
      "Bir bloğun içindeki işlem sayısını",
    ],
    answer: 1,
    explain:
      "Hash rate, birim zamanda kaç farklı hash denemesi yapıldığını ölçer.",
  },
  {
    q: "Zorluk hedefi için tipik doğru ifade hangisi?",
    choices: [
      "Hash’in rastgele bir karakterle başlaması yeterlidir",
      "Hash belirli sayıda ön sıfır (ör. 00…) gibi daha küçük bir değerin altında olmalıdır",
      "Hedeften büyük hash’ler tercih edilir",
      "Nonce sabitse hedefe ulaşılır",
    ],
    answer: 1,
    explain:
      "PoW’da geçerli blok için hash, hedef eşik değerinin altında (ör. başı sıfırlı) olmalıdır.",
  },
  {
    q: "Bir denemede hash ‘00…’ ile başlarsa ne anlama gelir?",
    choices: [
      "Blok reddedilir",
      "Zorluk otomatik düşürülür",
      "Hash hedefin altında olabilir ve blok geçerli olabilir",
      "İşlem ücretleri sıfırlanır",
    ],
    answer: 2,
    explain:
      "Yeterli ön sıfır, hash’in hedef eşikten düşük olduğunu ve bloğun geçerli olabileceğini gösterir.",
  },
  {
    q: "Geçerli bir blok ağ tarafından kabul edilince ne olur?",
    choices: [
      "Mempool temizlenmez ve blok saklanmaz",
      "Blok kalıcı olarak blockchain’e eklenir",
      "Sadece madencinin yerel zincirine eklenir",
      "Önceki blok silinir",
    ],
    answer: 1,
    explain: "Kabul edilen blok zincire eklenir ve durum güncellenir.",
  },
  {
    q: "Zincir bütünlüğü nasıl korunur?",
    choices: [
      "Blokların birbirine bağlanmamasıyla",
      "Her blok başlığında önceki blok hash’inin bulunmasıyla",
      "Tüm blokların aynı nonce’a sahip olmasıyla",
      "İşlem ücreti olmamasıyla",
    ],
    answer: 1,
    explain:
      "Her blok, önceki bloğun hash’ini içerdiği için zincir kırılması kolayca tespit edilir.",
  },
  {
    q: "Madenci kazancı tipik olarak hangi kalemlerden oluşur?",
    choices: [
      "Sadece sponsorluk",
      "Blok ödülü + işlem ücretleri",
      "Sadece bağış",
      "Sadece staking getirisi",
    ],
    answer: 1,
    explain:
      "Madenci gelirinde blok sübvansiyonu (ör. 6.25 BTC) ve toplanan işlem ücretleri bulunur.",
  },
  {
    q: "Senaryodaki örneğe göre toplam kazanç 6.25 BTC ödül + 0.15 BTC ücret ise toplam kaç BTC’dir?",
    choices: ["6.10 BTC", "6.25 BTC", "6.40 BTC", "6.50 BTC"],
    answer: 2,
    explain: "6.25 + 0.15 = 6.40 BTC.",
  },
  {
    q: "Proof of Work hakkında doğru ifade hangisi?",
    choices: [
      "Düşük enerji kullanır ama güvenliği düşüktür",
      "Yüksek enerji tüketir ve ağ güvenliğini hesaplama maliyetine bağlar",
      "Enerjiden bağımsız çalışır",
      "Sadece mobil cihazlarda çalışır",
    ],
    answer: 1,
    explain:
      "PoW yüksek enerjiye dayanır; güvenlik, hesaplama maliyetinin saldırıyı caydırmasına bağlanır.",
  },
  {
    q: "Bir blok geçerli olsa bile ağın katılımı neden gereklidir?",
    choices: [
      "Blok tek başına kararsızdır; diğer düğümler doğrular ve kabul eder",
      "Madenci tek başına tüm ağı günceller",
      "Mempool otomatik boşalır",
      "Nonce herkese açık değildir",
    ],
    answer: 0,
    explain: "Ağ, önerilen bloğu doğrulayıp kabul ederek uzlaşıyı sağlar.",
  },
];

let quizIndex = 0;
let quizAnswers = [];

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

  const titleEl = $id("quiz-title");
  if (titleEl) titleEl.textContent = "PoW Madenciliği Quiz";
  quizTotalText.textContent = String(quizData.length);

  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  quizPrevBtn.addEventListener("click", onQuizPrev);
  quizNextBtn.addEventListener("click", onQuizNext);
  quizSubmitBtn.addEventListener("click", onQuizSubmit);
  quizRetryBtn.addEventListener("click", onQuizRetry);

  document.addEventListener("keydown", (e) => {
    const num = parseInt(e.key, 10);
    if (num >= 1 && num <= 4) {
      const radio = quizChoices.querySelector(`input[value="${num - 1}"]`);
      if (radio) {
        radio.checked = true;
        quizAnswers[quizIndex] = num - 1;
      }
    }
  });

  renderQuiz();
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  quizProgressText.textContent = String(quizIndex + 1);
  quizProgressBar.style.width = `${Math.round(
    (quizIndex / quizData.length) * 100
  )}%`;

  quizQuestion.textContent = q.q;

  quizChoices.innerHTML = "";
  q.choices.forEach((text, i) => {
    const id = `opt-${quizIndex}-${i}`;
    const label = document.createElement("label");
    label.className = "choice";
    label.setAttribute("for", id);

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

    label.appendChild(input);
    label.appendChild(span);
    quizChoices.appendChild(label);
  });

  quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  quizNextBtn.classList.toggle("hidden", last);
  quizSubmitBtn.classList.toggle("hidden", !last);

  quizResultWrap.classList.add("hidden");
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

  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 15,
      score: correct,
      total: quizData.length,
      topic: "pow",
    });
  }
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap.classList.add("hidden");
  renderQuiz();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.addEventListener("DOMContentLoaded", setupQuiz);
