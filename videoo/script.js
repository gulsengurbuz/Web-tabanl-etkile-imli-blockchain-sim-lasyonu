import {
  markVideoProgress,
  saveVideoQuizResult,
} from "../shared/progress-client.js";

import { auth } from "../firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const DEBUG = true;
const log = (...args) => DEBUG && console.debug("[videos]", ...args);
const warn = (...args) => console.warn("[videos]", ...args);
const err = (...args) => console.error("[videos]", ...args);

const db = getFirestore();

window.__markVideoProgress = markVideoProgress;
window.__saveVideoQuizResult = saveVideoQuizResult;

const mockVideos = [
  {
    id: "1",
    slug: "veri",
    title: "Veri Nedir? Temel Kavramlar",
    description:
      "Veri türleri (yapısal, yarı-yapısal, yapısız), formatlar ve örneklerle temel giriş.",
    thumbnail: "../img/veri.png",
    duration: 9,

    level: "baslangic",
    category: "Temel Kavramlar",
    publishedAt: "2025-08-10",
    progress: 20,
    certified: true,
    video: {
      sources: [{ src: "./video/verivideo.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "2",
    slug: "veri-kaydi",
    title: "Veri Kaydı: Kalıcılık ve İzlenebilirlik",
    description:
      "Log, dosya ve kayıt defteri mantığı; dayanıklılık ve izlenebilirlik için iyi uygulamalar.",
    thumbnail: "../img/verikaydı.png",
    duration: 7.26,

    level: "baslangic",
    category: "Temel Kavramlar",
    publishedAt: "2025-08-11",
    progress: 0,
    video: {
      sources: [{ src: "./video/verikaydı.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "3",
    slug: "veritabani",
    title: "Veritabanı Temelleri",
    description:
      "İlişkisel/NoSQL veritabanları, şema, indeks, sorgu ve tutarlılık kavramları.",
    thumbnail: "../img/veritabanı.png",
    duration: 13,

    level: "baslangic",
    category: "Temel Kavramlar",
    publishedAt: "2025-08-12",
    video: {
      sources: [{ src: "./video/veritabanı.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "4",
    slug: "merkezi",
    title: "Merkezi Sistemler",
    description:
      "Merkezî mimarinin avantajları/dezavantajları ve tek hata noktası riski.",
    thumbnail: "../img/merkeziaq.png",
    duration: 16.19,
    level: "baslangic",
    category: "Ağ",
    publishedAt: "2025-08-13",
    progress: 45,
    video: {
      sources: [{ src: "./video/merkeziag.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "5",
    slug: "merkeziyetsiz",
    title: "Merkeziyetsiz Sistemler",
    description:
      "Aracı olmadan eşler arası etkileşim ve otoritenin dağılması yaklaşımı.",
    thumbnail: "../img/merkeziyetsizağ.png",
    duration: 10.01,

    level: "baslangic",
    category: "Ağ",
    publishedAt: "2025-08-14",
    certified: true,
    video: {
      sources: [{ src: "./video/merkeziyetsizağ.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "6",
    slug: "p2p",
    title: "P2P (Eşler Arası) Ağlar",
    description:
      "Eşler arası iletişim modeli, kaynak paylaşımı, güven ve ölçeklenebilirlik.",
    thumbnail: "../img/p2pağ.png",
    duration: 11,

    level: "baslangic",
    category: "Ağ",
    publishedAt: "2025-08-15",
    video: {
      sources: [{ src: "./video/p2p.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "7",
    slug: "dagitik-ag",
    title: "Dağıtık Ağ Mimarisi",
    description:
      "Dağıtık topolojiler, hata toleransı, çoğaltma ve tutarlılık stratejileri.",
    thumbnail: "../img/dağıtıkag.png",
    duration: 6.47,

    level: "orta",
    category: "Ağ",
    publishedAt: "2025-08-16",
    progress: 10,
    video: {
      sources: [{ src: "./video/dagitikağ.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "8",
    slug: "anahtar-yonetimi",
    title: "Anahtar Yönetimi",
    description:
      "Asimetrik kriptografi, özel/açık anahtar, cüzdanlar ve güvenli saklama.",
    thumbnail: "../img/anahtaryöntemi.png",
    duration: 7.36,
    level: "orta",
    category: "Kriptografi",
    publishedAt: "2024-01-24",
    video: {
      sources: [{ src: "./video/anahtar-yontemi.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "9",
    slug: "hash-fonksiyonlari",
    title: "Hash Fonksiyonları (SHA-256 vb.)",
    description:
      "Çakışma direnci, tek yönlülük, ön-imaj direnci ve pratik örnekler.",
    thumbnail: "../img/hashfonksiyonu.png",
    duration: 6.05,
    level: "orta",
    category: "Kriptografi",
    publishedAt: "2024-01-26",
    progress: 30,
    video: {
      sources: [{ src: "./video/hash.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "10",
    slug: "blockchainMekanizmalari",
    title: "Blockchain Mekanizması",
    description:
      "Blok ekleme süreci, zincirin bütünlüğü ve konsensüs ile etkileşim.",
    thumbnail: "../img/hashfonksiyonu.png",
    duration: 9.07,
    level: "orta",
    category: "Kriptografi",
    publishedAt: "2024-01-26",
    progress: 30,
    video: {
      sources: [
        { src: "./video/blockchainmekanizmasi.mp4", type: "video/mp4" },
      ],
    },
  },
  {
    id: "12",
    slug: "blok-yapisi",
    title: "Blok Yapısı",
    description:
      "Blok başlığı, gövde, önceki blok hash’i, nonce ve zorluk kavramları.",
    thumbnail: "../img/blokk.png",
    duration: 8.18,
    level: "orta",
    category: "Yapı",
    publishedAt: "2024-02-01",
    video: {
      sources: [{ src: "./video/blok.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "13",
    slug: "merkle-agaclari",
    title: "Merkle Ağaçları",
    description:
      "Merkle kökü, yaprak düğümler, doğrulama yolları ve veri bütünlüğü.",
    thumbnail: "../img/merklee.png",
    duration: 8.08,
    level: "orta",
    category: "Yapı",
    publishedAt: "2024-02-03",
    progress: 0,
    video: {
      sources: [{ src: "./video/merklee.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "14",
    slug: "blockchain",
    title: "Blockchain’e Genel Bakış",
    description:
      "Dağıtık defter, bloklar, konsensüs ve kriptografinin birleşimi.",
    thumbnail: "../img/blockchainproje.png",
    duration: 13.12,
    level: "baslangic",
    category: "Temel",
    publishedAt: "2024-02-05",
    certified: true,
    video: {
      sources: [{ src: "./video/blockchainasıl.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "16",
    slug: "pow",
    title: "Proof of Work (PoW)",
    description:
      "Madencilik, zorluk ayarı, nonce arama ve güvenlik/enerji dengesi.",
    thumbnail: "../img/pow.png",
    duration: 15.41,
    level: "ileri",
    category: "Konsensüs",
    publishedAt: "2024-02-10",
    progress: 60,
    video: {
      sources: [{ src: "./video/pow.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "17",
    slug: "pos",
    title: "Proof of Stake (PoS)",
    description:
      "Stake mantığı, doğrulayıcı seçimleri ve PoW’a alternatif yaklaşım.",
    thumbnail: "../img/pos.png",
    duration: 5.25,
    level: "orta",
    category: "Konsensüs",
    publishedAt: "2024-02-12",
    video: {
      sources: [{ src: "./video/pos.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "21",
    slug: "blockchainTürleri",
    title: "Blockchain Türleri",
    description:
      "Birden fazla kuruluşun ortak yönettiği veya hibrit tasarımların artıları/eksileri.",
    thumbnail: "../img/Hibrit.png",
    duration: 9.5,
    level: "orta",
    category: "Türler",
    publishedAt: "2024-02-18",
    video: {
      sources: [{ src: "./video/blocckhaintürleri.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "22",
    slug: "fork",
    title: "Çatallaşma (Fork): Soft vs Hard",
    description:
      "Protokol değişiklikleri, uyumluluk, topluluk kararları ve zincir ayrışmaları.",
    thumbnail: "../img/fork.png",
    duration: 13.28,
    level: "orta",
    category: "Yapı",
    publishedAt: "2024-02-20",
    video: {
      sources: [{ src: "./video/fork.mp4", type: "video/mp4" }],
    },
  },

  {
    id: "24",
    slug: "token-coin",
    title: "Token / Coin Mantığı",
    description:
      "Token vs coin, arz/dağıtım, ekonomik teşvikler ve kullanım durumları.",
    thumbnail: "../img/tokencoin.png",
    duration: 6.29,

    level: "orta",
    category: "Ekonomi",
    publishedAt: "2024-02-24",
    progress: 12,
    video: {
      sources: [{ src: "./video/tokencoinbase.mp4", type: "video/mp4" }],
    },
  },
  {
    id: "25",
    slug: "kullanim-alanlari",
    title: "Blockchain Kullanım Alanları",
    description:
      "Finans, tedarik zinciri, kimlik, oy verme ve daha fazlasına genel bakış.",
    thumbnail: "../img/Blockchainkullanimalanlari.png",
    duration: 6.06,

    level: "baslangic",
    category: "Uygulamalar",
    publishedAt: "2024-02-26",
    certified: true,
    video: {
      sources: [
        { src: "./video/Blockchainkullanimalanlari.mp4", type: "video/mp4" },
      ],
    },
  },
];

let filteredVideos = [...mockVideos];
let currentPage = 1;
const videosPerPage = 6;
let activeFilters = {
  search: "",
  categories: [],
  level: "",
  duration: 60,
  sortBy: "newest",
};

let progressMap = {};
let quizMap = {};

const searchInput = document.getElementById("searchInput");
const categoryTags = document.getElementById("categoryTags");
const levelSelect = document.getElementById("levelSelect");
const durationSlider = document.getElementById("durationSlider");
const durationValue = document.getElementById("durationValue");
const sortSelect = document.getElementById("sortSelect");
const clearFiltersBtn = document.getElementById("clearFilters");
const videoGrid = document.getElementById("videoGrid");
const videoCount = document.getElementById("videoCount");
const noResults = document.getElementById("noResults");
const pagination = document.getElementById("pagination");
const noResClearBtn = document.getElementById("noResClearBtn");
const heroContinueBtn = document.getElementById("heroContinueBtn");

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}s ${m}dk` : `${m}dk`;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
function formatTime(seconds) {
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, "0");
  const h = Math.floor(seconds / 3600);
  return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

function getDynamicProgressFor(video) {
  const p = progressMap?.[video.id];
  if (p && typeof p.pct === "number") {
    return {
      pct: p.pct,
      currentTime: p.currentTime || 0,
      duration: p.duration || (video.duration || 0) * 60,
    };
  }

  const key = `video_last_${video.id}`;
  const cur = Number(localStorage.getItem(key) || 0);
  if (cur > 0) {
    const durSec = (video.duration || 0) * 60;
    const pct = Math.round((cur / Math.max(1, durSec)) * 100);
    return { pct, currentTime: cur, duration: durSec };
  }

  if (typeof video.progress === "number") {
    return {
      pct: video.progress,
      currentTime: 0,
      duration: (video.duration || 0) * 60,
    };
  }
  return { pct: 0, currentTime: 0, duration: (video.duration || 0) * 60 };
}

function isVideoCompleted(video) {
  const prog = getDynamicProgressFor(video).pct;
  const q = quizMap?.[video.slug];
  const passed = !!(q && q.passed);
  return prog >= 90 || passed;
}

function applyFilters() {
  let filtered = [...mockVideos];

  if (activeFilters.search) {
    const q = activeFilters.search.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q)
    );
  }

  if (activeFilters.categories.length > 0) {
    filtered = filtered.filter((v) =>
      activeFilters.categories.includes(v.category)
    );
  }

  if (activeFilters.level) {
    filtered = filtered.filter((v) => v.level === activeFilters.level);
  }

  filtered = filtered.filter((v) => v.duration <= activeFilters.duration);

  switch (activeFilters.sortBy) {
    case "newest":
      filtered.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
      );
      break;

    case "duration":
      filtered.sort((a, b) => a.duration - b.duration);
      break;
  }

  filteredVideos = filtered;
  currentPage = 1;
  renderVideos();
  renderPagination();
  updateFilterState();
}

function updateFilterState() {
  const has =
    activeFilters.search ||
    activeFilters.categories.length > 0 ||
    activeFilters.level ||
    activeFilters.duration !== 60 ||
    activeFilters.sortBy !== "newest";

  if (clearFiltersBtn) clearFiltersBtn.style.display = has ? "flex" : "none";
  if (videoCount) videoCount.textContent = filteredVideos.length;
}

function renderVideoCard(video) {
  const levelLabels = { baslangic: "Başlangıç", orta: "Orta", ileri: "İleri" };
  const dyn = getDynamicProgressFor(video);

  return `
    <div class="video-card" data-id="${video.id}" onclick="playVideo('${
    video.id
  }')">
      <div class="video-thumbnail">
        <img src="${video.thumbnail}" alt="${video.title}">
        <div class="video-overlay">
          <button class="play-btn">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            Oynat
          </button>
        </div>
       
      </div>

      <div class="video-content">
        <h3 class="video-title">${video.title}</h3>
        <p class="video-description">${video.description}</p>

        <div class="video-meta">
          <span class="level-badge level-${video.level}">${
    levelLabels[video.level] ?? video.level
  }</span>
          <span>${video.category}</span>
        </div>

        <div class="video-stats">
          <div class="stat-group">
            <div class="stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
              </svg>
              ${formatDuration(video.duration)}
            </div>
          </div>
          <div class="stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            ${formatDate(video.publishedAt)}
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-header"><span>İlerleme</span><span class="js-pct">${
            dyn.pct
          }%</span></div>
          <div class="progress-bar"><div class="progress-fill js-fill" style="width:${
            dyn.pct
          }%"></div></div>
        </div>
      </div>
    </div>`;
}

function renderVideos() {
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  const startIndex = (currentPage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const currentVideos = filteredVideos.slice(startIndex, endIndex);

  if (!videoGrid || !noResults || !pagination) return;

  if (currentVideos.length === 0) {
    videoGrid.style.display = "none";
    noResults.style.display = "block";
    pagination.style.display = "none";
  } else {
    videoGrid.style.display = "grid";
    noResults.style.display = "none";
    pagination.style.display = totalPages > 1 ? "flex" : "none";
    videoGrid.innerHTML = currentVideos.map(renderVideoCard).join("");
  }
}

function renderPagination() {
  if (!pagination) return;
  const totalPages = Math.ceil(filteredVideos.length / videosPerPage);
  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  }
  pagination.style.display = "flex";
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    btn.textContent = i;
    btn.onclick = () => {
      currentPage = i;
      renderVideos();
      renderPagination();
    };
    pagination.appendChild(btn);
  }
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    activeFilters.search = e.target.value;
    applyFilters();
  });
}
if (categoryTags) {
  categoryTags.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tag")) return;
    const c = e.target.dataset.category;
    const idx = activeFilters.categories.indexOf(c);
    if (idx > -1) {
      activeFilters.categories.splice(idx, 1);
      e.target.classList.remove("active");
    } else {
      activeFilters.categories.push(c);
      e.target.classList.add("active");
    }
    applyFilters();
  });
}
if (levelSelect) {
  levelSelect.addEventListener("change", (e) => {
    activeFilters.level = e.target.value;
    applyFilters();
  });
}
if (durationSlider && durationValue) {
  durationSlider.addEventListener("input", (e) => {
    const v = e.target.value;
    activeFilters.duration = parseInt(v, 10);
    durationValue.textContent = v;
    applyFilters();
  });
}
if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    activeFilters.sortBy = e.target.value;
    applyFilters();
  });
}
clearFiltersBtn?.addEventListener("click", resetFilters);
noResClearBtn?.addEventListener("click", resetFilters);

function resetFilters() {
  activeFilters = {
    search: "",
    categories: [],
    level: "",
    duration: 60,
    sortBy: "newest",
  };
  if (searchInput) searchInput.value = "";
  document
    .querySelectorAll(".tag")
    .forEach((t) => t.classList.remove("active"));
  if (levelSelect) levelSelect.value = "";
  if (durationSlider) durationSlider.value = 60;
  if (durationValue) durationValue.textContent = "60";
  if (sortSelect) sortSelect.value = "newest";
  applyFilters();
}

const ID_TO_SLUG = {
  1: "veri",
  2: "veri-kaydi",
  3: "veritabani",
  4: "merkezi",
  5: "merkeziyetsiz",
  6: "p2p",
  7: "dagitik-ag",
  8: "anahtar-yonetimi",
  9: "hash-fonksiyonlari",
  10: "dijital-imza",
  11: "zaman-damgasi",
  12: "blok-yapisi",
  13: "merkle-agaclari",
  14: "blockchain",
  15: "islemler-ve-blok-dogrulama",
  16: "pow",
  17: "pos",
  18: "public-blockchain",
  19: "private-blockchain",
  20: "konsorsiyum-blockchain",
  21: "hibrit-modeller",
  22: "fork",
  23: "akilli-sozlesmeler",
  24: "token-coin",
  25: "kullanim-alanlari",
};

window.playVideo = playVideo;
window.closeVideo = closeVideo;

function playVideo(videoId) {
  const data = mockVideos.find((v) => v.id === String(videoId));
  if (!data) {
    err("playVideo: Video bulunamadı:", videoId);
    alert("Video bulunamadı.");
    return;
  }

  const modal = document.getElementById("videoModal");
  const player = document.getElementById("vmPlayer");
  const titleEl = document.getElementById("vmTitle");
  const badgeEl = document.getElementById("vmBadge");
  const catEl = document.getElementById("vmCategory");
  const durEl = document.getElementById("vmDuration");

  const dateEl = document.getElementById("vmDate");
  const certEl = document.getElementById("vmCertified");
  const descEl = document.getElementById("vmDesc");
  const progWrap = document.getElementById("vmProgressWrap");
  const progPct = document.getElementById("vmProgressPct");
  const progFill = document.getElementById("vmProgressFill");

  if (!modal || !player) {
    err("playVideo: modal/player DOM bulunamadı");
    return;
  }

  while (player.firstChild) player.removeChild(player.firstChild);
  player.poster = data.video?.poster ?? "";
  if (data.video && Array.isArray(data.video.sources)) {
    data.video.sources.forEach((s) => {
      const src = document.createElement("source");
      src.src = s.src;
      src.type = s.type || "video/mp4";
      player.appendChild(src);
    });
  } else {
    warn("playVideo: video kaynağı tanımsız:", data);
    alert("Bu ders için video kaynağı tanımlı değil.");
    return;
  }

  const levelMap = { baslangic: "Başlangıç", orta: "Orta", ileri: "İleri" };
  if (titleEl) titleEl.textContent = data.title;
  if (badgeEl)
    badgeEl.textContent = levelMap[data.level] || data.level || "Seviye";
  if (catEl) catEl.textContent = data.category || "Kategori";
  if (durEl) durEl.textContent = `${formatDuration(data.duration || 0)}`;

  if (dateEl)
    dateEl.textContent = `${formatDate(
      data.publishedAt || new Date().toISOString()
    )}`;
  if (certEl) certEl.style.display = data.certified ? "inline-flex" : "none";
  if (descEl) descEl.textContent = data.description || "";

  const dyn = getDynamicProgressFor(data);
  if (progWrap && progPct && progFill) {
    progWrap.style.display = "block";
    progPct.textContent = `${dyn.pct}%`;
    progFill.style.width = `${dyn.pct}%`;
  }

  const back10 = document.getElementById("vmBack10");
  const fwd10 = document.getElementById("vmFwd10");
  const playBtn = document.getElementById("vmPlayPause");
  const muteBtn = document.getElementById("vmMute");
  if (back10)
    back10.onclick = () => {
      player.currentTime = Math.max(0, player.currentTime - 10);
    };
  if (fwd10)
    fwd10.onclick = () => {
      player.currentTime = Math.min(
        player.duration || 0,
        player.currentTime + 10
      );
    };
  if (playBtn)
    playBtn.onclick = () => {
      player.paused ? player.play() : player.pause();
    };
  if (muteBtn)
    muteBtn.onclick = () => {
      player.muted = !player.muted;
    };

  let __lastSavedPct = 0,
    __lastSaveTs = 0;
  const SAVE_STEP = 5,
    SAVE_MS = 15000;

  function updateCardProgressDom(videoId, pct) {
    const card = document.querySelector(`.video-card[data-id="${videoId}"]`);
    if (!card) return;
    const pctEl = card.querySelector(".progress-section .js-pct");
    const fillEl = card.querySelector(".progress-section .js-fill");
    if (pctEl) pctEl.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
  }

  function saveProgressThrottled() {
    if (!player.duration) return;
    const pct = Math.round((player.currentTime / player.duration) * 100);
    const now = Date.now();
    if (pct >= __lastSavedPct + SAVE_STEP || now - __lastSaveTs > SAVE_MS) {
      __lastSavedPct = pct;
      __lastSaveTs = now;
      markVideoProgress(
        String(data.id),
        data.title || "Video",
        pct,
        Math.floor(player.currentTime),
        Math.floor(player.duration || 0)
      )
        .then(() => {
          log("markVideoProgress OK", { id: data.id, pct });

          progressMap[data.id] = {
            pct,
            currentTime: Math.floor(player.currentTime),
            duration: Math.floor(player.duration || 0),
            updatedAt: new Date().toISOString(),
          };

          if (progPct) progPct.textContent = `${pct}%`;
          if (progFill) progFill.style.width = `${pct}%`;

          updateCardProgressDom(String(data.id), pct);
        })
        .catch((e) => err("markVideoProgress FAIL", e));
    }
  }

  player.addEventListener("timeupdate", saveProgressThrottled);

  player.addEventListener("ended", () => {
    markVideoProgress(
      String(data.id),
      data.title || "Video",
      100,
      Math.floor(player.duration || 0),
      Math.floor(player.duration || 0)
    )
      .then(() => {
        log("markVideoProgress 100% OK", { id: data.id });
        progressMap[data.id] = {
          pct: 100,
          currentTime: Math.floor(player.duration || 0),
          duration: Math.floor(player.duration || 0),
          updatedAt: new Date().toISOString(),
        };
        if (progPct) progPct.textContent = `100%`;
        if (progFill) progFill.style.width = `100%`;
        updateCardProgressDom(String(data.id), 100);
      })
      .catch((e) => err("markVideoProgress 100% FAIL", e));
  });

  const openQuizBtn = document.getElementById("vmOpenQuiz");
  if (openQuizBtn) {
    openQuizBtn.onclick = () => {
      const slug = data.slug || ID_TO_SLUG[data.id];
      if (!slug) {
        err("vmOpenQuiz: slug yok", data.id);
        alert("Bu video için slug tanımlı değil.");
        return;
      }
      window.location.href = `../videotestlerii/${slug}/index.html`;
    };
  }

  const continueBtn = document.getElementById("vmContinue");
  if (continueBtn) {
    continueBtn.onclick = () => {
      const key = `video_last_${data.id}`;
      const last = parseFloat(localStorage.getItem(key) || "0");
      log("vmContinue → localStorage", key, last);
      player.currentTime = isNaN(last) ? 0 : last;
      player.play().catch(() => {});
    };
  }
  const key = `video_last_${data.id}`;
  player.addEventListener("timeupdate", () => {
    localStorage.setItem(key, String(player.currentTime));
  });

  modal.style.display = "block";
  player.currentTime = 0;
  player.play().catch(() => {});
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const player = document.getElementById("vmPlayer");
  if (!modal || !player) return;
  player.pause();
  while (player.firstChild) player.removeChild(player.firstChild);
  modal.style.display = "none";
}

const LEARNING_PATH = [
  { title: "temel", slugs: ["veri", "veri-kaydi", "veritabani"] },
  {
    title: "ag-teknolojileri",
    slugs: ["merkezi", "merkeziyetsiz", "p2p", "dagitik-ag"],
  },
  {
    title: "kriptografi",
    slugs: [
      "anahtar-yonetimi",
      "hash-fonksiyonlari",
      "dijital-imza",
      "zaman-damgasi",
    ],
  },
  {
    title: "blockchain-yapisi",
    slugs: [
      "blok-yapisi",
      "merkle-agaclari",
      "blockchain",
      "islemler-ve-blok-dogrulama",
    ],
  },
  { title: "konsensus", slugs: ["pow", "pos"] },
  {
    title: "blockchain-turleri",
    slugs: [
      "public-blockchain",
      "private-blockchain",
      "konsorsiyum-blockchain",
      "hibrit-modeller",
    ],
  },
  {
    title: "gelismis-yapilar",
    slugs: ["fork", "akilli-sozlesmeler", "token-coin"],
  },
  { title: "uygulamalar", slugs: ["kullanim-alanlari"] },
];

function totalMinutesFor(slugs) {
  let sum = 0;
  for (const s of slugs) {
    const v = mockVideos.find((m) => m.slug === s);
    if (v) sum += v.duration || 0;
  }
  return sum;
}
function isCompleted(progressPct = 0, quizPassed = false) {
  return progressPct >= 90 || quizPassed;
}

async function fetchUserProgress(uid) {
  try {
    const colRef = collection(db, "users", uid, "videoProgress");
    const snap = await getDocs(colRef);
    const map = {};
    snap.forEach((d) => {
      const v = d.data();
      map[d.id] = {
        pct: v.pct ?? 0,
        currentTime: v.currentTime ?? 0,
        duration: v.duration ?? 0,
        title: v.title ?? "",
        updatedAt: v.updatedAt ?? null,
      };
    });
    log("fetchUserProgress OK", { count: Object.keys(map).length });
    return map;
  } catch (e) {
    err("fetchUserProgress FAIL", e);
    return {};
  }
}

async function fetchUserQuiz(uid) {
  try {
    const colRef = collection(db, "users", uid, "quizResults");
    const snap = await getDocs(colRef);
    const map = {};
    snap.forEach((d) => {
      const v = d.data();
      map[d.id] = {
        score: v.score ?? 0,
        total: v.total ?? 0,
        passed: v.passed ?? (v.total ? v.score / v.total >= 0.7 : false),
        title: v.title ?? "",
        updatedAt: v.updatedAt ?? null,
      };
    });
    log("fetchUserQuiz OK", { count: Object.keys(map).length });
    return map;
  } catch (e) {
    err("fetchUserQuiz FAIL", e);
    return {};
  }
}

async function fetchLastWatched(uid) {
  const colRef = collection(db, "users", uid, "videoProgress");

  try {
    const qRef = query(colRef, orderBy("updatedAt", "desc"), limit(1));
    const byTime = await getDocs(qRef);
    if (!byTime.empty) {
      const d = byTime.docs[0];
      const data = d.data();
      const v = mockVideos.find((m) => m.id === d.id);
      if (!v) {
        warn("fetchLastWatched: Firestore doc id mockVideos ile eşleşmedi", {
          docId: d.id,
        });
      } else {
        const durationSec = data.duration || (v.duration ? v.duration * 60 : 0);
        const pct =
          data.pct ??
          Math.round(
            (Number(data.currentTime || 0) / Math.max(1, durationSec)) * 100
          );
        const res = {
          id: d.id,
          slug: v.slug,
          title: v.title,
          thumb: v.thumbnail,
          currentTime: Number(data.currentTime || 0),
          duration: durationSec,
          pct,
        };
        log("fetchLastWatched (by updatedAt) OK", res);
        return res;
      }
    } else {
      log("fetchLastWatched: updatedAt sıralı sorgu boş");
    }
  } catch (e) {
    warn("fetchLastWatched: updatedAt orderBy hata, fallback’e geçiliyor", e);
  }

  try {
    const snap = await getDocs(colRef);
    let best = null;
    snap.forEach((doc) => {
      const data = doc.data();
      const v = mockVideos.find((m) => m.id === doc.id);
      if (!v) {
        warn("progress doc id mockVideos ile eşleşmedi", { docId: doc.id });
        return;
      }
      const durationSec = data.duration || (v.duration ? v.duration * 60 : 0);
      const pct =
        data.pct ??
        Math.round(
          (Number(data.currentTime || 0) / Math.max(1, durationSec)) * 100
        );
      const updated = data.updatedAt?.toMillis?.() || 0;
      const score =
        (updated ? updated : 0) + pct * 1000 + (data.currentTime || 0);
      const candidate = {
        id: doc.id,
        slug: v.slug,
        title: v.title,
        thumb: v.thumbnail,
        currentTime: Number(data.currentTime || 0),
        duration: durationSec,
        pct,
        __score: score,
      };
      if (!best || candidate.__score > best.__score) best = candidate;
    });
    if (best) {
      log("fetchLastWatched (fallback scan) OK", best);
      return best;
    }
    log("fetchLastWatched: Firestore’da hiç progress yok (scan sonrası)");
  } catch (e) {
    warn("fetchLastWatched: full scan hata, localStorage’a düşülüyor", e);
  }

  let localBest = null;
  for (const v of mockVideos) {
    const key = `video_last_${v.id}`;
    const cur = Number(localStorage.getItem(key) || 0);
    if (!cur) continue;
    const durationSec = (v.duration || 0) * 60;
    const pct = Math.round((cur / Math.max(1, durationSec)) * 100);
    const score = cur + pct * 1000;
    const candidate = {
      id: v.id,
      slug: v.slug,
      title: v.title,
      thumb: v.thumbnail,
      currentTime: cur,
      duration: durationSec,
      pct,
      __score: score,
    };
    if (!localBest || candidate.__score > localBest.__score)
      localBest = candidate;
  }
  if (localBest) {
    log("fetchLastWatched (localStorage) OK", localBest);
  } else {
    warn("fetchLastWatched: localStorage’da da veri yok");
  }
  return localBest;
}

function renderLearningPath(progressById, quizBySlug) {
  const pathEl = document.querySelector(".learning-path");
  if (!pathEl) {
    warn("renderLearningPath: .learning-path bulunamadı");
    return;
  }
  let completedSteps = 0;
  const stepsWrap = pathEl.querySelector(".path-steps");
  if (!stepsWrap) {
    warn("renderLearningPath: .path-steps bulunamadı");
    return;
  }
  stepsWrap.innerHTML = "";

  LEARNING_PATH.forEach((step, idx) => {
    const totalVideos = step.slugs.length;
    let doneCount = 0;
    for (const slug of step.slugs) {
      const mv = mockVideos.find((m) => m.slug === slug);
      if (!mv) continue;
      const prog = progressById[mv.id]?.pct ?? 0;
      const quizPassed = quizBySlug[slug]?.passed ?? false;
      if (isCompleted(prog, quizPassed)) doneCount++;
    }
    const isDone = doneCount === totalVideos;
    if (isDone) completedSteps++;
    const stepMin = totalMinutesFor(step.slugs);
    const statusClass = isDone
      ? "completed"
      : idx === completedSteps
      ? "active"
      : "";
    stepsWrap.insertAdjacentHTML(
      "beforeend",
      `
      <div class="step ${statusClass}">
        <div class="step-indicator">${
          isDone
            ? `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6L9 17l-5-5"/></svg>`
            : ""
        }</div>
        <div class="step-content">
          <h4>${step.title}</h4>
          <p>${totalVideos} video • ${stepMin} dakika</p>
        </div>
      </div>
    `
    );
  });

  const totalSteps = LEARNING_PATH.length;
  const fractionEl = pathEl.querySelector(".progress-fraction");
  const barFillEl = pathEl.querySelector(".progress-bar-full .progress-fill");
  if (fractionEl)
    fractionEl.textContent = `${completedSteps}/${totalSteps} tamamlandı`;
  if (barFillEl)
    barFillEl.style.width = `${Math.round(
      (completedSteps / totalSteps) * 100
    )}%`;
  log("renderLearningPath OK", { completedSteps, totalSteps });
}

function renderLastWatched(card, last) {
  if (!card) {
    warn("renderLastWatched: card yok");
    return;
  }
  if (!last) {
    warn("renderLastWatched: last yok");
    return;
  }

  const pct = last.pct ?? 0,
    current = last.currentTime ?? 0,
    total = last.duration ?? 0;
  card.innerHTML = `
    <div class="saved-thumbnail">
      <img src="${last.thumb}" alt="${last.title}" />
      <div class="play-overlay">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
    </div>
    <div class="saved-content">
      <h4>${last.title}</h4>
      <p>${formatTime(current)} / ${formatTime(total)}</p>
      <div class="saved-progress"><div class="progress-fill" style="width:${pct}%"></div></div>
    </div>
    <button class="continue-btn">Devam Et</button>
  `;
  card.querySelector(".continue-btn").onclick = () => {
    log("Kaldığın yer: Devam Et →", last.id);
    playVideo(last.id);
    setTimeout(() => {
      document.getElementById("vmContinue")?.click();
    }, 300);
  };

  if (heroContinueBtn) {
    heroContinueBtn.onclick = () => {
      log("Hero: Kaldığın yerden devam →", last.id);
      playVideo(last.id);
      setTimeout(() => {
        document.getElementById("vmContinue")?.click();
      }, 300);
    };
  }
  log("renderLastWatched OK", last);
}

function pickRecommendations(progressById, quizBySlug, max = 3) {
  let targetSlugs = [];
  for (const step of LEARNING_PATH) {
    const allDone = step.slugs.every((slug) => {
      const mv = mockVideos.find((m) => m.slug === slug);
      if (!mv) return true;
      const prog = progressById[mv.id]?.pct ?? 0;
      const quizPassed = quizBySlug[slug]?.passed ?? false;
      return isCompleted(prog, quizPassed);
    });
    if (!allDone) {
      targetSlugs = step.slugs;
      break;
    }
  }
  const candidates = (
    targetSlugs.length ? targetSlugs : mockVideos.map((m) => m.slug)
  )
    .map((slug) => mockVideos.find((m) => m.slug === slug))
    .filter(Boolean)
    .filter(
      (v) =>
        !isCompleted(
          progressById[v.id]?.pct ?? 0,
          quizBySlug[v.slug]?.passed ?? false
        )
    )
    .sort(
      (a, b) => (progressById[a.id]?.pct ?? 0) - (progressById[b.id]?.pct ?? 0)
    );
  log("pickRecommendations", {
    targetSlugs,
    picked: candidates.slice(0, max).map((v) => v.id),
  });
  return candidates.slice(0, max);
}

function renderRecommendations(list) {
  const wrap =
    document.getElementById("recommendations") ||
    document.querySelector(
      ".sidebar-section .section-title + .recommendation-item"
    )?.parentElement;
  if (!wrap) {
    warn(
      "renderRecommendations: hedef container bulunamadı (#recommendations yok)"
    );
    return;
  }
  wrap.querySelectorAll(".recommendation-item").forEach((n) => n.remove());

  for (const v of list) {
    wrap.insertAdjacentHTML(
      "beforeend",
      `
      <div class="recommendation-item" data-id="${v.id}" style="cursor:pointer">
        <div class="rec-thumbnail"><img src="${v.thumbnail}" alt="${v.title}"/></div>
        <div class="rec-content">
          <h4>${v.title}</h4>
          <p>${v.duration} dakika</p>
        </div>
      </div>
    `
    );
  }
  wrap.querySelectorAll(".recommendation-item").forEach((n) => {
    n.onclick = () => {
      const id = n.getAttribute("data-id");
      log("recommendation click", id);
      playVideo(id);
    };
  });
  log("renderRecommendations OK", { count: list.length });
}

async function initDynamicUI(uid) {
  log("initDynamicUI start", { uid });

  const [pById, qBySlug, last] = await Promise.all([
    fetchUserProgress(uid),
    fetchUserQuiz(uid),
    fetchLastWatched(uid),
  ]);

  progressMap = pById || {};
  quizMap = qBySlug || {};

  renderVideos();
  renderPagination();
  updateFilterState();

  renderLearningPath(progressMap, quizMap);

  const savedCard =
    document.getElementById("savedVideoCard") ||
    document.querySelector(".sidebar .sidebar-section .saved-video");
  if (!savedCard) {
    warn(
      "initDynamicUI: Kaldığın Yer kartı bulunamadı (id '#savedVideoCard' ya da '.saved-video')"
    );
  }
  if (savedCard && last) {
    renderLastWatched(savedCard, last);
  } else if (savedCard && !last) {
    warn(
      "initDynamicUI: 'Kaldığın Yer' için veri bulunamadı. (Firestore/localStorage boş)"
    );
    savedCard.innerHTML = `
      <div class="empty-saved">
        <p>Henüz ilerleme bulunamadı.</p>
        <button class="btn btn-primary" id="startFirstVideo">İlk videoyla başla</button>
      </div>`;
    savedCard.querySelector("#startFirstVideo").onclick = () => {
      if (mockVideos[0]) playVideo(mockVideos[0].id);
    };
  }

  const recs = pickRecommendations(pById, qBySlug, 3);
  renderRecommendations(recs);

  log("initDynamicUI done");
}

document.addEventListener("DOMContentLoaded", () => {
  renderVideos();
  renderPagination();
  updateFilterState();

  onAuthStateChanged(auth, async (u) => {
    if (!u) {
      warn("onAuthStateChanged: kullanıcı yok → login sayfasına yönlendirme");
      window.location.href = `./../kayit/index.html?next=${encodeURIComponent(
        location.pathname
      )}`;
      return;
    }
    document.body.dataset.uid = u.uid;
    log("Auth OK ⇒", u.uid);
    try {
      await initDynamicUI(u.uid);
    } catch (e) {
      err("Dinamik UI yüklenemedi:", e);
    }
  });
});

window.addEventListener("storage", (e) => {
  if (e.key && e.key.startsWith("video_last_")) {
    renderVideos();
  }
});

document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState === "visible") {
    const u = auth.currentUser;
    if (u) {
      progressMap = await fetchUserProgress(u.uid);
      renderVideos();
    }
  }
});

window.mockVideos = mockVideos;
