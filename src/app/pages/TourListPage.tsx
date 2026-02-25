import { SearchBar } from "../components/SearchBar";
import { FilterSidebar } from "../components/FilterSidebar";
import { TourList } from "../components/TourList";
import { Breadcrumb } from "../components/Breadcrumb";
import { ShieldCheck, Clock, Headphones, Star } from "lucide-react";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Güvenli Ödeme", sub: "256-bit SSL şifreleme" },
  { icon: Clock, label: "En İyi Fiyat", sub: "Fiyat farkını iade ederiz" },
  { icon: Headphones, label: "7/24 Destek", sub: "Her zaman yanınızdayız" },
  { icon: Star, label: "10.000+ Mutlu Müşteri", sub: "4.8 ortalama puan" },
];

export function TourListPage() {
  return (
    <>
      <SearchBar />

      {/* Trust Badges */}
      <div className="bg-white border-b border-gray-100 py-3 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-3 py-1">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#0057A8]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{badge.label}</p>
                    <p className="text-[11px] text-gray-400">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Breadcrumb
          items={[
            { label: "Turlar", href: "#" },
            { label: "Avrupa Turları" },
          ]}
        />

        <div className="flex gap-6 mt-5">
          <aside className="w-64 shrink-0 hidden lg:block self-start sticky top-20">
            <FilterSidebar />
          </aside>
          <TourList />
        </div>
      </main>
    </>
  );
}
