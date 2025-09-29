import { auth, db } from "../firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const MANUAL_MODE = true;

const MANUAL_ITEMS = [
  {
    id: "hash-demo",
    _type: "anim",
    title: "Blockchain Kullanım Alanları ",
    description:
      "Blockchain teknolojisi, yalnızca kripto paraların ötesinde geniş bir kullanım alanına sahiptir. Finans sektöründe hızlı, güvenilir ve düşük maliyetli uluslararası para transferleri yapılmasını sağlar",
    href: "../animasyonn/index.html?id=hash-demo",
    image: "../img/blockhainkullanımhome.png",
    createdAt: new Date("2025-09-01"),
  },
];

const TOPICS = [
  { id: 1, title: "Veri", slug: "veri" },
  { id: 2, title: "Veri Kaydı", slug: "veri-kaydi" },
  { id: 3, title: "Veritabanı", slug: "veritabani" },
  { id: 4, title: "Merkezi", slug: "merkezi" },
  { id: 5, title: "Merkeziyetsiz", slug: "merkeziyetsiz" },
  { id: 6, title: "P2P", slug: "p2p" },
  { id: 7, title: "Dağıtık Ağ", slug: "dagitik-ag" },
  { id: 8, title: "Anahtar Yönetimi", slug: "anahtar-yonetimi" },
  { id: 9, title: "Hash Fonksiyonları", slug: "hash-fonksiyonlari" },
  { id: 10, title: "Dijital İmza", slug: "dijital-imza" },
  { id: 11, title: "Zaman Damgası", slug: "zaman-damgasi" },
  { id: 12, title: "Blok Yapısı", slug: "blok-yapisi" },
  { id: 13, title: "Merkle Ağaçları", slug: "merkle-agaclari" },
  { id: 14, title: "Blockchain", slug: "blockchain" },
  {
    id: 15,
    title: "İşlemler ve Blok Doğrulama",
    slug: "islemler-ve-blok-dogrulama",
  },
  { id: 16, title: "Proof of Work (PoW)", slug: "proof-of-work-pow" },
  { id: 17, title: "Proof of Stake (PoS)", slug: "proof-of-stake-pos" },
  { id: 18, title: "Açık (Public) Blockchain", slug: "acik-public-blockchain" },
  {
    id: 19,
    title: "Özel (Private) Blockchain",
    slug: "ozel-private-blockchain",
  },
  { id: 20, title: "Konsorsiyum Blockchain", slug: "konsorsiyum-blockchain" },
  { id: 21, title: "Hibrit Modeller", slug: "hibrit-modeller" },
  { id: 22, title: "Çatallaşma (Fork)", slug: "catallasma-fork" },
  { id: 23, title: "Akıllı Sözleşmeler", slug: "akilli-sozlesmeler" },
  { id: 24, title: "Token / Coin Mantığı", slug: "token-coin-mantigi" },
  {
    id: 25,
    title: "Blockchain Kullanım Alanları",
    slug: "blockchain-kullanim-alanlari",
  },
];

const ANIM_NAME_OVERRIDES = {
  8: "anahtarYöntemi",
};

function toCamel(str) {
  return String(str || "")
    .trim()
    .split(/\s+/)
    .map((w, i) =>
      i === 0
        ? w[0]?.toLowerCase() + w.slice(1)
        : w[0]?.toUpperCase() + w.slice(1)
    )
    .join("")
    .replace(/[^0-9A-Za-zÇĞİÖŞÜçğıöşü]/g, "");
}
const norm = (s) =>
  String(s || "")
    .toLowerCase()
    .replaceAll("ı", "i")
    .replaceAll("İ", "i")
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .trim();

const findTopicById = (id) => TOPICS.find((t) => t.id === Number(id));
const findTopicBySlug = (slug) => TOPICS.find((t) => t.slug === slug);
const findTopicByTitle = (title) =>
  TOPICS.find((t) => norm(t.title) === norm(title));

