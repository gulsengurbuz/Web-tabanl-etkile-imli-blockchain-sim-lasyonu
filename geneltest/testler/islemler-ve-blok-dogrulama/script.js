


const questions = [
  
  {
    text: "Bir işlemin ücretini (fee) temel olarak nasıl hesaplarsın?",
    options: [
      "Çıktıların toplamı − Girdilerin toplamı",
      "Girdilerin toplamı − Çıktıların toplamı",
      "Her zaman sabit 1 birim",
      "Madencinin keyfine göre",
    ],
    answer: 1,
    why: "Ücret = Girdiler − Çıktılar. Fark madenciye (coinbase üzerinden) gider.",
  },
  {
    text: "UTXO modelinde ‘girdi (input)’ neyi referanslar?",
    options: [
      "Önceki bir işlemin belirli çıktısını (txid:vout)",
      "Kullanıcının bakiyesini",
      "Blok başlığını",
      "Cüzdan adını",
    ],
    answer: 0,
    why: "Her input önceki bir ‘unspent output’u harcar.",
  },
  {
    text: "‘Change output’ (para üstü) neden gerekir?",
    options: [
      "İşlem boyutunu artırmak için",
      "Girdinin tamamı harcanır; fazla kısım yeni bir çıktıyla geri döndürülür",
      "Ücreti sıfırlamak için",
      "Mempool’u atlamak için",
    ],
    answer: 1,
    why: "UTXO’lar bölünemez; fazla kısım change adresine gönderilir.",
  },
  {
    text: "Bir işlemin çift harcama (double-spend) olarak sayılması için:",
    options: [
      "Aynı girdinin birden fazla işlemde harcanması",
      "Aynı adrese iki kez ödeme yapılması",
      "İki farklı blok üretimi",
      "Farklı ücret kullanılması",
    ],
    answer: 0,
    why: "Aynı UTXO iki farklı işlemle harcanamaz.",
  },
  {
    text: "Dijital imza işlem doğrulamada neyi kanıtlar?",
    options: [
      "İşlemin gizliliğini",
      "İlgili girdinin harcanmasına yetkin olduğunu ve verinin değişmediğini",
      "Blok boyutunu",
      "Zincirin en uzun olduğunu",
    ],
    answer: 1,
    why: "İmza, sahiplik/harcama yetkisi ve bütünlüğü doğrular.",
  },
  {
    text: "İşlem boyut/weight’i ücreti neden etkiler?",
    options: [
      "Etkilemez",
      "Daha büyük veri daha çok bant/genişlik ve blok alanı kullanır; fiyat bu kaynağa göre belirlenir",
      "Blok süresi değişir",
      "Nonce yeniden hesaplanır",
    ],
    answer: 1,
    why: "Kaynak kıt; ücretler blok alanı talebine göre oluşur.",
  },

  
  {
    text: "nLockTime (mutlak kilit zamanı) ne sağlar?",
    options: [
      "İşlemin ancak belli bir zaman/blok yüksekliğinden sonra geçerli olması",
      "Ücreti sıfırlar",
      "İmzayı kaldırır",
      "Merkle kökünü değiştirir",
    ],
    answer: 0,
    why: "İşlem, locktime koşulu sağlanana dek madenciler tarafından dâhil edilmez.",
  },
  {
    text: "nSequence/BIP68 ile gelen ‘bağıl kilit zamanı’ (relative locktime) neyi ifade eder?",
    options: [
      "Her zaman mutlak zamanı",
      "Girdinin içinde bulunduğu işlem onayından itibaren belirli süre/blok beklemeyi",
      "Ücret tavanını",
      "Coinbase miktarını",
    ],
    answer: 1,
    why: "Relative locktime, girişe göre bekleme şartı koyar.",
  },

  
  {
    text: "‘Konsensüs kuralları’ ile ‘mempool politikaları’ arasındaki fark nedir?",
    options: [
      "Aynıdır",
      "Konsensüs kuralları ağın geçerlilik kurallarıdır; mempool politikaları ise düğümün kabul/öncelik verme tercihleri",
      "Her ikisi de sadece cüzdan ayarıdır",
      "Sadece testnet’te geçerlidir",
    ],
    answer: 1,
    why: "Konsensüs ihlali blok reddine yol açar; politika ihlali mempool’a girmemeyi etkiler.",
  },
  {
    text: "Replace-By-Fee (RBF) ne yapar?",
    options: [
      "Ücreti azaltır",
      "Daha yüksek ücretli bir sürümle mempool’daki bekleyen işlemi değiştirmeyi sağlar",
      "Blokları değiştirir",
      "İmzayı kaldırır",
    ],
    answer: 1,
    why: "RBF, onaylanmadan önceki işlemin daha yüksek ücretli versiyonunu kabul ettirebilir.",
  },
  {
    text: "Child-Pays-For-Parent (CPFP) stratejisinin amacı nedir?",
    options: [
      "Coinbase’i artırmak",
      "Düşük ücretli ebeveyn işlemi, yüksek ücretli bir çocuk işlemiyle birlikte madenciye kârlı hâle getirmek",
      "Locktime’ı düşürmek",
      "SegWit’i devre dışı bırakmak",
    ],
    answer: 1,
    why: "Bağımlı işlemler aynı anda dâhil edilerek toplam ücret/weight dengelenir.",
  },

  
  {
    text: "Blok doğrulamada ilk kontrol adımlarından biri hangisidir?",
    options: [
      "Tüm işlemleri yeniden imzalamak",
      "Başlığın PoW hedefine (target) uygun hash’e sahip olduğunun doğrulanması",
      "Kullanıcı arayüzünü güncellemek",
      "Mempool’u boşaltmak",
    ],
    answer: 1,
    why: "Header doğrulaması (versiyon, time, bits, nonce, prevHash) ilk bariyerdir.",
  },
  {
    text: "Blok doğrulamada ‘önceki blok hash’i’ neden kontrol edilir?",
    options: [
      "Renk teması için",
      "Zincir bütünlüğünü ve doğru ata–çocuk bağını sağlamak için",
      "Ücreti hesaplamak için",
      "Mempool’u sıralamak için",
    ],
    answer: 1,
    why: "Her blok bir öncekine işaret ederek zinciri oluşturur.",
  },
  {
    text: "Merkle kök kontrolü neden yapılır?",
    options: [
      "Blok süresini ayarlamak için",
      "Başlıktaki kökün, gövdedeki işlem listesinden hesaplanan kökle eşleştiğini doğrulamak için",
      "Ücretleri gizlemek için",
      "Sadece coinbase’i doğrulamak için",
    ],
    answer: 1,
    why: "Kök uyuşmazsa blok manipüle edilmiştir veya hatalıdır.",
  },
  {
    text: "Coinbase olgunlaşma (maturity) kuralı nedir?",
    options: [
      "Coinbase çıktısı hemen harcanabilir",
      "Coinbase çıktısı belirli sayıda onaydan (ör. 100 blok) önce harcanamaz",
      "Coinbase ücreti yoktur",
      "Her zaman iki coinbase vardır",
    ],
    answer: 1,
    why: "Olası yeniden düzenlemelere karşı güvenlik yastığıdır.",
  },
  {
    text: "Bir bloktaki işlemlerin geçerlilik kontrollerinden biri değildir:",
    options: [
      "Girdilerin geçerli ve harcanmamış olması",
      "İmzaların/kilit koşullarının sağlanması",
      "Toplam çıktıların toplam girdileri aşmaması",
      "Blok temasının koyu renk olması",
    ],
    answer: 3,
    why: "Diğer maddeler temel geçerlilik kurallarıdır.",
  },
  {
    text: "Blok boyutu/weight limiti aşılırsa sonuç nedir?",
    options: [
      "Blok onay sayısı artar",
      "Blok geçersizdir ve düğümler reddeder",
      "Madenci daha çok kazanır",
      "Locktime sıfırlanır",
    ],
    answer: 1,
    why: "Protokol limitleri aşılamaz; aşıldığında konsensüs ihlali olur.",
  },

  
  {
    text: "SegWit’te ‘txid’ ile ‘wtxid’ farkı için doğru ifade:",
    options: [
      "Aynıdır",
      "txid, witness hariç; wtxid, witness dâhil hesaplanır",
      "txid sadece coinbase içindir",
      "wtxid sadece testnet’te kullanılır",
    ],
    answer: 1,
    why: "Witness verisi ayrı kimlik (wtxid) ile temsil edilir.",
  },
  {
    text: "SegWit’in imza şekillendirilebilirliği (malleability) üzerindeki etkisi nedir?",
    options: [
      "Etkisi yoktur",
      "Birçok durumda şekillendirilebilirliği azaltır; üst katman/kanallar için avantaj sağlar",
      "Artırır",
      "Txid’i gizler",
    ],
    answer: 1,
    why: "İmzalar witness’e taşındığı için txid sabitlenir.",
  },

  
  {
    text: "‘Finallik’ (finality) PoW ağlarında neden olasılıksaldır?",
    options: [
      "Zincir hiç büyümez",
      "Daha uzun/yoğun iş kanıtlı dalın ortaya çıkma olasılığı vardır; onay arttıkça risk azalır",
      "Sadece mempool yüzünden",
      "İmzalar değişkendir",
    ],
    answer: 1,
    why: "Yeterli onay derinliği çift harcama riskini pratikte düşürür.",
  },
  {
    text: "51% saldırısının işlemlere etkisi ne olabilir?",
    options: [
      "İmzaları geçersiz kılar",
      "Geçmişe dönük alternatif bir tarih yazarak onaylı işlemleri tersine çevirebilir",
      "Yeni adres üretir",
      "Blok boyutunu artırır",
    ],
    answer: 1,
    why: "Daha yoğun iş kanıtlı zincir üretilirse önceki işlemler reorg ile iptal edilebilir.",
  },
  {
    text: "Bir işlemi yayınladıktan sonra onay beklerken riskini düşürmek için genel öneri nedir?",
    options: [
      "Ücreti sıfıra çekmek",
      "Yeterli onay sayısını beklemek ve/veya RBF/CPFP ile uygun ücret sağlamak",
      "İmzayı silmek",
      "Mempool’u kapatmak",
    ],
    answer: 1,
    why: "Onay derinliği + uygun ücret madenci dâhil etme olasılığını artırır.",
  },

  
  {
    text: "Standart (standard) işlem politikası neyi belirler?",
    options: [
      "Konsensüs geçerlilik kurallarını",
      "Düğümlerin mempool’da varsayılan olarak kabul ettiği script/işlem tiplerini",
      "Cüzdan temasını",
      "Blok süresini",
    ],
    answer: 1,
    why: "Standart olmayan işlem geçerli olsa bile varsayılan mempool’a girmeyebilir.",
  },
  {
    text: "Script doğrulamada hangi ifade doğrudur?",
    options: [
      "Script her zaman aynı çıktıyı üretir",
      "Koşullu kilitleme/açma (locking/unlocking) kuralları sağlanmazsa giriş harcanamaz",
      "İmza gerekmez",
      "Salt yeterlidir",
    ],
    answer: 1,
    why: "ScriptPubKey ve ScriptSig/Witness birlikte harcama koşullarını uygular.",
  },
];

export default questions;
