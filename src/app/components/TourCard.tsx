import { useState } from "react";
import { Link } from "react-router";
import {
  Heart,
  Calendar,
  Clock,
  Bus,
  MapPin,
  ArrowRight,
  Star,
  Users,
  GitCompare,
  ChevronDown,
  ChevronUp,
  Plane,
} from "lucide-react";
import type { Tour } from "../data/tours";

export type { Tour };

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const [liked, setLiked] = useState(false);
  const [showDates, setShowDates] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="relative md:w-64 shrink-0">
          <div className="h-52 md:h-full overflow-hidden">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Overlay Badges */}
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

          {/* Corner Badge */}
          {tour.badge && (
            <div
              className="absolute top-0 right-0 text-white text-[10px] font-bold leading-tight text-center"
              style={{
                background: tour.badgeColor || "#E31E24",
                clipPath: "polygon(0 0, 100% 0, 100% 100%)",
                width: "72px",
                height: "72px",
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

          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              size={15}
              className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-[#0057A8] transition-colors">
                {tour.title}
              </h3>
              {tour.rating && (
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      null
                    ))}
                  </div>
                  
                </div>
              )}
            </div>
          </div>

          {/* Tour Details Grid */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Calendar size={13} className="text-[#0057A8]" />
              <span>{tour.startDate}</span>
            </div>

            <span className="text-gray-300">|</span>

            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock size={13} className="text-[#0057A8]" />
              <span>{tour.nightCount}G {tour.dayCount}G</span>
            </div>

            {tour.countries > 0 && (
              <>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <MapPin size={13} className="text-green-600" />
                  <span>{tour.countries} Ülke, {tour.cities} Şehir</span>
                </div>
              </>
            )}

            <span className="text-gray-300">|</span>

            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              {tour.transport === "bus" ? (
                <Bus size={13} className="text-orange-500" />
              ) : (
                <Plane size={13} className="text-orange-500" />
              )}
              <span>{tour.transport === "bus" ? "Otobus" : "Uçak"}</span>
            </div>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-xs text-[#0057A8] bg-blue-50 px-3 py-2 rounded-lg mb-4">
            <MapPin size={11} className="shrink-0" />
            <span className="truncate">{tour.route}</span>
          </div>

          {/* Alt Dates */}
          {tour.altDates && tour.altDates.length > 0 && (
            <div className="mb-3">
              <button
                onClick={() => setShowDates(!showDates)}
                className="flex items-center gap-1.5 text-xs text-[#E31E24] hover:text-[#BE1920] transition-colors"
              >
                <Calendar size={11} />
                <span>Diğer Tarihleri Gör</span>
                {showDates ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
              </button>
              {showDates && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {tour.altDates.map((date) => (
                    <span
                      key={date}
                      className="text-xs border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600 hover:border-[#0057A8] hover:text-[#0057A8] cursor-pointer transition-colors"
                    >
                      {date}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bottom: Price + Actions */}
          <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100">
            <div>
              {tour.discount && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs line-through text-gray-400">
                    {tour.originalPrice} {tour.currency}
                  </span>
                  <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-medium">
                    %{tour.discount} İndirim
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-[#E31E24]">
                  {tour.price.toLocaleString("tr-TR")}
                </span>
                <span className="text-base font-semibold text-[#E31E24]">
                  {tour.currency}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {tour.priceInTL.toLocaleString("tr-TR")} TL
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                <Users size={10} />
                <span>kişi başı fiyat</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-end">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#0057A8] border border-gray-200 hover:border-[#0057A8] px-3 py-1.5 rounded-lg transition-all">
                <GitCompare size={12} />
                <span>Karşılaştır</span>
              </button>
              <Link
                to={`/tur/${tour.id}`}
                className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-md shadow-blue-200 hover:shadow-blue-300"
              >
                <span>Turu İncele</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}