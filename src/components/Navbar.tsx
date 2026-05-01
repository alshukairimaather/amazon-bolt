import { Search, MapPin, ShoppingCart, ChevronDown, Menu, X, User, Package, Heart, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { CartItem, Page } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  loggedInAs: string | null;
  currentPage: Page;
  onSignInClick: () => void;
  onCartClick: () => void;
  onNavigate: (page: Page) => void;
  onSearch: (query: string, category: string) => void;
  onSignOut: () => void;
}

const DEPARTMENTS = [
  'All', 'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty', 'Books',
  'Sports & Outdoors', 'Toys & Games', 'Pet Supplies', 'Health',
  'Automotive', 'Furniture', 'Grocery', 'Tools & Home Improvement',
];

export default function Navbar({ cartItems, loggedInAs, currentPage, onSignInClick, onCartClick, onNavigate, onSearch, onSignOut }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDept, setSearchDept] = useState('All');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);
  const deptRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), searchDept === 'All' ? '' : searchDept);
    }
  };

  const userName = loggedInAs ? loggedInAs.split('@')[0] : 'sign in';

  return (
    <header>
      <nav className="bg-[#131921] text-white">
        <div className="flex items-center h-[60px] max-w-[1500px] mx-auto px-2 gap-1">
          {/* Logo */}
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="flex-shrink-0 border-2 border-transparent hover:border-white rounded px-2 py-1.5 mr-1"
          >
            <div className="flex items-center">
              <span className="text-white font-bold text-[22px] tracking-tight">amazon</span>
              <span className="text-[#ff9900] text-[10px] font-bold ml-0.5 self-end mb-1">.com</span>
            </div>
          </button>

          {/* Deliver to */}
          <button
            onClick={onSignInClick}
            className="hidden lg:flex flex-col items-start border-2 border-transparent hover:border-white rounded px-2 py-1.5 flex-shrink-0"
          >
            <span className="text-[#cccccc] text-[11px] leading-tight">Deliver to</span>
            <div className="flex items-center gap-0.5">
              <MapPin size={14} />
              <span className="text-[13px] font-bold">Korea</span>
            </div>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex flex-1 min-w-0 h-[40px] rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#f90] ml-1">
            <div className="relative" ref={deptRef}>
              <button
                type="button"
                onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                className="h-full bg-[#e6e6e6] hover:bg-[#d4d4d4] text-[#0f1111] text-xs px-2 flex items-center gap-0.5 border-r border-[#cdcdcd] rounded-l-md flex-shrink-0 transition-colors"
              >
                <span className="max-w-[70px] truncate">{searchDept}</span>
                <ChevronDown size={10} className="flex-shrink-0" />
              </button>
              {showDeptDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowDeptDropdown(false)} />
                  <div className="absolute top-full left-0 z-50 bg-white border border-gray-300 rounded shadow-xl max-h-80 overflow-y-auto w-56 py-1">
                    {DEPARTMENTS.map(dept => (
                      <button
                        key={dept}
                        type="button"
                        onClick={() => { setSearchDept(dept); setShowDeptDropdown(false); }}
                        className={`w-full text-left px-4 py-1.5 text-sm hover:bg-[#f3f3f3] transition-colors ${dept === searchDept ? 'font-bold text-[#c45500]' : 'text-[#0f1111]'}`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <input
              type="text"
              placeholder="Search Amazon"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 px-3 text-[#0f1111] text-sm outline-none min-w-0"
            />
            <button type="submit" className="bg-[#febd68] hover:bg-[#f3a847] w-[45px] flex items-center justify-center flex-shrink-0 transition-colors">
              <Search size={20} className="text-[#0f1111]" />
            </button>
          </form>

          {/* Language */}
          <button className="hidden md:flex items-center gap-0.5 border-2 border-transparent hover:border-white rounded px-2 py-1.5 flex-shrink-0">
            <span className="text-sm">EN</span>
            <ChevronDown size={10} />
          </button>

          {/* Account & Lists */}
          <div className="relative hidden sm:block" ref={accountRef}>
            <button
              onClick={() => { if (loggedInAs) setShowAccountMenu(!showAccountMenu); else onSignInClick(); }}
              className="flex flex-col items-start border-2 border-transparent hover:border-white rounded px-2 py-1.5 flex-shrink-0"
            >
              <span className="text-[#cccccc] text-[11px] leading-tight">Hello, {userName}</span>
              <div className="flex items-center gap-0.5">
                <span className="text-[13px] font-bold">Account & Lists</span>
                <ChevronDown size={10} />
              </div>
            </button>
            {showAccountMenu && loggedInAs && (
              <div className="absolute right-0 top-full z-50 bg-white border border-gray-200 rounded shadow-xl w-56 py-2 text-[#0f1111]">
                <button onClick={() => { onNavigate({ type: 'account' }); setShowAccountMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f3f3f3] flex items-center gap-2">
                  <User size={14} /> Your Account
                </button>
                <button onClick={() => { onNavigate({ type: 'orders' }); setShowAccountMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f3f3f3] flex items-center gap-2">
                  <Package size={14} /> Your Orders
                </button>
                <button onClick={() => { onNavigate({ type: 'deals' }); setShowAccountMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f3f3f3] flex items-center gap-2">
                  <Heart size={14} /> Your Lists
                </button>
                <div className="border-t border-gray-200 my-1" />
                <button onClick={() => { onSignOut(); setShowAccountMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-[#f3f3f3] flex items-center gap-2 text-[#cc0c39]">
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <button
            onClick={() => onNavigate({ type: 'orders' })}
            className="hidden sm:flex flex-col items-start border-2 border-transparent hover:border-white rounded px-2 py-1.5 flex-shrink-0"
          >
            <span className="text-[#cccccc] text-[11px] leading-tight">Returns</span>
            <span className="text-[13px] font-bold">&amp; Orders</span>
          </button>

          {/* Cart */}
          <button
            onClick={onCartClick}
            className="flex items-end gap-0.5 border-2 border-transparent hover:border-white rounded px-2 py-1.5 flex-shrink-0"
          >
            <div className="relative">
              <ShoppingCart size={26} />
              {totalItems > 0 && (
                <span className="absolute -top-[6px] left-1/2 -translate-x-1/2 text-[#f08804] text-[15px] font-bold leading-none">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[13px] font-bold hidden sm:block">Cart</span>
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(true)} className="md:hidden border-2 border-transparent hover:border-white rounded p-1.5">
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Sub-nav */}
      <div className="bg-[#232f3e] text-white flex items-center h-[40px] px-2 gap-0 overflow-x-auto text-[13px]">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-1 border-2 border-transparent hover:border-white rounded px-2 py-0.5 flex-shrink-0 font-bold"
        >
          <Menu size={16} />
          <span>All</span>
        </button>
        {["Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell"].map(item => (
          <button
            key={item}
            onClick={() => {
              if (item === "Today's Deals") onNavigate({ type: 'deals' });
            }}
            className="border-2 border-transparent hover:border-white rounded px-2 py-0.5 flex-shrink-0 whitespace-nowrap"
          >
            {item}
          </button>
        ))}
        <span className="font-bold flex-shrink-0 ml-auto hidden lg:block pr-2">Shop deals in Electronics</span>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="w-72 bg-white h-full overflow-y-auto shadow-2xl">
            <div className="bg-[#232f3e] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span className="font-bold text-lg">Hello, {userName}</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={20} />
              </button>
            </div>
            <div className="py-2">
              {[
                { label: 'Home', page: { type: 'home' as const } },
                { label: 'Your Account', page: { type: 'account' as const } },
                { label: 'Your Orders', page: { type: 'orders' as const } },
                { label: "Today's Deals", page: { type: 'deals' as const } },
                { divider: true },
                { label: 'Electronics', page: { type: 'category' as const, category: 'Electronics' } },
                { label: 'Clothing', page: { type: 'category' as const, category: 'Clothing' } },
                { label: 'Home & Kitchen', page: { type: 'category' as const, category: 'Home & Kitchen' } },
                { label: 'Beauty', page: { type: 'category' as const, category: 'Beauty' } },
                { label: 'Books', page: { type: 'category' as const, category: 'Books' } },
                { label: 'Toys & Games', page: { type: 'category' as const, category: 'Toys & Games' } },
                { label: 'Pet Supplies', page: { type: 'category' as const, category: 'Pet Supplies' } },
                { label: 'Sports & Outdoors', page: { type: 'category' as const, category: 'Sports & Outdoors' } },
                { label: 'Health', page: { type: 'category' as const, category: 'Health' } },
                { label: 'Automotive', page: { type: 'category' as const, category: 'Automotive' } },
                { label: 'Furniture', page: { type: 'category' as const, category: 'Furniture' } },
                { label: 'Grocery', page: { type: 'category' as const, category: 'Grocery' } },
                { label: 'Tools & Home Improvement', page: { type: 'category' as const, category: 'Tools & Home Improvement' } },
              ].map((item, i) => {
                if ('divider' in item) return <div key={i} className="border-t border-gray-200 my-2" />;
                return (
                  <button
                    key={i}
                    onClick={() => { onNavigate(item.page); setMobileMenuOpen(false); }}
                    className="w-full text-left px-6 py-2.5 text-sm text-[#0f1111] hover:bg-[#f3f3f3] transition-colors"
                  >
                    {item.label}
                  </button>
                );
              })}
              {loggedInAs && (
                <button
                  onClick={() => { onSignOut(); setMobileMenuOpen(false); }}
                  className="w-full text-left px-6 py-2.5 text-sm text-[#cc0c39] hover:bg-[#f3f3f3] transition-colors"
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
