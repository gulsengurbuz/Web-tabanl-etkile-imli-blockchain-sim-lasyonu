const scenes = [
  {
    id: 0,
    title: "Bloklar Nasıl Eklenir?",
    description:
      "Blockchain'de bloklar sırayla eklenir. Her yeni blok, kendinden önceki bloğa referans verir ve zinciri uzatır.",
    terms: {
      Blok: "İşlemlerin ve verilerin saklandığı dijital kutu",
      Zincir: "Blokların kronolojik sırayla bağlandığı yapı",
      Hash: "Her bloğun benzersiz dijital parmak izi",
    },
    duration: 12,
    animationSteps: [
      "Blok 1 zincire ekleniyor",
      "Blok 2 geldi ve önceki bloğa bağlanıyor",
      "Blok 3 sırayla eklendi",
      "İşlemler blokların içine yerleştiriliyor",
      "Zincir düzenli şekilde büyüyor",
    ],
  },
  {
    id: 1,
    title: "Fork (Çatallanma) Nedir?",
    description:
      "Bazen ağda aynı anda iki farklı blok önerilir. Bu durumda zincir geçici olarak iki kola ayrılır - buna fork denir.",
    terms: {
      Fork: "Zincirin iki farklı yola ayrılması",
      "Aday Blok": "Zincire eklenmeyi bekleyen blok",
      Çakışma: "Aynı pozisyon için birden fazla blok gelmesi",
    },
    duration: 14,
    animationSteps: [
      "Normal zincir: Blok 1 → Blok 2 → Blok 3",
      "Blok 3'ten sonra çatallanma başlıyor",
      "İki aday blok aynı anda geliyor",
      "Aday A (mavi) ve Aday B (mor) yarışıyor",
      "Ağ hangisini seçeceğine karar veriyor",
    ],
  },
  {
    id: 2,
    title: "Hangi Kol Kazanır?",
    description:
      "Çatallanma durumunda 'en uzun zincir kuralı' devreye girer. Üzerine daha çok blok eklenen kol kazanır, diğeri geçersiz sayılır.",
    terms: {
      "En Uzun Zincir": "En çok iş gücü harcanan, en uzun blok dizisi",
      "Geçersiz Blok": "Kazanan zincirde yer almayan blok",
      "Yeniden İşleme": "Geçersiz blokdaki işlemlerin tekrar denenmesi",
    },
    duration: 16,
    animationSteps: [
      "Aday A koluna yeni blok ekleniyor",
      "Aday A kolu daha uzun hale geliyor",
      "Aday B bloğu geçersiz ilan ediliyor",
      "Geçersiz blokdaki işlemler geri dönüyor",
      "En uzun kol ana zincir olarak kabul ediliyor",
    ],
  },
  {
    id: 3,
    title: "Soft Fork (Uyumlu Değişiklik)",
    description:
      "Ağa yeni kurallar eklenirken eski düğümlerle uyumlu kalınır. Eski sürümler yeni blokları okuyabilir ama yeni kuralları tam anlamaz.",
    terms: {
      "Soft Fork": "Geriye dönük uyumlu protokol değişikliği",
      Sinyalleme: "Düğümlerin yeni kurala hazır olduğunu bildirmesi",
      Aktivasyon: "Yeni kuralın devreye girme anı",
      "Eski Düğüm": "Güncellenmemiş ama hala çalışan düğüm",
    },
    duration: 18,
    animationSteps: [
      "Düğümler yeni kurala hazır olduklarını bildiriyor",
      "Hazırlık oranı %95'e ulaştı - kural kilitleniyor",
      "Aktivasyon bloğu geldi - yeni kural aktif",
      "Yeni bloklar özel işaretlerle geliyor",
      "Eski düğümler yeni blokları izlemeye devam ediyor",
    ],
  },
  {
    id: 4,
    title: "Hard Fork (Uyumsuz Değişiklik)",
    description:
      "Protokolde büyük değişiklik yapılır ve eski sürümlerle uyumsuz hale gelir. Bu durumda ağ kalıcı olarak ikiye ayrılabilir.",
    terms: {
      "Hard Fork": "Geriye dönük uyumsuz protokol değişikliği",
      "Ağ Bölünmesi": "İki ayrı blockchain ağının oluşması",
      "Coin Kopyalama": "Her iki ağda da aynı bakiyelerin bulunması",
      "Ekosistem Seçimi":
        "Uygulamaların hangi ağı destekleyeceğine karar vermesi",
    },
    duration: 20,
    animationSteps: [
      "Protokol değişikliği nedeniyle zincir ikiye ayrılıyor",
      "Her iki kolda da yeni bloklar eklenmeye devam ediyor",
      "Kullanıcı bakiyeleri her iki ağda da mevcut",
      "İki farklı coin türü ortaya çıkıyor",
      "Ekosistem hangi ağı destekleyeceğini seçiyor",
    ],
  },
  {
    id: 5,
    title: "Geçici Ayrılık → Güncelle ve Birleş",
    description:
      "Sürüm farklılıkları nedeniyle oluşan geçici çatallanmalar, hızlı güncellemelerle çözülür ve ağ tekrar birleşir.",
    terms: {
      "Sürüm Uyumsuzluğu": "Farklı yazılım versiyonları arasındaki fark",
      "Hızlı Yama": "Acil durum için çıkarılan güncelleme",
      "Ağ Birleşmesi": "Ayrı kolların tekrar tek zincir haline gelmesi",
      Konsensüs: "Ağın tek bir gerçek üzerinde anlaşması",
    },
    duration: 16,
    animationSteps: [
      "Düğümlerin yarısı eski (v1), yarısı yeni (v2) sürümde",
      "Yeni blok geldi: v2 anlıyor, v1 anlamıyor",
      "Hızlı yama (v2.1) yayınlandı",
      "Eski düğümler güncellendi ve yeni sürüme geçti",
      "Kısa kol söndü, ağ tekrar tek zincirde birleşti",
    ],
  },
];

