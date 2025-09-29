class TimestampExplainer {
  constructor() {
    this.currentStep = 0;
    this.steps = [
      {
        title: "Zaman Damgası Nedir?",
        text: "Bir verinin oluşturulduğu anı ispatlayan dijital mühürdür. Blockchain'e kaydedildiğinde, bu zaman bilgisi değiştirilemez ve güvence altına alınır.",
        icon: "📅",
        animation: this.step1Animation.bind(this),
      },
      {
        title: "Oluşum Süreci",
        text: "Veri önce özetlenir (hash), ardından zaman bilgisiyle birleştirilir ve blockchain'e eklenir.",
        icon: "⚙️",
        animation: this.step2Animation.bind(this),
      },
      {
        title: "Değişiklik Algılama",
        text: "Veride küçük bir değişiklik bile zaman damgasıyla uyuşmaz. Bu sayede manipülasyon anında fark edilir.",
        icon: "🔒",
        animation: this.step3Animation.bind(this),
      },
      {
        title: "Önemi",
        text: "Zaman damgası, verinin ne zaman üretildiğini kanıtlar, değişiklikleri ortaya çıkarır, blockchain'e güvenli şekilde eklenmesini sağlar ve kayıtların güvenilirliğini artırır.",
        icon: "✅",
        animation: this.step4Animation.bind(this),
      },
    ];

    this.init();
  }

  init() {
    this.showModal();
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("modal-close").addEventListener("click", () => {
      this.closeModal();
    });

    document.getElementById("next-step").addEventListener("click", () => {
      this.nextStep();
    });
  }

  showModal() {
    const modal = document.getElementById("modal");
    const step = this.steps[this.currentStep];

    document.getElementById("modal-title").textContent = step.title;
    document.getElementById("modal-text").textContent = step.text;
    document.getElementById("modal-icon").textContent = step.icon;

    modal.style.display = "flex";
  }

  closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    this.startAnimation();
  }

  startAnimation() {
    document.querySelectorAll(".step-animation").forEach((el) => {
      el.classList.remove("active");
    });

    const currentAnimation = document.getElementById(
      `step${this.currentStep + 1}-animation`
    );
    currentAnimation.classList.add("active");

    this.steps[this.currentStep].animation();
  }

  step1Animation() {
    const dataBox = document.getElementById("data-box");
    const goldenSeal = document.getElementById("golden-seal");
    const timestampText = document.getElementById("timestamp-text");

    setTimeout(() => {
      dataBox.classList.add("visible");
    }, 500);

    setTimeout(() => {
      goldenSeal.classList.add("dropped");
    }, 1500);

    setTimeout(() => {
      goldenSeal.classList.add("glowing");
    }, 2500);

    setTimeout(() => {
      timestampText.classList.add("visible");
    }, 3000);

    setTimeout(() => {
      goldenSeal.classList.add("zoomed");
    }, 4000);

    setTimeout(() => {
      this.showNextButton();
    }, 5500);
  }

  step2Animation() {
    const dataBox = document.getElementById("data-box-2");
    const particles = document.getElementById("particles");
    const hashBox = document.getElementById("hash-box");
    const datetimeTag = document.getElementById("datetime-tag");
    const certificate = document.getElementById("certificate");
    const emptyBlock = document.getElementById("empty-block");
    const chainLink = document.getElementById("chain-link");

    dataBox.classList.add("visible");

    setTimeout(() => {
      this.createParticles(particles);
    }, 500);

    setTimeout(() => {
      hashBox.classList.add("visible");
    }, 1500);

    setTimeout(() => {
      datetimeTag.classList.add("visible");
    }, 2000);

    setTimeout(() => {
      certificate.classList.add("visible");
    }, 3000);

    setTimeout(() => {
      emptyBlock.classList.add("placed");
    }, 4000);

    setTimeout(() => {
      emptyBlock.classList.add("connected");
      document.getElementById("block-content").style.display = "none";
      document.getElementById("check-icon").style.display = "block";
    }, 4500);

    setTimeout(() => {
      chainLink.classList.add("visible");
    }, 4500);

    setTimeout(() => {
      this.showNextButton();
    }, 5500);
  }

  step3Animation() {
    const stampedBlock = document.getElementById("stamped-block");
    const attacker = document.getElementById("attacker");
    const modifiedData = document.getElementById("modified-data");
    const originalData = document.getElementById("original-data");
    const seal = document.getElementById("seal-3");
    const btcAmount = document.getElementById("btc-amount");
    const invalidStatus = document.getElementById("invalid-status");

    stampedBlock.classList.add("placed");

    setTimeout(() => {
      stampedBlock.classList.add("highlighted");
    }, 500);

    setTimeout(() => {
      attacker.classList.add("visible");
    }, 1500);

    setTimeout(() => {
      modifiedData.classList.add("visible");
      btcAmount.textContent = "8 BTC";
    }, 2500);

    setTimeout(() => {
      seal.classList.add("invalid");
      seal.textContent = "✗";
      invalidStatus.classList.add("visible");
    }, 3500);

    setTimeout(() => {
      originalData.classList.add("visible");
      modifiedData.style.opacity = "0.5";
    }, 4500);

    setTimeout(() => {
      this.showNextButton();
    }, 5500);
  }

  step4Animation() {
    const focusedBlock = document.getElementById("focused-block");
    const certificateSeal = document.getElementById("certificate-seal");
    const finalLock = document.getElementById("final-lock");
    const verifiedBlocks = document.querySelectorAll(".verified");
    const iconItems = document.querySelectorAll(".icon-item");

    setTimeout(() => {
      focusedBlock.classList.add("placed");
    }, 500);

    setTimeout(() => {
      certificateSeal.style.opacity = "1";
    }, 1500);

    setTimeout(() => {
      focusedBlock.classList.add("connected");
    }, 2500);

    setTimeout(() => {
      verifiedBlocks.forEach((block, index) => {
        setTimeout(() => {
          block.style.animationDelay = `${index * 0.2}s`;
          block.classList.add("placed");
        }, index * 200);
      });
    }, 3500);

    setTimeout(() => {
      finalLock.classList.add("visible");
    }, 4500);

    setTimeout(() => {
      iconItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible");
        }, index * 200);
      });
    }, 5500);

    setTimeout(() => {
      this.showNextButton();
    }, 7000);
  }

  createParticles(container) {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;

      particle.style.setProperty("--random-x", `${randomX}px`);
      particle.style.setProperty("--random-y", `${randomY}px`);
      particle.style.animationDelay = `${i * 0.1}s`;

      container.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1500);
    }
  }

  showNextButton() {
    const button = document.getElementById("next-step");
    button.classList.add("visible");

    if (this.currentStep === this.steps.length - 1) {
      button.textContent = "Baştan Başla";
    } else {
      button.textContent = "Sonraki Adım";
    }
  }

  nextStep() {
    const button = document.getElementById("next-step");
    button.classList.remove("visible");

    if (this.currentStep === this.steps.length - 1) {
      this.currentStep = 0;
    } else {
      this.currentStep++;
    }
    this.resetAnimations();

    setTimeout(() => {
      this.showModal();
    }, 500);
  }

  resetAnimations() {
    document
      .querySelectorAll(
        ".visible, .dropped, .glowing, .zoomed, .placed, .connected, .highlighted, .invalid"
      )
      .forEach((el) => {
        el.classList.remove(
          "visible",
          "dropped",
          "glowing",
          "zoomed",
          "placed",
          "connected",
          "highlighted",
          "invalid"
        );
      });

    document.getElementById("timestamp-text").classList.remove("visible");
    document.getElementById("seal-3").textContent = "✓";
    document.getElementById("seal-3").classList.remove("invalid");
    document.getElementById("btc-amount").textContent = "5 BTC";
    document.getElementById("block-content").style.display = "block";
    document.getElementById("check-icon").style.display = "none";
    document.getElementById("certificate-seal").style.opacity = "0";

    document.getElementById("particles").innerHTML = "";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  new TimestampExplainer();
});
