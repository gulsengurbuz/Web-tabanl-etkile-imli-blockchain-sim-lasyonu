// Global state
let currentStep = 0;
const openBlocks = [
  {
    id: "1",
    hash: "0x1a2b3c...",
    content: "Genesis Block - Açık Ağ",
    timestamp: "2024-01-01 00:00:00",
    type: "open",
  },
  {
    id: "2",
    hash: "0x4d5e6f...",
    content: "Genel Transfer: A → B (5 BTC)",
    timestamp: "2024-01-02 10:30:00",
    type: "open",
  },
];

const privateBlocks = [
  {
    id: "1",
    hash: "0x9z8y7x...",
    content: "Genesis Block - Kapalı Ağ",
    timestamp: "2024-01-01 00:00:00",
    type: "private",
  },
  {
    id: "2",
    hash: "0x6w5v4u...",
    content: "Kurumsal Veri: Dahili Denetim",
    timestamp: "2024-01-02 14:15:00",
    type: "private",
  },
];

const hybridBlocks = [];
let currentUserRole = "none";
let hybridBlockCreated = false;

// User roles configuration
const userRoles = {
  citizen: {
    name: "Vatandaş",
    description: "Sadece açık blockchain verilerini görüntüleyebilir",
    canViewOpen: true,
    canViewPrivate: false,
  },
  employee: {
    name: "Çalışan",
    description:
      "Hem açık hem de kapalı blockchain verilerini görüntüleyebilir",
    canViewOpen: true,
    canViewPrivate: true,
  },
  auditor: {
    name: "Denetçi",
    description: "Tam erişim - tüm verileri görüntüleyebilir ve denetleyebilir",
    canViewOpen: true,
    canViewPrivate: true,
  },
};

// Modal functions
function showModal(content) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = content;
  modal.classList.add("show");
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.classList.remove("show");
}

// Block rendering functions
function renderBlocks() {
  renderOpenBlocks();
  renderPrivateBlocks();
  renderHybridBlocks();
}

function renderOpenBlocks() {
  const container = document.getElementById("open-blocks");
  container.innerHTML = "";

  openBlocks.forEach((block) => {
    const blockElement = createBlockElement(block);
    container.appendChild(blockElement);
  });
}

function renderPrivateBlocks() {
  const container = document.getElementById("private-blocks");
  container.innerHTML = "";

  privateBlocks.forEach((block) => {
    const blockElement = createBlockElement(block);
    container.appendChild(blockElement);
  });
}

function renderHybridBlocks() {
  const container = document.getElementById("hybrid-blocks");
  container.innerHTML = "";

  hybridBlocks.forEach((block) => {
    const blockElement = createBlockElement(block, true);
    container.appendChild(blockElement);
  });
}

function createBlockElement(block, isHybrid = false) {
  const blockDiv = document.createElement("div");
  blockDiv.className = "block";

  // Apply role-based visibility
  if (currentUserRole !== "none") {
    const role = userRoles[currentUserRole];
    if (block.type === "open" && !role.canViewOpen) {
      blockDiv.classList.add("blur-effect");
    }
    if (block.type === "private" && !role.canViewPrivate) {
      blockDiv.classList.add("blur-effect");
    }
  }

  let badgesHtml = "";
  if (isHybrid) {
    badgesHtml = `
            <div class="block-badges">
                <span class="badge badge-open">Açık Kısım</span>
                <span class="badge badge-private">Kapalı Kısım</span>
            </div>
        `;
  }

  blockDiv.innerHTML = `
        <div class="block-hash">${block.hash}</div>
        <div class="block-content">${block.content}</div>
        <div class="block-timestamp">${block.timestamp}</div>
        ${badgesHtml}
    `;

  return blockDiv;
}

// Step progression functions
function startSimulation() {
  currentStep = 1;

  // Add animation to blockchain cards
  const cards = document.querySelectorAll(".blockchain-card");
  cards.forEach((card) => {
    card.classList.add("animate-pulse");
  });

  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove("animate-pulse");
    });

    setTimeout(() => {
      showDifferenceModal();
    }, 3000);
  }, 1000);
}

