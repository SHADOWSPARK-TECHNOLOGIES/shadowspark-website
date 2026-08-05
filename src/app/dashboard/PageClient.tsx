'use client';

import { useMemo } from 'react';
import { TrendingUp, Users, Clock, Zap } from 'lucide-react';
import { MOCK_LOANS, MOCK_ANALYTICS } from '@/lib/dashboard/mock-data';

export default function DashboardPageClient() {
  const analytics = useMemo(() => MOCK_ANALYTICS, []);
  const loans = useMemo(() => MOCK_LOANS, []);
  
  const recentLoans = useMemo(() => loans.slice(0, 5), [loans]);
  const kycPending = useMemo(() => loans.filter(l => l.kycStatus === 'pending'), [loans]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Loans"
          value={analytics.totalLoans}
          change="+12%"
          icon={<Zap size={20} />}
        />
        <KPICard
          title="Pending KYC"
          value={analytics.pendingKYC}
          subtitle="Documents awaiting review"
          icon={<Clock size={20} />}
        />
        <KPICard
          title="Collection Rate"
          value={`${analytics.repaymentRate}%`}
          subtitle="Repayment success rate"
          icon={<TrendingUp size={20} />}
        />
        <KPICard
          title="Active Repayments"
          value={formatCurrency(analytics.totalVolume * 0.4)}
          subtitle="Current portfolio"
          icon={<Users size={20} />}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Loans - Left */}
        <div className="lg:col-span-2">
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Recent Loans</h3>
              <a href="/dashboard/loans" className="text-sm text-amber-500 hover:text-amber-600">View all →</a>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="dashboard-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px' }}>Applicant</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px' }}>Amount</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px' }}>Status</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLoans.map(loan => (
                    <tr key={loan.id}>
                      <td style={{ padding: '12px' }}>
                        <div>
                          <div style={{ fontWeight: '500', color: 'var(--color-text)' }}>{loan.applicantName}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{loan.phoneNumber}</div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px', fontFamily: 'var(--font-mono)' }}>
                        {formatCurrency(loan.amount)}
                      </td>
                      <td style={{ textAlign: 'center', padding: '12px' }}>
                        <StatusBadge status={loan.status} />
                      </td>
                      <td style={{ textAlign: 'center', padding: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                        {loan.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* KYC Queue */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">KYC Queue</h3>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)' }}>
                {kycPending.length} pending
              </span>
            </div>
            <div className="space-y-2">
              {kycPending.slice(0, 5).map(loan => (
                <div
                  key={loan.id}
                  style={{
                    padding: '8px 12px',
                    background: 'var(--color-surface-offset)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-opacity-80"
                >
                  <div style={{ fontWeight: '500', color: 'var(--color-text)' }}>{loan.applicantName}</div>
                  <div style={{ color: 'var(--color-text-muted)', marginTop: '2px' }}>{loan.id}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3 className="card-title">Quick Actions</h3>
            </div>
            <div className="space-y-2">
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Create Loan
              </button>
              <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Download Report
              </button>
            </div>
          </div>

          {/* AI Insights */}
          <div className="dashboard-card" style={{ background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))' }}>
            <div className="card-header">
              <h3 className="card-title">AI Insights</h3>
            </div>
            <p style={{ fontSize: '12px', lineHeight: '1.5', color: 'var(--color-text-muted)' }}>
              High-volume KYC queue detected. Consider prioritizing documents from Tier 1 applicants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({
  title,
  value,
  change,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  change?: string;
  subtitle?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="dashboard-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: '11px', color: 'var(--color-text-faint)', marginTop: '2px' }}>
              {subtitle}
            </div>
          )}
        </div>
        <div style={{ color: 'var(--color-primary)' }}>
          {icon}
        </div>
      </div>
      <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>
        {value}
      </div>
      {change && (
        <div style={{ fontSize: '12px', color: 'var(--color-success)', marginTop: '8px' }}>
          {change} vs last month
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--color-warning)' },
    approved: { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--color-success)' },
    disbursed: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },
    repaying: { bg: 'rgba(168, 85, 247, 0.1)', text: '#a855f7' },
    completed: { bg: 'rgba(34, 197, 94, 0.1)', text: '#22c55e' },
    defaulted: { bg: 'rgba(244, 63, 94, 0.1)', text: 'var(--color-error)' },
  };

  const color = colors[status] || colors.pending;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        background: color.bg,
        color: color.text,
        fontSize: '11px',
        fontWeight: '600',
        borderRadius: 'var(--radius-sm)',
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}
