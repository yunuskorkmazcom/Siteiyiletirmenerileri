import { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  MapPin, Star, Heart, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  SlidersHorizontal, X, Search, Check, Info, Utensils, Users, Baby,
  CreditCard, Shield, Wifi, Waves, Dumbbell, Coffee, Calendar, User2,
} from "lucide-react";
import { HOTELS, Hotel } from "../data/hotels";
import { Breadcrumb } from "../components/Breadcrumb";

/* ──────────────────────────────────────────────────────── */
/* Data                                                     */
/* ──────────────────────────────────────────────────────── */

const BANNER_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1710801683743-db5e7429a900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    badge: "0-6.99 Yaş Arası 1 Çocuk Ücretsiz",
    label: "Kıbrıs'ın En İyi Tesisleri",
  },
  {
    src: "https://images.unsplash.com/photo-1602236753446-cfd84b632e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    badge: "Erken Rezervasyon Fırsatları",
    label: "Özel Plaj & Sonsuzluk Havuzu",
  },
  {
    src: "https://images.unsplash.com/flagged/photo-1557006027-cf0673ec2cfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    badge: "Ultra Her Şey Dahil",
    label: "Lüks Tatil Deneyimi",
  },
];

const BOLGELER = [
  { label: "Kıbrıs", count: 74 },
  { label: "Girne", count: 32 },
  { label: "Bafra", count: 18 },
  { label: "Gazimağusa", count: 14 },
  { label: "Lefkoşa", count: 6 },
  { label: "Magosa", count: 4 },
];

const OTEL_TEMALARI = [
  { label: "0-12 Yaş Ücretsiz Oteller", count: 15 },
  { label: "0-16 Yaş Ücretsiz Oteller", count: 1 },
  { label: "Aquapark Otelleri", count: 6 },
  { label: "Deluxe Oteller", count: 4 },
  { label: "Denize Sıfır Oteller", count: 21 },
  { label: "Erken Rezervasyon Otelleri", count: 1 },
  { label: "Her Şey Dahil", count: 38 },
  { label: "Ultra Her Şey Dahil", count: 24 },
];

const OTEL_ZINCIRLERI = [
  { label: "Deniz Kızı Otelleri", count: 2 },
  { label: "Kaya Otelleri", count: 2 },
  { label: "Limak Otelleri", count: 1 },
  { label: "Merit Otelleri", count: 7 },
];

const TESIS_OZELLIKLERI = [
  { label: "Animasyon ve Eğlence", count: 21 },
  { label: "Aquapark", count: 9 },
  { label: "Açık Yüzme Havuzu", count: 57 },
  { label: "Kablosuz İnternet", count: 68 },
  { label: "Kapalı Yüzme Havuzu", count: 27 },
  { label: "Kum Plaj", count: 24 },
  { label: "Spa & Wellness", count: 32 },
  { label: "Fitness Merkezi", count: 41 },
];

type SortType = "recommended" | "price_asc" | "price_desc" | "discount";

/* ──────────────────────────────────────────────────────── */
/* Küçük bileşenler                                         */
/* ──────────────────────────────────────────────────────── */

function ConceptBadge({ concept }: { concept: string }) {
  const isUltra = concept.toLowerCase().includes("ultra");
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-md
      ${isUltra ? "text-emerald-700 bg-emerald-50" : "text-amber-700 bg-amber-50"}`}>
      <Utensils size={10} /> {concept}
    </span>
  );
}

function RatingBadge({ rating, label }: { rating: number; label: string }) {
  const color = rating >= 9 ? "bg-emerald-500" : rating >= 8 ? "bg-[#0dbac6]" : "bg-blue-500";
  return (
    <div className={`${color} text-white rounded-xl px-3 py-2 text-center min-w-[56px] shrink-0`}>
      <p className="font-bold leading-none" style={{ fontSize: "1.3rem" }}>{rating.toFixed(1)}</p>
      <p className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">{label}</p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Filtre Sidebar                                           */
/* ──────────────────────────────────────────────────────── */

interface FilterState {
  minPrice: number;
  maxPrice: number;
  recommended: boolean;
  certified: boolean;
  discount5: boolean;
  bolgeler: string[];
  temalar: string[];
  zincirler: string[];
  tesisler: string[];
}

function FilterSection({
  title, children, defaultOpen = true,
}: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button className="flex items-center justify-between w-full mb-3" onClick={() => setOpen(!open)}>
        <span className="text-sm font-bold text-gray-800">{title}</span>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function CheckboxItem({
  label, count, checked, onChange,
}: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer group">
      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
        ${checked ? "bg-[#0057A8] border-[#0057A8]" : "border-gray-300 group-hover:border-[#0057A8]"}`}
        onClick={onChange}>
        {checked && <Check size={10} className="text-white" />}
      </div>
      <span className="text-sm text-gray-700 flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-gray-400">({count})</span>}
    </label>
  );
}

