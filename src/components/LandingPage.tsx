import React, { useState, useEffect } from 'react';
import { F1CarExploded } from './F1CarExploded';
import { playEngineRevSound } from '../lib/audioEngine';
import { Flame, Gauge, Layers, ArrowDown, ChevronRight, Zap } from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  // Monitor viewport scroll progress to drive the 3D explosion animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(1, Math.max(0, scrollY / (maxScroll * 0.75)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRevUpEngine = () => {
    if (isRevving) return;
    setIsRevving(true);

    // Play synthesized Web Audio API engine sound & transition to dashboard
    playEngineRevSound(() => {
      onEnterDashboard();
    });
  };

  return (
    <div className="relative min-h-[220vh] bg-[#909d9f] text-[#0f172a] font-sans selection:bg-red-600 selection:text-white">
      
      {/* Fixed Viewport Container for 3D Exploded Car */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-4 sm:px-8 py-6">
        
        {/* Top Header HUD */}
        <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/30">
              <Gauge className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 flex items-center gap-2">
                F1 MP4/4 <span className="text-red-600">EXPLODED VIEW</span>
              </h1>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-700">
                1988 McLaren Honda #12 • Senna Telemetry Showcase
              </p>
            </div>
          </div>

          {/* Scroll Explosion HUD Meter */}
          <div className="hidden sm:flex items-center space-x-3 bg-gray-950/80 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs border border-gray-800 shadow-xl">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-gray-300">Explosion Ratio:</span>
            <span className="font-mono font-bold text-cyan-300 text-sm">
              {(scrollProgress * 100).toFixed(0)}%
            </span>
          </div>
        </header>

        {/* Center Stage: 3D Exploded Car */}
        <main className="relative flex-grow flex items-center justify-center z-10 my-auto">
          
          {/* Subtle Technical Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `linear-gradient(#0f172a 1px, transparent 1px), linear-gradient(90deg, #0f172a 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          <F1CarExploded progress={scrollProgress} />
        </main>

        {/* Bottom CTA Bar & Rev Up Action */}
        <footer className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 z-20 pb-4">
          
          {/* Technical Specs Pill */}
          <div className="flex items-center space-x-4 bg-gray-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-gray-800 text-white text-xs shadow-xl">
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-gray-300">Power:</span>
              <span className="font-mono text-yellow-400 font-bold">675 BHP @ 12,500 RPM</span>
            </div>
            <div className="h-4 w-px bg-gray-800" />
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-gray-300">Weight:</span>
              <span className="font-mono text-cyan-400 font-bold">540 KG</span>
            </div>
          </div>

          {/* REV UP ENGINE CTA BUTTON */}
          <button
            onClick={handleRevUpEngine}
            disabled={isRevving}
            className={`group relative inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-black text-base uppercase tracking-wider text-white shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
              isRevving
                ? 'bg-red-700 scale-95 ring-4 ring-red-500/50'
                : 'bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 hover:scale-105 hover:shadow-red-600/40 ring-2 ring-red-400/40'
            }`}
          >
            {/* Background Glow */}
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <Flame className={`w-6 h-6 text-yellow-300 ${isRevving ? 'animate-bounce' : 'group-hover:scale-110'}`} />
            
            <span className="relative font-black tracking-widest drop-shadow-md">
              {isRevving ? 'REVVING ENGINE...' : 'REV UP ENGINE'}
            </span>

            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Scroll Cue Prompt */}
          <div className="hidden lg:flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-gray-800 bg-white/40 px-3 py-1.5 rounded-lg border border-gray-700/30">
            <span>Scroll Down to Explode</span>
            <ArrowDown className="w-4 h-4 text-red-600 animate-bounce" />
          </div>

        </footer>

      </div>

      {/* Screen Overlay Speed Blur Animation during Rev Up */}
      {isRevving ? (
        <div className="fixed inset-0 z-50 bg-red-950/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-500/80 animate-ping">
            <Flame className="w-10 h-10 text-yellow-300" />
          </div>
          <div className="text-3xl font-black text-white tracking-widest font-mono animate-pulse">
            LAUNCHING TELEMETRY DATA...
          </div>
        </div>
      ) : null}

    </div>
  );
};
