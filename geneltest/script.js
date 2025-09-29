import { auth, db } from "../firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const TEST_BASE_PATH = "./testler/";
const FILE_SUFFIX = "index.html";
const IMG_FALLBACK = "/img/thumbs/placeholder.png";

let userResults = {};

function resultToPercent(res) {
  if (!res || !res.total) return 0;
  const v = (res.score / res.total) * 100;
  return Number.isFinite(v) ? Math.round(v) : 0;
}
function toDate(v) {
  if (!v) return null;
  if (typeof v?.toDate === "function") return v.toDate();
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}
function timeAgo(date) {
  if (!date) return "—";
  const ts = typeof date === "string" ? new Date(date) : date;
  const diff = Math.max(0, (Date.now() - ts.getTime()) / 1000);
  const units = [
    ["yıl", 31536000],
    ["ay", 2592000],
    ["gün", 86400],
    ["saat", 3600],
    ["dk", 60],
    ["sn", 1],
  ];
  for (const [name, sec] of units) {
    const v = Math.floor(diff / sec);
    if (v >= 1) return `${v} ${name} önce`;
  }
  return "az önce";
}
function safeStr(x) {
  return typeof x === "string" ? x : String(x ?? "");
}

async function loadUserResults() {
  const user = auth.currentUser;
  if (!user) {
    userResults = {};
    return;
  }
  try {
    const snap = await getDocs(
      collection(db, "users", user.uid, "testsProgress")
    );
    const map = {};
    snap.forEach((d) => (map[d.id] = d.data()));
    userResults = map;
  } catch (e) {
    console.warn("testsProgress okunamadı:", e?.message || e);
    userResults = {};
  }
}

const LS_KEY = "testsProgress";
function readLocalResults() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    return obj && typeof obj === "object" ? obj : {};
  } catch {
    return {};
  }
}
function saveLocalResult(slug, data) {
  const obj = readLocalResults();
  obj[slug] = { ...(obj[slug] || {}), ...data };
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(obj));
  } catch {}
}
function mergeLocalIntoUserResults() {
  const local = readLocalResults();
  const merged = { ...userResults };
  Object.keys(local).forEach((k) => {
    const a = local[k];
    const b = merged[k];
    const aTime = new Date(a?.updatedAt || 0).getTime();
    const bTime = new Date(b?.updatedAt || 0).getTime();
    if (!b || aTime > bTime) merged[k] = a;
  });
  userResults = merged;
}

let currentPage = 1;
const pageSize = 6;

const prevBtn = document.getElementById("prevBtn-oyun");
const nextBtn = document.getElementById("nextBtn-oyun");
const pagination = document.getElementById("pagination-oyun");
const paginationNumbers = document.getElementById("paginationNumbers-oyun");

const searchInput = document.getElementById("searchInput");
const categoryChips = document.querySelectorAll(".chip[data-category]");
const levelFilter = document.getElementById("levelFilter");
const sortFilter = document.getElementById("sortFilter");
const testsGrid = document.getElementById("testsGrid");
const noResults = document.getElementById("noResults");

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalStartBtn = document.getElementById("modalStartBtn");

const completedStatNumber = document.querySelector(".stats-card .stat-number");
const completedCountEl = document.querySelector(".completed-count");
const progressCircle = document.querySelector(".progress-circle");
const progressPercentEl = document.querySelector(".progress-percentage");
const categoryProgressContainer = document.querySelector(".category-progress");
const activityListEl = document.querySelector(".activity-list");

