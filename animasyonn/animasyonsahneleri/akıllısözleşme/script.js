const $id = (id) => document.getElementById(id);
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const addCls = (id, cls) => $id(id)?.classList.add(cls);
const removeCls = (id, cls) => $id(id)?.classList.remove(cls);
const setStyle = (id, styles) => {
  const el = $id(id);
  if (el) Object.assign(el.style, styles);
};

const scenes = [
  {
    id: 1,
    title: "Kurallı Kutu",
    content:
      "Şimdi düşünün… karşınızda bir otomat var. Kuralı basit: Para atarsanız, size soda verir. Bu otomat, bir akıllı sözleşmenin basit bir benzetmesidir.",
    keyPoint:
      "Kurallar önceden tanımlanır ve kimse müdahale etmeden, şartlar sağlandığında işlem otomatik gerçekleşir.",
    animation: "vending-machine",
  },
  {
    id: 2,
    title: "Blockchain Üzerinde Akıllı Sözleşme",
    content:
      "Peki bu mantık blockchain üzerinde nasıl çalışır? İşte burada kod devreye girer. Akıllı sözleşme dediğimiz şey aslında, blockchain üzerinde çalışan bir yazılım kodudur.",
    keyPoint:
      "Kod bir kez blok zincirine kaydedildi mi, kimse onu değiştiremez.",
    animation: "blockchain-code",
  },
  {
    id: 3,
    title: "Otomatik İşlem Akışı",
    content:
      "Akıllı sözleşmeler, belirlenen şartlar gerçekleştiğinde otomatik olarak işlem yapar. Ne bir yöneticiye, ne de onay bekleyen bir memura ihtiyaç vardır.",
    keyPoint: "Şart → İşlem → Sonuç zinciri otomatik çalışır.",
    animation: "auto-flow",
  },
  {
    id: 4,
    title: "Gerçek Hayattan Örnek",
    content:
      "Diyelim ki bir ürün satın aldınız. Akıllı sözleşme, kargo teslim edildiğinde otomatik olarak satıcıya ödemeyi yapar.",
    keyPoint:
      "Ne satıcıyı ararsınız, ne de banka bekletir… Her şey şeffaf ve otomatik gerçekleşir.",
    animation: "real-example",
  },
  {
    id: 5,
    title: "Avantajlar",
    content:
      "Akıllı sözleşmeler; hızlıdır, güvenlidir, otomatik çalışır ve herkes tarafından doğrulanabilir.",
    keyPoint: "Temel faydalar: Hız, Güvenlik, Otomasyon, Şeffaflık",
    animation: "advantages",
  },
];

let currentScene = 0;
let isPlaying = false;

let timeouts = [];
const later = (fn, ms) => {
  const t = setTimeout(fn, ms);
  timeouts.push(t);
  return t;
};
const clearAllTimeouts = () => {
  timeouts.forEach(clearTimeout);
  timeouts = [];
};

let sceneTitle,
  sceneBadge,
  animationContainer,
  playBtn,
  resetBtn,
  prevBtn,
  nextBtn,
  sceneIndicators;
let modal, modalTitle, modalContent, modalKeyPoint, startAnimationBtn, closeBtn;

function init() {
  sceneTitle = $id("scene-title");
  sceneBadge = $id("scene-badge");
  animationContainer = $id("animation-container");
  playBtn = $id("play-btn");
  resetBtn = $id("reset-btn");
  prevBtn = $id("prev-btn");
  nextBtn = $id("next-btn");
  sceneIndicators = $id("scene-indicators");

  modal = $id("info-modal");
  modalTitle = $id("modal-title");
  modalContent = $id("modal-content");
  modalKeyPoint = $id("modal-key-point");
  startAnimationBtn = $id("start-animation-btn");
  closeBtn = $(".close");

  createSceneIndicators();
  updateScene();
  setupEventListeners();
  openModal();
}

