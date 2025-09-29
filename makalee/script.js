const articlesData = [
  {
    topic:
      "Blokzincir Teknolojisi Bilgiye Erişimde Nasıl Kullanılır? Mevcut Durum ve Potansiyeller",
    functional:
      "Bilgiye erişim, bilgi yönetimi ve bilimsel iletişim süreçlerinde blokzincir teknolojisinin mevcut durumu ve potansiyel etkilerinin analizi",
    type: "Araştırma Makalesi",
    date: "2020-03-17",
    category: "Blockchain",
    subcategory: "Bilgi Yönetimi ve Bilimsel İletişim",
    tags: [
      "blokzincir",
      "bilimsel iletişim",
      "açık bilim",
      "açık veri",
      "akıllı kontratlar",
      "merkezi olmayan sistemler",
      "veri yönetimi",
    ],
    tech: "Blockchain protokolleri (Bitcoin, Ethereum), Smart Contracts, Decentralized Applications, Blockchain-based Search Engines",
    reads: 0,
    pdfUrl: "pdf/makale.pdf",
  },
  {
    topic:
      "Blok Zinciri Teknolojisinin Muhasebe ve Vergilendirme Üzerine Etkileri",
    functional:
      "Muhasebe kayıt düzeni, üç taraflı muhasebe sistemi, denetim ve vergi süreçlerinde blokzincir teknolojisinin etkilerinin analizi",
    type: "Derleme Makale",
    date: "2020-10-20",
    category: "Blockchain",
    subcategory: "Muhasebe ve Vergilendirme",
    tags: [
      "blokzincir",
      "muhasebe",
      "vergi",
      "akıllı kontratlar",
      "denetim",
      "üç taraflı kayıt sistemi",
      "finansal şeffaflık",
    ],
    tech: "Blockchain, Smart Contracts, Triple-Entry Accounting, Distributed Ledger Technology (DLT), SHA-256",
    reads: 0,
    pdfStatus: "available",
    pdfUrl: "pdf/makale2.pdf",
  },
  {
    topic:
      "Blokzinciri, Akıllı Kontratlar ve Sağlık Alanındaki Üç Uygulama Örneği",
    functional:
      "Sağlıkta veri güvenliği/gizliliği, hasta kayıtlarının sahipliği ve örnek uygulamalar (Nebula Genomics, Medicalchain/Medibloc, Skychain) açısından blokzinciri ve akıllı kontratların değerlendirilmesi",
    type: "Derleme Makalesi",
    date: "2019-02-21",
    category: "Blockchain",
    subcategory: "Sağlık Bilişimi",
    tags: [
      "blokzinciri",
      "akıllı kontratlar",
      "sağlık verisi güvenliği",
      "sağlık verisi gizliliği",
      "Holochain",
      "hasta kayıtları",
      "yapay zeka",
    ],
    tech: "Bitcoin, Ethereum, Smart Contracts, Holochain, DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale3.pdf",
  },
  {
    topic: "Blok Zincir (Blockchain) Teknolojisi ile Vergilendirme",
    functional:
      "Vergi tahsilatı, KDV, bordro (ücret) vergisi ve transfer fiyatlandırmasında blokzincirin uygulanması; avantajlar, riskler ve idari etkiler",
    type: "Araştırma Makalesi",
    date: "2018-06-29",
    category: "Blockchain",
    subcategory: "Vergilendirme",
    tags: [
      "katma değer vergisi",
      "bordro vergisi",
      "transfer fiyatlandırması",
      "akıllı sözleşmeler",
      "dağıtık kayıt sistemi",
      "vergi uyumu",
      "e-devlet",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, PoW/PoS",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale4.pdf",
  },
  {
    topic:
      "Yerel Yönetimler ve Blokzincir Teknolojisi: Bir Yönetişim Tasarısı/Stratejisi Önerisi",
    functional:
      "Yerel yönetimlerde blokzincirin rolü için teknoloji-merkezci olmayan yönetişim tasarımı/stratejisi önerisi; farkındalık, mimari seçenekler ve kamuda uygulama alanları",
    type: "Araştırma Makalesi",
    date: "2019-09-10",
    category: "Blockchain",
    subcategory: "Kamu / Yerel Yönetimler & E-Devlet",
    tags: [
      "yerel yönetimler",
      "yönetişim",
      "kamu sektörü",
      "blokzincir",
      "dijital kimlik",
      "oy verme",
      "tapu kayıtları",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Digital Identity",
    reads: null,
    pdfUrl: "pdf/makale5.pdf",
  },
  {
    topic:
      "İnternet Servis Sağlayıcıları Arasında Hizmet Kalitesi Temelli Akıllı Yönlendirme Modeli: Yazılım Tanımlı Ağ, Blokzincir ve Makine Öğrenmesi Teknolojilerinin Kesişimi",
    functional:
      "SDN, blokzincir ve makine öğrenmesini entegre ederek İSS’ler arası QoS odaklı akıllı yönlendirme ve kaynak tahsisi (QoSChain, SoRBlock, SC2, SpectrumChain, RL) geliştirilmesi",
    type: "Teknik Rapor / Proje Sonuç Raporu (TÜBİTAK 120E448)",
    date: "2024-04-01",
    category: "Blockchain",
    subcategory: "SDN & QoS Yönlendirme",
    tags: [
      "SDN",
      "blokzincir",
      "makine öğrenmesi",
      "QoS",
      "akıllı sözleşmeler",
      "ISP",
      "yönlendirme",
    ],
    tech: "Software-Defined Networking (OpenFlow), Blockchain (Clique/permissioned), Smart Contracts, Reinforcement Learning (Q-learning), Source Routing, Elastic Optical Networks",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale6.pdf",
  },
  {
    topic:
      "Blokzinciri, Akıllı Kontratlar ve Sağlık Alanındaki Üç Uygulama Örneği",
    functional:
      "Sağlıkta veri güvenliği/gizliliği, hasta kayıtlarının sahipliği ve üç uygulama (Nebula Genomics, Medicalchain/Medibloc, Skychain) üzerinden blokzinciri ve akıllı kontratların değerlendirilmesi",
    type: "Derleme Makalesi",
    date: "2019-02-21",
    category: "Blockchain",
    subcategory: "Sağlık Bilişimi",
    tags: [
      "blokzinciri",
      "akıllı kontratlar",
      "sağlıkta veri güvenliği",
      "sağlıkta veri gizliliği",
      "Holochain",
      "hasta kayıtları",
      "yapay zeka",
    ],
    tech: "Bitcoin, Ethereum, Smart Contracts, Holochain, DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale7.pdf",
  },
  {
    topic:
      "Blok Zinciri Teknolojisinin Muhasebe ve Vergilendirme Üzerine Etkileri",
    functional:
      "Muhasebe kayıt düzeni, denetim ve vergi süreçlerinde blokzincirin etkileri; üç taraflı muhasebe, KDV'nin akıllı sözleşmelerle otomasyonu ve şeffaf kayıt altyapısı",
    type: "Derleme Makale",
    date: "2020-10-20",
    category: "Blockchain",
    subcategory: "Muhasebe ve Vergilendirme",
    tags: [
      "blokzincir",
      "muhasebe",
      "vergi",
      "akıllı sözleşmeler",
      "üç taraflı kayıt sistemi",
      "denetim",
      "finansal şeffaflık",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, SHA-256, Triple-Entry Accounting",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale8.pdf",
  },
  {
    topic:
      "Blokzincir Teknolojisi Bilgiye Erişimde Nasıl Kullanılır? Mevcut Durum ve Potansiyeller",
    functional:
      "Bilgi yönetimi, bilimsel iletişim, açık veri ve açık bilim bağlamında blokzincirin mevcut durumu ve potansiyel etkilerinin değerlendirilmesi",
    type: "Görüş / Opinion Paper",
    date: "2020-03-17",
    category: "Blockchain",
    subcategory: "Bilgi Yönetimi & Bilimsel İletişim",
    tags: [
      "blokzincir",
      "bilimsel iletişim",
      "açık bilim",
      "akademik kütüphaneler",
      "dijital haklar yönetimi",
      "akıllı sözleşmeler",
      "merkezi olmayan sistemler",
    ],
    tech: "Blockchain (Bitcoin, Ethereum), Smart Contracts, Decentralized Systems, Blockchain-based Search",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale9.pdf",
  },
  {
    topic:
      "Havacılık Sektöründe Blokzincir Teknolojisi Uygulamalarının Bugünü ve Geleceği",
    functional:
      "Havayolu/havaalanı ekosisteminde biletleme, bagaj ve kargo takibi, MRO (bakım-onarım), kimlik yönetimi, ödeme ve sadakat süreçlerinde blokzincirin kullanım alanları ve etkileri",
    type: "Araştırma Makalesi",
    date: "2021-10-29",
    category: "Blockchain",
    subcategory: "Havacılık & Tedarik Zinciri",
    tags: [
      "havacılık",
      "tedarik zinciri",
      "biletleme",
      "bagaj takibi",
      "MRO",
      "kimlik yönetimi",
      "sadakat programları",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Ethereum, Dijital Kimlik",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale10.pdf",
  },
  {
    topic: "Akreditif Ödeme Yönteminde Blokzincir Teknolojisi Kullanımı",
    functional:
      "Uluslararası ticarette akreditif (L/C) süreçlerinin blokzincir ve akıllı sözleşmelerle dijitalleştirilmesi; süreç adımları, literatür bulguları ve beklenen faydaların değerlendirilmesi",
    type: "Kitap Bölümü",
    date: "2021-12-01",
    category: "Blockchain",
    subcategory: "Uluslararası Ticaret & Ticaret Finansmanı",
    tags: [
      "akreditif",
      "blokzincir",
      "akıllı sözleşmeler",
      "ticaret finansmanı",
      "uluslararası ticaret",
      "dijital dönüşüm",
      "belge dijitalleştirme",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Letter of Credit (L/C)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale11.pdf",
  },
  {
    topic:
      "Turizmde Blockchain: Teknolojiler, Etkiler, Model ve Uygulama Örnekleri",
    functional:
      "Turizmde blockchain’in rezervasyon, kimlik yönetimi, ödeme/sadakat ve envanter süreçlerine etkileri; sektör için bütüncül model ve uluslararası örnekler",
    type: "Kitap Bölümü",
    date: "2021-06-01",
    category: "Blockchain",
    subcategory: "Turizm Teknolojileri",
    tags: [
      "turizm",
      "blockchain",
      "akıllı sözleşmeler",
      "kriptopara",
      "kimlik yönetimi",
      "rezervasyon",
      "sadakat programları",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Bitcoin/Ethereum",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale12.pdf",
  },
  {
    topic: "Cross-Chain Köprü Protokolleri Güvenliği",
    functional: "Zincirler Arası Varlık Transferi",
    type: "Araştırma Makalesi",
    date: "2023-12-18",
    category: "DeFi",
    subcategory: "Interoperabilite",
    tags: ["cross-chain", "köprü", "güvenlik", "interoperabilite"],
    tech: "Bridge Protocols",
    reads: 789,
    pdfStatus: "available",
    pdfUrl: "pdf/makale13.pdf",
  },
  {
    topic:
      "Türkiye’deki KOBİ’lerin Blockchain Teknolojisine Adaptasyonuyla İlgili Görüşleri",
    functional:
      "Türkiye’deki KOBİ’lerde kripto para ödemelerini benimseme niyetini etkileyen iç/dış faktörlerin (TAM değişkenleri) anket ve istatistiksel testlerle analizi",
    type: "Araştırma Makalesi",
    date: "2024-06-04",
    category: "Blockchain",
    subcategory: "KOBİ’ler & Benimseme",
    tags: [
      "KOBİ",
      "blockchain benimseme",
      "algılanan fayda",
      "algılanan kullanım kolaylığı",
      "sosyal etki",
      "stratejik yönelim",
      "kripto para ödemeleri",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), TAM (Technology Adoption Model)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale14.pdf",
  },
  {
    topic:
      "Akıllı Ortamlarda Blockchain Tabanlı Kimlik Doğrulama Sisteminin Geliştirilmesi",
    functional:
      "IoT/akıllı ortamlar için konsorsiyum blockchain üzerinde kimlik doğrulama ve erişim kontrolü; devlet kurumu dâhil aktörlerle güvenli kayıt, yetkilendirme ve sorgulama akışının tasarımı",
    type: "Doktora Tezi",
    date: "2020-03-01",
    category: "Blockchain",
    subcategory: "Kimlik Doğrulama & IoT",
    tags: [
      "kimlik doğrulama",
      "erişim kontrolü",
      "IoT",
      "akıllı sözleşmeler",
      "Ethereum",
      "DApp",
      "konsorsiyum blockchain",
    ],
    tech: "Ethereum (Geth, Ganache), Solidity, Truffle, Smart Contracts, ECDSA, SHA-256, PoW/PoS/PBFT (karşılaştırmalı), P2P",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale15.pdf",
  },
  {
    topic: "Muhasebe ve Blockchain Teknolojisi",
    functional:
      "Çift girişli muhasebeden blockchain ile üç girişli muhasebeye geçişin hata ve dolandırıcılık risklerini azaltma potansiyelinin analizi",
    type: "Araştırma Makalesi",
    date: "2021-11-25",
    category: "Blockchain",
    subcategory: "Muhasebe",
    tags: [
      "blokzincir",
      "muhasebe",
      "üçlü kayıt sistemi",
      "şeffaflık",
      "denetim",
      "dolandırıcılık önleme",
      "dijital imza",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Triple-Entry Accounting, Kriptografi, Dijital İmza",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale16.pdf",
  },
  {
    topic: "Blockchain Teknolojileri ve Sektörel Etkileri",
    functional:
      "Sigorta, havacılık, sağlık, gayrimenkul, kamu sigortası, akıllı kentler, dış ticaret, eğlence, turizm, lojistik gibi sektörlerde blockchain kullanım alanları ve etkilerinin bütüncül incelemesi",
    type: "Kitap (Derleme)",
    date: "2022-10-01",
    category: "Blockchain",
    subcategory: "Sektörel Uygulamalar",
    tags: [
      "sektörel etkiler",
      "sigortacılık",
      "sağlık",
      "havacılık",
      "akıllı kentler",
      "lojistik",
      "dış ticaret",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, DeFi, Dijital Kimlik",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale17.pdf",
  },
  {
    topic: "Blockchain Teknolojileri ve Sektörel Etkileri",
    functional:
      "Farklı sektörlerde (sigorta, havacılık, sağlık, gayrimenkul, kamu sigortası, akıllı kentler, dış ticaret, eğlence, turizm, lojistik) blockchain uygulamalarının derleme ve vaka temelli incelenmesi",
    type: "Kitap (Editörlü Derleme)",
    date: "2022-10-01",
    category: "Blockchain",
    subcategory: "Sektörel Uygulamalar",
    tags: [
      "sektörel uygulamalar",
      "sigortacılık",
      "havacılık",
      "sağlık",
      "akıllı kentler",
      "dış ticaret",
      "lojistik",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, DeFi, Dijital Kimlik",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale18.pdf",
  },
  {
    topic: "Akıllı Kentlerde Blockchain Teknolojisi",
    functional:
      "Akıllı kentlerin altı bileşeninde (ekonomi, insan, yönetişim, hareketlilik, çevre, yaşam) blockchain kullanım alanları ve dünya/Türkiye örnekleri üzerinden etkilerin değerlendirilmesi",
    type: "Kitap Bölümü",
    date: "2022-10-01",
    category: "Blockchain",
    subcategory: "Akıllı Kentler & E-Devlet",
    tags: [
      "akıllı kentler",
      "yönetişim",
      "dijital kimlik",
      "akıllı ulaşım",
      "enerji ticareti",
      "e-devlet",
      "şeffaflık",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, IoT, Dijital Kimlik, Yenilenebilir Enerji Tokenleri (SolarCoin), E-oylama",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale19.pdf",
  },
  {
    topic: "Blockchain Coğrafi Bilgi Sistemi (CBS) Uygulamaları",
    functional:
      "CBS’de blokzincirin kullanım alanları: arazi/tapu kayıt sistemleri ve sınır ihlali tespiti; Ethereum/Hyperledger gibi platformlarla akıllı sözleşme tabanlı örnekler",
    type: "Bildiri (Sempozyum)",
    date: "2018-09-21",
    category: "Blockchain",
    subcategory: "Coğrafi Bilgi Sistemleri (GIS/CBS) & Tapu",
    tags: [
      "coğrafi bilgi sistemleri",
      "arazi kayıt",
      "tapu",
      "sınır ihlali tespiti",
      "akıllı sözleşmeler",
      "şeffaflık",
      "güvenlik",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Ethereum, Hyperledger, Bithalo",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale20.pdf",
  },
  {
    topic:
      "Blokzincir Teknolojisi Bilgiye Erişimde Nasıl Kullanılır? Mevcut Durum ve Potansiyeller",
    functional:
      "Bilgi yönetimi, bilimsel iletişim, açık veri ve açık bilim bağlamında blokzincirin mevcut durumu ile potansiyel etkilerinin değerlendirilmesi",
    type: "Görüş / Opinion Paper",
    date: "2020-03-17",
    category: "Blockchain",
    subcategory: "Bilgi Yönetimi & Bilimsel İletişim",
    tags: [
      "blokzincir",
      "bilimsel iletişim",
      "açık bilim",
      "akademik kütüphaneler",
      "dijital haklar yönetimi",
      "akıllı sözleşmeler",
      "merkezi olmayan sistemler",
    ],
    tech: "Blockchain (Bitcoin, Ethereum), Smart Contracts, Decentralized Systems, Blockchain-based Search",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale21.pdf",
  },
  {
    topic: "Blockchain Technology and NFTs: A Review in Music Industry",
    functional:
      "Müzik endüstrisinde NFT kullanımının avantaj/dezavantajları ve ilk küresel uygulama (Kings of Leon) üzerinden değerlendirme",
    type: "Derleme Makale",
    date: "2021-09-19",
    category: "Blockchain",
    subcategory: "NFT & Müzik Endüstrisi",
    tags: [
      "NFT",
      "müzik endüstrisi",
      "telif hakları",
      "tokenizasyon",
      "akıllı sözleşmeler",
      "dijital sanat",
      "Ethereum",
    ],
    tech: "Blockchain, NFTs, Ethereum, ERC-721, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale22.pdf",
  },
  {
    topic: "Blockchain Teknolojisi",
    functional:
      "Blockchain’in temel kavramları (dağıtık sistemler, Bizans Generalleri, mutabakat), kriptografi (açık/özel anahtar, dijital imza, hash/SHA-256, Merkle ağaçları) ve Bitcoin örneği üzerinden çalışma prensiplerinin bütünlüklü anlatımı",
    type: "Bitirme Çalışması",
    date: "2018-01-01",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Bitcoin",
    tags: [
      "blokzincir",
      "kriptografi",
      "SHA-256",
      "Merkle ağaçları",
      "Proof-of-Work",
      "madencilik",
      "Bizans Generalleri",
    ],
    tech: "Blockchain, Bitcoin, Public-Key Cryptography, Digital Signatures, SHA-256, Merkle Tree, Proof-of-Work",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale23.pdf",
  },
  {
    topic: "Blockchain Teknolojisinin İşletmeler Açısından Stratejik Analizi",
    functional:
      "Blockchain'in işletmelerde üretim/operasyon, tedarik zinciri, pazarlama, İK ve finans yönetimine etkileri; güçlü/zayıf yönler ve yasal-standardizasyon engelleri üzerinden stratejik değerlendirme",
    type: "Kitap Bölümü",
    date: null,
    category: "Blockchain",
    subcategory: "İşletme Stratejisi & Yönetim",
    tags: [
      "stratejik analiz",
      "işletme yönetimi",
      "tedarik zinciri",
      "pazarlama",
      "insan kaynakları",
      "finansal yönetim",
      "akıllı sözleşmeler",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Kamu/Özel/Konsorsiyum Ağlar",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale24.pdf",
  },
  {
    topic:
      "Blockchain ve Kripto Paraların Finans Sektörüne Etkileri ve Enerji Tüketimi",
    functional:
      "Finans sektöründe blockchain/kripto paraların etkileri ve bankacılık sistemine kıyasla enerji tüketimi, hız, maliyet ve aracısız işlemler açısından karşılaştırmalı analiz",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Finans & Enerji",
    tags: [
      "finans sektörü",
      "kripto paralar",
      "enerji tüketimi",
      "bankacılık",
      "Bitcoin",
      "Ethereum",
      "Proof of Work",
    ],
    tech: "Blockchain, Bitcoin, Ethereum, Proof of Work (PoW), Proof of Stake (PoS), Time-Stamp Protocol, Distributed Ledger Technology (DLT)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale25.pdf",
  },
  {
    topic: "BLOK ZİNCİRİ TEKNOLOJİSİ (Blockchain)",
    functional:
      "Blokzincirin temel yapısı, tarihsel gelişimi, blok bileşenleri, ağ türleri, akıllı sözleşmeler, kripto para ve madencilik kavramlarının bütünlüklü anlatımı",
    type: "Ders Makalesi",
    date: "2021-05-20",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Tanıtım",
    tags: [
      "blokzinciri",
      "kriptografi",
      "akıllı sözleşmeler",
      "kripto paralar",
      "madencilik",
      "izinsiz/izinli ağlar",
      "Merkle kökü",
    ],
    tech: "Blockchain, Bitcoin, Ethereum, Smart Contracts, SHA-256, Merkle Tree, Proof-of-Work",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale26.pdf",
  },
  {
    topic: "Blokzincir Teknolojisi ve Unutulma Hakkı",
    functional:
      "Unutulma hakkının kavramsal çerçevesi ve AB/Türkiye’deki hukuki yaklaşımlar ile blokzincir teknolojisinin veri mahremiyeti ve sosyal medya bağlamında değerlendirilmesi",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Hukuk & Unutulma Hakkı",
    tags: [
      "unutulma hakkı",
      "kişisel verilerin korunması",
      "mahremiyet",
      "sosyal medya",
      "GDPR",
      "KVKK",
      "blokzincir",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Hash",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale27.pdf",
  },
  {
    topic: "Dijital İnovasyon ve Sosyal Girişimcilik",
    functional:
      "Dijitalleşme/dijitalizasyon ayrımı, dijital inovasyon stratejileri ve sosyal girişimciliğin sosyal değer üretimi perspektifinden blockchain ile kesişiminin incelenmesi",
    type: "Kitap Bölümü",
    date: "2022-12-01",
    category: "Blockchain",
    subcategory: "Dijital İnovasyon & Sosyal Girişimcilik",
    tags: [
      "dijital inovasyon",
      "sosyal girişimcilik",
      "dijitalleşme",
      "dijital dönüşüm",
      "blockchain",
      "sosyal değer",
      "Endüstri 4.0",
    ],
    tech: "Blockchain, Smart Contracts, Web 3.0, Metaverse, IoT, AR/VR, NFT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale28.pdf",
  },
  {
    topic:
      "Ekonomide Dijital Dönüşüm: Blockchain Teknolojisi ve Uygulama Alanları Üzerine Bir İnceleme",
    functional:
      "Ekonomide güven, aracı kurumlar ve maliyetler bağlamında blockchain’in altyapısı (P2P, dağıtık defter, mutabakat, kriptografi) ve kullanım alanlarının (finans, sanayi, lojistik, kamu hizmetleri vb.) bütüncül incelemesi",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Ekonomi & Uygulama Alanları",
    tags: [
      "ekonomide dijital dönüşüm",
      "blockchain",
      "dağıtık defter",
      "akıllı sözleşmeler",
      "dijital paralar",
      "kamu hizmetleri",
      "tedarik zinciri",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Bitcoin, Ethereum, Ripple, Hyperledger, Corda, Quorum, BigchainDB",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale29.pdf",
  },
  {
    topic: "Blockchain Teknolojisinin Vergi Sistemine Katkısı",
    functional:
      "Vergi sisteminde dijitalleşme; KDV tahsilatı, bordro (ücret) vergileri ve transfer fiyatlandırmasında blockchain tabanlı otomasyonun, şeffaflık ve gerçek zamanlı veri ile uyuma katkısının analizi",
    type: "E-Makale",
    date: "2019-04-24",
    category: "Blockchain",
    subcategory: "Vergilendirme",
    tags: [
      "vergi sistemi",
      "KDV",
      "bordro vergisi",
      "transfer fiyatlandırması",
      "akıllı sözleşmeler",
      "e-fatura",
      "vergi dijitalleşmesi",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Asimetrik Kriptografi",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale30.pdf",
  },
  {
    topic:
      "İslam Hukuku Açısından Kripto Paralar ve Blockchain Şifreleme Teknolojisi",
    functional:
      "Para/elektronik para/kripto para ve blockchain kavramlarının özeti; İslam hukuku açısından kripto paraların meşruiyeti, leh/aleyh görüşler, fetvalar ve vergi/mahremiyet gibi hususlar üzerinden değerlendirme",
    type: "Araştırma Makalesi",
    date: "2018-07-23",
    category: "Blockchain",
    subcategory: "İslam Hukuku",
    tags: [
      "İslam hukuku",
      "kripto paralar",
      "Bitcoin",
      "blockchain",
      "meşruiyet",
      "garar",
      "vergi",
    ],
    tech: "Blockchain, Kripto Paralar (Bitcoin), Distributed Ledger Technology (DLT), Açık Anahtar Kriptografisi, Dijital İmza",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale31.pdf",
  },
  {
    topic: "Medeni Usul Hukukunda İspat Aracı Olarak Blockchain Teknolojisi",
    functional:
      "Blockchain kayıtlarının HMK çerçevesinde delil (belge/delil başlangıcı) niteliği; senet–güvenli e-imza ayrımı; delillerin ileri sürülmesi ile bilirkişi ve keşif uygulamalarının değerlendirilmesi",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Hukuk & Medeni Usul",
    tags: [
      "medeni usul hukuku",
      "ispat",
      "delil",
      "güvenli elektronik imza",
      "akıllı sözleşmeler",
      "blockchain",
      "Bitcoin",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Akıllı Sözleşmeler, Dijital İmza, Açık/Özel Anahtar Kriptografisi, Hash",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale32.pdf",
  },
  {
    topic: "Muhasebede ve Denetimde Blok Zinciri Teknolojisi",
    functional:
      "Çift taraflı kayıt sisteminden blokzincir ile üç taraflı kayıt sistemine geçiş; dağıtık defterle gerçek zamanlı muhasebe, şeffaflık ve denetimde otomasyonun mesleğe etkileri",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "blokzincir",
      "muhasebe",
      "denetim",
      "üç taraflı kayıt sistemi",
      "dağıtık defter",
      "akıllı sözleşmeler",
      "şeffaflık",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Triple-Entry Accounting, Smart Contracts, Bitcoin",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale33.pdf",
  },
  {
    topic: "Tarım Sisteminde Blockchain Teknolojisinin Kullanımı",
    functional:
      "Tarım ticaretinde tedarik zincirinin dijitalleştirilmesi, izlenebilirlik ve güvenliğin artırılması; devletin düzenleyici rolü ve bütüncül önlemlerle blokzincirin uygulanması",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Tarım & Tedarik Zinciri",
    tags: [
      "tarım",
      "tedarik zinciri",
      "izlenebilirlik",
      "dijitalleşme",
      "blokzincir",
      "dijital güvenlik",
      "regülasyon",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Bitcoin (arka plan)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale34.pdf",
  },
  {
    topic:
      "Blok Zinciri Teknolojisi ve Kripto Paralar: Mevcut Durum, Potansiyel ve Risk Analizi",
    functional:
      "Fintech bağlamında blokzincir ve kripto paraların mevcut durumu, kullanım alanları (kimlik, KYC, ödeme, tedarik zinciri, oylama vb.), Türkiye/dünya örnekleri ve riskler (%51 saldırısı, çift harcama, Sybil, entegrasyon, enerji) üzerine kapsamlı değerlendirme",
    type: "Yüksek Lisans Tezi",
    date: "2019-01-01",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Kripto Paralar",
    tags: [
      "fintech",
      "dağıtık defter",
      "kripto paralar",
      "Bitcoin",
      "Ethereum",
      "Ripple",
      "risk analizi",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Bitcoin, Ethereum, Ripple, Hyperledger, PoW, PoS, PBFT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale35.pdf",
  },
  {
    topic: "Yeni Habercilik Arayışları Kapsamında Blockchain Tartışmaları",
    functional:
      "Gazetecilikte doğruluk/nesnellik, sansür direnci ve güvenilir arşiv için blokzincirin (merkeziyetsiz kayıt) sunduğu olanaklar ile eleştirilerin diyalektik bir analizle tartışılması; Civil, INP.PRESS ve NYT girişimlerine atıflar",
    type: "Bildiri (Konferans)",
    date: "2019-10-06",
    category: "Blockchain",
    subcategory: "Gazetecilik & Yeni Medya",
    tags: [
      "gazetecilik",
      "yeni medya",
      "blokzincir",
      "sansür direnci",
      "doğrulanabilirlik",
      "dijital arşiv",
      "merkeziyetsiz platformlar",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Decentralized News Platforms",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/makale36.pdf",
  },
  {
    topic:
      "Blok Zincir Teknolojisi ve Tedarik Zinciri Yönetimindeki Uygulamaları",
    functional:
      "Tedarik zincirinde izlenebilirlik, şeffaflık, sahtecilik önleme ve süreç verimliliği için blokzincir uygulamalarının (akıllı sözleşmeler, IoT/RFID entegrasyonu) değerlendirilmesi",
    type: "Araştırma Makalesi",
    date: "2019-06-11",
    category: "Blockchain",
    subcategory: "Tedarik Zinciri Yönetimi",
    tags: [
      "tedarik zinciri",
      "izlenebilirlik",
      "şeffaflık",
      "akıllı sözleşmeler",
      "lojistik",
      "IoT",
      "RFID",
    ],
    tech: "Blockchain, Smart Contracts, IoT, RFID, Hyperledger, Ethereum",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale11.563240-733144",
  },
  {
    topic:
      "Borçlar Hukuku ile Veri Koruma Hukuku Açısından Blockchain Teknolojisi ve Akıllı Sözleşmeler: Hukuk Düzenimizde Bir Paradigma Değişimine Gerek Var Mı?",
    functional:
      "Borçlar hukuku ve veri koruma hukuku bakımından blockchain ve akıllı sözleşmelerin doğurduğu sorunlar ve olası paradigma değişimi ihtiyacının analizi",
    type: "Araştırma Makalesi",
    date: "2019-06-20",
    category: "Blockchain",
    subcategory: "Hukuk (Borçlar Hukuku & Veri Koruma)",
    tags: [
      "borçlar hukuku",
      "veri koruma hukuku",
      "akıllı sözleşmeler",
      "blockchain",
      "kişisel verilerin korunması",
      "GDPR/KVKK",
      "sözleşme hukuku",
    ],
    tech: "Blockchain, Smart Contracts, Distributed Ledger Technology (DLT), Hash, Dijital İmza, Açık/Özel Anahtar Kriptografisi",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale12",
  },
  {
    topic:
      "Uluslararası Ticarette Blockchain Teknolojisi Üzerine Genel Bir Bakış",
    functional:
      "Uluslararası ticarette blokzincirin faydaları ve zorlukları; gümrük süreçleri, izlenebilirlik ve verimlilik odağında ikincil veri analiziyle değerlendirme",
    type: "Araştırma Makalesi",
    date: "2023-09-12",
    category: "Blockchain",
    subcategory: "Uluslararası Ticaret & Gümrük",
    tags: [
      "uluslararası ticaret",
      "blockchain",
      "gümrük",
      "tedarik zinciri",
      "izlenebilirlik",
      "lojistik",
      "akıllı sözleşmeler",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Cross-border Trade",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale13",
  },
  {
    topic:
      "Blockchain Teknolojisi ile Finansal Piyasalarda Yaşanan Gelişmeler Üzerine bir İnceleme",
    functional:
      "Finansal piyasalarda blockchain ile ortaya çıkan yenilikler; bankacılık, sermaye piyasaları ve İslami finans uygulamaları açısından değerlendirme",
    type: "Araştırma Makalesi",
    date: "2022-01-01",
    category: "Blockchain",
    subcategory: "Finansal Piyasalar & İslami Finans",
    tags: [
      "finansal piyasalar",
      "İslami finans",
      "fintech",
      "akıllı sözleşmeler",
      "sermaye piyasaları",
      "bankacılık",
      "dijitalleşme",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Digital Finance",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale14",
  },
  {
    topic: "Bitcoin’in Arkasındaki Güç: Blockchain",
    functional:
      "Blockchain’in temel yapısı, sağladığı güven/şeffaflık ve uygulamaya geçişteki tereddütler; Bitcoin bağlamında kavramsal inceleme",
    type: "Araştırma Makalesi",
    date: "2018-07-25",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Bitcoin",
    tags: [
      "Bitcoin",
      "blockchain",
      "dağıtık veri tabanı",
      "açık muhasebe defteri",
      "güven",
      "şeffaflık",
      "madencilik",
    ],
    tech: "Blockchain, Bitcoin, Hash (SHA-256), Distributed Ledger, Proof-of-Work",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale15",
  },
  {
    topic:
      "Vergilendirme Aktörlerinin Blockchain Teknolojisi Tutumları Üzerine Bir Araştırma: Isparta İli Örneği",
    functional:
      "Vergi aktörlerinin (muhasebe/denetim/kamu) blockchain’e yönelik tutum ve algılarının anketle ölçümü; vergi ve muhasebe süreçlerine olası etkiler",
    type: "Araştırma Makalesi",
    date: "2024-04-18",
    category: "Blockchain",
    subcategory: "Vergilendirme & Benimseme",
    tags: [
      "vergilendirme",
      "vergi idaresi",
      "blockchain benimseme",
      "anket",
      "kamu maliyesi",
      "muhasebe",
      "denetim",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale16.1201824-2761270",
  },
  {
    topic: "Blockchain Teknolojisinin Mevcut ve Muhtemel Kullanım Alanları",
    functional:
      "İşletmelerde ve kamuda güncel/potansiyel kullanım alanlarının (finans, muhasebe, tedarik zinciri, sağlık vb.) derleme analizi",
    type: "Derleme Makale",
    date: "2021-12-17",
    category: "Blockchain",
    subcategory: "Genel Uygulama Alanları",
    tags: [
      "kullanım alanları",
      "işletmeler",
      "finans",
      "muhasebe",
      "tedarik zinciri",
      "sağlık",
      "kamu",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale17.988748-1948358",
  },
  {
    topic: "Blockchain Teknolojisinin Mevcut ve Muhtemel Kullanım Alanları",
    functional:
      "Üretim, İK, tedarik zinciri, pazarlama, turizm, kamu, sağlık, finans/muhasebe gibi alanlarda blockchain’in etkilerine ilişkin literatür taraması",
    type: "Derleme Makale",
    date: "2019-11-07",
    category: "Blockchain",
    subcategory: "Genel Uygulama Alanları",
    tags: [
      "kullanım alanları",
      "üretim",
      "insan kaynakları",
      "tedarik zinciri",
      "pazarlama",
      "turizm",
      "kamu",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale18",
  },
  {
    topic: "Blockchain ve Kripto Paraların Kullanımı Üzerine Bir Değerlendirme",
    functional:
      "Blockchain ve kripto paraların özellikleri, geleneksel parayla karşılaştırma, kullanım ve düzenleme bağlamında değerlendirme",
    type: "Araştırma Makalesi",
    date: "2018-08-31",
    category: "Blockchain",
    subcategory: "Kripto Paralar & Ekonomi",
    tags: [
      "kripto paralar",
      "blockchain",
      "para teorisi",
      "geleneksel para",
      "yatırım",
      "düzenleme",
      "riskler",
    ],
    tech: "Blockchain, Cryptocurrencies (Bitcoin), DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale18.427976-669722",
  },
  {
    topic: "Evaluation of Environmental Impacts of Blockchain Technology",
    functional:
      "Blockchain’in çevresel etkileri (enerji tüketimi, karbon emisyonu) ve sürdürülebilirlik odağında iyileştirme/önlem önerileri",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Çevresel Etki & Sürdürülebilirlik",
    tags: [
      "çevresel etki",
      "sürdürülebilirlik",
      "enerji tüketimi",
      "karbon emisyonu",
      "Proof of Work",
      "yenilenebilir enerji",
      "yeşil blockchain",
    ],
    tech: "Blockchain, DLT, PoW/PoS (bağlamsal), Energy Efficiency",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale19",
  },
  {
    topic: "Bitcoin, Blockchain ve Finansal Piyasa Değerlendirmesi",
    functional:
      "Bitcoin ve arkasındaki blockchain teknolojisinin temelleri; finansal piyasalarda etkiler ve literatürdeki bulguların özeti",
    type: "Araştırma Makalesi",
    date: "2019-12-13",
    category: "Blockchain",
    subcategory: "Finansal Piyasalar",
    tags: [
      "Bitcoin",
      "blockchain",
      "finansal piyasalar",
      "sanal para",
      "volatilite",
      "yatırım",
      "ekonomi",
    ],
    tech: "Blockchain, Bitcoin, DLT, Proof-of-Work",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale20",
  },
  {
    topic:
      "İslam Hukuku Açısından Kripto Paralar ve Blockchain Şifreleme Teknolojisi",
    functional:
      "Kripto paralar ve blockchain kriptografisinin İslam hukuku açısından değerlendirilmesi; meşruiyet, risk ve ilke tartışmaları",
    type: "Araştırma Makalesi",
    date: "2018-07-23",
    category: "Blockchain",
    subcategory: "İslam Hukuku",
    tags: [
      "İslam hukuku",
      "kripto paralar",
      "blockchain",
      "meşruiyet",
      "dijital para",
      "elektronik para",
      "Bitcoin",
    ],
    tech: "Blockchain, Kriptografi, Dijital İmza, Açık/Özel Anahtar",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale21.428561-535909",
  },
  {
    topic:
      "Yeni Bir Paradigmanın İnşası Olarak Blockchain Teknolojisi ve NFT’lerin Çağdaş Sanat Üzerindeki Etkisi",
    functional:
      "Blockchain ve NFT’lerin çağdaş sanat üretimi, dağıtımı ve sahiplik yapısı üzerindeki etkileri; etik/sürdürülebilirlik tartışmaları",
    type: "Araştırma Makalesi",
    date: "2025-01-01",
    category: "Blockchain",
    subcategory: "NFT & Sanat",
    tags: [
      "NFT",
      "sanat",
      "çağdaş sanat",
      "dijital sanat",
      "telif",
      "sahiplik",
      "pazar yeri",
    ],
    tech: "Blockchain, NFTs, Ethereum, ERC-721, Akıllı Sözleşmeler",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale23",
  },
  {
    topic: "Dezenformasyonla Mücadelede Blok Zincir (Blockchain) Teknolojisi",
    functional:
      "Yanlış bilgi/sahte haberle mücadelede blockchain’in potansiyeli; doğrulanabilirlik, şeffaflık ve merkeziyetsiz arşiv yaklaşımı",
    type: "Araştırma Makalesi",
    date: "2025-03-28",
    category: "Blockchain",
    subcategory: "Gazetecilik & Yeni Medya",
    tags: [
      "dezenformasyon",
      "blokzincir",
      "sansür direnci",
      "doğrulanabilirlik",
      "dijital arşiv",
      "akıllı sözleşmeler",
      "haber doğrulama",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Akıllı Sözleşmeler, Merkeziyetsiz Haber Platformları",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale24.285-4531084",
  },
  {
    topic:
      "Blok Zincir Teknolojisi ve Tedarik Zinciri Yönetimindeki Uygulamaları",
    functional:
      "Tedarik zincirinde izlenebilirlik, şeffaflık ve sahtecilik önleme için blockchain uygulamaları; IoT/RFID ve akıllı sözleşme entegrasyonları",
    type: "Araştırma Makalesi",
    date: "2019-06-11",
    category: "Blockchain",
    subcategory: "Tedarik Zinciri Yönetimi",
    tags: [
      "tedarik zinciri",
      "izlenebilirlik",
      "şeffaflık",
      "RFID",
      "IoT",
      "akıllı sözleşmeler",
      "lojistik",
    ],
    tech: "Blockchain, Smart Contracts, IoT, RFID, Hyperledger, Ethereum",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale25.563240-733144",
  },
  {
    topic: "Blokzinciri Teknolojisi Nedir? Ne Değildir? : Alanyazın İncelemesi",
    functional:
      "Blokzincirin temel kavramları, mimarisi ve literatürdeki yanlış anlamalar üzerine kapsamlı alanyazın taraması",
    type: "Araştırma Makalesi",
    date: "2019-06-18",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Literatür",
    tags: [
      "blokzincir",
      "alanyazın",
      "mimari",
      "kullanım alanları",
      "güvenlik",
      "akıllı sözleşmeler",
      "kripto paralar",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts, Hash, PoW/PoS",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale26.547122-775807",
  },
  {
    topic: "Blockchain Mutabakat Protokollerinin Karşılaştırılması",
    functional:
      "Blockchain’de kullanılan mutabakat protokollerinin (PoW, PoS, PBFT, DPoS vb.) performans, güvenlik ve ölçeklenebilirlik boyutlarında karşılaştırmalı analizi",
    type: "Araştırma Makalesi",
    date: "2024-07-09",
    category: "Blockchain",
    subcategory: "Konsensüs Protokolleri",
    tags: [
      "mutabakat",
      "PoW",
      "PoS",
      "PBFT",
      "DPoS",
      "bizans hata toleransı",
      "ölçeklenebilirlik",
    ],
    tech: "Proof of Work, Proof of Stake, PBFT, Delegated PoS, Proof of Authority",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale27.1424422-3678930",
  },
  {
    topic: "Muhasebede E-Dönüşüm ve Blok Zinciri (Blockchain) Teknolojisi",
    functional:
      "E-fatura/e-defter süreçleri ve muhasebenin dijital dönüşümünde blokzincirin şeffaflık, izlenebilirlik ve denetime etkilerinin değerlendirilmesi",
    type: "Araştırma Makalesi",
    date: "2024-03-15",
    category: "Blockchain",
    subcategory: "Muhasebe & E-Dönüşüm",
    tags: [
      "muhasebe",
      "e-dönüşüm",
      "e-fatura",
      "e-defter",
      "şeffaflık",
      "denetim",
      "blockchain",
    ],
    tech: "Blockchain, Smart Contracts, DLT, Kriptografi",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale28.1433432-3713743",
  },
  {
    topic: "Sanatın Yeni Teknolojisi: NFT Özgün ve Özgür mü?",
    functional:
      "NFT’lerin sanat üretimi, sahiplik ve fikri mülkiyet üzerindeki etkilerinin eleştirel ve sosyolojik bir bakışla incelenmesi",
    type: "Araştırma Makalesi",
    date: "2022-05-06",
    category: "Blockchain",
    subcategory: "NFT & Sanat",
    tags: [
      "NFT",
      "sanat",
      "özgünlük",
      "özgürlük",
      "fikri mülkiyet",
      "OpenSea",
      "akıllı sözleşmeler",
    ],
    tech: "Blockchain, NFTs, Ethereum, ERC-721, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale29.5272-2281248",
  },
  {
    topic: "Blok Zinciri Teknolojisi",
    functional:
      "Blokzincirin çeşitleri, mimarisi, çalışma prensipleri ve geleneksel VTYS ile karşılaştırılması üzerine literatür incelemesi",
    type: "Derleme Makale",
    date: "2020-04-24",
    category: "Blockchain",
    subcategory: "Temel Teknoloji & Literatür",
    tags: [
      "blokzinciri",
      "veritabanı",
      "güvenlik",
      "mimari",
      "kullanım alanları",
      "karşılaştırma",
      "kripto paralar",
    ],
    tech: "Blockchain, DLT, Smart Contracts, Veri Tabanı Karşılaştırmaları",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/BlockchainMakale30.516990-1081395",
  },
  {
    topic:
      "Dijital Çağın Teknolojisi Blokzincir ve Kripto Paralar: Ulusal Mevzuat ve Uluslararası Standartlar Çerçevesinde Mali Yönden Değerlendirme",
    functional:
      "Kripto paraların muhasebeleştirilmesi, vergilendirilmesi ve finansal raporlaması için ulusal/uluslararası mevzuat çerçevesinde değerlendirme",
    type: "Derleme Makale",
    date: "2020-04-13",
    category: "Blockchain",
    subcategory: "Muhasebe & Vergi Düzenlemeleri",
    tags: [
      "kripto paralar",
      "muhasebe",
      "vergilendirme",
      "mevzuat",
      "finansal raporlama",
      "CBDC",
      "blockchain",
    ],
    tech: "Blockchain, Kripto Paralar, DLT, Dijital İmza",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale31",
  },
  {
    topic: "Blokzincir Teknolojisi ve Uygulama Alanları",
    functional:
      "Blokzincirin sektörlere (finans, tedarik zinciri, sağlık vb.) yansımaları ve kullanım alanlarının genel değerlendirilmesi",
    type: "Araştırma Makalesi",
    date: "2023-06-21",
    category: "Blockchain",
    subcategory: "Genel Uygulama Alanları",
    tags: [
      "uygulama alanları",
      "Endüstri 4.0",
      "kripto paralar",
      "şeffaflık",
      "izlenebilirlik",
      "akıllı sözleşmeler",
      "DLT",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale32",
  },
  {
    topic:
      "Dünya’da ve Türkiye’de Blok Zinciri Teknolojisi: Finans Sektörü, Dış Ticaret ve Vergisel Düzenlemeler Üzerine Genel Bir Değerlendirme",
    functional:
      "Finans sektörü, dış ticaret ve vergi alanında blokzincirin etkileri ve düzenlemelere ilişkin genel değerlendirme",
    type: "Araştırma Makalesi",
    date: "2020-04-01",
    category: "Blockchain",
    subcategory: "Finans, Dış Ticaret & Vergi",
    tags: [
      "finans sektörü",
      "dış ticaret",
      "vergi düzenlemeleri",
      "blockchain",
      "kripto paralar",
      "regülasyon",
      "literatür",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale33.araconf5-1024759",
  },
  {
    topic:
      "Finansal Piyasalarda Blockchain Teknolojisinin Benimsenmesinde Kritik Faktörler: Best-Worst Yöntemi (BWM) ile Bir Değerlendirme",
    functional:
      "Finansal piyasalarda blockchain benimsemesine etki eden faktörlerin BWM (MCDM) ile ölçümü",
    type: "Araştırma Makalesi",
    date: "2022-10-01",
    category: "Blockchain",
    subcategory: "Finansal Piyasalar & Benimseme",
    tags: [
      "finansal piyasalar",
      "benimseme",
      "BWM",
      "MCDM",
      "mevzuat",
      "erişilebilirlik",
      "kullanılabilirlik",
    ],
    tech: "Blockchain, Smart Contracts, Multi-Criteria Decision Making (BWM)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale34.1144309-2540393",
  },
  {
    topic:
      "Blockchain Teknolojisinin Gümrük İşlemleri ve Vergi Hukukundaki Olası Etki ve Yararları Hakkında Değerlendirme",
    functional:
      "Gümrük süreçleri ve vergi hukuku açısından blockchain’in muhtemel etkileri ve faydalarının analizi",
    type: "Araştırma Makalesi",
    date: "2023-07-25",
    category: "Blockchain",
    subcategory: "Gümrük & Vergi Hukuku",
    tags: [
      "gümrük işlemleri",
      "vergi hukuku",
      "blockchain",
      "süreç verimliliği",
      "mevzuat",
      "dijitalleşme",
      "etki analizi",
    ],
    tech: "Blockchain, Distributed Ledger Technology (DLT), Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale35.1212841-2805740",
  },
  {
    topic: "Reklamcılıkta ve Pazarlamada Yeni Nesil Teknoloji: Blockchain",
    functional:
      "Pazarlama ve reklamda blockchain’in kullanım senaryoları, şeffaflık ve güven odağında derleme",
    type: "Derleme Makale",
    date: null,
    category: "Blockchain",
    subcategory: "Pazarlama & Reklam",
    tags: [
      "pazarlama",
      "reklam",
      "blockchain",
      "dijital pazarlama",
      "şeffaflık",
      "veri güvenliği",
      "müşteri deneyimi",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale36.560625-835252",
  },
  {
    topic: "Dijital Kamu Mali Yönetim Sistemi ve Blok Zinciri Teknolojisi",
    functional:
      "Entegre Kamu Mali Yönetim Bilgi Sistemi (IFMIS) ve blockchain tabanlı muhasebe perspektifinden değerlendirme",
    type: "Araştırma Makalesi",
    date: "2018-04-13",
    category: "Blockchain",
    subcategory: "Kamu Maliyesi & E-Devlet",
    tags: [
      "kamu mali yönetimi",
      "IFMIS",
      "blockchain muhasebe",
      "dijitalleşme",
      "şeffaflık",
      "raporlama",
      "Türkiye",
    ],
    tech: "Blockchain, DLT, Government Financial Information Systems",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale37.415066-552246",
  },
  {
    topic:
      "Blok Zinciri Teknolojisinin Dış Ticarete Etkisinin Örnek Projeler Çerçevesinde İncelenmesi",
    functional:
      "Dış ticarette blockchain’in etkileri; uluslararası örnek projeler üzerinden süreç ve fayda analizi",
    type: "Araştırma Makalesi",
    date: "2020-01-17",
    category: "Blockchain",
    subcategory: "Dış Ticaret",
    tags: [
      "dış ticaret",
      "örnek projeler",
      "izlenebilirlik",
      "süreç iyileştirme",
      "blockchain",
      "tedarik zinciri",
      "veri güvenliği",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale38.648600-933301",
  },
  {
    topic:
      "Blok Zinciri Teknolojisi: Kullanım Alanları, Açık Noktaları ve Gelecek Beklentileri",
    functional:
      "Blockchain’in kullanım alanları, zayıf noktaları ve geleceğe yönelik beklentilerin derlemesi",
    type: "Derleme Makale",
    date: "2018-08-01",
    category: "Blockchain",
    subcategory: "Genel Uygulama Alanları",
    tags: [
      "kullanım alanları",
      "güvenlik açıkları",
      "gelecek beklentileri",
      "blockchain",
      "kripto paralar",
      "ölçeklenebilirlik",
      "enerji",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale39.423676-529176",
  },
  {
    topic:
      "Blok Zinciri Teknolojisinin Geleceği: Kripto Para Birimleri ve Ötesi",
    functional:
      "Kripto paralar ve ötesinde blockchain’in geleceğine yönelik kavramsal değerlendirme",
    type: "Araştırma Makalesi",
    date: "2021-09-02",
    category: "Blockchain",
    subcategory: "Kripto Paralar & Gelecek",
    tags: [
      "kripto paralar",
      "blockchain geleceği",
      "fintech",
      "dijital ekonomi",
      "ölçeklenebilirlik",
      "regülasyon",
      "inovasyon",
    ],
    tech: "Blockchain, DLT, Proof-of-Work/Proof-of-Stake (bağlamsal)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale40",
  },
  {
    topic: "Blockchain Tabanlı Bir Veri Yönetim Modeli",
    functional:
      "IoT ve akıllı ulaşım bağlamında blockchain tabanlı veri yönetim modeli tasarımı ve bileşenlerinin sunumu",
    type: "Araştırma Makalesi",
    date: "2019-12-23",
    category: "Blockchain",
    subcategory: "IoT & Veri Yönetimi",
    tags: [
      "blockchain",
      "IoT",
      "akıllı ulaşım",
      "bağlantılı araç",
      "veri yönetimi",
      "akıllı sözleşmeler",
      "güvenlik",
    ],
    tech: "Blockchain, IoT, Smart Contracts, Distributed Ledger Technology (DLT)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale42",
  },
  {
    topic: "Blokzincir Teknolojisi ve Gazeteciliğin Geleceği",
    functional:
      "Gazetecilik ve yayıncılıkta blokzincirin etkileri; doğrulanabilirlik, şeffaflık ve yeni iş modelleri",
    type: "Derleme Makale",
    date: "2018-07-01",
    category: "Blockchain",
    subcategory: "Gazetecilik & Yeni Medya",
    tags: [
      "gazetecilik",
      "yeni medya",
      "blokzincir",
      "sansür direnci",
      "doğrulanabilirlik",
      "mikro ödeme",
      "merkeziyetsiz platformlar",
    ],
    tech: "Blockchain, DLT, Decentralized News Platforms, Micropayments",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale43.440148-520896",
  },
  {
    topic:
      "Blockchain Teknolojisinin Uygulama Alanları ve Finans Sektörüne Etkisi",
    functional:
      "Blockchain’in genel uygulama alanları ve finans/bankacılık/sigortacılık/sermaye piyasalarına etkileri",
    type: "Derleme Makale",
    date: "2024-11-07",
    category: "Blockchain",
    subcategory: "Finansal Piyasalar",
    tags: [
      "finans sektörü",
      "bankacılık",
      "sigortacılık",
      "sermaye piyasaları",
      "işlem hızı",
      "maliyet",
      "regülasyon",
    ],
    tech: "Blockchain, Smart Contracts, DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale44.1556654-4243508",
  },
  {
    topic:
      "Blockchain Teknolojisinin Tasarım ve Planlama Okulu Bağlamında Bütünleştirici Modeli",
    functional:
      "Stratejik yönetim literatürü içinde Tasarım ve Planlama Okulları bağlamında blockchain’in örgütsel stratejilerle entegrasyonu",
    type: "Araştırma Makalesi",
    date: "2025-03-03",
    category: "Blockchain",
    subcategory: "Stratejik Yönetim",
    tags: [
      "stratejik yönetim",
      "tasarım okulu",
      "planlama okulu",
      "dijital dönüşüm",
      "örgütsel strateji",
      "blockchain",
      "model",
    ],
    tech: "Blockchain, DLT, Strategic Management Concepts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale45.1591609-4395028",
  },
  {
    topic:
      "Blockchain Teknolojisinin Tasarım ve Planlama Okulu Bağlamında Bütünleştirici Modeli",
    functional:
      "Stratejik yönetim literatürü içinde Tasarım ve Planlama Okulları bağlamında blockchain’in örgütsel stratejilerle entegrasyonu",
    type: "Araştırma Makalesi",
    date: "2025-03-03",
    category: "Blockchain",
    subcategory: "Stratejik Yönetim",
    tags: [
      "stratejik yönetim",
      "tasarım okulu",
      "planlama okulu",
      "dijital dönüşüm",
      "örgütsel strateji",
      "blockchain",
      "model",
    ],
    tech: "Blockchain, DLT, Strategic Management Concepts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/blockchainmakale45.1591609-4395028",
  },
  {
    topic:
      "Dijital Çağda Muhasebenin Dönüşümü: “Blockchain” Teknolojisinde Muhasebe ve Mali Kontroller",
    functional:
      "Üç taraflı muhasebe, ERP–blockchain entegrasyonu ve akıllı sözleşmeler bağlamında muhasebe ve mali kontroller",
    type: "Araştırma Makalesi",
    date: "2020-01-01",
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "muhasebe",
      "üç taraflı kayıt",
      "ERP entegrasyonu",
      "akıllı sözleşmeler",
      "finansal kontrol",
      "şeffaflık",
      "DLT",
    ],
    tech: "Blockchain, Triple-Entry Accounting, ERP Integration, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale50.657162-1141223",
  },
  {
    topic:
      "Sürdürülebilir İşletmeler İçin Yeni Bir Çözüm Olan Blok Zinciri Teknolojisi Üzerine Sistematik Bir İnceleme",
    functional:
      "Sürdürülebilir işletmeler bağlamında blokzincirin potansiyellerinin sistematik literatür taraması",
    type: "Araştırma Makalesi",
    date: "2023-03-05",
    category: "Blockchain",
    subcategory: "Sürdürülebilirlik & İşletme",
    tags: [
      "sürdürülebilirlik",
      "işletme",
      "literatür taraması",
      "verimlilik",
      "rekabet",
      "blockchain",
      "Endüstri 4.0",
    ],
    tech: "Blockchain, DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale51.1107026-2388697",
  },
  {
    topic:
      "Yerel Yönetimler ve Blokzincir Teknolojisi: Bir Yönetişim Tasarısı/Stratejisi",
    functional:
      "Yerel yönetimlerde blokzincir tabanlı yönetişim tasarımı/stratejisi önerisi ve uygulama alanları",
    type: "Araştırma Makalesi",
    date: "2019-09-10",
    category: "Blockchain",
    subcategory: "Yerel Yönetimler & E-Devlet",
    tags: [
      "yerel yönetimler",
      "e-devlet",
      "yönetişim",
      "akıllı sözleşmeler",
      "kimlik",
      "kayıt yönetimi",
      "blockchain",
    ],
    tech: "Blockchain, DLT, Smart Contracts",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale52.589841-834557",
  },
  {
    topic:
      "Blok Zincirinin Literatür Büyümesi Işığında Yeni Siber Güvenlik Arayışları",
    functional:
      "Bibliyometrik eğilimler ışığında devletlerin blokzincir ve siber güvenlik politikalarının analizi",
    type: "Konferans Bildirisi",
    date: null,
    category: "Blockchain",
    subcategory: "Siber Güvenlik & Politikalar",
    tags: [
      "siber güvenlik",
      "blok zinciri",
      "bibliyometri",
      "istihbarat",
      "devlet politikaları",
      "kripto para",
      "ulusal güvenlik",
    ],
    tech: "Blockchain, Cybersecurity, Bibliometric Analysis",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale54.1016087-2051945",
  },
  {
    topic: "Blok Zincir Teknolojisi Perspektifinden Kalkınma",
    functional:
      "Dijitalleşme ve blokzincirin kalkınma ve kamu sektörü üzerindeki etkilerine ilişkin değerlendirme",
    type: "Araştırma Makalesi",
    date: "2023-12-30",
    category: "Blockchain",
    subcategory: "Kamu Politikası & Kalkınma",
    tags: [
      "kalkınma",
      "kamu sektörü",
      "dijital dönüşüm",
      "blockchain",
      "bilgi teknolojileri",
      "verimlilik",
      "politika",
    ],
    tech: "Blockchain, DLT",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale55.1310637-3192640",
  },
  {
    topic:
      "Blokzincir Teknolojisi ve Kamu Kurumlarınca Verilen Hizmetlerde Blokzincirin Kullanım Durumu",
    functional:
      "Derleme: Blokzincir teknolojisinin kamu hizmetlerinde (vatandaşlık kayıtları, e-oylama, tedarik zinciri vb.) kullanım alanlarını, faydalarını ve kısıtlarını inceler; merkeziyetsizlik, güven ve verimlilik ekseninde kamu politikalarına etkileri değerlendirir.",
    type: "Derleme Makalesi",
    date: "2019",
    category: "Blockchain",
    subcategory: "Kamu Hizmetleri & Politika",
    tags: [
      "kamu hizmetleri",
      "e-oylama",
      "vatandaşlık kayıtları",
      "tedarik zinciri",
      "dijital kimlik",
      "güven",
      "verimlilik",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale56",
  },
  {
    topic:
      "Teknoloji için Çevre, Çevre için Teknoloji: Enerji Sektöründe Blok Zinciri Uygulamaları",
    functional:
      "Araştırma: Enerji sektöründe blokzincirin çevresel etkileri ve kullanım örneklerini (P2P enerji ticareti, karbon piyasaları, yenilenebilir enerji sertifikaları) ele alır; iklim krizi bağlamında politika ve regülasyon önerileri sunar.",
    type: "Araştırma Makalesi",
    date: "2022-12-28",
    category: "Blockchain",
    subcategory: "Enerji & Çevre",
    tags: [
      "enerji sektörü",
      "çevre",
      "iklim krizi",
      "karbon piyasaları",
      "P2P enerji",
      "yenilenebilir enerji sertifikası",
      "politika",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale57.1190387-2713573",
  },
  {
    topic:
      "Blokzinciri, Akıllı Kontratlar ve Sağlık Alanındaki Üç Uygulama Örneği",
    functional:
      "Derleme: Blokzinciri ve akıllı kontratların sağlıkta (hasta verisi güvenliği, EHR entegrasyonu, süreç otomasyonu) üç somut uygulama örneği üzerinden potansiyel faydalarını ve zorluklarını açıklar.",
    type: "Derleme Makalesi",
    date: "2019",
    category: "Blockchain",
    subcategory: "Sağlık Bilişimi",
    tags: [
      "sağlık bilişimi",
      "akıllı kontratlar",
      "hasta verisi",
      "gizlilik",
      "EHR",
      "veri güvenliği",
      "iş akışı otomasyonu",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale58",
  },
  {
    topic:
      "Dijitalleşen Bankacılık Sektöründe Blockchain Teknolojisinin Potansiyel Kullanımı",
    functional:
      "Çalışma, blockchain’in bankacılık sektörüne entegrasyonunu; operasyonel verimlilik, maliyetlerin azaltılması ve işlem güvenliğinin artırılması bağlamında değerlendirir. Sınır ötesi ödemeler, dijital kimlik doğrulama ve akıllı sözleşmeler gibi uygulamalar üzerinden fırsatları analiz eder.",
    type: "Derleme Makale (Review)",
    date: "2024-12-14",
    category: "Blockchain",
    subcategory: "Bankacılık & Finans",
    tags: [
      "dijital bankacılık",
      "blockchain teknolojisi",
      "finansal inovasyon",
      "sınır ötesi ödemeler",
      "dijital kimlik",
      "akıllı sözleşmeler",
      "verimlilik",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale59.pdf",
  },
  {
    topic:
      "Dijital Varlıklar Çağına Seyahat: Blockchain Teknolojisiyle Uçak Biletleri",
    functional:
      "Araştırma: Havacılıkta biletlerin blokzincir/NFT temsilleri, doğrulama ve devredilebilirlik süreçleri ile tedarik zincirinde şeffaflık ve sahtecilik önlemlerini ele alır; uygulama tasarımları ve paydaş etkilerini tartışır.",
    type: "Araştırma Makalesi",
    date: "2024",
    category: "Blockchain",
    subcategory: "Havacılık & Ulaşım",
    tags: [
      "havacılık",
      "uçak bileti",
      "NFT",
      "bilet doğrulama",
      "sahteciliğin önlenmesi",
      "paydaş yönetimi",
      "tedarik zinciri",
    ],
    tech: "Blockchain, DLT, NFT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale60.1494511-3975684",
  },
  {
    topic:
      "Blokzinciri Teknolojisi ve Türkiye’deki Muhtemel Uygulanma Alanları",
    functional:
      "Türkiye’de blokzincir uygulama alanlarını (bankacılık, güvenlik, tedarik zinciri, IoT, kamu, sağlık, enerji vb.) avantaj ve zorluklarıyla derleyen kapsamlı bir çalışma.",
    type: "Derleme Makalesi",
    date: "2019",
    category: "Blockchain",
    subcategory: "Genel & Uygulama Alanları",
    tags: [
      "bankacılık",
      "e-oylama",
      "tedarik zinciri",
      "IoT",
      "kamu",
      "sağlık",
      "enerji",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale61",
  },
  {
    topic: "Blokzincir Mimarisi ve Getirdiği Fırsatlar",
    functional:
      "Blokzincirin temel mimarisi, dağıtık defter yapısı ve farklı kullanım senaryolarında sunduğu fırsatlar ile teknik/işlevsel kazanımları tartışır.",
    type: "Araştırma Makalesi",
    date: "2021-12-01",
    category: "Blockchain",
    subcategory: "Mimari & Tasarım",
    tags: [
      "mimari",
      "dağıtık defter",
      "konsensüs",
      "güven",
      "ölçeklenebilirlik",
      "fırsatlar",
      "kullanım alanları",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale62.1009655-2026790",
  },
  {
    topic:
      "Blockchain ve Yapay Zekâ Entegrasyonu: Türkiye’deki Bulgular ve Gelecek Perspektifleri",
    functional:
      "Türkiye’de sağlık, finans, enerji, tedarik zinciri ve kamu sektörlerinde blockchain–AI entegrasyonunun bulguları ve gelecek potansiyeli incelenir.",
    type: "Araştırma Makalesi",
    date: "2025-06-19",
    category: "Blockchain",
    subcategory: "Yapay Zekâ & Blockchain",
    tags: [
      "yapay zekâ",
      "entegrasyon",
      "sağlık",
      "finans",
      "enerji",
      "kamu",
      "tedarik zinciri",
    ],
    tech: "Blockchain, DLT, Yapay Zekâ",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale63",
  },
  {
    topic: "Blokzinciri Teknolojisi ve Yakın Gelecekteki Uygulama Alanları",
    functional:
      "Blokzincirin temel bileşenleri ve blok üretimi/transfer süreçleri açıklanır; yakın gelecekteki uygulama alanlarına odaklanan bir derleme.",
    type: "Derleme Makalesi",
    date: "2018-02-19",
    category: "Blockchain",
    subcategory: "Genel & Uygulama Alanları",
    tags: [
      "uygulama alanları",
      "güven",
      "dağıtık kayıt",
      "blok üretimi",
      "transfer",
      "yakın gelecek",
      "teknoloji",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale64.365066-430960",
  },
  {
    topic:
      "Sürdürülebilir Akıllı Şehir Ekosistemi için Blockchain Tabanlı Yenilikçi Bir Kripto Para Modeli: TENGRİ Coin",
    functional:
      "Akıllı şehirlerde çevresel davranışları teşvik eden, geri dönüşüm/enerji tasarrufu gibi eylemleri ödüllendiren TENGRİ Coin modelinin tasarımı ve etkileri.",
    type: "Araştırma Makalesi",
    date: "2025-05-18",
    category: "Blockchain",
    subcategory: "Akıllı Şehirler & Sürdürülebilirlik",
    tags: [
      "akıllı şehir",
      "sürdürülebilirlik",
      "kripto para",
      "teşvik",
      "geri dönüşüm",
      "enerji tasarrufu",
      "karbon ayak izi",
    ],
    tech: "Blockchain, DLT, Token Ekonomisi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale65",
  },
  {
    topic:
      "Blokzincir Teknolojisi ve Akıllı Sözleşmeler: Temel Yapı, Özellikler ve Veri Güvenliği Perspektifi",
    functional:
      "Blokzincir ve akıllı sözleşmelerin temel yapısı, özellikleri ve veri güvenliği boyutu; dijital dönüşüm ve hukuk/otomasyon etkileriyle birlikte ele alınır.",
    type: "Derleme Makalesi",
    date: "2024",
    category: "Blockchain",
    subcategory: "Akıllı Sözleşmeler & Güvenlik",
    tags: [
      "akıllı sözleşmeler",
      "veri güvenliği",
      "kriptografi",
      "ethereum",
      "hukuk",
      "otomasyon",
      "riskler",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale67",
  },
  {
    topic:
      "Blokzincir Teknolojisinin Sürdürülebilir Kalkınma Bağlamında Etkileri Üzerine Bir Tartışma",
    functional:
      "Blokzincirin çevre, ekonomi ve toplum üzerindeki olumlu/olumsuz etkileri; kolektif değer yaratımı, veri demokrasisi ve finansal kapsayıcılık tartışılır.",
    type: "Derleme Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Sürdürülebilir Kalkınma",
    tags: [
      "sürdürülebilirlik",
      "çevre",
      "ekonomi",
      "toplum",
      "finansal kapsayıcılık",
      "enerji tüketimi",
      "politika",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale68.1021926-2074856",
  },
  {
    topic: "Akıllı Lojistik Faaliyetlerinde Blokzincir Teknolojisi",
    functional:
      "Endüstri 4.0 bağlamında akıllı lojistikte blokzincirin rolü; izlenebilirlik, şeffaflık, maliyet ve verimlilik etkilerine odaklı derleme.",
    type: "Derleme Makalesi",
    date: "2020-09-01",
    category: "Blockchain",
    subcategory: "Lojistik & Tedarik Zinciri",
    tags: [
      "akıllı lojistik",
      "tedarik zinciri",
      "izlenebilirlik",
      "şeffaflık",
      "Endüstri 4.0",
      "maliyet",
      "verimlilik",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale69.773016-1213535",
  },
  {
    topic:
      "Hizmet Sektöründe Blokzincir ve Tangle Kullanımı: Nesnelerin İnterneti Çerçevesinde Bir Karşılaştırma",
    functional:
      "Hizmet sektöründe blokzincir ve Tangle (IOTA) teknolojilerinin IoT bağlamında karşılaştırılması; performans/ölçeklenebilirlik ve kullanım örnekleri.",
    type: "Araştırma Makalesi",
    date: "2020",
    category: "Blockchain",
    subcategory: "IoT & Hizmet Sektörü",
    tags: [
      "tangle",
      "IOTA",
      "IoT",
      "hizmet sektörü",
      "karşılaştırma",
      "performans",
      "ölçeklenebilirlik",
    ],
    tech: "Blockchain, DLT, Tangle/IOTA",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale70.1518047-4078646",
  },
  {
    topic:
      "Blockchain Teknolojisinin Muhasebe Mesleği ve Denetimi Üzerindeki Dönüştürücü Etkisi: Fırsatlar ve Riskler",
    functional:
      "Blockchain’in muhasebe ve denetim süreçlerinde aracısız, şeffaf ve doğrulanabilir kayıt tutma kapasitesi; fırsatlar ve riskler çerçevesinde değerlendirilir. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2025-06-18",
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "muhasebe",
      "denetim",
      "blockchain",
      "şeffaflık",
      "doğrulanabilirlik",
      "otomasyon",
      "veri güvenliği",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale71.1676908-4776862",
  },
  {
    topic:
      "Kamu Sektöründe Blokzincir Teknolojisi Kullanımı: Türkiye’de Mevcut Durum Analizi",
    functional:
      "Türkiye kamu sektöründe blokzincir uygulamalarının mevcut durumu; potansiyel faydalar, maliyetler ve riskler ile kullanım alanlarına ilişkin analiz. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2022-02-08",
    category: "Blockchain",
    subcategory: "Kamu Sektörü",
    tags: [
      "kamu sektörü",
      "dijital dönüşüm",
      "şeffaflık",
      "veri güvenliği",
      "e-devlet",
      "verimlilik",
      "uygulama",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale72.1065406-2222110",
  },
  {
    topic:
      "İşletmelerin Blok Zinciri (Blockchain) Uygulamalarında Ticari Birliklerin Rolü",
    functional:
      "Ticari birliklerin işletmelerin blokzincir uygulamalarındaki rolü; işbirliği, standartlar ve yaygınlaştırma perspektifinden ele alınır. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2020-05-03",
    category: "Blockchain",
    subcategory: "İşletme & Yönetim",
    tags: [
      "işletme",
      "ticari birlik",
      "uygulama",
      "standartlar",
      "işbirliği",
      "inovasyon",
      "strateji",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale73.717602-1091062",
  },
  {
    topic: "Blok Zinciri Teknolojisi: E-Defter Uygulaması",
    functional:
      "Muhasebe sistemlerinde veri kaydı ve yönetiminin blokzincir ile yeniden yorumlanması; e-defter entegrasyonunun şeffaflık ve izlenebilirliğe katkıları. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2024",
    category: "Blockchain",
    subcategory: "Muhasebe & E-Defter",
    tags: [
      "e-defter",
      "muhasebe",
      "veri yönetimi",
      "akıllı sözleşmeler",
      "şeffaflık",
      "uygulama",
      "entegrasyon",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale74.1260200-2989774",
  },
  {
    topic: "Muhasebede ve Denetimde Blok Zinciri Teknolojisi",
    functional:
      "Muhasebe ve denetim süreçlerinde blokzincirin temel özellikleri, potansiyel etkileri ve dönüşüm alanları tartışılır. (Öz’den özet)",
    type: "Makale",
    date: "2018",
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "muhasebe",
      "denetim",
      "şeffaflık",
      "izlenebilirlik",
      "otomasyon",
      "güvenlik",
      "veri bütünlüğü",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale75",
  },
  {
    topic: "Blockchain Teknolojisi ve Kripto Varlıkların İslam Fıkhındaki Yeri",
    functional:
      "Blockchain ve kripto varlıkların İslam fıkhı açısından değerlendirilmesi; etik, helal/haram, risk ve regülasyon perspektifleri. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2025-03-27",
    category: "Blockchain",
    subcategory: "İslami Finans",
    tags: [
      "İslami finans",
      "fıkıh",
      "kripto varlık",
      "helal/haram",
      "etik",
      "risk",
      "regülasyon",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale76.1656028-4682777",
  },
  {
    topic:
      "Blockchain Üzerine Yeni Bir Halka: Non-Fungible Token (NFT)’nin Bilinirliği Üzerine Bir Araştırma",
    functional:
      "NFT kavramının yakın dönem bilinirliğine dair karşılaştırmalı bir analiz; finans alt segmentinde Google arama trendleri ve literatürle ilişki. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2023",
    category: "Blockchain",
    subcategory: "NFT & Dijital Varlıklar",
    tags: [
      "NFT",
      "dijital varlık",
      "farkındalık",
      "pazar",
      "metaverse",
      "yatırım",
      "trend",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale77.1193852-2728059",
  },
  {
    topic: "Blokzincir Teknolojileri ve Ekonomik Faaliyetler",
    functional:
      "Şifreleme, güven, akıllı sözleşmeler ve dağıtık defter özellikleri bağlamında blokzincirin ekonomik faaliyetlere etkileri. (Abstract/Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2021",
    category: "Blockchain",
    subcategory: "Ekonomi",
    tags: [
      "ekonomi",
      "finans",
      "akıllı sözleşmeler",
      "güven",
      "şifreleme",
      "veri paylaşımı",
      "verimlilik",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale78",
  },
  {
    topic: "Blockchain Analiz Göstergelerinin Bitcoin Fiyatı Üzerindeki Etkisi",
    functional:
      "Bitcoin fiyatı ile SOPR, PM, aktif adres gibi blockchain-özgü göstergeler arasındaki ilişkileri zaman serileriyle inceleyen ampirik çalışma. (Öz’den özet)",
    type: "Araştırma Makalesi",
    date: "2022-12-30",
    category: "Blockchain",
    subcategory: "Piyasa Analizi",
    tags: [
      "Bitcoin",
      "fiyat analizi",
      "gösterge",
      "zaman serisi",
      "SOPR",
      "PM",
      "aktif adres",
    ],
    tech: "Blockchain, On-chain Analiz",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale79",
  },
  {
    topic:
      "Blokzincir Teknolojilerinin Finans ve Kamu Sektörüne Yansımalarının Yönetim Açısından Değerlendirilmesi",
    functional:
      "Blockchain’in güvenlik, şeffaflık, mutabakat ve yönetişim boyutlarıyla finans ve kamu hizmetlerinde verimlilik ve hesap verebilirlik etkileri",
    type: "Araştırma Makalesi",
    date: "2024",
    category: "Blockchain",
    subcategory: "Finans & Kamu Yönetimi",
    tags: [
      "blokzincir",
      "yönetişim",
      "finans",
      "kamu",
      "şeffaflık",
      "mutabakat",
      "akıllı sözleşmeler",
    ],
    tech: "Blockchain, DLT, Asimetrik Kriptografi, Akıllı Sözleşmeler",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "/mnt/data/Blockchainmakale81.pdf",
  },
  {
    topic: "Metaverse ve NFT Dünyasına Tasarım Açısından Bir Bakış",
    functional:
      "Metaverse’ün VR/AR/AI ve blockchain temelleri; NFT’lerin tasarım, sanat ve ekonomiyle kesişimi",
    type: "Araştırma Makalesi",
    date: "2022-09-30",
    category: "Blockchain",
    subcategory: "Metaverse & NFT",
    tags: [
      "metaverse",
      "NFT",
      "blokzincir",
      "tasarım",
      "dijital sanat",
      "Ethereum",
    ],
    tech: "Blockchain (Ethereum), NFT, VR, AR, Yapay Zekâ",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "/mnt/data/Blockchainmakale88.pdf",
  },
  {
    topic: "Blokzincir Teknolojisinin Muhasebe ve Denetime Etkisi",
    functional:
      "Muhasebe kayıtlarının güvenilirlik/şeffaflık artışı, hata ve hilelerin azaltılması, denetimde verimlilik",
    type: "Araştırma Makalesi",
    date: "2019-05-01",
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "muhasebe",
      "denetim",
      "blokzincir",
      "akıllı sözleşmeler",
      "zaman damgası",
      "konsensüs",
    ],
    tech: "Blockchain, DLT, Kriptografi, Zaman Damgası, Konsensüs (PoW)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "/mnt/data/Blockchainmakale84.pdf",
  },
  {
    topic:
      "Uluslararası Ticarette Akreditif Ödeme Yönteminde Blokzincir ve Akıllı Sözleşmeler",
    functional:
      "Akreditifli dış ticaret süreçlerinde blokzincir ve akıllı sözleşmelerin güven, hız ve maliyet üzerindeki etkileri; taraflar arası doğrulama ve işlem şeffaflığı.",
    type: "Araştırma Makalesi",
    date: "2023-09-30",
    category: "Blockchain",
    subcategory: "Dış Ticaret & Ticaret Finansmanı",
    tags: [
      "akreditif",
      "dış ticaret",
      "tedarik zinciri",
      "şeffaflık",
      "doğrulama",
      "maliyet",
      "akıllı sözleşmeler",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale80",
  },
  {
    topic: "Dijital Çağda Temsiliyet: Blockchain Tabanlı Flux Party Örneği",
    functional:
      "Siyasi partilerde dijitalleşmenin etkileri ve Blockchain tabanlı Flux Party’nin oluşumu, örgütlenmesi ve işleyişi üzerinden temsiliyet tartışmaları.",
    type: "Araştırma Makalesi",
    date: "2023-11-01",
    category: "Blockchain",
    subcategory: "Siyaset & Yönetişim",
    tags: [
      "dijital demokrasi",
      "siyasi parti",
      "temsiliyet",
      "yönetişim",
      "dijitalleşme",
      "katılım",
      "blockchain",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale82.130-2955624",
  },
  {
    topic:
      "Blokzincir Teknolojisinin Bankacılık Sektörü İstihdamı Üzerine Olası Etkileri",
    functional:
      "Türkiye finans sektöründe blokzincirin iş süreçlerini ve yetkinlik gereksinimlerini nasıl dönüştürebileceğine dair nitel bulgular.",
    type: "Araştırma Makalesi",
    date: "2020-12-20",
    category: "Blockchain",
    subcategory: "İstihdam & İnsan Kaynakları",
    tags: [
      "bankacılık",
      "istihdam",
      "yetkinlik",
      "dijital dönüşüm",
      "iş süreçleri",
      "inovasyon",
      "nitel analiz",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale83",
  },
  {
    topic:
      "Kripto Varlık Özelinde Üniversite Öğrencilerinin Blokzincir Teknolojisi Bilgi Düzeyleri",
    functional:
      "Üniversite öğrencilerinin blokzincir ve kripto varlık farkındalığına dair anket temelli analiz; eğitim ve politika önerileri.",
    type: "Araştırma Makalesi",
    date: "2024-11-28",
    category: "Blockchain",
    subcategory: "Eğitim & Farkındalık",
    tags: [
      "kripto varlık",
      "farkındalık",
      "anket",
      "gençlik",
      "eğitim",
      "politika",
      "dijital okuryazarlık",
    ],
    tech: "Blockchain, DLT, Kriptografi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale86.1453381-3797243",
  },
  {
    topic: "Kamu Alımlarında Akıllı Sözleşmelerin Kullanımı",
    functional:
      "Kamu alım süreçlerinde akıllı sözleşmelerin şeffaflık, hız ve maliyet boyutlarında sağlayabileceği avantajlar ve riskler.",
    type: "Araştırma Makalesi",
    date: "2022-09-14",
    category: "Blockchain",
    subcategory: "Kamu Alımları & E-Devlet",
    tags: [
      "kamu alımları",
      "akıllı sözleşmeler",
      "şeffaflık",
      "verimlilik",
      "regülasyon",
      "uygulama",
      "risk",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale87.1019897-2066714",
  },
  {
    topic:
      "Kripto Paralar, Blokzinciri Teknolojisi ve Uluslararası İlişkilere Muhtemel Etkileri",
    functional:
      "Kripto paraların yükselişinin devletler ve uluslararası sistem üzerindeki etkileri; siber güvenlik, regülasyon ve para politikası tartışmaları.",
    type: "Araştırma Makalesi",
    date: "2015",
    category: "Blockchain",
    subcategory: "Uluslararası İlişkiler & Politika",
    tags: [
      "kripto para",
      "uluslararası ilişkiler",
      "siber güvenlik",
      "regülasyon",
      "para politikası",
      "Bitcoin",
      "blokzincir",
    ],
    tech: "Blockchain, DLT, Kriptografi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale89",
  },
  {
    topic:
      "Blockchain Destekli IoT Varlıklarında Fiyat Tahmini için Model Karşılaştırması",
    functional:
      "IoT temalı kripto varlıklarda (VET, IOTA, HNT) 2020–2024 verileriyle karar ağaçları ve rastgele orman gibi yöntemlerin karşılaştırmalı performansı.",
    type: "Araştırma Makalesi",
    date: "2025-07-15",
    category: "Blockchain",
    subcategory: "Kripto Varlıklar & Piyasa Analizi",
    tags: [
      "IoT",
      "kripto varlık",
      "fiyat tahmini",
      "zaman serisi",
      "karar ağaçları",
      "random forest",
      "performans",
    ],
    tech: "Blockchain, On-chain Analiz, Decision Trees, Random Forest",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale91.1665890-4726820",
  },
  {
    topic:
      "İnşaat Sektöründe Blockchain ve BIM: Benimsenme, Destekler–Engeller, SWOT",
    functional:
      "Blockchain/DLT’nin BIM, tedarik zinciri ve akıllı sözleşmeler üzerinden inşaat sektöründe verimlilik, şeffaflık ve işbirliğine etkilerini inceler; sistematik literatür taramasıyla destek–engel listeleri ve SWOT çıkarır.",
    type: "Tez",
    date: null,
    category: "Blockchain",
    subcategory: "Sektörel Uygulamalar — İnşaat/BIM",
    tags: [
      "BIM",
      "inşaat",
      "tedarik zinciri",
      "akıllı sözleşmeler",
      "SWOT",
      "dijitalleşme",
      "proje finansmanı",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler, Kripto Paralar",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale92.pdf",
  },
  {
    topic: "Blokzincir ile Elektronik Belgelerin Güvenilirliği",
    functional:
      "e-belgelerin arşivsel bağ, özgünlük ve güvenilirliğinin blokzincir temelli yaklaşımlarla korunmasına ilişkin olumlu/olumsuz etkileri Türkiye bağlamında tartışır.",
    type: "Kitap Bölümü",
    date: "2019-12-27",
    category: "Blockchain",
    subcategory: "Kamu Politikası & e-Belge / Arşiv",
    tags: [
      "e-belge",
      "güvenilirlik",
      "arşiv",
      "mutabakat",
      "PoW",
      "PoS",
      "PoA",
    ],
    tech: "Blockchain, Hash, Konsensüs (PoW/PoS/PoA)",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale93.pdf",
  },
  {
    topic: "Blokzincirin Kamu İdaresine Olası Etkileri",
    functional:
      "Kamu yönetiminde blokzincirin yönetişim, şeffaflık, hesap verebilirlik ve hizmet süreçlerine entegrasyon potansiyelini literatür ve dünya örnekleriyle değerlendirir.",
    type: "Hakemli Makale",
    date: "2019-12-03",
    category: "Blockchain",
    subcategory: "Kamu Politikası & Yönetişim",
    tags: [
      "kamu yönetimi",
      "yönetişim",
      "şeffaflık",
      "hesap verebilirlik",
      "akıllı sözleşmeler",
      "e-devlet",
    ],
    tech: "Blockchain, Akıllı Sözleşmeler",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale94.pdf",
  },
  {
    topic: "Blokzincir ve Yeni Medya: Gazetecilik & Yayıncılık",
    functional:
      "Gazetecilik ve yayıncılıkta blokzincirin zaman damgası, reklam ölçümü, TCR/mikro ödemeler ve dijital hak yönetimi gibi problemlere sunduğu çözümleri tartışır.",
    type: "Araştırma Makalesi",
    date: "2023-10-28",
    category: "Blockchain",
    subcategory: "Medya & Yaratıcı Endüstriler",
    tags: [
      "gazetecilik",
      "yeni medya",
      "mikro ödeme",
      "dijital haklar",
      "TCR",
      "reklam ölçümü",
    ],
    tech: "Blockchain, Token-Curated Registries (TCR), Kripto Paralar",
    reads: null,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale96.pdf",
  },
  {
    topic:
      "Yerel Hizmet Sunumunda Blok Zinciri Teknolojisi: Şehir Yönetiminde Yenilikçi Yaklaşımlar",
    functional:
      "Yerel yönetimlerde blokzincirin şeffaflık, izlenebilirlik ve hizmet verimliliğine etkileri; belediye süreçlerinde potansiyel kullanım alanları ve yönetişim çıktıları.",
    type: "Araştırma Makalesi",
    date: "2024-07-06",
    category: "Blockchain",
    subcategory: "Yerel Yönetimler & Kamu Hizmeti",
    tags: [
      "yerel yönetimler",
      "belediye",
      "şeffaflık",
      "izlenebilirlik",
      "hizmet verimliliği",
      "yönetişim",
      "dijital dönüşüm",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale95.1533936-4148240",
  },
  {
    topic: "Blockchain Sözleşmelerinin Türk Özel Hukukundaki Yeri",
    functional:
      "Türk özel hukukunda blockchain tabanlı (akıllı) sözleşmelerin hukuki niteliği, geçerlilik şartları, ispat ve sorumluluk boyutları; mevzuat ve içtihat tartışmaları.",
    type: "Yüksek Lisans Tezi",
    date: "2022-09",
    category: "Blockchain",
    subcategory: "Hukuk",
    tags: [
      "özel hukuk",
      "akıllı sözleşmeler",
      "geçerlilik",
      "ispat",
      "sorumluluk",
      "mevzuat",
      "içtihat",
    ],
    tech: "Blockchain, Akıllı Sözleşmeler, Kriptografi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale98",
  },
  {
    topic:
      "Blockchain Kripto Varlık Bitcoin Üzerine Bibliyometrik Bir Analiz: Web of Science Uygulaması",
    functional:
      "Kripto varlıklar/blokzincir/Bitcoin literatürünün WoS verisinde bibliyometrik yöntemle incelenmesi; yıllara göre yayın eğilimleri, en etkin yazar-ülke-dergi ağları.",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Bilimmetri & Literatür Analizi",
    tags: [
      "bibliyometri",
      "Web of Science",
      "kripto varlık",
      "Bitcoin",
      "yayın analizi",
      "atıf ağı",
      "trend",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale99",
  },
  {
    topic:
      "Dijital Dönüşüm Sürecinde Blok Zincir Teknolojisi Benimsenmesinin Önündeki Engellerin Değerlendirilmesi",
    functional:
      "İşletmelerde blokzincir benimsenmesinin önündeki örgütsel, teknik ve regülasyon temelli engellerin sınıflandırılması ve değerlendirilmesi; çözüm önerileri.",
    type: "Araştırma Makalesi",
    date: "2024-07-06",
    category: "Blockchain",
    subcategory: "Dijital Dönüşüm & Strateji",
    tags: [
      "benimseme engelleri",
      "dijital dönüşüm",
      "örgütsel faktörler",
      "teknik zorluklar",
      "regülasyon",
      "strateji",
      "uyum",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blockchainmakale100.1487634-3945697",
  },
  {
    topic:
      "İşletmelerde Blockchain Teknolojisinin Kullanımının Belirleyicileri: Kütahya İl Örneği",
    functional:
      "Blockchain teknolojisinin ödeme sistemleri, tedarik zinciri, şeffaflık, hız, maliyet ve veri güvenliği üzerindeki katkıları bağlamında Kütahya’daki özel sektör işletmelerinde benimsenme (TOE: teknolojik–örgütsel–çevresel) belirleyicilerinin ampirik analizi.",
    type: "Araştırma Makalesi",
    date: "2022-12-21",
    category: "Blockchain",
    subcategory: "İşletme & Dijital Dönüşüm",
    tags: [
      "benimseme",
      "TOE",
      "tedarik zinciri",
      "şeffaflık",
      "hız",
      "maliyet",
      "veri güvenliği",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/blockhainmakale22.1190610-2714486",
  },
  {
    topic: "Blockchain Teknolojisi ve Türkiye Finans Sektöründeki Durumu",
    functional:
      "Türkiye finans sektöründe blockchain’in potansiyel kullanım alanlarının (ödemeler, enerji piyasaları, tedarik zinciri, IP yönetimi, kamu) panoraması ve özel bir emeklilik fonu ağı önerisi; şeffaflık ve otomasyon vurgusuyla literatür taraması.",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Bankacılık & Finans",
    tags: [
      "finans",
      "fintech",
      "dağıtık defter",
      "kamu",
      "enerji piyasaları",
      "tedarik zinciri",
      "entelektüel mülkiyet",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/makale13.509254-724477",
  },
  {
    topic:
      "Dijital Çağda Paranın Dönüşümü: Kripto Para Birimleri ve Blok Zinciri (Blockchain) Teknolojisi – Üniversite Öğrencilerine Yönelik Bir Araştırma",
    functional:
      "Üniversite öğrencilerinin kripto para ve blockchain’e ilişkin farkındalık/tutum düzeylerini anketle ölçer; kriptografik varlık, altcoin, dijital para gibi kavramları açıklayarak bulguları tartışır.",
    type: "Araştırma Makalesi",
    date: "2020-02-25",
    category: "Blockchain",
    subcategory: "Eğitim & Farkındalık",
    tags: [
      "kripto para",
      "dijital para",
      "altcoin",
      "farkındalık",
      "üniversite öğrencileri",
      "anket",
      "blockchain",
    ],
    tech: "Blockchain, DLT, Kriptografi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/blocckhain.647019-1144342",
  },
  {
    topic:
      "Dünyada ve Türkiye’de Blok Zincir Teknolojisinin Gelişimi ve Kripto Paralar",
    functional:
      "Blokzincirin temel özellikleri, kullanım alanları ve avantaj/dezavantajları; Türkiye ve dünyada kripto paralara yaklaşımlar üzerinden değerlendirme.",
    type: "Araştırma Makalesi",
    date: "2021",
    category: "Blockchain",
    subcategory: "Genel & Kripto Paralar",
    tags: [
      "blokzincir",
      "kripto para",
      "dijital dönüşüm",
      "kriptografi",
      "kayıt sistemi",
      "güvenlik",
      "politikalar",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale46.884250-1592112",
  },
  {
    topic: "Asimetrik Volatilitenin Tahmini: Kripto Para Bitcoin Uygulaması",
    functional:
      "Bitcoin fiyat serisi üzerinde ARCH, GARCH, ARCHM, EGARCH ve TARCH modelleriyle asimetrik volatilitenin tahmini; en iyi performansın TARCH’ta olduğu sonucuna varır (2015–2018 dönemi).",
    type: "Araştırma Makalesi",
    date: null,
    category: "Blockchain",
    subcategory: "Piyasa Analizi",
    tags: [
      "Bitcoin",
      "volatilite",
      "ARCH",
      "GARCH",
      "EGARCH",
      "TARCH",
      "zaman serisi",
    ],
    tech: "Blockchain, On-chain Analiz",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale47.450018-588825",
  },
  {
    topic: "Blockchain Teknolojisinin Dijital Pazarlama Üzerine Etkisi",
    functional:
      "Dijital pazarlamada güvenlik, veri sahipliği ve şeffaflık sorunlarına blockchain’in şifreleme ve dağıtık kayıt ile sunduğu çözümler; reklam, veri koruma ve içerik hak yönetimi örnekleriyle tartışma.",
    type: "Araştırma Makalesi",
    date: "2022-09",
    category: "Blockchain",
    subcategory: "Pazarlama & Medya",
    tags: [
      "dijital pazarlama",
      "şeffaflık",
      "veri güvenliği",
      "kripto para",
      "reklamcılık",
      "içerik hakları",
      "P2P",
    ],
    tech: "Blockchain, DLT, Kriptografi",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/blocckhainmakale48.pdf",
  },
  {
    topic: "Kripto Para Bitcoin: ARIMA ve Yapay Sinir Ağları ile Fiyat Tahmini",
    functional:
      "Bitcoin fiyatlarının ARIMA ve Yapay Sinir Ağları ile tahmini; yatırımcılar için karşılaştırmalı performans analizleri ve model sonuçları (2018).",
    type: "Araştırma Makalesi",
    date: "2018-03-05",
    category: "Blockchain",
    subcategory: "Piyasa Analizi",
    tags: [
      "Bitcoin",
      "fiyat tahmini",
      "ARIMA",
      "YSA",
      "zaman serisi",
      "blokzincir",
      "finans",
    ],
    tech: "Blockchain, On-chain Analiz, ARIMA, ANN",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale53.005-480798",
  },
  {
    topic: "Blokzincir Teknolojisi ve Merkeziyetsiz Finans Uygulamaları",
    functional:
      "Blokzincir mimarisi ve DeFi bileşenleri (cüzdanlar, DEX, borç verme, türevler, NFT vb.); güvenlik ve regülasyon bağlamında fırsatlar ve zorlukların değerlendirilmesi.",
    type: "Araştırma Makalesi",
    date: "2022-12-12",
    category: "Blockchain",
    subcategory: "DeFi",
    tags: [
      "DeFi",
      "güvenlik",
      "kripto para",
      "merkeziyetsizlik",
      "cüzdan",
      "DEX",
      "regülasyon",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale66",
  },
  {
    topic:
      "Kripto Paralar ve Blok Zinciri: Turizm Sektörü Üzerine Bir Değerlendirme",
    functional:
      "Turizmde blockchain kullanımı: konuk ve gıda takibi, puanlama sistemleri, dijital kimlik ve hava yolları üzerinden öneriler; literatür derlemesi.",
    type: "Araştırma Makalesi",
    date: "2020-01-01",
    category: "Blockchain",
    subcategory: "Turizm & Hizmet",
    tags: [
      "turizm",
      "Bitcoin",
      "altcoin",
      "dijital kimlik",
      "izlenebilirlik",
      "mikro ödemeler",
      "blokzincir",
    ],
    tech: "Blockchain, DLT",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale85.573988-1097752",
  },
  {
    topic:
      "Blokzincir Teknolojisi ve Akıllı Sözleşmeler: Hizmet Alanları Üzerine Bir İnceleme",
    functional:
      "Blokzincir ve akıllı sözleşmelerin temel kavramları ile çeşitli hizmet alanlarındaki kullanımının Türkiye bağlamında etik ve pratik zorluklarla birlikte incelenmesi (2025).",
    type: "Araştırma Makalesi",
    date: "2025",
    category: "Blockchain",
    subcategory: "Akıllı Sözleşmeler",
    tags: [
      "akıllı sözleşmeler",
      "hizmet sektörü",
      "etik",
      "uygulama",
      "güvenlik",
      "otomasyon",
      "yönetişim",
    ],
    tech: "Blockchain, DLT, Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale86",
  },
  {
    topic:
      "Blok Zinciri Teknolojisi ve Yapay Zekâ Yöntemleriyle Muhasebe ve Denetim: Literatür Taraması",
    functional:
      "Muhasebe ve denetimde blokzincir ile yapay zekânın birlikte kullanımını inceleyen literatür taraması. Şeffaflık, izlenebilirlik ve otomasyonun etkileri; denetim kanıtı üretimi, çift kayıt sisteminin dönüşümü ve riskler değerlendirilir.",
    type: "Derleme Makalesi",
    date: "2024",
    category: "Blockchain",
    subcategory: "Muhasebe & Denetim",
    tags: [
      "muhasebe",
      "denetim",
      "blokzincir",
      "yapay zekâ",
      "şeffaflık",
      "otomasyon",
      "veri güvenliği",
    ],
    tech: "Blockchain, DLT, Yapay Zekâ",
    reads: 1250,
    pdfStatus: "available",
    pdfUrl: "pdf/Blocckhainmakale97.1426193-3686258",
  },
  {
    topic: "Blokzinciri Teknolojisi Nedir? Ne Değildir?: Alanyazın İncelemesi",
    functional:
      "Blokzincirin ne olduğu/olmadığına dair kapsamlı literatür taraması. Dağıtık defter yapısı, merkeziyetsizlik, konsensüs algoritmaları ve akıllı sözleşmeler bağlamında yanlış anlamaları giderir; doğru kullanım alanlarını çerçeveler.",
    type: "Araştırma Makalesi",
    date: "2019-07-01",
    category: "Blockchain",
    subcategory: "Genel & Literatür",
    tags: [
      "blokzinciri",
      "literatür incelemesi",
      "dağıtık defter",
      "merkeziyetsizlik",
      "konsensüs",
      "akıllı sözleşmeler",
      "güvenlik",
    ],
    tech: "Blockchain, DLT, Konsensüs (PoW/PoS/PoA), Akıllı Sözleşmeler",
    reads: 1250,
    pdfStatus: "available",

    pdfUrl: "pdf/Blockchain-makale12.547122-775807",
  },
];

const state = {
  articles: [...articlesData],
  filteredArticles: [...articlesData],
  currentPage: 1,
  itemsPerPage: 60,
  searchTerm: "",
  selectedCategory: "",
  selectedTags: [],
  sortBy: "date_desc",
  sortColumn: "date",
  sortDirection: "desc",
};

const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const tagsList = document.getElementById("tagsList");
const quickFilters = document.getElementById("quickFilters");
const sortSelect = document.getElementById("sortSelect");
const articlesTable = document.getElementById("articlesTable");
const articlesBody = document.getElementById("articlesBody");
const emptyState = document.getElementById("emptyState");
const pagination = document.getElementById("pagination-makale");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");

function init() {
  renderCategories();
  renderTags();
  bindEvents();
  applyFilters();
}

function renderCategories() {
  const categories = [
    ...new Set(articlesData.map((article) => article.category)),
  ];
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = articlesData.filter(
      (article) => article.category === category
    ).length;
    return acc;
  }, {});

  const allCount = articlesData.length;

  categoryList.innerHTML = `
        <div class="category-item ${
          state.selectedCategory === "" ? "active" : ""
        }" data-category="">
            <span>Tümü</span>
            <span class="category-badge">${allCount}</span>
        </div>
        ${categories
          .map(
            (category) => `
            <div class="category-item ${
              state.selectedCategory === category ? "active" : ""
            }" data-category="${category}">
                <span>${category}</span>
                <span class="category-badge">${categoryCounts[category]}</span>
            </div>
        `
          )
          .join("")}
    `;
}

function renderTags() {
  const allTags = [...new Set(articlesData.flatMap((article) => article.tags))];

  tagsList.innerHTML = allTags
    .map(
      (tag) => `
        <span class="tag-chip ${
          state.selectedTags.includes(tag) ? "active" : ""
        }" data-tag="${tag}">
            ${tag}
        </span>
    `
    )
    .join("");
}

function bindEvents() {
  searchInput.addEventListener("input", (e) => {
    state.searchTerm = e.target.value.toLowerCase();
    state.currentPage = 1;
    applyFilters();
  });

  categoryList.addEventListener("click", (e) => {
    const categoryItem = e.target.closest(".category-item");
    if (categoryItem) {
      state.selectedCategory = categoryItem.dataset.category;
      state.currentPage = 1;
      updateCategoryUI();
      applyFilters();
    }
  });

  tagsList.addEventListener("click", (e) => {
    const tagChip = e.target.closest(".tag-chip");
    if (tagChip) {
      const tag = tagChip.dataset.tag;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag);
      } else {
        state.selectedTags.push(tag);
      }
      state.currentPage = 1;
      updateTagsUI();
      applyFilters();
    }
  });

  quickFilters.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) {
      state.selectedCategory = chip.dataset.category;
      state.currentPage = 1;
      updateQuickFiltersUI();
      updateCategoryUI();
      applyFilters();
    }
  });

  sortSelect.addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    const [column, direction] = state.sortBy.split("_");
    state.sortColumn = column;
    state.sortDirection = direction;
    updateTableHeaderSort();
    applyFilters();
  });

  articlesTable.addEventListener("click", (e) => {
    const th = e.target.closest("th[data-sort]");
    if (th) {
      const column = th.dataset.sort;
      if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === "asc" ? "desc" : "asc";
      } else {
        state.sortColumn = column;
        state.sortDirection = "asc";
      }
      state.sortBy = `${state.sortColumn}_${state.sortDirection}`;
      sortSelect.value = state.sortBy;
      updateTableHeaderSort();
      applyFilters();
    }
  });

  articlesTable.addEventListener("keydown", (e) => {
    const th = e.target.closest("th[data-sort]");
    if (th && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      th.click();
    }
  });

  clearFiltersBtn.addEventListener("click", () => {
    state.searchTerm = "";
    state.selectedCategory = "";
    state.selectedTags = [];
    state.currentPage = 1;
    searchInput.value = "";
    updateAllUI();
    applyFilters();
  });
}

function updateCategoryUI() {
  document.querySelectorAll(".category-item").forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.category === state.selectedCategory
    );
  });
}

function updateTagsUI() {
  document.querySelectorAll(".tag-chip").forEach((chip) => {
    chip.classList.toggle(
      "active",
      state.selectedTags.includes(chip.dataset.tag)
    );
  });
}

function updateQuickFiltersUI() {
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.classList.toggle(
      "active",
      chip.dataset.category === state.selectedCategory
    );
  });
}

function updateTableHeaderSort() {
  document.querySelectorAll("th[data-sort]").forEach((th) => {
    if (th.dataset.sort === state.sortColumn) {
      th.setAttribute(
        "aria-sort",
        state.sortDirection === "asc" ? "ascending" : "descending"
      );
    } else {
      th.setAttribute("aria-sort", "none");
    }
  });
}

function updateAllUI() {
  updateCategoryUI();
  updateTagsUI();
  updateQuickFiltersUI();
  updateTableHeaderSort();
}

function applyFilters() {
  let filtered = [...articlesData];

  if (state.searchTerm) {
    filtered = filtered.filter(
      (article) =>
        article.topic.toLowerCase().includes(state.searchTerm) ||
        article.functional.toLowerCase().includes(state.searchTerm) ||
        article.type.toLowerCase().includes(state.searchTerm) ||
        article.subcategory.toLowerCase().includes(state.searchTerm) ||
        article.tech.toLowerCase().includes(state.searchTerm) ||
        article.tags.some((tag) => tag.toLowerCase().includes(state.searchTerm))
    );
  }

  if (state.selectedCategory) {
    filtered = filtered.filter(
      (article) => article.category === state.selectedCategory
    );
  }

  if (state.selectedTags.length > 0) {
    filtered = filtered.filter((article) =>
      state.selectedTags.every((tag) => article.tags.includes(tag))
    );
  }

  filtered.sort((a, b) => {
    let aVal, bVal;

    switch (state.sortColumn) {
      case "date":
        aVal = new Date(a.date);
        bVal = new Date(b.date);
        break;
      case "reads":
        aVal = a.reads;
        bVal = b.reads;
        break;
      default:
        aVal = a[state.sortColumn]?.toLowerCase() || "";
        bVal = b[state.sortColumn]?.toLowerCase() || "";
    }

    if (state.sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  state.filteredArticles = filtered;
  renderTable();
  renderPagination();
}

function renderTable() {
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const pageArticles = state.filteredArticles.slice(startIndex, endIndex);

  if (pageArticles.length === 0) {
    articlesTable.style.display = "none";
    emptyState.style.display = "block";
    return;
  }

  articlesTable.style.display = "table";
  emptyState.style.display = "none";

  articlesBody.innerHTML = pageArticles
    .map(
      (article) => `
        <tr>
            <td data-th="Konu Başlığı">${article.topic}</td>
            <td data-th="İşlevsel Başlık">${article.functional}</td>
            <td data-th="Makale Türü">
                <span class="article-type-pill">${article.type}</span>
            </td>
            <td data-th="Yayınlanma Tarihi">${new Date(
              article.date
            ).getFullYear()}</td>
            <td data-th="Alt Kategori">${article.subcategory}</td>
            <td data-th="Etiketler">
                <div class="tags-cell">
                    ${article.tags
                      .map((tag) => `<span class="tag-item">${tag}</span>`)
                      .join("")}
                </div>
            </td>
            <td data-th="Teknik">${article.tech}</td>
            <td data-th="PDF">${renderPdfActions(article)}</td>
        </tr>
    `
    )
    .join("");
}

function renderPagination() {
  const totalPages = Math.ceil(
    state.filteredArticles.length / state.itemsPerPage
  );

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  const currentPage = state.currentPage;
  let paginationHTML = "";

  paginationHTML += `
        <button class="prev-next" ${
          currentPage === 1 ? "disabled" : ""
        } data-page="${currentPage - 1}">
            Önceki
        </button>
    `;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  for (let i = startPage; i <= endPage; i++) {
    paginationHTML += `
            <button class="${
              i === currentPage ? "active" : ""
            }" data-page="${i}">
                ${i}
            </button>
        `;
  }

  paginationHTML += `
        <button class="prev-next" ${
          currentPage === totalPages ? "disabled" : ""
        } data-page="${currentPage + 1}">
            Sonraki
        </button>
    `;

  pagination.innerHTML = paginationHTML;

  pagination.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-page]");
    if (button && !button.disabled) {
      state.currentPage = Number.parseInt(button.dataset.page);
      renderTable();
      renderPagination();
    }
  });
}

function downloadPdf(article) {
  if (article.pdfUrl) {
    const link = document.createElement("a");
    link.href = article.pdfUrl;
    link.download = `${article.topic.replace(/[^a-zA-Z0-9]/g, "-")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function generatePdf(article) {
  const articleIndex = articlesData.findIndex((a) => a.topic === article.topic);
  if (articleIndex !== -1) {
    articlesData[articleIndex].pdfStatus = "generating";
    applyFilters();

    setTimeout(() => {
      articlesData[articleIndex].pdfStatus = "available";
      articlesData[articleIndex].pdfUrl = `pdfs/${article.topic
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase()}.pdf`;
      applyFilters();
    }, 3000);
  }
}

function renderPdfActions(article) {
  switch (article.pdfStatus) {
    case "available":
      return `
        <div class="pdf-actions">
          <button class="pdf-btn download" onclick="downloadPdf(${JSON.stringify(
            article
          ).replace(/"/g, "&quot;")})">
            <i class="fas fa-download"></i>
            PDF İndir
          </button>
        </div>
      `;
    case "generating":
      return `
        <div class="pdf-status generating">
          <i class="fas fa-spinner fa-spin"></i>
          Oluşturuluyor...
        </div>
      `;
    case "unavailable":
      return `
        <div class="pdf-actions">
          <button class="pdf-btn" onclick="generatePdf(${JSON.stringify(
            article
          ).replace(/"/g, "&quot;")})">
            <i class="fas fa-file-pdf"></i>
            PDF Oluştur
          </button>
        </div>
      `;
    default:
      return `
        <div class="pdf-status unavailable">
          <i class="fas fa-times"></i>
          Mevcut değil
        </div>
      `;
  }
}

window.downloadPdf = downloadPdf;
window.generatePdf = generatePdf;

init();
