(function () {
  const canvas = document.getElementById("hero-network");
  if (!canvas) return;
  const ctx = canvas.getContext("2d", { alpha: true });

  let w, h, dpr;
  function resize() {
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize, { passive: true });
  resize();

  const POINTS = 90;
  const points = Array.from({ length: POINTS }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
  }));

  function step() {
    ctx.clearRect(0, 0, w, h);

    ctx.globalAlpha = 0.25;
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const y = (i / 16) * h + ((performance.now() * 0.02) % (h / 16));
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "rgba(0,180,255,0.18)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20 || p.x > w + 20) p.vx *= -1;
      if (p.y < -20 || p.y > h + 20) p.vy *= -1;
    }

    for (let i = 0; i < POINTS; i++) {
      const p = points[i];
      for (let j = i + 1; j < POINTS; j++) {
        const q = points[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150) {
          const t = 1 - dist / 150;
          ctx.strokeStyle = `rgba(0, 210, 255, ${0.14 * t})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }

    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(170, 240, 255, 0.9)";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 200, 255, 0.15)";
      ctx.fill();
    }

    requestAnimationFrame(step);
  }
  step();
})();
