class MerkleTreeAnimation {
  constructor() {
    this.currentScene = 0;
    this.transactions = [
      { id: "tx1", sender: "Ali", receiver: "Zeynep", amount: "2 BTC" },
      { id: "tx2", sender: "Ayşe", receiver: "Can", amount: "0.5 ETH" },
      { id: "tx3", sender: "Burak", receiver: "Deniz", amount: "100 ADA" },
      { id: "tx4", sender: "Cem", receiver: "Elif", amount: "5 SOL" },
    ];
    this.hashes = [];
    this.merkleRoot = "";
    this.blockHash = "";
    this.prevBlockHash = "0".repeat(64);
    this.isCorrupted = false;
    this.proofPathHashes = new Set();

    this.ANIMATION_WIDTH = 800;
    this.ANIMATION_HEIGHT = 400;
    this.TX_WIDTH = 140;
    this.TX_HEIGHT = 60;
    this.HASH_WIDTH = 120;
    this.HASH_HEIGHT = 40;
    this.MERKLE_ROOT_WIDTH = 160;
    this.MERKLE_ROOT_HEIGHT = 45;
    this.BLOCK_WIDTH = 220;
    this.BLOCK_HEIGHT = 150;

    this.sceneData = [
      {
        title: "Sahne 1 — İşlemlerle Başlangıç",
        description:
          "Bir blok, çok sayıda işlemi içinde barındırır. Her işlem; gönderici, alıcı ve miktar bilgilerini içerir.",
      },
      {
        title: "Sahne 2 — Hash (Yapraklar) Oluşturma",
        description:
          "Her işlem, özel bir algoritma ile benzersiz bir sayısal özet hâline getirilir. Bu özet, 'yaprak hash' olarak adlandırılır.",
      },
      {
        title: "Sahne 3 — İlk Birleşmeler",
        description:
          "Yaprak hash'ler ikili çiftler hâlinde birleştirilir. İki hash yan yana getirilir, tekrar özetlenir ve üst katmanda yeni bir hash oluşur.",
      },
      {
        title: "Sahne 4 — Merkle Root'a Ulaşma",
        description:
          "Birleşme işlemi üst katmanlarda tekrarlanır ve sonunda Merkle Root adı verilen tek bir hash elde edilir.",
      },
      {
        title: "Sahne 5 — Merkle Root'un Blok Başlığına Eklenmesi",
        description:
          "Merkle Root, blok başlığında özel bir alana eklenir. Böylece tüm işlemler tek bir değer ile temsil edilir.",
      },
      {
        title: "Sahne 6 — Blok Hash'inin Oluşması",
        description:
          "Blok başlığındaki tüm bilgiler bir araya getirilir ve yeniden özetlenir. Ortaya çıkan değer, bloğun kimliğini belirler.",
      },
      {
        title: "Sahne 7 — Zincire Bağlanma",
        description:
          "Her blok, bir önceki bloğun hash'ini başlığında tutar. Böylece zincir yapısı oluşur.",
      },
      {
        title: "Sahne 8 — Değişiklik Testi",
        description: "Tek bir işlemi değiştirirseniz, tüm zincir etkilenir.",
      },
      {
        title: "Sahne 9 — Merkle Kanıtı",
        description:
          "Bir işlemin blokta yer aldığını kanıtlamak için Merkle kanıtı kullanılır.",
      },
      {
        title: "Sahne 10 — Özet",
        description:
          "Merkle ağacını, Merkle Root'un blok başlığındaki yerini, blok hash'ini ve zincir mantığını öğrendiniz.",
      },
    ];

    this.init();
  }

  init() {
    this.calculateMerkleTree();
    this.calculateBlockHash();
    this.setupEventListeners();
    this.showModal();
  }

  setupEventListeners() {
    document.getElementById("modal-continue").addEventListener("click", () => {
      this.hideModal();
      this.renderScene();
    });

    document.getElementById("next-scene").addEventListener("click", () => {
      this.nextScene();
    });
  }

  generateMockHash(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(64, "0").substring(0, 64);
  }

