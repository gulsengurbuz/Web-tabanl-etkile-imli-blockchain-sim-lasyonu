// Constants
const STEPS = {
  INTRO_MODAL: 0, // Added intro modal as step 0
  L1_INITIALIZATION: 1,
  WAITING_QUEUE: 2,
  CONGESTION_WARNING: 3,
  USER_COMPLAINTS: 4,
  L2_INTRODUCTION: 5,
  L2_MODAL: 6,
  L2_TRANSITION: 7,
  L2_TRANSACTIONS: 8,
  USER_FEEDBACK: 9,
  BUNDLING_ANIMATION: 10,
  BUNDLE_TO_L1: 11,
  COMPARISON_MODAL: 12,
  FINAL_SUMMARY: 13,
};

// State
let currentStep = STEPS.INTRO_MODAL; // Start with intro modal
let isAnimating = false;
let isLayer1Congested = false;
let gasPrice = 20;
let modalType = null;
let layer1Blockchain = [];
let layer2Blockchain = [];
let waitingUsers = [
  { name: "Alice", emoji: "👩‍💻", status: "waiting", gasFee: 45 },
  { name: "Bob", emoji: "👨‍🎨", status: "waiting", gasFee: 52 },
  { name: "Carol", emoji: "👩‍🔬", status: "waiting", gasFee: 38 },
  { name: "Dave", emoji: "👨‍💼", status: "waiting", gasFee: 61 },
  { name: "Eve", emoji: "👩‍🚀", status: "waiting", gasFee: 47 },
];

let stepTimer = null;
let gasPriceInterval = null;
let simulationStarted = false; // Track if simulation has started

// DOM Elements
const statusCard = document.getElementById("statusCard");
const statusMessage = document.getElementById("statusMessage");
const spinner = document.getElementById("spinner");
const gasPriceElement = document.getElementById("gasPrice");
const stepBadge = document.getElementById("stepBadge");
const layer1Container = document.getElementById("layer1Blockchain");
const layer2Container = document.getElementById("layer2Blockchain");
const l2EmptyState = document.getElementById("l2EmptyState");
const l2Arrow = document.getElementById("l2Arrow");
const usersGrid = document.getElementById("usersGrid");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const resetButton = document.getElementById("resetButton");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalButton = document.getElementById("modalButton");

// Initialize
function init() {
  renderUsers();
  updateUI();
  showModal("intro");

  resetButton.addEventListener("click", resetSimulation);
  modalButton.addEventListener("click", handleModalAction);
}

function startSimulation() {
  simulationStarted = true; // Mark simulation as started
  currentStep = STEPS.L1_INITIALIZATION; // Set to first actual step

  if (currentStep === STEPS.L1_INITIALIZATION) {
    initializeLayer1Blockchain();
  }

  stepTimer = setTimeout(() => {
    if (currentStep < STEPS.FINAL_SUMMARY) {
      advanceStep();
    }
  }, 3000);
}

function initializeLayer1Blockchain() {
  for (let i = 1; i <= 5; i++) {
    setTimeout(() => {
      const block = {
        id: i,
        hash: `0x${Math.random().toString(16).substr(2, 8)}`,
        previousHash:
          i === 1 ? "0x0000" : `0x${Math.random().toString(16).substr(2, 8)}`,
        transactions: [`tx${i}1`, `tx${i}2`, `tx${i}3`],
      };
      layer1Blockchain.push(block);
      renderLayer1Block(block);
    }, i * 500);
  }
}

function advanceStep() {
  setIsAnimating(true);

  setTimeout(() => {
    if (currentStep < STEPS.FINAL_SUMMARY) {
      currentStep++;
    }

    switch (currentStep) {
      case STEPS.WAITING_QUEUE:
        startGasPriceIncrease();
        break;
      case STEPS.CONGESTION_WARNING:
        isLayer1Congested = true;
        showModal("congestion");
        return; // Don't continue auto-advance when modal is shown
      case STEPS.USER_COMPLAINTS:
        hideModal();
        break;
      case STEPS.L2_INTRODUCTION:
        showModal("l2-introduction");
        return; // Don't continue auto-advance when modal is shown
      case STEPS.L2_TRANSITION:
        hideModal();
        transitionUsersToL2();
        break;
      case STEPS.L2_TRANSACTIONS:
        startLayer2Transactions();
        break;
      case STEPS.USER_FEEDBACK:
        showModal("user-feedback");
        return; // Don't continue auto-advance when modal is shown
      case STEPS.BUNDLING_ANIMATION:
        hideModal();
        startBundlingAnimation();
        return; // Return here since startBundlingAnimation will handle next step
      case STEPS.BUNDLE_TO_L1:
        addBundleToLayer1();
        return; // Return here since addBundleToLayer1 will handle next step
      case STEPS.COMPARISON_MODAL:
        showModal("comparison");
        return; // Don't continue auto-advance when modal is shown
      case STEPS.FINAL_SUMMARY:
        showModal("final-summary");
        return; // Don't continue auto-advance when modal is shown
    }

    updateUI();
    setIsAnimating(false);

    if (
      currentStep < STEPS.FINAL_SUMMARY &&
      currentStep !== STEPS.BUNDLING_ANIMATION &&
      currentStep !== STEPS.BUNDLE_TO_L1
    ) {
      stepTimer = setTimeout(() => advanceStep(), 3000);
    }
  }, 1000);
}

