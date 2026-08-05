import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  MessageSquare,
  GitBranch,
  BarChart3,
  Settings,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  badge?: number;
  section: 'Lending';
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, section: 'Lending' },
  { label: 'Loans', href: '/dashboard/loans', icon: FileText, badge: 24, section: 'Lending' },
  { label: 'KYC', href: '/dashboard/kyc', icon: CheckSquare, badge: 12, section: 'Lending' },
  { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: 5, section: 'Lending' },
  { label: 'Workflows', href: '/dashboard/workflows', icon: GitBranch, section: 'Lending' },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, section: 'Lending' },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings, section: 'Lending' },
];
