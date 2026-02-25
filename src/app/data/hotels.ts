export interface HotelRoom {
  name: string;
  concept: string;
  price: number;
  priceInTL: number;
  capacity: string;
  available: boolean;
}

export interface HotelArtist {
  name: string;
  date: string;
  image: string;
}

export interface Hotel {
  id: number;
  slug: string;
  name: string;
  city: string;
  region: string;
  country: string;
  stars: number;
  rating: number;
  ratingLabel: string;
  reviewCount: number;
  concept: string;
  image: string;
  gallery: string[];
  price: number;
  priceInTL: number;
  currency: string;
  discount?: number;
  badge?: string;
  isRecommended?: boolean;
  description: string;
  features: string[];
  beachFeatures?: string[];
  internetFeatures: string[];
  parkingFeatures: string[];
  otherFacilities: string[];
  rooms: HotelRoom[];
  artists?: HotelArtist[];
  childPolicy?: string;
  paymentNote?: string;
  campaignNote?: string;
  viewerCount: number;
  isFeatured?: boolean;
}

const IMG = {
  resort1: "https://images.unsplash.com/flagged/photo-1557006027-cf0673ec2cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  lobby: "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  coast: "https://images.unsplash.com/photo-1759490897561-5a3659b24d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  pool1: "https://images.unsplash.com/photo-1758538005259-9b29292204ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  room: "https://images.unsplash.com/photo-1636340629239-008219592d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  pool2: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  spa: "https://images.unsplash.com/photo-1711714956204-e1d84e4d8879?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  aerial: "https://images.unsplash.com/photo-1719558605998-b6c2218d975d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
};

