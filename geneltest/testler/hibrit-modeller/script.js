


const questions = [
  {
    text: "Hibrit (hybrid) blockchain modeli en iyi nasıl tanımlanır?",
    options: [
      "Sadece public ağların kullanımı",
      "Sadece private/permissioned ağların kullanımı",
      "Public ve permissioned yaklaşımların belirli amaçlarla birlikte kullanılması",
      "Blok zinciri olmayan bir veritabanı",
    ],
    answer: 2,
    why: "Hibrit mimari, açık şeffaflık ile kurumsal gizlilik/izinliliği harmanlar.",
  },
  {
    text: "Aşağıdakilerden hangisi hibrit mimarilerin başlıca motivasyonudur?",
    options: [
      "Şeffaflığı tamamen kaldırmak",
      "Regülasyon ve gizlilik gereklerini karşılarken kamuya doğrulanabilir kanıt üretmek",
      "Tek kurum kontrolünü artırmak",
      "Kriptografiyi kaldırmak",
    ],
    answer: 1,
    why: "Kurum içi veri gizliyken kök kanıt/köprü üzerinden kamusal doğrulanabilirlik sağlanabilir.",
  },
  {
    text: "‘Anchoring’ (çapalama) hibrit senaryoda neyi ifade eder?",
    options: [
      "Veriyi e-postayla göndermek",
      "Private zincirdeki bir veri topluluğunun Merkle kökünü public bir zincire yazmak",
      "Public zinciri kapatmak",
      "Gas ücretini sıfırlamak",
    ],
    answer: 1,
    why: "Kök hash public deftere yazılarak dışarıdan bütünlük ve zaman kanıtı elde edilir.",
  },
  {
    text: "Hibrit mimaride veri yerleşimi tipik olarak nasıl yapılır?",
    options: [
      "Tüm veriyi public zincire yazmak",
      "Tüm veriyi zincir dışı tutmak",
      "Hassas veriyi permissioned katmanda, kanıt/özetleri public katmanda tutmak",
      "Yalnızca CDN’de saklamak",
    ],
    answer: 2,
    why: "Gizlilik ve maliyet için veri private’ta; doğrulanabilirlik için özetler public’te tutulur.",
  },
  {
    text: "Kurumlar arası konsorsiyum + public köprü modelinde başlıca risk hangisidir?",
    options: [
      "UI teması",
      "Köprü/akıllı sözleşme hataları ve güven varsayımlarının uyumsuzluğu",
      "Hash fonksiyonunun olmaması",
      "Blok süresinin sabitlenmesi",
    ],
    answer: 1,
    why: "Zincirler arası köprüler ve kimlik eşlemesi en zayıf halka olabilir.",
  },
  {
    text: "Rollup + L1 kamusal zincir kombinasyonu hangi kategoriye daha çok yakındır?",
    options: [
      "Tamamen private",
      "Hibrit/L2 mimari (veri kullanılabilirliği L1, yürütme L2)",
      "Sadece veri gölü",
      "PoW madencilik kümesi",
    ],
    answer: 1,
    why: "Rollup’lar yürütmeyi L2’de yapar, güveni L1’in konsensüsüne dayar.",
  },
  {
    text: "Sidechain ile rollup arasında hibrit senaryoda kritik fark nedir?",
    options: [
      "Hiç fark yoktur",
      "Rollup güvenliğini L1 kanıtlarıyla taşır; sidechain genelde ayrı konsensüse güvenir",
      "Sidechain her zaman daha güvenlidir",
      "Rollup her zaman izinsiz değildir",
    ],
    answer: 1,
    why: "Rollup’lar kanıt/DA ile L1’e bağlanır; sidechain bağımsız risk modeli barındırır.",
  },
  {
    text: "Hibrit modelde ‘selective disclosure’ (seçimli ifşa) nasıl sağlanır?",
    options: [
      "Tüm veriyi açık yazmak",
      "ZK-kanıtlar/taahhütler ve erişim politikalarıyla yalnız gerekli bilgiyi ispatlamak",
      "Yalnızca parola ile",
      "Veriyi silmek",
    ],
    answer: 1,
    why: "Sıfır bilgi kanıtları ve izinleme ile asgari bilgi ilkesi uygulanır.",
  },
  {
    text: "Kurumsal süreçte hibrit mimarinin tipik akış sırası hangisine daha yakındır?",
    options: [
      "Public’te yürütme → Private’ta özet",
      "Private’ta yürütme/doğrulama → Public’e kök/kanıt çapalama",
      "Sadece e-posta onayı",
      "Önce CDN sonra FTP",
    ],
    answer: 1,
    why: "İş mantığı ve gizli veriler izinli katmanda kalır; kanıtı public’e taşınır.",
  },
  {
    text: "Hibrit mimarilerde kimlik/doğrulama tipik olarak nasıl yürür?",
    options: [
      "Tam anonimlik zorunlu",
      "Private tarafta PKI/kurumsal IAM; public tarafta adres/anahtar tabanlı kimlik",
      "Sadece kullanıcı adı/şifre",
      "IP’ye göre",
    ],
    answer: 1,
    why: "İzinli ağ kurumsal kimlik ister; public ağ takma adlı anahtarlarla çalışır.",
  },
  {
    text: "Data availability (DA) hibrit tasarımda neden kritiktir?",
    options: [
      "Tema için",
      "Public’e yazılan kanıtın doğrulanabilmesi için ilgili veriye/özetlere erişim gerekebilir",
      "Gas’i düşürmek için",
      "DNS için",
    ],
    answer: 1,
    why: "Kanıtın anlam taşıması, gerekli veri/özetlerin doğrulanabilir erişimine bağlıdır.",
  },
  {
    text: "Hibrit ortamda işlem gizliliği + kamusal doğrulanabilirlik kombinasyonu hangi teknikle kolaylaşır?",
    options: [
      "Açık metin saklama",
      "Merkle ağaçları + ZK-kanıtlar + timestamp/anchor",
      "Sadece gzip",
      "Sadece NAT",
    ],
    answer: 1,
    why: "Merkle kök, ZK ve zaman damgası birlikte hem gizlilik hem kanıt sağlar.",
  },
  {
    text: "Hibrit mimaride ‘governance’ için gerçekçi yaklaşım hangisi?",
    options: [
      "Tek taraflı karar",
      "Konsorsiyum sözleşmeleri, onay politikaları ve public protokol değişikliklerini izleyen süreçler",
      "Sadece anket",
      "Rastgele seçim",
    ],
    answer: 1,
    why: "Çok paydaşlı kurumsal yönetişim + public ekosistem süreçleri birlikte ele alınır.",
  },
  {
    text: "Maliyet tarafında hibrit modelin avantajı hangi senaryoda belirgindir?",
    options: [
      "Tüm işlemler yüksek gas ile L1’de",
      "Hacimli veri/iş mantığı permissioned’ta; L1’de sadece kök/özet yayınlamak",
      "Yalnızca e-posta",
      "L1’e her dakika tam veri yazmak",
    ],
    answer: 1,
    why: "Blok alanı tüketimi minimize edilerek toplam maliyet düşürülebilir.",
  },
  {
    text: "Hibrit sistemlerde denetim (audit) gereksinimi nasıl karşılanır?",
    options: [
      "Log tutmamak",
      "Private log + public anchor + gerektiğinde seçmeli ifşa ile",
      "Sadece PDF üretmek",
      "Sadece sözlü beyan",
    ],
    answer: 1,
    why: "Denetçilere gerektiği kadar veri ifşa edilir; bütünlük public kanıtla güçlenir.",
  },
  {
    text: "Bir hibrit çözümde ‘oracle’/entegrasyon noktaları neden hassastır?",
    options: [
      "Basit oldukları için",
      "Zincir dışı sistemlerden gelen verinin güven varsayımı ve bütünlüğü çözümü etkiler",
      "Gizlilik gerektirmediği için",
      "Hash’e ihtiyaç yoktur",
    ],
    answer: 1,
    why: "Gerçek dünya verisi güven zincirinin önemli halkasıdır.",
  },
  {
    text: "Hibrit mimaride ‘interoperability’yi artıran yaklaşım hangisi değildir?",
    options: [
      "Standart mesaj/kanıt formatları (ABI/Protobuf, SNARK proof formatları)",
      "Işık istemci (light client) tabanlı köprüler",
      "Çoklu imzalı çok taraflı köprüler",
      "Rastgele, kapalı format ve tek taraflı API",
    ],
    answer: 3,
    why: "Kapalı formatlar birlikte çalışabilirliği ve doğrulanabilirliği zayıflatır.",
  },
  {
    text: "Hibrit modelde ‘finality’ ile ilgili doğru ifade hangisi?",
    options: [
      "Her katmanda aynı anda ve aynı kuralla oluşur",
      "Permissioned taraf deterministik finality sağlayabilir; public tarafta olasılıksal/ek kurallara bağlı olabilir",
      "Finality hiç oluşmaz",
      "Sadece UI etkilenir",
    ],
    answer: 1,
    why: "Katmanlar farklı konsensüs/finality semantiğine sahip olabilir.",
  },
  {
    text: "Kurumsal veri egemenliği (data residency) için uygun hibrit yaklaşım nedir?",
    options: [
      "Veriyi global public L1’e tamamen yazmak",
      "Veriyi yetkili bölgede private tutup sadece hash/kanıtları public’e taşımak",
      "Sadece e-posta ile paylaşmak",
      "Hiç veri saklamamak",
    ],
    answer: 1,
    why: "Yasal yerleşim şartları korunurken dışarıya kanıt üretilebilir.",
  },
  {
    text: "Hibrit çözümlerde performans kazanımı için ne yapılabilir?",
    options: [
      "Doğrulamayı kapatmak",
      "Private tarafta paralel işleme/partisyonlama, public tarafta batch/aggregate anchor",
      "Sadece tek düğüm kullanmak",
      "Gas ölçümünü kaldırmak",
    ],
    answer: 1,
    why: "İş yükü izinli tarafta ölçeklenir; public’e toplu kanıt yazılır.",
  },
  {
    text: "Hibrit modellerde güvenliği zedeleyen anti-pattern hangisidir?",
    options: [
      "Anchor sıklığını iş ihtiyacına göre ayarlamak",
      "Köprü sözleşmelerinde çok imzalı/denetlenmiş yapı kullanmak",
      "Tüm kritik güveni tek bir saklı API anahtarına bağlamak",
      "ZK-kanıtlarla seçmeli ifşa",
    ],
    answer: 2,
    why: "Tek nokta güven varsayımı hibrit mimaride sistemik risk oluşturur.",
  },
  {
    text: "Hibrit mimaride uçtan uca doğrulanabilirlik için minimum set hangisine daha yakındır?",
    options: [
      "Yalnızca private veritabanı logu",
      "Merkle root + zaman damgası + public zincirde anchor + gerektiğinde ZK/kanıt",
      "Sadece CSV ihraç etmek",
      "Ekran görüntüsü",
    ],
    answer: 1,
    why: "Bu kombinasyon dış paydaşların bağımsız doğrulama yapabilmesini sağlar.",
  },
  {
    text: "Hibrit bir tasarıma geçiş planlanırken ilk yapılması gerekenlerden biri nedir?",
    options: [
      "Tema seçmek",
      "Gereksinim analizi: gizlilik, finality, throughput, regülasyon ve köprü güven varsayımlarını netleştirmek",
      "Sadece gas tahmini yapmak",
      "Nonce artırmak",
    ],
    answer: 1,
    why: "Tasarım, iş ve uyum gerekliliklerine göre doğru hibrit modelle başlar.",
  },
];

export default questions;
