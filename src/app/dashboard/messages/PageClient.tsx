'use client';

import { useMemo, useState } from 'react';
import { Send } from 'lucide-react';
import { MOCK_LOANS, generateMockMessages } from '@/lib/dashboard/mock-data';

export default function MessagesPageClient() {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const loans = useMemo(() => MOCK_LOANS.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()), []);

  const messages = useMemo(() => selectedLoan ? generateMockMessages(selectedLoan) : [], [selectedLoan]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage('');
      // In a real app, this would send to backend
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', minHeight: 'calc(100vh - var(--header-h) - 48px)', gap: '0' }}>
      {/* Channels / Sidebar */}
      <div style={{
        width: '220px',
        background: 'var(--color-surface)',
        borderRight: `1px solid var(--color-border)`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '16px', borderBottom: `1px solid var(--color-border)` }}>
          <h3 style={{ margin: '0', fontWeight: '700', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }}>
            Channels
          </h3>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {loans.length} applicants
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          {loans.map(loan => (
            <button
              key={loan.id}
              onClick={() => setSelectedLoan(loan.id)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '4px',
                background: selectedLoan === loan.id ? 'var(--color-primary-highlight)' : 'transparent',
                border: selectedLoan === loan.id ? `1px solid var(--color-primary)` : 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 150ms ease-in-out',
              }}
              onMouseEnter={(e) => {
                if (selectedLoan !== loan.id) {
                  e.currentTarget.style.background = 'var(--color-surface-offset)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLoan !== loan.id) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              <div style={{ fontWeight: '600', fontSize: '13px', color: 'var(--color-text)' }}>
                {loan.applicantName.split(' ')[0]}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {loan.phoneNumber}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      {selectedLoan && loans.find(l => l.id === selectedLoan) ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            padding: '16px 24px',
            borderBottom: `1px solid var(--color-border)`,
            background: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h2 style={{ margin: '0', fontWeight: '700', color: 'var(--color-text)', fontSize: 'var(--text-base)' }}>
                {loans.find(l => l.id === selectedLoan)?.applicantName}
              </h2>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '12px', marginTop: '4px' }}>
                {loans.find(l => l.id === selectedLoan)?.phoneNumber}
              </div>
            </div>
            <button style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '20px' }}>
              ⋮
            </button>
          </div>

          {/* Messages Scroll */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px', background: 'var(--color-bg)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.senderId === 'officer-1' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    style={{
                      maxWidth: '60%',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: msg.senderId === 'officer-1' ? 'var(--color-primary)' : 'var(--color-surface)',
                      color: msg.senderId === 'officer-1' ? '#fff' : 'var(--color-text)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{
            padding: '16px 24px',
            borderTop: `1px solid var(--color-border)`,
            background: 'var(--color-surface)',
            display: 'flex',
            gap: '12px',
          }}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '10px 12px',
                background: 'var(--color-surface-offset)',
                border: `1px solid var(--color-border)`,
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-text)',
                fontSize: 'var(--text-sm)',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '10px 16px',
                background: 'var(--color-primary)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--text-sm)',
        }}>
          Select a conversation to start messaging
        </div>
      )}
    </div>
  );
}
