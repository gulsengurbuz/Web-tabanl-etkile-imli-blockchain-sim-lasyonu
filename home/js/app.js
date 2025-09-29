const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d", { alpha: true });

let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
let W = 0,
  H = 0;
function resize() {
  W = canvas.clientWidth;
  H = canvas.clientHeight;
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resize);
resize();

const NODES = 70;
const nodes = [];
const rand = (a, b) => a + Math.random() * (b - a);

for (let i = 0; i < NODES; i++) {
  nodes.push({
    x: rand(0, W),
    y: rand(0, H),
    vx: rand(-0.25, 0.25),
    vy: rand(-0.25, 0.25),
    r: rand(1.2, 2.4),
  });
}

let mouse = { x: W / 2, y: H / 2 };
window.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

function step() {
  ctx.clearRect(0, 0, W, H);

  drawGrid();

  for (const n of nodes) {
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;

    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(200, 230, 255, 0.9)";
    ctx.shadowColor = "rgba(58,160,255,0.75)";
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  for (let i = 0; i < NODES; i++) {
    for (let j = i + 1; j < NODES; j++) {
      const a = nodes[i],
        b = nodes[j];
      const dx = a.x - b.x,
        dy = a.y - b.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < 180 * 180) {
        const alpha = 1 - d2 / (180 * 180);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(140, 195, 255, ${0.25 * alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(step);
}

function drawGrid() {
  const gap = 44;
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let x = (mouse.x * 0.02) % gap; x < W; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = (mouse.y * 0.02) % gap; y < H; y += gap) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.restore();
}

requestAnimationFrame(step);
