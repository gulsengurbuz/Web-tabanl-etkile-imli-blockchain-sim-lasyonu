const hashState = {
  currentSceneIndex: 0,
  isModalOpen: true,
  animationPlaying: false,
  userInput: "",
  hashResult: "",
  hashing: false,
};

const hashAnimationArea = document.getElementById("hash-animation-area");
const hashModal = document.getElementById("hash-modal");
const hashModalTitle = document.getElementById("hash-modal-title");
const hashModalDescription = document.getElementById("hash-modal-description");
const hashModalContinueBtn = document.getElementById("hash-modal-continue-btn");

async function sha256(message) {
  let msgBuffer;
  if (typeof message === "string") {
    msgBuffer = new TextEncoder().encode(message);
  } else {
    msgBuffer = message;
  }
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hexHash = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hexHash;
}
function createIcon(iconName, className = "") {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  if (className) {
    className
      .trim()
      .split(/\s+/)
      .forEach((cls) => svg.classList.add(cls));
  }

  let pathData = "";
  switch (iconName) {
    case "FileTextIcon":
      pathData =
        "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z M14 2v4a2 2 0 0 0 2 2h4 M10 9H8 M16 13H8 M16 17H8";
      break;
    case "MusicIcon":
      pathData =
        "M9 18V5l12-2v13 M12 18v-4 M2 17v-4 M12 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4z M2 17a2 2 0 1 0 0 4a2 2 0 0 0 0-4z M12 14a2 2 0 1 0 0 4a2 2 0 0 0 0-4z";
      break;
    case "CodeIcon":
      pathData =
        "M16 18l4-4l-4-4 M8 6L4 10L8 14 M15 1H9a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3z";
      break;
    case "ImageIcon":
      pathData =
        "M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3 M3 19l3-3l2 2l4-4l5 5 M18 14a3 3 0 1 0 0-6a3 3 0 0 0 0 6z";
      break;
    case "HashIcon":
      pathData = "M4 9h16 M4 15h16 M10 3L8 21 M16 3l-2 18";
      break;
    case "SparklesIcon":
      pathData =
        "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z";
      break;
    case "ArrowRightIcon":
      pathData = "M5 12h14 M12 5l7 7l-7 7";
      break;
    case "UploadIcon":
      pathData =
        "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5l-5 5 M12 3v12";
      break;
  }

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  svg.appendChild(path);
  return svg;
}

function createSHABox() {
  const div = document.createElement("div");
  div.classList.add("hash-box", "hash-sha-box");
  div.appendChild(createIcon("HashIcon", "hash-icon-purple"));
  const span = document.createElement("span");
  span.textContent = "SHA-256()";
  div.appendChild(span);
  return div;
}

function createArrow(colorClass = "hash-blue") {
  const div = document.createElement("div");
  div.classList.add("hash-arrow", colorClass);
  div.appendChild(createIcon("ArrowRightIcon", "hash-text-white"));
  return div;
}

function animateElement(element, className, delay = 0) {
  setTimeout(() => {
    if (element) element.classList.add(className);
  }, delay);
}

function removeAnimationClass(element, className, delay = 0) {
  setTimeout(() => {
    if (element) element.classList.remove(className);
  }, delay);
}

