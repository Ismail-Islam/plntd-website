// PLNTD menu data — sourced from the design system

window.MENU = [
  {
    id: 'smoothies',
    title: 'Smoothies',
    eyebrow: 'Cold-pressed · Made fresh',
    blurb: 'Thick, fruit-forward blends. Some contain coconut water.',
    items: [
      { name: 'Green Glow',         ingr: 'apple, spinach, avocado, broccoli, lemon', price: 6.50, color: '#3E7A1E', img: 'assets/drinks/smoothie-green-glow.png' },
      { name: 'Green Machine',      ingr: 'kale, spinach, cucumber, apple, ginger, lemon', price: 6.50, color: '#3E7A1E', img: 'assets/drinks/smoothie-green-machine.png' },
      { name: 'Pineapple Sunrise',  ingr: 'pineapple, banana, apple', price: 6.50, color: '#DF9A00', img: 'assets/drinks/smoothie-pineapple-sunrise.png' },
      { name: 'Blueberry Breeze',   ingr: 'blueberry, banana, almond milk', price: 6.50, color: '#2E0096', img: 'assets/drinks/smoothie-blueberry-breeze.png' },
      { name: 'Strawberry Delight', ingr: 'strawberry, apple', price: 6.50, color: '#C1002F', img: 'assets/drinks/smoothie-strawberry-delight.png' },
      { name: 'Berry Blast',        ingr: 'strawberry, banana, apple', price: 6.50, color: '#CA0039', img: 'assets/drinks/smoothie-berry-blast.png' },
    ],
  },
  {
    id: 'juices',
    title: 'Fresh Juices',
    eyebrow: 'Cold-pressed daily',
    blurb: 'Pressed in-store every morning. Nothing from concentrate.',
    items: [
      { name: 'Garden Green',      ingr: 'cucumber, celery, kale', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-garden-green.png' },
      { name: 'Carrot Glow',       ingr: 'carrot, apple, ginger', price: 6.00, color: '#CA3D00', img: 'assets/drinks/juice-carrot-glow.png' },
      { name: 'Sunrise Carrot',    ingr: 'carrot, orange, lemon', price: 6.00, color: '#CA3D00', img: 'assets/drinks/juice-sunrise-carrot.png' },
      { name: 'Daily Cleanse',     ingr: 'apple, carrot, ginger', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-daily-cleanse.png' },
      { name: 'Citrus Refresher',  ingr: 'apple, lemon, mint, ginger', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-citrus-refresher.png' },
      { name: 'Apple Zing',        ingr: 'apple, mint, ginger', price: 6.00, color: '#3E7A1E', img: 'assets/drinks/juice-apple-zing.png' },
      { name: 'Citrus Boost',      ingr: 'orange, lemon, carrot', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-citrus-boost.png' },
      { name: 'Vitamin C Blast',   ingr: 'orange, pineapple, lemon', price: 6.00, color: '#DF9A00', img: 'assets/drinks/juice-vitamin-c-blast.png' },
      { name: 'Berry Fresh',       ingr: 'strawberry, apple, lemon', price: 6.00, color: '#C1002F', img: 'assets/drinks/juice-berry-fresh.png' },
    ],
  },
  {
    id: 'coffee',
    title: 'Coffee & Tea',
    eyebrow: 'Specialty roast',
    blurb: 'Single-origin beans, oat or almond milk on request.',
    items: [
      { name: 'Espresso',   ingr: 'single shot', price: 2.50, kind: 'coffee' },
      { name: 'Americano',  ingr: 'espresso, hot water', price: 3.00, kind: 'coffee' },
      { name: 'Cortado',    ingr: 'espresso, warm milk', price: 3.00, kind: 'coffee' },
      { name: 'Flat White', ingr: 'double ristretto, micro-foam', price: 3.50, kind: 'coffee' },
      { name: 'Cappuccino', ingr: 'espresso, steamed milk, foam', price: 3.50, kind: 'coffee' },
      { name: 'Latte',      ingr: 'espresso, steamed milk', price: 3.50, kind: 'coffee' },
      { name: 'Iced Coffee',ingr: 'cold-brew, ice', price: 3.80, kind: 'coffee' },
      { name: 'English Tea',ingr: 'black tea blend', price: 2.00, kind: 'tea' },
      { name: 'Green Tea',  ingr: 'loose-leaf sencha', price: 2.00, kind: 'tea' },
    ],
  },
];

// Store info — placeholders, ask user to confirm
window.STORE = {
  name: 'Soho',
  fullName: 'PLNTD — Soho',
  address: '12 Greek Street',
  addressLine2: 'Soho, London W1D 4DL',
  phone: '020 7000 0000',
  hours: [
    { day: 'Monday',    open: '07:00', close: '19:00' },
    { day: 'Tuesday',   open: '07:00', close: '19:00' },
    { day: 'Wednesday', open: '07:00', close: '19:00' },
    { day: 'Thursday',  open: '07:00', close: '19:00' },
    { day: 'Friday',    open: '07:00', close: '20:00' },
    { day: 'Saturday',  open: '08:00', close: '20:00' },
    { day: 'Sunday',    open: '09:00', close: '18:00' },
  ],
  todayIndex: new Date().getDay() === 0 ? 6 : new Date().getDay() - 1, // monday-first
  features: ['Pickup', 'Delivery', 'Dine-in', 'Wi-Fi'],
};

window.OTHER_STORES = [
  { name: 'Shoreditch',  area: 'Old Street · 1.8 mi' },
  { name: 'Borough',     area: 'London Bridge · 2.1 mi' },
  { name: 'Marylebone',  area: 'Baker Street · 1.4 mi' },
];
