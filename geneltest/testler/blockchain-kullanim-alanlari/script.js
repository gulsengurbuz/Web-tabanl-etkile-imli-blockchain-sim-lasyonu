


const questions = [
  
  {
    text: "Aşağıdakilerden hangisi blockchain’in genel değer önerilerinden biridir?",
    options: [
      "Merkezi tek otoriteye bağımlılığı artırma",
      "Değişmez kayıt (immutability) ve bağımsız doğrulanabilirlik",
      "Veriyi gizlemek için özel mülkiyetli kapalı kod",
      "Her zaman en yüksek TPS’i garanti etme",
    ],
    answer: 1,
    why: "Blockchain, değişmez kayıt ve herkesçe doğrulanabilirlik sunar; her zaman en yüksek TPS hedeflemez.",
  },
  {
    text: "Hangi senaryo blockchain’e en uygun eşleşmedir?",
    options: [
      "Tek kurumun tek veri tabanı ile tuttuğu iç rapor",
      "Birden fazla bağımsız tarafın ortak gerçeklik (shared truth) tutması gereken süreç",
      "Sadece hızlı bellek içi hesaplama",
      "Tek kullanıcılı not uygulaması",
    ],
    answer: 1,
    why: "Çok taraflı güven problemi olan yerlerde blockchain faydalıdır.",
  },
  {
    text: "Kullanım alanı–fayda eşleştirmesinde doğru olan hangisi?",
    options: [
      "Tedarik zinciri → izlenebilirlik ve denetim izi",
      "Oyun → daha az sahiplik",
      "Oylama → şeffaflığı azaltma",
      "Sigorta → hasar otomasyonunu zorlaştırma",
    ],
    answer: 0,
    why: "Blockchain; izlenebilirlik, denetlenebilirlik ve süreç otomasyonu getirir.",
  },

  
  {
    text: "DeFi’nin temel katkılarından biri nedir?",
    options: [
      "İzinli tek kurum erişimi",
      "Açık, programlanabilir finansal primitive’ler (AMM, lending, derivatifler)",
      "Her işlem için noter zorunluluğu",
      "Sadece kapalı API",
    ],
    answer: 1,
    why: "DeFi, akıllı sözleşmelerle açık finans modülleri kurar.",
  },
  {
    text: "Stabil coinler hangi kullanımda özellikle faydalıdır?",
    options: [
      "Yüksek oynaklık isteyen tasarruflarda",
      "Sınır ötesi ödemeler ve DeFi’de değer birimi/yerleşim aracı olarak",
      "Sadece NFT metadata depolamada",
      "Veri sıkıştırmada",
    ],
    answer: 1,
    why: "Düşük volatilite ve küresel transfer kolaylığı sağlar.",
  },
  {
    text: "Merkeziyetsiz borsalarda (DEX) fiyat keşfi çoğunlukla nasıl yapılır?",
    options: [
      "Order book her zaman zorunlu",
      "AMM’ler ve likidite havuzları ile",
      "Sadece OTC",
      "Sabit kur",
    ],
    answer: 1,
    why: "Birçok DEX, havuz tabanlı AMM kullanır.",
  },

  
  {
    text: "Sınır ötesi havalelerde blockchain’in avantajı nedir?",
    options: [
      "Daha çok aracı, daha yavaş süreç",
      "24/7 mutabakat ve daha düşük aracı maliyetleri",
      "Sadece hafta içi çalışır",
      "Yalnızca büyük kurumsal müşteriler için",
    ],
    answer: 1,
    why: "Zincir üstü yerleşim, zaman bölgesi/mesai kısıtlarını aşar.",
  },
  {
    text: "Mikro ödemeler hangi kombinasyonla mümkün hale gelir?",
    options: [
      "Yüksek sabit ücretler",
      "Katman-2 kanallar/rollup’lar ve düşük ücretli ağlar",
      "Banka çekleri",
      "PDF faturalama",
    ],
    answer: 1,
    why: "L2 ve düşük ücretli zincirler mikro ödemeleri ekonomik kılar.",
  },

  
  {
    text: "Tedarik zincirinde blockchain kullanmanın ana kazanımı nedir?",
    options: [
      "Tamamen kapalı veri",
      "Uçtan uca izlenebilirlik, parti/lot geçmişi ve sahtecilik tespiti",
      "Yalnızca depolama ucuzluğu",
      "Sadece tek şirket içi kullanım",
    ],
    answer: 1,
    why: "Değişmez kayıt ve çok taraflı görünürlük sağlar.",
  },
  {
    text: "Fiziksel ürün–zincir bağlantısında tipik zorluk:",
    options: [
      "Dijital–fiziksel eşleme (oracle) ve etiket sahteciliği",
      "Hash hesaplamak",
      "Cüzdan üretmek",
      "Blok süresi",
    ],
    answer: 0,
    why: "Gerçek dünyayı güvenli şekilde dijitale bağlamak zordur.",
  },

  
  {
    text: "Self-Sovereign Identity (SSI) neyi hedefler?",
    options: [
      "Kimliği tek merkezde toplamak",
      "Kullanıcının kimlik verileri ve yetkilerini cüzdanında yönetmesi (DID/VC)",
      "Anonimliği yasaklamak",
      "Sadece e-posta ile giriş",
    ],
    answer: 1,
    why: "SSI, dağıtık kimlik (DID) ve doğrulanabilir kimlik bilgileri (VC) ile çalışır.",
  },
  {
    text: "DID/VC modelinde bir işverenin referansı nasıl doğrulanır?",
    options: [
      "E-posta ile",
      "Verifiable Credential imzasının doğrulanması ve issuer DID’inin kontrolüyle",
      "Telefonla arayarak",
      "PDF’e bakarak",
    ],
    answer: 1,
    why: "Kriptografik imza ve zincir üstü/defterde kayıtlı DID’ler kullanılır.",
  },

  
  {
    text: "Blockchain tabanlı oylamada hangi fayda öne çıkar?",
    options: [
      "Gizli kod ve kapalı sayım",
      "Şeffaf/denetlenebilir kayıt ve gerektiğinde kriptografik gizlilik (ZK) imkânı",
      "Sadece kağıt çıktı",
      "Oyların kalıcı silinmesi",
    ],
    answer: 1,
    why: "Denetlenebilirlik + gizliliği birlikte sağlayacak protokol tasarımları mümkündür.",
  },
  {
    text: "DAO’larda token tabanlı oylamanın zorluğu hangisidir?",
    options: [
      "Katılım ölçülemez",
      "Sybil direnci ve oy yoğunlaşması (whale etkisi)",
      "Zaman damgası yok",
      "Sözleşmeler değişmez",
    ],
    answer: 1,
    why: "Yetki yoğunlaşması ve düşük katılım, yönetim kalitesini etkiler.",
  },

  
  {
    text: "Parametrik sigortada blockchain ne sağlar?",
    options: [
      "Manuel hasar inceleme",
      "Oracle verisine bağlı otomatik tazminat koşulları ve şeffaf sözleşme",
      "Daha fazla evrak",
      "Piyango",
    ],
    answer: 1,
    why: "Koşullar gerçekleştiğinde otomatik ödeme yapılabilir.",
  },
  {
    text: "Sağlık verisi paylaşımında temel gereklilik nedir?",
    options: [
      "Sınırsız herkese açık paylaşım",
      "İzinli erişim, denetlenebilir iz ve gizlilik (şifreleme/ZK/kanallar)",
      "Sadece e-posta ile gönderim",
      "Gizlilik olmadan hız",
    ],
    answer: 1,
    why: "Kişisel veriler için yasal ve etik sınırlamalar vardır.",
  },

  
  {
    text: "Telif yönetiminde blockchain’in katkısı:",
    options: [
      "Hak sahiplerini belirsiz kılmak",
      "Hak sahipliği/gelir paylaşımı kurallarını değişmez kaydetmek ve ödemeleri otomatikleştirmek",
      "İçeriği yok etmek",
      "Sadece PDF arşivlemek",
    ],
    answer: 1,
    why: "Şeffaf kurallar ve otomatik ödeme akışları mümkündür.",
  },
  {
    text: "Oyunlarda NFT’nin pratik faydasına örnek:",
    options: [
      "Kopyalanamaz dosya",
      "Zincir üstü sahiplik, ikincil piyasa ve oyunlar arası birlikte çalışabilirlik potansiyeli",
      "Daha düşük gecikme",
      "Hile engelleme",
    ],
    answer: 1,
    why: "Sahiplik kullanıcıya geçer; varlıklar taşınabilir hale gelir.",
  },

  
  {
    text: "Kamu kayıtlarında (tapular vb.) blockchain kullanmanın faydası:",
    options: [
      "Şeffaf olmayan süreç",
      "Değişmez kayıt ve zaman damgalı işlem geçmişiyle ihtilaf çözümünü kolaylaştırma",
      "Sadece hız",
      "Kayıtları gizleme",
    ],
    answer: 1,
    why: "Tapu, sicil gibi kayıtlarda bütünlük ve izlenebilirlik önemli kazanımdır.",
  },
  {
    text: "e-Noter/e-İmza süreçlerinde blockchain en çok hangi rolde kullanılır?",
    options: [
      "Metni şifrelemek",
      "Zaman damgası ve içerik bütünlüğü kanıtı üretmek (anchor/merkle)",
      "KDV hesaplamak",
      "Belgeyi silmek",
    ],
    answer: 1,
    why: "Dış paydaşlarca doğrulanabilir kanıt üretimi sağlar.",
  },

  
  {
    text: "İçeriği zincir dışında tutup hash’ini zincire yazmanın gerekçesi nedir?",
    options: [
      "Gizlilik ve maliyet; büyük veriyi dışarıda saklarken bütünlüğü zincirde kanıtlamak",
      "Daha az doğrulanabilirlik",
      "Performansı her zaman düşürmek",
      "Hash gereksizdir",
    ],
    answer: 0,
    why: "Off-chain depolama + on-chain kanıt, pratik ve ölçeklenebilir yaklaşımdır.",
  },
  {
    text: "IPFS/benzeri dağıtık depolama blockchain kullanımında nasıl konumlanır?",
    options: [
      "Blok zincirinin yerine geçer",
      "İçerik adresli depolama sağlar; zincirde hash/işaretleme ile bütünlük korunur",
      "Sadece CDN yedeği",
      "Sadece e-posta eki",
    ],
    answer: 1,
    why: "Zincir veri işaretçisi, IPFS içerik barındırmasıyla birlikte çalışır.",
  },

  
  {
    text: "Bir kullanım alanında blockchain tercih kararında ilk soru ne olmalı?",
    options: [
      "Hangi logo daha güzel?",
      "Çok taraflı güven problemi ve değişmez/denetlenebilir kayıt ihtiyacı var mı?",
      "Zincir modası geçti mi?",
      "Kaç renk tema var?",
    ],
    answer: 1,
    why: "Problem–çözüm uyumu sağlanmadan teknoloji seçilmemelidir.",
  },
  {
    text: "Regülasyon ve KYC/AML gerektiren bir alanda makul mimari hangisine yakındır?",
    options: [
      "Tamamen izinsiz, kimliksiz her şey açık",
      "İzinli katman + seçmeli ifşa + public anchor kombinasyonu",
      "Sadece e-tablo",
      "Sadece PDF arşivi",
    ],
    answer: 1,
    why: "Gizlilik/uyum gereksinimleri ile doğrulanabilirliği dengeleyen hibrit tasarım uygundur.",
  },
];

export default questions;
