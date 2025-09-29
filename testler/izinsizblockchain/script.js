// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: İzinsiz (Permissionless) Blockchain
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: İçerik (sorular, şıklar, cevaplar, açıklamalar) değiştirilmemiştir.

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
    q: "Senaryodaki ağın temel niteliği nedir?",
    choices: [
      "İzinli: yazma sadece yetkililere açık",
      "İzinsiz: herkes blok önerebilir",
      "Özel: sadece kurum içi görünür",
      "Hibrit: açık + kapalı aynı anda",
    ],
    answer: 1,
    explain:
      "Modal metninde “İzinsiz ağ: isteyen herkes blok önerebilir” vurgulanır.",
  },
  {
    q: "Yeni blok ekleme akışı hangi adımla başlıyor?",
    choices: [
      "Önce konsensüs, sonra işlem girişi",
      "Önce işlem giriliyor, sonra ağ onayı",
      "Önce hash üretiliyor, sonra işlem giriliyor",
      "Önce zaman damgası ekleniyor, sonra konsensüs",
    ],
    answer: 1,
    explain:
      "Kullanıcı ‘Blok Ekleme İşlemine Başla’ ile işlem verisini giriyor; ardından ağ doğrulaması geliyor.",
  },
  {
    q: "Doğrulama ekranındaki node’ların olası durumları arasında AŞAĞIDAKİ yoktur:",
    choices: ["Bekliyor", "Doğruluyor", "Onaylandı", "Madencilikte"],
    answer: 3,
    explain: "Durumlar: waiting, validating, approved, rejected.",
  },
  {
    q: "Senaryoda bir bloğun kabul edilmesi için en az kaç onay gerekir?",
    choices: ["1/5", "2/5", "3/5", "5/5"],
    answer: 2,
    explain: "Çoğunluk kuralı: onay sayısı ≥ 3 ise blok kabul edilir.",
  },
  {
    q: "Zincir bütünlüğünü sağlayan, her bloğun önceki bloğa işaret eden alanı hangisidir?",
    choices: ["transaction", "hash", "previousHash", "timestamp"],
    answer: 2,
    explain: "previousHash bir önceki bloğun hash’ini referanslar.",
  },
  {
    q: "Yeni blok kabul edildiğinde arayüzde görülen değişimlerden biri değildir:",
    choices: [
      "Blok zincire eklenir",
      "“Yeni blok” vurgusu görülür",
      "‘Blok Ekle’ butonu gizlenir",
      "Tüm önceki bloklar silinir",
    ],
    answer: 3,
    explain:
      "Kabul sonrası önceki bloklar korunur; zincire yeni bir blok eklenir.",
  },
  {
    q: "Yeterli mutabakat sağlanamazsa ne olur?",
    choices: [
      "Blok reddedilir ve kullanıcı tekrar deneyebilir",
      "Zincir sıfırlanır",
      "Genesis blok değişir",
      "Hash fonksiyonu kapatılır",
    ],
    answer: 0,
    explain: "Reddetme toast’ı gösterilir; kullanıcı yeni bir denemeye döner.",
  },
  {
    q: "İzinsiz ağların avantajlarından biri değildir:",
    choices: [
      "Herkes katılabilir",
      "Merkezi otorite yok",
      "Şeffaflık",
      "Yalnızca yetkili yazabilir",
    ],
    answer: 3,
    explain: "‘Yalnızca yetkili yazabilir’ izinli ağların özelliğidir.",
  },
  {
    q: "Doğrulama sürecinde node sonuçlarının belirlenmesi nasıl modellenmiştir?",
    choices: [
      "Tam deterministik (her zaman aynı sonuç)",
      "Rastlantısal olasılık (≈ %70 onay)",
      "Kullanıcı girişine göre",
      "Sunucu zamanına göre eşiklenmiş",
    ],
    answer: 1,
    explain: "Kodda onay olasılığı ~%70 olarak rastgele belirlenir.",
  },
  {
    q: "Blok kabul edildikten kısa süre sonra açılan ‘İzinsiz Blockchain Nedir?’ bölümünde öne çıkan vurgu nedir?",
    choices: [
      "Merkezi yönetim gereklidir",
      "Herkes yazabilir; kabul için konsensüs şarttır",
      "Sadece kapalı ağlarda çalışır",
      "Hash ve zaman damgası isteğe bağlıdır",
    ],
    answer: 1,
    explain: "Metinde merkeziyetsizlik ve konsensüsün rolü vurgulanır.",
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
      testId: 18,
      score: correct,
      total: quizData.length,
      topic: "acik-blockchain",
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
