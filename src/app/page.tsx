"use client";

import React, { useState } from "react";
import Dashboard from "@/components/Dashboard";
import ChartJSDashboard from "@/components/ChartJSDashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"recharts" | "chartjs">("recharts");

  return (
    <main>
      {/* 탭 네비게이션 */}
      <div style={{ padding: "2rem 2rem 0", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            backgroundColor: "var(--secondary)",
            padding: "0.4rem",
            borderRadius: "1rem",
            gap: "0.25rem",
            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
          }}
        >
          <button
            onClick={() => setActiveTab("recharts")}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              border: "none",
              backgroundColor: activeTab === "recharts" ? "var(--card)" : "transparent",
              color: activeTab === "recharts" ? "var(--primary)" : "var(--muted-foreground)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeTab === "recharts" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            Recharts
          </button>
          <button
            onClick={() => setActiveTab("chartjs")}
            style={{
              padding: "0.6rem 1.25rem",
              borderRadius: "0.75rem",
              border: "none",
              backgroundColor: activeTab === "chartjs" ? "var(--card)" : "transparent",
              color: activeTab === "chartjs" ? "var(--primary)" : "var(--muted-foreground)",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeTab === "chartjs" ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            Chart.js
          </button>
        </div>
      </div>

      {/* 대시보드 렌더링 */}
      {activeTab === "recharts" ? <Dashboard /> : <ChartJSDashboard />}
    </main>
  );
}
