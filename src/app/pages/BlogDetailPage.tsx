import { useParams, Link } from "react-router";
import { Clock, Tag, User, ArrowLeft, ArrowRight, Share2, Heart, Facebook, Twitter, Linkedin } from "lucide-react";
import { BLOG_POSTS } from "../data/blog";
import { Breadcrumb } from "../components/Breadcrumb";
import { useState } from "react";

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [liked, setLiked] = useState(false);
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <p>Yazı bulunamadı.</p>
        <Link to="/blog" className="text-[#0057A8] hover:underline flex items-center gap-1">
          <ArrowLeft size={16} /> Blog'a Dön
        </Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const others = related.length < 3
    ? [...related, ...BLOG_POSTS.filter((p) => p.id !== post.id && !related.includes(p))].slice(0, 3)
    : related;

  // Parse very simple markdown for content display
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return <h2 key={i} className="text-gray-900 mt-8 mb-3" style={{ fontWeight: 700, fontSize: "1.25rem" }}>{line.replace("## ", "")}</h2>;
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-semibold text-gray-800 mb-2">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.startsWith("- ")) {
        return <li key={i} className="text-sm text-gray-600 ml-4 mb-1 list-disc">{line.replace("- ", "")}</li>;
      }
      if (line.startsWith("|") && line.endsWith("|")) {
        return null; // skip table lines in this simple parser
      }
      if (line.trim() === "") return <div key={i} className="mb-2" />;
      return <p key={i} className="text-sm text-gray-600 leading-relaxed mb-3">{line}</p>;
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="relative h-72 md:h-[420px] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-8">
          <span className="inline-block bg-[#0057A8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg mb-3">
            {post.category}
          </span>
          <h1 className="text-white leading-snug" style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 4vw, 2.5rem)" }}>
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: "Tourbulance", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 mt-6">

          {/* Content */}
          <article>
            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                
                <div>
                  
                  
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-400 ml-auto">
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime} dk okuma</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
            </div>

            {/* Excerpt highlight */}
            <div className="bg-blue-50 border-l-4 border-[#0057A8] px-5 py-4 rounded-r-xl mb-8">
              <p className="text-sm text-[#0057A8] leading-relaxed italic">{post.excerpt}</p>
            </div>

            {/* Body */}
            <div className="prose prose-sm max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Tags */}
            

            {/* Share row */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-sm text-gray-500 mr-1">Paylaş:</span>
              {[
                { Icon: Facebook, color: "bg-blue-600", label: "Facebook" },
                { Icon: Twitter, color: "bg-sky-500", label: "Twitter" },
                { Icon: Linkedin, color: "bg-blue-700", label: "LinkedIn" },
              ].map(({ Icon, color, label }) => (
                <button key={label} className={`${color} text-white p-2 rounded-lg hover:opacity-80 transition-opacity`}>
                  <Icon size={15} />
                </button>
              ))}
              <button
                onClick={() => setLiked(!liked)}
                className={`ml-auto flex items-center gap-2 border px-4 py-2 rounded-xl text-sm transition-all ${
                  liked ? "border-red-300 text-red-500 bg-red-50" : "border-gray-200 text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart size={14} className={liked ? "fill-red-500" : ""} />
                {liked ? "Beğenildi" : "Beğen"}
              </button>
            </div>

            {/* Author card */}
            
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA */}
            <div className="bg-gradient-to-br from-[#0057A8] to-[#003d7a] rounded-2xl p-5 text-white shadow-lg">
              <p className="font-bold mb-2 text-base">Bu Rotayı Siz de Keşfedin!</p>
              <p className="text-white/70 text-xs mb-4">Uzman rehber eşliğinde konforlu tur paketleri.</p>
              <Link
                to="/tum-turlar"
                className="flex items-center justify-center gap-2 bg-white text-[#0057A8] font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Tur Bul <ArrowRight size={14} />
              </Link>
            </div>

            {/* Related */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-4">İlgili Yazılar</h3>
              <div className="space-y-4">
                {others.map((p) => (
                  <Link
                    key={p.id}
                    to={`/blog/${p.slug}`}
                    className="flex gap-3 group"
                  >
                    <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover shrink-0 group-hover:opacity-80 transition-opacity" />
                    <div>
                      <p className="text-xs font-semibold text-gray-800 leading-snug group-hover:text-[#0057A8] transition-colors line-clamp-2">{p.title}</p>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={10} /> {p.readTime} dk</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">Kategoriler</h3>
              <div className="flex flex-wrap gap-2">
                {["Seyahat Rehberi", "Deneyim", "İpuçları", "Vize", "Tur Rehberi"].map((cat) => (
                  <Link
                    key={cat}
                    to="/blog"
                    className="text-xs bg-gray-100 text-gray-600 hover:bg-[#0057A8] hover:text-white px-3 py-1.5 rounded-full transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Prev/Next navigation */}
        <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-gray-200">
          {BLOG_POSTS[post.id - 2] ? (
            <Link to={`/blog/${BLOG_POSTS[post.id - 2].slug}`} className="flex items-center gap-2 text-sm text-[#0057A8] hover:text-[#E31E24] transition-colors">
              <ArrowLeft size={16} />
              <span className="hidden sm:block line-clamp-1 max-w-xs">{BLOG_POSTS[post.id - 2].title}</span>
              <span className="sm:hidden">Önceki</span>
            </Link>
          ) : <span />}
          {BLOG_POSTS[post.id] ? (
            <Link to={`/blog/${BLOG_POSTS[post.id].slug}`} className="flex items-center gap-2 text-sm text-[#0057A8] hover:text-[#E31E24] transition-colors">
              <span className="hidden sm:block line-clamp-1 max-w-xs text-right">{BLOG_POSTS[post.id].title}</span>
              <span className="sm:hidden">Sonraki</span>
              <ArrowRight size={16} />
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}