const scenes = [
  {
    id: 1,
    title: "Stake Havuzu Oluşturma",
    description:
      "Kullanıcılar ellerindeki coinleri stake ederek doğrulayıcı olma hakkı kazanır ve ağın güvenliğine katkıda bulunur.",
    duration: 4000,
  },
  {
    id: 2,
    title: "Doğrulayıcı Adayları",
    description:
      "Stake miktarı ne kadar yüksekse, doğrulayıcı seçilme olasılığı o kadar artar. Bu adil bir seçim sistemi sağlar.",
    duration: 4000,
  },
  {
    id: 3,
    title: "Rastgele Doğrulayıcı Seçimi",
    description:
      "Sistem, stake oranlarını dikkate alarak kriptografik olarak güvenli bir şekilde rastgele doğrulayıcı seçer.",
    duration: 5000,
  },
  {
    id: 4,
    title: "Blok Önerisi ve Oluşturma",
    description:
      "Seçilen doğrulayıcı, bekleyen işlemlerden yeni bir blok oluşturur ve ağa önerir.",
    duration: 4000,
  },
  {
    id: 5,
    title: "Konsensüs ve Doğrulama",
    description:
      "Diğer doğrulayıcılar önerilen bloğu kontrol eder, doğrular ve çoğunluk onayı ile kabul eder.",
    duration: 5000,
  },
  {
    id: 6,
    title: "Blok Zincire Ekleme",
    description:
      "Onaylanan blok kalıcı olarak blockchain'e eklenir ve ağın durumu güncellenir.",
    duration: 4000,
  },
  {
    id: 7,
    title: "Ödül ve Ceza Sistemi",
    description:
      "Dürüst doğrulayıcılar ödüllendirilir. Kötü niyetli davranışlar slashing ile cezalandırılır.",
    duration: 5000,
  },
  {
    id: 8,
    title: "Enerji Verimliliği",
    description:
      "Proof of Stake, Proof of Work'e göre %99.9 daha az enerji tüketir ve çevre dostudur.",
    duration: 4000,
  },
];

let currentScene = 0;
let isPlaying = false;
let progress = 0;
let animationInterval = null;

const sceneContainer = document.getElementById("sceneContainer");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const playText = document.getElementById("playText");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const sceneNumber = document.getElementById("sceneNumber");
const sceneTitle = document.getElementById("sceneTitle");
const sceneDescription = document.getElementById("sceneDescription");
const progressFill = document.getElementById("progressFill");
const sceneNavigation = document.getElementById("sceneNavigation");

function init() {
  createSceneNavigation();
  updateUI();
  renderCurrentScene();
  setupEventListeners();
}

function createSceneNavigation() {
  sceneNavigation.innerHTML = "";
  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.className = `scene-nav-btn ${
      currentScene === index ? "active" : ""
    }`;
    button.innerHTML = `
            <div class="scene-nav-title">Sahne ${scene.id}</div>
            <div class="scene-nav-subtitle">${scene.title}</div>
        `;
    button.addEventListener("click", () => handleSceneSelect(index));
    sceneNavigation.appendChild(button);
  });
}

function setupEventListeners() {
  playBtn.addEventListener("click", handlePlay);
  prevBtn.addEventListener("click", handlePrevious);
  nextBtn.addEventListener("click", handleNext);
  resetBtn.addEventListener("click", handleReset);
}

function handlePlay() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    startAnimation();
  } else {
    stopAnimation();
  }
  updateUI();
}

function handlePrevious() {
  if (currentScene > 0) {
    currentScene--;
    progress = 0;
    isPlaying = false;
    updateUI();
    renderCurrentScene();
  }
}

function handleNext() {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    progress = 0;
    isPlaying = false;
    updateUI();
    renderCurrentScene();
  }
}

function handleReset() {
  isPlaying = false;
  currentScene = 0;
  progress = 0;
  stopAnimation();
  updateUI();
  renderCurrentScene();
}

function handleSceneSelect(sceneIndex) {
  currentScene = sceneIndex;
  progress = 0;
  isPlaying = false;
  stopAnimation();
  updateUI();
  renderCurrentScene();
}

function startAnimation() {
  animationInterval = setInterval(() => {
    progress += 50;
    if (progress >= scenes[currentScene].duration) {
      if (currentScene < scenes.length - 1) {
        currentScene++;
        progress = 0;
        renderCurrentScene();
      } else {
        isPlaying = false;
        progress = scenes[currentScene].duration;
        stopAnimation();
      }
    }
    updateUI();
    updateSceneAnimation();
  }, 50);
}

function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}

function updateUI() {
  playIcon.textContent = isPlaying ? "⏸" : "▶";
  playText.textContent = isPlaying ? "Duraklat" : "Oynat";
  prevBtn.disabled = currentScene === 0;
  nextBtn.disabled = currentScene === scenes.length - 1;
  sceneNumber.textContent = currentScene + 1;
  sceneTitle.textContent = scenes[currentScene].title;
  sceneDescription.textContent = scenes[currentScene].description;
  const progressPercentage = (progress / scenes[currentScene].duration) * 100;
  progressFill.style.width = `${progressPercentage}%`;
  const navButtons = sceneNavigation.querySelectorAll(".scene-nav-btn");
  navButtons.forEach((btn, index) => {
    btn.className = `scene-nav-btn ${currentScene === index ? "active" : ""}`;
  });
}

