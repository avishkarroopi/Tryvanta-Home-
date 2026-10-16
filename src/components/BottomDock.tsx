import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sliders, Palette, Layers, Compass } from 'lucide-react';
import type { SceneMode, ColorTheme, WebGLSettings } from '../types/index.ts';
import { sound } from '../utils/audio.ts';

interface BottomDockProps {
  settings: WebGLSettings;
  onUpdateSettings: (partial: Partial<WebGLSettings>) => void;
  onTriggerImpulse: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  settings,
  onUpdateSettings,
  onTriggerImpulse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'mode' | 'physics' | 'palette'>('mode');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'h' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const modes: { id: SceneMode; label: string; desc: string }[] = [
    { id: 'fluid', label: 'Ecosystem Vortex', desc: 'Central living energy ribbons & knot' },
    { id: 'lattice', label: 'Cyber Lattice', desc: 'Riemannian dual geodesic shell' },
    { id: 'silk', label: 'Fluid Membrane', desc: 'Undulating sinusoidal mesh wave' },
    { id: 'monolith', label: 'Core Hub 3D', desc: 'Tryvanta hardware brain replica' },
  ];

  const themes: { id: ColorTheme; label: string; color: string }[] = [
    { id: 'obsidian', label: 'Tryvanta Neon', color: '#ff4081' },
    { id: 'prismatic', label: 'Cyber Amber', color: '#f59e0b' },
    { id: 'aurora', label: 'Aurora Cyan', color: '#06b6d4' },
    { id: 'amethyst', label: 'Violet Aura', color: '#c084fc' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-[840px] flex flex-col items-center pointer-events-none transition-all duration-300">
      {/* Collapse Handle */}
      <button
        onClick={() => {
          sound.playTactileClick('subtle');
          setIsCollapsed(!isCollapsed);
        }}
        className="pointer-events-auto mb-1.5 flex items-center gap-1.5 px-3 py-1 text-[11px] tracking-wider uppercase text-slate-300 hover:text-white bg-[#0c0f17]/90 border border-white/15 rounded-full transition-colors shadow-lg shadow-black/50"
        title="Toggle Zen Mode (Press H)"
      >
        {isCollapsed ? (
          <>
            <ChevronUp className="w-3.5 h-3.5 text-[#ff4081]" />
            <span>Show WebGL HUD</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-3.5 h-3.5 text-[#ff4081]" />
            <span>Zen Mode</span>
          </>
        )}
      </button>

      {/* Main Unified Control Dock Panel */}
      <div
        className={`pointer-events-auto w-full rounded-2xl bg-[#0a0d15]/85 border border-white/15 backdrop-blur-xl p-3.5 text-slate-200 shadow-2xl transition-all duration-300 ${
          isCollapsed ? 'translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="flex flex-col gap-2.5">
          {/* Top Row: Sub-tabs and quick toggles */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
            <div className="flex items-center gap-1 bg-white/[0.05] p-1 rounded-lg">
              <button
                onClick={() => {
                  sound.playTactileClick('subtle');
                  setActiveTab('mode');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'mode' ? 'bg-[#ff4081]/25 text-white border border-[#ff4081]/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Living Form</span>
              </button>
              <button
                onClick={() => {
                  sound.playTactileClick('subtle');
                  setActiveTab('physics');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'physics' ? 'bg-[#ff4081]/25 text-white border border-[#ff4081]/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Fluid Physics</span>
              </button>
              <button
                onClick={() => {
                  sound.playTactileClick('subtle');
                  setActiveTab('palette');
                }}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeTab === 'palette' ? 'bg-[#ff4081]/25 text-white border border-[#ff4081]/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Spectrum</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playTactileClick('ripple');
                  onTriggerImpulse();
                }}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-xs text-slate-200 hover:text-white border border-[#ff4081]/40 bg-[#ff4081]/15 hover:bg-[#ff4081]/25 rounded-md transition-colors"
                title="Send tactile shockwave through particles"
              >
                <span>Trigger Ripple</span>
              </button>

              <button
                onClick={() => {
                  sound.playTactileClick('subtle');
                  onUpdateSettings({ cameraOrbit: !settings.cameraOrbit });
                }}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border transition-colors ${
                  settings.cameraOrbit
                    ? 'border-cyan-400/50 text-cyan-300 bg-cyan-500/15'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Cinematic orbital drift"
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Orbit</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher */}
          {activeTab === 'mode' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {modes.map((m) => {
                const isSelected = settings.mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      sound.playTactileClick('mode');
                      onUpdateSettings({ mode: m.id });
                    }}
                    className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#ff4081] bg-[#ff4081]/15 text-white shadow-sm'
                        : 'border-white/[0.08] bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-xs font-medium tracking-tight text-white">{m.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{m.desc}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Physics Sliders */}
          {activeTab === 'physics' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-0.5">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Curl Turbulence</span>
                  <span className="font-mono text-slate-200">
                    {Math.round(settings.turbulence * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={settings.turbulence}
                  onChange={(e) => onUpdateSettings({ turbulence: parseFloat(e.target.value) })}
                  className="w-full accent-[#ff4081] h-1 bg-white/15 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Mouse Reaction</span>
                  <span className="font-mono text-slate-200">
                    {Math.round(settings.mouseForce * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="3.0"
                  step="0.1"
                  value={settings.mouseForce}
                  onChange={(e) => onUpdateSettings({ mouseForce: parseFloat(e.target.value) })}
                  className="w-full accent-[#ff4081] h-1 bg-white/15 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Simulation Pace</span>
                  <span className="font-mono text-slate-200">
                    {settings.flowSpeed.toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.0"
                  step="0.1"
                  value={settings.flowSpeed}
                  onChange={(e) => onUpdateSettings({ flowSpeed: parseFloat(e.target.value) })}
                  className="w-full accent-[#ff4081] h-1 bg-white/15 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Palette Switcher */}
          {activeTab === 'palette' && (
            <div className="flex items-center justify-between gap-3 pt-0.5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                {themes.map((t) => {
                  const isSelected = settings.theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        sound.playTactileClick('subtle');
                        onUpdateSettings({ theme: t.id });
                      }}
                      className={`flex items-center gap-2 p-1.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#ff4081] bg-[#ff4081]/15 text-white'
                          : 'border-white/[0.08] bg-transparent text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      <span className="text-xs font-medium truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  sound.playTactileClick('subtle');
                  onUpdateSettings({ wireframe: !settings.wireframe });
                }}
                className={`px-3 py-1.5 text-xs rounded-xl border shrink-0 transition-colors ${
                  settings.wireframe
                    ? 'border-[#ff4081] text-white bg-[#ff4081]/20'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                Wireframe: {settings.wireframe ? 'ON' : 'OFF'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
