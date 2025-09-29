// Global State
let currentStep = 0;
let mainBlockchain = [];
let sidechains = [];
let gasPrice = 0.001;
let blockDelay = 1000;
let isMainChainSlow = false;
let sidechainCount = 0;
const showControls = true;
let isLoading = false;
let timeouts = [];

// DOM Elements
const statusEl = document.getElementById("status");
const mainBlockchainEl = document.getElementById("main-blockchain");
const bridgeAreaEl = document.getElementById("bridge-area");
const sidechainsSection = document.getElementById("sidechains-section");
const sidechainsContainer = document.getElementById("sidechains-container");
const startBtn = document.getElementById("start-btn");
const sidechainBtn = document.getElementById("sidechain-btn");
const resetBtn = document.getElementById("reset-btn");
const loadingSpinner = document.getElementById("loading-spinner");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const modalCta = document.getElementById("modal-cta");
const modalClose = document.getElementById("modal-close");

// Utility Functions
function clearAllTimeouts() {
  timeouts.forEach((timeout) => clearTimeout(timeout));
  timeouts = [];
}

function addTimeout(callback, delay) {
  const timeout = setTimeout(callback, delay);
  timeouts.push(timeout);
  return timeout;
}

function updateStatus(msg) {
  statusEl.textContent = msg;
}

function generateHash(id) {
  return `0x${Math.random().toString(16).substr(2, 8)}`;
}

function createBlock(id, previousHash, gasPrice = null, isSummary = false) {
  return {
    id,
    hash: generateHash(id),
    previousHash,
    transactions: [`tx_${id}_1`, `tx_${id}_2`],
    gasPrice,
    isSummary,
  };
}

function getGasPriceColor(price) {
  if (price > 0.005) return "badge-red";
  if (price > 0.003) return "badge-orange";
  return "badge-green";
}

function createBlockElement(block, isMainChain = true) {
  const blockEl = document.createElement("div");
  blockEl.className = `block ${block.isSummary ? "summary" : ""} ${
    !isMainChain ? "sidechain" : ""
  } fade-in`;

  const headerEl = document.createElement("div");
  headerEl.className = "block-header";

  const idEl = document.createElement("span");
  idEl.className = "block-id";
  idEl.textContent = `Block #${block.id}`;
  headerEl.appendChild(idEl);

  if (block.isSummary) {
    const summaryIcon = document.createElement("span");
    summaryIcon.textContent = "📊";
    headerEl.appendChild(summaryIcon);
  }

  if (!isMainChain) {
    const fastBadge = document.createElement("span");
    fastBadge.className = "badge badge-green";
    fastBadge.textContent = "⚡ FAST";
    headerEl.appendChild(fastBadge);

    const lowGasBadge = document.createElement("span");
    lowGasBadge.className = "badge badge-blue";
    lowGasBadge.textContent = "💰 LOW GAS";
    headerEl.appendChild(lowGasBadge);
  }

  blockEl.appendChild(headerEl);

  const hashEl = document.createElement("div");
  hashEl.className = "block-hash";
  hashEl.textContent = `Hash: ${block.hash.substring(0, 10)}...`;
  blockEl.appendChild(hashEl);

  if (block.gasPrice) {
    const gasBadge = document.createElement("span");
    gasBadge.className = `badge ${getGasPriceColor(block.gasPrice)}`;
    gasBadge.textContent = `⛽ ${block.gasPrice.toFixed(4)} ETH`;
    blockEl.appendChild(gasBadge);
  }

  if (block.isSummary) {
    const summaryText = document.createElement("div");
    summaryText.style.fontSize = "0.75rem";
    summaryText.style.color = "#8b5cf6";
    summaryText.style.marginTop = "0.25rem";
    summaryText.textContent = "Sidechain özeti";
    blockEl.appendChild(summaryText);
  }

  return blockEl;
}

function renderMainBlockchain() {
  mainBlockchainEl.innerHTML = "";

  mainBlockchain.forEach((block, index) => {
    const blockEl = createBlockElement(block);
    mainBlockchainEl.appendChild(blockEl);

    if (index < mainBlockchain.length - 1) {
      const arrow = document.createElement("div");
      arrow.className = "block-arrow";
      arrow.textContent = "→";
      mainBlockchainEl.appendChild(arrow);
    }
  });

  if (isLoading) {
    const loadingBlock = document.createElement("div");
    loadingBlock.className = "block block-loading";
    loadingBlock.innerHTML = `
            <div class="block-id">Blok işleniyor...</div>
            <div class="block-hash">Yüksek gas ücreti nedeniyle yavaş</div>
        `;
    mainBlockchainEl.appendChild(loadingBlock);
  }
}

