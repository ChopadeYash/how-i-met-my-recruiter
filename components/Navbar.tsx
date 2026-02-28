"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "AI Assistant" },
  { href: "/ats-checker", label: "ATS Checker" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b" style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background: "var(--accent)" }}>
            H
          </div>
          <span className="font-semibold text-sm hidden sm:block" style={{ color: "var(--text-primary)" }}>
            How I Met My Recruiter
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
                style={{
                  color: isActive ? "white" : "var(--text-secondary)",
                  background: isActive ? "var(--accent)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
