class AsymmetricEncryptionAnimation {
  constructor() {
    this.currentStep = 0;
    this.isPlaying = true;
    this.progress = 0;
    this.narrationMode = "detailed";
    this.messageState = "open";
    this.progressTimer = null;
    this.stepTimer = null;

    this.stepContent = {
      detailed: [
        {
          narrator: "",
          caption: "",
          duration: 0,
        },
        {
          narrator:
            "Asimetrik şifrelemede iki farklı anahtar kullanılır. Genel anahtar herkesle paylaşılabilir ve mesajları kilitlemek için kullanılır. Özel anahtar ise sadece sahibinde kalır ve mesajları açmak için kullanılır.",
          caption: "Genel anahtar paylaşılabilir; özel anahtar gizli tutulur.",
          duration: 8000,
        },
        {
          narrator:
            "Ali, Zeynep'e güvenli bir mesaj göndermek istiyor. Bunun için Zeynep'in genel anahtarını kullanarak mesajını şifreler. Bu işlem mesajı sadece Zeynep'in özel anahtarıyla açılabilir hale getirir.",
          caption:
            "Genel anahtar ile kilitle → sadece Zeynep'in özel anahtarı açabilir.",
          duration: 6000,
        },
        {
          narrator:
            "Şifreli mesaj ağ üzerinden geçerken, kötü niyetli bir saldırgan mesajı ele geçirmeye çalışır. Ancak genel anahtarla şifrelenmiş mesaj, yine genel anahtarla açılamaz. Saldırgan başarısız olur.",
          caption:
            "Saldırgan, genel anahtarla çözemez - özel anahtar gereklidir.",
          duration: 6000,
        },
        {
          narrator:
            "Mesaj Zeynep'e ulaştığında, Zeynep kendi özel anahtarını kullanarak mesajı açar. Özel anahtar sadece Zeynep'te olduğu için, mesajı sadece o okuyabilir.",
          caption: "Özel anahtar paylaşılmaz; sadece sahibi mesajı açabilir.",
          duration: 6000,
        },
        {
          narrator:
            "Asimetrik şifrelemenin temel prensibi: Genel anahtar kilitler, özel anahtar açar. Bu sistem sayesinde güvenli iletişim sağlanır.",
          caption: "Özet: İki anahtar, iki farklı görev",
          duration: 6000,
        },
        {
          narrator:
            "Asimetrik şifreleme modern güvenli iletişimin temelidir. İnternet bankacılığından e-postaya kadar birçok alanda kullanılır.",
          caption: "Animasyon tamamlandı - Güvenli iletişimin temeli",
          duration: 6000,
        },
      ],
      simple: [
        {
          narrator: "",
          caption: "",
          duration: 0,
        },
        {
          narrator: "İki anahtar var: Biri kilitler, diğeri açar.",
          caption: "Genel anahtar = kilit, Özel anahtar = açar",
          duration: 4000,
        },
        {
          narrator: "Ali mesajı Zeynep'in genel anahtarıyla kilitler.",
          caption: "Mesaj kilitlendi",
          duration: 3000,
        },
        {
          narrator: "Kötü adam açamaz çünkü özel anahtarı yok.",
          caption: "Saldırgan başarısız",
          duration: 3000,
        },
        {
          narrator: "Zeynep özel anahtarıyla mesajı açar.",
          caption: "Mesaj açıldı",
          duration: 3000,
        },
        {
          narrator: "Genel kilitler, özel açar!",
          caption: "Basit kural",
          duration: 4000,
        },
        {
          narrator: "Bu sistem çok güvenli!",
          caption: "Güvenli iletişim",
          duration: 4000,
        },
      ],
      technical: [
        {
          narrator: "",
          caption: "",
          duration: 0,
        },
        {
          narrator:
            "Asimetrik kriptografi algoritması: RSA, ECC gibi matematiksel fonksiyonlar kullanır. Public key (n,e), private key (n,d) çifti oluşturulur.",
          caption: "Matematiksel anahtar çifti: (n,e) ve (n,d)",
          duration: 8000,
        },
        {
          narrator:
            "Şifreleme işlemi: C = M^e mod n. Mesaj M, public key (e,n) ile şifrelenir. Sonuç C ciphertext'i oluşturur.",
          caption: "Encryption: C = M^e mod n",
          duration: 6000,
        },
        {
          narrator:
            "Ağ güvenliği: Man-in-the-middle saldırısı mümkün değil. Saldırgan C'yi bilse de, private key d olmadan M'yi hesaplayamaz.",
          caption: "Cryptographic security: Discrete logarithm problem",
          duration: 6000,
        },
        {
          narrator:
            "Deşifreleme işlemi: M = C^d mod n. Sadece private key d ile orijinal mesaj M elde edilir.",
          caption: "Decryption: M = C^d mod n",
          duration: 6000,
        },
        {
          narrator:
            "PKI (Public Key Infrastructure): Anahtar dağıtımı, sertifika otoriteleri ve güven zinciri.",
          caption: "PKI: Certificate Authority ve trust chain",
          duration: 6000,
        },
        {
          narrator:
            "Uygulama alanları: TLS/SSL, PGP, SSH, digital signatures. Quantum computing tehdidi ve post-quantum cryptography.",
          caption: "Applications: TLS, PGP, SSH | Future: Post-quantum crypto",
          duration: 8000,
        },
      ],
      visual: [
        {
          narrator: "",
          caption: "",
          duration: 0,
        },
        {
          narrator: "🔑 İki anahtar sistemi",
          caption: "🔵 Mavi = Genel | 🟡 Altın = Özel",
          duration: 4000,
        },
        {
          narrator: "🔒 Mesaj kilitleniyor",
          caption: "📝 ➡️ 🔒",
          duration: 3000,
        },
        {
          narrator: "🚫 Saldırgan engellenyor",
          caption: "👤❌ ➡️ 🔒❌",
          duration: 3000,
        },
        {
          narrator: "🔓 Mesaj açılıyor",
          caption: "🔒 ➡️ 📝✅",
          duration: 3000,
        },
        {
          narrator: "✨ Sistem özeti",
          caption: "🔵🔒 ➡️ 🟡🔓",
          duration: 4000,
        },
        {
          narrator: "🛡️ Güvenli iletişim",
          caption: "🌐🔐 = 💯 Güvenlik",
          duration: 4000,
        },
      ],
    };

    this.modeNames = {
      detailed: "Detaylı Anlatım",
      simple: "Basit Anlatım",
      technical: "Teknik Anlatım",
      visual: "Görsel Anlatım",
    };

    this.initializeElements();
    this.bindEvents();
    this.start();
  }

