document.addEventListener("DOMContentLoaded", () => {
  const animationContainer = document.getElementById("animation-container");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalContinueBtn = document.getElementById("modal-continue-btn");

  const scenes = {
    scene1: {
      element: document.getElementById("scene1"),
      modal: {
        title: "SAHNE 1 — Bloktan Blockchain'e Geçiş",
        description:
          '🧱 "Bir önceki animasyonda, blok kavramını öğrenmiştik. Her blok, belirli bir veri kümesini içinde tutan, kimliği hash ile tanımlanan dijital bir kutuydu. Şimdi bu kutuların nasıl bir araya geldiğini görelim."',
      },
      animation: animateScene1,
      footer: "📌 “İşte bu yapıya Blockchain, yani Blok Zinciri denir.”",
    },
    scene2: {
      element: document.getElementById("scene2"),
      modal: {
        title: "SAHNE 2 — Genesis Block – İlk Blok",
        description:
          "🌱 “Her blockchain’in bir başlangıç noktası vardır. İlk oluşturulan bloğa Genesis Block denir. Bu blok, sistemin temeli gibidir. Hiçbir önceki bloğa bağlı değildir ve sıfırdan başlar.”",
      },
      animation: animateScene2,
      footer:
        "📌 “Genesis Block olmadan bir blockchain var olamaz. O, zincirin ilk halkasıdır.”",
    },
    scene3: {
      element: document.getElementById("scene3"),
      modal: {
        title: "SAHNE 3 — Madencilik (Mining) – Ayrıntılı Anlatım",
        description:
          "⛏️ “Yeni bloklar, özel bir işlemle zincire eklenir: Madencilik. Madenciler, belirli bir hash kriterini sağlayacak çözümü bulana kadar deneme yaparlar. Bu sürece ‘iş ispatı’ (Proof of Work) denir.”",
      },
      animation: animateScene3,
      footer:
        "📌 “Madencilik, sistemin adil, güvenli ve kurallı çalışmasını sağlar.”",
    },
    scene4: {
      element: document.getElementById("scene4"),
      modal: {
        title: "SAHNE 4 — Blockchain'i Zincir Yapan Kurallar – Derinleştirme",
        description:
          "⚙️ “Her blok zincire eklenmeden önce bazı kurallardan geçmelidir: Önceki bloğun hash’i doğru girilmiş mi? Oluşturulan hash, zorluk seviyesini sağlıyor mu? Ağın büyük çoğunluğu bu bloğu onaylıyor mu? (konsensüs)”",
      },
      animation: animateScene4,
      footer:
        "📌 “Blockchain’de hiçbir blok tek başına eklenemez. Güvenlik, ağın kolektif onayıyla sağlanır.”",
    },
    scene5: {
      element: document.getElementById("scene5"),
      modal: {
        title: "SAHNE 5 — Blockchain Tanımı – Artık Anlıyoruz",
        description:
          "🧠 “Artık tüm parçalar yerine oturdu. Blockchain; ✔️ Verilerin bloklara yazıldığı, ✔️ Bu blokların hash’lerle birbirine bağlandığı, ✔️ Yeni blokların madencilikle eklendiği, ✔️ Ağ tarafından doğrulandığı ve ✔️ Geriye dönük değiştirilemeyen bir dijital kayıt sistemidir.”",
      },
      animation: animateScene5,
      footer:
        "📌 “Blockchain yalnızca teknoloji değil, güvenin dijital mimarisidir.”",
    },
  };

  let currentSceneIndex = 0;
  const sceneKeys = Object.keys(scenes);

  function showScene(index) {
    if (index >= sceneKeys.length) {
      console.log("Tüm sahneler tamamlandı!");
      return;
    }

    const sceneKey = sceneKeys[index];
    const scene = scenes[sceneKey];

    Object.values(scenes).forEach((s) => s.element.classList.remove("active"));

    scene.element.classList.add("active");

    modalTitle.textContent = scene.modal.title;
    modalDescription.innerHTML = scene.modal.description;
    modalOverlay.classList.remove("hidden");

    scene.element.querySelector(".footer-text").textContent = scene.footer;

    modalContinueBtn.onclick = () => {
      modalOverlay.classList.add("hidden");
      scene.animation(scene.element);
    };
  }

  function nextScene() {
    currentSceneIndex++;
    showScene(currentSceneIndex);
  }

  function animateScene1(sceneElement) {
    const blockText1 = sceneElement.querySelector("#block-text-1");
    const block1 = sceneElement.querySelector("#block-s1-1");
    const block2 = sceneElement.querySelector("#block-s1-2");
    const block3 = sceneElement.querySelector("#block-s1-3");
    const block4 = sceneElement.querySelector("#block-s1-4");
    const link1 = sceneElement.querySelector("#link-s1-1");
    const link2 = sceneElement.querySelector("#link-s1-2");
    const link3 = sceneElement.querySelector("#link-s1-3");
    const footer = sceneElement.querySelector("#footer-s1");

    blockText1.style.cssText = `top: 150px; left: 50%; transform: translateX(-50%); opacity: 0;`;
    block1.style.cssText = `top: 200px; left: 30px; opacity: 0;`;
    block2.style.cssText = `top: 200px; left: 200px; opacity: 0;`;
    block3.style.cssText = `top: 200px; left: 370px; opacity: 0;`;
    block4.style.cssText = `top: 200px; left: 540px; opacity: 0;`;
    link1.style.cssText = `left: 170px; top: 260px; width: 0px; opacity: 0;`;
    link2.style.cssText = `left: 340px; top: 260px; width: 0px; opacity: 0;`;
    link3.style.cssText = `left: 510px; top: 260px; width: 0px; opacity: 0;`;
    footer.style.opacity = 0;

    setTimeout(() => {
      blockText1.style.transition = "opacity 0.8s ease";
      blockText1.style.opacity = 1;
      block1.style.transition = "opacity 0.8s ease";
      block1.style.opacity = 1;
    }, 300);

    setTimeout(() => {
      blockText1.style.transition = "opacity 0.8s ease";
      blockText1.style.opacity = 0;
    }, 2500);

    setTimeout(() => {
      block2.style.transition = "opacity 0.8s ease, left 0.8s ease";
      block2.style.opacity = 1;
      link1.style.transition = "opacity 0.8s ease, width 0.8s ease";
      link1.style.opacity = 1;
      link1.style.width = "30px";
    }, 3500);

    setTimeout(() => {
      block3.style.transition = "opacity 0.8s ease, left 0.8s ease";
      block3.style.opacity = 1;
      link2.style.transition = "opacity 0.8s ease, width 0.8s ease";
      link2.style.opacity = 1;
      link2.style.width = "30px";
    }, 5000);

    setTimeout(() => {
      block4.style.transition = "opacity 0.8s ease, left 0.8s ease";
      block4.style.opacity = 1;
      link3.style.transition = "opacity 0.8s ease, width 0.8s ease";
      link3.style.opacity = 1;
      link3.style.width = "30px";
    }, 6500);

    setTimeout(() => {
      footer.style.transition = "opacity 0.8s ease";
      footer.style.opacity = 1;
    }, 8000);

    setTimeout(nextScene, 10000);
  }

  function animateScene2(sceneElement) {
    const genesisBlock = sceneElement.querySelector("#genesis-block-s2");
    const genesisInfoBox = sceneElement.querySelector("#genesis-info-box");
    const footer = sceneElement.querySelector("#footer-s2");
    const topChainContainer = sceneElement.querySelector(
      ".top-chain-container"
    );
    const topChainBlocks = Array.from(
      sceneElement.querySelectorAll(".top-chain-block")
    );
    const topChainLinks = Array.from(
      sceneElement.querySelectorAll(".top-chain-link")
    );

    genesisBlock.style.cssText = `top: 80px; left: 100px; transform: translate(-50%, -50%) scale(0.8); opacity: 0;`;
    Array.from(genesisBlock.children).forEach(
      (child) => (child.style.opacity = 0)
    );
    genesisInfoBox.style.opacity = 0;
    footer.style.opacity = 0;
    topChainContainer.style.opacity = 0;
    topChainBlocks.forEach((b) => {
      b.style.opacity = 0;
      b.style.borderColor = "#555";
      b.style.boxShadow = "none";
    });
    topChainLinks.forEach((l) => (l.style.opacity = 0));

    setTimeout(() => {
      topChainContainer.style.transition = "opacity 0.8s ease";
      topChainContainer.style.opacity = 1;
      topChainBlocks.forEach((block, i) => {
        setTimeout(() => {
          block.style.transition = "opacity 0.5s ease";
          block.style.opacity = 1;
        }, i * 100);
      });
      topChainLinks.forEach((link, i) => {
        setTimeout(() => {
          link.style.transition = "opacity 0.5s ease";
          link.style.opacity = 1;
        }, i * 100 + 50);
      });
    }, 300);

    setTimeout(() => {
      genesisBlock.style.transition =
        "opacity 1.2s ease, top 1.2s ease, left 1.2s ease, transform 1.2s ease";
      genesisBlock.style.opacity = 1;
      genesisBlock.style.top = "50%";
      genesisBlock.style.left = "50%";
      genesisBlock.style.transform = "translate(-50%, -50%) scale(1.2)";

      const firstTopBlock = topChainBlocks[0];
      if (firstTopBlock) {
        firstTopBlock.style.transition =
          "border-color 0.5s ease, box-shadow 0.5s ease";
        firstTopBlock.style.borderColor = "#ffc107";
        firstTopBlock.style.boxShadow = "0 0 10px rgba(255, 193, 7, 0.5)";
      }
    }, 2500);

    setTimeout(() => {
      genesisBlock.style.transition = "transform 0.8s ease";
      genesisBlock.style.transform = "translate(-50%, -50%) scale(1)";
      genesisBlock.style.borderTop = "5px solid #4CAF50";
      genesisBlock.style.borderBottom = "5px solid #4CAF50";

      const children = Array.from(genesisBlock.children);
      children.forEach((child, i) => {
        setTimeout(() => {
          child.style.opacity = 1;
        }, i * 600);
      });
    }, 4500);

    setTimeout(() => {
      genesisInfoBox.innerHTML = `
                <h3>Genesis Blok Nedir?</h3>
                <p>Her blockchain'in başlangıç noktasıdır. Zincirin ilk halkasıdır ve hiçbir önceki bloğa bağlı değildir.</p>
                <ul>
                    <li>Blok Numarası: 0</li>
                    <li>Veri: İlk işlem verisi</li>
                    <li>Önceki Hash: 0000000000... (Yok)</li>
                    <li>Kendi Hash'i: abcd1234...</li>
                </ul>
                <p>Benzersiz kimliği</p>
            `;
      genesisInfoBox.style.transition = "opacity 0.8s ease";
      genesisInfoBox.style.opacity = 1;
    }, 7500);

    setTimeout(() => {
      footer.style.transition = "opacity 0.8s ease";
      footer.style.opacity = 1;
    }, 10000);

    setTimeout(nextScene, 12000);
  }

  function animateScene3(sceneElement) {
    const miningBlockTarget = sceneElement.querySelector(
      "#mining-block-target"
    );
    const miningInfoText = sceneElement.querySelector("#mining-info-text");
    const miners = [
      sceneElement.querySelector("#miner-1"),
      sceneElement.querySelector("#miner-2"),
      sceneElement.querySelector("#miner-3"),
    ];
    const minerContainer = sceneElement.querySelector(".miner-container");
    const nonceDisplay = sceneElement.querySelector("#nonce-display");
    const hashOutput = sceneElement.querySelector("#hash-output");
    const hashDisplayContainer = sceneElement.querySelector(
      ".hash-display-container"
    );
    const miningResult = sceneElement.querySelector("#mining-result");
    const blockAddedVisual = sceneElement.querySelector("#block-added-visual");
    const footer = sceneElement.querySelector("#footer-s3");

    miningBlockTarget.style.opacity = 0;
    miningInfoText.style.opacity = 0;
    minerContainer.style.opacity = 0;
    minerContainer.style.top = "250px";
    miners.forEach((m) => {
      m.style.opacity = 0;
      m.classList.remove("active", "winner", "loser", "verified");
      m.querySelector(".miner-status").textContent = "";
    });
    hashDisplayContainer.style.opacity = 0;
    nonceDisplay.style.opacity = 0;
    hashOutput.style.opacity = 0;
    miningResult.style.opacity = 0;
    blockAddedVisual.style.opacity = 0;
    footer.style.opacity = 0;

    let hashInterval;
    let nonce = 0;
    const targetPrefix = "0000";
    let attempts = 0;
    const successAttempt = 5;

    function generateHash(input) {
      let hash = 0;
      for (let i = 0; i < input.length; i++) {
        const char = input.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      return Math.abs(hash).toString(16).padStart(8, "0");
    }

    setTimeout(() => {
      miningBlockTarget.style.transition = "opacity 0.8s ease";
      miningBlockTarget.style.opacity = 1;
      miningBlockTarget.querySelector(".block-data-content").innerHTML =
        '<img src="/placeholder.svg?height=16&width=16" alt="document icon"> Yeni İşlem Onayı';
      miningBlockTarget.querySelector("#mining-prev-hash-content").textContent =
        "abc123def456...";
      miningBlockTarget.querySelector("#mining-hash-content").textContent = "";
    }, 300);

    setTimeout(() => {
      miningInfoText.innerHTML =
        "Yeni bloklar, özel bir işlemle zincire eklenir: Madencilik. Madenciler, belirli bir hash kriterini sağlayacak çözümü bulana kadar deneme yaparlar. Bu sürece ‘iş ispatı’ (Proof of Work) denir.";
      miningInfoText.style.transition = "opacity 0.8s ease";
      miningInfoText.style.opacity = 1;
    }, 1500);

    setTimeout(() => {
      miningInfoText.style.transition = "opacity 0.8s ease";
      miningInfoText.style.opacity = 0;
    }, 5000);

    setTimeout(() => {
      minerContainer.style.transition = "opacity 0.8s ease, top 0.8s ease";
      minerContainer.style.opacity = 1;
      minerContainer.style.top = "200px";
      miners.forEach((m) => {
        m.style.transition = "opacity 0.8s ease";
        m.style.opacity = 1;
        m.classList.add("active");
        m.querySelector(".miner-status").textContent = "Çalışıyor...";
      });
    }, 6000);

    setTimeout(() => {
      hashDisplayContainer.style.transition = "opacity 0.8s ease";
      hashDisplayContainer.style.opacity = 1;
      nonceDisplay.style.opacity = 1;
      hashOutput.style.opacity = 1;

      let winnerMiner = Math.floor(Math.random() * miners.length);

      hashInterval = setInterval(() => {
        nonce++;
        let currentHash;

        if (attempts === successAttempt) {
          currentHash =
            targetPrefix +
            generateHash("forced_success").substring(targetPrefix.length);
        } else {
          currentHash = generateHash(`data${nonce}`);
        }

        nonceDisplay.textContent = `Nonce: ${nonce}`;
        hashOutput.textContent = `Hash: ${currentHash}`;

        if (attempts === successAttempt) {
          clearInterval(hashInterval);

          miners[winnerMiner].classList.remove("active");
          miners[winnerMiner].classList.add("winner");
          miners[winnerMiner].querySelector(".miner-status").textContent =
            "Doğru çözüm bulundu!";
          miners.forEach((m, i) => {
            if (i !== winnerMiner) {
              m.classList.remove("active");
              m.classList.add("loser");
              m.querySelector(".miner-status").textContent = "Vazgeçti";
            }
          });

          setTimeout(() => {
            miningResult.textContent = `Doğru çözüm bulundu! Madenci ${
              miners[winnerMiner].querySelector(".miner-name").textContent
            } bu bloğu başarıyla oluşturdu.`;
            miningResult.style.transition = "opacity 0.8s ease";
            miningResult.style.opacity = 1;
          }, 700);

          setTimeout(() => {
            miningResult.textContent = `Ödül bu madencinin! Madenci ${
              miners[winnerMiner].querySelector(".miner-name").textContent
            } bulduğu Nonce değerini ağdaki diğer kişilerle paylaştı.`;
            miners.forEach((m, i) => {
              if (i !== winnerMiner) {
                m.classList.remove("loser");
                m.classList.add("verified");
                m.querySelector(".miner-status").textContent = "Doğrulandı!";
              }
            });
          }, 3000);

          setTimeout(() => {
            miningResult.textContent = "Bu blok şu şekilde olacak:";
            miningResult.style.color = "#e0e0e0";
            miningBlockTarget.querySelector(
              "#mining-hash-content"
            ).textContent = `${currentHash}`;
            miningBlockTarget.querySelector(
              "#mining-prev-hash-content"
            ).textContent = `${nonce}`;
            miningBlockTarget.querySelector(
              "#mining-prev-hash-label"
            ).textContent = `NONCE`;
            miningBlockTarget.style.backgroundColor = "#3a4a3a";
            miningBlockTarget.style.borderColor = "#4CAF50";
            miningBlockTarget.style.opacity = 1;
            miningBlockTarget
              .querySelector("#mining-hash-content")
              .classList.add("highlight");
          }, 5500);

          setTimeout(() => {
            blockAddedVisual.style.transition =
              "opacity 1s ease, transform 1s ease";
            blockAddedVisual.style.opacity = 1;
            blockAddedVisual.style.transform = "translate(-50%, -50%) scale(1)";
            miningResult.style.opacity = 0.3;
            miningBlockTarget.style.opacity = 0.3;
            minerContainer.style.opacity = 0.3;
            hashDisplayContainer.style.opacity = 0.3;
          }, 8000);

          setTimeout(() => {
            footer.style.transition = "opacity 0.8s ease";
            footer.style.opacity = 1;
          }, 10000);

          setTimeout(nextScene, 12000);
        }
        attempts++;
      }, 200);
    }, 7000);
  }

  function animateScene4(sceneElement) {
    const prevBlock = sceneElement.querySelector("#s4-block-prev");
    const newBlock = sceneElement.querySelector("#s4-block-new");
    const blockArrow = sceneElement.querySelector(".block-arrow");

    const controlSectionsContainer = sceneElement.querySelector(
      ".control-sections-container"
    );
    const prevHashControl = sceneElement.querySelector("#prev-hash-control");
    const prevHashCheck = sceneElement.querySelector("#prev-hash-check");
    const difficultyControl = sceneElement.querySelector("#difficulty-control");
    const difficultyCheck = sceneElement.querySelector("#difficulty-check");
    const consensusControl = sceneElement.querySelector("#consensus-control");
    const nodes = Array.from(sceneElement.querySelectorAll(".node"));
    const consensusStatus = sceneElement.querySelector("#consensus-status");
    const footer = sceneElement.querySelector("#footer-s4");

    prevBlock.style.opacity = 0;
    newBlock.style.opacity = 0;
    blockArrow.style.opacity = 0;
    controlSectionsContainer.style.opacity = 0;
    prevHashControl.style.opacity = 0;
    prevHashCheck.style.opacity = 0;
    difficultyControl.style.opacity = 0;
    difficultyCheck.style.opacity = 0;
    consensusControl.style.opacity = 0;
    nodes.forEach((n) => {
      n.style.opacity = 0;
      n.classList.remove("approved", "rejected");
    });
    consensusStatus.style.opacity = 0;
    footer.style.opacity = 0;

    setTimeout(() => {
      prevBlock.style.transition = "opacity 0.8s ease";
      prevBlock.style.opacity = 1;
      newBlock.style.transition = "opacity 0.8s ease";
      newBlock.style.opacity = 1;
      blockArrow.style.transition = "opacity 0.8s ease";
      blockArrow.style.opacity = 1;
    }, 300);

    setTimeout(() => {
      controlSectionsContainer.style.transition = "opacity 0.8s ease";
      controlSectionsContainer.style.opacity = 1;
      prevHashControl.style.opacity = 1;
      difficultyControl.style.opacity = 1;
      consensusControl.style.opacity = 1;
    }, 1500);

    setTimeout(() => {
      prevHashCheck.textContent = "✅";
      prevHashCheck.style.color = "#4CAF50";
      prevHashCheck.style.opacity = 1;
      prevBlock.querySelector(".block-hash-content").classList.add("highlight");
      newBlock
        .querySelector(".block-prev-hash-content")
        .classList.add("highlight-blue");
    }, 2500);

    setTimeout(() => {
      prevBlock
        .querySelector(".block-hash-content")
        .classList.remove("highlight");
      newBlock
        .querySelector(".block-prev-hash-content")
        .classList.remove("highlight-blue");
      prevHashCheck.style.opacity = 0;

      difficultyCheck.textContent = "✅";
      difficultyCheck.style.color = "#4CAF50";
      difficultyCheck.style.opacity = 1;
      newBlock.querySelector(".block-hash-content").classList.add("highlight");
    }, 4500);

    setTimeout(() => {
      newBlock
        .querySelector(".block-hash-content")
        .classList.remove("highlight");
      difficultyCheck.style.opacity = 0;

      nodes.forEach((node, i) => {
        setTimeout(() => {
          node.style.transition = "opacity 0.5s ease";
          node.style.opacity = 1;
        }, i * 300);
      });
    }, 6500);

    setTimeout(() => {
      let approvedCount = 0;
      nodes.forEach((node, i) => {
        setTimeout(() => {
          if (i !== 3) {
            node.classList.add("approved");
            approvedCount++;
          } else {
            node.classList.add("rejected");
          }
        }, i * 500);
      });

      setTimeout(() => {
        if (approvedCount >= 3) {
          consensusStatus.textContent = "İşlem Başarılı!";
          consensusStatus.style.color = "#4CAF50";
        } else {
          consensusStatus.textContent =
            "Ağ Onayı: Reddedildi! Blok zincire eklenemedi.";
          consensusStatus.style.color = "#f44336";
        }
        consensusStatus.style.transition = "opacity 0.8s ease";
        consensusStatus.style.opacity = 1;
      }, nodes.length * 500 + 1000);
    }, 8000);

    setTimeout(() => {
      footer.style.transition = "opacity 0.8s ease";
      footer.style.opacity = 1;
    }, 11000);

    setTimeout(nextScene, 13000);
  }

  function animateScene5(sceneElement) {
    const blocks = [
      sceneElement.querySelector("#s5-block-1"),
      sceneElement.querySelector("#s5-block-2"),
      sceneElement.querySelector("#s5-block-3"),
      sceneElement.querySelector("#s5-block-4"),
    ];
    const links = [
      sceneElement.querySelector("#link-s5-1"),
      sceneElement.querySelector("#link-s5-2"),
      sceneElement.querySelector("#link-s5-3"),
    ];
    const infoBox = sceneElement.querySelector("#blockchain-info-box");
    const footer = sceneElement.querySelector("#footer-s5");

    blocks.forEach((b) => {
      b.style.opacity = 0;
      const existingCard = b.querySelector(".block-info-card");
      if (existingCard) existingCard.remove();
      b.querySelector(".block-hash-content").classList.remove("highlight");
      b.style.backgroundColor = "#2a2a4a";
    });
    links.forEach((l) => (l.style.opacity = 0));
    infoBox.style.opacity = 0;
    footer.style.opacity = 0;

    blocks.forEach((block, index) => {
      const infoCard = document.createElement("div");
      infoCard.classList.add("block-info-card");
      infoCard.textContent = `Blok #${index + 1} – İşlem: ${block
        .querySelector(".block-data-content")
        .textContent.replace("document icon", "")
        .trim()}`;
      block.appendChild(infoCard);
    });

    setTimeout(() => {
      blocks.forEach((block, i) => {
        setTimeout(() => {
          block.style.transition = "opacity 0.8s ease";
          block.style.opacity = 1;
        }, i * 800);
      });
    }, 300);

    setTimeout(() => {
      links.forEach((link, i) => {
        setTimeout(() => {
          link.style.transition = "opacity 0.8s ease, width 0.8s ease";
          link.style.opacity = 1;
          link.style.width = "20px";
        }, i * 800 + 400);
      });
    }, 300);

    setTimeout(() => {
      blocks.forEach((block, i) => {
        setTimeout(() => {
          block.style.backgroundColor = "#3a4a3a";
          block.querySelector(".block-hash-content").classList.add("highlight");
          setTimeout(() => {
            block.style.backgroundColor = "#2a2a4a";
            block
              .querySelector(".block-hash-content")
              .classList.remove("highlight");
          }, 800);
        }, i * 1200);
      });
    }, 5000);

    setTimeout(() => {
      infoBox.innerHTML = `
                <h3>Blockchain:</h3>
                <p>Artık tüm parçalar yerine oturdu.</p>
                <ul>
                    <li>Verilerin bloklara yazıldığı,</li>
                    <li>Bu blokların hash’lerle birbirine bağlandığı,</li>
                    <li>Yeni blokların madencilikle eklendiği,</li>
                    <li>Ağ tarafından doğrulandığı ve</li>
                    <li>Geriye dönük değiştirilemeyen bir dijital kayıt sistemidir.</li>
                </ul>
            `;
      infoBox.style.transition = "opacity 0.8s ease";
      infoBox.style.opacity = 1;
    }, 8000);

    setTimeout(() => {
      footer.style.transition = "opacity 0.8s ease";
      footer.style.opacity = 1;
    }, 10000);
  }

  showScene(currentSceneIndex);
});
