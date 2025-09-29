const scenes = [
  {
    id: 1,
    title: "Blockchain Her Yerde",
    description:
      "Blockchain yalnızca kripto para değildir; finans, sağlık, lojistik, seçim, sanat gibi pek çok alanda güvenli ve şeffaf çözümler sunar.",
    subtitle: "Küresel teknoloji devrimi başlıyor",
    buttonText: "Keşfe Başla",
    duration: 14,
    tooltips: [
      {
        time: 1,
        duration: 2.5,
        text: "Blockchain = küresel, dağıtılmış kayıt sistemi",
      },
      {
        time: 7,
        duration: 2.5,
        text: "Tüm katılımcılar aynı doğrulanmış veriye erişir",
      },
    ],
  },
  {
    id: 2,
    title: "Finansta Blockchain",
    description:
      "Blockchain ile sınır ötesi ödemeler saniyeler içinde ve düşük maliyetle tamamlanabilir.",
    subtitle: "Geleneksel bankacılığın ötesinde hızlı çözümler",
    buttonText: "İzle",
    duration: 12,
    tooltips: [
      { time: 2, duration: 2.5, text: "Geleneksel: Çok aracı, uzun süre" },
      { time: 5, duration: 2.5, text: "Blockchain: Eşler arası, hızlı onay" },
      { time: 8.5, duration: 2.5, text: "Maliyet = ağ yoğunluğu + gas ücreti" },
    ],
  },
  {
    id: 3,
    title: "Sağlıkta Güvenli Veri",
    description:
      "Hasta verileri blockchain üzerinde değiştirilemez şekilde saklanır ve sadece izin verilen kişiler erişebilir.",
    subtitle: "Medikal verilerde gizlilik ve güvenlik",
    buttonText: "Devam",
    duration: 14,
    tooltips: [
      { time: 2, duration: 2.5, text: "Değiştirilemez veri = güven" },
      { time: 6.5, duration: 2.5, text: "Erişim hasta izni ile verilir" },
      {
        time: 10.5,
        duration: 2.5,
        text: "Kim, ne zaman, neye erişti kaydı tutulur",
      },
    ],
  },
  {
    id: 4,
    title: "Şeffaf Tedarik Zinciri",
    description:
      "Üretimden müşteriye kadar tüm süreç blockchain üzerinde kayıt altına alınır.",
    subtitle: "Ürün yolculuğunda tam şeffaflık",
    buttonText: "Göster",
    duration: 16,
    tooltips: [
      { time: 1, duration: 2.5, text: "Her aşama yeni bir blok kaydıdır" },
      { time: 5, duration: 3, text: "Kayıtlar tüm taraflarca görülebilir" },
      { time: 12, duration: 3, text: "Sahtecilik kolay tespit edilir" },
    ],
  },
  {
    id: 5,
    title: "Güvenli Oylama",
    description:
      "Oylar şifrelenir, değiştirilemez şekilde kaydedilir ve herkes tarafından doğrulanabilir.",
    subtitle: "Demokratik süreçlerde dijital güven",
    buttonText: "İzle",
    duration: 12,
    tooltips: [
      { time: 2, duration: 2.5, text: "Anonim ama doğrulanabilir oy" },
      { time: 5.5, duration: 2, text: "Geçmiş değiştirilemez" },
      { time: 9, duration: 2.5, text: "Sonuç herkesçe doğrulanabilir" },
    ],
  },
  {
    id: 6,
    title: "NFT ile Sahiplik Doğrulaması",
    description:
      "Sanat eserleri blockchain'e kaydedilerek benzersiz kimlik kazanır, telif hakları korunur.",
    subtitle: "Dijital sanat ve telif hakları devrimi",
    buttonText: "Devam",
    duration: 12,
    tooltips: [
      { time: 2, duration: 2.5, text: "TokenID = benzersiz kimlik" },
      {
        time: 5,
        duration: 2.5,
        text: "Köken ve transfer geçmişi zincirde saklanır",
      },
      { time: 8.5, duration: 2.5, text: "Kopya ≠ sahiplik" },
    ],
  },
  {
    id: 7,
    title: "Özet ve Sonraki Adım",
    description:
      "Finans, sağlık, lojistik, oylama ve sanatta blockchain'in etkisini gorduk. Peki sizin alaninizda hangi süreçler güven ve şeffaflıkla geliştirilebilir?",
    subtitle: "Blockchain'in geleceği sizin ellerinizde",
    buttonText: "Bitir",
    duration: 10,
    tooltips: [
      {
        time: 3.5,
        duration: 2.5,
        text: "Açık doğrulama • Otomasyon • İzlenebilirlik",
      },
    ],
  },
];

