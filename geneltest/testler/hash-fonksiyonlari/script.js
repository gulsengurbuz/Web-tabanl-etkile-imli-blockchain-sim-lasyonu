


const questions = [
  {
    text: "Kriptografik hash fonksiyonlarının ayırt edici bir özelliği hangisidir?",
    options: [
      "Geri dönüşümlü olması",
      "Sabit uzunlukta çıktı üretmesi",
      "Daima rastgele çıktı vermemesi",
      "Salt gerektirmemesi",
    ],
    answer: 1,
    why: "Hash’ler, giriş uzunluğundan bağımsız sabit uzunlukta özet üretir.",
  },
  {
    text: "‘Çarpışma direnci’ (collision resistance) neyi ifade eder?",
    options: [
      "Aynı girdiden farklı çıktı üretilmesini",
      "İki farklı girdinin aynı özeti üretmesinin pratikte zor oluşunu",
      "Hash’in geri döndürülememesini",
      "Salt kullanımını",
    ],
    answer: 1,
    why: "İki farklı mesaj için aynı özeti bulmak hesapça zor olmalıdır.",
  },
  {
    text: "‘Ön-görüntü direnci’ (preimage resistance) için doğru ifade:",
    options: [
      "Verilen özete karşılık gelen bir mesajı bulmanın zor olması",
      "Aynı girdinin aynı çıktıyı üretmesi",
      "Salt gerektirmesi",
      "Mesajdan özet üretmenin zor olması",
    ],
    answer: 0,
    why: "H(M)=y verildiğinde M’yi bulmak pratikte mümkün olmamalıdır.",
  },
  {
    text: "‘İkinci ön-görüntü direnci’ (second preimage) neyi zorlaştırır?",
    options: [
      "H(M)=y veren ilk M’yi bulmayı",
      "Verilen M için aynı özeti veren farklı M'’yi bulmayı",
      "Hash’i geri döndürmeyi",
      "Salt üretmeyi",
    ],
    answer: 1,
    why: "M1 sabitken M2≠M1 ve H(M2)=H(M1) bulmak zor olmalıdır.",
  },
  {
    text: "Avalanche (çığ) etkisi nedir?",
    options: [
      "Çıktının her zaman sıfır olması",
      "Girişteki küçük bir değişikliğin çıktıda büyük değişim üretmesi",
      "Hash’in sıkıştırma yapmaması",
      "Salt’ın artması",
    ],
    answer: 1,
    why: "İyi bir hash fonksiyonu tek bit değişiminde bile çıktıyı büyük ölçüde değiştirir.",
  },
  {
    text: "Aşağıdakilerden hangisi kırılmış/önerilmeyen hash’e örnektir?",
    options: ["SHA-256", "SHA-3", "BLAKE2", "MD5"],
    answer: 3,
    why: "MD5 ve SHA-1 çarpışma saldırılarına açıktır; modern kullanımda önerilmez.",
  },
  {
    text: "‘Doğrulama için hash’ ile ‘şifreleme’ arasındaki fark en iyi nasıl özetlenir?",
    options: [
      "Aynıdır",
      "Hash tek yönlüdür; şifreleme geri döndürülebilir (anahtarla çözülür)",
      "İkisi de geri döndürülemez",
      "Şifreleme sabit uzunlukta çıktı üretir",
    ],
    answer: 1,
    why: "Hash geri döndürülemez; şifreleme anahtarla çözülebilir.",
  },
  {
    text: "Parola saklama için doğru yaklaşım hangisine daha yakındır?",
    options: [
      "Düz metin/parolanın SHA-256’sını tek sefer almak",
      "Salt + yavaş KDF (PBKDF2/scrypt/Argon2) kullanmak",
      "MD5 ile hashlemek",
      "Veritabanında açık saklamak",
    ],
    answer: 1,
    why: "Salt + yavaş KDF kaba kuvvet ve rainbow table saldırılarını zorlaştırır.",
  },
  {
    text: "HMAC hangi amaçla kullanılır?",
    options: [
      "Sıkıştırma yapmak",
      "Anahtarlı bütünlük ve kimlik doğrulaması sağlamak",
      "Hash’leri geri döndürmek",
      "Salt üretmek",
    ],
    answer: 1,
    why: "HMAC(K, mesaj), gizli anahtar ile mesajın bütünlüğünü doğrular.",
  },
  {
    text: "‘Birthday saldırısı’ hangi özelliği hedef alır?",
    options: [
      "Preimage",
      "İkinci preimage",
      "Collision (çarpışma) bulma olasılığını",
      "Salt üretimini",
    ],
    answer: 2,
    why: "n-bit hash için çarpışma karmaşıklığı ≈ 2^(n/2) olur.",
  },
  {
    text: "n-bitlik bir hash fonksiyonunda yaklaşık çarpışma bulma karmaşıklığı nedir?",
    options: ["2^n", "2^(n/2)", "n", "log n"],
    answer: 1,
    why: "Doğum günü paradoksu nedeniyle çarpışma için 2^(n/2) denemeler beklenir.",
  },
  {
    text: "Aşağıdakilerden hangisi tipik olarak ‘anahtarsız’ hash kullanımına örnektir?",
    options: [
      "HMAC",
      "İçerik adresleme (dosya bütünlüğü için SHA-256)",
      "MAC doğrulaması",
      "Yetkilendirme belirteci üretimi",
    ],
    answer: 1,
    why: "Bütünlük/kimliklendirme için anahtarsız hash’ler kullanılabilir; kimlik doğrulama için HMAC gerekir.",
  },
  {
    text: "Hash + salt kombinasyonunda salt’ın temel amacı nedir?",
    options: [
      "Hash’i hızlandırmak",
      "Aynı parolaların aynı özeti üretmesini engelleyip rainbow table’ı etkisizleştirmek",
      "Çıktıyı uzatmak",
      "HMAC’in yerini almak",
    ],
    answer: 1,
    why: "Salt kullanıcıya özgü olduğunda önceden hesaplanmış tablolar işe yaramaz.",
  },
  {
    text: "‘Pepper’ nedir?",
    options: [
      "Rastgele IV",
      "Sunucu tarafında gizli tutulan ek bir sır ile parola hash’ini desteklemek",
      "Salt ile aynı şey",
      "RSA anahtarı",
    ],
    answer: 1,
    why: "Pepper, salt’tan farklı olarak gizlidir ve merkezi olarak korunur.",
  },
  {
    text: "SHA-3’ün temel yapısı nedir?",
    options: [
      "Merkle–Damgård",
      "Sünger (sponge) yapısı/Keccak",
      "Feistel ağı",
      "Diffie–Hellman",
    ],
    answer: 1,
    why: "SHA-3, Keccak sünger yapısını kullanır; emilim+sıkma aşamaları vardır.",
  },
  {
    text: "‘Length extension’ saldırıları hangi yapıda klasik olarak ortaya çıkar?",
    options: [
      "Sünger tabanlı (SHA-3) hash’lerde",
      "Merkle–Damgård tabanlı bazı hash’lerde (ör. MD5/SHA-1/SHA-256)",
      "BLAKE2’de",
      "HMAC’te",
    ],
    answer: 1,
    why: "Merkle–Damgård yapısında H(m‖pad‖x) hesapları üzerinden uzatma mümkündür; HMAC bu saldırıya dayanıklıdır.",
  },
  {
    text: "Dosya indirme bütünlüğünü doğrulamak için tipik pratik ne yapılır?",
    options: [
      "Dosya adını kontrol etmek",
      "Sağlanan SHA-256/SHA-512 checksum’u ile yereldeki hash’i karşılaştırmak",
      "Tarayıcı önbelleğini temizlemek",
      "Sadece boyuta bakmak",
    ],
    answer: 1,
    why: "Checksum karşılaştırması aktarım/bozulma ve kurcalamayı tespit eder.",
  },
  {
    text: "Merkle ağacı hash’leri hangi faydayı sağlar?",
    options: [
      "Sadece şifreleme",
      "Kısmi veri ile üyelik kanıtı ve ölçeklenebilir bütünlük kanıtı",
      "IV üretimi",
      "Salt oluşturma",
    ],
    answer: 1,
    why: "Merkle proof ile tüm veriyi indirmeden bir parçanın dahil olduğu kanıtlanır.",
  },
  {
    text: "İmza şemalarında hash neden kullanılır?",
    options: [
      "Mesajı kısaltıp sabit uzunluklu özetini imzalamak için",
      "İmzayı geri döndürmek için",
      "Anahtar üretmek için",
      "IV’yi saklamak için",
    ],
    answer: 0,
    why: "Büyük mesajları doğrudan imzalamak yerine özeti imzalanır; verim ve güvenlik sağlar.",
  },
  {
    text: "‘Hash pointer’ kavramı neyi ifade eder?",
    options: [
      "Sadece bellek adresi",
      "Bir yapıya (blok/kayıt) referansla birlikte o yapının hash’ini tutmak",
      "IP adresi",
      "Salt’ın adresi",
    ],
    answer: 1,
    why: "Hem konumu hem de içeriğin hash’ini taşıyarak kurcalamayı tespit etmeyi sağlar.",
  },
  {
    text: "Hash uzunluğunu kısaltmak (truncate) güvenli midir?",
    options: [
      "Her zaman",
      "Uygun tehdit modelinde ve yeterli bit güvenliği bırakıldığında",
      "Asla",
      "Sadece MD5’te",
    ],
    answer: 1,
    why: "Truncate edilmiş özetin bit sayısı güvenlik seviyesini belirler (örn. 256→128 bit).",
  },
  {
    text: "HKDF ile yalın hash arasındaki fark için doğru ifade:",
    options: [
      "Aynıdır",
      "HKDF, hash tabanlı bir anahtar türetme fonksiyonudur (extract+expand)",
      "HKDF sadece şifreleme yapar",
      "HKDF salt üretir",
    ],
    answer: 1,
    why: "HKDF, HMAC tabanlı olarak entropiyi çıkarır ve anahtarları genişletir.",
  },
  {
    text: "İçerik adresleme (ör. IPFS/CID) hash’i nasıl kullanır?",
    options: [
      "Dosya adını gizlemek için",
      "İçeriğin kendisini kimliklendirmek ve bütünlüğünü doğrulamak için",
      "DNS’i hızlandırmak için",
      "Şifre çözmek için",
    ],
    answer: 1,
    why: "Adres, içeriğin hash’idir; içerik değişirse adres de değişir.",
  },
];

export default questions;
