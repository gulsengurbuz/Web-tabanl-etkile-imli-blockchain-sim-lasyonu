const animations = [
  {
    id: 1,
    title: "Veri",
    image: "../img/veri.png",
    url: "./animasyonsahneleri/veri/index.html",
    description:
      "Veri türleri ve yapılandırılmış/yapısız veri farkını görsel örneklerle öğren.",

    category: "Temel Kavramlar",
    difficulty: 1,
    lastUpdated: "2025-01-15",
  },
  {
    id: 2,
    title: "Veri Kaydı",
    image: "../img/verikaydı.png",
    url: "./animasyonsahneleri/verikaydiasıl/index.html",
    description:
      "Dosya, log ve kayıt defteri yaklaşımıyla veriyi kalıcı hâle getirme mantığı.",

    category: "Temel Kavramlar",
    difficulty: 2,

    lastUpdated: "2025-01-10",
  },
  {
    id: 3,
    title: "Veritabanı",
    image: "../img/veritabanı.png",
    url: "./animasyonsahneleri/veritabani/index.html",
    description:
      "Tablo/belge/KV modelleri, CRUD ve tutarlılık kavramının hızlı özeti.",

    category: "Temel Kavramlar",

    lastUpdated: "2025-01-12",
  },

  {
    id: 4,
    title: "Merkezi",
    image: "../img/merkeziaq.png",
    url: "./animasyonsahneleri/Merkezi/index.html",
    description:
      "Tek merkezli mimarinin artıları/eksileri ve tek hata noktası problemi.",

    category: "Ağ Teknolojileri",

    instructor: "Prof. Zeynep Kaya",
    lastUpdated: "2025-01-08",
  },
  {
    id: 5,
    title: "Merkeziyetsiz",
    image: "../img/merkeziyetsizağ.png",
    url: "./animasyonsahneleri/Merkeziyetsiz/index.html",
    description:
      "Birden çok merkezle daha dayanıklı ağlar; koordinasyon ve yönetişim zorlukları.",

    category: "Ağ Teknolojileri",
    difficulty: 4,

    lastUpdated: "2025-01-14",
  },
  {
    id: 6,
    title: "P2P",
    image: "../img/p2pağ.png",
    url: "./animasyonsahneleri/p2p2/index.html",
    description:
      "Eşten eşe iletişim; düğümlerin sunucu olmadan nasıl buluştuğunu gör.",

    category: "Ağ Teknolojileri",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 7,
    title: "Dağıtık Ağ",
    image: "../img/dağıtıkag.png",
    url: "./animasyonsahneleri/dagıtıkAg/index.html",
    description:
      "İş ve verinin ağ geneline yayılması; kopyalama ve tutarlılık stratejileri.",

    category: "Ağ Teknolojileri",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },

  {
    id: 9,
    title: "Anahtar Yönetimi",
    image: "../img/anahtaryöntemi.png",
    url: "./animasyonsahneleri/anahtarYöntemi/index.html",
    description:
      "Anahtar üretimi, saklama, dağıtım ve yenileme; özel anahtarın korunması.",

    category: "Kriptografi",
    difficulty: 4,

    lastUpdated: "2025-01-05",
  },
  {
    id: 10,
    title: "Hash Fonksiyonları",
    image: "../img/hashfonksiyonu.png",
    url: "./animasyonsahneleri/hash/index.html",
    description:
      "Tek yönlü özet, sabit uzunluk, çakışma direnci ve bütünlük kanıtı.",

    category: "Kriptografi",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 11,
    title: "Dijital İmza",
    image: "../img/digitalimza.png",
    url: "./animasyonsahneleri/dijitalimza/index.html",
    description:
      "Özel anahtarla imzalama, açık anahtarla doğrulama ve kimlik kanıtı.",

    category: "Kriptografi",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 12,
    title: "Zaman Damgası",
    image: "../img/zamandamgası.png",
    url: "./animasyonsahneleri/zamandamgası/index.html",
    description:
      "Bir verinin belirli zamanda var olduğunu kanıtlama ve zincir üzerinde sıralama.",

    category: "Kriptografi",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },

  {
    id: 13,
    title: "Blok Yapısı",
    image: "../img/blokk.png",
    url: "./animasyonsahneleri/blok/index.html",
    description:
      "Header (önceki hash, zaman, nonce) ve gövdedeki işlemler; temel şema.",

    category: "Blockchain Yapısı",

    lastUpdated: "2025-01-05",
  },
  {
    id: 14,
    title: "Merkle Ağaçları",
    image: "../img/merklee.png",
    url: "./animasyonsahneleri/merklee/index.html",
    description:
      "İşlemlerden Merkle root üretimi ve hafif kanıt (Merkle proof) mantığı.",

    category: "Blockchain Yapısı",

    lastUpdated: "2025-01-05",
  },
  {
    id: 15,
    title: "Blockchain",
    image: "../img/blockchainproje.png",
    url: "./animasyonsahneleri/blchk/index.html",
    description:
      "Blokların önceki blok özetiyle bağlanması ve değişime karşı dayanıklılık.",

    category: "Blockchain Yapısı",

    lastUpdated: "2025-01-05",
  },
  {
    id: 16,
    title: "İşlemler ve Blok Doğrulama",
    image: "../img/islemblokdogrulama.png",
    url: "./animasyonsahneleri/BlocckhainİslemDogrulama/index.html",
    description:
      "İşlem formatı, imza kontrolü ve blok geçerlilik kurallarının görsel özeti.",

    category: "Blockchain Yapısı",

    lastUpdated: "2025-01-05",
  },

  {
    id: 17,
    title: "Proof of Work (PoW)",
    image: "../img/pow.png",
    url: "./animasyonsahneleri/pow/index.html",
    description:
      "Zorluk ayarı, enerji maliyeti ve güvenlik ilişkisini simülasyonla gör.",

    category: "Konsensüs Mekanizmaları",
    difficulty: 7,

    lastUpdated: "2025-01-05",
  },
  {
    id: 18,
    title: "Proof of Stake (PoS)",
    image: "../img/pos.png",
    url: "./animasyonsahneleri/pos/index.html",
    description:
      "Stake, doğrulayıcı seçimi ve slashing mekanizmasının görsel anlatımı.",

    category: "Konsensüs Mekanizmaları",
    difficulty: 7,

    lastUpdated: "2025-01-05",
  },

  {
    id: 21,
    title: "Açık (Public) Blockchain",
    image: "../img/acikblockhain.png",
    url: "./animasyonsahneleri/acik-blockchain/index.html",
    description:
      "Herkese açık katılım ve sansüre dayanıklılık; teşviklerle güvenlik.",

    category: "Blockchain Türleri",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 22,
    title: "Özel (Private) Blockchain",
    image: "../img/özelblockchain.png",
    url: "./animasyonsahneleri/asimetrik/index.html",
    description:
      "İzinli erişim, kurum içi süreçler ve performans/uyum avantajları.",

    category: "Blockchain Türleri",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 23,
    title: "Konsorsiyum Blockchain",
    image: "../img/konsorsiyum.png",
    url: "./animasyonsahneleri/konsörsiyum/index.html",
    description:
      "Birden çok kurumun birlikte işlettiği izinli ağlar ve yönetişim.",

    category: "Blockchain Türleri",
    difficulty: 5,

    lastUpdated: "2025-01-05",
  },
  {
    id: 24,
    title: "Hibrit Modeller",
    image: "../img/Hibrit.png",
    url: "./animasyonsahneleri/hibritblockchain/index.html",
    description:
      "Kamu + özel katmanların bir arada kullanımı; veri/uygulama ayrımı.",

    category: "Blockchain Türleri",

    lastUpdated: "2025-01-05",
  },
  {
    id: 25,
    title: "Fork",
    image: "../img/fork.png",
    url: "./animasyonsahneleri/FORK/index.html",
    description:
      "Kamu + özel katmanların bir arada kullanımı; veri/uygulama ayrımı.",

    category: "Blockchain Türleri",

    lastUpdated: "2025-01-05",
  },
  {
    id: 25,
    title: "Akıllı Sözleşmeler",
    image: "../img/akıllısözlesme.png",
    url: "./animasyonsahneleri/akıllısözleşme/index.html",
    description:
      "Kamu + özel katmanların bir arada kullanımı; veri/uygulama ayrımı.",

    category: "Blockchain Türleri",

    lastUpdated: "2025-01-05",
  },

  {
    id: 27,
    title: "coin/token mantığı",
    image: "../img/tokencoin.png",
    url: "./animasyonsahneleri/coinvetoken/index.html",
    description:
      "Kamu + özel katmanların bir arada kullanımı; veri/uygulama ayrımı.",

    category: "Blockchain Türleri",

    lastUpdated: "2025-01-05",
  },
  {
    id: 28,
    title: "Blockchain Kullanım Alanları",
    image: "../img/Blockchainkullanimalanlari.png",
    url: "./animasyonsahneleri/kullanımAlanları/index.html",
    description:
      "Kamu + özel katmanların bir arada kullanımı; veri/uygulama ayrımı.",

    category: "Blockchain Türleri",

    lastUpdated: "2025-01-05",
  },
];

