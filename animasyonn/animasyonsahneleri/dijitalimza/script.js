class MultisigAnimation {
  constructor() {
    this.currentStep = 0;
    this.modalContent = [
      {
        title: "İşlem Oluşturma",
        text: "Ali, 5 BTC'yi bir proje hesabına göndermek istiyor. Ancak işlem yalnızca tüm tarafların onayıyla gerçekleşebilir.",
        icon: "📄",
      },
      {
        title: "İlk İmza",
        text: "İlk imzayı gönderen kişi Ali. Özel anahtarı ile işlemi onaylıyor.",
        icon: "🖋️",
      },
      {
        title: "Diğer Onaylar",
        text: "İşlemin ilerlemesi için diğer taraflar da imza atar. Her imza, yetkisiz değişiklikleri engeller.",
        icon: "✅",
      },
      {
        title: "Tamamlanma Anı",
        text: "Tüm taraflar imzalarını eklediğinde işlem onaylanır ve blockchain'e eklenir.",
        icon: "🔗",
      },
      {
        title: "Çoklu İmzanın Önemi",
        text: "Bu işlem, tüm imzalar tamamlandığında blockchain'e eklendi. Çoklu imza, işlemleri tek bir kişinin kontrolünden çıkarır, güvenlik ve şeffaflık sağlar.",
        icon: "🛡️",
      },
    ];

    this.signers = ["ali", "ayse", "mehmet", "elif", "hasan"];
    this.signedStatus = Array(this.signers.length).fill(false);
    this.animationExecuted = Array(this.modalContent.length).fill(false);

    this.init();
  }

  init() {
    this.bindEvents();
    this.showModal();
    this.updateProgress();
    this.updateButtons();
  }

  bindEvents() {
    const continueBtn = document.getElementById("continue-btn");
    const scenePrevBtn = document.getElementById("scene-prev-btn");
    const sceneNextBtn = document.getElementById("scene-next-btn");

    continueBtn.addEventListener("click", () => this.handleContinue());
    scenePrevBtn.addEventListener("click", () => this.handlePrevious());
    sceneNextBtn.addEventListener("click", () => this.handleNext());
  }

  showModal() {
    const modal = document.getElementById("modal");
    const modalIcon = document.getElementById("modal-icon");
    const modalTitle = document.getElementById("modal-title");
    const modalText = document.getElementById("modal-text");

    const content = this.modalContent[this.currentStep];

    modalIcon.textContent = content.icon;
    modalTitle.textContent = content.title;
    modalText.textContent = content.text;

    modal.classList.remove("hidden");
    this.updateProgress();
    this.updateButtons();
  }

  hideModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  }

  updateProgress() {
    const sceneProgressFill = document.getElementById("scene-progress-fill");
    const sceneProgressText = document.getElementById("scene-progress-text");

    const percentage =
      ((this.currentStep + 1) / this.modalContent.length) * 100;
    sceneProgressFill.style.width = `${percentage}%`;
    sceneProgressText.textContent = `${this.currentStep + 1} / ${
      this.modalContent.length
    }`;
  }

  updateButtons() {
    const scenePrevBtn = document.getElementById("scene-prev-btn");
    const sceneNextBtn = document.getElementById("scene-next-btn");
    const continueBtn = document.getElementById("continue-btn");

    scenePrevBtn.disabled = this.currentStep === 0;
    sceneNextBtn.disabled = this.currentStep === this.modalContent.length - 1;

    if (this.currentStep === this.modalContent.length - 1) {
      continueBtn.textContent = "Tamamla";
    } else {
      continueBtn.textContent = "Devam Et";
    }
  }

  handleContinue() {
    this.hideModal();

    setTimeout(() => {
      if (!this.animationExecuted[this.currentStep]) {
        this.executeStepAnimation();
        this.animationExecuted[this.currentStep] = true;
      }

      if (this.currentStep < this.modalContent.length - 1) {
        setTimeout(() => {
          this.currentStep++;
          this.updateProgress();
          this.updateButtons();
          this.showModal();
        }, 3000);
      }
    }, 500);
  }

  handlePrevious() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateProgress();
      this.updateButtons();
      this.showModal();
    }
  }

  handleNext() {
    if (this.currentStep < this.modalContent.length - 1) {
      this.currentStep++;
      this.updateProgress();
      this.updateButtons();

      if (!this.animationExecuted[this.currentStep]) {
        this.hideModal();
        setTimeout(() => {
          this.executeStepAnimation();
          this.animationExecuted[this.currentStep] = true;
          setTimeout(() => {
            this.showModal();
          }, 2000);
        }, 500);
      } else {
        this.showModal();
      }
    }
  }

  executeStepAnimation() {
    switch (this.currentStep) {
      case 0:
        this.showTransactionCard();
        break;
      case 1:
        this.signTransaction("ali");
        break;
      case 2:
        this.signTransaction("ayse");
        setTimeout(() => this.signTransaction("mehmet"), 500);
        this.showWaitingForSigners(["elif", "hasan"]);
        break;
      case 3:
        this.hideWaitingText();
        this.signTransaction("elif");
        setTimeout(() => this.signTransaction("hasan"), 500);
        setTimeout(() => this.approveTransaction(), 1000);
        break;
      case 4:
        break;
    }
  }

  showTransactionCard() {
    const transactionCard = document.getElementById("transaction-card");
    const signatureSlots = document.getElementById("signature-slots");
    const blockchainLine = document.getElementById("blockchain-line");

    transactionCard.classList.remove("hidden");
    setTimeout(() => {
      transactionCard.style.opacity = "1";
      transactionCard.style.transform = "translate(-50%, -50%) scale(1)";
    }, 100);

    setTimeout(() => {
      signatureSlots.classList.remove("hidden");
      signatureSlots.classList.add("show");
    }, 500);

    setTimeout(() => {
      blockchainLine.classList.remove("hidden");
      blockchainLine.classList.add("show");
      this.showBlockchainBlocks();
    }, 2000);
  }

  showBlockchainBlocks() {
    const blocks = document.querySelectorAll(".blockchain-block");
    const connectors = document.querySelectorAll(".blockchain-connector");

    blocks.forEach((block, index) => {
      setTimeout(() => {
        block.classList.add("show");

        if (index < connectors.length) {
          setTimeout(() => {
            connectors[index].classList.add("show");
          }, 200);
        }
      }, index * 100);
    });
  }

  signTransaction(signerName) {
    const signerIndex = this.signers.indexOf(signerName);
    if (signerIndex === -1) return;

    this.signedStatus[signerIndex] = true;

    const stamp = document.querySelector(
      `[data-signer="${signerName}"] .signature-stamp`
    );
    stamp.classList.remove("hidden");
    stamp.classList.add("show");

    if (signerName === "ali") {
      setTimeout(() => {
        stamp.style.boxShadow = "0 0 15px rgba(245, 158, 11, 0.6)";
        setTimeout(() => {
          stamp.style.boxShadow = "";
        }, 500);
      }, 300);
    }
  }

  showWaitingForSigners(signerNames) {
    signerNames.forEach((signerName) => {
      const waitingText = document.querySelector(
        `[data-signer="${signerName}"] .waiting-text`
      );
      waitingText.classList.remove("hidden");
      waitingText.classList.add("show");
    });
  }

  hideWaitingText() {
    const waitingTexts = document.querySelectorAll(".waiting-text");
    waitingTexts.forEach((text) => {
      text.classList.remove("show");
      text.classList.add("hidden");
    });
  }

  approveTransaction() {
    const transactionCard = document.getElementById("transaction-card");
    const approvedLabel = document.getElementById("approved-label");

    approvedLabel.classList.remove("hidden");
    approvedLabel.classList.add("show");

    transactionCard.classList.add("approved");

    setTimeout(() => {
      transactionCard.classList.add("moving");

      const targetBlock = document.querySelector('[data-block="4"]');
      targetBlock.classList.add("glow");

      setTimeout(() => {
        const blockText = targetBlock.querySelector(".block-text");
        blockText.classList.remove("hidden");
        blockText.classList.add("show");

        setTimeout(() => {
          transactionCard.classList.add("fade-out");
          approvedLabel.classList.remove("show");

          setTimeout(() => {
            transactionCard.classList.add("hidden");
            approvedLabel.classList.add("hidden");
          }, 500);
        }, 300);
      }, 500);
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new MultisigAnimation();
});