function renderSidechains() {
  sidechainsContainer.innerHTML = "";

  sidechains.forEach((sidechain, sidechainIndex) => {
    const sidechainEl = document.createElement("div");
    sidechainEl.className = "sidechain fade-in";

    const titleEl = document.createElement("h3");
    titleEl.className = "sidechain-title";
    titleEl.textContent = `SIDECHAIN #${sidechainIndex + 1}`;
    sidechainEl.appendChild(titleEl);

    const blocksEl = document.createElement("div");
    blocksEl.className = "sidechain-blocks";

    sidechain.forEach((block, blockIndex) => {
      const blockEl = createBlockElement(block, false);
      blocksEl.appendChild(blockEl);

      if (blockIndex < sidechain.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "sidechain-arrow";
        arrow.textContent = "→";
        blocksEl.appendChild(arrow);
      }
    });

    sidechainEl.appendChild(blocksEl);
    sidechainsContainer.appendChild(sidechainEl);
  });
}

// Modal Functions
function showModal(title, content, cta, onCtaClick) {
  modalTitle.textContent = title;
  modalContent.textContent = content;
  modalCta.textContent = cta;
  modalOverlay.classList.remove("hidden");

  modalCta.onclick = () => {
    closeModal();
    onCtaClick();
  };
}

function closeModal() {
  modalOverlay.classList.add("hidden");
}

// Animation Steps
function initializeMainBlockchain() {
  currentStep = 1;
  updateStatus("Başlatılıyor...");
  startBtn.classList.add("hidden");

  const initialBlocks = [];
  let previousHash = "0x000000";

  for (let i = 1; i <= 4; i++) {
    addTimeout(() => {
      const newBlock = createBlock(i, previousHash, 0.001);
      previousHash = newBlock.hash;
      initialBlocks.push(newBlock);
      mainBlockchain = [...initialBlocks];
      renderMainBlockchain();
    }, i * 1000);
  }

  addTimeout(() => {
    showSlowdownEffect();
  }, 5000);
}

function showSlowdownEffect() {
  currentStep = 2;
  updateStatus("Bloklar yavaş işleniyor...");
  isMainChainSlow = true;
  blockDelay = 4000;
  isLoading = true;
  loadingSpinner.classList.remove("hidden");
  renderMainBlockchain();

  addTimeout(() => {
    isLoading = false;
    loadingSpinner.classList.add("hidden");
    const newBlock = createBlock(
      5,
      mainBlockchain[3]?.hash || "0x000000",
      0.003
    );
    mainBlockchain.push(newBlock);
    gasPrice = 0.003;
    renderMainBlockchain();

    addTimeout(() => {
      showCostWarningModal();
    }, 1000);
  }, 4000);
}

function showCostWarningModal() {
  currentStep = 3;
  showModal(
    "⚠️ İşlem Kayıt Altında Ama Maliyeti Yüksek",
    "Blockchain güvenliği sağlıyor ancak yüksek gas ücretleri ve yavaş işlem süreleri kullanıcı deneyimini olumsuz etkiliyor.",
    "Devam Et",
    showCongestionEffect
  );
}

function showCongestionEffect() {
  currentStep = 4;
  updateStatus("Yoğunluk artıyor...");

  let currentGasPrice = gasPrice;

  for (let i = 6; i <= 8; i++) {
    addTimeout(() => {
      currentGasPrice += 0.002;
      const newBlock = createBlock(
        i,
        mainBlockchain[i - 2]?.hash || "0x000000",
        currentGasPrice
      );
      mainBlockchain.push(newBlock);
      gasPrice = currentGasPrice;
      renderMainBlockchain();

      if (i === 8) {
        addTimeout(() => {
          showGasFeeModal();
        }, 1000);
      }
    }, (i - 5) * 2000);
  }
}

function showGasFeeModal() {
  currentStep = 6;
  showModal(
    "⛽ Gas Ücreti Neden Artar?",
    "Blockchain ağında yoğunluk arttıkça gas ücretleri yükselir. Bu durum bekleme sürelerini artırır, maliyetleri yükseltir ve kullanımı zorlaştırır.",
    "Çözümü Gör",
    introduceSidechain
  );
}

function introduceSidechain() {
  currentStep = 7;
  updateStatus("Yan zincir oluşturuluyor...");

  addTimeout(() => {
    createFirstSidechain();
  }, 1000);
}

function createFirstSidechain() {
  const firstSidechain = [];
  let previousHash = "0x000000";

  for (let i = 1; i <= 3; i++) {
    addTimeout(() => {
      const newBlock = createBlock(i, previousHash, 0.0001);
      previousHash = newBlock.hash;
      firstSidechain.push(newBlock);
      sidechains = [firstSidechain];
      bridgeAreaEl.classList.remove("hidden");
      sidechainsSection.classList.remove("hidden");
      renderSidechains();
    }, i * 500);
  }

  sidechainCount = 1;

  addTimeout(() => {
    showSidechainIntroModal();
  }, 2000);
}

