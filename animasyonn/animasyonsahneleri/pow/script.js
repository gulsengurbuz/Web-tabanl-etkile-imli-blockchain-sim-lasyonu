class BlockchainAnimation {
  constructor() {
    this.currentScene = 1;
    this.isPlaying = false;
    this.autoPlay = false;
    this.transactions = [];
    this.currentBlock = null;
    this.blockchain = [];
    this.nonce = 0;
    this.attempts = 0;
    this.currentHash = "";
    this.isValidHash = false;
    this.showReward = false;
    this.particles = [];
    this.hashingSpeed = 0;
    this.energyLevel = 0;
    this.sceneProgress = 0;

    this.scenes = [
      {
        id: 1,
        title: "İşlem Havuzu (Transaction Pool)",
        description:
          "Kullanıcılar tarafından gönderilen işlemler mempool'da bekler ve doğrulanmayı bekler",
        duration: 4000,
      },
      {
        id: 2,
        title: "Blok Adayı Oluşturma (Block Candidate)",
        description:
          "Madenci en karlı işlemleri seçerek yeni bir blok adayı oluşturur",
        duration: 3000,
      },
      {
        id: 3,
        title: "Hash Hesaplama & Nonce Arama (Mining Process)",
        description:
          "Madenci milyonlarca nonce değeri deneyerek hedef zorluğun altında hash arar",
        duration: 6000,
      },
      {
        id: 4,
        title: "Zorluk Hedefi Kontrolü (Difficulty Target)",
        description:
          "Bulunan hash değeri ağın belirlediği zorluk hedefinin altında olmalıdır",
        duration: 3000,
      },
      {
        id: 5,
        title: "Blockchain'e Ekleme (Adding to Chain)",
        description:
          "Geçerli blok ağ tarafından onaylanır ve kalıcı olarak zincire eklenir",
        duration: 4000,
      },
      {
        id: 6,
        title: "Madenci Ödülü (Mining Reward)",
        description: "Başarılı madenci blok ödülü ve işlem ücretlerini kazanır",
        duration: 3000,
      },
      {
        id: 7,
        title: "Enerji Tüketimi (Energy Consumption)",
        description:
          "Proof of Work yüksek enerji tüketir ancak ağın güvenliğini sağlar",
        duration: 5000,
      },
    ];

    this.intervals = [];
    this.timeouts = [];

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
    this.startParticleSystem();
    this.renderScene();
  }

  bindEvents() {
    document
      .getElementById("play-btn")
      .addEventListener("click", () => this.togglePlay());
    document
      .getElementById("auto-btn")
      .addEventListener("click", () => this.toggleAutoPlay());
    document
      .getElementById("reset-btn")
      .addEventListener("click", () => this.resetAnimation());
    document
      .getElementById("prev-btn")
      .addEventListener("click", () => this.prevScene());
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.nextScene());

    document.querySelectorAll(".scene-bar").forEach((bar, index) => {
      bar.addEventListener("click", () => this.goToScene(index + 1));
    });
  }

  simpleHash(data) {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, "0");
  }

  generateTransaction() {
    return {
      id: Math.random().toString(36).substr(2, 9),
      from: `0x${Math.random().toString(16).substr(2, 6)}`,
      to: `0x${Math.random().toString(16).substr(2, 6)}`,
      amount: Math.floor(Math.random() * 10) + 0.1,
      x: Math.random() * 500 + 100,
      y: Math.random() * 300 + 100,
      opacity: 0,
      scale: 0.5,
    };
  }

  createParticle(x, y, color) {
    return {
      id: Math.random().toString(36).substr(2, 9),
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      life: 60,
      maxLife: 60,
      color,
    };
  }

  addInterval(callback, delay) {
    const interval = setInterval(callback, delay);
    this.intervals.push(interval);
    return interval;
  }

  addTimeout(callback, delay) {
    const timeout = setTimeout(callback, delay);
    this.timeouts.push(timeout);
    return timeout;
  }

  clearAllTimers() {
    this.intervals.forEach((interval) => clearInterval(interval));
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.intervals = [];
    this.timeouts = [];
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.sceneProgress = 0;
      this.startScene();
      this.startProgressTracking();
    } else {
      this.clearAllTimers();
    }
    this.updateUI();
  }

  toggleAutoPlay() {
    this.autoPlay = !this.autoPlay;
    if (this.autoPlay && !this.isPlaying) {
      this.isPlaying = true;
      this.startScene();
      this.startProgressTracking();
    }
    this.updateUI();
  }

  resetAnimation() {
    this.clearAllTimers();
    this.currentScene = 1;
    this.isPlaying = false;
    this.autoPlay = false;
    this.transactions = [];
    this.currentBlock = null;
    this.blockchain = [];
    this.nonce = 0;
    this.attempts = 0;
    this.currentHash = "";
    this.isValidHash = false;
    this.showReward = false;
    this.particles = [];
    this.hashingSpeed = 0;
    this.energyLevel = 0;
    this.sceneProgress = 0;
    this.updateUI();
    this.renderScene();
  }

  nextScene() {
    if (this.currentScene < 7) {
      this.currentScene++;
      this.sceneProgress = 0;
      this.updateUI();
      this.renderScene();
      if (this.isPlaying) {
        this.clearAllTimers();
        this.startScene();
        this.startProgressTracking();
      }
    }
  }

  prevScene() {
    if (this.currentScene > 1) {
      this.currentScene--;
      this.sceneProgress = 0;
      this.updateUI();
      this.renderScene();
      if (this.isPlaying) {
        this.clearAllTimers();
        this.startScene();
        this.startProgressTracking();
      }
    }
  }

  goToScene(sceneNumber) {
    this.currentScene = sceneNumber;
    this.sceneProgress = 0;
    this.updateUI();
    this.renderScene();
    if (this.isPlaying) {
      this.clearAllTimers();
      this.startScene();
      this.startProgressTracking();
    }
  }

  startProgressTracking() {
    if (this.isPlaying) {
      this.addInterval(() => {
        const increment =
          100 / (this.scenes[this.currentScene - 1].duration / 100);
        this.sceneProgress = Math.min(this.sceneProgress + increment, 100);
        this.updateProgressBar();
      }, 100);
    }
  }

  startScene() {
    this.clearAllTimers();

    if (this.autoPlay && this.isPlaying) {
      this.addTimeout(() => {
        if (this.currentScene < 7) {
          this.currentScene++;
          this.sceneProgress = 0;
          this.updateUI();
          this.renderScene();
          this.startScene();
          this.startProgressTracking();
        } else {
          this.autoPlay = false;
          this.isPlaying = false;
          this.updateUI();
        }
      }, this.scenes[this.currentScene - 1].duration);
    }

    switch (this.currentScene) {
      case 1:
        this.startScene1();
        break;
      case 2:
        this.startScene2();
        break;
      case 3:
        this.startScene3();
        break;
      case 4:
        this.startScene4();
        break;
      case 5:
        this.startScene5();
        break;
      case 6:
        this.startScene6();
        break;
      case 7:
        this.startScene7();
        break;
    }
  }

  startScene1() {
    if (this.isPlaying) {
      this.addInterval(() => {
        const newTx = this.generateTransaction();
        this.transactions.push(newTx);
        if (this.transactions.length > 12) {
          this.transactions.shift();
        }

        for (let i = 0; i < 3; i++) {
          this.particles.push(this.createParticle(newTx.x, newTx.y, "#3b82f6"));
        }

        this.renderScene();

        setTimeout(() => {
          newTx.opacity = 1;
          newTx.scale = 1;
          this.renderScene();
        }, 100);
      }, 600);
    }
  }

  startScene2() {
    if (this.isPlaying && this.transactions.length > 0) {
      this.addTimeout(() => {
        const selectedTxs = this.transactions.slice(0, 4);
        this.currentBlock = {
          id: Math.random().toString(36).substr(2, 9),
          transactions: selectedTxs,
          previousHash:
            this.blockchain.length > 0
              ? this.blockchain[this.blockchain.length - 1].hash
              : "0000000000000000",
          timestamp: Date.now(),
          nonce: 0,
          hash: "",
          isValid: false,
        };

        selectedTxs.forEach((tx) => {
          for (let i = 0; i < 5; i++) {
            this.particles.push(this.createParticle(tx.x, tx.y, "#10b981"));
          }
        });

        this.renderScene();
      }, 1000);
    }
  }

  startScene3() {
    if (this.isPlaying && this.currentBlock && this.attempts < 10) {
      this.addInterval(() => {
        const blockData = `${this.currentBlock.previousHash}${
          this.currentBlock.timestamp
        }${JSON.stringify(this.currentBlock.transactions)}${this.nonce}`;
        const hash = this.simpleHash(blockData);
        this.currentHash = hash;

        this.hashingSpeed =
          (this.hashingSpeed + Math.random() * 1000000) % 10000000;

        const isValid = hash.startsWith("00");
        this.isValidHash = isValid;

        for (let i = 0; i < 8; i++) {
          this.particles.push(
            this.createParticle(350, 200, isValid ? "#10b981" : "#f59e0b")
          );
        }

        if (isValid) {
          this.currentBlock.nonce = this.nonce;
          this.currentBlock.hash = hash;
          this.currentBlock.isValid = true;

          for (let i = 0; i < 20; i++) {
            this.particles.push(this.createParticle(350, 200, "#10b981"));
          }

          this.renderScene();
          return;
        }

        this.attempts++;
        this.nonce++;

        if (this.attempts >= 9) {
          const validHash = "00" + hash.substring(2);
          this.currentHash = validHash;
          this.isValidHash = true;
          this.currentBlock.nonce = this.nonce;
          this.currentBlock.hash = validHash;
          this.currentBlock.isValid = true;
        }

        this.renderScene();
      }, 400);
    }
  }

  startScene4() {
    this.renderScene();
  }

  startScene5() {
    if (this.isPlaying && this.currentBlock?.isValid) {
      this.addTimeout(() => {
        this.blockchain.push(this.currentBlock);

        for (let i = 0; i < 15; i++) {
          this.particles.push(this.createParticle(400, 200, "#10b981"));
        }

        this.renderScene();
      }, 1000);
    }
  }

  startScene6() {
    if (this.isPlaying) {
      this.addTimeout(() => {
        this.showReward = true;

        for (let i = 0; i < 25; i++) {
          this.particles.push(this.createParticle(350, 200, "#fbbf24"));
        }

        this.renderScene();
      }, 1000);
    }
  }

  startScene7() {
    if (this.isPlaying) {
      this.addInterval(() => {
        this.energyLevel = (this.energyLevel + 10) % 100;

        for (let i = 0; i < 5; i++) {
          this.particles.push(
            this.createParticle(
              Math.random() * 700,
              Math.random() * 400,
              "#ef4444"
            )
          );
        }

        this.renderScene();
      }, 200);
    }
  }

  startParticleSystem() {
    this.addInterval(() => {
      this.particles = this.particles
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 1,
        }))
        .filter((p) => p.life > 0);

      this.renderParticles();
    }, 16);
  }

  renderParticles() {
    const container = document.getElementById("animation-container");
    const existingParticles = container.querySelectorAll(".particle");
    existingParticles.forEach((p) => p.remove());

    this.particles.forEach((particle) => {
      const div = document.createElement("div");
      div.className = "particle";
      div.style.left = `${particle.x}px`;
      div.style.top = `${particle.y}px`;
      div.style.backgroundColor = particle.color;
      div.style.opacity = particle.life / particle.maxLife;
      container.appendChild(div);
    });
  }

  updateUI() {
    const scene = this.scenes[this.currentScene - 1];
    document.getElementById(
      "scene-title"
    ).textContent = `Sahne ${this.currentScene}: ${scene.title}`;
    document.getElementById("scene-description").textContent =
      scene.description;

    const playBtn = document.getElementById("play-btn");
    const playIcon = document.getElementById("play-icon");
    const playText = document.getElementById("play-text");
    playIcon.textContent = this.isPlaying ? "⏸" : "▶";
    playText.textContent = this.isPlaying ? "Duraklat" : "Başlat";

    const autoBtn = document.getElementById("auto-btn");
    const autoIcon = document.getElementById("auto-icon");
    const autoText = document.getElementById("auto-text");
    autoBtn.className = `control-btn ${this.autoPlay ? "active" : "secondary"}`;
    autoIcon.className = this.autoPlay ? "animate-spin" : "";
    autoText.textContent = this.autoPlay ? "Otomatik Açık" : "Otomatik Oynat";

    document.getElementById("prev-btn").disabled = this.currentScene === 1;
    document.getElementById("next-btn").disabled = this.currentScene === 7;

    document.querySelectorAll(".scene-bar").forEach((bar, index) => {
      const sceneNum = index + 1;
      bar.className = "scene-bar";
      if (sceneNum === this.currentScene) {
        bar.classList.add("active");
      } else if (sceneNum < this.currentScene) {
        bar.classList.add("completed");
      }
    });

    this.updateProgressBar();
  }

  updateProgressBar() {
    document.getElementById("progress-text").textContent = `${Math.round(
      this.sceneProgress
    )}%`;
    document.getElementById(
      "progress-fill"
    ).style.width = `${this.sceneProgress}%`;
  }

  renderScene() {
    const container = document.getElementById("animation-container");
    container.innerHTML = "";

    switch (this.currentScene) {
      case 1:
        this.renderScene1(container);
        break;
      case 2:
        this.renderScene2(container);
        break;
      case 3:
        this.renderScene3(container);
        break;
      case 4:
        this.renderScene4(container);
        break;
      case 5:
        this.renderScene5(container);
        break;
      case 6:
        this.renderScene6(container);
        break;
      case 7:
        this.renderScene7(container);
        break;
    }
  }

  renderScene1(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #dbeafe 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const mempool = document.createElement("div");
    mempool.className = "mempool";
    mempool.innerHTML = `
            <div class="mempool-content">
                <div class="mempool-title">Transaction Mempool</div>
                <div class="mempool-count">${this.transactions.length} bekleyen işlem</div>
            </div>
        `;

    scene.appendChild(mempool);

    this.transactions.forEach((tx, index) => {
      const txDiv = document.createElement("div");
      txDiv.className = `transaction ${tx.opacity > 0 ? "visible" : ""}`;
      txDiv.style.left = `${tx.x}px`;
      txDiv.style.top = `${tx.y}px`;
      txDiv.style.transform = `scale(${tx.scale}) rotate(${index * 15}deg)`;
      txDiv.innerHTML = `
                <div style="font-weight: 600;">₿${tx.amount.toFixed(2)}</div>
                <div style="font-size: 0.75rem; opacity: 0.75;">${tx.from.slice(
                  0,
                  6
                )}...</div>
            `;
      scene.appendChild(txDiv);
    });

    container.appendChild(scene);
  }

  renderScene2(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #f3f4f6 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    if (this.currentBlock) {
      const blockCandidate = document.createElement("div");
      blockCandidate.className = "block-candidate";
      blockCandidate.innerHTML = `
                <div class="block-header">
                    <div class="block-title">Block Candidate</div>
                    <div class="block-hash">Previous: ${this.currentBlock.previousHash.substring(
                      0,
                      12
                    )}...</div>
                </div>
                <div class="block-info">
                    <div>Timestamp: ${new Date(
                      this.currentBlock.timestamp
                    ).toLocaleTimeString()}</div>
                    <div>Nonce: ${this.currentBlock.nonce}</div>
                    <div>Transactions: ${
                      this.currentBlock.transactions.length
                    }</div>
                </div>
                <div class="block-transactions">
                    ${this.currentBlock.transactions
                      .map(
                        (tx, index) => `
                        <div class="block-tx" style="animation-delay: ${
                          index * 0.2
                        }s">
                            ₿${tx.amount.toFixed(2)}
                        </div>
                    `
                      )
                      .join("")}
                </div>
            `;
      scene.appendChild(blockCandidate);
    }

    container.appendChild(scene);
  }

  renderScene3(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #fed7aa 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const miningContainer = document.createElement("div");
    miningContainer.className = "mining-container";

    const miningVisual = document.createElement("div");
    miningVisual.className = `mining-visual ${
      this.isValidHash ? "valid" : "invalid"
    }`;
    miningVisual.innerHTML = `
            <div class="mining-icon">
                <div class="mining-emoji">⛏️</div>
                <div class="hash-rate">${(this.hashingSpeed / 1000000).toFixed(
                  1
                )}M H/s</div>
            </div>
        `;

    const miningStats = document.createElement("div");
    miningStats.className = "mining-stats";
    miningStats.innerHTML = `
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value orange">Nonce: ${this.nonce.toLocaleString()}</div>
                    <div class="stat-label">Deneme: ${
                      this.attempts + 1
                    }/10</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value blue">Hash Rate</div>
                    <div class="stat-label">${(
                      this.hashingSpeed / 1000000
                    ).toFixed(2)} MH/s</div>
                </div>
            </div>
            <div class="hash-display">Hash: ${this.currentHash}</div>
            <div class="mining-status ${
              this.isValidHash ? "found" : "searching"
            }">
                ${
                  !this.isValidHash && this.attempts < 10
                    ? '<span style="animation: spin 1s linear infinite; margin-right: 8px;">⚡</span>Aranıyor...'
                    : this.isValidHash
                    ? '<span style="margin-right: 8px;">✅</span>Geçerli hash bulundu!'
                    : '<span style="margin-right: 8px;">❌</span>Maksimum deneme'
                }
            </div>
        `;

    miningContainer.appendChild(miningVisual);
    miningContainer.appendChild(miningStats);
    scene.appendChild(miningContainer);
    container.appendChild(scene);
  }

  renderScene4(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #fef2f2 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const difficultyContainer = document.createElement("div");
    difficultyContainer.className = "difficulty-container";
    difficultyContainer.innerHTML = `
            <div class="difficulty-title">
                <h3>Difficulty Target</h3>
                <p>Hash değeri hedefin altında olmalı</p>
            </div>
            <div class="target-section">
                <div class="target-box">
                    <div class="target-title">Zorluk Hedefi</div>
                    <div class="target-hash">00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <div class="target-note">Hash "00000000" ile başlamalı</div>
                </div>
            </div>
            <div class="arrow">⬇️</div>
            <div class="current-hash-box ${this.isValidHash ? "valid" : ""}">
                <div class="current-title ${
                  this.isValidHash ? "valid" : ""
                }">Mevcut Hash</div>
                <div class="current-hash">${this.currentHash}</div>
                <div class="hash-status ${
                  this.isValidHash ? "valid" : "invalid"
                }">
                    ${
                      this.isValidHash
                        ? '<span style="margin-right: 8px; font-size: 1.25rem;">🎯</span>Hedef başarıyla vuruldu!'
                        : '<span style="margin-right: 8px; font-size: 1.25rem;">❌</span>Hedefin üstünde'
                    }
                </div>
            </div>
        `;

    scene.appendChild(difficultyContainer);
    container.appendChild(scene);
  }

  renderScene5(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const blockchainContainer = document.createElement("div");
    blockchainContainer.className = "blockchain-container";

    this.blockchain.forEach((block, index) => {
      const blockDiv = document.createElement("div");
      blockDiv.className = "blockchain-block";
      blockDiv.innerHTML = `
                <div class="block-number">Block</div>
                <div>#${index + 1}</div>
                <div class="block-tx-count">${
                  block.transactions.length
                } tx</div>
            `;
      blockDiv.title = `Hash: ${block.hash.substring(0, 8)}...`;
      blockchainContainer.appendChild(blockDiv);

      if (index < this.blockchain.length - 1) {
        const connector = document.createElement("div");
        connector.className = "block-connector";
        connector.innerHTML = `
                    <div class="connector-line"></div>
                    <div class="connector-dot"></div>
                `;
        blockchainContainer.appendChild(connector);
      }
    });

    if (this.currentBlock?.isValid) {
      const connector = document.createElement("div");
      connector.className = "block-connector";
      connector.innerHTML = `
                <div class="connector-line" style="animation: pulse 2s infinite;"></div>
                <div class="connector-dot" style="animation: ping 2s infinite;"></div>
            `;
      blockchainContainer.appendChild(connector);

      const newBlock = document.createElement("div");
      newBlock.className = "blockchain-block new-block";
      newBlock.innerHTML = `
                <div class="block-number">New</div>
                <div>Block</div>
                <div class="block-tx-count">Pending</div>
            `;
      blockchainContainer.appendChild(newBlock);
    }

    scene.appendChild(blockchainContainer);
    container.appendChild(scene);
  }

  renderScene6(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #fefce8 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const rewardContainer = document.createElement("div");
    rewardContainer.className = "reward-container";

    const minerVisual = document.createElement("div");
    minerVisual.className = "miner-visual";
    minerVisual.innerHTML = `
            <div class="miner-icon">
                🖥️
                <div class="miner-status"></div>
            </div>
            <div class="miner-info">Successful Miner</div>
            <div class="miner-block">Block #${this.blockchain.length + 1}</div>
        `;
    rewardContainer.appendChild(minerVisual);

    if (this.showReward) {
      const rewardArrow = document.createElement("div");
      rewardArrow.className = "reward-arrow";
      rewardArrow.textContent = "➡️";
      rewardContainer.appendChild(rewardArrow);

      const rewardsList = document.createElement("div");
      rewardsList.className = "rewards-list";
      rewardsList.innerHTML = `
                <div class="reward-item">
                    <div class="reward-icon block-reward">🪙</div>
                    <div class="reward-details">
                        <div class="reward-amount yellow">6.25 BTC</div>
                        <div class="reward-type">Block Reward</div>
                    </div>
                </div>
                <div class="reward-item">
                    <div class="reward-icon tx-fees">💰</div>
                    <div class="reward-details">
                        <div class="reward-amount orange">0.15 BTC</div>
                        <div class="reward-type">Transaction Fees</div>
                    </div>
                </div>
            `;
      rewardContainer.appendChild(rewardsList);

      const totalReward = document.createElement("div");
      totalReward.className = "total-reward";
      totalReward.innerHTML = `
                <div class="celebration">🎉 Tebrikler!</div>
                <div class="total-box">
                    <div class="total-label">Toplam Kazanç</div>
                    <div class="total-amount">6.40 BTC</div>
                    <div class="total-usd">≈ $164,400</div>
                </div>
            `;
      rewardContainer.appendChild(totalReward);
    }

    scene.appendChild(rewardContainer);
    container.appendChild(scene);
  }

  renderScene7(container) {
    container.style.background =
      "linear-gradient(135deg, #f8fafc 0%, #fef2f2 100%)";

    const scene = document.createElement("div");
    scene.className = "scene";

    const energyContainer = document.createElement("div");
    energyContainer.className = "energy-container";
    energyContainer.innerHTML = `
            <div class="energy-title">
                <h3>Global Mining Network</h3>
                <p>Dünya çapında enerji tüketimi</p>
            </div>
            <div class="miners-grid">
                ${[1, 2, 3, 4]
                  .map(
                    (miner) => `
                    <div class="miner-node">
                        <div class="miner-device ${
                          miner === 1 ? "winner" : "mining"
                        }">
                            🖥️
                            ${Array.from(
                              { length: 3 },
                              (_, i) => `
                                <div class="energy-wave" style="animation-delay: ${
                                  i * 0.5
                                }s; animation-duration: 2s;"></div>
                            `
                            ).join("")}
                        </div>
                        <div class="miner-label">${
                          miner === 1 ? "Winner" : "Mining"
                        }</div>
                        <div class="miner-power">${(
                          Math.random() * 1000 +
                          500
                        ).toFixed(0)} kW</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            <div class="energy-stats">
                <div class="energy-header">
                    ⚡ Enerji Tüketimi
                </div>
                <div class="energy-comparison">
                    <div class="energy-item">
                        <div class="energy-value bitcoin">${(
                          this.energyLevel + 120
                        ).toFixed(0)} TWh/yıl</div>
                        <div class="energy-label">Bitcoin Network</div>
                    </div>
                    <div class="energy-item">
                        <div class="energy-value country">${(
                          this.energyLevel * 0.8 +
                          80
                        ).toFixed(0)} TWh/yıl</div>
                        <div class="energy-label">Arjantin</div>
                    </div>
                </div>
                <div class="energy-bar-container">
                    <div class="energy-bar">
                        <div class="energy-fill" style="width: ${
                          this.energyLevel
                        }%"></div>
                    </div>
                    <div class="energy-note">Güvenlik vs Sürdürülebilirlik</div>
                </div>
            </div>
        `;

    scene.appendChild(energyContainer);
    container.appendChild(scene);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BlockchainAnimation();
});
