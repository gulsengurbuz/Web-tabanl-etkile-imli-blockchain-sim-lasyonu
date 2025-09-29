


const questions = [
  {
    text: "Merkezi mimarinin en belirgin özelliği nedir?",
    options: [
      "Dağıtık karar alma",
      "Tek bir otorite/yönetim noktasının bulunması",
      "Tamamen eşler arası (P2P)",
      "Hiç izleme/log yok",
    ],
    answer: 1,
    why: "Merkezi mimaride kontrol ve kararlar tek bir kurum/sunucuda toplanır.",
  },
  {
    text: "Merkezi mimaride sık görülen risk hangisidir?",
    options: [
      "Farklı yönetişimler arası uyuşmazlık",
      "Tek hata noktası (SPOF)",
      "Veri tutarlılığını sağlama zorluğu",
      "Gossip yayılımının maliyeti",
    ],
    answer: 1,
    why: "Merkez arızalanırsa tüm sistem etkilenir.",
  },
  {
    text: "Merkezi mimarinin tipik avantajı:",
    options: [
      "Yönetişim ve versiyon kontrolünün kolay olması",
      "Sansüre tam direnç",
      "Her zaman daha düşük gecikme",
      "Hiç bakım gerektirmez",
    ],
    answer: 0,
    why: "Kararlar tek noktada olduğu için politika ve versiyon kontrolü kolaylaşır.",
  },
  {
    text: "Merkezi mimaride ölçeklenme yaklaşımı genellikle hangisine dayanır?",
    options: [
      "Yatay (horizontal) ölçekleme zorunludur",
      "Dikey (vertical) ölçekleme ağırlıklıdır",
      "Sadece önbellekleme",
      "Sharding şarttır",
    ],
    answer: 1,
    why: "Tek bir güçlü sunucu/DB ile kaynak yükseltme (CPU/RAM/IO) sık kullanılır.",
  },
  {
    text: "Merkezi bir sistemde performans darboğazı çoğunlukla nerededir?",
    options: ["İstemcide", "Merkezi sunucu/veritabanında", "CDN’de", "DNS’te"],
    answer: 1,
    why: "Tüm istekler merkezden aktığı için merkez kaynakları kritik darboğazdır.",
  },
  {
    text: "Merkezi mimaride veri bütünlüğü tipik olarak nasıl sağlanır?",
    options: [
      "Açık oylama",
      "Kriptografik oydaşım",
      "Merkezde güçlü yetkilendirme ve kurallar",
      "Yalnızca istemci kontrolü",
    ],
    answer: 2,
    why: "Erişim kontrolleri, transaction kuralları ve denetimler merkezde uygulanır.",
  },
  {
    text: "Aşağıdakilerden hangisi merkezi mimari örneğidir?",
    options: [
      "BitTorrent",
      "Bitcoin ağı",
      "Tek veri merkezli kurumsal ERP",
      "IPFS public",
    ],
    answer: 2,
    why: "Kontrolün tek kurumda olduğu klasik kurumsal sistemler merkezidir.",
  },
  {
    text: "Merkezi mimaride felaket kurtarma (DR) planı neden kritiktir?",
    options: [
      "Sistem açık kaynaktır",
      "Merkez kaybı tüm hizmeti kesebilir",
      "İstemciler kendi kendine iyileşir",
      "CDN her şeyi çözer",
    ],
    answer: 1,
    why: "Merkezde arıza durumunda iş sürekliliğini sağlamak için DR gerekir.",
  },
  {
    text: "Merkezi sistemde gecikme (latency) neye bağlıdır?",
    options: [
      "Sadece DNS TTL’ine",
      "Merkezle istemci arasındaki mesafe/topolojiye",
      "Tema rengine",
      "Monitör çözünürlüğüne",
    ],
    answer: 1,
    why: "Fiziksel/lojik mesafe ve ağ topolojisi gecikmeyi belirler.",
  },
  {
    text: "Merkezi mimaride yetkilendirme için ne yaygındır?",
    options: [
      "Proof of Work",
      "RBAC/ABAC gibi erişim kontrol modelleri",
      "Gossip protokolleri",
      "SPV kanıtı",
    ],
    answer: 1,
    why: "Klasik kurumsal sistemlerde rol/özellik tabanlı yetkilendirme kullanılır.",
  },
  {
    text: "Merkezi bir veritabanında tutarlılık modeli genellikle:",
    options: [
      "Eventual consistency",
      "Anında ve güçlü tutarlılık (ACID)",
      "Yalnızca cache tutarlılığı",
      "Tutarlılık yok",
    ],
    answer: 1,
    why: "Tek veritabanı ile güçlü tutarlılık sağlamak daha kolaydır.",
  },
  {
    text: "Merkezi mimaride yatay ölçekleme yapmak için tipik adım:",
    options: [
      "Düğümleri rastgele kapatmak",
      "Okuma replikaları ve yük dengeleme",
      "Hash fonksiyonunu değiştirmek",
      "Kayıtları silmek",
    ],
    answer: 1,
    why: "Read-replica, cache ve load balancer yatay kapasite sağlar.",
  },
  {
    text: "Merkezi log toplama neden önemlidir?",
    options: [
      "Renk eşitlemek için",
      "Denetim/izlenebilirlik ve hızlı olay müdahalesi için",
      "Gizlemeyi artırmak için",
      "DNS’i hızlandırmak için",
    ],
    answer: 1,
    why: "Tek yerden görünürlük sorun analizi ve güvenlik için kritiktir.",
  },
  {
    text: "Merkezi mimaride güvenlik sınırı (perimeter) yaklaşımı:",
    options: [
      "İçeri tam güven varsayımı güvenlidir",
      "Sıfır güven (zero-trust) ilkeleriyle takviye edilmelidir",
      "Sadece VPN yeterlidir",
      "Gereksizdir",
    ],
    answer: 1,
    why: "Modern tehdit modelinde network sınırı içi dâhil sürekli doğrulama gerekir.",
  },
  {
    text: "Merkezi mimaride veri tekilleştirme (single source of truth) ne sağlar?",
    options: [
      "Daha çok çelişki",
      "Tek, güvenilir veri kaynağı",
      "Sadece cache",
      "Sharding zorunluluğu",
    ],
    answer: 1,
    why: "Farklı kopyalar arasında çelişkiyi azaltır; karar alma hızlanır.",
  },
  {
    text: "Merkezi sistemlerde erişilebilirliği artırmak için ne yapılır?",
    options: [
      "Yedekli donanım, aktif-pasif/aktif-aktif mimariler",
      "Tema değişikliği",
      "DNS TXT kaydı",
      "Tüm replikaları kapatmak",
    ],
    answer: 0,
    why: "Yedeklilik ve failover stratejileri kesintileri azaltır.",
  },
  {
    text: "Merkezi mimaride veri sızıntısı riskini azaltan yaklaşım hangisi değildir?",
    options: [
      "En az ayrıcalık (least privilege)",
      "DLP ve denetim izleri",
      "Şifreleme ve anahtar yönetimi",
      "Üretim verisini herkese açık paylaşmak",
    ],
    answer: 3,
    why: "Gizli verileri paylaşmak riski artırır; diğerleri riski azaltır.",
  },
  {
    text: "Merkezileşmenin maliyet avantajı hangi durumda görülür?",
    options: [
      "Dağıtık ekiplerin yetkisi kısıtlıyken, standart süreç ve otomasyonla",
      "Her şeye farklı araç",
      "Tüm altyapıyı kopyalamak",
      "Hiç otomasyon olmadan",
    ],
    answer: 0,
    why: "Standartlaştırma ve merkezi otomasyon operasyon maliyetini düşürebilir.",
  },
  {
    text: "Merkezi mimaride gizlilik nasıl yönetilir?",
    options: [
      "Herkese açık veritabanı",
      "Erişim kontrolü, ağ segmentasyonu ve veri sınıflandırmasıyla",
      "DNS şifrelemesi yeter",
      "Sadece UI’dan gizlemek",
    ],
    answer: 1,
    why: "İzinler ve segmentasyon, veriye asgari erişimi uygular.",
  },
  {
    text: "Merkezi yapıdaki bakım pencereleri (maintenance window) neden önemlidir?",
    options: [
      "Kullanıcıyı şaşırtmak için",
      "Planlı kesintileri iletişimle yönetip etkisini azaltmak için",
      "Hash gücünü artırmak için",
      "Renk paletini değiştirmek için",
    ],
    answer: 1,
    why: "Planlı bakım, kesinti riskinin kontrollü yönetilmesini sağlar.",
  },
  {
    text: "Merkezi mimaride CDN kullanmanın amacı nedir?",
    options: [
      "Veriyi gizlemek",
      "İçeriği son kullanıcıya yakınlaştırarak gecikmeyi ve yükü azaltmak",
      "DB şeması üretmek",
      "Saldırı tespiti yapmak",
    ],
    answer: 1,
    why: "Statik içeriğin kenar’a taşınması merkez üzerindeki yükü düşürür.",
  },
  {
    text: "Merkezi bir sistemde API hız limitleri (rate limit) neden uygulanır?",
    options: [
      "Renk düzeltmek",
      "Kaynakları adil paylaşmak ve kötüye kullanımı/DoS’u sınırlamak",
      "Gizliliği kaldırmak",
      "Depolamayı artırmak",
    ],
    answer: 1,
    why: "Orantısız kullanımın merkezi kaynağı çökertmesini engeller.",
  },
  {
    text: "Merkezi mimaride gözetim ve alarmlama (monitoring/alerting) olmaması neye yol açar?",
    options: [
      "Daha iyi performans",
      "Sorunların geç tespiti ve uzun kesintiler",
      "Yüksek bulunabilirlik",
      "Güvenliğin artması",
    ],
    answer: 1,
    why: "Erken uyarı mekanizmaları yoksa arızalar büyüyene kadar fark edilmeyebilir.",
  },
];

export default questions;