function renderScene1() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-flex-col hash-items-center hash-gap-2 hash-flex-shrink-0">
                <div class="hash-box hash-w-20 hash-slide-in-left" id="hash-s1-icon-0">
                    ${createIcon("FileTextIcon", "hash-icon-blue").outerHTML}
                    <span class="hash-text-xs hash-text-gray-700">Belge</span>
                </div>
                <div class="hash-box hash-w-20 hash-slide-in-left" id="hash-s1-icon-1">
                    ${createIcon("MusicIcon", "hash-icon-green").outerHTML}
                    <span class="hash-text-xs hash-text-gray-700">Müzik</span>
                </div>
                <div class="hash-box hash-w-20 hash-slide-in-left" id="hash-s1-icon-2">
                    ${createIcon("CodeIcon", "hash-icon-red").outerHTML}
                    <span class="hash-text-xs hash-text-gray-700">Kod</span>
                </div>
                <div class="hash-box hash-w-20 hash-slide-in-left" id="hash-s1-icon-3">
                    ${createIcon("ImageIcon", "hash-icon-yellow").outerHTML}
                    <span class="hash-text-xs hash-text-gray-700">Görsel</span>
                </div>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s1-arrow-0">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s1-arrow-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s1-arrow-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s1-arrow-3">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-sha-box hash-fade-in" id="hash-s1-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s1-final-arrow">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-box hash-w-32 hash-h-24 hash-slide-in-right" id="hash-s1-result-box">
                ${createIcon("HashIcon", "").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-gray-800">3d30381f9c73aab6231...</span>
            </div>
        </div>
    `;
}

function renderScene2() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-box hash-slide-in-left" id="hash-s2-input">
                <span class="hash-font-mono hash-text-base hash-text-gray-800">merhaba</span>
            </div>
            <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s2-arrow-in">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-sha-box hash-fade-in" id="hash-s2-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s2-arrow-out">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-slide-in-right" id="hash-s2-result">
                <span class="hash-font-mono hash-text-sm hash-text-green-800">7c2c1d... </span>
            </div>
        </div>
    `;
}

function renderScene3() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-flex-col hash-gap-3 hash-flex-shrink-0">
                <div class="hash-box hash-slide-in-left" id="hash-s3-input-1">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">merhaba</span>
                </div>
                <div class="hash-box hash-slide-in-left" id="hash-s3-input-2">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">merhaba</span>
                </div>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s3-arrow-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s3-arrow-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-sha-box hash-fade-in" id="hash-s3-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s3-arrow-out">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-slide-in-right" id="hash-s3-result">
                <span class="hash-font-mono hash-text-sm hash-text-green-800">7c2c1d... </span>
                <span class="hash-mt-1 hash-text-green-600 hash-font-semibold hash-text-sm hash-hidden" id="hash-s3-consistency">Tutarlılık!</span>
            </div>
        </div>
    `;
}

function renderScene4() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-flex-col hash-gap-3 hash-flex-shrink-0">
                <div class="hash-box hash-slide-in-left" id="hash-s4-input-1">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">merhaba</span>
                </div>
                <div class="hash-box hash-slide-in-left" id="hash-s4-input-2">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">Merhaba</span>
                </div>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s4-arrow-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s4-arrow-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-sha-box hash-fade-in" id="hash-s4-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-red hash-scale-x-in" id="hash-s4-arrow-out-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s4-arrow-out-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-flex-col hash-gap-3 hash-flex-shrink-0">
                <div class="hash-box hash-slide-in-right hash-bg-red-100 hash-border-red-300" id="hash-s4-result-1">
                    <span class="hash-font-mono hash-text-xs hash-text-red-700">a1b2c3d4... </span>
                </div>
                <div class="hash-box hash-slide-in-right hash-bg-blue-100 hash-border-blue-300" id="hash-s4-result-2">
                    <span class="hash-font-mono hash-text-xs hash-text-blue-700">e5f6g7h8... </span>
                </div>
            </div>
            <div class="hash-jump-ball hash-hidden" id="hash-s4-ball">!</div>
        </div>
    `;
}

