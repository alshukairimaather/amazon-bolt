import { X, Trash2, Minus, Plus, Heart } from 'lucide-react';
import { CartItem, Page } from '../types';

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onSignInClick: () => void;
  onNavigate: (page: Page) => void;
  loggedInAs: string | null;
}

export default function CartDrawer({ items, onClose, onUpdateQuantity, onRemove, onSignInClick, onNavigate, loggedInAs }: CartDrawerProps) {
  const activeItems = items.filter(i => !i.saved_for_later);
  const savedItems = items.filter(i => i.saved_for_later);
  const subtotal = activeItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalQty = activeItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/50" onClick={onClose} />
      <div className="w-full max-w-[420px] bg-white shadow-2xl flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#ddd]">
          <h2 className="text-[18px] font-bold text-[#0f1111]">Shopping Cart</h2>
          <button onClick={onClose} className="text-[#565959] hover:text-[#0f1111] transition-colors">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-16 px-6">
              <h3 className="text-[16px] font-bold text-[#0f1111] mb-2">Your Amazon Cart is empty</h3>
              <p className="text-[13px] text-[#565959] mb-4">
                Your shopping cart lives at Amazon. Give it purpose -- fill it with groceries, clothing, entertainment supplies, and more.
              </p>
              {loggedInAs ? (
                <button onClick={onClose} className="text-[#0066c0] text-[13px] hover:underline">Continue shopping</button>
              ) : (
                <button onClick={onSignInClick} className="text-[#0066c0] text-[13px] hover:underline">Sign in to your account</button>
              )}
            </div>
          ) : (
            <div>
              <div className="px-5 py-2 text-[13px] text-[#565959] text-right border-b border-[#ddd]">Price</div>

              {activeItems.map(item => (
                <div key={item.id} className="flex gap-3 px-5 py-4 border-b border-[#eee]">
                  <button onClick={() => onNavigate({ type: 'product', id: item.product_id })}>
                    <img src={item.image_url} alt={item.title} className="w-[100px] h-[100px] object-cover rounded flex-shrink-0 bg-gray-50" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] text-[#0f1111] leading-snug mb-1">{item.title}</h4>
                    {item.in_stock ? (
                      <span className="text-[13px] text-[#007600] font-medium">In Stock</span>
                    ) : (
                      <span className="text-[13px] text-[#cc0c39]">Out of Stock</span>
                    )}
                    {item.prime && (
                      <span className="ml-2 text-[10px] bg-[#232f3e] text-white font-bold px-1 py-0.5 rounded-sm">prime</span>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#888] rounded-lg overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-[28px] h-[26px] flex items-center justify-center bg-[#f0f0f0] hover:bg-[#e0e0e0] border-r border-[#888] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-[36px] h-[26px] flex items-center justify-center text-[13px] bg-white border-x border-[#888]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-[28px] h-[26px] flex items-center justify-center bg-[#f0f0f0] hover:bg-[#e0e0e0] border-l border-[#888] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-[#ddd]">|</span>
                      <button onClick={() => onRemove(item.id)} className="text-[#0066c0] text-[13px] hover:underline flex items-center gap-1 transition-colors">
                        <Trash2 size={12} /> Delete
                      </button>
                      <span className="text-[#ddd]">|</span>
                      <button className="text-[#0066c0] text-[13px] hover:underline flex items-center gap-1 transition-colors">
                        <Heart size={12} /> Save
                      </button>
                    </div>
                    <p className="text-[14px] font-bold text-[#0f1111] mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}

              <div className="px-5 py-3 flex items-center justify-between border-t-2 border-[#ddd]">
                <span className="text-[14px] text-[#0f1111]">
                  Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'}): <span className="font-bold">${subtotal.toFixed(2)}</span>
                </span>
              </div>

              {savedItems.length > 0 && (
                <div className="px-5 py-3 border-t border-[#ddd]">
                  <h3 className="text-[14px] font-bold text-[#0f1111] mb-3">Saved for later</h3>
                  {savedItems.map(item => (
                    <div key={item.id} className="flex gap-3 py-3 border-b border-[#eee]">
                      <img src={item.image_url} alt={item.title} className="w-[60px] h-[60px] object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-[13px] text-[#0f1111]">{item.title}</p>
                        <p className="text-[14px] font-bold text-[#0f1111]">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {activeItems.length > 0 && (
          <div className="px-5 py-5 border-t border-[#ddd] bg-[#fafafa]">
            <div className="text-[13px] text-[#565959] mb-3 flex items-center gap-1">
              <input type="checkbox" id="gift" className="w-3.5 h-3.5 accent-[#007185]" />
              <label htmlFor="gift">This order contains a gift</label>
            </div>
            <div className="text-[14px] text-[#0f1111] mb-3">
              Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'}): <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { onClose(); onNavigate({ type: 'checkout' }); }}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] rounded-lg transition-colors border border-[#a88734] shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_1px_0_0_#a88734]"
            >
              Proceed to checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
