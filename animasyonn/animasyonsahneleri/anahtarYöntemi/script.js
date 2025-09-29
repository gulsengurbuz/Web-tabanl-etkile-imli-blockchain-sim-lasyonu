let currentScene = 1;
let isAnimating = false;
let sceneTimers = [];

const scenes = [
  {
    id: 1,
    title: "Tohumdan Anahtarın Doğuşu",
    description:
      "Blockchain güvenliğinin temeli olan kriptografik anahtarlar, güvenli bir tohum cümlesinden türetilir. Bu süreç, özel anahtarınızın benzersizliğini ve güvenliğini garanti eder.",
  },
  {
    id: 2,
    title: "Güvenli Saklama (Cüzdan)",
    description:
      "Özel anahtar cüzdanınızda güvenli bir şekilde saklanır ve asla dışarıya çıkmaz. Açık anahtar ise güvenle paylaşılabilir ve işlemlerinizi doğrulamak için kullanılır.",
  },
  {
    id: 3,
    title: "İşlemin İmzalanması",
    description:
      "Her blockchain işlemi, özel anahtarınızla dijital olarak imzalanır. Bu imza, işlemin sizden geldiğini kanıtlar ve değiştirilmesini önler.",
  },
  {
    id: 4,
    title: "Açık Anahtarın Paylaşımı",
    description:
      "Açık anahtarınız ağdaki diğer kullanıcılarla güvenle paylaşılır. Bu, başkalarının size işlem gönderebilmesini sağlar ancak özel anahtarınız gizli kalır.",
  },
  {
    id: 5,
    title: "Anahtar Yenileme (Rotasyon)",
    description:
      "Güvenlik en iyi uygulaması olarak, anahtarlar düzenli aralıklarla yenilenir. Bu süreç, uzun vadeli güvenliği artırır ve potansiel tehditleri minimize eder.",
  },
  {
    id: 6,
    title: "Anahtar İptali ve Kurtarma",
    description:
      "Güvenlik ihlali durumunda, tehlikeye giren anahtar derhal iptal edilir ve yeni bir güvenli anahtar çifti oluşturulur. Bu süreç, varlıklarınızı korur.",
  },
];

const lucide = window.lucide || {};

document.addEventListener("DOMContentLoaded", () => {
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  updateUI();
  startScene(currentScene);
});

function nextScene() {
  if (currentScene < 6 && !isAnimating) {
    changeScene(currentScene + 1);
  }
}

function prevScene() {
  if (currentScene > 1 && !isAnimating) {
    changeScene(currentScene - 1);
  }
}

function resetAnimation() {
  if (!isAnimating) {
    changeScene(1);
  }
}

function changeScene(newScene) {
  if (isAnimating) return;

  isAnimating = true;
  const container = document.getElementById("sceneContainer");

  clearSceneTimers();

  container.classList.add("animating");

  setTimeout(() => {
    const currentSceneEl = document.getElementById(`scene${currentScene}`);
    if (currentSceneEl) {
      currentSceneEl.classList.remove("active");
    }

    currentScene = newScene;

    const newSceneEl = document.getElementById(`scene${currentScene}`);
    if (newSceneEl) {
      newSceneEl.classList.add("active");
    }

    updateUI();

    startScene(currentScene);

    container.classList.remove("animating");
    isAnimating = false;

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  }, 400);
}

function updateUI() {
  const progressFill = document.getElementById("progressFill");
  progressFill.style.width = `${(currentScene / 6) * 100}%`;

  document.getElementById(
    "sceneCounter"
  ).textContent = `Sahne ${currentScene} / 6`;

  const scene = scenes[currentScene - 1];
  document.getElementById("sceneTitle").textContent = scene.title;
  document.getElementById("sceneDescription").textContent = scene.description;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.disabled = currentScene === 1;
  nextBtn.disabled = currentScene === 6;

  const nextBtnText =
    nextBtn.querySelector("span") ||
    nextBtn.childNodes[nextBtn.childNodes.length - 1];
  if (currentScene === 6) {
    nextBtn.innerHTML = '<i data-lucide="check-circle"></i> Tamamlandı';
  } else {
    nextBtn.innerHTML = 'Devam Et <i data-lucide="chevron-right"></i>';
  }
}

