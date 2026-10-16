import React, { useState } from 'react';
import { Sparkles, ArrowRight, Tv, Radio, Sun, Moon, Volume2, Shield } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import type { ActiveSection } from '../../types/index.ts';
import { sound } from '../../utils/audio.ts';

interface HeroHomeSectionProps {
  onSelectSection: (section: ActiveSection) => void;
  onTriggerImpulse: () => void;
}

export const HeroHomeSection: React.FC<HeroHomeSectionProps> = ({
  onSelectSection,
  onTriggerImpulse,
}) => {
  const [activeMood, setActiveMood] = useState<'Rest' | 'Focus' | 'Scenes' | 'Nature'>('Scenes');
  const [tableTemp, setTableTemp] = useState(24);
  const [lightLevel, setLightLevel] = useState(80);
  const [isTvActive, setIsTvActive] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-16 px-6 lg:px-12 overflow-hidden">
      {/* Background Hero Image with atmospheric scrim */}
      <div className="absolute inset-0 -z-20">
        <img
          src="/src/assets/images/tryvanta_hero_living_room_1792078171456.jpg"
          alt="Tryvanta Luxury Smart Penthouse Living Room"
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.08] transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e]/95 via-[#07090e]/70 to-[#07090e]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-[#07090e]/50" />
      </div>

      {/* Main Split Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
        {/* Left Column: Exact Headline from Image 6 */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono tracking-widest text-slate-300">
            <span className="w-2 h-2 rounded-full bg-[#ff4081] animate-pulse" />
            <span>INTELLIGENT LIVING ECOSYSTEM</span>
          </div>

          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            YOUR HOME, <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#f43f5e] to-[#ec4899] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,64,129,0.45)]">
              BUT MAGICAL.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-200 font-light tracking-wide max-w-xl">
            Seamless Automation. Unfathomable Comfort.
          </p>

          <p className="text-sm text-slate-300 font-normal leading-relaxed max-w-lg">
            Experience an ambient habitat that anticipates your morning ritual, manages your
            resources, and awakens with fluid real-time intelligence.
          </p>

          {/* CTA Button matching Image 6 */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playTactileClick('ripple');
                onTriggerImpulse();
                onSelectSection('ecosystem');
              }}
              className="flex items-center gap-2.5 px-8 py-4 text-sm font-semibold tracking-wide text-slate-900 bg-white rounded-full hover:bg-slate-100 hover:scale-[1.03] active:scale-[0.98] shadow-xl shadow-white/10 transition-all border border-white/80"
            >
              <span>Explore the Magic</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </button>

            <button
              onClick={() => {
                sound.playTactileClick('mode');
                onTriggerImpulse();
              }}
              className="flex items-center gap-2 px-6 py-4 text-sm font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] rounded-full border border-white/15 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#ff4081]" />
              <span>Send Kinetic Pulse</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Living Room HUD Overlays from Image 6 */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          {/* 1. Interactive TV Screen with Layla (Hyderabad, IN 20:30) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4081]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-[#ff4081]" />
                <span className="text-xs font-mono font-medium text-white tracking-widest uppercase">
                  OLED SMART DISPLAY · LAYLA AI
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>HYDERABAD, IN</span>
                <span className="text-white/20">|</span>
                <span className="text-emerald-400 font-semibold">20:30 ONLINE</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#ff4081]/50 shrink-0">
                <img
                  src="/src/assets/images/tryvanta_layla_ai_portrait_1792078173044.jpg"
                  alt="Layla AI Avatar"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  "Welcome home. Evening scene active. Ambient temperature is 24°C."
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 font-mono">
                  <span>Water Tank: 85%</span>
                  <span>·</span>
                  <span>Power: 4.2 kW</span>
                  <span>·</span>
                  <span className="text-emerald-400">Security Armed</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Floating Holographic Console (MRAYAXBXD from Image 6) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Table Controller */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                <span>HOLOGRAPHIC CONSOLE</span>
                <span className="text-cyan-400 font-bold">24°C</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">Ambient Illumination</span>
                  <span className="text-white font-mono">{lightLevel}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={lightLevel}
                  onChange={(e) => setLightLevel(parseInt(e.target.value))}
                  className="w-full accent-[#ff4081] h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-slate-300">Climate Target</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTableTemp((t) => Math.max(18, t - 1))}
                      className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                    >
                      -
                    </button>
                    <span className="font-mono text-white">{tableTemp}°C</span>
                    <button
                      onClick={() => setTableTemp((t) => Math.min(30, t + 1))}
                      className="w-6 h-6 rounded bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Wall Panel "Tryvanta GS" (from Image 6 right wall) */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
                <span>TRYVANTA GS PANEL</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['Scenes', 'Rest', 'Focus', 'Nature'] as const).map((mood) => {
                  const isSelected = activeMood === mood;
                  return (
                    <button
                      key={mood}
                      onClick={() => {
                        sound.playTactileClick('subtle');
                        setActiveMood(mood);
                      }}
                      className={`p-2 rounded-xl text-center text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#ff4081]/30 to-[#06b6d4]/30 border border-[#ff4081] text-white shadow-lg'
                          : 'bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>
              <div className="text-[11px] text-slate-400 mt-3 flex items-center justify-between">
                <span>Synchronized with Layla AI</span>
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 6 */}
      <div className="relative z-10 w-full pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400 tracking-[0.28em] uppercase">
        <div className="flex items-center gap-2">
          <span>BUILD</span>
          <span className="text-[#ff4081]">·</span>
          <span>UNIFY</span>
          <span className="text-[#06b6d4]">·</span>
          <span>EVOLVE</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span className="hover:text-white cursor-pointer" onClick={() => onSelectSection('contact')}>
            Hyd · Bang · Mum
          </span>
          <span>·</span>
          <a href="tel:+917330782606" className="text-white hover:text-[#ff4081] transition-colors">
            +91 7330782606
          </a>
        </div>
      </div>
    </div>
  );
};