function createSceneIndicators() {
  if (!sceneIndicators) return;
  sceneIndicators.innerHTML = "";
  scenes.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "scene-dot";
    if (index === currentScene) dot.classList.add("active");
    dot.addEventListener("click", () => goToScene(index));
    sceneIndicators.appendChild(dot);
  });
}

function setupEventListeners() {
  playBtn?.addEventListener("click", toggleAnimation);
  resetBtn?.addEventListener("click", resetAnimation);
  prevBtn?.addEventListener("click", prevScene);
  nextBtn?.addEventListener("click", nextScene);
  startAnimationBtn?.addEventListener("click", startAnimationFromModal);
  closeBtn?.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

function updateScene() {
  const scene = scenes[currentScene];
  if (sceneTitle) sceneTitle.textContent = `Sahne ${scene.id}: ${scene.title}`;
  if (sceneBadge)
    sceneBadge.textContent = `${currentScene + 1} / ${scenes.length}`;

  if (prevBtn) prevBtn.disabled = currentScene === 0;
  if (nextBtn) nextBtn.disabled = currentScene === scenes.length - 1;

  $$(".scene-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentScene);
  });

  stopAnimation();
  renderAnimation();
  openModal();
}

/* --- Navigasyon --- */
function prevScene() {
  if (currentScene > 0) {
    currentScene--;
    updateScene();
  }
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    updateScene();
  }
}

function goToScene(index) {
  currentScene = index;
  updateScene();
}

/* --- Animasyon kontrol --- */
function toggleAnimation() {
  if (isPlaying) {
    stopAnimation();
  } else {
    startAnimation();
  }
}

function startAnimation() {
  isPlaying = true;
  if (playBtn) playBtn.innerHTML = "⏸️ Durdur";

  const scene = scenes[currentScene];
  switch (scene.animation) {
    case "vending-machine":
      startVendingMachineAnimation();
      break;
    case "blockchain-code":
      startBlockchainAnimation();
      break;
    case "auto-flow":
      startAutoFlowAnimation();
      break;
    case "real-example":
      startRealExampleAnimation();
      break;
    case "advantages":
      startAdvantagesAnimation();
      break;
  }
}

function stopAnimation() {
  isPlaying = false;
  if (playBtn) playBtn.innerHTML = "▶️ Başlat";
  clearAllTimeouts();
}

function resetAnimation() {
  stopAnimation();
  setTimeout(() => {
    renderAnimation();
    startAnimation();
  }, 100);
}

/* --- Modal --- */
function openModal() {
  if (!modal) return;
  const scene = scenes[currentScene];
  if (modalTitle) modalTitle.textContent = `Sahne ${scene.id}: ${scene.title}`;
  if (modalContent) modalContent.textContent = scene.content;
  if (modalKeyPoint) modalKeyPoint.textContent = scene.keyPoint;
  modal.style.display = "block";
}

function closeModal() {
  if (!modal) return;
  modal.style.display = "none";
}

function startAnimationFromModal() {
  closeModal();
  later(() => startAnimation(), 200);
}

/* --- Sahne görünümü kur --- */
function renderAnimation() {
  const scene = scenes[currentScene];
  if (!animationContainer) return;

  animationContainer.className = `animation-container ${scene.animation}-bg`;
  animationContainer.innerHTML = "";

  switch (scene.animation) {
    case "vending-machine":
      renderVendingMachine();
      break;
    case "blockchain-code":
      renderBlockchain();
      break;
    case "auto-flow":
      renderAutoFlow();
      break;
    case "real-example":
      renderRealExample();
      break;
    case "advantages":
      renderAdvantages();
      break;
  }
}

/* --- Vending Machine --- */
function renderVendingMachine() {
  if (!animationContainer) return;
  animationContainer.innerHTML = `
    <div style="position: relative;">
      <div class="vending-machine">
        <div class="vending-display">
          <div style="font-size: 24px; margin-bottom: 4px;">🥤</div>
          <div style="font-size: 0.7rem;">SODA</div>
        </div>
        <div class="coin-slot" id="coin-slot"></div>
        <div class="money-indicator">₺</div>
        <div class="dispensing-area"></div>
      </div>
      <div class="coin" id="coin" style="left: -60px; top: 24px;">₺</div>
      <div class="soda" id="soda" style="right: -60px; bottom: 12px; opacity: 0; transform: scale(0.5);"></div>
    </div>
  `;
}

