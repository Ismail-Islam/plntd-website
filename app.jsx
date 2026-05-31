// PLNTD Store Page — main app

const { useState, useEffect, useRef, useMemo } = React;

// Smooth-scroll to the menu section and reflect a clean /menu URL (homepage only).
// On other pages the link falls through to a normal navigation to /menu.
function goMenu(e) {
  const el = document.getElementById('menu');
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.pushState(null, '', '/menu');
  }
}

// Tweak defaults (persisted via EDITMODE markers)
window.TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "darkMode": false
} /*EDITMODE-END*/;

// ─── Icons ──────────────────────────────────────────────
const Icon = {
  cart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  user: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>,
  pin: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>,
  clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  phone: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>,
  plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
  minus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14" /></svg>,
  arrow: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7" /></svg>,
  check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>,
  close: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6" /></svg>,
  bag: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
  wifi: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0" /><path d="M2 8.82a15 15 0 0 1 20 0" /><path d="M8.5 16.05a6 6 0 0 1 7 0" /><circle cx="12" cy="20" r="0.5" /></svg>,
  instagram: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>,
  leaf: () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z" /></svg>,
  eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
};

// ─── Mobile Nav Drawer ──────────────────────────────────
function MobileNav({ open, onClose }) {
  return (
    <>
      <div className={`mobile-nav-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`mobile-nav-drawer ${open ? 'open' : ''}`}>
        <div className="mobile-nav-head">
          <a href="/" className="nav-logo">PLNTD<span className="co">co.</span></a>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close menu"><Icon.close /></button>
        </div>
        <nav className="mobile-nav-links">
          <a href="/menu" onClick={(e) => { goMenu(e); onClose(); }}>Menu</a>
          <a href="/story" onClick={onClose}>Our Story</a>
          <a href="/app" onClick={onClose}>App</a>
        </nav>
      </aside>
    </>);
}

// ─── Top Nav ────────────────────────────────────────────
function Nav({ cartCount, onOpenCart }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo">PLNTD<span className="co">co.</span></a>
          <div className="nav-links">
            <a href="/menu" onClick={goMenu}>Menu</a>
            <a href="/story">Our story</a>
            <a href="/app">App</a>
          </div>
          <div className="nav-actions">
            <button className="nav-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
          </div>
        </div>
      </nav>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>);
}

// ─── Slim Banner + Status Cards ──────────────────────────
function LeafSvg(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z" />
    </svg>);

}

function StoreHeader({ store }) {
  const [hoursOpen, setHoursOpen] = useState(false);
  const today = store.hours[store.todayIndex];
  const now = new Date();
  const hh = now.getHours() + now.getMinutes() / 60;
  const toNum = (t) => { const [h, m] = t.split(':').map(Number); return h + m / 60; };
  const isOpen = today.open && today.close && hh >= toNum(today.open) && hh < toNum(today.close);

  // When closed, find the next opening. Before today's open → opens today;
  // at/after today's close → walk forward to the next day that has hours.
  let nextOpen = today;
  if (!isOpen && (!today.open || hh >= toNum(today.close))) {
    for (let i = 1; i <= store.hours.length; i++) {
      const cand = store.hours[(store.todayIndex + i) % store.hours.length];
      if (cand && cand.open && cand.close) { nextOpen = cand; break; }
    }
  }
  const opensLabel = nextOpen === today ? `Opens ${nextOpen.open}` : `Opens ${nextOpen.day} ${nextOpen.open}`;

  return (
    <>
      <section className="banner">
        <div className="banner-bg"></div>
        <div className="banner-overlay"></div>
        <div className="banner-label">
          <div className="banner-label-inner">
            PLNTD.
            <span className="sub">EAT CLEAN. LIVE GREEN.
</span>
          </div>
        </div>
        <div className="banner-ph-tag"></div>
      </section>

      <div className="container">
        <div className="status-wrap">
          <div className="status-card action" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`PLNTD Co, ${store.address}, ${store.addressLine2}`)}`, '_blank', 'noopener')}>
            <div className="status-icon"><Icon.pin /></div>
            <div className="status-text">
              <div className="top">Location</div>
              <div className="main">{store.address}, {store.addressLine2}</div>
            </div>
            <div className="chev"><Icon.arrow /></div>
          </div>
          <div className="status-card action" onClick={() => setHoursOpen(!hoursOpen)}>
            <div className="status-icon"><Icon.clock /></div>
            <div className="status-text">
              <div className="top">{isOpen ? <span className="open">Store is: open</span> : <span className="closed">Store is: closed</span>}</div>
              <div className="main">{isOpen ? `Until ${today.close}` : opensLabel}</div>
            </div>
            <div className="chev"><Icon.arrow /></div>
          </div>
        </div>
        {hoursOpen && <div style={{ background: 'white', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)', padding: '8px 24px', marginTop: 12 }}>
            {store.hours.map((h, i) =>
          <div key={h.day} className={`hours-row ${i === store.todayIndex ? 'today' : ''}`}>
                <span>{h.day}</span>
                <span>{h.open}–{h.close}</span>
              </div>
          )}
          </div>
        }
      </div>
    </>);

}

