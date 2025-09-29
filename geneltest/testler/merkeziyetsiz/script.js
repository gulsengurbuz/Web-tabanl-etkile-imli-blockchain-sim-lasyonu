


const questions = [
  {
    text: "Merkeziyetsiz mimari en iyi nasıl tanımlanır?",
    options: [
      "Tüm kontrolün tek otoritede toplandığı yapı",
      "Yetki ve sorumluluğun birden çok düğüme/kuruma dağıtıldığı yapı",
      "Sadece istemci–sunucu modeli",
      "Sadece tek veri merkezi",
    ],
    answer: 1,
    why: "Karar alma ve kontrol tek noktada değil, dağıtık aktörlerdedir.",
  },
  {
    text: "Merkeziyetsiz yapının başlıca avantajlarından biri nedir?",
    options: [
      "Tek hata noktasına bağımlılık",
      "Arıza toleransının yükselebilmesi",
      "Daha az birlikte çalışabilirlik",
      "Her zaman daha düşük maliyet",
    ],
    answer: 1,
    why: "Yetkinin dağılması, tek nokta arızasının etkisini azaltır.",
  },
  {
    text: "Merkeziyetsiz sistemlerin tipik zorluğu hangisidir?",
    options: [
      "Konsensüs/koordinasyon ihtiyacı",
      "Versiyon kontrolü kolaylığı",
      "Merkezi politika uygulaması",
      "İzleme ihtiyacının olmaması",
    ],
    answer: 0,
    why: "Dağıtık katılımcılar arasında mutabakat ve koordinasyon gerekir.",
  },
  {
    text: "Aşağıdakilerden hangisi merkeziyetsiz yapıya daha yakındır?",
    options: [
      "Tek veri merkezli ERP",
      "BitTorrent benzeri P2P ağ",
      "Monolitik tek sunucu",
      "Tek yöneticili Wi-Fi",
    ],
    answer: 1,
    why: "P2P ağlarda düğümler hem hizmet alır hem sunar; kontrol dağıtıktır.",
  },
  {
    text: "Merkeziyetsiz ağlarda güven modeli çoğunlukla nedir?",
    options: [
      "Tek otoriteye mutlak güven",
      "Çok taraflı oydaşım ve doğrulama",
      "Hiç güven gerekmiyor",
      "Sadece fiziksel güvenlik",
    ],
    answer: 1,
    why: "Birden fazla aktörün doğrulaması ve oydaşımı esastır.",
  },
  {
    text: "CAP teoremi bağlamında geniş coğrafyaya yayılmış merkeziyetsiz sistemler genelde neyi tercih eder?",
    options: [
      "CA (Tutarlılık + Erişilebilirlik)",
      "AP veya CP dengelemeleri",
      "Sadece CA",
      "Tutarlılık yok",
    ],
    answer: 1,
    why: "Ağ bölünmeleri olasıdır; AP/CP arasında seçim/sentetik çözümler yapılır.",
  },
  {
    text: "Merkeziyetsiz ağlarda kimlik yönetimi için tipik yaklaşım hangisidir?",
    options: [
      "Gerçek isim zorunluluğu",
      "Pseudonymous adresler/DID gibi dağıtık kimlikler",
      "Yalnızca IP tabanlı kimlik",
      "Kimlik gerekmez",
    ],
    answer: 1,
    why: "DID/anahtar tabanlı kimlikler merkezi otoriteye bağımlılığı azaltır.",
  },
  {
    text: "Merkeziyetsizliğin sansüre direnç üzerindeki etkisi nedir?",
    options: [
      "Direnci azaltır",
      "Direnci artırabilir",
      "Etkisi yoktur",
      "Sansürü zorunlu kılar",
    ],
    answer: 1,
    why: "Çoklu aktör ve dağıtık yayın, tek otoritenin engellemesini zorlaştırır.",
  },
  {
    text: "Merkeziyetsiz mimaride veri dağıtımı nasıl yapılır?",
    options: [
      "Tek bir sunucudan herkese",
      "P2P/çok kaynaklı çoğaltma ve içerik adresleme",
      "Sadece e-posta",
      "Sadece FTP",
    ],
    answer: 1,
    why: "Çoklu düğüm replikasyonu ve içerik adresleme (örn. CID) yaygındır.",
  },
  {
    text: "Merkeziyetsiz sistemlerde metrik/izleme yaklaşımı nasıl olmalıdır?",
    options: [
      "Gerek yok",
      "Dağıtık izleme ve bütünsel görünürlük",
      "Sadece istemci log’u",
      "Sadece DNS log’u",
    ],
    answer: 1,
    why: "Birçok düğümün sağlık ve performans verisini bütünleştirmek gerekir.",
  },
  {
    text: "Merkeziyetsiz ağlarda veri tutarlılığı için hangi model sık görülür?",
    options: [
      "Güçlü tutarlılık her durumda",
      "Eventual consistency",
      "Tutarlılık yok",
      "Sadece yazma izinli",
    ],
    answer: 1,
    why: "Dağıtık replikalar zamanla tutarlı hâle gelebilir.",
  },
  {
    text: "Lider seçim (leader election) mekanizmasının amacı nedir?",
    options: [
      "Renk seçmek",
      "Koordinasyon için bir düğümü geçici lider yapmak",
      "Şifreleme anahtarı üretmek",
      "GUI başlatmak",
    ],
    answer: 1,
    why: "Bazı protokoller koordinasyonu basitleştirmek için lider seçer.",
  },
  {
    text: "Merkeziyetsiz bir dosya paylaşım ağında bütünlük nasıl doğrulanır?",
    options: [
      "Renk kodlarıyla",
      "Parçaların kriptografik hash’leriyle",
      "Sadece dosya ismiyle",
      "Zaman damgasıyla",
    ],
    answer: 1,
    why: "Her parça için hash doğrulaması bozulmayı saptar.",
  },
  {
    text: "Merkeziyetsizlik ile gecikme (latency) ilişkisi hangi ifadeye yakındır?",
    options: [
      "Her zaman en düşük gecikme",
      "Topolojiye göre değişir; yakın eşlerden sunum gecikmeyi düşürebilir",
      "Her zaman en yüksek gecikme",
      "Gecikme yoktur",
    ],
    answer: 1,
    why: "İçerik yakın eşlerdeyse gecikme azalabilir; aksi durumda artabilir.",
  },
  {
    text: "Merkeziyetsiz mimaride güvenlik sınırı (perimeter) tasarımı nasıl ele alınmalıdır?",
    options: [
      "Sadece VPN yeter",
      "Zero-trust ilkeleri ve uçtan uca kimlik/şifreleme ile",
      "Hiç kimlik doğrulama",
      "Tek parola herkese",
    ],
    answer: 1,
    why: "Çoklu düğümler arası güveni sürekli doğrulamak gerekir.",
  },
  {
    text: "Konsensüs mekanizmaları merkeziyetsizliğin neresinde rol oynar?",
    options: [
      "İlişkisizdir",
      "Dağıtık tarafların aynı durum üzerinde uzlaşmasını sağlar",
      "Sadece log döker",
      "UI’ı renklendirir",
    ],
    answer: 1,
    why: "Konsensüs olmadan ortak durumun korunması zordur.",
  },
  {
    text: "Merkeziyetsiz bir mimaride veri yerleşimi (placement) stratejisi neden önemlidir?",
    options: [
      "Sadece estetik için",
      "Yük, yakınlık ve dayanıklılık hedefleri için replikasyon/şarding kararlarını yönlendirir",
      "Hiç etkisi yok",
      "Sadece tek kopya yeter",
    ],
    answer: 1,
    why: "Coğrafi dağıtım ve kopya sayısı SLA ve maliyeti etkiler.",
  },
  {
    text: "DAO (Decentralized Autonomous Organization) neyi ifade eder?",
    options: [
      "Merkezi kurul",
      "Zincir üstü kurallarla otonom topluluk yönetişimi",
      "VPN konsorsiyumu",
      "DNS alt yapısı",
    ],
    answer: 1,
    why: "Kararlar token/oy veya akıllı sözleşmelerle zincir üstünde alınır.",
  },
  {
    text: "Merkeziyetsiz depolamada içerik adresleme (content addressing) ne sağlar?",
    options: [
      "Sunucu IP’sine bağımlılık",
      "İçeriği hash’iyle referanslayarak değişmezlik/doğrulama",
      "Daha az bütünlük",
      "Yalnızca URL kısaltma",
    ],
    answer: 1,
    why: "İçerik hash’i ile kimliklendirilir; içerik değişirse adres de değişir.",
  },
  {
    text: "Gossip protokolleri merkeziyetsiz ağlarda ne için kullanılır?",
    options: [
      "Renk dağıtımı",
      "Durum/mesajın geniş ölçekte yayılması ve keşif",
      "Şifre çözme",
      "DNS yönlendirme",
    ],
    answer: 1,
    why: "Düğümler bilgiyi komşularına aktararak ağda yayılmasını sağlar.",
  },
  {
    text: "Merkeziyetsiz mimaride yönetişim (governance) nasıl şekillenebilir?",
    options: [
      "Tek karar verici",
      "Topluluk temelli zincir içi/dışı süreçler ve çok paydaşlı modeller",
      "Her zaman özel şirket",
      "Sadece yazılım lisansı",
    ],
    answer: 1,
    why: "Çoklu paydaş ve süreçlerle kararlar alınır.",
  },
  {
    text: "Merkeziyetsiz ağlarda ölçeklenebilirlik için tipik yaklaşımlar nelerdir?",
    options: [
      "Tek sunucu büyütme",
      "Sharding, Layer-2, replikasyon ve DHT tabanlı dağıtım",
      "Sadece gzip",
      "Sadece tema değişimi",
    ],
    answer: 1,
    why: "Veri/iş yükünü dağıtmak ve yakın eşlerden sunmak kapasiteyi artırır.",
  },
  {
    text: "Merkeziyetsiz mimaride veri gizliliği nasıl korunabilir?",
    options: [
      "Herkese açık düz metin",
      "Uçtan uca şifreleme, erişim anahtarları ve gizlilik artırıcı teknikler",
      "Sadece parola",
      "Hiç gerek yok",
    ],
    answer: 1,
    why: "Uçtan uca şifreleme ve anahtar tabanlı erişim kontrolü kritik rol oynar.",
  },
];

export default questions;
