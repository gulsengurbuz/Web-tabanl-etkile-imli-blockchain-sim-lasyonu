document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("p2p-canvas");
  const ctx = canvas.getContext("2d");
  const modal = document.getElementById("p2p-modal");
  const modalTitle = document.getElementById("p2p-modal-title");
  const modalDescription = document.getElementById("p2p-modal-description");
  const modalButton = document.getElementById("p2p-modal-button");

  const setCanvasSize = () => {
    const container = document.querySelector(".p2p-container");
    const aspectRatio = 16 / 9;
    let width = container.offsetWidth * 0.9;
    let height = width / aspectRatio;

    if (height > container.offsetHeight * 0.9) {
      height = container.offsetHeight * 0.9;
      width = height * aspectRatio;
    }

    canvas.width = width;
    canvas.height = height;
  };

  window.addEventListener("resize", setCanvasSize);
  setCanvasSize();

  const NODE_RADIUS = Math.min(canvas.width, canvas.height) * 0.04;
  const CONNECTION_WIDTH = 2;
  const NODE_COLOR_DEFAULT = "#4CAF50";
  const NODE_COLOR_HIGHLIGHT = "#FFD700";
  const NODE_COLOR_ERROR = "#808080";
  const CONNECTION_COLOR_DEFAULT = "#00BCD4";
  const CONNECTION_COLOR_ACTIVE = "#00e6e6";
  const TEXT_COLOR = "#FFFFFF";
  const FONT_SIZE = NODE_RADIUS * 0.6;

  const nodes = [
    {
      name: "Alice",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
    {
      name: "Bob",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
    {
      name: "Charlie",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
    {
      name: "Dave",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
    {
      name: "Eve",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
    {
      name: "Frank",
      x: 0,
      y: 0,
      color: NODE_COLOR_DEFAULT,
      opacity: 0,
      scale: 0,
      label: "",
    },
  ];

  let connections = [
    {
      from: "Alice",
      to: "Bob",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Alice",
      to: "Charlie",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Alice",
      to: "Dave",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Alice",
      to: "Eve",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Alice",
      to: "Frank",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Bob",
      to: "Charlie",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Bob",
      to: "Dave",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Bob",
      to: "Eve",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Bob",
      to: "Frank",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Charlie",
      to: "Dave",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Charlie",
      to: "Eve",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Charlie",
      to: "Frank",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Dave",
      to: "Eve",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Dave",
      to: "Frank",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
    {
      from: "Eve",
      to: "Frank",
      active: false,
      color: CONNECTION_COLOR_DEFAULT,
      dashOffset: 0,
    },
  ];

  let animatedObjects = [];

  const calculateNodePositions = () => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

    nodes.forEach((node, i) => {
      const angle = (i / nodes.length) * Math.PI * 2;
      node.targetX = centerX + radius * Math.cos(angle);
      node.targetY = centerY + radius * Math.sin(angle);
      node.x = centerX;
      node.y = centerY;
    });
  };
  calculateNodePositions();

  const drawNode = (node) => {
    if (node.opacity <= 0) return;

    ctx.save();
    ctx.translate(node.x, node.y);
    ctx.scale(node.scale, node.scale);
    ctx.globalAlpha = node.opacity;

    ctx.beginPath();
    ctx.arc(0, 0, NODE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = node.color;
    ctx.fill();
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = TEXT_COLOR;
    ctx.font = `${FONT_SIZE}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.name, 0, 0);

    if (node.label) {
      ctx.font = `${FONT_SIZE * 1.2}px Arial`;
      ctx.fillStyle = node.labelColor || TEXT_COLOR;
      ctx.fillText(node.label, 0, NODE_RADIUS + FONT_SIZE * 0.8);
    }

    ctx.restore();
  };

  const drawConnection = (connection) => {
    const fromNode = nodes.find((n) => n.name === connection.from);
    const toNode = nodes.find((n) => n.name === connection.to);

    if (!fromNode || !toNode || !connection.active) return;

    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.strokeStyle = connection.color;
    ctx.lineWidth = CONNECTION_WIDTH;

    if (connection.dashOffset !== undefined) {
      const length = Math.sqrt(
        Math.pow(toNode.x - fromNode.x, 2) + Math.pow(toNode.y - fromNode.y, 2)
      );
      ctx.setLineDash([length, length]);
      ctx.lineDashOffset = connection.dashOffset;
    } else {
      ctx.setLineDash([]);
    }
    ctx.stroke();
  };

  const drawAnimatedObject = (obj) => {
    ctx.save();
    ctx.translate(obj.x, obj.y);
    ctx.globalAlpha = obj.opacity;
    ctx.scale(obj.scale, obj.scale);

    if (obj.type === "dataBlock") {
      ctx.fillStyle = obj.color;
      ctx.fillRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 1;
      ctx.strokeRect(-obj.size / 2, -obj.size / 2, obj.size, obj.size);

      ctx.fillStyle = "#FFF";
      ctx.font = `${obj.size * 0.6}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(obj.text, 0, 0);
    } else if (obj.type === "vote") {
      ctx.fillStyle = obj.color;
      ctx.font = `${obj.size}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(obj.text, 0, 0);
    } else if (obj.type === "particle") {
      ctx.fillStyle = obj.color;
      ctx.beginPath();
      ctx.arc(0, 0, obj.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  let animationFrameId;
  const animate = () => {
    clearCanvas();
    connections.forEach(drawConnection);
    nodes.forEach(drawNode);
    animatedObjects.forEach(drawAnimatedObject);
    animationFrameId = requestAnimationFrame(animate);
  };

  const showModal = (title, description, onContinue) => {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("p2p-active");
    modalButton.onclick = () => {
      hideModal();
      onContinue();
    };
  };

  const hideModal = () => {
    modal.classList.remove("p2p-active");
  };

  const findNode = (name) => nodes.find((n) => n.name === name);
  const findConnection = (from, to) =>
    connections.find(
      (c) =>
        (c.from === from && c.to === to) || (c.from === to && c.to === from)
    );

  const pulseNode = (node, color = NODE_COLOR_HIGHLIGHT) => {
    gsap.to(node, {
      duration: 0.5,
      color: color,
      scale: 1.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        gsap.to(node, { duration: 0.5, color: NODE_COLOR_DEFAULT, scale: 1 });
      },
    });
  };

  const createParticles = (x, y, count, color, radius = 3) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      const particle = {
        type: "particle",
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: radius,
        color: color,
        opacity: 1,
        life: 60,
      };
      animatedObjects.push(particle);
      gsap.to(particle, {
        duration: 1,
        x: x + particle.vx * 30,
        y: y + particle.vy * 30,
        opacity: 0,
        radius: 0,
        ease: "power1.out",
        onComplete: () => {
          animatedObjects = animatedObjects.filter((obj) => obj !== particle);
        },
      });
    }
  };

  let currentStepIndex = 0;

  const scenarioSteps = [
    {
      modalTitle: "🌐 P2P Ağına Hoş Geldiniz",
      modalDescription:
        "Bu sahnede, merkezi bir otoriteye bağlı olmayan bir Peer-to-Peer (P2P) ağı inşa ediliyor. Her düğüm, diğer düğümlerle doğrudan iletişim kurabiliyor. Bu sayede veri, tek bir noktaya bağlı kalmadan, dağıtık bir şekilde dolaşabiliyor. Böyle ağlar, hız, dayanıklılık ve güvenilirlik açısından klasik merkezi sistemlere üstünlük sağlar.",
      animation: () => {
        const tl = gsap.timeline();

        nodes.forEach((node, i) => {
          tl.to(
            node,
            {
              duration: 1.5,
              x: node.targetX,
              y: node.targetY,
              opacity: 1,
              scale: 1,
              ease: "back.out(1.7)",
            },
            i * 0.2
          );
        });

        tl.add(() => {
          connections.forEach((conn) => {
            const fromNode = findNode(conn.from);
            const toNode = findNode(conn.to);
            const length = Math.sqrt(
              Math.pow(toNode.x - fromNode.x, 2) +
                Math.pow(toNode.y - fromNode.y, 2)
            );
            conn.dashOffset = length;
            conn.active = true;
          });
        }, "+=0.5");

        connections.forEach((conn) => {
          tl.to(
            conn,
            {
              duration: 1,
              dashOffset: 0,
              ease: "power2.out",
            },
            "<0.1"
          );
        });

        return tl;
      },
    },
    {
      modalTitle: "📦 Veri Bloğu Oluşturuldu",
      modalDescription:
        "Alice düğümü, “B10” kodlu altın renkli bir veri bloğu üretti. Bu blok, ağın diğer tüm düğümlerine gönderilmek üzere hazırlanıyor. B10’un kopyalanması, tüm ağın aynı veriye sahip olmasını sağlayacak ve senkronizasyon sağlanacak.",
      animation: () => {
        const tl = gsap.timeline();
        const alice = findNode("Alice");

        tl.to(alice, {
          duration: 1,
          color: NODE_COLOR_HIGHLIGHT,
          ease: "power2.inOut",
        });
        tl.to(
          alice,
          {
            duration: 0.5,
            label: "B10",
            labelColor: NODE_COLOR_HIGHLIGHT,
            ease: "none",
          },
          "<"
        );
        tl.to(
          alice,
          {
            duration: 0.8,
            scale: 1.2,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
        return tl;
      },
    },
    {
      modalTitle: "🔄 Veri Dağıtımı Başladı",
      modalDescription:
        "B10 veri bloğu, ağdaki düğümlere sırasıyla kopyalanıyor. Her kopya başarıyla ulaştığında düğüm doğrulama işareti (✓) alır ve veri güvenliği sağlanır. Bu aşama, merkeziyetsiz veri tutarlılığının temelini oluşturur.",
      animation: () => {
        const tl = gsap.timeline();
        const alice = findNode("Alice");
        const otherNodes = nodes.filter((n) => n.name !== "Alice");

        tl.to(alice, {
          duration: 0.5,
          color: NODE_COLOR_DEFAULT,
          label: "",
          ease: "power2.inOut",
        });

        otherNodes.forEach((targetNode, i) => {
          const dataBlock = {
            type: "dataBlock",
            x: alice.x,
            y: alice.y,
            size: NODE_RADIUS * 0.8,
            color: NODE_COLOR_HIGHLIGHT,
            text: "B10",
            opacity: 1,
            scale: 1,
          };
          animatedObjects.push(dataBlock);

          tl.to(
            dataBlock,
            {
              duration: 1.5,
              x: targetNode.x,
              y: targetNode.y,
              ease: "power1.inOut",
              onComplete: () => {
                targetNode.color = NODE_COLOR_DEFAULT;
                targetNode.label = "✓";
                targetNode.labelColor = "#00FF00";
                pulseNode(targetNode, "#00FF00");
                createParticles(targetNode.x, targetNode.y, 10, "#00FF00");
                animatedObjects = animatedObjects.filter(
                  (obj) => obj !== dataBlock
                );
              },
            },
            `+=${i === 0 ? 0.5 : 0.2}`
          );
        });

        tl.add(() => {
          nodes.forEach((node) => {
            node.color = NODE_COLOR_DEFAULT;
            node.label = "";
            createParticles(node.x, node.y, 20, "#00FF00", 5);
          });
        }, "+=1");

        return tl;
      },
    },
    {
      modalTitle: "✅ Tüm Düğümler Senkronize",
      modalDescription:
        "Artık ağdaki tüm düğümler aynı veri bloğunu (B10) saklıyor. Bu, dağıtık sistemlerde veri bütünlüğü sağlandığının en net göstergesidir. Sırada bu veri üzerinde işlem teklifleri olacak.",
      animation: () => {
        return gsap.timeline();
      },
    },
    {
      modalTitle: "📄 Yeni İşlem Teklifleri",
      modalDescription:
        "Ağ üzerinde iki yeni işlem teklifi ortaya çıktı: Transaction A → B10 (Yeşil) → Kabul edilmesi beklenen işlem, Transaction B → B100 (Kırmızı) → Reddedilmesi beklenen işlem. Bu işlemler, ağdaki düğümlerin oylama mekanizması ile karara bağlanacak.",
      animation: () => {
        const tl = gsap.timeline();
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const transactionA = {
          type: "dataBlock",
          x: centerX - canvas.width * 0.2,
          y: centerY,
          size: NODE_RADIUS * 1.2,
          color: "#00FF00",
          text: "Tx A (B10)",
          opacity: 0,
          scale: 0,
        };
        const transactionB = {
          type: "dataBlock",
          x: centerX + canvas.width * 0.2,
          y: centerY,
          size: NODE_RADIUS * 1.2,
          color: "#FF0000",
          text: "Tx B (B100)",
          opacity: 0,
          scale: 0,
        };
        animatedObjects.push(transactionA, transactionB);

        tl.to([transactionA, transactionB], {
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: "back.out(1.7)",
        });
        tl.to(
          [transactionA, transactionB],
          {
            duration: 0.8,
            scale: 1.1,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );

        return tl;
      },
    },
    {
      modalTitle: "🗳 Oylama Başladı",
      modalDescription:
        "Her düğüm, işlemler için oy kullanmaya başlar. Oylama sonucunda çoğunluk kararı uygulanır. Bu süreç, P2P ağların demokratik ve şeffaf karar mekanizmasını gösterir.",
      animation: () => {
        const tl = gsap.timeline();
        const txA = animatedObjects.find((obj) => obj.text === "Tx A (B10)");
        const txB = animatedObjects.find((obj) => obj.text === "Tx B (B100)");

        nodes.forEach((node, i) => {
          const voteA = {
            type: "vote",
            x: node.x - NODE_RADIUS * 1.5,
            y: node.y - NODE_RADIUS * 1.5,
            size: FONT_SIZE * 1.5,
            text: i % 10 < 7 ? "✓" : "✗",
            color: i % 10 < 7 ? "#00FF00" : "#FF0000",
            opacity: 0,
            scale: 0,
          };
          const voteB = {
            type: "vote",
            x: node.x + NODE_RADIUS * 1.5,
            y: node.y - NODE_RADIUS * 1.5,
            size: FONT_SIZE * 1.5,
            text: i % 10 < 3 ? "✓" : "✗",
            color: i % 10 < 3 ? "#00FF00" : "#FF0000",
            opacity: 0,
            scale: 0,
          };
          animatedObjects.push(voteA, voteB);

          tl.to(
            [voteA, voteB],
            {
              duration: 0.5,
              opacity: 1,
              scale: 1,
              ease: "back.out(1.7)",
              onComplete: () => pulseNode(node, "#FFFF00"),
            },
            `+=${i * 0.1}`
          );
        });

        return tl;
      },
    },
    {
      modalTitle: "🎯 Mutabakat Sağlandı",
      modalDescription:
        "Transaction A, %70 onay alarak blok zincirine eklendi. Transaction B, %30 onay alarak reddedildi. Bu sonuç, P2P ağlarda çoğunluğun güvenliği ve karar birliği ile ilerlenmesini gösterir.",
      animation: () => {
        const tl = gsap.timeline();
        const txA = animatedObjects.find((obj) => obj.text === "Tx A (B10)");
        const txB = animatedObjects.find((obj) => obj.text === "Tx B (B100)");
        const votes = animatedObjects.filter((obj) => obj.type === "vote");

        tl.to(votes, {
          duration: 0.5,
          opacity: 0,
          onComplete: () =>
            (animatedObjects = animatedObjects.filter(
              (obj) => obj.type !== "vote"
            )),
        });

        tl.to(
          txB,
          {
            duration: 0.8,
            opacity: 0,
            scale: 0,
            ease: "power1.in",
            onComplete: () =>
              (animatedObjects = animatedObjects.filter((obj) => obj !== txB)),
          },
          "<"
        );

        tl.to(
          txA,
          {
            duration: 1.5,
            x: canvas.width / 2,
            y: canvas.height / 2,
            color: "#00FF00",
            ease: "power2.inOut",
          },
          "<"
        );
        tl.to(
          txA,
          {
            duration: 0.8,
            scale: 1.3,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );

        tl.to(
          nodes,
          {
            duration: 1,
            color: "#00FF00",
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
            onComplete: () => {
              nodes.forEach((node) => (node.color = NODE_COLOR_DEFAULT));
              animatedObjects = animatedObjects.filter((obj) => obj !== txA);
            },
          },
          "<"
        );

        return tl;
      },
    },
    {
      modalTitle: "🚨 Bağlantı Kesildi!",
      modalDescription:
        "Charlie düğümü arızalandı. Alice ile Bob arasındaki ana iletişim hattı devre dışı kaldı. Ancak P2P ağın gücü burada devreye giriyor: alternatif yollar aranacak.",
      animation: () => {
        const tl = gsap.timeline();
        const charlie = findNode("Charlie");
        const aliceBobConn = findConnection("Alice", "Bob");

        tl.to(charlie, {
          duration: 1,
          color: NODE_COLOR_ERROR,
          ease: "power1.inOut",
        });
        tl.to(
          charlie,
          { duration: 0.5, label: "X", labelColor: "#FF0000", ease: "none" },
          "<"
        );

        if (aliceBobConn) {
          tl.to(
            aliceBobConn,
            {
              duration: 1,
              opacity: 0,
              onUpdate: () => {
                aliceBobConn.active = false;
              },
              ease: "power1.inOut",
            },
            "<0.5"
          );
        }
        return tl;
      },
    },
    {
      modalTitle: "✅ Alternatif Yol Bulundu",
      modalDescription:
        "Sistem, yeni rota olarak Alice → Dave → Bob yolunu seçti. Bu, P2P ağların otomatik iyileşme (self-healing) yeteneğinin canlı bir örneğidir.",
      animation: () => {
        const tl = gsap.timeline();
        const alice = findNode("Alice");
        const dave = findNode("Dave");
        const bob = findNode("Bob");

        tl.to(findNode("Charlie"), { duration: 0.5, label: "", ease: "none" });

        const aliceDaveConn = findConnection("Alice", "Dave");
        const daveBobConn = findConnection("Dave", "Bob");

        if (aliceDaveConn) {
          aliceDaveConn.active = true;
          aliceDaveConn.color = CONNECTION_COLOR_ACTIVE;
          aliceDaveConn.dashOffset = Math.sqrt(
            Math.pow(dave.x - alice.x, 2) + Math.pow(dave.y - alice.y, 2)
          );
          tl.to(aliceDaveConn, {
            duration: 1,
            dashOffset: 0,
            ease: "power2.out",
          });
        }
        if (daveBobConn) {
          daveBobConn.active = true;
          daveBobConn.color = CONNECTION_COLOR_ACTIVE;
          daveBobConn.dashOffset = Math.sqrt(
            Math.pow(bob.x - dave.x, 2) + Math.pow(bob.y - dave.y, 2)
          );
          tl.to(
            daveBobConn,
            { duration: 1, dashOffset: 0, ease: "power2.out" },
            "<0.5"
          );
        }

        const dataBlock = {
          type: "dataBlock",
          x: alice.x,
          y: alice.y,
          size: NODE_RADIUS * 0.8,
          color: NODE_COLOR_HIGHLIGHT,
          text: "Data",
          opacity: 1,
          scale: 1,
        };
        animatedObjects.push(dataBlock);

        tl.to(
          dataBlock,
          {
            duration: 1,
            x: dave.x,
            y: dave.y,
            ease: "power1.inOut",
            onComplete: () => {
              pulseNode(dave, "#00FF00");
            },
          },
          "+=0.5"
        );

        tl.to(
          dataBlock,
          {
            duration: 1,
            x: bob.x,
            y: bob.y,
            ease: "power1.inOut",
            onComplete: () => {
              pulseNode(bob, "#00FF00");
              createParticles(bob.x, bob.y, 10, "#00FF00");
              animatedObjects = animatedObjects.filter(
                (obj) => obj !== dataBlock
              );
            },
          },
          "+=0.2"
        );

        return tl;
      },
    },
    {
      modalTitle: "💡 P2P Ağın Avantajı",
      modalDescription:
        "Merkeziyetsiz yapılar, tek bir nokta arızalansa bile iletişimi sürdürebilir. Veri güvenliği, süreklilik ve yüksek erişilebilirlik bu ağların temel avantajlarındandır. Bu yapı, blockchain teknolojisinin de bel kemiğini oluşturur.",
      animation: () => {
        const tl = gsap.timeline();

        tl.to(nodes, {
          duration: 1,
          color: "#00FF00",
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          onComplete: () => {
            nodes.forEach((node) => (node.color = NODE_COLOR_DEFAULT));
          },
        });

        tl.add(() => {
          nodes.forEach((node) =>
            createParticles(node.x, node.y, 30, "#00e6e6", 6)
          );
        }, "<");

        tl.to(
          canvas,
          {
            duration: 2,
            scale: 0.8,
            opacity: 0.5,
            ease: "power2.inOut",
          },
          "+=1"
        );

        return tl;
      },
    },
  ];

  const startScenario = () => {
    animate();
    runStep();
  };

  const runStep = () => {
    if (currentStepIndex < scenarioSteps.length) {
      const step = scenarioSteps[currentStepIndex];

      showModal(step.modalTitle, step.modalDescription, () => {
        const animationTimeline = step.animation();

        animationTimeline.then(() => {
          currentStepIndex++;
          runStep();
        });
      });
    } else {
      console.log("Senaryo tamamlandı!");
      showModal(
        "Senaryo Tamamlandı!",
        "P2P ağının temel prensiplerini başarıyla öğrendiniz. Teşekkürler!",
        () => {
          hideModal();
          cancelAnimationFrame(animationFrameId);
        }
      );
    }
  };

  gsap.timeline.prototype.then = function (onComplete) {
    return new Promise((resolve) => {
      this.eventCallback("onComplete", () => {
        onComplete();
        resolve();
      });
    });
  };

  startScenario();
});
