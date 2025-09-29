const scenes = [
  {
    id: 1,
    title: "İşlem Kutusu: İçinde Ne Var?",
    description:
      "Bir işlem, düzenli bir kutu gibidir: Sürüm, Girişler, Çıkışlar ve Zaman alanları birlikte çalışır. Girişler, eski paraları (UTXO) işaret eder; çıkışlar, paranın yeni adreslere gidişini anlatır. Zaman, 'ne zaman' geçerli olacağını söyler. Bu parçalar doğru biçimde yerleştiğinde ağ işlemi kolayca anlar.",
    duration: 3600,
  },
  {
    id: 2,
    title: "İmza Doğru mu?",
    description:
      "İşlemin gerçekten senden geldiğini anlamak için imza kullanılır. İmza, gizli anahtar ile oluşturulur; herkes bunu açık anahtar ile kontrol edebilir. Eşleşirse işlem senindir; eşleşmezse ağ reddeder. Böylece kandırmaca önlenir.",
    duration: 3200,
  },
  {
    id: 3,
    title: "Bir Para: Bir Kez! (Çifte Harcama)",
    description:
      "Bir para yalnızca bir kez harcanabilir. Aynı parayı iki kere göndermeye çalışmak, defteri bozar. Ağ, hangi işlemin önce geldiğini bilir ve ikinci denemeyi reddeder. Böylece herkesin hesabı adil kalır.",
    duration: 3400,
  },
  {
    id: 4,
    title: "Küçük Kurallar Geçidi (Script)",
    description:
      "Bazı işlemler küçük kapılardan geçer: KİLİT doğru mu, ANAHTAR uygun mu, KONTROL başarılı mı? Bazen bir zaman kilidi de olur; daha erkense bekleriz. Bütün adımlar sırasıyla 'tamam' olunca işlem güvenle ilerler.",
    duration: 4000,
  },
  {
    id: 5,
    title: "Ücret ve Boyut Dengesi",
    description:
      "Ağ yoğunken işlemler, yeterli ücret verirse daha hızlı işlenir. İşlemin boyutu da makul olmalıdır. Ücret çok düşükse sırada bekler; uygun ücrete ve boyuta gelince kapılar hızla açılır.",
    duration: 3200,
  },
  {
    id: 6,
    title: "Mempool Kapısı: İçeri Gir!",
    description:
      "Geçerli işlemler önce mempool denilen bekleme alanına girer. Kurallara uymayanlar kapıda geri döner. Mempool, blok yapılmadan önce işlemlerin toplandığı güvenli antre gibi çalışır.",
    duration: 2400,
  },
  {
    id: 7,
    title: "Blok Hazırlığı + Büyük Özet (Merkle)",
    description:
      "Seçilen işlemler blok içine dizilir. Her birinin özet değeri (hash) vardır; özetler ikili gruplar halinde birleşir ve en üstte Merkle kökü oluşur. Bu kök, 'Bu blokta neler var?' sorusunun güvenli kısa cevabıdır.",
    duration: 5000,
  },
  {
    id: 8,
    title: "Blok Başlığı: Her Satır Kontrol",
    description:
      "Önceki Blok özeti zincire bağlanır, Merkle Kökü sahne 7'dekiyle aynı olmalıdır, Zaman mantıklı aralıkta kalmalıdır ve Konsensüs İspatı (PoW/PoS) doğrulanmalıdır. Hepsi uyumluysa sıradaki adıma geçilir.",
    duration: 4000,
  },
  {
    id: 9,
    title: "Blok İçinde Tek Tek Kontrol",
    description:
      "Bloğun içindeki her işlem, biçim, imza, kurallar ve ücret açısından son kez denetlenir. Bir sorun yakalanırsa blok düzeltilir ya da reddedilir; her şey doğruysa blok 'tamam' alır.",
    duration: 3200,
  },
  {
    id: 10,
    title: "Zincire Eklenme Anı",
    description:
      "Kuralları geçen blok, zincirin ucuna eklenir. Bu, defterin resmen güncellenmesidir. Zincirin yüksekliği bir artar ve herkes yeni sayfayı görür.",
    duration: 3600,
  },
  {
    id: 11,
    title: "Herkese Haber Uçur! (Yayılım)",
    description:
      "Yeni blok, düğümler arasında hızla paylaşılır. Her düğüm komşularına haber yollar; kısa sürede herkes aynı veriye ulaşır ve ağ tek bir doğru üzerinde birleşir.",
    duration: 4000,
  },
  {
    id: 12,
    title: "Kısa Çatal ve Kazanan Yol (Opsiyonel)",
    description:
      "Bazen aynı anda iki uç oluşur. Sonraki bloklar geldikçe dallardan biri daha uzun/ağır hale gelir. Ağ, bu en güçlü dalı 'doğru yol' olarak seçer ve hep birlikte o yolda devam eder.",
    duration: 3400,
  },
];

let currentScene = 0;
let isPlaying = false;
let progress = 0;
let soundEnabled = true;
let animationId = null;
let audioContext = null;
let soundPlayed = {};
const webkitAudioContext = window.webkitAudioContext;

