const scenes = [
  {
    id: "S0",
    title: "Açılış",
    caption: "Blockchain'de iki tür dijital değer vardır: Coin ve Token.",
    duration: 3500,
    setup: () => {
      resetStage();
      showElement("walletMain", "fade-in");
      setTimeout(() => {
        showElement("coinShape", "slide-in-right");
        positionElement("coinShape", { top: "40%", right: "30%" });
      }, 500);
      setTimeout(() => {
        showElement("tokenShape", "slide-in-left");
        positionElement("tokenShape", { top: "40%", left: "30%" });
      }, 800);
    },
  },
  {
    id: "S1",
    title: "Nerede Yaşar?",
    caption:
      "Coin, zincirin kendi defterinde; Token, o zincirin akıllı sözleşmelerinde 'yaşar'.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("chainA", "fade-in");
      setTimeout(() => {
        showElement("coinShape", "fade-in");
        positionElement("coinShape", { bottom: "140px", left: "45%" });
        addEffect("coinShape", "sparkle");
      }, 1000);
      setTimeout(() => {
        showElement("contractERC20", "fade-in");
        showElement("tokenShape", "fade-in");
        positionElement("tokenShape", { top: "180px", right: "80px" });
      }, 2000);
    },
  },
  {
    id: "S2",
    title: "Nasıl Doğar? (Coin)",
    caption: "Coin'ler protokol tarafından doğar (ör. blok ödülü).",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("chainA", "fade-in");
      setTimeout(() => {
        const blocks = document.querySelectorAll(".block");
        blocks[2].classList.add("mining");
        setTimeout(() => {
          showElement("coinShape", "fade-in");
          positionElement("coinShape", { bottom: "140px", left: "55%" });
          addEffect("coinShape", "sparkle");
        }, 1000);
        setTimeout(() => {
          showElement("seal", "stamp");
          positionElement("seal", { bottom: "120px", left: "55%" });
        }, 2000);
      }, 1000);
    },
  },
  {
    id: "S3",
    title: "Nasıl Doğar? (Token)",
    caption: "Token'lar geliştiricilerin mint() fonksiyonuyla üretilir.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("contractERC20", "fade-in");
      showElement("walletMain", "fade-in");
      positionElement("walletMain", { bottom: "50px", left: "30%" });
      setTimeout(() => {
        const mintBtn = document.getElementById("mint-function");
        mintBtn.classList.add("active");
        setTimeout(() => {
          showElement("tokenShape", "fade-in");
          positionElement("tokenShape", { top: "200px", right: "100px" });
          addEffect("tokenShape", "glow");
          animateTokenToWallet();
        }, 1000);
      }, 1500);
    },
  },
  {
    id: "S4",
    title: "Nasıl Transfer Olur?",
    caption:
      "Coin defterde doğrudan, Token sözleşme fonksiyonuyla transfer olur.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("chainA", "fade-in");
      showElement("contractERC20", "fade-in");

      setTimeout(() => {
        showElement("coinShape", "fade-in");
        positionElement("coinShape", { bottom: "140px", left: "35%" });
        setTimeout(() => {
          positionElement("coinShape", { bottom: "140px", left: "65%" });
          addEffect("coinShape", "pulse");
        }, 1000);
      }, 500);

      setTimeout(() => {
        const transferBtn = document.getElementById("transfer-function");
        transferBtn.classList.add("active");
        showElement("tokenShape", "fade-in");
        positionElement("tokenShape", { top: "200px", right: "100px" });
        setTimeout(() => {
          positionElement("tokenShape", { top: "300px", left: "30%" });
          addEffect("tokenShape", "pulse");
        }, 1000);
      }, 2500);
    },
  },
  {
    id: "S5",
    title: "Ücret (Gas)",
    caption: "Token gönderirken de zincirin coin'iyle gas ödenir.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("contractERC20", "fade-in");
      showElement("tokenShape", "fade-in");
      positionElement("tokenShape", { top: "200px", right: "100px" });

      setTimeout(() => {
        showElement("gasChip", "fade-in");
        setTimeout(() => {
          addEffect("gasChip", "blink");
          positionElement("tokenShape", { top: "300px", left: "30%" });
        }, 1000);
      }, 1500);
    },
  },
  {
    id: "S6",
    title: "Kullanım Alanları",
    caption:
      "Coin: ödeme/değer saklama. Token: NFT, DeFi, oyun varlıkları, stablecoin.",
    duration: 8500,
    setup: () => {
      resetStage();
      showElement("coinShape", "fade-in");
      positionElement("coinShape", { top: "30%", left: "20%" });

      setTimeout(() => {
        addEffect("coinShape", "pulse");

        showElement("seal", "stamp");
        positionElement("seal", { top: "30%", left: "35%" });
      }, 1000);

      setTimeout(() => {
        showElement("tokenShape", "fade-in");
        positionElement("tokenShape", { top: "30%", right: "30%" });
        showElement("useCases", "fade-in");

        const useCases = document.querySelectorAll(".use-case");
        useCases.forEach((useCase, index) => {
          setTimeout(() => {
            useCase.classList.add("show");
          }, index * 400);
        });
      }, 3000);
    },
  },
  {
    id: "S7",
    title: "Standartlar",
    caption: "Token'lar ERC-20/721/1155 gibi standartlara uyar.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("tokenShape", "fade-in");
      positionElement("tokenShape", { top: "40%", left: "50%" });

      setTimeout(() => {
        showElement("standards", "fade-in");
        const shelves = document.querySelectorAll(".shelf");
        shelves.forEach((shelf, index) => {
          setTimeout(() => {
            shelf.classList.add("rise");
          }, index * 300);
        });

        setTimeout(() => {
          positionElement("tokenShape", { bottom: "120px", left: "40%" });
          addEffect("tokenShape", "pulse");
        }, 1500);
      }, 1000);
    },
  },
  {
    id: "S8",
    title: "Güvenlik ve Onay",
    caption: "Coin deftere mühürlenir; Token sözleşme kurallarıyla onaylanır.",
    duration: 6500,
    setup: () => {
      resetStage();
      showElement("chainA", "fade-in");
      showElement("coinShape", "fade-in");
      positionElement("coinShape", { bottom: "140px", left: "45%" });

      setTimeout(() => {
        showElement("seal", "stamp");
        positionElement("seal", { bottom: "120px", left: "45%" });
      }, 1000);

      setTimeout(() => {
        showElement("contractERC20", "fade-in");
        showElement("tokenShape", "fade-in");
        positionElement("tokenShape", { top: "200px", right: "100px" });

        setTimeout(() => {
          addEffect("contractERC20", "glow");
          const functions = document.querySelectorAll(".function");
          functions.forEach((func) => func.classList.add("active"));
        }, 1000);
      }, 2500);
    },
  },
  {
    id: "S9",
    title: "Köprü & Wrapped",
    caption: "Köprü ile diğer zincirde wrapped versiyon oluşur (örn. WBTC).",
    duration: 8500,
    setup: () => {
      resetStage();
      showElement("chainA", "fade-in");
      positionElement("chainA", { bottom: "200px", left: "20%" });

      setTimeout(() => {
        showElement("chainB", "fade-in");
        positionElement("chainB", { bottom: "200px", right: "20%" });
        showElement("bridgeArc", "fade-in");
      }, 1000);

      setTimeout(() => {
        showElement("tokenShape", "fade-in");
        positionElement("tokenShape", { bottom: "220px", left: "25%" });

        setTimeout(() => {
          positionElement("tokenShape", { bottom: "220px", right: "25%" });
          setTimeout(() => {
            showElement("wTokenShape", "fade-in");
            positionElement("wTokenShape", { bottom: "160px", right: "25%" });
            addEffect("wTokenShape", "glow");
          }, 1500);
        }, 1000);
      }, 2000);
    },
  },
  {
    id: "S10",
    title: "Kapanış",
    caption:
      "Aynı cüzdanda durabilirler; doğdukları/yaşadıkları yerler farklıdır.",
    duration: 4500,
    setup: () => {
      resetStage();
      showElement("walletMain", "fade-in");
      const wallet = document.getElementById("walletMain");
      wallet.classList.add("open");

      setTimeout(() => {
        showElement("coinShape", "fade-in");
        showElement("tokenShape", "fade-in");
        positionElement("coinShape", { top: "45%", left: "45%" });
        positionElement("tokenShape", { top: "45%", left: "55%" });

        addEffect("coinShape", "glow");
        addEffect("tokenShape", "glow");
      }, 1000);
    },
  },
];

