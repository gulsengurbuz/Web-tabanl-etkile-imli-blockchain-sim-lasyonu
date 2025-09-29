class DecentralizedNetworkSimulation {
  constructor() {
    this.currentScene = 0;
    this.isRunning = false;
    this.animationTimeouts = [];

    this.scenarios = [
      {
        title: "Sistem Mimarisi",
        content: `
          <h3>Merkeziyetsiz Yapı</h3>
          <p>Birden fazla merkez, yük paylaşımı ve hata toleransı sağlar. Her merkez bağımsız çalışır.</p>
        `,
      },
      {
        title: "Veri Akışı",
        content: `
          <h3>Aktif İletişim</h3>
          <p>Her merkez kendi cihazlarıyla veri alışverişi yapar. Sistem optimal performansta çalışır.</p>
        `,
      },
      {
        title: "Arıza Senaryosu",
        content: `
          <h3>Hata Toleransı</h3>
          <p>Bir merkez arızalandığında sadece o merkez etkilenir. Diğer merkezler çalışmaya devam eder.</p>
        `,
      },
      {
        title: "Sistem Dayanıklılığı",
        content: `
          <h3>Yüksek Erişilebilirlik</h3>
          <p>Tek nokta arızası yoktur. Kritik uygulamalar için ideal mimaridir.</p>
        `,
      },
    ];

    this.connections = [
      { from: "phone-A1", to: "center-A", lineId: "line-phoneA1-centerA" },
      { from: "laptop-A1", to: "center-A", lineId: "line-laptopA1-centerA" },
      { from: "tablet-A1", to: "center-A", lineId: "line-tabletA1-centerA" },
      { from: "desktop-B1", to: "center-B", lineId: "line-desktopB1-centerB" },
      { from: "watch-B1", to: "center-B", lineId: "line-watchB1-centerB" },
      { from: "phone-C1", to: "center-C", lineId: "line-phoneC1-centerC" },
      { from: "laptop-C1", to: "center-C", lineId: "line-laptopC1-centerC" },
    ];

    this.init();
  }

  init() {
    this.bindElements();
    this.bindEvents();
    this.drawConnections();
    this.resetSimulation();
  }

  bindElements() {
    this.startButton = document.getElementById("start-simulation");
    this.resetButton = document.getElementById("reset-simulation");

    this.modalOverlay = document.getElementById("modal-overlay");
    this.modalTitle = document.getElementById("modal-title");
    this.modalContent = document.getElementById("modal-content");
    this.modalButton = document.getElementById("modal-button");
    this.sceneCounter = document.getElementById("scene-counter");
    this.totalScenes = document.getElementById("total-scenes");

    this.svg = document.getElementById("connections-svg");
    this.networkContainer = document.querySelector(".network-container");

    this.elements = {
      "center-A": document.getElementById("center-A"),
      "center-B": document.getElementById("center-B"),
      "center-C": document.getElementById("center-C"),
      "phone-A1": document.getElementById("phone-A1"),
      "laptop-A1": document.getElementById("laptop-A1"),
      "tablet-A1": document.getElementById("tablet-A1"),
      "desktop-B1": document.getElementById("desktop-B1"),
      "watch-B1": document.getElementById("watch-B1"),
      "phone-C1": document.getElementById("phone-C1"),
      "laptop-C1": document.getElementById("laptop-C1"),
    };

    this.totalScenes.textContent = this.scenarios.length;
  }

  bindEvents() {
    this.startButton.addEventListener("click", () => this.startSimulation());
    this.resetButton.addEventListener("click", () => this.resetSimulation());
    this.modalButton.addEventListener("click", () => this.nextScene());

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.drawConnections(), 150);
    });

    Object.values(this.elements).forEach((element) => {
      if (element && element.classList.contains("device-node")) {
        element.addEventListener("mouseenter", () =>
          this.highlightConnection(element.id)
        );
        element.addEventListener("mouseleave", () => this.removeHighlight());
      }
    });
  }

  getCenterPosition(element, containerRect) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top + rect.height / 2 - containerRect.top,
    };
  }

  drawConnections() {
    if (!this.networkContainer || !this.svg) return;

    const containerRect = this.networkContainer.getBoundingClientRect();
    this.svg.innerHTML = "";

    this.connections.forEach((conn) => {
      const fromEl = this.elements[conn.from];
      const toEl = this.elements[conn.to];

      if (!fromEl || !toEl) return;

      const p1 = this.getCenterPosition(fromEl, containerRect);
      const p2 = this.getCenterPosition(toEl, containerRect);

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", p1.x);
      line.setAttribute("y1", p1.y);
      line.setAttribute("x2", p2.x);
      line.setAttribute("y2", p2.y);
      line.setAttribute("id", conn.lineId);
      line.classList.add("connection-line");

      this.svg.appendChild(line);
    });
  }

  highlightConnection(deviceId) {
    if (this.isRunning) return;

    const connection = this.connections.find((conn) => conn.from === deviceId);
    if (connection) {
      const line = document.getElementById(connection.lineId);
      const device = this.elements[deviceId];
      const center = this.elements[connection.to];

      if (line) line.classList.add("active");
      if (device) device.classList.add("active");
      if (center) center.classList.add("active");
    }
  }

  removeHighlight() {
    if (this.isRunning) return;

    document.querySelectorAll(".connection-line.active").forEach((line) => {
      line.classList.remove("active");
    });
    document
      .querySelectorAll(".network-node.active, .device-node.active")
      .forEach((node) => {
        node.classList.remove("active");
      });
  }

  resetSimulation() {
    this.currentScene = 0;
    this.isRunning = false;

    this.animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.animationTimeouts = [];

    Object.values(this.elements).forEach((element) => {
      if (!element) return;
      element.classList.remove("active", "failed", "inactive");
    });

    document.querySelectorAll(".connection-line").forEach((line) => {
      line.classList.remove("active", "failed", "inactive");
    });

    this.startButton.disabled = false;
    this.startButton.textContent = "Simülasyonu Başlat";

    this.hideModal();

    console.log("[v0] Simulation reset completed");
  }

  startSimulation() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentScene = 0;
    this.startButton.disabled = true;

    console.log("[v0] Starting simulation");
    this.executeScene(0);
  }

  executeScene(sceneIndex) {
    console.log(`[v0] Executing scene ${sceneIndex + 1}`);

    this.sceneCounter.textContent = sceneIndex + 1;

    switch (sceneIndex) {
      case 0:
        this.sceneIntroduction();
        break;
      case 1:
        this.sceneDataFlow();
        break;
      case 2:
        this.scenePartialFailure();
        break;
      case 3:
        this.sceneFinalState();
        break;
    }
  }

  sceneIntroduction() {
    Object.values(this.elements).forEach((element) => {
      if (element) element.classList.add("active");
    });

    document.querySelectorAll(".connection-line").forEach((line) => {
      line.classList.add("active");
    });

    this.animationTimeouts.push(
      setTimeout(() => {
        this.showModal(this.scenarios[0]);
      }, 1000)
    );
  }

  sceneDataFlow() {
    this.resetNodeStates();

    const centerADevices = ["phone-A1", "laptop-A1", "tablet-A1"];
    const centerALines = [
      "line-phoneA1-centerA",
      "line-laptopA1-centerA",
      "line-tabletA1-centerA",
    ];

    this.elements["center-A"]?.classList.add("active");
    centerADevices.forEach((deviceId) => {
      this.elements[deviceId]?.classList.add("active");
    });

    centerALines.forEach((lineId) => {
      document.getElementById(lineId)?.classList.add("active");
    });

    this.animationTimeouts.push(
      setTimeout(() => {
        this.showModal(this.scenarios[1]);
      }, 2000)
    );
  }

  scenePartialFailure() {
    this.resetNodeStates();

    this.elements["center-A"]?.classList.add("failed");

    ["phone-A1", "laptop-A1", "tablet-A1"].forEach((deviceId) => {
      this.elements[deviceId]?.classList.add("inactive");
    });

    [
      "line-phoneA1-centerA",
      "line-laptopA1-centerA",
      "line-tabletA1-centerA",
    ].forEach((lineId) => {
      document.getElementById(lineId)?.classList.add("failed");
    });

    this.elements["center-B"]?.classList.add("active");
    this.elements["center-C"]?.classList.add("active");
    ["desktop-B1", "watch-B1", "phone-C1", "laptop-C1"].forEach((deviceId) => {
      this.elements[deviceId]?.classList.add("active");
    });
    [
      "line-desktopB1-centerB",
      "line-watchB1-centerB",
      "line-phoneC1-centerC",
      "line-laptopC1-centerC",
    ].forEach((lineId) => {
      document.getElementById(lineId)?.classList.add("active");
    });

    this.animationTimeouts.push(
      setTimeout(() => {
        this.showModal(this.scenarios[2]);
      }, 1500)
    );
  }

  sceneFinalState() {
    this.animationTimeouts.push(
      setTimeout(() => {
        this.showModal(this.scenarios[3]);
      }, 500)
    );
  }

  resetNodeStates() {
    Object.values(this.elements).forEach((element) => {
      if (element) {
        element.classList.remove("active", "failed", "inactive");
      }
    });

    document.querySelectorAll(".connection-line").forEach((line) => {
      line.classList.remove("active", "failed", "inactive");
    });
  }

  showModal(scenario) {
    this.modalTitle.textContent = scenario.title;
    this.modalContent.innerHTML = scenario.content;
    this.modalOverlay.classList.add("visible");

    if (this.currentScene === this.scenarios.length - 1) {
      this.modalButton.innerHTML = `
                Simülasyonu Bitir
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
    } else {
      this.modalButton.innerHTML = `
                Devam Et
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            `;
    }
  }

  hideModal() {
    this.modalOverlay.classList.remove("visible");
  }

  nextScene() {
    this.hideModal();
    this.currentScene++;

    if (this.currentScene < this.scenarios.length) {
      this.animationTimeouts.push(
        setTimeout(() => {
          this.executeScene(this.currentScene);
        }, 500)
      );
    } else {
      this.completeSimulation();
    }
  }

  completeSimulation() {
    console.log("[v0] Simulation completed");

    this.isRunning = false;
    this.startButton.disabled = false;
    this.startButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
      </svg>
      Tekrar
    `;

    this.animationTimeouts.push(
      setTimeout(() => {
        alert(
          '✅ Simülasyon tamamlandı! Tekrar izlemek için "Tekrar" butonuna tıklayın.'
        );
      }, 1000)
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] Initializing Decentralized Network Simulation");
  new DecentralizedNetworkSimulation();
});
