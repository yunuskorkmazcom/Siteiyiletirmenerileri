import { useState } from "react";
import {
  Flame,
  Calendar,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
} from "lucide-react";
import { TourCard } from "./TourCard";
import { TOURS } from "../data/tours";

type SortType = "popular" | "date" | "price_asc" | "price_desc";

export function TourList() {
  const [sortBy, setSortBy] = useState<SortType>("popular");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const sortedTours = [...TOURS].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "date") return a.startDate.localeCompare(b.startDate);
    return (b.rating || 0) - (a.rating || 0);
  });

  const sortOptions = [
    { id: "popular" as SortType, label: "Popüler Turlar", icon: Flame },
    { id: "date" as SortType, label: "En Yakın Tarih", icon: Calendar },
    { id: "price_asc" as SortType, label: "Fiyata Göre Artan", icon: TrendingUp },
    { id: "price_desc" as SortType, label: "Fiyata Göre Azalan", icon: TrendingDown },
  ];

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h1 className="text-gray-900">Avrupa Turları</h1>
          
        </div>

        <button
          className="lg:hidden flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-xl text-sm text-gray-600 shrink-0"
          onClick={() => setShowMobileFilter(!showMobileFilter)}
        >
          <SlidersHorizontal size={14} />
          Filtrele
        </button>
      </div>

      {/* Sort Tabs */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-none">
        {sortOptions.map((opt) => {
          const Icon = opt.icon;
          const active = sortBy === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setSortBy(opt.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                active
                  ? "bg-[#E31E24] text-white shadow-md shadow-red-200"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-[#0057A8] hover:text-[#0057A8]"
              }`}
            >
              <Icon size={14} />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tours */}
      <div className="flex flex-col gap-4">
        {sortedTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="bg-white border-2 border-[#0057A8] text-[#0057A8] hover:bg-[#0057A8] hover:text-white px-8 py-3 rounded-xl text-sm font-medium transition-all">
          Daha Fazla Tur Yükle
        </button>
      </div>
    </div>
  );
}