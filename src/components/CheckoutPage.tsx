import { useState } from 'react';
import { CartItem, Page } from '../types';
import { supabase } from '../lib/supabase';

interface CheckoutPageProps {
  items: CartItem[];
  userId: string;
  onNavigate: (page: Page) => void;
  onOrderComplete: () => void;
}

export default function CheckoutPage({ items, userId, onNavigate, onOrderComplete }: CheckoutPageProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'review' | 'confirm'>('address');
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({ name: '', street: '', city: '', state: '', zip: '', phone: '' });
  const [payment, setPayment] = useState({ cardNumber: '', name: '', expiry: '', cvv: '' });

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal >= 25 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);
    const { data: order } = await supabase.from('orders').insert({
      user_id: userId,
      status: 'processing',
      total,
      shipping_address: address,
      payment_method: `Card ending in ${payment.cardNumber.slice(-4)}`,
    }).select().single();

    if (order) {
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url,
      }));
      await supabase.from('order_items').insert(orderItems);
    }

    setLoading(false);
    setStep('confirm');
    onOrderComplete();
  };

  if (items.length === 0 && step !== 'confirm') {
    return (
      <div className="max-w-[800px] mx-auto px-4 py-16 text-center">
        <h2 className="text-[20px] font-bold text-[#0f1111] mb-3">Your cart is empty</h2>
        <button onClick={() => onNavigate({ type: 'home' })} className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] px-6 rounded-lg border border-[#a88734]">
          Continue shopping
        </button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="max-w-[600px] mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-[#007600] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-[24px] font-bold text-[#0f1111] mb-2">Order placed!</h2>
        <p className="text-[14px] text-[#565959] mb-6">Thank you for your purchase. You will receive a confirmation email shortly.</p>
        <button onClick={() => onNavigate({ type: 'orders' })} className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] px-6 rounded-lg border border-[#a88734] mr-3">
          View your orders
        </button>
        <button onClick={() => onNavigate({ type: 'home' })} className="text-[#007185] text-[13px] hover:underline">
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-[24px] font-bold text-[#0f1111] mb-6">Checkout</h1>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8 text-[13px]">
        {[
          { key: 'address', label: 'Shipping' },
          { key: 'payment', label: 'Payment' },
          { key: 'review', label: 'Review' },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            {i > 0 && <div className={`w-8 h-0.5 ${step === s.key || ['payment','review','address'].indexOf(step) > i ? 'bg-[#007185]' : 'bg-[#ddd]'}`} />}
            <button
              onClick={() => {
                const idx = ['address', 'payment', 'review'].indexOf(step);
                if (i < idx) setStep(s.key as typeof step);
              }}
              className={`px-3 py-1.5 rounded-full ${
                step === s.key ? 'bg-[#007185] text-white' :
                ['payment','review','address'].indexOf(step) > i ? 'bg-[#e6f2f8] text-[#007185]' : 'bg-[#f0f0f0] text-[#565959]'
              }`}
            >
              {s.label}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <div>
          {step === 'address' && (
            <div className="border border-[#ddd] rounded-lg p-5">
              <h2 className="text-[16px] font-bold text-[#0f1111] mb-4">Shipping address</h2>
              <div className="space-y-3">
                <input type="text" placeholder="Full name" value={address.name} onChange={e => setAddress({...address, name: e.target.value})} className="w-full border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                <input type="text" placeholder="Street address" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                  <input type="text" placeholder="State" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="ZIP code" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                  <input type="text" placeholder="Phone" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                </div>
              </div>
              <button onClick={() => setStep('payment')} className="mt-4 bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] px-6 rounded-lg border border-[#a88734]">
                Continue
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="border border-[#ddd] rounded-lg p-5">
              <h2 className="text-[16px] font-bold text-[#0f1111] mb-4">Payment method</h2>
              <div className="space-y-3">
                <input type="text" placeholder="Card number" value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} className="w-full border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                <input type="text" placeholder="Name on card" value={payment.name} onChange={e => setPayment({...payment, name: e.target.value})} className="w-full border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment({...payment, expiry: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                  <input type="text" placeholder="CVV" value={payment.cvv} onChange={e => setPayment({...payment, cvv: e.target.value})} className="border border-[#888] rounded px-3 py-2 text-[13px] focus:outline-none focus:border-[#e77600]" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setStep('address')} className="text-[#007185] text-[13px] hover:underline">Back</button>
                <button onClick={() => setStep('review')} className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] px-6 rounded-lg border border-[#a88734]">
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="border border-[#ddd] rounded-lg p-5">
              <h2 className="text-[16px] font-bold text-[#0f1111] mb-4">Review your order</h2>
              <div className="space-y-3 mb-4">
                <div className="border border-[#eee] rounded p-3">
                  <p className="text-[12px] text-[#565959] mb-1">Shipping address</p>
                  <p className="text-[13px] text-[#0f1111]">{address.name || 'Not provided'}</p>
                  <p className="text-[13px] text-[#0f1111]">{address.street || 'Not provided'}</p>
                  <p className="text-[13px] text-[#0f1111]">{address.city}{address.state ? `, ${address.state}` : ''} {address.zip}</p>
                </div>
                <div className="border border-[#eee] rounded p-3">
                  <p className="text-[12px] text-[#565959] mb-1">Payment method</p>
                  <p className="text-[13px] text-[#0f1111]">Card ending in {payment.cardNumber ? payment.cardNumber.slice(-4) : '----'}</p>
                </div>
                <div className="border border-[#eee] rounded p-3">
                  <p className="text-[12px] text-[#565959] mb-1">Items</p>
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2 py-1">
                      <img src={item.image_url} alt={item.title} className="w-10 h-10 object-cover rounded" />
                      <span className="text-[13px] text-[#0f1111] flex-1">{item.title} x{item.quantity}</span>
                      <span className="text-[13px] font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('payment')} className="text-[#007185] text-[13px] hover:underline">Back</button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="bg-[#ff9900] hover:bg-[#e88a00] text-[#0f1111] text-[13px] font-bold py-[9px] px-6 rounded-lg border border-[#a88734] disabled:opacity-50"
                >
                  {loading ? 'Placing order...' : 'Place your order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="border border-[#ddd] rounded-lg p-4 h-fit">
          <h3 className="text-[16px] font-bold text-[#0f1111] mb-3">Order summary</h3>
          <div className="space-y-2 text-[13px]">
            <div className="flex justify-between"><span className="text-[#565959]">Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-[#565959]">Shipping:</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span className="text-[#565959]">Estimated tax:</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t border-[#ddd] pt-2 mt-2 flex justify-between font-bold text-[16px]">
              <span>Order total:</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