let currentScene = 0;
let isPlaying = true;
let sceneTimeout;

function initCoinTokenAnimation() {
  setupEventListeners();
  startScene(0);
}

function setupEventListeners() {
  document.getElementById("prev-btn").addEventListener("click", previousScene);
  document.getElementById("next-btn").addEventListener("click", nextScene);
  document
    .getElementById("play-pause-btn")
    .addEventListener("click", togglePlayPause);
}

function startScene(sceneIndex) {
  if (sceneIndex < 0 || sceneIndex >= scenes.length) return;

  currentScene = sceneIndex;
  const scene = scenes[sceneIndex];

  updateCaption(scene.title, scene.caption);
  updateProgress();
  updateControls();

  scene.setup();

  if (isPlaying) {
    clearTimeout(sceneTimeout);
    sceneTimeout = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        startScene(currentScene + 1);
      } else {
        isPlaying = false;
        updateControls();
      }
    }, scene.duration);
  }
}

function nextScene() {
  if (currentScene < scenes.length - 1) {
    clearTimeout(sceneTimeout);
    startScene(currentScene + 1);
  }
}

function previousScene() {
  if (currentScene > 0) {
    clearTimeout(sceneTimeout);
    startScene(currentScene - 1);
  }
}

function togglePlayPause() {
  isPlaying = !isPlaying;
  const btn = document.getElementById("play-pause-btn");
  btn.textContent = isPlaying ? "⏸️" : "▶️";

  if (isPlaying && currentScene < scenes.length - 1) {
    const remainingTime = scenes[currentScene].duration;
    sceneTimeout = setTimeout(() => {
      startScene(currentScene + 1);
    }, remainingTime);
  } else {
    clearTimeout(sceneTimeout);
  }
}