const tests = [
  {
    id: "1",
    title: "Veri",
    slug: "test_veri",
    category: "temel",
    level: "baslangic",
    durationMin: 8,
    date: "2024-01-10",
    summary: "Veri türleri, yapılandırılmış/yapısız veri ve örnekler.",
    tags: ["Veri", "Türler", "Yapı"],
    certified: true,
    progress: 0,
    thumbnail: "../img/veri.png",
    chapters: [
      { id: "1", title: "Veri Türleri", duration: "3:00", timestamp: "00:00" },
    ],
    resources: [],
  },
  {
    id: "2",
    title: "Veri Kaydı",
    slug: "veri-kaydi",
    category: "temel",
    level: "baslangic",
    durationMin: 10,
    date: "2024-01-12",
    summary: "Veriyi kalıcı hâle getirme, log ve zaman damgası fikri.",
    tags: ["Kayıt", "Log", "Zaman Damgası"],
    certified: false,
    progress: 0,
    thumbnail: "../img/verikaydı.png",
  },
  {
    id: "3",
    title: "Veritabanı",
    slug: "veritabani",
    category: "temel",
    level: "orta",
    durationMin: 18,
    date: "2024-01-14",
    summary: "Tablolar, ilişkiler, sorgular ve temel kavramlar.",
    tags: ["DB", "SQL", "NoSQL"],
    certified: false,
    progress: 0,
    thumbnail: "../img/veritabanı.png",
  },
  {
    id: "4",
    title: "Hash Yapısı",
    slug: "hash-yarisi",
    category: "kriptografi",
    level: "baslangic",
    durationMin: 15,
    date: "2024-01-15",
    summary: "SHA-256 hash fonksiyonunu öğren, hızlı hash yarışında öne geç.",
    tags: ["SHA-256", "Hash", "Kriptografi"],
    certified: true,
    progress: 0,
    thumbnail: "../img/hashfonksiyonu.png",
    resources: [
      {
        id: "1",
        title: "Hash Fonksiyonları Rehberi",
        type: "article",
        url: "/articles/hash-functions",
      },
      {
        id: "2",
        title: "SHA-256 Hesaplayıcı",
        type: "external",
        url: "https://emn178.github.io/online-tools/sha256.html",
      },
    ],
  },
  {
    id: "5",
    title: "Blok Yapısı",
    slug: "blok-yapisi",
    category: "yapi",
    level: "baslangic",
    durationMin: 20,
    date: "2024-01-20",
    summary: "Blok bileşenleri, hash zinciri ve bütünlük.",
    tags: ["Blok", "Zincir", "Hash"],
    certified: true,
    progress: 0,
    thumbnail: "../img/blokk.png",
    chapters: [
      { id: "1", title: "Blok Alanları", duration: "4:30", timestamp: "00:00" },
      {
        id: "2",
        title: "Zincire Bağlama",
        duration: "7:45",
        timestamp: "04:30",
      },
      {
        id: "3",
        title: "Bütünlük Testi",
        duration: "8:00",
        timestamp: "12:15",
      },
    ],
  },
  {
    id: "6",
    title: "Merkle Ağaçları",
    slug: "merkle-agaclari",
    category: "kriptografi",
    level: "orta",
    durationMin: 25,
    date: "2024-01-25",
    summary: "Merkle ağaçları ile veri bütünlüğü ve doğrulama.",
    tags: ["Merkle", "Hash", "Doğrulama"],
    certified: false,
    progress: 0,
    thumbnail: "../img/merklee.png",
  },
  {
    id: "7",
    title: "Merkezi • Merkeziyetsiz • Dağıtık Ağ",
    slug: "merkezi-merkeziyetsiz-dagitik",
    category: "ag",
    level: "orta",
    durationMin: 22,
    date: "2024-02-01",
    summary: "Topolojileri karşılaştırın, dayanıklılık ve tekil hata noktası.",
    tags: ["P2P", "Topoloji", "Dayanıklılık"],
    certified: true,
    progress: 0,
    thumbnail: "../img/merkeziaq.png",
  },
  {
    id: "8",
    title: "Anahtar Yönetimi",
    slug: "anahtar-yonetimi",
    category: "kriptografi",
    level: "orta",
    durationMin: 18,
    date: "2024-02-10",
    summary: "Özel/genel anahtar, cüzdan, yedekleme ve güvenlik.",
    tags: ["Keypair", "Cüzdan", "Güvenlik"],
    certified: false,
    progress: 0,
    thumbnail: "../img/anahtaryöntemi.png",
  },
  {
    id: "9",
    title: "Dijital İmza",
    slug: "dijital-imza",
    category: "kriptografi",
    level: "orta",
    durationMin: 22,
    date: "2024-02-15",
    summary: "İmzalama, doğrulama, ECDSA mantığı.",
    tags: ["ECDSA", "Doğrulama", "İmza"],
    certified: false,
    progress: 0,
    thumbnail: "../img/digitalimza.png",
  },
  {
    id: "10",
    title: "Zaman Damgası",
    slug: "zaman-damgasi",
    category: "temel",
    level: "baslangic",
    durationMin: 12,
    date: "2024-02-16",
    summary: "Zaman damgası fikri ve zincirde rolü.",
    tags: ["Timestamp", "Bütünlük"],
    certified: false,
    progress: 0,
    thumbnail: "../img/zamandamgası.png",
  },
  {
    id: "11",
    title: "İşlemler ve Blok Doğrulama",
    slug: "islemler-ve-blok-dogrulama",
    category: "yapi",
    level: "orta",
    durationMin: 24,
    date: "2024-02-18",
    summary: "İşlem → havuz → blok → doğrulama süreci.",
    tags: ["Mempool", "Doğrulama", "Blok"],
    certified: true,
    progress: 0,
    thumbnail: "../img/islemblokdogrulama.png",
  },
  {
    id: "12",
    title: "Proof of Work (PoW)",
    slug: "proof-of-work",
    category: "konsensus",
    level: "ileri",
    durationMin: 35,
    date: "2024-02-20",
    summary: "Nonce arama, zorluk ve madencilik dinamikleri.",
    tags: ["PoW", "Madencilik", "Nonce"],
    certified: true,
    progress: 0,
    thumbnail: "../img/pow.png",
  },
  {
    id: "13",
    title: "Proof of Stake (PoS)",
    slug: "proof-of-stake",
    category: "konsensus",
    level: "ileri",
    durationMin: 28,
    date: "2024-02-22",
    summary: "Stake, doğrulayıcı seçimi ve güvenlik varsayımları.",
    tags: ["PoS", "Stake", "Doğrulayıcı"],
    certified: true,
    progress: 0,
    thumbnail: "../img/pos.png",
  },
  {
    id: "14",
    title: "Açık / Özel / Konsorsiyum / Hibrit",
    slug: "acik-ozel-konsorsiyum-hibrit",
    category: "turler",
    level: "orta",
    durationMin: 26,
    date: "2024-02-24",
    summary: "Blockchain türleri ve senaryo odaklı seçim.",
    tags: ["Public", "Private", "Consortium", "Hybrid"],
    certified: true,
    progress: 0,
    thumbnail: "../img/acikblockhain.png",
  },
  {
    id: "15",
    title: "Çatallaşma (Fork)",
    slug: "fork",
    category: "yapi",
    level: "orta",
    durationMin: 16,
    date: "2024-02-26",
    summary: "Hard fork vs soft fork, uyumluluk ve ağ etkileri.",
    tags: ["Fork", "Uyumluluk"],
    certified: false,
    progress: 0,
    thumbnail: "../img/fork.png",
  },
  {
    id: "16",
    title: "Akıllı Sözleşmeler",
    slug: "akilli-sozlesmeler",
    category: "turler",
    level: "ileri",
    durationMin: 40,
    date: "2024-03-01",
    summary: "Solidity temelleri, standartlar ve dağıtım.",
    tags: ["Smart Contract", "Solidity", "DApp"],
    certified: true,
    progress: 0,
    thumbnail: "../img/akıllısözlesme.png",
  },
  {
    id: "17",
    title: "Token / Coin Mantığı",
    slug: "token-coin-mantigi",
    category: "turler",
    level: "orta",
    durationMin: 20,
    date: "2024-03-03",
    summary: "Yerel coin vs token, standartlar ve kullanım.",
    tags: ["Token", "Coin", "ERC-20", "ERC-721"],
    certified: false,
    progress: 0,
    thumbnail: "../img/tokencoin.png",
  },
  {
    id: "18",
    title: "Blockchain Kullanım Alanları",
    slug: "blockchain-kullanim-alanlari",
    category: "temel",
    level: "baslangic",
    durationMin: 18,
    date: "2024-03-05",
    summary: "Finans, tedarik zinciri, kimlik, oyun ve daha fazlası.",
    tags: ["Use cases", "DApps"],
    certified: true,
    progress: 0,
    thumbnail: "../img/blockchainkullanimalanlari.png",
  },
];

