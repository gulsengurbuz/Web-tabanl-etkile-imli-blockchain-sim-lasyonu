// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Proof of Stake (PoS) Süreci
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

// Orijinal içerik -> yeni veri yapısı (choices/answer/explain)
const quizData = [
  {
    // Sahne 1: Stake Havuzu
    q: "PoS’ta kullanıcılar neden coinlerini stake eder?",
    choices: [
      "Grafik kartı madenciliği için",
      "Doğrulayıcı olma ve ağ güvenliğine katkı için",
      "Sadece faiz geliri almak için",
      "Token yakımı yapmak için",
    ],
    answer: 1,
    explain: "Stake, doğrulayıcı olma hakkı ve ağ güvenliği için kilitlemedir.",
  },
  {
    // Sahne 2: Adaylık
    q: "Stake miktarı ile doğrulayıcı seçilme olasılığı arasındaki ilişki nedir?",
    choices: [
      "Ters orantılıdır",
      "Bağımsızdır",
      "Stake arttıkça seçilme olasılığı artar",
      "Sadece sabit bir eşik aşılınca mümkündür",
    ],
    answer: 2,
    explain: "Daha büyük stake, seçim olasılığını artırır (ağırlıklı seçim).",
  },
  {
    // Sahne 3: Rastgele seçim
    q: "PoS’ta doğrulayıcı seçiminde ‘rastgelelik’ nasıl olmalıdır?",
    choices: [
      "Manuel kura ile",
      "Öngörülebilir ve tekrarlanabilir",
      "Kriptografik olarak güvenli ve ağırlıklı",
      "Tamamen tesadüfi, stake’den bağımsız",
    ],
    answer: 2,
    explain:
      "Stake ağırlıkları gözetilerek kriptografik güvenli rastgele seçim yapılır.",
  },
  {
    // Sahne 4: Blok önerisi
    q: "Seçilen doğrulayıcı ne yapar?",
    choices: [
      "Ağı kapatır",
      "Yeni bir blok önerir ve işlemleri toplar",
      "Stake’ini geri çeker",
      "Sadece oy verir, blok öneremez",
    ],
    answer: 1,
    explain: "Seçilen doğrulayıcı bekleyen işlemlerden blok oluşturup önerir.",
  },
  {
    // Sahne 5: Konsensüs
    q: "Önerilen blok nasıl kabul edilir?",
    choices: [
      "Tek bir düğümün onayıyla",
      "Merkezi sunucu kararıyla",
      "Diğer doğrulayıcıların doğrulaması ve çoğunluk onayıyla",
      "Madencilerin hash gücüyle",
    ],
    answer: 2,
    explain:
      "PoS’ta doğrulayıcılar kontrol eder; çoğunluk onayıyla kabul edilir.",
  },
  {
    // Sahne 6: Zincire ekleme
    q: "Blok kabul edildikten sonra ne olur?",
    choices: [
      "Geçici bellekte bekletilir",
      "Kalıcı olarak blockchain’e eklenir",
      "Silinir ve baştan üretilir",
      "Sadece yan zincire atılır",
    ],
    answer: 1,
    explain: "Onaylı blok zincire eklenir ve ağ durumu güncellenir.",
  },
  {
    // Sahne 7: Ödül/ceza
    q: "PoS’ta kötü niyetli doğrulayıcıya uygulanan cezaya ne denir?",
    choices: ["Fork", "Halving", "Slashing", "Bridging"],
    answer: 2,
    explain: "Kötü davranış slashing ile stake kesintisi/cezası alır.",
  },
  {
    // Sahne 7: Ödül/ceza
    q: "Dürüst doğrulayıcıların ekonomik teşviki nedir?",
    choices: [
      "Sadece itibar puanı",
      "İşlem ücretleri ve/veya blok ödülü",
      "Hash gücü artışı",
      "Token yakımı",
    ],
    answer: 1,
    explain: "Dürüst doğrulayıcılar ücret/ödül kazanır.",
  },
  {
    // Sahne 8: Enerji verimliliği
    q: "PoS’un PoW’a kıyasla enerji tüketimi için doğru ifade hangisidir?",
    choices: [
      "Benzer tüketir",
      "%99.9 daha fazla tüketir",
      "%99.9 daha az tüketir",
      "Sadece gece düşük tüketir",
    ],
    answer: 2,
    explain: "PoS, PoW’a kıyasla ≈%99.9 daha az enerji tüketir.",
  },
  {
    // Genel
    q: "PoS modelinde ‘tek nokta arızası’ neden daha az olasıdır?",
    choices: [
      "Tüm kararlar tek sunucuda alındığı için",
      "Dağıtık doğrulayıcı seti ve çoğunluk onayı olduğu için",
      "Sadece bir doğrulayıcı aktif olduğu için",
      "Bloklar tek cihaza yazıldığı için",
    ],
    answer: 1,
    explain:
      "Dağıtık doğrulayıcılar ve çoğunluk oylaması tekil arıza riskini azaltır.",
  },
  {
    // Seçim olasılıkları
    q: "Eşit diğer koşullarda 150 ETH stake eden bir doğrulayıcının 50 ETH stake edene göre şansı…",
    choices: [
      "Daha düşüktür",
      "Aynıdır",
      "Daha yüksektir",
      "Sadece ilk turda yüksektir",
    ],
    answer: 2,
    explain: "Stake arttıkça seçim olasılığı artar (ağırlıklandırma).",
  },
  {
    // Konsensüs eşiği
    q: "Çoğunluk onayı bağlamında aşağıdakilerden hangisi tipik bir hedefi yansıtır?",
    choices: [
      "Tek doğrulayıcı onayı",
      "Azınlık onayı",
      "Nitelikli çoğunluk/eşik (ör. ≥2/3) onayı",
      "Rastgele bir düğümün kararı",
    ],
    answer: 2,
    explain:
      "Birçok PoS varyantı, güvenlik için nitelikli çoğunluk eşiği kullanır.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen seçenek index’i

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

  // Başlık + toplam soru
  const titleEl = $id("quiz-title");
  if (titleEl) titleEl.textContent = "PoS Süreci Quiz";
  quizTotalText.textContent = String(quizData.length);

  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  // Navigasyon & aksiyonlar
  quizPrevBtn.addEventListener("click", onQuizPrev);
  quizNextBtn.addEventListener("click", onQuizNext);
  quizSubmitBtn.addEventListener("click", onQuizSubmit);
  quizRetryBtn.addEventListener("click", onQuizRetry);

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

  // Buton durumları
  quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  quizNextBtn.classList.toggle("hidden", last);
  quizSubmitBtn.classList.toggle("hidden", !last);

  // Sonuç panelini gizle (soru ekranında)
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
      testId: 16,
      score: correct,
      total: quizData.length,
      topic: "pos",
    });
  }
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap.classList.add("hidden");
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
