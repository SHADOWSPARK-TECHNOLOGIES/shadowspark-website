'use client';

import { useMemo, useState } from 'react';
import { MOCK_LOANS, generateMockKYCDocuments } from '@/lib/dashboard/mock-data';

export default function KYCPageClient() {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const loans = useMemo(() => MOCK_LOANS, []);

  const kycGroups = useMemo(() => {
    const pending = loans.filter(l => l.kycStatus === 'pending');
    const verified = loans.filter(l => l.kycStatus === 'verified');
    const rejected = loans.filter(l => l.kycStatus === 'rejected');
    return { pending, verified, rejected };
  }, [loans]);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', padding: '0' }}>
        <KanbanColumn title="Pending" count={kycGroups.pending.length} items={kycGroups.pending} onSelectItem={setSelectedLoan} selectedId={selectedLoan} status="pending" />
        <KanbanColumn title="Verified" count={kycGroups.verified.length} items={kycGroups.verified} onSelectItem={setSelectedLoan} selectedId={selectedLoan} status="verified" />
        <KanbanColumn title="Rejected" count={kycGroups.rejected.length} items={kycGroups.rejected} onSelectItem={setSelectedLoan} selectedId={selectedLoan} status="rejected" />
      </div>

      {selectedLoan && (
        <DocumentViewer
          loanId={selectedLoan}
          onClose={() => setSelectedLoan(null)}
          loan={loans.find(l => l.id === selectedLoan)!}
        />
      )}
    </div>
  );
}

function KanbanColumn({
  title,
  count,
  items,
  onSelectItem,
  selectedId,
  status,
}: {
  title: string;
  count: number;
  items: any[];
  onSelectItem: (id: string) => void;
  selectedId: string | null;
  status: string;
}) {
  const bgColor = status === 'pending' ? 'rgba(245, 158, 11, 0.05)' : 
                   status === 'verified' ? 'rgba(16, 185, 129, 0.05)' : 
                   'rgba(244, 63, 94, 0.05)';
  
  const borderColor = status === 'pending' ? 'rgba(245, 158, 11, 0.2)' : 
                      status === 'verified' ? 'rgba(16, 185, 129, 0.2)' : 
                      'rgba(244, 63, 94, 0.2)';

  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 'var(--radius-lg)',
      border: `1px solid var(--color-border)`,
      display: 'flex',
      flexDirection: 'column',
      minHeight: 'calc(100vh - var(--header-h) - 96px)',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px',
        borderBottom: `1px solid var(--color-border)`,
        background: bgColor,
        borderBottomLeftRadius: '0',
        borderBottomRightRadius: '0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontWeight: '700', color: 'var(--color-text)', margin: '0' }}>{title}</h3>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item.id)}
              style={{
                padding: '12px',
                background: selectedId === item.id ? 'var(--color-primary-highlight)' : 'var(--color-surface-offset)',
                borderRadius: 'var(--radius-md)',
                border: selectedId === item.id ? `2px solid var(--color-primary)` : `1px solid ${borderColor}`,
                cursor: 'pointer',
                transition: 'all 150ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (selectedId !== item.id) {
                  e.currentTarget.style.background = 'var(--color-surface-dynamic)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedId !== item.id) {
                  e.currentTarget.style.background = 'var(--color-surface-offset)';
                }
              }}
            >
              <div style={{ fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                {item.applicantName}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '4px' }}>
                {item.id}
              </div>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '11px', marginTop: '4px' }}>
                Documents: {item.documentsSubmitted || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocumentViewer({
  loanId,
  onClose,
  loan,
}: {
  loanId: string;
  onClose: () => void;
  loan: any;
}) {
  const docs = useMemo(() => generateMockKYCDocuments(loanId), [loanId]);
  const [selectedDoc, setSelectedDoc] = useState(docs[0]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid var(--color-border)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h2 style={{ margin: '0', color: 'var(--color-text)', fontSize: 'var(--text-lg)', fontWeight: '700' }}>
              KYC Documents — {loan.applicantName}
            </h2>
            <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '4px' }}>
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
              fontSize: '24px',
              padding: '0',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', overflow: 'auto' }}>
          {/* Document List */}
          <div style={{
            width: '200px',
            borderRight: `1px solid var(--color-border)`,
            padding: '12px',
            overflow: 'auto',
          }}>
            {docs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '8px',
                  background: selectedDoc.id === doc.id ? 'var(--color-primary-highlight)' : 'var(--color-surface-offset)',
                  border: selectedDoc.id === doc.id ? `1px solid var(--color-primary)` : `1px solid var(--color-border)`,
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                <div style={{ textTransform: 'uppercase' }}>{doc.type.replace('_', ' ')}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', marginTop: '4px', textTransform: 'capitalize' }}>
                  {doc.status}
                </div>
              </button>
            ))}
          </div>

          {/* Document Preview */}
          <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              aspectRatio: '1/1.4',
              background: 'var(--color-surface-offset)',
              border: `2px dashed var(--color-border)`,
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📄</div>
              <div style={{ fontWeight: '600', color: 'var(--color-text)', marginBottom: '4px' }}>
                {selectedDoc.type.replace('_', ' ').toUpperCase()}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                Document preview
              </div>
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: selectedDoc.status === 'verified' ? 'rgba(16, 185, 129, 0.1)' : selectedDoc.status === 'rejected' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                color: selectedDoc.status === 'verified' ? 'var(--color-success)' : selectedDoc.status === 'rejected' ? 'var(--color-error)' : 'var(--color-warning)',
                fontSize: '12px',
                fontWeight: '600',
                borderRadius: 'var(--radius-md)',
                textTransform: 'capitalize',
              }}>
                {selectedDoc.status}
              </div>
            </div>

            {/* Document Info */}
            <div style={{ marginTop: '24px', width: '100%', textAlign: 'left' }}>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Upload Info
              </div>
              <div style={{ background: 'var(--color-surface-offset)', padding: '12px', borderRadius: 'var(--radius-md)', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                <div>Uploaded: {selectedDoc.uploadedAt.split('T')[0]}</div>
                {selectedDoc.verifiedAt && <div>Verified: {selectedDoc.verifiedAt.split('T')[0]}</div>}
                {selectedDoc.rejectionReason && <div>Reason: {selectedDoc.rejectionReason}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: `1px solid var(--color-border)`,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              background: 'var(--color-surface-offset)',
              border: `1px solid var(--color-border)`,
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            Close
          </button>
          {selectedDoc.status === 'pending' && (
            <>
              <button
                style={{
                  padding: '8px 16px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--color-error)',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Reject
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  background: 'var(--color-success)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
