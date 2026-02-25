import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  Search, MapPin, Calendar, Star, Heart, ChevronLeft, ChevronRight,
  Wifi, Car, Waves, Utensils, Users, SlidersHorizontal, ChevronDown, X,
} from "lucide-react";
import { HOTELS, HOTEL_CITIES } from "../data/hotels";
import { Breadcrumb } from "../components/Breadcrumb";

const CONCEPTS = ["Tümü", "Ultra Her Şey Dahil", "Her Şey Dahil", "Yarım Pansiyon", "Oda & Kahvaltı"];
const STARS_OPTS = [5, 4, 3];
const SORT_OPTS = ["Önerilen", "Fiyat (Artan)", "Fiyat (Azalan)", "Puana Göre"];

/* ── Campaign Slider ── */
const CAMPAIGNS = [
  {
    id: 1,
    bg: "from-[#0057A8] to-[#003d7a]",
    badge: "14 Şubat'a Özel",
    title: "700€'ya varan",
    highlight: "indirimlerle",
    sub: "romantik Lapland turlarını kaçırma!",
    slogan: "Hep tatil mutluluğu🤙",
    tags: ["12 Şubat 2026", "3 gece konaklamalı", "THY ile Rovaniemi gidiş – dönüş"],
    bonus: "7.500 TL'ye varan bonus!",
    bonusSub: "Ön ödeme kampanyası online rezervasyonlarda geçerli değildir.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
  {
    id: 2,
    bg: "from-[#E31E24] to-[#a01418]",
    badge: "Kıbrıs Fırsatı",
    title: "Ultra Her Şey Dahil",
    highlight: "otellerde",
    sub: "%25 erken rezervasyon indirimi!",
    slogan: "Yaz tatilini şimdi planla 🌊",
    tags: ["Nisan – Ekim 2026", "5 gece ve üzeri", "Girne & Bafra Otelleri"],
    bonus: "8.500 TL'ye varan bonus!",
    bonusSub: "Vakıfbank WorldPuan ile geçerlidir.",
    image: "https://images.unsplash.com/flagged/photo-1557006027-cf0673ec2cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
  },
];

const VIZ_BANNER = {
  image: "https://images.unsplash.com/photo-1719558605998-b6c2218d975d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
  label: "VİZESİZ YURT DIŞI TURLARI",
  cta: "REZERVASYON YAP",
};

function CampaignSlider() {
  const [current, setCurrent] = useState(0);
  const c = CAMPAIGNS[current];
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-3 mb-8">
      {/* Main slide */}
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${c.bg} min-h-[200px] flex`}>
        {/* Text */}
        <div className="flex-1 p-6 z-10">
          <span className="text-xs bg-white/20 text-white px-2.5 py-1 rounded-full">{c.badge}</span>
          <p className="text-white mt-2" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
            {c.title} <span className="text-yellow-300">{c.highlight}</span>
          </p>
          <p className="text-white/80 text-sm">{c.sub}</p>
          <p className="text-white text-sm mt-1">{c.slogan}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {c.tags.map((t) => (
              <span key={t} className="text-xs border border-white/40 text-white px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
          <div className="mt-3 bg-white/10 border border-white/20 rounded-xl px-3 py-2 inline-flex flex-col">
            <span className="text-yellow-300 text-xs font-bold">🎁 {c.bonus}</span>
            <span className="text-white/50 text-[10px] mt-0.5">{c.bonusSub}</span>
          </div>
        </div>
        {/* Image */}
        <div className="w-56 hidden sm:block shrink-0 relative">
          <img src={c.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        </div>
        {/* Arrows */}
        <button onClick={() => setCurrent((p) => (p - 1 + CAMPAIGNS.length) % CAMPAIGNS.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
          <ChevronLeft size={14} />
        </button>
        <button onClick={() => setCurrent((p) => (p + 1) % CAMPAIGNS.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all">
          <ChevronRight size={14} />
        </button>
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {CAMPAIGNS.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white w-4" : "bg-white/40"}`} />
          ))}
        </div>
      </div>
      {/* Right: Vizesiz banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[160px] group cursor-pointer">
        <img src={VIZ_BANNER.image} alt="Vizesiz" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0057A8]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-bold text-base leading-tight">{VIZ_BANNER.label}</p>
          <button className="mt-2 bg-[#E31E24] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#be1920] transition-colors">
            {VIZ_BANNER.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Hotel List Card (like Limak Cyprus) ── */
function HotelListCard({ hotel }: { hotel: typeof HOTELS[0] }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-56 h-48 sm:h-auto shrink-0 overflow-hidden">
          {hotel.isRecommended && (
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-[#0057A8] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow">
              <Star size={11} className="fill-white" /> MNG Öneriyor
            </div>
          )}
          {hotel.badge && (
            <div className="absolute top-3 right-3 z-10">
              {hotel.priceInTL > 0 ? (
                null
              ) : (
                <span className="bg-gray-800/80 text-white text-xs px-2 py-1 rounded-lg">*Sizi Arayalım...</span>
              )}
            </div>
          )}
          <Link to={`/otel/${hotel.id}`}>
            <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" style={{ minHeight: "100%" }} />
          </Link>
          <button onClick={() => setLiked(!liked)}
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors">
            <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>
        </div>

        {/* Info */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <Link to={`/otel/${hotel.id}`}>
                  <h3 className="font-bold text-gray-900 hover:text-[#0057A8] transition-colors" style={{ fontSize: "1.1rem" }}>{hotel.name}</h3>
                </Link>
                <p className="text-sm text-[#0057A8] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {hotel.city} / {hotel.region}
                  <button className="ml-1 text-[#0057A8] underline text-xs">Haritada Göster</button>
                </p>
              </div>
              {/* Rating */}
              <div className="bg-[#0dbac6] text-white rounded-xl px-3 py-2 text-center shrink-0">
                <p className="font-bold text-lg leading-none">{hotel.rating}</p>
                <p className="text-[10px] mt-0.5">{hotel.ratingLabel}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <Utensils size={10} /> {hotel.concept}
              </span>
              {hotel.features.slice(0, 3).map((f) => (
                <span key={f} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{f}</span>
              ))}
              {hotel.features.length > 3 && (
                <span className="text-xs text-gray-400 px-2 py-1">...</span>
              )}
            </div>

            {hotel.childPolicy && (
              null
            )}
            {hotel.paymentNote && (
              null
            )}

            {/* Campaign chips */}
            

            {/* Artists */}
            {hotel.artists && hotel.artists.length > 0 && (
              <div className="mt-3 flex gap-3 overflow-x-auto scrollbar-none pb-1">
                {hotel.artists.map((a) => (
                  <div key={a.name} className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 border-2 border-white shadow">
                      <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[10px] text-gray-700 mt-1 text-center font-medium">{a.name}</p>
                    <p className="text-[10px] text-gray-400 text-center">{a.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div>
              {hotel.priceInTL > 0 ? (
                <>
                  <p className="text-xs text-gray-400">Fiyatlar için tarih seçin</p>
                  <p className="font-bold text-[#E31E24]" style={{ fontSize: "1.2rem" }}>
                    {hotel.price.toLocaleString("tr-TR")} ₺
                  </p>
                  <p className="text-xs text-gray-400">kişi başı / gecelik</p>
                </>
              ) : (
                <p className="text-sm text-gray-500">Fiyatlar için tarih seçin</p>
              )}
            </div>
            <Link
              to={`/otel/${hotel.id}`}
              className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-100"
            >
              Tarih Seçiniz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Page ── */
export function AllHotelsPage() {
  const [searchWhere, setSearchWhere] = useState("");
  const [checkIn, setCheckIn] = useState("15.03.2026");
  const [checkOut, setCheckOut] = useState("24.03.2026");
  const [activeConcept, setActiveConcept] = useState("Tümü");
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Önerilen");
  const [showFilters, setShowFilters] = useState(false);
  const [likedCities, setLikedCities] = useState<string[]>([]);
  const cityRef = useRef<HTMLDivElement>(null);

  const filtered = HOTELS.filter((h) => {
    const matchSearch = !searchWhere ||
      h.name.toLowerCase().includes(searchWhere.toLowerCase()) ||
      h.city.toLowerCase().includes(searchWhere.toLowerCase());
    const matchConcept = activeConcept === "Tümü" || h.concept === activeConcept;
    const matchStar = !activeStar || h.stars === activeStar;
    return matchSearch && matchConcept && matchStar;
  }).sort((a, b) => {
    if (sortBy === "Fiyat (Artan)") return a.price - b.price;
    if (sortBy === "Fiyat (Azalan)") return b.price - a.price;
    if (sortBy === "Puana Göre") return b.rating - a.rating;
    return 0;
  });

  const scrollCities = (dir: "l" | "r") => {
    if (cityRef.current) cityRef.current.scrollBy({ left: dir === "r" ? 260 : -260, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── Sticky Search Bar ── */}
      <div className="bg-[#0057A8] sticky top-[64px] z-40 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-2xl overflow-hidden shadow-xl p-1">
            {/* NEREYE */}
            <div className="flex items-center gap-2 flex-1 px-4 py-2 border-r border-gray-100">
              <MapPin size={16} className="text-[#0057A8] shrink-0" />
              <div className="flex-1">
                <p className="text-[10px] font-bold text-[#0057A8] uppercase tracking-wider">Nereye</p>
                <input
                  value={searchWhere}
                  onChange={(e) => setSearchWhere(e.target.value)}
                  placeholder="Otel yada kategori adı..."
                  className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>
            </div>
            {/* TARİH ARALIĞI */}
            <div className="flex items-center gap-2 px-4 py-2 border-r border-gray-100">
              <Calendar size={16} className="text-[#0057A8] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-[#0057A8] uppercase tracking-wider">Tarih Aralığı</p>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-24 outline-none text-sm"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-24 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
            {/* ARA */}
            <button className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all m-1 shrink-0">
              <Search size={15} /> Ara
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: "Tourbulance", href: "/" }, { label: "Tüm Oteller" }]} />

        {/* Campaign Slider */}
        <div className="mt-6">
          <CampaignSlider />
        </div>

        {/* City Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900" style={{ fontSize: "1.15rem" }}>Kıbrıs Otelleri</h2>
            <div className="flex gap-2">
              <button onClick={() => scrollCities("l")} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronLeft size={14} />
              </button>
              <button onClick={() => scrollCities("r")} className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          <div ref={cityRef} className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
            {HOTEL_CITIES.map((city) => (
              <div
                key={city.slug}
                className="relative shrink-0 w-56 h-36 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSearchWhere(city.name.replace(" Otelleri", ""))}
              >
                <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <p className="absolute bottom-3 left-3 text-white font-semibold text-sm drop-shadow-lg">{city.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-100 text-gray-700 text-sm pl-3 pr-8 py-2 rounded-xl cursor-pointer focus:outline-none hover:bg-gray-200 transition-colors"
              >
                {SORT_OPTS.map((o) => <option key={o}>{o}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* Concept chips */}
            <div className="flex flex-wrap gap-2">
              {CONCEPTS.map((c) => (
                <button key={c} onClick={() => setActiveConcept(c)}
                  className={`text-xs px-3 py-2 rounded-xl transition-all ${activeConcept === c ? "bg-[#0057A8] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Stars */}
            <div className="flex gap-2">
              {STARS_OPTS.map((s) => (
                <button key={s} onClick={() => setActiveStar(activeStar === s ? null : s)}
                  className={`flex items-center gap-1 text-xs px-3 py-2 rounded-xl transition-all ${activeStar === s ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                  <Star size={10} className={activeStar === s ? "fill-white" : "fill-amber-400"} /> {s}★
                </button>
              ))}
            </div>

            <button onClick={() => setShowFilters(!showFilters)}
              className="ml-auto flex items-center gap-2 border border-gray-200 text-gray-600 text-xs px-4 py-2 rounded-xl hover:border-[#0057A8] hover:text-[#0057A8] transition-colors">
              <SlidersHorizontal size={13} /> Filtrele
            </button>

            {(activeConcept !== "Tümü" || activeStar) && (
              <button onClick={() => { setActiveConcept("Tümü"); setActiveStar(null); }}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors">
                <X size={12} /> Temizle
              </button>
            )}

            <span className="text-xs text-gray-400 ml-1">{filtered.length} otel bulundu</span>
          </div>
        </div>

        {/* Hotel list */}
        <div className="space-y-5">
          {filtered.map((hotel) => (
            <HotelListCard key={hotel.id} hotel={hotel} />
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Search size={48} className="mx-auto mb-3 opacity-30" />
              <p>Aramanızla eşleşen otel bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
