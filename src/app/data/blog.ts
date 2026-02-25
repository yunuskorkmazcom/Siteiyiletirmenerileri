export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "yunanistan-adalar-rehberi",
    title: "Yunanistan Adaları: Santorini'den Korfu'ya Eksiksiz Seyahat Rehberi",
    excerpt: "Ege'nin incileri arasında unutulmaz bir yolculuğa hazır mısınız? Bu rehberde Yunanistan'ın en güzel adalarını, en iyi görülecek yerleri ve pratik seyahat ipuçlarını bulacaksınız.",
    content: `Yunanistan'ın Ege ve İyon kıyılarına serpilmiş adaları, binlerce yıllık tarih ve eşsiz doğal güzellikleriyle her seyahatseveri büyüler. Bu kapsamlı rehberde size en popüler ve saklı adaları tanıtacağız.

## Santorini: Kartpostalın Ötesinde

Santorini, volkanik bir patlamanın şekillendirdiği yarım ay biçimindeki yapısıyla diğer adalardan tamamen farklı bir deneyim sunar. Beyaz badanalı evleri ve mavi kubbeli kiliseleriyle Oia köyü, gün batımını izlemek için dünyanın en güzel noktalarından biridir.

**Görülmesi Gerekenler:**
- Oia Kalesi gün batımı seyri
- Akrotiri arkeolojik kazı alanı
- Perissa ve Kamari'nin siyah kum plajları
- Fira'da şarap tadımı turları

## Korfu: Venedik İzlerini Taşıyan Ada

Adriyatik'in kapısındaki Korfu, İtalyan, Fransız ve İngiliz kültürlerinin izlerini taşır. Eski şehri UNESCO Dünya Mirası listesindedir.

## Pratik Bilgiler

- **En İyi Zaman:** Nisan-Haziran veya Eylül-Ekim
- **Ulaşım:** İstanbul'dan direkt uçuşlar mevcut
- **Vize:** Schengen vizesi gereklidir
- **Para Birimi:** Euro (€)`,
    image: "https://images.unsplash.com/photo-1665127556916-3291e7de3ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Seyahat Rehberi",
    author: "Ayşe Kaya",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "15 Şubat 2026",
    readTime: 8,
    tags: ["Yunanistan", "Ada", "Santorini", "Ege"],
    featured: true,
  },
  {
    id: 2,
    slug: "balkan-turu-deneyimi",
    title: "8 Günde 6 Ülke: Balkan Turum Hakkında Her Şey",
    excerpt: "Otobüsle vizesiz Balkan turu nasıl geçti? Belgrad'dan Dubrovnik'e uzanan rota boyunca yaşadıklarımı, önerilerimi ve bütçe hesabımı paylaşıyorum.",
    content: `Balkan turu, Türkiye'den seyahat edenlerin en favori rotalarından biri haline geldi. Hem vizesiz hem de kültürel açıdan son derece zengin bu rota hakkında kapsamlı bir yazı hazırladım.

## Rota Planı

**1. Gün — İstanbul → Belgrad**
Sabiha Gökçen'den kalkış, gece sınırı geçiyoruz. Sabah erken saatlerde Sırbistan'ın başkenti Belgrad'a ulaşıyoruz.

**2. Gün — Belgrad Turu**
Kalemegdan Kalesi, Knez Mihailova Caddesi ve Ada Ciganlija plajı ziyaret ediliyor.

## Bütçe Hesabı

| Kalem | Miktar |
|-------|--------|
| Tur Fiyatı | 599 € |
| Kişisel Harcamalar | ~150 € |
| Toplam | ~750 € |`,
    image: "https://images.unsplash.com/photo-1760201938689-a2b0f52bbcd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Deneyim",
    author: "Mehmet Demir",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "8 Şubat 2026",
    readTime: 12,
    tags: ["Balkan", "Otobüs Turu", "Vizesiz", "Belgrad"],
  },
  {
    id: 3,
    slug: "avrupa-seyahati-bavul-rehberi",
    title: "Avrupa Seyahatine Çıkmadan Önce Bavulunuza Koymanız Gerekenler",
    excerpt: "Seyahat uzmanlarının önerdiği, hem hafif hem pratik bavul listesi. Avrupa turlarında en çok neye ihtiyaç duyulur?",
    content: `Avrupa'ya gidecekler için hazırladığımız bu rehber, pek çok seyahatçinin aklındaki en büyük soruyu yanıtlıyor: "Bavuluma ne koymalıyım?"

## Temel Prensipler

1. **Hafif paketleyin:** Avrupa'daki eski şehirlerde kaldırım taşları üzerinde bavul çekmeyi göz önünde bulundurun.
2. **Katmanlar halinde giyin:** Avrupa iklimi mevsime göre büyük farklılıklar gösterir.
3. **Çok amaçlı kıyafetler:** Her parçanın en az 3 farklı kombinasyonda kullanılabilmesi idealdir.

## Mutlaka Bulunması Gerekenler

- Evrensel adaptör
- Ufak para çantası
- Güneş kremi (SPF 50+)
- Yürüyüş ayakkabısı`,
    image: "https://images.unsplash.com/photo-1750462137342-09c8797d2fdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "İpuçları",
    author: "Zeynep Arslan",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "1 Şubat 2026",
    readTime: 6,
    tags: ["Avrupa", "Bavul", "Hazırlık", "İpucu"],
  },
  {
    id: 4,
    slug: "vize-basvurusu-rehberi",
    title: "Schengen Vize Başvurusu: Adım Adım Rehber",
    excerpt: "İlk kez Schengen vizesi alacaklar için kapsamlı bir rehber. Gerekli evraklar, başvuru süreci ve dikkat edilmesi gerekenler.",
    content: `Schengen vizesi, 27 Avrupa ülkesine tek bir vizeyle girme imkânı tanır. Bu rehberde başvuru sürecini adım adım açıklıyoruz.

## Gerekli Belgeler

1. Geçerli pasaport (6 ay geçerliliği olmalı)
2. Biyometrik fotoğraf (son 6 ay)
3. Seyahat sigortası
4. Otel rezervasyonu
5. Uçak bileti
6. Banka hesap dökümleri

## Başvuru Süreci

Vize başvurusu için ilgili ülkenin konsolosluğuna veya yetkili vize merkezine başvurmanız gerekir.`,
    image: "https://images.unsplash.com/photo-1758928807847-ed94f9ed3cad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Vize",
    author: "Ali Çelik",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "25 Ocak 2026",
    readTime: 10,
    tags: ["Vize", "Schengen", "Belge", "Başvuru"],
  },
  {
    id: 5,
    slug: "istanbul-cikisli-turlar",
    title: "İstanbul Çıkışlı Turların Avantajları ve Önerilen Rotalar",
    excerpt: "İstanbul'dan çıkış yapan turlarda ne gibi avantajlar var? En popüler destinasyonlar ve fiyat karşılaştırması.",
    content: `İstanbul, Avrupa ve Asya arasındaki stratejik konumuyla mükemmel bir başlangıç noktasıdır.

## Neden İstanbul Çıkışı?

- Sabiha Gökçen ve Atatürk havalimanlarından dünya genelinde doğrudan uçuşlar
- Otobüs turları için merkezi bir başlangıç noktası
- Fiyat avantajı

## En Popüler Rotalar

1. Balkan Turu (7 gece 8 gün)
2. Avrupa Kültür Turu (10 gece 11 gün)
3. Uzakdoğu Turu (14 gece 15 gün)`,
    image: "https://images.unsplash.com/photo-1653549882026-4c92d25bee4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Tur Rehberi",
    author: "Ayşe Kaya",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "18 Ocak 2026",
    readTime: 5,
    tags: ["İstanbul", "Çıkış Şehri", "Tur"],
  },
  {
    id: 6,
    slug: "butce-dostu-seyahat-tuyolari",
    title: "2026'da Avrupa'yı Bütçe Dostu Gezmek: 15 Altın Kural",
    excerpt: "Fazla para harcamadan Avrupa'yı gezmek mümkün. Uzmanların tavsiye ettiği tasarruf yöntemleriyle hayalinizdeki tatile kavuşun.",
    content: `Avrupa pahalı bir destinasyon olarak bilinse de doğru planlama ile bütçe dostu bir gezi yapmak mümkündür.

## 15 Altın Kural

1. **Erken rezervasyon:** 3-6 ay önceden planlama yapın.
2. **Omuz sezonu:** Nisan-Mayıs veya Eylül-Ekim'de gidin.
3. **Grup turu avantajı:** Toplu rezervasyonlarda indirim alın.
4. **Ücretsiz müzeler:** Pek çok Avrupa müzesi belirli günlerde ücretsizdir.`,
    image: "https://images.unsplash.com/photo-1629952437774-170bc3e7d48b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "İpuçları",
    author: "Mehmet Demir",
    authorAvatar: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=100",
    date: "10 Ocak 2026",
    readTime: 7,
    tags: ["Bütçe", "Avrupa", "Tasarruf", "İpucu"],
  },
];

export const BLOG_CATEGORIES = ["Tümü", "Seyahat Rehberi", "Deneyim", "İpuçları", "Vize", "Tur Rehberi"];
