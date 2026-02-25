import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare, Headphones } from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";

const OFFICES = [
  {
    city: "İstanbul — Merkez",
    address: "Bağcılar Mah. Atatürk Cad. No: 42 Kat: 3, Bağcılar / İstanbul",
    phone: "0850 XXX XX XX",
    email: "istanbul@tourbulance.com",
    hours: "Hafta içi 09:00–18:00, Cumartesi 10:00–15:00",
  },
  {
    city: "Ankara — Şube",
    address: "Kızılay Mah. Atatürk Bulvarı No: 115 Çankaya / Ankara",
    phone: "0312 XXX XX XX",
    email: "ankara@tourbulance.com",
    hours: "Hafta içi 09:00–18:00",
  },
];

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0057A8] to-[#003d7a] py-14 px-4 text-center">
        <p className="text-white/60 text-sm uppercase tracking-widest mb-2">Bize Ulaşın</p>
        <h1 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)" }}>İletişim</h1>
        <p className="text-white/70 max-w-md mx-auto text-sm">
          Tur rezervasyonu, özel paket talebi veya her türlü sorunuz için buradayız.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: "Tourbulance", href: "/" }, { label: "İletişim" }]} />

        {/* Quick contact chips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-10">
          {[
            { icon: Phone, label: "Telefon", value: "0850 XXX XX XX", sub: "7/24 Müşteri Hattı", color: "blue" },
            { icon: Mail, label: "E-posta", value: "info@tourbulance.com", sub: "24 saat içinde yanıt", color: "red" },
            { icon: MessageSquare, label: "WhatsApp", value: "0530 XXX XX XX", sub: "Anında yanıt", color: "green" },
          ].map(({ icon: Icon, label, value, sub, color }) => (
            <div
              key={label}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer`}
            >
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                color === "blue" ? "bg-blue-50" : color === "red" ? "bg-red-50" : "bg-green-50"
              }`}>
                <Icon size={20} className={
                  color === "blue" ? "text-[#0057A8]" : color === "red" ? "text-[#E31E24]" : "text-green-600"
                } />
              </span>
              <div>
                <p className="text-xs text-gray-400 font-medium">{label}</p>
                <p className="font-semibold text-gray-900 text-sm">{value}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Send size={16} className="text-[#0057A8]" />
              </span>
              <div>
                <h2 className="text-gray-900" style={{ fontWeight: 700, fontSize: "1.2rem" }}>Mesaj Gönderin</h2>
                <p className="text-xs text-gray-400">En geç 24 saat içinde geri dönüş yapılır.</p>
              </div>
            </div>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Mesajınız Alındı!</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  En geç 24 saat içinde <strong>{form.email}</strong> adresinize yanıt vereceğiz.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                  className="mt-6 text-sm text-[#0057A8] hover:underline"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ad Soyad *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Ad Soyad"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0057A8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">E-posta *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="ornek@mail.com"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0057A8] transition-colors"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Telefon</label>
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="05XX XXX XX XX"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0057A8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Konu *</label>
                    <select
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:border-[#0057A8] transition-colors appearance-none bg-white"
                    >
                      <option value="">Konu seçin</option>
                      <option>Tur Rezervasyonu</option>
                      <option>Özel Tur Talebi</option>
                      <option>Fiyat Bilgisi</option>
                      <option>Şikayet / Öneri</option>
                      <option>Diğer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Mesajınız *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Mesajınızı buraya yazın..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#0057A8] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#0057A8] hover:bg-[#004489] disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md shadow-blue-200"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar: offices + hours */}
          <div className="space-y-5">
            {/* Working hours */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-amber-500" />
                </span>
                <h3 className="font-semibold text-gray-800">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Pazartesi – Cuma", hours: "09:00 – 18:00" },
                  { day: "Cumartesi", hours: "10:00 – 15:00" },
                  { day: "Pazar", hours: "Kapalı" },
                ].map(({ day, hours }) => (
                  <div key={day} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-gray-600">{day}</span>
                    <span className={`font-semibold ${hours === "Kapalı" ? "text-red-400" : "text-[#0057A8]"}`}>{hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-blue-50 rounded-xl p-3 flex items-start gap-2">
                <Headphones size={14} className="text-[#0057A8] shrink-0 mt-0.5" />
                <p className="text-xs text-[#0057A8]">Acil durumlar için 7/24 WhatsApp hattımız aktiftir.</p>
              </div>
            </div>

            {/* Offices */}
            {OFFICES.map((o) => (
              <div key={o.city} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin size={15} className="text-[#E31E24]" /> {o.city}
                </h3>
                <div className="space-y-2.5 text-sm text-gray-600">
                  <p className="flex items-start gap-2"><MapPin size={13} className="shrink-0 mt-0.5 text-gray-400" />{o.address}</p>
                  <p className="flex items-center gap-2"><Phone size={13} className="text-gray-400" />{o.phone}</p>
                  <p className="flex items-center gap-2"><Mail size={13} className="text-gray-400" />{o.email}</p>
                  <p className="flex items-start gap-2"><Clock size={13} className="shrink-0 mt-0.5 text-gray-400" />{o.hours}</p>
                </div>
              </div>
            ))}

            {/* TÜRSAB */}
            <div className="bg-gradient-to-br from-[#0057A8] to-[#003d7a] rounded-2xl p-6 text-white">
              <p className="font-bold mb-1">TÜRSAB Üyesiyiz</p>
              <p className="text-white/70 text-xs mb-3">Seyahat acentenizin güvenilirliğini belge numarasıyla teyit edebilirsiniz.</p>
              <div className="bg-white/10 rounded-xl px-4 py-2.5 text-sm font-semibold">
                TÜRSAB Belge No: XXXX
              </div>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        
      </div>
    </div>
  );
}
