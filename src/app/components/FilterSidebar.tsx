import { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = true }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0">
      <button
        className="flex items-center justify-between w-full py-1 mb-3 group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-semibold text-gray-800 group-hover:text-[#0057A8] transition-colors">
          {title}
        </span>
        {open ? (
          <ChevronUp size={15} className="text-gray-400" />
        ) : (
          <ChevronDown size={15} className="text-gray-400" />
        )}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

interface CheckOption {
  label: string;
  count: number;
}

interface FilterSidebarProps {
  onFilterChange?: (filters: Record<string, unknown>) => void;
}

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(999);
  const [selectedDepartures, setSelectedDepartures] = useState<string[]>([]);
  const [selectedVisa, setSelectedVisa] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);

  const toggleFilter = (
    value: string,
    current: string[],
    setter: (v: string[]) => void
  ) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const activeCount =
    selectedDepartures.length +
    selectedVisa.length +
    selectedTypes.length +
    selectedDuration.length;

  const clearAll = () => {
    setSelectedDepartures([]);
    setSelectedVisa([]);
    setSelectedTypes([]);
    setSelectedDuration([]);
    setPriceMin(0);
    setPriceMax(999);
  };

  const departureOptions: CheckOption[] = [
    { label: "İstanbul Çıkışlı", count: 2 },
    { label: "Sabiha Gökçen Çıkışlı", count: 3 },
    { label: "Ankara Çıkışlı", count: 1 },
    { label: "İzmir Çıkışlı", count: 2 },
  ];

  const visaOptions: CheckOption[] = [
    { label: "Vizesiz", count: 4 },
    { label: "Vizeli", count: 2 },
  ];

  const typeOptions: CheckOption[] = [
    { label: "Önerilen Turlar", count: 3 },
    { label: "Kesin Kalkışlı Turlar", count: 2 },
    { label: "Son Dakika", count: 1 },
  ];

  const durationOptions: CheckOption[] = [
    { label: "1-3 Gece", count: 2 },
    { label: "4-7 Gece", count: 5 },
    { label: "8-14 Gece", count: 3 },
    { label: "15+ Gece", count: 1 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0057A8] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <SlidersHorizontal size={16} />
          <span className="font-semibold text-sm">Sonuçları Filtrele</span>
        </div>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-white/70 hover:text-white text-xs transition-colors"
          >
            <X size={12} />
            Temizle ({activeCount})
          </button>
        )}
      </div>

      <div className="p-5">
        {/* Price Range */}
        <FilterSection title="Fiyat Aralığı">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₺</span>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg py-2 pl-6 pr-2 text-sm focus:outline-none focus:border-[#0057A8] transition-colors"
                  placeholder="Min"
                />
              </div>
              <span className="text-gray-300 text-sm">—</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">₺</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-lg py-2 pl-6 pr-2 text-sm focus:outline-none focus:border-[#0057A8] transition-colors"
                  placeholder="Max"
                />
              </div>
            </div>
            
            
          </div>
        </FilterSection>

        {/* Tur Tipi */}
        <FilterSection title="Tur Tipi">
          <div className="space-y-2">
            {typeOptions.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                    selectedTypes.includes(opt.label)
                      ? "bg-[#0057A8] border-[#0057A8]"
                      : "border-gray-300 group-hover:border-[#0057A8]"
                  }`}
                  onClick={() => toggleFilter(opt.label, selectedTypes, setSelectedTypes)}
                >
                  {selectedTypes.includes(opt.label) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-sm text-gray-600 group-hover:text-gray-800 flex-1"
                  onClick={() => toggleFilter(opt.label, selectedTypes, setSelectedTypes)}
                >
                  {opt.label}
                </span>
                
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Kalkış Yerleri */}
        <FilterSection title="Kalkış Yeri">
          <div className="space-y-2">
            {departureOptions.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                    selectedDepartures.includes(opt.label)
                      ? "bg-[#0057A8] border-[#0057A8]"
                      : "border-gray-300 group-hover:border-[#0057A8]"
                  }`}
                  onClick={() => toggleFilter(opt.label, selectedDepartures, setSelectedDepartures)}
                >
                  {selectedDepartures.includes(opt.label) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-sm text-gray-600 group-hover:text-gray-800 flex-1"
                  onClick={() => toggleFilter(opt.label, selectedDepartures, setSelectedDepartures)}
                >
                  {opt.label}
                </span>
                
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Süre */}
        <FilterSection title="Tur Süresi">
          <div className="space-y-2">
            {durationOptions.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                    selectedDuration.includes(opt.label)
                      ? "bg-[#0057A8] border-[#0057A8]"
                      : "border-gray-300 group-hover:border-[#0057A8]"
                  }`}
                  onClick={() => toggleFilter(opt.label, selectedDuration, setSelectedDuration)}
                >
                  {selectedDuration.includes(opt.label) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-sm text-gray-600 group-hover:text-gray-800 flex-1"
                  onClick={() => toggleFilter(opt.label, selectedDuration, setSelectedDuration)}
                >
                  {opt.label}
                </span>
                
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Vize */}
        <FilterSection title="Vize Durumu">
          <div className="space-y-2">
            {visaOptions.map((opt) => (
              <label
                key={opt.label}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all shrink-0 ${
                    selectedVisa.includes(opt.label)
                      ? "bg-[#0057A8] border-[#0057A8]"
                      : "border-gray-300 group-hover:border-[#0057A8]"
                  }`}
                  onClick={() => toggleFilter(opt.label, selectedVisa, setSelectedVisa)}
                >
                  {selectedVisa.includes(opt.label) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span
                  className="text-sm text-gray-600 group-hover:text-gray-800 flex-1"
                  onClick={() => toggleFilter(opt.label, selectedVisa, setSelectedVisa)}
                >
                  {opt.label}
                </span>
                
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Apply Button */}
        <button className="w-full bg-[#E31E24] hover:bg-[#BE1920] text-white py-3 rounded-xl text-sm font-medium transition-all shadow-md shadow-red-200 hover:shadow-red-300">
          Filtrele
        </button>
      </div>
    </div>
  );
}