let currentScene = 0;
let presentationState = "modal";
let isPlaying = false;
let progress = 0;
let activeTooltip = null;
let animationInterval = null;

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalSubtitle = document.getElementById("modal-subtitle");
const buttonText = document.getElementById("button-text");
const sceneCounter = document.getElementById("scene-counter");
const startAnimationBtn = document.getElementById("start-animation-btn");
const resetBtn = document.getElementById("reset-btn");
const finalResetBtn = document.getElementById("final-reset-btn");
const replayBtn = document.getElementById("replay-btn");
const animationArea = document.getElementById("animation-area");
const tooltip = document.getElementById("tooltip");
const tooltipText = document.getElementById("tooltip-text");
const sceneInfo = document.getElementById("scene-info");
const sceneInfoText = document.getElementById("scene-info-text");
const replayBtnContainer = document.getElementById("replay-btn-container");
const subtitleArea = document.getElementById("subtitle-area");
const subtitleText = document.getElementById("subtitle-text");
const completionScreen = document.getElementById("completion-screen");

const lucide = {
  createIcons: () => {
    console.log("Lucide icons created");
  },
};

function init() {
  lucide.createIcons();
  updateModal();
  showModal();
  startAnimationBtn.addEventListener("click", startAnimation);
  resetBtn.addEventListener("click", resetPresentation);
  finalResetBtn.addEventListener("click", resetPresentation);
  replayBtn.addEventListener("click", startAnimation);
}

function updateModal() {
  const scene = scenes[currentScene];
  modalTitle.textContent = scene.title;
  modalDescription.textContent = scene.description;
  modalSubtitle.textContent = scene.subtitle;
  buttonText.textContent = scene.buttonText;
  sceneCounter.textContent = `Sahne ${scene.id} / ${scenes.length}`;
}

function showModal() {
  presentationState = "modal";
  modal.classList.remove("hidden");
  sceneInfo.classList.add("hidden");
  replayBtnContainer.classList.add("hidden");
  subtitleArea.classList.add("hidden");
  completionScreen.classList.add("hidden");
  animationArea.innerHTML = "";
}

function hideModal() {
  modal.classList.add("hidden");
}

function startAnimation() {
  progress = 0;
  isPlaying = true;
  activeTooltip = null;
  presentationState = "animation";
  hideModal();
  showSceneInfo();
  showSubtitle();
  showReplayButton();
  renderScene();
  startAnimationLoop();
}

function showSceneInfo() {
  const scene = scenes[currentScene];
  sceneInfoText.textContent = `Sahne ${scene.id}: ${scene.title}`;
  sceneInfo.classList.remove("hidden");
}

function showSubtitle() {
  const scene = scenes[currentScene];
  subtitleText.textContent = scene.subtitle;
  subtitleArea.classList.remove("hidden");
}

function showReplayButton() {
  replayBtnContainer.classList.remove("hidden");
}

function startAnimationLoop() {
  if (animationInterval) {
    clearInterval(animationInterval);
  }

  animationInterval = setInterval(() => {
    if (isPlaying && presentationState === "animation") {
      progress += 0.1;
      const scene = scenes[currentScene];

      scene.tooltips?.forEach((tooltipData) => {
        const tooltipStart = tooltipData.time;
        const tooltipEnd = tooltipData.time + tooltipData.duration;

        if (progress >= tooltipStart && progress <= tooltipEnd) {
          showTooltip(tooltipData.text);
        } else if (
          progress > tooltipEnd &&
          activeTooltip === tooltipData.text
        ) {
          hideTooltip();
        }
      });

      updateSceneAnimation();

      if (progress >= scene.duration) {
        isPlaying = false;
        clearInterval(animationInterval);

        setTimeout(() => {
          if (currentScene < scenes.length - 1) {
            currentScene++;
            updateModal();
            showModal();
          } else {
            showCompletionScreen();
          }
        }, 1000);
      }
    }
  }, 100);
}

function showTooltip(text) {
  if (activeTooltip !== text) {
    activeTooltip = text;
    tooltipText.textContent = text;
    tooltip.classList.remove("hidden");
  }
}

function hideTooltip() {
  activeTooltip = null;
  tooltip.classList.add("hidden");
}

