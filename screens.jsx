// PLNTD App — All Screens (themed)
// Theme object decides whether we render in PLNTD palette or original Starbucks-like one.

const { useState, useEffect } = React;

// ─── DATA ────────────────────────────────────────────────────────────
const SMOOTHIES = [
  { name: 'Green Glow',         ingr: 'apple, spinach, avocado, broccoli, lemon', price: 6.50, color: '#3E7A1E', img: 'assets/drinks/smoothie-green-glow.png' },
  { name: 'Green Machine',      ingr: 'kale, spinach, cucumber, apple, ginger, lemon', price: 6.50, color: '#3E7A1E', img: 'assets/drinks/smoothie-green-machine.png' },
  { name: 'Pineapple Sunrise',  ingr: 'pineapple, banana, apple', price: 6.50, color: '#DF9A00', img: 'assets/drinks/smoothie-pineapple-sunrise.png' },
  { name: 'Blueberry Breeze',   ingr: 'blueberry, banana, almond milk', price: 6.50, color: '#2E0096', img: 'assets/drinks/smoothie-blueberry-breeze.png' },
  { name: 'Strawberry Delight', ingr: 'strawberry, apple', price: 6.50, color: '#C1002F', img: 'assets/drinks/smoothie-strawberry-delight.png' },
  { name: 'Berry Blast',        ingr: 'strawberry, banana, apple', price: 6.50, color: '#CA0039', img: 'assets/drinks/smoothie-berry-blast.png' },
];