function hrefGeneralTest(topic) {
  return `../geneltest/testler/${topic.slug}/index.html`;
}
function hrefTopicTest(topic) {
  return `../testler/${topic.slug}/index.html`;
}
function hrefVideoTest(topic) {
  return `../videotestlerii/${topic.slug}/index.html`;
}
function hrefAnimation(topic) {
  const animName = ANIM_NAME_OVERRIDES[topic.id] || toCamel(topic.title);
  return `../animasyonn/animasyonsahneleri/${animName}/index.html`;
}

export function requireLogin() {
  return new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        const ret = encodeURIComponent(location.href);
        location.replace(`../kayit/index.html?returnUrl=${ret}`);
        return;
      }
      unsub();
      resolve(user);
    });
  });
}

const FORCE_LOGIN = false;
let currentUser = null;
if (FORCE_LOGIN) {
  currentUser = await requireLogin();
  console.log("[guard] kullanıcı:", currentUser?.uid);
}

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));
const tsToMillis = (t) =>
  t?.toMillis?.() || (t instanceof Date ? t.getTime() : 0);

function banner(msg, kind = "warn") {
  const el = document.createElement("div");
  el.style.cssText = `
    position: sticky; top:0; z-index: 9999; padding:10px 14px;
    ${
      kind === "error"
        ? "background:#ffe5e5;color:#800;border:1px solid #f99;"
        : "background:#f0f7ff;color:#123;border:1px solid #9cf;"
    }
    font-size:14px; border-radius:0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,.08)
  `;
  el.innerHTML = msg;
  document.body.prepend(el);
}

