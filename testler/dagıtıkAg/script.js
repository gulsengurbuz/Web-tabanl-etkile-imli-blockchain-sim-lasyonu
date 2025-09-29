// quiz.js
// Beyaz temalı, butonsuz Mini Quiz (sayfa açılır açılmaz görünür)
// Konu: Dağıtık Ağ (merkezi / merkeziyetsiz / dağıtık, yayılım, yedeklilik, arıza, onarım)

// Kısa id seçici
const $id = (id) => document.getElementById(id);

// DOM referansları
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

// Soru seti (İÇERİK DEĞİŞTİRİLMEDİ)
const quizData = [
  {
    q: "Merkezi ağ yapısının en belirgin özelliği nedir?",
    choices: [
      "Tüm düğümler eşit yetkilidir",
      "Tek bir kontrol/hizmet noktası etrafında toplanır",
      "Düğümler arası tam örgü bağlantı vardır",
      "Hiçbir düğüm diğerine bağlı değildir",
    ],
    answer: 1,
    explain:
      "Animasyonda sol sütun: Merkezi yapıda tek bir sunucu etrafında cihazlar bağlanır.",
  },
  {
    q: "Merkeziyetsiz ağ yapısı için doğru ifade hangisidir?",
    choices: [
      "Birden çok yerel merkez (hub) bulunabilir",
      "Sadece tek merkez vardır",
      "Tüm düğümler ayrı evrenlerdedir",
      "Bağlantılar sadece tek yöne çalışır",
    ],
    answer: 0,
    explain:
      "Orta sütun: Birden fazla merkez (hub) ve onların bağlı cihazları gösterildi.",
  },
  {
    q: "Dağıtık ağ yapısı (sağ sütun) neyi vurgular?",
    choices: [
      "Tüm düğümlerin eşit ve geniş örgü şeklinde bağlantılı olmasını",
      "Her zaman bir ana sunucuya ihtiyaç duyulmasını",
      "Yalnızca bölgesel merkezleri",
      "Sadece tek bir yedeği",
    ],
    answer: 0,
    explain:
      "Sağ sütun: Düğümler halka/örgü düzeninde çoklu bağlantılarla eşittir.",
  },
  {
    q: "Yeni veri bloğu (ör. B10) ilk nerede oluşturuldu?",
    choices: [
      "Node 1 (Alice) üzerinde",
      "Node 3 (Charlie) üzerinde",
      "Rastgele bir düğümde",
      "Ağın merkezinde",
    ],
    answer: 0,
    explain: "Sahne 3: B10 bloğu Alice (Node 1) tarafından oluşturuldu.",
  },
  {
    q: "Veri yayılımı (propagation) sahnesinde ne oldu?",
    choices: [
      "Veri yalnızca tek komşuya aktı",
      "Veri tüm düğümlere yayılacak şekilde iletildi",
      "Veri merkezde saklandı, kimseye gitmedi",
      "Sadece iki düğüm paylaştı",
    ],
    answer: 1,
    explain:
      "Sahne 4: B10, çizgilerle tüm düğümlere taşındı; her düğümde blok ve onay işareti belirdi.",
  },
  {
    q: "Yedeklilik (redundancy) neden önemli gösterildi?",
    choices: [
      "Veri sadece tek yerde dursun diye",
      "Ağın hızını düşürmek için",
      "Birden fazla düğümde veri kopyası tutarak dayanıklılığı artırmak için",
      "Görsel efekt olsun diye",
    ],
    answer: 2,
    explain:
      "Sahne 5: Aynı veri birden çok düğümde bulunur; bu da arızalara karşı koruma sağlar.",
  },
  {
    q: "Düğüm arızası sahnesinde (Node 3/Charlie) hangi mesaj öne çıktı?",
    choices: [
      "Veri tamamen kayboldu",
      "Veri kaybı olmadı",
      "Ağ durdu",
      "B10 bloğu yok sayıldı",
    ],
    answer: 1,
    explain:
      "Sahne 6: “Veri kaybı olmadı.” mesajı gösterildi; yedeklilik sayesinde.",
  },
  {
    q: "Ağın kendini onarması nasıl tasvir edildi?",
    choices: [
      "Arızalı düğüm dışlandı ve ağ kapandı",
      "Diğer düğümlerden akışlar ile düğüm geri sağlıklı hale getirildi",
      "Veri silinerek baştan üretildi",
      "Merkezi sunucu geri yükledi",
    ],
    answer: 1,
    explain:
      "Sahne 7: Diğer düğümlerden veri akışıyla düğüm onarıldı ve tekrar yeşile döndü.",
  },
  {
    q: "Dağıtık ağların üç temel niteliği finalde nasıl vurgulandı?",
    choices: [
      "Yavaş – Kırılgan – Kapalı",
      "Güvenilir – Dayanıklı – Erişilebilir",
      "Ucuz – Basit – Denetimsiz",
      "Merkezi – Gizli – Tekil",
    ],
    answer: 1,
    explain: "Sahne 8 final yazısı: “Güvenilir – Dayanıklı – Erişilebilir”.",
  },
  {
    q: "Bu animasyona göre aşağıdakilerden hangisi dağıtık ağa en uygun genellemedir?",
    choices: [
      "Tek hata noktası vardır",
      "Veri tek kopya tutulur",
      "Düğümler eşit, veriler çoklayarak (yedekli) yayılır",
      "Yalnızca bir merkez karar verir",
    ],
    answer: 2,
    explain:
      "Dağıtık ağda tekil merkez yoktur; eşit düğümler ve çoklu kopyalarla esneklik sağlanır.",
  },
];

