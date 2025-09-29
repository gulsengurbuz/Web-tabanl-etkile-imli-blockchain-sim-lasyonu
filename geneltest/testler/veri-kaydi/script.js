


const questions = [
  {
    text: "Veri kaydının (data recording) ilk tipik adımı hangisidir?",
    options: ["Arşivleme", "Toplama/edinme", "Silme", "Sıkıştırma"],
    answer: 1,
    why: "Önce veri toplanır/edinilir; ardından işlenir ve depolanır.",
  },
  {
    text: "Doğru ve izlenebilir veri kaydı için temel gereksinim nedir?",
    options: [
      "Rastgele format",
      "Doğrulanmış zaman damgası ve kaynak bilgisi",
      "Şifresiz metin",
      "Hiç log tutmamak",
    ],
    answer: 1,
    why: "Zaman ve kaynak doğrulaması, kaydın izlenebilirliğini garanti eder.",
  },
  {
    text: "Günlük (log) tutmanın birincil amacı nedir?",
    options: [
      "Veriyi gizlemek",
      "Olayları izlemek ve izlenebilirlik sağlamak",
      "Depolamayı artırmak",
      "Saldırı yapmak",
    ],
    answer: 1,
    why: "Loglar; olay akışını ve sistem davranışını geri izleyebilmeyi sağlar.",
  },
  {
    text: "Veri kaydında hata oranını düşürmek için önerilen yöntem hangisidir?",
    options: [
      "Elle tekrar yazım",
      "Zorunlu alanlar ve şema doğrulama",
      "Rastgele alan adları",
      "Serbest metin her yerde",
    ],
    answer: 1,
    why: "Zorunlu alan/şema kuralları eksik ve hatalı girişleri azaltır.",
  },
  {
    text: "Veri bütünlüğünü doğrulamak için kayıt sırasında ne kullanılabilir?",
    options: ["Renk kodu", "Hash/Checksum", "Rastgele ID", "Yalnızca tarih"],
    answer: 1,
    why: "Checksum/Hash veri bozulmalarını tespit etmeye yarar.",
  },
  {
    text: "Değiştirilemez günlükleme için doğru yaklaşım hangisine yakındır?",
    options: [
      "Üzerine yazma",
      "Append-only (eklemeli) loglama",
      "Rastgele silme",
      "CSV’yi e-posta ile yollama",
    ],
    answer: 1,
    why: "Append-only yapı, geçmiş kayıtlarda iz bırakır ve değişiklik takibini kolaylaştırır.",
  },
  {
    text: "Veri kaynağı (source) alanı neden tutulmalıdır?",
    options: [
      "Dosya boyutunu büyütmek için",
      "Kaydın nereden geldiğini izleyebilmek ve doğrulamak için",
      "UI rengi için",
      "Performansı düşürmek için",
    ],
    answer: 1,
    why: "Kaynak, güven ve doğrulama zinciri (chain of custody) için kritiktir.",
  },
  {
    text: "Kayıt formatı standardizasyonu ne sağlar?",
    options: [
      "Daha çok belirsizlik",
      "Karşılıklı çalışabilirlik ve kolay işleme",
      "Şifrelemeyi kaldırır",
      "Yedeklemeyi engeller",
    ],
    answer: 1,
    why: "Standart formatlar (JSON/CSV/Avro vb.) sistemler arası entegrasyonu kolaylaştırır.",
  },
  {
    text: "Zaman damgası doğruluğunu artırmak için ne önerilir?",
    options: [
      "Elle saat ayarı",
      "NTP/kurumsal saat senkronizasyonu",
      "Rastgele gecikme",
      "Hiç zaman alanı tutmamak",
    ],
    answer: 1,
    why: "Ağ zamanı senkronizasyonu tutarlı zaman damgaları üretir.",
  },
  {
    text: "Kimlik/oturum bilgisi olmadan kayıt tutmak hangi riski doğurur?",
    options: [
      "Daha az depolama",
      "İzleyen tarafın kim olduğunu bilememek ve adli analiz zorluğu",
      "Hız artışı",
      "Daha iyi gizlilik",
    ],
    answer: 1,
    why: "Kimin hangi işlemi yaptığını bilmek izlenebilirlik için gerekir.",
  },
  {
    text: "Veri kaydında PII (kişisel veriler) varsa ilk önlem ne olmalıdır?",
    options: [
      "Herkesle paylaşmak",
      "Maskeleme/anonimleştirme politikaları uygulamak",
      "Logları açık internete koymak",
      "Alanları genişletmek",
    ],
    answer: 1,
    why: "Kişisel veriler için gizlilik mevzuatı ve maskeleme zorunludur.",
  },
  {
    text: "Event (olay) tabanlı kayıt ile batch (yığın) kayıt arasındaki temel fark nedir?",
    options: [
      "Aynıdır",
      "Event gerçek zamanlı/akış odaklı; batch belirli aralıklarla toplu işlenir",
      "Batch daha gizlidir",
      "Event depolanamaz",
    ],
    answer: 1,
    why: "Event stream sürekli akar; batch periyodik toplu işlerle çalışır.",
  },
  {
    text: "İdempotent kayıt işlemi neyi garanti eder?",
    options: [
      "Her seferinde farklı sonuç",
      "Tekrarlanan isteğin aynı sonucu üretmesi",
      "İşlemi geri alınamaz kılma",
      "Zaman damgasını silme",
    ],
    answer: 1,
    why: "İdempotent işlem, aynı kaydın birden fazla yazılmasında tutarlılığı korur.",
  },
  {
    text: "Kayıtların benzersizliğini sağlamak için ne kullanılabilir?",
    options: [
      "Rastgele dizge",
      "Deterministik benzersiz ID (UUID/ULID) veya bileşik anahtar",
      "Zaman alanını silmek",
      "Dosya adı",
    ],
    answer: 1,
    why: "Benzersiz anahtarlar tekrar/çakışmaları engeller.",
  },
  {
    text: "Saha cihazlarından (IoT) veri kaydı yaparken hangi problem sık görülür?",
    options: [
      "Gecikme ve saat kayması",
      "Verinin aşırı düzenli olması",
      "Sınırsız bant genişliği",
      "Hiç paket kaybı olmaması",
    ],
    answer: 0,
    why: "Düşük bant genişliği ve saat sapmaları kayıt doğruluğunu etkiler.",
  },
  {
    text: "Şema evrimi (schema evolution) neden önemlidir?",
    options: [
      "Alan adlarını gizlemek için",
      "Zamanla değişen alan/tiplerle uyumlu kalmak için",
      "Depolamayı kapatmak için",
      "Hash’i kısaltmak için",
    ],
    answer: 1,
    why: "Yeni alanlar/versiyonlar eklense de eski kayıtlarla uyumu sürdürmek gerekir.",
  },
  {
    text: "Veri kaydında doğrulama hatalarını erken yakalamanın iyi yolu nedir?",
    options: [
      "Üretimde beklemek",
      "Giriş katmanında şema/regex/iş kuralı doğrulaması uygulamak",
      "Sadece manuel kontrol",
      "Hiç kontrol etmemek",
    ],
    answer: 1,
    why: "Erken doğrulama, maliyetli üretim hatalarını önler.",
  },
  {
    text: "Denetim izi (audit trail) nasıl olmalıdır?",
    options: [
      "Rastgele silinebilir",
      "Değiştirilemez ve zaman sıralı",
      "Kullanıcıyla paylaşılan düz metin",
      "Renkli",
    ],
    answer: 1,
    why: "Değiştirilemez, zaman sıralı audit trail adli analiz için esastır.",
  },
  {
    text: "Chain of custody (emanet zinciri) terimi neyi ifade eder?",
    options: [
      "Veriyi rastgele taşımayı",
      "Verinin elde edilmesinden saklanmasına kadar kim/nerede/nezaman bilgilerinin izini",
      "Sadece dosya adını",
      "Sadece hash uzunluğunu",
    ],
    answer: 1,
    why: "Kanıt/ kayıt bütünlüğü için el değiştirme ve süreçler kayıt altına alınır.",
  },
  {
    text: "Sahte/tekrar kayıtların (duplicates) önlenmesi için ne yapılabilir?",
    options: [
      "Hiçbir şey",
      "Benzersiz kısıt (unique constraint) veya doğal/bileşik anahtarlar kullanmak",
      "Zaman alanını kaldırmak",
      "Sadece görselleştirmek",
    ],
    answer: 1,
    why: "Unique constraint ve idempotent tasarım duplikasyonları engeller.",
  },
  {
    text: "Zaman serili kayıtlar için en doğru sıra alanı hangisidir?",
    options: [
      "Serbest metin",
      "Monoton artan olay zamanı (event_time) ve/veya alım zamanı (ingest_time)",
      "Kullanıcı adı",
      "Renk kodu",
    ],
    answer: 1,
    why: "Event time ve ingest time ikilisi geç/erken gelen olayları yönetmeyi kolaylaştırır.",
  },
  {
    text: "Veri kaydında güvenilirlik için hangi yaklaşım uygundur?",
    options: [
      "Tek kayıt noktası (SPOF)",
      "Çoklayarak (redundancy) ve kuyruk/ack mekanizmaları ile dayanıklılık",
      "Logları kapamak",
      "Saat senkronunu kapatmak",
    ],
    answer: 1,
    why: "Kuyruklama, tekrar deneme ve yedeklilik dayanıklılığı artırır.",
  },
];

export default questions;
