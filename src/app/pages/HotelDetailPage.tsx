import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  MapPin, Share2, Heart, Star, Users, ChevronLeft, ChevronRight, X,
  Images, Wifi, Car, Waves, Check, Phone, ChevronDown, Eye,
  Utensils, ArrowRight, Calendar, MessageSquare, List,
} from "lucide-react";
import { HOTELS } from "../data/hotels";
import { Breadcrumb } from "../components/Breadcrumb";

type BookingTab = "otel" | "otel-ucak";

/* ─── Oda Özellikleri Popup ─── */
const ROOM_FEATURES = [
  "Banyo", "Buklet Banyo Ürünleri", "Duş", "Saç Kurutma Makinesi", "WC",
  "Müzik Yayını (TV den)", "Balkon", "Kasa", "Plazma Televizyon",
  "Oda Servisi*", "Minibar", "Klima", "Telefon", "Çalışma Masası",
];

function RoomFeaturesModal({
  room, images, onClose,
}: { room: { name: string }; images: string[]; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-900">{room.name}</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Main photo */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
          <img src={images[activeImg]} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-none">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)}
              className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === activeImg ? "border-[#0057A8] shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mx-5" />

        {/* Features list */}
        <div className="px-5 py-4 grid grid-cols-1 gap-1.5 pb-6">
          {ROOM_FEATURES.map((f) => (
            <p key={f} className="text-sm text-gray-700 flex items-center gap-2">
              <Check size={13} className="text-emerald-500 shrink-0" /> {f}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Müsaitlik Takvimi Popup ─── */
const DAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

function getDaysInMonth(year: number, month: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Mon=0
}

const AVAILABILITY: Record<string, "available" | "unavailable" | "pre"> = {
  "2026-2-5": "unavailable", "2026-2-6": "unavailable", "2026-2-7": "unavailable",
  "2026-2-12": "pre", "2026-2-13": "pre",
  "2026-3-3": "unavailable", "2026-3-4": "unavailable",
  "2026-3-10": "pre", "2026-3-11": "pre", "2026-3-12": "pre",
};

function CalendarMonth({ year, month }: { year: number; month: number }) {
  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
  const days = getDaysInMonth(year, month);
  const startDay = getFirstDayOfWeek(year, month);
  const cells = Array.from({ length: startDay }, () => null).concat(Array.from({ length: days }, (_, i) => i + 1));

  return (
    <div className="flex-1 min-w-0">
      <p className="text-center font-bold text-gray-900 mb-3">{monthNames[month]} {year}</p>
      <div className="grid grid-cols-7 gap-px">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
        ))}
        {cells.map((day, i) => {
          const key = `${year}-${month}-${day}`;
          const status = day ? (AVAILABILITY[key] ?? "available") : null;
          return (
            <div key={i} className={`text-center text-sm py-1.5 rounded-lg transition-colors ${
              !day ? "" :
              status === "unavailable" ? "bg-red-100 text-red-500 line-through" :
              status === "pre" ? "bg-blue-100 text-blue-600" :
              "hover:bg-emerald-50 text-gray-700 cursor-pointer"
            }`}>
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AvailabilityModal({ room, onClose }: { room: { name: string }; onClose: () => void }) {
  const today = new Date();
  const [offset, setOffset] = useState(0);

  const getMonthYear = (delta: number) => {
    const d = new Date(today.getFullYear(), today.getMonth() + delta, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  };

  const left = getMonthYear(offset);
  const right = getMonthYear(offset + 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <p className="font-bold text-gray-900">Müsaitlik Takvimi</p>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Calendar */}
        <div className="px-6 py-5">
          <div className="border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center gap-4">
              {/* Prev */}
              <button onClick={() => setOffset((p) => p - 1)}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
                <ChevronLeft size={14} />
              </button>
              {/* Two months */}
              <div className="flex flex-1 gap-6 overflow-hidden">
                <CalendarMonth year={left.year} month={left.month} />
                <div className="w-px bg-gray-200 shrink-0" />
                <CalendarMonth year={right.year} month={right.month} />
              </div>
              {/* Next */}
              <button onClick={() => setOffset((p) => p + 1)}
                className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors shrink-0">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-4">
            {[
              { color: "bg-emerald-500", label: "Müsait" },
              { color: "bg-red-500", label: "Müsait Değil" },
              { color: "bg-blue-500", label: "Sadece Ön Rezervasyon" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-600">
                <span className={`w-3 h-3 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="border border-gray-300 text-gray-700 text-sm px-6 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

export function HotelDetailPage() {
  const { id } = useParams<{ id: string }>();
  const hotel = HOTELS.find((h) => h.id === Number(id)) ?? HOTELS[0];

  const [liked, setLiked] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [bookingTab, setBookingTab] = useState<BookingTab>("otel");
  const [checkIn, setCheckIn] = useState("15.03.2026");
  const [checkOut, setCheckOut] = useState("24.03.2026");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [roomFeaturesModal, setRoomFeaturesModal] = useState<{ name: string } | null>(null);
  const [availabilityModal, setAvailabilityModal] = useState<{ name: string } | null>(null);

  const allImages = [hotel.image, ...hotel.gallery];
  const similar = HOTELS.filter((h) => h.id !== hotel.id).slice(0, 3);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ── GALLERY GRID (1 big left + 4 right) ── */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
          <Breadcrumb items={[
            { label: "Tourbulance", href: "/" },
            { label: hotel.name },
          ]} />
          <div className="mt-3 grid grid-cols-3 grid-rows-2 gap-2 h-72 md:h-[420px] rounded-2xl overflow-hidden">

            {/* Big left */}
            <div className="row-span-2 col-span-1 relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}>
              <img src={allImages[0]} alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Top-right 1 */}
            <div className="relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIdx(1); setGalleryOpen(true); }}>
              <img src={allImages[1] ?? allImages[0]} alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Top-right 2 */}
            <div className="relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIdx(2); setGalleryOpen(true); }}>
              <img src={allImages[2] ?? allImages[0]} alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Bottom-right 1 */}
            <div className="relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIdx(3); setGalleryOpen(true); }}>
              <img src={allImages[3] ?? allImages[0]} alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Bottom-right 2 — "Tüm Fotoğraflar" */}
            <div className="relative cursor-pointer overflow-hidden group"
              onClick={() => { setGalleryIdx(0); setGalleryOpen(true); }}>
              <img src={allImages[4] ?? allImages[0]} alt=""
                className="w-full h-full object-cover brightness-50 group-hover:brightness-40 transition-all duration-300" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-white pointer-events-none">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2">
                  <Images size={16} />
                  <span className="text-sm font-semibold">Tüm Fotoğraflar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── "X kişi inceliyor" badge ── */}
      <div className="sticky top-[64px] z-30 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4">
          <div className="pointer-events-auto w-fit mt-3 bg-[#E31E24] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Eye size={12} />
            Şuan bu oteli {hotel.viewerCount} kişi inceliyor
          </div>
        </div>
      </div>

      {/* ── NAME + RATING BAR ── */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
                {hotel.name}
              </h1>
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <span className="flex items-center gap-1.5 text-sm text-[#0057A8]">
                  <MapPin size={13} /> {hotel.city} / {hotel.region}
                </span>
                <button className="text-[#0057A8] text-sm underline flex items-center gap-1">
                  Haritada Göster <ArrowRight size={12} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="bg-[#0dbac6] text-white rounded-2xl px-4 py-3 text-center min-w-[90px]">
                <p className="font-bold leading-none" style={{ fontSize: "2rem" }}>{hotel.rating}</p>
                <p className="text-xs mt-0.5 font-semibold">{hotel.ratingLabel}</p>
                <p className="text-[10px] text-white/70 mt-0.5">Konakayan Misafirlerin Ortalama Puanı.</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 border border-gray-200 text-gray-500 hover:text-[#0057A8] hover:border-[#0057A8] text-xs px-3 py-1.5 rounded-xl transition-colors">
                  <Share2 size={12} /> Paylaş
                </button>
                <button onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 border text-xs px-3 py-1.5 rounded-xl transition-colors ${liked ? "border-red-300 text-red-500 bg-red-50" : "border-gray-200 text-gray-500 hover:text-red-500"}`}>
                  <Heart size={12} className={liked ? "fill-red-500" : ""} />
                </button>
              </div>
            </div>
          </div>
          {/* Tesis Özellikleri button */}
          <div className="mt-4 flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-xl hover:border-[#0057A8] hover:text-[#0057A8] transition-colors">
              Tesis Özellikleri <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 space-y-6">

            {/* Genel Tanıtım */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              
              <p className="flex items-center gap-1.5 text-sm text-[#0057A8] mb-4">
                <MapPin size={12} /> {hotel.city} / {hotel.region}
                <button className="underline ml-1 flex items-center gap-0.5">Haritada Göster <ArrowRight size={11} /></button>
              </p>
              <h3 className="text-xs font-bold text-[#0057A8] uppercase tracking-wider mb-2">Genel Tanıtım</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{hotel.description}</p>
            </div>

            {/* Oda Seçin */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Oda Seçin</h2>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 text-center text-sm text-gray-500">
                  Çıkış Tarihini kontrol ediniz.
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {hotel.rooms.map((room, idx) => (
                  <div key={room.name} className={`border rounded-xl overflow-hidden flex flex-col sm:flex-row transition-all ${room.available ? "border-gray-200 hover:border-[#0057A8] hover:shadow-md" : "border-gray-100 bg-gray-50 opacity-60"}`}>
                    {/* Oda Fotoğrafı */}
                    <div className="relative w-full sm:w-44 h-36 shrink-0 overflow-hidden">
                      <img
                        src={hotel.gallery[idx % hotel.gallery.length] ?? "https://images.unsplash.com/photo-1766928210443-0be92ed5884a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"}
                        alt={room.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      {!room.available && (
                        <div className="absolute inset-0 bg-gray-900/40 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold bg-red-500/80 px-3 py-1.5 rounded-lg">Müsait Değil</span>
                        </div>
                      )}
                    </div>

                    {/* İçerik */}
                    <div className="flex flex-1 items-center justify-between gap-4 p-4">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 text-sm">{room.name}</p>
                        <p className="text-xs text-emerald-600 mt-0.5 flex items-center gap-1"><Utensils size={10} /> {room.concept}</p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><Users size={10} /> {room.capacity}</p>
                        {/* Aksiyon butonları */}
                        <div className="flex gap-2 mt-2.5 flex-wrap">
                          <button
                            onClick={() => setRoomFeaturesModal(room)}
                            className="flex items-center gap-1.5 text-xs text-[#0057A8] border border-[#0057A8]/30 bg-blue-50 hover:bg-[#0057A8] hover:text-white px-3 py-1.5 rounded-lg transition-all"
                          >
                            <List size={11} /> Odanın Özellikleri
                          </button>
                          <button
                            onClick={() => setAvailabilityModal(room)}
                            className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-all"
                          >
                            <Calendar size={11} /> Müsaitlik Takvimi
                          </button>
                        </div>
                      </div>
                      {room.available ? (
                        <div className="text-right shrink-0">
                          <p className="font-bold text-[#E31E24]">{room.price.toLocaleString("tr-TR")} ₺</p>
                          <p className="text-xs text-gray-400">gecelik</p>
                          <button className="mt-2 bg-[#0057A8] text-white text-xs px-4 py-2 rounded-xl hover:bg-[#004489] transition-colors">
                            Rezervasyon Yap
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-red-400 bg-red-50 px-3 py-1.5 rounded-lg">Müsait Değil</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tesis Notları */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Tesis Notları</h2>
              <div className="space-y-2">
                {[
                  { icon: "🚭", text: "Tesis genelinde sigara içmek yasaktır." },
                  { icon: "🐾", text: "Tesise hayvan kabul edilmemektedir." },
                  { icon: "✅", text: "Check-in saati: 14:00 / Check-out saati: 12:00" },
                  ...(hotel.childPolicy ? [{ icon: "👶", text: hotel.childPolicy }] : []),
                  ...(hotel.paymentNote ? [{ icon: "💳", text: hotel.paymentNote }] : []),
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-600 bg-gray-50 rounded-xl px-4 py-3">
                    <span>{n.icon}</span>
                    <span>{n.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Plaj Özellikleri */}
            {hotel.beachFeatures && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Plaj Özellikleri</h2>
                <div className="flex items-center gap-4 mb-4">
                  <Waves size={40} className="text-[#0057A8] opacity-60" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {hotel.beachFeatures.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={14} className="text-emerald-500 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* İnternet & Otopark */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* İnternet */}
                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Wifi size={20} className="text-[#0057A8]" />
                    </div>
                    <p className="font-semibold text-gray-900">İnternet</p>
                  </div>
                  {hotel.internetFeatures.map((f) => (
                    <p key={f} className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                      <Check size={13} className="text-emerald-500 shrink-0" /> {f}
                    </p>
                  ))}
                </div>
                {/* Otopark */}
                <div className="border border-gray-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Car size={20} className="text-[#0057A8]" />
                    </div>
                    <p className="font-semibold text-gray-900">Otopark</p>
                  </div>
                  {hotel.parkingFeatures.map((f) => (
                    <p key={f} className="flex items-center gap-2 text-sm text-gray-600 mb-1.5">
                      <Check size={13} className="text-emerald-500 shrink-0" /> {f}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Tüm tesis özellikleri */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Tüm Tesis Özellikleri</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[...hotel.features, ...hotel.otherFacilities].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={13} className="text-emerald-500 shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Fiyatlar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Fiyatlar</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0057A8] text-white text-xs">
                      <th className="px-4 py-3 text-left rounded-tl-xl">Oda Tipi</th>
                      <th className="px-4 py-3 text-left">Konsept</th>
                      <th className="px-4 py-3 text-left">Kapasite</th>
                      <th className="px-4 py-3 text-right rounded-tr-xl">Gecelik Fiyat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotel.rooms.map((r, i) => (
                      <tr key={r.name} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium text-gray-800 border-b border-gray-100">{r.name}</td>
                        <td className="px-4 py-3 text-emerald-600 border-b border-gray-100">{r.concept}</td>
                        <td className="px-4 py-3 text-gray-600 border-b border-gray-100">{r.capacity}</td>
                        <td className="px-4 py-3 text-right border-b border-gray-100">
                          {r.available ? (
                            <span className="font-bold text-[#E31E24]">{r.price.toLocaleString("tr-TR")} ₺</span>
                          ) : (
                            <span className="text-gray-400 text-xs">Müsait Değil</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Artists — Entertainment program */}
            {hotel.artists && hotel.artists.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Eğlence Programı</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-none pb-2">
                  {hotel.artists.map((a) => (
                    <div key={a.name} className="flex flex-col items-center shrink-0">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-3 border-white shadow-md">
                        <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mt-2 text-center">{a.name}</p>
                      <p className="text-xs text-gray-400 text-center">{a.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>
                {hotel.name} Yorumları
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#0dbac6] text-white rounded-2xl px-4 py-3 text-center">
                  <p className="font-bold" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{hotel.rating}</p>
                  <p className="text-sm font-semibold mt-1">{hotel.ratingLabel}</p>
                  <p className="text-xs text-white/70">{hotel.reviewCount} yorum</p>
                </div>
                <div className="flex-1 space-y-2">
                  {["Konum", "Temizlik", "Hizmet", "Yemek", "Fiyat/Kalite"].map((cat, i) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-24 shrink-0">{cat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#0dbac6] h-full rounded-full" style={{ width: `${[92, 88, 90, 85, 80][i]}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-8">{[9.2, 8.8, 9.0, 8.5, 8.0][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-gray-200 rounded-2xl px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MessageSquare size={15} />
                  Yorum yapmak için üye girişi yapmalısınız.
                </div>
                <button className="text-[#0057A8] text-sm font-semibold hover:underline">Üye girişi yap</button>
              </div>
            </div>

            {/* Benzer Oteller */}
            <div>
              <h2 className="font-bold text-gray-900 mb-4" style={{ fontSize: "1.15rem" }}>Benzer Oteller</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {similar.map((h) => (
                  <Link key={h.id} to={`/otel/${h.id}`}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group block">
                    <div className="relative h-44 overflow-hidden">
                      {h.badge && (
                        <span className="absolute top-3 left-3 z-10 bg-[#E31E24] text-white text-xs font-bold px-2 py-1 rounded-md">
                          {h.badge.toUpperCase()}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 z-10 bg-gray-800/70 text-white text-xs px-2 py-1 rounded-md">
                        {h.priceInTL > 0 ? `+${h.price.toLocaleString("tr-TR")} ₺` : "*Sizi Arayalım..."}
                      </span>
                      <img src={h.image} alt={h.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold text-gray-900 text-sm group-hover:text-[#0057A8] transition-colors">{h.name}</p>
                      <p className="text-xs text-amber-500 flex items-center gap-1 mt-1">
                        <Star size={10} className="fill-amber-400" /> {h.city} / {h.region}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ── STICKY RIGHT SIDEBAR ── */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden sticky top-[120px]">
              {/* Guests header */}
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center gap-2">
                <Users size={14} className="text-[#0057A8]" />
                <span className="text-sm font-semibold text-gray-700">{guests} Misafir, {rooms} Oda</span>
              </div>

              {/* Otel / Otel + Uçak tabs */}
              <div className="flex border-b border-gray-200">
                {([
                  { key: "otel", label: "🛏️ Otel" },
                  { key: "otel-ucak", label: "✈️ Otel + Uçak" },
                ] as const).map((t) => (
                  <button key={t.key} onClick={() => setBookingTab(t.key)}
                    className={`flex-1 py-3 text-sm font-semibold transition-colors ${bookingTab === t.key ? "border-b-2 border-[#0057A8] text-[#0057A8]" : "text-gray-500 hover:text-gray-700"}`}>
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-3">
                {/* Check-in */}
                <div className="border border-gray-200 rounded-xl px-3 py-3">
                  <p className="text-[10px] font-bold text-[#0057A8] uppercase tracking-wider mb-0.5">Giriş Tarihi</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-gray-400" />
                    <input value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
                      className="text-sm text-gray-700 outline-none flex-1" />
                  </div>
                </div>

                {/* Check-out */}
                <div className="border border-gray-200 rounded-xl px-3 py-3">
                  <p className="text-[10px] font-bold text-[#0057A8] uppercase tracking-wider mb-0.5">Çıkış Tarihi</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="text-gray-400" />
                    <input value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
                      className="text-sm text-gray-700 outline-none flex-1" />
                  </div>
                </div>

                {/* Guests */}
                <div className="border border-gray-200 rounded-xl px-3 py-3">
                  <p className="text-[10px] font-bold text-[#0057A8] uppercase tracking-wider mb-0.5">Kişi Sayısı</p>
                  <div className="flex items-center gap-2">
                    <Users size={13} className="text-gray-400" />
                    <div className="relative flex-1">
                      <select value={`${rooms}Oda,${guests}Yetişkin`}
                        onChange={(e) => {
                          const [r, g] = e.target.value.split(",");
                          setRooms(Number(r.replace("Oda", "")));
                          setGuests(Number(g.replace("Yetişkin", "")));
                        }}
                        className="text-sm text-gray-700 outline-none appearance-none w-full bg-transparent cursor-pointer">
                        <option value="1Oda,1Yetişkin">1Oda,1 Yetişkin</option>
                        <option value="1Oda,2Yetişkin">1Oda,2 Yetişkin</option>
                        <option value="1Oda,3Yetişkin">1Oda,3 Yetişkin</option>
                        <option value="2Oda,2Yetişkin">2Oda,2 Yetişkin</option>
                        <option value="2Oda,4Yetişkin">2Oda,4 Yetişkin</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Hesapla */}
                <button className="w-full bg-[#0057A8] hover:bg-[#004489] text-white font-bold py-4 rounded-xl transition-all shadow-md shadow-blue-200 text-base">
                  Hesapla
                </button>

                {/* Phone */}
                <a href="tel:+908501234567"
                  className="flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-[#0057A8] text-gray-700 hover:text-[#0057A8] py-3 rounded-xl text-sm font-medium transition-colors">
                  <Phone size={14} /> 0850 XXX XX XX
                </a>

                {/* Campaign */}
                {hotel.campaignNote && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-700 text-center">📣 {hotel.campaignNote}</p>
                  </div>
                )}

                {/* Badges */}
                <div className="flex justify-around pt-2 border-t border-gray-100">
                  {["Güvenli Ödeme", "TÜRSAB Lisanslı", "İptal Garantisi"].map((b) => (
                    <div key={b} className="flex flex-col items-center gap-1">
                      <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
                        <Check size={14} className="text-emerald-600" />
                      </div>
                      <p className="text-[10px] text-gray-400 text-center leading-tight">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-3 z-40 shadow-lg">
        <div className="flex-1">
          <p className="text-xs text-gray-400">Gecelik fiyat</p>
          <p className="font-bold text-[#E31E24]">{hotel.price.toLocaleString("tr-TR")} ₺</p>
        </div>
        <button className="bg-[#0057A8] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-md">
          Rezervasyon Yap
        </button>
      </div>

      {/* ── LIGHTBOX ── */}
      {galleryOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setGalleryOpen(false)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
            onClick={() => setGalleryOpen(false)}>
            <X size={20} />
          </button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
            onClick={(e) => { e.stopPropagation(); setGalleryIdx((p) => (p - 1 + allImages.length) % allImages.length); }}>
            <ChevronLeft size={20} />
          </button>
          <div className="px-16 w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={allImages[galleryIdx]} alt="" className="w-full max-h-[75vh] object-contain rounded-xl" />
            <p className="text-center text-white/60 text-sm mt-3">{galleryIdx + 1} / {allImages.length}</p>
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white"
            onClick={(e) => { e.stopPropagation(); setGalleryIdx((p) => (p + 1) % allImages.length); }}>
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-6 flex gap-2">
            {allImages.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setGalleryIdx(i); }}
                className={`w-2 h-2 rounded-full transition-all ${i === galleryIdx ? "bg-white scale-125" : "bg-white/40"}`} />
            ))}
          </div>
        </div>
      )}

      {/* ── Oda Özellikleri Modal ── */}
      {roomFeaturesModal && (
        <RoomFeaturesModal
          room={roomFeaturesModal}
          images={allImages.slice(0, 5)}
          onClose={() => setRoomFeaturesModal(null)}
        />
      )}

      {/* ── Müsaitlik Takvimi Modal ── */}
      {availabilityModal && (
        <AvailabilityModal
          room={availabilityModal}
          onClose={() => setAvailabilityModal(null)}
        />
      )}
    </div>
  );
}