function renderCurrentScene() {
  sceneContainer.innerHTML = "";
  switch (currentScene) {
    case 0:
      renderScene1();
      break;
    case 1:
      renderScene2();
      break;
    case 2:
      renderScene3();
      break;
    case 3:
      renderScene4();
      break;
    case 4:
      renderScene5();
      break;
    case 5:
      renderScene6();
      break;
    case 6:
      renderScene7();
      break;
    case 7:
      renderScene8();
      break;
  }
}

function updateSceneAnimation() {
  switch (currentScene) {
    case 0:
      updateScene1Animation();
      break;
    case 1:
      updateScene2Animation();
      break;
    case 2:
      updateScene3Animation();
      break;
    case 3:
      updateScene4Animation();
      break;
    case 4:
      updateScene5Animation();
      break;
    case 5:
      updateScene6Animation();
      break;
    case 6:
      updateScene7Animation();
      break;
    case 7:
      updateScene8Animation();
      break;
  }
}

function renderScene1() {
  const scene = document.createElement("div");
  scene.className = "relative w-full h-full flex items-center justify-center";
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "animate-pulse";
    particle.style.position = "absolute";
    particle.style.width = "8px";
    particle.style.height = "8px";
    particle.style.background = "#93c5fd";
    particle.style.borderRadius = "50%";
    particle.style.opacity = "0.3";
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 2}s`;
    scene.appendChild(particle);
  }
  const stakePool = document.createElement("div");
  stakePool.className = "stake-pool";
  stakePool.id = "stakePool";
  stakePool.innerHTML = `
        <div>Stake Havuzu</div>
        <div style="font-size: 0.875rem; margin-top: 0.5rem; opacity: 0.8;" id="poolAmount">0 ETH</div>
    `;
  scene.appendChild(stakePool);
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const radius = 140;
    const validator = document.createElement("div");
    validator.className = "validator";
    validator.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
    validator.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
    validator.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
    validator.style.transform = "translate(-50%, -50%)";
    validator.innerHTML = "👤";
    validator.id = `validator-${i}`;
    scene.appendChild(validator);
  }
  sceneContainer.appendChild(scene);
}

function updateScene1Animation() {
  const coinCount = Math.min(12, Math.floor(progress / 250));
  const poolGlow = progress > 2000;
  const poolAmount = document.getElementById("poolAmount");
  if (poolAmount) {
    poolAmount.textContent = `${coinCount * 10} ETH`;
  }
  const stakePool = document.getElementById("stakePool");
  if (stakePool) {
    if (poolGlow) {
      stakePool.classList.add("glow", "scale-110");
    } else {
      stakePool.classList.remove("glow", "scale-110");
    }
  }
  for (let i = 0; i < 8; i++) {
    const validator = document.getElementById(`validator-${i}`);
    if (validator) {
      const isActive = progress > i * 300;
      if (isActive) {
        validator.classList.add("scale-110", "glow");
      } else {
        validator.classList.remove("scale-110", "glow");
      }
    }
  }
}

function renderScene2() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  scene.style.padding = "2rem";
  const grid = document.createElement("div");
  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(2, 1fr)";
  grid.style.gap = "3rem";
  grid.style.maxWidth = "32rem";
  const validators = [
    {
      id: 1,
      stake: 100,
      name: "Validator A",
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    },
    {
      id: 2,
      stake: 75,
      name: "Validator B",
      color: "linear-gradient(135deg, #10b981, #059669)",
    },
    {
      id: 3,
      stake: 150,
      name: "Validator C",
      color: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    },
    {
      id: 4,
      stake: 50,
      name: "Validator D",
      color: "linear-gradient(135deg, #f59e0b, #d97706)",
    },
  ];
  validators.forEach((validator, i) => {
    const validatorDiv = document.createElement("div");
    validatorDiv.style.display = "flex";
    validatorDiv.style.flexDirection = "column";
    validatorDiv.style.alignItems = "center";
    validatorDiv.id = `validator2-${i}`;
    const stakePercentage = (validator.stake / 150) * 100;
    validatorDiv.innerHTML = `
            <div class="validator" style="background: ${validator.color}; width: 4rem; height: 4rem; margin-bottom: 1rem;">
                🖥️
            </div>
            <div style="font-size: 1rem; font-weight: bold; margin-bottom: 0.75rem; color: #1e293b;">${validator.name}</div>
            <div style="width: 7rem; background: #e2e8f0; border-radius: 9999px; height: 1.25rem; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); margin-bottom: 0.5rem;">
                <div id="stake-bar-${i}" style="background: ${validator.color}; height: 100%; border-radius: 9999px; transition: width 1s ease; width: 0%; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"></div>
                <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold; color: #374151;">
                    <span id="stake-amount-${i}">0</span> ETH
                </div>
            </div>
            <div style="font-size: 0.75rem; color: #64748b; text-align: center;">
                <div>Seçilme Olasılığı</div>
                <div style="font-weight: bold; color: #1e293b;"><span id="probability-${i}">0</span>%</div>
            </div>
        `;
    grid.appendChild(validatorDiv);
  });
  scene.appendChild(grid);
  sceneContainer.appendChild(scene);
}

function updateScene2Animation() {
  const validators = [
    { stake: 100 },
    { stake: 75 },
    { stake: 150 },
    { stake: 50 },
  ];
  validators.forEach((validator, i) => {
    const isActive = progress > i * 800;
    const stakePercentage = (validator.stake / 150) * 100;
    const validatorDiv = document.getElementById(`validator2-${i}`);
    const stakeBar = document.getElementById(`stake-bar-${i}`);
    const stakeAmount = document.getElementById(`stake-amount-${i}`);
    const probability = document.getElementById(`probability-${i}`);
    if (validatorDiv && stakeBar && stakeAmount && probability) {
      if (isActive) {
        validatorDiv.classList.add("scale-110");
        stakeBar.style.width = `${stakePercentage}%`;
        stakeAmount.textContent = validator.stake;
        probability.textContent = Math.round(stakePercentage * 0.67);
      } else {
        validatorDiv.classList.remove("scale-110");
        stakeBar.style.width = "0%";
        stakeAmount.textContent = "0";
        probability.textContent = "0";
      }
    }
  });
}

function renderScene3() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  scene.style.overflow = "hidden";
  const wheel = document.createElement("div");
  wheel.id = "selectionWheel";
  wheel.style.position = "absolute";
  wheel.style.width = "20rem";
  wheel.style.height = "20rem";
  wheel.style.border = "8px solid #60a5fa";
  wheel.style.borderRadius = "50%";
  wheel.style.display = "flex";
  wheel.style.alignItems = "center";
  wheel.style.justifyContent = "center";
  wheel.style.boxShadow = "0 25px 50px -12px rgba(0, 0, 0, 0.25)";
  wheel.style.background = "linear-gradient(135deg, #ffffff, #f1f5f9)";
  wheel.style.transition = "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  const pointer = document.createElement("div");
  pointer.style.width = "1.5rem";
  pointer.style.height = "1.5rem";
  pointer.style.background = "linear-gradient(135deg, #fbbf24, #f59e0b)";
  pointer.style.borderRadius = "50%";
  pointer.style.position = "absolute";
  pointer.style.top = "-12px";
  pointer.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
  pointer.className = "animate-pulse";
  wheel.appendChild(pointer);
  wheel.innerHTML += `
        <div style="color: #374151; font-weight: bold; font-size: 1.125rem; text-align: center;">
            <div>Rastgele Seçim</div>
            <div style="font-size: 0.875rem; opacity: 0.7; margin-top: 0.25rem;">Kriptografik</div>
        </div>
    `;
  scene.appendChild(wheel);
  const colors = [
    "linear-gradient(135deg, #3b82f6, #1d4ed8)",
    "linear-gradient(135deg, #10b981, #059669)",
    "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    "linear-gradient(135deg, #f59e0b, #d97706)",
  ];
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const radius = 120;
    const validator = document.createElement("div");
    validator.className = "validator";
    validator.style.background = colors[i];
    validator.style.width = "4rem";
    validator.style.height = "4rem";
    validator.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
    validator.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
    validator.style.transform = "translate(-50%, -50%)";
    validator.style.transition = "all 1s ease";
    validator.innerHTML = "🖥️";
    validator.id = `validator3-${i}`;
    scene.appendChild(validator);
  }
  const probPanel = document.createElement("div");
  probPanel.className = "info-panel";
  probPanel.style.top = "1rem";
  probPanel.style.left = "1rem";
  probPanel.innerHTML = `
        <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Seçim Olasılıkları</div>
        <div style="font-size: 0.75rem; color: #64748b;">A: 27%</div>
        <div style="font-size: 0.75rem; color: #64748b;">B: 20%</div>
        <div style="font-size: 0.75rem; color: #64748b;" id="prob-c">C: 40%</div>
        <div style="font-size: 0.75rem; color: #64748b;">D: 13%</div>
    `;
  scene.appendChild(probPanel);
  sceneContainer.appendChild(scene);
}

function updateScene3Animation() {
  const wheel = document.getElementById("selectionWheel");
  const rotationSpeed = Math.min(progress * 0.3, 1080);
  if (wheel) {
    wheel.style.transform = `rotate(${rotationSpeed}deg)`;
  }
  if (progress > 3000) {
    const selectedValidator = document.getElementById("validator3-2");
    const probC = document.getElementById("prob-c");
    if (selectedValidator) {
      selectedValidator.style.background =
        "linear-gradient(135deg, #10b981, #059669)";
      selectedValidator.classList.add("scale-150");
      selectedValidator.innerHTML =
        '🖥️<div style="position: absolute; top: -8px; right: -8px; width: 2rem; height: 2rem; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center;" class="animate-bounce">⭐</div>';
    }
    if (probC) {
      probC.style.color = "#059669";
      probC.style.fontWeight = "bold";
    }
    if (!document.getElementById("selectionAnnouncement")) {
      const announcement = document.createElement("div");
      announcement.id = "selectionAnnouncement";
      announcement.className = "animate-fade-in";
      announcement.style.position = "absolute";
      announcement.style.bottom = "4rem";
      announcement.style.textAlign = "center";
      announcement.style.left = "50%";
      announcement.style.transform = "translateX(-50%)";
      announcement.innerHTML = `
                <div style="color: #059669; font-weight: bold; font-size: 1.5rem; margin-bottom: 0.5rem;">🎯 Validator Seçildi!</div>
                <div style="color: #64748b;">Validator C - En yüksek stake oranı</div>
            `;
      sceneContainer.appendChild(announcement);
    }
  }
}

function renderScene4() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  const selectedValidator = document.createElement("div");
  selectedValidator.style.position = "absolute";
  selectedValidator.style.left = "5rem";
  selectedValidator.style.width = "6rem";
  selectedValidator.style.height = "6rem";
  selectedValidator.style.background =
    "linear-gradient(135deg, #10b981, #059669)";
  selectedValidator.style.borderRadius = "1rem";
  selectedValidator.style.display = "flex";
  selectedValidator.style.alignItems = "center";
  selectedValidator.style.justifyContent = "center";
  selectedValidator.style.color = "white";
  selectedValidator.style.fontSize = "2.5rem";
  selectedValidator.style.boxShadow =
    "0 25px 50px -12px rgba(16, 185, 129, 0.5)";
  selectedValidator.innerHTML =
    '🖥️<div style="position: absolute; top: -8px; right: -8px; width: 1.5rem; height: 1.5rem; background: #fbbf24; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.75rem;">⭐</div>';
  scene.appendChild(selectedValidator);
  const newBlock = document.createElement("div");
  newBlock.id = "newBlock";
  newBlock.style.width = "10rem";
  newBlock.style.height = "10rem";
  newBlock.style.border = "4px solid #60a5fa";
  newBlock.style.background = "linear-gradient(135deg, #dbeafe, #bfdbfe)";
  newBlock.style.borderRadius = "1rem";
  newBlock.style.display = "flex";
  newBlock.style.flexDirection = "column";
  newBlock.style.alignItems = "center";
  newBlock.style.justifyContent = "center";
  newBlock.style.position = "relative";
  newBlock.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
  newBlock.style.transition = "all 1s ease";
  newBlock.innerHTML = `
        <div style="color: #1d4ed8; font-weight: bold; font-size: 1.125rem; margin-bottom: 0.75rem;">Yeni Blok</div>
        <div style="font-size: 0.75rem; color: #3b82f6; margin-bottom: 0.75rem;" id="blockNumber">#1000</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;" id="transactionGrid">
            ${Array.from({ length: 8 })
              .map(
                (_, i) =>
                  `<div class="transaction" id="tx-${i}" style="background: #e2e8f0;"></div>`
              )
              .join("")}
        </div>
    `;
  scene.appendChild(newBlock);
  const txPool = document.createElement("div");
  txPool.style.position = "absolute";
  txPool.style.right = "5rem";
  txPool.style.display = "flex";
  txPool.style.flexDirection = "column";
  txPool.style.gap = "0.75rem";
  const poolTitle = document.createElement("div");
  poolTitle.style.fontSize = "1.125rem";
  poolTitle.style.fontWeight = "bold";
  poolTitle.style.color = "#374151";
  poolTitle.style.textAlign = "center";
  poolTitle.textContent = "İşlem Havuzu";
  txPool.appendChild(poolTitle);
  const poolContainer = document.createElement("div");
  poolContainer.className = "info-panel";
  poolContainer.style.position = "static";
  for (let i = 0; i < 12; i++) {
    const tx = document.createElement("div");
    tx.id = `pool-tx-${i}`;
    tx.style.width = "2rem";
    tx.style.height = "2rem";
    tx.style.background = "linear-gradient(135deg, #64748b, #475569)";
    tx.style.borderRadius = "0.5rem";
    tx.style.marginBottom = "0.5rem";
    tx.style.transition = "all 0.5s ease";
    tx.style.display = "flex";
    tx.style.alignItems = "center";
    tx.style.justifyContent = "center";
    tx.style.color = "white";
    tx.style.fontSize = "0.75rem";
    tx.textContent = "Tx";
    poolContainer.appendChild(tx);
  }
  txPool.appendChild(poolContainer);
  scene.appendChild(txPool);
  sceneContainer.appendChild(scene);
}

function updateScene4Animation() {
  const transactionCount = Math.min(8, Math.floor(progress / 400));
  const blockComplete = progress > 3000;
  const blockNumber = document.getElementById("blockNumber");
  if (blockNumber) {
    blockNumber.textContent = `#${Math.floor(progress / 100) + 1000}`;
  }
  const newBlock = document.getElementById("newBlock");
  if (newBlock) {
    if (blockComplete) {
      newBlock.classList.add("scale-110", "glow");
    } else {
      newBlock.classList.remove("scale-110", "glow");
    }
  }
  for (let i = 0; i < 8; i++) {
    const tx = document.getElementById(`tx-${i}`);
    const poolTx = document.getElementById(`pool-tx-${i}`);
    if (tx && poolTx) {
      if (i < transactionCount) {
        tx.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
        tx.className = "transaction animate-pulse";
        poolTx.style.opacity = "0.3";
        poolTx.style.transform = "translateX(-250px) scale(0.75)";
      } else {
        tx.style.background = "#e2e8f0";
        tx.className = "transaction";
        poolTx.style.opacity = "1";
        poolTx.style.transform = "translateX(0) scale(1)";
      }
    }
  }
}