function HotelFilterSidebar({
  filters, onChange, onSearch, onClear,
}: {
  filters: FilterState;
  onChange: (f: Partial<FilterState>) => void;
  onSearch: () => void;
  onClear: () => void;
}) {
  const toggleArr = (key: keyof Pick<FilterState, "bolgeler" | "temalar" | "zincirler" | "tesisler">, val: string) => {
    const arr = filters[key] as string[];
    onChange({ [key]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sticky top-[88px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        
        <button onClick={onClear} className="text-[#0057A8] text-xs font-semibold hover:underline">
          Sonuçları Filtrele
        </button>
      </div>

      {/* Fiyat Aralığı */}
      <FilterSection title="Fiyat Aralığı">
        <div className="flex items-center gap-2">
          <div className="flex-1 border border-gray-200 rounded-xl px-3 py-2">
            <p className="text-[10px] text-gray-400">Min</p>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onChange({ minPrice: Number(e.target.value) })}
              className="w-full text-sm text-gray-700 outline-none"
              placeholder="0+TL"
            />
          </div>
          <span className="text-gray-300">-</span>
          <div className="flex-1 border border-gray-200 rounded-xl px-3 py-2">
            <p className="text-[10px] text-gray-400">Max</p>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
              className="w-full text-sm text-gray-700 outline-none"
              placeholder="999+TL"
            />
          </div>
          <button
            onClick={onSearch}
            className="bg-[#0057A8] text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-[#004489] transition-colors"
          >
            Ara
          </button>
        </div>
      </FilterSection>

      {/* Önerilen Oteller */}
      <FilterSection title="Önerilen Oteller">
        <CheckboxItem label="Tourbulance Öneriyor" count={43} checked={filters.recommended} onChange={() => onChange({ recommended: !filters.recommended })} />
        <CheckboxItem label="Güvenli Turizm Sertifikalı Tesis" count={66} checked={filters.certified} onChange={() => onChange({ certified: !filters.certified })} />
      </FilterSection>

      {/* İndirimli Kampanyalar */}
      <FilterSection title="İndirimli Otel Kampanyaları">
        <CheckboxItem label="Ekstra %5 İndirim" count={1} checked={filters.discount5} onChange={() => onChange({ discount5: !filters.discount5 })} />
      </FilterSection>

      {/* Bölgeler */}
      <FilterSection title="Bölgeler">
        {BOLGELER.map((b) => (
          <CheckboxItem
            key={b.label} label={b.label} count={b.count}
            checked={filters.bolgeler.includes(b.label)}
            onChange={() => toggleArr("bolgeler", b.label)}
          />
        ))}
      </FilterSection>

      {/* Otel Temaları */}
      <FilterSection title="Otel Temaları">
        <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
          {OTEL_TEMALARI.map((t) => (
            <CheckboxItem
              key={t.label} label={t.label} count={t.count}
              checked={filters.temalar.includes(t.label)}
              onChange={() => toggleArr("temalar", t.label)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Otel Zincirleri */}
      <FilterSection title="Otel Zincirleri" defaultOpen={false}>
        {OTEL_ZINCIRLERI.map((z) => (
          <CheckboxItem
            key={z.label} label={z.label} count={z.count}
            checked={filters.zincirler.includes(z.label)}
            onChange={() => toggleArr("zincirler", z.label)}
          />
        ))}
      </FilterSection>

      {/* Tesis Özellikleri */}
      <FilterSection title="Tesis Özellikleri" defaultOpen={false}>
        <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
          {TESIS_OZELLIKLERI.map((t) => (
            <CheckboxItem
              key={t.label} label={t.label} count={t.count}
              checked={filters.tesisler.includes(t.label)}
              onChange={() => toggleArr("tesisler", t.label)}
            />
          ))}
        </div>
      </FilterSection>

      {/* Ara Butonu */}
      <button
        onClick={onSearch}
        className="w-full bg-[#0057A8] hover:bg-[#004489] text-white font-bold py-3 rounded-xl mt-2 transition-colors"
      >
        Ara
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Otel Arama Barı                                          */
/* ──────────────────────────────────────────────────────── */

function HotelSearchBar() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const fmt = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

  const [destination, setDestination] = useState("Kıbrıs");
  const [checkIn, setCheckIn] = useState(fmt(today));
  const [checkOut, setCheckOut] = useState(fmt(tomorrow));
  const [guests, setGuests] = useState("1 Oda, 2 Yetişkin");

  return (
    <div className="bg-[#0057A8] py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch gap-2">
          {/* Destinasyon */}
          <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center gap-3 min-w-0">
            <MapPin size={18} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 leading-none mb-1">Ülke, Şehir, Bölge yada Otel Adı</p>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-sm text-gray-800 outline-none placeholder-gray-400 bg-transparent"
                placeholder="Kıbrıs"
              />
            </div>
          </div>

          {/* Giriş Tarihi */}
          <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center gap-3 min-w-0">
            <Calendar size={18} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 leading-none mb-1">Giriş Tarihi</p>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm text-gray-800 outline-none bg-transparent"
                placeholder="gg.aa.yyyy"
              />
            </div>
          </div>

          {/* Çıkış Tarihi */}
          <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center gap-3 min-w-0">
            <Calendar size={18} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 leading-none mb-1">Çıkış Tarihi</p>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm text-gray-800 outline-none bg-transparent"
                placeholder="gg.aa.yyyy"
              />
            </div>
          </div>

          {/* Oda & Kişi */}
          <div className="flex-1 bg-white rounded-xl px-4 py-3 flex items-center gap-3 min-w-0">
            <User2 size={18} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-gray-400 leading-none mb-1">Oda ve Kişi Sayısı</p>
              <input
                type="text"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-sm text-gray-800 outline-none bg-transparent"
                placeholder="1 Oda, 2 Yetişkin"
              />
            </div>
          </div>

          {/* Ara Butonu */}
          <button className="bg-[#22C55E] hover:bg-[#16a34a] text-white font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 shrink-0 transition-colors shadow-md whitespace-nowrap">
            <Search size={16} />
            OTEL ARA
          </button>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Otel Kartı                                               */
/* ──────────────────────────────────────────────────────── */

function HotelCard({ hotel }: { hotel: Hotel }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden">
      {/* Üst satır: görsel + içerik */}
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* Sol — Görsel */}
        <div className="relative shrink-0 w-full h-52 sm:w-52 sm:h-52 overflow-hidden">
          {hotel.isRecommended && (
            <div className="absolute top-3 left-3 z-10 bg-[#0057A8] text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow">
              <Star size={9} className="fill-white" /> Tourbulance Öneriyor
            </div>
          )}
          {hotel.discount && (
            <div className="absolute top-3 right-10 z-10 bg-[#E31E24] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow">
              %{hotel.discount} İndirim
            </div>
          )}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition-colors"
          >
            <Heart size={14} className={liked ? "fill-red-500 text-red-500" : "text-gray-500"} />
          </button>
          <Link to={`/otel/${hotel.id}`}>
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        {/* Sağ — İçerik */}
        <div className="flex-1 p-5 flex flex-col gap-2 min-w-0">
          {/* Başlık Satırı */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <Link to={`/otel/${hotel.id}`} className="font-bold text-[#0057A8] hover:underline text-base leading-snug line-clamp-2">
                {hotel.name}
              </Link>
              <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin size={11} /> {hotel.city} / {hotel.region}
                </span>
                <button className="text-[#0057A8] text-xs underline">Haritada Göster</button>
              </div>
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <RatingBadge rating={hotel.rating} label={hotel.ratingLabel} />
          </div>

          {/* Konsept */}
          <ConceptBadge concept={hotel.concept} />

          {/* Özellikler */}
          <div className="flex items-center gap-2 flex-wrap">
            {hotel.features.slice(0, 3).map((f) => (
              <span key={f} className="text-xs text-gray-600 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-lg">
                {f}
              </span>
            ))}
            {hotel.features.length > 3 && (
              <span className="text-xs text-gray-400">...</span>
            )}
          </div>

          {/* Çocuk Politikası */}
          {hotel.childPolicy && (
            null
          )}

          {/* Ödeme Notu */}
          {hotel.paymentNote && (
            null
          )}

          {/* Kampanya Rozeti */}
          {hotel.campaignNote && (
            null
          )}

          {/* Alt Satır — Fiyat */}
          <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-400">Gecelik fiyattan başlayan</div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                {hotel.discount && (
                  <p className="text-xs text-gray-400 line-through">{Math.round(hotel.price * (1 + hotel.discount / 100)).toLocaleString("tr-TR")} ₺</p>
                )}
                <p className="font-bold text-[#E31E24] text-base">{hotel.price.toLocaleString("tr-TR")} ₺</p>
              </div>
              <Link
                to={`/otel/${hotel.id}`}
                className="shrink-0 border-2 border-[#0057A8] text-[#0057A8] hover:bg-[#0057A8] hover:text-white text-sm font-bold px-4 py-2 rounded-xl transition-all"
              >
                Tarih Seçiniz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Alt satır — Sanatçılar (tam genişlik) */}
      {hotel.artists && hotel.artists.length > 0 && (
        <div className="border-t border-gray-100 px-4 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-none">
            {hotel.artists.map((a) => (
              <div key={a.name} className="shrink-0 flex flex-col items-center gap-1.5 w-24">
                <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 shadow-sm">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover object-top" />
                </div>
                <p className="text-xs text-gray-800 font-semibold text-center leading-tight">{a.name}</p>
                <p className="text-[11px] text-gray-500 text-center">{a.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */
/* Ana Sayfa                                               */
/* ──────────────────────────────────────────────────────── */

const DEFAULT_FILTERS: FilterState = {
  minPrice: 0,
  maxPrice: 999999,
  recommended: false,
  certified: false,
  discount5: false,
  bolgeler: [],
  temalar: [],
  zincirler: [],
  tesisler: [],
};

export function HotelCategoryPage() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [sort, setSort] = useState<SortType>("recommended");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const handleFilterChange = (partial: Partial<FilterState>) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const handleSearch = () => setAppliedFilters(filters);

  const handleClear = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };

  const sortedHotels = useMemo(() => {
    let list = [...HOTELS].filter((h) => {
      if (h.price < appliedFilters.minPrice || h.price > appliedFilters.maxPrice) return false;
      if (appliedFilters.recommended && !h.isRecommended) return false;
      return true;
    });
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "discount") list.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    return list;
  }, [appliedFilters, sort]);

  const activeFilterCount = [
    appliedFilters.recommended,
    appliedFilters.certified,
    appliedFilters.discount5,
    ...appliedFilters.bolgeler,
    ...appliedFilters.temalar,
    ...appliedFilters.zincirler,
    ...appliedFilters.tesisler,
  ].filter(Boolean).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── HEADER BAR ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Breadcrumb items={[
            { label: "Anasayfa", href: "/" },
            { label: "Oteller", href: "/oteller" },
            { label: "Kıbrıs Otelleri" },
          ]} />
        </div>
      </div>

      {/* ── ARAMA BARI ── */}
      <HotelSearchBar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 items-start">

          {/* ── SOL SIDEBAR ── */}
          <aside className="w-64 shrink-0 hidden lg:block">
            <HotelFilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onSearch={handleSearch}
              onClear={handleClear}
            />
          </aside>

          {/* ── SAĞ İÇERİK ── */}
          <div className="flex-1 min-w-0 space-y-5">

            {/* Başlık & özet */}
            <div>
              <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>
                Kıbrıs Otelleri
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Kıbrıs Otel Fiyatları 23.02.2026 - 24.02.2026 1 Oda, 2 Yetişkin araması için{" "}
                <span className="font-bold text-gray-800">{sortedHotels.length * 12} otel</span> listelenmiştir.
              </p>
            </div>

            {/* Banner Carousel */}
            <div className="relative rounded-2xl overflow-hidden h-56 md:h-72 group">
              <img
                src={BANNER_IMAGES[bannerIdx].src}
                alt="banner"
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Badge */}
              <div className="absolute bottom-4 right-4 bg-[#E31E24] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg">
                {BANNER_IMAGES[bannerIdx].badge}
              </div>
              {/* Nav */}
              <button
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
                onClick={() => setBannerIdx((p) => (p - 1 + BANNER_IMAGES.length) % BANNER_IMAGES.length)}
              >
                <ChevronLeft size={18} className="text-gray-800" />
              </button>
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100"
                onClick={() => setBannerIdx((p) => (p + 1) % BANNER_IMAGES.length)}
              >
                <ChevronRight size={18} className="text-gray-800" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {BANNER_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setBannerIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === bannerIdx ? "bg-white scale-125" : "bg-white/50"}`}
                  />
                ))}
              </div>
            </div>

            {/* Bilgi Bandı */}
            <div className="bg-[#0057A8] text-white rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-medium">
              <Info size={15} />
              Kıbrıs Seyahati ile İlgili Genel Kurallar!
            </div>

            {/* Sıralama + Mobile Filter */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              {/* Sort Tabs */}
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-xl p-1 flex-wrap">
                {([
                  { key: "recommended", label: "Tourbulance Öneriyor", icon: "⭐" },
                  { key: "price_asc", label: "Fiyat (Artan)", icon: "↑" },
                  { key: "price_desc", label: "Fiyat (Azalan)", icon: "↓" },
                  { key: "discount", label: "Yüksek İndirim Oranı", icon: "%" },
                ] as { key: SortType; label: string; icon: string }[]).map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSort(s.key)}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-all
                      ${sort === s.key
                        ? "bg-[#0057A8] text-white shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"}`}
                  >
                    <span>{s.icon}</span> {s.label}
                  </button>
                ))}
                <button className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                  <Info size={14} />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm"
              >
                <SlidersHorizontal size={14} />
                Filtrele
                {activeFilterCount > 0 && (
                  <span className="bg-[#E31E24] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>

            {/* Aktif Filtreler */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-gray-500 font-medium">Aktif Filtreler:</span>
                {appliedFilters.recommended && (
                  <span className="flex items-center gap-1 text-xs bg-blue-50 text-[#0057A8] border border-blue-200 px-3 py-1 rounded-full">
                    Tourbulance Öneriyor
                    <button onClick={() => { setFilters(f => ({ ...f, recommended: false })); setAppliedFilters(f => ({ ...f, recommended: false })); }}>
                      <X size={10} />
                    </button>
                  </span>
                )}
                {[...appliedFilters.bolgeler, ...appliedFilters.temalar, ...appliedFilters.tesisler].map((val) => (
                  <span key={val} className="flex items-center gap-1 text-xs bg-blue-50 text-[#0057A8] border border-blue-200 px-3 py-1 rounded-full">
                    {val}
                    <button onClick={() => {
                      const upd = {
                        bolgeler: appliedFilters.bolgeler.filter(v => v !== val),
                        temalar: appliedFilters.temalar.filter(v => v !== val),
                        tesisler: appliedFilters.tesisler.filter(v => v !== val),
                      };
                      setFilters(f => ({ ...f, ...upd }));
                      setAppliedFilters(f => ({ ...f, ...upd }));
                    }}>
                      <X size={10} />
                    </button>
                  </span>
                ))}
                <button onClick={handleClear} className="text-xs text-red-500 hover:underline">Tümünü Temizle</button>
              </div>
            )}

            {/* Otel Listesi */}
            <div className="space-y-4">
              {sortedHotels.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <Search size={40} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">Filtrelerinize uygun otel bulunamadı.</p>
                  <button onClick={handleClear} className="mt-3 text-[#0057A8] text-sm font-semibold hover:underline">
                    Filtreleri Temizle
                  </button>
                </div>
              ) : (
                sortedHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <ChevronLeft size={16} className="text-gray-600" />
              </button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-colors
                    ${p === 1
                      ? "bg-[#0057A8] text-white shadow-sm"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-100"}`}
                >
                  {p}
                </button>
              ))}
              <span className="text-gray-400 text-sm px-1">...</span>
              <button className="w-9 h-9 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">12</button>
              <button className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors">
                <ChevronRight size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBİL FİLTRE DRAWER ── */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative ml-auto w-80 bg-gray-50 h-full overflow-y-auto shadow-2xl p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-gray-900">Filtrele</p>
              <button onClick={() => setMobileFilterOpen(false)} className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <X size={14} />
              </button>
            </div>
            <HotelFilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onSearch={() => { handleSearch(); setMobileFilterOpen(false); }}
              onClear={handleClear}
            />
          </div>
        </div>
      )}
    </div>
  );
}