let currentScene = 0;
let animationStep = 0;
let animationActive = false;
let buttonEnabled = false;
let progress = 0;
let animationInterval;
let progressInterval;

const elements = {
  modalOverlay: document.getElementById("modal-overlay"),
  modalTitle: document.getElementById("modal-title"),
  modalDescription: document.getElementById("modal-description"),
  termsList: document.getElementById("terms-list"),
  startBtn: document.getElementById("start-btn"),
  startBtnText: document.getElementById("start-btn-text"),
  animationArea: document.getElementById("animation-area"),
  statusText: document.getElementById("status-text"),
  statusMessage: document.getElementById("status-message"),
  continueContainer: document.getElementById("continue-container"),
  continueBtn: document.getElementById("continue-btn"),
  continueText: document.getElementById("continue-text"),
  currentSceneSpan: document.getElementById("current-scene"),
  progressPercent: document.getElementById("progress-percent"),
  progressFill: document.getElementById("progress-fill"),
  summaryScreen: document.getElementById("summary-screen"),
  restartBtn: document.getElementById("restart-btn"),
};

document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  showModal();
  updateProgress();
  elements.startBtn.addEventListener("click", startAnimation);
  elements.continueBtn.addEventListener("click", nextScene);
  elements.restartBtn.addEventListener("click", resetTutorial);
  setTimeout(() => {
    elements.startBtn.disabled = false;
  }, 3000);
}

function showModal() {
  const scene = scenes[currentScene];
  elements.modalTitle.textContent = scene.title;
  elements.modalDescription.textContent = scene.description;
  elements.termsList.innerHTML = "";
  Object.entries(scene.terms).forEach(([term, definition]) => {
    const termDiv = document.createElement("div");
    termDiv.className = "term-item";
    termDiv.innerHTML = `<span class="term-name">${term}:</span> ${definition}`;
    elements.termsList.appendChild(termDiv);
  });
  elements.startBtnText.textContent =
    currentScene === 0 ? "İzle" : "Örneği Göster";
  elements.modalOverlay.style.display = "flex";
  elements.startBtn.disabled = true;
  setTimeout(() => {
    elements.startBtn.disabled = false;
  }, 3000);
}

