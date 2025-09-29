class BlockchainAnimation {
  constructor() {
    this.currentStep = 1;
    this.networkCreated = false;
    this.blockProposed = false;
    this.blockAdded = false;
    this.transactionData = "";
    this.validationNodes = [];
    this.validationResult = null;
    this.isValidating = false;

    this.blockchain = [
      {
        id: 0,
        hash: "0x000...genesis",
        previousHash: "0x000",
        timestamp: "2024-01-01 00:00:00",
        transaction: "Genesis Block",
        approved: true,
      },
      {
        id: 1,
        hash: "0x1a2b3c4d",
        previousHash: "0x000...genesis",
        timestamp: "2024-01-01 12:00:00",
        transaction: "Alice → Bob 5 BTC",
        approved: true,
      },
      {
        id: 2,
        hash: "0x5e6f7g8h",
        previousHash: "0x1a2b3c4d",
        timestamp: "2024-01-01 18:00:00",
        transaction: "Bob → Charlie 3 BTC",
        approved: true,
      },
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderBlockchain();
  }

  bindEvents() {
    document
      .getElementById("start-network-btn")
      .addEventListener("click", () => this.startNetwork());
    document
      .getElementById("add-block-btn")
      .addEventListener("click", () => this.showBlockInfo());
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetAnimation());
    document
      .getElementById("modal-close")
      .addEventListener("click", () => this.closeModal());

    document.getElementById("modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") {
        this.closeModal();
      }
    });
  }

  startNetwork() {
    this.networkCreated = true;
    this.currentStep = 2;

    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("blockchain-display").classList.remove("hidden");

    this.renderBlockchain();
  }

  showBlockInfo() {
    this.currentStep = 3;
    this.showModal(
      "info",
      "🌐 İzinsiz Blockchain Ağı",
      this.getInfoModalContent()
    );
  }

  showTransactionForm() {
    this.showModal("form", "📦 Yeni Blok Oluştur", this.getFormModalContent());
  }

  submitTransaction() {
    const input = document.getElementById("transaction-input");
    this.transactionData = input.value.trim();

    if (!this.transactionData) {
      this.showToast("⚠️ Uyarı", "Lütfen işlem verisi girin!", "error");
      return;
    }

    this.closeModal();
    this.currentStep = 4;
    this.blockProposed = true;

    setTimeout(() => {
      this.createValidationSimulation();
    }, 500);
  }

  createValidationSimulation() {
    this.validationNodes = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      status: "waiting",
    }));

    this.showModal(
      "validation",
      "🌐 Ağ Doğrulama Süreci",
      this.getValidationModalContent()
    );
    this.isValidating = true;
    this.validationResult = null;

    const nodeResults = [];

    this.validationNodes.forEach((node, index) => {
      setTimeout(() => {
        this.validationNodes[index].status = "validating";
        this.updateValidationDisplay();

        setTimeout(() => {
          const approved = Math.random() > 0.3;
          nodeResults[index] = approved;

          this.validationNodes[index].status = approved
            ? "approved"
            : "rejected";
          this.updateValidationDisplay();

          if (index === this.validationNodes.length - 1) {
            setTimeout(() => {
              const approvedCount = nodeResults.filter(
                (result) => result
              ).length;
              const finalApproved = approvedCount >= 3;
              this.validationResult = finalApproved;
              this.isValidating = false;

              this.updateValidationResult();

              setTimeout(() => {
                if (finalApproved) {
                  this.addNewBlock();
                } else {
                  this.showRejectionMessage();
                }
              }, 2000);
            }, 1000);
          }
        }, 800);
      }, (index + 1) * 1000);
    });
  }

  addNewBlock() {
    const newBlock = {
      id: this.blockchain.length,
      hash: `0x${Math.random().toString(16).substr(2, 8)}`,
      previousHash: this.blockchain[this.blockchain.length - 1].hash,
      timestamp: new Date().toLocaleString("tr-TR"),
      transaction: this.transactionData,
      approved: true,
    };

    this.blockchain.push(newBlock);
    this.blockAdded = true;
    this.currentStep = 5;
    this.closeModal();

    this.renderBlockchain();
    this.showToast(
      "🎉 Başarılı!",
      "Blok öneriniz kabul edildi ve zincire eklendi."
    );

    document.getElementById("add-block-btn").classList.add("hidden");
    document.getElementById("reset-btn").classList.remove("hidden");

    setTimeout(() => {
      this.currentStep = 6;
      this.showModal(
        "final",
        "🔓 İzinsiz Blockchain Nedir?",
        this.getFinalModalContent()
      );
    }, 2000);
  }

  showRejectionMessage() {
    this.closeModal();
    this.showToast(
      "❌ Reddedildi",
      "Yeterli mutabakat sağlanamadı. Tekrar deneyebilirsiniz.",
      "error"
    );
    this.currentStep = 2;
    this.blockProposed = false;
    this.transactionData = "";
  }

  resetAnimation() {
    this.currentStep = 1;
    this.networkCreated = false;
    this.blockProposed = false;
    this.blockAdded = false;
    this.transactionData = "";
    this.validationResult = null;
    this.validationNodes = [];
    this.isValidating = false;

    this.blockchain = [
      {
        id: 0,
        hash: "0x000...genesis",
        previousHash: "0x000",
        timestamp: "2024-01-01 00:00:00",
        transaction: "Genesis Block",
        approved: true,
      },
      {
        id: 1,
        hash: "0x1a2b3c4d",
        previousHash: "0x000...genesis",
        timestamp: "2024-01-01 12:00:00",
        transaction: "Alice → Bob 5 BTC",
        approved: true,
      },
      {
        id: 2,
        hash: "0x5e6f7g8h",
        previousHash: "0x1a2b3c4d",
        timestamp: "2024-01-01 18:00:00",
        transaction: "Bob → Charlie 3 BTC",
        approved: true,
      },
    ];

    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("blockchain-display").classList.add("hidden");
    document.getElementById("add-block-btn").classList.remove("hidden");
    document.getElementById("reset-btn").classList.add("hidden");

    this.renderBlockchain();
  }

  renderBlockchain() {
    const container = document.getElementById("blockchain-container");
    container.innerHTML = "";

    this.blockchain.forEach((block, index) => {
      const blockElement = this.createBlockElement(block);
      container.appendChild(blockElement);

      if (index < this.blockchain.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "block-arrow";
        arrow.textContent = "→";
        container.appendChild(arrow);
      }
    });
  }

  createBlockElement(block) {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block-card";

    if (block.id === this.blockchain.length - 1 && this.blockAdded) {
      blockDiv.classList.add("new-block");
    }

    blockDiv.innerHTML = `
            <div class="block-header">
                <div class="block-title">
                    <span>Blok #${block.id}</span>
                    ${
                      block.approved
                        ? '<span class="block-badge">✅ Onaylı</span>'
                        : ""
                    }
                </div>
            </div>
            <div class="block-content">
                <div class="block-info">
                    <p><strong>Hash:</strong> ${block.hash}</p>
                    <p><strong>Önceki Hash:</strong> ${block.previousHash}</p>
                    <p><strong>Zaman:</strong> ${block.timestamp}</p>
                    <p><strong>İşlem:</strong> ${block.transaction}</p>
                </div>
            </div>
        `;

    return blockDiv;
  }

  showModal(type, title, content) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal").classList.remove("hidden");
  }

  closeModal() {
    document.getElementById("modal").classList.add("hidden");
  }

  getInfoModalContent() {
    return `
            <div style="margin-bottom: 1rem;">
                <p style="margin-bottom: 0.5rem;">• Bu bir izinsiz ağdır: isteyen herkes blok önerebilir.</p>
                <p>• Önerilen blok, topluluk mutabakatı ile onaylanır.</p>
            </div>
            <div class="info-card">
                <h4>Avantajlar:</h4>
                <ul>
                    <li>• Herkes katılabilir</li>
                    <li>• Merkezi otorite yok</li>
                    <li>• Şeffaflık</li>
                    <li>• Topluluk kontrolü</li>
                </ul>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="app.showTransactionForm()">
                Blok Ekleme İşlemine Başla
            </button>
        `;
  }

  getFormModalContent() {
    return `
            <p style="margin-bottom: 1rem;">İşlemini gir. Hash ve timestamp otomatik üretilecek.</p>
            <div class="form-group">
                <label class="form-label" for="transaction-input">İşlem</label>
                <input 
                    id="transaction-input" 
                    class="form-input" 
                    placeholder="Ali → Ayşe 2 BTC"
                    value="${this.transactionData}"
                />
            </div>
            <div class="warning-card">
                <p style="font-size: 0.875rem;">💡 Hash, timestamp sistemce oluşturulur.</p>
            </div>
            <button class="btn btn-success" style="width: 100%;" onclick="app.submitTransaction()">
                🟢 Bloku Ağa Gönder
            </button>
        `;
  }

  getValidationModalContent() {
    return `
            <p style="text-align: center; margin-bottom: 1.5rem;">Blok topluluk tarafından doğrulanıyor...</p>
            <div id="validation-nodes" class="validation-grid">
                ${this.validationNodes
                  .map(
                    (node) => `
                    <div class="validation-node" data-node-id="${node.id}">
                        <div class="node-icon">${this.getNodeIcon(
                          node.status
                        )}</div>
                        <div class="node-id">Node ${node.id}</div>
                        <div class="node-status">${this.getNodeText(
                          node.status
                        )}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div id="validation-result"></div>
        `;
  }

  getFinalModalContent() {
    return `
            <p style="margin-bottom: 1.5rem;">Merkezi otorite olmadan, herkesin katılabildiği ağ. Kabul için konsensüs şart.</p>
            
            <div class="info-card">
                <h4>Özellikler</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.875rem; margin-top: 0.5rem;">
                    <div>• Herkes katılabilir</div>
                    <div>• Herkes yazabilir</div>
                    <div>• Konsensüs (PoW, PoS)</div>
                    <div>• Dağıtık doğrulama</div>
                </div>
            </div>
            
            <div style="margin: 1rem 0;">
                <h4 style="font-weight: 600; margin-bottom: 0.5rem;">Örnekler:</h4>
                <div>
                    <span class="badge badge-outline">Bitcoin</span>
                    <span class="badge badge-outline">Ethereum</span>
                    <span class="badge badge-outline">Solana</span>
                </div>
            </div>
            
            <div class="success-card">
                <h4>Öğrenme Hedefleri ✓</h4>
                <div style="font-size: 0.875rem;">
                    <p style="margin-bottom: 0.25rem;">• Herkesin blok önerebildiğini deneyimledin</p>
                    <p style="margin-bottom: 0.25rem;">• Topluluk onayının zorunlu olduğunu gördün</p>
                    <p style="margin-bottom: 0.25rem;">• Merkeziyetsizlik ve şeffaflık farkını kavradın</p>
                    <p>• Konsensüsün rolünü öğrendin</p>
                </div>
            </div>
            
            <button class="btn btn-primary" style="width: 100%;" onclick="app.closeModal()">
                Anladım
            </button>
        `;
  }

  updateValidationDisplay() {
    this.validationNodes.forEach((node) => {
      const nodeElement = document.querySelector(`[data-node-id="${node.id}"]`);
      if (nodeElement) {
        nodeElement.className = `validation-node ${node.status}`;
        nodeElement.querySelector(".node-icon").textContent = this.getNodeIcon(
          node.status
        );
        nodeElement.querySelector(".node-status").textContent =
          this.getNodeText(node.status);
      }
    });
  }

  updateValidationResult() {
    const resultDiv = document.getElementById("validation-result");
    if (!resultDiv) return;

    const approvedCount = this.validationNodes.filter(
      (n) => n.status === "approved"
    ).length;

    if (this.validationResult) {
      resultDiv.innerHTML = `
                <div class="validation-result success">
                    <div class="result-icon">✅</div>
                    <p style="font-weight: 600;">Blok çoğunluk tarafından onaylandı!</p>
                    <p style="font-size: 0.875rem;">(${approvedCount}/5)</p>
                </div>
            `;
    } else {
      resultDiv.innerHTML = `
                <div class="validation-result failure">
                    <div class="result-icon">❌</div>
                    <p style="font-weight: 600;">Yeterli mutabakat sağlanamadı</p>
                    <p style="font-size: 0.875rem;">(${approvedCount}/5)</p>
                </div>
            `;
    }
  }

  getNodeIcon(status) {
    switch (status) {
      case "waiting":
        return "⏳";
      case "validating":
        return "🔄";
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      default:
        return "⏳";
    }
  }

  getNodeText(status) {
    switch (status) {
      case "waiting":
        return "Bekliyor...";
      case "validating":
        return "Doğruluyor...";
      case "approved":
        return "Onaylandı";
      case "rejected":
        return "Reddedildi";
      default:
        return "Bekliyor...";
    }
  }

  showToast(title, description, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;

    document.getElementById("toast-container").appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }
}

const app = new BlockchainAnimation();
