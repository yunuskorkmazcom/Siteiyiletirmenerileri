import { useState, useRef } from "react";
import { useParams, Link } from "react-router";
import {
  MapPin,
  Calendar,
  Clock,
  Plane,
  Bus,
  Users,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Star,
  Images,
  ChevronRight,
  Phone,
  ArrowLeft,
  ArrowRight,
  FileText,
  AlertTriangle,
  ShieldCheck,
  CreditCard,
} from "lucide-react";
import { TOURS } from "../data/tours";
import { Breadcrumb } from "../components/Breadcrumb";

type TabKey = "genel" | "oda" | "program" | "dahil" | "notlar";

export function TourDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tour = TOURS.find((t) => t.id === Number(id));

  const [activeTab, setActiveTab] = useState<TabKey>("genel");
  const [liked, setLiked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [openDays, setOpenDays] = useState<number[]>([1]);
  const [selectedDate, setSelectedDate] = useState(tour?.startDate || "");
  const [adults, setAdults] = useState(2);
  const [child1Age, setChild1Age] = useState("Yok");
  const [child2Age, setChild2Age] = useState("Yok");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [openInfoSection, setOpenInfoSection] = useState<string | null>("oedeme");

  const tabRef = useRef<HTMLDivElement>(null);

  if (!tour) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <MapPin size={48} className="opacity-30" />
        <p>Tur bulunamadı.</p>
        <Link to="/" className="text-[#0057A8] hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Tur Listesine Dön
        </Link>
      </div>
    );
  }

  const allImages = [tour.image, ...(tour.gallery || [])];
  const similarTours = TOURS.filter((t) => t.id !== tour.id).slice(0, 3);

  const toggleDay = (day: number) => {
    setOpenDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const scrollToTab = (tab: TabKey) => {
    setActiveTab(tab);
    tabRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: "genel", label: "Genel Bilgiler" },
    { key: "oda", label: "Oda Seçenekleri" },
    { key: "program", label: "Tur Programı" },
    { key: "dahil", label: "Dahil Hizmetler" },
    { key: "notlar", label: "Tur Notları" },
  ];

  const childAges = ["Yok", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── HERO GALLERY ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          {/* 1 büyük sol + 2 küçük sağ */}
          <div className="grid grid-cols-3 gap-2 h-64 md:h-[420px] rounded-2xl overflow-hidden">

            {/* Sol: Ana büyük görsel */}
            <div
              className="col-span-2 relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Sağ: Üst + Alt (2 satır) */}
            <div className="flex flex-col gap-2 h-full">

              {/* Üst küçük görsel */}
              <div
                className="flex-1 min-h-0 relative cursor-pointer overflow-hidden group"
                onClick={() => { setGalleryIndex(1); setGalleryOpen(true); }}
              >
                <img
                  src={(tour.gallery ?? [])[0] ?? tour.image}
                  alt={`${tour.title} 2`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Alt küçük görsel — "Tüm Resim ve Videolar" butonu */}
              <div
                className="flex-1 min-h-0 relative cursor-pointer overflow-hidden group"
                onClick={() => { setGalleryIndex(0); setGalleryOpen(true); }}
              >
                <img
                  src={(tour.gallery ?? [])[1] ?? tour.image}
                  alt="Tüm Resimler"
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.55] group-hover:brightness-[0.4] transition-all duration-300"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-white pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-sm border border-white/50 flex items-center justify-center shadow-lg">
                    <Images size={20} />
                  </div>
                  <span className="text-xs font-semibold drop-shadow-lg text-center leading-snug px-2">
                    Tüm Resim ve Videolar
                  </span>
                  <span className="text-[10px] text-white/75 font-medium">
                    {allImages.length} fotoğraf
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── BREADCRUMB + TITLE SECTION ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Breadcrumb
            items={[
              { label: "Tourbulance", href: "/" },
              { label: tour.title },
            ]}
          />

          <div className="mt-3">
            {/* Title */}
            <h1 className="text-gray-900 mb-2">{tour.title}</h1>

            {/* Meta row */}
            <div className="flex items-center gap-3 flex-wrap">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0057A8] border border-gray-200 px-2.5 py-1 rounded-full transition-colors">
                <Share2 size={12} />
                Paylaş
              </button>
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-1.5 text-xs border px-2.5 py-1 rounded-full transition-colors ${
                  liked
                    ? "border-red-300 text-red-500 bg-red-50"
                    : "border-gray-200 text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart size={12} className={liked ? "fill-red-500" : ""} />
                {liked ? "Favorilerde" : "Favorilere Ekle"}
              </button>
              {tour.rating && (
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{tour.rating}</span>
                  <span className="text-xs text-gray-400">({tour.reviewCount} değerlendirme)</span>
                </div>
              )}
            </div>

            {/* Tag chips */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                <MapPin size={11} className="text-[#0057A8]" />
                <span className="truncate max-w-xs">{tour.route}</span>
              </span>
              {tour.transportLabel && (
                <span className="flex items-center gap-1.5 text-xs bg-blue-50 text-[#0057A8] px-3 py-1.5 rounded-lg font-medium">
                  {tour.transport === "plane" ? <Plane size={11} /> : <Bus size={11} />}
                  {tour.transportLabel}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                <Clock size={11} />
                {tour.nightCount} GECE {tour.dayCount} GÜN
              </span>
              {tour.departureCity && (
                <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                  <MapPin size={11} />
                  Kalkış: {tour.departureCity}
                </span>
              )}
              {tour.isVisa && (
                <span className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-medium">
                  <Check size={11} />
                  Vizesiz
                </span>
              )}
              {tour.countries > 0 && (
                <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg">
                  {tour.countries} Ülke, {tour.cities} Şehir
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── STICKY TABS ── */}
      <div
        ref={tabRef}
        className="bg-white border-b border-gray-200 sticky top-[64px] z-40 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => scrollToTab(tab.key)}
                className={`px-5 py-4 text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.key
                    ? "border-[#E31E24] text-[#E31E24] font-semibold"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8 items-start">

          {/* Left column */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* ── GENEL BİLGİLER ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6" id="genel">
              
              

              <h3 className="font-semibold text-gray-700 mb-3 text-[24px]">Genel Tanıtım</h3>

              {tour.highlights && (
                <p className="text-[#E31E24] font-semibold text-sm mb-3 leading-relaxed">
                  {tour.highlights.split("\n").map((line, i) => (
                    <span className="text-[13px]" key={i}>
                      {line}
                      {i < tour.highlights!.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}

              {tour.description && (
                <div>
                  <p
                    className={`text-sm text-gray-600 leading-relaxed ${
                      !showFullDesc ? "line-clamp-4" : ""
                    }`}
                  >
                    {tour.description}
                  </p>
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="flex items-center gap-1 text-sm text-[#0057A8] hover:text-[#004489] mt-2 transition-colors"
                  >
                    {showFullDesc ? "Daha Az" : "Daha Fazla"}
                    {showFullDesc ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              )}

              {tour.altDates && tour.altDates.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Kalkış Tarihleri:</p>
                  <div className="flex flex-wrap gap-2">
                    {[tour.startDate, ...tour.altDates].map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                          selectedDate === date
                            ? "border-[#0057A8] bg-[#0057A8] text-white"
                            : "border-gray-200 text-gray-600 hover:border-[#0057A8] hover:text-[#0057A8]"
                        }`}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── ODA SEÇ ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6" id="oda">
              <h2 className="text-gray-900 mb-4">Oda Seçin</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start gap-4 p-4">
                  <div className="w-32 h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{tour.title}</h3>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {selectedDate || tour.startDate} hareketli
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {tour.nightCount} GECE {tour.dayCount} GÜN
                      </span>
                    </div>
                    {tour.isVisa && (
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Vizesiz
                      </span>
                    )}
                  </div>
                </div>
                <div className="border-t border-gray-100 px-4 py-4 flex items-center justify-between bg-gray-50">
                  <div>
                    <span className="text-xl font-bold text-[#0057A8]">
                      {tour.price.toLocaleString("tr-TR")} {tour.currency}
                    </span>
                    <span className="text-gray-400 mx-2">/</span>
                    <span className="text-base font-semibold text-[#0057A8]">
                      {tour.priceInTL.toLocaleString("tr-TR")} ₺
                    </span>
                    <p className="text-xs text-gray-400 mt-0.5">kişi başı fiyat</p>
                  </div>
                  <Link to={`/rezervasyon/${tour.id}`} className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-200">
                    Rezervasyon Yap
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Tek Kişilik", "Çift Kişilik", "Üçlü Oda"].map((room) => (
                  <div key={room} className="border border-gray-200 rounded-xl p-3 text-center hover:border-[#0057A8] cursor-pointer transition-all group">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-[#0057A8]">{room}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Fiyat için hesaplayın</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ── TUR PROGRAMI ── */}
            {tour.program && tour.program.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6" id="program">
                <h2 className="text-gray-900 mb-5">Tur Programı</h2>
                <div className="space-y-3">
                  {tour.program.map((item) => {
                    const isOpen = openDays.includes(item.day);
                    return (
                      <div key={item.day} className="border border-gray-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleDay(item.day)}
                          className="w-full flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors"
                        >
                          <span className="w-12 h-12 rounded-full bg-[#0057A8] text-white text-[11px] font-bold flex flex-col items-center justify-center shrink-0 leading-tight">
                            <span>{item.day}.</span>
                            <span>Gün</span>
                          </span>
                          <span className="flex-1 text-left text-sm font-medium text-gray-800">
                            {item.title}
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.hotel && (
                              null
                            )}
                            {isOpen ? (
                              <X size={16} className="text-gray-400" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-400" />
                            )}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="border-t border-gray-100 bg-gray-50/60">
                            <div className="px-6 py-5">
                              <p className="text-sm font-semibold text-[#0057A8] mb-3">{item.title}</p>
                              <div className="text-sm text-gray-700 leading-[1.8] whitespace-pre-line">
                                {item.content}
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {item.hotel && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                                    🏨 {item.hotel}
                                  </span>
                                )}
                                {item.meals && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                                    🍽 {item.meals}
                                  </span>
                                )}
                                {item.route && (
                                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                                    🛣 {item.route}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── DAHİL HİZMETLER ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6" id="dahil">
              <h2 className="text-gray-900 mb-5">Dahil ve Hariç Hizmetler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-emerald-600" />
                    </span>
                    <h3 className="text-sm font-semibold text-emerald-700">Fiyata Dahil Hizmetler</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {(tour.included || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                      <X size={14} className="text-red-500" />
                    </span>
                    <h3 className="text-sm font-semibold text-red-600">Fiyata Dahil Olmayan Hizmetler</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {(tour.notIncluded || []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <X size={14} className="text-red-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── TUR NOTLARI / İPTAL ŞARTLARI / VİZE BİLGİLERİ ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" id="notlar">

              {/* ── Tur Notları ── */}
              <div className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenInfoSection(openInfoSection === "oedeme" ? null : "oedeme")}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-[#0057A8]" />
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">Tur Notları</span>
                  </div>
                  {openInfoSection === "oedeme"
                    ? <ChevronUp size={18} className="text-gray-400 shrink-0" />
                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  }
                </button>

                {openInfoSection === "oedeme" && (
                  <div className="px-6 pb-6 bg-gray-50/40">
                    {/* ÖDEME başlığı */}
                    <div className="flex items-center gap-2 mb-3 pt-2">
                      <CreditCard size={15} className="text-[#0057A8]" />
                      <span className="font-semibold text-gray-800 text-sm">ÖDEME</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">Rezervasyon için;</p>

                    <ul className="space-y-2.5">
                      {[
                        "200 € ön ödeme yaparak yerinizi ayırtabilirsiniz.",
                        "Eft ile TL, Euro (€) veya Dolar ($) olarak veya kredi kartı ile ödeme yapabilirsiniz.",
                        "Kalan tutarı tur tarihine 33 gün kalana kadar Eft veya Kredi Kartı ile tamamlıyabilirsiniz.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0057A8] shrink-0 mt-2" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-sm font-semibold text-amber-800 mb-2">33 Günden az kalan turlar için;</p>
                      <ul className="space-y-2">
                        {[
                          "Tur tarihine 33 günden az kaldıysa, tüm ücretin peşin olarak ödenmesi gerekir.",
                          "Eft ile TL, Euro (€), Dolar ($) ya da kredi kartı ile tek çekim olarak ödeme yapabilirsiniz.",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-amber-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <AlertTriangle size={15} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">
                        BDDK kararı uyarınca yurt dışı turlarında kredi kartına taksitli işlem yapılamamaktadır.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* ── İptal Şartları ── */}
              <div className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenInfoSection(openInfoSection === "iptal" ? null : "iptal")}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                      <AlertTriangle size={16} className="text-orange-500" />
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">İptal Şartları</span>
                  </div>
                  {openInfoSection === "iptal"
                    ? <ChevronUp size={18} className="text-gray-400 shrink-0" />
                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  }
                </button>

                {openInfoSection === "iptal" && (
                  <div className="px-6 pb-6 bg-gray-50/40">
                    <div className="overflow-x-auto mt-2">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="text-left text-xs font-semibold text-gray-600 px-4 py-2.5 rounded-tl-lg">İptal Süresi</th>
                            <th className="text-left text-xs font-semibold text-gray-600 px-4 py-2.5 rounded-tr-lg">Kesinti Oranı</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { period: "45 gün ve üzeri önce", rate: "Tam İade (Yalnızca işlem masrafları kesilir)" },
                            { period: "44 – 31 gün önce", rate: "Tur bedelinin %25'i kesilir" },
                            { period: "30 – 15 gün önce", rate: "Tur bedelinin %50'si kesilir" },
                            { period: "14 – 7 gün önce", rate: "Tur bedelinin %75'i kesilir" },
                            { period: "7 günden az / tura katılmama", rate: "İade yapılmaz (%100 kesilir)" },
                          ].map((row, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                              <td className="px-4 py-3 text-gray-700 text-xs border-t border-gray-100">{row.period}</td>
                              <td className="px-4 py-3 text-gray-700 text-xs border-t border-gray-100">{row.rate}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-400 mt-3">
                      * İptal işlemleri yazılı olarak bildirilmelidir. Hava yolu, konaklama ve transfer ücretleri ayrıca iade politikasına tabidir.
                    </p>
                  </div>
                )}
              </div>

              {/* ── Vize Bilgileri ── */}
              <div>
                <button
                  className="w-full flex items-center justify-between gap-3 px-6 py-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenInfoSection(openInfoSection === "vize" ? null : "vize")}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <ShieldCheck size={16} className="text-emerald-600" />
                    </span>
                    <span className="font-semibold text-gray-800 text-sm">Vize Bilgileri</span>
                  </div>
                  {openInfoSection === "vize"
                    ? <ChevronUp size={18} className="text-gray-400 shrink-0" />
                    : <ChevronDown size={18} className="text-gray-400 shrink-0" />
                  }
                </button>

                {openInfoSection === "vize" && (
                  <div className="px-6 pb-6 bg-gray-50/40">
                    {tour.isVisa ? (
                      <div className="mt-2 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-4">
                        <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-emerald-800 mb-1">Bu Tur Vizesizdir</p>
                          <p className="text-sm text-emerald-700">
                            TC vatandaşları için geçerli kimlik kartı veya pasaport ile seyahat edilebilir. Ek vize gerekmemektedir.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                        <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800 mb-1">Vize Gereklidir</p>
                          <p className="text-sm text-amber-700">
                            Bu tur için önceden vize alınması gerekmektedir. Detaylar için müşteri temsilcimizle iletişime geçiniz.
                          </p>
                        </div>
                      </div>
                    )}
                    <ul className="space-y-2.5">
                      {[
                        "Pasaportunuzun seyahat tarihinden itibaren en az 6 ay geçerliliğinin olması gerekmektedir.",
                        "Pasaportunuzda en az 2 boş sayfa bulunmalıdır.",
                        "Çift taraflı biyometrik fotoğraf (son 6 ay içinde çekilmiş) gerekmektedir.",
                        "Seyahat sigortası poliçesinin tüm tur süresini kapsaması zorunludur.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

            </div>
            {/* ── TUR NOTLARI SONU ── */}

          </div>

          {/* ── STICKY SIDEBAR ── */}
          <div className="w-80 shrink-0 hidden lg:block sticky top-[120px]">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Price Header */}
              <div className="bg-gradient-to-r from-[#0057A8] to-[#0070D8] px-5 py-4 text-white">
                <p className="text-xs text-white/70 mb-0.5">Kişi başı fiyat</p>
                {tour.originalPrice && (
                  <p className="text-sm line-through text-white/50">
                    {tour.originalPrice.toLocaleString("tr-TR")} {tour.currency}
                  </p>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {tour.price.toLocaleString("tr-TR")}
                  </span>
                  <span className="text-lg font-semibold">{tour.currency}</span>
                  {tour.discount && (
                    <span className="text-xs bg-[#E31E24] text-white px-2 py-0.5 rounded-full font-medium">
                      %{tour.discount} İndirim
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/70 mt-1">
                  ≈ {tour.priceInTL.toLocaleString("tr-TR")} ₺
                </p>
              </div>

              {/* Guest header */}
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-2.5 flex items-center gap-2">
                <Users size={14} className="text-[#0057A8]" />
                <span className="text-sm font-semibold text-gray-700">
                  {adults} Misafir, 1 Oda
                </span>
              </div>

              <div className="p-5 space-y-4">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Tarih
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#0057A8] transition-colors bg-white"
                    >
                      <option value={tour.startDate}>{tour.startDate}</option>
                      {tour.altDates?.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Adults */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Yetişkin
                  </label>
                  <div className="relative">
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#0057A8] transition-colors bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Child ages */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      1. Çocuk Yaşı
                    </label>
                    <div className="relative">
                      <select
                        value={child1Age}
                        onChange={(e) => setChild1Age(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#0057A8] transition-colors bg-white"
                      >
                        {childAges.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                      2. Çocuk Yaşı
                    </label>
                    <div className="relative">
                      <select
                        value={child2Age}
                        onChange={(e) => setChild2Age(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl py-2.5 px-3 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#0057A8] transition-colors bg-white"
                      >
                        {childAges.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="border-2 border-[#0057A8] text-[#0057A8] py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors">
                    Oda Ekle
                  </button>
                  <button className="bg-[#0057A8] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#004489] transition-colors shadow-md shadow-blue-200">
                    Hesapla
                  </button>
                </div>

                <button className="w-full text-center text-xs text-[#0057A8] hover:underline">
                  Fiyat Tablosu için tıklayın
                </button>
              </div>

              {/* Contact CTA */}
              <div className="border-t border-gray-200 p-4 space-y-2">
                <Link to={`/rezervasyon/${tour.id}`} className="w-full bg-[#E31E24] hover:bg-[#BE1920] text-white py-3 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-red-200 flex items-center justify-center">
                  Rezervasyon Yap
                </Link>
                <a
                  href="tel:+908501234567"
                  className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-[#0057A8] text-gray-700 hover:text-[#0057A8] py-2.5 rounded-xl text-sm font-medium transition-colors"
                >
                  <Phone size={14} />
                  0850 XXX XX XX
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── BENZER TURLAR ── */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-900">Benzer Turlar</h2>
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-[#0057A8] hover:text-[#004489] transition-colors"
            >
              Tüm Turları Gör <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {similarTours.map((similar) => (
              <Link
                key={similar.id}
                to={`/tur/${similar.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group block"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {similar.isVisa && (
                      <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                        Vizesiz
                      </span>
                    )}
                    {similar.discount && (
                      <span className="bg-[#E31E24] text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                        %{similar.discount} İndirim
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 leading-snug group-hover:text-[#0057A8] transition-colors line-clamp-2">
                    {similar.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {similar.nightCount}G {similar.dayCount}G
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {similar.countries} Ülke
                    </span>
                    {similar.rating && (
                      <span className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-400 text-amber-400" />
                        {similar.rating}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-[#E31E24]">
                        {similar.price.toLocaleString("tr-TR")} {similar.currency}
                      </span>
                      <p className="text-[10px] text-gray-400">kişi başı</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#0057A8] font-medium">
                      İncele <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 z-40 shadow-lg">
        <div className="flex-1">
          <p className="text-xs text-gray-500">Kişi başı fiyat</p>
          <p className="font-bold text-[#E31E24]">
            {tour.price.toLocaleString("tr-TR")} {tour.currency}
          </p>
        </div>
        <button className="bg-[#0057A8] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-md">
          Hesapla & Rezervasyon
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      {galleryOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setGalleryOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={() => setGalleryOpen(false)}
          >
            <X size={20} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div className="px-16 w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImages[galleryIndex]}
              alt={`Fotoğraf ${galleryIndex + 1}`}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <p className="text-center text-white/60 text-sm mt-3">
              {galleryIndex + 1} / {allImages.length}
            </p>
          </div>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setGalleryIndex((prev) => (prev + 1) % allImages.length);
            }}
          >
            <ArrowRight size={20} />
          </button>
          <div className="absolute bottom-6 flex gap-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setGalleryIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === galleryIndex ? "bg-white scale-125" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}