function renderScene5() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  scene.style.overflow = "hidden";
  const centralBlock = document.createElement("div");
  centralBlock.id = "centralBlock";
  centralBlock.style.width = "6rem";
  centralBlock.style.height = "6rem";
  centralBlock.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
  centralBlock.style.borderRadius = "1rem";
  centralBlock.style.display = "flex";
  centralBlock.style.flexDirection = "column";
  centralBlock.style.alignItems = "center";
  centralBlock.style.justifyContent = "center";
  centralBlock.style.color = "white";
  centralBlock.style.fontWeight = "bold";
  centralBlock.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
  centralBlock.style.transition = "all 1s ease";
  centralBlock.innerHTML = `
        <div style="font-size: 1rem;">Blok</div>
        <div style="font-size: 0.75rem; opacity: 0.8;">#1001</div>
    `;
  scene.appendChild(centralBlock);
  for (let i = 0; i < 7; i++) {
    const angle = (i * Math.PI * 2) / 7;
    const radius = 140;
    const validator = document.createElement("div");
    validator.className = "validator";
    validator.style.background =
      i === 6
        ? "linear-gradient(135deg, #ef4444, #dc2626)"
        : "linear-gradient(135deg, #3b82f6, #1d4ed8)";
    validator.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
    validator.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
    validator.style.transform = "translate(-50%, -50%)";
    validator.innerHTML = "🖥️";
    validator.id = `validator5-${i}`;
    scene.appendChild(validator);
  }
  const statusPanel = document.createElement("div");
  statusPanel.className = "info-panel";
  statusPanel.style.top = "1rem";
  statusPanel.style.left = "50%";
  statusPanel.style.transform = "translateX(-50%)";
  statusPanel.style.textAlign = "center";
  statusPanel.innerHTML = `
        <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Konsensüs Durumu</div>
        <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.25rem;" id="consensusCount">0/7</div>
        <div style="font-size: 0.875rem; color: #64748b;" id="consensusStatus">Oylar bekleniyor...</div>
    `;
  scene.appendChild(statusPanel);
  sceneContainer.appendChild(scene);
}

