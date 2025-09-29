(function () {
  function getElementCenter(el, container) {
    const rect = el.getBoundingClientRect();
    const crect = container.getBoundingClientRect();
    return {
      x: (rect.left + rect.right) / 2 - crect.left,
      y: (rect.top + rect.bottom) / 2 - crect.top,
    };
  }

  function drawConnection(connEl, startEl, endEl, container) {
    const s = getElementCenter(startEl, container);
    const e = getElementCenter(endEl, container);
    const dx = e.x - s.x;
    const dy = e.y - s.y;
    const dist = Math.hypot(dx, dy);
    const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;

    connEl.style.width = `${dist}px`;
    connEl.style.left = `${s.x}px`;
    connEl.style.top = `${s.y}px`;
    connEl.style.transform = `rotate(${angleDeg}deg)`;
    connEl.style.transformOrigin = "0 50%";
  }

  function createModalController() {
    const modal = document.getElementById("merkezi-modal");
    const title = document.getElementById("merkezi-modal-title");
    const text = document.getElementById("merkezi-modal-text");
    const btn = document.getElementById("merkezi-modal-continue-button");

    let nextFn = null;

    btn.addEventListener("click", () => {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
      if (typeof nextFn === "function") {
        const run = nextFn;
        nextFn = null;
        requestAnimationFrame(() => run());
      }
    });

    function showModal(t, m, next) {
      title.textContent = t;
      text.textContent = m;
      nextFn = next || null;
      modal.classList.add("show");
      modal.setAttribute("aria-hidden", "false");
    }

    return { showModal };
  }

  function initMerkeziAnimasyonu() {
    const container = document.querySelector(
      ".merkezi-visualization-container"
    );
    if (!container) return;

    const server = document.getElementById("merkezi-server1");
    const devices = {
      phone: document.getElementById("merkezi-phone1"),
      laptop: document.getElementById("merkezi-laptop1"),
      tablet: document.getElementById("merkezi-tablet1"),
      smartwatch: document.getElementById("merkezi-smartwatch1"),
      desktop: document.getElementById("merkezi-desktop1"),
    };
    const connections = {
      phone: document.getElementById("merkezi-conn-phone-server"),
      laptop: document.getElementById("merkezi-conn-laptop-server"),
      tablet: document.getElementById("merkezi-conn-tablet-server"),
      smartwatch: document.getElementById("merkezi-conn-smartwatch-server"),
      desktop: document.getElementById("merkezi-conn-desktop-server"),
    };
    const dataPoint1 = document.getElementById("merkezi-data-point-1");
    const dataPoint2 = document.getElementById("merkezi-data-point-2");

    const { showModal } = createModalController();

    function setupConnections() {
      drawConnection(connections.phone, devices.phone, server, container);
      drawConnection(connections.laptop, devices.laptop, server, container);
      drawConnection(connections.tablet, devices.tablet, server, container);
      drawConnection(
        connections.smartwatch,
        devices.smartwatch,
        server,
        container
      );
      drawConnection(connections.desktop, devices.desktop, server, container);
    }

    function scene1() {
      server.className = "merkezi-server merkezi-active";
      Object.values(devices).forEach(
        (d) => (d.className = "merkezi-device merkezi-active")
      );
      Object.values(connections).forEach(
        (c) => (c.className = "merkezi-connection")
      );

      dataPoint1.style.opacity = 0;
      dataPoint1.style.animation = "none";
      dataPoint2.style.opacity = 0;
      dataPoint2.style.animation = "none";

      setupConnections();

      showModal(
        "Sahne 1 – Başlangıç Durumu",
        "Merkezi sistemlerde tüm veri tek bir merkezde toplanır. Tüm cihazlar bu merkeze bağlanır.",
        scene2
      );
    }

    function scene2() {
      const phoneC = getElementCenter(devices.phone, container);
      const serverC = getElementCenter(server, container);
      const laptopC = getElementCenter(devices.laptop, container);

      dataPoint1.style.left = `${phoneC.x - 9}px`;
      dataPoint1.style.top = `${phoneC.y - 9}px`;
      dataPoint1.style.opacity = 1;

      const dx1 = serverC.x - phoneC.x;
      const dy1 = serverC.y - phoneC.y;
      dataPoint1.style.setProperty("--dx1", `${dx1}px`);
      dataPoint1.style.setProperty("--dy1", `${dy1}px`);
      void dataPoint1.offsetWidth;
      dataPoint1.style.animation = "moveDataPoint1 1.5s linear forwards";

      dataPoint1.onanimationend = () => {
        dataPoint1.style.opacity = 0;
        dataPoint1.style.animation = "none";

        dataPoint2.style.left = `${serverC.x - 9}px`;
        dataPoint2.style.top = `${serverC.y - 9}px`;
        dataPoint2.style.opacity = 1;

        const dx2 = laptopC.x - serverC.x;
        const dy2 = laptopC.y - serverC.y;
        dataPoint2.style.setProperty("--dx2", `${dx2}px`);
        dataPoint2.style.setProperty("--dy2", `${dy2}px`);
        void dataPoint2.offsetWidth;
        dataPoint2.style.animation = "moveDataPoint2 1.5s linear forwards";

        dataPoint2.onanimationend = () => {
          dataPoint2.style.opacity = 0;
          dataPoint2.style.animation = "none";

          showModal(
            "Sahne 2 – Veri Akışı",
            "Merkez verileri toplar ve ihtiyaç duyulan cihazlara dağıtır.",
            scene3
          );
        };
      };
    }

    function scene3() {
      server.className = "merkezi-server merkezi-error";
      Object.values(devices).forEach(
        (d) => (d.className = "merkezi-device merkezi-inactive")
      );
      Object.values(connections).forEach(
        (c) => (c.className = "merkezi-connection merkezi-broken")
      );

      showModal(
        "Sahne 3 – Hata Durumu",
        "Merkez çökerse tüm sistem durur. Bu tekil hata noktası, merkezi mimarinin zayıf yönüdür."
      );
    }

    scene1();

    window.addEventListener("resize", () => {
      requestAnimationFrame(setupConnections);
    });

    setTimeout(setupConnections, 50);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMerkeziAnimasyonu);
  } else {
    initMerkeziAnimasyonu();
  }
})();
