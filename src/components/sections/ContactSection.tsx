import React, { useState } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import { sound } from '../../utils/audio.ts';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    spaceDetails: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTactileClick('ripple');

    // Create a pre-filled WhatsApp message URL to +91 9398017435
    const text = encodeURIComponent(
      `Hello Tryvanta Team,\n\nI am interested in Tryvanta Home Automation.\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSpace Details: ${formData.spaceDetails}`
    );
    const waUrl = `https://wa.me/919398017435?text=${text}`;

    setIsSubmitted(true);
    // Open WhatsApp in new tab for direct frictionless dispatch
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Contact Details from Image 7 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            READY TO <br />
            EXPERIENCE <br />
            THE MAGIC? <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              CONNECT WITH THE FUTURE.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            Step into a world of unfathomable comfort. Reach out to our team to design a
            personalized Tryvanta Home ecosystem that perfectly adapts to your life.
          </p>

          {/* 3 Contact Details from Image 7 & User's message */}
          <div className="space-y-4 pt-2 w-full max-w-md">
            {/* Email */}
            <a
              href="mailto:avishkar@tryvanta.in"
              className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/40 hover:bg-white/[0.08] transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4081]/20 to-[#e11d48]/30 border border-[#ff4081]/40 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-[#ff6090]" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Direct Email</div>
                <div className="text-base font-medium text-white group-hover:text-[#ff4081] transition-colors">
                  • avishkar@tryvanta.in
                </div>
              </div>
            </a>

            {/* Phone & WhatsApp */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:+917330782606"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-sky-500/40 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/30 border border-sky-400/40 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">Call Us</div>
                  <div className="text-xs font-semibold text-white group-hover:text-sky-300">
                    +91 7330782606
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/919398017435"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-400/40 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400">WhatsApp</div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                    +91 9398017435
                  </div>
                </div>
              </a>
            </div>

            {/* Schedule Demo */}
            <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/30 border border-amber-400/40 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Experience Center</div>
                <div className="text-base font-medium text-white">
                  • Schedule a Personalized Demo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Floating Glass Tablet Form matching Image 7 */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div className="w-full max-w-lg p-8 sm:p-10 rounded-3xl bg-black/60 border-2 border-cyan-400/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff4081]" />
                <span className="text-xs font-mono tracking-widest text-white uppercase font-bold">
                  TRYVANTA SMART INTAKE
                </span>
              </div>
              <div className="text-[10px] font-mono text-cyan-400">SECURE 256-BIT</div>
            </div>

            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Magic Initiated!</h3>
                <p className="text-sm text-slate-300 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our engineering lead (Avishkar) will review your
                  space requirements and reach out on WhatsApp/Call shortly.
                </p>
                <div className="pt-4">
                  <a
                    href="https://wa.me/919398017435"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open WhatsApp Chat Directly</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ff4081] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ff4081] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ff4081] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 uppercase">
                    Tell us about your space...
                  </label>
                  <textarea
                    rows={3}
                    placeholder="4 BHK Luxury Villa in Hyderabad, looking for automated water management, AC climate sync, and biometric access..."
                    value={formData.spaceDetails}
                    onChange={(e) => setFormData({ ...formData, spaceDetails: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/15 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#ff4081] transition-colors text-sm resize-none"
                  />
                </div>

                {/* Exact Button matching Image 7: INITIATE MAGIC [T] */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#d81b60] text-white font-bold text-sm tracking-widest uppercase hover:brightness-110 shadow-xl shadow-pink-500/25 active:scale-98 transition-all flex items-center justify-center gap-3 border border-pink-400/40"
                >
                  <span>INITIATE MAGIC</span>
                  <TryvantaLogo size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 7 */}
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