function toast(msg) {
  const el = document.createElement("div");
  el.style.cssText = `
    position:fixed; right:16px; bottom:16px; z-index:9999;
    background:#111;color:#fff;padding:10px 14px;border-radius:8px;opacity:.95
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function waitForAuth() {
  return new Promise((resolve) => {
    const ready = (u) => resolve(u || null);
    if (auth.currentUser) return ready(auth.currentUser);
    const unsub = onAuthStateChanged(auth, (u) => {
      unsub();
      ready(u);
    });
  });
}

async function ensureLoginIfRequired() {
  if (FORCE_LOGIN) return currentUser;
  const user = await waitForAuth();
  if (!user && FORCE_LOGIN) {
    const ret = encodeURIComponent(location.href);
    location.replace(`../kayit/index.html?returnUrl=${ret}`);
  }
  return user;
}

async function readCatalogTopics() {
  try {
    const qy = query(collection(db, "catalogTopics"), orderBy("order", "asc"));
    const snap = await getDocs(qy);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("[home] readCatalogTopics error:", err);
    return [];
  }
}

async function getLatestVideos(n = 3) {
  try {
    const qy = query(
      collection(db, "catalogVideos"),
      orderBy("createdAt", "desc"),
      limit(n)
    );
    const snap = await getDocs(qy);
    const out = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      _type: "video",
    }));
    console.log("[home] latest videos:", out.length);
    return out;
  } catch (err) {
    console.error("[home] getLatestVideos error:", err);
    throw err;
  }
}

async function getLatestAnimations(n = 3) {
  try {
    const qy = query(
      collection(db, "catalogAnimations"),
      orderBy("createdAt", "desc"),
      limit(n)
    );
    const snap = await getDocs(qy);
    const out = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      _type: "anim",
    }));
    console.log("[home] latest anims:", out.length);
    return out;
  } catch (err) {
    console.error("[home] getLatestAnimations error:", err);
    throw err;
  }
}

async function readAllProgress(uid) {
  const paths = [
    ["progressAnimations", "anim"],
    ["progressVideos", "vids"],
    ["testsProgress", "tA"],
    ["videoTests", "tV"],
    ["generalTests", "tG"],
  ];
  const results = {};
  try {
    const snaps = await Promise.all(
      paths.map(([sub]) => getDocs(collection(db, "users", uid, sub)))
    );

    const anim = new Map(snaps[0].docs.map((d) => [d.id, d.data()]));
    const vids = new Map(snaps[1].docs.map((d) => [d.id, d.data()]));

    const tests = new Map();
    const fold = (snap) =>
      snap.docs.forEach((d) => {
        const x = d.data();
        const percent =
          typeof x.percent === "number"
            ? x.percent
            : typeof x.score === "number" &&
              typeof x.total === "number" &&
              x.total > 0
            ? Math.round((x.score / x.total) * 100)
            : 0;
        tests.set(d.id, {
          ...x,
          percent: clamp(percent),
          passed: percent >= 60,
        });
      });
    fold(snaps[2]);
    fold(snaps[3]);
    fold(snaps[4]);

    let totalVideoSec = 0;
    snaps[1].forEach?.((d) => {
      const x = d.data();
      if (Number.isFinite(x?.durationSec)) totalVideoSec += x.durationSec;
    });

    results.anim = anim;
    results.vids = vids;
    results.tests = tests;
    results.counts = { totalVideoMin: Math.round(totalVideoSec / 60) };

    console.log("[home] progress:", {
      anim: anim.size,
      vids: vids.size,
      tests: tests.size,
      totalVideoMin: results.counts.totalVideoMin,
    });

    return results;
  } catch (err) {
    console.error("[home] readAllProgress error:", err);
    throw err;
  }
}

function computeAvgTestPercent(testsMap) {
  const arr = [...(testsMap?.values?.() || [])];
  const vals = arr
    .map((x) => {
      if (Number.isFinite(x?.percent)) return x.percent;
      if (
        Number.isFinite(x?.score) &&
        Number.isFinite(x?.total) &&
        x.total > 0
      ) {
        return Math.round((x.score / x.total) * 100);
      }
      return null;
    })
    .filter((n) => Number.isFinite(n));

  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function averageVideoProgress(progress) {
  const arr = [...(progress.vids?.values?.() || [])];
  if (!arr.length) return 0;
  const vals = arr.map((x) =>
    typeof x.progress === "number" ? x.progress : 0
  );
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
function averageAnimProgress(progress) {
  const arr = [...(progress.anim?.values?.() || [])];
  if (!arr.length) return 0;
  const vals = arr.map((x) =>
    typeof x.progress === "number" ? x.progress : 0
  );
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}
function computeWeeklyScore(progress) {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const vArr = [...(progress.vids?.values?.() || [])];
  const aArr = [...(progress.anim?.values?.() || [])];
  const tArr = [...(progress.tests?.values?.() || [])];
  const hit = (x) =>
    tsToMillis(x?.lastViewed) ||
    tsToMillis(x?.updatedAt) ||
    tsToMillis(x?.takenAt) ||
    0;
  const recent =
    vArr.filter((x) => hit(x) >= weekAgo).length +
    aArr.filter((x) => hit(x) >= weekAgo).length +
    tArr.filter((x) => hit(x) >= weekAgo).length;
  const total = vArr.length + aArr.length + tArr.length || 1;
  return Math.round((recent / total) * 100);
}

function setResult(selector, value, opts = {}) {
  const root = document.querySelector(selector);
  if (!root) {
    console.warn("[setResult] kök bulunamadı:", selector);
    return;
  }

  let v = 0;
  if (typeof value === "string") {
    const m = value.match(/[\d.]+/);
    v = m ? parseFloat(m[0]) : 0;
  } else if (typeof value === "number") {
    v = value;
  }
  v = Math.round(clamp(v));

  if (opts.persist) {
    root.dataset.resultValue = String(v);
  }

  applyResultToNode(root, v);

  if (opts.observe) {
    if (root._resultObserver) return;
    const debounced = debounce(() => {
      const keep = root.dataset.resultValue;
      const vv = Number.isFinite(+keep) ? clamp(+keep) : v;
      applyResultToNode(root, Math.round(vv));
    }, 50);

    const obs = new MutationObserver(debounced);
    obs.observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "style",
        "data-score",
        "aria-valuenow",
        "value",
        "class",
      ],
    });
    root._resultObserver = obs;
  }
}

function applyResultToNode(root, v) {
  const textEl = root.querySelector(".result-box span");
  if (textEl) textEl.textContent = String(v);

  const radial = root.querySelector(".radial-progress, [data-radial]");
  if (radial) {
    radial.style.setProperty("--value", v);
    radial.setAttribute("aria-valuenow", String(v));
    radial.dataset.value = String(v);
  }

  const bar = root.querySelector(".progress__bar, .progress-bar, .bar");
  if (bar) bar.style.width = `${v}%`;

  const prog = root.querySelector("progress");
  if (prog) {
    prog.max = 100;
    prog.value = v;
    prog.setAttribute("value", String(v));
    prog.setAttribute("aria-valuenow", String(v));
  }

  const scored = root.querySelector("[data-score]");
  if (scored) scored.setAttribute("data-score", String(v));

  const aria = root.querySelector('[role="progressbar"]');
  if (aria) aria.setAttribute("aria-valuenow", String(v));

  const svgCircle =
    root.querySelector("[data-circumference]") ||
    (() => {
      const c = root.querySelector("circle");
      if (!c) return null;
      const r = parseFloat(c.getAttribute("r") || "0");
      if (!r) return null;
      const C = 2 * Math.PI * r;
      c.dataset.circumference = String(C);
      c.style.strokeDasharray = String(C);
      return c;
    })();

  if (svgCircle) {
    const C = Number(svgCircle.getAttribute("data-circumference")) || 100;
    const off = C * (1 - v / 100);
    svgCircle.style.strokeDashoffset = String(off);
  }
}

function debounce(fn, ms = 100) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), ms);
  };
}

async function renderNewAdded() {
  try {
    const [videos, anims] = await Promise.allSettled([
      getLatestVideos(3),
      getLatestAnimations(3),
    ]);

    const v = videos.status === "fulfilled" ? videos.value : [];
    const a = anims.status === "fulfilled" ? anims.value : [];

    const manual = (MANUAL_ITEMS || []).map((m) => ({
      ...m,
      seoDescription: m.description,
      createdAt: m.createdAt || new Date(),
      _manual: true,
    }));

    let merged = [...v, ...a, ...manual].sort(
      (x, y) => (tsToMillis(y.createdAt) || 0) - (tsToMillis(x.createdAt) || 0)
    );

    if (MANUAL_MODE && manual.length) {
      const topManual = manual.sort(
        (x, y) =>
          (tsToMillis(y.createdAt) || 0) - (tsToMillis(x.createdAt) || 0)
      )[0];
      merged = [topManual, ...merged.filter((i) => i.id !== topManual.id)];
    }

    const top = merged[0];
    if (top) {
      const kind = top._type === "video" ? "Video" : "Animasyon";
      const title =
        top.title || (kind === "Video" ? "Yeni Video" : "Yeni Animasyon");
      const text =
        top.description ||
        top.seoDescription ||
        "Son eklenen içeriklerimizi keşfedin!";

      $(".card-new .name")?.replaceChildren(document.createTextNode(title));
      $(".card-new .function")?.replaceChildren(document.createTextNode(kind));
      $(".card-new .new-page-text")?.replaceChildren(
        document.createTextNode(text)
      );

      const imageDiv = document.querySelector(".card-new .image");
      if (imageDiv) {
        const bg = top.image || top.thumbnail || "";
        if (bg) imageDiv.style.backgroundImage = `url('${bg}')`;
      }

      const btn = $(".card-new .request");
      if (btn) {
        const href = top.href
          ? top.href
          : top._type === "video"
          ? `../videoo/index.html?id=${encodeURIComponent(top.id)}`
          : `../animasyonn/index.html?id=${encodeURIComponent(top.id)}`;
        btn.onclick = () => (location.href = href);
      }
    }

    $(".recommendations-title")?.replaceChildren(
      document.createTextNode("Öneriler")
    );
  } catch (err) {
    console.error("[home] renderNewAdded error:", err);

    if ((MANUAL_ITEMS || []).length) {
      const f = { ...MANUAL_ITEMS[0], _type: MANUAL_ITEMS[0]._type || "anim" };
      $(".card-new .name")?.replaceChildren(
        document.createTextNode(f.title || "Yeni İçerik")
      );
      $(".card-new .function")?.replaceChildren(
        document.createTextNode(f._type === "video" ? "Video" : "Animasyon")
      );
      $(".card-new .new-page-text")?.replaceChildren(
        document.createTextNode(f.description || "Yeni içerikleri keşfet.")
      );

      const imageDiv = document.querySelector(".card-new .image");
      if (imageDiv && f.image)
        imageDiv.style.backgroundImage = `url('${f.image}')`;
      const btn = $(".card-new .request");
      if (btn) btn.onclick = () => (location.href = f.href || "#");

      banner(
        "Yeni eklenenler Firestore’dan yüklenemedi, manüel içerik gösteriliyor.",
        "warn"
      );
      return;
    }

    banner("Yeni eklenenler yüklenemedi.", "error");
  }
}

function renderWeeklyAndSummary(progress) {
  const vidPct = averageVideoProgress(progress);
  const animPct = averageAnimProgress(progress);
  const testPct = computeAvgTestPercent(progress.tests);
  const weekly = computeWeeklyScore(progress);
  const overall = Math.round((vidPct + animPct + testPct) / 3);

  const bigNum = document.querySelector(
    ".results-summary-container__result .heading-primary"
  );
  if (bigNum) bigNum.textContent = String(clamp(overall));

  setResult(".result-option-reaction", animPct, {
    persist: true,
    observe: true,
  });
  setResult(".result-option-memory", testPct, { persist: true, observe: true });
  setResult(".result-option-verbal", vidPct, { persist: true, observe: true });
  setResult(".result-option-Visual", weekly, { persist: true, observe: true });

  const seeBtn = $(".btn-continue.btn__continue");
  if (seeBtn)
    seeBtn.onclick = () => (location.href = "../profilll2/index.html");
}

/* ===========================
   3) Öneriler (offer-list)
   — 5 ŞARTLI MANTIĞA GÖRE YENİDEN YAZILDI
   =========================== */
// 5 şart yardımcıları (progress: {anim, vids, tests})
function videoProgressPercent(rec) {
  if (!rec) return 0;
  if (typeof rec.progress === "number") return clamp(Math.round(rec.progress));
  const d = Number(rec.durationSec || 0);
  const w = Number(rec.watchedSec || 0);
  if (d <= 0) return rec.completed ? 100 : 0;
  return clamp(Math.round((w / d) * 100));
}
function hasVideoCompleted(vidMap, id) {
  const rec = vidMap.get(String(id));
  const pct = videoProgressPercent(rec);
  return !!(rec && (rec.completed === true || pct >= 90));
}
function hasTestPassedById(testsMap, idLike) {
  const rec = testsMap.get(String(idLike));
  if (!rec) return false;
  return rec.passed === true || (rec.percent ?? 0) >= 60;
}
function hasGeneralTestPassed(testsMap, topic) {
  const rec =
    testsMap.get(topic.slug) ||
    testsMap.get(topic.title) ||
    testsMap.get(norm(topic.slug)) ||
    testsMap.get(norm(topic.title));
  return !!(rec && (rec.passed === true || (rec.percent ?? 0) >= 60));
}
function hasAnimCompleted(animMap, topic) {
  const keys = [
    topic.title,
    topic.slug,
    `${topic.id}`,
    norm(topic.title),
    norm(topic.slug),
  ];
  for (const k of keys) {
    const rec = animMap.get(k);
    if (rec && (rec.completed === true || (rec.progress ?? 0) >= 100))
      return true;
  }
  return false;
}
function checkTopicFlags(topic, progress) {
  const okGeneral = hasGeneralTestPassed(progress.tests, topic);
  const okAnim = hasAnimCompleted(progress.anim, topic);
  const okVideo = hasVideoCompleted(progress.vids, topic.id);
  const okTopicTest = hasTestPassedById(progress.tests, topic.id); // konu testi
  const okVideoTest =
    hasTestPassedById(progress.tests, `v${topic.id}`) ||
    hasTestPassedById(progress.tests, topic.id); // video testi bazen id ile gelebilir
  return { okGeneral, okAnim, okVideo, okTopicTest, okVideoTest };
}
const isTopicDone = (f) =>
  f.okGeneral && f.okAnim && f.okVideo && f.okTopicTest && f.okVideoTest;

function scoreTopicFor5Conditions(topic, progress) {
  const f = checkTopicFlags(topic, progress);
  const completedCount = [
    f.okGeneral,
    f.okTopicTest,
    f.okVideoTest,
    f.okVideo,
    f.okAnim,
  ].filter(Boolean).length;
  const score = clamp(Math.round((completedCount / 5) * 100));

  const missing = [];
  if (!f.okGeneral) missing.push({ type: "generalTest" });
  if (!f.okTopicTest) missing.push({ type: "topicTest" });
  if (!f.okVideoTest) missing.push({ type: "videoTest" });
  if (!f.okVideo) missing.push({ type: "video" });
  if (!f.okAnim) missing.push({ type: "anim" });

  return { score, missing, topic };
}

function createSuggestionCard({ title, subtitle, text, btnLabel, href }) {
  const li = document.createElement("li");
  li.className = "offer-1";
  li.innerHTML = `
    <div class="card-suggestion">
      <div class="corner">
        <i data-corner="tl"></i>
        <i data-corner="br"></i>
        <div data-action="notif" class="action">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"></path>
            <path d="M16 8m-3 0a3 3 0 1 0 8 0a3 3 0 1 0 -8 0" class="dot" fill="red"></path>
          </svg>
        </div>
        <div data-action="more" class="action">
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 7l-11 11"></path>
            <path d="M8 7l9 0l0 9"></path>
          </svg>
        </div>
      </div>

      <figure class="boxes">
        <span class="img">🎯</span>
        <figcaption class="caption">
          <p class="name">${title}</p>
          <span class="as">${subtitle}</span>
        </figcaption>
      </figure>

      <div class="box-body">
        <div class="box-content">
          <span class="img">📌</span>
          <div class="caption">
            <p>${text}</p>
          </div>
        </div>
      </div>

      <div data-title="${btnLabel}" class="box-foot">
        <figure class="box-foot-figure">
          <figcaption class="font-medium">${btnLabel}</figcaption>
          <button type="button" class="go-btn-mini">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 7l-10 10"></path>
              <path d="M8 7l9 0l0 9"></path>
            </svg>
          </button>
        </figure>
        <div class="box-foot-actions"></div>
      </div>
    </div>`;
  li.querySelector(".go-btn-mini").onclick = () => (location.href = href);
  return li;
}

function renderSuggestions(_topics, progress) {
  const ul = $(".offer-list");
  if (!ul) return;
  ul.innerHTML = "";

  if (!progress) {
    ul.appendChild(
      createSuggestionCard({
        title: "Kişiselleştirilmiş öneriler",
        subtitle: "Giriş yaparsan ilerlemeni takip ederim",
        text: "Profiline giriş yap ve sana özel içerik önerileri al.",
        btnLabel: "Profili Aç",
        href: "../profilll2/index.html",
      })
    );
    return;
  }

  const scored = TOPICS.map((t) => scoreTopicFor5Conditions(t, progress))
    .filter((x) => x.score < 100)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!scored.length) {
    ul.appendChild(
      createSuggestionCard({
        title: "Harika gidiyorsun!",
        subtitle: "Eksik konu görünmüyor",
        text: "İstersen yeni eklenen videolara göz at.",
        btnLabel: "Yeni Eklenenler",
        href: "../videoo/index.html",
      })
    );
    return;
  }

  for (const s of scored) {
    const t = s.topic;

    const next =
      s.missing.find((m) => m.type === "generalTest") ||
      s.missing.find((m) => m.type === "topicTest") ||
      s.missing.find((m) => m.type === "videoTest") ||
      s.missing.find((m) => m.type === "video") ||
      s.missing.find((m) => m.type === "anim");

    if (!next) continue;

    let action = { title: "", subtitle: "", text: "", btnLabel: "", href: "#" };

    if (next.type === "generalTest") {
      action = {
        title: t.title,
        subtitle: "Genel test eksik",
        text: "Rozete çok az kaldı! Önce genel testi tamamlayalım.",
        btnLabel: "Genel Teste Git",
        href: hrefGeneralTest(t),
      };
    } else if (next.type === "topicTest") {
      action = {
        title: t.title,
        subtitle: "Konu testi eksik",
        text: "Konu testini geçersen rozet için büyük adım.",
        btnLabel: "Konu Testini Çöz",
        href: hrefTopicTest(t),
      };
    } else if (next.type === "videoTest") {
      action = {
        title: t.title,
        subtitle: "Video testi eksik",
        text: "Video testini tamamlayıp rozet yoluna devam et.",
        btnLabel: "Video Testine Git",
        href: hrefVideoTest(t),
      };
    } else if (next.type === "video") {
      action = {
        title: t.title,
        subtitle: "Video ilerlemesi %90 altı",
        text: "Videoda en az %90 izlemeye ulaşman gerekiyor.",
        btnLabel: "Videoyu Aç",
        href: `../videoo/index.html#play=${encodeURIComponent(t.id)}`,
      };
    } else if (next.type === "anim") {
      action = {
        title: t.title,
        subtitle: "Animasyon tamam değil",
        text: "Animasyonu bitirdiğinde bir şart daha tamamlanmış olacak.",
        btnLabel: "Animasyonu Aç",
        href: hrefAnimation(t),
      };
    }

    ul.appendChild(createSuggestionCard(action));
  }
}