const JUICES = [
  { name: 'Garden Green',     ingr: 'cucumber, celery, kale', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-garden-green.png' },
  { name: 'Carrot Glow',      ingr: 'carrot, apple, ginger', price: 6.00, color: '#CA3D00', img: 'assets/drinks/juice-carrot-glow.png' },
  { name: 'Sunrise Carrot',   ingr: 'carrot, orange, lemon', price: 6.00, color: '#CA3D00', img: 'assets/drinks/juice-sunrise-carrot.png' },
  { name: 'Daily Cleanse',    ingr: 'apple, carrot, ginger', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-daily-cleanse.png' },
  { name: 'Citrus Refresher', ingr: 'apple, lemon, mint, ginger', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-citrus-refresher.png' },
  { name: 'Apple Zing',       ingr: 'apple, mint, ginger', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-apple-zing.png' },
  { name: 'Citrus Boost',     ingr: 'orange, lemon, carrot', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-citrus-boost.png' },
  { name: 'Vitamin C Blast',  ingr: 'orange, pineapple, lemon', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-vitamin-c-blast.png' },
  { name: 'Berry Fresh',      ingr: 'strawberry, apple, lemon', price: 6.00, color: '#C1002F', img: 'assets/drinks/juice-berry-fresh.png' },
];

const COFFEES = [
  { name: 'Espresso', price: 2.50 }, { name: 'Americano', price: 3.00 }, { name: 'Cortado', price: 3.00 },
  { name: 'Flat White', price: 3.50 }, { name: 'Cappuccino', price: 3.50 }, { name: 'Latte', price: 3.50 },
  { name: 'Iced Coffee', price: 3.80 },
];

const TEAS = [{ name: 'English Tea', price: 2.00 }, { name: 'Green Tea', price: 2.00 }];

const POINTS = 7;
const TARGET = 10;

// ─── SHARED HELPERS ─────────────────────────────────────────────────
function Label({ t, children, style }) {
  return (
    <div style={{
      fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '10px',
      textTransform: 'uppercase', letterSpacing: '0.25em', color: t.inkMuted, ...style,
    }}>{children}</div>
  );
}

function PrimaryBtn({ t, children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: t.primary, color: '#fff', border: 'none',
      borderRadius: '999px', padding: '14px',
      fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '13px',
      textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer',
      transition: 'background 200ms cubic-bezier(0.22, 1, 0.36, 1)', ...style,
    }}
    onMouseDown={(e) => e.currentTarget.style.opacity = '0.8'}
    onMouseUp={(e) => e.currentTarget.style.opacity = '1'}
    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
    >{children}</button>
  );
}

function GhostBtn({ t, children, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: 'transparent', color: t.leaf,
      border: `1.5px solid ${t.leaf}`,
      borderRadius: '999px', padding: '13px',
      fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '13px',
      textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer', ...style,
    }}>{children}</button>
  );
}

// ─── WELCOME ────────────────────────────────────────────────────────
function WelcomeScreen({ t, onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: t.dark }}>
      <div style={{ padding: '28px 28px 36px' }}>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 900, fontSize: '40px', color: '#fff', letterSpacing: '-0.02em', lineHeight: 1 }}>
          PLNTD
        </div>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: t.onDarkSoft, marginTop: '6px' }}>
          Rewards
        </div>
        {/* Decorative monstera leaf hint */}
        <div style={{ position: 'absolute', top: '70px', right: '-30px', width: '180px', height: '180px', opacity: 0.12, pointerEvents: 'none' }}>
          <svg viewBox="0 0 100 100" width="100%" height="100%">
            <path d="M50 10 Q70 20 75 40 Q80 55 70 65 Q60 75 50 70 Q40 75 30 65 Q20 55 25 40 Q30 20 50 10 Z" fill="#fff"/>
            <line x1="50" y1="10" x2="50" y2="70" stroke={t.dark} strokeWidth="1.5"/>
            <line x1="50" y1="30" x2="68" y2="40" stroke={t.dark} strokeWidth="1"/>
            <line x1="50" y1="30" x2="32" y2="40" stroke={t.dark} strokeWidth="1"/>
            <line x1="50" y1="50" x2="70" y2="55" stroke={t.dark} strokeWidth="1"/>
            <line x1="50" y1="50" x2="30" y2="55" stroke={t.dark} strokeWidth="1"/>
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, background: t.surface, borderRadius: '28px 28px 0 0', padding: '32px 28px 24px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '32px', color: t.ink, lineHeight: 1.1, marginBottom: '28px', letterSpacing: '-0.02em' }}>
          Say hello to fresh juice, smoothies &amp; – yes, free drinks
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          <Feature t={t} color={t.leaf} title="Earn a point with every drink" body="Show your QR code at the till. Staff scans it and the point lands instantly." />
          <Feature t={t} color={t.gold} title="10 points = one free drink" body="Any drink on the menu, on the house. Reset and start collecting again." />
          <Feature t={t} color={t.dark} title="Eat clean. Live green. Feel good." body="Made fresh at PLNTD with real fruit, veg & love." />
        </div>

        <div style={{ marginTop: 'auto' }}>
          <PrimaryBtn t={t} onClick={() => onNavigate('Signup')}>Register now</PrimaryBtn>
          <div style={{ height: '12px' }}></div>
          <button onClick={() => onNavigate('Login')} style={{
            width: '100%', background: t.surface, color: t.ink,
            border: `1.5px solid ${t.border}`, borderRadius: '999px', padding: '14px',
            fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '13px',
            textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer',
          }}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

function Feature({ t, color, title, body }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: color }}></div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: t.ink, marginBottom: '4px' }}>{title}</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px', color: t.inkMuted, lineHeight: 1.5 }}>{body}</div>
      </div>
    </div>
  );
}

