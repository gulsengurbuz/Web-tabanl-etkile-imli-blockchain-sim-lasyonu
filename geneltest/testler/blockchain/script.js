


const questions = [
  {
    text: "Blockchain’in ayırt edici temel özelliği nedir?",
    options: [
      "Tek bir merkezi veritabanı olması",
      "Blokların hash’lerle birbirine zincirlenmesi ve değişime direnç",
      "Sadece çevrimdışı çalışması",
      "Gizlilik olmaması",
    ],
    answer: 1,
    why: "Her blok öncekinin hash’ini referanslar; bu da bütünlük ve değişime direnç sağlar.",
  },
  {
    text: "Genesis blok nedir?",
    options: [
      "Zincirin son bloğu",
      "Zincirin ilk, önceki referansı olmayan bloğu",
      "Sadece test ortamı bloğu",
      "Yedek blok",
    ],
    answer: 1,
    why: "Genesis, önceki blok hash’i olmayan başlangıç bloğudur.",
  },
  {
    text: "İzinli (permissioned) ve izinsiz (permissionless) ayrımı hangi kritere bakar?",
    options: [
      "Kullanılan hash fonksiyonu",
      "Erişim/katılım ve yazma yetkisi",
      "Blok boyutu",
      "Programlama dili",
    ],
    answer: 1,
    why: "Ağa katılma ve doğrulama yetkisi izinli ağlarda kısıtlıdır, izinsizde açıktır.",
  },
  {
    text: "Konsensüs mekanizmasının temel amacı nedir?",
    options: [
      "Görselleştirme yapmak",
      "Tüm düğümlerin tek, tutarlı bir durum üzerinde uzlaşmasını sağlamak",
      "Veriyi şifrelemek",
      "UI’ı hızlandırmak",
    ],
    answer: 1,
    why: "Dağıtık ortamda tek kayıt/gerçek kaynağı oluşturur.",
  },
  {
    text: "PoW ve PoS hangi ortak problemi adresler?",
    options: [
      "Yüksek bant genişliği",
      "Sybil/spam saldırılarına karşı ekonomik maliyet yaratma",
      "Renk derinliği",
      "DNS çözümleme",
    ],
    answer: 1,
    why: "Sahte kimliklerle ağı manipüle etmeyi maliyetli kılarlar.",
  },
  {
    text: "Bir blok keşfedildiğinde ağda yayılma (gossip) neden önemlidir?",
    options: [
      "Gizlemek için",
      "Düğümlerin en güncel zincir durumuna hızla ulaşması için",
      "Gas’i düşürmek için",
      "Blok boyutunu artırmak için",
    ],
    answer: 1,
    why: "Hızlı yayılım, çatallaşmaların azalmasına ve tutarlı görünüme yardımcı olur.",
  },
  {
    text: "Tam düğüm (full node) için doğru ifade hangisi?",
    options: [
      "Sadece cüzdan arayüzü sunar",
      "Tüm blokları ve işlemleri indirir/doğrular",
      "Sadece başlık indirir",
      "Sadece explorer’dır",
    ],
    answer: 1,
    why: "Tam düğüm, protokol kurallarıyla eksiksiz doğrulama yapar.",
  },
  {
    text: "SPV (Simplified Payment Verification) yaklaşımı ne kullanır?",
    options: [
      "Tüm blok gövdeleri",
      "Sadece blok başlıkları ve Merkle kanıtları",
      "Yalnızca mempool",
      "Sadece cüzdan adresleri",
    ],
    answer: 1,
    why: "SPV, başlık + Merkle proof ile üyelik doğrulaması yapar.",
  },
  {
    text: "‘Finality (nihailik)’ terimi neyi açıklar?",
    options: [
      "Blok süresini",
      "Bir işlemin geri alınamazlık derecesini",
      "Hash çıkış uzunluğunu",
      "Sharding sayısını",
    ],
    answer: 1,
    why: "PoW’da olasılıksal, bazı PoS protokollerinde deterministik olabilir.",
  },
  {
    text: "Çatallaşma (fork) nedir?",
    options: [
      "Veri sıkıştırma",
      "Kural/versiyon ayrımıyla zincirin dallanması",
      "Hash fonksiyonunun iki kez çalışması",
      "Sadece cüzdan yükseltmesi",
    ],
    answer: 1,
    why: "Kural/uygulama farkları birden çok dalın oluşmasına yol açar.",
  },
  {
    text: "Soft fork için doğru ifade hangisi?",
    options: [
      "Geriye uyumlu değildir",
      "Geriye uyumlu kural sıkılaştırmasıdır",
      "Sadece isim değişikliğidir",
      "Sadece test ağında olur",
    ],
    answer: 1,
    why: "Eski düğümler yeni kurallarla üretilen blokları çoğunlukla kabul eder.",
  },
  {
    text: "Blok başlığındaki ‘önceki blok hash’i’ alanı ne sağlar?",
    options: [
      "Gizlilik",
      "Zincir bütünlüğü ve değiştirmeye direnç",
      "Gas hesaplaması",
      "Sharding",
    ],
    answer: 1,
    why: "Kriptografik bağ; bir bloğu değiştirmek tüm devamını kırar.",
  },
  {
    text: "Merkle kökü neyin özetidir?",
    options: [
      "Önceki blok başlığı",
      "Bloktaki tüm işlemlerin Merkle ağacı aracılığıyla birleştirilmiş kökü",
      "Madencinin adresi",
      "Sadece coinbase",
    ],
    answer: 1,
    why: "İşlem listesi üzerinden hesaplanan kök hash’tir.",
  },
  {
    text: "Mempool nedir?",
    options: [
      "Onaylanmış işlemler arşivi",
      "Onay bekleyen işlemler havuzu",
      "Hash fonksiyonu çıktısı",
      "Bir test kütüphanesi",
    ],
    answer: 1,
    why: "Düğümler ağa yayılan, henüz bloklanmamış işlemleri burada tutar.",
  },
  {
    text: "‘İşlem ücreti (fee/gas)’ neden gereklidir?",
    options: [
      "Gizliği garanti etmek için",
      "Ağ kaynaklarının fiyatlanması ve spam’in önlenmesi için",
      "Blokları renklendirmek için",
      "Sadece borsalarda gerektiği için",
    ],
    answer: 1,
    why: "Ücretler, kaynak rekabetini düzenler ve üreticilere teşvik olur.",
  },
  {
    text: "İzinli kurumsal ağlarda yaygın konsensüs ailesi hangisidir?",
    options: [
      "BFT/Raft türevleri",
      "Yalnızca PoW",
      "Yalnızca PoS",
      "Yalnızca manuel onay",
    ],
    answer: 0,
    why: "Az sayıda güvenilir doğrulayıcıyla BFT/RAFT verimli çalışır.",
  },
  {
    text: "Ölçeklenebilirliği artırmak için tipik yaklaşımlardan biri:",
    options: [
      "Düğümleri azaltmak",
      "Katman-2 (rollup/kanal) ve/veya sharding",
      "Tüm veriyi silmek",
      "Sadece blok süresini kısaltmak",
    ],
    answer: 1,
    why: "Rollup/kanallar ve sharding throughput’u artırabilir.",
  },
  {
    text: "Zincir dışı (off-chain) veri saklama neden tercih edilir?",
    options: [
      "Şeffaflığı azaltmak için",
      "Büyük verileri zincire yüklemenin maliyet/performans sorunlarını azaltmak için",
      "Güvenli olmadığından",
      "Finality sağlamak için",
    ],
    answer: 1,
    why: "Büyük içerikler için IPFS/dep. servisleriyle maliyet ve kapasite optimize edilir.",
  },
  {
    text: "Blok zincirde değiştirilemezlik (immutability) öncelikle neye dayanır?",
    options: [
      "UI teması",
      "Kriptografik bağlar ve ekonomik maliyet",
      "Yasal sözleşme",
      "Rastgele atamalar",
    ],
    answer: 1,
    why: "Hash zinciri + konsensüs, geriye dönük değişikliği ekonomik/teknik olarak zorlaştırır.",
  },
  {
    text: "Bir blokta sadece coinbase işlemi olması ne anlama gelir?",
    options: [
      "Blok geçersizdir",
      "Geçerlidir; ‘empty block’ olabilir",
      "Mutlaka fork oluşturur",
      "Zincir durur",
    ],
    answer: 1,
    why: "Coinbase dışında işlem olmayabilir; protokolce geçerli bir durumdur.",
  },
  {
    text: "Adreslerin ‘pseudonymous (takma ad)’ olmasının sonucu nedir?",
    options: [
      "Tam anonimlik garantisi",
      "Zincir analiziyle gerçek kimliklere bağlanabilme ihtimali",
      "Adreslerin tek kullanımlık olmaması",
      "İmza gerekmemesi",
    ],
    answer: 1,
    why: "Açık defterde akış analizi, adreslerin kimliklerle eşleştirilmesini mümkün kılabilir.",
  },
  {
    text: "‘Ortak defter (shared ledger)’ ifadesi neyi vurgular?",
    options: [
      "Defterin yalnızca tek sunucuda tutulduğunu",
      "Birden çok düğümün aynı durumun kopyasını tutup doğruladığını",
      "Yalnızca gizli verilerin saklandığını",
      "Defterin salt okunur olduğunu",
    ],
    answer: 1,
    why: "Düğümler aynı defteri çoğaltır ve konsensüsle günceller.",
  },
];

export default questions;
