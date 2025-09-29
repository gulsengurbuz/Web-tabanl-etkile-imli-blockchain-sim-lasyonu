// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Merkeziyetsiz Ağ (Decentralized / Multi-Center)
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
    q: "Merkeziyetsiz mimarinin temel faydalarından ikisi hangisidir?",
    choices: [
      "Tek nokta kontrolü ve merkezi yönetim",
      "Yük paylaşımı ve hata toleransı",
      "Zorunlu tek merkez ve düşük erişilebilirlik",
      "Sadece istemci tarafı ölçekleme",
    ],
    answer: 1,
    explain: "Sahne 1: Birden fazla merkez → yük paylaşımı + hata toleransı.",
  },
  {
    q: "Merkeziyetsiz yapıda her merkez için doğru ifade hangisidir?",
    choices: [
      "Hepsi tek bir merkez olmadan çalışamaz",
      "Bağımsız çalışır ve kendi yükünü üstlenir",
      "Sadece okuma yapar, yazamaz",
      "Yalnızca yedek bekleme modundadır",
    ],
    answer: 1,
    explain: "Sahne 1: Merkezler bağımsız çalışır.",
  },
  {
    q: "Sistem optimal performansta çalışırken veri alışverişi nasıl gerçekleşir?",
    choices: [
      "Tüm veri önce tek bir merkeze taşınır",
      "Her merkez sadece başka merkezlerle konuşur, cihazlarla konuşmaz",
      "Her merkez kendi cihazlarıyla aktif veri alışverişi yapar",
      "Cihazlar yalnızca birbirleriyle konuşur, merkez yoktur",
    ],
    answer: 2,
    explain:
      "Sahne 2: Her merkez kendi bağlı cihazlarıyla veri alışverişi yapar.",
  },
  {
    q: "Aşağıdakilerden hangisi merkeziyetsiz veri akışına uygun değildir?",
    choices: [
      "Yerel merkez–cihaz iletişimi",
      "Tüm trafik zorunlu tek bir merkezden geçmek zorunda",
      "Dağıtık iletişim",
      "Paralel işlem",
    ],
    answer: 1,
    explain: "Sahne 2: Zorunlu tek merkez akışı merkezi yapılara özgüdür.",
  },
  {
    q: "Bir merkez arızalandığında sistemin genel davranışı nasıldır?",
    choices: [
      "Tüm sistem durur",
      "Sadece arızalı merkeze bağlı kısım etkilenir, diğer merkezler çalışır",
      "Diğer merkezler de otomatik kapanır",
      "Tüm veriler kaybolur",
    ],
    answer: 1,
    explain: "Sahne 3: Kısmi arıza; diğer merkezler çalışmaya devam eder.",
  },
  {
    q: "Kısmi arıza durumunda hangi sınıf/etiket durumu en iyi açıklar?",
    choices: [
      "active → tüm hatlar etkin",
      "failed/inactive → yalnızca ilgili merkez ve hatlar etkilenir",
      "global-down → tüm hatlar kapanır",
      "resync-all → her şey sıfırlanır",
    ],
    answer: 1,
    explain:
      "Sahne 3: Arızalı merkez/bağlı cihaz ve hatlar etkilenir; diğerleri aktiftir.",
  },
  {
    q: "Merkeziyetsiz mimari neden kritik uygulamalar için uygundur?",
    choices: [
      "Tek ilkel yük dengeleme sağlar",
      "Erişilebilirlik düşüktür",
      "Tekil hata noktası bulunmadığından erişilebilirlik yüksektir",
      "Tüm iş yükünü tek merkezde toplar",
    ],
    answer: 2,
    explain: "Sahne 4: Tek nokta arızası yok → yüksek erişilebilirlik.",
  },
  {
    q: "Merkeziyetsiz mimaride ölçeklendirme için doğru yaklaşım hangisidir?",
    choices: [
      "Merkez sayısını artırıp yükü dağıtmak (yatay ölçekleme)",
      "Tek merkezi büyütmek (dikey ölçekleme) tek seçenektir",
      "İstemci sayısını azaltmak",
      "Ağın tamamını tek bir veri merkezine taşımak",
    ],
    answer: 0,
    explain:
      "Dağıtık merkezlerle yatay ölçekleme, yükü yayar ve dayanıklılığı artırır.",
  },
  {
    q: "Merkeziyetsiz mimaride gözetim/izleme açısından doğru ifade hangisidir?",
    choices: [
      "Sadece tek bir bileşenin izlenmesi yeterlidir",
      "Parça/merkez bazında durum ve hataların izlenmesi önemlidir",
      "İzleme gerekmez",
      "Cihazlar hiç etkilenmediği için cihaz izleme anlamsızdır",
    ],
    answer: 1,
    explain:
      "Dağıtık parçalarda kısmi arızaları yakalamak için merkez/hat/cihaz bazında izleme gerekir.",
  },
  {
    q: "Aşağıdakilerden hangisi merkeziyetsiz yapının merkezi yapıya göre ayırt edici özelliğidir?",
    choices: [
      "Tüm trafiğin tek düğümden geçmesi",
      "Kısmi arızalara karşı dayanıklılık (başka merkezler çalışır)",
      "Yönetimin sadece tek noktadan yapılması",
      "Zorunlu tek veritabanı",
    ],
    answer: 1,
    explain:
      "Kısmi arızada sistemin bütünü değil, yalnızca ilgili kısım etkilenir.",
  },
  {
    q: "Yerelleştirilmiş merkez–cihaz iletişimi gecikmeyi nasıl etkiler?",
    choices: [
      "Genellikle azaltır, çünkü yol kısalır",
      "Her zaman artırır",
      "Hiçbir etkisi yoktur",
      "Sadece veri kaybını artırır",
    ],
    answer: 0,
    explain:
      "Yakındaki merkezle iletişim kurmak çoğu senaryoda gecikmeyi düşürür.",
  },
  {
    q: "Merkeziyetsiz sistemlerin ‘tek nokta arızası yoktur’ ifadesi hangi sonucu doğurur?",
    choices: [
      "Tek bir hata tüm sistemi durdurur",
      "Erişilebilirlik ve süreklilik artar",
      "Yük dengeleme yapılamaz",
      "Arıza tespiti imkansızdır",
    ],
    answer: 1,
    explain: "Tek bir düğümün çökmesi geneli durdurmaz; süreklilik artar.",
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
      testId: 5,
      score: correct,
      total: quizData.length,
      topic: "merkeziyetsiz",
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
