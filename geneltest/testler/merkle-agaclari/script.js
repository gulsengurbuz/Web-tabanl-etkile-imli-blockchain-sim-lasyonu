


const questions = [
  {
    text: "Merkle ağacı (hash tree) temel olarak neyi sağlar?",
    options: [
      "Şifre çözme",
      "Kısmi veriyle üyelik kanıtı ve ölçeklenebilir bütünlük doğrulaması",
      "Veri sıkıştırma",
      "Ağ gecikmesini azaltma",
    ],
    answer: 1,
    why: "Merkle proof ile tüm veriyi indirmeden bir öğenin sette olduğunu kanıtlayabilirsin.",
  },
  {
    text: "Merkle ağacında iç düğümler nasıl hesaplanır?",
    options: [
      "Toplama işlemiyle",
      "Alt düğümlerin hash’leri birleştirilip tekrar hash’lenerek",
      "Rastgele sayı üretilerek",
      "Yalnızca sol çocuğun kopyası alınarak",
    ],
    answer: 1,
    why: "Genelde parent = H(left ‖ right) şeklinde hesaplanır.",
  },
  {
    text: "Merkle kökü (root) nedir?",
    options: [
      "Yaprağın kendisi",
      "Tüm yapraklardan türetilen tek hash özeti",
      "Sadece coinbase’in hash’i",
      "Önceki blok hash’i",
    ],
    answer: 1,
    why: "Kök, ağacın en üst hash’idir ve tüm içeriği bağlar.",
  },
  {
    text: "Merkle kanıtı (proof) ne içerir?",
    options: [
      "Tüm ağaç",
      "İlgili yaprak ve yol üzerindeki kardeş hash’ler",
      "Sadece kök",
      "Salt değeri",
    ],
    answer: 1,
    why: "Doğrulayıcı, yaprağı köke taşıyan yolun kardeş hash’leriyle kökü yeniden hesaplar.",
  },
  {
    text: "Merkle kanıtıyla doğrulama karmaşıklığı kaçıncı derecedendir?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
    answer: 1,
    why: "Yaprak sayısı n ise yol uzunluğu ≈ log2(n) kadar hash gerekir.",
  },
  {
    text: "İşlem sırası Merkle kökünü etkiler mi?",
    options: [
      "Etkilemez, kök sabittir",
      "Etkiler; farklı sıralama farklı kök üretir",
      "Sadece coinbase etkiler",
      "Sadece tek sayıdaki işlemler etkiler",
    ],
    answer: 1,
    why: "Kök, yaprakların sırasına duyarlıdır.",
  },
  {
    text: "Dengesiz (tek sayıda) yaprak olduğunda klasik yaklaşım nedir?",
    options: [
      "Kökü sıfıra çekmek",
      "Son yaprağı kopyalayarak eşleştirmek (padding/duplication)",
      "Ağacı silmek",
      "Rastgele hash eklemek",
    ],
    answer: 1,
    why: "İkili yapıyı korumak için son yaprak eşlenebilir (uygulamaya bağlı).",
  },
  {
    text: "Merkle ağaçları neden blok zincirlerde tercih edilir?",
    options: [
      "Şifre çözmeyi kolaylaştırdığı için",
      "Kısmi doğrulamayla bant/genişlik ve depolama verimliliği sağladığı için",
      "Hash’e ihtiyaç duymadığı için",
      "Kök her zaman 0 olduğu için",
    ],
    answer: 1,
    why: "SPV gibi tekniklerle hafif istemciler sadece başlık + proof ile doğrulayabilir.",
  },
  {
    text: "‘Merkleization’ ne demektir?",
    options: [
      "Veriyi şifrelemek",
      "Bir veri listesini Merkle ağacına dönüştürmek",
      "DNS güncellemek",
      "Salt oluşturmak",
    ],
    answer: 1,
    why: "Liste → yaprak hash’leri → iç düğümler → kök adımlarını kapsar.",
  },
  {
    text: "‘Hash collision’ olursa Merkle ağacının güvenliği nasıl etkilenir?",
    options: [
      "Hiç etkilenmez",
      "Aynı köke farklı içerikler bağlanabilir, güvenlik zayıflar",
      "Her zaman daha hızlı olur",
      "Kök çift uzunlukta olur",
    ],
    answer: 1,
    why: "Çarpışma direnci zayıfsa saldırgan alternatif içerik üretebilir.",
  },
  {
    text: "Merkle proof doğrulaması başarısız olursa çıkarım nedir?",
    options: [
      "Yaprak sette olmayabilir ya da veri/kanıt bozulmuştur",
      "Kök doğrudur",
      "Zincir kesin geçersizdir",
      "Salt eksiktir",
    ],
    answer: 0,
    why: "Yeniden hesaplanan kök uyuşmazsa üyelik kanıtı geçerli değildir.",
  },
  {
    text: "Bitcoin’de Merkle kökü nereye yazılır?",
    options: [
      "Blok gövdesi başına",
      "Blok başlığına",
      "Coinbase’e",
      "OP_RETURN’a",
    ],
    answer: 1,
    why: "Kök, blok başlığındaki alanlardan biridir.",
  },
  {
    text: "SegWit sonrası ‘wtxid’ kökü ile ‘txid’ kökü farkı nedir?",
    options: [
      "Aynıdır",
      "wtxid, witness dâhil; txid, witness hariç hesaplanır",
      "txid sadece coinbase’i içerir",
      "wtxid sadece testnet’te kullanılır",
    ],
    answer: 1,
    why: "Witness verisi wtxid ağacına dâhil edilir; txid ağacına edilmez.",
  },
  {
    text: "Merkle ağacında yaprak hash’i olarak tipik seçim nedir?",
    options: [
      "Salt edilmemiş düz metin",
      "Veri/işlem kayıtlarının kriptografik hash’i",
      "Sıfır dizisi",
      "Sadece zaman damgası",
    ],
    answer: 1,
    why: "Yapraklar veri özetleridir; iç düğümler bu özetlerin birleşimidir.",
  },
  {
    text: "Aşağıdakilerden hangisi Merkle ağacının bir çeşidi değildir?",
    options: [
      "Patricia (radix) Merkle tree",
      "Sparse Merkle tree",
      "AVL Merkle tree",
      "Bloom Merkle tree",
    ],
    answer: 3,
    why: "Bloom ağaç değildir; Bloom filter farklı bir yapılardır.",
  },
  {
    text: "Patricia Merkle ağaçları nerede popülerdir?",
    options: [
      "Bitcoin UTXO seti",
      "Ethereum durum (state)/hesap trie’ı",
      "IPFS bağlantıları",
      "TLS handshakeleri",
    ],
    answer: 1,
    why: "Ethereum, RLP-encoded key-value’lar için Merkle-Patricia trie kullanır.",
  },
  {
    text: "Sparse Merkle ağaçlarının avantajı nedir?",
    options: [
      "Düğümlerin tamamını saklamadan büyük anahtar alanında kanıt verebilmesi",
      "Hash gerektirmemesi",
      "Kanıtların O(n) olması",
      "Sadece sabit boyutlu setlerde çalışması",
    ],
    answer: 0,
    why: "Boş dallar varsayılan değerlerle temsil edilir; kanıtlar kısadır.",
  },
  {
    text: "Merkle kökünün değişmesi neyi gösterir?",
    options: [
      "Sistem zamanının değiştiğini",
      "Altındaki verilerden en az biri/sırası değiştiğini",
      "Nonce’un azaldığını",
      "Zorluk hedefinin arttığını",
    ],
    answer: 1,
    why: "Kök, tüm alt yapraklara fonksiyondur; küçük bir değişiklik kökü değiştirir.",
  },
  {
    text: "Bir Merkle kanıtı hangi durumda yeniden kullanılabilir?",
    options: [
      "Kök aynı kaldığı sürece",
      "Zincir boyutu arttıkça",
      "Hash fonksiyonu değiştiğinde",
      "Yaprak sayısı iki katına çıktığında",
    ],
    answer: 0,
    why: "Kanıt köke bağlıdır; kök değişirse kanıt geçersiz olur.",
  },
  {
    text: "Merkle ağacında hash fonksiyonu seçimi neden kritiktir?",
    options: [
      "Renk üretmek için",
      "Çarpışma/ön-görüntü direnci güvenliği doğrudan etkiler",
      "Sadece performansı etkiler, güvenliği etkilemez",
      "Ağaç yüksekliğini sabitler",
    ],
    answer: 1,
    why: "Zayıf hash, kökü manipüle etmeyi mümkün kılabilir.",
  },
  {
    text: "Merkle ağacı kullanmadan bütünlük nasıl kanıtlanabilir?",
    options: [
      "Tüm veriyi imzayla birlikte karşı tarafa göndermek",
      "Sadece dosya adını paylaşmak",
      "Zaman damgası almak",
      "Rastgele örnek göstermek",
    ],
    answer: 0,
    why: "Merkle yoksa karşı taraf tüm veriyi indirip tek bir hash’i kontrol etmek zorunda kalır.",
  },
  {
    text: "Merkle kökü + zaman damgası birlikte ne sağlar?",
    options: [
      "Gizlilik",
      "Belirli bir tarihteki veri koleksiyonunun bütünlük kanıtı",
      "Ücret hesaplama",
      "Nonce üretimi",
    ],
    answer: 1,
    why: "Kök, içeriği; zaman damgası, belirli tarihte varlığını kanıtlar.",
  },
  {
    text: "Light client (SPV) neden Merkle kanıtı ister?",
    options: [
      "Tüm blokları indirmek için",
      "Başlık + kanıtla işlemin blokta olduğunu doğrulamak için",
      "Zorluk hesaplamak için",
      "Nonce’u bulmak için",
    ],
    answer: 1,
    why: "Hafif istemci tüm gövdeyi tutmaz; üyelik kanıtına ihtiyaç duyar.",
  },
];

export default questions;
