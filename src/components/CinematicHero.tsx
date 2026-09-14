import React, { useState, useEffect, useRef } from 'react';
import { playEngineRevSound } from '../lib/audioEngine';
import { Flame, ChevronRight, Volume2, VolumeX, Gauge } from 'lucide-react';

interface CinematicHeroProps {
  onRevUp: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({ onRevUp }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isRevving, setIsRevving] = useState<boolean>(false);

  // Video URL & Poster Frame from Ferrari SF-26 F1 Live Wallpaper
  const videoUrl = 'https://www.desktophut.com/files/1773917256.mp4';
  const posterUrl = 'https://www.desktophut.com/images/ferrari-sf-26-f1-live-wallpaper-1773917256.webp';

  // Ensure autoplay starts smoothly
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or failed:', err);
      });
    }
  }, [videoUrl]);

  // Native onEnded handler
  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  // Scroll Fallback Listener: If user scrolls, reveal CTA button immediately
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20 && !videoEnded) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
        setVideoEnded(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [videoEnded]);

  // Handle Rev Up Engine Action -> Data Page
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
      
      {/* Autoplay & Looping Edge-to-Edge Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
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

      {/* Dark Ambient Vignette Overlay Matching Video Background */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out pointer-events-none ${
          videoEnded
            ? 'bg-gradient-to-t from-black via-black/50 to-black/30 backdrop-blur-[2px]'
            : 'bg-gradient-to-t from-black/50 via-transparent to-black/30'
        }`}
      />

      {/* Top Header Bar (No left header title, audio toggle top right) */}
      <header className="relative z-30 max-w-7xl w-full mx-auto p-6 sm:p-8 flex items-center justify-between pointer-events-none">
        
        {/* Minimal F1 Gauge Badge */}
        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-red-500 bg-black/60 px-3 py-1.5 rounded-full border border-red-500/30 backdrop-blur-md pointer-events-auto">
          <Gauge className="w-4 h-4 text-red-500 animate-pulse" />
          <span>F1 TELEMETRY READY</span>
        </div>

        {/* Audio Mute/Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          className="pointer-events-auto p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 hover:scale-105 transition-all cursor-pointer backdrop-blur-md shadow-lg"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX className="w-5 h-5 text-gray-400" /> : <Volume2 className="w-5 h-5 text-red-400" />}
        </button>
      </header>

      {/* Center Stage: REV UP ENGINE CTA BUTTON (Matching Background & Video Aesthetics) */}
      <div className="relative z-30 max-w-4xl w-full mx-auto px-6 pb-24 flex flex-col items-center justify-center text-center space-y-6">
        
        {/* Background-Matched Glassmorphism Pill Container */}
        <div
          className={`transition-all duration-700 ease-out transform ${
            videoEnded
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-90 translate-y-0 scale-100'
          }`}
        >
          {/* Main "REV UP ENGINE" Button Blending with Dark Video BG */}
          <button
            onClick={handleRevUpClick}
            disabled={isRevving}
            className={`group relative inline-flex items-center justify-center space-x-4 px-10 py-5 rounded-2xl font-black text-lg sm:text-xl uppercase tracking-widest text-white backdrop-blur-xl border border-red-500/50 shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden animate-throttle-shake ${
              isRevving
                ? 'bg-red-950/90 border-red-500 scale-95 ring-4 ring-red-500/50'
                : 'bg-black/70 hover:bg-black/90 hover:border-red-500 hover:scale-105 ring-2 ring-red-500/30'
            }`}
          >
            {/* Glowing Red/Yellow Throttle Background Gradient on Hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-red-600/30 via-yellow-500/20 to-red-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="w-10 h-10 rounded-xl bg-red-600/80 group-hover:bg-red-600 flex items-center justify-center text-white shadow-lg transition-colors">
              <Flame className={`w-6 h-6 text-yellow-300 ${isRevving ? 'animate-bounce' : 'group-hover:scale-125 transition-transform'}`} />
            </div>

            <span className="relative font-black tracking-widest drop-shadow-md">
              {isRevving ? 'REVVING ENGINE...' : 'REV UP ENGINE'}
            </span>

            <ChevronRight className="w-6 h-6 text-red-500 group-hover:text-white group-hover:translate-x-1.5 transition-all" />
          </button>
          
          <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mt-3 drop-shadow">
            Click to rev engine & launch into race pace data
          </p>
        </div>

      </div>

    </section>
  );
};
