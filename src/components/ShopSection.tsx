import { Star, Plus } from 'lucide-react';
import { Product, CartItem, Page } from '../types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={13}
          className={star <= Math.round(rating) ? 'text-[#de7921] fill-[#de7921]' : 'text-[#e0e0e0]'}
        />
      ))}
    </div>
  );
}

function PriceDisplay({ price }: { price: number }) {
  const dollars = Math.floor(price);
  const cents = ((price % 1) * 100).toFixed(0).padStart(2, '0');
  return (
    <div className="flex items-baseline gap-0">
      <span className="text-[13px] text-[#565959] align-top">$</span>
      <span className="text-[20px] text-[#0f1111] font-bold leading-none">{dollars}</span>
      <span className="text-[13px] text-[#0f1111] font-bold align-top">{cents}</span>
    </div>
  );
}

interface ShopSectionProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onNavigate: (page: Page) => void;
  title?: string;
}

export default function ShopSection({ products, onAddToCart, onNavigate, title }: ShopSectionProps) {
  const handleAdd = (product: Product) => {
    onAddToCart({
      id: product.id,
      product_id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity: 1,
      in_stock: product.in_stock,
      prime: product.prime,
      saved_for_later: false,
    });
  };

  return (
    <div className="bg-[#e3e6e6] px-4 pb-6">
      <div className="max-w-[1500px] mx-auto">
        {title && <h2 className="text-[20px] font-bold text-[#0f1111] mb-3">{title}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px]">
          {products.map(product => (
            <div key={product.id} className="bg-white p-[20px] flex flex-col">
              <h3 className="text-[17px] font-bold text-[#0f1111] mb-2 leading-tight">{product.title}</h3>
              <button
                onClick={() => onNavigate({ type: 'product', id: product.id })}
                className="block mb-3 text-left"
              >
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-[260px] object-cover rounded-sm hover:opacity-90 transition-opacity"
                />
              </button>
              <div className="mt-auto">
                {product.deal_percentage && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-sm">
                      {product.deal_percentage}% off
                    </span>
                    {product.compare_at_price && (
                      <span className="text-[12px] text-[#565959] line-through">
                        List: ${product.compare_at_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
                <PriceDisplay price={product.price} />
                <div className="flex items-center gap-1.5 mb-1.5">
                  <button
                    onClick={() => onNavigate({ type: 'product', id: product.id })}
                    className="flex items-center gap-1"
                  >
                    <StarRating rating={product.rating} />
                  </button>
                  <span className="text-[13px] text-[#007185]">{product.review_count.toLocaleString()}</span>
                </div>
                {product.prime && (
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[11px] bg-[#232f3e] text-white font-bold px-1.5 py-0.5 rounded-sm">prime</span>
                    <span className="text-[12px] text-[#565959]">FREE Delivery</span>
                  </div>
                )}
                {product.in_stock ? (
                  <span className="text-[13px] text-[#007600] font-medium block mb-2">In Stock</span>
                ) : (
                  <span className="text-[13px] text-[#cc0c39] block mb-2">Out of Stock</span>
                )}
                <button
                  onClick={() => handleAdd(product)}
                  disabled={!product.in_stock}
                  className="w-full flex items-center justify-center gap-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[6px] px-4 rounded-[20px] transition-colors border border-[#fcd200] shadow-[0_1px_0_0_#fcd200] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} />
                  Add to Cart
                </button>
                <button
                  onClick={() => onNavigate({ type: 'product', id: product.id })}
                  className="block text-[13px] text-[#007185] hover:text-[#c45500] mt-2 hover:underline w-full text-left"
                >
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