function renderScene5() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-flex-col hash-gap-3 hash-flex-shrink-0">
                <div class="hash-box hash-w-40 hash-slide-in-left" id="hash-s5-input-1">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">a</span>
                </div>
                <div class="hash-box hash-w-40 hash-slide-in-left" id="hash-s5-input-2">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">Lorem ipsum...</span>
                </div>
                <div class="hash-box hash-w-40 hash-slide-in-left" id="hash-s5-input-3">
                    <span class="hash-font-mono hash-text-base hash-text-gray-800">Uzun bir paragraf...</span>
                </div>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s5-arrow-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s5-arrow-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s5-arrow-3">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-sha-box hash-fade-in" id="hash-s5-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-flex-col hash-items-center hash-justify-center hash-gap-2 hash-flex-grow">
                <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s5-arrow-out-1">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s5-arrow-out-2">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
                <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s5-arrow-out-3">${
                  createIcon("ArrowRightIcon", "hash-text-white").outerHTML
                }</div>
            </div>
            <div class="hash-flex-col hash-gap-3 hash-flex-shrink-0">
                <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-slide-in-right hash-w-40" id="hash-s5-result-1">
                    <span class="hash-font-mono hash-text-xs hash-text-green-800">a1b2c3d4e5f6a1b2c3d4...</span>
                </div>
                <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-slide-in-right hash-w-40" id="hash-s5-result-2">
                    <span class="hash-font-mono hash-text-xs hash-text-green-800">b2c3d4e5f6a1b2c3d4e5f...</span>
                </div>
                <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-slide-in-right hash-w-40" id="hash-s5-result-3">
                    <span class="hash-font-mono hash-text-xs hash-text-green-800">c3d4e5f6a1b2c3d4e5f6a...</span>
                </div>
            </div>
        </div>
    `;
}

function renderScene6() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-input-group hash-slide-in-left" id="hash-s6-input-group">
                <input type="text" id="hash-s6-text-input" class="hash-text-input" placeholder="Metin girin...">
                <div class="hash-or-divider">
                    <span></span>VEYSA<span></span>
                </div>
                <label for="hash-s6-file-upload" class="hash-file-upload-label">
                    <button type="button" id="hash-s6-file-button" class="hash-button hash-outline hash-w-full">
                        ${
                          createIcon("UploadIcon", "hash-w-4 hash-h-4")
                            .outerHTML
                        }
                        <span>Dosya Yükle</span>
                    </button>
                    <input id="hash-s6-file-upload" type="file" class="hash-sr-only">
                </label>
                <button id="hash-s6-hash-button" class="hash-button hash-w-full hash-bg-blue-600">Hashle</button>
            </div>
            <div class="hash-arrow hash-gray hash-scale-x-in" id="hash-s6-arrow-in">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-sha-box hash-fade-in" id="hash-s6-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-arrow hash-gray hash-scale-x-in" id="hash-s6-arrow-out">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-box hash-slide-in-right hash-w-48 hash-h-24" id="hash-s6-result-box">
                <span class="hash-text-gray-500 hash-text-sm" id="hash-s6-result-text">Sonuç bekleniyor</span>
            </div>
        </div>
    `;

  const textInput = document.getElementById("hash-s6-text-input");
  const fileInput = document.getElementById("hash-s6-file-upload");
  const fileButton = document.getElementById("hash-s6-file-button");
  const hashButton = document.getElementById("hash-s6-hash-button");
  const resultText = document.getElementById("hash-s6-result-text");
  const arrowIn = document.getElementById("hash-s6-arrow-in");
  const arrowOut = document.getElementById("hash-s6-arrow-out");

  textInput.value = hashState.userInput;

  const updateHashButtonState = () => {
    const isDisabled =
      hashState.hashing || (!textInput.value && !fileInput.files.length);
    hashButton.disabled = isDisabled;
    textInput.disabled = hashState.hashing || fileInput.files.length > 0;
    fileInput.disabled = hashState.hashing || textInput.value.length > 0;
    fileButton.disabled = hashState.hashing || textInput.value.length > 0;
  };

  textInput.addEventListener("input", () => {
    hashState.userInput = textInput.value;
    if (textInput.value) {
      fileInput.value = "";
      fileButton.querySelector("span").textContent = "Dosya Yükle";
    }
    updateHashButtonState();
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      fileButton.querySelector("span").textContent =
        fileInput.files[0].name.substring(0, 15) + "...";
      textInput.value = "";
      hashState.userInput = "";
    } else {
      fileButton.querySelector("span").textContent = "Dosya Yükle";
    }
    updateHashButtonState();
  });

  hashButton.addEventListener("click", async () => {
    hashState.hashing = true;
    updateHashButtonState();
    resultText.innerHTML = `${
      createIcon(
        "SparklesIcon",
        "hash-w-5 hash-h-5 hash-text-yellow-500 hash-spinner"
      ).outerHTML
    }<span class="hash-text-sm">Hesaplanıyor...</span>`;
    resultText.classList.add("hash-flex", "hash-items-center", "hash-gap-2");

    arrowIn.classList.remove("hash-gray");
    arrowIn.classList.add("hash-blue");
    arrowOut.classList.remove("hash-gray");
    arrowOut.classList.add("hash-green");

    let inputData;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = async (e) => {
        inputData = e.target.result;
        hashState.hashResult = await sha256(inputData);
        hashState.hashing = false;
        updateHashButtonState();
        resultText.innerHTML = `<span class="hash-font-mono hash-text-xs hash-text-green-800 hash-break-all">${hashState.hashResult.substring(
          0,
          20
        )}...</span>`;
        resultText.classList.remove(
          "hash-flex",
          "hash-items-center",
          "hash-gap-2"
        );
        setTimeout(() => hashAnimationComplete(), 2000);
      };
      reader.readAsArrayBuffer(file);
    } else if (textInput.value) {
      inputData = textInput.value;
      hashState.hashResult = await sha256(inputData);
      hashState.hashing = false;
      updateHashButtonState();
      resultText.innerHTML = `<span class="hash-font-mono hash-text-xs hash-text-green-800 hash-break-all">${hashState.hashResult.substring(
        0,
        20
      )}...</span>`;
      resultText.classList.remove(
        "hash-flex",
        "hash-items-center",
        "hash-gap-2"
      );
      setTimeout(() => hashAnimationComplete(), 2000);
    }
  });
  updateHashButtonState();
}