function clearSceneTimers() {
  sceneTimers.forEach((timer) => clearTimeout(timer));
  sceneTimers = [];
}

function startScene(sceneNum) {
  clearSceneTimers();

  switch (sceneNum) {
    case 1:
      startScene1();
      break;
    case 2:
      startScene2();
      break;
    case 3:
      startScene3();
      break;
    case 4:
      startScene4();
      break;
    case 5:
      startScene5();
      break;
    case 6:
      startScene6();
      break;
  }
}

function startScene1() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 4;

    const seedWords = document.querySelectorAll(".key-seed-word");
    const lightBeams = document.getElementById("lightBeams1");
    const privateKey = document.getElementById("privateKey1");
    const publicKey = document.getElementById("publicKey1");

    seedWords.forEach((word) => word.classList.remove("pulsing"));
    lightBeams.innerHTML = "";
    privateKey.classList.remove("visible");
    publicKey.classList.remove("visible");

    if (step >= 1) {
      seedWords.forEach((word) => word.classList.add("pulsing"));

      for (let i = 0; i < 8; i++) {
        const beam = document.createElement("div");
        beam.className = "key-light-beam";
        beam.style.left = `${150 + i * 40}px`;
        beam.style.animationDelay = `${i * 0.15}s`;
        lightBeams.appendChild(beam);
      }
    }

    if (step >= 2) {
      privateKey.classList.add("visible");
    }

    if (step >= 3) {
      publicKey.classList.add("visible");
    }
  }

  nextStep();

  const timer = setInterval(nextStep, 2500);
  sceneTimers.push(timer);
}

function startScene2() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 3;

    const safe = document.querySelector(".key-safe");
    const safeDoor = document.getElementById("safeDoor");
    const privateEntering = document.querySelector(".key-private-entering");
    const publicRadiating = document.querySelector(".key-public-radiating");
    const lightRays = document.getElementById("lightRays2");

    safe.classList.remove("open");
    safeDoor.classList.remove("opening");
    privateEntering.classList.remove("moving");
    publicRadiating.classList.remove("visible");
    lightRays.innerHTML = "";

    if (step >= 1) {
      safe.classList.add("open");
      safeDoor.classList.add("opening");
      privateEntering.classList.add("moving");
    }

    if (step >= 2) {
      publicRadiating.classList.add("visible");

      for (let i = 0; i < 6; i++) {
        const ray = document.createElement("div");
        ray.className = "key-light-ray";
        ray.style.transform = `rotate(${(i - 2.5) * 12}deg)`;
        ray.style.animationDelay = `${i * 0.15}s`;
        lightRays.appendChild(ray);
      }
    }
  }

  nextStep();
  const timer = setInterval(nextStep, 3000);
  sceneTimers.push(timer);
}

function startScene3() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 4;

    const transactionBox = document.getElementById("transactionBox");
    const arrow1 = document.getElementById("arrow1");
    const signingBox = document.getElementById("signingBox");
    const arrow2 = document.getElementById("arrow2");
    const signature = document.getElementById("signature");
    const arrow3 = document.getElementById("arrow3");
    const blockchainBlock = document.getElementById("blockchainBlock");

    transactionBox.classList.remove("active");
    arrow1.classList.remove("visible");
    signingBox.classList.remove("active");
    arrow2.classList.remove("visible");
    signature.classList.remove("visible");
    arrow3.classList.remove("visible");
    blockchainBlock.classList.remove("visible");

    if (step >= 1) {
      transactionBox.classList.add("active");
      arrow1.classList.add("visible");
      signingBox.classList.add("active");
    }

    if (step >= 2) {
      arrow2.classList.add("visible");
      signature.classList.add("visible");
    }

    if (step >= 3) {
      arrow3.classList.add("visible");
      blockchainBlock.classList.add("visible");
    }
  }

  nextStep();
  const timer = setInterval(nextStep, 2200);
  sceneTimers.push(timer);
}