function startVendingMachineAnimation() {
  later(() => {
    setStyle("coin", {
      left: "48px",
      top: "64px",
      opacity: "0",
      transform: "rotate(720deg)",
    });
    addCls("coin-slot", "glow");
  }, 500);

  later(() => {
    setStyle("soda", { right: "-16px", opacity: "1", transform: "scale(1)" });
    addCls("soda", "moving");
  }, 1500);

  later(() => {
    const successMsg = document.createElement("div");
    successMsg.className = "success-message";
    successMsg.textContent = "✅ İşlem Tamamlandı!";
    animationContainer?.appendChild(successMsg);
  }, 2000);

  later(() => stopAnimation(), 3500);
}

/* --- Blockchain --- */
function renderBlockchain() {
  if (!animationContainer) return;
  animationContainer.innerHTML = `
    <div class="blockchain-container">
      ${[0, 1, 2, 3]
        .map(
          (index) => `
        <div>
          ${
            index < 3
              ? `<div class="connection-line" id="connection-${index}"></div>`
              : ""
          }
          <div class="block" id="block-${index}">
            ${
              index === 1
                ? '<div class="code-display" id="code-display"></div>'
                : '<div class="block-content"></div>'
            }
          </div>
          <div class="block-number">#${index + 1}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function startBlockchainAnimation() {
  const fullCode = "if(condition) { execute(); }";
  let codeIndex = 0;

  [0, 1, 2, 3].forEach((blockIndex, i) => {
    later(() => {
      $id(`block-${blockIndex}`)?.classList.add("active");
      if (blockIndex < 3) addCls(`connection-${blockIndex}`, "active");

      if (blockIndex === 1) {
        const codeDisplay = $id("code-display");
        const typeCode = () => {
          if (!codeDisplay) return;
          if (codeIndex < fullCode.length) {
            codeDisplay.textContent = fullCode.slice(0, codeIndex + 1);
            codeIndex++;
            setTimeout(typeCode, 80);
          }
        };
        typeCode();
      }
    }, i * 500 + 200);
  });

  later(() => {
    const lockIndicator = document.createElement("div");
    lockIndicator.className = "lock-indicator";
    lockIndicator.innerHTML =
      "<span>🔒</span><span>Değiştirilemez & Güvenli</span>";
    animationContainer?.appendChild(lockIndicator);
  }, 2800);

  later(() => stopAnimation(), 4500);
}

/* --- Auto Flow --- */
function renderAutoFlow() {
  if (!animationContainer) return;
  animationContainer.innerHTML = `
    <div class="flow-container">
      <div class="flow-step conditions" id="conditions-step">
        <div>Şartlar</div>
        <div id="conditions-content" style="font-size: 0.75rem;"></div>
      </div>
      <div class="flow-arrow" id="arrow-1">
        <div class="arrow-line"></div>
        <div class="arrow-head"></div>
      </div>
      <div class="flow-step smart-contract" id="contract-step">
        <div>Akıllı Sözleşme</div>
        <div id="contract-content" style="font-size: 0.75rem;"></div>
      </div>
      <div class="flow-arrow" id="arrow-2">
        <div class="arrow-line" style="background: #3b82f6;"></div>
        <div class="arrow-head" style="border-left-color: #3b82f6;"></div>
      </div>
      <div class="flow-step result" id="result-step">
        <div>Sonuç</div>
        <div id="result-content" style="font-size: 0.75rem;"></div>
      </div>
    </div>
  `;
}