function renderScene7() {
  hashAnimationArea.innerHTML = `
        <div class="hash-scene-content">
            <div class="hash-box hash-w-40 hash-slide-in-left" id="hash-s7-input">
                <span class="hash-font-mono hash-text-sm hash-text-gray-800 hash-break-all">${
                  hashState.userInput || "blockchain"
                }</span>
            </div>
            <div class="hash-arrow hash-blue hash-scale-x-in" id="hash-s7-arrow-in">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-sha-box hash-fade-in" id="hash-s7-sha-box">
                ${createIcon("HashIcon", "hash-icon-purple").outerHTML}
                <span class="hash-font-bold hash-text-base hash-text-purple-800 hash-mt-1">SHA-256()</span>
            </div>
            <div class="hash-arrow hash-green hash-scale-x-in" id="hash-s7-arrow-out">${
              createIcon("ArrowRightIcon", "hash-text-white").outerHTML
            }</div>
            <div class="hash-box hash-bg-green-100 hash-border-green-300 hash-shimmer hash-w-64" id="hash-s7-result">
                <span class="hash-font-mono hash-text-xs hash-text-green-800 hash-break-all">${
                  hashState.hashResult ||
                  "e5f6g7h8a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6"
                }</span>
            </div>
        </div>
    `;
}

const hashScenes = [
  {
    id: 1,
    modalTitle: "VERİ TÜRLERİ ve HASH KUTUSU",
    modalDescription:
      "Müzik, metin, kod ya da görsel… SHA-256 tüm verileri işleyebilir.",
    render: renderScene1,
    animate: animateScene1,
  },
  {
    id: 2,
    modalTitle: "TEK YÖNLÜLÜK",
    modalDescription:
      "Hash sadece ileriye çalışır. Hash sonucu geri çözülemez.",
    render: renderScene2,
    animate: animateScene2,
  },
  {
    id: 3,
    modalTitle: "AYNI VERİ = AYNI HASH",
    modalDescription:
      "Aynı veri → aynı çıktı. Bu özellik, veri doğrulamada kullanılır.",
    render: renderScene3,
    animate: animateScene3,
  },
  {
    id: 4,
    modalTitle: "HASSASİYET (ÇIĞ ETKİSİ)",
    modalDescription: "Küçük bir fark → tamamen farklı bir hash!",
    render: renderScene4,
    animate: animateScene4,
  },
  {
    id: 5,
    modalTitle: "SABİT UZUNLUK",
    modalDescription: "Girdi boyutu ne olursa olsun, çıktı hep 64 karakterdir.",
    render: renderScene5,
    animate: animateScene5,
  },
  {
    id: 6,
    modalTitle: "İNTERAKTİF GİRİŞ – SEN DE DENE",
    modalDescription:
      "Şimdi sıra sende. Kendi verini gir ve nasıl bir çıktı oluştuğunu gör.",
    render: renderScene6,
    animate: animateScene6,
  },
  {
    id: 7,
    modalTitle: "SONUÇ GÖRSELLEŞMESİ",
    modalDescription: "Girdiğin verinin dijital parmak izi işte burada!",
    render: renderScene7,
    animate: animateScene7,
  },
];

