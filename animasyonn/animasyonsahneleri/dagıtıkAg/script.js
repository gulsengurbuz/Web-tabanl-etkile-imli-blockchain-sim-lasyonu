function dagitik() {
  const container = document.getElementById("dagitik-canvas-container");
  const modalOverlay = document.getElementById("dagitik-modal-overlay");
  const modalTitle = document.getElementById("dagitik-modal-title");
  const modalDescription = document.getElementById("dagitik-modal-description");
  const continueButton = document.getElementById("dagitik-continue-button");

  if (typeof Konva === "undefined") {
    console.error(
      "Konva yüklenemedi. konva.min.js, script.js'den ÖNCE yüklenmeli."
    );
    return;
  }
  if (!container) {
    console.error("Canvas container bulunamadı.");
    return;
  }

  const stage = new Konva.Stage({
    container: "dagitik-canvas-container",
    width: container.offsetWidth || 700,
    height: container.offsetHeight || 500,
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  function toArr(collection) {
    if (Array.isArray(collection)) return collection;
    const out = [];
    if (collection && typeof collection.each === "function") {
      collection.each((n) => out.push(n));
    } else if (collection && typeof collection.length === "number") {
      for (let i = 0; i < collection.length; i++) out.push(collection[i]);
    }
    return out;
  }
  const getStageCenter = () => ({
    x: stage.width() / 2,
    y: stage.height() / 2,
  });
  const getStageDimensions = () => ({
    width: stage.width(),
    height: stage.height(),
  });
  const play = (opts) =>
    new Promise((resolve) =>
      new Konva.Tween({ ...opts, onFinish: resolve }).play()
    );
  const cleanupTemps = () =>
    toArr(layer.find(".temp")).forEach((n) => n.destroy());

  let currentSceneIndex = 0;
  let animationRunning = false;

  const scenes = [
    {
      title: "Ağ Türlerinin Karşılaştırılması",
      description:
        "Merkezi, Merkeziyetsiz ve Dağıtık ağ yapılarının temel özelliklerini ve farklarını görsel olarak inceleyin.",
      animation: async () => {
        layer.destroyChildren();
        const { width, height } = getStageDimensions();
        const columnWidth = width / 3;
        const nodeRadius = 20;
        const serverRadius = 30;
        const hubRadius = 25;

        const drawCentralized = async (offsetX) => {
          const lines = [];

          const server = new Konva.Circle({
            x: offsetX + columnWidth / 2,
            y: height / 2 - 50,
            radius: serverRadius,
            fill: "#FFD700",
            stroke: "#DAA520",
            strokeWidth: 2,
            opacity: 0,
          });
          const serverText = new Konva.Text({
            x: server.x() - 30,
            y: server.y() - 5,
            text: "Server",
            fontSize: 14,
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          layer.add(server);
          layer.add(serverText);

          const devicePositions = [
            { x: offsetX + columnWidth / 2, y: height / 2 + 50 },
            { x: offsetX + columnWidth / 2 - 60, y: height / 2 + 20 },
            { x: offsetX + columnWidth / 2 + 60, y: height / 2 + 20 },
          ];

          const devices = devicePositions.map((pos) => {
            const d = new Konva.Circle({
              x: pos.x,
              y: pos.y,
              radius: nodeRadius,
              fill: "#ADD8E6",
              stroke: "#6A5ACD",
              strokeWidth: 1,
              opacity: 0,
            });
            layer.add(d);

            const ln = new Konva.Line({
              points: [server.x(), server.y(), d.x(), d.y()],
              stroke: "#808080",
              strokeWidth: 1,
              opacity: 0,
              dash: [5, 5],
              listening: false,
            });
            lines.push(ln);
            layer.add(ln);

            return d;
          });

          const label = new Konva.Text({
            x: offsetX + columnWidth / 2 - 50,
            y: height - 100,
            text: "Merkezi",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          const desc = new Konva.Text({
            x: offsetX + columnWidth / 2 - 70,
            y: height - 70,
            text: "Tek bir kontrol noktası.",
            fontSize: 14,
            fill: "#666",
            opacity: 0,
            listening: false,
          });
          layer.add(label);
          layer.add(desc);

          await play({ node: server, duration: 1, opacity: 1 });
          new Konva.Tween({
            node: serverText,
            duration: 0.5,
            opacity: 1,
          }).play();

          await Promise.all(
            devices.map((device, i) =>
              Promise.all([
                play({
                  node: device,
                  duration: 0.5,
                  opacity: 1,
                  delay: i * 0.2,
                }),
                play({
                  node: lines[i],
                  duration: 0.5,
                  opacity: 1,
                  delay: i * 0.2,
                }),
              ])
            )
          );

          new Konva.Tween({ node: label, duration: 0.5, opacity: 1 }).play();
          await play({ node: desc, duration: 0.5, opacity: 1 });
        };

        const drawDecentralized = async (offsetX) => {
          const hubs = [];
          const hubPositions = [
            { x: offsetX + columnWidth / 2 - 50, y: height / 2 - 30 },
            { x: offsetX + columnWidth / 2 + 50, y: height / 2 - 30 },
            { x: offsetX + columnWidth / 2, y: height / 2 + 50 },
          ];

          hubPositions.forEach((pos) => {
            const hub = new Konva.Circle({
              x: pos.x,
              y: pos.y,
              radius: hubRadius,
              fill: "#FFB6C1",
              stroke: "#CD5C5C",
              strokeWidth: 2,
              opacity: 0,
            });
            hubs.push(hub);
            layer.add(hub);

            const deviceOffsets = [
              [-30, 30],
              [30, 30],
            ];

            deviceOffsets.forEach(([dx, dy]) => {
              const device = new Konva.Circle({
                x: hub.x() + dx,
                y: hub.y() + dy,
                radius: nodeRadius,
                fill: "#ADD8E6",
                stroke: "#6A5ACD",
                strokeWidth: 1,
                opacity: 0,
              });
              const line = new Konva.Line({
                points: [hub.x(), hub.y(), device.x(), device.y()],
                stroke: "#808080",
                strokeWidth: 1,
                opacity: 0,
                dash: [5, 5],
                listening: false,
              });
              layer.add(line);
              layer.add(device);
            });
          });

          const label = new Konva.Text({
            x: offsetX + columnWidth / 2 - 60,
            y: height - 100,
            text: "Merkeziyetsiz",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          const desc = new Konva.Text({
            x: offsetX + columnWidth / 2 - 80,
            y: height - 70,
            text: "Çoklu merkez ama lokal kontrol.",
            fontSize: 14,
            fill: "#666",
            opacity: 0,
            listening: false,
          });
          layer.add(label);
          layer.add(desc);

          for (let h = 0; h < hubs.length; h++) {
            await play({
              node: hubs[h],
              duration: 1,
              opacity: 1,
              delay: h * 0.1,
            });

            const devicesForHub = toArr(layer.find("Circle"))
              .filter(
                (c) =>
                  c !== hubs[h] &&
                  Math.abs(c.radius() - nodeRadius) < 0.001 &&
                  c.x() > offsetX &&
                  c.x() < offsetX + columnWidth &&
                  Math.abs(c.y() - (hubs[h].y() + 30)) <= 35
              )
              .slice(0, 2);

            const linesForHub = toArr(layer.find("Line"))
              .filter(
                (l) =>
                  l.points()[0] === hubs[h].x() && l.points()[1] === hubs[h].y()
              )
              .slice(0, 2);

            await Promise.all(
              devicesForHub.map((d, i) =>
                play({ node: d, duration: 0.5, opacity: 1, delay: i * 0.1 })
              )
            );
            await Promise.all(
              linesForHub.map((ln, i) =>
                play({ node: ln, duration: 0.5, opacity: 1, delay: i * 0.1 })
              )
            );
          }

          new Konva.Tween({ node: label, duration: 0.5, opacity: 1 }).play();
          await play({ node: desc, duration: 0.5, opacity: 1 });
        };

        const drawDistributed = async (offsetX) => {
          const nodes = [];
          const numNodes = 6;
          const circleRadius = 80;
          const ctr = { x: offsetX + columnWidth / 2, y: height / 2 };

          for (let i = 0; i < numNodes; i++) {
            const angle = (i / numNodes) * Math.PI * 2;
            const x = ctr.x + circleRadius * Math.cos(angle);
            const y = ctr.y + circleRadius * Math.sin(angle);
            const node = new Konva.Circle({
              x,
              y,
              radius: nodeRadius,
              fill: "#90EE90",
              stroke: "#3CB371",
              strokeWidth: 2,
              opacity: 0,
            });
            nodes.push(node);
            layer.add(node);
          }

          const label = new Konva.Text({
            x: offsetX + columnWidth / 2 - 40,
            y: height - 100,
            text: "Dağıtık",
            fontSize: 20,
            fontWeight: "bold",
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          const desc = new Konva.Text({
            x: offsetX + columnWidth / 2 - 80,
            y: height - 70,
            text: "Tüm düğümler eşit ve bağlantılı.",
            fontSize: 14,
            fill: "#666",
            opacity: 0,
            listening: false,
          });
          layer.add(label);
          layer.add(desc);

          await Promise.all(
            nodes.map((n, i) =>
              play({ node: n, duration: 0.5, opacity: 1, delay: i * 0.1 })
            )
          );

          const linePromises = [];
          for (let i = 0; i < numNodes; i++) {
            for (let j = i + 1; j < numNodes; j++) {
              const ln = new Konva.Line({
                points: [
                  nodes[i].x(),
                  nodes[i].y(),
                  nodes[j].x(),
                  nodes[j].y(),
                ],
                stroke: "#808080",
                strokeWidth: 1,
                opacity: 0,
                listening: false,
              });
              layer.add(ln);
              linePromises.push(
                play({
                  node: ln,
                  duration: 0.5,
                  opacity: 1,
                  delay: Math.random() * 0.5,
                })
              );
            }
          }
          await Promise.all(linePromises);

          new Konva.Tween({ node: label, duration: 0.5, opacity: 1 }).play();
          await play({ node: desc, duration: 0.5, opacity: 1 });
        };

        await drawCentralized(0);
        await drawDecentralized(columnWidth);
        await drawDistributed(columnWidth * 2);
        layer.draw();
      },
    },

    {
      title: "Dağıtık Ağdaki Düğümler",
      description:
        "Dağıtık bir ağda düğümlerin nasıl düzenlendiğini ve birbirleriyle nasıl bağlantılı olduğunu keşfedin.",
      animation: async () => {
        layer.destroyChildren();
        const { x, y } = getStageCenter();
        const nodeRadius = 25;
        const networkRadius = 150;
        const numNodes = 8;
        const nodes = [];
        const labels = [];

        for (let i = 0; i < numNodes; i++) {
          const a = (i / numNodes) * Math.PI * 2;
          const nx = x + networkRadius * Math.cos(a);
          const ny = y + networkRadius * Math.sin(a);

          const node = new Konva.Circle({
            id: `dagitik-node-${i + 1}`,
            x: nx,
            y: ny,
            radius: nodeRadius,
            fill: "#90EE90",
            stroke: "#3CB371",
            strokeWidth: 2,
            opacity: 0,
          });
          const label = new Konva.Text({
            x: nx - 30,
            y: ny + nodeRadius + 5,
            text: `Node ${i + 1}`,
            fontSize: 12,
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          layer.add(node);
          layer.add(label);
          nodes.push(node);
          labels.push(label);
        }

        await Promise.all(
          nodes.map((n, i) =>
            play({
              node: n,
              duration: 0.5,
              opacity: 1,
              onFinish: () =>
                new Konva.Tween({
                  node: labels[i],
                  duration: 0.3,
                  opacity: 1,
                }).play(),
            })
          )
        );

        for (let i = 0; i < numNodes; i++) {
          for (let j = i + 1; j < numNodes; j++) {
            const ln = new Konva.Line({
              points: [nodes[i].x(), nodes[i].y(), nodes[j].x(), nodes[j].y()],
              stroke: "#808080",
              strokeWidth: 1,
              opacity: 0,
              listening: false,
            });
            layer.add(ln);
            await play({ node: ln, duration: 0.3, opacity: 1 });
          }
        }

        nodes.forEach((n) => {
          const glow = new Konva.Circle({
            x: n.x(),
            y: n.y(),
            radius: n.radius() + 5,
            fill: "#ADD8E6",
            opacity: 0,
            listening: false,
            name: "temp",
          });
          layer.add(glow);
          glow.moveToBottom();
          new Konva.Tween({
            node: glow,
            duration: 1,
            opacity: 0.5,
            easing: Konva.Easings.EaseInOut,
            loop: true,
            yoyo: true,
          }).play();
        });

        layer.draw();
      },
    },

    {
      title: "Veri Bloğu Oluşumu",
      description:
        "Dağıtık bir ağda yeni bir veri bloğunun (ör. bir işlem) nasıl oluşturulduğunu gözlemleyin.",
      animation: async () => {
        cleanupTemps();
        const alice = layer.findOne("#dagitik-node-1");
        if (!alice) return console.error("Alice node bulunamadı (Sahne 3).");

        await play({
          node: alice,
          fill: "#FFD700",
          stroke: "#DAA520",
          duration: 0.5,
        });

        const rect = new Konva.Rect({
          id: "dagitik-block-b10-alice",
          x: alice.x() - 30,
          y: alice.y() + alice.radius() + 20,
          width: 60,
          height: 30,
          fill: "#FFC107",
          stroke: "#FFA000",
          strokeWidth: 2,
          cornerRadius: 5,
          opacity: 0,
          scaleX: 0.8,
          scaleY: 0.8,
          offsetX: 30,
          offsetY: 15,
        });
        const txt = new Konva.Text({
          id: "dagitik-block-text-b10-alice",
          x: alice.x() - 15,
          y: alice.y() + alice.radius() + 25,
          text: "B10",
          fontSize: 18,
          fill: "#333",
          opacity: 0,
          listening: false,
        });
        layer.add(rect);
        layer.add(txt);

        await play({
          node: rect,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          duration: 0.5,
          easing: Konva.Easings.ElasticEaseOut,
          onFinish: () =>
            new Konva.Tween({
              node: txt,
              opacity: 1,
              duration: 0.3,
              onFinish: () =>
                new Konva.Tween({
                  node: rect,
                  rotation: 5,
                  duration: 0.1,
                  onFinish: () =>
                    new Konva.Tween({
                      node: rect,
                      rotation: -5,
                      duration: 0.1,
                      onFinish: () =>
                        new Konva.Tween({
                          node: rect,
                          rotation: 0,
                          duration: 0.1,
                        }).play(),
                    }).play(),
                }).play(),
            }).play(),
        });

        layer.draw();
      },
    },

    {
      title: "Verinin Ağa Yayılması",
      description:
        "Oluşturulan veri bloğunun ağdaki tüm düğümlere nasıl yayıldığını izleyin.",
      animation: async () => {
        cleanupTemps();
        const alice = layer.findOne("#dagitik-node-1");
        const nodes = toArr(layer.find("Circle")).filter((n) =>
          n.id().startsWith("dagitik-node-")
        );
        const b10Rect = layer.findOne("#dagitik-block-b10-alice");
        const b10Text = layer.findOne("#dagitik-block-text-b10-alice");
        if (!alice || !b10Rect || !b10Text)
          return console.error("Gerekli elemanlar yok (Sahne 4).");

        b10Rect.opacity(1);
        b10Text.opacity(1);
        layer.draw();

        for (const n of nodes) {
          if (n.id() === alice.id()) continue;

          const dataLine = new Konva.Line({
            points: [alice.x(), alice.y(), alice.x(), alice.y()],
            stroke: "#28A745",
            strokeWidth: 3,
            opacity: 0,
            dash: [10, 5],
            listening: false,
            name: "temp",
          });
          layer.add(dataLine);
          dataLine.moveToBottom();

          await play({
            node: dataLine,
            points: [alice.x(), alice.y(), n.x(), n.y()],
            opacity: 1,
            duration: 0.8,
            easing: Konva.Easings.EaseOut,
            onFinish: () =>
              new Konva.Tween({
                node: dataLine,
                strokeWidth: 5,
                duration: 0.3,
                yoyo: true,
                loop: true,
              }).play(),
          });

          const rect = new Konva.Rect({
            id: `dagitik-block-b10-${n.id()}`,
            x: n.x() - 30,
            y: n.y() + n.radius() + 20,
            width: 60,
            height: 30,
            fill: "#FFC107",
            stroke: "#FFA000",
            strokeWidth: 2,
            cornerRadius: 5,
            opacity: 0,
          });
          const txt = new Konva.Text({
            id: `dagitik-block-text-b10-${n.id()}`,
            x: n.x() - 15,
            y: n.y() + n.radius() + 25,
            text: "B10",
            fontSize: 18,
            fill: "#333",
            opacity: 0,
            listening: false,
          });
          const check = new Konva.Text({
            id: `dagitik-checkmark-${n.id()}`,
            x: n.x() + n.radius() - 10,
            y: n.y() - n.radius() - 10,
            text: "✓",
            fontSize: 24,
            fill: "#28A745",
            opacity: 0,
            listening: false,
          });

          layer.add(rect);
          layer.add(txt);
          layer.add(check);

          new Konva.Tween({ node: rect, opacity: 1, duration: 0.3 }).play();
          new Konva.Tween({ node: txt, opacity: 1, duration: 0.3 }).play();
          await play({
            node: check,
            opacity: 1,
            duration: 0.3,
            onFinish: () => dataLine.destroy(),
          });
        }

        layer.draw();
      },
    },

    {
      title: "Veri Fazlalığı (Redundancy)",
      description: "Dağıtık ağ, veriyi birden fazla düğümde yedekli tutar.",
      animation: async () => {
        cleanupTemps();
        const nodes = toArr(layer.find("Circle")).filter((n) =>
          n.id().startsWith("dagitik-node-")
        );

        nodes.forEach((n) => {
          const r = layer.findOne(`#dagitik-block-b10-${n.id()}`);
          const t = layer.findOne(`#dagitik-block-text-b10-${n.id()}`);
          const c = layer.findOne(`#dagitik-checkmark-${n.id()}`);
          if (r) r.opacity(1);
          if (t) t.opacity(1);
          if (c) c.opacity(1);
        });
        layer.draw();

        nodes.forEach((n) => {
          const halo = new Konva.Circle({
            x: n.x(),
            y: n.y(),
            radius: n.radius() + 10,
            stroke: "#007bff",
            strokeWidth: 0,
            opacity: 0,
            listening: false,
            name: "temp",
          });
          layer.add(halo);
          halo.moveToBottom();
          new Konva.Tween({
            node: halo,
            strokeWidth: 5,
            opacity: 0.7,
            duration: 1.5,
            easing: Konva.Easings.EaseInOut,
            loop: true,
            yoyo: true,
          }).play();
        });
        layer.draw();
      },
    },

    {
      title: "Düğüm Arızası",
      description:
        "Bir düğüm arızalansa bile verinin kaybolmadığını ve ağın çalıştığını görün.",
      animation: async () => {
        cleanupTemps();
        const charlie = layer.findOne("#dagitik-node-3");
        if (!charlie) return console.error("Charlie node yok (Sahne 6).");

        const r = layer.findOne(`#dagitik-block-b10-${charlie.id()}`);
        const t = layer.findOne(`#dagitik-block-text-b10-${charlie.id()}`);
        const c = layer.findOne(`#dagitik-checkmark-${charlie.id()}`);

        await play({
          node: charlie,
          fill: "#DC3545",
          stroke: "#B22222",
          duration: 0.5,
        });

        const xSymbol = new Konva.Text({
          id: "dagitik-x-symbol-charlie",
          x: charlie.x() - 15,
          y: charlie.y() - 15,
          text: "X",
          fontSize: 40,
          fill: "#DC3545",
          opacity: 0,
          listening: false,
        });
        layer.add(xSymbol);

        const fades = [];
        if (r) fades.push(play({ node: r, opacity: 0, duration: 0.5 }));
        if (t) fades.push(play({ node: t, opacity: 0, duration: 0.5 }));
        if (c) fades.push(play({ node: c, opacity: 0, duration: 0.5 }));
        await Promise.all([
          play({ node: xSymbol, opacity: 1, duration: 0.5 }),
          ...fades,
        ]);

        const msg = new Konva.Text({
          id: "dagitik-no-data-loss-text",
          x: getStageDimensions().width - 200,
          y: 50,
          text: "Veri kaybı olmadı.",
          fontSize: 18,
          fill: "#333",
          opacity: 0,
          align: "right",
          listening: false,
        });
        layer.add(msg);
        await play({ node: msg, opacity: 1, duration: 0.5 });

        layer.draw();
      },
    },

    {
      title: "Ağın Kendini Onarması",
      description:
        "Ağ, arızalı düğümü otomatik onarır ve veri bütünlüğünü sağlar.",
      animation: async () => {
        cleanupTemps();
        const charlie = layer.findOne("#dagitik-node-3");
        const xSymbol = layer.findOne("#dagitik-x-symbol-charlie");
        const msg = layer.findOne("#dagitik-no-data-loss-text");
        const others = toArr(layer.find("Circle")).filter(
          (n) => n.id().startsWith("dagitik-node-") && n.id() !== charlie.id()
        );
        if (!charlie || !xSymbol || !msg)
          return console.error("Gerekli elemanlar yok (Sahne 7).");

        await play({
          node: msg,
          opacity: 0,
          duration: 0.5,
          onFinish: () => msg.destroy(),
        });

        await Promise.all(
          others.map(
            (n) =>
              new Promise((resolve) => {
                const flow = new Konva.Line({
                  points: [n.x(), n.y(), n.x(), n.y()],
                  stroke: "#28A745",
                  strokeWidth: 3,
                  opacity: 0,
                  dash: [10, 5],
                  listening: false,
                  name: "temp",
                });
                layer.add(flow);
                flow.moveToBottom();
                new Konva.Tween({
                  node: flow,
                  points: [n.x(), n.y(), charlie.x(), charlie.y()],
                  opacity: 1,
                  duration: 0.8,
                  easing: Konva.Easings.EaseOut,
                  onFinish: () => {
                    flow.destroy();
                    resolve();
                  },
                }).play();
              })
          )
        );

        await play({
          node: charlie,
          fill: "#90EE90",
          stroke: "#3CB371",
          duration: 0.5,
        });
        await play({
          node: xSymbol,
          opacity: 0,
          duration: 0.3,
          onFinish: () => xSymbol.destroy(),
        });

        const r = layer.findOne(`#dagitik-block-b10-${charlie.id()}`);
        const t = layer.findOne(`#dagitik-block-text-b10-${charlie.id()}`);
        const c = layer.findOne(`#dagitik-checkmark-${charlie.id()}`);
        const appear = [r, t, c]
          .filter(Boolean)
          .map((n) => play({ node: n, opacity: 1, duration: 0.3 }));
        await Promise.all(appear);

        layer.draw();
      },
    },

    {
      title: "Dağıtık Ağın Gücü",
      description: "Güvenilir — Dayanıklı — Erişilebilir",
      animation: async () => {
        cleanupTemps();
        const nodes = toArr(layer.find("Circle")).filter((n) =>
          n.id().startsWith("dagitik-node-")
        );

        nodes.forEach((n) => {
          new Konva.Tween({
            node: n,
            fill: "#32CD32",
            stroke: "#008000",
            strokeWidth: 3,
            duration: 0.5,
            onFinish: () =>
              new Konva.Tween({
                node: n,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 0.5,
                yoyo: true,
                loop: true,
              }).play(),
          }).play();
        });

        nodes.forEach((n) => {
          const p = new Konva.Circle({
            x: n.x(),
            y: n.y(),
            radius: n.radius() * 2,
            fill: "#FFFF00",
            opacity: 0.5,
            listening: false,
            name: "temp",
          });
          layer.add(p);
          p.moveToBottom();
          new Konva.Tween({
            node: p,
            radius: n.radius() * 4,
            opacity: 0,
            duration: 1,
            easing: Konva.Easings.EaseOut,
            onFinish: () => p.destroy(),
          }).play();
        });

        const finalMessage = new Konva.Text({
          x: 0,
          y: getStageCenter().y - 50,
          text: "Güvenilir – Dayanıklı – Erişilebilir",
          fontSize: 40,
          fontWeight: "bold",
          fill: "#007bff",
          opacity: 0,
          width: stage.width(),
          align: "center",
          listening: false,
        });
        layer.add(finalMessage);
        await play({
          node: finalMessage,
          opacity: 1,
          duration: 1,
          easing: Konva.Easings.EaseOut,
        });

        layer.draw();
      },
    },
  ];

  const showModal = (title, description) => {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalOverlay.classList.remove("dagitik-hidden");
  };
  const hideModal = () => modalOverlay.classList.add("dagitik-hidden");

  const startSceneAnimation = async () => {
    if (animationRunning) return;
    animationRunning = true;
    hideModal();

    await scenes[currentSceneIndex].animation();
    animationRunning = false;

    if (currentSceneIndex < scenes.length - 1) {
      currentSceneIndex++;
      setTimeout(() => showScene(currentSceneIndex), 800);
    } else {
      showModal(
        "Animasyon Tamamlandı!",
        "Dağıtık ağ yapısı animasyonunu izlediğiniz için teşekkür ederiz."
      );
      continueButton.textContent = "Baştan Başla";
      continueButton.onclick = () => {
        layer.destroyChildren();
        cleanupTemps();
        currentSceneIndex = 0;
        continueButton.textContent = "Devam Et";
        showScene(currentSceneIndex);
      };
    }
  };

  const showScene = (index) => {
    if (index >= 0 && index < scenes.length) {
      const scene = scenes[index];
      showModal(scene.title, scene.description);
      continueButton.onclick = startSceneAnimation;
    }
  };

  const resizeStage = () => {
    const w = container.offsetWidth || 700;
    const h = container.offsetHeight || 500;
    stage.width(w);
    stage.height(h);
    layer.draw();
  };
  window.addEventListener("resize", resizeStage);
  resizeStage();

  showScene(currentSceneIndex);
}

document.addEventListener("DOMContentLoaded", dagitik);