function setIsAnimating(animating) {
  isAnimating = animating;
  if (animating) {
    spinner.classList.add("active");
  } else {
    spinner.classList.remove("active");
  }
}

function startGasPriceIncrease() {
  gasPriceInterval = setInterval(() => {
    gasPrice += Math.random() * 10;
    if (gasPrice > 100) {
      gasPrice = 100;
      clearInterval(gasPriceInterval);
    }

    waitingUsers.forEach((user) => {
      user.gasFee += Math.random() * 5;
    });

    updateUI();
    renderUsers();
  }, 1000);

  setTimeout(() => {
    if (gasPriceInterval) {
      clearInterval(gasPriceInterval);
    }
  }, 5000);
}

function transitionUsersToL2() {
  waitingUsers.forEach((user, index) => {
    setTimeout(() => {
      user.status = "layer2";
      renderUsers();
    }, index * 300);
  });
}

function startLayer2Transactions() {
  l2EmptyState.style.display = "none";

  console.log("Starting Layer-2 transactions...");

  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      const block = {
        id: i,
        transactions: [`l2tx${i}1`, `l2tx${i}2`],
      };
      layer2Blockchain.push(block);
      renderLayer2Block(block);

      if (i === 6) {
        console.log("L2 Block #6 created and rendered");
        setTimeout(() => {
          const block6Element = layer2Container.querySelector(
            `[data-block-id="${i}"]`
          );
          if (block6Element) {
            block6Element.style.border = "2px solid #3b82f6";
            block6Element.style.backgroundColor = "#eff6ff";
            setTimeout(() => {
              block6Element.style.border = "1px solid #10b981";
              block6Element.style.backgroundColor = "#f0fdf4";
            }, 1000);
          }
        }, 100);
      }
    }, i * 300);
  }
}

function startBundlingAnimation() {
  // Add bundling animation to L2 blocks
  const l2Blocks = layer2Container.querySelectorAll(".l2-block");
  l2Blocks.forEach((block) => {
    block.style.animation = "pulse 1s infinite";
    block.style.border = "2px solid #3b82f6";
  });

  setTimeout(() => {
    // Stop the bundling animation
    l2Blocks.forEach((block) => {
      block.style.animation = "none";
      block.style.border = "1px solid #d1d5db";
    });

    // Move to bundle addition step
    currentStep = STEPS.BUNDLE_TO_L1;
    updateUI();

    // Add bundle to Layer-1 after a short delay
    setTimeout(() => {
      addBundleToLayer1();
    }, 1000);
  }, 3000); // Increased time for better visual effect
}

function addBundleToLayer1() {
  try {
    console.log("Starting bundle addition to Layer-1...");

    const bundleBlock = {
      id: layer1Blockchain.length + 1,
      hash: `0x${Math.random().toString(16).substr(2, 8)}`,
      previousHash:
        layer1Blockchain.length > 0
          ? layer1Blockchain[layer1Blockchain.length - 1].hash
          : `0x${Math.random().toString(16).substr(2, 8)}`,
      transactions: [`L2 Bundle: ${layer2Blockchain.length} işlem özeti`],
      isSummary: true,
    };

    layer1Blockchain.push(bundleBlock);
    renderLayer1Block(bundleBlock);

    console.log("Bundle block added to Layer-1 successfully");

    waitingUsers.forEach((user, index) => {
      setTimeout(() => {
        user.status = "completed";
        renderUsers();
      }, index * 200);
    });

    const l2Blocks = layer2Container.querySelectorAll(".l2-block");
    l2Blocks.forEach((block, index) => {
      setTimeout(() => {
        block.style.animation = "none";
        block.style.border = "2px solid #10b981";
        block.style.backgroundColor = "#f0f9ff";
        block.style.transform = "scale(0.98)";

        const checkmark = document.createElement("span");
        checkmark.innerHTML = "📦";
        checkmark.style.position = "absolute";
        checkmark.style.right = "0.5rem";
        checkmark.style.top = "0.25rem";
        block.style.position = "relative";
        block.appendChild(checkmark);
      }, index * 100);
    });

    setTimeout(() => {
      currentStep = STEPS.COMPARISON_MODAL;
      updateUI();
      showModal("comparison");
    }, 2000);
  } catch (error) {
    console.error("Error adding bundle to Layer-1:", error);
    setTimeout(() => {
      currentStep = STEPS.COMPARISON_MODAL;
      updateUI();
      showModal("comparison");
    }, 1000);
  }
}

