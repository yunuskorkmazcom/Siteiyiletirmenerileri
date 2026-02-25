import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronDown, User, Menu, X, Phone, MapPin, LogOut, Heart, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* ── Mega Menu Data ── */
const TUR_MEGA_MENU = [
  {
    title: "Yurtiçi Turlar",
    items: [
      "Kapadokya Turu",
      "Karadeniz Turları",
    ],
  },
  {
    title: "Yurtdışı Turlar",
    items: [
      "Amerika Turları",
      "Avrupa Turları",
      "Balkan Turları",
      "Bayram / Yılbaşı Turları",
      "Disneyland Turları",
      "Dubai Turları",
      "İtalya Turları",
      "Mısır Turları",
      "Paris Turları",
      "Uzakdoğu Turları",
      "Vizesiz Turlar",
    ],
  },
  {
    title: "Gemi Turları",
    items: [
      "Akdeniz",
      "Norveç Fiyortları",
      "Uzak Doğu",
      "Yunan Adaları",
    ],
  },
  {
    title: "Tur Çıkış Şehri",
    items: [
      "Ankara Çıkışlı",
      "Antalya Çıkışlı",
      "İstanbul Çıkışlı",
      "İzmir Çıkışlı",
    ],
  },
];

const OTEL_MEGA_MENU = [
  {
    title: "YURTİÇİ OTELLER",
    items: [
      "Ekonomik Oteller",
      "Balayı Otelleri",
      "Alanya Otelleri",
      "Antalya Otelleri",
      "Belek Otelleri",
      "Bodrum Otelleri",
      "Kemer Otelleri",
    ],
  },
  {
    title: "Kıbrıs Otelleri",
    items: ["Girne Otelleri", "Lefkoşa Otelleri"],
  },
  {
    title: "ŞEHİR OTELLERİ",
    items: [
      "Antalya Şehir Otelleri",
      "Ankara Şehir Otelleri",
      "Bursa Şehir Otelleri",
      "İstanbul Şehir Otelleri",
      "İzmir Şehir Otelleri",
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, openLogin, openRegister, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: "Tüm Turlar", href: "/tum-turlar", turMegaMenu: true },
    {
      label: "Vizesiz Balkan Turları",
      href: "#",
      children: ["Sabiha Gökçen Çıkışlı", "İstanbul Çıkışlı", "Ankara Çıkışlı"],
    },
    {
      label: "Vizesiz Turlar",
      href: "#",
      children: ["Avrupa Turları", "Balkan Turları", "Yunanistan Turları"],
    },
    { label: "Kıbrıs Otelleri", href: "/tum-oteller", megaMenu: true },
    { label: "Blog", href: "/blog" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#0057A8] text-white py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={11} />
              <span>0850 XXX XX XX</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} />
              <span>İstanbul, Türkiye</span>
            </span>
          </div>
          <span className="opacity-70">Güvenli &amp; Vizesiz Seyahat Deneyimi</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            src="https://tbnew.a2demo.xyz/site/images/logo.png"
            style={{ width: 150 }}
            alt="Tourbulance Logo"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => (item.children || item.megaMenu || item.turMegaMenu) ? setActiveDropdown(item.label) : undefined}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-all
                  ${activeDropdown === item.label
                    ? "text-[#0057A8] bg-blue-50"
                    : "text-gray-700 hover:text-[#E31E24] hover:bg-red-50"}`}
              >
                {item.label}
                {(item.children || item.megaMenu || item.turMegaMenu) && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 opacity-60 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                  />
                )}
              </a>

              {/* Normal dropdown */}
              {item.children && activeDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-48 z-50">
                  {item.children.map((child) => (
                    <a
                      key={child}
                      href="#"
                      className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-red-50 hover:text-[#E31E24] transition-colors"
                    >
                      {child}
                    </a>
                  ))}
                </div>
              )}

              {/* Tur Mega Menu */}
              {item.turMegaMenu && activeDropdown === item.label && (
                <div className="fixed left-0 right-0 top-[calc(var(--header-height,112px))] z-50">
                  <div className="bg-white shadow-2xl border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-8 py-8">
                      <div className="grid grid-cols-4 gap-8">
                        {TUR_MEGA_MENU.map((col) => (
                          <div key={col.title}>
                            <p className="text-sm font-black text-gray-900 mb-4 pb-2 border-b border-gray-200">
                              {col.title}
                            </p>
                            <ul className="space-y-2.5">
                              {col.items.map((it) => (
                                <li key={it}>
                                  <a
                                    href="/tum-turlar"
                                    className="text-sm text-gray-600 hover:text-[#0057A8] transition-colors"
                                  >
                                    {it}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Otel Mega Menu */}
              {item.megaMenu && activeDropdown === item.label && (
                <div className="fixed left-0 right-0 top-[calc(var(--header-height,112px))] z-50">
                  <div className="bg-white border-t-2 border-[#0057A8] shadow-2xl">
                    <div className="max-w-7xl mx-auto px-8 py-8">
                      <div className="grid grid-cols-3 gap-8">
                        {OTEL_MEGA_MENU.map((col) => (
                          <div key={col.title}>
                            {/* Kolon başlığı */}
                            <p className="text-xs font-black text-gray-900 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                              {col.title}
                            </p>
                            <ul className="space-y-2.5">
                              {col.items.map((it) => (
                                <li key={it}>
                                  <a
                                    href="/tum-oteller"
                                    className="text-sm text-[#0057A8] hover:text-[#E31E24] transition-colors hover:underline"
                                  >
                                    {it}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {/* Çağrı Merkezi */}
          <a
            href="tel:+908501234567"
            className="hidden md:flex items-center gap-2 text-gray-700 hover:text-[#E31E24] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <Phone size={14} className="text-[#E31E24]" />
            </div>
            <div className="leading-tight">
              <p className="text-[10px] text-gray-400">Çağrı Merkezi</p>
              <p className="text-sm font-bold text-gray-800">0850 123 45 67</p>
            </div>
          </a>

          {user ? (
            /* ── GİRİŞ YAPILMIŞ ── */
            <div className="relative hidden sm:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 border border-[#0057A8] text-[#0057A8] hover:bg-[#0057A8] hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                <User size={15} />
                <span className="max-w-[100px] truncate">{user.adSoyad.split(" ")[0]}</span>
                <ChevronDown size={13} className="opacity-60" />
              </button>
              {userMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-48 z-50">
                  <button
                    onClick={() => { navigate("/profil"); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057A8] transition-colors"
                  >
                    <User size={14} /> Profilim
                  </button>
                  <button
                    onClick={() => { navigate("/profil"); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057A8] transition-colors"
                  >
                    <Calendar size={14} /> Rezervasyonlarım
                  </button>
                  <button
                    onClick={() => { navigate("/profil"); setUserMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#0057A8] transition-colors"
                  >
                    <Heart size={14} /> Favorilerim
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => { logout(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={14} /> Çıkış Yap
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── GİRİŞ YAPILMAMIŞ ── */
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={openLogin}
                className="flex items-center gap-2 border border-[#0057A8] text-[#0057A8] hover:bg-[#0057A8] hover:text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                <User size={15} />
                <span>Giriş Yap</span>
              </button>
              <button
                onClick={openRegister}
                className="flex items-center gap-2 bg-[#E31E24] hover:bg-[#BE1920] text-white px-4 py-2 rounded-lg text-sm transition-all"
              >
                <span>Üye Ol</span>
              </button>
            </div>
          )}

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-[#E31E24] border-b border-gray-50"
            >
              {item.label}
            </a>
          ))}
          <div className="p-4 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => { navigate("/profil"); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#0057A8] text-white px-4 py-3 rounded-xl text-sm"
                >
                  <User size={15} />
                  Profilim
                </button>
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 border border-red-300 text-red-500 px-4 py-3 rounded-xl text-sm"
                >
                  <LogOut size={15} />
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { openLogin(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#0057A8] text-white px-4 py-3 rounded-xl text-sm"
                >
                  <User size={15} />
                  Giriş Yap
                </button>
                <button
                  onClick={() => { openRegister(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E31E24] text-white px-4 py-3 rounded-xl text-sm"
                >
                  Üye Ol
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}