import React from 'react';
import HeroBanner from './HeroBanner';

// Swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroBannerCarousel() {
  const slides = [
    {
      id: 1,
      title: 'Buy. Sell. Connect.',
      subtitle: 'Only for Pillai College Students.',
      description: 'A trusted marketplace for students, by students. Find cheap textbooks, gadgets, and campus essentials.',
      ctaText: 'Explore Now',
      ctaLink: '/categories',
      gradient: 'from-purple-50/90 via-indigo-50/60 to-purple-100/70',
      borderColor: 'border-purple-100/80',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Ace Your Exams!',
      subtitle: 'Buy & Sell Used Textbooks',
      description: 'Get up to 70% off reference books, lab manuals, and notes from seniors in your department.',
      ctaText: 'Find Books',
      ctaLink: '/categories?cat=Books',
      gradient: 'from-blue-50/90 via-indigo-50/60 to-purple-50/70',
      borderColor: 'border-blue-100/80',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Upgrade Your Setup',
      subtitle: 'Student Gadgets & Accessories',
      description: 'Looking for wireless mice, study lamps, or monitors? Grab deals directly from hostel mates.',
      ctaText: 'Shop Electronics',
      ctaLink: '/categories?cat=Electronics',
      gradient: 'from-amber-50/90 via-purple-50/60 to-indigo-50/70',
      borderColor: 'border-amber-100/80',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="relative my-2">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="rounded-3xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <HeroBanner {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-pagination-bullet { background: #6366f1 !important; opacity: 0.4; }
        .swiper-pagination-bullet-active { opacity: 1 !important; width: 20px !important; border-radius: 8px !important; }
      `}</style>
    </div>
  );
}