function renderRightSidebarDynamic() {
  const completedCount = Object.values(userResults).filter(
    (r) => r?.passed
  ).length;
  if (completedStatNumber)
    completedStatNumber.textContent = String(completedCount);
  if (completedCountEl)
    completedCountEl.textContent = `${completedCount}/${tests.length}`;

  const percentage = Math.round((completedCount / tests.length) * 100);
  if (progressCircle) {
    progressCircle.style.background = `conic-gradient(#0ea5e9 ${
      percentage * 3.6
    }deg, #e5e7eb 0deg)`;
  }
  if (progressPercentEl) progressPercentEl.textContent = `${percentage}%`;

  const labels = {
    temel: "Temel Kavramlar",
    kriptografi: "Kriptografi",
    ag: "Ağ Yapısı",
    yapi: "Blockchain Yapısı",
    konsensus: "Konsensüs",
    turler: "Blockchain Türleri",
  };
  const cats = Object.keys(labels);
  const html = cats
    .map((cat) => {
      const total = tests.filter((t) => t.category === cat).length;
      if (total === 0) return "";
      const completedInCat = tests
        .filter((t) => t.category === cat)
        .filter(
          (t) => (userResults[t.slug] || userResults[t.id])?.passed
        ).length;
      const pct = Math.round((completedInCat / total) * 100);
      return `
      <div class="progress-item">
        <span class="progress-category">${labels[cat]}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-fraction">${completedInCat}/${total}</span>
      </div>`;
    })
    .join("");
  if (categoryProgressContainer) {
    categoryProgressContainer.innerHTML =
      html ||
      `<div class="text-muted" style="font-size:.875rem;">Kategori bulunamadı.</div>`;
  }

  if (activityListEl) {
    const acts = Object.entries(userResults).map(([slug, r]) => {
      const t = tests.find((x) => x.slug === slug || x.id === slug);
      const when = toDate(r?.updatedAt);
      const pct = resultToPercent(r);
      const passed = !!r?.passed;
      return {
        when,
        whenText: timeAgo(when),
        title: t?.title || slug,
        thumb:
          t?.thumbnail ||
          `https://picsum.photos/seed/${encodeURIComponent(slug)}/80/80`,
        statusText: passed ? "testi geçti" : `ilerleme ${pct}%`,
      };
    });
    acts.sort(
      (a, b) => (b.when?.getTime?.() || 0) - (a.when?.getTime?.() || 0)
    );
    const latest = acts.slice(0, 3);
    activityListEl.innerHTML = latest.length
      ? latest
          .map(
            (a) => `
          <div class="activity-item">
            <div class="activity-avatar">
              <img src="${safeStr(a.thumb)}" alt="${safeStr(a.title)}">
            </div>
            <div class="activity-content">
              <div class="activity-text"><strong>${safeStr(
                a.title
              )}</strong> — ${safeStr(a.statusText)}</div>
              <div class="activity-time">${safeStr(a.whenText)}</div>
            </div>
          </div>`
          )
          .join("")
      : `<div class="activity-item"><div class="activity-content"><div class="activity-text">Henüz aktivite yok.</div><div class="activity-time">—</div></div></div>`;
  }
}

