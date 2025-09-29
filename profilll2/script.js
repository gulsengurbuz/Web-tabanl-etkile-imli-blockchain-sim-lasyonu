import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { auth, db } from "../firebase-init.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const clamp = (n, a = 0, b = 100) => Math.max(a, Math.min(b, n));

function waitForAuth() {
  return new Promise((resolve) => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = onAuthStateChanged(auth, (u) => {
      unsub();
      resolve(u || null);
    });
  });
}

function initTabs() {
  const btns = $$(".tab-button");
  const cons = $$(".tab-content");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-tab");
      btns.forEach((b) => b.classList.remove("active"));
      cons.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(id)?.classList.add("active");
    });
  });
}

function requireUser() {
  const u = auth.currentUser;
  if (!u) throw new Error("Kullanıcı oturumu yok.");
  return u;
}

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
const findTopicByTitle = (title) => {
  const n = norm(title);
  return TOPICS.find((t) => norm(t.title) === n);
};

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

async function loadUserCard(uid) {
  const profRef = doc(db, "users", uid);
  const snap = await getDoc(profRef);
  const prof = snap.exists() ? snap.data() : {};

  const name = prof.displayName || auth.currentUser.displayName || "Kullanıcı";
  const uname =
    prof.username ||
    (auth.currentUser.email ? auth.currentUser.email.split("@")[0] : "anon");
  const bio = prof.bio || "Merhaba! 👋";
  const photo =
    prof.photoURL ||
    auth.currentUser.photoURL ||
    "https://i.pravatar.cc/120?img=20";

  $(".user-details h1") && ($(".user-details h1").textContent = name);
  $(".user-details .username") &&
    ($(".user-details .username").textContent = "@" + uname);
  $(".user-details .bio") && ($(".user-details .bio").textContent = bio);
  $(".avatar img") && ($(".avatar img").src = photo);
}

async function readAllProgress(uid) {
  const [animSnap, vidSnap, topicTestsSnap, videoTestsSnap, generalSnap] =
    await Promise.all([
      getDocs(collection(db, "users", uid, "progressAnimations")),
      getDocs(collection(db, "users", uid, "progressVideos")),
      getDocs(collection(db, "users", uid, "testsProgress")),
      getDocs(collection(db, "users", uid, "videoTests")),
      getDocs(collection(db, "users", uid, "generalTests")),
    ]);

  const anim = new Map(animSnap.docs.map((d) => [d.id, d.data()]));
  const vids = new Map(vidSnap.docs.map((d) => [d.id, d.data()]));
  const vidsArr = vidSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

  const tests = new Map();
  const topicTests = [];
  const videoTests = [];
  const generalTests = [];

  const fold = (snap, source) =>
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

      const rec = {
        ...x,
        percent: clamp(percent),
        passed: percent >= 60,
        _source: source,
      };
      tests.set(d.id, rec);
      if (source === "topic") topicTests.push({ id: d.id, ...rec });
      else if (source === "video") videoTests.push({ id: d.id, ...rec });
      else if (source === "general") generalTests.push({ id: d.id, ...rec });
    });

  fold(topicTestsSnap, "topic");
  fold(videoTestsSnap, "video");
  fold(generalSnap, "general");

  let totalVideoSec = 0;
  vidSnap.forEach((d) => {
    const x = d.data();
    if (Number.isFinite(x?.durationSec)) totalVideoSec += x.durationSec;
  });

  const animList = [...anim.values()];
  const vidList = [...vids.values()];
  const counts = {
    completedAnims: animList.filter((x) => x?.completed).length,
    inprogressAnims: animList.filter(
      (x) => !x?.completed && (x?.progress || 0) > 0
    ).length,
    completedVids: vidList.filter((x) => x?.completed).length,
    inprogressVids: vidList.filter(
      (x) => !x?.completed && (x?.progress || 0) > 0
    ).length,
    totalVideoMin: Math.round(totalVideoSec / 60),
  };

  return {
    anim,
    vids,
    vidsArr,
    tests,
    topicTests,
    videoTests,
    generalTests,
    counts,
  };
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

