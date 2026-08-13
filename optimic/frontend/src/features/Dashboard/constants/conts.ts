import { 
  LayoutGrid, 
  CloudUpload, 
  TrendingUp, 
  Megaphone, 
  Settings 
} from 'lucide-react';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
  { id: 'data-upload', label: 'Data Upload', icon: CloudUpload },
  { id: 'agent-analytics', label: 'Agent Analytics', icon: TrendingUp },
  { id: 'active-campaigns', label: 'Active Campaigns', icon: Megaphone },
  { id: 'settings', label: 'Settings', icon: Settings, hasDivider: true },
];