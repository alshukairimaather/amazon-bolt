import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ShopSection from './components/ShopSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import OrdersPage from './components/OrdersPage';
import CheckoutPage from './components/CheckoutPage';
import AccountPage from './components/AccountPage';
import { CartItem, Product, Page } from './types';
import { supabase } from './lib/supabase';

const GUEST_CART_KEY = 'amazon_guest_cart';

function loadGuestCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(GUEST_CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveGuestCart(items: CartItem[]) {
  localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(loadGuestCart);
  const [loggedInAs, setLoggedInAs] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [page, setPage] = useState<Page>({ type: 'home' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setLoggedInAs(session.user.email!);
        setUserId(session.user.id);
        loadDbCart(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setLoggedInAs(session.user.email!);
        setUserId(session.user.id);
      } else {
        setLoggedInAs(null);
        setUserId(null);
        setCartItems(loadGuestCart());
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load products
  useEffect(() => {
    loadProducts();
  }, [page]);

  const loadProducts = async () => {
    setLoading(true);
    let query = supabase.from('products').select('*');

    if (page.type === 'search' && page.query) {
      query = query.or(`title.ilike.%${page.query}%,description.ilike.%${page.query}%,category.ilike.%${page.query}%,brand.ilike.%${page.query}%`);
      if (page.category) {
        query = query.eq('category', page.category);
      }
    } else if (page.type === 'category') {
      query = query.eq('category', page.category);
    } else if (page.type === 'deals') {
      query = query.not('deal_percentage', 'is', null);
    } else if (page.type === 'home') {
      query = query.eq('featured', true);
    }

    const { data } = await query.order('rating', { ascending: false });
    if (data) setProducts(data as Product[]);
    setLoading(false);
  };

  // Cart persistence
  useEffect(() => {
    if (!userId) {
      saveGuestCart(cartItems);
    }
  }, [cartItems, userId]);

  const loadDbCart = async (uid: string) => {
    const { data } = await supabase
      .from('cart_items')
      .select('*, products(title, price, image_url, in_stock, prime)')
      .eq('user_id', uid)
      .eq('saved_for_later', false);

    if (data) {
      const items: CartItem[] = data.map(row => ({
        id: row.id,
        product_id: row.product_id,
        title: row.products.title,
        price: row.products.price,
        image_url: row.products.image_url,
        quantity: row.quantity,
        in_stock: row.products.in_stock,
        prime: row.products.prime,
        saved_for_later: row.saved_for_later,
      }));
      // Merge guest cart
      const guestCart = loadGuestCart();
      if (guestCart.length > 0) {
        for (const guestItem of guestCart) {
          const existing = items.find(i => i.product_id === guestItem.product_id);
          if (existing) {
            await supabase.from('cart_items').update({ quantity: existing.quantity + guestItem.quantity }).eq('id', existing.id);
          } else {
            await supabase.from('cart_items').insert({
              user_id: uid,
              product_id: guestItem.product_id,
              quantity: guestItem.quantity,
            });
          }
        }
        localStorage.removeItem(GUEST_CART_KEY);
        loadDbCart(uid);
        return;
      }
      setCartItems(items);
    }
  };

  const syncCartToDb = async (items: CartItem[]) => {
    if (!userId) return;
    // Upsert approach: delete all then re-insert
    await supabase.from('cart_items').delete().eq('user_id', userId);
    if (items.length > 0) {
      await supabase.from('cart_items').insert(
        items.map(item => ({
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          saved_for_later: item.saved_for_later,
        }))
      );
    }
  };

  const handleAddToCart = useCallback(async (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product_id === item.product_id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(i => i.product_id === item.product_id ? { ...i, quantity: i.quantity + item.quantity } : i);
      } else {
        next = [...prev, item];
      }
      if (userId) syncCartToDb(next);
      return next;
    });
    setShowCart(true);
  }, [userId]);

  const handleUpdateQuantity = useCallback((id: string, qty: number) => {
    setCartItems(prev => {
      const next = prev.map(i => i.id === id ? { ...i, quantity: qty } : i);
      if (userId) syncCartToDb(next);
      return next;
    });
  }, [userId]);

  const handleRemove = useCallback((id: string) => {
    setCartItems(prev => {
      const next = prev.filter(i => i.id !== id);
      if (userId) syncCartToDb(next);
      return next;
    });
  }, [userId]);

  const handleLogin = (email: string) => {
    setLoggedInAs(email);
    setShowLogin(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setLoggedInAs(null);
    setUserId(null);
    setCartItems(loadGuestCart());
  };

  const handleNavigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string, category: string) => {
    handleNavigate({ type: 'search', query, category });
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    if (userId) syncCartToDb([]);
  };

  // Find single product for detail page
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  useEffect(() => {
    if (page.type === 'product') {
      supabase.from('products').select('*').eq('id', page.id).single().then(({ data }) => {
        if (data) setDetailProduct(data as Product);
      });
    }
  }, [page]);

  const renderPage = () => {
    if (loading && page.type !== 'checkout' && page.type !== 'account' && page.type !== 'orders') {
      return (
        <div className="flex items-center justify-center py-20 text-[#565959] text-sm">
          Loading...
        </div>
      );
    }

    switch (page.type) {
      case 'product':
        if (!detailProduct) return <div className="text-center py-20 text-[#565959]">Product not found</div>;
        return <ProductDetail product={detailProduct} onAddToCart={handleAddToCart} onNavigate={handleNavigate} userId={userId} />;

      case 'search':
        return (
          <div className="bg-[#e3e6e6] min-h-screen">
            <ShopSection
              products={products}
              onAddToCart={handleAddToCart}
              onNavigate={handleNavigate}
              title={page.category ? `Results in ${page.category}` : `Results for "${page.query}"`}
            />
          </div>
        );

      case 'category':
        return (
          <div className="bg-[#e3e6e6] min-h-screen">
            <ShopSection products={products} onAddToCart={handleAddToCart} onNavigate={handleNavigate} title={page.category} />
          </div>
        );

      case 'deals':
        return (
          <div className="bg-[#e3e6e6] min-h-screen">
            <ShopSection products={products} onAddToCart={handleAddToCart} onNavigate={handleNavigate} title="Today's Deals" />
          </div>
        );

      case 'orders':
        if (!userId) { setShowLogin(true); return null; }
        return <OrdersPage userId={userId} onNavigate={handleNavigate} />;

      case 'account':
        if (!loggedInAs) { setShowLogin(true); return null; }
        return <AccountPage loggedInAs={loggedInAs} onNavigate={handleNavigate} onSignOut={handleSignOut} />;

      case 'checkout':
        if (!userId) { setShowLogin(true); return null; }
        return <CheckoutPage items={cartItems} userId={userId} onNavigate={handleNavigate} onOrderComplete={handleOrderComplete} />;

      default:
        return (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <ShopSection products={products} onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e3e6e6]">
      <Navbar
        cartItems={cartItems}
        loggedInAs={loggedInAs}
        currentPage={page}
        onSignInClick={() => setShowLogin(true)}
        onCartClick={() => setShowCart(true)}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
        onSignOut={handleSignOut}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer />

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}

      {showCart && (
        <CartDrawer
          items={cartItems}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={handleUpdateQuantity}
          onRemove={handleRemove}
          onSignInClick={() => { setShowCart(false); setShowLogin(true); }}
          onNavigate={handleNavigate}
          loggedInAs={loggedInAs}
        />
      )}
    </div>
  );
}
