"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      style={{
        padding: "10px 12px",
        color: isActive ? "#fff" : "#111827",
        textDecoration: "none",
        borderRadius: 6,
        background: isActive ? "#111827" : "transparent",
        border: isActive ? "1px solid #111827" : "1px solid transparent",
      }}
    >
      {label}
    </Link>
  );
}


