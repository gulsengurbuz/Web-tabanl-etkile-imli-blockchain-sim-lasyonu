


const questions = [
  {
    text: "Anahtar yönetiminin kapsamına girmeyen hangisidir?",
    options: [
      "Anahtar üretimi",
      "Anahtar dağıtımı",
      "Anahtar döndürme (rotation)",
      "Blok ödülünün belirlenmesi",
    ],
    answer: 3,
    why: "Blok ödülü protokol/ekonomi konusudur; anahtar yaşam döngüsüne ait değildir.",
  },
  {
    text: "KMS (Key Management System) temel amacı nedir?",
    options: [
      "Kullanıcı arayüzü oluşturmak",
      "Anahtarların yaşam döngüsünü yönetmek",
      "Ağ yönlendirmek",
      "Veriyi sıkıştırmak",
    ],
    answer: 1,
    why: "KMS anahtar üretim, saklama, rotasyon, erişim ve imha süreçlerini merkezileştirir.",
  },
  {
    text: "HSM (Hardware Security Module) ne sağlar?",
    options: [
      "Anahtarları düz metin tutar",
      "Anahtarların güvenli saklanması ve güvenli kriptografik işlemler",
      "Sadece loglama",
      "UI bileşenleri",
    ],
    answer: 1,
    why: "HSM, anahtarları korumalı donanımda saklar ve imza/şifreleme işlemlerini cihaz içinde yapar.",
  },
  {
    text: "İyi bir anahtar üretimi için aşağıdakilerden hangisi kritiktir?",
    options: [
      "Deterministik sayı üretici",
      "Yeterli entropi ve güvenli RNG",
      "Sabit seed",
      "Tarih/saat tabanlı sayı",
    ],
    answer: 1,
    why: "Zayıf rastgelelik anahtar tahminine yol açar.",
  },
  {
    text: "Anahtar rotasyonu (key rotation) neden yapılır?",
    options: [
      "Sistemi yavaşlatmak için",
      "Sızıntı etkisini sınırlamak ve güvenliği artırmak",
      "Depolamayı büyütmek",
      "Hash’i kısaltmak",
    ],
    answer: 1,
    why: "Periyodik veya olay bazlı rotasyon riskleri sınırlar, hijyeni korur.",
  },
  {
    text: "Anahtar sızıntısı şüphesinde ilk yapılması gereken nedir?",
    options: [
      "Logları silmek",
      "Anahtarı iptal/çekmek (revoke) ve yenisiyle değiştirmek",
      "Beklemek",
      "Versiyon numarasını değiştirmek",
    ],
    answer: 1,
    why: "Kompromize anahtar derhal devre dışı bırakılmalı ve yenisi devreye alınmalıdır.",
  },
  {
    text: "Çoklu imza (multisig) veya eşik imza (threshold) şemalarının başlıca faydası nedir?",
    options: [
      "Tek kişiye tam yetki",
      "Yetkiyi dağıtarak tekil arıza/ihlal riskini azaltmak",
      "Gas’i sıfırlamak",
      "Blok süresini kısaltmak",
    ],
    answer: 1,
    why: "Birden fazla tarafın onayı gerekebilir; tek anahtar sızıntısının etkisi azalır.",
  },
  {
    text: "Shamir Secret Sharing (SSS) ne yapar?",
    options: [
      "Hash hızını artırır",
      "Bir sırrı parçalara bölüp eşik sayısı ile yeniden birleştirilmesini sağlar",
      "Ağ gecikmesini düşürür",
      "DNS yönlendirir",
    ],
    answer: 1,
    why: "t-of-n paylaşım ile yedeklilik ve güvenlik sağlar.",
  },
  {
    text: "BIP39 neyi tanımlar?",
    options: [
      "Hash fonksiyonu",
      "Mnemonic (12/24 kelime) ile tohum (seed) üretimini",
      "TLS el sıkışmasını",
      "OCSP yanıtlarını",
    ],
    answer: 1,
    why: "BIP39, cüzdan tohumunu insan okunur kelimelerle ifade etmeyi tanımlar.",
  },
  {
    text: "BIP32/44 standartlarının ilişkisi için doğru ifade hangisi?",
    options: [
      "İmzayı sıkıştırır",
      "HD (Hierarchical Deterministic) anahtar türetmeyi/paths (m/…) tanımlar",
      "Yalnızca NFT’ler için",
      "DNSSEC içindir",
    ],
    answer: 1,
    why: "HD cüzdanlarda dallı türetim yolları ile anahtar hiyerarşisi oluşturulur.",
  },
  {
    text: "Mnemonic (seed) için en güvenli saklama yaklaşımı hangisine daha yakındır?",
    options: [
      "Ekran görüntüsü alıp e-posta ile göndermek",
      "Çevrimdışı/air-gapped yedek ve erişim kontrollü kasada saklamak",
      "Her ekibe Slack’ten paylaşmak",
      "Sadece tarayıcı önbelleğinde tutmak",
    ],
    answer: 1,
    why: "Seed, kurtarma anahtarıdır; çevrimdışı ve korunaklı saklanmalıdır.",
  },
  {
    text: "Key wrapping ve envelope encryption farkı için doğru ifade:",
    options: [
      "Aynıdır",
      "Key wrapping bir anahtarı başka anahtarla sarmalar; envelope encryption veriyi DEK ile, DEK’i KEK ile korur",
      "Her ikisi de yalnızca RSA ister",
      "Sadece TLS içindir",
    ],
    answer: 1,
    why: "Zarflama modelinde veri anahtarı ayrıca üst anahtarla korunur.",
  },
  {
    text: "PKCS#11 genellikle ne için kullanılır?",
    options: [
      "Rastgele CSS sınıfı",
      "Kripto cihaz/HSM arayüz standardı",
      "Mobil bildirim protokolü",
      "Log biçimi",
    ],
    answer: 1,
    why: "PKCS#11, HSM/akıllı kart API standardıdır.",
  },
  {
    text: "FIPS 140-2/140-3 neyi sertifikalar?",
    options: [
      "Web tasarımı",
      "Kriptografik modüllerin güvenlik düzeylerini",
      "Ağ kablolarını",
      "UI bileşenlerini",
    ],
    answer: 1,
    why: "FIPS 140 ailesi, kriptografik modül güvenlik seviyelerini tanımlar/sertifikalar.",
  },
  {
    text: "Erişim kontrolünde asgari ayrıcalık (least privilege) ne anlama gelir?",
    options: [
      "Herkese yönetici rolü",
      "Görevi için gerekli en düşük izinlerin verilmesi",
      "İzinlerin kaldırılmaması",
      "Sınırsız anahtar kopyası",
    ],
    answer: 1,
    why: "Saldırı yüzeyini ve yanlış kullanım riskini azaltır.",
  },
  {
    text: "Denetim izi (audit log) neden kritiktir?",
    options: [
      "Performansı düşürmek için",
      "Anahtar kullanımlarının izlenebilirliği ve adli analiz için",
      "Renk teması için",
      "Gas ölçümü için",
    ],
    answer: 1,
    why: "Kim, ne zaman, hangi anahtarı kullandı sorularına yanıt sağlar.",
  },
  {
    text: "Ed25519 ve ECDSA (secp256k1) karşılaştırmasında doğru olan hangisidir?",
    options: [
      "Ed25519 asimetrik değildir",
      "Ed25519 farklı eğri/algoritma ailesidir; performans ve güvenlik profili farklıdır",
      "ECDSA simetriktir",
      "Her ikisi de RSA tabanlıdır",
    ],
    answer: 1,
    why: "Ed25519 (EdDSA) ve ECDSA (secp256k1) ayrı imza şemalarıdır.",
  },
  {
    text: "Anahtar kullanım ayrımı (key usage separation) neden önerilir?",
    options: [
      "Yönetim zor olsun diye",
      "İmza ve şifreleme anahtarlarını ayırarak riskleri sınırlamak için",
      "TPS’yi artırmak için",
      "UI sadeleştirmek için",
    ],
    answer: 1,
    why: "Bir anahtarın ele geçirilmesi tüm işlevleri etkilemesin diye kullanım yetkileri ayrılır.",
  },
  {
    text: "KDF (Key Derivation Function) örneklerinden hangisi modern ve parola türetmede önerilir?",
    options: ["MD5", "PBKDF2/Scrypt/Argon2", "CRC32", "SHA-1"],
    answer: 1,
    why: "Argon2/Scrypt/PBKDF2 hesaplama/bellek maliyetleri ile kaba kuvveti zorlaştırır.",
  },
  {
    text: "Salt neden kullanılır?",
    options: [
      "İmzayı hızlandırmak",
      "Aynı parolaların aynı çıktıyı üretmesini engelleyip sözlük saldırılarını zorlaştırmak",
      "Rengi değiştirmek",
      "TLS’i devre dışı bırakmak",
    ],
    answer: 1,
    why: "Salt, önceden hesaplanmış tablo saldırılarını etkisizleştirir.",
  },
  {
    text: "Donanım cüzdanlarının (hardware wallet) temel güvenlik avantajı nedir?",
    options: [
      "İmzayı bulutta yapması",
      "Özel anahtarı cihaz dışına çıkarmadan imza atması",
      "Seed’i tarayıcıda saklaması",
      "PIN gerektirmemesi",
    ],
    answer: 1,
    why: "Anahtarlar güvenli öğede kalır; işlemler cihaz içinde imzalanır.",
  },
  {
    text: "Air-gapped imzalama ne demektir?",
    options: [
      "Wi-Fi hızlandırma",
      "İmza işleminin fiziksel olarak ağa bağlı olmayan bir cihazda yapılması",
      "Proxy iptal",
      "DNS tünelleme",
    ],
    answer: 1,
    why: "Ağdan izole cihaz saldırı yüzeyini düşürür.",
  },
  {
    text: "Sertifika iptali için kullanılan mekanizmalardan biri değildir:",
    options: [
      "CRL (Certificate Revocation List)",
      "OCSP",
      "CSR",
      "OCSP stapling",
    ],
    answer: 2,
    why: "CSR sertifika talep dosyasıdır; iptal mekanizması CRL/OCSP’dir.",
  },
];

export default questions;
