
export const QUIZ_INDEX = [
  {
    "id": 1,
    "slug": "veri",
    "title": "Veri — Mini Quiz"
  },
  {
    "id": 2,
    "slug": "veri-kaydi",
    "title": "Veri Kaydı — Mini Quiz"
  },
  {
    "id": 3,
    "slug": "veritabani",
    "title": "Veritabanı — Mini Quiz"
  },
  {
    "id": 4,
    "slug": "merkezi",
    "title": "Merkezi — Mini Quiz"
  },
  {
    "id": 5,
    "slug": "merkeziyetsiz",
    "title": "Merkeziyetsiz — Mini Quiz"
  },
  {
    "id": 6,
    "slug": "p2p",
    "title": "P2P — Mini Quiz"
  },
  {
    "id": 7,
    "slug": "dagitik-ag",
    "title": "Dağıtık Ağ — Mini Quiz"
  },
  {
    "id": 8,
    "slug": "anahtar-yonetimi",
    "title": "Anahtar Yönetimi — Mini Quiz"
  },
  {
    "id": 9,
    "slug": "hash-fonksiyonlari",
    "title": "Hash Fonksiyonları — Mini Quiz"
  },
  {
    "id": 10,
    "slug": "dijital-imza",
    "title": "Dijital İmza — Mini Quiz"
  },
  {
    "id": 11,
    "slug": "zaman-damgasi",
    "title": "Zaman Damgası — Mini Quiz"
  },
  {
    "id": 12,
    "slug": "blok-yapisi",
    "title": "Blok Yapısı — Mini Quiz"
  },
  {
    "id": 13,
    "slug": "merkle-agaclari",
    "title": "Merkle Ağaçları — Mini Quiz"
  },
  {
    "id": 14,
    "slug": "blockchain",
    "title": "Blockchain — Mini Quiz"
  },
  {
    "id": 15,
    "slug": "islemler-ve-blok-dogrulama",
    "title": "İşlemler ve Blok Doğrulama — Mini Quiz"
  },
  {
    "id": 16,
    "slug": "pow",
    "title": "Proof of Work (PoW) — Mini Quiz"
  },
  {
    "id": 17,
    "slug": "pos",
    "title": "Proof of Stake (PoS) — Mini Quiz"
  },
  {
    "id": 18,
    "slug": "public-blockchain",
    "title": "Açık (Public) Blockchain — Mini Quiz"
  },
  {
    "id": 19,
    "slug": "private-blockchain",
    "title": "Özel (Private) Blockchain — Mini Quiz"
  },
  {
    "id": 20,
    "slug": "konsorsiyum-blockchain",
    "title": "Konsorsiyum Blockchain — Mini Quiz"
  },
  {
    "id": 21,
    "slug": "hibrit-modeller",
    "title": "Hibrit Modeller — Mini Quiz"
  },
  {
    "id": 22,
    "slug": "fork",
    "title": "Çatallaşma (Fork) — Mini Quiz"
  },
  {
    "id": 23,
    "slug": "akilli-sozlesmeler",
    "title": "Akıllı Sözleşmeler — Mini Quiz"
  },
  {
    "id": 24,
    "slug": "token-coin",
    "title": "Token / Coin — Mini Quiz"
  },
  {
    "id": 25,
    "slug": "kullanim-alanlari",
    "title": "Blockchain Kullanım Alanları — Mini Quiz"
  }
];