function showDifferenceModal() {
  const content = `
        <h2>🔀 Açık ve Kapalı Sistemlerin Farkı</h2>
        <div class="modal-grid">
            <div class="modal-card modal-card-green">
                <h3>🔓 Açık Blockchain</h3>
                <p>Şeffaf, herkes kullanabilir ve görüntüleyebilir. Tüm işlemler herkese açıktır.</p>
            </div>
            <div class="modal-card modal-card-red">
                <h3>🔒 Kapalı Blockchain</h3>
                <p>İzinli erişim, gizlilik ve kontrol. Sadece yetkili kişiler görüntüleyebilir.</p>
            </div>
        </div>
        <div class="text-center">
            <p style="font-size: 1.125rem; margin: 20px 0;">Peki ya ikisini birleştirirsek? 🤔</p>
            <button class="btn btn-primary" onclick="continueToHybrid()">Devam</button>
        </div>
    `;
  showModal(content);
  currentStep = 2;
}

function continueToHybrid() {
  hideModal();
  setTimeout(() => {
    showHybridIntroduction();
  }, 500);
}

function showHybridIntroduction() {
  const content = `
        <h2>🔀 Hibrit Blockchain Tanıtımı</h2>
        <p style="text-align: center; font-size: 1.125rem; margin: 20px 0;">
            Hibrit blockchain, açık ve kapalı sistemlerin birleşimidir. Bazı bloklar herkese açık, bazıları sadece yetkili kişilere görünür.
        </p>
        <div class="modal-card">
            <h3>Kullanım Örnekleri:</h3>
            <ul>
                <li>• Devlet kurumları - şeffaflık + gizlilik</li>
                <li>• Bankalar - genel işlemler + özel veriler</li>
                <li>• Şirketler - halka açık raporlar + ticari sırlar</li>
            </ul>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="showHybridBlock()">Hibrit Bloğu Göster</button>
        </div>
    `;
  showModal(content);
  currentStep = 3;
}

function showHybridBlock() {
  hideModal();

  hybridBlockCreated = true;
  const newHybridBlock = {
    id: "1",
    hash: "0xHYBRID1...",
    content: "Hibrit Blok - Açık + Kapalı Veriler",
    timestamp: new Date().toLocaleString("tr-TR"),
    type: "hybrid",
  };

  hybridBlocks.push(newHybridBlock);

  // Show hybrid blockchain card
  const hybridCard = document.getElementById("hybrid-blockchain");
  hybridCard.style.display = "block";
  hybridCard.classList.add("animate-fade-in");

  renderHybridBlocks();
  currentStep = 4;

  setTimeout(() => {
    showOpenSectionModal();
  }, 2000);
}

function showOpenSectionModal() {
  const content = `
        <h2>🔓 Açık Kısım Detayları</h2>
        <div class="modal-card modal-card-green">
            <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 1.25rem;">🌍</span>
                    <span style="font-weight: 600;">Şeffaflık</span>
                </div>
                <p style="font-size: 0.875rem;">Herkes tarafından görüntülenebilir ve doğrulanabilir</p>
            </div>
            <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 1.25rem;">✅</span>
                    <span style="font-weight: 600;">Hesap Verebilirlik</span>
                </div>
                <p style="font-size: 0.875rem;">Tüm işlemler kayıt altında ve denetlenebilir</p>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="showPrivateSectionModal()">Kapalı Kısmı Gör</button>
        </div>
    `;
  showModal(content);
}

