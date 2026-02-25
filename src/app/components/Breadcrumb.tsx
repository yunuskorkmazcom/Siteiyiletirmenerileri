import { Home, ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500">
      <a href="#" className="hover:text-[#0a2463] transition-colors">
        <Home size={14} />
      </a>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="opacity-40" />
          {item.href ? (
            <a
              href={item.href}
              className="hover:text-[#0a2463] transition-colors"
            >
              {item.label}
            </a>
          ) : (
            <span className="text-[#0a2463] font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