// ─── Menu Section ───────────────────────────────────────
// Mini category icons
const CatIcon = {
  all: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6Z" /></svg>,
  smoothies: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10l-1.5 12a2 2 0 0 1-2 1.8h-3a2 2 0 0 1-2-1.8Z" /><path d="M9 4c1-1 5-1 6 0" /><path d="M8 11h8" /></svg>,
  juices: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 6h8l-1 13a2 2 0 0 1-2 1.8h-2a2 2 0 0 1-2-1.8Z" /><path d="M10 6V4h4v2" /></svg>,
  coffee: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" /><path d="M16 10h2a3 3 0 0 1 0 6h-2" /><path d="M7 4v2M10 4v2M13 4v2" /></svg>,
  tea: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4Z" /><path d="M16 11h2a3 3 0 0 1 0 6h-2" /><path d="M9 5c.5-1 0-2-1-2.5M12 5c.5-1 0-2-1-2.5" /></svg>
};

function MenuSection({ onAdd, onView }) {
  const [activeTab, setActiveTab] = useState('all');
  const tabs = [
  { id: 'all', title: 'All drinks', icon: CatIcon.all },
  { id: 'smoothies', title: 'Smoothies', icon: CatIcon.smoothies },
  { id: 'juices', title: 'Fresh Juices', icon: CatIcon.juices },
  { id: 'coffee', title: 'Coffee', icon: CatIcon.coffee },
  { id: 'tea', title: 'Tea', icon: CatIcon.tea }];

  const sections = activeTab === 'all' ? window.MENU : window.MENU.filter((s) => s.id === activeTab);

  return (
    <section id="menu" className="menu-section" style={{ padding: 0 }}>
      <div className="container">
        <div className="menu-layout">
          <div>
            <div className="cat-row">
              {tabs.map((t) => {
                const IconC = t.icon;
                return (
                  <button key={t.id} className={`cat-chip ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                    <span className="ico"><IconC /></span>
                    <span className="label">{t.title}</span>
                  </button>);

              })}
            </div>

            {sections.map((section) =>
            <div key={section.id} className="section-block">
                <div className="section-head">
                  <h3>{section.title}</h3>
                  <div className="eyebrow">{section.eyebrow}</div>
                </div>
                <div className="product-grid">
                  {section.items.map((item) =>
                <ProductCard key={item.name} item={item} onAdd={onAdd} onView={onView} />
                )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}

function ProductCard({ item, onAdd, onView }) {
  const [added, setAdded] = useState(false);
  const cardRef = useRef(null);
  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('in-view');
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            node.classList.add('in-view');
            obs.unobserve(node);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  const handleAdd = () => {
    onAdd(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };
  return (
    <div className="product-card" ref={cardRef}>
      <div className="product-image">
        {item.img ?
        <img src={item.img} alt={item.name} /> :
        <div className="product-image-fallback">{item.kind === 'tea' ? 'T' : 'C'}</div>
        }
      </div>
      <div className="product-body">
        <div className="product-name-row">
          {item.color && <span className="product-dot" style={{ background: item.color }}></span>}
          <span className="product-name">{item.name}</span>
        </div>
        <div className="product-ingr">{item.ingr}</div>
        {item.nutrition &&
        <button className="view-nutrition-btn" onClick={() => onView && onView(item)} aria-label={`View allergens and nutrition for ${item.name}`}>
            View allergens & nutrition <Icon.eye />
          </button>
        }
        <div className="product-foot">
          <div className="product-price">£{item.price.toFixed(2)}</div>
        </div>
      </div>
      {item.nutrition &&
      <button className="product-chevron" onClick={() => onView && onView(item)} aria-label={`View allergens and nutrition for ${item.name}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
      </button>
      }
    </div>);

}

// ─── Order Sidebar (inline) ────────────────────────
function OrderSidebar({ items, onIncrement, onDecrement }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const totalQty = items.reduce((n, i) => n + i.qty, 0);
  return (
    <aside className="order-side">
      <div className="order-head">
        <h3>Order overview</h3>
        <div className="count">{totalQty === 0 ? 'Basket is empty' : `${totalQty} item${totalQty === 1 ? '' : 's'}`}</div>
      </div>
      <div className="order-body">
        {items.length === 0 ?
        <div className="order-empty">
            <Icon.bag />
            <p>Pick something from the menu to start your order.</p>
          </div> :
        items.map((it) =>
        <div className="order-item" key={it.name}>
            <div className="order-item-img">
              {it.img ? <img src={it.img} alt={it.name} /> : <Icon.bag />}
            </div>
            <div>
              <div className="order-item-name">
                {it.color && <span className="product-dot" style={{ background: it.color }}></span>}
                {it.name}
              </div>
              <div className="order-item-price">£{(it.price * it.qty).toFixed(2)}</div>
            </div>
            <div className="order-qty">
              <button onClick={() => onDecrement(it)} aria-label="Decrease"><Icon.minus /></button>
              <span className="n">{it.qty}</span>
              <button onClick={() => onIncrement(it)} aria-label="Increase"><Icon.plus /></button>
            </div>
          </div>
        )}
      </div>
      {items.length > 0 &&
      <div className="order-foot">
          <div className="order-totals">
            <div className="row"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
            <div className="row"><span>Pickup</span><span>Free</span></div>
            <div className="row total"><span>Total</span><span>£{subtotal.toFixed(2)}</span></div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Reserve for pickup <Icon.arrow /></button>
        </div>
      }
    </aside>);

}

// ─── About this store ────────────────────────────────────
function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-grid about">
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>
            About this store
          </div>
          <h2>A small green corner of Leyton.</h2>
          <p>On the High Road, a few minutes from Leyton tube, our bar opens early for the morning rush — flat whites, cold-pressed greens and grab-and-go bowls (coming soon).</p>
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
    </section>);

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
                {store.address}<br />{store.addressLine2}
              </div>
            </div>
            <div className="row">
              <Icon.clock />
              <div className="text">
                <strong>Hours</strong>
                Mon–Thu 7:00–19:00<br />Fri 7:00–20:00<br />Sat 8:00–20:00 · Sun 9:00–18:00
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
    </section>);

}

// ─── Other Stores ───────────────────────────────────────
function OtherStores() {
  return (
    <section id="stores" className="other-stores">
      <div className="container">
        <h3>Other PLNTD stores.</h3>
        <div className="stores-grid">
          {window.OTHER_STORES.map((s) =>
          <a key={s.name} href="#" className="store-card">
              <div>
                <div className="name">{s.name}</div>
                <div className="area">{s.area}</div>
              </div>
              <Icon.arrow />
            </a>
          )}
        </div>
      </div>
    </section>);

}

// ─── Brand Bar + Footer ─────────────────────────────────
function BrandBar() {
  return (
    <div className="brand-bar">
      <div className="container brand-bar-inner">
        <div className="brand-bar-tag">
          <svg className="brand-bar-leaf" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3c-4 0-7 1-9 3-2.5 2.5-4 6-4 11h2c0-2.5.5-4.5 1.5-6.2L13 17l1.4-1.4L7.8 9C9.3 7.7 11.3 7 14 7h.5L9 12.5l1.4 1.4L17.5 6.8c.4 1.4.5 3 .5 5 0 4-1 7-3 9h2c2-2 3-5 3-9 0-3-1-6-3-9Z" />
          </svg>
          <span>EAT CLEAN.</span>
          <span className="divider"></span>
          <span>LIVE GREEN.</span>
          <span className="divider"></span>
          <span>FEEL GOOD.</span>
        </div>
        <a className="brand-bar-social" href="https://www.instagram.com/plntdlondon/" target="_blank" rel="noopener noreferrer" aria-label="PLNTD on Instagram">
          <Icon.instagram />
          <span>@plntdlondon</span>
        </a>
      </div>
    </div>);

}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo">PLNTD<span style={{ fontSize: 14, opacity: 0.5 }}> co.</span></div>
            <p>Juice, smoothie &amp; specialty coffee bar. Made fresh in London since 2026.</p>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`PLNTD Co, ${window.STORE.address}, ${window.STORE.addressLine2}`)}`} target="_blank" rel="noopener noreferrer">{window.STORE.address}, {window.STORE.addressLine2}</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="/story">Our story</a></li>
              <li><a href="/app">App</a></li>
            </ul>
          </div>
          <div>
            <h4>Follow us</h4>
            <ul>
              <li><a href="https://www.instagram.com/plntdlondon/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 PLNTD co. All rights reserved.</div>
          <div>Allergens</div>
        </div>
      </div>
    </footer>);

}

// ─── Cart Drawer ───────────────────────────────────────
function CartDrawer({ open, onClose, items, onIncrement, onDecrement }) {
  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const total = subtotal;

  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-head">
          <div>
            <h3>Your order</h3>
            <div className="count">{items.length === 0 ? '0 items' : `${items.reduce((n, i) => n + i.qty, 0)} item${items.reduce((n, i) => n + i.qty, 0) === 1 ? '' : 's'}`}</div>
          </div>
          <button className="nav-icon-btn" onClick={onClose} aria-label="Close cart"><Icon.close /></button>
        </div>
        <div className="cart-body">
          {items.length === 0 ?
          <div className="cart-empty">
              <Icon.bag />
              <p>Your bag's empty. Add a drink to get started.</p>
            </div> :
          items.map((it) =>
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
          )}
        </div>
        {items.length > 0 &&
        <div className="cart-foot">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--plntd-leaf-soft)', borderRadius: 'var(--radius-input)', marginBottom: 16, fontSize: 13, color: 'var(--plntd-leaf-dark)', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
              <Icon.bag />
              <span>Reserve now — pick up at 144 High Rd, Leyton.</span>
            </div>
            <div className="cart-totals">
              <div className="row"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
              <div className="row"><span>Pickup</span><span>Free</span></div>
              <div className="row total"><span>Total</span><span>£{total.toFixed(2)}</span></div>
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }}>
              Reserve for pickup <Icon.arrow />
            </button>
          </div>
        }
      </aside>
    </>);

}

// ─── Nutrition Modal ─────────────────────────────────────
function NutritionModal({ item, onClose }) {
  const [renderItem, setRenderItem] = useState(item);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (item) {
      setRenderItem(item);
      setHiding(false);
    } else if (renderItem) {
      setHiding(true);
      const tm = setTimeout(() => {setRenderItem(null);setHiding(false);}, 220);
      return () => clearTimeout(tm);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!renderItem) return null;

  const n = renderItem.nutrition || {};
  const pct = Math.max(0, Math.min(1, (n.kcal || 0) / 2000));
  const R = 88,C = 2 * Math.PI * R;
  const dash = C * pct;

  const rows = [
  { label: 'Total energy (kJ)', val: n.kj != null ? `${n.kj} kJ` : null },
  { label: 'Total energy (kcal)', val: n.kcal != null ? `${n.kcal} kcal` : null },
  { label: 'Fat (g)', val: n.fat != null ? `${n.fat} g` : null },
  { label: 'Saturated fat (g)', val: n.satFat != null ? `${n.satFat} g` : null },
  { label: 'Carbohydrate (g)', val: n.carbs != null ? `${n.carbs} g` : null },
  { label: 'Sugars (g)', val: n.sugars != null ? `${n.sugars} g` : null },
  { label: 'Dietary fibre (g)', val: n.fibre != null ? `${n.fibre} g` : null },
  { label: 'Protein (g)', val: n.protein != null ? `${n.protein} g` : null },
  { label: 'Sodium (mg)', val: n.sodium != null ? `${n.sodium} mg` : null }].
  filter((r) => r.val != null);

  return (
    <React.Fragment>
      <div className={`nut-overlay ${hiding ? 'hiding' : ''}`} onClick={onClose}></div>
      <div className={`nut-modal ${hiding ? 'hiding' : ''}`} role="dialog" aria-modal="true" aria-label={`${renderItem.name} allergens and nutrition`}>
        <div className="nut-head">
          <button className="nut-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          </button>
          <div className="nut-title">{renderItem.name}</div>
          <div className="nut-spacer"></div>
        </div>
        <div className="nut-body">
          <div className="nut-section-label">Nutrition information</div>
          <div className="nut-sub">Percent based on a 2,000 calorie diet.</div>
          <div className="nut-ring-wrap">
            <div className="nut-ring">
              <svg viewBox="0 0 200 200">
                <circle className="nut-ring-bg" cx="100" cy="100" r={R} />
                <circle className="nut-ring-fg" cx="100" cy="100" r={R} strokeDasharray={`${dash} ${C}`} />
              </svg>
              <div className="nut-ring-inner">
                <div className="nut-ring-kcal">{n.kcal != null ? `${n.kcal} kcal` : '—'}</div>
                <div className="nut-ring-kj">{n.kj != null ? `${n.kj} kJ` : ''}</div>
              </div>
            </div>
          </div>
          {renderItem.noAddedSugar && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'rgba(63,123,46,0.12)', color: 'var(--plntd-forest-green, #3F7B2E)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                No added sugar
              </span>
            </div>
          )}
          <p className="nut-disclaimer">2,000 calories a day is used for general nutrition advice, but calorie needs vary. All menu items are prepared in an open kitchen that handles allergens and we cannot guarantee they are allergen-free.</p>

          <div className="nut-divider">Allergens</div>
          {renderItem.allergens && renderItem.allergens.length > 0 ?
          renderItem.allergens.map((a) =>
          <div className="nut-row" key={a}>
                <span className="nut-row-label">Contains</span>
                <span className="nut-row-val">{a}</span>
              </div>
          ) :

          <div className="nut-empty">No declared allergens.</div>
          }

          <div className="nut-divider" style={{ marginTop: 32 }}>Nutrition</div>
          {rows.map((r) =>
          <div className="nut-row" key={r.label}>
              <span className="nut-row-label">{r.label}</span>
              <span className="nut-row-val">{r.val}</span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>);

}

// ─── App ───────────────────────────────────────────────
function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [nutritionItem, setNutritionItem] = useState(null);
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  useEffect(() => {
    document.body.classList.toggle('dark', !!t.darkMode);
  }, [t.darkMode]);

  // If loaded at /menu (or #menu), scroll to the menu section once rendered.
  useEffect(() => {
    if (window.location.pathname === '/menu' || window.location.hash === '#menu') {
      requestAnimationFrame(() => document.getElementById('menu')?.scrollIntoView({ block: 'start' }));
    }
  }, []);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) return prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const increment = (item) => setCart((prev) => prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
  const decrement = (item) => setCart((prev) => prev.flatMap((i) => {
    if (i.name !== item.name) return [i];
    if (i.qty === 1) return [];
    return [{ ...i, qty: i.qty - 1 }];
  }));
  const cartCount = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <div className="shell">
      <Nav cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      <StoreHeader store={window.STORE} />
      <MenuSection onAdd={addToCart} onView={setNutritionItem} />
      <BrandBar />
      <Footer />
      {cartCount > 0 &&
      <button className="mobile-cart-bar" onClick={() => setCartOpen(true)}>
          <span><span className="badge">{cartCount}</span>View basket</span>
          <span>£{cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</span>
        </button>
      }
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onIncrement={increment}
        onDecrement={decrement} />
      
      <NutritionModal item={nutritionItem} onClose={() => setNutritionItem(null)} />
      <TweaksPanel title="Tweaks">
        <TweakSection title="Appearance">
          <TweakToggle
            label="Dark mode"
            sub="Swap to the night palette"
            value={t.darkMode}
            onChange={(v) => setTweak('darkMode', v)} />

        </TweakSection>
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);