function updateScene5Animation() {
  const approvalCount = Math.min(6, Math.floor(progress / 700));
  const consensusReached = approvalCount >= 5;
  const centralBlock = document.getElementById("centralBlock");
  if (centralBlock) {
    if (consensusReached) {
      centralBlock.classList.add("scale-125", "glow");
      centralBlock.innerHTML +=
        '<div style="position: absolute; top: -12px; right: -12px; width: 2rem; height: 2rem; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center;" class="animate-bounce">✓</div>';
    } else {
      centralBlock.classList.remove("scale-125", "glow");
    }
  }
  for (let i = 0; i < 7; i++) {
    const validator = document.getElementById(`validator5-${i}`);
    const isApproving = i < approvalCount;
    const isRejecting = i === 6 && progress > 3500;
    if (validator) {
      if (isApproving) {
        validator.classList.add("glow");
        if (!validator.querySelector(".vote-signal")) {
          const signal = document.createElement("div");
          signal.className = "vote-signal animate-pulse";
          signal.style.position = "absolute";
          signal.style.width = "2rem";
          signal.style.height = "2rem";
          signal.style.borderRadius = "50%";
          signal.style.display = "flex";
          signal.style.alignItems = "center";
          signal.style.justifyContent = "center";
          signal.style.color = "white";
          signal.style.fontWeight = "bold";
          signal.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
          signal.style.top = "50%";
          signal.style.left = "50%";
          signal.style.transform = "translate(-50%, -50%)";
          if (isRejecting) {
            signal.style.background =
              "linear-gradient(135deg, #f87171, #ef4444)";
            signal.textContent = "❌";
          } else {
            signal.style.background =
              "linear-gradient(135deg, #34d399, #10b981)";
            signal.textContent = "✓";
          }
          validator.appendChild(signal);
        }
      } else {
        validator.classList.remove("glow");
      }
    }
  }
  const consensusCount = document.getElementById("consensusCount");
  const consensusStatus = document.getElementById("consensusStatus");
  if (consensusCount) {
    consensusCount.textContent = `${approvalCount}/7`;
  }
  if (consensusStatus) {
    if (consensusReached) {
      consensusStatus.textContent = "✓ Onaylandı";
      consensusStatus.style.color = "#059669";
    } else {
      consensusStatus.textContent = "Oylar bekleniyor...";
      consensusStatus.style.color = "#64748b";
    }
  }
}

