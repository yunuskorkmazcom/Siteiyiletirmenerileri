import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginModal() {
  const { isLoginOpen, closeModals, openRegister, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  if (!isLoginOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Lütfen tüm alanları doldurun."); return; }
    const ok = login(email, password);
    if (!ok) setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModals} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-[#3d6b8f] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-bold tracking-widest text-sm uppercase">Giriş Yap</h2>
          <button
            onClick={closeModals}
            className="text-white/80 hover:text-white transition-colors w-7 h-7 flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          {/* Eposta */}
          <div className="bg-gray-100 rounded-lg px-4 py-3">
            <input
              type="email"
              placeholder="Eposta"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
          </div>

          {/* Parola */}
          <div className="bg-gray-100 rounded-lg px-4 py-3 flex items-center gap-2">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Parola"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-500"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="text-gray-400 hover:text-gray-600 shrink-0">
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Beni Hatırla */}
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-colors
                ${remember ? "bg-[#3d6b8f] border-[#3d6b8f]" : "border-gray-400"}`}
              onClick={() => setRemember(!remember)}
            >
              {remember && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span className="text-sm text-gray-700">Beni hatırla.</span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#3d6b8f] hover:bg-[#2d5a7a] text-white font-bold py-3.5 rounded-lg tracking-widest text-sm transition-colors"
          >
            GİRİŞ YAP
          </button>

          {/* Alt Linkler */}
          <div className="flex items-center justify-center gap-1 text-sm text-gray-500 flex-wrap pt-1">
            <span>Şifremi unuttum</span>
            <button type="button" className="text-[#3d6b8f] font-semibold hover:underline">Şifre Hatırlat</button>
            <span className="mx-1 text-gray-300">|</span>
            <span>Bir hesabınız yok mu</span>
            <button
              type="button"
              className="text-[#3d6b8f] font-semibold hover:underline"
              onClick={openRegister}
            >
              Kayıt Ol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