// durum
let quizIndex = 0;
let quizAnswers = []; // her soru için seçilen indeks

// Başlat
document.addEventListener("DOMContentLoaded", setupQuiz);

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

  if (quizTotalText) quizTotalText.textContent = String(quizData.length);
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);

  if (quizPrevBtn) quizPrevBtn.addEventListener("click", onQuizPrev);
  if (quizNextBtn) quizNextBtn.addEventListener("click", onQuizNext);
  if (quizSubmitBtn) quizSubmitBtn.addEventListener("click", onQuizSubmit);
  if (quizRetryBtn) quizRetryBtn.addEventListener("click", onQuizRetry);

  renderQuiz();
}

function renderQuiz() {
  const q = quizData[quizIndex];
  if (!q) return;

  // ilerleme
  if (quizProgressText) quizProgressText.textContent = String(quizIndex + 1);
  if (quizProgressBar) {
    quizProgressBar.style.width = `${Math.round(
      (quizIndex / quizData.length) * 100
    )}%`;
  }

  // soru
  if (quizQuestion) quizQuestion.textContent = q.q;

  // seçenekler
  if (quizChoices) {
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
  }

  // buton durumları
  if (quizPrevBtn) quizPrevBtn.disabled = quizIndex === 0;
  const last = quizIndex === quizData.length - 1;
  if (quizNextBtn) quizNextBtn.classList.toggle("hidden", last);
  if (quizSubmitBtn) quizSubmitBtn.classList.toggle("hidden", !last);
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
  if (quizScoreText) {
    quizScoreText.textContent = `Skorun: ${correct} / ${quizData.length} (${scorePct}%)`;
  }

  if (quizReviewWrap) {
    quizReviewWrap.innerHTML = review
      .map((item) => {
        const user =
          item.selected == null ? "—" : item.q.choices[item.selected];
        const correctTxt = item.q.choices[item.q.answer];
        return `
        <div class="review-item">
          <div><strong>Soru ${item.idx + 1}:</strong> ${item.q.q}</div>
          <div>Cevabın: <span class="${
            item.isCorrect ? "good" : "bad"
          }">${user}</span></div>
          <div>Doğru: <strong>${correctTxt}</strong></div>
          <div>Açıklama: ${item.explain}</div>
        </div>`;
      })
      .join("");
  }

  if (quizResultWrap) quizResultWrap.classList.remove("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "100%";

  // Opsiyonel: Sonucu kaydet (blok mimarisindeki gibi)
  // Bu konuya özel, benzersiz bir testId verelim (ör. 4).
  if (window.__saveQuiz) {
    window.__saveQuiz({
      testId: 7,
      score: correct,
      total: quizData.length,
      topic: "Dağıtık Ağ",
    });
  }
}

function onQuizRetry() {
  quizIndex = 0;
  quizAnswers = Array(quizData.length).fill(null);
  if (quizResultWrap) quizResultWrap.classList.add("hidden");
  if (quizProgressBar) quizProgressBar.style.width = "0%";
  renderQuiz();
}
