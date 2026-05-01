export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compare_at_price: number | null;
  image_url: string;
  images: string[];
  category: string;
  subcategory: string;
  brand: string;
  rating: number;
  review_count: number;
  prime: boolean;
  in_stock: boolean;
  stock_count: number;
  featured: boolean;
  best_seller: boolean;
  deal_percentage: number | null;
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
  in_stock: boolean;
  prime: boolean;
  saved_for_later: boolean;
}

export interface Order {
  id: string;
  status: string;
  total: number;
  shipping_address: Record<string, string>;
  payment_method: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  title: string;
  price: number;
  quantity: number;
  image_url: string;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  helpful_count: number;
  created_at: string;
  user_email?: string;
}

export type Page =
  | { type: 'home' }
  | { type: 'search'; query: string; category: string }
  | { type: 'product'; id: string }
  | { type: 'cart' }
  | { type: 'orders' }
  | { type: 'account' }
  | { type: 'category'; category: string }
  | { type: 'deals' }
  | { type: 'checkout' };
