


const questions = [
  
  {
    text: "Blokzincirde ‘fork’ (çatallaşma) en genel anlamıyla neyi ifade eder?",
    options: [
      "Ağın internete bağlanması",
      "Zincirin ya kurallarda ya da üretilen bloklarda iki farklı dala ayrılması",
      "Yeni cüzdan sürümü",
      "Zincirin tamamen silinmesi",
    ],
    answer: 1,
    why: "Fork; geçici reorg’lardan kalıcı kural değişimlerine kadar dallanma durumlarını kapsar.",
  },
  {
    text: "Soft fork ile hard fork arasındaki temel fark nedir?",
    options: [
      "Soft fork geriye uyumlu kural daraltması; hard fork geriye uyumsuz kural genişlemesi",
      "Soft fork daha çok düğüm ister, hard fork istemez",
      "Hard fork her zaman gizlidir",
      "Soft fork için oylama gerekmez",
    ],
    answer: 0,
    why: "Soft fork’ta eski düğümler yeni blokları genelde geçerli sayar; hard fork’ta sayamaz.",
  },
  {
    text: "Geçici olarak aynı yükseklikte iki blok üretildiğinde ne oluşur?",
    options: [
      "Kalıcı hard fork",
      "Geçici dal (temporary fork) / kısa süreli ayrışma",
      "Token yakımı",
      "Blok boyutu artar",
    ],
    answer: 1,
    why: "Ağ yayılım gecikmeleri kısa süreli iki dal üretir; fork-choice ile biri kazanır.",
  },
  {
    text: "‘Reorg’ (yeniden düzenleme) nedir?",
    options: [
      "Kural değişikliği",
      "Daha çok iş/oy alan dalın kazanmasıyla son bir-iki bloğun farklı bir daldaki bloklarla yer değiştirmesi",
      "Token ihracı",
      "Cüzdan adresi üretimi",
    ],
    answer: 1,
    why: "Reorg, kurallar aynı kalırken zincir kafasının değişmesidir; soft/hard fork değildir.",
  },

  
  {
    text: "Soft fork için doğru ifade hangisi?",
    options: [
      "Eski düğümler yeni bloğu her zaman reddeder",
      "Kurallar daraltılır; yükseltmeyen düğümler çoğunluk yeni kuralları uyguladıkça uyumlu kalabilir",
      "Geriye uyum yoktur",
      "Yeni imza şeması zorunlu kılınır ve eski bloklar geçersiz olur",
    ],
    answer: 1,
    why: "Geriye uyumluluk, soft fork’un ayırt edici özelliğidir.",
  },
  {
    text: "Aşağıdakilerden hangisi soft fork örneğidir?",
    options: [
      "Blok boyutunu artırmak (eski limitten büyük)",
      "Belirli script op’larını daha kısıtlı hale getirmek",
      "Yeni bir adres formatına geçmek ve eskileri yasaklamak",
      "Blok süresini iki katına çıkarmak",
    ],
    answer: 1,
    why: "Kuralı daraltmak (kısıtlama) soft fork ile yapılabilir.",
  },
  {
    text: "Kullanıcı etkinli (UASF) soft fork’un özelliği nedir?",
    options: [
      "Sadece madenciler oylar",
      "Kullanıcılar/düğümler belirli tarihte kuralı dayatır; madenciler uymak zorunda kalır",
      "Sadece borsalar karar verir",
      "Gizli aktivasyon",
    ],
    answer: 1,
    why: "UASF, topluluk düğümlerinin kural dayatmasıyla aktivasyonu hedefler.",
  },
  {
    text: "Sürüm bitleri (version bits) / sinyalleme mekanizmasının amacı nedir?",
    options: [
      "Renk teması ayarlamak",
      "Madencilerin belirli bir soft fork’a desteğini blok başlığında ilan etmesi",
      "Zorluk ayarlamak",
      "Ücret hesaplamak",
    ],
    answer: 1,
    why: "Sinyal, aktivasyon eşiği oluştuğunda kuralı etkinleştirmeye yarar.",
  },

  
  {
    text: "Hard fork sonucunda ağ uzlaşamazsa pratikte ne olur?",
    options: [
      "Tek zincir kalır",
      "İki kalıcı zincir oluşabilir ve her biri kendi kurallarına göre ilerler",
      "Tüm işlem geçmişi silinir",
      "Madencilik durur",
    ],
    answer: 1,
    why: "Uyumsuz kurallar kalıcı zincir ayrışmasına yol açabilir.",
  },
  {
    text: "Hard fork gerektirecek değişime örnek hangisidir?",
    options: [
      "Blok boyutu üst sınırını artırmak",
      "Script’i daha kısıtlı hale getirmek",
      "Opcodes’i yasaklamak",
      "Mempool politikasını değiştirmek",
    ],
    answer: 0,
    why: "Eski düğümler büyük bloğu geçerli saymayacağı için geriye uyumsuzdur.",
  },
  {
    text: "Zincir bölünmesi (chain split) sonrası ‘replay attack’ riski neyle azaltılır?",
    options: [
      "Nonce’u artırmak",
      "Zincir kimliği (chain ID) farklılaştırma / replay koruması",
      "Ücreti artırmak",
      "Sadece DNS değiştirmek",
    ],
    answer: 1,
    why: "Farklı chainID veya imza alanı, bir zincirdeki işlemin diğerinde geçerli olmasını engeller.",
  },
  {
    text: "Bölünme sonrasında kullanıcı bakiyeleri için doğru ifade hangisi?",
    options: [
      "Her iki zincirde de aynı özel anahtar aynı UTXO’ları/hesapları kontrol edebilir",
      "Bakiyeler sıfırlanır",
      "Adresler değişir",
      "Sadece borsalar görebilir",
    ],
    answer: 0,
    why: "Anahtarlar kopyalanmaz ama aynı geçmişten ayrılan iki zincirde başlangıç bakiyesi eşittir.",
  },

  
  {
    text: "İçerik açısından tartışmalı (contentious) fork’un riski nedir?",
    options: [
      "Hiç risk yoktur",
      "Ekonominin ikiye bölünmesi, uygulama/borsa uyumu ve kullanıcı karmaşası",
      "Gizliliğin artması",
      "Reorg ihtimalinin azalması",
    ],
    answer: 1,
    why: "Uzlaşma olmazsa likidite ve ekosistem bölünebilir.",
  },
  {
    text: "Fork aktivasyonu sırasında borsaların iyi pratiği nedir?",
    options: [
      "Hiç duyuru yapmamak",
      "Para yatırma/çekmeyi geçici durdurup netleşince yeniden açmak",
      "Zorla tek zinciri desteklemek",
      "Rastgele işlem sıralamak",
    ],
    answer: 1,
    why: "Replay ve belirsizlik riskine karşı koruma sağlar.",
  },
  {
    text: "İstemci çeşitliliği (client diversity) fork süreçlerinde neden önemlidir?",
    options: [
      "Tema farklılığı için",
      "Tek bir uygulama hatasının tüm ağı bozmasını önlemek ve kural yorum farklarını yakalamak için",
      "Hash gücünü artırmak için",
      "Gas’i düşürmek için",
    ],
    answer: 1,
    why: "Çoklu bağımsız istemci, tek hata noktasını azaltır.",
  },
  {
    text: "‘Flag day’ aktivasyonu nedir?",
    options: [
      "Rastgele gün",
      "Belirli tarihte/ yükseklikte yeni kuralların zorunlu devreye alınması",
      "Olağanüstü hal",
      "Mempool boşaltma",
    ],
    answer: 1,
    why: "Takvim/height temelli net bir kesim noktasıdır.",
  },

  
  {
    text: "Soft fork’tan sonra yükseltmeyen düğümler için olası tehlike nedir?",
    options: [
      "Her şeyi daha iyi görür",
      "Yeni kurallara uymayan blokları fark etmeyebilir (false positive), uygulama katmanı zarar görebilir",
      "Daha hızlı olur",
      "Ücretleri sıfırlar",
    ],
    answer: 1,
    why: "Eski düğüm yeni kısıtları bilmez; geçerli saymaması gereken işlemleri göremeyebilir.",
  },
  {
    text: "Fork sonrası cüzdan güvenliği için öneri hangisi değildir?",
    options: [
      "Özel anahtarları sızdırmayın",
      "Her iki zincirde de aynı tohumla imzalama yapmadan önce replay korumasını doğrulayın",
      "Güvenilir istemci/kitaplık kullanın",
      "Her zincirde aynı işlemi bilinçsizce yayınlayın",
    ],
    answer: 3,
    why: "Replay koruması yoksa bir zincirdeki işlem diğerinde de geçerli olabilir.",
  },
  {
    text: "Protokol yükseltmelerinde ‘testnet/devnet’ kullanmanın faydası nedir?",
    options: [
      "Gas’i düşürür",
      "Yeni kuralları güvenle deneyip istemciler arası uyumu doğrulamak",
      "Token fiyatını artırmak",
      "Reorg’u yasaklamak",
    ],
    answer: 1,
    why: "Canlı ağa risk vermeden hataları yakalamayı sağlar.",
  },
  {
    text: "Fork-choice kuralı (örn. en çok iş/oy) neyi belirler?",
    options: [
      "Mempool büyüklüğünü",
      "Hangi dalın ‘kanonik’ zincir olacağını",
      "Cüzdan arayüzünü",
      "Chain ID’yi",
    ],
    answer: 1,
    why: "Kafaya (head) hangi dalın seçileceğini tanımlar.",
  },
  {
    text: "Zincir bölünmesi sırasında ‘çekirdek kurallar’ ile ‘mempool politikası’ farkı niçin önemlidir?",
    options: [
      "Önemsizdir",
      "Konsensüs kuralları geçerlilik; mempool politikası düğüm kabul tercihleridir—karıştırmak hataya yol açar",
      "Her ikisi de sadece UI ayarıdır",
      "Sadece borsalar için geçerlidir",
    ],
    answer: 1,
    why: "Konsensüs ihlali blok reddi demektir; politika ihlali sadece mempool’a girişe etki eder.",
  },
  {
    text: "Aşağıdakilerden hangisi tarihsel bir hard fork örneğine yakındır?",
    options: [
      "SegWit aktivasyonu",
      "DAO olayı sonrasında Ethereum/ETC ayrımı",
      "RBF’in mempoolda açılması",
      "BIP152 Compact Blocks",
    ],
    answer: 1,
    why: "DAO sonrasında kurallar geriye uyumsuz değişti ve iki zincir oluştu.",
  },
  {
    text: "‘Emergency fork/parametre ayarı’ hangi durumda düşünülebilir?",
    options: [
      "Tema değişince",
      "Ağ güvenliğini/işlevini ciddi etkileyen hata veya saldırıda hızlı müdahale gerektiğinde",
      "Piyasa düşüşünde",
      "Explorer yavaşlayınca",
    ],
    answer: 1,
    why: "Acil durumlarda koordineli ve ölçülü parametre/fork müdahalesi gerekebilir.",
  },
  {
    text: "Bir soft fork’un başarısında en kritik unsur hangisine daha yakındır?",
    options: [
      "Tek cüzdanın güncellenmesi",
      "Geniş düğüm/işletmeci/borsa/madenci uyumu ve net iletişim",
      "Sadece bir blog yazısı",
      "UI tema seçimi",
    ],
    answer: 1,
    why: "Ekosistem uyumu ve şeffaf süreçler çatışmayı ve bölünmeyi azaltır.",
  },
];

export default questions;
