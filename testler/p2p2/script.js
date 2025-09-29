// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: P2P Ağ ve Dağıtık Konsensüs
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

// Soru seti — orijinal içerik korunmuştur
const quizData = [
  {
    q: "P2P ağının temel özelliği nedir?",
    choices: [
      "Tüm iletişimin tek merkezden geçmesi",
      "Düğümlerin birbirleriyle doğrudan iletişim kurabilmesi",
      "Sadece sunucu–istemci mimarisiyle çalışması",
      "Bağlantı kopunca ağın tamamen durması",
    ],
    answer: 1,
    explain:
      "Kodda düğümler (Alice, Bob, vb.) doğrudan bağlanır; merkezi otorite yoktur.",
  },
  {
    q: "Başlangıç sahnesinde düğümler nasıl yerleştiriliyor?",
    choices: [
      "Rastgele piksel konumlarına",
      "Izgara üstüne sabit hücrelere",
      "Tuval merkezli dairesel düzenle",
      "Sadece sol üst köşeye",
    ],
    answer: 2,
    explain:
      "calculateNodePositions() dairesel yerleşim yapar (merkez ve yarıçapla).",
  },
  {
    q: "Animasyonda ‘B10’ etiketi neyi temsil ediyor?",
    choices: [
      "Geçersiz bir işlem kodunu",
      "Merkezi sunucu IP’sini",
      "Alice tarafından üretilen veri bloğunu",
      "Ağın zorluk hedefini",
    ],
    answer: 2,
    explain:
      "İkinci adımda Alice düğümü ‘B10’ veri bloğunu üretir ve etiketlenir.",
  },
  {
    q: "‘Veri dağıtımı’ sahnesinde düğümlerde görülen ✓ işareti ne anlama gelir?",
    choices: [
      "Düğüm çevrimdışı",
      "Düğüme veri kopyası başarıyla ulaştı",
      "Bağlantı kopuk",
      "Oylama reddedildi",
    ],
    answer: 1,
    explain:
      "Her kopya ulaştığında düğüm ‘✓’ ile işaretlenir ve partikül efekti tetiklenir.",
  },
  {
    q: "Oylama sahnesinde Transaction A ve B için onay oranları nasıl modellenmiş?",
    choices: [
      "A %30 onay, B %70 onay",
      "A %70 onay, B %30 onay",
      "İkisi de %50 onay",
      "Oranlar sabit değil, tamamen rastgele",
    ],
    answer: 1,
    explain:
      "Kodda i%10<7 → ✓ (yaklaşık %70) Transaction A; i%10<3 → ✓ (yaklaşık %30) Transaction B.",
  },
  {
    q: "Mutabakat sonucunda hangi işlem zincire eklenir?",
    choices: [
      "Transaction B (B100)",
      "Her iki işlem de",
      "Hiçbiri",
      "Transaction A (B10)",
    ],
    answer: 3,
    explain: "Çoğunluk (≈%70) alan Transaction A kabul edilir; B reddedilir.",
  },
  {
    q: "Charlie arızalandığında ağda hangi davranış gözlenir?",
    choices: [
      "Tüm ağ durur (tek nokta arızası)",
      "Yalnızca Alice ve Bob çevrimdışı olur, diğerleri de durur",
      "Alternatif yollar aranır ve ağ çalışmaya devam eder",
      "Veri kalıcı olarak silinir",
    ],
    answer: 2,
    explain:
      "P2P’nin dayanıklılığı gösterilir; yeni rota bulunarak iletişim sürer.",
  },
  {
    q: "Alice–Bob arasındaki ana bağlantı koptuğunda hangi alternatif yol seçilir?",
    choices: [
      "Alice → Eve → Bob",
      "Alice → Dave → Bob",
      "Alice → Charlie → Bob",
      "Alice → Frank → Bob",
    ],
    answer: 1,
    explain:
      "Senaryoda alternatif rota olarak Alice → Dave → Bob etkinleştirilir.",
  },
  {
    q: "Bağlantıların çizim ve canlandırmasında hangi teknik kullanılıyor?",
    choices: [
      "CSS Grid layout animasyonu",
      "SVG path morphing",
      "Canvas 2D çizimi ve GSAP ile dashOffset animasyonu",
      "WebGL shader’ları",
    ],
    answer: 2,
    explain:
      "Bağlantılar canvas’ta çizilir; GSAP ile lineDashOffset benzeri etki verilir.",
  },
  {
    q: "Senaryo adımları arasındaki geçişi hangi yapı yönetir?",
    choices: [
      "Rastgele zamanlayıcılar",
      "setInterval zinciri",
      "GSAP timeline ve modal onay akışı",
      "Sadece CSS animasyonları",
    ],
    answer: 2,
    explain:
      "Her adım modal açıklama + GSAP timeline ile akıp bir sonrakine ‘then’ ile geçer.",
  },
  {
    q: "P2P ağlar neden merkezi yapılara göre daha dayanıklıdır?",
    choices: [
      "Tüm kararlar tek merkezde alındığı için",
      "Tek bir arıza noktası olmadığı için",
      "İstemciler sunucuya bağımlı olduğu için",
      "Veri tek kopya halinde saklandığı için",
    ],
    answer: 1,
    explain:
      "Bir düğüm/hat koptuğunda alternatif yollarla iletişim sürer (self-healing).",
  },
  {
    q: "Kodda düğümlerin ve veri bloklarının zaman içindeki hareket/efektleri nasıl uygulanıyor?",
    choices: [
      "Sadece requestAnimationFrame ile manuel tween",
      "GSAP timeline/tween’leriyle (scale, color, opacity vb.)",
      "CSS transition ile",
      "Hiçbiri, statik görüntü",
    ],
    answer: 1,
    explain:
      "GSAP; düğüm rengi/ölçeği, objelerin koordinatları ve saydamlığı üzerinde tween’ler yapar.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // seçilen seçenek index’i

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

  // Başlık ve toplam
  const titleEl = $id("quiz-title");
  if (titleEl) titleEl.textContent = "P2P Ağı Quiz";
  quizTotalText.textContent = String(quizData.length);

  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  // Olaylar
  quizPrevBtn.addEventListener("click", onQuizPrev);
  quizNextBtn.addEventListener("click", onQuizNext);
  quizSubmitBtn.addEventListener("click", onQuizSubmit);
  quizRetryBtn.addEventListener("click", onQuizRetry);

  // Klavye ile hızlı seçim (1–4)
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

  renderQuiz();
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
      testId: 6,
      score: correct,
      total: quizData.length,
      topic: "p2p",
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