const elements = {
  currentSceneSpan: document.getElementById("current-scene"),
  totalScenesSpan: document.getElementById("total-scenes"),
  sceneTitle: document.getElementById("scene-title"),
  sceneDescription: document.getElementById("scene-description"),
  sceneContent: document.getElementById("scene-content"),
  progressFill: document.getElementById("progress-fill"),
  currentTime: document.getElementById("current-time"),
  totalTime: document.getElementById("total-time"),
  prevBtn: document.getElementById("prev-btn"),
  nextBtn: document.getElementById("next-btn"),
  soundBtn: document.getElementById("sound-btn"),
  resetBtn: document.getElementById("reset-btn"),
  playBtn: document.getElementById("play-btn"),
  sceneGrid: document.getElementById("scene-grid"),
};

function init() {
  if (
    typeof AudioContext !== "undefined" ||
    typeof webkitAudioContext !== "undefined"
  ) {
    audioContext = new (AudioContext || webkitAudioContext)();
  }

  elements.totalScenesSpan.textContent = scenes.length;

  generateSceneNavigation();

  updateScene();

  addEventListeners();
}

function generateSceneNavigation() {
  elements.sceneGrid.innerHTML = "";

  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.className = `btn btn-outline scene-btn ${
      index === currentScene ? "active" : ""
    }`;
    button.innerHTML = `
            <div class="scene-number">Sahne ${scene.id}</div>
            <div class="scene-title">${scene.title}</div>
        `;
    button.addEventListener("click", () => {
      currentScene = index;
      progress = 0;
      isPlaying = false;
      updateScene();
      updatePlayButton();
    });
    elements.sceneGrid.appendChild(button);
  });
}

function addEventListeners() {
  elements.prevBtn.addEventListener("click", () => {
    if (currentScene > 0) {
      currentScene--;
      progress = 0;
      isPlaying = false;
      updateScene();
      updatePlayButton();
    }
  });

  elements.nextBtn.addEventListener("click", () => {
    if (currentScene < scenes.length - 1) {
      currentScene++;
      progress = 0;
      isPlaying = false;
      updateScene();
      updatePlayButton();
    }
  });

  elements.soundBtn.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    elements.soundBtn.style.color = soundEnabled ? "#2563eb" : "#9ca3af";
  });

  elements.resetBtn.addEventListener("click", () => {
    isPlaying = false;
    progress = 0;
    soundPlayed = {};
    updateProgress();
    updatePlayButton();
    renderScene();
  });

  elements.playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startAnimation();
    } else {
      stopAnimation();
    }
    updatePlayButton();
  });
}

function updateScene() {
  const scene = scenes[currentScene];

  elements.currentSceneSpan.textContent = currentScene + 1;
  elements.sceneTitle.textContent = scene.title;
  elements.sceneDescription.textContent = scene.description;
  elements.totalTime.textContent = Math.round(scene.duration / 1000) + "s";

  elements.prevBtn.disabled = currentScene === 0;
  elements.nextBtn.disabled = currentScene === scenes.length - 1;

  document.querySelectorAll(".scene-btn").forEach((btn, index) => {
    btn.classList.toggle("active", index === currentScene);
  });

  progress = 0;
  soundPlayed = {};
  updateProgress();
  renderScene();
}

function startAnimation() {
  const startTime = Date.now() - progress;

  function animate() {
    if (!isPlaying) return;

    const elapsed = Date.now() - startTime;
    progress = Math.min(elapsed, scenes[currentScene].duration);

    updateProgress();
    renderScene();

    if (progress < scenes[currentScene].duration) {
      animationId = requestAnimationFrame(animate);
    } else {
      isPlaying = false;
      updatePlayButton();
    }
  }

  animationId = requestAnimationFrame(animate);
}

function stopAnimation() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
}

function updateProgress() {
  const progressPercent = (progress / scenes[currentScene].duration) * 100;
  elements.progressFill.style.width = progressPercent + "%";
  elements.currentTime.textContent = Math.round(progress / 1000) + "s";
}

function updatePlayButton() {
  const playIcon = elements.playBtn.querySelector(".icon");
  const playText = elements.playBtn.querySelector(".text");

  if (isPlaying) {
    playIcon.textContent = "⏸";
    playText.textContent = "Duraklat";
  } else {
    playIcon.textContent = "▶";
    playText.textContent = "Oynat";
  }
}

