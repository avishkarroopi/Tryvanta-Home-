import React, { useState } from 'react';
import { Mic, Cpu, Home, Sparkles, Shield, Music, Check, Volume2 } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import { sound } from '../../utils/audio.ts';

export const LaylaSection: React.FC = () => {
  const [activeRoutine, setActiveRoutine] = useState<'Morning' | 'Cinema' | 'Evening' | 'Night'>('Morning');
  const [isArmed, setIsArmed] = useState(true);
  const [isStreaming, setIsStreaming] = useState(true);
  const [climateDeg, setClimateDeg] = useState(24);
  const [aiMessage, setAiMessage] = useState(
    'Good morning. Blinds elevated to 60%, water tank full at 85%, climate stabilized at 24°C.'
  );

  const simulateCommand = (cmd: string, response: string, routine: 'Morning' | 'Cinema' | 'Evening' | 'Night') => {
    sound.playTactileClick('mode');
    setActiveRoutine(routine);
    setAiMessage(response);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      {/* Background Layla Art */}
      <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none">
        <img
          src="/src/assets/images/tryvanta_layla_ai_portrait_1792078173044.jpg"
          alt="Layla AI Holographic Portrait"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/85 to-[#07090e]/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Bullets from Image 4 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            MEET LAYLA, <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              YOUR INTUITIVE COMPANION.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            More than an assistant—a central intelligence that learns your patterns, anticipates
            your needs, and makes your home feel alive.
          </p>

          {/* 3 Distinct Feature Bullets from Image 4 */}
          <div className="space-y-4 pt-2 w-full max-w-md">
            {/* Bullet 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4081]/20 to-[#e11d48]/30 border border-[#ff4081]/40 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 text-[#ff6090]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Voice & Gesture Recognition
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#d946ef]/30 border border-[#8b5cf6]/40 flex items-center justify-center shrink-0">
                <Cpu className="w-6 h-6 text-[#c084fc]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Predictive Automation
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#3b82f6]/30 border border-[#06b6d4]/40 flex items-center justify-center shrink-0">
                <Home className="w-6 h-6 text-[#38bdf8]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Adaptive Ecosystem Control
              </div>
            </div>
          </div>

          {/* Interactive Voice Command Simulator */}
          <div className="w-full max-w-md pt-3">
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Try a Voice Command:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  simulateCommand(
                    'Morning Routine',
                    'Good morning. Blinds elevated to 60%, water tank full at 85%, climate stabilized at 24°C.',
                    'Morning'
                  )
                }
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  activeRoutine === 'Morning'
                    ? 'border-[#ff4081] bg-[#ff4081]/20 text-white'
                    : 'border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                "Morning Routine"
              </button>

              <button
                onClick={() =>
                  simulateCommand(
                    'Cinema Ambience',
                    'Dimming living room lighting to 15%, switching OLED display to Dolby Vision, surround audio engaged.',
                    'Cinema'
                  )
                }
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  activeRoutine === 'Cinema'
                    ? 'border-[#ff4081] bg-[#ff4081]/20 text-white'
                    : 'border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                "Cinema Ambience"
              </button>

              <button
                onClick={() =>
                  simulateCommand(
                    'Night Perimeter',
                    'Perimeter locks secured, AI cameras set to active surveillance, bedtime soothing soundtrack queued.',
                    'Night'
                  )
                }
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  activeRoutine === 'Night'
                    ? 'border-[#ff4081] bg-[#ff4081]/20 text-white'
                    : 'border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                "Night Perimeter"
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Transparent Glass HUD Frame matching Image 4 */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/20 bg-black/60 shadow-2xl p-6 flex flex-col items-center">
            {/* Top HUD Bar */}
            <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="px-3 py-1 rounded-md bg-[#ff4081]/20 border border-[#ff4081]/40 text-xs font-mono font-bold text-[#ff4081] tracking-wider">
                LAYLA ASSISTANT
              </span>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LAYLA : ONLINE</span>
              </div>
            </div>

            {/* Central Holographic Avatar with Cyan & Magenta Neon Rings */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 my-2 flex items-center justify-center">
              {/* Outer Cyan Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-[spin_24s_linear_infinite]" />
              {/* Inner Magenta Ring */}
              <div className="absolute inset-3 rounded-full border-2 border-[#ff4081]/70 animate-[spin_18s_linear_infinite_reverse]" />

              {/* Layla Avatar Frame */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-2 border-white/40 shadow-[0_0_40px_rgba(255,64,129,0.35)]">
                <img
                  src="/src/assets/images/tryvanta_layla_ai_portrait_1792078173044.jpg"
                  alt="Layla Intelligent Companion"
                  className="w-full h-full object-cover object-center scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* 4 Surrounding HUD Widgets matching Image 4 */}
              {/* 1. CLIMATE SET: 24°C (Top Left) */}
              <div className="absolute -top-2 -left-6 sm:-left-8 p-2.5 rounded-2xl bg-[#0a0d14]/90 border border-cyan-500/40 backdrop-blur-md shadow-xl w-36">
                <div className="text-[10px] font-mono text-slate-400 uppercase">CLIMATE SET:</div>
                <div className="text-sm font-bold font-mono text-cyan-400 flex items-center justify-between">
                  <span>{climateDeg}°C</span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>
              </div>

              {/* 2. ROUTINE: MORNING ACTIVATED (Bottom Left) */}
              <div className="absolute -bottom-2 -left-6 sm:-left-8 p-2.5 rounded-2xl bg-[#0a0d14]/90 border border-[#ff4081]/40 backdrop-blur-md shadow-xl w-40">
                <div className="text-[10px] font-mono text-slate-400 uppercase">ROUTINE:</div>
                <div className="text-xs font-bold font-mono text-[#ff4081]">
                  {activeRoutine.toUpperCase()} ACTIVATED
                </div>
              </div>

              {/* 3. SECURITY: ARMED (Top Right) */}
              <div className="absolute -top-2 -right-6 sm:-right-8 p-2.5 rounded-2xl bg-[#0a0d14]/90 border border-emerald-500/40 backdrop-blur-md shadow-xl w-36">
                <div className="text-[10px] font-mono text-slate-400 uppercase">SECURITY:</div>
                <div className="text-sm font-bold font-mono text-emerald-400 flex items-center justify-between">
                  <span>{isArmed ? 'ARMED' : 'DISARMED'}</span>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* 4. ENTERTAINMENT: STREAMING (Bottom Right) */}
              <div className="absolute -bottom-2 -right-6 sm:-right-8 p-2.5 rounded-2xl bg-[#0a0d14]/90 border border-purple-500/40 backdrop-blur-md shadow-xl w-40">
                <div className="text-[10px] font-mono text-slate-400 uppercase">ENTERTAINMENT:</div>
                <div className="text-xs font-bold font-mono text-[#c084fc] flex items-center justify-between">
                  <span>STREAMING</span>
                  <Music className="w-3.5 h-3.5 text-[#c084fc]" />
                </div>
              </div>
            </div>

            {/* Bottom Live Speech Bubble */}
            <div className="w-full mt-4 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 font-mono leading-relaxed text-center">
              <span className="text-[#ff4081] font-bold">Layla: </span>
              "{aiMessage}"
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 4 */}
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
