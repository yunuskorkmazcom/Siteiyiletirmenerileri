import { useState } from "react";
import { Link } from "react-router";
import {
  Heart, Calendar, Clock, Bus, Plane,
  MapPin, ArrowRight, Star, Users,
} from "lucide-react";
import type { Tour } from "../data/tours";

interface TourCardGridProps {
  tour: Tour;
}

export function TourCardGrid({ tour }: TourCardGridProps) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 shrink-0 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {tour.isVisa && (
            <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
              Vizesiz
            </span>
          )}
          {tour.isRecommended && (
            <span className="bg-amber-500 text-white text-xs px-2.5 py-1 rounded-lg font-medium shadow-sm">
              ★ Önerilen
            </span>
          )}
        </div>

        {/* Corner ribbon */}
        {tour.badge && (
          <div
            className="absolute top-0 right-0 text-white text-[10px] font-bold leading-tight text-center"
            style={{
              background: tour.badgeColor || "#E31E24",
              clipPath: "polygon(0 0, 100% 0, 100% 100%)",
              width: "68px",
              height: "68px",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "10px",
                right: "6px",
                transform: "rotate(45deg)",
                whiteSpace: "nowrap",
              }}
            >
              {tour.badge}
            </span>
          </div>
        )}

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>

        {/* Transport badge */}
        <div className="absolute bottom-3 left-3">
          <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg">
            {tour.transport === "bus" ? <Bus size={11} /> : <Plane size={11} />}
            {tour.transport === "bus" ? "Otobüs" : "Uçak"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title + Rating */}
        <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-[#0057A8] transition-colors mb-2 line-clamp-2">
          {tour.title}
        </h3>

        {tour.rating && (
          null
        )}

        {/* Meta chips */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-lg">
            <Clock size={10} className="text-[#0057A8]" />
            {tour.nightCount}G {tour.dayCount}G
          </span>
          {tour.countries > 0 && (
            <span className="flex items-center gap-1 text-xs text-gray-600 bg-green-50 px-2 py-1 rounded-lg">
              <MapPin size={10} className="text-green-600" />
              {tour.countries} ülke
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-gray-600 bg-orange-50 px-2 py-1 rounded-lg">
            <Calendar size={10} className="text-orange-500" />
            {tour.startDate}
          </span>
        </div>

        {/* Route */}
        <p className="text-xs text-[#0057A8] bg-blue-50 px-2.5 py-1.5 rounded-lg truncate mb-4">
          {tour.route}
        </p>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-3 border-t border-gray-100">
          <div>
            {tour.discount && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs line-through text-gray-400">
                  {tour.originalPrice} {tour.currency}
                </span>
                <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                  %{tour.discount}
                </span>
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-[#E31E24]">
                {tour.price.toLocaleString("tr-TR")}
              </span>
              <span className="font-semibold text-[#E31E24] text-sm">{tour.currency}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <Users size={9} />
              <span>kişi başı</span>
            </div>
          </div>
          <Link
            to={`/tur/${tour.id}`}
            className="flex items-center gap-1.5 bg-[#0057A8] hover:bg-[#E31E24] text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all shadow-md whitespace-nowrap"
          >
            İncele <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