export const QUESTIONS = {
  "veri": [
    {
      "q": "Veri nedir?",
      "choices": [
        {
          "text": "Ham olay/sinyal kayıtları",
          "correct": true
        },
        {
          "text": "Her zaman işlenmiş bilgi",
          "correct": false
        },
        {
          "text": "Sadece sayılar",
          "correct": false
        }
      ]
    },
    {
      "q": "Aşağıdakilerden hangisi yapısal veriye örnektir?",
      "choices": [
        {
          "text": "CSV/SQL tablo",
          "correct": true
        },
        {
          "text": "Serbest metin notu",
          "correct": false
        },
        {
          "text": "Görüntü dosyası",
          "correct": false
        }
      ]
    },
    {
      "q": "Yapısız veri…",
      "choices": [
        {
          "text": "Sert şemaya sahiptir",
          "correct": false
        },
        {
          "text": "Serbest biçimli olabilir",
          "correct": true
        },
        {
          "text": "Sorgulanamaz",
          "correct": false
        }
      ]
    }
  ],
  "veri-kaydi": [
    {
      "q": "Veri kaydı ne sağlar?",
      "choices": [
        {
          "text": "Kalıcılık ve izlenebilirlik",
          "correct": true
        },
        {
          "text": "Mutlaka şifreleme",
          "correct": false
        },
        {
          "text": "Sadece dosya sıkıştırma",
          "correct": false
        }
      ]
    },
    {
      "q": "Log dosyaları tipik olarak…",
      "choices": [
        {
          "text": "Olay geçmişini tutar",
          "correct": true
        },
        {
          "text": "Veriyi rastgele değiştirir",
          "correct": false
        },
        {
          "text": "Şemayı otomatik çıkarır",
          "correct": false
        }
      ]
    },
    {
      "q": "Zaman damgası kayıtta…",
      "choices": [
        {
          "text": "Ne zaman oluştuğunu gösterir",
          "correct": true
        },
        {
          "text": "Verinin türünü değiştirir",
          "correct": false
        },
        {
          "text": "İçeriği şifreler",
          "correct": false
        }
      ]
    }
  ],
  "veritabani": [
    {
      "q": "İlişkisel veritabanı…",
      "choices": [
        {
          "text": "Tablolar ve ilişkilerle çalışır",
          "correct": true
        },
        {
          "text": "Yalnızca JSON tutar",
          "correct": false
        },
        {
          "text": "Sorgu yapılamaz",
          "correct": false
        }
      ]
    },
    {
      "q": "NoSQL sistemleri genelde…",
      "choices": [
        {
          "text": "Esnek şema sunar",
          "correct": true
        },
        {
          "text": "Her zaman ilişkisel",
          "correct": false
        },
        {
          "text": "Tek depolama tipi",
          "correct": false
        }
      ]
    },
    {
      "q": "İndeks kullanımı…",
      "choices": [
        {
          "text": "Sorguları hızlandırır",
          "correct": true
        },
        {
          "text": "Boyutu azaltır",
          "correct": false
        },
        {
          "text": "Güvenliği sağlar",
          "correct": false
        }
      ]
    }
  ],
  "merkezi": [
    {
      "q": "Merkezi mimaride risk:",
      "choices": [
        {
          "text": "Tek hata noktası",
          "correct": true
        },
        {
          "text": "Tümü eşit yetkili",
          "correct": false
        },
        {
          "text": "Sürekli P2P",
          "correct": false
        }
      ]
    },
    {
      "q": "Avantaj olarak…",
      "choices": [
        {
          "text": "Basit yönetim",
          "correct": true
        },
        {
          "text": "%100 sansüre dayanıklılık",
          "correct": false
        },
        {
          "text": "Mutlaka ucuz",
          "correct": false
        }
      ]
    },
    {
      "q": "Merkezi sistemde otorite…",
      "choices": [
        {
          "text": "Tek yerde toplanır",
          "correct": true
        },
        {
          "text": "Herkese dağılır",
          "correct": false
        },
        {
          "text": "Yoktur",
          "correct": false
        }
      ]
    }
  ],
  "merkeziyetsiz": [
    {
      "q": "Merkeziyetsiz yapı…",
      "choices": [
        {
          "text": "Aracı olmadan eşler etkileşir",
          "correct": true
        },
        {
          "text": "Tek merkez şarttır",
          "correct": false
        },
        {
          "text": "Sadece kapalıdır",
          "correct": false
        }
      ]
    },
    {
      "q": "Avantaj olarak…",
      "choices": [
        {
          "text": "Tek hata noktasını azaltır",
          "correct": true
        },
        {
          "text": "Şeffaflığı düşürür",
          "correct": false
        },
        {
          "text": "Mutlaka yavaştır",
          "correct": false
        }
      ]
    },
    {
      "q": "Dezavantaj:",
      "choices": [
        {
          "text": "Yönetim karmaşıklığı artabilir",
          "correct": true
        },
        {
          "text": "Güvenlik imkânsız",
          "correct": false
        },
        {
          "text": "Veri tutarlılığı yoktur",
          "correct": false
        }
      ]
    }
  ],
  "p2p": [
    {
      "q": "P2P modelinde…",
      "choices": [
        {
          "text": "Uçlar doğrudan haberleşir",
          "correct": true
        },
        {
          "text": "Her şey gateway’den geçer",
          "correct": false
        },
        {
          "text": "Daima merkezden akar",
          "correct": false
        }
      ]
    },
    {
      "q": "Tipik yarar:",
      "choices": [
        {
          "text": "Kaynak paylaşımı",
          "correct": true
        },
        {
          "text": "Tek otorite",
          "correct": false
        },
        {
          "text": "Mutlak gizlilik",
          "correct": false
        }
      ]
    },
    {
      "q": "Güven…",
      "choices": [
        {
          "text": "Protokollerle desteklenir",
          "correct": true
        },
        {
          "text": "Gereksizdir",
          "correct": false
        },
        {
          "text": "Sadece şifreleme yeter",
          "correct": false
        }
      ]
    }
  ],
  "dagitik-ag": [
    {
      "q": "Dağıtık ağlar…",
      "choices": [
        {
          "text": "Hata toleransı sunar",
          "correct": true
        },
        {
          "text": "Her zaman tek sunucu",
          "correct": false
        },
        {
          "text": "Veri tek kopya",
          "correct": false
        }
      ]
    },
    {
      "q": "Çoğaltma (replication)…",
      "choices": [
        {
          "text": "Erişilebilirliği arttırır",
          "correct": true
        },
        {
          "text": "Performansı düşürür",
          "correct": false
        },
        {
          "text": "Tutarlılığı imkânsız kılar",
          "correct": false
        }
      ]
    },
    {
      "q": "Tutarlılık stratejisi örneği:",
      "choices": [
        {
          "text": "Eventual consistency",
          "correct": true
        },
        {
          "text": "Rastgelelik",
          "correct": false
        },
        {
          "text": "Sadece offline",
          "correct": false
        }
      ]
    }
  ],
  "anahtar-yonetimi": [
    {
      "q": "Asimetrik kriptografide…",
      "choices": [
        {
          "text": "Açık/özel anahtar çifti vardır",
          "correct": true
        },
        {
          "text": "Tek anahtar yeter",
          "correct": false
        },
        {
          "text": "İmza yoktur",
          "correct": false
        }
      ]
    },
    {
      "q": "Özel anahtar…",
      "choices": [
        {
          "text": "Gizli tutulmalıdır",
          "correct": true
        },
        {
          "text": "Herkesle paylaşılır",
          "correct": false
        },
        {
          "text": "Sadece cüzdan adresidir",
          "correct": false
        }
      ]
    },
    {
      "q": "Cüzdanlar…",
      "choices": [
        {
          "text": "Özel anahtarı saklar",
          "correct": true
        },
        {
          "text": "Koin saklar",
          "correct": false
        },
        {
          "text": "Blockchain’i barındırır",
          "correct": false
        }
      ]
    }
  ],
  "hash-fonksiyonlari": [
    {
      "q": "Hash fonksiyonu…",
      "choices": [
        {
          "text": "Tek yönlü özet üretir",
          "correct": true
        },
        {
          "text": "Tersine çevrilebilir",
          "correct": false
        },
        {
          "text": "Her zaman sabit zorluk",
          "correct": false
        }
      ]
    },
    {
      "q": "Çakışma direnci…",
      "choices": [
        {
          "text": "Aynı özeti bulmayı zorlaştırır",
          "correct": true
        },
        {
          "text": "Şifrelemeyi açıklar",
          "correct": false
        },
        {
          "text": "İmza doğrular",
          "correct": false
        }
      ]
    },
    {
      "q": "Örnek:",
      "choices": [
        {
          "text": "SHA-256",
          "correct": true
        },
        {
          "text": "FTP",
          "correct": false
        },
        {
          "text": "DHCP",
          "correct": false
        }
      ]
    }
  ],
  "dijital-imza": [
    {
      "q": "Dijital imza…",
      "choices": [
        {
          "text": "İnkar edilemezlik sağlar",
          "correct": true
        },
        {
          "text": "Veriyi sıkıştırır",
          "correct": false
        },
        {
          "text": "Hash’i kaldırır",
          "correct": false
        }
      ]
    },
    {
      "q": "ECDSA…",
      "choices": [
        {
          "text": "Yaygın imza şemasıdır",
          "correct": true
        },
        {
          "text": "Bir hash algoritmasıdır",
          "correct": false
        },
        {
          "text": "Bir dosya sistemi",
          "correct": false
        }
      ]
    },
    {
      "q": "Doğrulama…",
      "choices": [
        {
          "text": "Açık anahtarla yapılır",
          "correct": true
        },
        {
          "text": "Özel anahtarla yapılır",
          "correct": false
        },
        {
          "text": "Hash gerektirmez",
          "correct": false
        }
      ]
    }
  ],
  "zaman-damgasi": [
    {
      "q": "Zaman damgası…",
      "choices": [
        {
          "text": "Oluşum anını ispatlar",
          "correct": true
        },
        {
          "text": "Veriyi şifreler",
          "correct": false
        },
        {
          "text": "İmzayı yok sayar",
          "correct": false
        }
      ]
    },
    {
      "q": "Blockchain’de timestamp…",
      "choices": [
        {
          "text": "Blok başlığında yer alır",
          "correct": true
        },
        {
          "text": "Sadece cüzdanda olur",
          "correct": false
        },
        {
          "text": "Madencide saklanmaz",
          "correct": false
        }
      ]
    },
    {
      "q": "Amaç:",
      "choices": [
        {
          "text": "Sıralama ve bütünlük",
          "correct": true
        },
        {
          "text": "Mutlak gizlilik",
          "correct": false
        },
        {
          "text": "Ücretsiz madencilik",
          "correct": false
        }
      ]
    }
  ],
  "blok-yapisi": [
    {
      "q": "Blok başlığı öğesi:",
      "choices": [
        {
          "text": "Önceki blok hash’i",
          "correct": true
        },
        {
          "text": "Kullanıcı avatarı",
          "correct": false
        },
        {
          "text": "DNS kaydı",
          "correct": false
        }
      ]
    },
    {
      "q": "Nonce…",
      "choices": [
        {
          "text": "PoW’da aranan değerdir",
          "correct": true
        },
        {
          "text": "Özel anahtar",
          "correct": false
        },
        {
          "text": "Cüzdan adresi",
          "correct": false
        }
      ]
    },
    {
      "q": "Zorluk (difficulty)…",
      "choices": [
        {
          "text": "Blok üretimi hedefini ayarlar",
          "correct": true
        },
        {
          "text": "Ücreti belirler",
          "correct": false
        },
        {
          "text": "Gas limiti demektir",
          "correct": false
        }
      ]
    }
  ],
  "merkle-agaclari": [
    {
      "q": "Merkle ağacı…",
      "choices": [
        {
          "text": "Veri bütünlüğü kanıtlar",
          "correct": true
        },
        {
          "text": "Yalnızca şifreleme yapar",
          "correct": false
        },
        {
          "text": "DNS’yi değiştirir",
          "correct": false
        }
      ]
    },
    {
      "q": "Merkle kökü…",
      "choices": [
        {
          "text": "Yaprağın özetlerinden türetilir",
          "correct": true
        },
        {
          "text": "Özel anahtardır",
          "correct": false
        },
        {
          "text": "Nonce değeridir",
          "correct": false
        }
      ]
    },
    {
      "q": "Doğrulama yolu…",
      "choices": [
        {
          "text": "Kısmi hash zinciridir",
          "correct": true
        },
        {
          "text": "İmza anahtarıdır",
          "correct": false
        },
        {
          "text": "Gas ölçüsüdür",
          "correct": false
        }
      ]
    }
  ],
  "blockchain": [
    {
      "q": "Blockchain…",
      "choices": [
        {
          "text": "Dağıtık defterdir",
          "correct": true
        },
        {
          "text": "Tek merkezi DB",
          "correct": false
        },
        {
          "text": "Sadece dosya sistemi",
          "correct": false
        }
      ]
    },
    {
      "q": "Blok + konsensüs + kriptografi…",
      "choices": [
        {
          "text": "Birleşince güven sağlar",
          "correct": true
        },
        {
          "text": "Ağ gereksizdir",
          "correct": false
        },
        {
          "text": "İmza gereksizdir",
          "correct": false
        }
      ]
    },
    {
      "q": "Şeffaflık…",
      "choices": [
        {
          "text": "Genelde daha yüksektir",
          "correct": true
        },
        {
          "text": "Asla yoktur",
          "correct": false
        },
        {
          "text": "Sadece özel ağlarda",
          "correct": false
        }
      ]
    }
  ],
  "islemler-ve-blok-dogrulama": [
    {
      "q": "İşlem yapısı…",
      "choices": [
        {
          "text": "İmza ve girdiler içerir",
          "correct": true
        },
        {
          "text": "Sadece metin",
          "correct": false
        },
        {
          "text": "DNS kaydı",
          "correct": false
        }
      ]
    },
    {
      "q": "Mempool…",
      "choices": [
        {
          "text": "Onay bekleyen işlemler havuzu",
          "correct": true
        },
        {
          "text": "Özel anahtar deposu",
          "correct": false
        },
        {
          "text": "Gas ölçeri",
          "correct": false
        }
      ]
    },
    {
      "q": "Blok doğrulama…",
      "choices": [
        {
          "text": "Kurallara uygunluğu kontrol eder",
          "correct": true
        },
        {
          "text": "Sadece cüzdan UI’ı",
          "correct": false
        },
        {
          "text": "İmza kullanmaz",
          "correct": false
        }
      ]
    }
  ],
  "pow": [
    {
      "q": "PoW’da madenciler…",
      "choices": [
        {
          "text": "Nonce arar",
          "correct": true
        },
        {
          "text": "İmzayı gizler",
          "correct": false
        },
        {
          "text": "Gas üretir",
          "correct": false
        }
      ]
    },
    {
      "q": "Zorluk ayarı…",
      "choices": [
        {
          "text": "Hedef blok süresini korur",
          "correct": true
        },
        {
          "text": "Ücreti belirler",
          "correct": false
        },
        {
          "text": "İşlemleri gizler",
          "correct": false
        }
      ]
    },
    {
      "q": "Dezavantaj:",
      "choices": [
        {
          "text": "Enerji tüketimi yüksektir",
          "correct": true
        },
        {
          "text": "İmza gerektirir",
          "correct": false
        },
        {
          "text": "Ağ yoktur",
          "correct": false
        }
      ]
    }
  ],
  "pos": [
    {
      "q": "PoS’ta doğrulayıcı seçimi…",
      "choices": [
        {
          "text": "Stake miktarıyla ilişkilidir",
          "correct": true
        },
        {
          "text": "Nonce ile yapılır",
          "correct": false
        },
        {
          "text": "Şifre çözme yarışıdır",
          "correct": false
        }
      ]
    },
    {
      "q": "Avantaj:",
      "choices": [
        {
          "text": "Enerji tüketimi düşüktür",
          "correct": true
        },
        {
          "text": "Hash gerektirir",
          "correct": false
        },
        {
          "text": "Her zaman kapalıdır",
          "correct": false
        }
      ]
    },
    {
      "q": "Güvenlik…",
      "choices": [
        {
          "text": "Ekonomik ceza/ödülle teşvik edilir",
          "correct": true
        },
        {
          "text": "Hiçbir mekanizma yok",
          "correct": false
        },
        {
          "text": "Sadece gizlilik",
          "correct": false
        }
      ]
    }
  ],
  "public-blockchain": [
    {
      "q": "Public ağlarda…",
      "choices": [
        {
          "text": "Herkes doğrulayıcı olabilir",
          "correct": true
        },
        {
          "text": "Erişim tamamen yasaktır",
          "correct": false
        },
        {
          "text": "Şeffaflık düşüktür",
          "correct": false
        }
      ]
    },
    {
      "q": "Güven…",
      "choices": [
        {
          "text": "Konsensüsle sağlanır",
          "correct": true
        },
        {
          "text": "Tek otoriteye bağlıdır",
          "correct": false
        },
        {
          "text": "Sadece gizlilik",
          "correct": false
        }
      ]
    },
    {
      "q": "Örnek:",
      "choices": [
        {
          "text": "Bitcoin",
          "correct": true
        },
        {
          "text": "Özel intranet DB",
          "correct": false
        },
        {
          "text": "Yerel CSV",
          "correct": false
        }
      ]
    }
  ],
  "private-blockchain": [
    {
      "q": "Private ağlarda…",
      "choices": [
        {
          "text": "İzinli katılım vardır",
          "correct": true
        },
        {
          "text": "Herkese açık madencilik",
          "correct": false
        },
        {
          "text": "Şeffaflık zorunlu değil",
          "correct": false
        }
      ]
    },
    {
      "q": "Kullanım alanı:",
      "choices": [
        {
          "text": "Kurumsal süreçler",
          "correct": true
        },
        {
          "text": "Sadece oyun",
          "correct": false
        },
        {
          "text": "Yalnız test",
          "correct": false
        }
      ]
    },
    {
      "q": "Yönetim…",
      "choices": [
        {
          "text": "Merkezi/kapalı olabilir",
          "correct": true
        },
        {
          "text": "Kaçınılmazca public’tir",
          "correct": false
        },
        {
          "text": "İzin gerektirmez",
          "correct": false
        }
      ]
    }
  ],
  "konsorsiyum-blockchain": [
    {
      "q": "Konsorsiyum ağlarda…",
      "choices": [
        {
          "text": "Birden fazla kuruluş yönetir",
          "correct": true
        },
        {
          "text": "Tek kişi yönetir",
          "correct": false
        },
        {
          "text": "Daima publictir",
          "correct": false
        }
      ]
    },
    {
      "q": "Avantaj:",
      "choices": [
        {
          "text": "Yetki paylaşımı",
          "correct": true
        },
        {
          "text": "Tek hata noktası",
          "correct": false
        },
        {
          "text": "Sıfır yönetişim",
          "correct": false
        }
      ]
    },
    {
      "q": "Erişim:",
      "choices": [
        {
          "text": "Genelde izinlidir",
          "correct": true
        },
        {
          "text": "Tamamen sınırsız",
          "correct": false
        },
        {
          "text": "Yalnız okuma",
          "correct": false
        }
      ]
    }
  ],
  "hibrit-modeller": [
    {
      "q": "Hibrit ağlar…",
      "choices": [
        {
          "text": "Public+Private birleşimi olabilir",
          "correct": true
        },
        {
          "text": "Sadece public",
          "correct": false
        },
        {
          "text": "Sadece private",
          "correct": false
        }
      ]
    },
    {
      "q": "Amaç:",
      "choices": [
        {
          "text": "Gereksinime göre denge kurmak",
          "correct": true
        },
        {
          "text": "Tam anonimlik",
          "correct": false
        },
        {
          "text": "Tek kurum üstünlüğü",
          "correct": false
        }
      ]
    },
    {
      "q": "Zorluk:",
      "choices": [
        {
          "text": "Yönetişim/entegrasyon karmaşıklığı",
          "correct": true
        },
        {
          "text": "İmza yokluğu",
          "correct": false
        },
        {
          "text": "Hash gereksiz",
          "correct": false
        }
      ]
    }
  ],
  "fork": [
    {
      "q": "Fork…",
      "choices": [
        {
          "text": "Protokol ayrımı/değişimidir",
          "correct": true
        },
        {
          "text": "Bir cüzdan türü",
          "correct": false
        },
        {
          "text": "Hash fonksiyonu",
          "correct": false
        }
      ]
    },
    {
      "q": "Soft fork…",
      "choices": [
        {
          "text": "Geri uyumlu değişim",
          "correct": true
        },
        {
          "text": "Geri uyumsuz",
          "correct": false
        },
        {
          "text": "Sadece isim değişir",
          "correct": false
        }
      ]
    },
    {
      "q": "Hard fork…",
      "choices": [
        {
          "text": "Zincir ayrışmasına yol açabilir",
          "correct": true
        },
        {
          "text": "Hiç etkisi yok",
          "correct": false
        },
        {
          "text": "Sadece UI değişir",
          "correct": false
        }
      ]
    }
  ],
  "akilli-sozlesmeler": [
    {
      "q": "Akıllı sözleşme…",
      "choices": [
        {
          "text": "Koşullar sağlanınca otomatik çalışır",
          "correct": true
        },
        {
          "text": "Sadece belge tarayıcıdır",
          "correct": false
        },
        {
          "text": "SQL prosedürüdür",
          "correct": false
        }
      ]
    },
    {
      "q": "Solidity…",
      "choices": [
        {
          "text": "Ethereum sözleşme dilidir",
          "correct": true
        },
        {
          "text": "Hash algoritmasıdır",
          "correct": false
        },
        {
          "text": "Veritabanı türü",
          "correct": false
        }
      ]
    },
    {
      "q": "Risk:",
      "choices": [
        {
          "text": "Kod zafiyetleri istismar edilebilir",
          "correct": true
        },
        {
          "text": "İmza gereksiz",
          "correct": false
        },
        {
          "text": "Gas değil",
          "correct": false
        }
      ]
    }
  ],
  "token-coin": [
    {
      "q": "Token ve coin farkı:",
      "choices": [
        {
          "text": "Coin yerel; token mevcut zincirde",
          "correct": true
        },
        {
          "text": "İkisi aynı şey",
          "correct": false
        },
        {
          "text": "Token sadece NFT",
          "correct": false
        }
      ]
    },
    {
      "q": "Arz/dağıtım…",
      "choices": [
        {
          "text": "Teşvik tasarımında önemlidir",
          "correct": true
        },
        {
          "text": "Etkisizdir",
          "correct": false
        },
        {
          "text": "Sadece isimdir",
          "correct": false
        }
      ]
    },
    {
      "q": "Kullanım durumu:",
      "choices": [
        {
          "text": "Yönetim, ödeme, hizmet erişimi",
          "correct": true
        },
        {
          "text": "Sadece görsel",
          "correct": false
        },
        {
          "text": "Yalnız test",
          "correct": false
        }
      ]
    }
  ],
  "kullanim-alanlari": [
    {
      "q": "Kullanım alanı örneği:",
      "choices": [
        {
          "text": "Tedarik zinciri izlenebilirliği",
          "correct": true
        },
        {
          "text": "Sadece duvar kağıdı",
          "correct": false
        },
        {
          "text": "E-posta filtresi",
          "correct": false
        }
      ]
    },
    {
      "q": "Dijital kimlik…",
      "choices": [
        {
          "text": "Self-sovereign identity ile ilişkilidir",
          "correct": true
        },
        {
          "text": "Sadece şifre saklama",
          "correct": false
        },
        {
          "text": "DNS replikası",
          "correct": false
        }
      ]
    },
    {
      "q": "Oylama sistemleri:",
      "choices": [
        {
          "text": "Şeffaflık ve doğrulanabilirlik sunabilir",
          "correct": true
        },
        {
          "text": "Her zaman gizlidir",
          "correct": false
        },
        {
          "text": "Kayıt tutmaz",
          "correct": false
        }
      ]
    }
  ]
};
