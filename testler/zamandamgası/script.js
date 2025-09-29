// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: TimestampExplainer
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: Soru/cevap/açıklama içerikleri aynen korunmuştur.

const $id = (id) => document.getElementById(id);

let quizTitleEl,
  quizMetaEl,
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

// Orijinal içerik -> yeni veri yapısı (choices/answer/explain)
const quizData = [
  // STEP 1 — TANIM
  {
    scene: "Adım 1 — Zaman Damgası Nedir?",
    q: "Kodda anlatıldığı gibi zaman damgasının özü nedir?",
    choices: [
      "Veriyi sıkıştıran görsel efekt.",
      "Verinin üretildiği anı kanıtlayan dijital mühür.",
      "Veriyi şifreleyen gizli anahtar.",
      "Sunucu saatini cihazla eşitleyen mekanizma.",
    ],
    answer: 1,
    explain:
      "Açıklama metni: “Bir verinin oluşturulduğu anı ispatlayan dijital mühürdür.”",
  },
  {
    scene: "Adım 1 — Animasyon Akışı",
    q: "Adım 1’deki görünüm sırası hangisidir?",
    choices: [
      "golden-seal → data-box → timestamp-text → zoom",
      "data-box → golden-seal(dropped) → golden-seal(glowing) → timestamp-text → golden-seal(zoomed)",
      "timestamp-text → data-box → golden-seal(dropped)",
      "golden-seal(glowing) → data-box → timestamp-text",
    ],
    answer: 1,
    explain:
      "step1Animation: 500ms dataBox.visible → 1500ms seal.dropped → 2500ms seal.glowing → 3000ms timestamp.visible → 4000ms seal.zoomed.",
  },

  // STEP 2 — OLUŞUM SÜRECİ
  {
    scene: "Adım 2 — Süreç",
    q: "Adım 2’de veri nasıl işlenir?",
    choices: [
      "Veri şifrelenir ve silinir.",
      "Veri önce hash’lenir, zaman bilgisiyle birleştirilir ve blockchain’e eklenir.",
      "Sadece tarih etiketi eklenir.",
      "Sertifika rastgele üretilir.",
    ],
    answer: 1,
    explain:
      "Açıklama metni ve kod: hash → datetime → sertifika → blok ekleme.",
  },
  {
    scene: "Adım 2 — Arayüz Öğeleri",
    q: "Aşağıdakilerden hangisi Adım 2’de görünür hale gelen öğelerden DEĞİLDİR?",
    choices: ["hash-box", "datetime-tag", "certificate", "attacker"],
    answer: 3,
    explain: "‘attacker’ Adım 3’te görünür.",
  },
  {
    scene: "Adım 2 — Zincire Ekleme",
    q: "Blok zincire eklenirken hangi göstergeler birlikte gelir?",
    choices: [
      "empty-block ‘connected’ olur, block-content gizlenir, check-icon görünür, chain-link görünür.",
      "golden-seal zoom yapar ve saldırgan görünür.",
      "timestamp-text kaybolur ve verified bloklar parlar.",
      "final-lock görünür ve btc-amount güncellenir.",
    ],
    answer: 0,
    explain:
      "4500ms civarında: emptyBlock.connected + block-content gizlenir + check-icon görünür + chainLink görünür.",
  },

  // STEP 3 — DEĞİŞİKLİK ALGILAMA
  {
    scene: "Adım 3 — Manipülasyon",
    q: "Adım 3’te veri 5 BTC’den 8 BTC’ye değiştirildiğinde ne olur?",
    choices: [
      "seal-3 ‘✗’ olur, invalid sınıfı eklenir, invalid-status görünür.",
      "certificate kaybolur ve final-lock görünür.",
      "hash-box yok olur ve chain-link kopar.",
      "empty-block tekrar placed olur ve check-icon gizlenir.",
    ],
    answer: 0,
    explain:
      "step3Animation: btc-amount ‘8 BTC’, seal-3 ‘invalid/✗’, invalid-status.visible.",
  },
  {
    scene: "Adım 3 — Orijinallik",
    q: "Manipülasyon tespitinden sonra arayüzde ne vurgulanır?",
    choices: [
      "original-data görünür, modified-data soluklaşır.",
      "hash-box yeniden hesaplanır ve attacker gizlenir.",
      "certificate mühürü yeşile döner.",
      "empty-block silinir.",
    ],
    answer: 0,
    explain: "Kod: originalData.visible; modifiedData.opacity = 0.5.",
  },
  {
    scene: "Adım 3 — Hangi öğe güncellenir?",
    q: "Metni ‘5 BTC’ten ‘8 BTC’ye güncellenen element hangisidir?",
    choices: ["#timestamp-text", "#btc-amount", "#check-icon", "#chain-link"],
    answer: 1,
    explain: "btc-amount.textContent = '8 BTC'.",
  },

  // STEP 4 — ÖNEMİ
  {
    scene: "Adım 4 — Önemi",
    q: "Zaman damgasının temel katkıları nelerdir?",
    choices: [
      "Sadece veriyi sıkıştırır.",
      "Ne zaman üretildiğini kanıtlar, değişiklikleri ortaya çıkarır, güvenilir kayda yardımcı olur.",
      "Sadece görsel bir etiket ekler.",
      "Saldırganı otomatik engeller.",
    ],
    answer: 1,
    explain:
      "Açıklama metni: kanıt, değişiklik tespiti, güvenli ekleme, güvenilirlik.",
  },
  {
    scene: "Adım 4 — Görsel İpuçları",
    q: "Adım 4’te hangi görsel ipuçları sırayla vurgulanır?",
    choices: [
      "final-lock görünür, ardından tüm verified bloklar gizlenir.",
      "focused-block placed/connected olur; verified bloklar peş peşe ‘placed’; final-lock ve ikonlar görünür.",
      "attacker görünür ve hash-box silinir.",
      "golden-seal glowing olur ve chain-link yok olur.",
    ],
    answer: 1,
    explain:
      "Kod: focusedBlock → connected → verified bloklar sırayla → finalLock → ikonlar.",
  },

  // GENEL AKIŞ & BUTON DAVRANIŞI
  {
    scene: "Genel — Akış",
    q: "Adımların doğru kavramsal sırası hangisidir?",
    choices: [
      "Değişiklik Algılama → Oluşum Süreci → Önemi → Tanım",
      "Oluşum Süreci → Tanım → Önemi → Değişiklik Algılama",
      "Tanım → Oluşum Süreci → Değişiklik Algılama → Önemi",
      "Önemi → Tanım → Değişiklik Algılama → Oluşum Süreci",
    ],
    answer: 2,
    explain:
      "steps dizisi: 1) Tanım, 2) Süreç, 3) Değişiklik Algılama, 4) Önemi.",
  },
  {
    scene: "Genel — Next Button",
    q: "Son adımda ‘next-step’ butonunun metni neye döner?",
    choices: ["Sonraki Adım", "Baştan Başla", "Bitir", "Tekrar Oynat"],
    answer: 1,
    explain: "showNextButton(): Son adımda ‘Baştan Başla’.",
  },
  {
    scene: "Genel — Reset",
    q: "resetAnimations() çağrısı neleri temizler?",
    choices: [
      "visible/dropped/glowing/zoomed/placed/connected/highlighted/invalid sınıflarını; parçacıkları; metin ve görünürlükleri ilk hâline getirir.",
      "Sadece golden-seal’i kaldırır.",
      "Yalnızca timestamp-text’i siler.",
      "Sertifika ve zincir bağlantısını kalıcı olarak yok eder.",
    ],
    answer: 0,
    explain:
      "Kodda ilgili sınıflar toplu çıkarılır; particles temizlenir; çeşitli metin/görünürlükler sıfırlanır.",
  },
  {
    scene: "Genel — Modal",
    q: "Kılavuz modalı kapatınca ne tetiklenir?",
    choices: [
      "startAnimation() çağrılır ve o anki adım animasyonu başlar.",
      "Uygulama yeniden yüklenir.",
      "Sadece next-step görünür olur.",
      "Attacker otomatik görünür.",
    ],
    answer: 0,
    explain: "closeModal() → startAnimation().",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen seçenek index’i

function setupQuiz() {
  quizTitleEl = $id("quiz-title");
  quizMetaEl = $id("quiz-meta");
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

  if (quizTitleEl) quizTitleEl.textContent = "Zaman Damgası — Mini Quiz";
  if (quizTotalText) quizTotalText.textContent = String(quizData.length);

  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  quizPrevBtn?.addEventListener("click", onQuizPrev);
  quizNextBtn?.addEventListener("click", onQuizNext);
  quizSubmitBtn?.addEventListener("click", onQuizSubmit);
  quizRetryBtn?.addEventListener("click", onQuizRetry);

  // Klavye ile seçim (1–4)
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

  renderQuiz(); // otomatik ilk çizim
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  // İlerleme
  if (quizProgressText) quizProgressText.textContent = String(quizIndex + 1);
  if (quizProgressBar)
    quizProgressBar.style.width = `${Math.round(
      (quizIndex / quizData.length) * 100
    )}%`;

  // Sahne etiketi
  if (quizMetaEl) quizMetaEl.textContent = `Konu: ${q.scene}`;

  // Soru
  if (quizQuestion) quizQuestion.textContent = q.q;

  // Şıklar
  if (quizChoices) {
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
  }

  // Buton durumları
  if (quizPrevBtn) quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  quizNextBtn?.classList.toggle("hidden", last);
  quizSubmitBtn?.classList.toggle("hidden", !last);

  quizResultWrap?.classList.add("hidden");
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
      testId: 11,
      score: correct,
      total: quizData.length,
      topic: "zaman-damgasi",
    });
  }
}
function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap?.classList.add("hidden");
  renderQuiz();
}

// Basit XSS kaçışı
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.addEventListener("DOMContentLoaded", setupQuiz);
