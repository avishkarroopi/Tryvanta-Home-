import React, { useState } from 'react';
import { X, Calendar, Phone, MessageSquare, CheckCircle2, Clock } from 'lucide-react';
import { TryvantaLogo } from './TryvantaLogo.tsx';
import { sound } from '../utils/audio.ts';

interface BookDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookDemoModal: React.FC<BookDemoModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTactileClick('ripple');
    setIsBooked(true);

    const text = encodeURIComponent(
      `Hello Tryvanta, I would like to book a smart home demo.\nName: ${name}\nPhone: ${phone}\nDate: ${date}\nSlot: ${timeSlot}`
    );
    window.open(`https://wa.me/919398017435?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#0b0e17] border border-white/20 shadow-2xl text-slate-100">
        <button
          onClick={() => {
            sound.playTactileClick('subtle');
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <TryvantaLogo size={28} />
          <div>
            <div className="text-xs font-mono text-[#ff4081] uppercase tracking-wider font-semibold">
              Live Experience Center
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Book a Tryvanta Demo
            </h3>
          </div>
        </div>

        {isBooked ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">Demo Scheduled!</h4>
            <p className="text-xs text-slate-300">
              We have forwarded your booking request to Avishkar Roopi on WhatsApp. We will confirm
              your personalized walkthrough shortly.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 text-xs font-semibold rounded-full bg-white text-slate-900 hover:bg-slate-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Vikram Reddy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff4081]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                Phone Number (WhatsApp)
              </label>
              <input
                type="tel"
                required
                placeholder="+91 93980 17435"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff4081]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff4081]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                  Time Window
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-[#ff4081]"
                >
                  <option value="11:00 AM" className="bg-[#0b0e17]">11:00 AM - 12:30 PM</option>
                  <option value="03:00 PM" className="bg-[#0b0e17]">03:00 PM - 04:30 PM</option>
                  <option value="06:00 PM" className="bg-[#0b0e17]">06:00 PM - 07:30 PM</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400">
                Direct phone: <a href="tel:+917330782606" className="text-white hover:underline">+91 7330782606</a>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff4081] to-[#e91e63] text-white font-semibold text-xs tracking-wider uppercase hover:brightness-110 transition-all shadow-lg shadow-pink-500/20"
              >
                Confirm via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