function renderLayer1Block(block) {
  const blockElement = document.createElement("div");
  blockElement.className = `block ${block.isSummary ? "summary" : ""}`;

  blockElement.innerHTML = `
        <div class="block-header">
            <div class="block-id">
                Blok #${block.id}
                ${block.isSummary ? "<span>📦</span>" : ""}
            </div>
            <span class="block-hash">${block.hash.substring(0, 8)}...</span>
        </div>
        <div class="block-info">
            ${
              block.isSummary
                ? "L2 Bundle Özeti"
                : `${block.transactions.length} işlem`
            }
        </div>
    `;

  layer1Container.appendChild(blockElement);
  layer1Container.scrollTop = layer1Container.scrollHeight;
}

function renderLayer2Block(block) {
  const blockElement = document.createElement("div");
  blockElement.className = "l2-block";
  blockElement.setAttribute("data-block-id", block.id);

  blockElement.innerHTML = `
        <div class="l2-block-header">
            <div class="l2-block-id">
                <span>⚡</span>
                L2 #${block.id}
                <span>💰</span>
            </div>
            <span>✅</span>
        </div>
    `;

  layer2Container.appendChild(blockElement);
  layer2Container.scrollTop = layer2Container.scrollHeight;

  console.log(`L2 Block #${block.id} rendered successfully`);
}

function renderUsers() {
  usersGrid.innerHTML = "";

  waitingUsers.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.className = `user-card ${user.status}`;

    let statusText = "";
    if (user.status === "waiting") {
      statusText = `${user.gasFee.toFixed(0)} gwei`;
    } else if (user.status === "layer2") {
      statusText = "⚡ Layer-2'de";
    } else if (user.status === "completed") {
      statusText = "✅ Tamamlandı";
    }

    userElement.innerHTML = `
            <div class="user-emoji">${user.emoji}</div>
            <div class="user-name">${user.name}</div>
            <div class="user-status">${statusText}</div>
            ${
              currentStep === STEPS.USER_COMPLAINTS && user.status === "waiting"
                ? '<div class="user-complaint">"Çok pahalı!"</div>'
                : ""
            }
        `;

    usersGrid.appendChild(userElement);
  });
}

function updateUI() {
  const messages = {
    [STEPS.INTRO_MODAL]: "Layer-2 Blockchain Simülasyonuna Hoş Geldiniz",
    [STEPS.L1_INITIALIZATION]: "Layer-1 blockchain oluşturuluyor...",
    [STEPS.WAITING_QUEUE]: "Kuyrukta bekleyenler...",
    [STEPS.CONGESTION_WARNING]: "🚫 Yoğunluk ve Yüksek Ücret Uyarısı",
    [STEPS.USER_COMPLAINTS]: "Kullanıcılar yüksek ücretlerden şikayetçi",
    [STEPS.L2_INTRODUCTION]: "🚀 Layer-2 sahneye çıkıyor",
    [STEPS.L2_MODAL]: "Layer-2 tanıtımı",
    [STEPS.L2_TRANSITION]: "Layer-2'ye geçiş başlıyor",
    [STEPS.L2_TRANSACTIONS]: "Layer-2'de hızlı işlemler",
    [STEPS.USER_FEEDBACK]: "Kullanıcı geri bildirimi",
    [STEPS.BUNDLING_ANIMATION]: "İşlemler paketleniyor",
    [STEPS.BUNDLE_TO_L1]: "Bundle Layer-1'e ekleniyor",
    [STEPS.COMPARISON_MODAL]: "Layer-2 vs Sidechain karşılaştırması",
    [STEPS.FINAL_SUMMARY]: "Simülasyon tamamlandı",
  };

  statusMessage.textContent = messages[currentStep] || "Bilinmeyen durum";

  statusCard.className = "status-card";
  if (isLayer1Congested) {
    statusCard.classList.add("congested");
  } else if (currentStep >= STEPS.L2_TRANSACTIONS) {
    statusCard.classList.add("layer2-active");
  }

  gasPriceElement.textContent = gasPrice.toFixed(0);

  const displayStep =
    currentStep === STEPS.INTRO_MODAL ? 0 : Math.min(currentStep, 13);
  stepBadge.textContent = `Adım ${displayStep}/13`;
  if (currentStep >= STEPS.L2_TRANSACTIONS) {
    stepBadge.classList.add("active");
  }

  const progress =
    currentStep === STEPS.INTRO_MODAL
      ? 0
      : Math.min((currentStep / 13) * 100, 100);
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `İlerleme: ${Math.round(progress)}%`;

  if (currentStep >= STEPS.L2_INTRODUCTION) {
    l2Arrow.classList.add("visible");
  }
}

