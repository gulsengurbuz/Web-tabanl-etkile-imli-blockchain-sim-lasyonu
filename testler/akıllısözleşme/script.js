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

const quizData = [
  {
    q: "Otomat (para→soda) benzetimi akıllı sözleşmede neyi anlatır?",
    choices: [
      "Merkezi bir otoriteye bağımlılığı",
      "Önceden tanımlı kuralların şart sağlanınca otomatik çalışmasını",
      "Elle onay gerektiren manuel süreci",
      "Zincir dışı veri depolamayı",
    ],
    answer: 1,
    explain:
      "Akıllı sözleşmeler şart sağlandığında otomatik çalışır; kimseye sormaz.",
  },
  {
    q: "Kod blockchain’e dağıtıldıktan sonra en doğru ifade hangisi?",
    choices: [
      "Sözleşme istediğimiz zaman güncellenir",
      "Kod tek bir sunucuda çalışır",
      "Kod değiştirilemez; yeni sürüm için yeni sözleşme adresi gerekir",
      "Kod kapalı kaynak olur",
    ],
    answer: 2,
    explain:
      "Zincirde kontratlar immutabledır; güncelleme yerine yeni kontrat dağıtılır.",
  },
  {
    q: "Şart → İşlem → Sonuç zinciri neyi vurgular?",
    choices: [
      "Kullanıcı arayüzünü",
      "Otomatik yürütme ve aracı gereksinimini azaltmayı",
      "Merkezi veritabanını",
      "Sadece test ağını",
    ],
    answer: 1,
    explain: "Şart gerçekleşince işlem tetiklenir ve sonuç otomatik oluşur.",
  },
  {
    q: "Kargo teslim edilince ödemenin serbest kalması hangi özelliktir?",
    choices: [
      "Şeffaf, koşula bağlı (conditional) ödeme",
      "Gizli çalışma",
      "Elle onay zorunluluğu",
      "Zincir dışı yürütme",
    ],
    answer: 0,
    explain: "Koşul gerçekleşince (teslim) ödeme otomatik ve şeffaf yapılır.",
  },
  {
    q: "Aşağıdakilerden hangisi temel faydalardan BİRİ değildir?",
    choices: ["Hız", "Güvenlik", "Otomasyon", "Mutlak geri döndürülebilirlik"],
    answer: 3,
    explain:
      "Zincirde işlemler çoğu zaman geri döndürülemez; bu ‘fayda’ sayılmaz.",
  },
  {
    q: "Akıllı sözleşmeler nerede çalışır?",
    choices: [
      "Kullanıcının tarayıcısında",
      "Blockchain üzerinde, dağıtık ağda",
      "Tek bir şirket sunucusunda",
      "Mobil cihazın RAM’inde",
    ],
    answer: 1,
    explain: "Kontrat kodu zincirde yaşar ve düğümlerce yürütülür.",
  },
  {
    q: "Kontratın ‘şeffaf’ olmasından kasıt nedir?",
    choices: [
      "Kaynak kodu görülemez",
      "İşlemler ve durum izlenebilir",
      "Sadece sahibi görebilir",
      "Log’lar otomatik silinir",
    ],
    answer: 1,
    explain: "Zincir verisi herkese açıktır; işlemler ve state izlenebilir.",
  },
  {
    q: "‘Koşul gerçekleşti → ödeme yapıldı’ akışında en az gerekli olan nedir?",
    choices: [
      "Aracı bir memur",
      "Otomatik tetikleme",
      "Koşulun kanıtı",
      "Kontrat fonksiyon çağrısı",
    ],
    answer: 0,
    explain: "Aracı ihtiyacını azaltmak zaten akıllı sözleşmenin amacıdır.",
  },
];

let quizIndex = 0;
let quizAnswers = [];

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

  renderQuiz();
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
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  quizResultWrap.classList.add("hidden");
  renderQuiz();
}

document.addEventListener("DOMContentLoaded", setupQuiz);
