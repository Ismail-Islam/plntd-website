// PLNTD Store Page — main app

const { useState, useEffect, useRef, useMemo } = React;

// ─── Icons ──────────────────────────────────────────────
const Icon = {
  cart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  user: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>,
  pin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>,
  plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  minus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>,
  arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>,
  close: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>,
  bag: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  wifi: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="0.5"/></svg>,
  instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>,
  leaf: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z"/></svg>,
};

// ─── Top Nav ────────────────────────────────────────────
function Nav({ cartCount, onOpenCart }) {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="nav-logo">PLNTD<span className="co">co.</span></a>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#stores">Stores</a>
          <a href="#about">Our story</a>
          <a href="#">Rewards</a>
        </div>
        <div className="nav-actions">
          <button className="nav-icon-btn" aria-label="Account"><Icon.user /></button>
          <button className="btn btn-primary btn-sm" style={{ display: 'none' }}>Order ahead</button>
          <button className="nav-icon-btn" aria-label="Cart" onClick={onOpenCart}>
            <Icon.bag />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ───────────────────────────────────────────────
function Hero({ store }) {
  return (
    <section className="hero">
      <svg className="hero-leaf" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'white' }}>
        <path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z"/>
      </svg>
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Plant-powered · London</div>
            <h1>PLNTD<span className="city">{store.name}.</span></h1>
            <p>Cold-pressed juices, real-fruit smoothies and specialty coffee — made fresh every morning at {store.address}.</p>
          </div>
          <div className="hero-photo">
            <div className="hero-photo-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="9" cy="11" r="2"/>
                <path d="m21 17-5-5-9 9"/>
              </svg>
              <div>Store photo<br/>placeholder</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Store Info Card ────────────────────────────────────
function StoreInfo({ store }) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const today = store.hours[store.todayIndex];

  return (
    <div className="container info-wrap">
      <div className="info-card">
        <div className="info-block">
          <div className="label">Address</div>
          <div className="value">{store.address}</div>
          <div className="sub">{store.addressLine2}</div>
        </div>
        <div className="info-block" style={{ cursor: 'pointer' }} onClick={() => setHoursOpen(!hoursOpen)}>
          <div className="label">Hours today</div>
          <div className="value">
            <span className="status-dot"></span>
            Open · {today.open}–{today.close}
          </div>
          <div className="sub" style={{ color: 'var(--fg-link)', fontWeight: 500 }}>
            {hoursOpen ? 'Hide week ▲' : 'See full week ▼'}
          </div>
          {hoursOpen && (
            <div className="hours-week open" style={{ marginTop: 16 }} onClick={(e) => e.stopPropagation()}>
              {store.hours.map((h, i) => (
                <div key={h.day} className={`hours-row ${i === store.todayIndex ? 'today' : ''}`}>
                  <span>{h.day}</span>
                  <span>{h.open}–{h.close}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="info-block">
          <div className="label">Contact</div>
          <div className="value">{store.phone}</div>
          <div className="sub">@plntdlondon</div>
        </div>
        <div className="cta-stack">
          <a href="#menu" className="btn btn-primary">Order Pickup</a>
          <a href="#menu" className="btn btn-secondary">Order Delivery</a>
        </div>
      </div>

      <div className="features-bar">
        <div className="feature-pill"><Icon.check /> Pickup ready in 5–10 min</div>
        <div className="feature-pill"><Icon.check /> Delivery via Uber Eats &amp; Deliveroo</div>
        <div className="feature-pill"><Icon.check /> Dine-in</div>
        <div className="feature-pill"><Icon.wifi /> Free Wi-Fi</div>
        <div className="feature-pill"><Icon.leaf /> Earn ★ on every drink</div>
      </div>
    </div>
  );
}

// ─── Menu Section ───────────────────────────────────────
function MenuSection({ onAdd }) {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [{ id: 'all', title: 'All' }, ...window.MENU.map(s => ({ id: s.id, title: s.title }))];

  const sections = activeTab === 'all' ? window.MENU : window.MENU.filter(s => s.id === activeTab);

  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="menu-head">
          <div>
            <div className="menu-eyebrow">Available at this store</div>
            <h2>The menu.</h2>
          </div>
          <p className="menu-blurb">Every drink made to order. Swap dairy for oat or almond at no extra cost.</p>
        </div>

        <div className="menu-tabs">
          {tabs.map(t => (
            <button
              key={t.id}
              className={`menu-tab ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >{t.title}</button>
          ))}
        </div>

        {sections.map(section => (
          <div key={section.id} style={{ marginBottom: 56 }}>
            {activeTab === 'all' && (
              <div style={{ marginBottom: 20, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em' }}>{section.title}</h3>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>
                  {section.eyebrow}
                </div>
              </div>
            )}
            <div className="product-grid">
              {section.items.map(item => (
                <ProductCard key={item.name} item={item} onAdd={onAdd} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ item, onAdd }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };
  return (
    <div className="product-card">
      <div className="product-image">
        {item.img
          ? <img src={item.img} alt={item.name} />
          : <div className="product-image-fallback">{item.kind === 'tea' ? 'T' : '☕'.replace('☕', 'C')}</div>
        }
      </div>
      <div className="product-name-row">
        {item.color && <span className="product-dot" style={{ background: item.color }}></span>}
        <span className="product-name">{item.name}</span>
      </div>
      <div className="product-ingr">{item.ingr}</div>
      <div className="product-foot">
        <div className="product-price">£{item.price.toFixed(2)}</div>
        <button className="add-btn" onClick={handleAdd} aria-label={`Add ${item.name}`}>
          {added ? <Icon.check /> : <Icon.plus />}
        </button>
      </div>
    </div>
  );
}

// ─── About this store ──────────────────────────────────
function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid about">
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>
            About this store
          </div>
          <h2>A small green corner of Soho.</h2>
          <p>Tucked behind Greek Street, our Soho bar opens at 7am for the morning rush — flat whites, cold-pressed greens and grab-and-go bowls (coming soon).</p>
          <p>Everything is plant-based. Juices are pressed in-store each morning, smoothies are blended to order, and our beans come from a small London roaster.</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button className="btn btn-secondary">Read our story</button>
            <button className="btn btn-primary">Find us</button>
          </div>
        </div>
        <div className="about-image">
          <Icon.leaf />
          <div className="ph-label">Interior photo placeholder</div>
        </div>
      </div>
    </section>
  );
}

// ─── Map + Location ─────────────────────────────────────
function MapSection({ store }) {
  return (
    <section className="map-section">
      <div className="container">
        <div className="map-wrap">
          <div className="map-info">
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>
              Find us
            </div>
            <h3>{store.fullName}</h3>
            <div className="row">
              <Icon.pin />
              <div className="text">
                <strong>Address</strong>
                {store.address}<br/>{store.addressLine2}
              </div>
            </div>
            <div className="row">
              <Icon.clock />
              <div className="text">
                <strong>Hours</strong>
                Mon–Thu 7:00–19:00<br/>Fri 7:00–20:00<br/>Sat 8:00–20:00 · Sun 9:00–18:00
              </div>
            </div>
            <div className="row">
              <Icon.phone />
              <div className="text">
                <strong>Phone</strong>
                {store.phone}
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: 20 }}>Get directions <Icon.arrow /></button>
          </div>
          <div className="map-canvas">
            <div className="map-pin">
              <div className="map-pin-marker"><Icon.pin /></div>
            </div>
            <div className="map-placeholder-label">Map placeholder</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Other Stores ───────────────────────────────────────
function OtherStores() {
  return (
    <section id="stores" className="other-stores">
      <div className="container">
        <h3>Other PLNTD stores.</h3>
        <div className="stores-grid">
          {window.OTHER_STORES.map(s => (
            <a key={s.name} href="#" className="store-card">
              <div>
                <div className="name">{s.name}</div>
                <div className="area">{s.area}</div>
              </div>
              <Icon.arrow />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brand Bar + Footer ─────────────────────────────────
function BrandBar() {
  return (
    <div className="brand-bar">
      <div className="container brand-bar-inner">
        <div className="brand-bar-tag">
          <svg className="brand-bar-leaf" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z"/>
          </svg>
          <span>EAT CLEAN.</span>
          <span className="divider"></span>
          <span>LIVE GREEN.</span>
          <span className="divider"></span>
          <span>FEEL GOOD.</span>
        </div>
        <div className="brand-bar-social">
          <Icon.instagram />
          <span>@plntdlondon</span>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">PLNTD<span style={{ fontSize: 14, opacity: 0.5 }}> co.</span></div>
            <p>Plant-based juice, smoothie &amp; specialty coffee bar. Made fresh in London since 2024.</p>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href="#stores">All stores</a></li>
              <li><a href="#">Soho</a></li>
              <li><a href="#">Shoreditch</a></li>
              <li><a href="#">Borough</a></li>
              <li><a href="#">Marylebone</a></li>
            </ul>
          </div>
          <div>
            <h4>Order</h4>
            <ul>
              <li><a href="#">Pickup</a></li>
              <li><a href="#">Delivery</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Rewards</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">Our story</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 PLNTD co. All rights reserved.</div>
          <div>Terms · Privacy · Allergens</div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cart Drawer ───────────────────────────────────────
function CartDrawer({ open, onClose, items, onIncrement, onDecrement }) {
  const [method, setMethod] = useState('pickup');
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const fee = method === 'delivery' ? 1.99 : 0;
  const total = subtotal + fee;

  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-head">
          <div>
            <h3>Your order</h3>
            <div className="count">{items.length === 0 ? '0 items' : `${items.reduce((n, i) => n + i.qty, 0)} item${items.reduce((n,i)=>n+i.qty,0)===1?'':'s'}`}</div>
          </div>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close cart"><Icon.close /></button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <Icon.bag />
              <p>Your bag's empty. Add a drink to get started.</p>
            </div>
          ) : items.map(it => (
            <div className="cart-item" key={it.name}>
              <div className="cart-item-img">
                {it.img ? <img src={it.img} alt={it.name} /> : <Icon.bag />}
              </div>
              <div>
                <div className="cart-item-name">
                  {it.color && <span className="product-dot" style={{ background: it.color }}></span>}
                  {it.name}
                </div>
                <div className="cart-item-price">£{(it.price * it.qty).toFixed(2)}</div>
              </div>
              <div className="qty">
                <button onClick={() => onDecrement(it)} aria-label="Decrease"><Icon.minus /></button>
                <span className="n">{it.qty}</span>
                <button onClick={() => onIncrement(it)} aria-label="Increase"><Icon.plus /></button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-method">
              <button className={method === 'pickup' ? 'active' : ''} onClick={() => setMethod('pickup')}>Pickup</button>
              <button className={method === 'delivery' ? 'active' : ''} onClick={() => setMethod('delivery')}>Delivery</button>
            </div>
            <div className="cart-totals">
              <div className="row"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="row"><span>{method === 'delivery' ? 'Delivery fee' : 'Pickup'}</span><span>{method === 'delivery' ? `£${fee.toFixed(2)}` : 'Free'}</span></div>
              <div className="row total"><span>Total</span><span>£{total.toFixed(2)}</span></div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              {method === 'pickup' ? 'Reserve for pickup' : 'Checkout'} <Icon.arrow />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

// ─── App ───────────────────────────────────────────────
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const increment = (item) => setCart(prev => prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
  const decrement = (item) => setCart(prev => prev.flatMap(i => {
    if (i.name !== item.name) return [i];
    if (i.qty === 1) return [];
    return [{ ...i, qty: i.qty - 1 }];
  }));
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="shell">
      <Nav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <Hero store={window.STORE} />
      <StoreInfo store={window.STORE} />
      <MenuSection onAdd={addToCart} />
      <About />
      <MapSection store={window.STORE} />
      <OtherStores />
      <BrandBar />
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrement={increment}
        onDecrement={decrement}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