// ─── HOME ───────────────────────────────────────────────────────────
function HomeScreen({ t, onNavigate }) {
  const pct = Math.min(POINTS / TARGET, 1) * 100;
  const remaining = TARGET - POINTS;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: t.dark, minHeight: '100%' }}>
      <div style={{ background: t.dark, padding: '20px 24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '26px', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
          Good morning <span style={{ fontWeight: 900 }}>Ismail</span>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => onNavigate('Inbox')}>
            <Icon name="mail" size={22} color="#fff" />
            <div style={{ position: 'absolute', top: '-4px', right: '-6px', width: '16px', height: '16px', borderRadius: '50%', background: t.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: '#fff', fontWeight: 700 }}>1</div>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => onNavigate('Settings')}>
            <Icon name="settings" size={22} color="#fff" />
          </div>
        </div>
      </div>

      <div style={{ background: t.surface, borderRadius: '28px 28px 0 0', flex: 1 }}>
        <div style={{ padding: '28px 24px 0' }}>
          <Label t={t}>Point Balance</Label>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px', marginBottom: '20px' }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '52px', color: t.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>{POINTS}</span>
            <span style={{ fontSize: '28px', color: t.gold }}>★</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '22px', color: t.inkFaint }}>/ {TARGET}</span>
          </div>
          <div style={{ height: '10px', background: t.border, borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
            <div style={{ height: '100%', background: t.leaf, borderRadius: '999px', width: `${pct}%`, transition: 'width 400ms cubic-bezier(0.22, 1, 0.36, 1)' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>0</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>10 = free drink</span>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: t.ink, marginBottom: '20px' }}>
            {remaining} more drinks until your free one.
          </div>
          <GhostBtn t={t} onClick={() => onNavigate('Rewards')}>Explore Rewards</GhostBtn>
        </div>

        <div style={{ height: '1px', background: t.border, margin: '28px 24px' }}></div>

        <div style={{ padding: '0 24px' }}>
          <Label t={t}>Your Store</Label>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '24px', color: t.ink, marginTop: '6px', letterSpacing: '-0.01em' }}>PLNTD · London</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: t.inkMuted, marginTop: '4px', marginBottom: '16px' }}>Eat clean. Live green. Feel good.</div>
          <PrimaryBtn t={t} onClick={() => onNavigate('Scan')}>Show my QR</PrimaryBtn>
        </div>

        <div style={{ marginTop: '32px' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, padding: '0 24px', marginBottom: '16px', letterSpacing: '-0.01em' }}>Featured Smoothies</div>
          <div style={{ display: 'flex', gap: '16px', padding: '0 24px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '6px' }}>
            {SMOOTHIES.slice(0, 5).map(s => (
              <div key={s.name} style={{ flexShrink: 0, width: '110px' }}>
                <div style={{ width: '110px', height: '110px', borderRadius: '50%', background: t.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={s.img} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, flexShrink: 0 }}></div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '12px', color: t.ink, lineHeight: 1.3 }}>{s.name}</div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint, marginTop: '2px', marginLeft: '11px' }}>£{s.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ margin: '28px 24px 0', background: t.cream, borderRadius: '16px', padding: '20px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.leaf, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
            <Icon name="leaf" size={18} color="#fff" />
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '22px', color: t.ink, marginBottom: '6px', letterSpacing: '-0.01em' }}>Eat clean. Live green.</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: t.inkMuted, lineHeight: 1.5 }}>Every smoothie & juice on the menu is made fresh, on-site, with real fruit and veg. No syrups, no shortcuts.</div>
        </div>

        {/* Brand footer bar */}
        <div style={{ background: t.darkDeep, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="leaf" size={11} color="rgba(255,255,255,0.7)" />
            </div>
            <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)' }}>Eat clean · Live green · Feel good</span>
          </div>
          <span style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>@plntdlondon</span>
        </div>
      </div>
    </div>
  );
}

