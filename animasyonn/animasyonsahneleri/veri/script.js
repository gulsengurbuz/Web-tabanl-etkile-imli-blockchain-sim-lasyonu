const scenes = [
  {
    id: 0,
    title: "Veri Nedir?",
    subtitle: "Olayların kaydedilebilir temsili",
    duration: 5000,
    content:
      "Veri; sayı, metin, görüntü ve sinyallerin bir olayı temsil eden kayıtlarıdır.",
  },
  {
    id: 1,
    title: "Kaynaklar Akışı",
    subtitle: "İnsanlar, cihazlar ve uygulamalardan",
    duration: 6000,
    content: "Veri çeşitli kaynaklardan sürekli akış hâlindedir.",
  },
  {
    id: 2,
    title: "Ham → Düzenli",
    subtitle: "Düzenlenince anlam kazanır",
    duration: 8000,
    content:
      "Toplanan ham veriler temizlenip düzenlenince yorumlanabilir olur.",
  },
  {
    id: 3,
    title: "Yapı Türleri",
    subtitle: "Yapılı • Yapısız • Yarı yapılı",
    duration: 7000,
    content:
      "Tablolar yapılı; belgeler, görseller çoğunlukla yapısız; JSON/CSV gibi formatlar yarı yapılıdır.",
  },
  {
    id: 4,
    title: "Veri Kalitesi",
    subtitle: "Doğru • Tam • Tutarlı • Zamanında",
    duration: 8000,
    content: "Kaliteli veri hatasız, eksiksiz, birbiriyle uyumlu ve günceldir.",
  },
  {
    id: 5,
    title: "Kayıt Anı",
    subtitle: "Zaman damgası & Kaynak",
    duration: 7000,
    content: "Zaman ve kaynağı not etmek izlenebilirlik sağlar.",
  },
  {
    id: 6,
    title: "Saklama Seçenekleri",
    subtitle: "Dosya • Veritabanı • Bulut",
    duration: 6000,
    content: "İhtiyaca göre dosya, ilişkisel/noSQL veya bulut tercih edilir.",
  },
  {
    id: 7,
    title: "Gizlilik & Güvenlik",
    subtitle: "Kişisel veriler korunur",
    duration: 6000,
    content: "Anonimleştir, erişimi yetkilendir, veriyi/iletişimi şifrele.",
  },
  {
    id: 8,
    title: "Dönüşüm → Görselleştirme",
    subtitle: "İşlenen veri → içgörü",
    duration: 7000,
    content:
      "Dönüştürülen veriler görselleştirilir; kararlar veriyle desteklenir.",
  },
];

// Application state
let currentScene = 0;
let isPlaying = false;
let progress = 0;
let sceneProgress = 0;
let animationInterval = null;

// DOM elements
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const playText = document.getElementById("playText");
const resetBtn = document.getElementById("resetBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const sceneTitle = document.getElementById("sceneTitle");
const sceneSubtitle = document.getElementById("sceneSubtitle");
const sceneDescription = document.getElementById("sceneDescription");
const sceneContent = document.getElementById("sceneContent");
const sceneButtons = document.getElementById("sceneButtons");
const finalActions = document.getElementById("finalActions");
const replayBtn = document.getElementById("replayBtn");

const lucide = {
  createIcons: () => {
    console.log("Lucide icons created");
  },
};

function initializeLucideIcons() {
  if (typeof lucide !== "undefined" && lucide.createIcons) {
    lucide.createIcons();
  } else if (
    typeof window.lucide !== "undefined" &&
    window.lucide.createIcons
  ) {
    window.lucide.createIcons();
  }
}

function init() {
  createSceneButtons();
  updateScene();
  setupEventListeners();
  initializeLucideIcons();
}

function createSceneButtons() {
  sceneButtons.innerHTML = "";
  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.className = `scene-btn ${index === currentScene ? "active" : ""}`;
    button.textContent = `S${index}`;
    button.addEventListener("click", () => handleSceneSelect(index));
    sceneButtons.appendChild(button);
  });
}

