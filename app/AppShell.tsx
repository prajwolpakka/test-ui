"use client";

import { usePathname, useRouter } from "next/navigation";
import { ActiveLink } from "../components/ActiveLink";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const showShell = pathname?.startsWith("/dashboard") || pathname?.startsWith("/users");

  if (!showShell) {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 240,
          height: "100vh",
          background: "#fff",
          borderRight: "1px solid #e5e7eb",
          paddingTop: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: 64,
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            padding: "0 12px",
            fontWeight: 700,
            color: "#1e293b",
          }}
        >
          Antd Extended
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8 }}>
          <ActiveLink href="/dashboard" label="Dashboard" />
          <ActiveLink href="/users" label="Users" />
        </nav>
      </aside>

      <div style={{ marginLeft: 240, flex: 1 }}>
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 240,
            right: 0,
            height: 64,
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 16px",
            zIndex: 10,
          }}
        >
          <button
            onClick={async () => {
              try {
                await fetch("/api/auth/logout", { method: "POST" });
              } catch {}
              router.replace("/login");
            }}
            style={{
              background: "transparent",
              border: "1px solid #e5e7eb",
              borderRadius: 6,
              padding: "6px 10px",
              cursor: "pointer",
              color: "#111827",
            }}
          >
            Logout
          </button>
        </header>

        <main style={{ padding: 16, marginTop: 64 }}>{children}</main>
      </div>
    </div>
  );
}