function renderScene6() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  scene.style.padding = "1rem";
  const chain = document.createElement("div");
  chain.style.display = "flex";
  chain.style.alignItems = "center";
  chain.style.gap = "1.5rem";
  chain.style.flexWrap = "wrap";
  chain.style.justifyContent = "center";
  for (let i = 0; i < 3; i++) {
    const block = document.createElement("div");
    block.className = "block";
    block.style.background = "linear-gradient(135deg, #64748b, #475569)";
    block.style.fontSize = "1rem";
    block.textContent = `#${998 + i}`;
    chain.appendChild(block);
  }
  const arrow = document.createElement("div");
  arrow.style.fontSize = "2.5rem";
  arrow.style.color = "#94a3b8";
  arrow.className = "animate-pulse";
  arrow.textContent = "→";
  chain.appendChild(arrow);
  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.id = "newBlock6";
  newBlock.style.background = "linear-gradient(135deg, #94a3b8, #64748b)";
  newBlock.style.fontSize = "1rem";
  newBlock.textContent = "???";
  chain.appendChild(newBlock);
  scene.appendChild(chain);
  const infoPanel = document.createElement("div");
  infoPanel.className = "info-panel";
  infoPanel.style.bottom = "5rem";
  infoPanel.style.left = "50%";
  infoPanel.style.transform = "translateX(-50%)";
  infoPanel.style.textAlign = "center";
  infoPanel.innerHTML = `
        <div style="font-size: 0.875rem; font-weight: 600; color: #374151; margin-bottom: 0.5rem;">Blok Bilgileri</div>
        <div style="font-size: 0.75rem; color: #64748b;">
            <div>Zaman: ${new Date().toLocaleTimeString()}</div>
            <div>İşlem Sayısı: 8</div>
            <div>Boyut: 2.1 KB</div>
        </div>
    `;
  scene.appendChild(infoPanel);
  sceneContainer.appendChild(scene);
}