function hasTestPassedById(testsMap, id) {
  const rec = testsMap.get(String(id)) || testsMap.get(`v${id}`);
  return !!(rec && (rec.passed === true || (rec.percent ?? 0) >= 60));
}

function hasGeneralTestPassed(testsMap, topic) {
  const rec =
    testsMap.get(topic.title) ||
    testsMap.get(topic.slug) ||
    testsMap.get(norm(topic.title)) ||
    testsMap.get(norm(topic.slug));
  return !!(rec && (rec.passed === true || (rec.percent ?? 0) >= 60));
}

function checkTopicFlags(topic, progress) {
  const okGeneral = hasGeneralTestPassed(progress.tests, topic);
  const okAnim = hasAnimCompleted(progress.anim, topic);
  const okVideo = hasVideoCompleted(progress.vids, topic.id);
  const okTest = hasTestPassedById(progress.tests, topic.id);
  const okVideoTest =
    hasTestPassedById(progress.tests, `v${topic.id}`) ||
    hasTestPassedById(progress.tests, topic.id);
  return { okGeneral, okAnim, okVideo, okTest, okVideoTest };
}
const isTopicDone = (f) =>
  f.okGeneral && f.okAnim && f.okVideo && f.okTest && f.okVideoTest;

async function awardBadgeIfNeeded(uid, topic) {
  const badgeRef = doc(db, "users", uid, "badges", topic.slug);
  const cur = await getDoc(badgeRef);
  if (cur.exists()) return false;
  await setDoc(
    badgeRef,
    {
      title: topic.title,
      topicId: topic.id,
      slug: topic.slug,
      earnedAt: serverTimestamp(),
    },
    { merge: true }
  );
  return true;
}

function renderLastWatchedVideo(vidsArr) {
  if (!Array.isArray(vidsArr) || vidsArr.length === 0) return;

  vidsArr.sort((a, b) => {
    const ta = a.lastViewed?.toMillis?.() || 0;
    const tb = b.lastViewed?.toMillis?.() || 0;
    if (tb !== ta) return tb - ta;
    return (b.watchedSec || 0) - (a.watchedSec || 0);
  });

  const v = vidsArr[0];
  const root = document.querySelector(
    ".continue-content .continue-item:nth-child(1)"
  );
  if (!root) return;

  const titleEl = root.querySelector(".content-title");
  const bar = root.querySelector(".progress-fill");
  const info = root.querySelector(".progress-info span:first-child");
  const pctEl = root.querySelector(".progress-info span:last-child");
  const btn = root.querySelector(".btn.btn-primary");

  const pct = videoProgressPercent(v);

  titleEl && (titleEl.textContent = v.title || `Video #${v.id}`);
  bar && (bar.style.width = `${pct}%`);
  if (info) {
    const mm = (s) =>
      `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
    const dur = Number(v.durationSec || 0);
    const wat = Number(v.watchedSec || 0);
    info.textContent = `${mm(wat)} / ${mm(dur || wat)}`;
  }
  pctEl && (pctEl.textContent = `${pct}%`);
  btn &&
    (btn.onclick = () =>
      (location.href = `../videoo/index.html#play=${encodeURIComponent(
        v.id
      )}`));
}

function urlForTestRecord(rec) {
  if (!rec) return "#";

  if (rec._source === "general") {
    const topic = findTopicBySlug(rec.id) || findTopicByTitle(rec.id);
    return topic ? hrefGeneralTest(topic) : "#";
  }

  if (rec._source === "topic") {
    const n = String(rec.id).replace(/^v/i, "");
    const topic = findTopicById(n);
    return topic ? hrefTopicTest(topic) : "#";
  }

  if (rec._source === "video") {
    const n = String(rec.id).replace(/^v/i, "");
    const topic = findTopicById(n);
    return topic ? hrefVideoTest(topic) : "#";
  }

  const asNum = Number(String(rec.id).replace(/^v/i, ""));
  if (!Number.isNaN(asNum) && asNum >= 1 && asNum <= TOPICS.length) {
    const topic = findTopicById(asNum);
    return rec.id.toString().startsWith("v")
      ? hrefVideoTest(topic)
      : hrefTopicTest(topic);
  }

  const tBySlug = findTopicBySlug(rec.id) || findTopicByTitle(rec.id);
  if (tBySlug) return hrefGeneralTest(tBySlug);

  return "#";
}

function renderLastTest(testsMap) {
  const list = [...testsMap.entries()].map(([id, x]) => ({ id, ...x }));
  if (!list.length) return;

  list.sort((a, b) => {
    const ta = a.takenAt?.toMillis?.() || 0;
    const tb = b.takenAt?.toMillis?.() || 0;
    return tb - ta;
  });
  const t = list[0];

  const root = document.querySelector(
    ".continue-content .continue-item:nth-child(2)"
  );
  if (!root) return;

  const titleEl = root.querySelector(".content-title");
  const scoreEl = root.querySelector(".test-score span");
  const btn = root.querySelector(".btn.btn-outline");

  const haveST =
    Number.isFinite(t.score) && Number.isFinite(t.total) && t.total > 0;
  const percent =
    typeof t.percent === "number"
      ? clamp(t.percent)
      : haveST
      ? clamp(Math.round((t.score / t.total) * 100))
      : 0;

  const href = urlForTestRecord(t);

  titleEl && (titleEl.textContent = t.title || `Test #${t.id}`);
  scoreEl &&
    (scoreEl.textContent = haveST
      ? `${t.score}/${t.total} doğru (${percent}%)`
      : `${percent}% tamamlandı`);
  btn && (btn.onclick = () => (location.href = href));
}