function isExternal(a) {
  return a.url && /^https?:\/\//i.test(a.url);
}
function getAnimLink(a) {
  return a.url || `animation.html?id=${encodeURIComponent(a.id)}`;
}

let selectedFilters = [];
let expandedCategories = ["temel"];

const animationGrid = document.getElementById("animationGrid");
const featuredGrid = document.getElementById("featuredGrid");
const animationCount = document.getElementById("animationCount");
const selectedFiltersDiv = document.getElementById("selectedFilters");
const filterTags = document.getElementById("filterTags");

document.addEventListener("DOMContentLoaded", () => {
  initializeFilters();
  renderAnimations();

  updateAnimationCount();
});

function initializeFilters() {
  document.querySelectorAll(".category-toggle").forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const category = this.dataset.category;
      toggleCategory(category);
    });
  });

  document.querySelectorAll(".filter-item").forEach((item) => {
    item.addEventListener("click", function () {
      const filter = this.dataset.filter;
      toggleFilter(filter);
    });
  });
}

function toggleCategory(category) {
  const toggle = document.querySelector(`[data-category="${category}"]`);
  const items = document.querySelector(
    `.category-items[data-category="${category}"]`
  );
  const icon = toggle.querySelector("i");

  if (expandedCategories.includes(category)) {
    expandedCategories = expandedCategories.filter((c) => c !== category);
    toggle.classList.remove("active");
    items.classList.remove("active");
    icon.className = "fas fa-chevron-right";
  } else {
    expandedCategories.push(category);
    toggle.classList.add("active");
    items.classList.add("active");
    icon.className = "fas fa-chevron-down";
  }
}

