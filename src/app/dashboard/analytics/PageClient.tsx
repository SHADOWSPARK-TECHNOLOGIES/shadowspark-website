'use client';

import { useMemo } from 'react';
import { MOCK_LOANS, MOCK_ANALYTICS } from '@/lib/dashboard/mock-data';

export default function AnalyticsPageClient() {
  const loans = useMemo(() => MOCK_LOANS, []);
  const analytics = useMemo(() => MOCK_ANALYTICS, []);

  // Generate loan volume data (by month)
  const volumeData = useMemo(() => {
    const monthlyData = Array(12).fill(0).map((_, i) => ({
      month: new Date(2025, i, 1).toLocaleString('en-US', { month: 'short' }),
      volume: Math.floor(Math.random() * 50) + 20,
    }));
    return monthlyData;
  }, []);

  // Generate approval rate data
  const approvalData = [
    { status: 'Approved', value: 65 },
    { status: 'Pending', value: 25 },
    { status: 'Rejected', value: 10 },
  ];

  // Generate repayment data
  const repaymentData = useMemo(() => {
    const weeks = Array(8).fill(0).map((_, i) => ({
      week: `W${i + 1}`,
      paid: Math.floor(Math.random() * 100) + 40,
      pending: Math.floor(Math.random() * 40) + 10,
    }));
    return weeks;
  }, []);

  // Generate KYC time data
  const kycTimeData = useMemo(() => {
    const days = Array(30).fill(0).map((_, i) => ({
      day: i + 1,
      days: Math.floor(Math.random() * 5) + 1,
    }));
    return days;
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
      {/* Loan Volume */}
      <ChartCard title="Loan Volume" subtitle="Monthly applications">
        <SimpleAreaChart data={volumeData} />
      </ChartCard>

      {/* Approval Rate */}
      <ChartCard title="Approval Rate" subtitle="Application outcomes">
        <SimplePieChart data={approvalData} />
      </ChartCard>

      {/* Repayment Status */}
      <ChartCard title="Repayment Status" subtitle="Weekly performance">
        <SimpleBarChart data={repaymentData} />
      </ChartCard>

      {/* KYC Processing Time */}
      <ChartCard title="KYC Processing Time" subtitle="Average days by batch">
        <SimpleLineChart data={kycTimeData} />
      </ChartCard>

      {/* Summary Stats */}
      <ChartCard title="Portfolio Summary" subtitle="Current lending metrics">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <StatItem label="Total Volume" value={`₦${(analytics.totalVolume / 1000000).toFixed(1)}M`} />
          <StatItem label="Active Loans" value={loans.filter(l => l.status === 'repaying').length.toString()} />
          <StatItem label="Repayment Rate" value={`${analytics.repaymentRate}%`} />
          <StatItem label="Avg KYC Time" value={`${analytics.averageKYCTime} days`} />
        </div>
      </ChartCard>

      {/* Risk Distribution */}
      <ChartCard title="Risk Distribution" subtitle="Loan portfolio by status">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['pending', 'approved', 'disbursed', 'repaying', 'completed', 'defaulted'].map((status, idx) => {
            const count = loans.filter(l => l.status === status as any).length;
            const percentage = Math.round((count / loans.length) * 100);
            return (
              <div
                key={status}
                style={{
                  flex: `0 1 calc(${percentage}% - 4px)`,
                  minWidth: '40px',
                  height: '40px',
                  background: getStatusColor(status),
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: '#fff',
                }}
                title={`${status}: ${count} (${percentage}%)`}
              >
                {percentage > 5 && `${percentage}%`}
              </div>
            );
          })}
        </div>
      </ChartCard>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-card">
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ margin: '0', fontWeight: '700', color: 'var(--color-text)', fontSize: 'var(--text-base)' }}>
          {title}
        </h3>
        <p style={{ margin: '0', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
          {subtitle}
        </p>
      </div>
      {children}
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: '12px', background: 'var(--color-surface-offset)', borderRadius: 'var(--radius-md)' }}>
      <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
        {value}
      </div>
    </div>
  );
}

function SimpleAreaChart({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.volume));
  const normalized = data.map(d => (d.volume / max) * 100);

  return (
    <div style={{ height: '200px', position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
      {normalized.map((height, idx) => (
        <div
          key={idx}
          style={{
            flex: 1,
            height: `${height}%`,
            background: 'linear-gradient(180deg, rgba(245, 158, 11, 0.6), rgba(245, 158, 11, 0.2))',
            borderRadius: '2px 2px 0 0',
            minHeight: '4px',
            cursor: 'pointer',
          }}
          title={`${data[idx].month}: ${data[idx].volume}`}
        />
      ))}
    </div>
  );
}

function SimplePieChart({ data }: { data: any[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;

  return (
    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg style={{ width: '150px', height: '150px' }} viewBox="0 0 100 100">
        {data.map((item, idx) => {
          const sliceAngle = (item.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += sliceAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (currentAngle * Math.PI) / 180;

          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);

          const largeArc = sliceAngle > 180 ? 1 : 0;
          const pathData = [
            `M 50 50`,
            `L ${x1} ${y1}`,
            `A 40 40 0 ${largeArc} 1 ${x2} ${y2}`,
            'Z',
          ].join(' ');

          const colors = ['rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(244, 63, 94, 0.8)'];

          return (
            <path
              key={idx}
              d={pathData}
              fill={colors[idx]}
              stroke="var(--color-surface)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
          {data.map(item => `${item.status}: ${item.value}%`).join(' • ')}
        </div>
      </div>
    </div>
  );
}

function SimpleBarChart({ data }: { data: any[] }) {
  const maxValue = Math.max(...data.flatMap(d => [d.paid, d.pending]));

  return (
    <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
      {data.map((item, idx) => (
        <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div
            style={{
              height: `${(item.paid / maxValue) * 150}px`,
              background: 'rgba(16, 185, 129, 0.8)',
              borderRadius: '2px 2px 0 0',
              minHeight: '4px',
            }}
            title={`Paid: ${item.paid}`}
          />
          <div
            style={{
              height: `${(item.pending / maxValue) * 150}px`,
              background: 'rgba(245, 158, 11, 0.6)',
              borderRadius: '2px 2px 0 0',
              minHeight: '2px',
            }}
            title={`Pending: ${item.pending}`}
          />
          <div style={{ fontSize: '9px', color: 'var(--color-text-muted)', textAlign: 'center', marginTop: '4px' }}>
            {item.week}
          </div>
        </div>
      ))}
    </div>
  );
}

function SimpleLineChart({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.days));
  const points = data.map((d, idx) => {
    const x = (idx / (data.length - 1)) * 100;
    const y = 100 - (d.days / max) * 80;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div style={{ height: '200px', position: 'relative' }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="rgba(245, 158, 11, 0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, idx) => (
          <circle
            key={idx}
            cx={(idx / (data.length - 1)) * 100}
            cy={100 - (d.days / max) * 80}
            r="1.5"
            fill="var(--color-primary)"
          />
        ))}
      </svg>
    </div>
  );
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'rgba(245, 158, 11, 0.8)',
    approved: 'rgba(16, 185, 129, 0.8)',
    disbursed: 'rgba(59, 130, 246, 0.8)',
    repaying: 'rgba(168, 85, 247, 0.8)',
    completed: 'rgba(34, 197, 94, 0.8)',
    defaulted: 'rgba(244, 63, 94, 0.8)',
  };
  return colors[status] || colors.pending;
}
