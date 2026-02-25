import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  Search, MapPin, Calendar, ChevronDown, ChevronUp,
  Bus, Plane, Clock, ArrowRight, Star, Users,
  CheckCircle, Flame, Tag, ChevronLeft, ChevronRight as ChevronRightIcon,
  Filter, SlidersHorizontal, X,
} from "lucide-react";
import { TOURS } from "../data/tours";
import { TourCardGrid } from "../components/TourCardGrid";

/* ─── Kampanya slider verisi ─────────────────────────────── */
const CAMPAIGNS = [
  {
    id: 1,
    badge: "14 Şubat'a Özel",
    title: "700€'ya varan indirimlerle romantik Lapland turlarını kaçırma!",
    subtitle: "Hep tatil mutluluğu! 🧡",
    payLater: "%25'ini şimdi",
    payLaterSub: "kalanını sonra öde",
    chips: ["12 Şubat 2026", "3 gece konaklamalı", "THY ile Rovaniemi gidiş–dönüş"],
    bonus: "7.500 TL'ye varan bonus!",
    bonusNote: "Bu ödeme kampanyası online rezervasyonlarda geçerli değildir.",
    image: "https://images.unsplash.com/photo-1639162147384-6726ae7e7577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sideBanner: {
      label: "VİZESİZ YURT DIŞI TURLARI",
      image: "https://images.unsplash.com/photo-1770198304099-b3974fbf641a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      cta: "REZERVASYON YAP",
    },
  },
  {
    id: 2,
    badge: "Erken Rezervasyon",
    title: "Balkan turlarında %30'a varan indirimle yaz planını şimdi yap!",
    subtitle: "Sınırlı kontenjan! 🌍",
    payLater: "%20'sini şimdi",
    payLaterSub: "kalanını sonra öde",
    chips: ["Mart–Nisan 2026", "7 gece 8 gün", "6 ülke 24 şehir"],
    bonus: "5.000 TL'ye varan bonus!",
    bonusNote: "Kampanya stoklarla sınırlıdır.",
    image: "https://images.unsplash.com/photo-1764604994070-c4aad164e122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sideBanner: {
      label: "AVRUPA KÜLTÜR TURLARI",
      image: "https://images.unsplash.com/photo-1764408299579-1654ebd905ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
      cta: "HEMEN İNCELE",
    },
  },
];