function setupEventListeners() {
  playPauseBtn.addEventListener("click", handlePlayPause);
  resetBtn.addEventListener("click", handleReset);
  replayBtn.addEventListener("click", handleReset);
}

function handlePlayPause() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
    playText.textContent = "Duraklat";
    startAnimation();
  } else {
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
    playText.textContent = "Oynat";
    stopAnimation();
  }
}

function handleReset() {
  currentScene = 0;
  progress = 0;
  sceneProgress = 0;
  isPlaying = false;

  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  playText.textContent = "Oynat";

  stopAnimation();
  updateScene();
  updateProgress();
  createSceneButtons();
  finalActions.style.display = "none";
}

function handleSceneSelect(sceneIndex) {
  currentScene = sceneIndex;
  progress = (sceneIndex / scenes.length) * 100;
  sceneProgress = 0;
  isPlaying = false;

  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
  playText.textContent = "Oynat";

  stopAnimation();
  updateScene();
  updateProgress();
  createSceneButtons();
}

function startAnimation() {
  if (currentScene >= scenes.length) return;

  animationInterval = setInterval(() => {
    sceneProgress += 100 / (scenes[currentScene].duration / 100);

    if (sceneProgress >= 100) {
      if (currentScene < scenes.length - 1) {
        currentScene++;
        progress += 100 / scenes.length;
        sceneProgress = 0;
        updateScene();
        createSceneButtons();
      } else {
        isPlaying = false;
        sceneProgress = 100;
        playIcon.style.display = "inline";
        pauseIcon.style.display = "none";
        playText.textContent = "Oynat";
        finalActions.style.display = "flex";
        stopAnimation();
      }
    }

    updateProgress();
  }, 100);
}

function stopAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
  }
}

function updateProgress() {
  const totalProgress = progress + sceneProgress / scenes.length;
  progressFill.style.width = `${totalProgress}%`;
  progressText.textContent = `${Math.round(totalProgress)}%`;
}

function updateScene() {
  const scene = scenes[currentScene];
  sceneTitle.textContent = scene.title;
  sceneSubtitle.textContent = scene.subtitle;
  sceneDescription.textContent = scene.content;

  renderSceneContent();

  if (currentScene === scenes.length - 1) {
    finalActions.style.display = "flex";
  } else {
    finalActions.style.display = "none";
  }
}

