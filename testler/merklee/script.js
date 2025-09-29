// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Merkle Tree ve Blok Başlığı
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: Soru/cevap/açıklama içerikleri aynen korunmuştur.

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
    q: "Bir blokta yer alan ‘işlem’ kartları hangi bilgileri içerir?",
    choices: [
      "Sadece gönderici",
      "Gönderici, alıcı ve miktar",
      "Yalnızca alıcı ve zaman",
      "Sadece ağ zorluğu",
    ],
    answer: 1,
    explain: "Sahne 1: Her işlem; gönderici, alıcı ve miktar bilgisini içerir.",
  },
  {
    q: "‘Yaprak hash’ neyi ifade eder?",
    choices: [
      "İki üst katman hash’inin toplamını",
      "Tüm blok verilerinin tek özeti",
      "Tek bir işlemin özetini",
      "Sadece zaman damgasının hash’ini",
    ],
    answer: 2,
    explain:
      "Sahne 2: Her işlem ayrı ayrı özetlenir ve yaprak hash’leri oluşturur.",
  },
  {
    q: "Merkle ağacında üst katman hash’i nasıl üretilir?",
    choices: [
      "Rastgele bir sayı seçilir",
      "İki komşu hash yan yana getirilip tekrar özetlenir",
      "Sadece ilk yaprağın hash’i kopyalanır",
      "Her hash tek başına yeniden özetlenir",
    ],
    answer: 1,
    explain: "Sahne 3: Çiftler hâlinde birleştirme → yeniden hash.",
  },
  {
    q: "Bir seviyede tek sayıda yaprak hash varsa tipik uygulama nedir?",
    choices: [
      "Son hash atılır",
      "Son hash kendisiyle eşlenip özetlenir (kopyalanır)",
      "Ağaç durdurulur",
      "Kök doğrudan oluşturulur",
    ],
    answer: 1,
    explain:
      "Birçok uygulamada ‘son hash kendisiyle eşlenir’ yaklaşımı kullanılır.",
  },
  {
    q: "Merkle Root’un doğru tanımı aşağıdakilerden hangisidir?",
    choices: [
      "İlk yaprak hash’i",
      "Ortadaki düğümün hash’i",
      "Tüm işlemleri temsil eden tek üst seviye hash",
      "Sadece blok hash’i",
    ],
    answer: 2,
    explain: "Sahne 4: Bütün işlemleri tek bir değerle temsil eden kök hash.",
  },
  {
    q: "Merkle Root, blok yapısında nereye eklenir?",
    choices: [
      "Blok gövdesine",
      "Blok başlığına özel bir alana",
      "Sadece ağ düğümlerinin RAM’ine",
      "Hiçbir yere eklenmez",
    ],
    answer: 1,
    explain: "Sahne 5: Merkle Root blok başlığında yer alır.",
  },
  {
    q: "Blok hash’i hangi bilgilerin özetinden türetilir?",
    choices: [
      "Sadece zaman damgası",
      "Sadece ağ zorluğu",
      "Blok başlığındaki tüm bilgiler (örn. önceki hash + zaman damgası + Merkle Root)",
      "Sadece Merkle Root",
    ],
    answer: 2,
    explain: "Sahne 6: Başlıktaki alanların tamamı hash’e girer.",
  },
  {
    q: "Zincirlenme nasıl sağlanır?",
    choices: [
      "Her blok rastgele bir sayıyla bağlanır",
      "Her blok başlığında bir önceki bloğun hash’i tutulur",
      "Bloklar zamana göre sıralanır ama bağ yoktur",
      "İlk blok son bloğu referanslar",
    ],
    answer: 1,
    explain:
      "Sahne 7: ‘Previous Block Hash’ alanı zincir bağlantısını oluşturur.",
  },
  {
    q: "Tek bir işlemi değiştirirseniz ne olur?",
    choices: [
      "Yalnızca o yaprak hash’i değişir, üst katmanlar etkilenmez",
      "Merkle Root ve blok hash dahil yukarı doğru tüm özetler değişir",
      "Sadece zaman damgası değişir",
      "Zincirde hiçbir şey değişmez",
    ],
    answer: 1,
    explain:
      "Sahne 8: Yapraktaki değişiklik üst katmanlara yayılır → Merkle Root → Blok hash.",
  },
  {
    q: "Bir blokta bozulma (corruption) tespit edilirse doğru yorum nedir?",
    choices: [
      "Zincirin bütünlüğü bozulmuştur",
      "Sadece UI hatasıdır, ihmal edilebilir",
      "Önceki bloklar asla etkilenmez",
      "Merkle Root sabit kalır",
    ],
    answer: 0,
    explain: "Sahne 8: ‘ZİNCİR BOZULDU!’ — bütünlük ihlali söz konusudur.",
  },
  {
    q: "Merkle kanıtı (proof) ile ne kanıtlanır?",
    choices: [
      "Bir işlemin blokta yer aldığını, tüm işlemleri indirmeden",
      "Ağın tüm düğümlerinin çevrimiçi olduğunu",
      "Zaman damgasının sahte olduğunu",
      "Blok zorluğunu",
    ],
    answer: 0,
    explain: "Sahne 9: Yaprak → kardeş hash’ler → kök yoluyla üyelik kanıtı.",
  },
  {
    q: "Demo’daki ‘generateMockHash’ fonksiyonu için doğru ifade hangisi?",
    choices: [
      "Kriptografik olarak güvenli ve çakışma üretmez",
      "Sadece görsel/öğretici amaçlı basit bir özet üretir",
      "Ağ zorluğunu otomatik ayarlar",
      "Gerçek iş kanıtı (PoW) uygular",
    ],
    answer: 1,
    explain:
      "Kodda basit bir 32-bit tamsayı tabanlı özetleme var; sadece eğitim amaçlı.",
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

  renderQuiz(); // sayfa açılır açılmaz göster
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

  // Seçenekler
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

  // Sonuç ekranını soru sırasında gizle
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
      testId: 13,
      score: correct,
      total: quizData.length,
      topic: "merkle",
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