async function initHome() {
  console.log("[home] init başlıyor…");

  await renderNewAdded();

  const user = await ensureLoginIfRequired();
  if (!user) {
    console.log("[home] kullanıcı yok → genel görünüm");
    renderSuggestions([], null);
    toast("Genel öneriler gösteriliyor.");
    return;
  }

  console.log("[home] kullanıcı:", user.uid);

  let progress;
  try {
    [progress] = await Promise.all([
      readAllProgress(user.uid),
      readCatalogTopics(),
    ]);
  } catch (err) {
    console.error("[home] data load error:", err);
    if (String(err).includes("Missing or insufficient permissions")) {
      banner(
        `Kullanıcı verileri veya katalog okunamadı (permissions). Firestore Rules’ı kontrol et:
         <ul style="margin:6px 0 0 18px">
           <li><code>catalogTopics</code>, <code>catalogVideos</code>, <code>catalogAnimations</code> → read</li>
           <li><code>users/{uid}/**</code> → sadece kendi uid’si read/write</li>
         </ul>`,
        "error"
      );
    } else {
      banner(
        "Veriler yüklenirken bir hata oluştu. Konsolu kontrol et.",
        "error"
      );
    }
    return;
  }

  try {
    renderWeeklyAndSummary(progress);
  } catch (err) {
    console.error("[home] renderWeeklyAndSummary error:", err);
  }

  try {
    renderSuggestions(TOPICS, progress);
  } catch (err) {
    console.error("[home] renderSuggestions error:", err);
  }

  toast("Home verileri yüklendi ✅");
}

window.addEventListener("DOMContentLoaded", initHome);
