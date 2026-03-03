"use client";

import React, { useEffect, useState } from "react";
/**
 * 다양한 유형의 차트를 구축하기 위한 Recharts 컴포넌트 임포트.
 * AreaChart: 영역이 채워진 추세 분석용.
 * BarChart: 범주형 데이터 분포용.
 * PieChart: 비례 구성 데이터용.
 */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  TooltipProps,
} from "recharts";
import { TrendingUp, Users, DollarSign, Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

/**
 * 차트 데이터를 위한 인터페이스 정의
 * 애플리케이션 전반의 타입 안전성을 보장하고 'any' 사용을 방지합니다.
 */

interface MockData {
  name: string;
  total?: number;
  count?: number;
  value?: number;
}

// 모크 데이터 - 실제 앱에서는 API에서 가져옵니다.
const revenueData: MockData[] = [
  { name: "1월", total: 4000 },
  { name: "2월", total: 3000 },
  { name: "3월", total: 5000 },
  { name: "4월", total: 4500 },
  { name: "5월", total: 6000 },
  { name: "6월", total: 5500 },
  { name: "7월", total: 7000 },
];

const downloadData: MockData[] = [
  { name: "월", count: 400 },
  { name: "화", count: 300 },
  { name: "수", count: 500 },
  { name: "목", count: 280 },
  { name: "금", count: 590 },
  { name: "토", count: 320 },
  { name: "일", count: 190 },
];

const deviceData: MockData[] = [
  { name: "데스크탑", value: 45 },
  { name: "모바일", value: 40 },
  { name: "태블릿", value: 15 },
];

const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

/**
 * 커스텀 툴팁 컴포넌트
 * @param active - 툴팁이 현재 활성화(호버)되었는지 여부를 나타내는 불리언 값
 * @param payload - 호버된 지점의 데이터를 포함하는 배열
 * @param label - 호버된 지점의 X축 레이블
 *
 * 이 컴포넌트는 차트 호버 상태에 프리미엄한 디자인을 제공합니다.
 */
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">
          {payload[0].value?.toLocaleString()}
          {payload[0].name === "total" ? " $" : ""}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * 대시보드 컴포넌트
 * 분석 뷰를 위한 메인 컨테이너입니다.
 * Recharts와 Next.js 사이의 하이드레이션 불일치를 피하기 위해 클라이언트 사이드 마운팅을 처리합니다.
 */
export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  /**
   * 마운트 상태를 처리하기 위한 효과.
   * Recharts 컴포넌트는 레이아웃 계산을 위해 브라우저 전용 API(window, document)에 의존하므로,
   * 클라이언트에서만 렌더링되어야 합니다.
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  // 하이드레이션 오류를 방지하기 위해 SSR 중에는 플레이스홀더나 빈 div를 반환합니다.
  if (!mounted) return <div style={{ minHeight: "100vh" }} />;

  return (
    <div className="container">
      {/* 페이지 헤더 */}
      <header style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", color: "var(--foreground)" }}>대시보드 분석</h1>
        <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>환영합니다! 오늘 당신의 프로젝트에서 일어나고 있는 일들입니다.</p>
      </header>

      {/* 통계 카드 섹션
          반응형 레이아웃을 위해 globals.css에 정의된 CSS Grid를 사용합니다. */}
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-3" style={{ marginBottom: "2.5rem" }}>
        {/* 매출 통계 카드 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>총 매출</p>
              <h3 style={{ fontSize: "1.5rem" }}>$45,231.89</h3>
            </div>
            <div style={{ backgroundColor: "rgba(99, 102, 241, 0.1)", padding: "0.5rem", borderRadius: "0.5rem" }}>
              <DollarSign size={24} color="var(--primary)" />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ color: "#10b981", fontWeight: "600", fontSize: "0.875rem", display: "flex", alignItems: "center" }}>
              <ArrowUpRight size={16} /> +20.1%
            </span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>지난달 대비</span>
          </div>
        </div>

        {/* 활성 사용자 통계 카드 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>활성 사용자</p>
              <h3 style={{ fontSize: "1.5rem" }}>+2,350</h3>
            </div>
            <div style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "0.5rem", borderRadius: "0.5rem" }}>
              <Users size={24} color="#10b981" />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ color: "#10b981", fontWeight: "600", fontSize: "0.875rem", display: "flex", alignItems: "center" }}>
              <ArrowUpRight size={16} /> +180.1%
            </span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>지난달 대비</span>
          </div>
        </div>

        {/* 다운로드 통계 카드 */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>앱 다운로드</p>
              <h3 style={{ fontSize: "1.5rem" }}>12,234</h3>
            </div>
            <div style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", padding: "0.5rem", borderRadius: "0.5rem" }}>
              <Download size={24} color="#f59e0b" />
            </div>
          </div>
          <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
            <span style={{ color: "#ef4444", fontWeight: "600", fontSize: "0.875rem", display: "flex", alignItems: "center" }}>
              <ArrowDownRight size={16} /> -4.2%
            </span>
            <span style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>지난달 대비</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-cols-2">
        {/* 메인 매출 영역 차트
            큰 화면에서 전체 너비를 차지하도록 2개의 컬럼을 확장합니다. */}
        <div className="card" style={{ gridColumn: "span 2" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", alignItems: "center" }}>
            <div>
              <h3 style={{ fontSize: "1.25rem" }}>월간 매출</h3>
              <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>올해의 총 수익 현황</p>
            </div>
            <TrendingUp size={20} color="var(--primary)" />
          </div>
          <div style={{ width: "100%", height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                {/* 시각적 향상: 영역 채우기를 위한 SVG 선형 그라데이션 */}
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone" // 부드러운 곡선
                  dataKey="total"
                  stroke="var(--primary)" // 선 색상
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorTotal)" // 위에서 정의한 그라데이션 적용
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 주간 다운로드 막대 차트 */}
        <div className="card">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>주간 분포</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>일별 다운로드 수</p>
          </div>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={downloadData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: "rgba(99,102,241,0.05)" }} content={<CustomTooltip />} />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  {/* 특정 막대(금요일)를 다른 색상으로 하이라이트 */}
                  {downloadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 4 ? "#10b981" : "var(--primary)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 기기 사용량 파이/도넛 차트 */}
        <div className="card">
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.25rem" }}>기기 사용량</h3>
            <p style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>사용자 플랫폼 분석</p>
          </div>
          <div style={{ width: "100%", height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // 도넛 구멍을 만듭니다
                  outerRadius={100}
                  paddingAngle={20} // 조각 사이의 간격
                  dataKey="value"
                  animationDuration={1500}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                {/* 도넛 차트 중앙 텍스트 */}
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fill: "var(--foreground)", fontWeight: 700, fontSize: "1.5rem" }}
                >
                  100%
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* 커스텀 범례 */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1rem" }}>
            {deviceData.map((item, i) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: COLORS[i] }} />
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ marginTop: "4rem", textAlign: "center", color: "var(--muted-foreground)", paddingBottom: "2rem" }}>
        <p>© 2026 AdminDash. Built with Next.js, Recharts, and ❤️</p>
      </footer>
    </div>
  );
}