function updateScene6Animation() {
  const isBlockAdded = progress > 2500;
  const chainGlow = progress > 3000;
  const newBlock = document.getElementById("newBlock6");
  if (newBlock) {
    if (isBlockAdded) {
      newBlock.style.background = "linear-gradient(135deg, #3b82f6, #1d4ed8)";
      newBlock.textContent = "#1001";
      newBlock.classList.add("scale-125", "glow");
    } else {
      newBlock.style.background = "linear-gradient(135deg, #94a3b8, #64748b)";
      newBlock.textContent = "???";
      newBlock.classList.remove("scale-125", "glow");
    }
  }
  if (isBlockAdded && !document.getElementById("successMessage6")) {
    const successMsg = document.createElement("div");
    successMsg.id = "successMessage6";
    successMsg.className = "animate-bounce";
    successMsg.style.position = "absolute";
    successMsg.style.top = "2rem";
    successMsg.style.textAlign = "center";
    successMsg.style.left = "50%";
    successMsg.style.transform = "translateX(-50%)";
    successMsg.innerHTML = `
            <div style="color: #10b981; font-size: 2.5rem; margin-bottom: 0.5rem;">✓</div>
            <div style="color: #059669; font-weight: bold; font-size: 1.25rem;">Blok Eklendi!</div>
            <div style="color: #64748b; font-size: 0.875rem;">Blockchain güncellendi</div>
        `;
    sceneContainer.appendChild(successMsg);
    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = "animate-ping";
      particle.style.position = "absolute";
      particle.style.width = "0.75rem";
      particle.style.height = "0.75rem";
      particle.style.background = "#60a5fa";
      particle.style.borderRadius = "50%";
      particle.style.top = `${40 + Math.sin(i * 30) * 20}%`;
      particle.style.left = `${40 + Math.cos(i * 30) * 20}%`;
      particle.style.animationDelay = `${i * 100}ms`;
      particle.style.animationDuration = "2s";
      sceneContainer.appendChild(particle);
    }
  }
}