function hideModal() {
  elements.modalOverlay.style.display = "none";
}

function startAnimation() {
  hideModal();
  animationStep = 0;
  animationActive = true;
  buttonEnabled = false;
  progress = 0;
  elements.continueContainer.style.display = "none";
  elements.statusText.style.display = "block";
  renderAnimation();
  startAnimationLoop();
}

function startAnimationLoop() {
  const scene = scenes[currentScene];
  const stepDuration = (scene.duration * 1000) / scene.animationSteps.length;
  if (currentScene === 3) {
    progressInterval = setInterval(() => {
      if (progress < 95) {
        progress += 5;
        updateSceneProgress();
      }
    }, 200);
  }
  animationInterval = setInterval(() => {
    if (animationStep < scene.animationSteps.length - 1) {
      animationStep++;
      elements.statusMessage.textContent = scene.animationSteps[animationStep];
      updateAnimationStep();
    } else {
      clearInterval(animationInterval);
      if (progressInterval) clearInterval(progressInterval);
      animationActive = false;
      buttonEnabled = true;
      elements.statusText.style.display = "none";
      elements.continueContainer.style.display = "block";
      elements.continueBtn.disabled = false;
    }
  }, stepDuration);
  elements.statusMessage.textContent = scene.animationSteps[0];
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    updateProgress();
    showModal();
    elements.continueBtn.disabled = true;
  } else {
    showSummary();
  }
}

function updateProgress() {
  const progressValue = ((currentScene + 1) / scenes.length) * 100;
  elements.currentSceneSpan.textContent = currentScene + 1;
  elements.progressPercent.textContent = Math.round(progressValue);
  elements.progressFill.style.width = progressValue + "%";
  elements.continueText.textContent =
    currentScene < scenes.length - 1 ? "Devam" : "Özet";
}

function renderAnimation() {
  elements.animationArea.innerHTML = "";
  switch (currentScene) {
    case 0:
      renderScene0();
      break;
    case 1:
      renderScene1();
      break;
    case 2:
      renderScene2();
      break;
    case 3:
      renderScene3();
      break;
    case 4:
      renderScene4();
      break;
    case 5:
      renderScene5();
      break;
  }
}

function updateAnimationStep() {
  switch (currentScene) {
    case 0:
      updateScene0();
      break;
    case 1:
      updateScene1();
      break;
    case 2:
      updateScene2();
      break;
    case 3:
      updateScene3();
      break;
    case 4:
      updateScene4();
      break;
    case 5:
      updateScene5();
      break;
  }
}

function renderScene0() {
  elements.animationArea.innerHTML = `
    <div class="flex items-center space-x-3">
      <div class="block" id="block1">
        Blok 1
      </div>
      <i class="fas fa-arrow-right arrow"></i>
      <div class="block" id="block2" style="opacity: 0; transform: translateX(150px);">
        Blok 2
        <div id="badge2" class="badge yellow pulse" style="display: none;">Önceki: #1</div>
      </div>
      <i class="fas fa-arrow-right arrow"></i>
      <div class="block" id="block3" style="opacity: 0; transform: translateX(150px);">
        Blok 3
        <div id="badge3" class="badge yellow pulse" style="display: none;">Önceki: #2</div>
      </div>
    </div>
    <div id="chain-info" class="info-text" style="display: none; bottom: -1rem; left: 50%; transform: translateX(-50%);">
      Bloklar sırayla zincire eklenir ve her blok öncekine referans verir
    </div>
  `;
}

