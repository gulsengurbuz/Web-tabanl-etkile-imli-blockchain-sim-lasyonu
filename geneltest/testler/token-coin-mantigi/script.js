


const questions = [
  
  {
    text: "‘Coin’ ile ‘token’ arasındaki temel fark nedir?",
    options: [
      "Coin bir L1’in yerel varlığıdır; token genelde bir platform üzerinde akıllı sözleşme ile ihraç edilir",
      "İkisi de aynıdır",
      "Token daima PoW ile çıkarılır",
      "Coin yalnızca oyunlarda kullanılır",
    ],
    answer: 0,
    why: "Coin: yerel para (BTC, ETH gibi). Token: ERC-20/721 vb. sözleşmelerle ihraç edilen varlık.",
  },
  {
    text: "Fungible (değiştirilebilir) varlık özelliği nedir?",
    options: [
      "Her birim diğerinden benzersizdir",
      "Her birim birbirinin eşdeğeridir (bölünebilir/aynı değerde)",
      "Aktarılamaz",
      "Sadece sanat eserleri için geçerlidir",
    ],
    answer: 1,
    why: "FT’lerde birimlerin ayırt edilmesi gerekmez; 1 token = 1 token.",
  },
  {
    text: "Aşağıdakilerden hangisi non-fungible (NFT) örneğine daha yakındır?",
    options: [
      "ERC-20 borsa tokenı",
      "Benzersiz dijital eser kaydı (ERC-721/1155)",
      "Stabil coin",
      "Gas token",
    ],
    answer: 1,
    why: "NFT’ler benzersiz kimlik taşıyan varlıklardır.",
  },
  {
    text: "‘Total supply’ ile ‘circulating supply’ arasındaki fark nedir?",
    options: [
      "Aynıdır",
      "Total, ihraç edilen toplam; circulating, piyasada dolaşan (kilitli/treasury hariç) miktardır",
      "Circulating her zaman toplamdan büyüktür",
      "Sadece NFT’lerde kullanılır",
    ],
    answer: 1,
    why: "Kilide tabi/rezerv tokenlar dolaşımdan hariç tutulabilir.",
  },

  
  {
    text: "ERC-20 arayüzünde yer alan tipik fonksiyon hangisidir?",
    options: [
      "ownerOf()",
      "approve() ve allowance()",
      "tokenURI()",
      "safeTransferFrom() (NFT)",
    ],
    answer: 1,
    why: "approve/allowance ERC-20 harcama yetkilendirmesi içindir; ownerOf/tokenURI ERC-721’e aittir.",
  },
  {
    text: "ERC-721 hangi kullanım için tasarlanmıştır?",
    options: [
      "Değiştirilebilir tokenlar",
      "Benzersiz varlıklar (NFT)",
      "Gas hesaplama",
      "Zincir kimliği",
    ],
    answer: 1,
    why: "ERC-721 tekil kimlikli varlık standardıdır.",
  },
  {
    text: "Bir ERC-20 tokenında ‘decimals’ alanı tipik olarak neyi ifade eder?",
    options: [
      "Toplam arzı",
      "Bölünebilirlik derecesini (ör. 18 ondalık)",
      "Sözleşme sürümünü",
      "Vergi oranını",
    ],
    answer: 1,
    why: "Kullanıcı arayüzleri nominal değerleri bu ayara göre gösterir.",
  },
  {
    text: "Allowance mantığı ne işe yarar?",
    options: [
      "Cüzdandan bağımsız transferleri bütünüyle engeller",
      "Belirli bir harcama yapan adrese belirli miktar harcama izni tanımlar",
      "Toplam arzı otomatik artırır",
      "Sözleşmeyi kilitler",
    ],
    answer: 1,
    why: "approve() ile spender’a limit tanımlanır; transferFrom() bu limiti kullanır.",
  },

  
  {
    text: "‘Mint’ işlemi nedir?",
    options: [
      "Token yakımı",
      "Yeni token üretimi/arz artışı",
      "Sadece adres kara listeleme",
      "Gas iadesi",
    ],
    answer: 1,
    why: "Protokol/sözleşme izin veriyorsa supply artar.",
  },
  {
    text: "‘Burn’ işlemi ne sağlar?",
    options: [
      "Arzı artırır",
      "Arzı azaltır; tokenları ulaşılmaz adrese/sıfır adrese gönderir",
      "Tokenları dondurur",
      "Sadece NFT’lerde çalışır",
    ],
    answer: 1,
    why: "Yakım deflasyonist etki yaratabilir.",
  },
  {
    text: "Enflasyonist token modeli ne demektir?",
    options: [
      "Arz zamanla azalır",
      "Arz zamanla artar (ör. ihraç/ödül)",
      "Arz sabittir",
      "Transferler yasaktır",
    ],
    answer: 1,
    why: "Emisyon/ödül mekanizmalarıyla supply büyür.",
  },
  {
    text: "EIP-1559’daki ‘base fee burn’ etkisi hangi sınıfa girer?",
    options: [
      "Saf enflasyonist",
      "Arz üzerinde deflasyonist baskı (yakım) oluşturabilir",
      "Arza etki etmez",
      "Sadece NFT’leri yakar",
    ],
    answer: 1,
    why: "Temel ücret yakılır; net ihraç bazen negatife dönebilir.",
  },

  
  {
    text: "Fiat teminatlı stabil coin yapısı için doğru ifade hangisi?",
    options: [
      "Tamamen teminatsızdır",
      "Zincir dışı rezervlerle 1:1 (veya oransal) destek, ihraççı gözetimi ve denetim raporları",
      "Sadece PoW ile basılır",
      "NFT standardına uyar",
    ],
    answer: 1,
    why: "Banka/emanetçi rezervleriyle itfa mekanizması bulunur.",
  },
  {
    text: "Kripto-teminatlı stabil coinlerde risk yönetimi nasıl yapılır?",
    options: [
      "Teminatsız bırakarak",
      "Aşırı teminat, likidasyon oranları, faiz/ceza parametreleri ile",
      "Sadece sabit kur ilanı ile",
      "IP filtreleme ile",
    ],
    answer: 1,
    why: "Volatiliteye karşı aşırı teminat ve otomatik likidasyon şarttır.",
  },
  {
    text: "Algoritmik stabil coinlerde temel zorluk nedir?",
    options: [
      "Her zaman aşırı teminat",
      "Talep şoklarında tutarlılık ve çöküş (death spiral) riski",
      "Gas ölçümü",
      "NFT likiditesi",
    ],
    answer: 1,
    why: "Saf algoritmik denge, stres dönemlerinde bozulabilir.",
  },

  
  {
    text: "‘Vesting’ neyi ifade eder?",
    options: [
      "Anında tam serbest dolaşım",
      "Belirli süre/koşullarla kademeli açılan token tahsisi",
      "Token yakımı",
      "Sözleşmenin devri",
    ],
    answer: 1,
    why: "Takımlar/erken yatırımcılar için kilit ve açılma takvimi konur.",
  },
  {
    text: "‘Cliff’ terimi hangi anlama gelir?",
    options: [
      "Sürekli açılma",
      "Belirli bir başlangıç süresi boyunca hiç açılmama, sonrasında vesting’in başlaması",
      "Toplam arz",
      "Sadece NFT metadata’sı",
    ],
    answer: 1,
    why: "Ön-cebin boşaltılmasını önlemek için başlangıçta bekleme süresi bulunur.",
  },
  {
    text: "‘Airdrop’ nedir?",
    options: [
      "Tokenların yakılması",
      "Belirli kriterleri sağlayan adreslere ücretsiz/dağıtım amaçlı token gönderimi",
      "Sadece borsada satış",
      "Gas iadesi",
    ],
    answer: 1,
    why: "Topluluk katılımını ödüllendirme/başlangıç dağıtım yöntemidir.",
  },
  {
    text: "Likidite madenciliği (liquidity mining) ne sağlar?",
    options: [
      "Tokenların dondurulması",
      "Likidite sağlayanlara protokol tokenı/ödül dağıtımı",
      "Sadece NFT basımı",
      "Ücreti sıfırlar",
    ],
    answer: 1,
    why: "Havuzlara sermaye çeken teşvik mekanizmasıdır.",
  },
  {
    text: "‘Token velocity’ neden önemlidir?",
    options: [
      "Tema seçimi için",
      "Aşırı devir hızı değer tutma baskısı yaratabilir; teşviklerle tutma/kullanım dengelenir",
      "Blok zamanı ölçümü için",
      "Gas tahmini için",
    ],
    answer: 1,
    why: "Yüksek hız, değer biriktirme tezini zayıflatabilir.",
  },

  
  {
    text: "‘Utility token’ ile ‘governance token’ farkı için doğru ifade:",
    options: [
      "Aynıdır",
      "Utility kullanım hakkı/erişim sağlar; governance protokol kararlarında oy hakkı verir",
      "Governance sadece NFT’dir",
      "Utility menkul kıymettir (her zaman)",
    ],
    answer: 1,
    why: "Fonksiyonlar farklıdır; bazı tokenlar her iki rolü de kısmen üstlenebilir.",
  },
  {
    text: "‘Security (menkul kıymet) token’ değerlendirmesinde hangi husus kritik olabilir?",
    options: [
      "Sadece logoyu beğenmek",
      "Bazı yargı bölgelerinde yatırım sözleşmesi testleri (örn. beklenen kâr, başkasının çabası)",
      "Gas limiti",
      "Sadece NFT standardı",
    ],
    answer: 1,
    why: "Uyum/hukuk çerçevesi yargı bölgesine göre değişir; düzenleyici değerlendirme gerekebilir.",
  },
  {
    text: "‘Wrapped’ varlık (ör. WBTC vb.) neyi ifade eder?",
    options: [
      "Tokenın yakılması",
      "Başka bir zincirde/standartta temsili varlık; saklayıcı/akıllı sözleşme karşılığıyla",
      "Sadece NFT kopyası",
      "Ücretsiz airdrop",
    ],
    answer: 1,
    why: "Köprü/emanet mekanizmasıyla 1:1 temsil oluşturulur.",
  },
  {
    text: "‘Bonding curve’ tabanlı ihraç modelinde fiyatlandırma nasıl olur?",
    options: [
      "Sabit",
      "Talep/artışa bağlı matematiksel eğriye göre mint/burn fiyatı belirlenir",
      "Rastgele",
      "Sadece OTC",
    ],
    answer: 1,
    why: "Likidite ve fiyat tek sözleşme eğrisi üzerinden yönetilir.",
  },
  {
    text: "Token tabanlı yönetişimde düşük katılım riskine karşı yöntemlerden biri değildir:",
    options: [
      "Oylama gücünü delege etme (delegation)",
      "Oylama teşvikleri ve quorum kuralları",
      "Sürüm yükseltmelerinde kilitli oylama pencereleri",
      "Oylamayı tamamen kapatmak",
    ],
    answer: 3,
    why: "Amaç katılımı artırmak ve meşruiyeti güçlendirmektir; oylamayı kapatmak çözüm değildir.",
  },
];

export default questions;
