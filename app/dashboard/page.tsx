"use client";

import { Card } from "@prajwolpakka/antd-extended";
import { useQuery } from "@tanstack/react-query";

interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  newSignups: number;
  recentActivity: string[];
}

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 280 }}
      >
        <div style={{ textAlign: "center", color: "#666" }}>Loading...</div>
      </div>
    );

  if (error)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 280 }}
      >
        <div style={{ textAlign: "center", color: "#e53e3e" }}>
          An error occurred: {error.message}
        </div>
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            margin: "0 0 12px 0",
            fontSize: 22,
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: "-0.01em",
          }}
        >
          Dashboard Overview
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <Card
            style={{
              borderRadius: 6,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <div style={{ padding: "12px", textAlign: "left" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                Total Users
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.1,
                }}
              >
                {data?.totalUsers.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card
            style={{
              borderRadius: 6,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <div style={{ padding: "12px", textAlign: "left" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                Active Users
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.1,
                }}
              >
                {data?.activeUsers.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card
            style={{
              borderRadius: 6,
              boxShadow: "none",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <div style={{ padding: "12px", textAlign: "left" }}>
              <h3 style={{ margin: "0 0 4px 0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                New Signups
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.1,
                }}
              >
                {data?.newSignups.toLocaleString()}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div>
        <h2
          style={{
            margin: "0 0 12px 0",
            fontSize: 16,
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: "-0.01em",
          }}
        >
          Recent Activity
        </h2>
        <Card
          style={{
            borderRadius: 6,
            boxShadow: "none",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            background: "#fff",
          }}
        >
          <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 14 }}>
            {data?.recentActivity.map((activity, index) => (
              <li
                key={index}
                style={{
                  padding: "12px 16px",
                  borderBottom:
                    index < data.recentActivity.length - 1 ? "1px solid #e5e7eb" : "none",
                  color: "#374151",
                  fontWeight: 500,
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#111827",
                      borderRadius: "50%",
                      marginRight: 12,
                      flexShrink: 0,
                    }}
                  ></div>
                  <span>{activity}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