function updateScene0() {
  const block1 = document.getElementById("block1");
  const block2 = document.getElementById("block2");
  const block3 = document.getElementById("block3");
  const badge2 = document.getElementById("badge2");
  const badge3 = document.getElementById("badge3");
  const chainInfo = document.getElementById("chain-info");
  switch (animationStep) {
    case 0:
      block1.classList.add("glow");
      break;
    case 1:
      block1.classList.remove("glow");
      block2.style.opacity = "1";
      block2.style.transform = "translateX(0)";
      badge2.style.display = "block";
      break;
    case 2:
      block3.style.opacity = "1";
      block3.style.transform = "translateX(0)";
      badge2.style.display = "none";
      badge3.style.display = "block";
      break;
    case 3:
      badge3.style.display = "none";
      addParticles();
      break;
    case 4:
      chainInfo.style.display = "block";
      break;
  }
}

function addParticles() {
  const blocks = ["block1", "block2", "block3"];
  blocks.forEach((blockId) => {
    const block = document.getElementById(blockId);
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
        position: absolute;
        top: -10px;
        left: ${10 + i * 8}px;
        width: 8px;
        height: 8px;
        background: #fbbf24;
        border-radius: 50%;
        animation: bounce 1s infinite;
        animation-delay: ${i * 0.1}s;
      `;
      block.appendChild(particle);
    }
  });
}

function renderScene1() {
  elements.animationArea.innerHTML = `
    <div class="relative" style="width: 100%; height: 100%;">
      <div class="flex items-center space-x-3" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%);">
        <div class="block">Blok 1</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 2</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 3</div>
      </div>
      <div id="fork-lines" style="display: none; position: absolute; right: 20rem; top: 40%; transform: translateY(-50%);">
        <div class="fork-line top"></div>
        <div class="fork-line bottom"></div>
      </div>
      <div id="candidate-a" class="block" style="display: none; position: absolute; right: 15rem; top: 17%;">
        Aday A
      </div>
      <div id="candidate-b" class="block purple" style="display: none; position: absolute; right: 15rem; top: 50%;">
        Aday B
      </div>
      <div id="fork-info" class="info-text" style="display: none; bottom: 1rem; left: 50%; transform: translateX(-50%);">
        İki aday blok aynı anda geldi - hangisi seçilecek?
      </div>
    </div>
  `;
}

function updateScene1() {
  const forkLines = document.getElementById("fork-lines");
  const candidateA = document.getElementById("candidate-a");
  const candidateB = document.getElementById("candidate-b");
  const forkInfo = document.getElementById("fork-info");
  switch (animationStep) {
    case 1:
      forkLines.style.display = "block";
      break;
    case 2:
      candidateA.style.display = "block";
      candidateB.style.display = "block";
      candidateA.classList.add("fade-in");
      candidateB.classList.add("fade-in");
      break;
    case 3:
      candidateA.classList.add("pulse");
      candidateB.classList.add("pulse");
      break;
    case 4:
      forkInfo.style.display = "block";
      break;
  }
}

function renderScene2() {
  elements.animationArea.innerHTML = `
    <div class="relative" style="width: 100%; height: 100%;">
      <div class="flex items-center space-x-3" style="position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%);">
        <div class="block">Blok 1</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 2</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 3</div>
      </div>
      <div style="position: absolute; right: 20rem; top: 40%; transform: translateY(-50%);">
        <div class="fork-line top"></div>
        <div class="fork-line bottom"></div>
      </div>
      <div id="winner-branch" style="position: absolute; right: 1rem; top: 17%;">
        <div class="flex items-center space-x-2">
          <div class="block" id="candidate-a-winner">Aday A</div>
          <div class="block" id="candidate-a-winner">Aday C</div>
          <div class="block" id="candidate-a-winner">Aday D</div>
          <i class="fas fa-arrow-right arrow" style="font-size: 0.75rem;"></i>
          <div id="extra-block" class="block" style="display: none;">Blok 4</div>
        </div>
        <div id="winner-info" class="info-text" style="display: none; top: 1rem; left: 0; width: 120px;">
          Daha uzun kol kazandı
        </div>
      </div>
      <div id="loser-branch" style="position: absolute; right: 12rem; top: 50%;">
        <div class="block purple" id="candidate-b-loser">
          Aday B
          <div id="invalid-badge" class="badge red" style="display: none;">GEÇERSİZ</div>
        </div>
      </div>
      <div id="retry-info" class="info-text" style="display: none; bottom: 1rem; left: 50%; transform: translateX(-50%);">
        Geçersiz blokdaki işlemler tekrar işlenecek
      </div>
    </div>
  `;
}

function updateScene2() {
  const extraBlock = document.getElementById("extra-block");
  const invalidBadge = document.getElementById("invalid-badge");
  const candidateBLoser = document.getElementById("candidate-b-loser");
  const winnerInfo = document.getElementById("winner-info");
  const retryInfo = document.getElementById("retry-info");
  const candidateAWinner = document.getElementById("candidate-a-winner");
  switch (animationStep) {
    case 0:
      extraBlock.style.display = "block";
      extraBlock.classList.add("fade-in");
      break;
    case 1:
      winnerInfo.style.display = "block";
      break;
    case 2:
      invalidBadge.style.display = "block";
      candidateBLoser.style.opacity = "0.5";
      break;
    case 3:
      candidateAWinner.classList.add("glow");
      break;
    case 4:
      retryInfo.style.display = "block";
      break;
  }
}

function renderScene3() {
  elements.animationArea.innerHTML = `
    <div class="relative" style="width: 100%; height: 100%;">
      <div id="scene-progress" class="scene-progress" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%);">
        <div class="scene-progress-info">
          <span>Hazırım diyenler:</span>
          <span id="progress-text">0%</span>
        </div>
        <div class="scene-progress-bar">
          <div class="scene-progress-fill" id="scene-progress-fill" style="width: 0%;"></div>
        </div>
        <div id="lock-badge" class="badge green pulse" style="display: none; margin-top: 0.5rem;">
          <i class="fas fa-check-circle"></i> Kural Kilitleniyor
        </div>
      </div>
      <div class="flex items-center space-x-2" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
        <div class="block">Blok 1</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 2</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block" id="activation-block">
          Blok 3
          <div id="activation-badge" class="badge blue pulse" style="display: none;">Aktivasyon</div>
        </div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block" id="block4">
          Blok 4
          <div class="purple-stripe" style="display: none; position: absolute; top: 0; right: 0; width: 3px; height: 100%; background: #8b5cf6; border-radius: 0 6px 6px 0;"></div>
        </div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block" id="block5">
          Blok 5
          <div class="purple-stripe" style="display: none; position: absolute; top: 0; right: 0; width: 3px; height: 100%; background: #8b5cf6; border-radius: 0 6px 6px 0;"></div>
        </div>
      </div>
      <div id="soft-fork-info" class="info-text" style="display: none; bottom: 2rem; left: 50%; transform: translateX(-50%);">
        Eski düğümler yeni blokları okuyabiliyor ama yeni kuralları tam anlamıyor
      </div>
    </div>
  `;
}

function updateScene3() {
  const lockBadge = document.getElementById("lock-badge");
  const activationBlock = document.getElementById("activation-block");
  const activationBadge = document.getElementById("activation-badge");
  const block4Stripe = document.querySelector("#block4 .purple-stripe");
  const block5Stripe = document.querySelector("#block5 .purple-stripe");
  const softForkInfo = document.getElementById("soft-fork-info");
  switch (animationStep) {
    case 1:
      if (progress >= 95) {
        lockBadge.style.display = "block";
      }
      break;
    case 2:
      activationBlock.classList.add("glow");
      activationBadge.style.display = "block";
      break;
    case 3:
      activationBadge.style.display = "none";
      block4Stripe.style.display = "block";
      block5Stripe.style.display = "block";
      break;
    case 4:
      softForkInfo.style.display = "block";
      break;
  }
}

const scene4Texts = [
  "Ağ, kurallarda anlaşmazlık yaşadı ve ikiye ayrılmak üzere. Bu nokta, yeni iki yolun başlangıcı.",
  "Çatallanma sonrası, her ağ kendi blok zincirini oluşturmaya başladı. Artık işlemler farklı yollarda ilerliyor.",
  "Ağ ayrıldığı anda, iki bağımsız kripto para birimi doğdu: A-coin (mavi zincir) ve B-coin (mor zincir).",
  "Fork anında, tüm kullanıcı bakiyeleri iki ağda da çoğaltıldı. Herkes yeni zincirlerde aynı başlangıç bakiyesine sahip.",
  "Proje ve kullanıcılar, destekleyecekleri zinciri seçiyor. Bazıları mavi zincirde, bazıları mor zincirde ilerliyor.",
];

const $ = (id) => document.getElementById(id);
const show = (el) => {
  if (el) {
    el.style.display = "block";
    void el.offsetWidth;
    el.classList.add("fade-in");
  }
};
const hide = (el) => {
  if (el) el.style.display = "none";
};
const addOnce = (el, cls) => {
  if (el && !el.classList.contains(cls)) el.classList.add(cls);
};

function resetScene4() {
  [
    "fork-icon",
    "network-a",
    "network-b",
    "block-5a",
    "block-5b",
    "hard-fork-info",
    "fork-block",
    "coin-legend",
    "coin-a-dot",
    "coin-b-dot",
    "balance-info",
    "coin-section",
    "scene4-caption",
  ].forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.classList.remove("fade-in", "pop", "pulse", "slide-right");
    if (id !== "scene4-caption") el.style.display = "none";
  });
}

function ensureCoinLegendInsideFork() {
  const forkBlock = $("fork-block");
  if (!forkBlock) return;
  let legend = $("coin-legend");
  if (!legend) {
    legend = document.createElement("div");
    legend.id = "coin-legend";
    legend.style.cssText =
      "display:none;margin-top:6px;display:flex;gap:14px;align-items:center;justify-content:center;";
    legend.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;color:#93c5fd;font-size:12px;">
        <span id="coin-a-dot" style="width:10px;height:10px;border-radius:50%;background:#3b82f6;display:inline-block;"></span>
        <span>A-coin</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;color:#c4b5fd;font-size:12px;">
        <span id="coin-b-dot" style="width:10px;height:10px;border-radius:50%;background:#8b5cf6;display:inline-block;"></span>
        <span>B-coin</span>
      </div>
    `;
    forkBlock.appendChild(legend);
  }
  show(legend);
  addOnce(legend, "fade-in");
}

