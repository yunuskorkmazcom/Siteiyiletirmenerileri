import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  ChevronLeft, ChevronRight, Search, MapPin, Calendar, Users,
  ArrowRight, Star, CheckCircle, ChevronDown, ChevronUp,
  Phone, Mail, Bus, Plane, Shield, Clock, Award, Headphones,
  TrendingUp,
} from "lucide-react";
import { TOURS } from "../data/tours";
import { HOTELS } from "../data/hotels";
import { TourCardGrid } from "../components/TourCardGrid";

/* ─── HERO SLIDES ─────────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1664832398268-1076d497ecd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    tag: "🏆 2026'nın En Çok Tercih Edilen Turu",
    title: "Balkanları\nKeşfet",
    subtitle: "6 Ülke · 24 Şehir · Vizesiz · Otobus ile",
    cta: "Balkan Turlarını Gör",
    ctaHref: "/",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1642947392311-2aa4ba407d19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    tag: "✈️ Uçaklı Avrupa",
    title: "Avrupa'nın\nBaşkentleri",
    subtitle: "Paris · Viyana · Roma · Barselona",
    cta: "Avrupa Turlarını İncele",
    ctaHref: "/",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1573481726566-9d98bb795fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    tag: "🌊 Yaz Özel",
    title: "Akdeniz &\nEge Rüyası",
    subtitle: "Santorini · Mikonos · Rodos · Atina",
    cta: "Ada Turlarına Bak",
    ctaHref: "/",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1768069794857-9306ac167c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920",
    tag: "🌟 Egzotik Destinasyonlar",
    title: "Dubai &\nMısır Turu",
    subtitle: "Lüks Oteller · Çöl Safarisi · Piramitler",
    cta: "Egzotik Turlar",
    ctaHref: "/",
  },
];

/* ─── CATEGORIES ──────────────────────────────────────────────── */
const categories = [
  { label: "Balkan Turları", icon: "🏔️", image: "https://images.unsplash.com/photo-1698785822764-899044655784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 14 },
  { label: "Avrupa Turları", icon: "🗼", image: "https://images.unsplash.com/photo-1683117997469-1bd59def5c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 22 },
  { label: "Vizesiz Turlar", icon: "✅", image: "https://images.unsplash.com/photo-1698637644147-54099497b214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 18 },
  { label: "Yunanistan", icon: "🏛️", image: "https://images.unsplash.com/photo-1573481726566-9d98bb795fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 9 },
  { label: "İtalya Turları", icon: "🍕", image: "https://images.unsplash.com/photo-1698103182362-51abdc45d008?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 11 },
  { label: "Mısır Turları", icon: "🪬", image: "https://images.unsplash.com/photo-1732737900015-854072f72b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 6 },
  { label: "Dubai Turları", icon: "🌆", image: "https://images.unsplash.com/photo-1768069794857-9306ac167c6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 5 },
  { label: "Kıbrıs Otelleri", icon: "🏖️", image: "https://images.unsplash.com/photo-1726270421477-4fe1094c2108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", count: 8 },
];

/* ─── BLOG POSTS ──────────────────────────────────────────────── */
const blogPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1713459268796-6d1218e16900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Seyahat Rehberi",
    date: "15 Ocak 2026",
    title: "Balkan Turu Öncesi Bilmeniz Gereken 10 Şey",
    excerpt: "Vizesiz Balkan turuna çıkmadan önce bu ipuçlarını mutlaka okuyun. Pasaport gereksinimleri, para birimi ve daha fazlası...",
    readTime: "5 dk",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1698785822764-899044655784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "Destinasyon",
    date: "8 Şubat 2026",
    title: "Kotor Körfezi: Adriyatik'in Saklı Cenneti",
    excerpt: "Orta Çağ surlarıyla çevrili bu masalsı şehre neden mutlaka gitmelisiniz? İşte Kotor'un büyüleyici tarihi...",
    readTime: "7 dk",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1726270421477-4fe1094c2108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    category: "İpuçları",
    date: "2 Mart 2026",
    title: "Yurt Dışı Seyahatte Bütçenizi Nasıl Yönetirsiniz?",
    excerpt: "Avrupa'da seyahat ederken para biriktirmenin en akıllı yolları. Euro kuruna karşı korunma stratejileri...",
    readTime: "4 dk",
  },
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const faqs = [
  { q: "Vizesiz turlar için hangi belgeler gerekli?", a: "Vizesiz Balkan turlarımız için geçerli TC kimlik kartı veya pasaport yeterlidir. Pasaportun seyahat tarihi itibarıyla en az 6 ay geçerlilik süresi olması gerekmektedir." },
  { q: "Tur fiyatlarına neler dahildir?", a: "Tur fiyatlarımıza ulaşım (otobus veya uçak), 4 yıldızlı otellerde konaklama, kahvaltı ve akşam yemeği, Türkçe konuşan profesyonel rehber, gezi girişleri ve seyahat sigortası dahildir." },
  { q: "Rezervasyon iptali durumunda ne olur?", a: "Tur başlangıç tarihinden 30 gün öncesine kadar yapılan iptallerde tam iade yapılır. 30-15 gün arasında %50, 15 günden kısa sürede ise iade yapılmamaktadır." },
  { q: "Taksitli ödeme imkânı var mı?", a: "Evet! Tüm kredi kartlarıyla 12 aya kadar taksit imkânı sunulmaktadır. Ayrıca erken rezervasyon indirimlerinden yararlanmak için tur başlangıcından en az 60 gün önce rezervasyon yapmanızı öneririz." },
  { q: "Grup indirimi uygulanıyor mu?", a: "8 kişi ve üzeri gruplarda %10, 15 kişi ve üzerinde %15 grup indirimi uygulanmaktadır. Kurumsal turlar için özel fiyatlandırma için bizimle iletişime geçin." },
  { q: "Çocuklar tura katılabilir mi?", a: "2-12 yaş arası çocuklar için %30 çocuk indirimi uygulanmaktadır. 2 yaş altı çocuklar ücretsiz seyahat edebilir (koltuk tahsisi yapılmaz)." },
];

/* ─── STATS ───────────────────────────────────────────────────── */
const stats = [
  { icon: Users, value: "50.000+", label: "Mutlu Yolcu" },
  { icon: Award, value: "10 Yıl", label: "Sektör Deneyimi" },
  { icon: Shield, value: "TÜRSAB", label: "Belgeli Acente" },
  { icon: Headphones, value: "365 Gün", label: "Çağrı Desteği" },
];

/* ─── DEPARTURE CITIES ───────────────────────────────────────── */
const departureCities = ["İstanbul (SAW)", "İstanbul (İST)", "Ankara", "İzmir", "Antalya", "Bursa"];

/* ═══════════════════════════════════════════════════════════════ */
export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchTab, setSearchTab] = useState<"tur" | "otel">("tur");
  const [departureCity, setDepartureCity] = useState("İstanbul (SAW)");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* auto-play */
  useEffect(() => {
    timerRef.current = setInterval(() => goTo((prev) => (prev + 1) % slides.length), 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  function goTo(updater: number | ((prev: number) => number)) {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(typeof updater === "function" ? updater : () => updater);
    setTimeout(() => setIsAnimating(false), 700);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo((p) => (p + 1) % slides.length), 5500);
  }

  const slide = slides[currentSlide];

  const featuredTours = TOURS.filter((t) => t.isRecommended).slice(0, 3);
  const balkanTours = TOURS.filter((t) => t.route.toLowerCase().includes("belgrad") || t.title.toLowerCase().includes("balkan")).slice(0, 3);
  const visaFreeTours = TOURS.filter((t) => t.isVisa).slice(0, 3);
  const europeTours = TOURS.filter((t) => t.transport === "plane").slice(0, 3);

  return (
    <div className="bg-gray-50">

      {/* ══════════════════════════════════════════════════════════
          1. HERO SLIDER + SEARCH (İÇ İÇE)
      ══════════════════════════════════════════════════════════ */}
      <section className="relative">
        {/* Slider */}
        <div className="relative h-[480px] md:h-[540px] overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            >
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
            </div>
          ))}

          {/* Slide content */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4 pb-28 md:pb-32">
            <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm px-4 py-1.5 rounded-full mb-5 shadow">
              {slide.tag}
            </span>
            <h1
              className="text-white drop-shadow-xl mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, whiteSpace: "pre-line" }}
            >
              {slide.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl">
              {slide.subtitle}
            </p>
            <Link
              to={slide.ctaHref}
              className="flex items-center gap-2 bg-[#E31E24] hover:bg-[#c01a1f] text-white px-7 py-3.5 rounded-xl font-semibold shadow-xl transition-all hover:scale-105"
            >
              {slide.cta}
              <ArrowRight size={18} />
            </Link>
          </div>

          {/* Arrows */}
          <button
            onClick={() => goTo((p) => (p - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/30"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => goTo((p) => (p + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all border border-white/30"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`transition-all rounded-full ${i === currentSlide ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"}`}
              />
            ))}
          </div>
        </div>

        {/* ── Search Panel (hero üzerine bindirilmiş) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                {(["tur", "otel"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSearchTab(tab)}
                    className={`px-6 py-3.5 text-sm font-semibold capitalize transition-colors ${
                      searchTab === tab
                        ? "text-[#0057A8] border-b-2 border-[#0057A8] bg-blue-50/50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "tur" ? "🧳 Tur Ara" : "🏨 Otel Ara"}
                  </button>
                ))}
              </div>

              {/* Fields */}
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Kalkış */}
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Kalkış Şehri</label>
                  <div className="relative">
                    <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0057A8]" />
                    <select
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#0057A8] appearance-none"
                    >
                      {departureCities.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                {/* Tarih */}
                <div>
                  <label className="block text-xs text-gray-500 mb-1 font-medium">Tur Tarihi</label>
                  <div className="relative">
                    <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0057A8]" />
                    <input
                      type="date"
                      className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-[#0057A8]"
                    />
                  </div>
                </div>

                {/* Ara */}
                <div className="flex flex-col justify-end">
                  <label className="block text-xs text-gray-500 mb-1 font-medium opacity-0 select-none">Ara</label>
                  <Link
                    to="/"
                    className="flex items-center justify-center gap-2 bg-[#E31E24] hover:bg-[#c01a1f] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-red-200 whitespace-nowrap"
                  >
                    <Search size={15} />
                    Ara
                  </Link>
                </div>
              </div>

              {/* Hızlı linkler */}
              <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400">Popüler:</span>
                {["Balkan Turu", "Prag & Viyana", "Santorini", "Dubai", "Mısır"].map((t) => (
                  <button key={t} className="text-xs text-[#0057A8] hover:text-[#E31E24] transition-colors px-2.5 py-1 bg-blue-50 hover:bg-red-50 rounded-lg">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arama panelinin yüksekliği kadar boşluk bırak */}
      <div className="h-40 md:h-32" />

      {/* ══════════════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#0057A8] pt-14 pb-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-4 text-white">
              <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                <Icon size={22} />
              </div>
              <div>
                <p className="font-bold text-xl leading-tight">{value}</p>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. KATEGORİLER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#E31E24] text-sm font-semibold uppercase tracking-wider mb-1">Kategoriler</p>
            <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>Nereye Gitmek İstersiniz?</h2>
          </div>
          <Link to="/" className="hidden sm:flex items-center gap-1.5 text-[#0057A8] text-sm font-medium hover:text-[#E31E24] transition-colors">
            Tümünü Gör <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              to="/"
              key={cat.label}
              className="group relative h-40 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm drop-shadow">{cat.label}</p>
                <p className="text-white/70 text-xs">{cat.count} tur</p>
              </div>
              <div className="absolute top-3 left-3 text-xl">{cat.icon}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. ÖNE ÇIKAN TURLAR
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#E31E24] text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-2">
                <TrendingUp size={14} /> Öne Çıkan
              </p>
              <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>En Çok Tercih Edilen Turlar</h2>
            </div>
            <Link to="/" className="hidden sm:flex items-center gap-1.5 text-[#0057A8] text-sm font-medium hover:text-[#E31E24] transition-colors">
              Tüm Turlar <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(featuredTours.length > 0 ? featuredTours : TOURS.slice(0, 3)).map((t) => (
              <TourCardGrid key={t.id} tour={t} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 border-2 border-[#0057A8] text-[#0057A8] hover:bg-[#0057A8] hover:text-white px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Tüm Turları Gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. BALKAN TURLARI — Banner + Kartlar
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        {/* Banner */}
        <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden mb-10 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1664832398268-1076d497ecd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Balkan Turları"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0057A8]/90 via-[#0057A8]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-14">
            <span className="text-white/80 text-sm font-medium mb-2">🏔️ Vizesiz Seyahat</span>
            <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}>Balkan Turları</h2>
            <p className="text-white/80 text-sm max-w-sm mb-5">6 Ülke, 24 Şehir. Otobus ile vizesiz Balkan keşfi.</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-[#0057A8] hover:bg-[#E31E24] hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-fit"
            >
              Tüm Balkan Turları <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(balkanTours.length > 0 ? balkanTours : TOURS.slice(0, 3)).map((t) => (
            <TourCardGrid key={t.id} tour={t} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. VİZESİZ TURLAR
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Banner */}
          <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden mb-10 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1643924867767-e3990a312ada?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Vizesiz Turlar"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-emerald-800/55 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-14 bg-[#1f307d00]">
              <span className="text-white/80 text-sm font-medium mb-2 flex items-center gap-1.5">
                <CheckCircle size={14} /> Pasaport Yeterli
              </span>
              <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}>Vizesiz Turlar</h2>
              <p className="text-white/80 text-sm max-w-sm mb-5">Sadece pasaport ile seyahat edebileceğiniz turlar.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#E31E24] text-white hover:bg-white hover:text-[#E31E24] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-fit"
              >
                Tüm Vizesiz Turlar <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(visaFreeTours.length > 0 ? visaFreeTours : TOURS.filter((t) => t.isVisa).slice(0, 3)).map((t) => (
              <TourCardGrid key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. AVRUPA TURLARI — Grid kartları
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Banner */}
          <div className="relative h-52 md:h-64 rounded-3xl overflow-hidden mb-10 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1683117997469-1bd59def5c57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Avrupa Turları"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-14">
              <span className="text-white/80 text-sm font-medium mb-2">✈️ Uçaklı Turlar</span>
              <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}>Avrupa Turları</h2>
              <p className="text-white/80 text-sm max-w-sm mb-5">Paris, Roma, Viyana, Prag ve daha fazlası. Uçaklı konforlu Avrupa turu.</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#E31E24] text-white hover:bg-white hover:text-[#E31E24] px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-fit"
              >
                Tüm Avrupa Turları <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Transport icons */}
          

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(europeTours.length > 0 ? europeTours : TOURS.slice(0, 3)).map((t) => (
              <TourCardGrid key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          7. ÖNE ÇIKAN OTELLER
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Banner */}
          <div className="relative h-52 md:h-60 rounded-3xl overflow-hidden mb-10 shadow-xl">
            <img
              src="https://images.unsplash.com/flagged/photo-1557006027-cf0673ec2cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
              alt="Oteller"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0057A8]/90 via-[#0057A8]/55 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center pl-8 md:pl-14">
              <span className="text-white/80 text-sm font-medium mb-2">🏨 Lüks & Konfor</span>
              <h2 className="text-white mb-3" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)", fontWeight: 800 }}>Öne Çıkan Oteller</h2>
              <p className="text-white/80 text-sm max-w-sm mb-5">Kıbrıs, Antalya ve daha fazlası. Ultra her şey dahil konseptiyle unutulmaz tatil.</p>
              <Link
                to="/tum-oteller"
                className="inline-flex items-center gap-2 bg-white text-[#0057A8] hover:bg-[#E31E24] hover:text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all w-fit"
              >
                Tüm Oteller <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOTELS.filter((h) => h.isFeatured || h.isRecommended).slice(0, 4).map((hotel) => (
              <Link
                key={hotel.id}
                to={`/otel/${hotel.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Stars */}
                  <div className="absolute top-3 left-3 flex items-center gap-0.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {/* Badge */}
                  {hotel.badge && (
                    <span className="absolute top-3 right-3 bg-[#E31E24] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {hotel.badge}
                    </span>
                  )}
                  {/* Concept pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-[#0057A8] text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      {hotel.concept}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1 group-hover:text-[#0057A8] transition-colors line-clamp-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                    <MapPin size={11} className="text-[#0057A8]" />
                    <span>{hotel.city}, {hotel.country}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#0057A8] text-white text-xs font-bold px-2 py-0.5 rounded-lg">
                      {hotel.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-600 font-medium">{hotel.ratingLabel}</span>
                    <span className="text-xs text-gray-400">({hotel.reviewCount})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-end justify-between border-t border-gray-100 pt-3">
                    <div>
                      {hotel.discount && (
                        <p className="text-[10px] text-gray-400 line-through mb-0.5">
                          {Math.round(hotel.price / (1 - hotel.discount / 100)).toLocaleString("tr-TR")} {hotel.currency}
                        </p>
                      )}
                      <p className="text-[#E31E24] font-bold text-base leading-tight">
                        {hotel.price.toLocaleString("tr-TR")} <span className="text-sm">{hotel.currency}</span>
                      </p>
                      <p className="text-[10px] text-gray-400">kişi başı / gece</p>
                    </div>
                    <span className="text-xs text-[#0057A8] font-semibold bg-blue-50 px-2.5 py-1 rounded-lg group-hover:bg-[#0057A8] group-hover:text-white transition-colors">
                      İncele →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Tümünü gör */}
          
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          8. SSS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#E31E24] text-sm font-semibold uppercase tracking-wider mb-2">SSS</p>
            <h2 className="text-gray-900 mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>Sık Sorulan Sorular</h2>
            <p className="text-gray-500">Aklınızdaki soruları yanıtlıyoruz. Daha fazlası için bize ulaşın.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-gray-900 text-sm leading-snug">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={18} className="text-[#E31E24] shrink-0" />
                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          9. BLOG
      ══════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[#E31E24] text-sm font-semibold uppercase tracking-wider mb-1">Blog</p>
              <h2 className="text-gray-900" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700 }}>Seyahat Rehberi & İpuçları</h2>
            </div>
            <a href="#" className="hidden sm:flex items-center gap-1.5 text-[#0057A8] text-sm font-medium hover:text-[#E31E24] transition-colors">
              Tüm Yazılar <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article key={post.id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0057A8] text-white text-xs px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime} okuma</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 leading-snug mb-2 group-hover:text-[#0057A8] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                  <a href="#" className="flex items-center gap-1.5 text-[#E31E24] text-sm font-semibold hover:gap-3 transition-all">
                    Devamını Oku <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          10. İLETİŞİM CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1698785822764-899044655784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="CTA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0057A8]/95 to-[#003d7a]/90" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full text-sm mb-6">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            10 Yıldır Güvenilir Seyahat Partneri
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800 }}>
            Hayalinizdeki Tatil<br />Bir Telefon Uzağınızda
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Uzman tur danışmanlarımız size özel en uygun turu bulmak için hazır. 365 gün, 7/24 çağrı desteği.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <a
              href="tel:08500000000"
              className="flex items-center gap-3 bg-white text-[#0057A8] hover:bg-[#E31E24] hover:text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:scale-105"
            >
              <Phone size={22} />
              0850 000 00 00
            </a>
            <a
              href="mailto:info@tourbulance.com"
              className="flex items-center gap-3 bg-white/20 hover:bg-white hover:text-[#0057A8] text-white border-2 border-white/50 px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-sm"
            >
              <Mail size={22} />
              E-posta Gönder
            </a>
          </div>

          {/* Trust badges */}
          
        </div>
      </section>

    </div>
  );
}