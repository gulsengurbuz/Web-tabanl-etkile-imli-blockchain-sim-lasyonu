


const questions = [
  {
    text: "CAP teoremi üçlüsü hangi kavramlardan oluşur?",
    options: [
      "Confidentiality, Access, Privacy",
      "Consistency, Availability, Partition tolerance",
      "Cost, Agility, Performance",
      "Cache, API, Protocol",
    ],
    answer: 1,
    why: "CAP, dağıtık sistemlerde tutarlılık, erişilebilirlik ve ağ bölünmesine tolerans arasındaki trade-off’u açıklar.",
  },
  {
    text: "Eventual consistency neyi ifade eder?",
    options: [
      "Anında mutlak tutarlılık",
      "Zamanla replikaların aynı duruma yakınsaması",
      "Tutarsızlık garantisi",
      "Sadece tek düğümde yazma",
    ],
    answer: 1,
    why: "Yeni güncellemeler durduğunda tüm kopyalar sonunda aynı değere yaklaşır.",
  },
  {
    text: "Sharding nedir?",
    options: [
      "Veriyi şifreleme yöntemi",
      "Veriyi yatay parçalara bölerek ölçeklemek",
      "Yedekleme tipi",
      "Önbelleği kapatma",
    ],
    answer: 1,
    why: "Büyük veri/yük parçalanarak farklı düğümlere dağıtılır.",
  },
  {
    text: "Leader election mekanizmasının amacı nedir?",
    options: [
      "Renk seçmek",
      "Koordinasyon için bir düğümü geçici lider seçmek",
      "Şifre çözmek",
      "GUI başlatmak",
    ],
    answer: 1,
    why: "Bazı algoritmalar (Raft, Paxos) liderle koordinasyonu basitleştirir.",
  },
  {
    text: "Gecikme (latency) ile bant genişliği (bandwidth) arasındaki ilişki için doğru ifade hangisi?",
    options: [
      "Aynıdır",
      "Farklı metriklerdir; latency gecikme süresi, bandwidth aktarım kapasitesidir",
      "Yalnızca donanıma bağlıdır",
      "Ölçülemez",
    ],
    answer: 1,
    why: "Bir istek ne kadar sürede başlar/biter (latency) ve saniyede ne kadar veri akar (bandwidth) farklıdır.",
  },
  {
    text: "Mesaj kuyrukları (MQ) dağıtık mimaride ne sağlar?",
    options: [
      "Sıkı bağ/bağımlılık",
      "Gevşek bağ, asenkron iletişim ve tamponlama",
      "Şifre çözme",
      "DNS yönlendirme",
    ],
    answer: 1,
    why: "Üretici-tüketiciyi ayırır; geri basınç ve yeniden deneme desenleriyle dayanıklılık sağlar.",
  },
  {
    text: "Idempotent işlem ne garantiler?",
    options: [
      "Her çağrıda farklı sonuç",
      "Aynı isteğin tekrarı aynı sonucu üretir",
      "Zorunlu sıraya sokma",
      "Gizliliği",
    ],
    answer: 1,
    why: "Tekrar teslim/yeniden deneme durumlarında tutarlılık sağlar.",
  },
  {
    text: "‘Exactly-once’ teslimat için doğru ifade hangisi?",
    options: [
      "Her sistemde kolaydır",
      "Genelde efsanedir; uçtan uca uygulama düzeyinde idempotency/transaction ile yaklaşılır",
      "Sadece TCP garanti eder",
      "Sadece cache ile sağlanır",
    ],
    answer: 1,
    why: "Ağ/çökme koşullarında pratik yaklaşım en az-bir/azami-bir + idempotent işlemdir.",
  },
  {
    text: "Dağıtık saat/seri düzeni için kullanılan mantıksal saatlerden biri:",
    options: ["Lamport saatleri", "NTPv65", "GPS yalnız", "CRC32 saati"],
    answer: 0,
    why: "Lamport saatleri kısmi sıralama kurar; vector clock nedenselliği daha iyi yakalar.",
  },
  {
    text: "Vector clock neyi modellemeye yardımcı olur?",
    options: [
      "Tam anonimlik",
      "Olaylar arası nedensellik ilişkileri",
      "Şifre anahtarı türetimi",
      "QoS",
    ],
    answer: 1,
    why: "Her süreç için sayaç vektörü ile önce-sonra/yarış ilişkileri izlenir.",
  },
  {
    text: "Ağ bölünmesi (partition) olduğunda AP sistem neyi tercih eder?",
    options: [
      "Tutarlılık",
      "Erişilebilirlik",
      "Her ikisini sınırsız",
      "Hiçbirini",
    ],
    answer: 1,
    why: "AP, bölünme sırasında erişilebilirliği korur, tutarlılığı gevşetir (eventual).",
  },
  {
    text: "Quorum tabanlı sistemlerde ‘W+R > N’ kuralı neyi hedefler?",
    options: [
      "Şifrelemeyi",
      "Okuma-yazma kesişimi ile tutarlılık garantisi",
      "Sadece gizlilik",
      "Performansı düşürme",
    ],
    answer: 1,
    why: "Yazma (W) ve okuma (R) çoğunluğu toplamı replika sayısını (N) aşarsa en az bir ortak replika görülür.",
  },
  {
    text: "SAGA deseni hangi problemi adresler?",
    options: [
      "UI animasyonu",
      "Dağıtık işlemlerde uzun süren transaction’ların yerini alan yerel adımlar + telafi (compensation)",
      "DNS çözümleme",
      "Şifre çözme",
    ],
    answer: 1,
    why: "Her hizmette yerel işlem ve hatada telafi adımıyla bütün iş akışı korunur.",
  },
  {
    text: "CQRS (Command Query Responsibility Segregation) ne sağlar?",
    options: [
      "Aynı modelle okuma/yazma",
      "Okuma ve yazma modellerinin ayrılması",
      "Yalnızca cache",
      "Monolit mimari",
    ],
    answer: 1,
    why: "Okuma ile yazmanın farklı ölçek/şema ihtiyaçlarına uyum sağlar.",
  },
  {
    text: "Circuit breaker deseni ne işe yarar?",
    options: [
      "Bağlantıları kalıcı açık tutar",
      "Hata oranı yükselince çağrıları kesip sistemin toparlanmasına fırsat verir",
      "Şifrelemez",
      "TTL ayarlar",
    ],
    answer: 1,
    why: "Aşırı hata yayılmasını önler; yarı-açık durumda test ederek normale döner.",
  },
  {
    text: "Geri çekilme (retry with exponential backoff + jitter) neden önerilir?",
    options: [
      "Daha çok yük oluşturmak için",
      "Trafik dalgalarını azaltıp çarpışma olasılığını düşürmek için",
      "Sadece log üretmek için",
      "Zaman damgası için",
    ],
    answer: 1,
    why: "Eşzamanlı tekrar denemelerin senkron patlamasını önler.",
  },
  {
    text: "Service discovery tipik olarak neyi çözer?",
    options: [
      "Kullanıcı arayüzünü",
      "Dinamik ölçeklenen hizmetlerin adres/port bilgisini bulma",
      "Şifre anahtarı üretimi",
      "Disk şifreleme",
    ],
    answer: 1,
    why: "Kayıt defteri (Consul, etcd) veya DNS-SRV ile hizmet uçları keşfedilir.",
  },
  {
    text: "Health check ve heartbeat’ler neden önemlidir?",
    options: [
      "Renk teması için",
      "Hizmetin canlılığını izleyip yük dengeleme/yeniden başlatma kararları almak için",
      "Sadece log dolsun diye",
      "Hiç gerekmez",
    ],
    answer: 1,
    why: "Hatalı düğümler havuzdan çıkarılır; self-healing tetiklenir.",
  },
  {
    text: "Blue-green/canary dağıtımlarının ortak amacı nedir?",
    options: [
      "Gizlilik",
      "Riskli sürüm geçişlerini kademeli/geri alınabilir şekilde yapmak",
      "Şifre çözme",
      "Monolit yapmak",
    ],
    answer: 1,
    why: "Canary trafiğin küçük kısmı ile denenir, sorun yoksa genişletilir; green/blue hızla geri dönebilir.",
  },
  {
    text: "Veri yakınlığı (data locality) neden önemlidir?",
    options: [
      "Sadece estetik",
      "Hesaplamayı veriye yaklaştırarak gecikme ve veri taşıma maliyetini azaltmak için",
      "Şifre anahtarı dağıtmak için",
      "CDN gerekmesin diye",
    ],
    answer: 1,
    why: "Dağıtık analitik/iş yüklerinde I/O ve ağ maliyetini düşürür.",
  },
  {
    text: "Senkron ve asenkron replikasyon farkı için doğru ifade hangisi?",
    options: [
      "Aynıdır",
      "Senkron yazma, çoğaltma tamamlanmadan başarılı sayılmaz; asenkron gecikmeli çoğaltır",
      "Asenkron daha tutarlı",
      "Senkron hep hızlı",
    ],
    answer: 1,
    why: "Senkron güçlü tutarlılık, asenkron daha düşük gecikme/olası veri kaybı riskidir.",
  },
  {
    text: "Backpressure (geri basınç) neyi ifade eder?",
    options: [
      "Renk değişimi",
      "Tüketicinin kapasitesine göre üretimi yavaşlatma/ sıraya alma mekanizmaları",
      "Şifre kırma",
      "DNS TTL ayarı",
    ],
    answer: 1,
    why: "Aşırı yük altında sistemin dengede kalmasını sağlar.",
  },
  {
    text: "Dağıtık kilit (distributed lock) kullanırken dikkat edilmesi gerekenlerden biri nedir?",
    options: [
      "Sonsuz kilit süresi",
      "Lease/yenileme ve saat kaymalarına dayanıklılık",
      "Logları kapatma",
      "Tek ip ile bağlamak",
    ],
    answer: 1,
    why: "Kilitler süresi dolmazsa deadlock yaratabilir; saat/ayrık beyin sendromuna dayanıklı tasarım gerekir (örn. fencing token).",
  },
];

export default questions;
