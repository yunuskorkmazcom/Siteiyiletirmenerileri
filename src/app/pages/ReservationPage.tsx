import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  Check, ChevronRight, ChevronDown, AlertTriangle,
  Users, Plane, Bus, Calendar, Clock, MapPin,
  CreditCard, Shield, ArrowLeft, Plus, Minus,
} from "lucide-react";
import { TOURS } from "../data/tours";
import { Breadcrumb } from "../components/Breadcrumb";

/* ─── Types ──────────────────────────────────────────── */
type Step = 1 | 2 | 3 | 4;

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  tcNo: string;
  address: string;
  smsConsent: boolean;
  differentBilling: boolean;
}

interface Guest {
  firstName: string;
  lastName: string;
  tcNo: string;
  birthDate: string;
  gender: string;
  isChild: boolean;
}

const CITIES = [
  "Adana","Ankara","Antalya","Bursa","Diyarbakır","Erzurum",
  "Eskişehir","Gaziantep","İstanbul","İzmir","Kayseri","Konya",
  "Malatya","Mersin","Samsun","Trabzon","Şanlıurfa",
];

const STEPS: { label: string; title: string }[] = [
  { label: "İletişim Bilgileri", title: "İletişim ve Fatura Bilgileri" },
  { label: "Konuklar", title: "Konuk Bilgileri" },
  { label: "Ekstra", title: "Ekstra Hizmetler" },
  { label: "Ödeme", title: "Ödeme" },
];

const EXTRAS = [
  { id: "insurance", label: "Seyahat Sigortası", price: 25, desc: "Tüm tur boyunca geçerli kapsamlı sigorta", icon: "🛡️" },
  { id: "transfer", label: "Havalimanı Transfer", price: 30, desc: "Gidiş-dönüş özel araç transferi", icon: "🚌" },
  { id: "guide", label: "Özel Rehber", price: 50, desc: "Konuşmanızı anlayan birebir rehber", icon: "🗺️" },
  { id: "meal", label: "Premium Yemek Paketi", price: 40, desc: "Ekstra restoran ve akşam yemekleri", icon: "🍽️" },
];

