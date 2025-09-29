// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Anahtar Yaşam Döngüsü (Tohum -> Cüzdan -> İmzalama -> Paylaşım -> Rotasyon -> İptal/Kurtarma)

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

// 8 soru: Doğrudan sahnelerin ana mesajlarını ölçer
const quizData = [
  // 1) Tohumdan anahtar türetimi
  {
    q: "Özel anahtarın benzersiz ve güvenli olmasını sağlayan temel adım nedir?",
    choices: [
      "Açık anahtarın herkese duyurulması",
      "Tohum (seed) cümlesinden deterministik türetim",
      "Cüzdan dosyasını e-posta ile paylaşma",
      "Aynı özel anahtarı birden çok kullanıcıyla kullanma",
    ],
    answer: 1,
    explain:
      "Senaryoda vurgulandığı gibi özel anahtar, güvenli bir tohum cümlesinden türetilir.",
  },

  // 2) Güvenli saklama (cüzdan)
  {
    q: "Cüzdanda tutulan hangi anahtar asla dışarı çıkmamalıdır?",
    choices: ["Açık anahtar", "Özel anahtar", "Cüzdan adı", "Ağ kimliği"],
    answer: 1,
    explain:
      "Özel anahtar cüzdandan dışarı çıkmaz; açık anahtar güvenle paylaşılabilir.",
  },

  // 3) İmza akışı
  {
    q: "Bir işlemin sizden geldiğini kanıtlayan kriptografik veri nedir?",
    choices: [
      "Ağ gecikmesi",
      "Dijital imza (özel anahtarla oluşturulur)",
      "Blok numarası",
      "Cihaz türü",
    ],
    answer: 1,
    explain:
      "İşlem özel anahtarla imzalanır; bu imza göndericiyi doğrular ve değişikliğe karşı korur.",
  },

  // 4) Açık anahtar paylaşımı
  {
    q: "Açık anahtarın paylaşılmasının sağladığı fayda hangi seçenekte doğru verilmiştir?",
    choices: [
      "Özel anahtarın gizliliğini ortadan kaldırır",
      "Başka kullanıcıların size işlem göndermesini sağlar",
      "Ağdaki tüm işlemleri iptal eder",
      "İmzalama zorunluluğunu kaldırır",
    ],
    answer: 1,
    explain:
      "Açık anahtar paylaşılabilir; bu sayede kullanıcılar size güvenle işlem gönderebilir.",
  },

  // 5) Anahtar rotasyonu
  {
    q: "Anahtar rotasyonunun (yenileme) temel amacı nedir?",
    choices: [
      "Aynı anahtarı sonsuza kadar kullanmak",
      "Güvenliği artırmak ve uzun vadeli riski azaltmak",
      "İşlem ücretlerini sıfıra indirmek",
      "Ağı tek bir düğüme taşımak",
    ],
    answer: 1,
    explain:
      "Rotasyon, iyi güvenlik uygulamasıdır; olası tehdit yüzeyini azaltır.",
  },

  // 6) İptal ve kurtarma
  {
    q: "Özel anahtarın tehlikeye girdiği durumda yapılması gereken ilk doğru adım hangisidir?",
    choices: [
      "Ağ bağlantısını hızlandırmak",
      "Anahtarı iptal (revoke) edip yeni anahtar çifti üretmek",
      "Açık anahtarı gizlemek",
      "İşlem imzalamayı durdurmak ama anahtarı korumaya devam etmek",
    ],
    answer: 1,
    explain:
      "Senaryoda, ihlalde anahtarın iptali ve yeni güvenli çift üretimi vurgulanır.",
  },

  // 7) Akış sırası
  {
    q: "Aşağıdaki adım sıralamalarından hangisi doğru akışı en iyi temsil eder?",
    choices: [
      "Paylaşım → İmza → Tohum → İptal",
      "Tohum → Cüzdan Saklama → İmza → Açık Anahtar Paylaşımı → Rotasyon → İptal/Kurtarma",
      "Cüzdan Saklama → Tohum → İptal → Paylaşım",
      "Rotasyon → Tohum → Paylaşım → İmza",
    ],
    answer: 1,
    explain: "Metinde 1’den 6’ya uzanan mantıklı akış bu sırayı takip eder.",
  },

  // 8) Güvenlik ilkesi
  {
    q: "Aşağıdakilerden hangisi senaryodaki güvenlik ilkeleriyle UYUMLUDUR?",
    choices: [
      "Özel anahtarı yedeklemek için e-postayla kendine göndermek",
      "Açık anahtarı herkese açık şekilde paylaşmak",
      "Aynı özel anahtarı ekipte ortak kullanmak",
      "İhlalde anahtar iptaline gerek yok",
    ],
    answer: 1,
    explain:
      "Açık anahtar paylaşılabilir; özel anahtar asla paylaşılmaz ve ihlalde iptal/kurtarma uygulanır.",
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

  // >>> ENTEGRASYON SATIRI <<<
  // “Anahtar Yaşam Döngüsü” konulu bu testi  testId = 1  diye kaydedelim:
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 1,
      score: correct,
      total: quizData.length,
      topic: "Anahtar Yaşam Döngüsü",
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
