// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Permissioned (İzinli) Blockchain Demo
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
    q: "Senaryoda ağ neden herkes tarafından genişletilemedi (yeni düğüm eklenemedi)?",
    choices: [
      "Ağ offline olduğu için",
      "İzinli (permissioned) bir ağ olduğu için yazma yetkisi sınırlı",
      "Blok boyutu dolduğu için",
      "Genesis blok hatalı olduğu için",
    ],
    answer: 1,
    explain:
      "İzinli ağlarda yazma/katılım yetkisi rol ve yetkilendirme ile verilir.",
  },
  {
    q: "Aşağıdakilerden hangisi izinli blockchain’de YANLIŞTIR?",
    choices: [
      "Okuma çoğu zaman şeffaftır",
      "Yazma yalnızca yetkili rollerle mümkündür",
      "Herkes rastgele block ekleyebilir",
      "Kurumsal yönetişim ve denetim mekanizmaları vardır",
    ],
    answer: 2,
    explain:
      "İzinli ağda herkes rastgele blok ekleyemez; yazma yetkisi kısıtlıdır.",
  },
  {
    q: "Yetkilendirme sürecinde hangi unsurlar örnek olarak belirtildi?",
    choices: [
      "Rol, KYC, IP/E-posta doğrulama",
      "Sadece kullanıcı adı",
      "Sadece bir şifre",
      "Sadece node sayısı",
    ],
    answer: 0,
    explain: "Senaryoda rol seçimi, KYC ve IP/e-posta doğrulaması vurgulandı.",
  },
  {
    q: "‘Yetkilendirme Başarılı’ adımında kullanıcıya verilen bilgilerden biri DEĞİLDİR:",
    choices: [
      "Public Key",
      "İmzalı Token (JWT)",
      "E-posta doğrulaması",
      "Madencilik güç puanı (hashrate skoru)",
    ],
    answer: 3,
    explain:
      "Senaryoda public key, JWT ve e-posta doğrulaması vardı; madencilik gücü bilgisi yoktu.",
  },
  {
    q: "Yeni blok eklendiğinde hangi alan, zincir bütünlüğünü korumak için bir önceki bloğa işaret eder?",
    choices: ["data", "hash", "previousHash", "locked"],
    answer: 2,
    explain: "previousHash alanı bir önceki bloğun hash’ini referans alır.",
  },
  {
    q: "Senaryodaki ‘locked’ alanı blok için neyi ifade eder?",
    choices: [
      "Blok silinebilir",
      "Blok doğrulanmış/kitlenmiş durumda",
      "Blok şifrelenmemiştir",
      "Blok ağdan ayrılmıştır",
    ],
    answer: 1,
    explain: "‘locked: true’ doğrulanmış/kitli anlamında kullanıldı.",
  },
  {
    q: "Yetkili rol kazandıktan sonra hangi işlem yapılabildi?",
    choices: [
      "Genesis bloğu değiştirildi",
      "Ağ protokolü güncellendi",
      "Yeni blok eklendi",
      "Tüm zincir sıfırlandı",
    ],
    answer: 2,
    explain: "Yetkilendirme sonrası kullanıcı yeni blok ekleyebildi.",
  },
  {
    q: "Kurumsal izinli ağların temel avantajı nedir?",
    choices: [
      "Tamamen anonim ve kontrolsüz işlem",
      "Şeffaflık ile kurumsal kontrolün dengelenmesi",
      "Yalnızca açık verilerin tutulması",
      "Denetim izi olmaması",
    ],
    answer: 1,
    explain:
      "Kurumsal ortamlarda şeffaflık + kontrol/yönetişim dengesi kritik faydadır.",
  },
  {
    q: "Ağda ‘erişim reddedildi’ mesajı sonrası kullanıcı ne yaptı?",
    choices: [
      "Manual blok hash’ini değiştirdi",
      "Yetkilendirme sürecini inceledi ve yetki aldı",
      "Ağı kapattı",
      "Zinciri fork’ladı",
    ],
    answer: 1,
    explain:
      "Yetki süreçleri (rol, doğrulamalar) sonrası yazma izni elde edildi.",
  },
  {
    q: "Yeni eklenen blok ‘unlocked’ iken kısa süre sonra sürecin tamamlanması neyi gösterir?",
    choices: [
      "Blok onaylandı ve zincire kalıcı olarak eklendi",
      "Blok geçersiz sayıldı",
      "Ağ çevrimdışı",
      "Hash fonksiyonu başarısız",
    ],
    answer: 0,
    explain:
      "Tamamlama modalı; onay ve ekleme süreçlerinin başarıyla bittiğini gösterdi.",
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
      testId: 19,
      score: correct,
      total: quizData.length,
      topic: "ozel-blockchain",
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
