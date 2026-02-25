import { Link } from "react-router";
import {
  Award, Users, Globe, TrendingUp, Check, ArrowRight, ShieldCheck,
} from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";

const TEAM = [
  { name: "Ahmet Yıldız", role: "Genel Müdür", img: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
  { name: "Ayşe Kaya", role: "Tur Koordinatörü", img: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
  { name: "Mehmet Demir", role: "Satış Direktörü", img: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
  { name: "Zeynep Arslan", role: "Müşteri Deneyimi", img: "https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200" },
];

const STATS = [
  { icon: Users, value: "50.000+", label: "Mutlu Gezgin" },
  { icon: Globe, value: "45+", label: "Destinasyon" },
  { icon: Award, value: "15", label: "Yıllık Deneyim" },
  { icon: TrendingUp, value: "%97", label: "Memnuniyet Oranı" },
];

const TIMELINE = [
  { year: "2009", title: "Kuruluş", desc: "İstanbul'da küçük bir ofisle turizmde ilk adımımızı attık." },
  { year: "2012", title: "Balkan Rotaları", desc: "Vizesiz Balkan turlarında öncü acente olarak sektörde yer edindik." },
  { year: "2015", title: "TÜRSAB Üyeliği", desc: "Türkiye Seyahat Acentaları Birliği'ne kabul edildi." },
  { year: "2018", title: "Avrupa Genişlemesi", desc: "20'yi aşkın Avrupa destinasyonunu portföyümüze ekledik." },
  { year: "2022", title: "Dijital Dönüşüm", desc: "Online rezervasyon ve mobil deneyim altyapısını hayata geçirdik." },
  { year: "2026", title: "Bugün", desc: "50.000'den fazla mutlu gezginle Türkiye'nin güvenilir tur acentesiyiz." },
];

export function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1653549882026-4c92d25bee4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="İstanbul"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0057A8]/90 to-[#0057A8]/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-center px-8 max-w-4xl mx-auto">
          <p className="text-white/70 text-sm uppercase tracking-widest mb-2">Bizi Tanıyın</p>
          <h1 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Hakkımızda
          </h1>
          <p className="text-white/80 max-w-lg text-sm leading-relaxed">
            2009'dan bu yana Türkiye'nin güvenilir seyahat partneri olarak 50.000'den fazla gezgine unutulmaz deneyimler yaşattık.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: "Tourbulance", href: "/" }, { label: "Hakkımızda" }]} />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 mb-12">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-[#0057A8]" />
              </div>
              <p className="text-gray-900 mb-0.5" style={{ fontWeight: 800, fontSize: "1.75rem" }}>{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>

        {/* Hikayemiz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <p className="text-[#E31E24] text-sm font-semibold uppercase tracking-wider mb-2">Hikayemiz</p>
            <h2 className="text-gray-900 mb-5" style={{ fontWeight: 700, fontSize: "clamp(1.4rem, 3vw, 2rem)" }}>
              Seyahati Herkes İçin<br />Erişilebilir Kılıyoruz
            </h2>
            <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
              <p>
                Tourbulance, 2009 yılında seyahat tutkunu bir ekip tarafından kuruldu. Misyonumuz basit ama güçlü: kaliteli seyahati herkes için ulaşılabilir kılmak.
              </p>
              <p>
                Özellikle Balkan rotalarında vizesiz seyahat konusunda sektörde öncü konumda yer alan şirketimiz, bugün Avrupa'dan Uzakdoğu'ya geniş bir destinasyon yelpazesi sunmaktadır.
              </p>
              <p>
                TÜRSAB üyesi olan şirketimiz, misafirlerimizin güvenli ve konforlu bir seyahat deneyimi yaşaması için çalışmaktadır.
              </p>
            </div>
            <div className="mt-6 space-y-2.5">
              {[
                "TÜRSAB lisanslı ve denetimli acente",
                "45+ destinasyonda uzman rehber kadrosu",
                "7/24 müşteri destek hattı",
                "Şeffaf fiyatlandırma, gizli ücret yok",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-emerald-600" />
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1684395160513-2d6d447633c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
              alt="Ekibimiz"
              className="w-full rounded-2xl shadow-xl object-cover h-80"
            />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <p className="font-bold text-[#0057A8]" style={{ fontSize: "1.5rem" }}>15</p>
              <p className="text-xs text-gray-500">Yıllık<br/>Deneyim</p>
            </div>
            <div className="absolute -top-5 -right-5 bg-[#E31E24] rounded-2xl shadow-xl p-4 text-white">
              <p className="font-bold" style={{ fontSize: "1.5rem" }}>%97</p>
              <p className="text-xs text-white/80">Müşteri<br/>Memnuniyeti</p>
            </div>
          </div>
        </div>

        {/* Zaman tüneli */}
        

        {/* Ekip */}
        

        {/* TÜRSAB + Güven rozetleri */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <ShieldCheck size={36} className="text-[#0057A8]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-gray-900 mb-1">TÜRSAB Lisanslı Acente</h3>
              <p className="text-sm text-gray-500 mb-2">
                Türkiye Seyahat Acentaları Birliği tarafından lisanslanan ve denetlenen şirketimiz, yasal standartların en üst seviyesinde hizmet vermektedir.
              </p>
              <p className="text-sm font-semibold text-[#0057A8]">Belge No: TÜRSAB – XXXX</p>
            </div>
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {["Güvenli Ödeme", "Lisanslı Acente", "Müşteri Güvencesi"].map((badge) => (
                <div key={badge} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <Check size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-[10px] text-gray-500 text-center leading-tight">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#0057A8] to-[#003d7a] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "1.3rem" }}>Hayalinizdeki Turu Birlikte Planlayalım</h3>
            
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/iletisim" className="flex items-center gap-2 bg-white text-[#0057A8] font-semibold px-5 py-3 rounded-xl text-sm hover:bg-gray-100 transition-colors">
              Bizimle İletişime Geçin <ArrowRight size={15} />
            </Link>
            <Link to="/tum-turlar" className="flex items-center gap-2 border-2 border-white text-white font-semibold px-5 py-3 rounded-xl text-sm hover:bg-white/10 transition-colors">
              Turları İncele
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
