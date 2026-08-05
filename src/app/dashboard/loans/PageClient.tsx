'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { MOCK_LOANS, generateMockKYCDocuments, generateMockRepayments, generateMockMessages } from '@/lib/dashboard/mock-data';
import type { Loan } from '@/lib/dashboard/mock-data';

export default function LoansPageClient() {
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'kyc' | 'repayments' | 'messages' | 'audit'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Loan['status'] | 'all'>('all');
  const [selectedLoans, setSelectedLoans] = useState<Set<string>>(new Set());

  const loans = useMemo(() => MOCK_LOANS, []);

  const filteredLoans = useMemo(() => {
    return loans.filter(loan => {
      const matchesSearch = loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.phoneNumber.includes(searchTerm) ||
                           loan.id.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [loans, searchTerm, statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const toggleLoanSelection = (loanId: string) => {
    const newSelection = new Set(selectedLoans);
    if (newSelection.has(loanId)) {
      newSelection.delete(loanId);
    } else {
      newSelection.add(loanId);
    }
    setSelectedLoans(newSelection);
  };

  const toggleAllSelection = () => {
    if (selectedLoans.size === filteredLoans.length) {
      setSelectedLoans(new Set());
    } else {
      setSelectedLoans(new Set(filteredLoans.map(l => l.id)));
    }
  };

  return (
    <div style={{ display: 'flex', gap: '24px', height: '100%', minHeight: 'calc(100vh - var(--header-h) - 48px)' }}>
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Filters */}
        <div className="dashboard-card" style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search by name, phone, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                minWidth: '200px',
                padding: '8px 12px',
                background: 'var(--color-surface-offset)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text)',
              }}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              style={{
                padding: '8px 12px',
                background: 'var(--color-surface-offset)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text)',
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="disbursed">Disbursed</option>
              <option value="repaying">Repaying</option>
              <option value="completed">Completed</option>
              <option value="defaulted">Defaulted</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="dashboard-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table className="dashboard-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px' }}>
                    <input
                      type="checkbox"
                      checked={selectedLoans.size === filteredLoans.length && filteredLoans.length > 0}
                      onChange={toggleAllSelection}
                      style={{ cursor: 'pointer' }}
                    />
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px' }}>Applicant</th>
                  <th style={{ textAlign: 'right', padding: '12px' }}>Amount</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>Status</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>KYC</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}>Created</th>
                  <th style={{ textAlign: 'center', padding: '12px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredLoans.map(loan => (
                  <tr key={loan.id}>
                    <td style={{ padding: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedLoans.has(loan.id)}
                        onChange={() => toggleLoanSelection(loan.id)}
                        style={{ cursor: 'pointer' }}
                      />
                    </td>
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
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <KYCBadge status={loan.kycStatus} />
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {loan.createdAt}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px' }}>
                      <button
                        onClick={() => {
                          setSelectedLoan(loan);
                          setActiveTab('overview');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--color-text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedLoan && (
        <DetailPanel
          loan={selectedLoan}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onClose={() => setSelectedLoan(null)}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
}

function DetailPanel({
  loan,
  activeTab,
  onTabChange,
  onClose,
  formatCurrency,
}: {
  loan: Loan;
  activeTab: string;
  onTabChange: (tab: any) => void;
  onClose: () => void;
  formatCurrency: (amount: number) => string;
}) {
  const kycDocs = useMemo(() => generateMockKYCDocuments(loan.id), [loan.id]);
  const repayments = useMemo(() => generateMockRepayments(loan.id, loan.amount), [loan.id, loan.amount]);
  const messages = useMemo(() => generateMockMessages(loan.id), [loan.id]);

  return (
    <div style={{
      width: '320px',
      background: 'var(--color-surface)',
      border: `1px solid var(--color-border)`,
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '100%',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: `1px solid var(--color-border)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontWeight: '700', fontSize: 'var(--text-base)', color: 'var(--color-text)' }}>
            {loan.applicantName}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {loan.id}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            padding: '4px',
          }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: `1px solid var(--color-border)`,
        padding: '0 8px',
        overflowX: 'auto',
      }}>
        {['overview', 'kyc', 'repayments', 'messages', 'audit'].map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              padding: '12px 12px',
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              borderBottom: activeTab === tab ? `2px solid var(--color-primary)` : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div>
              <div style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Amount</div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--color-text)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                {formatCurrency(loan.amount)}
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Status</div>
                <StatusBadge status={loan.status} />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>KYC</div>
                <KYCBadge status={loan.kycStatus} />
              </div>
            </div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Term</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text)', marginTop: '4px' }}>{loan.loanTerm} months</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: '600' }}>Rate</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text)', marginTop: '4px' }}>{loan.interestRate}%</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'kyc' && (
          <div className="space-y-3">
            {kycDocs.map(doc => (
              <div
                key={doc.id}
                style={{
                  padding: '12px',
                  background: 'var(--color-surface-offset)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                }}
              >
                <div style={{ fontWeight: '600', color: 'var(--color-text)', textTransform: 'uppercase' }}>
                  {doc.type.replace('_', ' ')}
                </div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Status: <span style={{ color: doc.status === 'verified' ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'repayments' && (
          <div className="space-y-3">
            {repayments.map(rep => (
              <div
                key={rep.id}
                style={{
                  padding: '12px',
                  background: 'var(--color-surface-offset)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>{rep.dueDate}</div>
                  <span style={{
                    padding: '2px 6px',
                    background: rep.status === 'paid' ? 'rgba(16, 185, 129, 0.1)' : rep.status === 'overdue' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: rep.status === 'paid' ? 'var(--color-success)' : rep.status === 'overdue' ? 'var(--color-error)' : 'var(--color-warning)',
                    fontSize: '10px',
                    fontWeight: '600',
                    borderRadius: '2px',
                  }}>
                    {rep.status}
                  </span>
                </div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {formatCurrency(rep.amount)}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-3">
            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  padding: '12px',
                  background: 'var(--color-surface-offset)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                }}
              >
                <div style={{ fontWeight: '600', color: 'var(--color-text)' }}>{msg.senderName}</div>
                <div style={{ color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                  {msg.content}
                </div>
                <div style={{ color: 'var(--color-text-faint)', marginTop: '4px', fontSize: '10px' }}>
                  {new Date(msg.timestamp).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
            <p>Created: {loan.createdAt}</p>
            <p style={{ marginTop: '8px' }}>Last Activity: {loan.lastActivity}</p>
            {loan.approvalDate && <p style={{ marginTop: '8px' }}>Approved: {loan.approvalDate}</p>}
            {loan.disbursalDate && <p style={{ marginTop: '8px' }}>Disbursed: {loan.disbursalDate}</p>}
          </div>
        )}
      </div>
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

function KYCBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'rgba(245, 158, 11, 0.1)', text: 'var(--color-warning)' },
    verified: { bg: 'rgba(16, 185, 129, 0.1)', text: 'var(--color-success)' },
    rejected: { bg: 'rgba(244, 63, 94, 0.1)', text: 'var(--color-error)' },
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