function computeAvgGeneralPercent(generalTests) {
  const arr = generalTests
    .map((t) => t.percent)
    .filter((n) => typeof n === "number");
  if (!arr.length) return 0;
  return clamp(Math.round(arr.reduce((a, b) => a + b, 0) / arr.length));
}
function computeAvgVideoProgress(vidMap) {
  const vals = [...vidMap.values()].map(videoProgressPercent);
  if (!vals.length) return 0;
  return clamp(Math.round(vals.reduce((a, b) => a + b, 0) / vals.length));
}

/* =========================================================================
   7) Konu listesi (kilitli/gri) ve genel ilerleme
   ========================================================================= */
function renderTopics(topics, doneSet) {
  const list = $("#topicsList");
  if (!list) return;
  list.innerHTML = "";
  topics.forEach((t, idx) => {
    const done = doneSet.has(t.id);
    const div = document.createElement("div");
    div.className = `topic-item ${done ? "completed" : "locked"}`;
    div.innerHTML = `
      <div class="topic-icon ${done ? "completed" : "locked"}">
        ${
          done
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-lock"></i>'
        }
      </div>
      <div class="topic-info">
        <h4 class="topic-name ${done ? "completed" : "locked"}">${t.title}</h4>
        <p class="topic-number">Konu ${idx + 1}</p>
      </div>
      ${
        done
          ? `<div class="topic-badge"><i class="fas fa-check-circle"></i> Tamamlandı</div>`
          : ``
      }
    `;
    list.appendChild(div);
  });
}