function updateCaption(title, caption) {
  document.getElementById("scene-title").textContent = title;
  document.getElementById("scene-caption").textContent = caption;
}

function updateProgress() {
  const progress = ((currentScene + 1) / scenes.length) * 100;
  document.getElementById("progress-fill").style.width = `${progress}%`;
  document.getElementById("scene-counter").textContent = `${
    currentScene + 1
  } / ${scenes.length}`;
}

function updateControls() {
  document.getElementById("prev-btn").disabled = currentScene === 0;
  document.getElementById("next-btn").disabled =
    currentScene === scenes.length - 1;
}

function resetStage() {
  const elements = document.querySelectorAll(".stage > *");
  elements.forEach((el) => {
    el.style.opacity = "0";
    el.style.display = "none";
    el.className = el.className.replace(
      /\s*(fade-in|slide-in-right|slide-in-left|orbit|sparkle|glow|pulse|blink|stamp|rise|show|active|open|mining)\s*/g,
      " "
    );
  });

  resetPositions();
}

function resetPositions() {
  const elements = {
    walletMain: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    coinShape: { top: "auto", left: "auto", right: "auto", bottom: "auto" },
    tokenShape: { top: "auto", left: "auto", right: "auto", bottom: "auto" },
    chainA: { bottom: "100px", left: "50%", transform: "translateX(-50%)" },
    chainB: { bottom: "50px", left: "50%", transform: "translateX(-50%)" },
    contractERC20: { top: "150px", right: "100px" },
    gasChip: { top: "50px", right: "50px" },
    bridgeArc: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    useCases: { bottom: "50px", left: "50%", transform: "translateX(-50%)" },
    standards: { bottom: "80px", left: "50%", transform: "translateX(-50%)" },
    seal: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
    wTokenShape: { top: "auto", left: "auto", right: "auto", bottom: "auto" },
  };

  Object.entries(elements).forEach(([id, styles]) => {
    const element = document.getElementById(id);
    if (element) {
      Object.assign(element.style, styles);
    }
  });
}

function showElement(elementId, animationClass = "fade-in") {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = "block";
    element.style.opacity = "1";
    if (animationClass) {
      element.classList.add(animationClass);
    }
  }
}

function positionElement(elementId, styles) {
  const element = document.getElementById(elementId);
  if (element) {
    Object.assign(element.style, styles);
  }
}

function addEffect(elementId, effectClass) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add(effectClass);

    setTimeout(() => {
      element.classList.remove(effectClass);
    }, 1000);
  }
}

function animateTokenToWallet() {
  const token = document.getElementById("tokenShape");
  const wallet = document.getElementById("walletMain");

  if (token && wallet) {
    setTimeout(() => {
      positionElement("tokenShape", {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      });
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", initCoinTokenAnimation);

window.initCoinTokenAnimation = initCoinTokenAnimation;
