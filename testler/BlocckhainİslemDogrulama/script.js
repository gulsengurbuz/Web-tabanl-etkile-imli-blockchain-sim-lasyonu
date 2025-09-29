// quiz.js
// Beyaz temalı, butonsuz (sayfa açılır açılmaz görünen) Mini Quiz
// İçerik: 12 sahneli “İşlemden Zincire” akışına göre hazırlanmış sorular

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

// 12 sahneye dayalı 12 soru
const quizData = [
  // 1) İşlem Kutusu
  {
    q: "Bir işlemin 'Inputs' (girişler) alanı hangi kavramı işaret eder?",
    choices: [
      "Yeni oluşturulan çıktıları (NTXO)",
      "Önceki harcanmamış çıktıları (UTXO)",
      "Blok yüksekliğini",
      "Zorluk hedefini",
    ],
    answer: 1,
    explain: "Girişler, harcanmak istenen önceki UTXO’ları referanslar.",
  },

  // 2) İmza Doğrulama
  {
    q: "İşlemin gerçekten senden geldiğini kanıtlamak için ne kullanılır?",
    choices: [
      "Sadece zaman damgası",
      "Sadece açık anahtar",
      "Özel anahtarla üretilmiş imza (açık anahtarla doğrulanır)",
      "Madenci ödülü",
    ],
    answer: 2,
    explain: "İmza özel anahtarla oluşturulur, herkes açık anahtarla doğrular.",
  },

  // 3) Çifte Harcama
  {
    q: "Aynı parayı iki kez göndermeye çalışmanın (çifte harcama) sonucu nedir?",
    choices: [
      "Ağ her iki işlemi de kabul eder",
      "İlk gelen işlem kabul edilir, diğeri reddedilir",
      "İlk gelen işlem reddedilir",
      "Her iki işlem de mempool’da kalır",
    ],
    answer: 1,
    explain:
      "Ağ sırayı bilir; ikinci deneme reddedilerek defterin bütünlüğü korunur.",
  },

  // 4) Script / Kurallar Geçidi
  {
    q: "Script kuralları içinde tipik akış hangisidir?",
    choices: [
      "KEY → CHECK → LOCK",
      "LOCK → KEY → CHECK",
      "CHECK → LOCK → KEY",
      "LOCK → CHECK → TIME → KEY",
    ],
    answer: 1,
    explain:
      "Genel anlatım: kilit koşulu, uygun anahtar, kontrol; varsa zaman kilidi de sağlanır.",
  },

  // 5) Ücret ve Boyut
  {
    q: "Ağ yoğun olduğunda işlemin daha hızlı işlenmesi genellikle neye bağlıdır?",
    choices: [
      "Daha düşük ücret ve büyük boyut",
      "Yüksek ücret ve makul boyut",
      "Sadece işlem yaşı",
      "Sadece gönderici adresi",
    ],
    answer: 1,
    explain: "Uygun (yeterli) ücret ve makul boyut, önceliği artırır.",
  },

  // 6) Mempool
  {
    q: "Geçerli işlemler blok olmadan önce nereye girer?",
    choices: [
      "Genesis havuzu",
      "Mempool (bekleme alanı)",
      "Nonce kuyruğu",
      "Merkle kökü",
    ],
    answer: 1,
    explain: "Mempool, geçerli işlemlerin bloklanmadan önce beklediği alandır.",
  },

  // 7) Merkle
  {
    q: "Merkle ağacının tepesindeki kök (Merkle Root) neyi sağlar?",
    choices: [
      "Zincirin toplam süresini",
      "İşlemlerin güvenli kısa özetini",
      "Ağın düğüm sayısını",
      "Zorluk hedefini",
    ],
    answer: 1,
    explain:
      "İşlem özetleri ikili birleşerek kökü oluşturur; içerik bütünlüğünü kanıtlar.",
  },

  // 8) Blok Başlığı
  {
    q: "Blok başlığındaki hangi öğe sahne 7’de hesaplanan değerle tutarlı olmalıdır?",
    choices: ["Zaman", "Önceki blok özeti", "Merkle kökü", "Konsensüs ispatı"],
    answer: 2,
    explain:
      "Blok başlığındaki Merkle Root, içerdiği işlemlerden hesaplananla aynı olmalıdır.",
  },

  // 9) Blok İçi Kontroller
  {
    q: "Blok içindeki her işlem için hangi kontroller tekrar yapılır?",
    choices: [
      "Format, imza, script koşulları ve ücret kontrolü",
      "Sadece ücret",
      "Sadece gönderici kimliği",
      "Sadece zaman damgası",
    ],
    answer: 0,
    explain:
      "Biçim ve imza doğrulaması, script kuralları ve ücret uygunluğu yeniden denetlenir.",
  },

  // 10) Zincire Ekleme
  {
    q: "Blok zincirin ucuna eklendiğinde ne değişir?",
    choices: [
      "Zincir yüksekliği artar",
      "Genesis blok güncellenir",
      "Tüm mempool sıfırlanır",
      "Zorluk otomatik sıfırlanır",
    ],
    answer: 0,
    explain: "Yeni blok uca eklenir ve zincir yüksekliği +1 olur.",
  },

  // 11) Yayılım
  {
    q: "Yeni blok ağda nasıl yayılır?",
    choices: [
      "Sadece madenci saklar",
      "Merkez sunucudan herkese gönderilir",
      "Düğümler birbirine ileterek hızlıca paylaşır",
      "Sadece cüzdanlara gider",
    ],
    answer: 2,
    explain: "Her düğüm komşularına haber verir; ağ kısa sürede senkron olur.",
  },

  // 12) Kısa Çatal
  {
    q: "Kısa bir çatal olduğunda ağ hangi dalı tercih eder?",
    choices: [
      "En eski dal",
      "En uzun/ağır dal",
      "En düşük ücretli dal",
      "Rastgele bir dal",
    ],
    answer: 1,
    explain:
      "Yeni bloklar geldikçe daha uzun/ağır dal 'doğru yol' olarak seçilir.",
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

  quizPrevBtn.addEventListener("click", onQuizPrev);
  quizNextBtn.addEventListener("click", onQuizNext);
  quizSubmitBtn.addEventListener("click", onQuizSubmit);
  quizRetryBtn.addEventListener("click", onQuizRetry);

  renderQuiz(); // sayfa açılır açılmaz
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
      testId: 15,
      score: correct,
      total: quizData.length,
      topic: "islem-ve-blok-dogrulama",
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
