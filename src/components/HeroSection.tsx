import { useState, useEffect } from 'react';
import { Page } from '../types';

interface HeroSectionProps {
  onNavigate: (page: Page) => void;
}

const CAROUSEL_ITEMS = [
  {
    bg: 'from-[#0d1117] via-[#1a2332] to-[#232f3e]',
    title: 'Great deals on electronics',
    subtitle: 'Shop the latest in tech with fast, free delivery',
    image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: { type: 'category' as const, category: 'Electronics' },
  },
  {
    bg: 'from-[#1a1a2e] via-[#16213e] to-[#0f3460]',
    title: 'New arrivals in fashion',
    subtitle: 'Discover trending styles for every season',
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: { type: 'category' as const, category: 'Clothing' },
  },
  {
    bg: 'from-[#1b4332] via-[#2d6a4f] to-[#40916c]',
    title: 'Home & Kitchen essentials',
    subtitle: 'Everything you need to make your house a home',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
    link: { type: 'category' as const, category: 'Home & Kitchen' },
  },
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const item = CAROUSEL_ITEMS[current];

  return (
    <div className="relative">
      <div
        className={`relative bg-gradient-to-r ${item.bg} transition-all duration-700`}
        style={{ height: '400px' }}
      >
        <div className="max-w-[1500px] mx-auto h-full flex items-center px-6 md:px-12">
          <div className="flex-1 z-10">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 leading-tight">{item.title}</h2>
            <p className="text-gray-300 text-base md:text-lg mb-5 max-w-md">{item.subtitle}</p>
            <button
              onClick={() => onNavigate(item.link)}
              className="inline-block bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-medium px-6 py-2.5 rounded-lg text-sm transition-colors border border-[#fcd200]"
            >
              Shop now
            </button>
          </div>
          <div className="hidden md:block flex-1">
            <img
              src={item.image}
              alt={item.title}
              className="w-full max-w-md ml-auto rounded-lg shadow-2xl object-cover"
              style={{ maxHeight: '300px' }}
            />
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {CAROUSEL_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-[#e3e6e6] pointer-events-none" />
      <div className="bg-[#e3e6e6] pb-2 pt-0.5">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="bg-white text-[13px] text-[#0f1111] py-2.5 px-4 rounded text-center">
            You are on amazon.com. You can also shop on Amazon Korea for millions of products with fast local delivery.{' '}
            <a href="#" className="text-[#007185] hover:text-[#c45500] hover:underline">Click here to go to amazon.kr</a>
          </div>
        </div>
      </div>
    </div>
  );
}
