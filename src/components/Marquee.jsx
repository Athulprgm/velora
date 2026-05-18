const items = ['Luxury Crochet', '✦', 'Handmade with Love', '✦', 'Premium Craftsmanship', '✦',
  'Veloura Handmade', '✦', 'Bespoke Artistry', '✦', 'Made in India', '✦'];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 border-y border-[var(--border)] bg-[var(--card)] transition-colors duration-300">
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, var(--card), transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, var(--card), transparent)' }} />
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i}
            className={`inline-block px-6 text-[9px] tracking-[0.4em] uppercase ${item === '✦' ? 'text-[var(--accent)]' : 'text-[var(--text)]'}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
