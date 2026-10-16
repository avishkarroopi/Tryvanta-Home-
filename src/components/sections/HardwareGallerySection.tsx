import React, { useState } from 'react';
import { Tablet, KeyRound, Radio, ToggleLeft, Camera, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { TryvantaLogo } from '../TryvantaLogo.tsx';
import { sound } from '../../utils/audio.ts';

interface HardwareItem {
  id: string;
  name: string;
  badge: string;
  category: string;
  subtitle: string;
  specs: string[];
  protocol: string;
  accentColor: string;
  renderIcon: () => React.ReactNode;
}

export const HardwareGallerySection: React.FC = () => {
  const [selectedId, setSelectedId] = useState('hub');

  const devices: HardwareItem[] = [
    {
      id: 'panel',
      name: 'Tryvanta OS Touch Panel',
      badge: '"OS TOUCH PANEL"',
      category: 'Master Wall Console',
      subtitle: 'Flush-mounted 8-inch ultra-retina OLED console with zero latency and haptic glass feedback.',
      specs: ['8.0" OLED 120Hz', 'Matter & Zigbee 3.0 Border Router', 'Dual Far-Field Microphones'],
      protocol: 'Matter · Thread · Wi-Fi 6',
      accentColor: '#06b6d4',
      renderIcon: () => (
        <div className="w-16 h-12 rounded-lg bg-black border-2 border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center p-1 relative">
          <div className="w-6 h-6 rounded-full border border-cyan-300 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <span className="absolute bottom-1 text-[7px] font-mono text-cyan-300">OS PANEL</span>
        </div>
      ),
    },
    {
      id: 'lock',
      name: 'Biometric Smart Lock',
      badge: '"BIOMETRIC LOCK"',
      category: 'Perimeter Security',
      subtitle: 'Aerospace-grade zinc alloy biometric handle with 3D capacitive sensor and hidden backlit keypad.',
      specs: ['0.2s Fingerprint Unlocking', '3D Capacitive Matrix', 'Anti-Tamper Sensor & Encrypted Chip'],
      protocol: 'Zigbee 3.0 · BLE 5.2',
      accentColor: '#38bdf8',
      renderIcon: () => (
        <div className="w-10 h-20 rounded-xl bg-slate-950 border-2 border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex flex-col items-center justify-between p-1.5">
          <div className="w-4 h-4 rounded-full border border-sky-300 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
          </div>
          <div className="grid grid-cols-2 gap-0.5 text-[6px] font-mono text-sky-200">
            <span>1</span><span>2</span><span>3</span><span>4</span>
          </div>
          <div className="w-7 h-1.5 bg-sky-500 rounded-full" />
        </div>
      ),
    },
    {
      id: 'hub',
      name: 'The Brain: Control Hub',
      badge: '"CORE HUB"',
      category: 'Central Intelligence Engine',
      subtitle: 'Precision machined anodized aluminum cylinder orchestrating offline intelligence and cloud sync.',
      specs: ['Quad-Core NPU Neural Engine', 'Local Offline Automation Runtime', '360° Illuminated Status Ring'],
      protocol: 'Multi-Protocol Bridge (Matter/Thread/Zigbee)',
      accentColor: '#ff4081',
      renderIcon: () => (
        <div className="w-16 h-16 rounded-full bg-[#0d0914] border-2 border-[#ff4081] shadow-[0_0_30px_rgba(255,64,129,0.5)] flex flex-col items-center justify-center relative">
          <TryvantaLogo size={22} />
          <span className="text-[7px] font-mono text-[#ff4081] font-bold mt-0.5">CORE HUB</span>
        </div>
      ),
    },
    {
      id: 'switches',
      name: 'Smart Switch Board',
      badge: '"TOUCH SWITCHES"',
      category: 'Capacitive Glass Gang',
      subtitle: 'Crystal glass capacitive touch buttons with customizable dual-state backlighting and micro-dimming.',
      specs: ['High-Purity Tempered Glass', '16M Color RGB Backlight', 'Overload & Surge Protection'],
      protocol: 'Zigbee 3.0 Mesh',
      accentColor: '#c084fc',
      renderIcon: () => (
        <div className="w-18 h-14 rounded-xl bg-slate-950 border-2 border-purple-400/80 shadow-[0_0_20px_rgba(192,132,252,0.4)] flex items-center justify-center gap-1.5 p-1">
          <div className="w-3.5 h-7 rounded border border-purple-400/40 bg-purple-500/20" />
          <div className="w-3.5 h-7 rounded border border-purple-400/40 bg-purple-500/20" />
          <div className="w-3.5 h-7 rounded border border-purple-400/40 bg-purple-500/20" />
        </div>
      ),
    },
    {
      id: 'camera',
      name: 'AI-Powered Security Camera',
      badge: '"AI SECURITY CAM"',
      category: 'Optical Surveillance',
      subtitle: '4K HDR motorized pan-tilt camera with on-device vehicle and human tracking and night color vision.',
      specs: ['4K HDR Sony Starvis Sensor', '360° Pan & 90° Tilt', 'On-Device Neural Object Tracking'],
      protocol: 'Wi-Fi 6 · Ethernet PoE',
      accentColor: '#f59e0b',
      renderIcon: () => (
        <div className="w-18 h-12 rounded-2xl bg-slate-950 border-2 border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-1 p-1">
          <div className="w-7 h-7 rounded-full bg-black border border-amber-400 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
          </div>
          <span className="text-[7px] font-mono text-amber-300">4K AI</span>
        </div>
      ),
    },
  ];

  const selectedDevice = devices.find((d) => d.id === selectedId) || devices[2];

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 lg:px-12 overflow-hidden bg-[#07090e]/85">
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-6">
        {/* Left Column: Exact Headline and Bullets from Image 5 */}
        <div className="lg:col-span-5 flex flex-col items-start space-y-6">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
            EXPLORE THE <br />
            HARDWARE. <br />
            <span className="bg-gradient-to-r from-[#ff4081] via-[#e91e63] to-[#ff6090] bg-clip-text text-transparent">
              THE TRYVANTA GALLERY.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-lg">
            Immerse yourself in precision-engineered smart devices. Seamlessly designed, intensely
            capable, and built to bring the magic of automation to every corner of your home.
          </p>

          {/* 3 Distinct Feature Bullets from Image 5 */}
          <div className="space-y-4 pt-2 w-full max-w-md">
            {/* Bullet 1 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-pink-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff4081]/20 to-[#e11d48]/30 border border-[#ff4081]/40 flex items-center justify-center shrink-0">
                <TryvantaLogo size={24} />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Smart Control Hubs & Panels
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-amber-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#ef4444]/30 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                <Radio className="w-6 h-6 text-[#f59e0b]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Automation Controllers & Sensors
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#a855f7]/20 to-[#3b82f6]/30 border border-[#a855f7]/40 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6 text-[#c084fc]" />
              </div>
              <div className="text-base font-medium text-white tracking-wide">
                • Security & Utility Devices
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Interactive Floating Hardware Cards from Image 5 */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Top 5 Devices Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {devices.map((device) => {
              const isSelected = selectedId === device.id;
              return (
                <button
                  key={device.id}
                  onClick={() => {
                    sound.playTactileClick('subtle');
                    setSelectedId(device.id);
                  }}
                  className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-32 relative overflow-hidden ${
                    isSelected
                      ? 'border-white/40 bg-white/[0.1] shadow-2xl scale-[1.02]'
                      : 'border-white/10 bg-[#0d1017]/80 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[11px] font-mono text-[#ff4081] font-semibold">
                      {device.badge}
                    </span>
                    {device.renderIcon()}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white tracking-tight line-clamp-1">
                      {device.name}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">
                      {device.category}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Device Deep-Dive Showcase Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 flex items-center justify-center w-28 h-28 rounded-2xl bg-white/[0.04] border border-white/10">
              {selectedDevice.renderIcon()}
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#ff4081] font-bold">
                  {selectedDevice.badge}
                </span>
                <span className="text-xs text-slate-400">·</span>
                <span className="text-xs font-mono text-emerald-400">In Production</span>
              </div>

              <h3 className="text-2xl font-bold text-white tracking-tight">
                {selectedDevice.name}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedDevice.subtitle}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedDevice.specs.map((spec, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 text-[11px] font-mono text-slate-300"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="text-[11px] font-mono text-cyan-400 pt-1">
                Protocols: {selectedDevice.protocol}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tagline matching Image 5 */}
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