/* ─── Step indicator ─────────────────────────────────── */
function StepBar({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((s, i) => {
        const num = (i + 1) as Step;
        const done = num < current;
        const active = num === current;
        return (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                done
                  ? "bg-[#0057A8] border-[#0057A8] text-white"
                  : active
                  ? "bg-[#0dbac6] border-[#0dbac6] text-white"
                  : "bg-white border-gray-300 text-gray-400"
              }`}>
                {done ? <Check size={16} /> : num}
              </div>
              <span className={`text-xs mt-1.5 whitespace-nowrap font-medium ${active ? "text-[#0dbac6]" : done ? "text-[#0057A8]" : "text-gray-400"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 sm:w-24 h-0.5 mb-5 mx-1 transition-all ${num < current ? "bg-[#0057A8]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Sidebar ────────────────────────────────────────── */
function ReservationSidebar({
  tour, adults, selectedExtras,
}: {
  tour: ReturnType<typeof TOURS.find>;
  adults: number;
  selectedExtras: string[];
}) {
  if (!tour) return null;
  const extraTotal = EXTRAS.filter((e) => selectedExtras.includes(e.id)).reduce((s, e) => s + e.price * adults, 0);
  const tourTotal = tour.price * adults;
  const grandTotal = tourTotal + extraTotal;

  return (
    <div className="w-full lg:w-80 shrink-0">
      <div className="bg-[#eaf6f8] rounded-2xl border border-[#0dbac6]/30 overflow-hidden sticky top-[100px]">
        {/* Header */}
        <div className="bg-[#0dbac6]/10 border-b border-[#0dbac6]/20 px-5 py-4">
          <h3 className="font-bold text-gray-800">Rezervasyon Detayları</h3>
        </div>

        {/* Tour info */}
        <div className="p-5 border-b border-[#0dbac6]/20">
          <div className="flex gap-3 mb-4">
            <img src={tour.image} alt={tour.title} className="w-20 h-16 rounded-xl object-cover shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-snug">{tour.title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-400 mb-0.5">Hareket Tarihi</p>
              <p className="font-semibold text-gray-800">{tour.startDate}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-0.5">Tur Süresi</p>
              <p className="font-semibold text-gray-800 uppercase">{tour.nightCount} Gece {tour.dayCount} Gün</p>
            </div>
          </div>
        </div>

        {/* Tur detayları */}
        <div className="p-5 border-b border-[#0dbac6]/20">
          <p className="text-xs font-semibold text-[#0dbac6] uppercase tracking-wider mb-3">Tur Detayları</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 text-sm text-gray-700">
              <MapPin size={14} className="text-amber-500 shrink-0" />
              <span>{tour.departureCity || "İstanbul"}</span>
            </div>
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 text-sm text-gray-700">
              {tour.transport === "plane" ? <Plane size={14} className="text-green-500 shrink-0" /> : <Bus size={14} className="text-orange-500 shrink-0" />}
              <span>{tour.transportLabel || (tour.transport === "plane" ? "Uçaklı" : "Otobüslü")}</span>
            </div>
            {tour.isVisa && (
              <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 text-sm text-gray-700">
                <span className="text-base">🛂</span>
                <span>Vizesiz Tur</span>
              </div>
            )}
            <div className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 text-sm text-gray-700">
              <Users size={14} className="text-[#0057A8] shrink-0" />
              <span>Oda, {adults} Yetişkin</span>
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="px-5 py-3 bg-amber-50 border-b border-amber-100">
          <p className="text-xs font-semibold text-amber-700 text-center">⚡ Acele edin, fiyatlar yükseliyor!</p>
        </div>

        {/* Price breakdown */}
        <div className="p-5 space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>{adults} Yetişkin</span>
            <span className="font-medium"></span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tur Fiyatı</span>
            <span className="font-semibold">{tourTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} {tour.currency}</span>
          </div>
          {extraTotal > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Ekstra Hizmetler</span>
              <span className="font-semibold">+{extraTotal} {tour.currency}</span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t border-gray-200">
            <span className="font-bold text-gray-900">Toplam</span>
            <span className="font-bold text-[#E31E24] text-lg">{grandTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} {tour.currency}</span>
          </div>
          <p className="text-xs text-gray-400 text-center">Gösterilen fiyat kişi başı değil, toplam fiyattır.</p>
        </div>

        {/* Trust badges */}
        <div className="px-5 pb-5 flex items-center justify-center gap-4">
          <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
            <Shield size={18} className="text-emerald-500" />
            <span>Güvenli Ödeme</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
            <Check size={18} className="text-emerald-500" />
            <span>TÜRSAB Lisanslı</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs text-gray-400">
            <CreditCard size={18} className="text-emerald-500" />
            <span>SSL Şifreli</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────── */
export function ReservationPage() {
  const { tourId } = useParams<{ tourId: string }>();
  const tour = TOURS.find((t) => t.id === Number(tourId)) ?? TOURS[0];

  const [step, setStep] = useState<Step>(1);
  const [adults, setAdults] = useState(2);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const [contact, setContact] = useState<ContactForm>({
    firstName: "", lastName: "", email: "", phone: "",
    city: "", tcNo: "", address: "", smsConsent: false, differentBilling: false,
  });

  const [guests, setGuests] = useState<Guest[]>([
    { firstName: "", lastName: "", tcNo: "", birthDate: "", gender: "", isChild: false },
    { firstName: "", lastName: "", tcNo: "", birthDate: "", gender: "", isChild: false },
  ]);

  const [payMethod, setPayMethod] = useState<"full" | "deposit">("deposit");

  const updateGuest = (i: number, field: keyof Guest, val: string | boolean) => {
    setGuests((prev) => prev.map((g, idx) => idx === i ? { ...g, [field]: val } : g));
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) => prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]);
  };

  if (completed) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-emerald-500" />
          </div>
          <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: "1.5rem" }}>Rezervasyonunuz Alındı!</h2>
          <p className="text-sm text-gray-500 mb-2">
            Rezervasyon detayları <strong>{contact.email}</strong> adresinize gönderildi.
          </p>
          <p className="text-xs text-gray-400 mb-6">Rezervasyon No: <strong>TBL-{Math.floor(100000 + Math.random() * 900000)}</strong></p>
          <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mb-6 text-sm text-amber-700">
            Ön ödemeniz doğrulandıktan sonra biletleriniz kesinleştirilecektir.
          </div>
          <Link to="/" className="flex items-center justify-center gap-2 bg-[#0057A8] text-white font-semibold py-3 px-6 rounded-xl hover:bg-[#004489] transition-colors">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: "Tourbulance", href: "/" },
            { label: tour.title, href: `/tur/${tour.id}` },
            { label: "Rezervasyon" },
          ]} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page title */}
        <div className="text-center mb-6">
          <h1 className="text-gray-900" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>Rezervasyon</h1>
        </div>

        {/* Step bar */}
        <StepBar current={step} />

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ─── LEFT: Form ─── */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">

              {/* Section heading */}
              <h2 className="font-bold text-gray-900 mb-1" style={{ fontSize: "1.2rem" }}>Rezervasyon</h2>
              <p className="text-sm text-[#0057A8] font-semibold mb-6">{STEPS[step - 1].title}</p>

              {/* ── STEP 1: İletişim ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Ad */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Ad Soyad (*)</label>
                      <input
                        value={contact.firstName}
                        onChange={(e) => setContact({ ...contact, firstName: e.target.value })}
                        placeholder="Ad Soyad"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] transition-colors"
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">E-posta (*)</label>
                      <input
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        placeholder="E-posta"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] transition-colors"
                      />
                    </div>
                    {/* Gsm */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gsm (*)</label>
                      <div className="flex gap-2">
                        <div className="flex items-center gap-1 border border-gray-300 rounded-lg px-2 py-2.5 text-sm text-gray-500 shrink-0">
                          <span className="text-base">🇹🇷</span>
                          <ChevronDown size={12} />
                          <span>+90</span>
                        </div>
                        <input
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                          placeholder="Telefon"
                          className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Şehir */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Şehir (*)</label>
                      <select
                        value={contact.city}
                        onChange={(e) => setContact({ ...contact, city: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] appearance-none bg-white"
                      >
                        <option value="">Seçiniz</option>
                        {CITIES.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    {/* TC Kimlik */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Tc Kimlik No (*)</label>
                      <input
                        value={contact.tcNo}
                        onChange={(e) => setContact({ ...contact, tcNo: e.target.value })}
                        placeholder="Tc Kimlik No"
                        maxLength={11}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Adres */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Adres</label>
                    <textarea
                      rows={3}
                      value={contact.address}
                      onChange={(e) => setContact({ ...contact, address: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-[#0dbac6] transition-colors resize-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3 pt-2">
                    {[
                      { key: "smsConsent", label: "Fırsatlar ve indimler ile ilgili SMS ve e-posta gönderilmesini istiyorum." },
                      { key: "differentBilling", label: "Fatura bilgilerim yukarıdakilerden farklı." },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-start gap-2.5 cursor-pointer group">
                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          contact[key as keyof ContactForm]
                            ? "border-[#0057A8] bg-[#0057A8]"
                            : "border-gray-300 group-hover:border-[#0057A8]"
                        }`}
                          onClick={() => setContact({ ...contact, [key]: !contact[key as keyof ContactForm] })}
                        >
                          {contact[key as keyof ContactForm] && <Check size={10} className="text-white" />}
                        </div>
                        <span className="text-sm text-gray-600">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── STEP 2: Konuklar ── */}
              {step === 2 && (
                <div className="space-y-6">
                  {/* Kişi sayısı */}
                  <div className="flex items-center justify-between bg-blue-50 rounded-xl px-5 py-4">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Yetişkin Sayısı</p>
                      <p className="text-xs text-gray-400">12 yaş ve üzeri kişi</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { if (adults > 1) { setAdults(adults - 1); setGuests((g) => g.slice(0, adults - 1)); } }}
                        className="w-8 h-8 rounded-full border-2 border-[#0057A8] text-[#0057A8] flex items-center justify-center hover:bg-[#0057A8] hover:text-white transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-gray-900 w-6 text-center">{adults}</span>
                      <button
                        onClick={() => {
                          if (adults < 6) {
                            setAdults(adults + 1);
                            setGuests((g) => [...g, { firstName: "", lastName: "", tcNo: "", birthDate: "", gender: "", isChild: false }]);
                          }
                        }}
                        className="w-8 h-8 rounded-full border-2 border-[#0057A8] text-[#0057A8] flex items-center justify-center hover:bg-[#0057A8] hover:text-white transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {guests.slice(0, adults).map((g, i) => (
                    <div key={i} className="border border-gray-200 rounded-xl p-5">
                      <p className="font-semibold text-gray-800 text-sm mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#0057A8] text-white text-xs flex items-center justify-center shrink-0">{i + 1}</span>
                        {i + 1}. Yolcu
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Ad (*)</label>
                          <input
                            value={g.firstName}
                            onChange={(e) => updateGuest(i, "firstName", e.target.value)}
                            placeholder="Ad"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0dbac6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Soyad (*)</label>
                          <input
                            value={g.lastName}
                            onChange={(e) => updateGuest(i, "lastName", e.target.value)}
                            placeholder="Soyad"
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0dbac6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">TC Kimlik No (*)</label>
                          <input
                            value={g.tcNo}
                            onChange={(e) => updateGuest(i, "tcNo", e.target.value)}
                            placeholder="11 haneli TC No"
                            maxLength={11}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0dbac6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Doğum Tarihi (*)</label>
                          <input
                            type="date"
                            value={g.birthDate}
                            onChange={(e) => updateGuest(i, "birthDate", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0dbac6]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Cinsiyet (*)</label>
                          <select
                            value={g.gender}
                            onChange={(e) => updateGuest(i, "gender", e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0dbac6] bg-white appearance-none"
                          >
                            <option value="">Seçiniz</option>
                            <option value="E">Erkek</option>
                            <option value="K">Kadın</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── STEP 3: Ekstra ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-sm text-gray-500 mb-4">Turunuzu daha keyifli hale getirecek ek hizmetleri seçebilirsiniz.</p>
                  {EXTRAS.map((extra) => {
                    const selected = selectedExtras.includes(extra.id);
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra.id)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selected ? "border-[#0057A8] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl shrink-0">{extra.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 text-sm">{extra.label}</p>
                          <p className="text-xs text-gray-500">{extra.desc}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-[#0057A8]">+{extra.price} €</p>
                          <p className="text-xs text-gray-400">kişi başı</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                          selected ? "border-[#0057A8] bg-[#0057A8]" : "border-gray-300"
                        }`}>
                          {selected && <Check size={12} className="text-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── STEP 4: Ödeme ── */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Ödeme yöntemi */}
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">Ödeme Seçeneği</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: "deposit", label: "Ön Ödeme", desc: `200 € depozito öde, kalanı tura 33 gün kala`, badge: "Önerilen" },
                        { key: "full", label: "Tam Ödeme", desc: "Tüm tutarı şimdi öde", badge: null },
                      ].map((opt) => (
                        <div
                          key={opt.key}
                          onClick={() => setPayMethod(opt.key as "full" | "deposit")}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            payMethod === opt.key ? "border-[#0057A8] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-semibold text-gray-900 text-sm">{opt.label}</p>
                            {opt.badge && (
                              <span className="text-[10px] bg-[#0057A8] text-white px-2 py-0.5 rounded-full">{opt.badge}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500">{opt.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kart bilgileri */}
                  <div className="border border-gray-200 rounded-xl p-5 space-y-4">
                    <p className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                      <CreditCard size={16} className="text-[#0057A8]" /> Kart Bilgileri
                    </p>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kart Numarası</label>
                      <input
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0057A8]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Son Kullanma Tarihi</label>
                        <input placeholder="AA / YY" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0057A8]" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">CVV</label>
                        <input placeholder="•••" maxLength={3} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0057A8]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-1.5">Kart Üzerindeki İsim</label>
                      <input placeholder="AD SOYAD" className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#0057A8] uppercase" />
                    </div>
                  </div>

                  {/* BDDK uyarısı */}
                  <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <AlertTriangle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      BDDK kararı uyarınca yurt dışı turlarında kredi kartına taksitli işlem yapılamamaktadır.
                    </p>
                  </div>

                  {/* SSL badge */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 justify-center">
                    <Shield size={14} className="text-emerald-500" />
                    <span>256-bit SSL ile şifrelenmiş güvenli ödeme</span>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => step > 1 ? setStep((s) => (s - 1) as Step) : undefined}
                  className={`flex items-center gap-2 text-sm font-medium transition-all ${
                    step === 1 ? "invisible" : "text-gray-500 hover:text-[#0057A8]"
                  }`}
                >
                  <ArrowLeft size={16} /> Geri
                </button>
                <button
                  onClick={() => {
                    if (step < 4) setStep((s) => (s + 1) as Step);
                    else setCompleted(true);
                  }}
                  className="flex items-center gap-2 bg-[#0057A8] hover:bg-[#004489] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md shadow-blue-200"
                >
                  {step < 4 ? (
                    <>Devam Et <ChevronRight size={16} /></>
                  ) : (
                    <>Rezervasyonu Tamamla <Check size={16} /></>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: Sidebar ─── */}
          <ReservationSidebar tour={tour} adults={adults} selectedExtras={selectedExtras} />
        </div>
      </div>
    </div>
  );
}