function showModal(type) {
  modalType = type;
  const modalData = getModalData(type);

  modalTitle.textContent = modalData.title;
  modalContent.innerHTML = modalData.content;
  modalButton.textContent = modalData.cta;

  modalOverlay.classList.add("active");
}

function hideModal() {
  modalType = null;
  modalOverlay.classList.remove("active");
}

function handleModalAction() {
  const modalData = getModalData(modalType);
  if (modalData.action) {
    modalData.action();
  }

  if (
    modalType !== "intro" &&
    modalType !== "final-summary" &&
    modalType !== "comparison"
  ) {
    setTimeout(() => {
      if (currentStep < STEPS.FINAL_SUMMARY) {
        stepTimer = setTimeout(() => advanceStep(), 2000);
      }
    }, 500);
  }

  if (modalType === "comparison") {
    setTimeout(() => {
      currentStep = STEPS.FINAL_SUMMARY;
      updateUI();
      showModal("final-summary");
    }, 500);
  }
}

function getModalData(type) {
  const modalContent = {
    intro: {
      title: "🚀 Layer-2 Blockchain Nedir?",
      content: `
        <div style="margin-bottom: 1.5rem;">
          <p style="margin-bottom: 1rem; font-size: 1.1rem; line-height: 1.6;">
            Layer-2, blockchain ölçeklenebilirlik problemini çözen ikinci katman çözümleridir.
          </p>
          
          <div style="background: #f3f4f6; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
            <h4 style="margin: 0 0 0.5rem 0; color: #374151;">🎯 Bu Simülasyon Size Gösterecek:</h4>
            <ul style="margin: 0; padding-left: 1.2rem; color: #6b7280;">
              <li>Layer-1 blockchain'deki tıkanıklık problemi</li>
              <li>Yüksek gas ücretleri ve yavaş işlemler</li>
              <li>Layer-2 çözümlerinin nasıl çalıştığı</li>
              <li>Hızlı ve ucuz işlem deneyimi</li>
              <li>Layer-2 vs Sidechain farkları</li>
            </ul>
          </div>
          
          <div style="background: #ecfdf5; padding: 1rem; border-radius: 8px; border-left: 4px solid #10b981;">
            <h4 style="margin: 0 0 0.5rem 0; color: #065f46;">⚡ Layer-2 Avantajları:</h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.5rem;">
              <div style="color: #059669;">🚀 Hızlı İşlemler (~1 saniye)</div>
              <div style="color: #059669;">💰 Düşük Ücretler (0.0001 ETH)</div>
              <div style="color: #059669;">🔒 Layer-1 Güvenliği</div>
              <div style="color: #059669;">📈 Yüksek Verimlilik</div>
            </div>
          </div>
        </div>
      `,
      cta: "Simülasyonu Başlat",
      action: () => {
        hideModal();
        startSimulation();
        updateUI();
      },
    },
    congestion: {
      title: "🚫 Yoğunluk ve Yüksek Ücret Uyarısı",
      content: `
                <div style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 1rem;">Layer-1 blockchain kapasitesi doldu! Gas ücretleri yükseliyor ve işlem onayları gecikiyor.</p>
                    <div class="warning-box">
                        <div class="warning-content">
                            <span class="warning-icon">⚠️</span>
                            <span class="warning-text">Mevcut Gas Ücreti: ${gasPrice.toFixed(
                              0
                            )} gwei</span>
                        </div>
                    </div>
                </div>
            `,
      cta: "Devam Et",
      action: () => hideModal(),
    },
    "l2-introduction": {
      title: "🚀 Layer-2 Blockchain Tanıtımı",
      content: `
                <div style="margin-bottom: 1rem;">
                    <p style="margin-bottom: 1rem;">Layer-2 çözümü ile hızlı ve düşük ücretli işlemler yapabilirsiniz!</p>
                    <div class="feature-grid">
                        <div class="feature-item green">
                            <div class="feature-icon">⚡</div>
                            <div class="feature-title">Hızlı</div>
                            <div class="feature-value">~1 saniye</div>
                        </div>
                        <div class="feature-item blue">
                            <div class="feature-icon">💰</div>
                            <div class="feature-title">Ucuz</div>
                            <div class="feature-value">0.0001 ETH</div>
                        </div>
                    </div>
                </div>
            `,
      cta: "Layer-2'yi Kullanmaya Başla",
      action: () => hideModal(),
    },
    "user-feedback": {
      title: "📊 Kullanıcı Geri Bildirimi",
      content: `
                <div class="modal-stats">
                    <div class="modal-stat green">
                        <div class="modal-stat-value">1s</div>
                        <div class="modal-stat-label">İşlem Süresi</div>
                    </div>
                    <div class="modal-stat blue">
                        <div class="modal-stat-value">0.0001</div>
                        <div class="modal-stat-label">ETH Gas</div>
                    </div>
                    <div class="modal-stat purple">
                        <div class="modal-stat-value">99%</div>
                        <div class="modal-stat-label">Verimlilik</div>
                    </div>
                </div>
            `,
      cta: "Devam Et",
      action: () => hideModal(),
    },
    comparison: {
      title: "⚖️ Layer-2 vs Sidechain",
      content: `
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Özellik</th>
                            <th>Layer-2</th>
                            <th>Sidechain</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Güvenlik</td>
                            <td style="color: #059669;">Layer-1 güvenliği</td>
                            <td style="color: #d97706;">Kendi güvenliği</td>
                        </tr>
                        <tr>
                            <td>Veri Aktarımı</td>
                            <td style="color: #059669;">Layer-1'e yazılır</td>
                            <td style="color: #d97706;">Ayrı zincir</td>
                        </tr>
                        <tr>
                            <td>Risk</td>
                            <td style="color: #059669;">Düşük</td>
                            <td style="color: #dc2626;">Yüksek</td>
                        </tr>
                    </tbody>
                </table>
            `,
      cta: "Devam Et",
      action: () => hideModal(),
    },
    "final-summary": {
      title: "🎉 Layer-2 Teknolojileri",
      content: `
                <div style="margin-bottom: 1rem;">
                    <div class="tech-grid">
                        <div class="tech-item blue">
                            <div class="tech-name">Optimistic</div>
                            <div class="tech-type">Rollup</div>
                        </div>
                        <div class="tech-item purple">
                            <div class="tech-name">ZK</div>
                            <div class="tech-type">Rollup</div>
                        </div>
                        <div class="tech-item green">
                            <div class="tech-name">Validium</div>
                            <div class="tech-type">Hybrid</div>
                        </div>
                        <div class="tech-item orange">
                            <div class="tech-name">Plasma</div>
                            <div class="tech-type">Channels</div>
                        </div>
                    </div>
                    <p style="text-align: center; color: #6b7280; font-size: 0.875rem;">
                        Simülasyon tamamlandı! Layer-2 çözümleri blockchain ölçeklenebilirliğinin geleceğidir.
                    </p>
                </div>
            `,
      cta: "Simülasyonu Bitir",
      action: () => {
        hideModal();
        statusMessage.textContent = "✅ Simülasyon başarıyla tamamlandı!";
        statusCard.classList.add("completed");

        setTimeout(() => {
          resetSimulation();
        }, 2000);
      },
    },
  };

  return modalContent[type] || {};
}

