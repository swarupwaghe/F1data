import React, { useState, useEffect, useRef } from 'react';
import { playEngineRevSound } from '../lib/audioEngine';
import { Flame, ChevronRight, Gauge, Volume2, VolumeX } from 'lucide-react';

interface CinematicHeroProps {
  onRevUp: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onRevUp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  // Video URL & Poster Frame from Red Bull Ford F1 2026 Live Wallpaper
  const videoUrl = 'https://www.desktophut.com/files/1768987955.mp4';
  const posterUrl = 'https://www.desktophut.com/images/8306_mpc-hc64_bLRyg4Oeot.jpg';

  // Native onEnded handler
  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  // Scroll Fallback Listener: If user scrolls, reveal CTA button immediately
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30 && !videoEnded) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        setVideoEnded(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoEnded]);

  // Handle CTA Click
  const handleRevUpClick = () => {
    if (isRevving) return;
    setIsRevving(true);

    playEngineRevSound(() => {
      onRevUp();
    });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between selection:bg-red-600 selection:text-white">
      
      {/* Autopolaying Edge-to-Edge Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted={isMuted}
        playsInline
        preload="auto"
        poster={posterUrl}
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
        style={{
          opacity: videoEnded ? 0.75 : 1,
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Dark Gradient Vignette Overlay for Depth & Contrast */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          videoEnded
            ? 'bg-gradient-to-t from-black via-black/60 to-black/40 backdrop-blur-[2px]'
            : 'bg-gradient-to-t from-black/60 via-transparent to-black/40'
        }`}
      />

      {/* Top Left Minimal Overlay */}
      <header className="relative z-20 max-w-7xl w-full mx-auto p-6 sm:p-8 flex items-center justify-between pointer-events-none">
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-900/50 ring-2 ring-red-400/40">
            <Gauge className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              RED BULL FORD <span className="text-red-500">F1 2026</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300">
              Formula 1 Next-Gen Livery & Telemetry Showcase
            </p>
          </div>
        </div>

        {/* Audio Mute/Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-red-400" />}
        </button>
      </header>

      {/* Center / Bottom Cinematic CTA Reveal Area */}
      <div className="relative z-20 max-w-4xl w-full mx-auto px-6 pb-20 flex flex-col items-center text-center space-y-6">
        
        {/* Headline */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            videoEnded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-xl">
            <Flame className="w-4 h-4 text-yellow-400 animate-pulse" />
            <span>POWER UNIT REVOLUTION • 2026 ERA</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-2xl">
            UNLEASH THE <span className="text-red-500 font-extrabold">TELEMETRY</span>
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-gray-300 font-medium mt-3 drop-shadow">
            Experience real-time lap-by-lap analytics, historical race comparisons, and driver pace battle metrics.
          </p>
        </div>

        {/* MOTORSPORT-INSPIRED "REV UP ENGINE" CTA BUTTON */}
        <div
          className={`transition-all duration-700 delay-150 ease-out transform ${
            videoEnded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-12 pointer-events-none'
          }`}
        >
          <button
            onClick={handleRevUpClick}
            disabled={isRevving}
            className={`group relative inline-flex items-center justify-center space-x-4 px-10 py-5 rounded-2xl font-black text-lg uppercase tracking-widest text-white shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden animate-throttle-shake ${
              isRevving
                ? 'bg-red-700 scale-95 ring-4 ring-red-500/60'
                : 'bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 ring-2 ring-red-400/50'
            }`}
          >
            {/* Pulsing Red Aura Background */}
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-red-500/30 to-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <Flame className={`w-7 h-7 text-yellow-300 ${isRevving ? 'animate-bounce' : 'group-hover:scale-125 transition-transform'}`} />
            
            <span className="relative font-black tracking-widest drop-shadow-md">
              {isRevving ? 'REVVING ENGINE...' : 'REV UP ENGINE'}
            </span>

            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>

    </section>
  );
};