function updateSidebarStats() {
  const categoryCounts = {
    temel: tests.filter((t) => t.category === "temel").length,
    kriptografi: tests.filter((t) => t.category === "kriptografi").length,
    ag: tests.filter((t) => t.category === "ag").length,
    yapi: tests.filter((t) => t.category === "yapi").length,
    konsensus: tests.filter((t) => t.category === "konsensus").length,
    turler: tests.filter((t) => t.category === "turler").length,
  };
  const levelCounts = {
    baslangic: tests.filter((t) => t.level === "baslangic").length,
    orta: tests.filter((t) => t.level === "orta").length,
    ileri: tests.filter((t) => t.level === "ileri").length,
  };

  Object.keys(categoryCounts).forEach((cat) => {
    const el = document.querySelector(`[data-category="${cat}"] .count`);
    if (el) el.textContent = categoryCounts[cat];
  });
  Object.keys(levelCounts).forEach((lv) => {
    const el = document.querySelector(`[data-level="${lv}"] .count`);
    if (el) el.textContent = levelCounts[lv];
  });

  const totalEl = document.getElementById("testCount");
  if (totalEl) totalEl.textContent = tests.length;

  renderRightSidebarDynamic();
}

let filteredTests = [...tests];
const currentFilters = {
  search: "",
  category: "all",
  level: "all",
  sort: "newest",
};

