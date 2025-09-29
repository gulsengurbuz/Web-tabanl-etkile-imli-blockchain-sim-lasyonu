


const questions = [
  {
    text: "PoS’un temel fikri nedir?",
    options: [
      "Güvenliği hesaplama gücüne bağlamak",
      "Güvenliği ekonomik hisseye (stake) ve doğrulayıcı davranışına bağlamak",
      "Sadece ağ gecikmesine göre seçmek",
      "Tamamen rastgele blok üretmek",
    ],
    answer: 1,
    why: "PoS’ta doğrulayıcılar kilitledikleri hisseleri oranında blok/oy hakkı kazanır.",
  },
  {
    text: "PoS’ta blok/proposal üreticisi çoğunlukla nasıl seçilir?",
    options: [
      "Sabit sırayla",
      "Hisse ağırlıklı rastgele seçim (VRF/lottery benzeri) ile",
      "İlk gelen ilk hizmet alır",
      "Kullanıcı sayısına göre",
    ],
    answer: 1,
    why: "Seçim mekanizmaları genelde stake ağırlıklı ve sahtecilik dirençli rastgeleliğe dayanır.",
  },
  {
    text: "Doğrulayıcı (validator) kimdir?",
    options: [
      "Sadece tam düğüm",
      "Hisse yatırıp protokol kurallarınca blok öneren/oylayan katılımcı",
      "Madencilik cihazı operatörü",
      "Sıradan cüzdan kullanıcısı",
    ],
    answer: 1,
    why: "PoS’ta güvenlik bütçesini sağlayan katılımcı doğrulayıcılardır.",
  },
  {
    text: "Slashing (cezalandırma) neyi amaçlar?",
    options: [
      "Ücretleri düşürmek",
      "Çifte imzalama veya güvenliği zayıflatan davranışları ekonomik olarak caydırmak",
      "Blok boyutunu artırmak",
      "Yalnızca offline olanları ödüllendirmek",
    ],
    answer: 1,
    why: "Ciddi hatalı/düşmanca davranışlarda stake’in bir kısmı kesilerek maliyet oluşturulur.",
  },
  {
    text: "PoS’ta ‘nothing-at-stake’ problemi hangi duruma işaret eder?",
    options: [
      "Doğrulayıcıların farklı çatallara oy vermelerinin onlara neredeyse bedava olması",
      "Hiç kimsenin stake yatırmaması",
      "Tüm oyların rasgele olması",
      "Sadece gas ücretlerinin artması",
    ],
    answer: 0,
    why: "Cezalandırma/kurallar yoksa doğrulayıcılar tüm dallara oy verebilir; bu da çatalları artırır.",
  },
  {
    text: "Weak subjectivity (zayıf öznellik) kavramı PoS’ta neden önemlidir?",
    options: [
      "Çünkü tam düğümler her zaman genesis’ten hızlıca karar verir",
      "Uzun menzilli saldırılara karşı yeni düğümlerin güvenilir bir son durum kontrol noktasına ihtiyaç duyması",
      "PoW zorluğunu hesaplamak için",
      "Cüzdan temalarını seçmek için",
    ],
    answer: 1,
    why: "Yeni/uyuyan düğümler uzun süre sonra döndüğünde güvenilir ‘son final’ noktasını bilmelidir.",
  },
  {
    text: "Uzun menzilli (long-range) PoS saldırısı nedir?",
    options: [
      "Ağ tıkanıklığı",
      "Eski anahtarların/validator setlerinin ele geçirilerek geçmişten sahte bir tarih yazılması",
      "Sadece DDoS",
      "Gas’in artması",
    ],
    answer: 1,
    why: "PoS’ta eski imzalar ucuz olabilir; kontrol noktaları ve anahtar rotasyonu önemlidir.",
  },
  {
    text: "Liveness (yaşamsallık) neyi ifade eder?",
    options: [
      "Gizliliği",
      "Ağın yeni bloklar/sonuçlar üretmeye devam edebilmesini",
      "Ledger boyutunu",
      "Ücretlerin düşük olmasını",
    ],
    answer: 1,
    why: "Liveness varsa protokol ilerler; sadece güvenlik (safety) yetmez.",
  },
  {
    text: "Safety (güvenlik) prensibi için doğru ifade:",
    options: [
      "Asla final olmaz",
      "İki çelişen final hale gelemez; tek bir geçmiş üzerinde anlaşma sağlanır",
      "Her zaman iki zıt final oluşur",
      "Sadece PoW’da geçerlidir",
    ],
    answer: 1,
    why: "Güvenlik, iki farklı tarih/sonucun birden ‘nihai’ sayılmamasını garanti etmeye çalışır.",
  },
  {
    text: "Finality (nihailik) PoS bağlamında nasıl sağlanır?",
    options: [
      "Her blok otomatik finaldir",
      "Bellek havuzunda onaylanır",
      "Checkpoints ve süper çoğunluk (ör. ≥2/3) oyuyla bağlayıcı kararlarla",
      "Sadece ücretle",
    ],
    answer: 2,
    why: "Casper FFG gibi protokoller belirli aralıklarla supermajority ile blokları final yapar.",
  },
  {
    text: "Casper FFG’nin temel fikri nedir?",
    options: [
      "PoW zorluğu ayarı",
      "Oy ve finality katmanı ile ‘justified’ ve ‘finalized’ kontrol noktaları belirlemek",
      "Sharding’i kapatmak",
      "Ücretleri sabitlemek",
    ],
    answer: 1,
    why: "Oylama tur/epoch’ları ile nihai hale gelen kontrol noktaları oluşturur.",
  },
  {
    text: "LMD-GHOST kuralı ne için kullanılır?",
    options: [
      "Randomness üretmek için",
      "Çatallar arasında hangi zincirin ‘kafa’sına gidileceğini, en çok ağırlıklı oy desteğine göre seçmek için",
      "Şifreleme yapmak için",
      "Gas ölçmek için",
    ],
    answer: 1,
    why: "Güncel çoğunluk oy desteğini izleyip çatal seçiminde yol gösterir.",
  },
  {
    text: "PoS’ta ‘inactivity leak’ (etkinsizlik sızıntısı) mekanizması ne işe yarar?",
    options: [
      "Çevrimdışı doğrulayıcıları ödüllendirmek",
      "Uzun süre oy vermeyen doğrulayıcıların etkisini/ödemesini zamanla azaltmak",
      "Gas’i düşürmek",
      "Zinciri durdurmak",
    ],
    answer: 1,
    why: "Katılım düşerse finality elde etmek için pasiflerin etkisi azaltılır.",
  },
  {
    text: "PoS sistemlerinde rastgelelik (randomness) neden kritik?",
    options: [
      "UI animasyonları için",
      "Doğrulayıcı/proposer seçiminde manipülasyonu önlemek için öngörülemez, doğrulanabilir kaynak gerekir",
      "Hash’i hızlandırmak için",
      "Yedekleme için",
    ],
    answer: 1,
    why: "VRF/VDF/commit–reveal gibi tekniklerle güvenilir rastgelelik üretilir.",
  },
  {
    text: "Delegated PoS (DPoS) hangi özelliği ile ayrışır?",
    options: [
      "Hiç temsilci yoktur",
      "Token sahipleri sınırlı sayıda delege/üreticiyi oylayarak seçer",
      "Yalnızca PoW kullanır",
      "Finality yoktur",
    ],
    answer: 1,
    why: "Yönetişim/temsil ile daha küçük bir üretici seti oluşturur.",
  },
  {
    text: "Neden bazı PoS protokollerinde ‘unbonding’ bekleme süresi vardır?",
    options: [
      "Tema değişimi için",
      "Stake’i çözen doğrulayıcının eski oylardan sorumlu tutulabilmesi ve uzun menzil saldırılarını sınırlamak için",
      "Ücret toplamak için",
      "Genesis’i kısaltmak için",
    ],
    answer: 1,
    why: "Unbonding penceresi, geçmiş oylara dair sorumluluğun devamını sağlar.",
  },
  {
    text: "Çifte imzalama (double-sign) nedir?",
    options: [
      "Aynı slot/epoch için iki farklı bloğa/oy’a imza atmak",
      "Aynı bloğu iki kez indirmek",
      "İki kez ücret ödemek",
      "İki kez zaman damgasi almak",
    ],
    answer: 0,
    why: "Güvenliği bozar; slashing nedeni sayılır.",
  },
  {
    text: "PoS’ta ‘stake grinding’ saldırısı neyi hedefler?",
    options: [
      "Veri şifrelemek",
      "Rastgelelik/slot seçimini manipüle etmek için zincir durumuyla oynamak",
      "Ücretleri sıfırlamak",
      "Finality’yi kapatmak",
    ],
    answer: 1,
    why: "Seçim mekanizması öngörülebilirse saldırgan kendi lehine optimize etmeye çalışabilir.",
  },
  {
    text: "Güçlü ağ bölünmesi altında PoS sistemlerinin tasarımında hangi denge önemlidir?",
    options: [
      "Tema ve renk",
      "Safety ve liveness arasında; gerekirse liveness/ finality geçici ertelenir",
      "Sadece liveness",
      "Sadece safety",
    ],
    answer: 1,
    why: "Bölünmelerde ya ilerleme durur ya da çatışma riski alınır; tasarımlar bunu dengeler.",
  },
  {
    text: "PoS’ta ‘attestation’ (oy/imza) neyi temsil eder?",
    options: [
      "Mempool girişi",
      "Doğrulayıcının belirli blok/slot ve hedefe dair gördüğü zincir görüşünü imzalaması",
      "Şifre çözme bileti",
      "Sadece ücret makbuzu",
    ],
    answer: 1,
    why: "Attestation, fork choice ve finality için oy taşır.",
  },
  {
    text: "Ekonomik güvenlik bütçesi PoS’ta nasıl algılanır?",
    options: [
      "Hash gücü olarak",
      "Kesilebilecek toplam stake ve beklenen getiriler/cezalar olarak",
      "Depolama boyutu olarak",
      "Ping süresi olarak",
    ],
    answer: 1,
    why: "Saldırı maliyeti, potansiyel slash ve fırsat maliyeti ile ilişkilidir.",
  },
  {
    text: "PoS ağında yeni bir düğümün doğru zinciri seçmesi için pratikte önerilen yöntem nedir?",
    options: [
      "Rastgele bir eşten bootstrap",
      "Güvenilir bir kontrol noktası/weak subjectivity check-point edinmek",
      "Sadece en uzun zincir",
      "DNS’e bakmak",
    ],
    answer: 1,
    why: "Uzun menzilli saldırılar nedeniyle güvenilir final referansı gerekir.",
  },
  {
    text: "Proposer–Builder Separation (PBS) gibi tasarımlar PoS’ta neye yöneliktir?",
    options: [
      "Şifrelemeyi kaldırmak",
      "Blok inşasını (MEV çıkarımı) ve önerimini ayırarak dürtüleri/MEV’yi yönetmek",
      "Finality’yi kapatmak",
      "Stake’i gizlemek",
    ],
    answer: 1,
    why: "MEV baskısını azaltmak ve adilliği artırmak için görevler ayrıştırılabilir.",
  },
];

export default questions;