function renderDashboardSummary({
  counts,
  avgGeneral,
  avgVideo,
  doneTopicsCount,
  totalTopicCount,
}) {
  const pctAll = clamp(
    Math.round((doneTopicsCount / Math.max(1, totalTopicCount)) * 100)
  );

  const headerPct = $(".profile-header .progress-percent");
  const headerFill = $(".profile-header .progress-fill");
  const headerText = $(".profile-header .progress-text");
  headerPct && (headerPct.textContent = `${pctAll}%`);
  headerFill && (headerFill.style.width = `${pctAll}%`);
  headerText &&
    (headerText.innerHTML = `🟡 ${doneTopicsCount}/${totalTopicCount} konu tamamlandı`);

  const animCard = document.querySelectorAll(".dashboard-card")[0];
  if (animCard) {
    const rows = animCard.querySelectorAll(".stat-row .badge");
    rows[0] && (rows[0].textContent = counts.completedAnims);
    rows[1] && (rows[1].textContent = counts.inprogressAnims);
    rows[2] &&
      (rows[2].textContent = Math.max(
        0,
        22 - (counts.completedAnims + counts.inprogressAnims)
      ));
  }

  const dashVals = $$(".dashboard-card .stat-value");
  dashVals[0] && (dashVals[0].textContent = `${counts.totalVideoMin} dk`);
  dashVals[1] && (dashVals[1].textContent = `${avgVideo}%`);
  const barVideo = $$(".dashboard-card .progress-fill")[0];
  barVideo && (barVideo.style.width = `${avgVideo}%`);

  const statNums = $$(".stat-card .stat-number");
  statNums[0] &&
    (statNums[0].textContent = (counts.totalVideoMin / 60).toFixed(1));
  statNums[1] && (statNums[1].textContent = doneTopicsCount);
  statNums[3] && (statNums[3].textContent = `${avgGeneral}%`);
}

async function renderBadgesLocked(uid, doneSet) {
  const snap = await getDocs(collection(db, "users", uid, "badges"));
  const earned = new Set();
  snap.forEach((d) => earned.add(d.id));

  const grid = $("#badgesGrid");
  if (!grid) return earned.size;
  grid.innerHTML = "";

  for (const t of TOPICS) {
    const unlocked = earned.has(t.slug) || doneSet.has(t.id);
    const el = document.createElement("div");
    el.className = `badge-card ${unlocked ? "unlocked" : "locked"}`;
    el.innerHTML = `
      <div class="badge-icon">
        ${
          unlocked
            ? '<i class="fas fa-award"></i>'
            : '<i class="fas fa-lock"></i>'
        }
      </div>
      <h3 class="badge-title">${t.title}</h3>
      <p class="badge-description">Konu: ${t.id}</p>
      <div class="badge-status">
        ${
          unlocked
            ? '<i class="fas fa-check"></i> Açıldı'
            : "Kilidi açmak için konuyu tamamla"
        }
      </div>
    `;
    grid.appendChild(el);
  }

  return Math.max(earned.size, doneSet.size);
}

/* =========================================================================
   9) Öneriler — linkler yeni patikalarla
   ========================================================================= */
function scoreTopicAndMissing(topic, progress) {
  const f = checkTopicFlags(topic, progress);
  const missing = [];
  if (!f.okGeneral) missing.push({ type: "generalTest", id: topic.slug });
  if (!f.okTest) missing.push({ type: "quiz", id: topic.id });
  if (!f.okVideoTest) missing.push({ type: "videoQuiz", id: topic.id });
  if (!f.okVideo) missing.push({ type: "video", id: topic.id });
  if (!f.okAnim) missing.push({ type: "anim", id: topic.slug });
  const done = 5 - missing.length;
  const score = clamp(Math.round((done / 5) * 100));
  return { score, missing, topic };
}

