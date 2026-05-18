import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import About from '../components/About';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <div className="bg-[var(--bg)] transition-colors duration-300">
      <Hero />
      <Marquee />
      <About />
      <Testimonials />
    </div>
  );
}