function renderScene7() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  scene.style.padding = "1rem";
  const comparison = document.createElement("div");
  comparison.style.display = "flex";
  comparison.style.justifyContent = "space-between";
  comparison.style.alignItems = "center";
  comparison.style.width = "100%";
  comparison.style.maxWidth = "64rem";
  comparison.style.gap = "2rem";
  const honestValidator = document.createElement("div");
  honestValidator.style.display = "flex";
  honestValidator.style.flexDirection = "column";
  honestValidator.style.alignItems = "center";
  honestValidator.style.flex = "1";
  honestValidator.innerHTML = `
        <div class="validator" style="background: linear-gradient(135deg, #10b981, #059669); width: 4rem; height: 4rem; margin-bottom: 1rem;">
            🖥️
        </div>
        <div style="font-size: 1rem; font-weight: bold; color: #059669; margin-bottom: 0.5rem;">Dürüst Doğrulayıcı</div>
        <div style="font-size: 0.875rem; color: #64748b; text-align: center; margin-bottom: 1rem;">Kurallara uygun davrandı</div>
        <div id="rewardCoins" style="display: flex; gap: 0.5rem; margin-bottom: 0.5rem; opacity: 0; transition: opacity 0.5s ease;">
            ${Array.from({ length: 5 })
              .map(
                () =>
                  '<div class="coin animate-bounce" style="animation-duration: 1.5s;">₿</div>'
              )
              .join("")}
        </div>
        <div id="rewardText" style="color: #059669; font-weight: bold; font-size: 0.875rem; opacity: 0; transition: opacity 0.5s ease;" class="animate-pulse">+2.5 ETH Ödül</div>
    `;
  comparison.appendChild(honestValidator);
  const vs = document.createElement("div");
  vs.style.fontSize = "4rem";
  vs.style.color = "#94a3b8";
  vs.style.fontWeight = "bold";
  vs.textContent = "VS";
  comparison.appendChild(vs);
  const maliciousValidator = document.createElement("div");
  maliciousValidator.style.display = "flex";
  maliciousValidator.style.flexDirection = "column";
  maliciousValidator.style.alignItems = "center";
  maliciousValidator.style.flex = "1";
  maliciousValidator.innerHTML = `
        <div class="validator" style="background: linear-gradient(135deg, #ef4444, #dc2626); width: 4rem; height: 4rem; margin-bottom: 1rem;">
            🖥️
        </div>
        <div style="font-size: 1rem; font-weight: bold; color: #dc2626; margin-bottom: 0.5rem;">Kötü Niyetli Doğrulayıcı</div>
        <div style="font-size: 0.875rem; color: #64748b; text-align: center; margin-bottom: 1rem;">Hatalı blok önerdi</div>
        <div style="width: 8rem; background: #e2e8f0; border-radius: 9999px; height: 1.5rem; position: relative; overflow: hidden; box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); margin-bottom: 0.5rem;">
            <div id="stakeBar7" style="background: linear-gradient(135deg, #ef4444, #dc2626); height: 100%; border-radius: 9999px; transition: width 2s ease; width: 80%; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);"></div>
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: bold; color: #374151;">
                <span id="stakeAmount7">80 ETH</span>
            </div>
        </div>
        <div id="slashingText" style="color: #ef4444; font-weight: bold; font-size: 0.875rem; opacity: 0; transition: opacity 0.5s ease;" class="animate-pulse">⚡ Slashing! -65 ETH</div>
    `;
  comparison.appendChild(maliciousValidator);
  scene.appendChild(comparison);
  sceneContainer.appendChild(scene);
}

function updateScene7Animation() {
  const showRewards = progress > 1500;
  const showSlashing = progress > 3000;
  const rewardAnimation = progress > 2000;
  if (showRewards) {
    const rewardCoins = document.getElementById("rewardCoins");
    const rewardText = document.getElementById("rewardText");
    if (rewardCoins) rewardCoins.style.opacity = "1";
    if (rewardText) rewardText.style.opacity = "1";
  }
  if (showSlashing) {
    const stakeBar = document.getElementById("stakeBar7");
    const stakeAmount = document.getElementById("stakeAmount7");
    const slashingText = document.getElementById("slashingText");
    if (stakeBar) stakeBar.style.width = "15%";
    if (stakeAmount) stakeAmount.textContent = "15 ETH";
    if (slashingText) slashingText.style.opacity = "1";
    if (!document.getElementById("slashingParticles")) {
      const particlesContainer = document.createElement("div");
      particlesContainer.id = "slashingParticles";
      particlesContainer.style.position = "absolute";
      particlesContainer.style.inset = "0";
      particlesContainer.style.pointerEvents = "none";
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "animate-ping";
        particle.style.position = "absolute";
        particle.style.width = "1rem";
        particle.style.height = "1rem";
        particle.style.background = "#ef4444";
        particle.style.borderRadius = "50%";
        particle.style.top = `${50 + Math.sin(i * 45) * 15}%`;
        particle.style.right = `${30 + Math.cos(i * 45) * 15}%`;
        particle.style.animationDelay = `${i * 150}ms`;
        particlesContainer.appendChild(particle);
      }
      sceneContainer.appendChild(particlesContainer);
    }
  }
}