function toggleFilter(filter) {
  const filterButton = document.querySelector(`[data-filter="${filter}"]`);

  if (selectedFilters.includes(filter)) {
    selectedFilters = selectedFilters.filter((f) => f !== filter);
    filterButton.classList.remove("active");
  } else {
    selectedFilters.push(filter);
    filterButton.classList.add("active");
  }

  updateSelectedFilters();
  renderAnimations();
}

function updateSelectedFilters() {
  if (selectedFilters.length > 0) {
    selectedFiltersDiv.style.display = "block";
    filterTags.innerHTML = selectedFilters
      .map(
        (filter) =>
          `<span class="filter-tag" onclick="toggleFilter('${filter}')">${filter} ×</span>`
      )
      .join("");
  } else {
    selectedFiltersDiv.style.display = "none";
  }
}

function renderAnimations() {
  const filteredAnimations = filterAnimations(animations);
  animationGrid.innerHTML = filteredAnimations
    .map((animation) => createAnimationCard(animation))
    .join("");
  updateAnimationCount();
}

function filterAnimations(list) {
  if (selectedFilters.length === 0) return list;

  return list.filter((animation) => {
    return selectedFilters.some(
      (filter) =>
        (animation.category && animation.category.includes(filter)) ||
        (animation.title && animation.title.includes(filter)) ||
        (animation.description && animation.description.includes(filter))
    );
  });
}

function createAnimationCard(animation, isFeatured = false) {
  const badgeClass = animation.completionRate >= 90 ? "" : "blue";

  return `
    <div class="card">
      ${
        animation.completionRate >= 90
          ? `
        <div class="card-badge ${badgeClass}">
          <i class="fas fa-certificate"></i>
        </div>`
          : ""
      }
      <div class="card-image">
        ${
          animation.image
            ? `<img src="${animation.image}"
                   alt="${animation.title} kapak görseli"
                   loading="lazy"
                   onerror="this.onerror=null;this.src='assets/covers/default.jpg';">`
            : `<i class="fas fa-book-open"></i>`
        }
      </div>

      <div class="card-content">
        <div>
          <!-- LEVEL ROZETİ KALDIRILDI -->
          <h3 class="card-title">${animation.title || ""}</h3>
          <p class="card-description">${animation.description || ""}</p>
        </div>

        <div class="card-meta">
          <div class="card-stats">
            <div class="card-stats-left"></div>
            <div class="card-completion">
              <div class="completion-dot"></div>
            </div>
          </div>
        </div>

        <a class="card-button"
           href="${getAnimLink(animation)}"
           ${isExternal(animation) ? 'target="_blank" rel="noopener"' : ""}>
          <i class="fas fa-play"></i>
          Animasyona Git
        </a>
      </div>
    </div>
  `;
}

function updateAnimationCount() {
  const filteredAnimations = filterAnimations(animations);
  animationCount.textContent = `${filteredAnimations.length} animasyon`;
}

function playAnimation(id) {
  const anim = animations.find((a) => a.id === id);
  if (anim) window.location.href = getAnimLink(anim);
}

const loadMoreBtn = document.querySelector(".load-more-btn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    console.log("Loading more animations...");
    alert("Daha fazla animasyon yükleniyor...");
  });
}

document.querySelectorAll("a.nav-link").forEach((link) => {
  const href = link.getAttribute("href") || "";
  if (href.startsWith("#")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});

window.animations = animations;
