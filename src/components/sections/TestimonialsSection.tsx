import React from 'react';
import { Star, ShieldCheck, Heart } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      stars: 5,
      quote:
        'It literally feels like the house knows what I need before I do. Absolute magic.',
      author: 'Rahul M.',
      role: 'Luxury Villa Owner, Jubilee Hills',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: 5,
      quote:
        'The transition to Tryvanta was flawless. The ambient lighting moods alone changed my life!',
      author: 'Priya S.',
      role: 'Architectural Designer, Whitefield',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    },
    {
      stars: 5,
      quote:
        'Layla handles my security, AC, and water motors perfectly. Uncompromised peace of mind.',
      author: 'Vikram T.',
      role: 'Tech Executive, Cyberabad',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Google Rating Badge from Image 2 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            THE MAGIC IS REAL. <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              LOVED BY THOUSANDS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            Don't just take our word for it. Experience the unfathomable comfort and trust that has
            earned Tryvanta Home a stellar reputation across thousands of homes.
          </p>

          {/* Glowing Google 4.9 Rating Card matching Image 2 */}
          <div className="w-full max-w-md p-6 rounded-3xl bg-gradient-to-br from-[#0c101a]/90 to-[#07090e]/95 border-2 border-pink-500/40 shadow-[0_0_35px_rgba(255,64,129,0.25)] backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-3">
              <span className="text-5xl font-black font-mono text-white tracking-tighter">
                4.9
              </span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-cyan-400 fill-cyan-400/20 stroke-cyan-400 stroke-[1.5]"
                  />
                ))}
              </div>
            </div>

            <div className="text-lg font-bold text-white tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>{' '}
              <span className="text-white">4.9 Rated</span>
            </div>

            <div className="text-xs text-slate-400 mt-1">
              Based on over 2,500+ Reviews
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <span>Google TRUSTED ECOSYSTEM</span>
              </div>
              <TryvantaLogo size={18} />
            </div>
          </div>
        </div>

        {/* Right Column: 3 Cascading Glass Testimonial Cards from Image 2 */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl hover:border-pink-500/40 transition-all hover:scale-[1.01] group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white tracking-wide">
                    {rev.author}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/20 overflow-hidden flex items-center justify-center text-xs font-bold text-white">
                    {rev.author.charAt(0)}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed italic">
                "{rev.quote}"
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{rev.role}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Resident</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tagline matching Image 2 */}
      <div className="relative z-10 w-full pt-6 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono text-slate-400 tracking-[0.28em] uppercase">
        <div className="flex items-center gap-2">
          <span>BUILD</span>
          <span className="text-[#ff4081]">·</span>
          <span>UNIFY</span>
          <span className="text-[#06b6d4]">·</span>
          <span>EVOLVE</span>
        </div>
        <TryvantaLogo size={24} />
      </div>
    </div>
  );
};
