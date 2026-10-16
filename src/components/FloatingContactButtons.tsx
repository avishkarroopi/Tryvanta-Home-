import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { sound } from '../utils/audio.ts';

export const FloatingContactButtons: React.FC = () => {
  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919398017435?text=Hello%20Tryvanta%2C%20I%20would%20like%20to%20learn%20more%20about%20Tryvanta%20Home%20Automation."
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playTactileClick('subtle')}
        className="group relative flex items-center justify-center"
        aria-label="Chat with Tryvanta on WhatsApp (+91 9398017435)"
      >
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-[#0c0f17]/95 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>WhatsApp: +91 9398017435</span>
        </span>

        {/* WhatsApp Icon Circle with neon glow */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] flex items-center justify-center text-white shadow-[0_4px_25px_rgba(37,211,102,0.45)] border border-emerald-300/40 hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_6px_32px_rgba(37,211,102,0.65)]">
          {/* Custom crisp WhatsApp Vector Icon */}
          <svg
            className="w-7 h-7 fill-white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.392-10.416c-4.28 0-7.75 3.47-7.75 7.75 0 1.385.365 2.686 1.002 3.816l-1.066 3.9 4.004-1.05c1.09.593 2.339.934 3.81.934 4.28 0 7.75-3.47 7.75-7.75s-3.47-7.75-7.75-7.75z" />
          </svg>
        </div>
      </a>

      {/* Call Floating Button */}
      <a
        href="tel:+917330782606"
        onClick={() => sound.playTactileClick('subtle')}
        className="group relative flex items-center justify-center"
        aria-label="Direct Phone Call to Tryvanta (+91 7330782606)"
      >
        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl bg-[#0c0f17]/95 border border-sky-500/30 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span>Call: +91 7330782606</span>
        </span>

        {/* Phone Icon Circle with cyan/sky glow */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0284c7] via-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white shadow-[0_4px_25px_rgba(14,165,233,0.45)] border border-sky-300/40 hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[0_6px_32px_rgba(14,165,233,0.65)]">
          <Phone className="w-6 h-6 fill-white" />
        </div>
      </a>
    </aside>
  );
};
