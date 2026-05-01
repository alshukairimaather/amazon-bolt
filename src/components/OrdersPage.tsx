import { Package, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Order, OrderItem, Page } from '../types';
import { supabase } from '../lib/supabase';

interface OrdersPageProps {
  userId: string;
  onNavigate: (page: Page) => void;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'text-[#cc0c39]',
  processing: 'text-[#cc7a00]',
  shipped: 'text-[#007185]',
  delivered: 'text-[#007600]',
  cancelled: 'text-[#565959]',
};

export default function OrdersPage({ userId, onNavigate }: OrdersPageProps) {
  const [orders, setOrders] = useState<(Order & { items: OrderItem[] })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [userId]);

  const loadOrders = async () => {
    setLoading(true);
    const { data: orderData } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (orderData && orderData.length > 0) {
      const orderIds = orderData.map(o => o.id);
      const { data: itemsData } = await supabase
        .from('order_items')
        .select('*')
        .in('order_id', orderIds);

      const itemsByOrder = (itemsData || []).reduce<Record<string, OrderItem[]>>((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = [];
        acc[item.order_id].push(item);
        return acc;
      }, {});

      setOrders(orderData.map(o => ({ ...o, items: itemsByOrder[o.id] || [] })));
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="max-w-[1000px] mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20 text-[#565959]">
          <Package size={20} className="animate-bounce mr-2" /> Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      <h1 className="text-[24px] font-bold text-[#0f1111] mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto text-[#ddd] mb-4" />
          <h3 className="text-[16px] font-bold text-[#0f1111] mb-2">No orders yet</h3>
          <p className="text-[13px] text-[#565959] mb-4">Looks like you have not placed any orders.</p>
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] px-6 rounded-lg transition-colors border border-[#a88734]"
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-[#ddd] rounded-lg overflow-hidden">
              <div className="bg-[#fafafa] px-5 py-3 flex items-center justify-between text-[13px] border-b border-[#ddd]">
                <div className="flex items-center gap-6 flex-wrap">
                  <div>
                    <span className="text-[#565959]">ORDER PLACED</span>
                    <p className="text-[#0f1111] font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-[#565959]">TOTAL</span>
                    <p className="text-[#0f1111] font-medium">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <span className="text-[#565959]">SHIP TO</span>
                    <p className="text-[#0f1111] font-medium">Korea</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[#565959]">ORDER # </span>
                  <span className="text-[#007185]">{order.id.slice(0, 8).toUpperCase()}</span>
                </div>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[14px] font-bold capitalize ${STATUS_COLORS[order.status] || 'text-[#0f1111]'}`}>
                    {order.status}
                  </span>
                  {order.status === 'delivered' && (
                    <span className="text-[13px] text-[#565959]">
                      Delivered on {new Date(order.updated_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 py-2">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.title} className="w-[60px] h-[60px] object-cover rounded" />
                    )}
                    <div className="flex-1">
                      <p className="text-[13px] text-[#0f1111]">{item.title}</p>
                      <p className="text-[13px] text-[#0f1111]">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <button className="flex items-center gap-1 text-[#007185] text-[13px] hover:underline flex-shrink-0">
                      Track package <ChevronRight size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
