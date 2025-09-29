// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Blockchain Uygulamaları
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
    q: "Blockchain yalnızca kripto para mıdır?",
    choices: [
      "Evet, yalnızca kripto paralar için kullanılır",
      "Hayır, birçok sektörde güvenli/şeffaf çözümler sunar",
      "Sadece borsalar ve bankalar için geçerlidir",
      "Yalnızca özel şirket içi kayıtlar için uygundur",
    ],
    answer: 1,
    explain:
      "Sahne 1’e göre finans, sağlık, lojistik, seçim, sanat vb. alanlarda kullanılır.",
  },
  {
    q: "Sınır ötesi ödemelerde blockchain’in en belirgin avantajı nedir?",
    choices: [
      "Daha fazla aracı gerektirmesi",
      "Hızı ve düşük maliyetli eşler arası aktarım",
      "Yalnızca mesai saatlerinde çalışması",
      "İşlem izlenebilirliğinin olmaması",
    ],
    answer: 1,
    explain: "Sahne 2: Eşler arası, hızlı onay ve düşük maliyet vurgulanır.",
  },
  {
    q: "Sağlık verilerinde erişim nasıl olmalıdır?",
    choices: [
      "Tamamen herkese açık",
      "Sadece sigorta şirketlerine açık",
      "Hasta izni/ yetkisiyle sınırlı erişim",
      "Sadece cihaz üreticilerine açık",
    ],
    answer: 2,
    explain:
      "Sahne 3: ‘Erişim hasta izni ile verilir’ ve erişimler kaydedilir.",
  },
  {
    q: "Tedarik zinciri örneğinde her aşama neyi temsil eder?",
    choices: [
      "Rastgele log kayıtlarını",
      "Tek bir merkezde tutulan tabloyu",
      "Yeni bir blok kaydını",
      "Sadece QR kodlarını",
    ],
    answer: 2,
    explain: "Sahne 4: ‘Her aşama yeni bir blok kaydıdır’ deniyor.",
  },
  {
    q: "Blockchain tabanlı oylamada ‘anonim ama doğrulanabilir’ ifadesi neyi anlatır?",
    choices: [
      "Oy verenin kimliği herkese görünür",
      "Oylar değiştirilebilir, ama kimse görmez",
      "Oy gizliliği korunur, sonuçlar herkesçe doğrulanabilir",
      "Sadece tek bir kurum sonucu görebilir",
    ],
    answer: 2,
    explain:
      "Sahne 5: Anonimlik + herkese açık doğrulama ve değiştirilemez kayıt.",
  },
  {
    q: "NFT’nin ‘kopya ≠ sahiplik’ mesajı neyi vurgular?",
    choices: [
      "Kopya dosyayı indirmek sahiplik verir",
      "Sahiplik, zincirdeki benzersiz token kimliğiyle kanıtlanır",
      "Her kopya ayrı bir sahiplik doğurur",
      "NFT yalnızca telifsiz eserlerde kullanılır",
    ],
    answer: 1,
    explain:
      "Sahne 6: TokenID benzersiz kimliktir; kopyalamak sahiplik sağlamaz.",
  },
  {
    q: "Blockchain işlem maliyetini etkileyen unsurlardan biri hangisidir?",
    choices: [
      "Kur dalgası",
      "Ağ yoğunluğu ve gas ücreti",
      "Cihaz ekran boyutu",
      "Dosya biçimi",
    ],
    answer: 1,
    explain: "Sahne 2 tooltip: ‘Maliyet = ağ yoğunluğu + gas ücreti’.",
  },
  {
    q: "Sağlık verisi erişimlerinde ‘kim, ne zaman, neye erişti’ bilgisinin tutulması ne sağlar?",
    choices: [
      "Sadece depolama alanını artırır",
      "Gizliliği azaltır",
      "Denetlenebilirlik ve güven",
      "Oylama hızını artırır",
    ],
    answer: 2,
    explain: "Sahne 3 tooltip: Erişim kayıtları denetim ve güveni artırır.",
  },
  {
    q: "Tedarik zinciri senaryosunda şeffaflık neden artar?",
    choices: [
      "Kayıtlar sadece tek elde tutulduğundan",
      "Kayıtların herkese kapalı olmasından",
      "Aşamaların zincirde değiştirilemez şekilde tutulmasından",
      "Verilerin periyodik olarak silinmesinden",
    ],
    answer: 2,
    explain: "Sahne 4: Aşamalar zincirde değiştirilemez ve doğrulanabilir.",
  },
  {
    q: "Genel mesaj: Kendi alanınızda blockchain ile ne geliştirilebilir?",
    choices: [
      "Şeffaflık, otomasyon ve izlenebilirlik",
      "Yalnızca maliyet artışı",
      "Veri erişimini tamamen kapatma",
      "Tek kurum bağımlılığını artırma",
    ],
    answer: 0,
    explain: "Sahne 7: ‘Açık doğrulama • Otomasyon • İzlenebilirlik’.",
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

  // İlerleme & progress bar
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
      testId: 25,
      score: correct,
      total: quizData.length,
      topic: "Blockchain-kullanım-alanlari",
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
