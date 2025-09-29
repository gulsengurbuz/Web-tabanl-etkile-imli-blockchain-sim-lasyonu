class BlockchainDemo {
  constructor() {
    this.currentStep = 1;
    this.networkCreated = false;
    this.userAuthorized = false;
    this.blockAdded = false;
    this.authInfo = null;

    this.blockchain = [
      {
        id: 1,
        hash: "genesis123",
        previousHash: "0",
        data: "Genesis Block",
        locked: true,
      },
      {
        id: 2,
        hash: "abc456def",
        previousHash: "genesis123",
        data: "İşlem Verileri #1",
        locked: true,
      },
      {
        id: 3,
        hash: "xyz789ghi",
        previousHash: "abc456def",
        data: "İşlem Verileri #2",
        locked: true,
      },
    ];

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document
      .getElementById("startNetworkBtn")
      .addEventListener("click", () => this.startNetwork());
    document
      .getElementById("addNodeBtn")
      .addEventListener("click", () => this.attemptAddNode());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("modalAction")
      .addEventListener("click", () => this.handleModalAction());
  }

  startNetwork() {
    this.networkCreated = true;
    this.currentStep = 2;
    this.updateUI();
    this.renderBlockchain();
  }

  attemptAddNode() {
    this.currentStep = 3;
    this.showModal("access-denied");
  }

  showPermissionExplanation() {
    this.currentStep = 4;
    this.showModal("permission-explanation");
  }

  showAuthorizationSystem() {
    this.currentStep = 5;
    this.showModal("authorization-system");
  }

  showAuthorizationForm() {
    this.authInfo = {
      publicKey: "0x" + Math.random().toString(16).substr(2, 40),
      token: "JWT_" + Math.random().toString(36).substr(2, 20),
      username: "validator_" + Math.floor(Math.random() * 1000),
      email: "validator@kurumsal.com",
      role: "Validatör",
    };

    this.userAuthorized = true;
    this.currentStep = 6;
    this.showModal("authorization-success");
    this.updateUI();
  }

  addNewBlock() {
    const lastBlock = this.blockchain[this.blockchain.length - 1];
    const newBlock = {
      id: this.blockchain.length + 1,
      hash: "new" + Math.random().toString(36).substr(2, 9),
      previousHash: lastBlock.hash,
      data: `Yeni İşlem Verileri #${this.blockchain.length}`,
      locked: false,
    };

    this.blockchain.push(newBlock);
    this.blockAdded = true;
    this.renderBlockchain();

    setTimeout(() => {
      this.currentStep = 7;
      this.showModal("completion-success");
    }, 1500);
  }

  showModal(type) {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modalTitle");
    const content = document.getElementById("modalContent");
    const actionBtn = document.getElementById("modalAction");

    const modalConfigs = {
      "access-denied": {
        title: "🚫 Erişim Reddedildi",
        content: `
                    <div style="margin-bottom: 1rem;">
                        <p style="margin-bottom: 1rem;">Bu blockchain bir <strong>İZİNLİ</strong> ağdır ve herkes genişletemez.</p>
                        <p>Gözlem (okuma) çoğu zaman şeffaftır; yazma/blok ekleme yetki gerektirir.</p>
                    </div>
                `,
        cta: "Neden katılamadığımı anlamak istiyorum",
        action: () => this.showPermissionExplanation(),
      },
      "permission-explanation": {
        title: "🔐 İzinli Blockchain Nasıl Çalışır?",
        content: `
                    <div class="modal-grid">
                        <div class="modal-card">
                            <div class="modal-card-title">Açık Blockchain</div>
                            <div class="modal-card-item">✅ Herkes okuyabilir</div>
                            <div class="modal-card-item">✅ Herkes yazabilir</div>
                            <div class="modal-card-example">Örnek: Bitcoin, Ethereum</div>
                        </div>
                        <div class="modal-card">
                            <div class="modal-card-title">İzinli Blockchain</div>
                            <div class="modal-card-item">✅ Okuma: genellikle şeffaf</div>
                            <div class="modal-card-item">❌ Yazma: sadece yetkililer</div>
                            <div class="modal-card-example">Örnek: Hyperledger, Quorum</div>
                        </div>
                    </div>
                `,
        cta: "Nasıl yetkili olabileceğimi öğren",
        action: () => this.showAuthorizationSystem(),
      },
      "authorization-system": {
        title: "🎯 Kurumsal Yetkilendirme Süreci",
        content: `
                    <div class="auth-steps">
                        <div class="auth-step">
                            <div class="auth-step-icon">👤</div>
                            <span><strong>Seçim Sistemi:</strong> Katılımcı/Doğrulayıcı rolleri</span>
                        </div>
                        <div class="auth-step">
                            <div class="auth-step-icon">🔑</div>
                            <span><strong>Kriterler:</strong> Rol, KYC, IP/e-posta doğrulama</span>
                        </div>
                        <div class="auth-step">
                            <div class="auth-step-icon">🏢</div>
                            <span><strong>Yetki Sınırları:</strong> Kurumsal yönetişim</span>
                        </div>
                    </div>
                `,
        cta: "Yetkili olmak istiyorum",
        action: () => this.showAuthorizationForm(),
      },
      "authorization-success": {
        title: "🎉 Yetkilendirme Başarılı",
        content: `
                    <div style="margin-bottom: 1rem;">
                        <span style="background: #f3f4f6; color: #374151; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.875rem;">
                            Rolün: ${this.authInfo?.role}
                        </span>
                    </div>
                    <div class="auth-info">
                        <div class="auth-info-item">
                            <div class="auth-info-icon">🔑</div>
                            <div class="auth-info-content">
                                <div class="auth-info-label">Public Key</div>
                                <div class="auth-info-value">${this.authInfo?.publicKey}</div>
                            </div>
                        </div>
                        <div class="auth-info-item">
                            <div class="auth-info-icon">✅</div>
                            <div class="auth-info-content">
                                <div class="auth-info-label">İmzalı Token</div>
                                <div class="auth-info-value">${this.authInfo?.token}</div>
                            </div>
                        </div>
                        <div class="auth-info-item">
                            <div class="auth-info-icon">📧</div>
                            <div class="auth-info-content">
                                <div class="auth-info-label">E-posta Doğrulama</div>
                                <div class="auth-info-value">${this.authInfo?.email}</div>
                            </div>
                        </div>
                        <div class="auth-info-item">
                            <div class="auth-info-icon">🌐</div>
                            <div class="auth-info-content">
                                <div class="auth-info-label">IP Onayı</div>
                                <div class="auth-info-value">192.168.1.100 ✅</div>
                            </div>
                        </div>
                    </div>
                `,
        cta: "🟩 Blok Ekle",
        action: () => this.addNewBlock(),
      },
      "completion-success": {
        title: "🎊 İşlem Tamamlandı",
        content: `
                    <div class="completion-steps">
                        <div class="completion-step">
                            <div class="completion-icon">✅</div>
                            <span>Blok, yetkili kullanıcılarca doğrulandı</span>
                        </div>
                        <div class="completion-step">
                            <div class="completion-icon">✅</div>
                            <span>Konsorsiyum onayı alındı</span>
                        </div>
                        <div class="completion-step">
                            <div class="completion-icon">✅</div>
                            <span>Zincire eklendi: BLOCK ${this.blockchain.length}</span>
                        </div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-text">
                            <strong>Özet:</strong> İzinli blockchain hassas veriler ve kurum süreçleri için uygundur; kontrol + şeffaflık dengesi sağlar.
                        </div>
                    </div>
                `,
        cta: "Eğitimi Bitir",
        action: () => this.closeModal(),
      },
    };

    const config = modalConfigs[type];
    if (!config) return;

    title.textContent = config.title;
    content.innerHTML = config.content;
    actionBtn.textContent = config.cta;
    actionBtn.onclick = config.action;

    modal.classList.remove("hidden");
  }

  closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");

    if (this.currentStep === 7) {
      setTimeout(() => this.resetDemo(), 2000);
    }
  }

  handleModalAction() {}

  resetDemo() {
    this.currentStep = 1;
    this.networkCreated = false;
    this.userAuthorized = false;
    this.blockAdded = false;
    this.authInfo = null;
    this.blockchain = this.blockchain.slice(0, 3);
    this.updateUI();
  }

  renderBlockchain() {
    const container = document.getElementById("blockchainBlocks");
    container.innerHTML = "";

    this.blockchain.forEach((block, index) => {
      const blockCard = document.createElement("div");
      blockCard.className = `block-card ${!block.locked ? "unlocked" : ""}`;
      if (index === this.blockchain.length - 1 && this.blockAdded) {
        blockCard.classList.add("new-block");
      }

      blockCard.innerHTML = `
                <div class="block-header">
                    <div class="block-title">Block ${block.id}</div>
                    <div class="block-icon ${
                      block.locked ? "locked" : "unlocked"
                    }">
                        ${block.locked ? "🔒" : "✅"}
                    </div>
                </div>
                <div class="block-field">
                    <div class="block-field-label">Hash:</div>
                    <div class="block-field-value">${block.hash}</div>
                </div>
                <div class="block-field">
                    <div class="block-field-label">Previous:</div>
                    <div class="block-field-value">${block.previousHash}</div>
                </div>
                <div class="block-field">
                    <div class="block-field-label">Data:</div>
                    <div class="block-data">${block.data}</div>
                </div>
            `;

      container.appendChild(blockCard);

      if (index < this.blockchain.length - 1) {
        const connector = document.createElement("div");
        connector.className = "block-connector";
        connector.innerHTML = `
                    <div class="connector-line"></div>
                    <div class="connector-arrow"></div>
                `;
        container.appendChild(connector);
      }
    });
  }

  updateUI() {
    document
      .getElementById("step1")
      .classList.toggle("hidden", this.networkCreated);
    document
      .getElementById("blockchainContainer")
      .classList.toggle("hidden", !this.networkCreated);
    document
      .getElementById("addNodeBtn")
      .classList.toggle("hidden", this.currentStep !== 2);
    document
      .getElementById("authorizedBadge")
      .classList.toggle(
        "hidden",
        !this.userAuthorized || this.currentStep >= 6
      );

    document.querySelectorAll(".dot").forEach((dot, index) => {
      const step = index + 1;
      dot.classList.toggle("active", step <= this.currentStep);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BlockchainDemo();
});