function resetSimulation() {
  if (stepTimer) {
    clearTimeout(stepTimer);
  }
  if (gasPriceInterval) {
    clearInterval(gasPriceInterval);
  }

  currentStep = STEPS.INTRO_MODAL;
  isAnimating = false;
  isLayer1Congested = false;
  gasPrice = 20;
  modalType = null;
  simulationStarted = false;
  layer1Blockchain = [];
  layer2Blockchain = [];
  waitingUsers = [
    { name: "Alice", emoji: "👩‍💻", status: "waiting", gasFee: 45 },
    { name: "Bob", emoji: "👨‍🎨", status: "waiting", gasFee: 52 },
    { name: "Carol", emoji: "👩‍🔬", status: "waiting", gasFee: 38 },
    { name: "Dave", emoji: "👨‍💼", status: "waiting", gasFee: 61 },
    { name: "Eve", emoji: "👩‍🚀", status: "waiting", gasFee: 47 },
  ];

  layer1Container.innerHTML = "";
  layer2Container.innerHTML = "";
  l2EmptyState.style.display = "block";
  l2Arrow.classList.remove("visible");
  stepBadge.classList.remove("active");
  hideModal();

  renderUsers();
  updateUI();
  showModal("intro");
}

document.addEventListener("DOMContentLoaded", init);
