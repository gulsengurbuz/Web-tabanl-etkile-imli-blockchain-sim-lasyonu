class DatabaseAnimation {
  constructor() {
    this.currentScene = 0;
    this.isAnimating = false;
    this.autoPlay = false;

    this.sampleData = [
      { value: "Çanta", type: "category" },
      { value: "Ayşe", type: "text" },
      { value: "Mavi", type: "category" },
      { value: "Ayakkabı", type: "category" },
      { value: "15.07.2024", type: "date" },
      { value: "12.07.2024", type: "date" },
      { value: "Kırmızı", type: "category" },
      { value: "1250 TL", type: "number" },
      { value: "599 TL", type: "number" },
      { value: "Mehmet", type: "text" },
    ];

    this.voiceovers = [
      "Bilgi toplamak güzeldir ama… hepsi düzensizse ne işe yarar? Tıpkı yere dağılmış eşyalar gibi. Veritabanı sistemleri bu karmaşayı düzene sokar ve bilgilerinizi sistematik olarak organize eder.",
      "Veritabanı, bu bilgileri düzenli şekilde tutar. Her bilgi doğru çekmecesine yerleşir. Artık aradığını kolayca bulabilirsin. Tablolar halinde organize edilen veriler, hızlı erişim ve güvenli saklama sağlar.",
      "İyi tasarlanmış bir veritabanı sayesinde, ihtiyaç duyduğun bilgiye saniyeler içinde ulaşırsın. SQL sorguları ile karmaşık aramalar yapabilir ve istediğin sonuçları anında elde edebilirsin.",
    ];

    this.orderData = [
      {
        customer: "Ayşe",
        product: "Ayakkabı",
        price: "599 TL",
        date: "12.07.2024",
      },
      {
        customer: "Mehmet",
        product: "Çanta",
        price: "1250 TL",
        date: "15.07.2024",
      },
      {
        customer: "Ayşe",
        product: "Kırmızı Elbise",
        price: "299 TL",
        date: "10.07.2024",
      },
      {
        customer: "Mehmet",
        product: "Mavi Gömlek",
        price: "150 TL",
        date: "14.07.2024",
      },
    ];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.createChaoticData();
    this.updateProgress();
  }

  setupEventListeners() {
    document
      .getElementById("start-animation")
      .addEventListener("click", () => this.startAnimation());
    document
      .getElementById("restart-btn")
      .addEventListener("click", () => this.resetAnimation());
    document
      .getElementById("continue-btn")
      .addEventListener("click", () => this.continueAnimation());
    document
      .getElementById("query-btn")
      .addEventListener("click", () => this.executeQuery());
    document
      .getElementById("prev-btn")
      .addEventListener("click", () => this.previousScene());
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.nextScene());

    document.querySelectorAll(".step").forEach((step, index) => {
      step.addEventListener("click", () => this.goToScene(index));
    });
  }

  createChaoticData() {
    const container = document.getElementById("chaotic-data");
    if (!container) return;

    container.innerHTML = "";

    this.sampleData.forEach((item, index) => {
      const dataElement = document.createElement("div");
      dataElement.className = `data-item ${item.type}`;
      dataElement.textContent = item.value;
      dataElement.id = `data-${index}`;

      const x = Math.random() * (container.offsetWidth - 120);
      const y = Math.random() * (container.offsetHeight - 60);
      const rotation = Math.random() * 30 - 15;

      dataElement.style.left = `${x}px`;
      dataElement.style.top = `${y}px`;
      dataElement.style.transform = `rotate(${rotation}deg)`;

      container.appendChild(dataElement);
    });
  }

  startAnimation() {
    if (this.isAnimating) return;

    this.autoPlay = true;
    this.isAnimating = true;
    document.getElementById("start-animation").disabled = true;

    this.showVoiceover(0);
  }

  showVoiceover(sceneIndex) {
    const modal = document.getElementById("voiceover-modal");
    const text = document.getElementById("voiceover-text");

    text.textContent = this.voiceovers[sceneIndex];
    modal.style.display = "block";
  }

  continueAnimation() {
    const modal = document.getElementById("voiceover-modal");
    modal.style.display = "none";

    if (this.currentScene === 0) {
      setTimeout(() => this.transitionToScene1(), 1000);
    } else if (this.currentScene === 1) {
      setTimeout(() => this.transitionToScene2(), 1000);
    } else {
      this.isAnimating = false;
      document.getElementById("start-animation").disabled = false;
    }
  }

  transitionToScene1() {
    this.currentScene = 1;
    this.updateProgress();
    this.updateSteps();
    this.showScene(1);

    setTimeout(() => {
      this.organizeData();
      setTimeout(() => {
        if (this.autoPlay) {
          this.showVoiceover(1);
        }
      }, 3000);
    }, 500);
  }

  organizeData() {
    document.querySelectorAll(".drawer-content").forEach((drawer) => {
      drawer.innerHTML = "";
    });

    this.sampleData.forEach((item, index) => {
      const dataElement = document.createElement("div");
      dataElement.className = `data-item ${item.type}`;
      dataElement.textContent = item.value;
      dataElement.style.position = "relative";
      dataElement.style.margin = "4px";
      dataElement.style.display = "inline-block";
      dataElement.style.transform = "none";

      const targetDrawer = document.getElementById(`${item.type}-drawer`);
      if (targetDrawer) {
        targetDrawer.appendChild(dataElement);
      }
    });
  }

  transitionToScene2() {
    this.currentScene = 2;
    this.updateProgress();
    this.updateSteps();
    this.showScene(2);

    if (this.autoPlay) {
      setTimeout(() => {
        this.showVoiceover(2);
      }, 1000);
    }
  }

  executeQuery() {
    const querySelect = document.getElementById("user-query");
    const queryValue = querySelect.value;

    if (!queryValue) {
      alert("Lütfen bir sorgu seçiniz!");
      return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("result-table").style.display = "none";

    setTimeout(() => {
      this.showQueryResults(queryValue);
    }, 2000);
  }

  showQueryResults(queryType) {
    document.getElementById("loading").style.display = "none";

    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    let filteredData = [];

    switch (queryType) {
      case "ayse":
        filteredData = this.orderData.filter(
          (order) => order.customer === "Ayşe"
        );
        break;
      case "mehmet":
        filteredData = this.orderData.filter(
          (order) => order.customer === "Mehmet"
        );
        break;
      case "ayakkabi":
        filteredData = this.orderData.filter((order) =>
          order.product.toLowerCase().includes("ayakkabı")
        );
        break;
      case "all":
        filteredData = this.orderData;
        break;
    }

    filteredData.forEach((order, index) => {
      setTimeout(() => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>👤 ${order.customer}</td>
                    <td>🛍️ ${order.product}</td>
                    <td>💰 ${order.price}</td>
                    <td>📅 ${order.date}</td>
                `;
        tableBody.appendChild(row);
      }, index * 200);
    });

    document.getElementById("result-table").style.display = "block";
  }

  showScene(sceneIndex) {
    document.querySelectorAll(".scene").forEach((scene) => {
      scene.classList.remove("active");
    });

    const targetScene = document.getElementById(`scene-${sceneIndex}`);
    if (targetScene) {
      targetScene.classList.add("active");
    }
  }

  updateSteps() {
    document.querySelectorAll(".step").forEach((step, index) => {
      step.classList.remove("active");
      if (index === this.currentScene) {
        step.classList.add("active");
      }
    });
  }

  updateProgress() {
    const currentSceneElement = document.getElementById("current-scene");
    const completionElement = document.getElementById("completion-percentage");
    const progressFill = document.getElementById("progress-fill");

    if (currentSceneElement) {
      currentSceneElement.textContent = this.currentScene + 1;
    }

    const percentage = Math.round(((this.currentScene + 1) / 3) * 100);
    if (completionElement) {
      completionElement.textContent = percentage;
    }

    if (progressFill) {
      progressFill.style.width = `${percentage}%`;
    }
  }

  goToScene(sceneIndex) {
    if (sceneIndex === this.currentScene || this.isAnimating) return;

    this.currentScene = sceneIndex;
    this.updateProgress();
    this.updateSteps();
    this.showScene(sceneIndex);

    if (sceneIndex === 0) {
      this.createChaoticData();
    } else if (sceneIndex === 1) {
      this.organizeData();
    }
  }

  previousScene() {
    if (this.currentScene > 0 && !this.isAnimating) {
      this.goToScene(this.currentScene - 1);
    }
  }

  nextScene() {
    if (this.currentScene < 2 && !this.isAnimating) {
      this.goToScene(this.currentScene + 1);
    }
  }

  resetAnimation() {
    this.currentScene = 0;
    this.isAnimating = false;
    this.autoPlay = false;

    document.getElementById("start-animation").disabled = false;
    document.getElementById("voiceover-modal").style.display = "none";
    document.getElementById("loading").style.display = "none";
    document.getElementById("result-table").style.display = "none";

    const querySelect = document.getElementById("user-query");
    if (querySelect) {
      querySelect.value = "";
    }

    this.updateProgress();
    this.updateSteps();
    this.showScene(0);
    this.createChaoticData();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new DatabaseAnimation();
});