  calculateMerkleTree() {
    const level0 = this.transactions.map((tx, idx) => ({
      id: `hash-0-${idx}`,
      value: this.generateMockHash(`${tx.sender}${tx.receiver}${tx.amount}`),
      level: 0,
      index: idx,
      isCorrupted: this.isCorrupted && tx.id === "tx1",
    }));

    let currentLevel = level0;
    const allLevels = [level0];

    while (currentLevel.length > 1) {
      const nextLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const hash1Node = currentLevel[i];
        const hash2Node =
          i + 1 < currentLevel.length ? currentLevel[i + 1] : hash1Node;

        const combinedHash = this.generateMockHash(
          hash1Node.value + hash2Node.value
        );
        nextLevel.push({
          id: `hash-${allLevels.length}-${nextLevel.length}`,
          value: combinedHash,
          level: allLevels.length,
          index: nextLevel.length,
          isCorrupted: hash1Node.isCorrupted || hash2Node.isCorrupted,
        });
      }
      allLevels.push(nextLevel);
      currentLevel = nextLevel;
    }

    this.hashes = allLevels;
    this.merkleRoot = currentLevel[0]?.value || "";
  }

  calculateBlockHash() {
    const blockHeaderData = `${
      this.prevBlockHash
    }${new Date().toLocaleTimeString()}${this.merkleRoot}`;
    this.blockHash = this.generateMockHash(blockHeaderData);
  }

  showModal() {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");
    const description = document.getElementById("modal-description");

    const sceneData = this.sceneData[this.currentScene];
    title.textContent = sceneData.title;
    description.textContent = sceneData.description;

    modal.classList.remove("hidden");
  }

  hideModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  }

  clearScene() {
    document.getElementById("transactions-container").innerHTML = "";
    document.getElementById("hashes-container").innerHTML = "";
    document.getElementById("blocks-container").innerHTML = "";
    document.getElementById("connections-svg").innerHTML =
      '<defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" /></marker></defs>';
    document.getElementById("warning-container").innerHTML = "";
  }

  renderScene() {
    this.clearScene();

    switch (this.currentScene) {
      case 0:
        this.renderTransactions();
        break;
      case 1:
        this.renderTransactions();
        this.renderHashes([0]);
        this.renderConnections();
        break;
      case 2:
        this.renderTransactions();
        this.renderHashes([0, 1]);
        this.renderConnections();
        break;
      case 3:
        this.renderTransactions();
        this.renderHashes();
        this.renderConnections();
        break;
      case 4:
        this.renderMerkleRootToBlock();
        break;
      case 5:
        this.renderBlockHeader();
        break;
      case 6:
        this.renderBlockChain();
        break;
      case 7:
        this.renderCorruptionTest();
        break;
      case 8:
        this.renderMerkleProof();
        break;
      case 9:
        this.renderSummary();
        break;
    }
  }

  renderTransactions() {
    const container = document.getElementById("transactions-container");
    const startX = 80;
    const startY = 30;
    const gap = 150;

    this.transactions.forEach((tx, idx) => {
      const card = document.createElement("div");
      card.className = "transaction-card";
      card.id = tx.id;

      if (this.isCorrupted && tx.id === "tx1") {
        card.classList.add("corrupted");
      }

      card.style.left = `${startX + idx * gap}px`;
      card.style.top = `${startY}px`;

      card.innerHTML = `
                <div class="sender-receiver">${tx.sender} → ${tx.receiver}</div>
                <div class="amount">${tx.amount}</div>
            `;

      container.appendChild(card);

      setTimeout(() => {
        card.classList.add("visible");
      }, idx * 200);
    });
  }

  renderHashes(levels = null) {
    const container = document.getElementById("hashes-container");
    const levelsToRender =
      levels || Array.from({ length: this.hashes.length }, (_, i) => i);

    levelsToRender.forEach((levelIdx) => {
      if (!this.hashes[levelIdx]) return;

      const levelHashes = this.hashes[levelIdx];
      const startY = 120 + levelIdx * 60;
      const totalWidth =
        levelHashes.length * this.HASH_WIDTH + (levelHashes.length - 1) * 30;
      const startX = (this.ANIMATION_WIDTH - totalWidth) / 2;

      levelHashes.forEach((hashNode, idx) => {
        const hashBox = document.createElement("div");
        hashBox.className = "hash-box";
        hashBox.id = hashNode.id;

        if (levelIdx === this.hashes.length - 1) {
          hashBox.classList.add("merkle-root");
        }

        if (hashNode.isCorrupted) {
          hashBox.classList.add("corrupted");
        }

        if (this.proofPathHashes.has(hashNode.id)) {
          hashBox.classList.add("proof-path");
        }

        hashBox.style.left = `${startX + idx * (this.HASH_WIDTH + 30)}px`;
        hashBox.style.top = `${startY}px`;

        const shortHash =
          hashNode.value.substring(0, 6) +
          "..." +
          hashNode.value.substring(hashNode.value.length - 6);
        hashBox.textContent = shortHash;

        container.appendChild(hashBox);

        setTimeout(() => {
          hashBox.classList.add("visible");
        }, (levelIdx * levelHashes.length + idx) * 200);
      });
    });
  }

  renderConnections() {
    const svg = document.getElementById("connections-svg");

    this.transactions.forEach((tx, idx) => {
      if (this.hashes[0] && this.hashes[0][idx]) {
        const txElement = document.getElementById(tx.id);
        const hashElement = document.getElementById(this.hashes[0][idx].id);

        if (txElement && hashElement) {
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          line.setAttribute("class", "connection-line");
          line.setAttribute(
            "x1",
            parseInt(txElement.style.left) + this.TX_WIDTH / 2
          );
          line.setAttribute(
            "y1",
            parseInt(txElement.style.top) + this.TX_HEIGHT
          );
          line.setAttribute(
            "x2",
            parseInt(hashElement.style.left) + this.HASH_WIDTH / 2
          );
          line.setAttribute("y2", parseInt(hashElement.style.top));

          svg.appendChild(line);
        }
      }
    });

    for (let levelIdx = 0; levelIdx < this.hashes.length - 1; levelIdx++) {
      const currentLevel = this.hashes[levelIdx];
      const nextLevel = this.hashes[levelIdx + 1];

      currentLevel.forEach((childHash, childIdx) => {
        const parentHash = nextLevel[Math.floor(childIdx / 2)];
        if (parentHash) {
          const childElement = document.getElementById(childHash.id);
          const parentElement = document.getElementById(parentHash.id);

          if (childElement && parentElement) {
            const line = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line"
            );
            line.setAttribute("class", "connection-line");
            line.setAttribute(
              "x1",
              parseInt(childElement.style.left) + this.HASH_WIDTH / 2
            );
            line.setAttribute(
              "y1",
              parseInt(childElement.style.top) + this.HASH_HEIGHT
            );
            line.setAttribute(
              "x2",
              parseInt(parentElement.style.left) +
                (levelIdx === this.hashes.length - 2
                  ? this.MERKLE_ROOT_WIDTH / 2
                  : this.HASH_WIDTH / 2)
            );
            line.setAttribute("y2", parseInt(parentElement.style.top));

            svg.appendChild(line);
          }
        }
      });
    }
  }

  renderMerkleRootToBlock() {
    this.renderBlockHeader();

    const merkleRootHash = this.hashes[this.hashes.length - 1][0];
    if (merkleRootHash) {
      const hashBox = document.createElement("div");
      hashBox.className = "hash-box merkle-root visible";
      hashBox.style.left = `${
        this.ANIMATION_WIDTH / 2 - this.MERKLE_ROOT_WIDTH / 2
      }px`;
      hashBox.style.top = "80px";
      hashBox.textContent =
        merkleRootHash.value.substring(0, 6) +
        "..." +
        merkleRootHash.value.substring(merkleRootHash.value.length - 6);

      document.getElementById("hashes-container").appendChild(hashBox);

      setTimeout(() => {
        hashBox.style.transition = "all 1s ease";
        hashBox.style.left = `${
          this.ANIMATION_WIDTH / 2 - this.MERKLE_ROOT_WIDTH / 2
        }px`;
        hashBox.style.top = "180px";
      }, 500);
    }
  }

  renderBlockHeader() {
    const container = document.getElementById("blocks-container");
    const blockHeader = document.createElement("div");
    blockHeader.className = "block-header";
    blockHeader.style.left = `${
      this.ANIMATION_WIDTH / 2 - this.BLOCK_WIDTH / 2
    }px`;
    blockHeader.style.top = `${
      this.ANIMATION_HEIGHT / 2 - this.BLOCK_HEIGHT / 2
    }px`;

    if (this.isCorrupted) {
      blockHeader.classList.add("corrupted");
    }

    blockHeader.innerHTML = `
            <h3>Blok Başlığı</h3>
            <div class="field">
                <span class="field-label">Önceki Blok Hash'i:</span>
                <span class="field-value">${this.prevBlockHash.substring(
                  0,
                  6
                )}...</span>
            </div>
            <div class="field">
                <span class="field-label">Zaman Damgası:</span>
                <span class="field-value">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="field">
                <span class="field-label">Merkle Root:</span>
                <span class="field-value ${
                  this.isCorrupted ? "corrupted" : ""
                }">${this.merkleRoot.substring(0, 6)}...</span>
            </div>
            <div class="block-hash">
                <div class="field">
                    <span class="field-label">Blok Hash'i:</span>
                    <span class="field-value ${
                      this.isCorrupted ? "corrupted" : ""
                    }">${this.blockHash.substring(0, 6)}...</span>
                </div>
            </div>
        `;

    container.appendChild(blockHeader);

    setTimeout(() => {
      blockHeader.classList.add("visible");
    }, 300);
  }

  renderBlockChain() {
    const container = document.getElementById("blocks-container");
    const spacing = 60;
    const totalWidth = 2 * this.BLOCK_WIDTH + spacing;
    const startX = (this.ANIMATION_WIDTH - totalWidth) / 2;
    const blockY = this.ANIMATION_HEIGHT / 2 - this.BLOCK_HEIGHT / 2;

    const block1 = document.createElement("div");
    block1.className = "block-header";
    block1.style.left = `${startX}px`;
    block1.style.top = `${blockY}px`;

    const oldBlockHash = this.generateMockHash("old_block_hash");
    block1.innerHTML = `
            <h3>Blok Başlığı</h3>
            <div class="field">
                <span class="field-label">Önceki Blok Hash'i:</span>
                <span class="field-value">${this.generateMockHash(
                  "genesis_block"
                ).substring(0, 6)}...</span>
            </div>
            <div class="field">
                <span class="field-label">Zaman Damgası:</span>
                <span class="field-value">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="field">
                <span class="field-label">Merkle Root:</span>
                <span class="field-value">${this.generateMockHash(
                  "old_merkle_root"
                ).substring(0, 6)}...</span>
            </div>
            <div class="block-hash">
                <div class="field">
                    <span class="field-label">Blok Hash'i:</span>
                    <span class="field-value">${oldBlockHash.substring(
                      0,
                      6
                    )}...</span>
                </div>
            </div>
        `;

    const block2 = document.createElement("div");
    block2.className = "block-header";
    block2.style.left = `${startX + this.BLOCK_WIDTH + spacing}px`;
    block2.style.top = `${blockY}px`;

    block2.innerHTML = `
            <h3>Blok Başlığı</h3>
            <div class="field">
                <span class="field-label">Önceki Blok Hash'i:</span>
                <span class="field-value">${oldBlockHash.substring(
                  0,
                  6
                )}...</span>
            </div>
            <div class="field">
                <span class="field-label">Zaman Damgası:</span>
                <span class="field-value">${new Date().toLocaleTimeString()}</span>
            </div>
            <div class="field">
                <span class="field-label">Merkle Root:</span>
                <span class="field-value">${this.merkleRoot.substring(
                  0,
                  6
                )}...</span>
            </div>
            <div class="block-hash">
                <div class="field">
                    <span class="field-label">Blok Hash'i:</span>
                    <span class="field-value">${this.blockHash.substring(
                      0,
                      6
                    )}...</span>
                </div>
            </div>
        `;

    container.appendChild(block1);
    container.appendChild(block2);

    setTimeout(() => {
      block1.classList.add("visible");
    }, 300);

    setTimeout(() => {
      block2.classList.add("visible");
    }, 600);

    setTimeout(() => {
      const svg = document.getElementById("connections-svg");
      const arrow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      arrow.setAttribute("class", "connection-line");
      arrow.setAttribute("x1", startX + this.BLOCK_WIDTH);
      arrow.setAttribute("y1", blockY + this.BLOCK_HEIGHT / 2);
      arrow.setAttribute("x2", startX + this.BLOCK_WIDTH + spacing);
      arrow.setAttribute("y2", blockY + this.BLOCK_HEIGHT / 2);
      arrow.setAttribute("marker-end", "url(#arrowhead)");
      svg.appendChild(arrow);
    }, 900);
  }

  renderCorruptionTest() {
    this.renderTransactions();
    this.renderHashes();
    this.renderConnections();

    this.renderBlockChain();

    if (this.isCorrupted) {
      const warningContainer = document.getElementById("warning-container");
      const warning = document.createElement("div");
      warning.className = "warning";
      warning.innerHTML = `
                <span style="color: #ef4444; font-size: 24px;">⚠</span>
                ZİNCİR BOZULDU!
            `;

      warningContainer.appendChild(warning);

      setTimeout(() => {
        warning.classList.add("visible");
      }, 1500);
    }
  }

  renderMerkleProof() {
    this.renderTransactions();
    this.renderHashes();
    this.renderConnections();
    this.renderBlockHeader();
  }

  renderSummary() {
    const container = document.getElementById("blocks-container");
    const summary = document.createElement("div");
    summary.className = "block-header visible";
    summary.style.left = `${this.ANIMATION_WIDTH / 2 - 200}px`;
    summary.style.top = `${this.ANIMATION_HEIGHT / 2 - 60}px`;
    summary.style.width = "400px";
    summary.style.height = "120px";
    summary.style.background = "#7c3aed";
    summary.style.color = "white";
    summary.style.textAlign = "center";
    summary.style.display = "flex";
    summary.style.flexDirection = "column";
    summary.style.justifyContent = "center";

    summary.innerHTML = `
            <h3 style="color: white; margin-bottom: 15px; font-size: 14px;">Özet</h3>
            <p style="font-size: 12px; margin-bottom: 10px;">
                İşlemler → Yaprak Hash'ler → Birleşmeler → Merkle Root → Blok Başlığı → Blok Hash → Zincir
            </p>
            <p style="font-size: 10px; color: #e9d5ff;">
                Merkle ağacının ve hash zincirinin temel mantığını öğrendiniz.
            </p>
        `;

    container.appendChild(summary);
  }

  nextScene() {
    if (this.currentScene < this.sceneData.length - 1) {
      this.currentScene++;
      this.isCorrupted = false;
      this.proofPathHashes.clear();

      if (this.currentScene === 6) {
        this.transactions = [
          { id: "tx1", sender: "Ali", receiver: "Zeynep", amount: "2 BTC" },
          { id: "tx2", sender: "Ayşe", receiver: "Can", amount: "0.5 ETH" },
          { id: "tx3", sender: "Burak", receiver: "Deniz", amount: "100 ADA" },
          { id: "tx4", sender: "Cem", receiver: "Elif", amount: "5 SOL" },
        ];
        this.prevBlockHash = "0".repeat(64);
      }

      this.calculateMerkleTree();
      this.calculateBlockHash();
    } else {
      this.currentScene = 0;
      this.isCorrupted = false;
      this.proofPathHashes.clear();
      this.transactions = [
        { id: "tx1", sender: "Ali", receiver: "Zeynep", amount: "2 BTC" },
        { id: "tx2", sender: "Ayşe", receiver: "Can", amount: "0.5 ETH" },
        { id: "tx3", sender: "Burak", receiver: "Deniz", amount: "100 ADA" },
        { id: "tx4", sender: "Cem", receiver: "Elif", amount: "5 SOL" },
      ];
      this.prevBlockHash = "0".repeat(64);
      this.calculateMerkleTree();
      this.calculateBlockHash();
    }

    if (this.currentScene === 7) {
      setTimeout(() => {
        this.transactions[0].amount = "3 BTC";
        this.isCorrupted = true;
        this.calculateMerkleTree();
        this.calculateBlockHash();
        this.renderScene();
      }, 1000);
    } else if (this.currentScene === 8) {
      setTimeout(() => {
        const txIndexToProve = 0;
        this.proofPathHashes.add(this.hashes[0][txIndexToProve].id);

        let currentHashIndex = txIndexToProve;
        for (let level = 0; level < this.hashes.length - 1; level++) {
          const siblingIndex =
            currentHashIndex % 2 === 0
              ? currentHashIndex + 1
              : currentHashIndex - 1;
          if (this.hashes[level][siblingIndex]) {
            this.proofPathHashes.add(this.hashes[level][siblingIndex].id);
          }
          currentHashIndex = Math.floor(currentHashIndex / 2);
        }

        if (this.hashes[this.hashes.length - 1][0]) {
          this.proofPathHashes.add(this.hashes[this.hashes.length - 1][0].id);
        }

        this.renderScene();
      }, 1000);
    }

    const nextButton = document.getElementById("next-scene");
    nextButton.textContent =
      this.currentScene < this.sceneData.length - 1
        ? "Sonraki Sahne"
        : "Başa Dön";

    this.showModal();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MerkleTreeAnimation();
});
