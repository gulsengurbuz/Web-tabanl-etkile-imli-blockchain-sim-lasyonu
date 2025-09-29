


const questions = [
  {
    text: "P2P ağlarda bir düğümün rolü genellikle nedir?",
    options: [
      "Sadece istemci",
      "Sadece sunucu",
      "Hem istemci hem sunucu olabilir",
      "Sadece yönlendirici",
    ],
    answer: 2,
    why: "Peer’ler birbirlerine hizmet sunar ve alır; çift yönlüdür.",
  },
  {
    text: "Gossip/flooding neyi ifade eder?",
    options: [
      "Şifreleme",
      "Mesajın komşular üzerinden geniş yayılması",
      "Depolama şifre çözme",
      "QoS",
    ],
    answer: 1,
    why: "Gossip, bilgiyi komşulara aktarıp ağda yayma tekniğidir.",
  },
  {
    text: "DHT’nin açılımı nedir?",
    options: [
      "Direct Host Tunnel",
      "Distributed Hash Table",
      "Dynamic Header Tree",
      "Data Holder Type",
    ],
    answer: 1,
    why: "DHT, anahtar→değer eşlemelerini dağıtık tutan bir yapıdır.",
  },
  {
    text: "P2P ağların avantajlarından biri değildir:",
    options: [
      "Tek hata noktasına direnç",
      "İçerik dağıtımında ölçeklenebilirlik",
      "Merkezi sansüre dayanım",
      "Merkezi koordinasyon kolaylığı",
    ],
    answer: 3,
    why: "Merkezi koordinasyon P2P’de doğası gereği zordur.",
  },
  {
    text: "NAT traversal hangi amaçla kullanılır?",
    options: [
      "IP gizlemek",
      "NAT arkasındaki eşlerle doğrudan bağlantı kurmak",
      "Şifrelemeyi kaldırmak",
      "Ping’i hızlandırmak",
    ],
    answer: 1,
    why: "STUN/TURN/ICE gibi yöntemlerle NAT arkasındaki eşlere erişilir.",
  },
  {
    text: "BitTorrent’te parça (piece) doğrulaması nasıl yapılır?",
    options: [
      "Rastgele kabul",
      "MD5/SHA-1 gibi hash kontrolü",
      "Ping ile",
      "TCP port taraması",
    ],
    answer: 1,
    why: "Her parçanın hash’i doğrulanır; bozuk parçalar reddedilir.",
  },
  {
    text: "Tracker’ın görevi nedir?",
    options: [
      "Dosyayı barındırmak",
      "Eş listesi/keşif bilgisi sağlamak",
      "Şifreleme yapmak",
      "QoS uygulamak",
    ],
    answer: 1,
    why: "Tracker eşlerin birbirini bulmasına yardımcı olur; içeriği taşımaz.",
  },
  {
    text: "Tit-for-tat stratejisi hangi ağda meşhurdur ve amacı nedir?",
    options: [
      "Tor; anonimleştirme",
      "BitTorrent; adil paylaşımı teşvik",
      "IPFS; içerik adresleme",
      "Gnutella; supernode seçimi",
    ],
    answer: 1,
    why: "Tit-for-tat, karşılıklılık ile freeloading’i azaltır.",
  },
  {
    text: "Supernode (ultra peer) nedir?",
    options: [
      "Yönetici düğüm",
      "Daha yüksek kapasiteyle indeks/aktarım yapan peer",
      "Yalnızca mobil cihaz",
      "Şifre çözen özel düğüm",
    ],
    answer: 1,
    why: "Bazı topolojilerde güçlü düğümler arama/aktarımda daha fazla rol alır.",
  },
  {
    text: "Tamamen merkezi olmayan P2P tasarımında tek hata noktası (SPOF) ne düzeydedir?",
    options: ["Yüksek", "Orta", "Düşük", "Değişmez"],
    answer: 2,
    why: "Kontrol tek noktada olmadığından SPOF riski azalır.",
  },
  {
    text: "İçerik adresleme (content addressing) hangi özelliği sağlar?",
    options: [
      "IP’ye bağımlılık",
      "Veriyi hash’iyle kimliklendirip bütünlük doğrulaması",
      "DNS gereksinimi",
      "Rastgele erişim engeli",
    ],
    answer: 1,
    why: "CID/Hash ile içerik değişirse adres de değişir; bütünlük kontrol edilir.",
  },
  {
    text: "P2P ağlarda arama/keşif verimliliğini artıran yapı hangisidir?",
    options: [
      "Rastgele yayın",
      "Yapılandırılmış DHT (Kademlia vb.)",
      "Sadece ping",
      "ARP",
    ],
    answer: 1,
    why: "Yapılandırılmış DHT, O(log N) anahtar araması sunar.",
  },
  {
    text: "Sybil saldırısı P2P’de neyi ifade eder?",
    options: [
      "Şifre kırma",
      "Bir saldırganın birçok sahte kimlikle ağa sızması",
      "QoS aşımı",
      "NAT delme",
    ],
    answer: 1,
    why: "Birçok sahte düğüm kontrolü ele geçirmeye çalışır.",
  },
  {
    text: "Sybil saldırısına karşı savunma değildir:",
    options: [
      "İtibar/puan sistemleri",
      "Ekonomik maliyet/iş ispatı",
      "Kimlik doğrulama/bağlama",
      "TTL değerini sıfırlamak",
    ],
    answer: 3,
    why: "TTL’yi sıfırlamak yayılımı engeller; Sybil’e çözüm değildir.",
  },
  {
    text: "Tor’un soğan katmanlı yönlendirmesinin amacı:",
    options: [
      "Bant genişliğini artırmak",
      "Kaynak–hedef ilişkisinin gizliliği",
      "İçerik bütünlüğü",
      "QoS sağlamak",
    ],
    answer: 1,
    why: "Çok katmanlı şifreleme trafiği anonimleştirir.",
  },
  {
    text: "UPnP P2P bağlamında neden kullanılır?",
    options: [
      "DNS güncellemek",
      "NAT üzerindeki portları otomatik eşlemek",
      "SSL sertifika üretmek",
      "QoS sağlamak",
    ],
    answer: 1,
    why: "UPnP/NAT-PMP, iç ağ cihazlarına port yönlendirmesi yapar.",
  },
  {
    text: "Free-rider (beleşçi) problemi nedir?",
    options: [
      "Aşırı upload yapanlar",
      "Sadece indiren, katkı sağlamayan düğümler",
      "IP çakışması",
      "TTL aşımı",
    ],
    answer: 1,
    why: "Kaynak tüketip paylaşım yapmayan düğümler ağ sağlığını bozar.",
  },
  {
    text: "Chunk/piece boyutunu çok büyük seçmenin olası sonucu nedir?",
    options: [
      "Daha iyi parça dağıtımı",
      "Eşzamanlılık azalır, parça çeşitliliği düşer",
      "Hash doğrulaması hızlanır",
      "Tracker sayısı artar",
    ],
    answer: 1,
    why: "Büyük parçalar dağıtımı yavaşlatıp nadirlik sorunları yaratabilir.",
  },
  {
    text: "Rarest-first stratejisi ne işe yarar?",
    options: [
      "En küçük parçayı seçer",
      "Ağda en az bulunan parçaları öncelikli indirerek çeşitliliği korur",
      "Sadece meta veriyi alır",
      "Sadece tohumlardan indirir",
    ],
    answer: 1,
    why: "Parça çeşitliliğini artırarak tamamlanma olasılığını yükseltir.",
  },
  {
    text: "IPFS’te pin’lemek ne demektir?",
    options: [
      "DNS kaydı eklemek",
      "Bir içeriği yerelde tutmayı garanti etmek",
      "İçeriği şifrelemek",
      "Port yönlendirmek",
    ],
    answer: 1,
    why: "Pin işlemi, çöp toplamadan muaf tutarak içeriği saklar.",
  },
  {
    text: "P2P istemcilerinde oran (ratio) neyi ifade eder?",
    options: [
      "Sadece download hızı",
      "Upload/Download miktar oranı",
      "Hash gücü",
      "NAT tipi",
    ],
    answer: 1,
    why: "Paylaşım adaleti ve topluluk kuralları için izlenen metriktir.",
  },
  {
    text: "WebRTC veri kanalları P2P için neden kullanılır?",
    options: [
      "Sadece medya sıkıştırma için",
      "Tarayıcılar arası NAT geçişli P2P veri aktarımı için",
      "DNS’i hızlandırmak için",
      "TCP’yi devre dışı bırakmak için",
    ],
    answer: 1,
    why: "STUN/TURN/ICE ile tarayıcılar arasında P2P bağlantı kurulur.",
  },
  {
    text: "P2P ağlarda gizlilik sağlamak için temel teknik hangisidir?",
    options: [
      "Açık metin gönderimi",
      "Uçtan uca şifreleme ve kimlik doğrulama",
      "TTL artırma",
      "Sadece UDP kullanma",
    ],
    answer: 1,
    why: "E2E şifreleme ve kimlik bağlama dinlemeye/kurcalamaya karşı korur.",
  },
];

export default questions;
