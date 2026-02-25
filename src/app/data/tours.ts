export interface TourProgram {
  day: number;
  title: string;
  content: string;
  hotel?: string;
  route?: string;
  meals?: string;
}

export interface Tour {
  id: number;
  title: string;
  image: string;
  gallery?: string[];
  badge?: string;
  badgeColor?: string;
  startDate: string;
  duration: string;
  nightCount: number;
  dayCount: number;
  countries: number;
  cities: number;
  transport: "bus" | "plane";
  transportLabel?: string;
  route: string;
  departureCity?: string;
  originalPrice?: number;
  price: number;
  currency: "€" | "₺";
  priceInTL: number;
  discount?: number;
  isVisa: boolean;
  isRecommended?: boolean;
  rating?: number;
  reviewCount?: number;
  altDates?: string[];
  highlights?: string;
  description?: string;
  program?: TourProgram[];
  included?: string[];
  notIncluded?: string[];
}

export const TOURS: Tour[] = [
  {
    id: 1,
    title: "Sabiha Gökçen Çıkışlı Balkan Turu",
    image:
      "https://images.unsplash.com/photo-1717193342663-32fcd9583417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxrYW5zJTIwZXVyb3BlJTIwdHJhdmVsJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MTc5NjQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1766744406414-cd34a1512eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1684161223491-05b8ed84b3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1587992384141-5f13776b518b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1700549586671-6d5868866337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    badge: "7+ Kişi",
    badgeColor: "#10b981",
    startDate: "23.02.2026",
    duration: "7 Gece 8 Gün",
    nightCount: 7,
    dayCount: 8,
    countries: 6,
    cities: 24,
    transport: "bus",
    transportLabel: "Otobus",
    route: "Sabiha Gökçen → Belgrad → Bükreş → Sofya → Ohrid → Tiran → Dubrovnik",
    departureCity: "İstanbul (Sabiha Gökçen)",
    originalPrice: 885,
    price: 599,
    currency: "€",
    priceInTL: 30745,
    discount: 10,
    isVisa: true,
    isRecommended: true,
    rating: 4.8,
    reviewCount: 124,
    altDates: ["02.03.2026", "16.03.2026", "30.03.2026", "13.04.2026"],
    highlights:
      "OTOBUSLE VIZESIZ SABİHA GÖKÇEN ÇIKIŞLI BÜYÜK BALKAN TURU\n7 GECE 8 GUN – 6 ÜLKE 24 ŞEHİR",
    description:
      "Tourbulance güvencesiyle Balkanların büyülü coğrafyasını keşfediyoruz. 6 ülke 24 şehir boyunca uzanan bu muhteşem rotada Belgrad'ın tarihi kalesi, Bükreş'in Art Nouveau mimarisi, Sofya'nın antik tapınakları, Ohrid'in kristal berraklığındaki gölü, Arnavutluk'un inci gibi şehirleri Berat ve İşkodra, Adriyatik kıyısının incisi Dubrovnik sizi bekliyor. 4 yıldızlı otellerde kahvaltı ve akşam yemeği dahil konaklama, yerel profesyonel Türkçe rehberlik hizmetleri ile tam konforlu bir seyahat.",
    program: [
      {
        day: 1,
        title: "İstanbul – Belgrad",
        content:
          "Sabiha Gökçen Havalimanı Dış Hatlar Terminali'nden hareket ediyoruz. Belgrad'a varışın ardından şehir turu ile Kalemegdan Kalesi, Knez Mihailova Caddesi ve Skadarlija Çarşısı'nı geziyoruz.",
        hotel: "Hotel Zira 4* – Belgrad",
        route: "Sabiha Gökçen – Belgrad",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "Belgrad – Bükreş",
        content:
          "Sabah kahvaltısının ardından Bükreş'e hareket ediyoruz. Bükreş'te Zafer Takı, Devlet Sarayı, Eski Şehir turu.",
        hotel: "Hotel Novotel 4* – Bükreş",
        route: "Belgrad – Bükreş 600 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 3,
        title: "Bükreş – Sofya",
        content:
          "Bükreş'ten ayrılarak Sofya'ya geçiyoruz. Sofya'da Aleksandar Nevski Katedrali, Antik Roma Kalıntıları ve Vitosha Bulvarı gezisi.",
        hotel: "Hotel Marinela 4* – Sofya",
        route: "Bükreş – Sofya 380 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 4,
        title: "Sofya – Ohrid",
        content:
          "Sofya'dan hareket ederek Kuzey Makedonya'nın incisi Ohrid'e ulaşıyoruz. UNESCO Dünya Mirası listesindeki Ohrid Gölü kıyısında yürüyüş, Aziz Naum Manastırı ve eski şehir turu.",
        hotel: "Hotel Bellevue 4* – Ohrid",
        route: "Sofya – Ohrid 280 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 5,
        title: "Ohrid – Tiran – İşkodra",
        content:
          "Arnavutluk'un başkenti Tiran'ı geziyoruz. Skanderbeg Meydanı, Et'hem Bey Camii ve Millî Tarih Müzesi. Ardından İşkodra'ya geçiş ve Rozafa Kalesi ziyareti.",
        hotel: "Hotel Colosseo 4* – İşkodra",
        route: "Ohrid – Tiran – İşkodra 220 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 6,
        title: "İşkodra – Kotor – Dubrovnik",
        content:
          "Adriyatik kıyısını takip ederek Karadağ'ın Kotor Körfezi'ni görüyoruz. Orta Çağ surlarıyla çevrili Kotor eski şehri gezisi. Ardından Hırvatistan'ın İncisi Dubrovnik'e varış ve şehir turu.",
        hotel: "Hotel Dubrovnik Palace 4* – Dubrovnik",
        route: "İşkodra – Kotor – Dubrovnik 260 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 7,
        title: "Dubrovnik – Serbest Zaman",
        content:
          "Dubrovnik'te serbest gün. Eski şehir surları üzerinde yürüyüş, Lokrum Adası'na feribot gezisi veya alışveriş seçenekleri.",
        hotel: "Hotel Dubrovnik Palace 4* – Dubrovnik",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 8,
        title: "Dubrovnik – Sabiha Gökçen",
        content:
          "Kahvaltının ardından havalimanına transfer. Uçuşla İstanbul Sabiha Gökçen Havalimanı'na dönüş.",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "Türk Hava Yolları ile gidiş-dönüş ekonomi sınıfı biletler",
      "7 Gece 4* otellerde kahvaltı dahil konaklama",
      "6 akşam yemeği otellerde",
      "Yerel ulaşım hizmetleri (lüks klimalı araç)",
      "Yerel profesyonel Türkçe rehberlik hizmetleri",
      "Belgrad, Bükreş, Sofya, Ohrid, Tiran, Dubrovnik panoramik şehir turları",
      "Aziz Naum Turu, Matka Kanyonu Turu",
      "Tüm otoban geçiş ve otopark ücretleri",
      "Seyahat sigortası",
    ],
    notIncluded: [
      "Öğle yemekleri",
      "Kişisel harcamalar",
      "Vize ücretleri (gerekli ülkeler için)",
      "Ekstra turlar ve aktiviteler",
      "Havalimanı vergileri (bilet fiyatına dahil değilse)",
    ],
  },
  {
    id: 2,
    title: "İstanbul Çıkışlı Balkan Turu (THY)",
    image:
      "https://images.unsplash.com/photo-1631556892918-3e6cb60aeb55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc3RhbmJ1bCUyMHR1cmtleSUyMHNreWxpbmUlMjB0cmF2ZWx8ZW58MXx8fHwxNzcxNzk2NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1581706277234-f59e07d420bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1763787002975-5aefe199191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1587992384141-5f13776b518b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1700549586671-6d5868866337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    badge: "Kesin\nKalkış",
    badgeColor: "#f97316",
    startDate: "15.03.2026",
    duration: "6 Gece 7 Gün",
    nightCount: 6,
    dayCount: 7,
    countries: 5,
    cities: 18,
    transport: "plane",
    transportLabel: "THY",
    route: "İstanbul → Sofya → Skopje → Podgorica → Sarajevo → Dubrovnik",
    departureCity: "İstanbul",
    price: 749,
    currency: "€",
    priceInTL: 38444,
    isVisa: false,
    rating: 4.6,
    reviewCount: 87,
    altDates: ["29.03.2026", "12.04.2026"],
    highlights:
      "UÇAKLI VE VİZESİZ İSTANBUL ÇIKIŞLI BÜYÜK BALKAN TURU\n6 GECE 7 GÜN – 6 ÜLKE 21 ŞEHİR",
    description:
      "Tourbulance ile Büyük Balkan Turu'muza İstanbul Havalimanı Dış Hatlar Gidiş Terminali'nde belirtilen kontur önünde buluşarak başlıyoruz. Türk Hava Yolları'nın TK1017 sefer sayılı uçağı ile Priştina'ya hareket ediyor, yerel saat ile 08.30'da Priştina'ya varıyoruz. Pasaport, bagaj ve gümrük işlemlerinin ardından, nüfusunun büyük çoğunluğu Müslüman Arnavutlardan oluşan ve dünyanın en genç devletlerinden biri olan Kosova'nın başkenti Priştina'da şehir turumuza başlıyoruz.",
    program: [
      {
        day: 1,
        title: "İstanbul – Priştina – Prizren – İşkodra",
        content:
          "Tourbulance ile Büyük Balkan Turu'muza İstanbul Havalimanı Dış Hatlar Gidiş Terminali'nde belirtilen kontuar önünde buluşarak başlıyoruz. Bilet, bagaj ve pasaport işlemlerinin ardından Türk Hava Yolları'nın TK1017 sefer sayılı uçağı ile saat 07.50'de Priştina'ya hareket ediyor, yerel saat ile 08.30'da Priştina'ya varıyoruz.\n\nPasaport, bagaj ve gümrük işlemlerinin ardından, nüfusunun büyük çoğunluğu Müslüman Arnavutlardan oluşan ve dünyanın en genç devletlerinden biri olan Kosova'nın başkenti Priştina'da şehir turumuza başlıyoruz. Yakın tarihte yaşanan insanlık dramlarının izlerini taşıyan eski Osmanlı topraklarında, panoramik olarak Priştina Çarşısı'nı, 15. yüzyılda Sultan II. Bayezid tarafından yaptırılan Çarşı Camii'ni ve 19. yüzyılda halka namaz vakitlerini hatırlatmak amacıyla inşa edilen Saat Kulesi'ni görüyoruz.\n\nTur sonrası kısa bir serbest zaman veriyoruz. Ardından, Osmanlı'nın Balkanlar'daki en önemli zaferlerinden biri olan Kosova Meydan Muharebesi'nin gerçekleştiği alanda, Obiliç tarafından şehit edilen I. Murad (Hüdavendigar) Türbesi'ni ziyaret etmek üzere yola çıkıyoruz. Ziyaretimizin ardından kısa bir otobus yolculuğu ile Balkanların en şirin şehirlerinden biri olarak kabul edilen Prizren'e geçiyoruz.\n\nPrizren'de yapacağımız panoramik tur sırasında 17. yüzyıldan kalma Türk Hamamı'nı, 1615 yılında inşa edilen Sinan Paşa Camii'ni ve şehre hâkim konumda bulunan Prizren Kalesi'ni dışarıdan görüyoruz. Turun bitimi ve serbest zamanın ardından Arnavutluk'a geçerek, ülkenin şirin kenti İşkodra'ya hareket ediyoruz. İşkodra'da yapılacak panoramik şehir turu sonrasında otelimize transferimizi gerçekleştiriyoruz. Geceleme İşkodra'da bulunan otelimizdedir.\n\nÖğle Yemeği: Serbest zamanda ekstra olarak alınabilecektir.\nAkşam Yemeği: Otelimizde alınacak olup, tur ücretine dahildir.\nKonaklama: Hotel Luane 4* v.b – İşkodra\nRota: Priştina – Prizren 85 KM, Prizren – İşkodra 186 KM\nOtele Giriş Saati: Gümrük geçiş süresine bağlı olarak tahmini olarak 20:00 olacak.",
        hotel: "Hotel Luane 4* – İşkodra",
        route: "Priştina – Prizren 85 KM, Prizren – İşkodra 186 KM",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "İşkodra – Budva – Kotor – Tivat",
        content:
          "Kahvaltının ardından Arnavutluk'un inci şehri İşkodra'dan ayrılarak Karadağ'a geçiyoruz. Adriyatik'in incisi Budva'da sahil yürüyüşü ve eski kale şehri gezisi. Ardından Kotor Körfezi boyunca ilerleyerek surlarla çevrili ortaçağ şehri Kotor'u ziyaret ediyoruz. Tivat'ta geceleme.",
        hotel: "Hotel Palma 4* – Tivat",
        route: "İşkodra – Budva 140 KM, Budva – Kotor 25 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 3,
        title: "Tivat – Dubrovnik – Mostar",
        content:
          "Sabah erken saatte Hırvatistan'ın incisi Dubrovnik'e geçiyoruz. Eski şehir surları üzerinde yürüyüş, Stradun Caddesi ve Sponza Sarayı. Öğleden sonra Bosna Hersek sınırını geçerek Osmanlı mirasının en güzel örneklerinden biri olan Mostar'a varış. Stari Most (Eski Köprü) ziyareti.",
        hotel: "Hotel Mostar 4* – Mostar",
        route: "Tivat – Dubrovnik 65 KM, Dubrovnik – Mostar 90 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 4,
        title: "Mostar – Saraybosna",
        content:
          "Mostar'dan hareket ederek Bosna Hersek'in başkenti Saraybosna'ya ulaşıyoruz. Başçarşı (eski çarşı), Gazi Hüsrev Bey Camii ve Beyaz Kule gezisi. Saraybosna'nın çok kültürlü dokusunu keşfediyoruz.",
        hotel: "Hotel Hollywood 5* – Saraybosna",
        route: "Mostar – Saraybosna 130 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 5,
        title: "Saraybosna – Skopje",
        content:
          "Bosna'dan ayrılarak Kuzey Makedonya'nın başkenti Skopje'ye ulaşıyoruz. Kale ziyareti, Eski Çarşı, Mustafa Paşa Camii ve Macedonia Meydanı'ndaki anıtlar turu.",
        hotel: "Hotel Aleksandar Palace 5* – Skopje",
        route: "Saraybosna – Skopje 450 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 6,
        title: "Skopje – Sofya",
        content:
          "Skopje'den ayrılarak Bulgaristan'ın başkenti Sofya'ya geçiyoruz. Aleksandar Nevski Katedrali, Aziz Nedelya Kilisesi ve Vitosha Bulvarı'nda alışveriş imkânı. Akşam yemecesini burada alıyoruz.",
        hotel: "Hotel Marinela 5* – Sofya",
        route: "Skopje – Sofya 230 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 7,
        title: "Sofya – İstanbul",
        content:
          "Sofya'dan Priştina Havalimanı'na transfer. TK1018 sefer sayılı uçakla İstanbul Havalimanı'na dönüş. Yorucu ama dolu dolu 7 günlük Balkan turumuzu tamamlıyoruz.",
        route: "Sofya – Priştina 290 KM",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "Türk Hava Yolları ile İstanbul–Priştina / Üsküp–İstanbul Ekonomi Sınıfı Uçuş Biletleri",
      "Yerel Ulaşım Hizmetleri",
      "Yerel profesyonel Türkçe rehberlik hizmetleri",
      "4* Otellerde 1 Gece İşkodra, 1 Gece Medjugorje, 1 Gece Saraybosna, 1 Gece Belgrad, 1 Gece Üsküp ve 1 Gece Ohrid ile toplam 6 Gece Kahvaltılı Dahil Konaklama",
      "1 Gece İşkodra, 1 Gece Medjugorje, 1 Gece Belgrad, 1 Gece Üsküp, otellerde veya restaurantlarda alınan 4 akşam yemeği",
      "Yöresel Restuarant'da Makedon Gecesi",
      "Yöresel Restuarant'da Boşnak Köftesi",
      "Prizren, Priştina, Üsküp, Tetova, Ohrid, Resne, Bitola, Belgrad, Saraybosna, Konjic, Mostar, Trebinje, Kotor, Budva, İşkodra Panoramik şehir turları",
      "Kosova Geçiş Ücreti",
      "Sveti Naum Turu",
      "Matka Kanyonu Turu",
      "Blagaj Tekkesi Turu",
      "Bazı şehirlerde alınan mecburi yerel rehberlik hizmetleri",
      "Tüm otoban check-point ve otopark ücretleri",
    ],
    notIncluded: [
      "Öğle yemekleri (serbest zamanda kişisel bütçeyle)",
      "Kişisel harcamalar ve içecekler",
      "Vize ücretleri (gerekli ülkeler için)",
      "Ekstra opsiyonel turlar",
      "Bagaj fazla ücretleri",
    ],
  },
  {
    id: 3,
    title: "Rüya Avrupa Turu – Prag & Viyana & Budapeşte",
    image:
      "https://images.unsplash.com/photo-1637013252559-96b426f46d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmFndWUlMjBjemVjaCUyMHJlcHVibGljJTIwdHJhdmVsfGVufDF8fHx8MTc3MTc5NjQ2MXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1707998982041-1b72118e4c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1684161223491-05b8ed84b3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1581706277234-f59e07d420bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1587992384141-5f13776b518b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    startDate: "05.04.2026",
    duration: "8 Gece 9 Gün",
    nightCount: 8,
    dayCount: 9,
    countries: 4,
    cities: 12,
    transport: "plane",
    transportLabel: "THY",
    route: "İstanbul → Prag → Viyana → Salzburg → Budapeşte → İstanbul",
    departureCity: "İstanbul",
    originalPrice: 1290,
    price: 990,
    currency: "€",
    priceInTL: 50820,
    discount: 23,
    isVisa: false,
    isRecommended: true,
    rating: 4.9,
    reviewCount: 203,
    altDates: ["19.04.2026", "03.05.2026", "17.05.2026"],
    highlights:
      "UÇAKLI ORTA AVRUPA TURU\n8 GECE 9 GÜN – 4 ÜLKE 12 ŞEHİR",
    description:
      "Orta Avrupa'nın en büyüleyici başkentlerini tek bir turla keşfediyoruz. Prag'ın Gotik mimarisi, Viyana'nın imparatorluk görkemi, Salzburg'un Mozart mirası ve Budapeşte'nin Tuna kıyısındaki ihtişamı sizi bekliyor. THY ile rahat uçuş, 4 yıldızlı oteller ve uzman rehberlik eşliğinde unutulmaz bir Avrupa deneyimi.",
    program: [
      {
        day: 1,
        title: "İstanbul – Prag",
        content:
          "İstanbul'dan THY uçuşuyla Prag'a hareket ediyoruz. Varışın ardından şehir turu: Eski Şehir Meydanı, Astronomik Saat ve Vltava Nehri kıyısı.",
        hotel: "Hotel Radisson Blu 4* – Prag",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "Prag Tam Gün",
        content:
          "Prag Kalesi, Aziz Vitus Katedrali, Charles Köprüsü tam gün turu. Öğleden sonra serbest zaman ve alışveriş.",
        hotel: "Hotel Radisson Blu 4* – Prag",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 3,
        title: "Prag – Viyana",
        content:
          "Prag'dan ayrılarak Viyana'ya geçiyoruz. Ring Bulvarı, Schönbrunn Sarayı ve Belvedere Bahçeleri turu.",
        hotel: "Hotel Marriott 4* – Viyana",
        route: "Prag – Viyana 330 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 4,
        title: "Viyana Tam Gün",
        content:
          "Viyana Devlet Operası, Hofburg Sarayı, Stephansplatz ve Naschmarkt gezisi. Akşam Viyana usulü akşam yemeği.",
        hotel: "Hotel Marriott 4* – Viyana",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 5,
        title: "Viyana – Salzburg",
        content:
          "Mozart'ın doğduğu şehir Salzburg'a geçiyoruz. Mozarthaus, Hohensalzburg Kalesi ve eski şehir turu.",
        hotel: "Hotel Stein 4* – Salzburg",
        route: "Viyana – Salzburg 300 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 6,
        title: "Salzburg – Budapeşte",
        content:
          "Salzburg'dan Budapeşte'ye uzun yolculuk. Geç saatlerde Macaristan'ın başkentine varış.",
        hotel: "Hotel Corinthia 5* – Budapeşte",
        route: "Salzburg – Budapeşte 620 KM",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 7,
        title: "Budapeşte Tam Gün",
        content:
          "Budapeşte'de tam gün tur: Buda Kalesi, Balıkçı Burnu, Matyas Kilisesi, Parlamento binası ve Tuna gezisi.",
        hotel: "Hotel Corinthia 5* – Budapeşte",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 8,
        title: "Budapeşte – Serbest Zaman",
        content:
          "Serbest gün. Büyük Pazar Salonu'nda alışveriş, termal banyolar veya opsiyonel program seçenekleri.",
        hotel: "Hotel Corinthia 5* – Budapeşte",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 9,
        title: "Budapeşte – İstanbul",
        content:
          "Kahvaltının ardından havalimanına transfer ve İstanbul'a dönüş uçuşu.",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "THY ile gidiş-dönüş ekonomi sınıfı uçuş biletleri",
      "8 gece 4-5 yıldızlı otellerde kahvaltı dahil konaklama",
      "4 akşam yemeği",
      "Tüm şehirlerde panoramik şehir turları",
      "Profesyonel Türkçe rehberlik hizmetleri",
      "Lüks klimalı turizm otobüsü",
      "Tüm otoban ve köprü geçiş ücretleri",
      "Seyahat sigortası",
    ],
    notIncluded: [
      "Öğle yemekleri",
      "Kişisel harcamalar",
      "Müze giriş ücretleri (bazıları hariç)",
      "Opsiyonel turlar",
    ],
  },
  {
    id: 4,
    title: "Dubrovnik & Kotor Mavi Tur Paketi",
    image:
      "https://images.unsplash.com/photo-1612621450155-a574ebb71f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJyb3ZuaWslMjBjcm9hdGlhJTIwY29hc3QlMjB0cmF2ZWx8ZW58MXx8fHwxNzcxNzk2NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1766744406414-cd34a1512eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1700549586671-6d5868866337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1684161223491-05b8ed84b3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1763787002975-5aefe199191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    startDate: "20.04.2026",
    duration: "5 Gece 6 Gün",
    nightCount: 5,
    dayCount: 6,
    countries: 2,
    cities: 6,
    transport: "plane",
    transportLabel: "THY",
    route: "İstanbul → Dubrovnik → Kotor → Budva → İstanbul",
    departureCity: "İstanbul",
    price: 680,
    currency: "€",
    priceInTL: 34884,
    isVisa: true,
    rating: 4.7,
    reviewCount: 156,
    altDates: ["04.05.2026", "18.05.2026"],
    highlights: "UÇAKLI VİZESİZ ADRİYATİK TURU\n5 GECE 6 GÜN – 2 ÜLKE 6 ŞEHİR",
    description:
      "Adriyatik'in en güzel sahil şehirleri Dubrovnik ve Kotor'u keşfediyoruz. UNESCO Dünya Mirası listesindeki her iki şehirde de tarihi surlar, Venedik mimarisi ve kristal berraklığındaki deniz sizi bekliyor.",
    program: [
      {
        day: 1,
        title: "İstanbul – Dubrovnik",
        content: "THY uçuşuyla Dubrovnik'e varış. Otel yerleşimi ve serbest zaman.",
        hotel: "Hotel Valamar 4* – Dubrovnik",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "Dubrovnik Tam Gün",
        content:
          "Eski şehir surları turu, Stradun Caddesi, Sponza Sarayı ve Rector's Palace. Opsiyonel: Lokrum Adası gezisi.",
        hotel: "Hotel Valamar 4* – Dubrovnik",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 3,
        title: "Dubrovnik – Kotor",
        content:
          "Karadağ'a geçiş. Kotor Körfezi boyunca ilerleme, Kotor eski şehir turu ve surlar yürüyüşü.",
        hotel: "Hotel Cattaro 4* – Kotor",
        route: "Dubrovnik – Kotor 95 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 4,
        title: "Kotor – Budva",
        content:
          "Adriyatik kıyısındaki Budva'ya geçiş. Riviera turu ve eski kale şehri gezisi.",
        hotel: "Hotel Budva 4* – Budva",
        route: "Kotor – Budva 25 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 5,
        title: "Budva – Serbest Gün",
        content: "Sahil keyfi, deniz aktiviteleri veya serbest program.",
        hotel: "Hotel Budva 4* – Budva",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 6,
        title: "Budva – İstanbul",
        content: "Havalimanına transfer ve İstanbul'a dönüş.",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "THY ile gidiş-dönüş uçuş biletleri",
      "5 gece 4* otellerde kahvaltı dahil konaklama",
      "3 akşam yemeği",
      "Şehir turları ve rehberlik hizmetleri",
      "Tüm transfer hizmetleri",
    ],
    notIncluded: [
      "Öğle yemekleri",
      "Kişisel harcamalar",
      "Opsiyonel turlar",
    ],
  },
  {
    id: 5,
    title: "Atina & Selanik Kültür Turu",
    image:
      "https://images.unsplash.com/photo-1639426325236-7c429d8ee09b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlY2UlMjBhdGhlbnMlMjB0cmF2ZWwlMjB0b3VyfGVufDF8fHx8MTc3MTc5NjQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1763787002975-5aefe199191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1587992384141-5f13776b518b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1700549586671-6d5868866337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1684161223491-05b8ed84b3cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    startDate: "10.05.2026",
    duration: "4 Gece 5 Gün",
    nightCount: 4,
    dayCount: 5,
    countries: 1,
    cities: 4,
    transport: "bus",
    transportLabel: "Otobus",
    route: "İstanbul → Selanik → Meteora → Atina → İstanbul",
    departureCity: "İstanbul",
    originalPrice: 450,
    price: 385,
    currency: "€",
    priceInTL: 19751,
    discount: 14,
    isVisa: false,
    isRecommended: true,
    rating: 4.5,
    reviewCount: 92,
    altDates: ["24.05.2026", "07.06.2026"],
    highlights: "OTOBUSLE VIZESIZ YUNANİSTAN KÜLTÜR TURU\n4 GECE 5 GÜN – 4 ŞEHİR",
    description:
      "Antik medeniyetin beşiği Yunanistan'ı keşfediyoruz. Selanik'in Bizans kiliseleri, Meteora'nın kayalık manastırları ve Atina'nın Akropolis'i bu muhteşem turda sizi bekliyor.",
    program: [
      {
        day: 1,
        title: "İstanbul – Selanik",
        content: "İstanbul'dan hareket ederek Yunanistan sınırını geçiyoruz ve Selanik'e varıyoruz.",
        hotel: "Hotel Capsis 4* – Selanik",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "Selanik – Meteora",
        content:
          "Selanik şehir turu: Beyaz Kule, Atatürk'ün Evi, Eski Çarşı. Ardından Meteora'ya hareket ve kayaların tepesindeki manastırlar turu.",
        hotel: "Hotel Kastraki 4* – Meteora",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 3,
        title: "Meteora – Atina",
        content: "Meteora'dan Atina'ya uzun yolculuk. Akşam Atina'ya varış.",
        hotel: "Hotel Titania 4* – Atina",
        route: "Meteora – Atina 330 KM",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 4,
        title: "Atina Tam Gün",
        content:
          "Akropolis, Parthenon, Herodion Amfitiyatrosu, Atina Müzesi ve Plaka semti turu.",
        hotel: "Hotel Titania 4* – Atina",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 5,
        title: "Atina – İstanbul",
        content: "Sabah erken kalkış ve İstanbul'a dönüş yolculuğu.",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "Lüks klimalı turizm otobusu ile ulaşım",
      "4 gece 4* otellerde kahvaltı dahil konaklama",
      "3 akşam yemeği",
      "Profesyonel Türkçe rehberlik",
      "Tüm otoban ve sınır geçiş ücretleri",
    ],
    notIncluded: [
      "Öğle yemekleri",
      "Müze giriş ücretleri",
      "Kişisel harcamalar",
    ],
  },
  {
    id: 6,
    title: "Viyana & Prag Grand Tur",
    image:
      "https://images.unsplash.com/photo-1707998982041-1b72118e4c7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWVubmElMjBhdXN0cmlhJTIwdHJhdmVsJTIwY2l0eXxlbnwxfHx8fDE3NzE3OTY0NjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1637013252559-96b426f46d77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1587992384141-5f13776b518b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1700549586671-6d5868866337?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      "https://images.unsplash.com/photo-1763787002975-5aefe199191b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    ],
    startDate: "01.06.2026",
    duration: "6 Gece 7 Gün",
    nightCount: 6,
    dayCount: 7,
    countries: 3,
    cities: 8,
    transport: "plane",
    transportLabel: "THY",
    route: "İstanbul → Viyana → Salzburg → Prag → İstanbul",
    departureCity: "İstanbul",
    price: 820,
    currency: "€",
    priceInTL: 42086,
    isVisa: false,
    rating: 4.8,
    reviewCount: 178,
    altDates: ["15.06.2026", "29.06.2026"],
    highlights: "UÇAKLI ORTA AVRUPA GRAND TURU\n6 GECE 7 GÜN – 3 ÜLKE 8 ŞEHİR",
    description:
      "Avusturya ve Çek Cumhuriyeti'nin başkentleri Viyana ve Prag'ı, Mozart'ın kenti Salzburg ile bir arada keşfediyoruz. İmparatorluk sarayları, Gotik katedraller ve büyüleyici panoramalarla dolu bu tur, Orta Avrupa'nın en iyilerini sunar.",
    program: [
      {
        day: 1,
        title: "İstanbul – Viyana",
        content: "THY uçuşuyla Viyana'ya varış. Otel yerleşimi ve Ring Bulvarı yürüyüşü.",
        hotel: "Hotel Marriott 5* – Viyana",
        meals: "Akşam Yemeği Dahil",
      },
      {
        day: 2,
        title: "Viyana Tam Gün",
        content:
          "Schönbrunn Sarayı, Hofburg Sarayı, Devlet Operası ve Naschmarkt pazarı turu.",
        hotel: "Hotel Marriott 5* – Viyana",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 3,
        title: "Viyana – Salzburg",
        content:
          "Salzburg'a hareket. Mozart'ın doğduğu ev, Hohensalzburg Kalesi ve tarihi eski şehir turu.",
        hotel: "Hotel Stein 4* – Salzburg",
        route: "Viyana – Salzburg 300 KM",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 4,
        title: "Salzburg – Prag",
        content: "Salzburg'dan Çek Cumhuriyeti'ne geçiş. Prag'a akşam varışı.",
        hotel: "Hotel Hilton 5* – Prag",
        route: "Salzburg – Prag 470 KM",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 5,
        title: "Prag Tam Gün",
        content:
          "Prag Kalesi, Aziz Vitus Katedrali, Charles Köprüsü, Eski Şehir Meydanı ve Astronomik Saat turu.",
        hotel: "Hotel Hilton 5* – Prag",
        meals: "Kahvaltı & Akşam Yemeği Dahil",
      },
      {
        day: 6,
        title: "Prag – Serbest Gün",
        content:
          "Serbest gün: alışveriş, Vyšehrad ziyareti veya opsiyonel Kutná Hora turu.",
        hotel: "Hotel Hilton 5* – Prag",
        meals: "Kahvaltı Dahil",
      },
      {
        day: 7,
        title: "Prag – İstanbul",
        content: "Kahvaltının ardından havalimanına transfer ve İstanbul'a dönüş.",
        meals: "Kahvaltı Dahil",
      },
    ],
    included: [
      "THY ile gidiş-dönüş ekonomi sınıfı biletler",
      "6 gece 4-5 yıldızlı otellerde kahvaltı dahil konaklama",
      "3 akşam yemeği",
      "Tüm şehirlerde panoramik turlar",
      "Profesyonel Türkçe rehberlik hizmetleri",
      "Lüks klimalı araç ile transferler",
      "Seyahat sigortası",
    ],
    notIncluded: [
      "Öğle yemekleri",
      "Kişisel harcamalar",
      "Opsiyonel turlar",
      "Müze giriş ücretleri",
    ],
  },
];