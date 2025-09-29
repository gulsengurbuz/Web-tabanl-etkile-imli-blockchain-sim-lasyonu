


const questions = [
  
  {
    text: "Bir blok başlığında (block header) zorunlu olmayan alan hangisidir?",
    options: [
      "Önceki blok hash’i",
      "Merkle kökü",
      "Nonce",
      "Tüm işlemlerin ham verisi",
    ],
    answer: 3,
    why: "İşlemlerin ham verisi gövdededir; başlıkta önceki hash, merkle root, versiyon, zaman damgası, bits, nonce bulunur.",
  },
  {
    text: "Aşağıdakilerden hangisi blok gövdesinde yer alır?",
    options: ["Versiyon", "Zaman damgası", "İşlem listesi", "Bits"],
    answer: 2,
    why: "Gövde işlemleri taşır; diğerleri başlıkta yer alır.",
  },
  {
    text: "Merkle kökü neyin özetidir?",
    options: [
      "Sadece coinbase işlemi",
      "Tüm işlemlerin Merkle ağacıyla birleştirilmiş kök özeti",
      "Önceki blok başlığının özeti",
      "Madencinin kimliği",
    ],
    answer: 1,
    why: "Merkle kök, bloktaki tüm işlemlerin (coinbase dahil) kök hash’idir.",
  },
  {
    text: "Nonce alanının temel amacı nedir?",
    options: [
      "İşlem sırası tutmak",
      "Zaman damgası üretmek",
      "Hash hedefinin altına düşecek çıktı bulmak için sayaç olmak",
      "Ağı senkronize etmek",
    ],
    answer: 2,
    why: "PoW tahminlerinde farklı hash’ler denemek için değiştirilir.",
  },
  {
    text: "Bits alanı blokta neyi temsil eder?",
    options: [
      "İşlem sayısı",
      "Zorluk hedefinin kompakt gösterimi",
      "Madenci ödül adresi",
      "Blok boyutu",
    ],
    answer: 1,
    why: "Bits, target (hedef) değerinin sıkıştırılmış bir gösterimidir.",
  },
  {
    text: "Bitcoin’de blok hash’i nasıl üretilir?",
    options: [
      "Başlığın tek SHA-256 özeti",
      "İşlemler + başlık birlikte tek SHA-256",
      "Başlığın çift (double) SHA-256 özeti",
      "Merkle kökün SHA-1 özeti",
    ],
    answer: 2,
    why: "Blok başlığı iki kez SHA-256’dan geçirilir.",
  },
  {
    text: "Coinbase işlemi için doğru ifade hangisidir?",
    options: [
      "Her zaman ikinci sırada yer alır",
      "Girdi olarak önceki bir UTXO harcar",
      "Madencinin blok ödülü ve ücretleri aldığı özel işlemdir",
      "Sadece testnet’te kullanılır",
    ],
    answer: 2,
    why: "Coinbase, girdi referansı olmayan özel bir işlemdir; ödül + ücretler buradan tahsis edilir.",
  },
  {
    text: "Genesis (blok 0) hakkında doğru ifade:",
    options: [
      "Önceki blok hash’i alanı sıfırlarla doludur",
      "Merkle kökü bulunmaz",
      "Coinbase içeremez",
      "Zaman damgası alanı yoktur",
    ],
    answer: 0,
    why: "Genesis’in önceki referansı yoktur; konvansiyon gereği sıfırdır.",
  },
  {
    text: "Blok yüksekliği (height) en iyi nasıl tanımlanır?",
    options: [
      "Blok boyutu",
      "Zincirdeki sıra numarası",
      "İşlem sayısı",
      "Madencinin hash oranı",
    ],
    answer: 1,
    why: "Genesis = 0 olacak şekilde zincirdeki konumsal sıra numarasıdır.",
  },
  {
    text: "Üzerine yeni bloklar eklendikçe blok için ne söylenir?",
    options: [
      "Stale blok",
      "Geçersiz blok",
      "Onay derinliği artar (confirmed)",
      "Yetim blok",
    ],
    answer: 2,
    why: "Her yeni blok eklenmesi onay sayısını (confirmations) artırır.",
  },

  
  {
    text: "Merkle ağacı hangi avantajı sağlar?",
    options: [
      "O(1) doğrulama süresi",
      "Kısmi veri (SPV) ile üyelik kanıtı",
      "Blok boyutunu otomatik küçültme",
      "Çatallaşmayı önleme",
    ],
    answer: 1,
    why: "Merkle proof, tüm blok verisi olmadan bir işlemin o blokta olduğunu kanıtlar.",
  },
  {
    text: "Temel blok doğrulamada gerekli olmayan adım hangisidir?",
    options: [
      "Başlık hash’inin hedefin altında olması",
      "Önceki blok hash’inin bilinen blokla eşleşmesi",
      "Her işlemin geçerliliği",
      "Madencinin coğrafi konumunun doğrulanması",
    ],
    answer: 3,
    why: "Coğrafya önemli değildir; diğerleri çekirdek doğrulamadır.",
  },
  {
    text: "Zorluk artarsa tipik olarak ne olur?",
    options: [
      "Geçerli blok bulmak kolaylaşır",
      "Geçerli blok bulmak zorlaşır",
      "Nonce alanı kaldırılır",
      "Merkle kökü sabitlenir",
    ],
    answer: 1,
    why: "Hedef küçülür; geçerli hash bulmak istatistiksel olarak zorlaşır.",
  },
  {
    text: "Zaman damgası (timestamp) için en doğru ifade hangisi?",
    options: [
      "Mutlak gerçek zamandır",
      "Madenci belirler; kurallarla makul aralıkta kalmalı",
      "Cüzdanlar rastgele atar",
      "Sadece doğrulama düğümleri günceller",
    ],
    answer: 1,
    why: "Madenci verir; protokol kabul edilebilir sınırları kontrol eder.",
  },
  {
    text: "Blok boyutunu doğrudan etkileyen faktör:",
    options: [
      "İşlem sayısı ve veri büyüklüğü",
      "Nonce",
      "Bits",
      "Blok yüksekliği",
    ],
    answer: 0,
    why: "Esasen içerilen işlem verilerinin toplamına bağlıdır.",
  },
  {
    text: "Önceki blok hash’i alanı ne sağlar?",
    options: [
      "Gevşek bağ",
      "Zincir bütünlüğü ve değişime direnç",
      "PoS doğrulaması",
      "UTXO setinin otomatik güncellenmesi",
    ],
    answer: 1,
    why: "Her blok öncekinin hash’ini referanslar; zinciri kriptografik bağlar.",
  },
  {
    text: "Stale/Orphan blok için doğru ifade:",
    options: [
      "Kurallara uymadığı için geçersizdir",
      "Geçerli olsa da kısa dalda kaldığı için ana zincire girememiştir",
      "Hiç işlem içermez",
      "Coinbase’i yoktur",
    ],
    answer: 1,
    why: "Yarış sonucu ana dal dışında kalan, yine de geçerli bloktur.",
  },
  {
    text: "İşlem sırası Merkle kökünü etkiler mi?",
    options: [
      "Hayır, kök aynıdır",
      "Evet, farklı sıralama farklı kök üretir",
      "Sadece coinbase sırası etkiler",
      "Sadece çift sıradaki işlemler etkiler",
    ],
    answer: 1,
    why: "Merkle kök sıralamaya duyarlıdır.",
  },
  {
    text: "Blok versiyon alanı ne için kullanılır?",
    options: [
      "Zorluk hedefini değiştirmek",
      "Protokol/özellik aktivasyonu için sinyal taşımak",
      "Madenci kimliğini doğrulamak",
      "İşlem ücretlerini belirlemek",
    ],
    answer: 1,
    why: "BIP’lere dair sinyalleşme için kullanılabilir.",
  },
  {
    text: "İşlem ücretleri blokta nereye yansır?",
    options: [
      "Ayrı bir başlık alanına",
      "Madencinin coinbase çıktısına",
      "Merkle köküne",
      "Bits alanına",
    ],
    answer: 1,
    why: "Ücretler coinbase çıktısına eklenir.",
  },

  
  {
    text: "SegWit sonrası Bitcoin’de blok kapasitesini ölçmek için kullanılan metrik hangisidir?",
    options: ["Byte", "Satoshi", "Weight (ağırlık) birimi", "Gas"],
    answer: 2,
    why: "SegWit ile blok kapasitesinde weight (4M weight unit üst sınır) kullanılır.",
  },
  {
    text: "Blok weight neden ‘4 milyon weight unit’ üst sınırına sahiptir?",
    options: [
      "Rastgele seçildi",
      "Eski boyut sınırıyla uyumlu olacak şekilde tanımlanan hesaplama modelinin sonucu",
      "Madencinin tercihine bırakılır",
      "Yalnızca testnet’e özgüdür",
    ],
    answer: 1,
    why: "SegWit tasarımı, eski 1 MB sınırıyla geriye uyumlu olacak ağırlık modelini tanımlar.",
  },
  {
    text: "SegWit’te ‘witness’ verisi nereye dâhildir?",
    options: [
      "Doğrudan başlığa",
      "Gövdeye, ancak txid hesabına dâhil değil",
      "Sadece coinbase’e",
      "Merkle kökü yerine geçer",
    ],
    answer: 1,
    why: "Witness verisi gövdededir; txid hesaplamasına dâhil edilmez (wtxid ayrı).",
  },
  {
    text: "‘txid’ ile ‘wtxid’ arasındaki fark için en doğru ifade hangisi?",
    options: [
      "Aynıdır",
      "txid, witness verisi olmadan; wtxid, witness dâhil hesaplanır",
      "txid sadece coinbase içindir",
      "wtxid sadece testnet’te hesaplanır",
    ],
    answer: 1,
    why: "SegWit’te txid (witness hariç), wtxid (witness dahil) olarak ayrışır.",
  },
  {
    text: "SegWit bloklarında witness verisi ile ilişkili taahhüt (commitment) nereye gömülüdür?",
    options: [
      "Başlığa ayrı alan olarak",
      "Coinbase işleminin bir çıkışındaki OP_RETURN verisine",
      "Önceki blok hash’i yerine",
      "Merkle kökü yerine",
    ],
    answer: 1,
    why: "Witness commitment, coinbase’deki özel bir OP_RETURN çıktısında yer alır.",
  },

  
  {
    text: "Standart Bitcoin blok başlığının boyutu kaç bayttır?",
    options: ["64 bayt", "80 bayt", "256 bayt", "1 KB"],
    answer: 1,
    why: "Sabit 80 bayttır: versiyon(4)+prevhash(32)+merkleroot(32)+time(4)+bits(4)+nonce(4).",
  },
  {
    text: "BIP34 ile birlikte coinbase içinde hangi bilgi zorunlu hale geldi?",
    options: [
      "Madencinin IP adresi",
      "Blok yüksekliği (height)",
      "Merkle kökü",
      "Zorluk hedefi",
    ],
    answer: 1,
    why: "BIP34, coinbase scriptSig içinde blok yüksekliğinin kodlanmasını zorunlu kılar.",
  },
  {
    text: "Headers-first (önce başlıklar) senkronizasyonu neden kullanışlıdır?",
    options: [
      "İşlem ücretlerini hesaplar",
      "Tam gövde indirmeden zincir yapısını ve PoW’u hızlıca doğrular",
      "UTXO setini anında kurar",
      "Cüzdan adreslerini indeksler",
    ],
    answer: 1,
    why: "Önce başlıklar indirilerek en yoğun iş (PoW) zinciri hızlıca belirlenir.",
  },
  {
    text: "Compact Blocks (BIP152) özelliğinin temel amacı nedir?",
    options: [
      "Blok ağırlığını artırmak",
      "Blok yayılımı sırasında bant genişliği kullanımını azaltmak",
      "PoW’u kaldırmak",
      "Zincir çatallaşmasını önlemek",
    ],
    answer: 1,
    why: "Kısa özetler ve tahminle eşleştirme ile ağ trafiğini azaltır, yayılımı hızlandırır.",
  },
  {
    text: "Bir blokta coinbase dışında hiç işlem olmaması…",
    options: [
      "Bloku geçersiz yapar",
      "Geçerlidir; ‘empty block’ olarak adlandırılır",
      "Sadece testnet’te mümkündür",
      "Zorluk ayarlamasını tetikler",
    ],
    answer: 1,
    why: "Geçerlidir; bazı durumlarda ağda coinbase dışında işlem eklenmeden blok çıkarılabilir.",
  },
  {
    text: "Blok başlığındaki zaman damgası kurallara aykırı derecede ileri/geri olursa ne olur?",
    options: [
      "Düğüm kendi saatini değiştirir",
      "Blok reddedilebilir veya geçici olarak bekletilebilir",
      "Otomatik düzeltme yapılır",
      "Sadece uyarı verilir ama kabul edilir",
    ],
    answer: 1,
    why: "Kurallar makul pencereler tanımlar; dışına taşan zaman damgaları kabul edilmeyebilir.",
  },
  {
    text: "Bir blokta aynı işlemin iki kez yer alması…",
    options: [
      "Geçerli sayılır",
      "Geçersizdir (çift dahil etme), düğümler reddeder",
      "Sadece SegWit’te mümkündür",
      "Sadece coinbase için geçerlidir",
    ],
    answer: 1,
    why: "Aynı işlemin iki kez yer alması geçersiz kural ihlalidir.",
  },
  {
    text: "Önceki blok hash’i yanlış bir bloğa işaret ederse sonuç nedir?",
    options: [
      "Sadece uyarı",
      "Blok geçersiz sayılır",
      "Otomatik düzeltme",
      "Coinbase ödülü yarıya düşer",
    ],
    answer: 1,
    why: "Zincir bağlantısı bozulur, düğümler bloğu reddeder.",
  },
  {
    text: "Madenci, geçerli bir header hash’i bulsa da gövdeyi yayınlamazsa ağ neyi doğrulayamaz?",
    options: [
      "Zaman damgasını",
      "Önceki hash’i",
      "İşlem geçerliliklerini ve Merkle üyeliğini",
      "Bits değerini",
    ],
    answer: 2,
    why: "Gövde olmadan işlemler ve Merkle kanıtı doğrulanamaz.",
  },
];

export default questions;
