// /admin/catalog-admin.js
// Bu dosya sadece ADMIN/SEED işleri için. İşin bitince <script> ekini sayfadan kaldır.

// Firebase init’in zaten var:
import { auth, db } from "../../firebase-init.js";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  writeBatch,
  deleteDoc,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* -----------------------------
   0) Yardımcılar
------------------------------ */
async function deleteAllInCollection(...segments) {
  const snap = await getDocs(collection(db, ...segments));
  if (snap.empty) return 0;
  const batch = writeBatch(db);
  snap.forEach((d) => batch.delete(d.ref));
  await batch.commit();
  return snap.size;
}

async function upsertMany(colName, records, { overwrite = false } = {}) {
  const batch = writeBatch(db);
  for (const [id, data] of records) {
    const ref = doc(db, colName, id);
    // overwrite=false ise merge:true (varsa alanları korur)
    batch.set(ref, data, { merge: !overwrite });
  }
  await batch.commit();
}

/* -----------------------------
   1) Root katalog içerikleri (ANIMS)
   (docId → data). URL ve dosya adları birebir sunucundakiyle eşleşmeli!
------------------------------ */
const ANIMS = [
  [
    "veri",
    {
      title: "Veri",
      url: "./animasyonsahneleri/veri/index.html",
      durationSec: 300,
      thumbnailUrl: "../img/veri.png",
      level: "Başlangıç",
      category: "Temel Kavramlar",
      order: 1,
    },
  ],
  [
    "veri-kaydi",
    {
      title: "Veri Kaydı",
      url: "./animasyonsahneleri/verikaydiasıl/index.html",
      durationSec: 360,
      thumbnailUrl: "../img/verikaydı.png",
      level: "Başlangıç",
      category: "Temel Kavramlar",
      order: 2,
    },
  ],
  [
    "veritabani",
    {
      title: "Veritabanı",
      url: "./animasyonsahneleri/veritabani/index.html",
      durationSec: 420,
      thumbnailUrl: "../img/veritabanı.png",
      level: "Başlangıç",
      category: "Temel Kavramlar",
      order: 3,
    },
  ],

  [
    "merkezi",
    {
      title: "Merkezi",
      url: "./animasyonsahneleri/Merkezi/index.html",
      durationSec: 360,
      thumbnailUrl: "../img/merkezi.png",
      level: "Orta",
      category: "Ağ Teknolojileri",
      order: 4,
    },
  ],
  [
    "merkeziyetsiz",
    {
      title: "Merkeziyetsiz",
      url: "./animasyonsahneleri/Merkeziyetsiz/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/merkeziyetsiz.png",
      level: "Orta",
      category: "Ağ Teknolojileri",
      order: 5,
    },
  ],
  [
    "p2p",
    {
      title: "P2P",
      url: "./animasyonsahneleri/p2p2/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/p2p.png",
      level: "Orta",
      category: "Ağ Teknolojileri",
      order: 6,
    },
  ],
  [
    "dagitik-ag",
    {
      title: "Dağıtık Ağ",
      url: "./animasyonsahneleri/dagıtıkAg/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/dağıtıkağ.png",
      level: "Orta",
      category: "Ağ Teknolojileri",
      order: 7,
    },
  ],

  [
    "anahtar-yonetimi",
    {
      title: "Anahtar Yönetimi",
      url: "./animasyonsahneleri/anahtarYöntemi/index.html",
      durationSec: 420,
      thumbnailUrl: "../img/anahtaryönetimi.png",
      level: "Orta",
      category: "Kriptografi",
      order: 9,
    },
  ],
  [
    "hash-fonksiyonlari",
    {
      title: "Hash Fonksiyonları",
      url: "./animasyonsahneleri/hash/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/hashfonksiyonları.png",
      level: "Orta",
      category: "Kriptografi",
      order: 10,
    },
  ],
  [
    "dijital-imza",
    {
      title: "Dijital İmza",
      url: "./animasyonsahneleri/dijitalimza/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/dijitalimza.png",
      level: "Orta",
      category: "Kriptografi",
      order: 11,
    },
  ],
  [
    "zaman-damgasi",
    {
      title: "Zaman Damgası",
      url: "./animasyonsahneleri/zamandamgası/index.html",
      durationSec: 420,
      thumbnailUrl: "../img/zamandamgası.png",
      level: "Orta",
      category: "Kriptografi",
      order: 12,
    },
  ],

  [
    "blok-yapisi",
    {
      title: "Blok Yapısı",
      url: "./animasyonsahneleri/blok/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/blokyapısı.png",
      level: "Orta",
      category: "Blockchain Yapısı",
      order: 13,
    },
  ],
  [
    "merkle-agaclari",
    {
      title: "Merkle Ağaçları",
      url: "./animasyonsahneleri/merklee/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/merklee.png",
      level: "Orta",
      category: "Blockchain Yapısı",
      order: 14,
    },
  ],
  [
    "blockchain",
    {
      title: "Blockchain",
      url: "./animasyonsahneleri/blchk/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/Blochchain.png",
      level: "Orta",
      category: "Blockchain Yapısı",
      order: 15,
    },
  ],
  [
    "islem-ve-blok-dogrulama",
    {
      title: "İşlemler ve Blok Doğrulama",
      url: "./animasyonsahneleri/BlocckhainİslemDogrulama/index.html",
      durationSec: 540,
      thumbnailUrl: "../img/islemlervedogrülama.png",
      level: "Orta",
      category: "Blockchain Yapısı",
      order: 16,
    },
  ],

  [
    "pow",
    {
      title: "Proof of Work (PoW)",
      url: "./animasyonsahneleri/pow/index.html",
      durationSec: 540,
      thumbnailUrl: "../img/pow.png",
      level: "Orta",
      category: "Konsensüs",
      order: 17,
    },
  ],
  [
    "pos",
    {
      title: "Proof of Stake (PoS)",
      url: "./animasyonsahneleri/pos/index.html",
      durationSec: 600,
      thumbnailUrl: "../img/pos.png",
      level: "İleri",
      category: "Konsensüs",
      order: 18,
    },
  ],

  [
    "acik-blockchain",
    {
      title: "Açık (Public) Blockchain",
      url: "./animasyonsahneleri/simetrik/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/acikblockchain.png",
      level: "Orta",
      category: "Türler",
      order: 21,
    },
  ],
  [
    "ozel-blockchain",
    {
      title: "Özel (Private) Blockchain",
      url: "./animasyonsahneleri/asimetrik/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/kapaliblockchain.png",
      level: "Orta",
      category: "Türler",
      order: 22,
    },
  ],
  [
    "konsorsiyum-blockchain",
    {
      title: "Konsorsiyum Blockchain",
      url: "./animasyonsahneleri/konsörsiyum/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/konsorsiyum.png",
      level: "Orta",
      category: "Türler",
      order: 23,
    },
  ],
  [
    "hibrit-modeller",
    {
      title: "Hibrit Modeller",
      url: "./animasyonsahneleri/hibritblockchain/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/Hibritblockchain.png",
      level: "Orta",
      category: "Türler",
      order: 24,
    },
  ],

  [
    "fork",
    {
      title: "Çatallaşma (Fork)",
      url: "./animasyonsahneleri/FORK/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/fork.png",
      level: "Orta",
      category: "Gelişmiş",
      order: 25,
    },
  ],
  [
    "akilli-sozlesmeler",
    {
      title: "Akıllı Sözleşmeler",
      url: "./animasyonsahneleri/akıllısözleşme/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/akıllısözleşme.png",
      level: "Orta",
      category: "Gelişmiş",
      order: 26,
    },
  ],
  [
    "token-coin-mantigi",
    {
      title: "Token / Coin Mantığı",
      url: "./animasyonsahneleri/coinvetoken/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/tokencoin.png",
      level: "Orta",
      category: "Gelişmiş",
      order: 27,
    },
  ],
  [
    "blockchain-kullanim-alanlari",
    {
      title: "Blockchain Kullanım Alanları",
      url: "./animasyonsahneleri/kullanımAlanları/index.html",
      durationSec: 480,
      thumbnailUrl: "../img/Blockchainkullanımalanları.png",
      level: "Orta",
      category: "Uygulamalar",
      order: 28,
    },
  ],
];

