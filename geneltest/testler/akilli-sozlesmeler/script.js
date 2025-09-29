


const questions = [
  {
    text: "Akıllı sözleşme en doğru şekilde nasıl tanımlanır?",
    options: [
      "PDF biçiminde yasal belge",
      "Koşullar gerçekleştiğinde otomatik çalışan zincir üstü kod",
      "E-posta şablonu",
      "Merkezi veritabanı tetikleyicisi",
    ],
    answer: 1,
    why: "Akıllı sözleşmeler, kuralları koda döker ve zincir üzerinde otomatik işletir.",
  },
  {
    text: "Ethereum ekosisteminde akıllı sözleşme yazmak için en yaygın dil hangisidir?",
    options: ["Rust", "Solidity", "Python", "C#"],
    answer: 1,
    why: "Solidity, EVM tabanlı ağlarda standart dildir.",
  },
  {
    text: "‘Gas’ ücretinin temel amacı nedir?",
    options: [
      "Gizliliği sağlamak",
      "İşlem/hesaplama maliyetini fiyatlamak ve spam’i önlemek",
      "Blok boyutunu artırmak",
      "Hash fonksiyonunu hızlandırmak",
    ],
    answer: 1,
    why: "Gas, kaynak kullanımını fiyatlar ve spam’i maliyetli kılar.",
  },
  {
    text: "Sözleşme yükseltilebilirliği için yaygın desen hangisidir?",
    options: [
      "Yalnızca yeni bir adres dağıtmak",
      "Proxy (delegation) ile mantık/saklama ayrımı",
      "Tüm düğümleri yeniden başlatmak",
      "Hash fonksiyonunu değiştirmek",
    ],
    answer: 1,
    why: "Proxy deseni, storage’ı korurken implementation’ı güncellemeye izin verir.",
  },
  {
    text: "Reentrancy açığı nedir?",
    options: [
      "İmza algoritmasının zayıflığı",
      "Dış çağrı sırasında beklenmeyen tekrar girişle state’in istismarı",
      "Gas fiyatının artması",
      "Zincir çatallanması",
    ],
    answer: 1,
    why: "Dış çağrının kontrolü tekrar sözleşmeye dönebiliyorsa bakiyeler boşaltılabilir.",
  },
  {
    text: "Aşağıdakilerden hangisi reentrancy’yi azaltmaya yardımcıdır?",
    options: [
      "Checks-Effects-Interactions deseni",
      "Tüm fonksiyonları public yapmak",
      "Sadece require’ları kaldırmak",
      "Fallback’i sınırsız gas ile bırakmak",
    ],
    answer: 0,
    why: "Önce kontroller, sonra state değişikliği, en sonda harici çağrı yapılır.",
  },
  {
    text: "Bir ERC-20 sözleşmesinin zorunlu fonksiyonlarından biri değildir:",
    options: ["totalSupply", "balanceOf", "transfer", "tokenURI"],
    answer: 3,
    why: "tokenURI, ERC-721/NFT ile ilişkilidir; ERC-20’de zorunlu değildir.",
  },
  {
    text: "Bir ERC-721 (NFT) sözleşmesinde benzersizliği ne sağlar?",
    options: [
      "tokenId ile tekil kimlik",
      "Sabit arz",
      "Aynı URI’yi paylaşmaları",
      "Hepsinin değiştirilebilir olması",
    ],
    answer: 0,
    why: "Her NFT benzersiz tokenId ile tanımlanır.",
  },
  {
    text: "Events (olay kayıtları) ne için kullanılır?",
    options: [
      "Zincir üstü gizlemeyi sağlamak",
      "Zincir dışı izleme/indeksleme ve UI bildirimleri için log üretmek",
      "Gas maliyetini sıfırlamak",
      "Sözleşmeyi yükseltmek",
    ],
    answer: 1,
    why: "Event’ler client’ların dinleyebileceği log’lar üretir; durum değişimini bildirir.",
  },
  {
    text: "Ownable/AccessControl gibi yetkilendirme kalıplarının amacı nedir?",
    options: [
      "Gas maliyetini düşürmek",
      "Belirli fonksiyonlara rol/owner temelli erişim koymak",
      "Blok oluşturmak",
      "Cüzdan adreslerini gizlemek",
    ],
    answer: 1,
    why: "Yönetim işlemleri için roller (admin, minter vb.) tanımlanır.",
  },
  {
    text: "Akıllı sözleşmelerde ‘require’ ifadesi tipik olarak ne yapar?",
    options: [
      "Log atar ama devam eder",
      "Koşul sağlanmazsa işlemi revert eder",
      "Yalnızca uyarı üretir",
      "Gas’i geri ödemez",
    ],
    answer: 1,
    why: "Koşul yanlışsa işlem revert olur ve state değişiklikleri geri alınır.",
  },
  {
    text: "İmza doğrulaması için EVM’de yaygın kullanılan yardımcı fonksiyon hangisidir?",
    options: ["ecrecover", "keccak256recover", "sha1verify", "modexpSign"],
    answer: 0,
    why: "ecrecover, mesaj hash’inden imzalayan adresi geri kazanmak için kullanılır.",
  },
  {
    text: "Akıllı sözleşmelerde rastgelelik üretmede temel zorluk nedir?",
    options: [
      "Zincir dışı kaynaklara erişim olmaması",
      "Deterministik/doğrulanabilir olması gerektiği için manipülasyona açık olabilmesi",
      "Hash fonksiyonlarının olmaması",
      "Blokların zamansızlığı",
    ],
    answer: 1,
    why: "Deterministik yürütmede doğrulanabilir RNG zordur; VRF/ora cle’lar kullanılır.",
  },
  {
    text: "‘Pull over push’ ödeme modeli neden önerilir?",
    options: [
      "Daha ucuz olduğu için",
      "Alıcının fonu kendisinin çekmesiyle reentrancy ve başarısız aktarım risklerini azaltmak için",
      "Yalnızca NFT’lerde çalıştığı için",
      "Proxy’yi devre dışı bıraktığı için",
    ],
    answer: 1,
    why: "Ödemeyi alıcı çeker; başarısız transferlerde fonlar sözleşmede kilitlenmez.",
  },
  {
    text: "Sözleşme denetimi (audit) ve testlerinin hedefi nedir?",
    options: [
      "Gas’i sıfıra indirmek",
      "Güvenlik açıklarını ve mantıksal hataları erken tespit etmek",
      "Blok süresini kısaltmak",
      "Hash’i değiştirmek",
    ],
    answer: 1,
    why: "Test/Audit, güvenlik ve doğru işleyiş için kritik süreçlerdir.",
  },
];

export default questions;