function playSound(type) {
  if (!soundEnabled || !audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  const frequencies = {
    ding: 800,
    bip: 400,
    clang: 200,
    whoosh: 150,
  };

  oscillator.frequency.setValueAtTime(
    frequencies[type],
    audioContext.currentTime
  );
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.2
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
}

function renderScene() {
  const progressPercent = (progress / scenes[currentScene].duration) * 100;

  switch (currentScene + 1) {
    case 1:
      renderScene1(progressPercent);
      break;
    case 2:
      renderScene2(progressPercent);
      break;
    case 3:
      renderScene3(progressPercent);
      break;
    case 4:
      renderScene4(progressPercent);
      break;
    case 5:
      renderScene5(progressPercent);
      break;
    case 6:
      renderScene6(progressPercent);
      break;
    case 7:
      renderScene7(progressPercent);
      break;
    case 8:
      renderScene8(progressPercent);
      break;
    case 9:
      renderScene9(progressPercent);
      break;
    case 10:
      renderScene10(progressPercent);
      break;
    case 11:
      renderScene11(progressPercent);
      break;
    case 12:
      renderScene12(progressPercent);
      break;
  }
}

function renderScene1(progress) {
  const soundKey = "scene1-ding";
  if (progress > 85 && !soundPlayed[soundKey]) {
    playSound("ding");
    soundPlayed[soundKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div class="kidval-tx-card" style="opacity: ${
          progress > 22 ? 1 : 0
        }; transform: scale(${
    progress > 22 ? 1 : 0.95
  }); transition: all 0.5s;">
            <div class="grid">
                <div class="kidval-field ${
                  progress > 22 && progress < 67 ? "bg-blue-100" : ""
                }" style="transform: scale(${
    progress > 22 && progress < 67 ? 1.05 : 1
  }); box-shadow: ${
    progress > 67 && progress < 86 ? "0 0 10px rgba(37, 99, 235, 0.5)" : "none"
  }; transition: all 0.3s;">
                    <div class="field-content">
                        <span style="font-size: 2rem;">🔢</span>
                        <div>
                            <div class="field-title">Version</div>
                            <div class="field-subtitle">Sürüm</div>
                        </div>
                    </div>
                </div>
                <div class="kidval-field ${
                  progress > 33 && progress < 67 ? "bg-green-100" : ""
                }" style="transform: scale(${
    progress > 33 && progress < 67 ? 1.05 : 1
  }); box-shadow: ${
    progress > 67 && progress < 86 ? "0 0 10px rgba(16, 185, 129, 0.5)" : "none"
  }; transition: all 0.3s;">
                    <div class="field-content">
                        <span style="font-size: 2rem;">⬅️</span>
                        <div>
                            <div class="field-title">Inputs</div>
                            <div class="field-subtitle">Girişler</div>
                        </div>
                    </div>
                </div>
                <div class="kidval-field ${
                  progress > 44 && progress < 67 ? "bg-amber-100" : ""
                }" style="transform: scale(${
    progress > 44 && progress < 67 ? 1.05 : 1
  }); box-shadow: ${
    progress > 67 && progress < 86 ? "0 0 10px rgba(245, 158, 11, 0.5)" : "none"
  }; transition: all 0.3s;">
                    <div class="field-content">
                        <span style="font-size: 2rem;">➡️</span>
                        <div>
                            <div class="field-title">Outputs</div>
                            <div class="field-subtitle">Çıkışlar</div>
                        </div>
                    </div>
                </div>
                <div class="kidval-field ${
                  progress > 55 && progress < 67 ? "bg-red-100" : ""
                }" style="transform: scale(${
    progress > 55 && progress < 67 ? 1.05 : 1
  }); box-shadow: ${
    progress > 67 && progress < 86 ? "0 0 10px rgba(239, 68, 68, 0.5)" : "none"
  }; transition: all 0.3s;">
                    <div class="field-content">
                        <span style="font-size: 2rem;">🕐</span>
                        <div>
                            <div class="field-title">LockTime</div>
                            <div class="field-subtitle">Zaman</div>
                        </div>
                    </div>
                </div>
            </div>
            ${
              progress > 86
                ? `<div style="margin-top: 1rem; text-align: center; color: #16a34a; font-weight: 600; ${
                    progress > 90 ? "animation: pulse 2s infinite;" : ""
                  }">✅ İşlem Kutusu Hazır!</div>`
                : ""
            }
        </div>
    `;
}

function renderScene2(progress) {
  const dingKey = "scene2-ding";
  const bipKey = "scene2-bip";

  if (progress > 65 && progress < 75 && !soundPlayed[dingKey]) {
    playSound("ding");
    soundPlayed[dingKey] = true;
  }
  if (progress > 85 && progress < 95 && !soundPlayed[bipKey]) {
    playSound("bip");
    soundPlayed[bipKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 2rem;">
            <div style="transition: all 0.5s; transform: translateX(${
              progress > 0 ? "0" : "-5rem"
            }); opacity: ${progress > 0 ? 1 : 0};">
                <div style="font-size: 4rem;">🔑</div>
                <div style="text-align: center; margin-top: 0.5rem; font-size: 0.875rem; font-weight: 500;">Gizli Anahtar</div>
            </div>
            <div style="transition: all 0.5s; transform: translateX(${
              progress > 0 ? "0" : "5rem"
            }); opacity: ${progress > 0 ? 1 : 0};">
                <div style="font-size: 4rem;">📝</div>
                <div style="text-align: center; margin-top: 0.5rem; font-size: 0.875rem; font-weight: 500;">İmza</div>
            </div>
            <div class="verification-box ${
              progress > 56 && progress < 81
                ? "success"
                : progress > 81 && progress < 94
                ? "error"
                : ""
            }" style="transform: scale(${
    progress > 31 ? 1.1 : 1
  }); transition: all 0.5s;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">
                    ${
                      progress > 56 && progress < 81
                        ? "✅"
                        : progress > 81 && progress < 94
                        ? "❌"
                        : "🔍"
                    }
                </div>
                <div style="font-weight: 600;">
                    ${
                      progress > 56 && progress < 81
                        ? "Doğrulandı!"
                        : progress > 81 && progress < 94
                        ? "Hata!"
                        : "Doğrulanıyor..."
                    }
                </div>
            </div>
        </div>
    `;
}

