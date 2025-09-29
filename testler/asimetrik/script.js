// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// İçerik: AsymmetricEncryptionAnimation (detailed/simple/technical/visual)
// Ali → Zeynep senaryosu, saldırganın başarısızlığı, RSA denklemleri, PKI ve uygulamalar

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

// 8 soru
const quizData = [
  // 1) Temel ilke
  {
    q: "Animasyondaki temel ilke nedir?",
    choices: [
      "Özel anahtar kilitler, genel anahtar açar",
      "Genel anahtar kilitler, özel anahtar açar",
      "Her iki anahtar da aynı görevi yapar",
      "Anahtarlar sadece imzalama içindir, şifreleme yoktur",
    ],
    answer: 1,
    explain:
      "“Genel anahtar kilitler, özel anahtar açar” kuralı tüm modlarda vurgulanır.",
  },

  // 2) Ali → Zeynep şifreleme
  {
    q: "Ali, Zeynep’e güvenli mesaj göndermek için hangi anahtarı kullanarak mesajı şifreler?",
    choices: [
      "Kendi özel anahtarı",
      "Kendi genel anahtarı",
      "Zeynep’in genel anahtarı",
      "Zeynep’in özel anahtarı",
    ],
    answer: 2,
    explain:
      "Ali mesajı Zeynep’in GENEL anahtarıyla kilitler; sadece Zeynep’in ÖZEL anahtarı açabilir.",
  },

  // 3) Saldırgan
  {
    q: "Şifreli mesaj ağda ele geçirilirse saldırgan ne yapamaz?",
    choices: [
      "Şifreli metni genel anahtarla çözmek",
      "Mesajı daha fazla şifrelemek",
      "Mesajın gönderildiğini fark etmek",
      "Mesajı yeniden yönlendirmek",
    ],
    answer: 0,
    explain: "Genel anahtarla şifre çözülmez; özel anahtar gerekir.",
  },

  // 4) Zeynep tarafı
  {
    q: "Mesaj Zeynep’e ulaştığında, mesajı hangi anahtarla açar?",
    choices: [
      "Zeynep’in genel anahtarı",
      "Zeynep’in özel anahtarı",
      "Ali’nin özel anahtarı",
      "Ağın ortak anahtarı",
    ],
    answer: 1,
    explain:
      "Şifre çözme (decryption) yalnızca alıcının ÖZEL anahtarıyla yapılır.",
  },

  // 5) RSA — Şifreleme formülü
  {
    q: "Teknik anlatıma göre RSA şifreleme işlemi hangi ifade ile verilir?",
    choices: [
      "C = M^d mod n",
      "M = C^e mod n",
      "C = M^e mod n",
      "M = C^n mod e",
    ],
    answer: 2,
    explain: "Şifreleme: C = M^e mod n (public key: e,n).",
  },

  // 6) RSA — Deşifreleme formülü
  {
    q: "RSA’de şifre çözme işlemi hangi ifade ile verilir?",
    choices: [
      "C = M^e mod n",
      "M = C^d mod n",
      "M = C^e mod n",
      "C = M^d mod e",
    ],
    answer: 1,
    explain: "Decryption: M = C^d mod n (private key: d,n).",
  },

  // 7) PKI
  {
    q: "PKI’nin (Public Key Infrastructure) temel amacı aşağıdakilerden hangisidir?",
    choices: [
      "Özel anahtarları herkese duyurmak",
      "Genel anahtar dağıtımı, sertifikalar ve güven zinciri sağlamak",
      "Tüm iletişimi tek anahtarla yapmak",
      "Şifrelemeyi devre dışı bırakmak",
    ],
    answer: 1,
    explain:
      "PKI; sertifika otoriteleri ve trust chain ile genel anahtarların güvenilirliğini sağlar.",
  },

  // 8) Uygulamalar ve gelecek
  {
    q: "Animasyonda geçen uygulama/gelecek vurgularından hangisi DOĞRUDUR?",
    choices: [
      "Asimetrik şifreleme sadece e-posta için kullanılır",
      "TLS/SSL, PGP, SSH gibi protokollerde kullanılır; kuantum sonrası kriptoya geçiş gündemdedir",
      "Hiçbir modern sistem asimetrik şifreleme kullanmaz",
      "Genel anahtarlar gizli tutulmalıdır",
    ],
    answer: 1,
    explain:
      "TLS/SSL, PGP, SSH yaygın örneklerdir; post-quantum kriptografi de teknikte anılır.",
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
      testId: 19,
      score: correct,
      total: quizData.length,
      topic: "ozel-Blockchain",
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
