// Beyaz temalı, butonsuz, otomatik açılan Mini Quiz
// Konu: Simetrik Şifreleme (Detaylı)
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
  // S0 — Açık Veri ve Tehdit Modeli
  {
    q: "Sahne 0’da ‘Ali → 5 BTC → Zeynep’ bilgisinin ‘açık veri’ olarak kalmasının temel riski nedir?",
    choices: [
      "Veri bozulmadan kalır",
      "Herhangi biri içeriği okuyabilir ve ifşa olabilir",
      "Veri otomatik olarak imzalanır",
      "Gizlilik yanında bütünlük de garanti edilir",
    ],
    answer: 1,
    explain:
      "Açık veri herkesçe okunabilir; gizlilik yoktur. Bu nedenle şifreleme gerekir (S0).",
  },
  {
    q: "Açık verinin ‘yalnızca yetkili alıcı’ tarafından okunabilmesi için ilk yapılması gereken en uygun işlem nedir?",
    choices: [
      "Hash almak",
      "Zaman damgası eklemek",
      "Simetrik anahtarla şifrelemek",
      "Blokzincire doğrudan yazmak",
    ],
    answer: 2,
    explain:
      "Gizlilik hedefi için şifreleme gerekir. Hash gizlilik sağlamaz, sadece özet üretir (S0→S1).",
  },

  // S1 — Şifreleme, Anahtar, Kipler
  {
    q: "Sahne 1’deki simetrik şifreleme modelinde ‘altın anahtar’ın rolü nedir?",
    choices: [
      "Sadece şifreler, çözemez",
      "Hem şifreler hem çözer",
      "Sadece imza üretir",
      "Sadece zaman damgası üretir",
    ],
    answer: 1,
    explain:
      "Simetrik kriptoda aynı anahtar iki yönde kullanılır: şifreleme ve çözme (S1, S3).",
  },
  {
    q: "Aynı açık veriyi her seferinde aynı şifreli çıktıya dönüştürmemek ve desen sızıntısını önlemek için hangi unsur kritiktir?",
    choices: [
      "Uzun şifreli metin",
      "IV/nonce kullanımı",
      "Daha kısa anahtar",
      "Daha büyük blok boyu",
    ],
    answer: 1,
    explain:
      "IV/nonce, aynı anahtarla farklı oturumlarda rastgelelik katar; desen sızıntısını azaltır (genel pratik).",
  },
  {
    q: "Aşağıdaki kiplerden hangisi hem gizlilik hem de bütünlük/authentication sunar (AEAD)?",
    choices: ["CBC", "CFB", "CTR", "GCM"],
    answer: 3,
    explain:
      "GCM gibi AEAD kipleri gizlilik + bütünlük (auth tag) sağlar; sadece şifreleme yetmez (genel pratik).",
  },

  // S2 — Anahtar Dağıtımı ve Güvenli Kanal
  {
    q: "Sahne 2’de anahtar neden güvenli bir tünelden gönderilir?",
    choices: [
      "Anahtarı daha hızlı yapmak için",
      "Anahtarın gizliliğini ve bütünlüğünü korumak için",
      "Ağ ücretini düşürmek için",
      "Blok boyutunu artırmak için",
    ],
    answer: 1,
    explain:
      "Simetrik şifrenin zayıf noktası anahtar dağıtımıdır; güvenli aktarım şarttır (S2).",
  },
  {
    q: "‘Kötü Node’un anahtarı ele geçirememe nedeni neyle en iyi açıklanır?",
    choices: [
      "Anahtar hash’lenmiştir",
      "Tünel şifreli/kimlik doğrulamalı olduğu için araya girme başarı şansı düşer",
      "Anahtar hiç gönderilmez",
      "Ağ izole edilmiştir",
    ],
    answer: 1,
    explain:
      "Güvenli kanal (ör. TLS) iletimi şifreler ve uçları doğrular; dinleme/sahteciliği zorlaştırır (S2).",
  },
  {
    q: "Simetrik anahtarı güvenli dağıtmak için pratik bir çözüm nedir?",
    choices: [
      "Anahtarı şifrelemeden e-posta atmak",
      "Kamuya açık bir Web sayfasına koymak",
      "Asimetrik kriptografi ile anahtarı sarmalamak (hibrit yöntem)",
      "Blokzincire düz metin olarak yazmak",
    ],
    answer: 2,
    explain:
      "Gerçekte hibrit yaklaşım yaygındır: Asimetrik kriptoyla simetrik anahtar güvenli taşınır (S2’nin çıkarımı).",
  },

  // S3 — Deşifre ve Bütünlük
  {
    q: "Sahne 3’te Zeynep veriyi nasıl açığa (plaintext) çevirir?",
    choices: [
      "Farklı bir rastgele anahtarla",
      "Ali’nin kullandığı aynı simetrik anahtarla",
      "Sadece hash karşılaştırarak",
      "IV’yi tek başına kullanarak",
    ],
    answer: 1,
    explain: "Simetrik model: aynı anahtar şifreler ve çözer (S3).",
  },
  {
    q: "‘Sadece şifrelemek’ hangi güvenlik özelliğini tek başına GARANTİ ETMEZ?",
    choices: [
      "Gizlilik",
      "Bütünlük/Değiştirilmemişlik",
      "Veri okunamazlığı",
      "Yetkisiz okuma engeli",
    ],
    answer: 1,
    explain:
      "Bütünlük için MAC/AEAD gibi ek doğrulama gerekir. Sırf şifrelemek, manipülasyonu her zaman ortaya çıkarmaz (S3 bağlamında önemli detay).",
  },

  // S4 — Anahtar Yoksa Erişim Reddedilir
  {
    q: "Sahne 4’te ‘Erişim Reddedildi’ mesajının özünde hangi ilke vardır?",
    choices: [
      "Hash geri döndürülemez",
      "Doğru anahtara sahip olmayan kişi şifreli veriyi çözemez",
      "IV tek başına yeterlidir",
      "Zaman damgası çözme sağlar",
    ],
    answer: 1,
    explain:
      "Doğru anahtar yoksa çözüm yapılamaz; simetriğin temel güvenlik iddiası budur (S4).",
  },
  {
    q: "Anahtar ele geçirilmeden şifreli verinin elde edilmesi neden genellikle yeterli değildir?",
    choices: [
      "Şifreli veri zaten anlamlıdır",
      "Şifreli veri boştur",
      "Anahtar olmadan kriptografik olarak kırmak pratikte aşırı maliyetlidir",
      "IV çözümdür",
    ],
    answer: 2,
    explain:
      "Güncel algoritma ve yeterli anahtar uzunluğunda brute-force pratik değildir (S4’ün arka planı).",
  },

  // S5 — Uygulama Pratikleri (Özet ve Gelişmiş)
  {
    q: "Anahtarın ÖMRÜ ile ilgili iyi bir güvenlik uygulaması hangisidir?",
    choices: [
      "Anahtarı hiç değiştirmemek",
      "Anahtarı herkese açık depoda tutmak",
      "Periyodik anahtar yenileme/rotasyon uygulamak",
      "Aynı anahtarı tüm sistemlerde paylaşmak",
    ],
    answer: 2,
    explain:
      "Anahtar rotasyonu sızıntı etkisini sınırlar; operasyonel olarak tavsiye edilir (S5 çıkarımı).",
  },
  {
    q: "Aşağıdakilerden hangisi ‘nonce/IV yeniden kullanımı’ için DOĞRU bir ifadedir?",
    choices: [
      "Güvenliği artırır",
      "Hiç fark yaratmaz",
      "Bazı kiplerde ciddi güvenlik açıklarına yol açabilir",
      "Şifreleme hızını her zaman artırır",
    ],
    answer: 2,
    explain:
      "CTR/GCM gibi kiplerde nonce/IV tekrar kullanımı kritik açıklar doğurabilir (en iyi uygulama uyarısı).",
  },
  {
    q: "Simetrik şifreleme ile asimetrik şifreleme arasındaki tipik performans farkı için doğru seçenek:",
    choices: [
      "Simetrik genelde daha yavaştır",
      "Asimetrik genelde daha hızlıdır",
      "Simetrik genelde daha hızlıdır; büyük veriyi şifrelemede tercih edilir",
      "İkisi de aynı hızdadır",
    ],
    answer: 2,
    explain:
      "Büyük veride simetrik şifreleme tercih edilir; asimetrik genelde anahtar değişim/kimlik doğrulamada kullanılır.",
  },
  {
    q: "Gerçek sistemlerde ‘anahtar yönetimi’ için iyi bir yaklaşım hangisidir?",
    choices: [
      "Anahtarları kaynak koduna gömmek",
      "Anahtarları salt kullanıcı belleğinde tutmak",
      "KMS/HSM gibi güvenli anahtar kasaları kullanmak",
      "Anahtarı e-posta ile paylaşıp silmek",
    ],
    answer: 2,
    explain:
      "KMS/HSM, anahtar üretimi, saklanması, erişim kontrolü ve rotasyon için standart çözümlerdir (S5).",
  },
  {
    q: "Şifreli verinin yanına eklenen ‘auth tag’ (etiket) veya ‘MAC’ ne sağlar?",
    choices: [
      "Yalnızca gizlilik",
      "Yalnızca sıkıştırma",
      "Bütünlük ve kimlik doğrulama",
      "Zaman damgası üretimi",
    ],
    answer: 2,
    explain:
      "AEAD/MAC, verinin değiştirilmediğini ve doğru anahtarla üretildiğini doğrular (S1–S5 genel).",
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
  if (titleEl)
    titleEl.textContent = "Simetrik Şifreleme (Detaylı) — Bilgini Test Et";
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
      testId: 26,
      score: correct,
      total: quizData.length,
      topic: "simetrik",
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