  initializeElements() {
    this.elements = {
      progressFill: document.getElementById("progressFill"),
      stageIndicators: document.getElementById("stageIndicators"),
      prevBtn: document.getElementById("prevBtn"),
      playPauseBtn: document.getElementById("playPauseBtn"),
      nextBtn: document.getElementById("nextBtn"),
      modeBtn: document.getElementById("modeBtn"),
      modeDropdown: document.getElementById("modeDropdown"),
      currentMode: document.getElementById("currentMode"),
      keysContainer: document.getElementById("keysContainer"),
      messageBox: document.getElementById("messageBox"),
      messageLabel: document.getElementById("messageLabel"),
      messageContent: document.getElementById("messageContent"),
      aliKey: document.getElementById("aliKey"),
      badNode: document.getElementById("badNode"),
      accessDenied: document.getElementById("accessDenied"),
      zeynepKey: document.getElementById("zeynepKey"),
      summaryContainer: document.getElementById("summaryContainer"),
      finalSummary: document.getElementById("finalSummary"),
      finalText: document.getElementById("finalText"),
      narrator: document.getElementById("narrator"),
      narratorText: document.getElementById("narratorText"),
      caption: document.getElementById("caption"),
      captionText: document.getElementById("captionText"),
      restartBtn: document.getElementById("restartBtn"),
    };
  }