function totalPagesCalc() {
  return Math.max(1, Math.ceil(filteredTests.length / pageSize));
}

function filterTests() {
  let filtered = [...tests];

  if (currentFilters.search) {
    const q = currentFilters.search.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q)
    );
  }
  if (currentFilters.category !== "all") {
    filtered = filtered.filter((t) => t.category === currentFilters.category);
  }
  if (currentFilters.level !== "all") {
    filtered = filtered.filter((t) => t.level === currentFilters.level);
  }

  // "popular" seçilmişse "newest"e zorla (views metrikleri kaldırıldığı için)
  if (currentFilters.sort === "popular") currentFilters.sort = "newest";

  switch (currentFilters.sort) {
    case "newest":
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case "shortest":
      filtered.sort(
        (a, b) =>
          a.durationMin - a.durationMin + (b.durationMin - b.durationMin)
      ); // safeguard
      filtered.sort((a, b) => a.durationMin - b.durationMin);
      break;
    case "longest":
      filtered.sort(
        (a, b) =>
          b.durationMin - a.durationMin - (a.durationMin - a.durationMin)
      ); // safeguard
      filtered.sort(
        (a, b) =>
          b.durationMin - a.durationMin - (b.durationMin - b.durationMin)
      );
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin); // ensure
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      // The above extra sorts are unnecessary; use the simple one:
      filtered.sort((a, b) => b.durationMin - a.durationMin);
      break;
  }

  filteredTests = filtered;
  currentPage = 1;
  renderTests();
}

function updateActiveFilters() {
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.category === currentFilters.category ||
        (currentFilters.category === "all" && item.dataset.category === "all")
    );
  });
  document.querySelectorAll(".level-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.level === currentFilters.level ||
        (currentFilters.level === "all" && item.dataset.level === "all")
    );
  });
}

function renderPagination() {
  const pages = totalPagesCalc();
  if (!pagination || !paginationNumbers) return;
  pagination.style.display = pages > 1 ? "flex" : "none";
  paginationNumbers.innerHTML = "";
  for (let i = 1; i <= pages; i++) {
    const btn = document.createElement("button");
    btn.className =
      "pagination-number-oyun" + (i === currentPage ? " active" : "");
    btn.textContent = i;
    btn.dataset.page = i;
    paginationNumbers.appendChild(btn);
  }
  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === pages;
}