function ensureBalanceInfo() {
  let info = $("balance-info");
  if (!info) {
    info = document.createElement("div");
    info.id = "balance-info";
    info.className = "info-text";
    info.style.cssText =
      "display:none;position:absolute;bottom:16px;left:50%;transform:translateX(-50%);font-size:13px;width:320px;text-align:center;";
    info.textContent = "Bakiyeler iki tarafta kopyalandı (snapshot).";
    elements.animationArea.appendChild(info);
  }
  show(info);
  addOnce(info, "pulse");
}

function setScene4Caption(step) {
  const cap = $("scene4-caption");
  if (!cap) return;
  cap.textContent =
    scene4Texts[Math.max(0, Math.min(step, scene4Texts.length - 1))];
  cap.style.display = "block";
  addOnce(cap, "fade-in");
}

function renderScene4() {
  elements.animationArea.innerHTML = `
    <div class="relative" style="width:100%;height:100%;">
      <div id="scene4-caption"
           style="position:absolute;top:8px;left:50%;transform:translateX(-50%);
                  max-width:760px;text-align:center;font-size:14px;line-height:1.35;
                  color:#111827;background:#ffffffc7;border:1px solid #e5e7eb;border-radius:10px;
                  padding:8px 12px;backdrop-filter:saturate(140%) blur(2px);">
      </div>
      <div class="flex items-center" style="position:absolute;left:50%;top:45%;transform:translate(-50%,-50%);gap:12px;">
        <div class="block">Blok 1</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div id="fork-block" class="block" style="
          display:none;background:#374151;color:#fff;border:1px solid #4b5563;
          min-width:140px;padding:10px 12px;border-radius:10px;
          display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <i class="fas fa-wallet" style="color:#facc15;font-size:20px;margin-bottom:6px;"></i>
        </div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 3</div>
      </div>
      <div id="fork-icon" style="display:none;position:absolute;right:9rem;top:45%;transform:translateY(-50%);">
        <i class="fas fa-code-branch" style="font-size:22px;color:#d1d5db;"></i>
      </div>
      <div id="network-a" style="display:none;position:absolute;right:3rem;top:20%;">
        <div class="badge blue" style="position:static;margin-bottom:6px;font-size:11px;">A Ağı (mavi)</div>
        <div style="display:flex;align-items:center;gap:6px;">
          <div class="block" style="font-size:11px;padding:4px 8px;min-width:64px;">Blok 4A</div>
          <i class="fas fa-arrow-right" style="color:#9ca3af;font-size:12px;"></i>
          <div class="block" id="block-5a" style="display:none;font-size:11px;padding:4px 8px;min-width:64px;">Blok 5A</div>
        </div>
      </div>
      <div id="network-b" style="display:none;position:absolute;right:3rem;bottom:20%;">
        <div class="badge purple" style="position:static;margin-bottom:6px;font-size:11px;">B Ağı (mor)</div>
        <div style="display:flex;align-items:center;gap:6px;">
          <div class="block purple" style="font-size:11px;padding:4px 8px;min-width:64px;">Blok 4B</div>
          <i class="fas fa-arrow-right" style="color:#9ca3af;font-size:12px;"></i>
          <div class="block purple" id="block-5b" style="display:none;font-size:11px;padding:4px 8px;min-width:64px;">Blok 5B</div>
        </div>
      </div>
      <div id="hard-fork-info" class="info-text" style="display:none;position:absolute;bottom:48px;left:50%;transform:translateX(-50%);">
        İki ağ kalıcı olarak ayrıldı – her birinde farklı coinler var
      </div>
    </div>
  `;
}