function showPrivateSectionModal() {
  const content = `
        <h2>🔒 Kapalı Kısım Detayları</h2>
        <div class="modal-card modal-card-red">
            <div style="margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 1.25rem;">🛡️</span>
                    <span style="font-weight: 600;">Yetkili Erişim</span>
                </div>
                <p style="font-size: 0.875rem;">Sadece izinli kullanıcılar görüntüleyebilir</p>
            </div>
            <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 1.25rem;">🔒</span>
                    <span style="font-weight: 600;">Gizlilik</span>
                </div>
                <p style="font-size: 0.875rem;">Hassas veriler korunur ve şifrelenir</p>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="showUserRoles()">Roller ve Hakları Gör</button>
        </div>
    `;
  showModal(content);
}

function showUserRoles() {
  hideModal();
  currentStep = 5;

  // Show user roles section
  const userRolesSection = document.getElementById("user-roles-section");
  userRolesSection.style.display = "block";
  userRolesSection.classList.add("animate-fade-in");

  // Add click handlers to role cards
  const roleCards = document.querySelectorAll(".role-card");
  roleCards.forEach((card) => {
    card.addEventListener("click", () => {
      const role = card.getAttribute("data-role");
      selectUserRole(role);
    });
  });
}

function selectUserRole(roleKey) {
  currentUserRole = roleKey;
  const role = userRoles[roleKey];

  // Update UI to show selected role
  const roleCards = document.querySelectorAll(".role-card");
  roleCards.forEach((card) => {
    card.classList.remove("selected");
    if (card.getAttribute("data-role") === roleKey) {
      card.classList.add("selected");
    }
  });

  // Apply role-based visibility
  renderBlocks();

  const content = `
        <h2>${role.name} Rolü</h2>
        <div class="modal-card">
            <p style="text-align: center; margin-bottom: 16px;">${
              role.description
            }</p>
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Açık Blockchain:</span>
                    <span style="color: ${
                      role.canViewOpen ? "#16a34a" : "#6b7280"
                    };">
                        ${
                          role.canViewOpen
                            ? "👁️ Görüntüleyebilir"
                            : "🚫 Görüntüleyemez"
                        }
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>Kapalı Blockchain:</span>
                    <span style="color: ${
                      role.canViewPrivate ? "#16a34a" : "#6b7280"
                    };">
                        ${
                          role.canViewPrivate
                            ? "👁️ Görüntüleyebilir"
                            : "🚫 Görüntüleyemez"
                        }
                    </span>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="showBlockAdditionModal()">Devam</button>
        </div>
    `;
  showModal(content);
}

function showBlockAdditionModal() {
  const content = `
        <h2>📦 Yeni Blok Eklenmesi</h2>
        <div class="modal-card modal-card-blue">
            <div style="text-align: center;">
                <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">Firma A → Firma C: 10 BTC</p>
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 16px;">(Genel işlem - herkese açık)</p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <span class="badge badge-open">Açık Blockchain</span>
                    <span style="font-size: 1.25rem;">➕</span>
                    <span class="badge badge-private">Kapalı Blockchain</span>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="addBlocksToBothChains()">Blokları Ekle</button>
        </div>
    `;
  showModal(content);
  currentStep = 6;
}

function addBlocksToBothChains() {
  hideModal();

  const newOpenBlock = {
    id: (openBlocks.length + 1).toString(),
    hash: "0x" + Math.random().toString(16).substr(2, 8) + "...",
    content: "Firma A → Firma C: 10 BTC",
    timestamp: new Date().toLocaleString("tr-TR"),
    type: "open",
  };

  openBlocks.push(newOpenBlock);
  renderOpenBlocks();

  setTimeout(() => {
    const newPrivateBlock = {
      id: (privateBlocks.length + 1).toString(),
      hash: "0x" + Math.random().toString(16).substr(2, 8) + "...",
      content: "Firma A → Firma C: 10 BTC (Detaylı)",
      timestamp: new Date().toLocaleString("tr-TR"),
      type: "private",
    };

    privateBlocks.push(newPrivateBlock);
    renderPrivateBlocks();

    setTimeout(() => {
      showPrivateOnlyBlockModal();
    }, 2000);
  }, 1000);
}

