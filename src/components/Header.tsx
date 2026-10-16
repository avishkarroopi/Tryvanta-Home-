import React from 'react';
import { Volume2, VolumeX, MessageSquare, Phone } from 'lucide-react';
import { TryvantaLogo } from './TryvantaLogo.tsx';
import type { ActiveSection } from '../types/index.ts';
import { sound } from '../utils/audio.ts';

interface HeaderProps {
  activeSection: ActiveSection;
  onSelectSection: (section: ActiveSection) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onOpenBookDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSelectSection,
  isAudioOn,
  onToggleAudio,
  onOpenBookDemo,
}) => {
  const navItems: { id: ActiveSection; label: string }[] = [
    { id: 'hero', label: 'Home' },
    { id: 'ecosystem', label: 'Our Ecosystem' },
    { id: 'resources', label: 'Smart Spaces' },
    { id: 'layla', label: 'Magical Tech' },
    { id: 'gallery', label: 'Hardware' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between gap-6 px-4 lg:px-10 py-4 border-b border-white/[0.07] bg-[#07090e]/75 backdrop-blur-xl">
      {/* Zone 1: Tryvanta Wordmark & Brand Logo */}
      <button
        onClick={() => {
          sound.playTactileClick('subtle');
          onSelectSection('hero');
        }}
        className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
      >
        <TryvantaLogo size={32} showWordmark={true} />
      </button>

      {/* Zone 2: Navigation Links (matching Image 6) */}
      <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playTactileClick('subtle');
                onSelectSection(item.id);
              }}
              className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                isActive ? 'text-white font-medium' : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ff4081] to-[#06b6d4] rounded-full transition-all duration-300" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Direct WhatsApp, Audio toggle, and "Book a Demo" CTA */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        <a
          href="https://wa.me/919398017435"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp (+91 9398017435)"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden xl:inline">WhatsApp</span>
        </a>

        <a
          href="tel:+917330782606"
          title="Direct Call (+91 7330782606)"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg border border-white/10 hover:border-sky-500/40 hover:bg-sky-500/10 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden xl:inline">+91 7330782606</span>
        </a>

        <button
          onClick={onToggleAudio}
          title={isAudioOn ? 'Mute ambient sound' : 'Unmute ambient sound'}
          className="p-2 text-slate-400 hover:text-white rounded-lg border border-white/10 hover:border-white/20 transition-colors"
          aria-label={isAudioOn ? 'Mute sound' : 'Unmute sound'}
        >
          {isAudioOn ? <Volume2 className="w-4 h-4 text-[#ff4081]" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Glow Pill Button matching Image 6 */}
        <button
          onClick={() => {
            sound.playTactileClick('mode');
            onOpenBookDemo();
          }}
          className="px-4 py-2 text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-[#e91e63] via-[#d81b60] to-[#ad1457] rounded-full hover:brightness-110 shadow-lg shadow-pink-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0 border border-pink-400/30"
        >
          Book a Demo
        </button>
      </div>
    </header>
  );
};
