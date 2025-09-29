const questions = [
  {
    text: "Açık (public) blockchain’in temel özelliği hangisidir?",
    options: [
      "Sadece davetle katılım",
      "İşlem verileri gizli defterde tutulur",
      "Herkese açık okuma ve katılım",
      "Tek bir kurum tarafından çalıştırılır",
    ],
    answer: 2,
    why: "Public zincirlerde düğüm çalıştırma/okuma/katılım herkese açıktır.",
  },
  {
    text: "Public zincirlerin en yaygın avantajı nedir?",
    options: [
      "Tam gizlilik",
      "Yüksek TPS her koşulda",
      "Şeffaflık ve sansüre direnç",
      "Tek hata noktasına bağımlılık",
    ],
    answer: 2,
    why: "Açıklık ve dağıtıklık şeffaflığı ve sansüre dayanımı artırır.",
  },
  {
    text: "Public blockchain’de kim doğrulayıcı (validator/miner) olabilir?",
    options: [
      "Sadece düzenleyici kurum",
      "Sadece ağın kurucusu",
      "Topluluk oyu ile seçilen tek kişi",
      "Kuralları sağlayan herkes",
    ],
    answer: 3,
    why: "İzin gerekmeksizin, protokol şartlarını karşılayan herkes doğrulayıcı olabilir.",
  },
  {
    text: "Public zincirlerde gizlilikle ilgili tipik zorluk hangisidir?",
    options: [
      "Verilerin tamamen kapalı olması",
      "İşlemlerin herkese açık olması",
      "Hash fonksiyonlarının gizli olması",
      "Düğümlerin özel ağda olması",
    ],
    answer: 1,
    why: "Defter herkese açık olduğundan gizlilik çözümleri ayrıca tasarlanır (zk, mixer, vb.).",
  },
  {
    text: "Public blockchain’lerde Sybil saldırılarına karşı direnç genelde nasıl sağlanır?",
    options: [
      "Rastgele IP engelleme ile",
      "Merkezi kara liste ile",
      "Ekonomik maliyet (PoW/PoS) ile",
      "Sadece şifre karmaşıklığı ile",
    ],
    answer: 2,
    why: "PoW/PoS gibi mekanizmalar sahte kimlikleri ekonomik olarak maliyetli kılar.",
  },
  {
    text: "Aşağıdakilerden hangisi public zincirlerde sık görülen bir dezavantajdır?",
    options: [
      "Düşük açıklık",
      "Yetersiz şeffaflık",
      "Ölçeklenebilirlik/TPS kısıtları",
      "Merkezi yönetişim zorunluluğu",
    ],
    answer: 2,
    why: "İzinli ağlara kıyasla TPS sınırlı olabilir; L2 çözümleriyle iyileştirilir.",
  },
  {
    text: "Public blockchain’de nihailik (finality) sıklıkla nasıldır?",
    options: [
      "Her zaman anlık ve deterministik",
      "Her zaman saatler sürer",
      "Probabilistik veya protokole göre koşullu",
      "Yalnızca borsalara özeldir",
    ],
    answer: 2,
    why: "PoW’da olasılıksal; bazı PoS protokollerinde hızlı/deterministik finality bulunur.",
  },
  {
    text: "Aşağıdakilerden hangisi public blockchain örneğidir?",
    options: [
      "Kurumsal intranet defteri",
      "Bitcoin/Ethereum ana ağları",
      "Özel konsorsiyum ağı",
      "Yerel SQL sunucusu",
    ],
    answer: 1,
    why: "Bitcoin ve Ethereum, herkese açık katılıma sahip public ağlardır.",
  },
  {
    text: "Public zincirlerde işlem ücretleri (fee/gas) neden vardır?",
    options: [
      "Gizliliği sağlamak için",
      "Ağın ekonomik spam/saldırılara karşı korunması ve kaynak tahsisi için",
      "Sadece madenciyi zengin etmek için",
      "Hash fonksiyonunu hızlandırmak için",
    ],
    answer: 1,
    why: "Ücretler kaynak kullanımını fiyatlar, spam’i zorlaştırır ve üreticilere teşvik sağlar.",
  },
  {
    text: "Public blockchain’de yönetişim (governance) için doğru ifade hangisi?",
    options: [
      "Her zaman tek merkez karar verir",
      "Sadece zincir dışı yapılabilir",
      "Topluluk temelli, zincir içi/dışı mekanizmalar bir arada olabilir",
      "Sadece borsalar karar verir",
    ],
    answer: 2,
    why: "Geliştiriciler, doğrulayıcılar ve kullanıcılar hem zincir içi hem zincir dışı süreçlerle karar verir.",
  },
  {
    text: "Aşağıdakilerden hangisi public zincirlerde ölçeklenmeyi artırmak için tipik bir yaklaşımdır?",
    options: [
      "TCP kapatma",
      "L2 çözümleri (rollup/kanal) ve sharding",
      "İşlem verilerini saklamamak",
      "Sadece node sayısını azaltmak",
    ],
    answer: 1,
    why: "Rollup, payment channel, sharding gibi tekniklerle throughput yükseltilir.",
  },
  {
    text: "Public blockchain’de kimlik modeli genellikle nasıldır?",
    options: [
      "Gerçek isim zorunlu",
      "Tam anonim zorunlu",
      "Takma ad/pseudonymous adresler",
      "Sadece kurumsal kimlik",
    ],
    answer: 2,
    why: "Adresler çoğunlukla takma ad niteliğindedir; zincir analiziyle ilişkilendirilebilir.",
  },
  {
    text: "Public zincirlerde çatallaşma (fork) neyi ifade eder?",
    options: [
      "Veri yedekleme",
      "Kural/versiyon ayrımıyla zincirin dallanması",
      "Cüzdan güncellemesi",
      "IP değiştirme",
    ],
    answer: 1,
    why: "Yazılım/kurallar farklılaştığında kısa/uzun vadeli dallanmalar ortaya çıkabilir.",
  },
  {
    text: "Public blockchain’de bir düğüm türü eşleştirmesi:",
    options: [
      "Tam düğüm: tüm blokları doğrular; SPV: başlık + kanıtlarla yetinir",
      "Tam düğüm: sadece cüzdan arayüzü; SPV: her bloğu arşivler",
      "Her ikisi de sadece explorer’dır",
      "SPV düğümü yoktur",
    ],
    answer: 0,
    why: "Tam düğüm eksiksiz doğrular; SPV kısmi (başlık + Merkle kanıtı) doğrulama yapar.",
  },
  {
    text: "Public zincirlerin regülasyon bağlamındaki genel durumu için en doğru ifade:",
    options: [
      "Her ülkede tamamen yasaktır",
      "Her yerde tamamen aynıdır",
      "Ülke/kurum bazında değişen çerçevelere tabidir",
      "Sadece maden kanunları geçerlidir",
    ],
    answer: 2,
    why: "Düzenlemeler ülke ve kullanım senaryosuna göre değişir.",
  },
];

export default questions;