function updateScene4() {
  setScene4Caption(animationStep);
  const forkIcon = $("fork-icon");
  const networkA = $("network-a");
  const networkB = $("network-b");
  const block5a = $("block-5a");
  const block5b = $("block-5b");
  const hardForkInfo = $("hard-fork-info");
  const forkBlock = $("fork-block");
  if (animationStep === 0) resetScene4();
  if (animationStep >= 0) {
    show(forkIcon);
    show(networkA);
    addOnce(networkA, "slide-right");
    show(networkB);
    addOnce(networkB, "slide-right");
    show(forkBlock);
  }
  if (animationStep >= 1) {
    show(block5a);
    addOnce(block5a, "pop");
    show(block5b);
    addOnce(block5b, "pop");
  }
  if (animationStep >= 2) {
    ensureCoinLegendInsideFork();
  }
  if (animationStep >= 3) {
    ensureBalanceInfo();
  }
  if (animationStep >= 4) {
    show(hardForkInfo);
  }
}

function renderScene5() {
  elements.animationArea.innerHTML = `
    <div class="relative" style="width: 100%; height: 100%;">
      <div id="nodes-section" style="position: absolute; top: 1rem; left: 50%; transform: translateX(-50%);">
        <div style="display: flex; gap: 1.5rem;">
          <div style="text-align: center;">
            <div class="badge gray" style="position: static; margin-bottom: 0.25rem; font-size: 0.625rem;">v1 Düğümler</div>
            <div style="display: flex; gap: 0.25rem;">
              <div class="node-circle gray" id="node1">v1</div>
              <div class="node-circle gray" id="node2">v1</div>
            </div>
          </div>
          <div style="text-align: center;">
            <div class="badge blue" style="position: static; margin-bottom: 0.25rem; font-size: 0.625rem;">v2 Düğümler</div>
            <div style="display: flex; gap: 0.25rem;">
              <div class="node-circle blue">v2</div>
              <div class="node-circle blue">v2</div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2" style="position: absolute; left: 50%; top: 45%; transform: translate(-50%, -50%);">
        <div class="block">Blok 1</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 2</div>
        <i class="fas fa-arrow-right arrow"></i>
        <div class="block">Blok 3</div>
      </div>
      <div id="version-fork" style="display: none; position: absolute; right: 6rem; top: 45%; transform: translateY(-50%);">
        <div class="fork-line top"></div>
        <div class="fork-line bottom"></div>
        <div style="position: absolute; left: 2rem; top: -2rem;">
          <div class="block green" style="font-size: 0.625rem; padding: 0.25rem 0.5rem;">
            Blok 4
            <div class="badge green" style="top: -1.25rem; font-size: 0.5rem;">v2 Kabul</div>
          </div>
        </div>
        <div style="position: absolute; left: 2rem; top: 1.5rem;">
          <div class="block gray" style="font-size: 0.625rem; padding: 0.25rem 0.5rem;">
            Blok 4?
            <div class="badge red" style="top: -1.25rem; font-size: 0.5rem;">v1 Anlamadı</div>
          </div>
        </div>
      </div>
      <div id="update-banner" class="info-text" style="display: none; bottom: 2rem; left: 50%; transform: translateX(-50%); font-size: 0.75rem;">
        <i class="fas fa-sync-alt"></i> Hızlı yama (v2.1) yayınlandı - tüm düğümler güncelleniyor
      </div>
    </div>
    <style>
      .node-circle {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.5rem;
        font-weight: bold;
        color: white;
        position: relative;
        transition: all 1s ease;
      }
      .node-circle.gray { background: #6b7280; }
      .node-circle.blue { background: #3b82f6; }
    </style>
  `;
}