function renderRecommendations(topics, progress) {
  const wrap = document.querySelector("#stats .recommendations");
  if (!wrap) return;

  const header = wrap.querySelector(".section-header");
  wrap.innerHTML = "";
  header && wrap.appendChild(header);

  const items = topics
    .map((t) => scoreTopicAndMissing(t, progress))
    .filter((x) => x.score < 100)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!items.length) {
    const ok = document.createElement("div");
    ok.style.opacity = ".8";
    ok.textContent = "Her şey yolunda! Eksik görünen bir konu yok. 🎉";
    wrap.appendChild(ok);
    return;
  }

  for (const s of items) {
    const t = s.topic;
    const next =
      s.missing.find((m) =>
        ["generalTest", "quiz", "videoQuiz"].includes(m.type)
      ) ||
      s.missing.find((m) => m.type === "video") ||
      s.missing.find((m) => m.type === "anim");

    if (!next) continue;

    let action = { title: "", text: "", btn: "", href: "#" };
    if (next.type === "generalTest") {
      action = {
        title: `${t.title} – Genel Testi Tamamla`,
        text: `Rozete çok az kaldı! Genel test eksik.`,
        btn: "Genel Testi Aç",
        href: hrefGeneralTest(t),
      };
    } else if (next.type === "quiz") {
      action = {
        title: `${t.title} – Konu Testi`,
        text: `Konu testini geçersen rozet için büyük adım.`,
        btn: "Testi Çöz",
        href: hrefTopicTest(t),
      };
    } else if (next.type === "videoQuiz") {
      action = {
        title: `${t.title} – Video Testi`,
        text: `Video testini tamamla, rozet için avantaj!`,
        btn: "Video Testine Git",
        href: hrefVideoTest(t),
      };
    } else if (next.type === "video") {
      action = {
        title: `${t.title} – Videoya Devam`,
        text: `Videoda ≥%90’a ulaştığında şart tamam.`,
        btn: "Videoyu Aç",
        href: `../videoo/index.html#play=${encodeURIComponent(t.id)}`,
      };
    } else if (next.type === "anim") {
      action = {
        title: `${t.title} – Animasyonu Tamamla`,
        text: `Animasyonu bitirirsen şartlardan biri daha tamam.`,
        btn: "Animasyonu Aç",
        href: hrefAnimation(t),
      };
    }

    const item = document.createElement("div");
    item.className = "recommendation-item";
    item.innerHTML = `
      <h4><i class="fas fa-bullseye"></i> ${action.title}</h4>
      <p>${action.text}</p>
      <button class="btn ${
        ["generalTest", "quiz", "videoQuiz"].includes(next.type)
          ? "btn-outline"
          : next.type === "video"
          ? "btn-warning"
          : "btn-primary"
      }">${action.btn}</button>
    `;
    item.querySelector("button").onclick = () => (location.href = action.href);
    wrap.appendChild(item);
  }
}

/* =========================================================================
   10) Ufak animasyon
   ========================================================================= */
function addHoverAnimations() {
  $$(".progress-fill").forEach((bar) => {
    const w = bar.style.width || "0%";
    bar.style.width = "0%";
    setTimeout(() => (bar.style.width = w), 300);
  });
  $$(".dashboard-card, .stat-card, .badge-card").forEach((c) => {
    c.addEventListener(
      "mouseenter",
      () => (c.style.transform = "translateY(-4px)")
    );
    c.addEventListener(
      "mouseleave",
      () => (c.style.transform = "translateY(0)")
    );
  });
}

async function runProfile() {
  initTabs();
  const user = requireUser();

  await loadUserCard(user.uid);
  const progress = await readAllProgress(user.uid);

  renderLastWatchedVideo(progress.vidsArr);
  renderLastTest(progress.tests);

  const doneSet = new Set();
  for (const t of TOPICS) {
    const flags = checkTopicFlags(t, progress);
    if (isTopicDone(flags)) {
      doneSet.add(t.id);
      await awardBadgeIfNeeded(user.uid, t).catch(console.warn);
    }
  }

  const avgGeneral = computeAvgGeneralPercent(progress.generalTests);
  const avgVideo = computeAvgVideoProgress(progress.vids);

  const badgeCount = await renderBadgesLocked(user.uid, doneSet);

  renderTopics(TOPICS, doneSet);
  renderDashboardSummary({
    counts: progress.counts,
    avgGeneral,
    avgVideo,
    doneTopicsCount: doneSet.size,
    totalTopicCount: TOPICS.length,
  });

  const statNums = $$(".stat-card .stat-number");
  statNums[2] && (statNums[2].textContent = String(badgeCount));

  renderRecommendations(TOPICS, progress);

  addHoverAnimations();
}

document.addEventListener("DOMContentLoaded", async () => {
  const user = await waitForAuth();
  if (!user) {
    const ret = encodeURIComponent(location.href);
    location.replace(`../kayit/index.html?returnUrl=${ret}`);
    return;
  }
  runProfile();
});
