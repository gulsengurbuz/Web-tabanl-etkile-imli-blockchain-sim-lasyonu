


const questions = [
  {
    text: "Dijital imzanın temel amacı nedir?",
    options: [
      "Veriyi sıkıştırmak",
      "Gizlilik sağlamak",
      "Bütünlük ve kaynağın doğrulanması (kimlik doğrulama)",
      "Renk bilgisini korumak",
    ],
    answer: 2,
    why: "Dijital imza; mesajın değişmediğini ve belirli özel anahtar sahibinden geldiğini kanıtlar.",
  },
  {
    text: "Dijital imza hangi anahtar ile oluşturulur?",
    options: ["Açık anahtar", "Özel anahtar", "Paylaşılan parola", "IV"],
    answer: 1,
    why: "İmza özel anahtarla üretilir, doğrulama açık anahtarla yapılır.",
  },
  {
    text: "İmza doğrulaması sırasında ne kullanılır?",
    options: ["Özel anahtar", "Açık anahtar", "Salt", "IV"],
    answer: 1,
    why: "Doğrulama yalnızca açık anahtar ile yapılır.",
  },
  {
    text: "Aşağıdakilerden hangisi bir dijital imza şeması değildir?",
    options: ["RSA-PSS", "ECDSA", "EdDSA (Ed25519)", "AES-GCM"],
    answer: 3,
    why: "AES-GCM simetrik şifrelemedir; imza şeması değildir.",
  },
  {
    text: "‘Hash edip sonra imzalama’ neden yaygındır?",
    options: [
      "Mesajı büyütmek için",
      "Daha yavaş olduğu için",
      "Büyük mesajları kısaltıp sabit uzunluklu özeti imzalamak için",
      "Gizliliği artırmak için",
    ],
    answer: 2,
    why: "Özet imzalanır; performans ve güvenlik (standartlaştırılmış özet) sağlar.",
  },
  {
    text: "ECDSA’da aynı nonce (k) iki imzada tekrar kullanılırsa ne olur?",
    options: [
      "Hiçbir şey",
      "İmzalar doğrulanamaz",
      "Özel anahtar açığa çıkabilir",
      "Açık anahtar değişir",
    ],
    answer: 2,
    why: "Aynı k ile imzalanan iki mesajdan özel anahtar cebirsel olarak elde edilebilir.",
  },
  {
    text: "RFC 6979 neyi önerir?",
    options: [
      "RSA anahtar boyutunu",
      "Deterministik ECDSA nonce üretimi",
      "MD5 kullanımı",
      "Çift şifreleme",
    ],
    answer: 1,
    why: "Deterministik nonce (k) üretimi tekrar kullanım ve RNG zayıflığı riskini azaltır.",
  },
  {
    text: "RSA imza için önerilen dolgu (padding) hangisidir?",
    options: [
      "PKCS#1 v1.5 her zaman",
      "OAEP",
      "PSS",
      "Hiç padding kullanmamak",
    ],
    answer: 2,
    why: "RSA-PSS modern ve daha güvenli kabul edilir; OAEP şifreleme içindir.",
  },
  {
    text: "Ed25519 hakkında doğru ifade hangisi?",
    options: [
      "RSA tabanlıdır",
      "Eğri: Curve25519 üzerinde EdDSA; hızlı ve sabit-zaman uygulamaları için uygundur",
      "Sadece şifreleme yapar",
      "Sadece 4096-bit anahtarlarla çalışır",
    ],
    answer: 1,
    why: "Ed25519, EdDSA ailesindedir; performans ve yan kanal direnciyle bilinir.",
  },
  {
    text: "İmza malleability (şekillendirilebilirlik) neyi ifade eder?",
    options: [
      "Anahtarın değişmesi",
      "Aynı mesaj ve anahtar için farklı fakat geçerli imza temsilleri üretilebilmesi",
      "İmzanın doğrulanamaması",
      "Hash’in değişmesi",
    ],
    answer: 1,
    why: "Bazı şemalarda eşdeğer farklı imzalar üretilebilir; protokoller bunu sınırlamaya çalışır.",
  },
  {
    text: "Schnorr imzalarının ECDSA’ya göre başlıca avantajı nedir?",
    options: [
      "Daha az güvenlik",
      "İmza toplama/çoklu imza (aggregate/multisig) için daha doğal yapı",
      "RSA ile uyum",
      "Hash gerektirmemesi",
    ],
    answer: 1,
    why: "Schnorr doğrusal yapısı sayesinde basit ve verimli çoklu imza/aggregate imza sağlar.",
  },
  {
    text: "Çoklu imza (multisig) ile eşik imza (threshold) arasındaki fark için doğru ifade:",
    options: [
      "Aynıdır",
      "Multisig birden çok imzayı birleştirir; threshold t-of-n katılımcı ile tek imza üretir",
      "Threshold sadece RSA içindir",
      "Multisig gizlilik sağlamaz",
    ],
    answer: 1,
    why: "Threshold şemaları tek imzaya indirger; multisig bazen birleştirilmiş yapı gerektirir.",
  },
  {
    text: "EIP-712 (Ethereum) neyi tanımlar?",
    options: [
      "Blok boyutu",
      "Domain-separated, tiplenmiş verinin imzalanması",
      "Gas hesaplaması",
      "Nonce artışı",
    ],
    answer: 1,
    why: "Kullanıcıya gösterilen yapılandırılmış verinin imzalanmasını standartlaştırır, phishing’i azaltır.",
  },
  {
    text: "Blind signature (kör imza) ne sağlar?",
    options: [
      "Tamamen görünür imzalama",
      "İmzalayanın mesaj içeriğini görmeden imza atması",
      "RSA-PSS’in hızlanması",
      "ECDSA’da k paylaşımı",
    ],
    answer: 1,
    why: "İçerik gizli kalırken imza alınabilir; e-nakit/oylama senaryolarında kullanılır.",
  },
  {
    text: "Ring signature (halka imzası) hangi özelliği hedefler?",
    options: [
      "Zorunlu bağlantı",
      "İmzacı anonimliği (grup içinden biri, hangisi belirsiz)",
      "Daha düşük güvenlik",
      "Hash’i gizleme",
    ],
    answer: 1,
    why: "İmzanın geçerli olduğu bilinir ama imzalayanın kimliği grup içinde gizli kalır.",
  },
  {
    text: "Sertifika zinciri (PKI) bağlamında, imza doğrulaması neye dayanır?",
    options: [
      "Özel CA anahtarına erişime",
      "Güvenilir kök CA → ara CA → sunucu sertifikası zincirine ve iptal kontrolüne",
      "Sadece DNS’e",
      "Kullanıcı parolasına",
    ],
    answer: 1,
    why: "Zincir oluşturma ve CRL/OCSP gibi iptal kontrolleri yapılır.",
  },
  {
    text: "Yan kanal (side-channel) saldırılarına karşı uygulama seviyesinde iyi bir önlem nedir?",
    options: [
      "Zaman bağımlı dallanma",
      "Sabit-zaman (constant-time) işlemler ve rastgeleleştirme",
      "Logları kapamak",
      "Salt eklemek",
    ],
    answer: 1,
    why: "Zaman/güç farklarından anahtar sızıntısını önlemek için sabit-zaman gerekir.",
  },
  {
    text: "Mesajın yalnızca bir kısmını imzalamak yerine özetini imzalamak neden tercih edilir?",
    options: [
      "Daha güvensiz olduğu için",
      "Performans ve uyumluluk için; özet sabit uzunluktadır",
      "Hash fonksiyonları gereksizdir",
      "Açık anahtar büyür",
    ],
    answer: 1,
    why: "Büyük mesajları doğrudan imzalamak yerine hash edilmesi standart pratik.",
  },
  {
    text: "Deterministik imza şemalarında (ör. Ed25519) RNG hataları ne olur?",
    options: [
      "Kritiktir",
      "Etki etmez, nonce deterministiktir",
      "İmzayı doğrulanamaz yapar",
      "Anahtar uzunluğunu değiştirir",
    ],
    answer: 1,
    why: "Nonce üretimi mesaj ve anahtardan türetilir; zayıf RNG riski azalır.",
  },
  {
    text: "Batch verification (toplu doğrulama) ne sağlar?",
    options: [
      "Daha yavaş doğrulama",
      "Birden çok imzayı birlikte daha hızlı doğrulama fırsatı",
      "Güvenliği düşürür",
      "Sadece RSA ile mümkündür",
    ],
    answer: 1,
    why: "Doğrulama maliyeti ortalama olarak düşebilir; başarısızlıkta tekil kontrol gerekir.",
  },
  {
    text: "‘Domain separation’ neden önemlidir?",
    options: [
      "Renkler için",
      "Farklı protokol alanlarında imza/etiket çakışmalarını ve yeniden kullanım saldırılarını önlemek için",
      "Hash’i uzatmak için",
      "Salt üretmek için",
    ],
    answer: 1,
    why: "Her bağlamın etiketi/ön eki ayrıdır; yanlış bağlamda geçerli imza olmasın.",
  },
  {
    text: "İmza + zaman damgası (timestamping) birlikte neyi kanıtlar?",
    options: [
      "Sadece gizlilik",
      "Belirli bir zamanda mevcut olan içeriğin değişmediğini ve o anda imzalandığını",
      "Anahtar rotasyonunu",
      "Nonce değerini",
    ],
    answer: 1,
    why: "Zaman damgası otoritesi (TSA) imzalı özet ile zamansal bağ kurar.",
  },
  {
    text: "‘Message recovery’ özellikli imza şemaları (örn. bazı RSA modları) ne yapar?",
    options: [
      "Mesajı şifreler",
      "Mesajı imzadan kısmen/ tamamen geri kazanmayı sağlar",
      "Nonce üretir",
      "Salt ekler",
    ],
    answer: 1,
    why: "Bazı şemalarda doğrulama sırasında mesajı imzadan elde etmek mümkündür.",
  },
];

export default questions;