function showCompletionScreen() {
  presentationState = "completed";
  sceneInfo.classList.add("hidden");
  replayBtnContainer.classList.add("hidden");
  subtitleArea.classList.add("hidden");
  animationArea.innerHTML = "";
  completionScreen.classList.remove("hidden");
}

function resetPresentation() {
  currentScene = 0;
  progress = 0;
  isPlaying = false;
  activeTooltip = null;

  if (animationInterval) {
    clearInterval(animationInterval);
  }

  updateModal();
  showModal();
}

function renderScene() {
  const scene = scenes[currentScene];

  switch (scene.id) {
    case 1:
      renderScene1();
      break;
    case 2:
      renderScene2();
      break;
    case 3:
      renderScene3();
      break;
    case 4:
      renderScene4();
      break;
    case 5:
      renderScene5();
      break;
    case 6:
      renderScene6();
      break;
    case 7:
      renderScene7();
      break;
    default:
      animationArea.innerHTML = `
                <div class="scene-animation">
                    <div style="text-align: center; color: #374151;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Sahne ${scene.id}</h2>
                        <p>${scene.title}</p>
                    </div>
                </div>
            `;
  }
}

function updateSceneAnimation() {
  const scene = scenes[currentScene];
  const progressPercent = (progress / scene.duration) * 100;

  switch (scene.id) {
    case 1:
      updateScene1Animation(progressPercent);
      break;
    case 2:
      updateScene2Animation(progressPercent);
      break;
    case 3:
      updateScene3Animation(progressPercent);
      break;
    case 4:
      updateScene4Animation(progressPercent);
      break;
    case 5:
      updateScene5Animation(progressPercent);
      break;
    case 6:
      updateScene6Animation(progressPercent);
      break;
    case 7:
      updateScene7Animation(progressPercent);
      break;
  }
}

