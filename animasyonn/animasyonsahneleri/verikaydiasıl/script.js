class DataRecordingAnimation {
  constructor() {
    this.scenes = [
      "intro",
      "source",
      "capture",
      "timestamp",
      "metadata",
      "validate",
      "append",
      "store",
      "audit",
      "outro",
    ];

    this.sceneData = {
      intro: {
        title: "Veri Kaydı",
        subtitle: "Değerin, zamanın ve kaynağın güvenli notu",
        duration: 4000,
        voiceover:
          "Veri kaydı, bir değeri zamanı ve kaynağıyla birlikte kaydetmektir.",
      },
      source: {
        title: "Kaynak Görünümü",
        subtitle:
          "Veri, sensörlerden, kullanıcı girişinden ve uygulama loglarından akar",
        duration: 4000,
        voiceover: "Kayıttan önce veri kaynağı bellidir.",
      },
      capture: {
        title: "Değerin Yakalanması",
        subtitle: "Kayıt anında değer dondurulur",
        duration: 4000,
        voiceover: "Kaydet'e bastığımız an, ölçüm değerini dondururuz.",
      },
      timestamp: {
        title: "Zaman Damgası",
        subtitle: "Her kayıt, kesin bir zaman damgası taşır",
        duration: 4000,
        voiceover: "Her kayıt, kesin bir zaman damgası taşır.",
      },
      metadata: {
        title: "Metaveri: Kaynak & Kimlik",
        subtitle: "Kaynak ve benzersiz kimlik, kaydı geri izlemeyi sağlar",
        duration: 4000,
        voiceover: "Kaynak ve benzersiz kimlik, kaydı geri izlemeyi sağlar.",
      },
      validate: {
        title: "Doğrulama",
        subtitle: "Kayıt öncesi otomatik doğrulama",
        duration: 4000,
        voiceover:
          "Aralık ve tip kontrolleri, hatalı verinin kaydını engeller.",
      },
      append: {
        title: "Yazma - Kayıt Defteri Satırı",
        subtitle: "Kayıt, değişmez bir satır olarak eklenir",
        duration: 4000,
        voiceover: "Kayıt defterine bir satır olarak ekleriz.",
      },
      store: {
        title: "Güvenli Saklama",
        subtitle: "Depolama: dosya / veritabanı / bulut",
        duration: 4000,
        voiceover: "İhtiyaca göre farklı ortamlara güvenle yazarız.",
      },
      audit: {
        title: "Günlük & İzlenebilirlik",
        subtitle: "Her kayıt izlenebilir",
        duration: 4000,
        voiceover: "Zaman çizgisinde arar, seçer ve kaydı doğrularız.",
      },
      outro: {
        title: "Özet",
        subtitle: "Kayıt; değeri doğru an ve kaynakla not etmektir",
        duration: 4000,
        voiceover: "Kayıt; değeri doğru an ve kaynakla not etmektir.",
      },
    };

    this.currentScene = "intro";
    this.isPlaying = false;
    this.sceneProgress = 0;
    this.animationStep = 0;
    this.progressInterval = null;
    this.stepInterval = null;

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
    this.renderScene();

    setTimeout(() => {
      if (typeof window.lucide !== "undefined") {
        window.lucide.createIcons();
      }
    }, 100);
  }

  bindEvents() {
    document
      .getElementById("play-btn")
      .addEventListener("click", () => this.handlePlay());
    document
      .getElementById("restart-btn")
      .addEventListener("click", () => this.handleRestart());
    document
      .getElementById("next-btn")
      .addEventListener("click", () => this.handleNext());
  }

  handlePlay() {
    if (this.isPlaying) return;

    this.isPlaying = true;

    if (this.currentScene === "outro" && this.sceneProgress === 100) {
      this.currentScene = "intro";
      this.sceneProgress = 0;
      this.animationStep = 0;
    }

    this.startAnimation();
    this.updateUI();
  }

  handleRestart() {
    this.stopAnimation();
    this.currentScene = "intro";
    this.sceneProgress = 0;
    this.animationStep = 0;
    this.isPlaying = false;
    this.updateUI();
    this.renderScene();
  }

  handleNext() {
    const currentIndex = this.scenes.indexOf(this.currentScene);
    if (currentIndex < this.scenes.length - 1) {
      this.currentScene = this.scenes[currentIndex + 1];
      this.sceneProgress = 0;
      this.animationStep = 0;
      this.updateUI();
      this.renderScene();
    }
  }

  startAnimation() {
    this.stopAnimation();

    const scene = this.sceneData[this.currentScene];

    this.progressInterval = setInterval(() => {
      this.sceneProgress += 100 / (scene.duration / 100);

      if (this.sceneProgress >= 100) {
        const currentIndex = this.scenes.indexOf(this.currentScene);
        if (currentIndex < this.scenes.length - 1) {
          this.currentScene = this.scenes[currentIndex + 1];
          this.sceneProgress = 0;
          this.animationStep = 0;
          this.renderScene();
        } else {
          this.isPlaying = false;
          this.sceneProgress = 100;
          this.stopAnimation();
        }
      }

      this.updateUI();
    }, 100);

    this.stepInterval = setInterval(() => {
      this.animationStep++;
      this.renderScene();
    }, 800);

    this.renderScene();
  }

  stopAnimation() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if (this.stepInterval) {
      clearInterval(this.stepInterval);
      this.stepInterval = null;
    }
  }

  updateUI() {
    const currentIndex = this.scenes.indexOf(this.currentScene);
    const totalProgress =
      ((currentIndex + this.sceneProgress / 100) / this.scenes.length) * 100;

    document.getElementById("progress-fill").style.width = `${totalProgress}%`;
    document.getElementById("scene-counter").textContent = `Sahne ${
      currentIndex + 1
    } / ${this.scenes.length}`;
    document.getElementById("progress-percent").textContent = `${Math.round(
      totalProgress
    )}%`;

    const scene = this.sceneData[this.currentScene];
    document.getElementById(
      "scene-title"
    ).textContent = `Şu anki sahne: ${scene.title}`;
    document.getElementById("scene-voiceover").textContent = scene.voiceover;

    const playBtn = document.getElementById("play-btn");
    const nextBtn = document.getElementById("next-btn");

    playBtn.disabled = this.isPlaying;
    playBtn.innerHTML = this.isPlaying
      ? '<i data-lucide="play"></i> Oynatılıyor...'
      : '<i data-lucide="play"></i> Başlat';

    nextBtn.disabled = currentIndex >= this.scenes.length - 1;

    if (typeof window.lucide !== "undefined") {
      window.lucide.createIcons();
    }
  }

  renderScene() {
    const container = document.getElementById("animation-content");
    const scene = this.sceneData[this.currentScene];

    switch (this.currentScene) {
      case "intro":
        container.innerHTML = this.renderIntroScene(scene);
        break;
      case "source":
        container.innerHTML = this.renderSourceScene(scene);
        break;
      case "capture":
        container.innerHTML = this.renderCaptureScene(scene);
        break;
      case "timestamp":
        container.innerHTML = this.renderTimestampScene(scene);
        break;
      case "metadata":
        container.innerHTML = this.renderMetadataScene(scene);
        break;
      case "validate":
        container.innerHTML = this.renderValidateScene(scene);
        break;
      case "append":
        container.innerHTML = this.renderAppendScene(scene);
        break;
      case "store":
        container.innerHTML = this.renderStoreScene(scene);
        break;
      case "audit":
        container.innerHTML = this.renderAuditScene(scene);
        break;
      case "outro":
        container.innerHTML = this.renderOutroScene(scene);
        break;
    }

    if (typeof window.lucide !== "undefined") {
      window.lucide.createIcons();
    }
  }

  renderIntroScene(scene) {
    return `
      <div class="text-center space-y-4">
        <div class="card ${
          this.animationStep > 0 ? "animate-scale-in" : "opacity-0"
        }" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(2px);">
          <div class="card-content">
            <i data-lucide="database" style="width: 2.5rem; height: 2.5rem; margin: 0 auto 0.75rem; display: block; color: var(--primary);"></i>
            <h1 class="text-2xl font-bold mb-2">${scene.title}</h1>
            <p class="text-sm" style="color: var(--muted-foreground);">${
              scene.subtitle
            }</p>
          </div>
        </div>
        ${
          this.animationStep > 1
            ? `
          <div style="display: flex; justify-content: center; gap: 0.25rem;" class="animate-fade-in-up">
            ${Array.from(
              { length: 4 },
              (_, i) => `
              <div style="width: 0.25rem; height: 0.25rem; background: var(--primary); border-radius: 50%;" class="animate-pulse stagger-${
                i % 3
              }"></div>
            `
            ).join("")}
          </div>
        `
            : ""
        }
      </div>
    `;
  }

  renderSourceScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="grid grid-cols-3" style="gap: 0.75rem;">
          <div class="card text-center ${
            this.animationStep > 0 ? "animate-fade-in-up" : "opacity-0"
          }">
            <i data-lucide="thermometer" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem; display: block; color: var(--primary);"></i>
            <p class="text-xs font-medium">Sensör</p>
          </div>
          <div class="card text-center ${
            this.animationStep > 1
              ? "animate-fade-in-up stagger-1"
              : "opacity-0"
          }">
            <i data-lucide="file-text" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem; display: block; color: var(--primary);"></i>
            <p class="text-xs font-medium">Kullanıcı Formu</p>
          </div>
          <div class="card text-center ${
            this.animationStep > 2
              ? "animate-fade-in-up stagger-2"
              : "opacity-0"
          }">
            <i data-lucide="database" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem; display: block; color: var(--primary);"></i>
            <p class="text-xs font-medium">Uygulama Logu</p>
          </div>
        </div>
      </div>
    `;
  }

  renderCaptureScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="card max-w-md mx-auto ${
          this.animationStep > 0 ? "animate-scale-in" : "opacity-0"
        }">
          <div class="card-content space-y-3">
            <div class="space-y-1">
              <label class="text-xs font-medium">Değer</label>
              <div style="padding: 0.375rem; background: var(--muted); border-radius: var(--radius); border: 1px solid var(--border);">
                <span class="text-sm font-mono ${
                  this.animationStep > 1 ? "animate-typewriter" : ""
                }" style="display: inline-block; overflow: hidden; white-space: nowrap;">
                  ${this.animationStep > 1 ? "23.5" : ""}
                </span>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-medium">Birim</label>
              <div style="padding: 0.375rem; background: var(--muted); border-radius: var(--radius); border: 1px solid var(--border);" class="text-xs">°C</div>
            </div>
            <button class="btn btn-primary w-full ${
              this.animationStep > 2 ? "animate-pulse-glow" : ""
            }" ${!this.isPlaying ? "disabled" : ""}>
              <i data-lucide="save" style="width: 0.875rem; height: 0.875rem;"></i>
              Kaydet
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTimestampScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.75rem;">
          <i data-lucide="clock" class="${
            this.animationStep > 0 ? "animate-rotate-subtle" : ""
          }" style="width: 2.5rem; height: 2.5rem; color: var(--primary);"></i>
          ${
            this.animationStep > 1
              ? `
            <div class="badge animate-fade-in-up" style="font-size: 0.75rem; font-family: monospace; padding: 0.375rem 0.75rem;">
              <span class="${
                this.animationStep > 2 ? "animate-typewriter" : ""
              }" style="display: inline-block; overflow: hidden; white-space: nowrap;">
                ${this.animationStep > 2 ? "2025-08-29 12:03:27.412Z" : ""}
              </span>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  renderMetadataScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
          <div class="badge badge-outline ${
            this.animationStep > 0 ? "animate-scale-in" : "opacity-0"
          }">
            <i data-lucide="thermometer" style="width: 0.75rem; height: 0.75rem;"></i>
            Kaynak: Sensör-001
          </div>
          <div class="badge badge-outline ${
            this.animationStep > 1 ? "animate-scale-in stagger-1" : "opacity-0"
          }">
            <i data-lucide="shield" style="width: 0.75rem; height: 0.75rem;"></i>
            UUID: abc123...
          </div>
        </div>
      </div>
    `;
  }

  renderValidateScene(scene) {
    const validationRules = [
      { rule: "Aralık kontrolü (0-100°C)", valid: this.animationStep > 1 },
      { rule: "Tip kontrolü (sayısal)", valid: this.animationStep > 2 },
      { rule: "Zorunlu alanlar", valid: this.animationStep > 3 },
    ];

    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="space-y-2 max-w-md mx-auto">
          ${validationRules
            .map(
              (item, index) => `
            <div class="card ${
              this.animationStep > index ? "animate-fade-in-up" : "opacity-0"
            } ${
                item.valid ? "bg-green-50 border-green-200" : ""
              }" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem;">
              <i data-lucide="${
                item.valid ? "check-circle" : "x-circle"
              }" style="width: 1rem; height: 1rem; color: ${
                item.valid ? "var(--success)" : "var(--error)"
              };"></i>
              <span class="text-xs">${item.rule}</span>
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  renderAppendScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="space-y-3">
          <div class="text-center text-xs" style="color: var(--muted-foreground);">Kayıt Defteri</div>
          <div style="border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
            <div class="grid grid-cols-4" style="gap: 0.25rem; padding: 0.375rem; background: var(--muted); font-size: 0.625rem; font-weight: 500;">
              <div>Zaman</div>
              <div>Kaynak</div>
              <div>Değer</div>
              <div>UUID</div>
            </div>
            ${
              this.animationStep > 0
                ? `
              <div class="grid grid-cols-4 animate-fade-in-up" style="gap: 0.25rem; padding: 0.375rem; border-top: 1px solid var(--border);">
                <div class="text-xs font-mono">12:03:27</div>
                <div class="text-xs">Sensör-001</div>
                <div class="text-xs font-mono">23.5°C</div>
                <div class="text-xs font-mono">abc123...</div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </div>
    `;
  }

  renderStoreScene(scene) {
    const storageTypes = [
      { name: "Dosya", icon: "file-text", step: 0 },
      { name: "Veritabanı", icon: "database", step: 1 },
      { name: "Bulut", icon: "cloud", step: 2 },
    ];

    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="grid grid-cols-3" style="gap: 0.75rem;">
          ${storageTypes
            .map(
              (storage, index) => `
            <div class="card text-center ${
              this.animationStep > storage.step
                ? `animate-scale-in stagger-${storage.step}`
                : "opacity-0"
            }">
              <i data-lucide="${
                storage.icon
              }" style="width: 1.5rem; height: 1.5rem; margin: 0 auto 0.25rem; display: block; color: var(--primary);"></i>
              <p class="text-xs">${storage.name}</p>
              ${
                this.animationStep > storage.step + 3
                  ? `
                <i data-lucide="check-circle" style="width: 0.875rem; height: 0.875rem; margin: 0.25rem auto 0; display: block; color: var(--success);"></i>
              `
                  : ""
              }
            </div>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  renderAuditScene(scene) {
    return `
      <div class="space-y-4">
        <div class="text-center mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div style="display: flex; gap: 1rem;">
          <div style="flex: 1;">
            <div class="text-xs font-medium mb-2">Zaman Çizgisi</div>
            <div class="space-y-1">
              ${Array.from(
                { length: 4 },
                (_, i) => `
                <div class="${
                  this.animationStep > i ? "animate-fade-in-up" : "opacity-0"
                }" style="display: flex; align-items: center; gap: 0.375rem;">
                  <div style="width: 0.5rem; height: 0.5rem; border-radius: 50%; background: ${
                    i === 1 && this.animationStep > 2
                      ? "var(--primary)"
                      : "var(--muted)"
                  };" class="${
                  i === 1 && this.animationStep > 2 ? "animate-pulse" : ""
                }"></div>
                  <span class="text-xs">12:0${i}:27</span>
                </div>
              `
              ).join("")}
            </div>
          </div>
          ${
            this.animationStep > 2
              ? `
            <div class="card animate-scale-in" style="flex: 1;">
              <div class="card-content">
                <div class="text-xs font-medium mb-1">Kayıt Detayı</div>
                <div class="space-y-0.5 text-xs">
                  <div>Değer: 23.5°C</div>
                  <div>Kaynak: Sensör-001</div>
                  <div>Zaman: 12:01:27</div>
                  <div>UUID: abc123...</div>
                </div>
              </div>
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;
  }

  renderOutroScene(scene) {
    const summarySteps = [
      { step: "Değer", icon: "database" },
      { step: "Zaman", icon: "clock" },
      { step: "Kaynak", icon: "thermometer" },
      { step: "Kayıt", icon: "check-circle" },
    ];

    return `
      <div class="text-center space-y-4">
        <div class="mb-4">
          <h2 class="text-lg font-semibold mb-1">${scene.title}</h2>
          <p class="text-xs text-balance" style="color: var(--muted-foreground);">${
            scene.subtitle
          }</p>
        </div>
        <div class="space-y-2 max-w-md mx-auto">
          ${summarySteps
            .map(
              (item, index) => `
            <div class="card ${
              this.animationStep > index ? "animate-fade-in-up" : "opacity-0"
            }" style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem;">
              <i data-lucide="check-circle" style="width: 1rem; height: 1rem; color: var(--success);"></i>
              <i data-lucide="${
                item.icon
              }" style="width: 1rem; height: 1rem; color: var(--primary);"></i>
              <span class="text-xs">${item.step}</span>
            </div>
          `
            )
            .join("")}
        </div>
        ${
          this.animationStep > 4
            ? `
          <div style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;" class="animate-fade-in-up">
            <button class="btn btn-outline" onclick="animation.handleRestart()">
              <i data-lucide="rotate-ccw"></i>
              Tekrar İzle
            </button>
          </div>
        `
            : ""
        }
      </div>
    `;
  }
}
document.addEventListener("DOMContentLoaded", () => {
  window.animation = new DataRecordingAnimation();
});
