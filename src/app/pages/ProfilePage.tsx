import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Heart, Calendar, LogOut, Trash2, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type Tab = "profil" | "rezervasyonlar" | "favoriler";

export function ProfilePage() {
  const { user, favorites, reservations, logout, updateUser, removeFavorite } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("profil");
  const [saved, setSaved] = useState(false);

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <User size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#0057A8] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#004489] transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({ ...user });
  const setF = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const turFavorites = favorites.filter((f) => f.type === "tur");
  const otelFavorites = favorites.filter((f) => f.type === "otel");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Bar */}
      <div className="bg-[#2d3748] shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center">
            <button
              onClick={() => setActiveTab("profil")}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "profil"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-200"
              }`}
            >
              <User size={15} />
              Profil
            </button>
            <button
              onClick={() => setActiveTab("rezervasyonlar")}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "rezervasyonlar"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-200"
              }`}
            >
              <Calendar size={15} />
              Rezervasyonlarım
            </button>
            <button
              onClick={() => setActiveTab("favoriler")}
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === "favoriler"
                  ? "text-white border-white"
                  : "text-gray-400 border-transparent hover:text-gray-200"
              }`}
            >
              <Heart size={15} />
              Favorilerim
            </button>

            {/* Spacer */}
            <div className="flex-1" />

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors border-b-2 border-transparent"
            >
              <LogOut size={15} />
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ── PROFİL ── */}
        {activeTab === "profil" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {saved && (
              <div className="bg-green-50 border-b border-green-200 px-6 py-3 flex items-center gap-2 text-green-700 text-sm">
                <CheckCircle2 size={16} />
                Bilgileriniz başarıyla güncellendi.
              </div>
            )}
            <form onSubmit={handleSave}>
              {/* Temel Bilgiler */}
              <div className="p-8 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormRow label="Ad Soyad">
                    <input
                      type="text"
                      value={form.adSoyad}
                      onChange={(e) => setF("adSoyad", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Telefon">
                    <input
                      type="tel"
                      value={form.telefon}
                      onChange={(e) => setF("telefon", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Doğum Tarihi">
                    <input
                      type="text"
                      value={form.dogumTarihi}
                      onChange={(e) => setF("dogumTarihi", e.target.value)}
                      placeholder="0000-00-00"
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Cinsiyet">
                    <select
                      value={form.cinsiyet}
                      onChange={(e) => setF("cinsiyet", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8] bg-white"
                    >
                      <option>Bay</option>
                      <option>Bayan</option>
                    </select>
                  </FormRow>
                  <FormRow label="Üyelik Tipi">
                    <div className="flex items-center gap-5 py-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="uyelik"
                          checked={form.uyelikTipi === "bireysel"}
                          onChange={() => setF("uyelikTipi", "bireysel")}
                          className="accent-[#0057A8]"
                        />
                        <span className="text-sm text-gray-700">Bireysel</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="uyelik"
                          checked={form.uyelikTipi === "kurumsal"}
                          onChange={() => setF("uyelikTipi", "kurumsal")}
                          className="accent-[#0057A8]"
                        />
                        <span className="text-sm text-gray-700">Kurumsal</span>
                      </label>
                    </div>
                  </FormRow>
                </div>
              </div>

              {/* Kurumsal / Ek Bilgiler */}
              <div className="p-8 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormRow label="Adres">
                    <input
                      type="text"
                      value={form.adres}
                      onChange={(e) => setF("adres", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Ünvan">
                    <input
                      type="text"
                      value={form.unvan}
                      onChange={(e) => setF("unvan", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Vergi Dairesi">
                    <input
                      type="text"
                      value={form.vergiDairesi}
                      onChange={(e) => setF("vergiDairesi", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                  <FormRow label="Vergi No">
                    <input
                      type="text"
                      value={form.vergiNo}
                      onChange={(e) => setF("vergiNo", e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full outline-none focus:border-[#0057A8]"
                    />
                  </FormRow>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.bildirimOnay}
                    onChange={(e) => setF("bildirimOnay", e.target.checked)}
                    className="accent-[#0057A8] w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Bildirim almayı onaylıyorum</span>
                </label>
                <button
                  type="submit"
                  className="bg-[#0057A8] hover:bg-[#004489] text-white font-semibold px-8 py-2.5 rounded-lg text-sm transition-colors"
                >
                  Bilgilerimi Güncelle
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── REZERVASYONLARIM ── */}
        {activeTab === "rezervasyonlar" && (
          <div className="space-y-4">
            <div className="bg-[#2d3748] text-white px-5 py-3 rounded-t-xl text-sm font-semibold">
              Rezervasyonlarım
            </div>
            {reservations.length === 0 ? (
              <div className="bg-white rounded-b-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">
                Henüz rezervasyonunuz bulunmamaktadır.
              </div>
            ) : (
              <div className="bg-white rounded-b-xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left px-5 py-3 text-gray-600 font-semibold">Rezervasyon</th>
                      <th className="text-left px-5 py-3 text-gray-600 font-semibold">Tarih</th>
                      <th className="text-left px-5 py-3 text-gray-600 font-semibold">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((r) => (
                      <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4 text-gray-800 font-medium">{r.name}</td>
                        <td className="px-5 py-4 text-gray-500 flex items-center gap-1.5">
                          <Clock size={13} />
                          {r.tarih}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full
                            ${r.durum === "Onaylandı" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                            {r.durum === "Onaylandı" && <CheckCircle2 size={11} />}
                            {r.durum}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── FAVORİLERİM ── */}
        {activeTab === "favoriler" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Turlar */}
            <div>
              <div className="bg-[#2d3748] text-white px-5 py-3 rounded-t-xl">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Turlar</span>
                  <div className="flex gap-12 text-xs text-gray-400">
                    <span>Tarih</span>
                    <span>Sil</span>
                  </div>
                </div>
              </div>
              {turFavorites.length === 0 ? (
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-8 text-center text-gray-400 text-sm">
                  Favori turunuz bulunmamaktadır.
                </div>
              ) : (
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
                  {turFavorites.map((f) => (
                    <div key={f.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                      <span className="text-sm text-gray-800 flex-1 pr-4">{f.name}</span>
                      <span className="text-xs text-gray-400 w-24 text-center">{f.tarih}</span>
                      <button
                        onClick={() => removeFavorite(f.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors w-8 flex justify-center"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Oteller */}
            <div>
              <div className="bg-[#2d3748] text-white px-5 py-3 rounded-t-xl">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>Oteller</span>
                  <div className="flex gap-12 text-xs text-gray-400">
                    <span>Tarih</span>
                    <span>Sil</span>
                  </div>
                </div>
              </div>
              {otelFavorites.length === 0 ? (
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl p-8 text-center text-gray-400 text-sm">
                  Favori oteliniz bulunmamaktadır.
                </div>
              ) : (
                <div className="bg-white border border-t-0 border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
                  {otelFavorites.map((f) => (
                    <div key={f.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                      <span className="text-sm text-gray-800 flex-1 pr-4">{f.name}</span>
                      <span className="text-xs text-gray-400 w-24 text-center">{f.tarih}</span>
                      <button
                        onClick={() => removeFavorite(f.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors w-8 flex justify-center"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FormRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="text-sm text-gray-600 w-32 shrink-0">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}