function renderScene8() {
  const scene = document.createElement("div");
  scene.style.position = "relative";
  scene.style.width = "100%";
  scene.style.height = "100%";
  scene.style.display = "flex";
  scene.style.alignItems = "center";
  scene.style.justifyContent = "center";
  const comparison = document.createElement("div");
  comparison.style.display = "flex";
  comparison.style.justifyContent = "space-between";
  comparison.style.alignItems = "center";
  comparison.style.width = "100%";
  comparison.style.maxWidth = "48rem";
  const pow = document.createElement("div");
  pow.id = "powSection";
  pow.style.display = "flex";
  pow.style.flexDirection = "column";
  pow.style.alignItems = "center";
  pow.style.transition = "all 1s ease";
  pow.innerHTML = `
        <div style="font-size: 1.5rem; font-weight: bold; color: #ea580c; margin-bottom: 1rem;">Proof of Work</div>
        <div style="width: 6rem; height: 6rem; background: linear-gradient(135deg, #f97316, #dc2626); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; margin-bottom: 1rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
            ⚡
        </div>
        <div id="powBars" style="display: flex; gap: 0.25rem; margin-bottom: 1rem;">
            ${Array.from({ length: 8 })
              .map(
                (_, i) =>
                  `<div class="animate-pulse" style="width: 0.75rem; background: linear-gradient(to top, #ea580c, #ef4444); border-radius: 0.25rem; height: ${
                    30 + Math.random() * 40
                  }px; animation-delay: ${
                    i * 100
                  }ms; animation-duration: 1s;"></div>`
              )
              .join("")}
        </div>
        <div style="color: #ea580c; font-weight: bold; text-align: center;">
            <div>150 TWh/yıl</div>
            <div style="font-size: 0.875rem; opacity: 0.8;">Yüksek Enerji</div>
        </div>
    `;
  comparison.appendChild(pow);
  const vs = document.createElement("div");
  vs.style.fontSize = "4rem";
  vs.style.color = "#94a3b8";
  vs.style.fontWeight = "bold";
  vs.className = "animate-pulse";
  vs.textContent = "VS";
  comparison.appendChild(vs);
  const pos = document.createElement("div");
  pos.id = "posSection";
  pos.style.display = "flex";
  pos.style.flexDirection = "column";
  pos.style.alignItems = "center";
  pos.style.transition = "all 1s ease";
  pos.innerHTML = `
        <div style="font-size: 1.5rem; font-weight: bold; color: #059669; margin-bottom: 1rem;">Proof of Stake</div>
        <div style="width: 6rem; height: 6rem; background: linear-gradient(135deg, #10b981, #047857); border-radius: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem; margin-bottom: 1rem; box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.5);">
            🌱
        </div>
        <div style="display: flex; gap: 0.25rem; margin-bottom: 1rem;">
            ${Array.from({ length: 3 })
              .map(
                (_, i) =>
                  `<div class="animate-pulse" style="width: 0.75rem; background: linear-gradient(to top, #10b981, #34d399); border-radius: 0.25rem; height: ${
                    15 + Math.random() * 20
                  }px; animation-delay: ${
                    i * 300
                  }ms; animation-duration: 2s;"></div>`
              )
              .join("")}
        </div>
        <div style="color: #059669; font-weight: bold; text-align: center;">
            <div>0.15 TWh/yıl</div>
            <div style="font-size: 0.875rem; opacity: 0.8;">Düşük Enerji</div>
        </div>
    `;
  comparison.appendChild(pos);
  scene.appendChild(comparison);
  sceneContainer.appendChild(scene);
}

function updateScene8Animation() {
  const showComparison = progress > 1500;
  const showStats = progress > 3000;
  const powSection = document.getElementById("powSection");
  const posSection = document.getElementById("posSection");
  if (showComparison) {
    if (powSection) {
      powSection.style.opacity = "0.6";
      powSection.style.transform = "scale(0.95)";
    }
    if (posSection) {
      posSection.style.transform = "scale(1.1)";
    }
  }
  if (showStats && !document.getElementById("envImpact")) {
    const envImpact = document.createElement("div");
    envImpact.id = "envImpact";
    envImpact.className = "animate-fade-in";
    envImpact.style.position = "absolute";
    envImpact.style.bottom = "5rem";
    envImpact.style.textAlign = "center";
    envImpact.style.left = "50%";
    envImpact.style.transform = "translateX(-50%)";
    envImpact.innerHTML = `
            <div style="background: rgba(255, 255, 255, 0.9); border-radius: 1rem; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);">
                <div style="color: #059669; font-weight: bold; font-size: 1.875rem; margin-bottom: 0.5rem;">🌍 %99.9 Daha Az Enerji!</div>
                <div style="color: #64748b; font-size: 1.125rem;">Ethereum'un PoS'a geçişi ile yıllık enerji tüketimi</div>
                <div style="color: #64748b;">bir ülkenin elektrik tüketiminden ev boyutuna düştü</div>
            </div>
        `;
    sceneContainer.appendChild(envImpact);
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div");
      particle.className = "animate-float";
      particle.style.position = "absolute";
      particle.style.color = "#34d399";
      particle.style.fontSize = "1.5rem";
      particle.style.top = `${Math.random() * 400 + 100}px`;
      particle.style.left = `${Math.random() * 600 + 100}px`;
      particle.style.animationDelay = `${Math.random() * 3}s`;
      particle.style.animationDuration = `${3 + Math.random() * 2}s`;
      particle.textContent = "🌿";
      sceneContainer.appendChild(particle);
    }
  }
}

document.addEventListener("DOMContentLoaded", init);
