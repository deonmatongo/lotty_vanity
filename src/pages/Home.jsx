import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import MagazineFeature from '@/components/home/MagazineFeature';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <MagazineFeature />
      <Newsletter />
    </main>
  );
}