function updateScene5() {
  const versionFork = document.getElementById("version-fork");
  const updateBanner = document.getElementById("update-banner");
  const node1 = document.getElementById("node1");
  const node2 = document.getElementById("node2");
  switch (animationStep) {
    case 1:
      versionFork.style.display = "block";
      versionFork.classList.add("fade-in");
      break;
    case 2:
      updateBanner.style.display = "block";
      break;
    case 3:
      node1.textContent = "v2";
      node1.className = "node-circle blue";
      node2.textContent = "v2";
      node2.className = "node-circle blue";
      break;
    case 4:
      const reuniteInfo = document.createElement("div");
      reuniteInfo.className = "info-text";
      reuniteInfo.style.cssText =
        "position: absolute; bottom: 0.5rem; left: 50%; transform: translateX(-50%); font-size: 0.75rem;";
      reuniteInfo.innerHTML =
        '<i class="fas fa-check-circle"></i> Ağ tekrar tek zincirde birleşti';
      elements.animationArea.appendChild(reuniteInfo);
      break;
  }
}

function showSummary() {
  elements.summaryScreen.style.display = "flex";
}

function resetTutorial() {
  currentScene = 0;
  animationStep = 0;
  animationActive = false;
  buttonEnabled = false;
  progress = 0;
  if (animationInterval) clearInterval(animationInterval);
  if (progressInterval) clearInterval(progressInterval);
  elements.summaryScreen.style.display = "none";
  elements.statusText.style.display = "none";
  elements.continueContainer.style.display = "none";
  updateProgress();
  showModal();
}

function updateSceneProgress() {
  const progressText = document.getElementById("progress-text");
  const sceneProgressFill = document.getElementById("scene-progress-fill");
  progressText.textContent = `${progress}%`;
  sceneProgressFill.style.width = `${progress}%`;
}
