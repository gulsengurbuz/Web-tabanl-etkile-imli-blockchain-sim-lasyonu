


const questions = [
  {
    text: "Zaman damgasının (timestamping) temel amacı nedir?",
    options: [
      "Veriyi şifrelemek",
      "Bir verinin belirli bir zamanda mevcut olduğunu ispatlamak",
      "Bant genişliğini artırmak",
      "Renk profilini saklamak",
    ],
    answer: 1,
    why: "Timestamp, içerik + zaman arasındaki kriptografik bağı kanıtlar.",
  },
  {
    text: "RFC 3161’e göre bir TSA (Time-Stamp Authority) ne üretir?",
    options: [
      "Sertifika iptal listesi",
      "Timestamp Token (TST)",
      "CSR",
      "OCSP stapling",
    ],
    answer: 1,
    why: "TSA, hash’i imzalayarak zaman damgası belirten TST üretir.",
  },
  {
    text: "Zaman damgası tipik olarak neyin üzerine alınır?",
    options: [
      "Ham dosyanın tamamı",
      "Dosyanın hash/özeti",
      "Sadece dosya adı",
      "Sıkıştırılmış arşiv",
    ],
    answer: 1,
    why: "Hash, büyük veriyi taşımadan içerik bağını kurar.",
  },
  {
    text: "‘Trusted timestamping’ ile ‘blockchain timestamping’ arasındaki fark için doğru ifade:",
    options: [
      "Aynıdır",
      "TSA merkezidir; blockchain’de zaman bağı zincir ve konsensüsle dağıtık sağlanır",
      "Blockchain her zaman daha gizlidir",
      "TSA ücretsizdir",
    ],
    answer: 1,
    why: "TSA tek otorite; blockchain dağıtık güven modeline dayanır.",
  },
  {
    text: "Bitcoin blok başlığındaki ‘time’ alanı hakkında doğru ifade:",
    options: [
      "Mutlak gerçek zamanı temsil eder ve değiştirilemez",
      "Madenci tarafından seçilir; kurallara göre makul aralıkta olmalıdır",
      "Düğümler tarafından rastgele atanır",
      "Sadece testnet’te bulunur",
    ],
    answer: 1,
    why: "Madenci verir; düğümler kabul pencerelerini kontrol eder.",
  },
  {
    text: "Bitcoin’de ‘Median Time Past (MTP)’ ne için kullanılır?",
    options: [
      "Ücret hesaplamak",
      "Son 11 blok zamanının medyanı olarak kurallarda referans zaman sağlamak",
      "Nonce üretmek",
      "Merkle kökü hesaplamak",
    ],
    answer: 1,
    why: "MTP, saat manipülasyonunu sınırlayan istatistiksel referanstır.",
  },
  {
    text: "Blok zaman damgası çok ileri/geri olursa tipik sonuç nedir?",
    options: [
      "Düğümler bloğu reddedebilir veya geçici olarak bekletebilir",
      "Otomatik düzeltme yapılır",
      "Zorluk sıfırlanır",
      "Coinbase kaybolur",
    ],
    answer: 0,
    why: "Kabul pencereleri dışında zaman içeren bloklar geçersiz sayılabilir.",
  },
  {
    text: "RFC 3161 TST’nin doğrulanmasında gerekli olmayan adım hangisidir?",
    options: [
      "TSA sertifika zincirinin doğrulanması",
      "Hash’in tekrar hesaplanıp TST’dekiyle eşleşmesi",
      "TSA özel anahtarına erişim",
      "İmzanın geçerliliğinin kontrolü",
    ],
    answer: 2,
    why: "Doğrulama açık anahtar/zincir ile yapılır; özel anahtar gerekmez.",
  },
  {
    text: "Zaman damgası ile dijital imza birlikte ne kanıtlar?",
    options: [
      "Sadece gizlilik",
      "İçeriğin belirli bir zamanda mevcut olduğunu ve imzalayan tarafa bağlılığını",
      "Ücret miktarını",
      "Protokol sürümünü",
    ],
    answer: 1,
    why: "İmza: kimlik/bütünlük; timestamp: zamansal ispat sağlar.",
  },
  {
    text: "‘Anchoring’ (çapalama) neyi ifade eder?",
    options: [
      "Hash’i rastgele bir sunucuya göndermeyi",
      "Harici bir deftere (örn. blockchain) kök hash’i/kanıtı gömmeyi",
      "Dosyayı e-postayla göndermeyi",
      "NTP’yi kapatmayı",
    ],
    answer: 1,
    why: "Dış deftere yazılan özet, geniş çaplı doğrulanabilir zaman/mukayese sağlar.",
  },
  {
    text: "Monotonik saat (monotonic clock) neden önemlidir?",
    options: [
      "Renk geçişleri için",
      "Sistem saatindeki geri/ileri ayarlardan etkilenmeden süre ölçümü yapmak için",
      "Hash’i hızlandırmak için",
      "DNS çözümlemesi için",
    ],
    answer: 1,
    why: "Süre ölçümlerinde ‘duvar saati’ kaymalarının etkisini önler.",
  },
  {
    text: "NTP’nin rolü nedir?",
    options: [
      "Hash fonksiyonu seçmek",
      "Ağda saat senkronizasyonu sağlamak",
      "TLS sertifikası üretmek",
      "Merkle ağacını hesaplamak",
    ],
    answer: 1,
    why: "Doğru zaman, loglar ve protokoller için kritiktir.",
  },
  {
    text: "Log zaman damgalarında ‘append-only’ ilkesinin yararı nedir?",
    options: [
      "Depolamayı azaltır",
      "Geçmişin değiştirilmesini zorlaştırır ve denetimi kolaylaştırır",
      "Renk uyumu sağlar",
      "Şifrelemeyi kaldırır",
    ],
    answer: 1,
    why: "Eklemeli yapı değişiklik izini bırakır; adli analiz kolaylaşır.",
  },
  {
    text: "Bir dokümanın hash’i ve TSA’dan alınan TST birlikte saklanırsa elde edilen fayda:",
    options: [
      "Dosyanın içeriği gizlenir",
      "Belirli tarihte mevcut olduğu ve o zamandan beri değişmediği ispatlanabilir",
      "İmzanın gizliliği artar",
      "Gas ücreti düşer",
    ],
    answer: 1,
    why: "Hash aynı kalırsa içerik değişmemiştir; TST de zamanı kanıtlar.",
  },
  {
    text: "Blockchain’de blok zamanının ‘mutlak gerçek zaman’ olmamasının sonucu nedir?",
    options: [
      "Hiç doğrulama yapılamaz",
      "Uygulamalar zaman toleransları ve ek doğrulamalar (ör. MTP) kullanmalı",
      "Zincir durur",
      "Ücret artar",
    ],
    answer: 1,
    why: "Protokoller, saat sapmalarına tolerans tanır.",
  },
  {
    text: "Kod imzalama sertifikalarında zaman damgası (codesign timestamp) neden önemlidir?",
    options: [
      "Dosyayı sıkıştırır",
      "Sertifika süresi dolsa bile imzalandığı tarih geçerli kaldığını kanıtlamak için",
      "Uygulamayı hızlandırmak için",
      "UI teması için",
    ],
    answer: 1,
    why: "Timestamp, imzanın sertifika geçerli iken atıldığını gösterir.",
  },
  {
    text: "Bir zaman damgası kanıtının uzun vadeli geçerliliği için hangi yaklaşım uygundur?",
    options: [
      "Hiç arşivlememek",
      "Zincirleme yeniden damgalama (renewal) ve güçlü hash’lere gömme",
      "Salt eklemek",
      "Dosyayı yeniden adlandırmak",
    ],
    answer: 1,
    why: "Kriptografinin eskimesine karşı periyodik yeniden damgalama yapılır.",
  },
  {
    text: "Zaman damgası manipülasyonuna karşı log’larda hangi teknik yardımcıdır?",
    options: [
      "Rastgele sıralama",
      "Hash zincirleme (hash chaining) ve imzalama",
      "Dosya adını uzatma",
      "Renk kodları",
    ],
    answer: 1,
    why: "Her kayıt bir öncekine referansla hash’lenirse araya ekleme tespit edilir.",
  },
  {
    text: "Bir blok zincirinde işlem zamanının ‘blok onay zamanı’na göre değerlendirilmesindeki doğru çıkarım:",
    options: [
      "İşlem zamanı her zaman istemci saatidir",
      "İşlem, bloğa girdiği blok zamanından daha eski/sonra olarak kabul edilebilir; kesin duvar saati değildir",
      "Her zaman NTP ile aynıdır",
      "Hiçbir anlam taşımaz",
    ],
    answer: 1,
    why: "Blok zamanı referans alınır; gerçek dünya saatiyle birebir olmayabilir.",
  },
  {
    text: "E-posta/evrak akışlarında ‘counter-signing’ (karşı imzalama) neden kullanılır?",
    options: [
      "Renkli imza için",
      "Belgeye ek zaman damgaları/şahit imzaları ekleyerek süreç adımlarını kanıtlamak için",
      "Hash’i gizlemek için",
      "Dosyayı şifrelemek için",
    ],
    answer: 1,
    why: "İlerleyen adımlarda zamansal/kurumsal bağ güçlenir.",
  },
  {
    text: "Zaman damgalı bir verinin bütünlüğünü doğrularken ilk adım nedir?",
    options: [
      "Dosyayı renklendirmek",
      "Verinin hash’ini tekrar hesaplayıp kanıttaki özetle karşılaştırmak",
      "Sertifikayı silmek",
      "NTP’yi kapatmak",
    ],
    answer: 1,
    why: "İlk olarak içerik değişmemiş mi kontrol edilir; sonra imza/zincir doğrulanır.",
  },
  {
    text: "Blockchain tabanlı zaman damgasında ölçeklenebilirliği artırmak için tipik yöntem:",
    options: [
      "Her dosyayı zincire tam yazmak",
      "Birçok hash’i Merkle ağacında birleştirip kökünü zincire yazmak",
      "Sadece dosya adını yazmak",
      "Zaman alanını kaldırmak",
    ],
    answer: 1,
    why: "Merkle root tek kayıtla çok sayıda belgenin kanıtını taşır.",
  },
  {
    text: "Zaman damgası kanıtının üçüncü taraflara taşınabilir olmasını artıran uygulama nedir?",
    options: [
      "Özel, kapalı format",
      "Standartlaştırılmış token/format (örn. RFC 3161 TST, OpenTimestamps) kullanmak",
      "Sadece ekran görüntüsü",
      "Sözlü beyan",
    ],
    answer: 1,
    why: "Standartlar arası doğrulama ve uzun ömürlü kanıt paylaşımı sağlar.",
  },
];

export default questions;
