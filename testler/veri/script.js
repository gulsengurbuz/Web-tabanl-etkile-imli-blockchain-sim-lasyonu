// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Veri Temelleri
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
  // S0 — Veri Nedir?
  {
    q: "Sahne 0’a göre ‘veri’ en iyi hangi ifadeyle tanımlanır?",
    choices: [
      "Sadece sayılardan oluşan kayıtlar",
      "Olayların sayı, metin, görüntü ve sinyallerle temsil edilen kayıtları",
      "Sadece görüntü ve ses dosyaları",
      "Sadece veritabanındaki tablolar",
    ],
    answer: 1,
    explain: "Veri; sayı, metin, görüntü ve sinyallerle olayların kaydıdır.",
  },
  {
    q: "Veriyi ‘bilgi’ye dönüştüren temel adım nedir?",
    choices: [
      "Boyutunu küçültmek",
      "Toplam miktarını artırmak",
      "Yorumlanabilir hâle getirecek şekilde düzenlemek",
      "Rastgele karıştırmak",
    ],
    answer: 2,
    explain:
      "Ham veriyi düzenlemek/işlemek yorumlanabilirliği ve anlamı sağlar.",
  },

  // S1 — Kaynaklar Akışı
  {
    q: "Sahne 1’de veri akışının tipik kaynakları arasında hangileri vardır?",
    choices: [
      "Sadece insanlar",
      "Sadece uygulamalar",
      "İnsanlar, cihazlar ve uygulamalar",
      "Sadece veritabanları",
    ],
    answer: 2,
    explain:
      "Veri; insanlar, cihazlar (sensörler) ve uygulamalardan sürekli akar.",
  },
  {
    q: "Sürekli veri akışını yönetirken ilk odak genelde hangisi olmalıdır?",
    choices: [
      "Görselleştirme kütüphanesi seçmek",
      "Toplama, kuyruklama ve ölçeklenebilir alım (ingestion) tasarımı",
      "Renk paleti belirlemek",
      "Sunucu loglarını tamamen silmek",
    ],
    answer: 1,
    explain:
      "Akışın sürekliliği için sağlam ingestion ve kuyruklama kritik önemdedir.",
  },

  // S2 — Ham → Düzenli
  {
    q: "Sahne 2’de ham veriyi düzenli hâle getirmenin ilk kazanımı nedir?",
    choices: [
      "Depolama maliyeti artar",
      "Yorumlanabilirlik ve analiz kolaylığı artar",
      "Gizlilik otomatik sağlanır",
      "Veri miktarı aynı kalır ama erişim zorlaşır",
    ],
    answer: 1,
    explain: "Temizlenip düzenlenen veriler daha hızlı ve doğru analiz edilir.",
  },
  {
    q: "Ham veriyi düzenli veriye dönüştürmede tipik bir adım değildir:",
    choices: ["Temizleme", "Şemaya oturtma", "Özetleme", "Şifre çözme"],
    answer: 3,
    explain:
      "Dönüşüm; temizleme, şema eşleme, birleştirme/özetleme içerir. Şifre çözme zorunlu değildir.",
  },

  // S3 — Yapı Türleri
  {
    q: "Sahne 3’e göre JSON/CSV gibi formatlar hangi sınıfa girer?",
    choices: ["Yapılı", "Yapısız", "Yarı yapılı", "Zaman serisi"],
    answer: 2,
    explain:
      "JSON/CSV yarı yapılıdır: belirli bir biçim/etiketleme vardır ama tam şema katı değildir.",
  },
  {
    q: "Aşağıdakilerden hangisi ‘yapısız’ veriye örnektir?",
    choices: [
      "SQL tablosu",
      "PDF dokümanı ve fotoğraf",
      "Anahtar-değer deposu",
      "İlişkisel şema",
    ],
    answer: 1,
    explain:
      "Belgeler, görseller, videolar çoğunlukla yapısız veri sınıfındadır.",
  },

  // S4 — Veri Kalitesi
  {
    q: "Sahne 4’te vurgulanan veri kalitesi boyutlarından biri DEĞİLDİR:",
    choices: ["Doğruluk", "Tamlık", "Tutarlılık", "Şifrelenebilirlik"],
    answer: 3,
    explain:
      "Kalite boyutları: doğru, tam, tutarlı, zamanında. ‘Şifrelenebilirlik’ kalite metriği değildir.",
  },
  {
    q: "Zamanlılık metriğinin asıl amacı nedir?",
    choices: [
      "Verinin gizliliğini sağlamak",
      "Verinin güncel/işe yarar zaman aralığında olması",
      "Veri boyutunu küçültmek",
      "Veriyi saklama süresini sonsuza uzatmak",
    ],
    answer: 1,
    explain:
      "Zamanlılık, verinin güncel ve karar anında hazır olmasını hedefler.",
  },

  // S5 — Kayıt Anı
  {
    q: "Sahne 5’e göre kayda ‘zaman damgası’ ve ‘kaynak’ eklemek ne sağlar?",
    choices: [
      "Gizliliği otomatik sağlar",
      "İzlenebilirlik ve denetlenebilirlik",
      "Depolama maliyetini düşürür",
      "Görselleştirme kalitesini artırır",
    ],
    answer: 1,
    explain:
      "Zaman ve kaynağı kaydetmek veri soy kütüğü (lineage) ve denetimi kolaylaştırır.",
  },
  {
    q: "Sensör verisi kaydında doğru uygulama hangisidir?",
    choices: [
      "Rastgele saat ile yazmak",
      "Kaynak kimliğini ve tam zamanı kaydetmek",
      "Sadece değeri yazmak",
      "Zaman bilgisini sonradan tahmin etmek",
    ],
    answer: 1,
    explain: "Kaynak ID + kesin zaman damgası = tutarlılık ve izlenebilirlik.",
  },

  // S6 — Saklama Seçenekleri
  {
    q: "Sahne 6’daki seçeneklerden hangisi hızlı ilişkisel sorgular için uygundur?",
    choices: [
      "Düz dosya",
      "İlişkisel veritabanı",
      "Sadece bulut nesne depolama",
      "CDN önbelleği",
    ],
    answer: 1,
    explain:
      "İlişkisel veritabanları (RDBMS) ilişkisel sorgular için optimize edilmiştir.",
  },
  {
    q: "Aşırı büyüyen ham veri ve arşivler için tipik tercih nedir?",
    choices: [
      "Yerel metin dosyası",
      "Bulut nesne depolama",
      "Satır içi JSON sütunu",
      "Belge yazılımı",
    ],
    answer: 1,
    explain:
      "Bulut nesne depoları (S3 vb.) düşük maliyetli, ölçeklenebilir saklama sunar.",
  },

  // S7 — Gizlilik & Güvenlik
  {
    q: "Sahne 7’de gizlilik için uygun olmayan seçenek hangisidir?",
    choices: [
      "Anonimleştirme",
      "Yetkilendirme",
      "Şifreleme",
      "Her veriyi herkese açık yapmak",
    ],
    answer: 3,
    explain:
      "Herkese açık yapmak gizliliğe aykırıdır; diğerleri gizlilik/güvenlik önlemidir.",
  },
  {
    q: "Kişisel veriler için en iyi uygulama üçlüsü hangi seçenekte doğru verilmiştir?",
    choices: [
      "Maskelle, erişimi kısıtla, şifrele",
      "Aç, indir, paylaş",
      "Sadece hashle",
      "Yalnızca lokalde sakla",
    ],
    answer: 0,
    explain:
      "Anonimleştirme/maskleme + yetkilendirme + şifreleme: temel güvenlik üçlüsü.",
  },

  // S8 — Dönüşüm → Görselleştirme
  {
    q: "Sahne 8’e göre dönüşüm adımlarının genel amacı nedir?",
    choices: [
      "Veriyi büyütmek",
      "Daha az anlaşılır yapmak",
      "İçgörü üretmek ve kararları desteklemek",
      "Yalnızca görseli güzelleştirmek",
    ],
    answer: 2,
    explain: "Dönüşüm→görselleştirme zinciri içgörü ve karar desteği içindir.",
  },
  {
    q: "Görselleştirme sonrası iyi bir çıktı örneği hangisidir?",
    choices: [
      "Sunum dosyasının boyutu",
      "Renk sayısı",
      "İş metriğinde artış trendi gibi yorumlanabilir içgörüler",
      "Yalnızca eksen etiketleri",
    ],
    answer: 2,
    explain:
      "Görselleştirmenin değeri, karar verebilir içgörü üretmesidir (ör. artış trendi).",
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
  if (titleEl) titleEl.textContent = "Veri Temelleri — Bilgini Test Et";
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
      testId: 1,
      score: correct,
      total: quizData.length,
      topic: "veri",
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