function showPrivateOnlyBlockModal() {
  const content = `
        <h2>🛡️ Sadece Kapalı Zincire Ekleme</h2>
        <div class="modal-card modal-card-red">
            <div style="text-align: center;">
                <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">İç denetim 2025 Q2</p>
                <p style="font-size: 0.875rem; color: #6b7280; margin-bottom: 16px;">Harcama kontrolü ve risk analizi</p>
                <span class="badge badge-private">Sadece Kapalı Blockchain</span>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="addPrivateOnlyBlock()">Özel Bloku Ekle</button>
        </div>
    `;
  showModal(content);
  currentStep = 7;
}

function addPrivateOnlyBlock() {
  hideModal();

  const newPrivateBlock = {
    id: (privateBlocks.length + 1).toString(),
    hash: "0x" + Math.random().toString(16).substr(2, 8) + "...",
    content: "İç denetim 2025 Q2 - Harcama Kontrolü",
    timestamp: new Date().toLocaleString("tr-TR"),
    type: "private",
  };

  privateBlocks.push(newPrivateBlock);
  renderPrivateBlocks();

  setTimeout(() => {
    showBlockLogicModal();
  }, 2000);
}

function showBlockLogicModal() {
  const content = `
        <h2>📋 Hibrit Blockchain Ekleme Mantığı</h2>
        <div style="display: flex; flex-direction: column; gap: 12px;">
            <div class="modal-card modal-card-blue">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 500;">Genel ödeme</span>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="badge badge-open">Open</span>
                        <span>➕</span>
                        <span class="badge badge-private">Private</span>
                    </div>
                </div>
            </div>
            <div class="modal-card modal-card-green">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 500;">Kişisel işlem</span>
                    <span class="badge badge-open">Open</span>
                </div>
            </div>
            <div class="modal-card modal-card-red">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 500;">Kurumsal veri/Denetim</span>
                    <span class="badge badge-private">Private</span>
                </div>
            </div>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="showFinalSection()">Rol Simülasyonuna Geç</button>
        </div>
    `;
  showModal(content);
  currentStep = 8;
}

function showFinalSection() {
  hideModal();
  currentStep = 9;

  // Show final section
  const finalSection = document.getElementById("final-section");
  finalSection.style.display = "block";
  finalSection.classList.add("animate-fade-in");

  // Add click handler to complete button
  document
    .getElementById("complete-simulation")
    .addEventListener("click", showFinalModal);
}

function showFinalModal() {
  const content = `
        <h2>🔀 Hibrit Blockchain Özet</h2>
        <div class="modal-card">
            <h3>Özellikler</h3>
            <ul>
                <li>• Açık ve kapalı sistemlerin avantajlarını birleştirir</li>
                <li>• Rol bazlı erişim kontrolü sağlar</li>
                <li>• Şeffaflık ve gizlilik dengesini korur</li>
                <li>• Esneklik ve güvenlik sunar</li>
            </ul>
        </div>
        <div class="modal-card">
            <h3>Kullanım Alanları</h3>
            <ul>
                <li>• Devlet kurumları ve kamu hizmetleri</li>
                <li>• Finansal kurumlar ve bankacılık</li>
                <li>• Sağlık sektörü ve hasta verileri</li>
                <li>• Tedarik zinciri yönetimi</li>
            </ul>
        </div>
        <div class="text-center">
            <button class="btn btn-primary" onclick="restartSimulation()">Simülasyonu Bitir</button>
        </div>
    `;
  showModal(content);
}

function restartSimulation() {
  hideModal();

  // Reset after 8 minutes as specified
  setTimeout(() => {
    location.reload();
  }, 8 * 60 * 1000);
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  // Render initial blocks
  renderBlocks();

  // Start the simulation after 2 seconds
  setTimeout(() => {
    startSimulation();
  }, 2000);

  // Close modal when clicking outside
  document.getElementById("modal").addEventListener("click", function (e) {
    if (e.target === this) {
      hideModal();
    }
  });
});
