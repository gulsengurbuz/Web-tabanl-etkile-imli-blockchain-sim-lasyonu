


const questions = [
  {
    text: "İlişkisel veritabanlarında temel mantıksal yapı hangisidir?",
    options: [
      "Belge (document)",
      "Tablo (table)",
      "Anahtar-değer çifti",
      "Dosya sistemi klasörü",
    ],
    answer: 1,
    why: "İlişkisel model satır/sütunlardan oluşan tablolarla ifade edilir.",
  },
  {
    text: "Aşağıdakilerden hangisi ilişki türü değildir?",
    options: [
      "Bire-bir (1:1)",
      "Bire-çok (1:N)",
      "Çoka-çok (N:M)",
      "Hashlenen (H:H)",
    ],
    answer: 3,
    why: "‘Hashlenen’ diye bir ilişki türü yoktur; diğerleri standart ilişkilerdir.",
  },
  {
    text: "Birincil anahtar (PRIMARY KEY) neyi garanti eder?",
    options: [
      "Benzersizlik ve NULL olmama",
      "Şifreleme",
      "İndekslenmeme",
      "Kayıtların şifreli saklanması",
    ],
    answer: 0,
    why: "PRIMARY KEY her satırın benzersiz kimliğidir ve NULL olamaz.",
  },
  {
    text: "Yabancı anahtar (FOREIGN KEY) kısıtı ne sağlar?",
    options: [
      "Sorguları hızlandırır",
      "Bütünlük: başka tablodaki anahtara referans doğrulaması",
      "Veri şifreleme",
      "Yedekleme",
    ],
    answer: 1,
    why: "Referential integrity ile tutarsızlıklar engellenir.",
  },
  {
    text: "Normalize etmenin ana amacı nedir?",
    options: [
      "Veriyi çoğaltmak",
      "Tekrarlı veriyi azaltıp anomaliyi önlemek",
      "Görselleştirme yapmak",
      "Şifrelemeyi kaldırmak",
    ],
    answer: 1,
    why: "Normalizasyon güncelleme/ekleme/silme anomalilerini azaltır.",
  },
  {
    text: "Aşağıdakilerden hangisi normal form değildir?",
    options: ["1NF", "2NF", "3NF", "HF"],
    answer: 3,
    why: "HF diye bir normal form yok; 1NF, 2NF, 3NF yaygındır.",
  },
  {
    text: "ACID’de ‘C’ hangi kavramdır?",
    options: [
      "Confidentiality",
      "Consistency (Tutarlılık)",
      "Compression",
      "Concurrency",
    ],
    answer: 1,
    why: "ACID: Atomicity, Consistency, Isolation, Durability.",
  },
  {
    text: "İzolasyon seviyelerinden biri değildir:",
    options: [
      "Read Uncommitted",
      "Read Committed",
      "Repeatable Read",
      "Write Uncommitted",
    ],
    answer: 3,
    why: "‘Write Uncommitted’ diye seviye yoktur.",
  },
  {
    text: "İndeks (index) ne sağlar?",
    options: [
      "Sorguları hızlandırır, yazmayı pahalılaştırabilir",
      "Depolamayı her zaman azaltır",
      "Şifrelemeyi değiştirir",
      "Sadece UNIQUE sağlar",
    ],
    answer: 0,
    why: "İndeks okuma hızını artırır ama ek/güncelleme maliyetini yükseltebilir.",
  },
  {
    text: "UNIQUE kısıtı neyi garanti eder?",
    options: [
      "Sütunda her değerin benzersiz olmasını",
      "NULL olmamasını",
      "Şifreli olmasını",
      "Yalnızca bir tabloyu",
    ],
    answer: 0,
    why: "UNIQUE, sütunda tekrar eden değerleri engeller (birden çok NULL’a izin verebilir).",
  },
  {
    text: "VIEW (görünüm) için doğru ifade hangisi?",
    options: [
      "Fiziksel tablodur",
      "Sanal tablodur; sorgu sonucunu temsil eder",
      "Sadece indekslerden oluşur",
      "Yedekleme dosyasıdır",
    ],
    answer: 1,
    why: "View, saklanan bir SELECT tanımıdır.",
  },
  {
    text: "Transaction (işlem) özelliği değildir:",
    options: [
      "Atomiklik",
      "Tutarlılık",
      "Geri alınamazlık zorunluluğu",
      "Dayanıklılık",
    ],
    answer: 2,
    why: "İşlemler başarısız olursa geri alınabilir (rollback).",
  },
  {
    text: "OLTP ve OLAP arasındaki fark için en doğru ifade:",
    options: [
      "Aynıdır",
      "OLTP işlem-odaklı; OLAP analitik/sorgu-odaklıdır",
      "Her ikisi de sadece raporlama içindir",
      "Sadece bellek içi çalışırlar",
    ],
    answer: 1,
    why: "OLTP kısa işlemleri, OLAP toplu ve kompleks analitiği hedefler.",
  },
  {
    text: "İlişkisel olmayan (NoSQL) veritabanı türlerinden biri değildir:",
    options: ["Belge (document)", "Graf", "Sütun-odaklı", "PDF tabanlı"],
    answer: 3,
    why: "PDF bir dosya biçimidir; veritabanı türü değildir.",
  },
  {
    text: "NoSQL hakkında doğru ifade hangisi?",
    options: [
      "Her zaman şemasızdır",
      "Belge/anahtar-değer/graf/sütun gibi farklı modelleri kapsar",
      "Sadece küçük veriler içindir",
      "ACID desteklemez",
    ],
    answer: 1,
    why: "NoSQL geniş bir yelpazedir; bazıları ACID de destekler.",
  },
  {
    text: "Sharding nedir?",
    options: [
      "Sıkıştırma algoritması",
      "Veriyi yatay parçalayarak ölçeklemek",
      "Şifreleme standardı",
      "Zamanlanmış yedekleme",
    ],
    answer: 1,
    why: "Büyük veri setleri parçalara ayrılarak dağıtılır.",
  },
  {
    text: "Replikasyonun faydası değildir:",
    options: [
      "Yük dengeleme",
      "Yüksek erişilebilirlik",
      "Felaket kurtarma",
      "İşlem ücretlerini artırma",
    ],
    answer: 3,
    why: "Replikasyon işlem ücreti kavramıyla ilgili değildir.",
  },
  {
    text: "Sorgu optimizasyonunda ‘EXPLAIN/EXPLAIN ANALYZE’ ne için kullanılır?",
    options: [
      "Veriyi şifrelemek",
      "Sorgunun yürütme planını görmek/iyileştirmek",
      "Backup almak",
      "Rol atamak",
    ],
    answer: 1,
    why: "Plan; tarama/indeks kullanımı, join stratejileri vb. gösterir.",
  },
  {
    text: "Denormalizasyon ne zaman tercih edilebilir?",
    options: [
      "Her zaman",
      "Okuma performansı için kontrollü veri tekrarına ihtiyaç olduğunda",
      "Şifreleme yapılmadığında",
      "Yedekleme yoksa",
    ],
    answer: 1,
    why: "Analitik/raporlama gibi okuma ağırlıklı senaryolarda faydalı olabilir.",
  },
  {
    text: "Stored Procedure/Function kullanımının avantajı değildir:",
    options: [
      "İş mantığını veritabanına yakın çalıştırma",
      "Ağ trafiğini azaltma",
      "Tüm güvenlik risklerini ortadan kaldırma",
      "Tekrarlanabilirlik",
    ],
    answer: 2,
    why: "Avantajları olsa da güvenlik risklerini tamamen ortadan kaldırmaz.",
  },
  {
    text: "CAP teoremi bağlamında ilişkisel veritabanları tipik olarak neyi hedefler?",
    options: ["CA (Tutarlılık + Erişilebilirlik)", "CP", "AP", "Hiçbiri"],
    answer: 0,
    why: "Klasik RDBMS’ler bölünme yok varsayımıyla CA tarafına daha yakındır.",
  },
  {
    text: "Sıralı büyük veri eklemelerinde hangi yapı performansı artırabilir?",
    options: [
      "B-tree indeks her zaman",
      "Clustered/heap düzeni, bölümlendirme (partitioning) ve uygun indeks",
      "Rastgele tetikleyiciler",
      "Sadece view",
    ],
    answer: 1,
    why: "Partitioning ve uygun indeksleme I/O’yu ve taramayı optimize eder.",
  },
  {
    text: "Saklı veri şifreleme (TDE) ne sağlar?",
    options: [
      "Uygulama katmanında şifreleme",
      "Disk/backup üzerinde şifreli saklama",
      "Ağ trafiğini şifreleme",
      "İşlem günlüğünü kapatma",
    ],
    answer: 1,
    why: "TDE depolama seviyesinde verinin çalınmasına karşı koruma sağlar.",
  },
];

export default questions;
