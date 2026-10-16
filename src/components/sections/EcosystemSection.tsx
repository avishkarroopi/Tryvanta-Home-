import React, { useState } from 'react';
import { Bot, Music2, ShieldCheck, Sliders, Check } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import { sound } from '../../utils/audio.ts';

export const EcosystemSection: React.FC = () => {
  const [climateOn, setClimateOn] = useState(true);
  const [climateTemp, setClimateTemp] = useState(24);
  const [securityOn, setSecurityOn] = useState(true);
  const [lightingOn, setLightingOn] = useState(true);
  const [lightingBrightness, setLightingBrightness] = useState(85);
  const [ecosystemOn, setEcosystemOn] = useState(true);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      {/* Background Villa Art */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <img
          src="/src/assets/images/tryvanta_smart_villa_isometric_1792078172623.jpg"
          alt="Tryvanta Smart Villa Isometric"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-[#07090e]/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Bullets from Image 1 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              UNIFY YOUR
            </span>{' '}
            <br />
            ECOSYSTEM.
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            A central intelligence that integrates every device, service, and automation into one
            harmonious flow. Manage your world effortlessly.
          </p>

          {/* 3 Distinct Feature Bullets from Image 1 */}
          <div className="space-y-4 pt-2 w-full max-w-md">
            {/* Bullet 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#3b82f6]/30 border border-[#06b6d4]/40 flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-[#38bdf8]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • AI-Driven Automation (Raicy)
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#ec4899]/30 border border-[#a855f7]/40 flex items-center justify-center shrink-0">
                <Music2 className="w-6 h-6 text-[#f472b6]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Immersive Entertainment (Music & Bro)
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/30 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#fbbf24]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Integrated Security & Cam (Cam)
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Villa with 4 Exact Floating Glass HUD Cards from Image 1 */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          {/* Central 3D Villa Visual Container */}
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/50">
            <img
              src="/src/assets/images/tryvanta_smart_villa_isometric_1792078172623.jpg"
              alt="Tryvanta Smart Villa Ecosystem"
              className="w-full h-auto object-cover rounded-3xl brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* CARD 1: TOP LEFT - CLIMATE */}
            <div className="absolute top-4 left-4 p-3.5 rounded-2xl bg-[#0c0f17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-48 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white tracking-wider">
                  <span className="text-[#ff4081]">T</span>
                  <span>CLIMATE</span>
                </div>
                {/* Toggle Switch */}
                <button
                  onClick={() => {
                    sound.playTactileClick('subtle');
                    setClimateOn(!climateOn);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    climateOn ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      climateOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-white font-mono">{climateTemp}°C</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-amber-500 to-emerald-500">
                  STATUS
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="18"
                max="28"
                value={climateTemp}
                onChange={(e) => setClimateTemp(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-400 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* CARD 2: TOP RIGHT - SECURITY */}
            <div className="absolute top-4 right-4 p-3.5 rounded-2xl bg-[#0c0f17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-48 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white tracking-wider">
                  <span className="text-[#ff4081]">T</span>
                  <span>SECURITY</span>
                </div>
                <button
                  onClick={() => {
                    sound.playTactileClick('subtle');
                    setSecurityOn(!securityOn);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    securityOn ? 'bg-[#ff4081]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      securityOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="text-sm font-bold tracking-wide text-[#ff4081] font-mono mb-2">
                {securityOn ? 'LAYLA ONLINE' : 'STANDBY'}
              </div>

              <div className="w-full h-1.5 bg-[#ff4081]/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ff4081] to-[#f43f5e] w-full animate-pulse" />
              </div>
            </div>

            {/* CARD 3: BOTTOM LEFT - LIGHTING */}
            <div className="absolute bottom-4 left-4 p-3.5 rounded-2xl bg-[#0c0f17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-48 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white tracking-wider">
                  <span className="text-[#ff4081]">T</span>
                  <span>LIGHTING:</span>
                </div>
                <button
                  onClick={() => {
                    sound.playTactileClick('subtle');
                    setLightingOn(!lightingOn);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    lightingOn ? 'bg-[#a855f7]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      lightingOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="text-sm font-bold tracking-wide text-[#c084fc] font-mono mb-2">
                SCENA SETTING
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={lightingBrightness}
                onChange={(e) => setLightingBrightness(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* CARD 4: BOTTOM RIGHT - ECOSYSTEM */}
            <div className="absolute bottom-4 right-4 p-3.5 rounded-2xl bg-[#0c0f17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-48 transition-all hover:scale-105">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-white tracking-wider">
                  <span className="text-[#06b6d4]">T</span>
                  <span>ECOSYSTEM:</span>
                </div>
                <button
                  onClick={() => {
                    sound.playTactileClick('subtle');
                    setEcosystemOn(!ecosystemOn);
                  }}
                  className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
                    ecosystemOn ? 'bg-[#06b6d4]' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      ecosystemOn ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="text-sm font-bold tracking-wide text-[#22d3ee] font-mono mb-2">
                {ecosystemOn ? '100% UNIFIED' : 'SYNCING'}
              </div>

              <div className="w-full h-1.5 bg-[#06b6d4]/30 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#06b6d4] to-[#38bdf8] w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 1 */}
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