/* ─── Kategori bölüm verisi ──────────────────────────────── */
const YURTICI_CATS = [
  { slug: "avrupa-turlari", label: "Avrupa Turları", image: "https://images.unsplash.com/photo-1764408299579-1654ebd905ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
  { slug: "balkan-turlari", label: "Balkan Turları", image: "https://images.unsplash.com/photo-1764604994070-c4aad164e122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
  { slug: "kultur-turlari", label: "Kültür Turları", image: "https://images.unsplash.com/photo-1732951341964-0777e1c50481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
];

const YURTDISI_CATS = [
  { slug: "uzakdogu-turlari", label: "Uzakdoğu Turları", image: "https://images.unsplash.com/photo-1759804351115-83e0ae28fb57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
  { slug: "vizesiz-turlar", label: "Vizesiz Yurt Dışı", image: "https://images.unsplash.com/photo-1770198304099-b3974fbf641a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
  { slug: "kruvaziyer-turlari", label: "Kruvaziyer Turları", image: "https://images.unsplash.com/photo-1752884991294-cd424478903a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" },
];

/* ─── Filtre tipleri ─────────────────────────────────────── */
type SortKey = "onerilen" | "fiyat-asc" | "fiyat-desc" | "puan";
type TransportFilter = "hepsi" | "bus" | "plane";

export function AllToursPage() {
  /* search */
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("26.03.2026");
  const [endDate, setEndDate] = useState("24.02.2026");

  /* campaign slider */
  const [slideIdx, setSlideIdx] = useState(0);
  const slide = CAMPAIGNS[slideIdx];

  /* filters */
  const [showFilter, setShowFilter] = useState(false);
  const [activeVisa, setActiveVisa] = useState<"hepsi" | "vizesiz" | "vizeli">("hepsi");
  const [activeTransport, setActiveTransport] = useState<TransportFilter>("hepsi");
  const [activeSort, setActiveSort] = useState<SortKey>("onerilen");
  const [maxPrice, setMaxPrice] = useState(2000);

  const filterRef = useRef<HTMLDivElement>(null);

  /* filtered & sorted tours */
  const filtered = TOURS.filter((t) => {
    const matchSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.route.toLowerCase().includes(searchQuery.toLowerCase());
    const matchVisa =
      activeVisa === "hepsi" ||
      (activeVisa === "vizesiz" && t.isVisa) ||
      (activeVisa === "vizeli" && !t.isVisa);
    const matchTransport =
      activeTransport === "hepsi" || t.transport === activeTransport;
    const matchPrice = t.price <= maxPrice;
    return matchSearch && matchVisa && matchTransport && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "fiyat-asc") return a.price - b.price;
    if (activeSort === "fiyat-desc") return b.price - a.price;
    if (activeSort === "puan") return (b.rating ?? 0) - (a.rating ?? 0);
    return (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0);
  });

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ══════════════════════════════════════════════════
          ARAMA ÇUBUĞU — koyu bant
      ══════════════════════════════════════════════════ */}
      <div className="bg-[#0a1929] py-4 px-4 sticky top-[64px] z-40">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl flex flex-col sm:flex-row items-stretch overflow-hidden shadow-lg">

            {/* Nereye */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
              <MapPin size={18} className="text-[#0057A8] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Nereye</p>
                <input
                  type="text"
                  placeholder="Tur ya da kategori adı..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent mt-0.5"
                />
              </div>
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <X size={14} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Tarih */}
            <div className="flex items-center gap-3 flex-1 px-4 py-3 border-b sm:border-b-0 sm:border-r border-gray-200">
              <Calendar size={18} className="text-[#0057A8] shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tarih Aralığı</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-sm text-gray-800 outline-none bg-transparent w-24"
                  />
                  <span className="text-gray-300 text-sm">–</span>
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-sm text-gray-800 outline-none bg-transparent w-24"
                  />
                </div>
              </div>
            </div>

            {/* Ara butonu */}
            <button className="flex items-center justify-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white font-semibold px-8 py-3 transition-colors">
              <Search size={18} />
              <span>Ara</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* ══════════════════════════════════════════════════
            KAMPANYA BANNER SLİDER
        ══════════════════════════════════════════════════ */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-4 min-h-[280px]">

            {/* Sol — Kampanya metni */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between">
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-1.5 bg-red-50 text-[#E31E24] text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                  <Flame size={12} /> {slide.badge}
                </span>
                <h2 className="text-gray-900 leading-snug mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 700 }}>
                  {slide.title}
                </h2>
                <p className="text-[#E31E24] font-semibold text-sm mb-4">{slide.subtitle}</p>

                {/* Pay later pill */}
                <div className="inline-flex items-center gap-2 bg-[#0057A8] text-white text-sm font-bold px-4 py-2 rounded-xl mb-4">
                  <span>{slide.payLater}</span>
                  <span className="text-white/70 font-normal text-xs">{slide.payLaterSub}</span>
                </div>

                {/* Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {slide.chips.map((c) => (
                    <span key={c} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border border-gray-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bonus + disclaimer */}
              <div>
                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-2">
                  <span className="text-lg">🎁</span>
                  <span className="text-emerald-700 font-semibold text-sm">{slide.bonus}</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-relaxed">{slide.bonusNote}</p>
              </div>
            </div>

            {/* Orta — Ana görsel */}
            <div className="relative rounded-2xl overflow-hidden min-h-[260px] group cursor-pointer shadow-lg">
              <img
                src={slide.image}
                alt="Kampanya"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Slider dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {CAMPAIGNS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === slideIdx ? "bg-white scale-125" : "bg-white/50"}`}
                  />
                ))}
              </div>

              {/* Prev / Next */}
              <button
                onClick={() => setSlideIdx((p) => (p - 1 + CAMPAIGNS.length) % CAMPAIGNS.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setSlideIdx((p) => (p + 1) % CAMPAIGNS.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all z-10"
              >
                <ChevronRightIcon size={18} />
              </button>
            </div>

            {/* Sağ — Yan banner */}
            <div className="relative rounded-2xl overflow-hidden min-h-[200px] group cursor-pointer shadow-lg">
              <img
                src={slide.sideBanner.image}
                alt={slide.sideBanner.label}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#E31E24]/80 via-transparent to-black/60" />
              <div className="absolute inset-0 flex flex-col items-center justify-between p-5">
                <div className="text-center">
                  <p className="text-white font-black text-center leading-tight" style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}>
                    {slide.sideBanner.label}
                  </p>
                </div>
                <button className="w-full bg-[#E31E24] hover:bg-[#BE1920] text-white font-bold text-sm py-2.5 px-4 rounded-xl transition-colors shadow-lg">
                  {slide.sideBanner.cta}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            YURTİÇİ TURLAR
        ══════════════════════════════════════════════════ */}
        <section>
          

          
        </section>

        {/* ══════════════════════════════════════════════════
            YURT DIŞI TURLAR
        ══════════════════════════════════════════════════ */}
        <section>
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-[#E31E24] text-xs font-semibold uppercase tracking-wider mb-1">Sınır Ötesi</p>
              <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>Yurt Dışı Turlar</h2>
            </div>
            <Link to="/turlar" className="text-sm text-[#0057A8] hover:text-[#E31E24] flex items-center gap-1 transition-colors">
              Tümü <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {YURTDISI_CATS.map((cat) => (
              <Link
                key={cat.slug}
                to={`/turlar`}
                className="relative h-52 rounded-2xl overflow-hidden group shadow-md block"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-bold text-base drop-shadow">{cat.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TÜM TURLAR — Filtre + Grid
        ══════════════════════════════════════════════════ */}
        <section>
          {/* Başlık + Filtre toggle */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Tüm Seçenekler</p>
              <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
                Turları Keşfet
              </h2>
            </div>
            
          </div>

          {/* Filter panel */}
          {showFilter && (
            <div ref={filterRef} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Vize */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Vize Durumu</p>
                  <div className="flex flex-col gap-2">
                    {(["hepsi", "vizesiz", "vizeli"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setActiveVisa(v)}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-xl border transition-all text-left ${
                          activeVisa === v
                            ? "border-[#0057A8] bg-blue-50 text-[#0057A8] font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {v === "vizesiz" && <CheckCircle size={13} className="text-emerald-500" />}
                        {v === "hepsi" ? "Tümü" : v === "vizesiz" ? "Vizesiz" : "Vizeli"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ulaşım */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Ulaşım Türü</p>
                  <div className="flex flex-col gap-2">
                    {(["hepsi", "bus", "plane"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveTransport(t)}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-xl border transition-all text-left ${
                          activeTransport === t
                            ? "border-[#0057A8] bg-blue-50 text-[#0057A8] font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {t === "bus" && <Bus size={13} />}
                        {t === "plane" && <Plane size={13} />}
                        {t === "hepsi" ? "Tümü" : t === "bus" ? "Otobüslü" : "Uçaklı"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sıralama */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Sıralama</p>
                  <div className="flex flex-col gap-2">
                    {([
                      { key: "onerilen", label: "Önerilen" },
                      { key: "fiyat-asc", label: "En Ucuz" },
                      { key: "fiyat-desc", label: "En Pahalı" },
                      { key: "puan", label: "En Yüksek Puan" },
                    ] as { key: SortKey; label: string }[]).map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setActiveSort(s.key)}
                        className={`text-sm px-3 py-2 rounded-xl border transition-all text-left ${
                          activeSort === s.key
                            ? "border-[#0057A8] bg-blue-50 text-[#0057A8] font-semibold"
                            : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Maksimum Fiyat */}
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Maks. Fiyat: <span className="text-[#0057A8]">{maxPrice} €</span>
                  </p>
                  <input
                    type="range"
                    min={200}
                    max={3000}
                    step={50}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#0057A8]"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>200 €</span>
                    <span>3.000 €</span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">
                      <span className="font-semibold text-gray-700">{sorted.length}</span> tur bulundu
                    </p>
                    <button
                      onClick={() => {
                        setActiveVisa("hepsi");
                        setActiveTransport("hepsi");
                        setActiveSort("onerilen");
                        setMaxPrice(2000);
                        setSearchQuery("");
                      }}
                      className="text-xs text-[#E31E24] hover:underline flex items-center gap-1"
                    >
                      <X size={11} /> Filtreleri Temizle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick chips */}
          

          {/* Tour grid */}
          {sorted.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sorted.map((t) => (
                <TourCardGrid key={t.id} tour={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <Search size={48} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium text-gray-500">Arama kriterlerine uygun tur bulunamadı.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveVisa("hepsi"); setActiveTransport("hepsi"); setMaxPrice(2000); }}
                className="mt-3 text-sm text-[#0057A8] hover:underline"
              >
                Filtreleri sıfırla
              </button>
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════
            İLETİŞİM / YARDIM CTA
        ══════════════════════════════════════════════════ */}
        <section className="bg-gradient-to-r from-[#0057A8] to-[#003d7a] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}>
              Aradığınızı bulamadınız mı?
            </h3>
            <p className="text-white/70 text-sm">Uzman ekibimiz size özel tur planı hazırlasın.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+908501234567"
              className="flex items-center gap-2 bg-white text-[#0057A8] font-semibold px-5 py-3 rounded-xl text-sm hover:bg-gray-100 transition-colors shadow-md"
            >
              📞 0850 XXX XX XX
            </a>
            <Link
              to="/iletisim"
              className="flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors"
            >
              İletişim <ArrowRight size={15} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
