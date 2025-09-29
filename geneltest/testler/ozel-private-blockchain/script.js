


const questions = [
  {
    text: "Özel (private/permissioned) blockchain’i en iyi tanımlayan ifade hangisi?",
    options: [
      "Herkese açık, izinsiz katılım",
      "Erişim ve yazma yetkisinin belirli kurumlarca verildiği izinli ağ",
      "Tek düğümlü muhasebe defteri",
      "Sadece PoW kullanılan ağ",
    ],
    answer: 1,
    why: "Private/permissioned ağlarda katılım/rol ataması bir yönetişimce kontrol edilir.",
  },
  {
    text: "Private blockchain’lerde kimlik/doğrulama genellikle nasıl yapılır?",
    options: [
      "Tamamen anonim anahtarlar",
      "PKI tabanlı sertifikalar, üyelik servisleri ve erişim kontrolleri",
      "Sadece kullanıcı adı/şifre",
      "IP adresi ile",
    ],
    answer: 1,
    why: "Kurumsal izinli ağlarda katılımcılar X.509/CA gibi altyapılarla tanımlanır.",
  },
  {
    text: "Permissioned ağları tercih etmenin tipik nedeni nedir?",
    options: [
      "Mutlak sansür direnci",
      "Regülasyon uyumu, izinli veri paylaşımı ve kontrollü yönetişim ihtiyacı",
      "Daima en düşük ücret",
      "Sıfır bakım ihtiyacı",
    ],
    answer: 1,
    why: "Sektörler arası veri alışverişinde kimlik, yetki ve denetim ön plandadır.",
  },
  {
    text: "Private ağlarda hangi konsensüs ailesi sık kullanılır?",
    options: [
      "Byzantine/Crash fault tolerant (PBFT, Raft vb.)",
      "Sadece PoW",
      "Sadece PoS",
      "Hiçbiri",
    ],
    answer: 0,
    why: "İzinli ağlarda bilinen doğrulayıcılar arası BFT/raft benzeri mutabakat yaygındır.",
  },
  {
    text: "Private vs Public: Hangisi genelde deterministik finality sunar?",
    options: [
      "Public PoW",
      "Public PoS her zaman",
      "Birçok permissioned BFT sistemi",
      "Hiçbiri",
    ],
    answer: 2,
    why: "PBFT-benzeri algoritmalar blok onayında anlık/nihai finality sağlayabilir.",
  },
  {
    text: "Hyperledger Fabric mimarisi için doğru ifade hangisi?",
    options: [
      "Madenciler ücret toplayarak blok üretir",
      "‘Endorse → Order → Validate’ aşamalarına dayanan modüler mimari",
      "Sadece PoW kullanır",
      "Tümü tek düğümde çalışır",
    ],
    answer: 1,
    why: "Fabric, onaylayıcı (endorser), sıralayıcı (ordering) ve doğrulama katmanlarını ayırır.",
  },
  {
    text: "Fabric’de ‘channel’ kavramı ne sağlar?",
    options: [
      "UI temasını değiştirir",
      "Aynı ağ içinde taraflara özel, ayrık defter/mahrem alt ağlar",
      "PoW zorluğunu ayarlar",
      "Gas sınırını belirler",
    ],
    answer: 1,
    why: "Kanallar belirli üyeler arasında gizli işlem/veri alanı sunar.",
  },
  {
    text: "Permissioned ağlarda ‘ordering service’ rolü nedir?",
    options: [
      "İmzaları üretmek",
      "İşlemleri sıralamak ve bloklara paketlemek",
      "Cüzdan adresi oluşturmak",
      "Sadece depolama yapmak",
    ],
    answer: 1,
    why: "Mutabakatla belirlenen global bir işlem sırası üretir.",
  },
  {
    text: "Corda mimarisinde ‘notary’ bileşeni neyi doğrular?",
    options: [
      "UI renkleri",
      "Çift harcama/çakışan durum güncellemesi",
      "Gas ölçümü",
      "DNS kayıtları",
    ],
    answer: 1,
    why: "Notary, tek kaynağın iki farklı şekilde güncellenmesini engeller.",
  },
  {
    text: "Private ağların tipik avantajı değildir:",
    options: [
      "Veri gizliliği/erişim kontrolü",
      "Yüksek TPS ve düşük gecikme olasılığı",
      "Deterministik finality",
      "Her zaman maksimum sansür direnci",
    ],
    answer: 3,
    why: "Sansür direnci, kamusal ve dağınık aktörlü ağlarda daha yüksektir.",
  },
  {
    text: "Permissioned ağda üyelik yönetimi (onboarding/offboarding) neden kritiktir?",
    options: [
      "Sadece tema değişir",
      "Doğru kimlik/yetki ataması ve ayrılan katılımcıların erişimini iptal etmek için",
      "Ücreti artırmak için",
      "Blok boyutunu ayarlamak için",
    ],
    answer: 1,
    why: "Kurumlar arası güven modelinin temeli güvenilir üyelik yaşam döngüsüdür.",
  },
  {
    text: "Private ağlarda gizlilik için hangi teknik uygundur?",
    options: [
      "Tüm veriyi herkese açık yayınlamak",
      "Kanallar/ACL’ler, şifreleme, gizli sözleşmeler ve gerektiğinde ZK kanıtlar",
      "Sadece IP filtreleme",
      "Sadece parola",
    ],
    answer: 1,
    why: "Veri görünürlüğü ve yetki en düşük ayrıcalıkla kısıtlanır.",
  },
  {
    text: "Permissioned ağların başlıca zorluğu hangisi olabilir?",
    options: [
      "Açık katılımın fazlalığı",
      "Kurumlar arası yönetişim, hukuki çerçeve ve operasyonel uyum",
      "Hash fonksiyonu yokluğu",
      "Cüzdan olmaması",
    ],
    answer: 1,
    why: "Çok paydaşlı yapıda roller, SLA’ler ve sorumluluklar net tanımlanmalıdır.",
  },
  {
    text: "Private ağda zincir dışı entegrasyon (ERP, core banking vb.) neden önemli?",
    options: [
      "Tema için",
      "Gerçek iş süreçlerini otomasyonla bağlamak ve veri tutarlılığını korumak için",
      "Gas’i düşürmek için",
      "Yedekleme yok",
    ],
    answer: 1,
    why: "Değer, kurum içi sistemlerle güvenli bütünleşmede ortaya çıkar.",
  },
  {
    text: "Permissioned ağda ‘audit trail’ (denetim izi) ne sağlar?",
    options: [
      "Renk kaydı",
      "Değişmez (append-only) kayıtlarla olayların izlenmesi ve regülasyon uyumu",
      "Gas ölçümü",
      "UI hızlandırma",
    ],
    answer: 1,
    why: "Düzenleyici/denetim gereksinimleri için merkezi loglara kıyasla güçlü kanıt sunar.",
  },
  {
    text: "Private ağların topolojisinde hangi yaklaşım yaygındır?",
    options: [
      "Tamamen anonim P2P",
      "Kurumsal VPN/özel bağlantılar, izinli peer setleri ve sınırlı keşif",
      "Sadece Tor",
      "Sadece tek veri merkezi",
    ],
    answer: 1,
    why: "Katılımcılar tanımlıdır; ağ erişimi ve peer keşfi kontrol altındadır.",
  },
  {
    text: "Permissioned ağlarda ücret (fee/gas) modeli nasıl olabilir?",
    options: [
      "Her zaman public ağlardaki gibi açık piyasa",
      "Hiç gerekmez; ya da sabit/kurumsal politika temelli olabilir",
      "Sadece RBF ile",
      "Sadece CPFP ile",
    ],
    answer: 1,
    why: "Blok alanı rekabeti düşükse ücret yerine kural/politika ile sınırlama yapılır.",
  },
  {
    text: "Private ağlarda zincir çatallaşması (fork) nasıl yönetilir?",
    options: [
      "Kendiliğinden çözülür",
      "BFT/raft gibi mekanizmalarla önlenir veya operasyonel yönetişimle koordine edilir",
      "Sadece GPU ile önlenir",
      "Hiç gerekmez",
    ],
    answer: 1,
    why: "Deterministik konsensüs ve operasyonel süreçler çatalları minimize eder.",
  },
  {
    text: "‘Data residency’ (veri yerleşimi) gereksinimleri private ağlarda neden öne çıkar?",
    options: [
      "UI teması için",
      "Ülkeler/kurumlar arası verinin nerede tutulacağına dair yasal zorunluklar nedeniyle",
      "Gas için",
      "DNS için",
    ],
    answer: 1,
    why: "Kişisel/veri egemenliği kuralları veri konumunu düzenler.",
  },
  {
    text: "Permissioned ağlarda zincirler arası birlikte çalışabilirlik (interop) neden hassas?",
    options: [
      "Basit olduğu için",
      "Farklı güven varsayımlarını köprülerken kimlik/izin eşlemesi ve denetimin korunması gerekir",
      "Yalnızca UI etkilenir",
      "Hash gerektirmez",
    ],
    answer: 1,
    why: "Özel ağ → özel/kamusal ağ geçişlerinde güven/kimlik köprüsü kritik risk taşır.",
  },
  {
    text: "Private ağ kurulumunda performansı artıran seçenek değildir:",
    options: [
      "Küme içi düşük gecikmeli ağ",
      "Sanal imzalar/çoklu imza optimizasyonları",
      "İşlem doğrulama kurallarını kaldırmak",
      "Paralel doğrulama ve toplu blok işleme",
    ],
    answer: 2,
    why: "Doğrulama kurallarını kaldırmak güvenliği yok eder; diğerleri gerçek optimizasyonlardır.",
  },
  {
    text: "Permissioned ağda ‘smart contract’ (chaincode/cordapp) yaşam döngüsünde tipik adım değildir:",
    options: [
      "Paketleme ve onaylayıcılarca kurulum",
      "Versiyonlama ve yönetişim onayı",
      "Rastgele public mempool’a dağıtım",
      "Güncellemede politika/oy mekanizması",
    ],
    answer: 2,
    why: "Dağıtım izinli akışlarla yapılır; public mempool mantığı bulunmaz.",
  },
  {
    text: "Private ağların en büyük trade-off’larından biri nedir?",
    options: [
      "Yüksek şeffaflık ↔ gizlilik",
      "İzinli kontrol ve performans ↔ public ağların açık doğrulanabilirlik/sansür direnci",
      "Hash gücü ↔ gas ücreti",
      "Nonce ↔ bits",
    ],
    answer: 1,
    why: "Kontrollü ortam avantajlarına karşı açık ekosistem güven varsayımları kaybedilir.",
  },
];

export default questions;