function renderScene3(progress) {
  const bipKey = "scene3-bip";
  if (progress > 70 && progress < 80 && !soundPlayed[bipKey]) {
    playSound("bip");
    soundPlayed[bipKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="position: relative;">
            <div style="font-size: 5rem; ${
              progress > 70 ? "animation: bounce 1s infinite;" : ""
            } transition: all 0.3s;">🪙</div>
            
            <div style="position: absolute; top: -4rem; left: -5rem; transition: all 0.5s; transform: translateX(${
              progress > 0 && progress < 37 ? "5rem" : "0"
            }); opacity: ${progress > 0 && progress < 37 ? 1 : 0.5};">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="font-size: 2rem; color: #2563eb;">➡️</div>
                    ${
                      progress > 30 && progress < 50
                        ? '<div style="font-size: 1.5rem; color: #16a34a;">✅</div>'
                        : ""
                    }
                </div>
                <div style="font-size: 0.75rem; color: #2563eb; font-weight: 500;">İlk İşlem</div>
            </div>
            
            <div style="position: absolute; bottom: -4rem; left: -5rem; transition: all 0.5s; transform: translateX(${
              progress > 37 && progress < 81 ? "2.5rem" : "0"
            }); opacity: ${progress > 37 && progress < 81 ? 1 : 0.5}; ${
    progress > 70 ? "animation: pulse 2s infinite;" : ""
  }">
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <div style="font-size: 2rem; color: #ea580c;">➡️</div>
                    ${
                      progress > 70
                        ? '<div style="font-size: 1.5rem; color: #dc2626;">❌</div>'
                        : ""
                    }
                </div>
                <div style="font-size: 0.75rem; color: #ea580c; font-weight: 500;">İkinci İşlem</div>
            </div>
            
            ${
              progress > 81
                ? `
                <div style="position: absolute; bottom: -6rem; left: 50%; transform: translateX(-50%); ${
                  progress > 85 ? "animation: pulse 2s infinite;" : ""
                } transition: all 0.5s;">
                    <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 0.5rem; padding: 0.5rem 1rem;">
                        <div style="color: #92400e; font-weight: bold; font-size: 1.125rem;">Bir Kez!</div>
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene4(progress) {
  const confettiKey = "scene4-confetti";
  if (progress > 90 && !soundPlayed[confettiKey]) {
    playSound("ding");
    soundPlayed[confettiKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="display: flex; align-items: center; gap: 2rem;">
            <div style="transition: all 0.5s; ${
              progress > 0 && progress < 22
                ? "transform: scale(1.1); background-color: #dbeafe; border-radius: 0.5rem; padding: 1rem;"
                : ""
            }">
                <div style="font-size: 4rem;">🔒</div>
                <div style="text-align: center; margin-top: 0.5rem; font-weight: 600;">LOCK</div>
                ${
                  progress > 18 && progress < 30
                    ? '<div style="text-align: center; font-size: 1.5rem; color: #16a34a;">✅</div>'
                    : ""
                }
            </div>
            <div style="font-size: 2rem; color: #9ca3af;">➡️</div>
            <div style="transition: all 0.5s; ${
              progress > 22 && progress < 45
                ? "transform: scale(1.1); background-color: #dcfce7; border-radius: 0.5rem; padding: 1rem;"
                : ""
            }">
                <div style="font-size: 4rem;">🔑</div>
                <div style="text-align: center; margin-top: 0.5rem; font-weight: 600;">KEY</div>
                ${
                  progress > 40 && progress < 52
                    ? '<div style="text-align: center; font-size: 1.5rem; color: #16a34a;">✅</div>'
                    : ""
                }
            </div>
            <div style="font-size: 2rem; color: #9ca3af;">➡️</div>
            <div style="transition: all 0.5s; ${
              progress > 45 && progress < 67
                ? "transform: scale(1.1); background-color: #fef3c7; border-radius: 0.5rem; padding: 1rem;"
                : ""
            }">
                <div style="font-size: 4rem;">✅</div>
                <div style="text-align: center; margin-top: 0.5rem; font-weight: 600;">CHECK</div>
                ${
                  progress > 62 && progress < 74
                    ? '<div style="text-align: center; font-size: 1.5rem; color: #16a34a;">✅</div>'
                    : ""
                }
            </div>
            
            <div style="position: absolute; top: 1rem; right: 1rem; transition: all 0.3s; transform: scale(${
              progress > 67 && progress < 85 ? 1.1 : 1
            });">
                <div style="background-color: #fee2e2; border: 2px solid #fca5a5; border-radius: 0.5rem; padding: 0.75rem;">
                    <div style="font-size: 2rem;">⏰</div>
                    <div style="font-size: 0.75rem; font-weight: 500;">
                        ${
                          progress > 67 && progress < 78
                            ? "Erken!"
                            : progress > 78
                            ? "Tamam!"
                            : "Zaman"
                        }
                    </div>
                    ${
                      progress > 67 && progress < 78
                        ? '<div style="color: #dc2626; font-size: 1.125rem;">❌</div>'
                        : ""
                    }
                    ${
                      progress > 78
                        ? '<div style="color: #16a34a; font-size: 1.125rem;">✅</div>'
                        : ""
                    }
                </div>
            </div>
            
            ${
              progress > 90
                ? `
                <div style="position: absolute; inset: 0; pointer-events: none;">
                    <div style="animation: bounce 1s infinite; font-size: 2.5rem; position: absolute; top: 2.5rem; left: 2.5rem;">🎉</div>
                    <div style="animation: bounce 1s infinite; animation-delay: 0.2s; font-size: 2.5rem; position: absolute; top: 5rem; right: 2.5rem;">🎊</div>
                    <div style="animation: bounce 1s infinite; animation-delay: 0.4s; font-size: 2.5rem; position: absolute; bottom: 5rem; left: 5rem;">✨</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene5(progress) {
  const dingKey = "scene5-ding";
  if (progress > 50 && !soundPlayed[dingKey]) {
    playSound("ding");
    soundPlayed[dingKey] = true;
  }

  const feeLevel =
    progress > 31
      ? Math.min(100, (progress - 31) * 3)
      : Math.min(30, progress * 3);
  const sizeLevel = progress > 50 ? Math.min(80, (progress - 50) * 2) : 60;

  elements.sceneContent.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600;">Ücret (sat/vB)</span>
                    <button class="btn btn-outline" style="${
                      progress > 25 && progress < 35
                        ? "animation: pulse 2s infinite; transform: scale(1.1);"
                        : ""
                    } transition: all 0.3s;">
                        Ücreti Artır
                    </button>
                </div>
                <div style="width: 20rem; background-color: #e5e7eb; border-radius: 9999px; height: 1.5rem; position: relative;">
                    <div style="height: 1.5rem; border-radius: 9999px; transition: all 0.5s; background-color: ${
                      feeLevel > 60 ? "#10b981" : "#ef4444"
                    }; width: ${feeLevel}%;"></div>
                    <div style="position: absolute; top: 0; left: 60%; width: 1px; height: 1.5rem; background-color: #4b5563;"></div>
                    <span style="position: absolute; top: -1.5rem; left: 60%; font-size: 0.75rem; color: #6b7280;">Eşik</span>
                </div>
                ${
                  progress > 0 && progress < 31
                    ? '<div style="color: #dc2626; font-size: 0.875rem; margin-top: 0.25rem;">❌ Az ücret</div>'
                    : ""
                }
                ${
                  progress > 40
                    ? '<div style="color: #16a34a; font-size: 0.875rem; margin-top: 0.25rem;">✅ Yeterli ücret</div>'
                    : ""
                }
            </div>
            
            <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span style="font-weight: 600;">Boyut (weight)</span>
                </div>
                <div style="width: 20rem; background-color: #e5e7eb; border-radius: 9999px; height: 1.5rem; position: relative;">
                    <div style="height: 1.5rem; border-radius: 9999px; transition: all 0.5s; background-color: ${
                      sizeLevel < 85 ? "#10b981" : "#ef4444"
                    }; width: ${sizeLevel}%;"></div>
                    <div style="position: absolute; top: 0; left: 80%; width: 1px; height: 1.5rem; background-color: #4b5563;"></div>
                    <span style="position: absolute; top: -1.5rem; left: 80%; font-size: 0.75rem; color: #6b7280;">Limit</span>
                </div>
                ${
                  progress > 50
                    ? '<div style="color: #16a34a; font-size: 0.875rem; margin-top: 0.25rem;">✅ Uygun boyut</div>'
                    : ""
                }
            </div>
            
            ${
              progress > 65
                ? `
                <div style="text-align: center; transition: all 0.3s; ${
                  progress > 70 ? "animation: pulse 2s infinite;" : ""
                }">
                    <div style="color: #16a34a; font-weight: bold; font-size: 1.125rem;">🚀 Hızlı İşlem!</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene6(progress) {
  const bipKey = "scene6-bip";
  if (progress > 75 && !soundPlayed[bipKey]) {
    playSound("bip");
    soundPlayed[bipKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="position: relative;">
            <div class="mempool-gate">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🚪</div>
                <div style="font-size: 1.5rem; font-weight: bold;">MEMPOOL</div>
                <div style="font-size: 0.875rem; opacity: 0.9;">Bekleme Alanı</div>
            </div>
            
            <div style="position: absolute; left: -10rem; top: 50%; transform: translateY(-50%); transition: all 1s; transform: translateY(-50%) translateX(${
              progress > 0 && progress < 50 ? "8rem" : "0"
            });">
                <div class="transaction-item">
                    <div style="font-size: 2rem;">📄</div>
                    <div style="font-size: 0.75rem; font-weight: 500;">Geçerli TX</div>
                </div>
                ${
                  progress > 30 && progress < 60
                    ? `
                    <div style="position: absolute; right: -2rem; top: 50%; transform: translateY(-50%);">
                        <div style="background-color: #16a34a; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: bold;">İçeride! ✅</div>
                    </div>
                `
                    : ""
                }
            </div>
            
            <div class="transaction-item invalid" style="position: absolute; left: -10rem; top: 75%; transition: all 1s; transform: translateX(${
              progress > 50 && progress < 80 ? "5rem" : "0"
            }); ${progress > 70 ? "animation: bounce 1s infinite;" : ""}">
                <div style="font-size: 2rem;">📄</div>
                <div style="font-size: 0.75rem; font-weight: 500;">Geçersiz TX</div>
                ${
                  progress > 75
                    ? `
                    <div style="position: absolute; right: -2rem; top: 50%; transform: translateY(-50%);">
                        <div style="background-color: #dc2626; color: white; padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; font-weight: bold;">Reddedildi! ❌</div>
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `;
}

function renderScene7(progress) {
  const clangKey = "scene7-clang";
  if (progress > 80 && !soundPlayed[clangKey]) {
    playSound("clang");
    soundPlayed[clangKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
            <div style="background-color: ${
              progress > 36 ? "#eff6ff" : "#f9fafb"
            }; border: 2px ${
    progress > 36 ? "solid #60a5fa" : "dashed #9ca3af"
  }; border-radius: 0.5rem; padding: 1.5rem; transition: all 0.5s;">
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-size: 2.5rem;">🧱</div>
                    <div style="font-weight: 600;">Blok İnşası</div>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                    ${[1, 2, 3, 4, 5, 6]
                      .map(
                        (tx, index) => `
                        <div style="background: white; border-radius: 0.25rem; padding: 0.5rem; text-align: center; font-size: 0.75rem; transition: all 0.3s; opacity: ${
                          progress > 10 + index * 5 ? 1 : 0
                        }; transform: scale(${
                          progress > 10 + index * 5 ? 1 : 0.5
                        });">
                            TX${tx}
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div>
                <div style="text-align: center; margin-bottom: 1rem;">
                    <div style="font-weight: 600;">Merkle Ağacı</div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                    <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 0.5rem; padding: 0.75rem; transition: all 0.5s; transform: scale(${
                      progress > 72 ? 1.1 : 1
                    }); ${
    progress > 72
      ? "box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); animation: pulse 2s infinite;"
      : ""
  }">
                        <div style="font-size: 1.5rem;">🌳</div>
                        <div style="font-size: 0.75rem; font-weight: bold;">Merkle Root</div>
                    </div>
                    <div style="display: flex; gap: 2rem;">
                        ${[1, 2]
                          .map(
                            (node) => `
                            <div style="background-color: #dcfce7; border: 1px solid #86efac; border-radius: 0.25rem; padding: 0.5rem; font-size: 0.75rem; transition: all 0.3s; opacity: ${
                              progress > 50 + node * 5 ? 1 : 0.3
                            };">
                                H${node}
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                    <div style="display: flex; gap: 1rem;">
                        ${[1, 2, 3, 4]
                          .map(
                            (leaf) => `
                            <div style="background-color: #dbeafe; border: 1px solid #93c5fd; border-radius: 0.25rem; padding: 0.25rem; font-size: 0.75rem; transition: all 0.3s; opacity: ${
                              progress > 36 + leaf * 3 ? 1 : 0.3
                            };">
                                TX${leaf}
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            
            ${
              progress > 88
                ? `
                <div style="text-align: center;">
                    <div style="background-color: #16a34a; color: white; padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: bold;">🎯 Büyük Özet Hazır!</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene8(progress) {
  const dingKey = "scene8-ding";
  if (progress > 95 && !soundPlayed[dingKey]) {
    playSound("ding");
    soundPlayed[dingKey] = true;
  }

  const fields = [
    {
      name: "Previous Hash",
      subtitle: "Önceki Blok Özeti",
      icon: "🔗",
      start: 0,
      end: 25,
      checkStart: 20,
      checkEnd: 35,
    },
    {
      name: "Merkle Root",
      subtitle: "Sahne 7'den Gelen",
      icon: "🌳",
      start: 25,
      end: 50,
      checkStart: 45,
      checkEnd: 60,
    },
    {
      name: "Timestamp",
      subtitle: "Zaman Kontrolü",
      icon: "⏰",
      start: 50,
      end: 75,
      checkStart: 70,
      checkEnd: 85,
      warningStart: 60,
      warningEnd: 70,
    },
    {
      name: "Consensus Proof",
      subtitle: "PoW/PoS İspatı",
      icon: "🛡️",
      start: 75,
      end: 100,
      checkStart: 95,
      checkEnd: 100,
    },
  ];

  elements.sceneContent.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 1.5rem; font-weight: bold;">Blok Başlığı Kontrolü</div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${fields
                  .map(
                    (field) => `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-radius: 0.5rem; transition: all 0.5s; background-color: ${
                      progress > field.start && progress < field.end
                        ? field.name === "Previous Hash"
                          ? "#dbeafe"
                          : field.name === "Merkle Root"
                          ? "#dcfce7"
                          : field.name === "Timestamp"
                          ? "#fef3c7"
                          : "#f3e8ff"
                        : "#f9fafb"
                    }; border: 2px solid ${
                      progress > field.start && progress < field.end
                        ? field.name === "Previous Hash"
                          ? "#60a5fa"
                          : field.name === "Merkle Root"
                          ? "#4ade80"
                          : field.name === "Timestamp"
                          ? "#f59e0b"
                          : "#a78bfa"
                        : "transparent"
                    }; transform: scale(${
                      progress > field.start && progress < field.end ? 1.05 : 1
                    });">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.5rem;">${
                              field.icon
                            }</span>
                            <div>
                                <div style="font-weight: 600;">${
                                  field.name
                                }</div>
                                <div style="font-size: 0.75rem; color: #6b7280;">${
                                  field.subtitle
                                }</div>
                            </div>
                        </div>
                        ${
                          field.warningStart &&
                          progress > field.warningStart &&
                          progress < field.warningEnd
                            ? '<div style="color: #dc2626; font-size: 1.25rem;">⚠️</div>'
                            : ""
                        }
                        ${
                          progress > field.checkStart &&
                          progress < field.checkEnd
                            ? '<div style="color: #16a34a; font-size: 1.5rem; animation: pulse 2s infinite;">✅</div>'
                            : ""
                        }
                        ${
                          field.checkStart && progress > field.checkEnd
                            ? '<div style="color: #16a34a; font-size: 1.5rem;">✅</div>'
                            : ""
                        }
                    </div>
                `
                  )
                  .join("")}
            </div>
            
            ${
              progress > 95
                ? `
                <div style="text-align: center;">
                    <div style="background-color: #16a34a; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; font-size: 1.125rem;">
                        🎉 Tüm Kontroller Başarılı!
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene9(progress) {
  elements.sceneContent.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="font-size: 1.5rem; font-weight: bold;">Blok İçi Detay Kontrol</div>
            </div>
            
            <div style="background: white; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden;">
                <div style="background-color: #f9fafb; padding: 0.75rem;">
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; font-size: 0.875rem; font-weight: 600;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 1.125rem;">📋</span>
                            Format
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 1.125rem;">✍️</span>
                            İmza
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 1.125rem;">📜</span>
                            Script
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 1.125rem;">💰</span>
                            Ücret
                        </div>
                        <div>Durum</div>
                    </div>
                </div>
                
                <div style="padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${[1, 2, 3, 4, 5]
                      .map((tx, index) => {
                        const rowProgress = Math.max(
                          0,
                          (progress - index * 15) / 15
                        );
                        const isScanning =
                          progress > index * 15 && progress < (index + 1) * 15;
                        const isComplete = progress > (index + 1) * 15;

                        return `
                            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; padding: 0.5rem; border-radius: 0.25rem; transition: all 0.3s; background-color: ${
                              isScanning
                                ? "#dbeafe"
                                : isComplete
                                ? "#f0fdf4"
                                : "#f9fafb"
                            }; border: 2px solid ${
                          isScanning ? "#60a5fa" : "transparent"
                        };">
                                <div style="text-align: center;">${
                                  isComplete ? "✅" : isScanning ? "🔍" : "⏳"
                                }</div>
                                <div style="text-align: center;">${
                                  isComplete ? "✅" : isScanning ? "🔍" : "⏳"
                                }</div>
                                <div style="text-align: center;">${
                                  isComplete ? "✅" : isScanning ? "🔍" : "⏳"
                                }</div>
                                <div style="text-align: center;">${
                                  isComplete ? "✅" : isScanning ? "🔍" : "⏳"
                                }</div>
                                <div style="text-align: center; font-weight: 600;">
                                    ${
                                      isComplete
                                        ? '<span style="color: #16a34a;">TAMAM</span>'
                                        : isScanning
                                        ? '<span style="color: #2563eb;">KONTROL</span>'
                                        : '<span style="color: #9ca3af;">BEKLIYOR</span>'
                                    }
                                </div>
                            </div>
                        `;
                      })
                      .join("")}
                </div>
            </div>
            
            ${
              progress > 80
                ? `
                <div style="text-align: center; transition: all 0.5s; ${
                  progress > 85 ? "animation: pulse 2s infinite;" : ""
                }">
                    <div style="background-color: #16a34a; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; font-size: 1.125rem;">
                        🎯 Tüm İşlemler Doğrulandı!
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene10(progress) {
  const clangKey = "scene10-clang";
  if (progress > 50 && !soundPlayed[clangKey]) {
    playSound("clang");
    soundPlayed[clangKey] = true;
  }

  elements.sceneContent.innerHTML = `
        <div style="position: relative;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                ${[1, 2, 3]
                  .map(
                    (block) => `
                    <div class="block-item">
                        <div style="font-size: 1.5rem;">🧱</div>
                        <div style="font-size: 0.75rem; font-weight: bold;">#${block}</div>
                    </div>
                `
                  )
                  .join("")}
                
                <div class="block-item new" style="transition: all 1s; transform: translateX(${
                  progress > 0 && progress < 33
                    ? "0"
                    : progress < 33
                    ? "-5rem"
                    : "0"
                }); opacity: ${
    progress > 0 && progress < 33 ? 1 : progress < 33 ? 0 : 1
  };">
                    <div style="font-size: 1.5rem;">🧱</div>
                    <div style="font-size: 0.75rem; font-weight: bold;">#4</div>
                    <div style="font-size: 0.75rem;">YENİ</div>
                </div>
            </div>
            
            ${
              progress > 33 && progress < 55
                ? `
                <div style="position: absolute; inset: 0; pointer-events: none;">
                    <div style="position: absolute; inset: 0; background-color: #60a5fa; opacity: 0.2; animation: ping 1s infinite; border-radius: 0.5rem;"></div>
                    <div style="position: absolute; inset: 0; background-color: #2563eb; opacity: 0.1; animation: pulse 2s infinite; border-radius: 0.5rem;"></div>
                </div>
            `
                : ""
            }
            
            <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 1rem; transition: all 0.5s; transform: translateX(-50%) scale(${
              progress > 55 ? 1.1 : 1
            });">
                <div style="background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 0.5rem; padding: 0.5rem 1rem;">
                    <div style="text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold;">${
                          progress > 55 ? "📈 Yükseklik: 4" : "📊 Yükseklik: 3"
                        }</div>
                        ${
                          progress > 55
                            ? '<div style="font-size: 0.75rem; color: #92400e; font-weight: 500;">+1 Arttı!</div>'
                            : ""
                        }
                    </div>
                </div>
            </div>
            
            ${
              progress > 83
                ? `
                <div style="position: absolute; inset: 0; pointer-events: none;">
                    <div style="position: absolute; inset: 0; background-color: #4ade80; border-radius: 0.5rem; transition: all 1s; opacity: ${
                      progress > 90 ? 0 : 0.3
                    };"></div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene11(progress) {
  const whooshKey = "scene11-whoosh";
  if (progress > 25 && !soundPlayed[whooshKey]) {
    playSound("whoosh");
    soundPlayed[whooshKey] = true;
  }

  const nodes = [
    { x: 50, y: 50, delay: 0 },
    { x: 350, y: 50, delay: 5 },
    { x: 350, y: 350, delay: 10 },
    { x: 50, y: 350, delay: 15 },
    { x: 200, y: 20, delay: 20 },
    { x: 380, y: 200, delay: 25 },
    { x: 200, y: 380, delay: 30 },
    { x: 20, y: 200, delay: 35 },
  ];

  elements.sceneContent.innerHTML = `
        <div style="position: relative; width: 24rem; height: 24rem;">
            <div class="node-item center" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); transition: all 0.5s; transform: translate(-50%, -50%) scale(${
              progress > 0 && progress < 25 ? 1.25 : 1
            }); ${
    progress > 0 && progress < 25 ? "animation: pulse 2s infinite;" : ""
  }">
                <div style="font-size: 2rem;">🌐</div>
                <div style="font-size: 0.75rem; font-weight: bold;">Ana Düğüm</div>
            </div>
            
            ${nodes
              .map((node, index) => {
                const nodeProgress = Math.max(0, progress - node.delay);
                const isAccepted = nodeProgress > 40;

                return `
                    <div class="node-item ${
                      isAccepted ? "active" : ""
                    }" style="position: absolute; left: ${node.x}px; top: ${
                  node.y
                }px; transform: translate(-50%, -50%);">
                        <div style="font-size: 1.25rem;">🖥️</div>
                        ${
                          isAccepted
                            ? '<div style="font-size: 0.75rem; font-weight: bold; margin-top: 0.25rem;">Kabul!</div>'
                            : ""
                        }
                    </div>
                `;
              })
              .join("")}
            
            ${
              progress > 25 && progress < 75
                ? `
                <div style="position: absolute; inset: 0; pointer-events: none;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 5rem; height: 5rem; border: 4px solid #60a5fa; border-radius: 50%; animation: ping 1s infinite;"></div>
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 10rem; height: 10rem; border: 2px solid #93c5fd; border-radius: 50%; animation: ping 1s infinite; animation-delay: 0.5s;"></div>
                </div>
            `
                : ""
            }
            
            ${
              progress > 75
                ? `
                <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 1rem;">
                    <div style="background-color: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; text-align: center;">🌐 Ağ Senkronize!</div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderScene12(progress) {
  elements.sceneContent.innerHTML = `
        <div style="position: relative;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 2rem;">
                ${[1, 2, 3]
                  .map(
                    (block) => `
                    <div class="block-item">
                        <div style="font-size: 1.25rem;">🧱</div>
                        <div style="font-size: 0.75rem; font-weight: bold;">#${block}</div>
                    </div>
                `
                  )
                  .join("")}
                
                <div style="background-color: #4b5563; color: white; border-radius: 0.5rem; padding: 0.75rem; text-align: center;">
                    <div style="font-size: 1.25rem;">🧱</div>
                    <div style="font-size: 0.75rem; font-weight: bold;">#4</div>
                </div>
            </div>
            
            <div style="position: absolute; top: 0; right: 0; display: flex; align-items: center; gap: 0.5rem; transition: all 1s; transform: scale(${
              progress > 55 ? 1.1 : 1
            });">
                <div style="border-radius: 0.5rem; padding: 0.75rem; text-align: center; transition: all 0.5s; background-color: ${
                  progress > 30 ? "#16a34a" : "#9ca3af"
                }; color: white;">
                    <div style="font-size: 1.25rem;">🧱</div>
                    <div style="font-size: 0.75rem; font-weight: bold;">#5A</div>
                </div>
                
                ${
                  progress > 30
                    ? `
                    <div style="border-radius: 0.5rem; padding: 0.75rem; text-align: center; transition: all 0.5s; background-color: ${
                      progress > 55 ? "#16a34a" : "#9ca3af"
                    }; color: white;">
                        <div style="font-size: 1.25rem;">🧱</div>
                        <div style="font-size: 0.75rem; font-weight: bold;">#6A</div>
                    </div>
                `
                    : ""
                }
            </div>
            
            <div style="position: absolute; bottom: 0; right: 0; display: flex; align-items: center; gap: 0.5rem; transition: all 1s; opacity: ${
              progress > 55 ? 0.3 : 1
            }; transform: scale(${progress > 55 ? 0.9 : 1});">
                <div style="background-color: #f87171; color: white; border-radius: 0.5rem; padding: 0.75rem; text-align: center;">
                    <div style="font-size: 1.25rem;">🧱</div>
                    <div style="font-size: 0.75rem; font-weight: bold;">#5B</div>
                </div>
            </div>
            
            ${
              progress > 55
                ? `
                <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 1rem;">
                    <div style="background-color: #16a34a; color: white; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; text-align: center; animation: pulse 2s infinite;">
                        🏆 Daha Uzun Yol Kazanır!
                    </div>
                </div>
            `
                : ""
            }
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", init);