// ─── SCAN ───────────────────────────────────────────────────────────
function ScanScreen({ t, onNavigate, isRedeem }) {
  const [countdown, setCountdown] = useState(42);
  const pct = (countdown / 60) * 100;

  useEffect(() => {
    const timer = setInterval(() => setCountdown(c => c > 0 ? c - 1 : 60), 1000);
    return () => clearInterval(timer);
  }, []);

  function QR() {
    return (
      <div style={{ width: '200px', height: '200px', padding: '12px', background: '#fff', border: `1px solid ${t.border}`, borderRadius: '14px' }}>
        <img src="assets/qr-code.png" alt="Member QR code" style={{ width: '100%', height: '100%', display: 'block', imageRendering: 'pixelated' }} />
      </div>
    );
  }

  return (
    <div style={{ background: t.surface, minHeight: '100%' }}>
      <div style={{ padding: '12px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: t.ink }}>{POINTS}</span>
          <span style={{ color: t.gold, fontSize: '15px' }}>★</span>
          <span style={{ color: t.inkFaint, fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>/ {TARGET}</span>
        </div>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, letterSpacing: '-0.01em' }}>Ismail</span>
        <div style={{ width: '48px' }}></div>
      </div>

      <div style={{ margin: '0 16px', border: `1px solid ${t.border}`, borderRadius: '24px', overflow: 'hidden', background: t.surface }}>
        <div style={{ background: t.dark, padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '16px', background: t.gold, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: '38px', lineHeight: 1 }}>★</span>
            </div>
            <span style={{ position: 'absolute', top: '-12px', left: '-26px', color: t.gold, fontSize: '18px', opacity: 0.6 }}>★</span>
            <span style={{ position: 'absolute', bottom: '-10px', right: '-18px', color: t.gold, fontSize: '14px', opacity: 0.4 }}>★</span>
            <span style={{ position: 'absolute', top: '6px', right: '-30px', color: t.gold, fontSize: '14px', opacity: 0.5 }}>★</span>
            <span style={{ position: 'absolute', bottom: '-14px', left: '-12px', color: t.gold, fontSize: '12px', opacity: 0.3 }}>★</span>
          </div>
          <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.7)', marginTop: '22px' }}>
            Show this to staff
          </div>
        </div>

        <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '24px', color: t.ink, marginBottom: '10px', letterSpacing: '-0.01em' }}>
            {isRedeem ? 'Redeem free drink' : 'Scan to earn'}
          </div>
          <div style={{ border: `1.5px solid ${isRedeem ? t.gold : t.gold}`, background: isRedeem ? t.gold : 'transparent', borderRadius: '999px', padding: '5px 14px', marginBottom: '22px' }}>
            <span style={{ fontFamily: "'Archivo', sans-serif", fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: isRedeem ? '#fff' : t.ink }}>
              {isRedeem ? 'FREE drink' : '1 ★ per drink'}
            </span>
          </div>
          <QR />

          <div style={{ width: '100%', marginTop: '24px' }}>
            <div style={{ height: '6px', background: t.border, borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: t.leaf, borderRadius: '999px', width: `${pct}%`, transition: 'width 1s linear' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>Refreshes in</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: t.inkMuted }}>{countdown}s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REWARDS ────────────────────────────────────────────────────────
const HISTORY = [
  { id: 1, isEarn: true,  label: 'Point earned',        date: '24 May 2026', time: '11:32' },
  { id: 2, isEarn: true,  label: 'Point earned',        date: '22 May 2026', time: '09:14' },
  { id: 3, isEarn: false, label: 'Free drink redeemed', date: '20 May 2026', time: '14:08' },
  { id: 4, isEarn: true,  label: 'Point earned',        date: '18 May 2026', time: '08:55' },
];

function RewardsScreen({ t }) {
  const pct = Math.min(POINTS / TARGET, 1) * 100;
  const remaining = TARGET - POINTS;

  return (
    <div style={{ background: t.surface, minHeight: '100%' }}>
      <div style={{ padding: '16px 24px 20px' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '28px', color: t.ink, letterSpacing: '-0.02em' }}>
          PLNTD <span style={{ fontWeight: 400, fontStyle: 'italic' }}>Rewards</span>
        </div>
      </div>

      <div style={{ height: '1px', background: t.border }}></div>

      <div style={{ padding: '24px 24px 0' }}>
        <Label t={t}>Point Balance</Label>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px', marginBottom: '18px' }}>
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '52px', color: t.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>{POINTS}</span>
          <span style={{ fontSize: '28px', color: t.gold }}>★</span>
        </div>
        <div style={{ height: '10px', background: t.border, borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
          <div style={{ height: '100%', background: t.leaf, borderRadius: '999px', width: `${pct}%` }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>0</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>{TARGET}</span>
        </div>
      </div>

      <div style={{ height: '1px', background: t.border, margin: '28px 0' }}></div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, marginBottom: '14px', letterSpacing: '-0.01em' }}>What you can redeem</div>
        <div style={{ background: t.cream, borderRadius: '16px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 900, fontSize: '32px', color: t.ink, lineHeight: 1 }}>10</span>
              <span style={{ color: t.gold, fontSize: '22px' }}>★</span>
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: t.inkMuted }}>{remaining} to go</span>
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px', color: t.ink, marginBottom: '4px' }}>Any drink on the house</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: t.inkMuted }}>Smoothie, juice, coffee or tea — your pick.</div>
        </div>
      </div>

      <div style={{ height: '1px', background: t.border, margin: '28px 0' }}></div>

      <div style={{ padding: '0 24px' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, marginBottom: '12px', letterSpacing: '-0.01em' }}>Recent activity</div>
        {HISTORY.map(event => (
          <div key={event.id} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: event.isEarn ? t.leafSoft : '#f5ead2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={event.isEarn ? 'plus' : 'gift'} size={18} color={event.isEarn ? t.leaf : t.gold} />
            </div>
            <div style={{ flex: 1, marginLeft: '14px' }}>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: t.ink }}>{event.label}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint, marginTop: '2px' }}>{event.date} · {event.time}</div>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '14px', color: event.isEarn ? t.leaf : t.gold }}>
              {event.isEarn ? '+1' : '-10'} ★
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: '1px', background: t.border, margin: '28px 0' }}></div>

      <div style={{ padding: '0 24px 24px' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, marginBottom: '16px', letterSpacing: '-0.01em' }}>How it works</div>
        {[
          { title: 'Earn 1 point per drink', body: 'Every smoothie, juice or coffee you buy at PLNTD earns 1 point.' },
          { title: '10 points = a free drink', body: 'Once you hit 10 points, your next drink is on us.' },
          { title: 'Your QR is private', body: 'Only PLNTD staff can scan your code. Refreshes every minute.' },
        ].map(faq => (
          <div key={faq.title} style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
            <span style={{ color: t.gold, fontSize: '14px', marginTop: '2px', flexShrink: 0 }}>★</span>
            <div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '14px', color: t.ink, marginBottom: '3px' }}>{faq.title}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: t.inkMuted, lineHeight: 1.5 }}>{faq.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MENU ───────────────────────────────────────────────────────────
const MENU_DATA = [
  { title: 'Smoothies', blurb: 'Some smoothies contain coconut water.', items: SMOOTHIES },
  { title: 'Fresh Juices', items: JUICES },
  { title: 'Coffee & More', items: COFFEES },
  { title: 'Teas', items: TEAS },
];
const TABS = ['Smoothies', 'Fresh Juices', 'Coffee & More', 'Teas'];

function MenuScreen({ t }) {
  const [activeTab, setActiveTab] = useState('Smoothies');
  const section = MENU_DATA.find(s => s.title === activeTab);

  return (
    <div style={{ background: t.surface, minHeight: '100%' }}>
      <div style={{ padding: '16px 24px 8px' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '32px', color: t.ink, letterSpacing: '-0.02em' }}>Menu</div>
        <div style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.25em', color: t.inkMuted, marginTop: '6px' }}>
          EAT CLEAN · LIVE GREEN · FEEL GOOD
        </div>
      </div>

      <div style={{ height: '1px', background: t.border, margin: '14px 0 0' }}></div>

      <div style={{ display: 'flex', gap: '8px', padding: '14px 24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flexShrink: 0, padding: '8px 14px', borderRadius: '999px',
              fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '11px',
              textTransform: 'uppercase', letterSpacing: '0.06em',
              border: `1.5px solid ${activeTab === tab ? t.leaf : t.border}`,
              background: activeTab === tab ? t.leaf : 'transparent',
              color: activeTab === tab ? '#fff' : t.inkMuted,
              cursor: 'pointer', transition: 'all 200ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >{tab}</button>
        ))}
      </div>

      <div style={{ padding: '6px 24px 24px' }}>
        {section?.blurb && (
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: t.inkMuted, marginBottom: '14px', fontStyle: 'italic' }}>{section.blurb}</div>
        )}
        {section?.items.map(item => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', padding: '14px 0', borderBottom: `1px solid ${t.border}` }}>
            <div style={{ width: '68px', height: '68px', borderRadius: '14px', background: t.cream, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '14px', flexShrink: 0, padding: '6px' }}>
              {item.img ? (
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <Icon name="cup" size={24} color={t.inkMuted} />
              )}
            </div>
            <div style={{ flex: 1, paddingRight: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                {item.color && <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.color, flexShrink: 0 }}></div>}
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: t.ink }}>{item.name}</span>
              </div>
              {item.ingr && (
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: t.inkMuted, lineHeight: 1.4 }}>{item.ingr}</div>
              )}
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: t.ink, flexShrink: 0 }}>
              £{item.price.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SETTINGS ───────────────────────────────────────────────────────
function SettingsScreen({ t, onNavigate }) {
  return (
    <div style={{ background: t.surface, minHeight: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${t.border}` }}>
        <div onClick={() => onNavigate('Home')} style={{ padding: '6px', cursor: 'pointer' }}>
          <Icon name="back" size={22} color={t.ink} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '17px', color: t.ink, marginRight: '34px' }}>Settings</div>
      </div>

      <div style={{ padding: '20px 24px', borderBottom: `1px solid ${t.border}` }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '22px', color: t.ink, letterSpacing: '-0.01em' }}>Alex Morgan</div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: t.inkMuted, marginTop: '2px' }}>alex@plntdlondon.com</div>
      </div>

      <SectionHeader t={t}>Account</SectionHeader>
      <RowLink t={t}>Personal Info</RowLink>
      <RowLink t={t}>Change password</RowLink>
      <RowLink t={t}>Email Preferences</RowLink>
      <RowLink t={t}>Transaction Activity</RowLink>

      <SectionHeader t={t}>Security</SectionHeader>
      <RowLink t={t} value="Off">Passcode Lock</RowLink>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderBottom: `1px solid ${t.border}` }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: t.ink }}>Face ID</span>
        <FakeSwitch t={t} value={false} />
      </div>

      <SectionHeader t={t}>Notifications</SectionHeader>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${t.border}` }}>
        <GhostBtn t={t} style={{ padding: '12px' }}>Turn on notifications</GhostBtn>
      </div>

      <SectionHeader t={t}>Help &amp; Policies</SectionHeader>
      <RowLink t={t}>Help</RowLink>
      <RowLink t={t}>Terms of Use</RowLink>
      <RowLink t={t}>Privacy Statement</RowLink>
      <RowLink t={t}>Delete Account</RowLink>

      <div style={{ padding: '24px 24px 32px', borderBottom: `1px solid ${t.border}` }}>
        <GhostBtn t={t} style={{ padding: '12px' }}>Sign out</GhostBtn>
      </div>

      <div style={{ padding: '20px 24px' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: t.inkFaint }}>v1.0.0 · PLNTD</div>
      </div>
    </div>
  );
}

function SectionHeader({ t, children }) {
  return (
    <div style={{ padding: '24px 24px 8px' }}>
      <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px', color: t.ink }}>{children}</div>
    </div>
  );
}

function RowLink({ t, children, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderBottom: `1px solid ${t.border}`, cursor: 'pointer' }}>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: t.ink }}>{children}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {value && <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: t.inkFaint }}>{value}</span>}
        <Icon name="chevron" size={14} color={t.inkFaint} />
      </div>
    </div>
  );
}