function animateScene1() {
  const icons = [];
  for (let i = 0; i < 4; i++)
    icons.push(document.getElementById(`hash-s1-icon-${i}`));
  const arrows = [];
  for (let i = 0; i < 4; i++)
    arrows.push(document.getElementById(`hash-s1-arrow-${i}`));
  const shaBox = document.getElementById("hash-s1-sha-box");
  const finalArrow = document.getElementById("hash-s1-final-arrow");
  const resultBox = document.getElementById("hash-s1-result-box");

  icons.forEach((el, i) => animateElement(el, "hash-active", i * 200 + 200));
  arrows.forEach((el, i) => animateElement(el, "hash-active", i * 200 + 700));
  animateElement(shaBox, "hash-active", 1000);
  animateElement(finalArrow, "hash-active", 2000);
  animateElement(resultBox, "hash-active", 2500);

  setTimeout(hashAnimationComplete, 4000);
}

function animateScene2() {
  const input = document.getElementById("hash-s2-input");
  const arrowIn = document.getElementById("hash-s2-arrow-in");
  const shaBox = document.getElementById("hash-s2-sha-box");
  const arrowOut = document.getElementById("hash-s2-arrow-out");
  const result = document.getElementById("hash-s2-result");

  animateElement(input, "hash-active", 0);
  animateElement(arrowIn, "hash-active", 500);
  animateElement(shaBox, "hash-active", 1000);
  animateElement(arrowOut, "hash-active", 1800);
  animateElement(result, "hash-active", 2300);

  setTimeout(hashAnimationComplete, 3500);
}

function animateScene3() {
  const input1 = document.getElementById("hash-s3-input-1");
  const input2 = document.getElementById("hash-s3-input-2");
  const arrow1 = document.getElementById("hash-s3-arrow-1");
  const arrow2 = document.getElementById("hash-s3-arrow-2");
  const shaBox = document.getElementById("hash-s3-sha-box");
  const arrowOut = document.getElementById("hash-s3-arrow-out");
  const result = document.getElementById("hash-s3-result");
  const consistencyText = document.getElementById("hash-s3-consistency");

  animateElement(input1, "hash-active", 0);
  animateElement(input2, "hash-active", 200);
  animateElement(arrow1, "hash-active", 500);
  animateElement(arrow2, "hash-active", 700);
  animateElement(shaBox, "hash-active", 1000);
  animateElement(arrowOut, "hash-active", 1500);
  animateElement(result, "hash-active", 2000);

  setTimeout(() => {
    if (result) result.classList.add("hash-glow");
    if (consistencyText) consistencyText.classList.remove("hash-hidden");
    animateElement(consistencyText, "hash-active", 0);
  }, 2500);

  setTimeout(hashAnimationComplete, 4500);
}

function animateScene4() {
  const input1 = document.getElementById("hash-s4-input-1");
  const input2 = document.getElementById("hash-s4-input-2");
  const arrow1 = document.getElementById("hash-s4-arrow-1");
  const arrow2 = document.getElementById("hash-s4-arrow-2");
  const shaBox = document.getElementById("hash-s4-sha-box");
  const arrowOut1 = document.getElementById("hash-s4-arrow-out-1");
  const arrowOut2 = document.getElementById("hash-s4-arrow-out-2");
  const result1 = document.getElementById("hash-s4-result-1");
  const result2 = document.getElementById("hash-s4-result-2");
  const ball = document.getElementById("hash-s4-ball");

  animateElement(input1, "hash-active", 0);
  animateElement(input2, "hash-active", 200);
  animateElement(arrow1, "hash-active", 500);
  animateElement(arrow2, "hash-active", 700);
  animateElement(shaBox, "hash-active", 1000);
  animateElement(arrowOut1, "hash-active", 1500);
  animateElement(arrowOut2, "hash-active", 1700);
  animateElement(result1, "hash-active", 2000);
  animateElement(result2, "hash-active", 2200);

  setTimeout(() => {
    if (ball) {
      ball.classList.remove("hash-hidden");
      ball.classList.add("hash-jump-ball");
    }
  }, 2500);

  setTimeout(hashAnimationComplete, 4500);
}

