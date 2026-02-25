import { Shield, FileText, Eye, Lock, UserCheck, RefreshCw, Mail } from "lucide-react";
import { Breadcrumb } from "../components/Breadcrumb";

const SECTIONS = [
  {
    icon: FileText,
    title: "1. Amaç ve Kapsam",
    content: `Bu Gizlilik Politikası, Tourbulance Turizm A.Ş. ("Şirket") tarafından yürütülen web sitesi ve mobil uygulama üzerinden toplanan kişisel verilerin işlenme esaslarını düzenlemektedir.

6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında "veri sorumlusu" sıfatını taşıyan Şirketimiz, kişisel verilerinizi aşağıda belirtilen amaçlar doğrultusunda ve hukuka uygun şekilde işlemektedir.`,
  },
  {
    icon: Eye,
    title: "2. Toplanan Veriler",
    content: `Hizmetlerimizden yararlanmanız sırasında aşağıdaki kişisel verileriniz toplanabilmektedir:

• Kimlik Bilgileri: Ad, soyad, TC kimlik numarası, pasaport numarası
• İletişim Bilgileri: E-posta adresi, telefon numarası, adres
• Ödeme Bilgileri: Kredi/banka kartı bilgileri (yalnızca şifreli ortamda işlenir)
• Seyahat Bilgileri: Tur tarihleri, destinasyon, konaklama tercihleri
• Teknik Veriler: IP adresi, tarayıcı türü, çerez verileri, oturum bilgileri`,
  },
  {
    icon: UserCheck,
    title: "3. Verilerin İşlenme Amaçları",
    content: `Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:

• Rezervasyon ve satış işlemlerinin tamamlanması
• Yasal yükümlülüklerin yerine getirilmesi (vergi, muhasebe vb.)
• Müşteri hizmetleri ve şikayet süreçlerinin yürütülmesi
• Promosyon, kampanya ve tur duyurularının iletilmesi (onayınız dahilinde)
• Site kullanım analizleri ve hizmet kalitesinin iyileştirilmesi
• Dolandırıcılık önleme ve güvenlik tedbirlerinin alınması`,
  },
  {
    icon: Lock,
    title: "4. Veri Güvenliği",
    content: `Kişisel verilerinizin güvenliği için aşağıdaki teknik ve idari tedbirler uygulanmaktadır:

• SSL (Secure Socket Layer) şifreleme protokolü
• Ödeme verilerinin PCI DSS standartlarına uygun işlenmesi
• Sınırlı erişim: Yalnızca yetkili personelin veri erişimi
• Düzenli güvenlik denetimleri ve penetrasyon testleri
• Veri ihlali anında ilgili makamlara 72 saat içinde bildirim yükümlülüğü`,
  },
  {
    icon: RefreshCw,
    title: "5. Veri Saklama Süresi",
    content: `Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca saklanmaktadır:

• Rezervasyon ve sözleşme verileri: 10 yıl (Türk Borçlar Kanunu gereği)
• Muhasebe ve fatura verileri: 5 yıl (Vergi mevzuatı gereği)
• Pazarlama verileri: Onayın geri alınmasına kadar
• Teknik log verileri: Maksimum 2 yıl

Saklama süresinin dolmasının ardından verileriniz güvenli yöntemlerle silinir, yok edilir veya anonim hale getirilir.`,
  },
  {
    icon: UserCheck,
    title: "6. KVKK Kapsamındaki Haklarınız",
    content: `6698 sayılı Kanun'un 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenen veriler hakkında bilgi talep etme
• Verilerin işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme
• Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme
• Verilerin eksik veya yanlış işlenmesi halinde düzeltilmesini isteme
• Kanun'un 7. maddesinde öngörülen şartlar çerçevesinde verilerin silinmesini talep etme
• İşlenen veriler aleyhine bir sonucun ortaya çıkmasına itiraz etme

Haklarınızı kullanmak için kvkk@tourbulance.com adresine yazılı başvuruda bulunabilirsiniz.`,
  },
  {
    icon: FileText,
    title: "7. Çerez (Cookie) Politikası",
    content: `Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır:

• Zorunlu Çerezler: Site işlevselliği için gereklidir, devre dışı bırakılamaz.
• Analitik Çerezler: Ziyaretçi davranışlarını analiz eder (Google Analytics).
• Pazarlama Çerezleri: Kişiselleştirilmiş reklamlar için kullanılır (onayınız dahilinde).

Tarayıcı ayarlarınızdan çerezleri yönetebilirsiniz. Ancak zorunlu çerezlerin devre dışı bırakılması bazı özelliklerin çalışmamasına neden olabilir.`,
  },
  {
    icon: Mail,
    title: "8. İletişim",
    content: `Bu politika kapsamında sorularınız ve KVKK başvurularınız için:

Tourbulance Turizm A.Ş.
Adres: Bağcılar Mah. Atatürk Cad. No: 42, Bağcılar / İstanbul
E-posta: kvkk@tourbulance.com
Telefon: 0850 XXX XX XX

Bu Gizlilik Politikası son olarak 01 Ocak 2026 tarihinde güncellenmiştir. Önemli değişikliklerde e-posta yoluyla bilgilendirme yapılacaktır.`,
  },
];

export function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 py-14 px-4 text-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Shield size={32} className="text-white" />
        </div>
        <h1 className="text-white mb-3" style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
          Gizlilik Politikası & KVKK
        </h1>
        <p className="text-white/60 max-w-lg mx-auto text-sm">
          Kişisel verilerinizin güvenliği bizim için önceliktir. Bu sayfa, verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu açıklar.
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/40">
          <span>Son güncelleme: 1 Ocak 2026</span>
          <span>·</span>
          <span>Versiyon 2.1</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: "Tourbulance", href: "/" }, { label: "Gizlilik Politikası" }]} />

        {/* Quick nav */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6 mb-8">
          <p className="text-sm font-semibold text-gray-700 mb-3">İçerik</p>
          <div className="grid grid-cols-2 gap-2">
            {SECTIONS.map((s, i) => (
              <a
                key={i}
                href={`#section-${i}`}
                className="text-sm text-[#0057A8] hover:text-[#E31E24] hover:underline transition-colors"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {SECTIONS.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={i}
                id={`section-${i}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#0057A8]" />
                  </span>
                  <h2 className="font-semibold text-gray-900" style={{ fontSize: "1rem" }}>{section.title}</h2>
                </div>
                <div className="text-sm text-gray-600 leading-[1.9] whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
          <Shield size={22} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 mb-1">Güncel Bilgi</p>
            <p className="text-sm text-amber-700">
              Bu politika değiştiğinde kayıtlı e-posta adresinize bildirim gönderilecektir.
              Her zaman en güncel versiyona bu sayfadan ulaşabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