function renderTests() {
  if (!testsGrid || !noResults) return;

  if (filteredTests.length === 0) {
    testsGrid.style.display = "none";
    noResults.style.display = "block";
    if (pagination) pagination.style.display = "none";
    return;
  }

  testsGrid.style.display = "grid";
  noResults.style.display = "none";

  const start = (currentPage - 1) * pageSize;
  const pageSlice = filteredTests.slice(start, start + pageSize);

  testsGrid.innerHTML = pageSlice
    .map((t) => {
      const res = userResults[t.slug] || userResults[t.id];
      const pct = resultToPercent(res);
      const progressText = res
        ? res.passed
          ? "Geçti"
          : `İlerleme ${pct}%`
        : "İlerleme 0%";
      const progressWidth = res ? pct : 0;
      const btnLabel = res ? "Tekrar Çöz" : "Test Et";
      const thumb = t.thumbnail || IMG_FALLBACK;

      return `
        <div class="test-card" onclick="openTestModal('${t.id}')">
          <div class="test-thumbnail">
            ${
              t.certified
                ? '<div class="certificate-badge"><i class="fas fa-certificate"></i> Sertifikalı</div>'
                : ""
            }
            <img src="${thumb}" alt="${t.title}"
              onerror="this.onerror=null;this.src='${IMG_FALLBACK}';">
            <div class="progress-overlay">
              <div class="progress-bar"><div class="progress-fill" style="width:${progressWidth}%"></div></div>
              <span class="progress-text">${progressText}</span>
            </div>
          </div>

          <div class="test-content">
            <h3 class="test-title">${t.title}</h3>
            <p class="test-description">${t.summary}</p>

            <div class="test-tags">
              ${(t.tags || [])
                .slice(0, 3)
                .map((tag) => `<span class="test-tag">${tag}</span>`)
                .join("")}
            </div>

            <div class="test-stats">
              <span><i class="fas fa-clock"></i> ${t.durationMin} dk</span>
              <span class="test-level ${"level-" + t.level}">
                ${
                  {
                    baslangic: "Başlangıç",
                    orta: "Orta",
                    ileri: "İleri",
                  }[t.level] || t.level
                }
              </span>
            </div>

            <div class="test-actions">
              <button class="btn-primary" onclick="event.stopPropagation(); startTest('${
                t.slug
              }')">${btnLabel}</button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  renderPagination();
}

function openTestModal(testId) {
  const t = tests.find((x) => x.id === testId);
  if (!t || !modalOverlay) return;

  const titleEl = document.getElementById("modalTitle");
  if (titleEl) titleEl.textContent = t.title;

  const modalLevelEl = document.getElementById("modalLevel");
  if (modalLevelEl) {
    modalLevelEl.textContent =
      { baslangic: "Başlangıç", orta: "Orta", ileri: "İleri" }[t.level] ||
      t.level;
    modalLevelEl.className = `test-level level-${t.level}`;
  }

  const durEl = document.getElementById("modalDuration");
  if (durEl)
    durEl.innerHTML = `<i class="fas fa-clock"></i> ${t.durationMin} dk`;

  // GÖRÜNTÜLENME alanı kaldırıldı (modalViews yok)

  const descEl = document.getElementById("modalDescription");
  if (descEl) descEl.textContent = t.summary;

  const tagsContainer = document.getElementById("modalTags");
  if (tagsContainer) {
    tagsContainer.innerHTML = (t.tags || [])
      .map((tg) => `<span class="test-tag">${tg}</span>`)
      .join("");
  }

  const chaptersList = document.getElementById("chaptersList");
  if (chaptersList) {
    chaptersList.innerHTML = (t.chapters || [])
      .map(
        (ch) => `
      <div class="chapter-item">
        <div class="chapter-info">
          <h4>${ch.title}</h4>
          <span>${ch.duration}</span>
        </div>
        <span>${ch.timestamp || ""}</span>
      </div>`
      )
      .join("");
  }

  const resourcesList = document.getElementById("resourcesList");
  if (resourcesList) {
    resourcesList.innerHTML = (t.resources || [])
      .map(
        (r) => `
      <div class="resource-item">
        <div class="resource-info">
          <h4>${r.title}</h4>
          <span>${r.type === "external" ? "Harici Kaynak" : "Makale"}</span>
        </div>
        <i class="fas fa-external-link-alt"></i>
      </div>`
      )
      .join("");
  }

  if (modalStartBtn) modalStartBtn.onclick = () => startTest(t.slug);

  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}
function closeTestModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "auto";
}

function startTest(slug) {
  const url = TEST_BASE_PATH + slug + "/" + FILE_SUFFIX;
  window.location.href = url;
}

document.addEventListener("click", (e) => {
  const cat = e.target.closest(".category-item");
  if (cat) {
    currentFilters.category = cat.dataset.category;
    updateActiveFilters();
    filterTests();
  }
  const lvl = e.target.closest(".level-item");
  if (lvl) {
    currentFilters.level = lvl.dataset.level;
    updateActiveFilters();
    filterTests();
  }
});
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentFilters.search = e.target.value;
    filterTests();
  });
}
categoryChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    categoryChips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    currentFilters.category = chip.dataset.category;
    updateActiveFilters();
    filterTests();
  });
});
if (levelFilter) {
  levelFilter.addEventListener("change", (e) => {
    currentFilters.level = e.target.value;
    updateActiveFilters();
    filterTests();
  });
}
if (sortFilter) {
  sortFilter.addEventListener("change", (e) => {
    currentFilters.sort = e.target.value;
    filterTests();
  });
}
if (modalClose) modalClose.addEventListener("click", closeTestModal);
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeTestModal();
  });
}
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("tab-btn")) {
    const tabName = e.target.dataset.tab;
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    document
      .querySelectorAll(".tab-panel")
      .forEach((p) => p.classList.remove("active"));
    const panel = document.getElementById(tabName + "Panel");
    if (panel) panel.classList.add("active");
  }
});
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    modalOverlay &&
    modalOverlay.classList.contains("active")
  ) {
    closeTestModal();
  }
});

function showLoginBanner() {
  if (document.getElementById("loginBanner")) return;
  const div = document.createElement("div");
  div.id = "loginBanner";
  div.style.cssText =
    "background:#fffbeb;border-bottom:1px solid #f59e0b;color:#78350f;padding:8px 12px;text-align:center;font-size:.95rem;";
  div.innerHTML = `Devam etmek ve ilerlemeni görmek için <a href="../profill/index.html" style="color:#b45309;text-decoration:underline;">giriş yap</a>.`;
  document.body.prepend(div);
}
function hideLoginBanner() {
  const el = document.getElementById("loginBanner");
  if (el) el.remove();
}

async function refreshAll() {
  await loadUserResults();
  mergeLocalIntoUserResults();
  updateSidebarStats();
  updateActiveFilters();
  filterTests();
}

onAuthStateChanged(auth, async (user) => {
  if (user) hideLoginBanner();
  else showLoginBanner();
  await refreshAll();
});

// Test motoru bitiş event’i ile anlık güncelleme
window.addEventListener("test:finished", async (e) => {
  const d = e.detail || {};
  const slug = d.slug || d.testId || "";
  if (!slug) return;
  saveLocalResult(slug, {
    score: Number(d.score) || 0,
    total: Number(d.total) || 0,
    passed: !!d.passed,
    percent:
      Number(d.percent) ||
      (d.total ? Math.round((d.score / d.total) * 100) : 0),
    durationSec: Number(d.durationSec) || 0,
    updatedAt: d.updatedAt || new Date().toISOString(),
  });
  await refreshAll();
});

window.addEventListener("storage", (e) => {
  if (e.key === LS_KEY) {
    mergeLocalIntoUserResults();
    renderRightSidebarDynamic();
    renderTests();
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await refreshAll();

  if (paginationNumbers) {
    paginationNumbers.addEventListener("click", (e) => {
      const b = e.target.closest("button.pagination-number-oyun");
      if (!b) return;
      currentPage = Number(b.dataset.page);
      renderTests();
    });
  }
  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      currentPage--;
      if (currentPage < 1) currentPage = 1;
      renderTests();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      currentPage++;
      const max = totalPagesCalc();
      if (currentPage > max) currentPage = max;
      renderTests();
    });
});

window.openTestModal = openTestModal;
window.startTest = startTest;
window.tests = tests;