function FakeSwitch({ t, value }) {
  const [on, setOn] = useState(value);
  return (
    <div onClick={() => setOn(!on)} style={{
      width: '44px', height: '26px', borderRadius: '999px',
      background: on ? t.leaf : '#d1d1d1', position: 'relative',
      cursor: 'pointer', transition: 'background 200ms cubic-bezier(0.22, 1, 0.36, 1)',
    }}>
      <div style={{
        position: 'absolute', top: '2px', left: on ? '20px' : '2px',
        width: '22px', height: '22px', borderRadius: '50%', background: '#fff',
        transition: 'left 200ms cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
      }}></div>
    </div>
  );
}

// ─── INBOX ──────────────────────────────────────────────────────────
const MESSAGES = [
  { id: '1', category: 'WELCOME', title: 'Welcome to PLNTD Rewards', date: '21 May 2026', unread: true },
  { id: '2', category: 'OFFER',   title: 'Try our new Berry Blast', date: '24 May 2026', unread: false },
];

function InboxScreen({ t, onNavigate }) {
  return (
    <div style={{ background: t.cream, minHeight: '100%' }}>
      <div style={{ background: t.surface, paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div onClick={() => onNavigate('Home')} style={{ padding: '6px', cursor: 'pointer' }}>
            <Icon name="back" size={22} color={t.ink} />
          </div>
          <div style={{ padding: '6px', cursor: 'pointer' }}>
            <Icon name="pencil" size={20} color={t.ink} />
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '36px', color: t.ink, letterSpacing: '-0.02em' }}>Inbox</div>
          <div style={{ marginTop: '10px', height: '3px', width: '48px', background: t.leaf, borderRadius: '999px' }}></div>
        </div>
      </div>

      <div style={{ height: '1px', background: t.border }}></div>

      <div style={{ padding: '16px' }}>
        {MESSAGES.map(msg => (
          <div key={msg.id} style={{ background: t.surface, borderRadius: '16px', padding: '20px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, paddingRight: '14px' }}>
                <Label t={t} style={{ marginBottom: '6px' }}>{msg.category}</Label>
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: '20px', color: t.ink, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{msg.title}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: t.inkFaint, marginTop: '4px' }}>{msg.date}</div>
                <button style={{
                  marginTop: '16px', background: t.leaf, color: '#fff', border: 'none',
                  borderRadius: '999px', padding: '8px 16px',
                  fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: '11px',
                  textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer',
                }}>Read now</button>
              </div>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: t.leafSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="leaf" size={32} color={t.leaf} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ICON SET ───────────────────────────────────────────────────────
function Icon({ name, size = 22, color = 'currentColor' }) {
  const s = size;
  const sw = 1.8;
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home':     return <svg {...props}><path d="M3 12l9-9 9 9"/><path d="M5 10v10h14V10"/></svg>;
    case 'qr':       return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v3M14 17v4h3M17 21h4v-4"/></svg>;
    case 'star':     return <svg {...props} fill={color}><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>;
    case 'star-o':   return <svg {...props}><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z"/></svg>;
    case 'menu':     return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'mail':     return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>;
    case 'settings': return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case 'back':     return <svg {...props}><path d="M15 18l-6-6 6-6"/></svg>;
    case 'chevron':  return <svg {...props}><path d="M9 18l6-6-6-6"/></svg>;
    case 'pencil':   return <svg {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>;
    case 'plus':     return <svg {...props}><path d="M12 5v14M5 12h14"/></svg>;
    case 'gift':     return <svg {...props}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>;
    case 'leaf':     return <svg {...props} fill={color} stroke="none"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6" stroke="#fff" strokeWidth="1.5" fill="none"/></svg>;
    case 'cup':      return <svg {...props}><path d="M6 8h12l-1 12H7z"/><path d="M6 8V5h12v3"/></svg>;
    default: return null;
  }
}

Object.assign(window, {
  WelcomeScreen, HomeScreen, ScanScreen, RewardsScreen, MenuScreen,
  SettingsScreen, InboxScreen, Icon,
});
