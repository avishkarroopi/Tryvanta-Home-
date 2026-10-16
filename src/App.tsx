import React, { useEffect, useRef, useState, useCallback } from 'react';
import { LivingScene } from './webgl/LivingScene.ts';
import { Header } from './components/Header.tsx';
import { BottomDock } from './components/BottomDock.tsx';
import { CustomCursor } from './components/CustomCursor.tsx';
import { BookDemoModal } from './components/BookDemoModal.tsx';
import { FloatingContactButtons } from './components/FloatingContactButtons.tsx';
import { HeroHomeSection } from './components/sections/HeroHomeSection.tsx';
import { EcosystemSection } from './components/sections/EcosystemSection.tsx';
import { ResourcesSection } from './components/sections/ResourcesSection.tsx';
import { LaylaSection } from './components/sections/LaylaSection.tsx';
import { HardwareGallerySection } from './components/sections/HardwareGallerySection.tsx';
import { TestimonialsSection } from './components/sections/TestimonialsSection.tsx';
import { ContactSection } from './components/sections/ContactSection.tsx';
import { sound } from './utils/audio.ts';
import type {
  ActiveSection,
  WebGLSettings,
  MousePhysicsState,
} from './types/index.ts';

export default function App() {
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<LivingScene | null>(null);

  const [activeSection, setActiveSection] = useState<ActiveSection>('hero');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState(false);

  // Section element refs for smooth scrolling & observer tracking
  const heroRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const laylaRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const [settings, setSettings] = useState<WebGLSettings>({
    mode: 'fluid',
    theme: 'obsidian',
    particleDensity: 12000,
    turbulence: 1.1,
    mouseForce: 1.8,
    flowSpeed: 1.0,
    cameraOrbit: false,
    wireframe: false,
  });

  const mousePhysicsRef = useRef<MousePhysicsState>({
    x: 0,
    y: 0,
    screenX: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    screenY: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    isDown: false,
    clickTime: 0,
  });

  // Initialize Three.js WebGL scene once
  useEffect(() => {
    if (!canvasMountRef.current) return;

    const scene = new LivingScene(canvasMountRef.current, settings);
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  const handleUpdateSettings = useCallback((partial: Partial<WebGLSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      if (sceneRef.current) {
        sceneRef.current.updateSettings(next);
      }
      return next;
    });
  }, []);

  // Smooth scroll to section and adjust WebGL camera
  const handleSelectSection = useCallback((section: ActiveSection) => {
    setActiveSection(section);
    if (sceneRef.current) {
      sceneRef.current.setSectionCamera(section);
    }

    const refMap: Record<ActiveSection, React.RefObject<HTMLDivElement | null>> = {
      hero: heroRef,
      ecosystem: ecosystemRef,
      resources: resourcesRef,
      layla: laylaRef,
      gallery: galleryRef,
      testimonials: testimonialsRef,
      contact: contactRef,
    };

    const targetRef = refMap[section];
    if (targetRef && targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleToggleAudio = useCallback(() => {
    const newState = sound.toggleMute();
    setIsAudioOn(newState);
  }, []);

  const handleTriggerImpulse = useCallback(() => {
    if (sceneRef.current) {
      sceneRef.current.triggerImpulse(1.3);
    }
  }, []);

  // Intersection Observer to update active nav state while scrolling
  useEffect(() => {
    const sections: { id: ActiveSection; ref: React.RefObject<HTMLDivElement | null> }[] = [
      { id: 'hero', ref: heroRef },
      { id: 'ecosystem', ref: ecosystemRef },
      { id: 'resources', ref: resourcesRef },
      { id: 'layla', ref: laylaRef },
      { id: 'gallery', ref: galleryRef },
      { id: 'testimonials', ref: testimonialsRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const found = sections.find((s) => s.ref.current === entry.target);
            if (found) {
              setActiveSection(found.id);
              if (sceneRef.current) {
                sceneRef.current.setSectionCamera(found.id);
              }
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((s) => {
      if (s.ref.current) observer.observe(s.ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // High-frequency pointer tracking with velocity & audio modulation
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.001);

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      const vx = ((e.clientX - lastX) / dt) * 0.001;
      const vy = ((e.clientY - lastY) / dt) * 0.001;
      const speed = Math.hypot(vx, vy);

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      const mp = mousePhysicsRef.current;
      mp.screenX = e.clientX;
      mp.screenY = e.clientY;
      mp.x = normX;
      mp.y = normY;
      mp.vx = vx;
      mp.vy = vy;
      mp.speed = speed;

      if (sceneRef.current) {
        sceneRef.current.onMouseMove(normX, normY, vx, vy);
      }

      sound.modulateWithMouse(normX, normY);
    };

    const handlePointerDown = () => {
      mousePhysicsRef.current.isDown = true;
      if (sceneRef.current) {
        sceneRef.current.onMouseDown();
      }
    };

    const handlePointerUp = () => {
      mousePhysicsRef.current.isDown = false;
      if (sceneRef.current) {
        sceneRef.current.onMouseUp();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#07090e] text-slate-100 antialiased overflow-x-hidden selection:bg-[#ff4081]/30 selection:text-white">
      {/* 1. Custom Smooth Spring Cursor */}
      <CustomCursor mouseState={mousePhysicsRef.current} />

      {/* 2. WebGL Canvas Container: fixed full viewport behind content */}
      <div
        ref={canvasMountRef}
        className="fixed inset-0 pointer-events-auto -z-10 w-full h-full"
        style={{ touchAction: 'none' }}
      />

      {/* 3. Subtle ambient dark vignette background overlay */}
      <div className="fixed inset-0 pointer-events-none -z-5 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(7,9,14,0.85)_100%)]" />

      {/* 4. Top Navigation Bar */}
      <Header
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
        onOpenBookDemo={() => setIsBookDemoOpen(true)}
      />

      {/* 5. Main Single-Page Living Architecture with all 7 Sections */}
      <main className="relative z-10 w-full flex flex-col">
        {/* Section 1: Hero Home ("YOUR HOME, BUT MAGICAL.") */}
        <div ref={heroRef} id="hero">
          <HeroHomeSection
            onSelectSection={handleSelectSection}
            onTriggerImpulse={handleTriggerImpulse}
          />
        </div>

        {/* Section 2: Ecosystem ("UNIFY YOUR ECOSYSTEM.") */}
        <div ref={ecosystemRef} id="ecosystem">
          <EcosystemSection />
        </div>

        {/* Section 3: Smart Spaces ("INTELLIGENT RESOURCES. EFFORTLESS SAVINGS.") */}
        <div ref={resourcesRef} id="resources">
          <ResourcesSection />
        </div>

        {/* Section 4: Layla AI Companion ("MEET LAYLA, YOUR INTUITIVE COMPANION.") */}
        <div ref={laylaRef} id="layla">
          <LaylaSection />
        </div>

        {/* Section 5: Hardware Gallery ("EXPLORE THE HARDWARE. THE TRYVANTA GALLERY.") */}
        <div ref={galleryRef} id="gallery">
          <HardwareGallerySection />
        </div>

        {/* Section 6: Testimonials ("THE MAGIC IS REAL. LOVED BY THOUSANDS.") */}
        <div ref={testimonialsRef} id="testimonials">
          <TestimonialsSection />
        </div>

        {/* Section 7: Contact ("READY TO EXPERIENCE THE MAGIC? CONNECT WITH THE FUTURE.") */}
        <div ref={contactRef} id="contact">
          <ContactSection />
        </div>
      </main>

      {/* 6. Unified Collapsible Bottom Control Dock */}
      <BottomDock
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onTriggerImpulse={handleTriggerImpulse}
      />

      {/* 7. Floating WhatsApp and Phone Call Actions */}
      <FloatingContactButtons />

      {/* 8. Book a Demo Modal */}
      <BookDemoModal
        isOpen={isBookDemoOpen}
        onClose={() => setIsBookDemoOpen(false)}
      />
    </div>
  );
}
