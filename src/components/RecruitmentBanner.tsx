import React from 'react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

export const RecruitmentBanner = () => {
  const { recruitment } = useCMS();
  if (!recruitment.bannerUrl) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 mb-16">
      <Link to="/recruit" className="block overflow-hidden rounded-2xl border-2 border-brand-accent/20 hover:border-brand-accent transition-colors shadow-[0_0_30px_rgba(164,5,5,0.15)] hover:shadow-[0_0_50px_rgba(164,5,5,0.3)] group relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-end justify-center pb-8">
          <span className="px-6 py-3 bg-brand-accent text-white font-bold tracking-widest uppercase rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
            Enroll Now
          </span>
        </div>
        <img 
          src={recruitment.bannerUrl} 
          alt="Recruitment" 
          className="w-full h-auto max-h-[600px] object-cover transition-transform duration-700 group-hover:scale-105" 
        />
      </Link>
    </div>
  );
};
