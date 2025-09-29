// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Merkezi Ağ (Client–Server)
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
    q: "Merkezi ağ mimarisi temel olarak hangi modele dayanır?",
    choices: [
      "P2P (eşler arası)",
      "Client–Server (istemci–sunucu)",
      "Mesh (örgü)",
      "Ring (halka)",
    ],
    answer: 1,
    explain:
      "Merkezi ağda tüm istekler bir sunucu(lar) üzerinde toplanır: client–server.",
  },
  {
    q: "Merkezi yapılarda “tekil hata noktası (SPOF)” ifadesi neyi anlatır?",
    choices: [
      "Yedekli sistemlerde küçük bir risk",
      "Ağın her düğümünün aynı anda çökmesi",
      "Merkezin çökmesi durumunda tüm hizmetin durabilmesi",
      "Sadece istemcilerin etkilenmesi",
    ],
    answer: 2,
    explain:
      "Merkez çökerse bağlantılar kopar; hizmet genelde kullanılamaz olur.",
  },
  {
    q: "Aşağıdakilerden hangisi merkezi mimarinin olası avantajıdır?",
    choices: [
      "Konfigürasyonun tek noktadan yönetilmesi",
      "Yük asla artmaz",
      "Gecikme her zaman daha düşüktür",
      "İstemciler arası direkt paylaşım zorunludur",
    ],
    answer: 0,
    explain:
      "Merkezde politika, güvenlik ve konfigürasyon yönetimi kolaylaşabilir.",
  },
  {
    q: "Merkezi ağda tipik bir darboğaz hangi bileşende oluşur?",
    choices: [
      "İstemci RAM’i",
      "İstemci disk alanı",
      "Sunucu ve onun ağı",
      "DNS önbelleği",
    ],
    answer: 2,
    explain:
      "Tüm trafik sunucu(lar)a akar; CPU/IO/bant genişliği darboğazı yaşanabilir.",
  },
  {
    q: "Aşağıdakilerden hangisi merkezi ağda ölçeklenebilirliği artırmak için kullanılan bir yöntemdir?",
    choices: [
      "Daha çok istemci açmak",
      "Sunucuyu tek çekirdeğe indirmek",
      "Yatay ölçekleme + yük dengeleme (load balancer)",
      "DNS’i kapatmak",
    ],
    answer: 2,
    explain:
      "Birden fazla sunucuyu araya load balancer koyarak ölçeklendirmek yaygındır.",
  },
  {
    q: "Merkezi mimaride güvenlik duvarı ve WAF (Web Application Firewall) gibi kontroller genelde nereye konumlanır?",
    choices: [
      "İstemcilerin tarayıcı eklentilerine",
      "Sunucu tarafındaki giriş/kenar katmanına",
      "Kullanıcının işletim sistemine",
      "Rastgele ara düğümlere",
    ],
    answer: 1,
    explain:
      "Merkez/edge tarafında tek noktadan trafik kontrolü ve denetim sağlanır.",
  },
  {
    q: "İstemciden sunucuya giden istek–cevap akışını en iyi hangisi açıklar?",
    choices: [
      "İstemci veri yayınlar, sunucu dinler ve asla cevap vermez",
      "Sunucu istek atar, istemci yanıtlar",
      "İstemci istek gönderir, sunucu işler ve cevap döndürür",
      "İkisi de hiçbir zaman durum bilgisi tutmaz",
    ],
    answer: 2,
    explain:
      "HTTP/HTTPS gibi protokollerde istek istemciden gelir; cevap sunucudan döner.",
  },
  {
    q: "Merkezi ağlarda yüksek erişilebilirlik (HA) sağlamak için ne yapılır?",
    choices: [
      "Sunucuyu tek datacentera sabitlemek",
      "Aktif–pasif/aktif–aktif yedekli sunucular ve otomatik failover",
      "Tüm yedekleri istemcilere yüklemek",
      "DNS’i tek bir IP’ye bağlamak",
    ],
    answer: 1,
    explain:
      "Yedekli düğümler + sağlık kontrolleri + failover mekanizmaları kritik önemdedir.",
  },
  {
    q: "CDN (İçerik Dağıtım Ağı) merkezi uygulamalarda neyi iyileştirir?",
    choices: [
      "Sunucu tarafı veritabanı kilitlemesini",
      "İstemcilerin CPU sıcaklığını",
      "Statik içerik teslim süresini ve gecikmeyi",
      "E-posta spam’ini",
    ],
    answer: 2,
    explain:
      "Statik dosyalar coğrafi olarak dağıtılır; uçtan teslim edilerek gecikme azalır.",
  },
  {
    q: "Merkezi veri tabanı ile ilgili doğru ifade hangisidir?",
    choices: [
      "Her istemci kendi verisini farklı şemalarda tutar",
      "Tutarlılık kuralları merkezde uygulanabildiği için veri bütünlüğü yönetimi kolaylaşabilir",
      "Replikasyon yasaktır",
      "Sadece XML dosyaları kabul eder",
    ],
    answer: 1,
    explain:
      "Merkezde şema/iş kuralları uygulanarak tutarlılık sağlanabilir (tek yerden yönetim).",
  },
  {
    q: "Aşağıdakilerden hangisi merkezi mimaride risk azaltma yaklaşımıdır?",
    choices: [
      "Tek sunucu ile tüm yükü karşılamak",
      "Yedekli güç, ağ, sunucu ve izleme (monitoring) kurmak",
      "Güncellemeleri durdurmak",
      "Yalnızca HTTP kullanmak",
    ],
    answer: 1,
    explain: "Çoklu katmanda yedeklilik + izleme, arıza etkisini azaltır.",
  },
  {
    q: "Merkezi ağda istemci–sunucu arasındaki iletişim hangi protokolle tipik olarak şifrelenir?",
    choices: ["FTP", "HTTP (şifresiz)", "HTTPS/TLS", "Telnet"],
    answer: 2,
    explain:
      "HTTPS/TLS ile aktarım sırasında veri şifrelenir ve bütünlük sağlanır.",
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
      testId: 4,
      score: correct,
      total: quizData.length,
      topic: "merkezi",
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
