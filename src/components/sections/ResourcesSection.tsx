import React, { useState } from 'react';
import { Droplet, Zap, Gauge, Play, Pause } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import { sound } from '../../utils/audio.ts';

export const ResourcesSection: React.FC = () => {
  const [tankLevel, setTankLevel] = useState(85);
  const [isMotorRunning, setIsMotorRunning] = useState(false);
  const [powerKw, setPowerKw] = useState(4.2);

  const toggleMotor = () => {
    sound.playTactileClick('ripple');
    setIsMotorRunning((prev) => {
      const next = !prev;
      if (next) {
        setPowerKw(5.8);
      } else {
        setPowerKw(4.2);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      {/* Background Water & Energy Art */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <img
          src="/src/assets/images/tryvanta_resource_water_energy_1792078172990.jpg"
          alt="Tryvanta Water & Energy Management"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-[#07090e]/80 to-[#07090e]/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Bullets from Image 3 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            INTELLIGENT <br />
            RESOURCES. <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              EFFORTLESS SAVINGS.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            Your home optimizes every drop and watt. Intelligent sensors manage your water supply
            automatically, while real-time consumption dashboards ensure peak efficiency.
          </p>

          {/* 3 Distinct Feature Bullets from Image 3 */}
          <div className="space-y-4 pt-2 w-full max-w-md">
            {/* Bullet 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4]/20 to-[#3b82f6]/30 border border-[#06b6d4]/40 flex items-center justify-center shrink-0">
                <Droplet className="w-6 h-6 text-[#22d3ee]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Automated Water Motors & Tank Sensors
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/30 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Real-time Power & Electricity Display
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ec4899]/20 to-[#8b5cf6]/30 border border-[#ec4899]/40 flex items-center justify-center shrink-0">
                <Gauge className="w-6 h-6 text-[#f472b6]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Proactive Consumption Insights
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Water & Energy Cutaway Dashboard from Image 3 */}
        <div className="lg:col-span-7 relative flex items-center justify-center">
          <div className="relative w-full max-w-xl rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black/60">
            <img
              src="/src/assets/images/tryvanta_resource_water_energy_1792078172990.jpg"
              alt="Tryvanta Smart Water and Power Management"
              className="w-full h-auto object-cover rounded-3xl brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

            {/* 1. TANK LEVEL OVERLAY (from Image 3 top) */}
            <div className="absolute top-4 left-6 p-3 rounded-2xl bg-[#0b0e17]/85 border border-cyan-500/30 backdrop-blur-md shadow-2xl w-44">
              <div className="text-[11px] font-mono text-cyan-400 font-semibold mb-1 flex items-center justify-between">
                <span>TANK LEVEL:</span>
                <span className="text-white">{tankLevel}%</span>
              </div>
              {/* Animated Water Fill Gauge */}
              <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${tankLevel}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
                <span>Ultrasonic Sensor</span>
                <span className="text-emerald-400">Live Sync</span>
              </div>
            </div>

            {/* 2. ENERGY CONSUMPTION (from Image 3 top right) */}
            <div className="absolute top-4 right-6 p-3 rounded-2xl bg-[#0b0e17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-44">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-0.5">
                ENERGY CONSUMPTION:
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400">
                {powerKw.toFixed(1)} kW
              </div>
            </div>

            {/* 3. DAILY USE -15% (from Image 3 mid right) */}
            <div className="absolute top-24 right-6 p-3 rounded-2xl bg-[#0b0e17]/85 border border-emerald-500/30 backdrop-blur-md shadow-2xl w-44">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-300">DAILY USE:</span>
                <span className="text-base font-bold font-mono text-emerald-400">-15% ↘</span>
              </div>
              {/* Mini Wave SVG graph */}
              <svg className="w-full h-7 mt-1" viewBox="0 0 100 25" fill="none">
                <path
                  d="M0 18 Q 20 5, 40 14 T 70 8 T 100 20"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>
            </div>

            {/* 4. WATER LEVEL & MOTOR STATUS (from Image 3 lower right) */}
            <div className="absolute bottom-24 right-6 p-3 rounded-2xl bg-[#0b0e17]/85 border border-white/20 backdrop-blur-md shadow-2xl w-44 space-y-2">
              <div>
                <div className="text-[10px] font-mono text-slate-400">WATER LEVEL:</div>
                <div className="text-sm font-bold font-mono text-[#06b6d4]">OPTIMAL</div>
              </div>
              <div className="border-t border-white/10 pt-1">
                <div className="text-[10px] font-mono text-slate-400">MOTOR STATUS:</div>
                <div
                  className={`text-sm font-bold font-mono ${
                    isMotorRunning ? 'text-amber-400 animate-pulse' : 'text-slate-300'
                  }`}
                >
                  {isMotorRunning ? 'PUMPING ACTIVE' : 'IDLE'}
                </div>
              </div>
            </div>

            {/* 5. WATER MOTOR CONTROLLER (from Image 3 lower left) */}
            <div className="absolute bottom-4 left-6 p-3.5 rounded-2xl bg-[#0b0e17]/90 border border-[#ff4081]/40 backdrop-blur-md shadow-2xl w-60">
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[11px] font-mono font-medium text-slate-300">
                  WATER MOTOR:
                </div>
                <button
                  onClick={toggleMotor}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff4081]/20 text-[#ff4081] hover:bg-[#ff4081]/30 transition-colors flex items-center gap-1"
                >
                  {isMotorRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isMotorRunning ? 'STOP' : 'TEST PUMP'}</span>
                </button>
              </div>

              <div className="text-xs font-mono font-bold text-[#ff4081] flex items-center gap-1.5">
                <span>T</span>
                <span>{isMotorRunning ? 'AUTO ON (REFILLING)' : 'AUTO OFF (TANK FULL)'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 3 */}
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
