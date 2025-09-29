document.addEventListener("DOMContentLoaded", () => {
  const blockSceneContainer = document.getElementById("block-scene-container");
  const blockModal = document.getElementById("block-modal");
  const blockModalText = document.getElementById("block-modal-text");
  const blockContinueButton = document.getElementById("block-continue-button");
  const blockBottomInfoTextElement = document.getElementById(
    "block-bottom-info-text"
  );

  let blockCurrentScene = 0;
  let blockIsModalShowing = true;

  const blockModalContents = {
    0: "🧱 Blok, bilgileri güvenli bir şekilde saklayan dijital bir kutudur. Dağınık bilgiler anlamsızken, doğru şekilde düzenlendiğinde değer kazanır.",
    1: "🧾 Bir market fişi de bir blok gibidir. Ne aldın? Ne zaman? Hangi fiş numarası? Tüm bu bilgiler fiş üzerinde yazılıdır ve değiştirilemez bir kayıttır.",
    2: "Her blok, sadece bir numara ve veri yığını değildir; onu tanımlayan ve blockchain'deki yerini belirleyen benzersiz parçalardan oluşur. Şimdi bu temel bileşenleri yakından inceleyelim. Her bir parça, blokların güvenliğini ve zincirin bütünlüğünü sağlamada kritik bir rol oynar.",
    3: "Tebrikler! Blockchain'in temel yapı taşlarını öğrendiniz. Bu animasyon, blokların nasıl çalıştığını ve neden bu kadar güvenli olduklarını anlamanıza yardımcı oldu.",
  };

  const blockBottomTexts = {
    1: "> Bilgiler artık bir blokta saklanıyor.",
    2: "> Bu fiş, bir blok gibidir.",
    3: "Tüm bu parçalar bir araya geldiğinde bir blok oluşur. Ve bu yapı, blockchain’in değiştirilemezliğini sağlar.",
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  function showModal(content) {
    blockModalText.textContent = content;
    blockModal.classList.add("block-show");
    blockIsModalShowing = true;
  }

  function hideModal() {
    blockModal.classList.remove("block-show");
    blockIsModalShowing = false;
  }

  function showBottomInfoText(text) {
    blockBottomInfoTextElement.textContent = text;
    blockBottomInfoTextElement.classList.add("block-show");
  }

  function hideBottomInfoText() {
    blockBottomInfoTextElement.classList.remove("block-show");
  }

  blockContinueButton.addEventListener("click", () => {
    hideModal();
    hideBottomInfoText();
    blockModal.addEventListener(
      "transitionend",
      () => {
        if (!blockIsModalShowing) {
          blockCurrentScene++;
          startScene(blockCurrentScene);
        }
      },
      { once: true }
    );
  });

  async function startScene(sceneNum) {
    blockSceneContainer.innerHTML = "";
    await delay(50);

    let scenePromise;
    switch (sceneNum) {
      case 1:
        scenePromise = renderScene1();
        break;
      case 2:
        scenePromise = renderScene2();
        break;
      case 3:
        scenePromise = renderScene3();
        break;
      default:
        return;
    }
    await scenePromise;

    if (blockBottomTexts[sceneNum]) {
      showBottomInfoText(blockBottomTexts[sceneNum]);
    }
    await delay(2000);
    if (blockModalContents[sceneNum]) {
      showModal(blockModalContents[sceneNum]);
    }
  }

  async function renderScene1() {
    const bubbleData = [
      { id: 1, text: "Ali → Ayşe 10₺", x: -150, y: -80 },
      { id: 2, text: "fotoğraf.jpg", x: 100, y: -120 },
      { id: 3, text: "ödev.docx", x: -80, y: 100 },
    ];

    const bubbles = bubbleData.map((data) => {
      const bubble = document.createElement("div");
      bubble.className = "block-bubble";
      bubble.textContent = data.text;
      bubble.style.transform = `translate(${data.x}px, ${data.y}px)`;
      blockSceneContainer.appendChild(bubble);
      return bubble;
    });

    const block = document.createElement("div");
    block.className = "block-scene1-block";
    const blockText = document.createElement("div");
    blockText.className = "block-scene1-block-text";
    blockText.textContent = "BLOK";
    block.appendChild(blockText);
    blockSceneContainer.appendChild(block);

    await delay(500);
    bubbles.forEach((b) => b.classList.add("block-appear"));
    await delay(1500);
    block.classList.add("block-appear");
    await delay(1000);
    bubbles.forEach((b) => b.classList.add("block-move"));
    await delay(2000);
    block.classList.add("block-locked");
    blockText.classList.add("block-show");
    await delay(500);
  }

  async function renderScene2() {
    const invoice = document.createElement("div");
    invoice.className = "block-invoice";
    invoice.innerHTML = `
      <div class="block-invoice-title">MARKET FİŞİ</div>
      <div class="flex-grow space-y-3">
        <div class="flex items-center justify-between">
          <span class="font-semibold">Tarih:</span>
          <span>08.08.2025</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-semibold">Saat:</span>
          <span>14:37</span>
        </div>
        <div class="block-invoice-divider"></div>
        <div class="block-invoice-section">
          <div class="block-invoice-section-title">Ürünler:</div>
          <p id="block-invoice-data" class="block-invoice-item">🛒 Süt, Ekmek, Yumurta</p>
        </div>
        <div class="block-invoice-section">
          <div class="block-invoice-section-title">Zaman Damgası:</div>
          <p id="block-invoice-time" class="block-invoice-item">⏰ 08.08.2025 - 14:37</p>
        </div>
        <div class="block-invoice-section">
          <div class="block-invoice-section-title">Fiş No (Kimlik):</div>
          <p id="block-invoice-hash" class="block-invoice-item">🔢 #8342751</p>
        </div>
      </div>
      <div class="block-invoice-divider"></div>
      <div class="block-invoice-footer">Teşekkür ederiz!</div>
    `;
    blockSceneContainer.appendChild(invoice);

    const dataLabel = document.createElement("div");
    dataLabel.className = "block-invoice-label block-data";
    dataLabel.textContent = "Etiket: Veri";
    invoice.appendChild(dataLabel);

    const timeLabel = document.createElement("div");
    timeLabel.className = "block-invoice-label block-time";
    timeLabel.textContent = "Etiket: Zaman Damgası";
    invoice.appendChild(timeLabel);

    const hashLabel = document.createElement("div");
    hashLabel.className = "block-invoice-label block-hash";
    hashLabel.textContent = "Etiket: Kimlik (Hash)";
    invoice.appendChild(hashLabel);

    const invoiceFrame = document.createElement("div");
    invoiceFrame.className = "block-invoice-frame";
    blockSceneContainer.appendChild(invoiceFrame);

    await delay(500);
    invoice.classList.add("block-appear");
    await delay(1000);
    document.getElementById("block-invoice-data").classList.add("block-show");
    dataLabel.classList.add("block-show");
    await delay(1000);
    document.getElementById("block-invoice-time").classList.add("block-show");
    timeLabel.classList.add("block-show");
    await delay(1000);
    document.getElementById("block-invoice-hash").classList.add("block-show");
    hashLabel.classList.add("block-show");
    await delay(1000);
    invoiceFrame.classList.add("block-show");
    await delay(500);
  }

  async function renderScene3() {
    const scene3Container = document.createElement("div");
    scene3Container.className = "block-scene3-container";
    blockSceneContainer.appendChild(scene3Container);

    const sections = [
      {
        id: "blockNumber",
        label: "Block No",
        content: "# 1",
        description:
          "Bu, bloğun zincirdeki sırasını gösterir. Her blok, kendinden önceki bloğa bu numara ile bağlanır.",
        type: "input",
      },
      {
        id: "nonce",
        label: "Nonce",
        content: "72608",
        description:
          "Geçerli bir blok hash'i üretmek için madencilik sürecinde bulunan rastgele sayıdır.",
        type: "input",
      },
      {
        id: "data",
        label: "Veri",
        content: "Ali, Ayşe’ye 10₺ gönderdi",
        description:
          'Bu blokta saklanan tüm işlemler veya bilgiler burada yer alır. Örneğin: "Ali, Ayşe’ye 10₺ gönderdi" gibi.',
        type: "textarea",
      },
      {
        id: "hash",
        label: "Hash",
        content:
          "0000f727854b50bb95c054b39c1fe5c92e5ebcfa4bcb5dc279f56aa96a365e5a",
        fullContent:
          "0000f727854b50bb95c054b39c1fe5c92e5ebcfa4bcb5dc279f56aa96a365e5a",
        description:
          "Blok içeriğinden üretilen eşsiz dijital kimliktir. İçerik değişirse bu değer de anında değişir, bu da güvenliği sağlar.",
        type: "input",
      },
    ];

    const blockFormContainer = document.createElement("div");
    blockFormContainer.className = "block-form-container";
    blockFormContainer.innerHTML = `<h2 class="block-form-title">Block</h2>`;
    scene3Container.appendChild(blockFormContainer);

    const descriptionPanel = document.createElement("div");
    descriptionPanel.className = "block-description-panel";
    scene3Container.appendChild(descriptionPanel);

    const inputWrappers = {};
    const hashCheckIcon = document.createElement("div");

    sections.forEach((section) => {
      const formGroup = document.createElement("div");
      formGroup.className = "block-form-group";

      const label = document.createElement("label");
      label.textContent = section.label + ":";
      formGroup.appendChild(label);

      const inputWrapper = document.createElement("div");
      inputWrapper.className = "block-form-input-wrapper";
      inputWrappers[section.id] = inputWrapper;

      let inputElement;
      if (section.type === "textarea") {
        inputElement = document.createElement("textarea");
        inputElement.className = "block-form-input block-form-textarea";
      } else {
        inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "block-form-input";
      }
      inputElement.readOnly = true;
      inputElement.value = section.content;
      inputElement.id = `block-input-${section.id}`;
      inputWrapper.appendChild(inputElement);
      formGroup.appendChild(inputWrapper);
      blockFormContainer.appendChild(formGroup);

      if (section.id === "hash") {
        hashCheckIcon.className = "block-hash-check-icon";
        hashCheckIcon.innerHTML = "&#10004;";
        inputWrapper.appendChild(hashCheckIcon);
      }
    });

    const mineButton = document.createElement("button");
    mineButton.className = "block-mine-button";
    mineButton.textContent = "Mine";
    blockFormContainer.appendChild(mineButton);

    await delay(500);
    blockFormContainer.classList.add("block-appear");
    await delay(1000);

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const inputWrapper = inputWrappers[section.id];
      const inputElement = document.getElementById(`block-input-${section.id}`);

      inputWrapper.classList.add("block-active");
      if (section.id === "data") {
        inputWrapper.classList.add("block-data");
      }

      descriptionPanel.innerHTML = `<h3>${section.label}:</h3><p>${section.description}</p>`;
      descriptionPanel.classList.add("block-show");

      if (section.id === "hash") {
        await delay(500);
        inputElement.value = section.fullContent;
        hashCheckIcon.classList.add("block-show");
      }

      await delay(3000);

      inputWrapper.classList.remove("block-active");
      if (section.id === "data") {
        inputWrapper.classList.remove("block-data");
      }
      descriptionPanel.classList.remove("block-show");
      if (section.id === "hash") {
        hashCheckIcon.classList.remove("block-show");
        inputElement.value = section.content;
      }
    }
    await delay(500);
  }

  showModal(blockModalContents[0]);
});
