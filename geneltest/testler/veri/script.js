


const questions = [
  {
    text: "Veri en doğru şekilde nasıl tanımlanır?",
    options: [
      "İşlenmiş ve yorumlanmış bilgi",
      "Ham, işlenmemiş gerçek/kayıtlar",
      "Sadece sayılar",
      "Sadece görseller",
    ],
    answer: 1,
    why: "Veri; metin, sayı, görüntü, sinyal gibi ham kayıtlardır. Bilgi, verinin işlenmiş hâlidir.",
  },
  {
    text: "Aşağıdakilerden hangisi yapısal veri örneğidir?",
    options: [
      "Serbest metin blog yazısı",
      "JPEG fotoğraf",
      "SQL tablosu",
      "Ham ses kaydı",
    ],
    answer: 2,
    why: "SQL tabloları şema (alan/satır) içeren yapısal veridir.",
  },
  {
    text: "Yarı-yapısal veri formatına en iyi örnek hangisidir?",
    options: ["TXT", "JSON", "RAW bit dizisi", "BMP"],
    answer: 1,
    why: "JSON anahtar-değer etiketlemesiyle yarı-yapısal veridir.",
  },
  {
    text: "Yapısal olmayan veriye örnek:",
    options: ["CSV", "XML", "Log satırı", "Video dosyası"],
    answer: 3,
    why: "Video, görüntü ve serbest metin gibi içerikler yapısal değildir.",
  },
  {
    text: "Veri kalitesi boyutlarından biri değildir:",
    options: ["Doğruluk", "Tutarlılık", "Güncellik", "Renk doygunluğu"],
    answer: 3,
    why: "Renk doygunluğu medya niteliğiyle ilgilidir; veri kalitesi metriği değildir.",
  },
  {
    text: "Veriden bilgiye dönüşüm için temel adım hangisidir?",
    options: ["Sıkıştırma", "Şifreleme", "Analiz/yorumlama", "Hash alma"],
    answer: 2,
    why: "Bilgi, verinin işlenmesi ve bağlama oturtulmasıyla elde edilir.",
  },
  {
    text: "Meta veri (metadata) nedir?",
    options: [
      "Verinin verisi (açıklayıcı bilgiler)",
      "Şifreli veri",
      "Kopya veri",
      "Hatalı veri",
    ],
    answer: 0,
    why: "Metadata; kaynak, tarih, biçim, sahiplik gibi açıklayıcı bilgileri içerir.",
  },
  {
    text: "Veri toplamada hatayı azaltan yaklaşım hangisidir?",
    options: [
      "Elle tekrar yazım",
      "Şema doğrulama ve zorunlu alanlar",
      "Rastgele alan adları",
      "Zamansız kayıt",
    ],
    answer: 1,
    why: "Doğrulama kuralları ve zorunlu alanlar eksik/yanlış girişleri azaltır.",
  },
  {
    text: "Nicel (quantitative) veri örneği hangisidir?",
    options: [
      "Sıcaklık ölçümü (°C)",
      "Ürün yorumları",
      "PNG görsel",
      "Podcast transkripti",
    ],
    answer: 0,
    why: "Nicel veri sayısaldır; nitel veri metin/görüntü gibi tanımlayıcıdır.",
  },
  {
    text: "Veri normalizasyonunun amacı nedir?",
    options: [
      "Depolamayı artırmak",
      "Tekrarlı/çelişkili kayıtları azaltıp tutarlılığı artırmak",
      "Şifrelemeyi kaldırmak",
      "Görselleştirme yapmak",
    ],
    answer: 1,
    why: "Normalizasyon, tekrarları ve anomali riskini azaltır.",
  },
  {
    text: "Aykırı değer (outlier) tespiti neden önemlidir?",
    options: [
      "Grafiği renklendirmek için",
      "Analiz sonuçlarını bozabilecek olağan dışı noktaları belirlemek için",
      "Veri hacmini büyütmek için",
      "Şifre çözmek için",
    ],
    answer: 1,
    why: "Aykırı değerler modeli yanıltabilir; tespit/inceleme gerekir.",
  },
  {
    text: "Veri bütünlüğünü doğrulamak için uygun teknik hangisidir?",
    options: [
      "Checksum/Hash",
      "Veri boyutunu büyütme",
      "Rastgele örnekleme",
      "Zaman damgasını silme",
    ],
    answer: 0,
    why: "Checksum/Hash aktarım/depoda bozulmayı tespit etmeye yarar.",
  },
  {
    text: "Veri yaşam döngüsü hangi sıraya en çok uyar?",
    options: [
      "Silme → Toplama → Analiz → Depolama",
      "Toplama → İşleme/Analiz → Depolama → Paylaşım/Arşiv → İmha",
      "Analiz → Toplama → İmha → Depolama",
      "Depolama → Toplama → Paylaşım → İmza",
    ],
    answer: 1,
    why: "Tipik akış: toplama, işleme/analiz, depolama, paylaşım/arşiv, gerektiğinde imha.",
  },
  {
    text: "Veri örnekleme (sampling) neden kullanılır?",
    options: [
      "Tüm veriyi yok etmek için",
      "Tüm veri yerine temsil gücü olan alt küme ile çalışmak için",
      "Hash fonksiyonunu hızlandırmak için",
      "Sadece görselleştirme için",
    ],
    answer: 1,
    why: "Büyük veri setlerinde maliyeti düşürüp hızlı analiz sağlar.",
  },
  {
    text: "Veri anonimleştirme tekniklerinden biri değildir:",
    options: [
      "Maskeleme",
      "Genelleştirme",
      "Pseudonimleştirme",
      "Rastgele ekran parlaklığı",
    ],
    answer: 3,
    why: "Ekran parlaklığı ile anonimleştirme ilgisizdir.",
  },
  {
    text: "Pseudonimleştirme ile anonimleştirme arasındaki fark:",
    options: [
      "Aynıdır",
      "Pseudonimleştirme geri eşlenebilir; anonimleştirme geri dönüşsüz hedefler",
      "Anonimleştirme geri eşlenebilir",
      "Pseudonimleştirme yasaktır",
    ],
    answer: 1,
    why: "Pseudonimler ek bilgiyle kimliğe bağlanabilir; anonimleştirme bağlanamazlık hedefler.",
  },
  {
    text: "Veri tutarlılığı (consistency) neyi ifade eder?",
    options: [
      "Verilerin anlamlı ve çelişkisiz olması",
      "Daha fazla renk",
      "Daha yüksek çözünürlük",
      "Daha uzun dosya adı",
    ],
    answer: 0,
    why: "Tutarlılık, alanlar arası mantıksal bütünlüğü ifade eder.",
  },
  {
    text: "Zaman serisi verisinde ‘mevsimsellik (seasonality)’ nedir?",
    options: [
      "Verinin hiç değişmemesi",
      "Düzenli aralıklarla tekrar eden desenler",
      "Rastgele gürültü",
      "Veri kaybı",
    ],
    answer: 1,
    why: "Örn. haftalık/aylık tekrar eden talep döngüleri.",
  },
  {
    text: "Eksik değer (missing value) yöntemlerinden değildir:",
    options: [
      "Silme (listwise/pairwise)",
      "Uygun imputasyon (ortalama/medyan/Model tabanlı)",
      "Rastgele sayı atayıp unutmak",
      "Alan uzmanı ile kurala dayalı doldurma",
    ],
    answer: 2,
    why: "Rastgele değer atamak yanlı/yanlış sonuçlara neden olabilir.",
  },
  {
    text: "Veri sürümleme (data versioning) neden önemlidir?",
    options: [
      "Renk paletini kaydetmek için",
      "Deneylerin tekrarlanabilirliği ve değişikliklerin izlenmesi için",
      "Şifrelemeyi bozmak için",
      "Dosya adını uzatmak için",
    ],
    answer: 1,
    why: "Model/analiz sonuçlarını tekrar üretmek ve izlemek için sürümleme gerekir.",
  },
  {
    text: "Veri yönetişimi (data governance) tipik olarak neyi kapsar?",
    options: [
      "Sadece UI teması",
      "Politikalar, roller, sahiplik, kalite ve güvenlik süreçleri",
      "Yalnızca ağ yönetimi",
      "Sadece cihaz bakımı",
    ],
    answer: 1,
    why: "Yönetişim; veri yaşam döngüsü ve sorumlulukları netleştirir.",
  },
  {
    text: "Veri kataloğu (data catalog) ne işe yarar?",
    options: [
      "Rastgele dosya siler",
      "Veri varlıklarını keşfetme, metadata ve sınıflandırma sağlar",
      "Şifreleri saklar",
      "Ağ gecikmesini düşürür",
    ],
    answer: 1,
    why: "Katalog; kaynakların bulunabilirliği ve yeniden kullanımını artırır.",
  },
  {
    text: "Veri geçerliliği (validation) hataları en iyi nasıl yakalanır?",
    options: [
      "Üretimde kullanıcı şikâyeti gelince",
      "Şema/kurallar ve otomatik testler ile erken aşamada",
      "Sadece manuel gözle",
      "Hiç kontrol etmeyerek",
    ],
    answer: 1,
    why: "Erken doğrulama hataları ucuza yakalar; üretimde düzeltmek pahalıdır.",
  },
];

export default questions;