function renderSceneContent() {
  const scene = scenes[currentScene];

  switch (currentScene) {
    case 0:
      sceneContent.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 32px;">
                    <div style="position: relative;">
                        <div style="font-size: 96px; font-weight: 700; color: #0ea5e9;" class="animate-pulse-glow">VERİ</div>
                        <div class="animate-float bg-accent" style="position: absolute; top: -16px; left: -16px; width: 16px; height: 16px; border-radius: 50%; animation-delay: 0s;"></div>
                        <div class="animate-float bg-secondary" style="position: absolute; top: -8px; right: -24px; width: 12px; height: 12px; border-radius: 50%; animation-delay: 0.5s;"></div>
                        <div class="animate-float bg-primary" style="position: absolute; bottom: -12px; left: -8px; width: 8px; height: 8px; border-radius: 50%; animation-delay: 1s;"></div>
                        <div class="animate-float bg-accent" style="position: absolute; bottom: -16px; right: -16px; width: 12px; height: 12px; border-radius: 50%; animation-delay: 1.5s;"></div>
                    </div>
                </div>
            `;
      break;

    case 1:
      sceneContent.innerHTML = `
                <div class="grid-2">
                    <div class="data-sources">
                        <div class="data-source-item animate-slide-in-left" style="animation-delay: 0s;">
                            <i data-lucide="keyboard" style="width: 32px; height: 32px; color: #0ea5e9;"></i>
                            <span>Klavye Girişi</span>
                        </div>
                        <div class="data-source-item animate-slide-in-left" style="animation-delay: 0.2s;">
                            <i data-lucide="zap" style="width: 32px; height: 32px; color: #10b981;"></i>
                            <span>Sensör Verileri</span>
                        </div>
                        <div class="data-source-item animate-slide-in-left" style="animation-delay: 0.4s;">
                            <i data-lucide="camera" style="width: 32px; height: 32px; color: #8b5cf6;"></i>
                            <span>Görüntü Kaydı</span>
                        </div>
                        <div class="data-source-item animate-slide-in-left" style="animation-delay: 0.6s;">
                            <i data-lucide="file-text" style="width: 32px; height: 32px; color: #0ea5e9;"></i>
                            <span>Uygulama Logları</span>
                        </div>
                    </div>
                    <div class="data-center">
                        <div class="bg-primary-light animate-pulse-glow" style="width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                            <i data-lucide="database" style="width: 32px; height: 32px; color: #0ea5e9;"></i>
                        </div>
                        <div class="data-flow-dots">
                            <div class="data-dot bg-accent animate-data-flow" style="animation-delay: 0s;"></div>
                            <div class="data-dot bg-secondary animate-data-flow" style="animation-delay: 0.3s;"></div>
                            <div class="data-dot bg-primary animate-data-flow" style="animation-delay: 0.6s;"></div>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 2:
      sceneContent.innerHTML = `
                <div class="grid-2">
                    <div class="card animate-slide-in-left">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #64748b;">Ham Veri</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                            <div style="background-color: rgba(100, 116, 139, 0.1); padding: 8px; border-radius: 4px;">john@email.com, 25, İstanbul</div>
                            <div style="background-color: rgba(100, 116, 139, 0.1); padding: 8px; border-radius: 4px;">sarah.doe@mail.com, 30, Ankara</div>
                            <div style="background-color: rgba(100, 116, 139, 0.1); padding: 8px; border-radius: 4px;">mehmet123@test.com, 28, İzmir</div>
                        </div>
                    </div>
                    <div class="card animate-slide-in-right">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px; color: #0ea5e9;">Düzenli Veri</h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Yaş</th>
                                    <th>Şehir</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>john@email.com</td>
                                    <td>25</td>
                                    <td>İstanbul</td>
                                </tr>
                                <tr>
                                    <td>sarah.doe@mail.com</td>
                                    <td>30</td>
                                    <td>Ankara</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
      break;

    case 3:
      sceneContent.innerHTML = `
                <div class="grid-3">
                    <div class="card animate-scale-bounce" style="animation-delay: 0s;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #0ea5e9;">Yapılı</h3>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; font-size: 12px;">
                            <div style="background-color: rgba(14, 165, 233, 0.2); padding: 4px; border-radius: 2px;">ID</div>
                            <div style="background-color: rgba(14, 165, 233, 0.2); padding: 4px; border-radius: 2px;">Ad</div>
                            <div style="background-color: #f1f5f9; padding: 4px; border-radius: 2px;">1</div>
                            <div style="background-color: #f1f5f9; padding: 4px; border-radius: 2px;">Ali</div>
                            <div style="background-color: #f1f5f9; padding: 4px; border-radius: 2px;">2</div>
                            <div style="background-color: #f1f5f9; padding: 4px; border-radius: 2px;">Ayşe</div>
                        </div>
                    </div>
                    <div class="card animate-scale-bounce" style="animation-delay: 0.2s;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #10b981;">Yapısız</h3>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
                            <div style="background-color: rgba(100, 116, 139, 0.1); padding: 8px; border-radius: 4px;">"Bugün hava çok güzel. Parkta yürüyüş yaptım..."</div>
                            <div style="width: 100%; height: 32px; background-color: rgba(139, 92, 246, 0.2); border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                                <i data-lucide="camera" style="width: 16px; height: 16px; color: #8b5cf6;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="card animate-scale-bounce" style="animation-delay: 0.4s;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 12px; color: #8b5cf6;">Yarı Yapılı</h3>
                        <div style="font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.4;">
                            <div style="color: #64748b;">{</div>
                            <div style="margin-left: 8px;">"ad": "Mehmet",</div>
                            <div style="margin-left: 8px;">"yaş": 25,</div>
                            <div style="margin-left: 8px;">"şehir": "İstanbul"</div>
                            <div style="color: #64748b;">}</div>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 4:
      sceneContent.innerHTML = `
                <div class="grid-2">
                    <div class="quality-metrics">
                        <div class="quality-item animate-slide-in-left" style="animation-delay: 0s;">
                            <i data-lucide="check-circle" style="width: 24px; height: 24px; color: #10b981;"></i>
                            <span>Doğruluk</span>
                        </div>
                        <div class="quality-item animate-slide-in-left" style="animation-delay: 0.2s;">
                            <i data-lucide="check-circle" style="width: 24px; height: 24px; color: #10b981;"></i>
                            <span>Tamlık</span>
                        </div>
                        <div class="quality-item animate-slide-in-left" style="animation-delay: 0.4s;">
                            <i data-lucide="check-circle" style="width: 24px; height: 24px; color: #10b981;"></i>
                            <span>Tutarlılık</span>
                        </div>
                        <div class="quality-item animate-slide-in-left" style="animation-delay: 0.6s;">
                            <i data-lucide="check-circle" style="width: 24px; height: 24px; color: #10b981;"></i>
                            <span>Zamanlılık</span>
                        </div>
                    </div>
                    <div class="card animate-slide-in-right">
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; justify-between; align-items: center;">
                                <span style="font-size: 14px;">Veri Kalitesi</span>
                                <span style="font-size: 14px; font-weight: 600; color: #10b981;">%95</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: 95%; background-color: #10b981;"></div>
                            </div>
                            <div style="font-size: 12px; color: #64748b;">Yüksek kalite: Güvenilir analiz için hazır</div>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 5:
      sceneContent.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; gap: 32px; width: 100%;">
                    <div class="card animate-scale-bounce" style="width: 100%; max-width: 384px;">
                        <h3 style="font-size: 18px; font-weight: 600; margin-bottom: 16px;">Sensör Verisi</h3>
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; justify-between;">
                                <span>Sıcaklık:</span>
                                <span style="font-family: 'Courier New', monospace; color: #0ea5e9;">23.5°C</span>
                            </div>
                            <button class="btn btn-primary" style="width: 100%;">Kaydet</button>
                        </div>
                    </div>
                    <div style="width: 100%; max-width: 768px;" class="animate-slide-in-right">
                        <h4 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #64748b;">Kayıt Defteri</h4>
                        <div class="card" style="padding: 0; overflow: hidden;">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>Zaman</th>
                                        <th>Kaynak</th>
                                        <th>Değer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="background-color: rgba(16, 185, 129, 0.1);">
                                        <td style="font-family: 'Courier New', monospace;">2024-01-15 14:30:25</td>
                                        <td>Sensör-001</td>
                                        <td style="font-family: 'Courier New', monospace;">23.5°C</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 6:
      sceneContent.innerHTML = `
                <div class="grid-3">
                    <div class="storage-options animate-scale-bounce" style="animation-delay: 0s;">
                        <div class="storage-icon bg-primary-light">
                            <i data-lucide="file-text" style="width: 32px; height: 32px; color: #0ea5e9;"></i>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-weight: 600;">Dosya</h3>
                            <p style="font-size: 14px; color: #64748b;">Basit erişim</p>
                        </div>
                    </div>
                    <div class="storage-options animate-scale-bounce" style="animation-delay: 0.2s;">
                        <div class="storage-icon bg-accent-light">
                            <i data-lucide="database" style="width: 32px; height: 32px; color: #10b981;"></i>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-weight: 600;">Veritabanı</h3>
                            <p style="font-size: 14px; color: #64748b;">Hızlı sorgular</p>
                        </div>
                    </div>
                    <div class="storage-options animate-scale-bounce" style="animation-delay: 0.4s;">
                        <div class="storage-icon bg-secondary-light">
                            <i data-lucide="cloud" style="width: 32px; height: 32px; color: #8b5cf6;"></i>
                        </div>
                        <div style="text-align: center;">
                            <h3 style="font-weight: 600;">Bulut</h3>
                            <p style="font-size: 14px; color: #64748b;">Ölçeklenebilir</p>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 7:
      sceneContent.innerHTML = `
                <div class="privacy-demo">
                    <div class="card animate-scale-bounce" style="width: 100%; max-width: 384px;">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                            <i data-lucide="lock" style="width: 24px; height: 24px; color: #0ea5e9;"></i>
                            <h3 style="font-size: 18px; font-weight: 600;">Kişisel Veri</h3>
                        </div>
                        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 14px;">
                            <div style="display: flex; justify-between;">
                                <span>Ad:</span>
                                <span style="font-family: 'Courier New', monospace;">⋯⋯⋯⋯⋯</span>
                            </div>
                            <div style="display: flex; justify-between;">
                                <span>Email:</span>
                                <span style="font-family: 'Courier New', monospace;">⋯⋯⋯@⋯⋯⋯.com</span>
                            </div>
                            <div style="display: flex; justify-between;">
                                <span>Telefon:</span>
                                <span style="font-family: 'Courier New', monospace;">⋯⋯⋯ ⋯⋯⋯ ⋯⋯⋯⋯</span>
                            </div>
                        </div>
                    </div>
                    <div class="privacy-methods">
                        <div class="privacy-method animate-slide-in-left" style="animation-delay: 0.2s;">
                            <i data-lucide="eye-off" style="width: 32px; height: 32px; color: #10b981;"></i>
                            <span style="font-size: 14px;">Anonimleştir</span>
                        </div>
                        <div class="privacy-method animate-slide-in-left" style="animation-delay: 0.4s;">
                            <i data-lucide="shield" style="width: 32px; height: 32px; color: #0ea5e9;"></i>
                            <span style="font-size: 14px;">Yetkilendir</span>
                        </div>
                        <div class="privacy-method animate-slide-in-left" style="animation-delay: 0.6s;">
                            <i data-lucide="lock" style="width: 32px; height: 32px; color: #8b5cf6;"></i>
                            <span style="font-size: 14px;">Şifrele</span>
                        </div>
                    </div>
                </div>
            `;
      break;

    case 8:
      sceneContent.innerHTML = `
                <div class="grid-2">
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; align-items: center; gap: 12px;" class="animate-slide-in-left" style="animation-delay: 0s;">
                            <div style="width: 12px; height: 12px; background-color: #0ea5e9; border-radius: 50%;"></div>
                            <span>Temizle</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;" class="animate-slide-in-left" style="animation-delay: 0.2s;">
                            <div style="width: 12px; height: 12px; background-color: #10b981; border-radius: 50%;"></div>
                            <span>Birleştir</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;" class="animate-slide-in-left" style="animation-delay: 0.4s;">
                            <div style="width: 12px; height: 12px; background-color: #8b5cf6; border-radius: 50%;"></div>
                            <span>Özetle</span>
                        </div>
                    </div>
                    <div class="card animate-slide-in-right">
                        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                            <i data-lucide="bar-chart-3" style="width: 24px; height: 24px; color: #0ea5e9;"></i>
                            <h3 style="font-weight: 600;">Görselleştirme</h3>
                        </div>
                        <div class="visualization-demo">
                            <div class="chart-bar">
                                <div class="bar bg-primary" style="width: 128px;"></div>
                                <span style="font-size: 14px;">85%</span>
                            </div>
                            <div class="chart-bar">
                                <div class="bar bg-accent" style="width: 96px;"></div>
                                <span style="font-size: 14px;">65%</span>
                            </div>
                            <div class="chart-bar">
                                <div class="bar bg-secondary" style="width: 160px;"></div>
                                <span style="font-size: 14px;">95%</span>
                            </div>
                            <div class="insight">
                                <i data-lucide="trending-up" style="width: 16px; height: 16px;"></i>
                                <span>İçgörü: Artış trendi</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      break;
  }

  setTimeout(() => {
    initializeLucideIcons();
  }, 100);
}

document.addEventListener("DOMContentLoaded", init);