function renderScene1() {
  const icons = [
    { icon: "dollar-sign", label: "Finans", delay: 0 },
    { icon: "heart", label: "Sağlık", delay: 0.5 },
    { icon: "truck", label: "Lojistik", delay: 1 },
    { icon: "vote", label: "Oylama", delay: 1.5 },
    { icon: "music", label: "Müzik", delay: 2 },
    { icon: "palette", label: "Sanat", delay: 2.5 },
  ];

  animationArea.innerHTML = `
        <div class="scene1-container">
            <div class="globe-container" id="globe-container">
                <i data-lucide="globe" class="globe-icon"></i>
                <div class="pulse-rings" id="pulse-rings" style="opacity: 0;">
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring"></div>
                </div>
            </div>
            
            ${icons
              .map((item, index) => {
                const angle = index * 60 * (Math.PI / 180);
                const radius = 80;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return `
                    <div class="sector-icon" id="sector-${index}" style="left: calc(50% + ${x}px); top: calc(50% + ${y}px);">
                        <div class="sector-icon-container">
                            <i data-lucide="${item.icon}"></i>
                        </div>
                        <div class="sector-label">${item.label}</div>
                    </div>
                `;
              })
              .join("")}
            
            <div class="scene1-title" id="scene1-title" style="opacity: 0;">
                <h2>Blockchain: Birçok sektörü dönüştüren teknoloji</h2>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene1Animation(progressPercent) {
  const globeContainer = document.getElementById("globe-container");
  const pulseRings = document.getElementById("pulse-rings");
  const scene1Title = document.getElementById("scene1-title");

  if (progressPercent > 14) {
    globeContainer.style.transform = "scale(1.1)";
  }

  if (progressPercent > 28) {
    pulseRings.style.opacity = "1";

    const icons = [
      { delay: 0 },
      { delay: 0.5 },
      { delay: 1 },
      { delay: 1.5 },
      { delay: 2 },
      { delay: 2.5 },
    ];

    icons.forEach((item, index) => {
      const sectorIcon = document.getElementById(`sector-${index}`);
      if (sectorIcon && progressPercent > 28 + item.delay * 10) {
        sectorIcon.classList.add("visible");
      }
    });
  }

  if (progressPercent > 70) {
    scene1Title.style.opacity = "1";
  }
}

function renderScene2() {
  animationArea.innerHTML = `
        <div class="scene2-container">
            <div class="transfer-comparison">
                <div class="transfer-card traditional-transfer">
                    <h3 class="transfer-title">Geleneksel Transfer</h3>
                    <div class="transfer-flow">
                        <div class="transfer-endpoint">
                            <i data-lucide="dollar-sign"></i>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="traditional-progress" style="width: 0%"></div>
                        </div>
                        <div class="transfer-endpoint">
                            <i data-lucide="dollar-sign"></i>
                        </div>
                    </div>
                    <div class="transfer-status" id="traditional-status">Bekleniyor...</div>
                </div>
                
                <div class="transfer-card blockchain-transfer">
                    <h3 class="transfer-title">Blockchain Transferi</h3>
                    <div class="transfer-flow">
                        <div class="transfer-endpoint">
                            <i data-lucide="dollar-sign"></i>
                        </div>
                        <div class="progress-bar" style="position: relative;">
                            <div class="moving-coin" id="moving-coin" style="display: none;">
                                <i data-lucide="dollar-sign"></i>
                            </div>
                        </div>
                        <div class="transfer-endpoint">
                            <i data-lucide="dollar-sign"></i>
                        </div>
                    </div>
                    <div class="transfer-status" id="blockchain-status">Hazırlanıyor...</div>
                </div>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene2Animation(progressPercent) {
  const traditionalProgress = document.getElementById("traditional-progress");
  const traditionalStatus = document.getElementById("traditional-status");
  const movingCoin = document.getElementById("moving-coin");
  const blockchainStatus = document.getElementById("blockchain-status");

  if (progressPercent < 75) {
    traditionalProgress.style.width = `${Math.min(progressPercent * 0.6, 60)}%`;
    traditionalStatus.textContent =
      progressPercent > 50 && progressPercent < 75
        ? "Bekleniyor..."
        : "İşlem devam ediyor...";
  } else {
    traditionalProgress.style.width = "100%";
    traditionalStatus.innerHTML =
      '<div class="status-complete"><i data-lucide="check-circle"></i> Tamamlandı!</div>';
  }

  if (progressPercent > 33 && progressPercent < 50) {
    movingCoin.style.display = "block";
  } else {
    movingCoin.style.display = "none";
  }

  if (progressPercent > 50) {
    blockchainStatus.innerHTML =
      '<div class="status-complete"><i data-lucide="check-circle"></i> Tamamlandı!</div>';
  }

  lucide.createIcons();
}

function renderScene3() {
  animationArea.innerHTML = `
        <div class="scene3-container">
            <div class="health-card" id="health-card">
                <h3>Hasta Kartı</h3>
                <div class="health-info">
                    <p><strong>Ad:</strong> Ahmet Yılmaz</p>
                    <p><strong>Kan Grubu:</strong> A+</p>
                    <p><strong>Alerjiler:</strong> Penisilin</p>
                </div>
                
                <div class="lock-animation" id="lock-animation">
                    <i data-lucide="lock"></i>
                </div>
            </div>
            
            <div class="doctor-request" id="doctor-request">
                <div class="doctor-info">
                    <i data-lucide="heart"></i>
                    <span class="doctor-name">Dr. Mehmet</span>
                </div>
                <div class="access-request">Erişim isteği</div>
            </div>
            
            <button class="permission-button" id="permission-button">İzin Ver</button>
            
            <div class="data-flow" id="data-flow">
                <div class="data-dot"></div>
                <div class="data-dot"></div>
                <div class="data-dot"></div>
            </div>
            
            <div class="access-log" id="access-log">
                Erişim Block #1247'ye kaydedildi
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene3Animation(progressPercent) {
  const healthCard = document.getElementById("health-card");
  const lockAnimation = document.getElementById("lock-animation");
  const doctorRequest = document.getElementById("doctor-request");
  const permissionButton = document.getElementById("permission-button");
  const dataFlow = document.getElementById("data-flow");
  const accessLog = document.getElementById("access-log");

  if (progressPercent > 14) {
    healthCard.classList.add("visible");
  }

  if (progressPercent > 28) {
    lockAnimation.classList.add("visible");
  }

  if (progressPercent > 42) {
    doctorRequest.classList.add("visible");
  }

  if (progressPercent > 57) {
    permissionButton.classList.add("visible");
  }

  if (progressPercent > 71) {
    dataFlow.classList.add("visible");
  }

  if (progressPercent > 85) {
    accessLog.classList.add("visible");
  }
}

function renderScene4() {
  const stages = [
    { name: "Üretim", icon: "🏭", time: 12.5 },
    { name: "Depo", icon: "📦", time: 25 },
    { name: "Sevkiyat", icon: "🚚", time: 43.75 },
    { name: "Mağaza", icon: "🏪", time: 62.5 },
    { name: "Müşteri", icon: "👤", time: 81.25 },
  ];

  animationArea.innerHTML = `
        <div class="scene4-container">
            <div class="supply-chain">
                ${stages
                  .map((stage, index) => {
                    return `
                        <div class="supply-stage">
                            <div class="stage-icon" id="stage-icon-${index}">${
                      stage.icon
                    }</div>
                            <div class="stage-name">${stage.name}</div>
                            <div class="blockchain-block" id="blockchain-block-${index}">
                                <div class="block-title">${
                                  stage.name
                                } Aşaması</div>
                                <div class="block-id">Block #${
                                  1000 + index
                                }</div>
                            </div>
                            ${
                              index < stages.length - 1
                                ? `<div class="connection-arrow" id="arrow-${index}" style="left: calc(100% + 0.5rem);"><i data-lucide="arrow-right"></i></div>`
                                : ""
                            }
                        </div>
                    `;
                  })
                  .join("")}
            </div>
            
            <div class="chain-overview" id="chain-overview">
                <div class="chain-title">Tam Şeffaflık</div>
                <div class="chain-description">Tüm aşamalar blockchain'de kayıtlı ve doğrulanabilir</div>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene4Animation(progressPercent) {
  const stages = [
    { time: 12.5 },
    { time: 25 },
    { time: 43.75 },
    { time: 62.5 },
    { time: 81.25 },
  ];

  stages.forEach((stage, index) => {
    const stageIcon = document.getElementById(`stage-icon-${index}`);
    const blockchainBlock = document.getElementById(
      `blockchain-block-${index}`
    );
    const arrow = document.getElementById(`arrow-${index}`);

    if (progressPercent > stage.time) {
      if (stageIcon) stageIcon.classList.add("visible");
      if (blockchainBlock) blockchainBlock.classList.add("visible");
      if (arrow) arrow.classList.add("visible");
    }
  });

  if (progressPercent > 81.25) {
    const chainOverview = document.getElementById("chain-overview");
    if (chainOverview) chainOverview.classList.add("visible");
  }
}

function renderScene5() {
  animationArea.innerHTML = `
        <div class="scene5-container">
            <div class="ballot-box" id="ballot-box">
                <i data-lucide="vote" class="ballot-icon"></i>
                <div class="ballot-title">Dijital Oy Sandığı</div>
            </div>
            
            <div class="digital-votes" id="digital-votes" style="display: none;">
                <div class="vote-particle"></div>
                <div class="vote-particle"></div>
                <div class="vote-particle"></div>
            </div>
            
            <div class="blockchain-blocks" id="blockchain-blocks">
                ${[1, 2, 3, 4]
                  .map(
                    (i) => `
                    <div class="vote-block" id="vote-block-${i}">
                        <div class="vote-block-title">Block ${i}</div>
                        <div class="vote-block-subtitle">Oylar</div>
                        <i data-lucide="lock"></i>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="global-verification" id="global-verification">
                <div class="verification-node">
                    <div class="verification-icon">
                        <i data-lucide="check-circle"></i>
                    </div>
                    <div class="verification-label">ABD</div>
                </div>
                <div class="verification-node">
                    <div class="verification-icon">
                        <i data-lucide="check-circle"></i>
                    </div>
                    <div class="verification-label">Avrupa</div>
                </div>
                <div class="verification-node">
                    <div class="verification-icon">
                        <i data-lucide="check-circle"></i>
                    </div>
                    <div class="verification-label">Asya</div>
                </div>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene5Animation(progressPercent) {
  const ballotBox = document.getElementById("ballot-box");
  const digitalVotes = document.getElementById("digital-votes");
  const globalVerification = document.getElementById("global-verification");

  if (progressPercent > 16) {
    if (ballotBox) ballotBox.classList.add("visible");
  }

  if (progressPercent > 16 && progressPercent < 41) {
    if (digitalVotes) digitalVotes.style.display = "block";
  } else {
    if (digitalVotes) digitalVotes.style.display = "none";
  }

  if (progressPercent > 41) {
    [1, 2, 3, 4].forEach((i) => {
      const voteBlock = document.getElementById(`vote-block-${i}`);
      if (voteBlock && progressPercent > 41 + i * 5) {
        voteBlock.classList.add("visible");
      }
    });
  }

  if (progressPercent > 66) {
    if (globalVerification) globalVerification.classList.add("visible");
  }
}

function renderScene6() {
  animationArea.innerHTML = `
        <div class="scene6-container">
            <div class="artwork-card" id="artwork-card">
                <div class="artwork-image">
                    <i data-lucide="palette"></i>
                </div>
                <div class="artwork-title">Dijital Sanat Eseri</div>
                
                <div class="nft-certificate" id="nft-certificate">
                    <div class="nft-text">NFT</div>
                </div>
                
                <div class="original-highlight" id="original-highlight"></div>
            </div>
            
            <div class="ownership-verification" id="ownership-verification">
                ✓ Sahiplik Doğrulandı
            </div>
            
            <div class="fake-copies">
                <div class="fake-copy" id="fake-copy-1">
                    <div class="fake-artwork">
                        <i data-lucide="palette"></i>
                    </div>
                    <div class="fake-label">Kopya 1</div>
                    <div class="invalid-stamp">
                        <div class="invalid-text">GEÇERSİZ</div>
                    </div>
                </div>
                <div class="fake-copy" id="fake-copy-2">
                    <div class="fake-artwork">
                        <i data-lucide="palette"></i>
                    </div>
                    <div class="fake-label">Kopya 2</div>
                    <div class="invalid-stamp">
                        <div class="invalid-text">GEÇERSİZ</div>
                    </div>
                </div>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene6Animation(progressPercent) {
  const artworkCard = document.getElementById("artwork-card");
  const nftCertificate = document.getElementById("nft-certificate");
  const ownershipVerification = document.getElementById(
    "ownership-verification"
  );
  const fakeCopy1 = document.getElementById("fake-copy-1");
  const fakeCopy2 = document.getElementById("fake-copy-2");
  const originalHighlight = document.getElementById("original-highlight");

  if (progressPercent > 16) {
    if (artworkCard) artworkCard.classList.add("visible");
  }

  if (progressPercent > 33) {
    if (nftCertificate) nftCertificate.classList.add("visible");
  }

  if (progressPercent > 58) {
    if (ownershipVerification) ownershipVerification.classList.add("visible");
  }

  if (progressPercent > 75) {
    if (fakeCopy1) fakeCopy1.classList.add("visible");
  }

  if (progressPercent > 80) {
    if (fakeCopy2) fakeCopy2.classList.add("visible");
  }

  if (progressPercent > 83) {
    if (originalHighlight) originalHighlight.classList.add("visible");
  }
}

function renderScene7() {
  const sectorIcons = [
    { icon: "dollar-sign", label: "Finans" },
    { icon: "heart", label: "Sağlık" },
    { icon: "truck", label: "Lojistik" },
    { icon: "vote", label: "Oylama" },
    { icon: "palette", label: "Sanat" },
  ];

  animationArea.innerHTML = `
        <div class="scene7-container">
            <div class="sector-summary" id="sector-summary">
                ${sectorIcons
                  .map(
                    (item, index) => `
                    <div class="sector-summary-item">
                        <div class="sector-summary-icon" id="sector-icon-${index}">
                            <i data-lucide="${item.icon}"></i>
                        </div>
                        <div class="sector-summary-label">${item.label}</div>
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            <div class="blockchain-title" id="blockchain-title">
                <h1>BLOCKCHAIN</h1>
                <div class="title-dots">
                    <div class="title-dot"></div>
                    <div class="title-dot"></div>
                    <div class="title-dot"></div>
                    <div class="title-dot"></div>
                    <div class="title-dot"></div>
                </div>
            </div>
            
            <div class="final-message" id="final-message">
                <h2>Güvenin Dijital Çağı</h2>
                <p>Blockchain ile geleceği inşa ediyoruz</p>
            </div>
        </div>
    `;

  lucide.createIcons();
}

function updateScene7Animation(progressPercent) {
  const sectorSummary = document.getElementById("sector-summary");
  const blockchainTitle = document.getElementById("blockchain-title");
  const finalMessage = document.getElementById("final-message");

  if (progressPercent > 30) {
    if (sectorSummary) sectorSummary.classList.add("visible");

    for (let i = 0; i < 5; i++) {
      const sectorIcon = document.getElementById(`sector-icon-${i}`);
      if (sectorIcon && progressPercent > 30 + i * 5) {
        sectorIcon.classList.add("visible");
      }
    }
  }

  if (progressPercent > 60) {
    if (blockchainTitle) blockchainTitle.classList.add("visible");
  }

  if (progressPercent > 70) {
    if (finalMessage) finalMessage.classList.add("visible");
  }
}

document.addEventListener("DOMContentLoaded", init);
