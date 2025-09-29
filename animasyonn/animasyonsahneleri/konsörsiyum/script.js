class ConsortiumBlockchainAnimation {
  constructor() {
    this.currentStep = 0;
    this.consortiumFormed = false;
    this.blockchainCreated = false;
    this.nodesAssigned = false;
    this.blockProposed = false;
    this.votingInProgress = false;
    this.votingResults = {};

    this.companies = [
      { id: "A", name: "Firma A", color: "company-a" },
      { id: "B", name: "Firma B", color: "company-b" },
      { id: "C", name: "Firma C", color: "company-c" },
      { id: "D", name: "Firma D", color: "company-d" },
    ];

    this.initialBlocks = [
      {
        id: 0,
        prevHash: "0000",
        hash: "abc123",
        transactions: ["Genesis Block"],
        timestamp: "2024-01-01",
      },
      {
        id: 1,
        prevHash: "abc123",
        hash: "def456",
        transactions: ["Firma B → Firma A: 1000 TL"],
        timestamp: "2024-01-02",
      },
      {
        id: 2,
        prevHash: "def456",
        hash: "ghi789",
        transactions: ["Firma C → Firma D: 750 TL"],
        timestamp: "2024-01-03",
      },
    ];

    this.blocks = [...this.initialBlocks];
    this.peers = [];

    this.init();
  }

  init() {
    document.getElementById("start-btn").addEventListener("click", () => {
      this.startAnimation();
    });

    document.getElementById("modal-action").addEventListener("click", () => {
      if (this.currentModalAction) {
        this.currentModalAction();
      }
    });
  }

  startAnimation() {
    document.getElementById("start-section").classList.add("hidden");
    this.currentStep = 0;
    setTimeout(() => this.showCompanies(), 1000);
  }

  showCompanies() {
    this.currentStep = 1;
    document.getElementById("companies-section").classList.remove("hidden");

    const cards = document.querySelectorAll(".company-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("animate-in");
      }, index * 200);
    });

    setTimeout(() => this.mergeCompanies(), 3000);
  }

  mergeCompanies() {
    this.consortiumFormed = true;
    this.currentStep = 2;

    document
      .getElementById("companies-grid")
      .classList.add("consortium-formed");
    document.getElementById("consortium-formed").classList.remove("hidden");

    setTimeout(() => this.createBlockchain(), 2000);
  }

  createBlockchain() {
    this.blockchainCreated = true;
    this.currentStep = 3;

    document.getElementById("blockchain-section").classList.remove("hidden");
    this.renderBlockchain();

    setTimeout(() => this.assignNodes(), 2000);
  }

  renderBlockchain() {
    const container = document.getElementById("blockchain-container");
    container.innerHTML = "";

    this.blocks.forEach((block, index) => {
      const blockElement = document.createElement("div");
      blockElement.className = "block";
      if (index === this.blocks.length - 1 && index > 2) {
        blockElement.classList.add("new-block");
      }

      blockElement.innerHTML = `
                <div class="block-header">Blok #${block.id}</div>
                <div class="block-hash">Hash: ${block.hash}</div>
                <div class="block-hash">Prev: ${block.prevHash}</div>
                <div class="block-transactions">
                    ${block.transactions
                      .map((tx) => `<div class="transaction">${tx}</div>`)
                      .join("")}
                </div>
                <div class="block-timestamp">${block.timestamp}</div>
            `;

      container.appendChild(blockElement);

      if (index < this.blocks.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "block-arrow";
        arrow.textContent = "→";
        container.appendChild(arrow);
      }
    });
  }

  assignNodes() {
    this.nodesAssigned = true;
    this.currentStep = 4;

    this.peers = this.companies.map((company) => ({
      id: company.id,
      company: company.name,
      status: "active",
    }));

    document.getElementById("peers-section").classList.remove("hidden");
    this.renderPeers();

    setTimeout(() => this.showNodeRolesModal(), 2000);
  }

  renderPeers() {
    const container = document.getElementById("peers-grid");
    container.innerHTML = "";

    this.peers.forEach((peer, index) => {
      const peerElement = document.createElement("div");
      peerElement.className = `peer-card ${peer.status}`;

      let statusText = "Aktif";
      if (peer.status === "approved") statusText = "✅ Onayladı";
      else if (peer.status === "rejected") statusText = "❌ Reddetti";
      else if (peer.status === "voting") statusText = "⏳ Oylama...";

      peerElement.innerHTML = `
                <div class="peer-icon">🖥️</div>
                <div class="peer-name">PEER ${peer.id}</div>
                <div class="peer-company">${peer.company}</div>
                <div class="peer-status ${peer.status}">${statusText}</div>
            `;

      container.appendChild(peerElement);
    });
  }

  showNodeRolesModal() {
    this.currentStep = 5;
    this.showModal(
      "🖥️ Node Rolleri ve Görevleri",
      `
                <p>Her şirket kendi node'u ile ağa katılır.</p>
                <br>
                <p><strong>Görevler:</strong></p>
                <p>✅ Blok üretir/önerir</p>
                <p>✅ Diğer blokları doğrular</p>
                <p>✅ Oylamaya katılır</p>
                <p>✅ Zincire ekler</p>
                <br>
                <p style="color: #6b7280; font-size: 0.875rem;">Katılım konsorsiyum üyeleriyle sınırlıdır.</p>
            `,
      "Devam Et",
      () => this.proposeNewBlock()
    );
  }

  proposeNewBlock() {
    this.hideModal();
    this.currentStep = 6;
    this.blockProposed = true;

    setTimeout(() => {
      this.showModal(
        "📋 Yeni Blok Önerisi",
        `
                    <p>Firma A yeni bir blok eklemek istiyor.</p>
                    <br>
                    <div style="background-color: #f3f4f6; padding: 0.75rem; border-radius: 0.375rem;">
                        <p><strong>Önerilen işlem:</strong></p>
                        <p>'Firma A → Firma C: 500 TL tedarik ödemesi'</p>
                    </div>
                    <br>
                    <p style="color: #6b7280; font-size: 0.875rem;">Bu blok konsorsiyum üyelerinin oylamasına sunulacak.</p>
                `,
        "Oylama Başlat",
        () => this.startVoting()
      );
    }, 1000);
  }

  startVoting() {
    this.hideModal();
    this.currentStep = 8;
    this.votingInProgress = true;

    document.getElementById("voting-status").classList.remove("hidden");
    this.createVotingSimulation();
  }

  createVotingSimulation() {
    const votingOrder = ["A", "B", "C", "D"];
    let approvedCount = 0;
    const results = {};

    votingOrder.forEach((peerId, index) => {
      setTimeout(() => {
        const approved = Math.random() > 0.2;
        results[peerId] = approved;
        if (approved) approvedCount++;

        this.peers = this.peers.map((peer) =>
          peer.id === peerId
            ? { ...peer, status: approved ? "approved" : "rejected" }
            : peer
        );

        this.votingResults = { ...results };
        this.renderPeers();

        if (index === votingOrder.length - 1) {
          setTimeout(() => {
            this.votingInProgress = false;
            document.getElementById("voting-status").classList.add("hidden");

            if (approvedCount >= 3) {
              this.addNewBlock();
            } else {
              this.showRejectionMessage();
            }
          }, 1000);
        }
      }, (index + 1) * 1500);
    });
  }

  addNewBlock() {
    const newBlock = {
      id: this.blocks.length,
      prevHash: this.blocks[this.blocks.length - 1].hash,
      hash: "xyz" + Math.random().toString(36).substr(2, 6),
      transactions: [
        "Firma A → Firma C: 500 TL tedarik ödemesi",
        "Konsorsiyum onayı alındı",
      ],
      timestamp: new Date().toISOString().split("T")[0],
    };

    this.blocks.push(newBlock);
    this.renderBlockchain();

    const approvedCount = Object.values(this.votingResults).filter(
      Boolean
    ).length;
    document.getElementById("voting-result").innerHTML = `
            <div class="status-badge success">
                ✅ Çoğunluğun oyu ile blok ağa eklendi. (${approvedCount}/4 onay)
            </div>
        `;
    document.getElementById("voting-result").classList.remove("hidden");

    setTimeout(() => this.showExternalJoinAttempt(), 2000);
  }

  showRejectionMessage() {
    const approvedCount = Object.values(this.votingResults).filter(
      Boolean
    ).length;
    document.getElementById("voting-result").innerHTML = `
            <div class="status-badge error">
                ❌ Yeterli konsorsiyum mutabakatı sağlanamadı. (${approvedCount}/4 onay)
            </div>
        `;
    document.getElementById("voting-result").classList.remove("hidden");

    this.showModal(
      "❌ Blok Reddedildi",
      `
                <p>Blok konsorsiyum tarafından reddedildi.</p>
                <br>
                <p style="color: #6b7280; font-size: 0.875rem;">Yeterli mutabakat sağlanamadı.</p>
            `,
      "Tekrar Dene",
      () => this.proposeNewBlock()
    );
  }

  showExternalJoinAttempt() {
    this.currentStep = 9;
    this.showModal(
      "🚫 Katılım Talebi Reddedildi",
      `
                <p>Firma E ağa katılmak istiyor.</p>
                <br>
                <div style="background-color: #fee2e2; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #fca5a5;">
                    <p>🛑 Bu ağ herkese açık değildir.</p>
                    <p>🔐 Yalnızca konsorsiyum üyeleri katılabilir (üyelik/onay gerekir).</p>
                </div>
            `,
      "Anladım",
      () => this.showFinalModal()
    );
  }

  showFinalModal() {
    this.currentStep = 10;
    this.showModal(
      "🏢 Konsorsiyum Blockchain Ağı Nedir?",
      `
                <p>Birden fazla kurumun birlikte yönettiği özel blockchain.</p>
                <p>Her kurum kendi node'u ile blok önerir, doğrular.</p>
                <br>
                <p><strong>Özellikler:</strong></p>
                <p>🏢 Belirli şirketler arası ortaklık</p>
                <p>🗳️ Üyelerin oylaması (n-of-m)</p>
                <p>🔐 Kontrollü katılım/üyelik</p>
                <p>⚖️ Birlikte yönetim ve güvenlik</p>
                <br>
                <div style="background-color: #eff6ff; padding: 0.75rem; border-radius: 0.375rem; border: 1px solid #93c5fd;">
                    <p><strong>Sonuç:</strong></p>
                    <p style="font-size: 0.875rem;">
                        Güvenlik ve kontrol, tek merkez yerine ortak yönetişimle sağlanır. Dış katılım izne tabidir.
                    </p>
                </div>
            `,
      "Eğitimi Tamamla",
      () => this.resetAnimation()
    );
  }

  resetAnimation() {
    this.hideModal();
    this.currentStep = 0;

    setTimeout(() => {
      this.consortiumFormed = false;
      this.blockchainCreated = false;
      this.nodesAssigned = false;
      this.blockProposed = false;
      this.blocks = [...this.initialBlocks];
      this.peers = [];
      this.votingResults = {};

      document.getElementById("companies-section").classList.add("hidden");
      document.getElementById("blockchain-section").classList.add("hidden");
      document.getElementById("peers-section").classList.add("hidden");
      document.getElementById("voting-status").classList.add("hidden");
      document.getElementById("voting-result").classList.add("hidden");

      document
        .getElementById("companies-grid")
        .classList.remove("consortium-formed");
      document.getElementById("consortium-formed").classList.add("hidden");
      document.querySelectorAll(".company-card").forEach((card) => {
        card.classList.remove("animate-in");
      });

      document.getElementById("start-section").classList.remove("hidden");
    }, 1000);
  }

  showModal(title, content, actionText, actionCallback) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-body").innerHTML = content;
    document.getElementById("modal-action").textContent = actionText;
    this.currentModalAction = actionCallback;
    document.getElementById("modal").classList.remove("hidden");
  }

  hideModal() {
    document.getElementById("modal").classList.add("hidden");
    this.currentModalAction = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ConsortiumBlockchainAnimation();
});
