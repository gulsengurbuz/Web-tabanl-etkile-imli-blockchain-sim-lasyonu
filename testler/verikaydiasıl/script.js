// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Veri Kaydı Süreci (DataRecordingAnimation)
// — İSTENEN YAPIYA DÖNÜŞTÜRÜLDÜ —
// Not: Soru/cevap/açıklama içerikleri aynen korunmuştur.

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

// Orijinal içerik -> yeni veri yapısı (choices/answer/explain)
const quizData = [
  // intro
  {
    scene: "intro",
    q: "“Veri kaydı”nın özünde hangi üç unsur birlikte not edilir?",
    choices: [
      "Veri değeri, zaman damgası ve kaynağı",
      "Sadece veri değeri",
      "Sunucu adı, IP ve port",
      "Kullanıcı adı, parola, token",
    ],
    answer: 0,
    explain:
      "Sahnede vurgulandığı gibi değer + zaman + kaynak birlikte kaydedilir.",
  },
  // source
  {
    scene: "source",
    q: "Kayıttan önce ‘kaynak görünümü’nün amacı nedir?",
    choices: [
      "Veriyi otomatik şifrelemek",
      "Verinin hangi sensör/form/log’dan geldiğini netleştirmek",
      "Veriyi tabloya dönüştürmek",
      "Veriyi sıkıştırmak",
    ],
    answer: 1,
    explain: "Kaynak belliyse izlenebilirlik ve denetim kolaylaşır.",
  },
  // capture
  {
    scene: "capture",
    q: "“Değerin yakalanması” adımı en iyi nasıl özetlenir?",
    choices: [
      "Değeri rastgele üretir",
      "Değeri dondurup o ana ait hâliyle kayda hazırlar",
      "Değeri saklamadan önce siler",
      "Değeri JSON’a çevirir",
    ],
    answer: 1,
    explain: "Kaydet butonuna basılan an, ölçümün dondurulduğu andır.",
  },
  // timestamp
  {
    scene: "timestamp",
    q: "Zaman damgası neden zorunlu kabul edilir?",
    choices: [
      "Görselleştirme için renk seçmek zorunludur",
      "Kayıtların kronolojik izlenmesi ve sorgulanması için",
      "Depolama maliyetini düşürdüğü için",
      "Veri tipini otomatik tahmin ettiği için",
    ],
    answer: 1,
    explain: "Zaman, kayıtların sıralanması ve denetlenebilmesi için kilittir.",
  },
  // metadata
  {
    scene: "metadata",
    q: "Metaveride ‘benzersiz kimlik (UUID)’ ne işe yarar?",
    choices: [
      "Sadece şifrelemeyi hızlandırır",
      "Aynı kaydı eşsiz biçimde işaretleyip geri bulmayı sağlar",
      "Veriyi görselleştirir",
      "Tablo şemasını değiştirir",
    ],
    answer: 1,
    explain: "UUID, tekilliği garanti ederek izlenebilirliği artırır.",
  },
  // validate
  {
    scene: "validate",
    q: "Aşağıdakilerden hangisi sahnede örnek verilen doğrulama türlerindendir?",
    choices: [
      "Aralık ve tip kontrolü",
      "Sadece renk paleti kontrolü",
      "Sunucu sürümü kontrolü",
      "Kullanıcı avatarı kontrolü",
    ],
    answer: 0,
    explain:
      "Aralık (ör. 0–100°C) ve tip (sayısal) kontrolü tipik doğrulamadır.",
  },
  {
    scene: "validate",
    q: "Doğrulama başarısız olursa doğru yaklaşım nedir?",
    choices: [
      "Hatalı veriyi yine de kaydetmek",
      "Kaydı reddetmek veya kullanıcıya geri bildirim vermek",
      "Zaman damgasını silmek",
      "Kaynağı gizlemek",
    ],
    answer: 1,
    explain: "Hatalı verinin kaydı engellenmeli ve geri bildirim verilmelidir.",
  },
  // append
  {
    scene: "append",
    q: "“Kayıt defteri satırı olarak ekleme (append)” neyi ima eder?",
    choices: [
      "Var olan satırları rastgele değiştirmek",
      "Değişmez bir satır eklemek (tarihçe korunur)",
      "Sadece son satırı güncellemek",
      "Tüm geçmişi silmek",
    ],
    answer: 1,
    explain: "Append; geçmişi bozmadan yeni satır ekleme yaklaşımıdır.",
  },
  // store
  {
    scene: "store",
    q: "Sahnede geçen ‘dosya / veritabanı / bulut’ üçlüsü neyi temsil eder?",
    choices: [
      "Arşiv formatlarını",
      "Farklı kullanım senaryolarına uygun saklama seçeneklerini",
      "Grafik kütüphanelerini",
      "Yedekleme algoritmalarını",
    ],
    answer: 1,
    explain: "İhtiyaca göre farklı saklama ortamları tercih edilir.",
  },
  {
    scene: "store",
    q: "İlişkisel sorgular ve tutarlı şema gerektiren durumlarda öncelikli tercih nedir?",
    choices: [
      "Düz dosya",
      "İlişkisel veritabanı",
      "Sadece bulut nesne depolama",
      "Log dosyası",
    ],
    answer: 1,
    explain: "RDBMS (ilişkisel veritabanı) bu senaryoya uygundur.",
  },
  // audit
  {
    scene: "audit",
    q: "“Günlük & izlenebilirlik” sahnesi hangi yeteneği vurgular?",
    choices: [
      "Kayıtların silinmesi",
      "Zaman çizgisinde arama, seçim ve doğrulama",
      "Renk geçiş animasyonları",
      "Verinin görsel boyutunun artması",
    ],
    answer: 1,
    explain:
      "Zaman çizgisi üzerinde kayıtları takip edip doğrulayabilmek esastır.",
  },
  {
    scene: "audit",
    q: "İzlenebilirlik için minimum hangi alanlar birlikte tutulmalıdır?",
    choices: [
      "Sadece kullanıcı adı",
      "Değer, zaman, kaynak (ve tercihen UUID)",
      "Renk teması ve yazı tipi",
      "Sadece dosya adı",
    ],
    answer: 1,
    explain: "Değer+zaman+kaynak (+UUID) birlikte izlenebilirlik sağlar.",
  },
  // outro
  {
    scene: "outro",
    q: "Özet sahnesine göre ‘kayıt’ın en kısa tanımı nedir?",
    choices: [
      "Her şeyi JSON’a çevirmek",
      "Değeri doğru an ve kaynakla not etmek",
      "Sunucu CPU’sunu ölçmek",
      "Sadece görselleştirme yapmak",
    ],
    answer: 1,
    explain: "Kayıt, doğru an (zaman) ve doğru kaynakla değeri not etmektir.",
  },
  // mixed
  {
    scene: "mixed",
    q: "Aşağıdakilerden hangisi kayıt hattındaki doğru sıralamaya daha yakındır?",
    choices: [
      "Sakla → Kaynağı seç → Doğrula → Zaman damgası",
      "Kaynak → Değeri yakala → Zaman damgası → Metaveri → Doğrula → Append → Sakla → Denetle",
      "Zaman damgası → Görselleştir → Sakla",
      "Metaveri → Renk seç → Sil",
    ],
    answer: 1,
    explain: "Sahneler boyunca anlatılan akış bu zinciri takip eder.",
  },
  {
    scene: "mixed",
    q: "Aşağıdaki ifadelerden hangisi YANLIŞTIR?",
    choices: [
      "Zaman damgası, kayıtları sıralayabilmek için kritiktir.",
      "Append yaklaşımı geçmişi korur.",
      "Metaveri, kaydı geri izlemeye yardımcı olur.",
      "Doğrulama, hatalı veriyi daha hızlı kaydetmek için atlanmalıdır.",
    ],
    answer: 3,
    explain: "Doğrulama atlanmamalı; hatalı verinin kaydını engeller.",
  },
];

let quizIndex = 0;
let quizAnswers = []; // her soruda seçilen seçenek index’i

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

  if (quizTitleEl) quizTitleEl.textContent = "Veri Kaydı Süreci — Quiz";
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

  // Sahne etiketi (varsa küçük bilgi alanı)
  if (quizMetaEl) quizMetaEl.textContent = `Sahne: ${q.scene}`;

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
      testId: 2,
      score: correct,
      total: quizData.length,
      topic: "verikaydi",
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
