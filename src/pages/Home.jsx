import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import About from '../components/About';
import BestSellers from '../components/BestSellers';
import Testimonials from '../components/Testimonials';
import InstagramGallery from '../components/InstagramGallery';

export default function Home() {
  return (
    <div className="bg-[var(--bg)] transition-colors duration-300">
      <Hero />
      <FeaturedCategories />
      <About />
      <BestSellers />
      <Testimonials />
      <InstagramGallery />
    </div>
  );
}
