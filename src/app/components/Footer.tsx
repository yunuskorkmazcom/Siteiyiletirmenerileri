import { Phone } from "lucide-react";
import { Link } from "react-router";
import logoImg from "figma:asset/ac191f4652dbf8b47cc18701ee1dd5f889b1fff3.png";

const columns = [
  {
    title: "Kurumsal",
    links: [
      { label: "İletişim", href: "/iletisim" },
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Banka Hesapları", href: "#" },
      { label: "Gizlilik Sözleşmesi", href: "/gizlilik" },
      { label: "Hizmet Sözleşmesi", href: "#" },
    ],
  },
  {
    title: "Kategoriler",
    links: [
      { label: "Mısır Turları", href: "/tum-turlar" },
      { label: "İtalya Turları", href: "/tum-turlar" },
      { label: "Dubai Turları", href: "/tum-turlar" },
      { label: "Vizesiz Turlar", href: "/tum-turlar" },
      { label: "Avrupa Turları", href: "/tum-turlar" },
      { label: "Balkan Turları", href: "/tum-turlar" },
      { label: "İspanya Turları", href: "/tum-turlar" },
    ],
  },
  {
    title: "Oteller",
    links: [
      { label: "Antalya Otelleri", href: "/tum-oteller" },
      { label: "Belek Otelleri", href: "/tum-oteller" },
      { label: "Bodrum Otelleri", href: "/tum-oteller" },
      { label: "İstanbul Otelleri", href: "/tum-oteller" },
      { label: "İzmir Otelleri", href: "/tum-oteller" },
      { label: "Kıbrıs Otelleri", href: "/tum-oteller" },
      { label: "Muğla Otelleri", href: "/tum-oteller" },
    ],
  },
  {
    title: "Fırsatlar",
    links: [
      { label: "2026 Erken Rezervasyon", href: "/tum-turlar" },
      { label: "Fırsat Otelleri", href: "#" },
      { label: "Fırsat Turları", href: "/tum-turlar" },
    ],
  },
  {
    title: "Tur Çıkış Şehirleri",
    links: [
      { label: "Ankara Çıkışlı Turlar", href: "/tum-turlar" },
      { label: "Antalya Çıkışlı Turlar", href: "/tum-turlar" },
      { label: "İstanbul Çıkışlı Turlar", href: "/tum-turlar" },
      { label: "İzmir Çıkışlı Turlar", href: "/tum-turlar" },
    ],
  },
];

const socialLinks = [
  {
    label: "X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white mt-16">
      {/* Logo bandı */}
      <div className="border-b border-white/10">
        
      </div>

      {/* Ana kolonlar */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Sosyal Medya */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white">Sosyal Medya</h4>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-[#E31E24] hover:bg-[#c01a1f] flex items-center justify-center transition-colors text-white"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orta bant: Acente No + TÜRSAB + Ödeme */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Acente No */}
          <p className="text-white/70 text-sm font-medium whitespace-nowrap">
            Acente Belge No : <span className="text-white font-semibold">553641</span>
          </p>

          {/* TÜRSAB rozeti */}
          <div className="flex items-center gap-4">
            <div className="border border-white/20 rounded-lg px-4 py-2 text-center">
              <p className="text-[10px] text-white/50 uppercase tracking-wider">TÜRSAB</p>
              <p className="text-xs font-semibold text-white">Dijital Doğrulama Sistemi</p>
              <p className="text-[10px] text-white/50 mt-0.5">Belge No: <span className="text-white font-bold">17688</span></p>
            </div>
            <div className="border border-white/20 rounded-lg px-3 py-2 flex items-center gap-1.5">
              <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center text-[8px] text-white/60 text-center leading-tight">
                QR
              </div>
              <span className="text-[10px] text-white/50">TÜRSAB'a<br/>Kayıtlı</span>
            </div>
          </div>

          {/* Ödeme yöntemleri */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {["VISA", "MC", "Chip&PIN", "Güvenli\nAlışveriş"].map((p, i) => (
              <div
                key={i}
                className="px-2.5 py-1.5 bg-white/10 border border-white/20 rounded text-[10px] font-bold text-white/80 whitespace-pre-line text-center leading-tight"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alt bar: Telif + Çağrı */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © 2025 <span className="text-[#E31E24] font-semibold">Tourbulance</span> Tüm Hakları Saklıdır.
          </p>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              <Phone size={12} />
            </div>
            <span>365 Gün Çağrı Desteği</span>
          </div>
        </div>
      </div>
    </footer>
  );
}