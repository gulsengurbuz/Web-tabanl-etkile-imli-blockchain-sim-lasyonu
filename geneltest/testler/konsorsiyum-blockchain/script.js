


const questions = [
  {
    text: "Konsorsiyum (consortium) blockchain’i en iyi tanımlayan ifade hangisidir?",
    options: [
      "Herkese açık, izinsiz katılım",
      "Tek kurumun tam kontrol ettiği ağ",
      "Birden fazla bağımsız kuruluşun birlikte yönettiği izinli ağ",
      "Sadece tek düğümlü defter",
    ],
    answer: 2,
    why: "Konsorsiyumda birden çok kurum ortak yönetişimle ağı işletir.",
  },
  {
    text: "Konsorsiyum ve private blockchain arasındaki temel fark nedir?",
    options: [
      "Konsorsiyumda tek kurum vardır",
      "Konsorsiyumda birden fazla kurum birlikte kontrol ve yönetişim paylaşır",
      "Private ağlar herkese açıktır",
      "Konsorsiyumda kimlik yoktur",
    ],
    answer: 1,
    why: "Private genelde tek kurumsal sahiplik; konsorsiyum çok paydaşlıdır.",
  },
  {
    text: "Konsorsiyum ağlarda kimlik/doğrulama genellikle nasıl sağlanır?",
    options: [
      "Tam anonimlik",
      "PKI tabanlı sertifikalar, üyelik servisleri ve erişim politikaları",
      "Sadece kullanıcı adı/şifre",
      "IP’ye göre tahmin",
    ],
    answer: 1,
    why: "İzinli katılım için kurumsal kimlik ve sertifikalar kullanılır.",
  },
  {
    text: "Konsorsiyum ağlarda hangi konsensüs ailesi yaygındır?",
    options: [
      "PoW",
      "PoS",
      "BFT/Crash-tolerant (PBFT, Raft vb.) mekanizmalar",
      "Proof of Elapsed Time",
    ],
    answer: 2,
    why: "Bilinen doğrulayıcılar olduğundan BFT/raft benzeri protokoller uygundur.",
  },
  {
    text: "Konsorsiyum ağların tipik avantajı hangisidir?",
    options: [
      "Deterministik veya hızlı finality ve daha yüksek TPS",
      "Tam anonimlik",
      "Sıfır yönetişim ihtiyacı",
      "Ücretsiz operasyon",
    ],
    answer: 0,
    why: "BFT/raft türü mutabakatlar hızlı/nihai onay sağlayabilir.",
  },
  {
    text: "Konsorsiyum ağların tipik zorluğu hangisidir?",
    options: [
      "Tek kurumla karar verme kolaylığı",
      "Çok paydaşlı yönetişim, sözleşmeler (MoU), SLA ve uyuşmazlık çözümü",
      "Açık mempool yönetimi",
      "Kimlik doğrulama gereksizliği",
    ],
    answer: 1,
    why: "Birden çok kurumun süreçleri ve hukuki çerçeveleri uyumlaştırılmalıdır.",
  },
  {
    text: "‘Consortium charter’ (tüzük/kurucu anlaşma) neyi tanımlar?",
    options: [
      "UI tema kuralları",
      "Üyelik kriterleri, yönetişim süreçleri, oy/karar mekanizmaları ve teknik işletim ilkeleri",
      "Sadece log formatı",
      "Yalnızca veri şeması",
    ],
    answer: 1,
    why: "Tüzük organizasyonel ve teknik kuralları yazılı hale getirir.",
  },
  {
    text: "Konsorsiyumda ‘onboarding’ ve ‘offboarding’ neden kritiktir?",
    options: [
      "Tema değiştirmek için",
      "Yeni üyeyi güvenle dahil etmek, ayrılanın erişimini ve anahtarlarını iptal etmek için",
      "Gas’i düşürmek için",
      "DNS yayılımı için",
    ],
    answer: 1,
    why: "Kimlik/izin yaşam döngüsü güven modelinin temelidir.",
  },
  {
    text: "Konsorsiyum ağı veri gizliliğini tipik olarak nasıl yönetir?",
    options: [
      "Her şeyi herkese açık yazarak",
      "Kanallar/alt-ledger’lar, erişim kontrol listeleri ve şifreleme ile",
      "Sadece parola ile",
      "IP filtreleme ile",
    ],
    answer: 1,
    why: "Taraflara özel kanallar ve politikalar veri erişimini sınırlar.",
  },
  {
    text: "Ordering (sıralama) hizmeti konsorsiyumda ne yapar?",
    options: [
      "Cüzdan adresi oluşturur",
      "İşlemleri global sıraya koyar ve bloklara paketler",
      "Kullanıcı arayüzünü boyar",
      "Hash fonksiyonu seçer",
    ],
    answer: 1,
    why: "Mutabakatla ortak bir işlem sırası üretir.",
  },
  {
    text: "Bir konsorsiyumda oy/karar kuralı olarak hangisi daha uygundur?",
    options: [
      "Tek üye veto yetkisi",
      "Açık piyasa gas oylaması",
      "Nitelikli çoğunluk/eşik (ör. ≥2/3) veya ağırlıklı oy politikaları",
      "Rastgele seçim",
    ],
    answer: 2,
    why: "Çok paydaşlı yapıda eşik ve ağırlıklandırılmış oy sık görülür.",
  },
  {
    text: "Konsorsiyum ağlarında ‘audit trail’ (denetim izi) faydası nedir?",
    options: [
      "Veriyi küçültmek",
      "Değişmez kayıtlarla faaliyetlerin izlenmesi ve uyum/düzenleyici kanıt sağlamak",
      "Gas artışı",
      "UI hızlanması",
    ],
    answer: 1,
    why: "İş süreçleri ve regülasyonlar için güvenilir iz kaydı sunar.",
  },
  {
    text: "Konsorsiyum–public köprüleri neden hassastır?",
    options: [
      "Basit oldukları için",
      "Güven varsayımlarının farklılığı, çoklu imza/akıllı sözleşme hataları ve kimlik eşlemesi risk yaratır",
      "Sadece ücret yüksekliği",
      "Daima tek yönlüdür",
    ],
    answer: 1,
    why: "Zincirler arası en zayıf halka köprü olabilir; yönetişim ve güven önemlidir.",
  },
  {
    text: "Konsorsiyum ağlarda ücret (fee) modeli nasıl olur?",
    options: [
      "Her zaman açık piyasa gas açık artırması",
      "Genellikle sabit/fonksiyonel maliyet ve politika temelli; bazen ücret olmayabilir",
      "Sadece RBF",
      "Yalnızca CPFP",
    ],
    answer: 1,
    why: "Blok alanı rekabeti düşük olduğundan politika ve kotalar daha uygundur.",
  },
  {
    text: "Konsorsiyumda akıllı sözleşme (chaincode) dağıtımında tipik ek adım nedir?",
    options: [
      "Public mempool’a yayınlama",
      "Üyeler arası onay/versiyonlama politikası ve imzalı yükleme",
      "Rastgele node’a kopyalama",
      "Kullanıcıya e-posta atma",
    ],
    answer: 1,
    why: "Dağıtım yönetişim onayına ve politika gereksinimlerine bağlıdır.",
  },
  {
    text: "Veri yerleşimi (data residency) konsorsiyumda neden daha çok konuşulur?",
    options: [
      "Tema için",
      "Ülkeler arası veri saklama yasaları ve kurumsal uyum gereklilikleri nedeniyle",
      "Sadece performans",
      "DNS gereği",
    ],
    answer: 1,
    why: "Kişisel ve hassas verilerde lokasyon mevzuatı kritik olabilir.",
  },
  {
    text: "Konsorsiyumda yüksek erişilebilirlik için iyi bir pratik nedir?",
    options: [
      "Tüm node’ları tek veri merkezine koymak",
      "Farklı kurumlar, bölgeler ve bulutlar arasında çoğaltma/çoğul bölgeli dağıtım",
      "Tek istemci uygulaması kullanmak",
      "Logları kapatmak",
    ],
    answer: 1,
    why: "Coğrafi/organizasyonel çeşitlilik tek hata noktasını azaltır.",
  },
  {
    text: "Konsorsiyumda performansı artıran ama güvenliği zedelemeyen yaklaşım:",
    options: [
      "Doğrulama kurallarını kaldırmak",
      "Paralel doğrulama, batch işleme ve imza toplama/threshold imza",
      "Tüm düğümleri kapatmak",
      "Ağ bölünmesini artırmak",
    ],
    answer: 1,
    why: "Doğrulamayı korurken verimlilik kazanımları hedeflenir.",
  },
  {
    text: "Uyuşmazlık çözümü (dispute resolution) konsorsiyumda nasıl ele alınır?",
    options: [
      "Rastgele karar",
      "Charter’da tanımlı oylama/itiraz süreçleri ve gerektiğinde hukuki tahkim",
      "Tek üyenin kararı",
      "Gas’e göre çözüm",
    ],
    answer: 1,
    why: "Prosedürler ve sözleşmeler üzerinden çözüm yolu belirlenir.",
  },
  {
    text: "Konsorsiyumda log/telemetri paylaşımı için doğru yaklaşım hangisi?",
    options: [
      "Hiç log tutmamak",
      "Gizlilik ilkelerine uygun, taraflarca uzlaşılan metrikler ve merkezi/dağıtık gözlem altyapısı",
      "Tüm ham veriyi herkese açmak",
      "Sadece e-posta ile paylaşmak",
    ],
    answer: 1,
    why: "Operasyon ve güvenlik için asgari gerekli veriler kontrollü paylaşılır.",
  },
  {
    text: "Konsorsiyumda üye ağırlıkları (vote weights) nasıl belirlenebilir?",
    options: [
      "Rastgele",
      "Eşit oy, pay/sorumluluk temelli ağırlık veya hibrit modeller",
      "Sadece en büyük kuruma tüm oylar",
      "Token sayısı yoksa oy yok",
    ],
    answer: 1,
    why: "Sektör ve iş modeline göre farklı ağırlıklandırma politikaları benimsenebilir.",
  },
  {
    text: "Konsorsiyumda zincir dışı sistemlerle entegrasyonun kritik noktası nedir?",
    options: [
      "UI teması",
      "İş süreçlerinin uçtan uca tutarlılığı: kimlik eşlemesi, hata toleransı ve atomiklik",
      "Sadece DNS",
      "IP bloklama",
    ],
    answer: 1,
    why: "Gerçek değer; ERP/core banking gibi sistemlerle güvenli/izlenebilir bağda ortaya çıkar.",
  },
  {
    text: "Konsorsiyum–kamu otoritesi ilişkisi için doğru ifade hangisi?",
    options: [
      "Regülasyon dışıdır",
      "Çoğu senaryoda sektör düzenlemeleri ve denetim gereksinimleri ile uyumlu çalışmak zorundadır",
      "Sadece open-source lisansı yeterlidir",
      "Her zaman token zorunludur",
    ],
    answer: 1,
    why: "Konsorsiyumlar çoğunlukla regüle sektörlerde (finans, sağlık, lojistik) görülür.",
  },
];

export default questions;