function startScene4() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 3;

    const userDevices = document.getElementById("userDevices");

    userDevices.innerHTML = "";

    if (step >= 1) {
      const deviceTypes = [
        "smartphone",
        "laptop",
        "tablet",
        "monitor",
        "server",
        "wifi",
      ];

      for (let i = 0; i < 6; i++) {
        const angle = i * 60 * (Math.PI / 180);
        const radius = 140;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const device = document.createElement("div");
        device.className = "key-user-device visible";
        device.style.left = `calc(50% + ${x}px)`;
        device.style.top = `calc(50% + ${y}px)`;
        device.style.transform = "translate(-50%, -50%)";

        const icon = document.createElement("div");
        icon.className = "key-user-device-icon";
        icon.innerHTML = `<i data-lucide="${deviceTypes[i]}"></i>`;
        device.appendChild(icon);

        if (step >= 2) {
          const path = document.createElement("div");
          path.className = "key-light-path";
          path.style.height = `${radius - 35}px`;
          path.style.left = "50%";
          path.style.top = "100%";
          path.style.transform = `rotate(${180 + i * 60}deg)`;
          device.appendChild(path);
        }

        userDevices.appendChild(device);
      }

      if (typeof lucide !== "undefined") {
        lucide.createIcons();
      }
    }
  }

  nextStep();
  const timer = setInterval(nextStep, 2800);
  sceneTimers.push(timer);
}

function startScene5() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 4;

    const oldKey = document.querySelector(".key-old-box");
    const rotationArrow = document.getElementById("rotationArrow");
    const newKey = document.querySelector(".key-new-key");
    const dustParticles = document.getElementById("dustParticles");
    const blockchainUpdate = document.getElementById("blockchainUpdate");

    oldKey.classList.remove("fading", "disappearing");
    rotationArrow.classList.remove("visible");
    newKey.classList.remove("visible");
    dustParticles.innerHTML = "";
    blockchainUpdate.classList.remove("visible");

    if (step >= 1) {
      oldKey.classList.add("fading");
      rotationArrow.classList.add("visible");
    }

    if (step >= 2) {
      newKey.classList.add("visible");
      blockchainUpdate.classList.add("visible");
    }

    if (step >= 3) {
      oldKey.classList.add("disappearing");

      for (let i = 0; i < 12; i++) {
        const particle = document.createElement("div");
        particle.className = "key-dust-particle";
        particle.style.left = `${180 + Math.random() * 80}px`;
        particle.style.top = `${180 + Math.random() * 80}px`;
        particle.style.animationDelay = `${i * 0.08}s`;
        dustParticles.appendChild(particle);
      }
    }
  }

  nextStep();
  const timer = setInterval(nextStep, 3000);
  sceneTimers.push(timer);
}

function startScene6() {
  let step = 0;

  function nextStep() {
    step = (step + 1) % 4;

    const compromisedBox = document.querySelector(".key-compromised-box");
    const crack = document.getElementById("crack");
    const xMark = document.getElementById("xMark");
    const revocationArrow = document.getElementById("revocationArrow");
    const newKeyGeneration = document.getElementById("newKeyGeneration");
    const sparkles = document.getElementById("sparkles");
    const statusMessage = document.getElementById("statusMessage");

    compromisedBox.classList.remove("cracking");
    crack.classList.remove("visible");
    xMark.classList.remove("visible");
    revocationArrow.classList.remove("visible");
    newKeyGeneration.classList.remove("visible");
    sparkles.innerHTML = "";
    statusMessage.classList.remove("visible");

    if (step >= 1) {
      compromisedBox.classList.add("cracking");
      crack.classList.add("visible");
    }

    if (step >= 2) {
      xMark.classList.add("visible");
      revocationArrow.classList.add("visible");
    }

    if (step >= 3) {
      newKeyGeneration.classList.add("visible");
      statusMessage.classList.add("visible");

      for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "key-sparkle";
        sparkle.style.left = `${Math.random() * 80 - 40}px`;
        sparkle.style.top = `${Math.random() * 80 - 40}px`;
        sparkle.style.animationDelay = `${i * 0.15}s`;
        sparkles.appendChild(sparkle);
      }
    }
  }

  nextStep();
  const timer = setInterval(nextStep, 2500);
  sceneTimers.push(timer);
}