/* -----------------------------
   2) KÖK katalogları seed et
------------------------------ */
async function seedCatalogAnimations({ overwrite = false } = {}) {
  await upsertMany("catalogAnimations", ANIMS, { overwrite });
  console.log("✅ catalogAnimations seed bitti.");
}

/* -----------------------------
   3) Yanlış yerdeki (users/{uid} altındaki) katalogları sil
------------------------------ */
async function deleteWrongUserCatalogs(uid) {
  const cols = [
    "catalogAnimations",
    "catalogVideos",
    "catalogQuizzes",
    "catalogTopics",
  ];
  for (const c of cols) {
    const n = await deleteAllInCollection("users", uid, c);
    if (n) console.log(`🧹 users/${uid}/${c} silindi (${n} doküman).`);
  }
  console.log("✅ Kullanıcı altındaki yanlış kataloglar temiz.");
}

/* -----------------------------
   4) Root’taki bir katalogu tamamen temizle (dikkat!)
------------------------------ */
async function clearRootCatalog(colName) {
  const n = await deleteAllInCollection(colName);
  console.warn(`⚠️ ${colName} temizlendi (${n} doküman).`);
}

/* -----------------------------
   5) (Opsiyonel) Sayfadaki window.animations → Firestore senkron
------------------------------ */
async function syncFromWindowAnimations({ overwrite = false } = {}) {
  const arr = Array.isArray(window.animations) ? window.animations : [];
  if (!arr.length) {
    console.warn("window.animations boş.");
    return;
  }
  const records = arr.map((a) => [
    String(a.id || a.slug || a.title)
      .toLowerCase()
      .replace(/\s+/g, "-"),
    {
      title: a.title || "",
      url: a.url || "",
      durationSec: a.durationSec || a.duration ? parseInt(a.duration) * 60 : 0,
      thumbnailUrl: a.image || a.thumbnailUrl || "",
      level: a.level || "Başlangıç",
      category: a.category || "",
      order: a.order || 999,
    },
  ]);
  await upsertMany("catalogAnimations", records, { overwrite });
  console.log(`✅ window.animations → catalogAnimations (${records.length})`);
}

/* -----------------------------
   6) Dışarı aç (console’dan kullan)
------------------------------ */
window.catalogAdmin = {
  seedCatalogAnimations, // Kök katalogu seed et
  deleteWrongUserCatalogs, // users/{uid} altındaki yanlışları sil
  clearRootCatalog, // Tehlikeli! Kökten siler
  syncFromWindowAnimations, // İstersen sayfadaki dizinden yaz
};

console.log(
  "%cCatalog Admin hazır → window.catalogAdmin",
  "color:#10b981;font-weight:bold"
);
