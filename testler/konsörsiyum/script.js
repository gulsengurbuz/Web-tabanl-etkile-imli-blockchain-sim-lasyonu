// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Konsorsiyum (Consortium) Blockchain
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: İçerik (sorular/cevaplar/açıklamalar) aynen korunmuştur.

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

// Soru seti (alan adları bu yapıya uyarlandı)
const quizData = [
  {
    q: "Senaryoda hangi şirketler konsorsiyumu oluşturur?",
    choices: ["A, B, C ve D", "A, B ve E", "Sadece A ve C", "A, C ve D"],
    answer: 0,
    explain: "Konsorsiyum: Firma A, B, C ve D kartlarıyla başlıyor.",
  },
  {
    q: "Konsorsiyum oluştuktan sonra hangi bölüm görünür hâle gelir?",
    choices: [
      "Sadece oylama ekranı",
      "Blockchain bölümü ve başlangıç blokları",
      "Dış katılım başvuru formu",
      "Yalnızca node durumları",
    ],
    answer: 1,
    explain:
      "createBlockchain() ile blockchain-section açılır ve bloklar render edilir.",
  },
  {
    q: "Node’ların temel görevleri arasında AŞAĞIDAKİ yoktur:",
    choices: [
      "Blok önermek",
      "Blok doğrulamak",
      "Oylamaya katılmak",
      "Ağı herkese otomatik olarak açmak",
    ],
    answer: 3,
    explain: "Konsorsiyum ağı kontrollüdür; otomatik herkese açık değildir.",
  },
  {
    q: "Oylama sürecinde onay olasılığı yaklaşık kaçtır?",
    choices: ["%20", "%50", "%80", "%100"],
    answer: 2,
    explain:
      "createVotingSimulation() içinde Math.random() > 0.2 → yaklaşık %80 onay.",
  },
  {
    q: "Yeni bir bloğun kabul edilmesi için en az kaç olumlu oy gerekir? (4 node)",
    choices: ["1", "2", "3", "4"],
    answer: 2,
    explain: "Çoğunluk kuralı: approvedCount ≥ 3 ise blok eklenir.",
  },
  {
    q: "Blok kabul edildiğinde arayüzde ne olur?",
    choices: [
      "Zincire yeni blok eklenir ve başarı rozeti görünür",
      "Önceki bloklar silinir",
      "Tüm node’lar reddedilmiş görünür",
      "Zincir görünmez olur",
    ],
    answer: 0,
    explain:
      "addNewBlock() sonrası yeni blok ve ‘success’ durum rozeti gösterilir.",
  },
  {
    q: "Firma E’nin ağa katılma talebine ne olur?",
    choices: [
      "Anında kabul edilir",
      "Kullanıcıya devredilir",
      "Reddedilir; üyelik/onay gerekir",
      "Genesis bloğu değiştirilir",
    ],
    answer: 2,
    explain:
      "showExternalJoinAttempt() modalinde katılımın izne tabi olduğu vurgulanır.",
  },
  {
    q: "Konsorsiyum blockchain’in ayırt edici özelliği nedir?",
    choices: [
      "Tamamen herkese açık katılım",
      "Tek kurumun yönettiği merkezi yapı",
      "Belirli kuruluşların ortak yönetişimi ve kontrollü katılım",
      "Zincir dışı işlem zorunluluğu",
    ],
    answer: 2,
    explain:
      "“Birden fazla kurumun birlikte yönettiği özel blockchain” olarak anlatılır.",
  },
  {
    q: "Blok yapısında zincir bütünlüğünü sağlayan alanlar hangileridir?",
    choices: [
      "transactions ve timestamp",
      "hash ve prevHash",
      "company ve color",
      "status ve voting",
    ],
    answer: 1,
    explain: "Her blok hash ve prevHash ile zincire bağlanır.",
  },
  {
    q: "Oylama reddi durumunda kullanıcıya hangi seçenek sunulur?",
    choices: [
      "Ağı sıfırla",
      "Tekrar dene (yeni öneri)",
      "Genesis’i değiştir",
      "Node sayısını artır",
    ],
    answer: 1,
    explain: "showRejectionMessage() içinde modal CTA: “Tekrar Dene”.",
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

  // İlerleme
  quizProgressText.textContent = String(quizIndex + 1);
  quizProgressBar.style.width = `${Math.round(
    (quizIndex / quizData.length) * 100
  )}%`;

  // Soru
  quizQuestion.textContent = q.q;

  // Şıklar
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

  // Buton durumları
  quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  quizNextBtn.classList.toggle("hidden", last);
  quizSubmitBtn.classList.toggle("hidden", !last);

  // Sonuç panelini soru ekranında gizle
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

  // >>> ENTEGRASYON SATIRI <<<
  // “Anahtar Yaşam Döngüsü” konulu bu testi  testId = 1  diye kaydedelim:
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 20,
      score: correct,
      total: quizData.length,
      topic: "konsorsiyum-blockchain",
    });
  }
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap.classList.add("hidden");
  renderQuiz();
}

document.addEventListener("DOMContentLoaded", setupQuiz);
