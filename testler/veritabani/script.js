// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Veritabanı Temelleri (Database Fundamentals)
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: Kod yapısı korunmuş, sorular veritabanı temel konularına uyarlanmıştır.

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

// Veri seti: (scene, q, choices, answer, explain)
const quizData = [
  // TEMEL
  {
    scene: "temel",
    q: "Bir veritabanının temel amacı nedir?",
    choices: [
      "Sadece geçici verileri RAM’de tutmak",
      "Verileri kalıcı ve düzenli biçimde saklayıp hızlı/ güvenli erişim sağlamak",
      "Grafik çizmek ve rapor tasarlamak",
      "Sadece e-posta göndermek",
    ],
    answer: 1,
    explain:
      "Veritabanı; kalıcı saklama, bütünlük, eşzamanlı erişim ve hızlı sorgu için tasarlanır.",
  },

  // MODEL
  {
    scene: "model",
    q: "İlişkisel veritabanında bir ‘tablo’ en doğru nasıl tanımlanır?",
    choices: [
      "Anahtar-değer çiftlerinden oluşan sözlük",
      "Satırlar (kayıtlar/tuple) ve sütunlardan (alan/öznitelik) oluşan yapı",
      "Sadece resim dosyalarının listesi",
      "Yalnızca metin dizisi",
    ],
    answer: 1,
    explain:
      "İlişkisel modelde tablo sütun/alan şemasına göre satırları barındırır.",
  },

  // ANAHTARLAR
  {
    scene: "anahtar",
    q: "Birincil anahtar (PRIMARY KEY) için doğru ifade hangisidir?",
    choices: [
      "Tekrarlanabilir ve NULL olabilir",
      "Tablodaki her satırı benzersiz olarak tanımlar ve NULL olamaz",
      "Yalnızca metin türünde olabilir",
      "Yalnızca otomatik artan olmalıdır",
    ],
    answer: 1,
    explain:
      "PRIMARY KEY benzersiz ve NOT NULL’dur; türü ve üretim şekli tasarıma bağlıdır.",
  },
  {
    scene: "anahtar",
    q: "Yabancı anahtar (FOREIGN KEY) neyi garanti altına alır?",
    choices: [
      "Sorguların her zaman hızlı olmasını",
      "Tetikleyicilerin (trigger) çalışmasını",
      "İki tablo arasında başvuru bütünlüğünü (referential integrity)",
      "Her sütunun NOT NULL olmasını",
    ],
    answer: 2,
    explain:
      "FK, çocuk tablodaki değerlerin ebeveyn tablodaki anahtarlarla tutarlı olmasını sağlar.",
  },

  // NORMALİZASYON
  {
    scene: "normalizasyon",
    q: "1. Normal Form (1NF) hangi koşulu zorunlu kılar?",
    choices: [
      "Tabloda yalnızca bir satır olmalı",
      "Bütün bağımlılıkların anahtara tam bağımlı olması",
      "Her hücrenin atomik (tek değer) olması; tekrar eden grup/çoklu değer olmaması",
      "Tüm alanların metin olması",
    ],
    answer: 2,
    explain:
      "1NF: Tekrarlı alanlar ve çoklu değerler yerine atomik hücreler kullanılmalıdır.",
  },
  {
    scene: "normalizasyon",
    q: "3. Normal Form (3NF) ile hedeflenen nedir?",
    choices: [
      "Veriyi tek bir tabloda toplamak",
      "Geçişli bağımlılıkları kaldırarak güncelleme anomallerini azaltmak",
      "Tüm anahtarları metne çevirmek",
      "Her sorguyu denormalize etmek",
    ],
    answer: 1,
    explain:
      "3NF; anahtar olmayan alanların başka anahtar olmayan alanlara bağımlılığını elimine eder.",
  },

  // SQL
  {
    scene: "sql",
    q: "Aşağıdaki SQL ifadelerinden hangisi sözdizimi olarak doğrudur?",
    choices: [
      "SELECT Orders WHERE amount > 100 FROM *;",
      "SELECT * FROM Orders WHERE amount > 100;",
      "WHERE amount > 100 SELECT * FROM Orders;",
      "SELECT FROM Orders * amount > 100;",
    ],
    answer: 1,
    explain:
      "Doğru sıralama: SELECT … FROM … WHERE …. Diğerleri sözdizimi hatalıdır.",
  },

  // JOIN
  {
    scene: "join",
    q: "INNER JOIN, iki tablo arasında nasıl bir sonuç döndürür?",
    choices: [
      "Sadece sol tablodaki tüm satırlar",
      "Sadece sağ tablodaki tüm satırlar",
      "Eşleşen kayıtlar (her iki tabloda da eşleşmesi olanlar)",
      "Hiçbir kayıt",
    ],
    answer: 2,
    explain:
      "INNER JOIN, join koşulunu sağlayan kesişimi döndürür; eşleşmeyenler elenir.",
  },

  // İNDEKS
  {
    scene: "indeks",
    q: "İndeksler için doğru ifade hangisidir?",
    choices: [
      "Yazma maliyetini azaltır, okuma maliyetini artırır",
      "Ne okuma ne yazmayı etkiler",
      "Okuma/sorgu hızını artırabilir; ek depolama ve yazma maliyeti getirir",
      "Sadece PRIMARY KEY için kullanılabilir",
    ],
    answer: 2,
    explain:
      "İndeksler arama/filtrelemeyi hızlandırır; ek yer kaplar ve yazmalarda güncellenir.",
  },

  // ACID & İZOLASYON
  {
    scene: "acid",
    q: "ACID kısaltmasının açılımı nedir?",
    choices: [
      "Availability, Consistency, Integrity, Durability",
      "Atomicity, Consistency, Isolation, Durability",
      "Accuracy, Concurrency, Isolation, Data",
      "Atomicity, Concurrency, Index, Durability",
    ],
    answer: 1,
    explain:
      "ACID: Atomiklik, Tutarlılık, İzolasyon, Dayanıklılık — işlem güvenilirliği için temel ilkeler.",
  },
  {
    scene: "izolasyon",
    q: "Read Committed izolasyon seviyesi hangi problemi engeller?",
    choices: [
      "Dirty read (kirli okuma)",
      "Phantom read (hayalet okuma)",
      "Tüm kilitlenmeleri",
      "Her türlü yarış durumunu",
    ],
    answer: 0,
    explain:
      "Read Committed, commit edilmemiş verinin okunmasını engeller; phantom hâlâ yaşanabilir.",
  },

  // KİLİTLEME
  {
    scene: "kilitleme",
    q: "Paylaşılan (S) ve münhasır (X) kilitlerle ilgili doğru ifade hangisidir?",
    choices: [
      "S kilit yazmaya; X kilit okumaya izin verir",
      "S kilit birden fazla okuyucuya izin verir; X kilit tek yazarı ve diğer erişimleri engeller",
      "Her iki kilit de eşzamanlı yazmaya izin verir",
      "Kilitler sadece indekslerde çalışır",
    ],
    answer: 1,
    explain:
      "S kilit çoklu okumalara izin verir; X kilit, yazım sırasında diğer erişimleri bloklar.",
  },

  // NOSQL
  {
    scene: "nosql",
    q: "Aşağıdaki senaryolardan hangisi NoSQL seçimi için tipik bir gerekçedir?",
    choices: [
      "Sıkı ilişkisel bütünlük, karmaşık JOIN’ler ve güçlü ACID",
      "Esnek şema, yatay ölçek ihtiyacı ve çok yüksek yazma/okuma hacmi",
      "Sadece küçük Excel verileri",
      "Yalnızca tek kullanıcılı masaüstü uygulaması",
    ],
    answer: 1,
    explain:
      "Belge/anahtar-değer/sütun-aile/veri-akışı sistemleri esnek şema ve ölçek için tercih edilir.",
  },

  // YEDEKLEME
  {
    scene: "yedekleme",
    q: "Sağlam bir yedekleme/geri yükleme (backup/restore) stratejisi hangisine örnektir?",
    choices: [
      "Haftada bir kez tam yedek; hiç geri yükleme testi yapmamak",
      "Sadece log dosyalarını silmek",
      "Periyodik tam + sık artımlı/differential yedek ve düzenli restore testleri",
      "Yedek almadan sunucuyu yeniden başlatmak",
    ],
    answer: 2,
    explain:
      "İyi pratik: Tam + artımlı yedekler, off-site kopya ve periyodik ‘restore drill’ testleri.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soru için seçilen şık index’i

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

  if (quizTitleEl) quizTitleEl.textContent = "Veritabanı Temelleri — Mini Quiz";
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

  renderQuiz();
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
      testId: 3,
      score: correct,
      total: quizData.length,
      topic: "veritabani",
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
