import { Star, Plus, Minus, Heart, Share2, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Product, CartItem, Review, Page } from '../types';
import { supabase } from '../lib/supabase';

function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          size={size}
          className={star <= Math.round(rating) ? 'text-[#de7921] fill-[#de7921]' : 'text-[#e0e0e0]'}
        />
      ))}
    </div>
  );
}

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  onNavigate: (page: Page) => void;
  userId: string | null;
}

export default function ProductDetail({ product, onAddToCart, onNavigate, userId }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*, user_email:auth.users!reviews_user_id_fkey(email)')
      .eq('product_id', product.id)
      .order('created_at', { ascending: false });
    if (data) setReviews(data as Review[]);
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      product_id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image_url,
      quantity,
      in_stock: product.in_stock,
      prime: product.prime,
      saved_for_later: false,
    });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    await supabase.from('reviews').insert({
      product_id: product.id,
      user_id: userId,
      rating: reviewRating,
      title: reviewTitle,
      body: reviewBody,
    });
    setReviewTitle('');
    setReviewBody('');
    setReviewRating(5);
    setShowReviewForm(false);
    loadReviews();
  };

  const dollars = Math.floor(product.price);
  const cents = ((product.price % 1) * 100).toFixed(0).padStart(2, '0');
  const allImages = [product.image_url, ...product.images.filter(u => u !== product.image_url)];

  return (
    <div className="bg-white max-w-[1500px] mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-[#007185] mb-3 flex-wrap">
        <button onClick={() => onNavigate({ type: 'home' })} className="hover:underline">Home</button>
        <ChevronRight size={10} className="text-[#565959]" />
        <button onClick={() => onNavigate({ type: 'category', category: product.category })} className="hover:underline">{product.category}</button>
        <ChevronRight size={10} className="text-[#565959]" />
        <span className="text-[#565959]">{product.subcategory}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr_300px] gap-6">
        {/* Images */}
        <div>
          <div className="border border-[#ddd] rounded-lg overflow-hidden mb-3">
            <img
              src={allImages[selectedImage] || product.image_url}
              alt={product.title}
              className="w-full h-[300px] object-contain bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`w-[50px] h-[50px] border rounded overflow-hidden ${
                  i === selectedImage ? 'border-[#007185] border-2' : 'border-[#ddd]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-[21px] font-medium text-[#0f1111] leading-snug mb-2">{product.title}</h1>
          {product.brand && (
            <a href="#" className="text-[13px] text-[#007185] hover:underline block mb-2">
              Visit the {product.brand} Store
            </a>
          )}
          <div className="flex items-center gap-2 mb-2">
            <button className="flex items-center gap-1">
              <StarRating rating={product.rating} size={16} />
            </button>
            <span className="text-[13px] text-[#007185]">{product.review_count.toLocaleString()} ratings</span>
          </div>
          {product.deal_percentage && (
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#cc0c39] text-white text-[13px] font-bold px-2 py-0.5 rounded-sm">
                {product.deal_percentage}% off
              </span>
            </div>
          )}
          <div className="border-t border-b border-[#ddd] py-2 mb-3">
            <div className="flex items-baseline gap-0.5">
              <span className="text-[13px] text-[#565959] align-top">$</span>
              <span className="text-[28px] text-[#0f1111] font-bold leading-none">{dollars}</span>
              <span className="text-[13px] text-[#0f1111] font-bold align-top">{cents}</span>
            </div>
            {product.compare_at_price && (
              <p className="text-[13px] text-[#565959] mt-0.5">
                List Price: <span className="line-through">${product.compare_at_price.toFixed(2)}</span>
              </p>
            )}
          </div>
          {product.prime && (
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-[12px] bg-[#232f3e] text-white font-bold px-2 py-0.5 rounded-sm">prime</span>
              <span className="text-[13px] text-[#007185]">FREE Returns</span>
            </div>
          )}
          <p className="text-[14px] text-[#0f1111] leading-relaxed mb-4">{product.description}</p>
          <div className="space-y-2 mb-4 text-[13px]">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-[#565959]" />
              <span className="text-[#007600] font-medium">FREE delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-[#565959]" />
              <span className="text-[#007185]">Free 30-day returns</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-[#565959]" />
              <span className="text-[#007185]">Secure transaction</span>
            </div>
          </div>
          {product.in_stock ? (
            <span className="text-[16px] text-[#007600] font-bold block mb-3">In Stock</span>
          ) : (
            <span className="text-[16px] text-[#cc0c39] font-bold block mb-3">Out of Stock</span>
          )}

          {/* Reviews section */}
          <div className="border-t border-[#ddd] pt-4 mt-4">
            <h3 className="text-[16px] font-bold text-[#0f1111] mb-3">Customer Reviews</h3>
            {userId && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-[13px] text-[#007185] hover:underline mb-3 block"
              >
                Write a customer review
              </button>
            )}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="border border-[#ddd] rounded-lg p-4 mb-4 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-[#0f1111]">Overall rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(s => (
                      <button key={s} type="button" onClick={() => setReviewRating(s)}>
                        <Star size={20} className={s <= reviewRating ? 'text-[#de7921] fill-[#de7921]' : 'text-[#e0e0e0]'} />
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Add a headline"
                  value={reviewTitle}
                  onChange={e => setReviewTitle(e.target.value)}
                  className="w-full border border-[#888] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#e77600]"
                  required
                />
                <textarea
                  placeholder="Write your review here"
                  value={reviewBody}
                  onChange={e => setReviewBody(e.target.value)}
                  className="w-full border border-[#888] rounded px-3 py-2 text-sm h-24 resize-none focus:outline-none focus:border-[#e77600]"
                  required
                />
                <button type="submit" className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[6px] px-4 rounded-lg transition-colors border border-[#a88734]">
                  Submit
                </button>
              </form>
            )}
            {reviews.length === 0 ? (
              <p className="text-[13px] text-[#565959]">No reviews yet. Be the first to review this product.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-[#eee] pb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-[14px] font-bold text-[#0f1111] mb-0.5">{review.title}</p>
                    <p className="text-[13px] text-[#565959] mb-1">
                      Reviewed on {new Date(review.created_at).toLocaleDateString()}
                    </p>
                    {review.body && <p className="text-[13px] text-[#0f1111]">{review.body}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Buy box */}
        <div>
          <div className="border border-[#ddd] rounded-lg p-4">
            <div className="flex items-baseline gap-0.5 mb-2">
              <span className="text-[13px] text-[#565959] align-top">$</span>
              <span className="text-[24px] text-[#0f1111] font-bold leading-none">{dollars}</span>
              <span className="text-[13px] text-[#0f1111] font-bold align-top">{cents}</span>
            </div>
            {product.prime && (
              <p className="text-[13px] mb-2">
                <span className="text-[12px] bg-[#232f3e] text-white font-bold px-1.5 py-0.5 rounded-sm mr-1">prime</span>
                FREE delivery <span className="font-bold">Tomorrow</span>
              </p>
            )}
            <div className="mb-3">
              {product.in_stock ? (
                <span className="text-[14px] text-[#007600] font-medium">In Stock</span>
              ) : (
                <span className="text-[14px] text-[#cc0c39] font-medium">Out of Stock</span>
              )}
            </div>
            {product.in_stock && (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[13px] text-[#0f1111]">Qty:</span>
                  <div className="flex items-center border border-[#888] rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] hover:bg-[#e0e0e0] border-r border-[#888]"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center text-[13px] bg-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock_count, quantity + 1))}
                      className="w-8 h-8 flex items-center justify-center bg-[#f0f0f0] hover:bg-[#e0e0e0] border-l border-[#888]"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] font-medium py-[7px] rounded-lg transition-colors border border-[#a88734] shadow-[0_1px_0_0_rgba(255,255,255,0.4)_inset,0_1px_0_0_#a88734] mb-2"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#ff9900] hover:bg-[#e88a00] text-[#0f1111] text-[13px] font-medium py-[7px] rounded-lg transition-colors border border-[#a88734] mb-2"
                >
                  Buy Now
                </button>
              </>
            )}
            <div className="border-t border-[#ddd] mt-3 pt-3 space-y-2 text-[12px] text-[#565959]">
              <div className="flex justify-between">
                <span>Ships from</span><span className="text-[#0f1111]">Amazon.com</span>
              </div>
              <div className="flex justify-between">
                <span>Sold by</span><span className="text-[#0f1111]">Amazon.com</span>
              </div>
              <div className="flex justify-between">
                <span>Returns</span><span className="text-[#007185]">30-day returns</span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span><span className="text-[#007185]">Secure transaction</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#ddd]">
              <button className="flex items-center gap-1 text-[#007185] text-[13px] hover:underline">
                <Heart size={14} /> Add to List
              </button>
              <button className="flex items-center gap-1 text-[#007185] text-[13px] hover:underline">
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