function animateScene5() {
  const inputs = [];
  for (let i = 1; i <= 3; i++)
    inputs.push(document.getElementById(`hash-s5-input-${i}`));
  const arrowsIn = [];
  for (let i = 1; i <= 3; i++)
    arrowsIn.push(document.getElementById(`hash-s5-arrow-${i}`));
  const shaBox = document.getElementById("hash-s5-sha-box");
  const arrowsOut = [];
  for (let i = 1; i <= 3; i++)
    arrowsOut.push(document.getElementById(`hash-s5-arrow-out-${i}`));
  const results = [];
  for (let i = 1; i <= 3; i++)
    results.push(document.getElementById(`hash-s5-result-${i}`));

  inputs.forEach((el, i) => animateElement(el, "hash-active", i * 200));
  arrowsIn.forEach((el, i) => animateElement(el, "hash-active", i * 200 + 700));
  animateElement(shaBox, "hash-active", 1400);
  arrowsOut.forEach((el, i) =>
    animateElement(el, "hash-active", i * 200 + 1800)
  );
  results.forEach((el, i) => animateElement(el, "hash-active", i * 200 + 2000));

  setTimeout(hashAnimationComplete, 4000);
}

function animateScene6() {
  const inputGroup = document.getElementById("hash-s6-input-group");
  const arrowIn = document.getElementById("hash-s6-arrow-in");
  const shaBox = document.getElementById("hash-s6-sha-box");
  const arrowOut = document.getElementById("hash-s6-arrow-out");
  const resultBox = document.getElementById("hash-s6-result-box");

  animateElement(inputGroup, "hash-active", 0);
  animateElement(arrowIn, "hash-active", 500);
  animateElement(shaBox, "hash-active", 1000);
  animateElement(arrowOut, "hash-active", 1500);
  animateElement(resultBox, "hash-active", 1000);
}

function animateScene7() {
  const input = document.getElementById("hash-s7-input");
  const arrowIn = document.getElementById("hash-s7-arrow-in");
  const shaBox = document.getElementById("hash-s7-sha-box");
  const arrowOut = document.getElementById("hash-s7-arrow-out");
  const result = document.getElementById("hash-s7-result");

  animateElement(input, "hash-active", 0);
  animateElement(arrowIn, "hash-active", 500);
  animateElement(shaBox, "hash-active", 1000);
  animateElement(arrowOut, "hash-active", 1800);
  animateElement(result, "hash-active", 2300);

  setTimeout(hashAnimationComplete, 3500);
}

function showModal() {
  const currentScene = hashScenes[hashState.currentSceneIndex];
  hashModalTitle.textContent = currentScene.modalTitle;
  hashModalDescription.textContent = currentScene.modalDescription;
  hashModal.classList.remove("hash-hidden");
}

function hideModal() {
  hashModal.classList.add("hash-hidden");
}

function hashAnimationComplete() {
  hashState.animationPlaying = false;
  if (hashState.currentSceneIndex < hashScenes.length - 1) {
    hashState.currentSceneIndex++;
    showModal();
    renderCurrentScene();
  } else {
    console.log("Animasyon dizisi tamamlandı!");
  }
}

function renderCurrentScene() {
  const currentScene = hashScenes[hashState.currentSceneIndex];
  currentScene.render();
  const elementsToAnimate = hashAnimationArea.querySelectorAll(
    ".hash-slide-in-left, .hash-slide-in-right, .hash-fade-in, .hash-scale-x-in, .hash-jump-ball, .hash-glow"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.remove("hash-active");

    el.classList.remove("hash-jump-ball");
    el.classList.remove("hash-glow");

    if (el.id === "hash-s3-consistency") {
      el.classList.add("hash-hidden");
    }

    if (el.id === "hash-s4-ball") {
      el.classList.add("hash-hidden");
    }
  });
}

function startCurrentSceneAnimation() {
  hideModal();
  hashState.animationPlaying = true;
  const currentScene = hashScenes[hashState.currentSceneIndex];
  currentScene.animate();
}

hashModalContinueBtn.addEventListener("click", () => {
  startCurrentSceneAnimation();
});

document.addEventListener("DOMContentLoaded", () => {
  showModal();
  renderCurrentScene();
  if (hashState.currentSceneIndex === 6 && !hashState.userInput) {
    sha256("blockchain").then((hash) => {
      hashState.hashResult = hash;
      hashState.userInput = "blockchain";
    });
  }
});
