import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function RegisterModal() {
  const { isRegisterOpen, closeModals, openLogin, register } = useAuth();

  const [form, setForm] = useState({
    adSoyad: "",
    email: "",
    telefon: "",
    password: "",
    passwordConfirm: "",
    kvkk: false,
  });
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [error, setError] = useState("");

  if (!isRegisterOpen) return null;

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.adSoyad || !form.email || !form.telefon || !form.password || !form.passwordConfirm) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (form.password.length < 6) {
      setError("Şifre en az 6 karakter olmalıdır.");
      return;
    }
    register({
      adSoyad: form.adSoyad,
      email: form.email,
      telefon: form.telefon,
      password: form.password,
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModals} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#3d6b8f] px-6 py-4 flex items-center justify-between shrink-0">
          <h2 className="text-white font-bold tracking-widest text-sm uppercase">Kayıt Ol</h2>
          <button
            onClick={closeModals}
            className="text-white/80 hover:text-white transition-colors w-7 h-7 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-3 overflow-y-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          {/* Ad Soyad */}
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <input
              type="text"
              placeholder="Ad Soyad"
              value={form.adSoyad}
              onChange={(e) => { set("adSoyad", e.target.value); setError(""); }}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
          </div>

          {/* Email */}
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <input
              type="email"
              placeholder="Eposta"
              value={form.email}
              onChange={(e) => { set("email", e.target.value); setError(""); }}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
          </div>

          {/* Telefon */}
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <input
              type="tel"
              placeholder="Telefon"
              value={form.telefon}
              onChange={(e) => { set("telefon", e.target.value); setError(""); }}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
          </div>

          {/* Şifre */}
          <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Şifre"
              value={form.password}
              onChange={(e) => { set("password", e.target.value); setError(""); }}
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 shrink-0">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Şifre Tekrar */}
          <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2">
            <input
              type={showPass2 ? "text" : "password"}
              placeholder="Şifre Tekrar"
              value={form.passwordConfirm}
              onChange={(e) => { set("passwordConfirm", e.target.value); setError(""); }}
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
            <button type="button" onClick={() => setShowPass2(!showPass2)} className="text-gray-400 hover:text-gray-600 shrink-0">
              {showPass2 ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* KVKK Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer pt-1">
            <div
              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors shrink-0 mt-0.5
                ${form.kvkk ? "bg-[#3d6b8f] border-[#3d6b8f]" : "border-gray-400"}`}
              onClick={() => set("kvkk", !form.kvkk)}
            >
              {form.kvkk && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="text-sm text-gray-700 leading-snug">
              Kampanyalardan haberdar olmak için{" "}
              <button type="button" className="text-[#3d6b8f] font-semibold hover:underline">Kvkk Metni</button>
              {" "}kapsamında eposta almak istiyorum.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3d6b8f] hover:bg-[#2d5a7a] text-white font-bold py-3.5 rounded-lg tracking-widest text-sm transition-colors"
          >
            KAYIT OL
          </button>

          {/* Alt Link */}
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 pt-1">
            <span>Bir hesabınız mı var?</span>
            <button
              type="button"
              className="text-[#3d6b8f] font-semibold hover:underline"
              onClick={openLogin}
            >
              Giriş Yap
            </button>
          </div>

          {/* KVKK Notu */}
          <p className="text-xs text-gray-500 leading-relaxed pb-2">
            Kişisel verileriniz,{" "}
            <button type="button" className="text-[#3d6b8f] hover:underline">Kvkk Metni</button>
            {" "}kapsamında işlenmektedir. "Kayıt Ol" butonuna basarak{" "}
            <strong>Üyelik Sözleşmesi</strong>'ni okuduğunuzu ve kabul ettiğinizi onaylıyorsunuz.
          </p>
        </form>
      </div>
    </div>
  );
}
