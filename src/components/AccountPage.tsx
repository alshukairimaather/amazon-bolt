import { User, Package, Heart, MapPin, CreditCard, Bell, Shield } from 'lucide-react';
import { Page } from '../types';

interface AccountPageProps {
  loggedInAs: string;
  onNavigate: (page: Page) => void;
  onSignOut: () => void;
}

export default function AccountPage({ loggedInAs, onNavigate, onSignOut }: AccountPageProps) {
  const sections = [
    { icon: <Package size={18} />, title: 'Your Orders', desc: 'Track, return, or buy things again', page: { type: 'orders' as const } },
    { icon: <Heart size={18} />, title: 'Your Lists', desc: 'View and edit your lists', page: { type: 'deals' as const } },
    { icon: <MapPin size={18} />, title: 'Your Addresses', desc: 'Edit addresses for orders and gifts', page: { type: 'account' as const } },
    { icon: <CreditCard size={18} />, title: 'Your Payments', desc: 'Manage payment methods', page: { type: 'account' as const } },
    { icon: <Bell size={18} />, title: 'Communication preferences', desc: 'Email and notification preferences', page: { type: 'account' as const } },
    { icon: <Shield size={18} />, title: 'Login & security', desc: 'Edit name, email, and password', page: { type: 'account' as const } },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-[24px] font-bold text-[#0f1111] mb-6">Your Account</h1>

      <div className="border border-[#ddd] rounded-lg p-5 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-[#f0f0f0] rounded-full flex items-center justify-center">
          <User size={24} className="text-[#565959]" />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-[#0f1111]">{loggedInAs.split('@')[0]}</p>
          <p className="text-[13px] text-[#565959]">{loggedInAs}</p>
        </div>
        <button onClick={onSignOut} className="text-[#0066c0] text-[13px] hover:underline">Sign out</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map(section => (
          <button
            key={section.title}
            onClick={() => onNavigate(section.page)}
            className="border border-[#ddd] rounded-lg p-5 text-left hover:border-[#007185] transition-colors group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#565959] group-hover:text-[#007185] transition-colors">{section.icon}</span>
              <h3 className="text-[14px] font-bold text-[#0f1111] group-hover:text-[#007185] transition-colors">{section.title}</h3>
            </div>
            <p className="text-[13px] text-[#565959] ml-7">{section.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