function startAutoFlowAnimation() {
  later(() => {
    addCls("conditions-step", "active");
    const cc = $id("conditions-content");
    if (cc) {
      cc.innerHTML =
        '<div style="display:flex;align-items:center;gap:3px;"><span style="animation:bounce 0.4s infinite;">✓</span><span>Kargo teslim edildi</span></div>';
    }
    addCls("arrow-1", "visible");
  }, 500);

  later(() => {
    addCls("contract-step", "active");
    const con = $id("contract-content");
    if (con) {
      con.innerHTML =
        '<div style="display:flex;align-items:center;gap:3px;"><div style="width:6px;height:6px;background:white;border-radius:50%;animation:pulse 0.8s infinite;"></div><span>Kod çalışıyor...</span></div>';
    }
    addCls("arrow-2", "visible");
  }, 1300);

  later(() => {
    addCls("result-step", "active");
    const rc = $id("result-content");
    if (rc) {
      rc.innerHTML =
        '<div style="display:flex;align-items:center;gap:3px;"><span style="font-size:18px;animation:bounce 0.8s infinite;">💰</span><span>Ödeme yapıldı!</span></div>';
    }
  }, 2200);

  later(() => stopAnimation(), 3500);
}

/* --- Real Example --- */
function renderRealExample() {
  if (!animationContainer) return;
  animationContainer.innerHTML = `
    <div class="delivery-container">
      <div class="delivery-person">
        <div class="delivery-avatar customer-avatar" id="customer-avatar">👤</div>
        <div>Müşteri</div>
        <div id="customer-status" style="font-size: 0.7rem;"></div>
      </div>
      <div class="delivery-path">
        <div class="path-line">
          <div class="path-progress" id="path-progress"></div>
        </div>
        <div class="package" id="package-element">📦</div>
      </div>
      <div class="delivery-person">
        <div class="delivery-avatar seller-avatar" id="seller-avatar">🏪</div>
        <div>Satıcı</div>
        <div id="seller-status" style="font-size: 0.7rem;"></div>
      </div>
    </div>
  `;
}

function startRealExampleAnimation() {
  later(() => {
    setStyle("path-progress", { width: "100%" });
    setStyle("package-element", { left: "calc(100% - 36px)" });
    addCls("package-element", "moving");
  }, 700);

  later(() => {
    setStyle("package-element", { left: "calc(100% - 18px)" });
  }, 1800);

  later(() => {
    addCls("customer-avatar", "success");
    addCls("seller-avatar", "success");

    const cs = $id("customer-status");
    const ss = $id("seller-status");
    if (cs)
      cs.innerHTML =
        '<div style="color:#059669;font-weight:600;animation:pulse 1.5s infinite;">Teslim alındı!</div>';
    if (ss)
      ss.innerHTML =
        '<div style="color:#059669;font-weight:600;animation:pulse 1.5s infinite;">Ödeme alındı!</div>';

    const payment = document.createElement("div");
    payment.className = "payment-animation";
    payment.innerHTML =
      '<div class="payment-icon">💰</div><div class="payment-text">Otomatik Ödeme Gerçekleşti!</div>';
    animationContainer?.appendChild(payment);
  }, 2800);

  later(() => stopAnimation(), 4500);
}

/* --- Advantages --- */
function renderAdvantages() {
  if (!animationContainer) return;
  const advantages = [
    { icon: "⚡", title: "Hızlı", class: "speed" },
    { icon: "🔒", title: "Güvenli", class: "security" },
    { icon: "🤖", title: "Otomatik", class: "automation" },
    { icon: "📜", title: "Şeffaf", class: "transparency" },
  ];

  animationContainer.innerHTML = `
    <div class="advantages-grid">
      ${advantages
        .map(
          (adv, index) => `
        <div class="advantage-item" id="advantage-${index}">
          <div class="advantage-icon ${adv.class}" id="icon-${index}">${adv.icon}</div>
          <div>${adv.title}</div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function startAdvantagesAnimation() {
  [0, 1, 2, 3].forEach((i) => {
    later(() => {
      addCls(`advantage-${i}`, "visible");
      addCls(`icon-${i}`, "visible");
    }, i * 250 + 300);
  });

  later(() => stopAnimation(), 2500);
}

/* --- DOM yüklendiğinde başlat --- */
document.addEventListener("DOMContentLoaded", init);
