


const questions = [
  {
    text: "PoW’un temel amacı nedir?",
    options: [
      "Veriyi şifrelemek",
      "Ağda blok üretimini ekonomik maliyete bağlayarak spam/çifte harcamayı zorlaştırmak",
      "Blokları renklendirmek",
      "Kullanıcı arayüzünü hızlandırmak",
    ],
    answer: 1,
    why: "PoW, blok üretimi için hesaplama/enerji maliyeti şartı getirerek güvenlik sağlar.",
  },
  {
    text: "Bitcoin’de geçerli blok hash’i hangi koşulu sağlamalıdır?",
    options: [
      "Hedeften (target) küçük veya eşit olmalı",
      "Hedeften büyük olmalı",
      "Rastgele olmalı",
      "Sabit bir değere eşit olmalı",
    ],
    answer: 0,
    why: "Double SHA-256 hash, zorluk hedefinin altında olursa blok geçerlidir.",
  },
  {
    text: "“Bits” alanı neyi kodlar?",
    options: [
      "Nonce’u",
      "Zincir yüksekliğini",
      "Zorluk hedefinin kompakt gösterimini",
      "Blok boyutunu",
    ],
    answer: 2,
    why: "Bits = sıkıştırılmış hedef (target) değeridir.",
  },
  {
    text: "Zorluk (difficulty) artarsa ne olur?",
    options: [
      "Geçerli blok bulmak kolaylaşır",
      "Geçerli blok bulmak zorlaşır ve beklenen süre uzar",
      "Coinbase artar",
      "Merkle kökü sabitlenir",
    ],
    answer: 1,
    why: "Hedef küçülür; istatistiksel olarak çözüm bulmak zorlaşır.",
  },
  {
    text: "Nonce nedir?",
    options: [
      "İşlem ücreti",
      "Hash arayışında sürekli değiştirilen sayaç alanı",
      "Ağ protokolü",
      "Zincir kimliği",
    ],
    answer: 1,
    why: "Madenci farklı nonce değerleri deneyerek yeni başlık hash’leri üretir.",
  },
  {
    text: "Nonce alanı tükendiğinde (tüm değerler denendiğinde) tipik strateji nedir?",
    options: [
      "Bloku silmek",
      "Coinbase’deki extraNonce/diğer alanları değiştirerek arama alanını genişletmek",
      "Zorluk düşürmek",
      "Önceki bloğu değiştirmek",
    ],
    answer: 1,
    why: "Madenciler coinbase/merkleroot veya zaman/versiyon ile yeni kombinasyonlar dener.",
  },
  {
    text: "Bitcoin’de zorluk ayarlaması ne sıklıkla yapılır?",
    options: [
      "Her blok",
      "Her 2016 blok (~2 hafta hedefi)",
      "Yılda bir",
      "Asla",
    ],
    answer: 1,
    why: "Ortalama blok süresini ~10 dakikada tutmak için 2016 blokta bir ayarlanır.",
  },
  {
    text: "‘En uzun zincir’ kuralının daha doğru ifadesi hangisidir?",
    options: [
      "En çok bloğa sahip zincir",
      "En çok toplam işi (toplam PoW) taşıyan zincir",
      "En eski zincir",
      "En hızlı yayılan zincir",
    ],
    answer: 1,
    why: "Konsensüs ‘en çok birikmiş iş’e (most-work) dayanır.",
  },
  {
    text: "Hash oranı (hashrate) neyi ifade eder?",
    options: [
      "Dakikadaki işlem sayısı",
      "Saniyedeki hash denemesi sayısı",
      "Blok boyutu",
      "Ücret toplamı",
    ],
    answer: 1,
    why: "PoW tahmin hızını (H/s) ölçer.",
  },
  {
    text: "Stale/Yetim (orphan) blok neden oluşur?",
    options: [
      "Blok hatalı olduğu için",
      "Aynı anda iki geçerli blok yayınlanıp ağda farklı dallar oluştuğu için",
      "İşlem ücreti düşük olduğundan",
      "Coinbase yanlış adres olduğundan",
    ],
    answer: 1,
    why: "Yarış durumunda kısa dallardan biri ana zincir dışında kalır.",
  },
  {
    text: "Selfish mining (bencil madencilik) neyi hedefler?",
    options: [
      "Ağın güvenliğini artırmayı",
      "Blokları gizli tutup uygun zamanda açıklayarak gelir payını artırmayı",
      "Ücretleri düşürmeyi",
      "Zorluk ayarlamasını hızlandırmayı",
    ],
    answer: 1,
    why: "Özel dal biriktirip avantajlı anda yayınlamak gelir payını artırabilir.",
  },
  {
    text: "51% saldırısı ile mümkün olan nedir?",
    options: [
      "Geçersiz işlemleri geçerli yapmak",
      "Geçmişe dönük zinciri daha çok iş üreterek yeniden düzenlemek ve onayları tersine çevirmek",
      "Özel anahtarları çalmak",
      "Blok boyutunu değiştirmek",
    ],
    answer: 1,
    why: "Konsensüs kurallarını değiştiremez; ancak daha çok iş üreterek reorg yapabilir.",
  },
  {
    text: "PoW’da enerji tüketiminin güvenlikteki rolü için doğru ifade:",
    options: [
      "Alakasızdır",
      "Saldırganın zinciri yeniden yazması için ciddi maliyet oluşturur",
      "Sadece testnet’te önemlidir",
      "Ağı yavaşlatır ama güvenliği etkilemez",
    ],
    answer: 1,
    why: "Ekonomik maliyet, saldırıyı caydırıcı bir bariyer sağlar.",
  },
  {
    text: "GPU → ASIC evrimi PoW üzerinde ne etki yapmıştır?",
    options: [
      "Hesaplama verimliliğini azaltmıştır",
      "Hash başına maliyeti düşürüp uzmanlaşmış donanımla merkeziyet baskısı oluşturmuştur",
      "Ağı durdurmuştur",
      "Zorluk hesaplamasını kaldırmıştır",
    ],
    answer: 1,
    why: "ASIC’ler daha verimli; ancak giriş bariyerleri artar.",
  },
  {
    text: "Madencilik havuzu (pool) ne sağlar?",
    options: [
      "Gizliliği artırır",
      "Madencilerin hash gücünü birleştirip ödülleri daha öngörülebilir dağıtmak",
      "Zorluk ayarlamasını yapmak",
      "Blok boyutunu artırmak",
    ],
    answer: 1,
    why: "Varyansı azaltır; pay başına ödeme modelleriyle istikrar sunar.",
  },
  {
    text: "Havuzlardaki ‘share’ nedir?",
    options: [
      "Blok başlığı",
      "Havuzun belirlediği daha kolay bir hedefe uygun geçici ispat",
      "Coinbase çıkışı",
      "Mempool filtresi",
    ],
    answer: 1,
    why: "Gerçek blok hedefinden daha gevşek bir hedefle yapılan ara ispatlar ödeme ölçütüdür.",
  },
  {
    text: "PPS ve PPLNS arasındaki fark nedir?",
    options: [
      "Aynıdır",
      "PPS pay başına sabit ödeme; PPLNS son N paya göre blok çıktığında ödeme yapar",
      "PPS sadece solo madencilik içindir",
      "PPLNS ön ödemelidir",
    ],
    answer: 1,
    why: "PPS varyansı madene devreder; PPLNS varyansı madenciye yansıtır.",
  },
  {
    text: "PoW’da blok zamanı neden sabit değildir?",
    options: [
      "Protokol öyle ister",
      "Geçerli hash bulma süreci olasılıksal (geometrik/üstel) dağılıma uyar",
      "NTP hatası",
      "Ücret dalgalanması",
    ],
    answer: 1,
    why: "Arama süresi rastlantısaldır; ortalama sabittir, bireysel ölçümler değişir.",
  },
  {
    text: "“Merged mining” (birleşik madencilik) ne anlama gelir?",
    options: [
      "Aynı donanımla birden çok PoW zincirine aynı anda iş ispatı üretmek",
      "İki madencinin evlenmesi",
      "Zorlukları toplamayı",
      "Blokları birleştirip tek blok yapmak",
    ],
    answer: 0,
    why: "Yan zincir/ana zincir birlikte çıkarılabilir (örn. auxPoW).",
  },
  {
    text: "Memory-hard PoW şemalarının amacı nedir?",
    options: [
      "Daha az bellek kullanmak",
      "Özel donanım avantajını azaltıp genel amaçlı donanımı görece rekabetçi kılmak",
      "Şifrelemeyi kaldırmak",
      "Blok süresini sabitlemek",
    ],
    answer: 1,
    why: "Bellek bant genişliği maliyeti ASIC üstünlüğünü sınırlayabilir.",
  },
  {
    text: "PoW ile ‘yararlı iş’ (useful work) fikri arasındaki temel tartışma nedir?",
    options: [
      "PoW her zaman yararlıdır",
      "Güvenlik için gereken rastgele işin dışarıya faydasının sınırlı olabileceği; yararlı işin doğrulanabilirliği ve adilliğinin zor olması",
      "Yararlı iş doğrulanamaz",
      "Madencilikte iş gerekmez",
    ],
    answer: 1,
    why: "Doğrulanabilirlik/hız ve manipülasyona açık olmama şartları kritik tartışma konusudur.",
  },
  {
    text: "PoW ağında ‘onay sayısı’ artarken çift harcama riski neden azalır?",
    options: [
      "Ücretler düştüğü için",
      "Saldırganın daha derin reorganizasyon için daha çok işi yeniden üretmesi gerektiği için",
      "Nonce büyüdüğü için",
      "Hash fonksiyonu değiştiği için",
    ],
    answer: 1,
    why: "Derinlik arttıkça geçmişi değiştirmek üstel derecede zorlaşır.",
  },
  {
    text: "PoW güvenlik modeli hangi varsayıma dayanır?",
    options: [
      "Hiç kimse madencilik yapmaz",
      "Dürüstlerin toplu işi, saldırganınkinden fazladır (çoğunluk iş gücü dürüstlerde)",
      "Tüm düğümler çevrimdışı",
      "Zaman damgaları sabittir",
    ],
    answer: 1,
    why: "En çok işi üreten tarafın tarihi yazdığı varsayımı altında güvenlik sağlanır.",
  },
];

export default questions;
