import { useState } from "react";
import { Link } from "react-router";
import { Clock, Tag, Search, ArrowRight, User, ChevronRight } from "lucide-react";
import { BLOG_POSTS, BLOG_CATEGORIES } from "../data/blog";
import { Breadcrumb } from "../components/Breadcrumb";

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const featured = BLOG_POSTS.find((p) => p.featured);
  const filtered = BLOG_POSTS.filter((p) => {
    const matchCat = activeCategory === "Tümü" || p.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0057A8] to-[#003d7a] py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white/60 text-sm uppercase tracking-widest mb-3">Seyahat İlhami</p>
          <h1 className="text-white mb-4" style={{ fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Blog & Seyahat Rehberleri
          </h1>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Uzman gezginlerimizin deneyimleri, vize rehberleri, tur ipuçları ve daha fazlası.
          </p>
          {/* Search */}
          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <Breadcrumb items={[{ label: "Tourbulance", href: "/" }, { label: "Blog" }]} />

        {/* Featured post */}
        {featured && !searchQuery && activeCategory === "Tümü" && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group mt-6 block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-auto overflow-hidden relative">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#E31E24] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Öne Çıkan
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-semibold text-[#0057A8] bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
                  {featured.category}
                </span>
                <h2 className="text-gray-900 mb-3 group-hover:text-[#0057A8] transition-colors leading-snug" style={{ fontWeight: 700, fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>
                  {featured.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><User size={11} /> {featured.author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime} dk okuma</span>
                    <span>{featured.date}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-[#0057A8] font-semibold group-hover:gap-2 transition-all">
                    Oku <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Category chips */}
        

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#0057A8] text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#0057A8] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime} dk</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-[#0057A8] font-semibold group-hover:gap-2 transition-all">
                      Oku <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-3 opacity-30" />
            <p>Aramanızla eşleşen yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </div>
  );
}