export const HOTELS: Hotel[] = [
  {
    id: 1,
    slug: "rocks-hotel-resort",
    name: "Rocks Hotel Resort",
    city: "Girne",
    region: "Merkez",
    country: "Kıbrıs",
    stars: 5,
    rating: 9.0,
    ratingLabel: "Mükemmel",
    reviewCount: 248,
    concept: "Ultra Her Şey Dahil",
    image: IMG.resort1,
    gallery: [IMG.pool1, IMG.coast, IMG.room, IMG.pool2, IMG.spa],
    price: 4200,
    priceInTL: 148200,
    currency: "₺",
    discount: 15,
    badge: "Fırsat",
    isRecommended: true,
    description: "Rocks Hotel, Kıbrıs'ın tatil ve eğlence merkezi Girne'nin tam kalbinde yer alan 5 yıldızlı lüks bir tesistir. Denize sıfır konumu ve 800 m²'lik ahşap iskelesi ile öne çıkmaktadır. Tesis, 5 farklı restoran ve bara ev sahipliği yapmaktadır.",
    features: ["Açık Yüzme Havuzu", "Özel Plaj", "Spa & Wellness", "Animasyon ve Eğlence", "5 Restoran & Bar", "Çocuk Kulübü", "Fitness Merkezi", "Toplantı Salonu"],
    beachFeatures: ["Özel Plaj", "800 m² Ahşap İskele", "Deniz Sporları", "Şezlong & Şemsiye"],
    internetFeatures: ["Ücretsiz Wifi ve Kablolu", "Ortak alanlar ve tüm odalar"],
    parkingFeatures: ["Ücretli Özel Otopark", "Otopark (Tesis bünyesinde)"],
    otherFacilities: ["24 Saat Resepsiyon", "Emanet Kasası", "Para Bozma", "Kuru Temizleme", "Çamaşırhane", "Tıbbi Yardım"],
    rooms: [
      { name: "Standart Oda", concept: "Ultra Her Şey Dahil", price: 4200, priceInTL: 148200, capacity: "2 Yetişkin", available: true },
      { name: "Deniz Manzaralı Oda", concept: "Ultra Her Şey Dahil", price: 5800, priceInTL: 204600, capacity: "2 Yetişkin", available: true },
      { name: "Suit Oda", concept: "Ultra Her Şey Dahil", price: 9200, priceInTL: 324600, capacity: "2 Yetişkin + 2 Çocuk", available: false },
    ],
    artists: [
      { name: "Derya Uluğ", date: "20 Mart 2026", image: IMG.resort1 },
      { name: "Defne Samyeli", date: "21 Mart 2026", image: IMG.pool1 },
      { name: "Lerzan Mutlu", date: "04 Nisan 2026", image: IMG.coast },
      { name: "Serdar Ortaç", date: "27 Mayıs 2026", image: IMG.pool2 },
      { name: "Kamuran Akkor", date: "30 Mayıs 2026", image: IMG.room },
    ],
    childPolicy: "0-12 yaş arası 1 çocuk ücretsiz",
    paymentNote: "Rezervasyonu %25 ile şimdi ödeyin, kalanı girişten 14 gün önce tamamlayın.",
    campaignNote: "8.500 TL'ye varan Vakıfbank WorldPuan Fırsatı!",
    viewerCount: 19,
    isFeatured: true,
  },
  {
    id: 2,
    slug: "limak-cyprus-deluxe",
    name: "Limak Cyprus Deluxe Hotel",
    city: "Kıbrıs",
    region: "Bafra",
    country: "Kıbrıs",
    stars: 5,
    rating: 4.9,
    ratingLabel: "Muhteşem",
    reviewCount: 512,
    concept: "Ultra Her Şey Dahil",
    image: IMG.aerial,
    gallery: [IMG.pool2, IMG.room, IMG.spa, IMG.lobby, IMG.coast],
    price: 12800,
    priceInTL: 0,
    currency: "₺",
    badge: "Fırsat",
    isRecommended: true,
    description: "Kıbrıs'ın kuzeyinde, Bafra'nın el değmemiş kıyılarında konumlanan Limak Cyprus Deluxe Hotel, doğa ile lüksü bir araya getiriyor. 5 yıldızlı bu dev tatil kompleksi, eğlence ve konfor anlayışını en üst düzeye taşıyor.",
    features: ["Açık Yüzme Havuzu", "Özel Plaj", "Animasyon ve Eğlence", "Spa", "Çocuk Parkı", "Casino"],
    internetFeatures: ["Ücretsiz Wifi", "Tüm Odalarda"],
    parkingFeatures: ["Ücretsiz Otopark"],
    otherFacilities: ["24 Saat Resepsiyon", "Havalimanı Transferi", "Çocuk Kulübü"],
    rooms: [
      { name: "Standart Oda", concept: "Ultra Her Şey Dahil", price: 12800, priceInTL: 451200, capacity: "2 Yetişkin", available: true },
      { name: "Kıyı Odası", concept: "Ultra Her Şey Dahil", price: 16400, priceInTL: 578400, capacity: "2 Yetişkin", available: true },
    ],
    artists: [
      { name: "Derya Uluğ", date: "20 Mart 2026", image: IMG.resort1 },
      { name: "Defne Samyeli", date: "21 Mart 2026", image: IMG.pool1 },
      { name: "Lerzan Mutlu", date: "04 Nisan 2026", image: IMG.coast },
      { name: "Serdar Ortaç", date: "27 Mayıs 2026", image: IMG.pool2 },
      { name: "Kamuran Akkor", date: "30 Mayıs 2026", image: IMG.room },
    ],
    childPolicy: "2 Çocuk 0-13 Yaş Ücretsiz",
    paymentNote: "Rezervasyonu %25 ile şimdi ödeyin, kalanı girişten 14 gün önce tamamlayın.",
    campaignNote: "8.500 TL'ye varan Vakıfbank WorldPuan Fırsatı! · İptal Garanti Hizmeti",
    viewerCount: 34,
  },
  {
    id: 3,
    slug: "elexus-hotel-resort",
    name: "Elexus Hotel Resort",
    city: "Girne",
    region: "Merkez",
    country: "Kıbrıs",
    stars: 5,
    rating: 8.7,
    ratingLabel: "Harika",
    reviewCount: 389,
    concept: "Her Şey Dahil",
    image: IMG.pool2,
    gallery: [IMG.resort1, IMG.room, IMG.lobby, IMG.spa, IMG.pool1],
    price: 12800,
    priceInTL: 451200,
    currency: "₺",
    badge: "Fırsat",
    description: "Girne'nin görkemli sıradağlarını arkanıza, Akdeniz'i önünüze alan Elexus Hotel Resort Casino & SPA, eşsiz konumu ve sunduğu hizmetlerle misafirlerine unutulmaz bir tatil deneyimi yaşatıyor.",
    features: ["Açık ve Kapalı Havuz", "Özel Plaj", "Casino", "Spa & Wellness", "Animasyon"],
    internetFeatures: ["Ücretsiz Wifi", "Ortak Alanlarda"],
    parkingFeatures: ["Ücretsiz Otopark"],
    otherFacilities: ["24 Saat Resepsiyon", "Havalimanı Transferi"],
    rooms: [
      { name: "Standart Oda", concept: "Her Şey Dahil", price: 12800, priceInTL: 451200, capacity: "2 Yetişkin", available: true },
    ],
    viewerCount: 12,
  },
  {
    id: 4,
    slug: "pia-bella-hotel",
    name: "Pia Bella Hotel",
    city: "Girne",
    region: "Merkez",
    country: "Kıbrıs",
    stars: 4,
    rating: 8.4,
    ratingLabel: "Çok İyi",
    reviewCount: 176,
    concept: "Yarım Pansiyon",
    image: IMG.lobby,
    gallery: [IMG.pool1, IMG.coast, IMG.room, IMG.pool2, IMG.spa],
    price: 6400,
    priceInTL: 225600,
    currency: "₺",
    badge: "Fırsat",
    description: "Girne merkezinde yer alan Pia Bella Hotel, butik tarzıyla şehir tatilinin keyfini arayan misafirler için ideal bir seçenektir.",
    features: ["Yüzme Havuzu", "Restoran", "Bar", "Fitness Salonu"],
    internetFeatures: ["Ücretsiz Wifi", "Tüm Odalarda"],
    parkingFeatures: ["Ücretli Otopark"],
    otherFacilities: ["24 Saat Resepsiyon"],
    rooms: [
      { name: "Standart Oda", concept: "Yarım Pansiyon", price: 6400, priceInTL: 225600, capacity: "2 Yetişkin", available: true },
    ],
    viewerCount: 8,
  },
  {
    id: 5,
    slug: "kaya-palazzo-resort",
    name: "Kaya Palazzo Resort",
    city: "Girne",
    region: "Merkez",
    country: "Kıbrıs",
    stars: 5,
    rating: 9.2,
    ratingLabel: "Mükemmel",
    reviewCount: 634,
    concept: "Ultra Her Şey Dahil",
    image: IMG.resort1,
    gallery: [IMG.pool2, IMG.spa, IMG.room, IMG.lobby, IMG.coast],
    price: 15200,
    priceInTL: 536160,
    currency: "₺",
    badge: "Fırsat",
    description: "Kaya Palazzo Golf & Spa Resort, Kıbrıs'ın kuzeyindeki Girne'de doğayla iç içe, görkemli bir tatil deneyimi sunuyor. 18 delikli golf sahası, spa ve her şey dahil konseptiyle öne çıkıyor.",
    features: ["Golf Sahası", "Açık Yüzme Havuzu", "Özel Plaj", "Spa & Wellness", "Casino"],
    internetFeatures: ["Ücretsiz Wifi", "Tüm Odalarda"],
    parkingFeatures: ["Ücretsiz Otopark"],
    otherFacilities: ["24 Saat Resepsiyon", "Golf Sahası", "Havalimanı Transferi"],
    rooms: [
      { name: "Standart Oda", concept: "Ultra Her Şey Dahil", price: 15200, priceInTL: 536160, capacity: "2 Yetişkin", available: true },
    ],
    viewerCount: 27,
  },
  {
    id: 6,
    slug: "merit-crystal-cove",
    name: "Merit Crystal Cove Hotel",
    city: "Gazimağusa",
    region: "Merkez",
    country: "Kıbrıs",
    stars: 5,
    rating: 8.9,
    ratingLabel: "Harika",
    reviewCount: 291,
    concept: "Her Şey Dahil",
    image: IMG.pool1,
    gallery: [IMG.resort1, IMG.lobby, IMG.coast, IMG.spa, IMG.room],
    price: 9800,
    priceInTL: 345660,
    currency: "₺",
    description: "Gazimağusa'nın muhteşem tarihi dokusu içinde, kristal berraklığında sulara kıyı komşuluğuyla özel bir konumda hizmet veren Merit Crystal Cove, lüks ve konforu mükemmel harmanlıyor.",
    features: ["Açık Yüzme Havuzu", "Özel Plaj", "Casino", "Animasyon"],
    internetFeatures: ["Ücretsiz Wifi"],
    parkingFeatures: ["Ücretsiz Otopark"],
    otherFacilities: ["24 Saat Resepsiyon"],
    rooms: [
      { name: "Standart Oda", concept: "Her Şey Dahil", price: 9800, priceInTL: 345660, capacity: "2 Yetişkin", available: true },
    ],
    viewerCount: 15,
  },
];

export const HOTEL_CITIES = [
  { name: "Girne Otelleri", slug: "girne", image: "https://images.unsplash.com/photo-1759490897561-5a3659b24d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { name: "Lefke Otelleri", slug: "lefke", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { name: "Lefkoşa Otelleri", slug: "lefkosa", image: "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
  { name: "Magosa Otelleri", slug: "magosa", image: "https://images.unsplash.com/photo-1719558605998-b6c2218d975d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" },
];