function showSidechainIntroModal() {
  currentStep = 8;
  showModal(
    "⚡ Yan Zincir (Sidechain) Nedir?",
    "Sidechain, ana blockchain'e paralel çalışan, hızlı ve düşük maliyetli işlemler sunan yan zincirdir. İşlemler burada gerçekleşir ve özeti ana zincire gönderilir.",
    "Daha Fazla Yan Zincir Gör",
    createMoreSidechains
  );
}

function createMoreSidechains() {
  currentStep = 9;
  updateStatus("Birden fazla yan zincir...");

  // Sidechain #2
  addTimeout(() => {
    const sidechain2 = [];
    for (let i = 1; i <= 2; i++) {
      const newBlock = createBlock(
        i,
        i === 1 ? "0x000000" : sidechain2[i - 2]?.hash,
        0.0001
      );
      sidechain2.push(newBlock);
    }
    sidechains.push(sidechain2);
    sidechainCount = 2;
    renderSidechains();
  }, 1000);

  // Sidechain #3
  addTimeout(() => {
    const sidechain3 = [];
    for (let i = 1; i <= 2; i++) {
      const newBlock = createBlock(
        i,
        i === 1 ? "0x000000" : sidechain3[i - 2]?.hash,
        0.0001
      );
      sidechain3.push(newBlock);
    }
    sidechains.push(sidechain3);
    sidechainCount = 3;
    renderSidechains();

    addTimeout(() => {
      addUserInteractionButton();
    }, 1000);
  }, 2000);
}

function addUserInteractionButton() {
  currentStep = 10;
  updateStatus("Yan zincirleri kullanmaya hazır!");
  sidechainBtn.classList.remove("hidden");
}

function useSidechain() {
  if (sidechains.length > 0) {
    const newBlock = createBlock(
      sidechains[0].length + 1,
      sidechains[0][sidechains[0].length - 1]?.hash,
      0.0001
    );
    sidechains[0].push(newBlock);
    renderSidechains();

    addTimeout(() => {
      showModal(
        "🎉 Sidechain İşlemi Başarılı",
        "İşlem yaklaşık 2 saniyede tamamlandı ve sadece 0.0001 gas ücreti ödendi. Ana zincire göre %99 daha hızlı ve ucuz!",
        "Ana Zincire Geri Dön",
        showBridgeBackModal
      );
    }, 500);
  }
}

function showBridgeBackModal() {
  currentStep = 11;
  const totalSidechainBlocks = sidechains.reduce(
    (acc, chain) => acc + chain.length,
    0
  );
  showModal(
    "🌉 Ana Zincire Dönüş (Bridge Kullanımı)",
    `İstatistikler:\n• Sidechain işlemleri: ${totalSidechainBlocks}\n• Toplam gas tasarrufu: %95\n• Ortalama işlem süresi: 2 saniye`,
    "Özeti Ana Zincire Ekle",
    addSummaryToMainChain
  );
}

function addSummaryToMainChain() {
  currentStep = 12;
  updateStatus("Yan zincir özeti L1'e ekleniyor...");

  addTimeout(() => {
    const summaryBlock = createBlock(
      mainBlockchain.length + 1,
      mainBlockchain[mainBlockchain.length - 1]?.hash || "0x000000",
      0.002,
      true
    );
    mainBlockchain.push(summaryBlock);
    renderMainBlockchain();

    addTimeout(() => {
      showFinalModal();
    }, 2000);
  }, 1000);
}

function showFinalModal() {
  currentStep = 13;
  showModal(
    "⚡ Sidechain'in Özeti",
    "Sidechain teknolojisi sayesinde hızlı ve ucuz işlemler gerçekleştirirken, güvenlik için ana blockchain'e özet gönderildi. Bu sayede ölçeklenebilirlik sorunu çözüldü!",
    "Simülasyonu Bitir",
    cleanup
  );
}

function cleanup() {
  clearAllTimeouts();
  currentStep = 0;
  mainBlockchain = [];
  sidechains = [];
  gasPrice = 0.001;
  blockDelay = 1000;
  isMainChainSlow = false;
  sidechainCount = 0;
  isLoading = false;

  updateStatus("MAIN BLOCKCHAIN (Layer 1) - Hazırlanıyor...");

  // Reset UI
  mainBlockchainEl.innerHTML = "";
  sidechainsContainer.innerHTML = "";
  bridgeAreaEl.classList.add("hidden");
  sidechainsSection.classList.add("hidden");
  startBtn.classList.remove("hidden");
  sidechainBtn.classList.add("hidden");
  loadingSpinner.classList.add("hidden");
}

// Event Listeners
startBtn.addEventListener("click", initializeMainBlockchain);
sidechainBtn.addEventListener("click", useSidechain);
resetBtn.addEventListener("click", cleanup);
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  console.log("Blockchain Simülasyonu Hazır!");
});