  bindEvents() {
    this.elements.prevBtn.addEventListener("click", () => this.previousStep());
    this.elements.playPauseBtn.addEventListener("click", () =>
      this.togglePlayPause()
    );
    this.elements.nextBtn.addEventListener("click", () => this.nextStep());
    this.elements.restartBtn.addEventListener("click", () => this.restart());

    this.elements.modeBtn.addEventListener("click", () =>
      this.toggleModeDropdown()
    );

    document.querySelectorAll(".mode-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        this.changeMode(e.target.dataset.mode);
      });
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".mode-selector")) {
        this.elements.modeDropdown.classList.remove("show");
      }
    });
  }

  get steps() {
    return this.stepContent[this.narrationMode];
  }

  start() {
    setTimeout(() => {
      this.currentStep = 1;
      this.updateDisplay();
      this.startStepTimer();
    }, 500);
  }

  startStepTimer() {
    if (!this.isPlaying || this.currentStep >= this.steps.length - 1) return;

    const duration = this.steps[this.currentStep].duration;
    if (duration === 0) return;

    const interval = 50;
    let elapsed = 0;

    this.progressTimer = setInterval(() => {
      elapsed += interval;
      this.progress = (elapsed / duration) * 100;
      this.elements.progressFill.style.width = `${this.progress}%`;

      if (elapsed >= duration) {
        clearInterval(this.progressTimer);
        this.nextStep();
      }
    }, interval);
  }

  stopTimers() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.stepTimer) {
      clearTimeout(this.stepTimer);
      this.stepTimer = null;
    }
  }

  updateDisplay() {
    const indicators =
      this.elements.stageIndicators.querySelectorAll(".indicator");
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentStep - 1);
    });

    this.elements.prevBtn.disabled = this.currentStep <= 1;
    this.elements.nextBtn.disabled = this.currentStep >= this.steps.length - 1;

    const playIcon = this.elements.playPauseBtn.querySelector("i");
    playIcon.className = this.isPlaying ? "fas fa-pause" : "fas fa-play";

    const step = this.steps[this.currentStep];
    if (step) {
      this.elements.narratorText.classList.remove("show");

      setTimeout(() => {
        this.elements.narratorText.textContent = step.narrator;
        this.elements.captionText.textContent = step.caption;

        this.elements.narratorText.classList.add("show");
        this.elements.captionText.classList.add("show");
      }, 100);

      this.elements.restartBtn.classList.toggle(
        "show",
        this.currentStep === this.steps.length - 1
      );
    }

    this.updateStepDisplay();
  }

  updateStepDisplay() {
    this.hideAllElements();

    switch (this.currentStep) {
      case 1:
        this.showStep1();
        break;
      case 2:
        this.showStep2();
        break;
      case 3:
        this.showStep3();
        break;
      case 4:
        this.showStep4();
        break;
      case 5:
        this.showStep5();
        break;
      case 6:
        this.showStep6();
        break;
    }
  }

  hideAllElements() {
    this.elements.keysContainer.classList.remove("show");
    this.elements.messageBox.classList.remove("show");
    this.elements.aliKey.classList.remove("show");
    this.elements.badNode.classList.remove("show");
    this.elements.zeynepKey.classList.remove("show");
    this.elements.summaryContainer.classList.remove("show");
    this.elements.finalSummary.classList.remove("show");
    this.elements.accessDenied.classList.remove("show");

    this.elements.messageBox.style.transform = "translateY(-50%)";
  }

  showStep1() {
    this.elements.keysContainer.classList.add("show");
  }

  showStep2() {
    this.elements.messageBox.classList.add("show", "open");
    this.elements.messageBox.classList.remove("encrypted");
    this.elements.messageLabel.textContent = "Açık Veri";
    this.elements.messageContent.textContent = "Merhaba Zeynep";

    this.elements.aliKey.style.left = "96px";
    this.elements.aliKey.classList.add("show");

    setTimeout(() => {
      this.elements.messageBox.classList.remove("open");
      this.elements.messageBox.classList.add("encrypted");
      this.elements.messageLabel.textContent = "Şifreli";
      this.elements.messageContent.textContent = "8fA#1xZ...";

      this.elements.aliKey.style.left = "176px";
    }, 1500);
  }

  showStep3() {
    this.elements.messageBox.classList.add("show", "encrypted");
    this.elements.messageLabel.textContent = "Şifreli";
    this.elements.messageContent.textContent = "8fA#1xZ...";

    this.elements.messageBox.style.transform =
      "translateY(-50%) translateX(200px)";

    this.elements.badNode.classList.add("show");

    setTimeout(() => {
      this.elements.accessDenied.classList.add("show");
      this.elements.messageBox.classList.add("shake");

      const badKey = this.elements.badNode.querySelector(".bad-key");
      badKey.classList.add("show");

      setTimeout(() => {
        this.elements.accessDenied.classList.remove("show");
        this.elements.messageBox.classList.remove("shake");
      }, 800);
    }, 2000);
  }

  showStep4() {
    this.elements.messageBox.classList.add("show", "encrypted");
    this.elements.messageLabel.textContent = "Şifreli";
    this.elements.messageContent.textContent = "8fA#1xZ...";

    this.elements.messageBox.style.transform =
      "translateY(-50%) translateX(350px)";

    this.elements.zeynepKey.style.right = "96px";
    this.elements.zeynepKey.classList.add("show");

    setTimeout(() => {
      this.elements.messageBox.classList.remove("encrypted");
      this.elements.messageBox.classList.add("open");
      this.elements.messageLabel.textContent = "Açık Veri";
      this.elements.messageContent.textContent = "Merhaba Zeynep";

      this.elements.zeynepKey.style.right = "176px";
    }, 1500);
  }

  showStep5() {
    this.elements.summaryContainer.classList.add("show");
  }

  showStep6() {
    const step = this.steps[this.currentStep];
    this.elements.finalText.textContent = step.narrator;
    this.elements.finalSummary.classList.add("show");
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.stopTimers();
      this.currentStep--;
      this.progress = 0;
      this.elements.progressFill.style.width = "0%";
      this.isPlaying = false;
      this.updateDisplay();
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.stopTimers();
      this.currentStep++;
      this.progress = 0;
      this.elements.progressFill.style.width = "0%";
      this.updateDisplay();
      if (this.isPlaying) {
        this.startStepTimer();
      }
    }
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startStepTimer();
    } else {
      this.stopTimers();
    }

    this.updateDisplay();
  }

  toggleModeDropdown() {
    this.elements.modeDropdown.classList.toggle("show");
  }

  changeMode(mode) {
    this.narrationMode = mode;
    this.elements.currentMode.textContent = this.modeNames[mode];

    document.querySelectorAll(".mode-option").forEach((option) => {
      option.classList.toggle("active", option.dataset.mode === mode);
    });

    this.elements.modeDropdown.classList.remove("show");

    this.restart();
  }

  restart() {
    this.stopTimers();
    this.currentStep = 0;
    this.progress = 0;
    this.isPlaying = true;
    this.messageState = "open";
    this.elements.progressFill.style.width = "0%";
    this.hideAllElements();
    this.start();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AsymmetricEncryptionAnimation();
});
