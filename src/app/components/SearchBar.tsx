import { useState } from "react";
import { Search, MapPin, CalendarDays } from "lucide-react";

function formatDate(val: string) {
  if (!val) return "";
  const [y, m, d] = val.split("-");
  return `${d}.${m}.${y}`;
}

export function SearchBar() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("2026-03-15");
  const [endDate, setEndDate] = useState("2026-02-25");

  return (
    <div className="bg-[#0057A8] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <p className="text-white/70 mb-3 text-center text-[20px]">Hayalinizdeki turu bulun</p>

        {/* Ana Kart */}
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-stretch overflow-hidden">

          {/* ── NEREYE ── */}
          <div className="flex-1 flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
            <MapPin size={20} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Nereye</p>
              <input
                type="text"
                placeholder="Tur yada kategori adı..."
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-sm text-gray-500 bg-transparent outline-none placeholder-gray-400"
              />
            </div>
          </div>

          {/* Dikey ayraç */}
          <div className="hidden md:block w-px bg-gray-200 my-3" />
          <div className="block md:hidden h-px bg-gray-100 mx-5" />

          {/* ── TARİH ARALIĞI ── */}
          <div className="flex-1 flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors relative">
            <CalendarDays size={20} className="text-[#0057A8] shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest mb-1">Tarih Aralığı</p>
              <div className="flex items-center gap-2">
                {/* Görünür metin — altında hidden date input */}
                <label className="relative cursor-pointer">
                  <span className="text-sm font-bold text-gray-800">
                    {startDate ? formatDate(startDate) : "gg.aa.yyyy"}
                  </span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                </label>
                <span className="text-gray-400 text-sm">-</span>
                <label className="relative cursor-pointer">
                  <span className="text-sm font-bold text-gray-800">
                    {endDate ? formatDate(endDate) : "gg.aa.yyyy"}
                  </span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* ── ARA BUTONU ── */}
          <button className="flex items-center justify-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white px-8 py-4 md:rounded-none md:rounded-r-2xl text-sm font-semibold transition-all shrink-0 rounded-b-2xl">
            <Search size={16} />
            <span>Ara</span>
          </button>
        </div>

        {/* Quick Tags */}
        <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
          {["Vizesiz Turlar", "Balkan Turu", "Avrupa Turu", "Yunanistan", "Kıbrıs"].map((tag) => (
            <button
              key={tag}
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white/90 rounded-full text-xs border border-white/20 transition-all hover:border-white/40"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}