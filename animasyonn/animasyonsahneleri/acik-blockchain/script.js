class SymmetricEncryptionAnimation {
  constructor() {
    this.currentScene = 0;
    this.scenes = [
      {
        id: 0,
        narrator:
          "Ali, Zeynep'e göndermek istediği '5 BTC'lik' bir işlemi var. Bu işlem şu an herkes tarafından okunabilir durumda, yani 'açık veri' olarak duruyor. Blockchain'e eklemeden önce bu bilginin gizliliğini sağlamak için şifrelemek istiyor.",
        dataContent: "Ali → 5 BTC → Zeynep",
        dataLabel: "Açık Veri",
        dataClass: "open-data",
        showKeyAli: true,
        showEvilNode: false,
        showTunnel: false,
        showAccessDenied: false,
        showEvilAttempt: false,
        showFinalMessage: false,
        keyPosition: "left",
        blueBg: false,
      },
      {
        id: 1,
        narrator:
          "Simetrik şifreleme yönteminde, Ali elindeki tek bir 'altın anahtar'ı kullanarak açık veriyi şifreliyor. Bu anahtar, veriyi okunamaz, karışık bir hale getirerek gizliliğini sağlıyor. Artık veri 'şifreli veri' olarak adlandırılıyor.",
        dataContent: "8fA#1xZ...",
        dataLabel: "Şifreli Veri",
        dataClass: "encrypted-data",
        showKeyAli: false,
        showEvilNode: false,
        showTunnel: false,
        showAccessDenied: false,
        showEvilAttempt: false,
        showFinalMessage: false,
        keyPosition: "data",
        blueBg: true,
      },
      {
        id: 2,
        narrator:
          "Şifreli veriyi Zeynep'in okuyabilmesi için, Ali'nin kullandığı aynı anahtarı Zeynep'e göndermesi gerekiyor. Ancak bu anahtarın güvenli bir şekilde iletilmesi hayati önem taşıyor. Bu yüzden, anahtar blockchain üzerinde özel, şifreli ve 'güvenli kilit' ikonlarıyla korunan bir tünel aracılığıyla Zeynep'e doğru ilerliyor. Dışarıdaki 'Kötü Node' bu anahtarı ele geçirmeye çalışsa da, güvenli tünel sayesinde başarılı olamıyor.",
        dataContent: "8fA#1xZ...",
        dataLabel: "Şifreli Veri",
        dataClass: "encrypted-data",
        showKeyAli: false,
        showEvilNode: true,
        showTunnel: true,
        showAccessDenied: false,
        showEvilAttempt: false,
        showFinalMessage: false,
        keyPosition: "tunnel",
        blueBg: false,
      },
      {
        id: 3,
        narrator:
          "Anahtar güvenli bir şekilde Zeynep'in düğümüne ulaştığında, Zeynep de aynı anahtarı kullanarak şifreli veriyi çözüyor. Anahtarın dokunuşuyla karışık karakterler tekrar orijinal, okunabilir 'açık veri' haline geliyor. Bu, simetrik şifrelemenin temel prensibidir: aynı anahtar hem şifreleme hem de çözme için kullanılır.",
        dataContent: "Ali → 5 BTC → Zeynep",
        dataLabel: "Açık Veri",
        dataClass: "open-data",
        showKeyAli: false,
        showEvilNode: true,
        showTunnel: false,
        showAccessDenied: false,
        showEvilAttempt: false,
        showFinalMessage: false,
        keyPosition: "decrypted",
        blueBg: false,
      },
      {
        id: 4,
        narrator:
          "Peki ya anahtar kötü niyetli kişilerin eline geçmezse? 'Kötü Node', şifreli veriyi ele geçirse bile, doğru anahtara sahip olmadığı için veriyi çözemiyor. Aşağıdan uzanan kırmızı ok ve ucundaki çarpı işareti, bu başarısız erişim denemesini gösteriyor. Ekranda beliren 'Erişim Reddedildi' mesajı, anahtar olmadan şifreli verinin tamamen güvende olduğunu ve gizliliğinin korunduğunu vurguluyor.",
        dataContent: "8fA#1xZ...",
        dataLabel: "Şifreli Veri",
        dataClass: "encrypted-data",
        showKeyAli: false,
        showEvilNode: true,
        showTunnel: false,
        showAccessDenied: true,
        showEvilAttempt: true,
        showFinalMessage: false,
        keyPosition: "none",
        blueBg: false,
      },
      {
        id: 5,
        narrator: "",
        dataContent: "Ali → 5 BTC → Zeynep",
        dataLabel: "Açık Veri",
        dataClass: "open-data",
        showKeyAli: false,
        showEvilNode: false,
        showTunnel: false,
        showAccessDenied: false,
        showEvilAttempt: false,
        showFinalMessage: true,
        keyPosition: "none",
        blueBg: false,
      },
    ];

    this.initializeElements();
    this.bindEvents();
    this.renderScene();
  }

  initializeElements() {
    this.elements = {
      background: document.getElementById("background"),
      dataBlock: document.getElementById("dataBlock"),
      dataLabel: document.getElementById("dataLabel"),
      dataContent: document.getElementById("dataContent"),
      key: document.getElementById("key"),
      evilNode: document.getElementById("evilNode"),
      secureTunnel: document.getElementById("secureTunnel"),
      evilAttempt: document.getElementById("evilAttempt"),
      accessArrow: document.getElementById("accessArrow"),
      accessCross: document.getElementById("accessCross"),
      accessDeniedModal: document.getElementById("accessDeniedModal"),
      narrator: document.getElementById("narrator"),
      finalMessage: document.getElementById("finalMessage"),
      continueBtn: document.getElementById("continueBtn"),
      blockchainLine: document.getElementById("blockchainLine"),
    };
  }

  bindEvents() {
    this.elements.continueBtn.addEventListener("click", () => {
      this.nextScene();
    });
  }

  nextScene() {
    this.currentScene = (this.currentScene + 1) % this.scenes.length;
    this.renderScene();
  }

  renderScene() {
    const scene = this.scenes[this.currentScene];

    this.elements.continueBtn.textContent =
      this.currentScene === this.scenes.length - 1
        ? "Tekrar Oynat"
        : "Devam Et";

    if (scene.blueBg) {
      this.elements.background.classList.add("blue-bg");
    } else {
      this.elements.background.classList.remove("blue-bg");
    }

    this.elements.dataContent.textContent = scene.dataContent;
    this.elements.dataLabel.textContent = scene.dataLabel;
    this.elements.dataBlock.className = `data-block visible ${scene.dataClass}`;

    if (scene.narrator) {
      this.elements.narrator.textContent = scene.narrator;
      this.elements.narrator.classList.add("visible");
    } else {
      this.elements.narrator.classList.remove("visible");
    }

    this.updateKey(scene);

    if (scene.showEvilNode) {
      this.elements.evilNode.classList.add("visible");
    } else {
      this.elements.evilNode.classList.remove("visible");
    }

    if (scene.showTunnel) {
      this.elements.secureTunnel.classList.add("visible");
    } else {
      this.elements.secureTunnel.classList.remove("visible");
    }

    if (scene.showEvilAttempt) {
      this.elements.evilAttempt.classList.add("visible");
      setTimeout(() => {
        this.elements.accessArrow.classList.add("extended");
        setTimeout(() => {
          this.elements.accessCross.classList.add("visible");
        }, 400);
      }, 100);
    } else {
      this.elements.evilAttempt.classList.remove("visible");
      this.elements.accessArrow.classList.remove("extended");
      this.elements.accessCross.classList.remove("visible");
    }

    if (scene.showAccessDenied) {
      setTimeout(() => {
        this.elements.accessDeniedModal.classList.add("visible");
      }, 500);
    } else {
      this.elements.accessDeniedModal.classList.remove("visible");
    }

    if (scene.showFinalMessage) {
      this.elements.finalMessage.classList.add("visible");

      this.elements.blockchainLine.style.animation =
        "blockchain-flow 5s linear infinite";
    } else {
      this.elements.finalMessage.classList.remove("visible");
      this.elements.blockchainLine.style.animation = "none";
    }
  }

  updateKey(scene) {
    this.elements.key.className = "key";

    if (scene.showKeyAli) {
      this.elements.key.classList.add("visible");
    } else if (scene.keyPosition === "data") {
      this.elements.key.classList.add("visible", "move-to-data");
    } else if (scene.keyPosition === "tunnel") {
      this.elements.key.classList.add("visible", "move-to-tunnel");
    } else if (scene.keyPosition === "decrypted") {
      this.elements.key.classList.add("visible", "move-to-decrypted");
    } else {
      this.elements.key.classList.remove("visible");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SymmetricEncryptionAnimation();
});
