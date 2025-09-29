// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Hibrit Blockchain (Açık / Kapalı / Hibrit)
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

// Soru seti (içerik aynı; alan adları bu yapıya uyarlandı)
const quizData = [
  {
    q: "Açık (public) blockchain’in temel özelliği nedir?",
    choices: [
      "Sadece yetkililerin erişebilmesi",
      "İşlemlerin gizli tutulması",
      "Herkesin verileri görüntüleyebilmesi ve doğrulayabilmesi",
      "İnternet bağlantısı olmadan çalışması",
    ],
    answer: 2,
    explain:
      "Açık blockchain şeffaftır; herkes işlemleri görüntüleyebilir ve doğrulayabilir.",
  },
  {
    q: "Kapalı (private/permissioned) blockchain’i doğru tanımlayan ifade hangisidir?",
    choices: [
      "Tüm dünyaya açıktır",
      "Erişim izne bağlıdır, yalnızca yetkililer görebilir",
      "Token basımı yapılamaz",
      "Blok eklenemez",
    ],
    answer: 1,
    explain: "Kapalı ağlarda erişim izinlidir; yetkili roller görür/denetler.",
  },
  {
    q: "Hibrit blockchain neyi ifade eder?",
    choices: [
      "Sadece açık zincirlerin birleşimi",
      "Sadece kapalı zincirlerin birleşimi",
      "Açık ve kapalı yaklaşımların bir arada kullanılması",
      "Sadece veri arşivleme yöntemi",
    ],
    answer: 2,
    explain:
      "Hibrit model; şeffaflık (açık) ve gizlilik/izin (kapalı) dengesini birleştirir.",
  },
  {
    q: "‘Vatandaş’ rolünün yetkisi hangi seçenekte doğru verilmiştir?",
    choices: [
      "Açık: Hayır — Kapalı: Evet",
      "Açık: Evet — Kapalı: Hayır",
      "Açık: Evet — Kapalı: Evet",
      "Açık: Hayır — Kapalı: Hayır",
    ],
    answer: 1,
    explain:
      "Vatandaş yalnızca açık zinciri görüntüleyebilir; kapalı kısma erişemez.",
  },
  {
    q: "‘Çalışan’ rolü için doğru olan nedir?",
    choices: [
      "Açık veriyi göremez, sadece kapalı veriyi görür",
      "Hem açık hem kapalı veriyi görebilir",
      "Sadece denetim kayıtlarını görebilir",
      "Sadece hibrit blokları görebilir",
    ],
    answer: 1,
    explain:
      "Çalışan rolü açık + kapalı veriyi görüntüleyebilir (kurumsal senaryoya göre).",
  },
  {
    q: "‘Denetçi’ rolü için en doğru ifade hangisidir?",
    choices: [
      "Sadece açık verileri görebilir",
      "Sadece kapalı verileri görebilir",
      "Tam erişim – tüm verileri görüntüleyebilir ve denetleyebilir",
      "Sadece hash değerlerini görebilir",
    ],
    answer: 2,
    explain: "Denetçi, tam erişim ve denetim yetkisine sahiptir.",
  },
  {
    q: "Hibrit bir blokta ‘açık’ ve ‘kapalı’ kısımların birlikte bulunmasının faydası nedir?",
    choices: [
      "Sistemi yavaşlatır ama güvenliği artırmaz",
      "Şeffaflığı düşürür",
      "Hem şeffaflık hem de gizlilik ihtiyaçlarını aynı anda karşılar",
      "Sadece test amaçlıdır ve üretimde kullanılmaz",
    ],
    answer: 2,
    explain:
      "Hibrit bloklar şeffaf + gizli alanları aynı yapıda birleştirerek iki ihtiyacı dengeler.",
  },
  {
    q: "Senaryoda ‘Genel ödeme (Firma A → Firma C: 10 BTC)’ neden hem açık hem kapalı zincire eklenmiştir?",
    choices: [
      "Sadece hash değerini büyütmek için",
      "Görsellik amacıyla",
      "Şeffaflık için genel kısım, detay/gizlilik için kapalı kısım tutulsun diye",
      "Rastgele tercih",
    ],
    answer: 2,
    explain:
      "Genel görünürlük + detayların özel kalması için iki tarafta kayıt tutulur.",
  },
  {
    q: "‘İç denetim 2025 Q2’ gibi bir kayıt en uygun olarak nereye eklenmelidir?",
    choices: [
      "Sadece açık zincire",
      "Sadece kapalı zincire",
      "Sadece test ağına",
      "Hiçbir yere eklenmez",
    ],
    answer: 1,
    explain:
      "İç denetim gibi hassas kurumsal bilgiler kapalı (permissioned) kısımda tutulur.",
  },
  {
    q: "Arayüzde blokların ‘bulanık/blur’ görünmesi neyin sonucudur?",
    choices: [
      "Tarayıcı hatası",
      "Güncelleme bekleniyor",
      "Kullanıcının rolünün o veriyi görüntüleme yetkisine sahip olmaması",
      "Blok hash’i yanlış",
    ],
    answer: 2,
    explain:
      "Rol tabanlı görünürlük: yetki yoksa blok içerikleri bulanık gösterilir.",
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
      testId: 21,
      score: correct,
      total: quizData.length,
      topic: "hibrit-modelleri",
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
