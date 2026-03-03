"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { TrendingUp, Activity, CreditCard, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

// Chart.js 컴포넌트 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

/**
 * Chart.js 대시보드 컴포넌트
 * Recharts와는 다른 렌더링 방식(Canvas 기반)을 사용하는 Chart.js 라이브러리 예제입니다.
 */
export default function ChartJSDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: "100vh" }} />;

  // 공통 테마 값 (CSS 변수 활용)
  const primaryColor = "rgba(99, 102, 241, 1)";
  const primaryColorLight = "rgba(99, 102, 241, 0.2)";
  const emeraldColor = "rgba(16, 185, 129, 1)";
  const amberColor = "rgba(245, 158, 11, 1)";

  // 1. 선형 차트 데이터 (수익 현황)
  const lineData: ChartData<"line"> = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월"],
    datasets: [
      {
        fill: true,
        label: "수익 ($)",
        data: [4500, 3800, 5200, 4800, 6500, 6100, 7500],
        borderColor: primaryColor,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, primaryColorLight);
          gradient.addColorStop(1, "rgba(99, 102, 241, 0)");
          return gradient;
        },
        tension: 0.3, // 곡선 부드럽게
        borderWidth: 3,
        pointRadius: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: primaryColor,
        pointHoverRadius: 6,
      },
    ],
  };

  // 2. 막대 차트 데이터 (주간 활동)
  const barData: ChartData<"bar"> = {
    labels: ["월", "화", "수", "목", "금", "토", "일"],
    datasets: [
      {
        label: "접속자 수",
        data: [120, 150, 180, 140, 210, 160, 95],
        backgroundColor: [primaryColor, primaryColor, primaryColor, primaryColor, emeraldColor, primaryColor, primaryColor],
        borderRadius: 8,
        barThickness: 25,
      },
    ],
  };

  // 3. 도넛 차트 데이터 (세션 출처)
  const doughnutData: ChartData<"doughnut"> = {
    labels: ["검색", "직접 유입", "소셜"],
    datasets: [
      {
        data: [55, 30, 15],
        backgroundColor: [primaryColor, emeraldColor, amberColor],
        hoverOffset: 15,
        borderWidth: 0,
        cutout: "75%", // 도넛 구멍 크기
      },
    ],
  };

  // 통계 카드 데이터
  const stats = [
    { title: "총 판매량", value: "24,532", change: "+12.5%", icon: <TrendingUp size={20} color={primaryColor} />, up: true },
    { title: "신규 유입", value: "1,205", change: "+8.2%", icon: <Activity size={20} color={emeraldColor} />, up: true },
    { title: "결제 건수", value: "842", change: "-2.1%", icon: <CreditCard size={20} color={amberColor} />, up: false },
  ];

  return (
    <div className="container">
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", color: "var(--foreground)" }}>Chart.js 리포트</h1>
        <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>강력한 Canvas 기반 엔진으로 구현된 대시보드입니다.</p>
      </header>

      {/* 요약 통계 그리드 */}
      <div className="grid grid-cols-1 grid-cols-3" style={{ marginBottom: "2.5rem" }}>
        {stats.map((stat, i) => (
          <div key={i} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>{stat.title}</span>
              <div style={{ padding: "0.5rem", borderRadius: "10px", backgroundColor: "var(--secondary)" }}>{stat.icon}</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem" }}>
              <h2 style={{ fontSize: "1.75rem", fontWeight: 700 }}>{stat.value}</h2>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: stat.up ? "#10b981" : "#ef4444",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  paddingBottom: "0.25rem",
                }}
              >
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 grid-cols-2">
        {/* 수익 트렌드 (Line Chart) */}
        <div className="card" style={{ gridColumn: "span 2" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>연간 매출 추이 (Line)</h3>
          <div style={{ height: "350px", position: "relative" }}>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    padding: 12,
                    bodyFont: { size: 14 },
                    displayColors: false,
                  },
                },
                scales: {
                  x: { grid: { display: false }, border: { display: false } },
                  y: { grid: { color: "rgba(226, 232, 240, 0.5)" }, border: { display: false } },
                },
              }}
            />
          </div>
        </div>

        {/* 주간 활동 (Bar Chart) */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>주간 사용자 활동 (Bar)</h3>
          <div style={{ height: "300px" }}>
            <Bar
              data={barData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, grid: { display: false }, border: { display: false } },
                  x: { grid: { display: false }, border: { display: false } },
                },
              }}
            />
          </div>
        </div>

        {/* 유입 경로 (Doughnut Chart) */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <h3>트래픽 소스 (Doughnut)</h3>
            <PieIcon size={20} color="var(--muted-foreground)" />
          </div>
          <div style={{ height: "250px", display: "flex", justifyContent: "center" }}>
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
            {["검색", "직접", "소셜"].map((label, i) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: doughnutData.datasets[0].backgroundColor[i] as string }} />
                <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
