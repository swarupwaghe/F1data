import React from 'react';

interface F1CarExplodedProps {
  progress: number; // 0.0 (Assembled) to 1.0 (Exploded)
}

export const F1CarExploded: React.FC<F1CarExplodedProps> = ({ progress }) => {
  // Clamp progress between 0 and 1
  const p = Math.max(0, Math.min(1, progress));

  // Easing function easeOutCubic for smooth engineering feel
  const easeP = 1 - Math.pow(1 - p, 3);

  // Component explosion translation vectors based on scroll progress
  const nose = {
    x: easeP * 130,
    y: easeP * 30,
    z: easeP * 50,
  };

  const rearWing = {
    x: -easeP * 120,
    y: -easeP * 35,
    z: -easeP * 40,
  };

  const engineCover = {
    x: -easeP * 15,
    y: -easeP * 110,
    z: easeP * 10,
  };

  const frontWheel = {
    x: easeP * 30,
    y: easeP * 55,
    z: easeP * 100,
  };

  const rearWheel = {
    x: -easeP * 30,
    y: easeP * 55,
    z: -easeP * 100,
  };

  // Drop shadow opacity and scale expansion
  const shadowOpacity = 0.45 - easeP * 0.25;
  const shadowScaleX = 1 + easeP * 0.15;

  return (
    <div className="relative w-full max-w-5xl h-[480px] sm:h-[540px] mx-auto flex items-center justify-center perspective-1000 select-none overflow-visible">
      
      {/* 3D Stage Container */}
      <div
        className="relative w-[900px] h-[400px] transition-transform duration-100 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${10 - easeP * 5}deg) rotateY(${-12 + easeP * 8}deg) scale(${0.9 + easeP * 0.1})`,
        }}
      >

        {/* Ambient Ground Drop Shadow */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[720px] h-[65px] rounded-[100%] bg-black/60 blur-md pointer-events-none transition-all duration-300"
          style={{
            transform: `translate(-50%, 40px) scale(${shadowScaleX}, 1)`,
            opacity: shadowOpacity,
          }}
        />

        {/* Layer 1: Main Chassis & Cockpit (Anchor Piece - Stays Center) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(0px, 0px, 0px)`,
          }}
        >
          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-xl">
            <defs>
              <linearGradient id="chassisRed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e10600" />
                <stop offset="100%" stopColor="#b30000" />
              </linearGradient>
              <linearGradient id="chassisWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>

            {/* Underbody Tray */}
            <path d="M 180 340 L 780 340 L 770 360 L 190 360 Z" fill="#090d16" />

            {/* Main Cockpit Body tub */}
            <path
              d="M 220 330 L 450 330 L 520 280 L 535 220 L 510 215 L 470 240 L 320 250 L 220 300 Z"
              fill="url(#chassisWhite)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />

            {/* White/Red Livery Triangle Overlay */}
            <path d="M 230 330 L 450 330 L 320 250 Z" fill="url(#chassisRed)" />

            {/* Sidepod Air Intake */}
            <path d="M 330 260 L 460 250 L 470 310 L 330 320 Z" fill="#0f172a" />
            <path d="M 335 265 L 365 265 L 365 315 L 335 315 Z" fill="#e10600" />

            {/* Windscreen & Cockpit Opening */}
            <path d="M 480 238 L 525 225 L 535 245 L 485 255 Z" fill="rgba(30, 41, 59, 0.85)" stroke="#475569" />

            {/* Driver Senna Helmet (Yellow with Brazilian Green/Blue stripes) */}
            <g transform="translate(505, 222)">
              {/* Helmet Base */}
              <circle cx="12" cy="12" r="14" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
              {/* Green stripe */}
              <path d="M 2 10 Q 12 4 22 10 Q 12 8 2 10" fill="#16a34a" />
              {/* Blue stripe */}
              <path d="M 2 14 Q 12 18 22 14 Q 12 16 2 14" fill="#2563eb" />
              {/* Visor */}
              <path d="M 12 6 L 24 10 L 22 18 L 12 14 Z" fill="#090d16" />
            </g>

            {/* Roll Hoop & Camera */}
            <path d="M 485 210 L 505 185 L 515 210 Z" fill="url(#chassisWhite)" stroke="#94a3b8" />

            {/* Sponsors Graphics (Marlboro / Shell / Honda style text) */}
            <text x="370" y="295" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif">
              Marlboro
            </text>
            <text x="350" y="322" fill="#0f172a" fontSize="11" fontWeight="800" fontFamily="sans-serif">
              POWERED BY HONDA
            </text>
            <text x="250" y="325" fill="#facc15" fontSize="14" fontWeight="900" fontFamily="sans-serif">
              Shell
            </text>
          </svg>
        </div>

        {/* Layer 2: Front Wing & Nose Cone (Moves Forward / Right) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${nose.x}px, ${nose.y}px, ${nose.z}px)`,
          }}
        >
          {/* Floating Drop Shadow for Front Wing */}
          <div
            className="absolute bottom-6 right-20 w-[240px] h-[30px] bg-black/40 rounded-full blur-sm pointer-events-none"
            style={{ opacity: easeP * 0.6 }}
          />

          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl">
            {/* Front Nose Cone Structure */}
            <path
              d="M 520 280 L 760 300 L 780 320 L 760 328 L 510 325 Z"
              fill="url(#chassisWhite)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Red Nose Top Livery */}
            <path d="M 540 285 L 750 305 L 760 315 L 530 315 Z" fill="#e10600" />

            {/* Front Wing Assembly */}
            <g transform="translate(730, 290)">
              {/* Main Wing Element */}
              <rect x="0" y="30" width="120" height="12" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="10" y="42" width="100" height="8" rx="1" fill="#e10600" />
              
              {/* Endplates */}
              <path d="M -5 15 L 20 15 L 20 50 L -5 50 Z" fill="#ffffff" stroke="#cbd5e1" />
              <path d="M 105 15 L 130 15 L 130 50 L 105 50 Z" fill="#ffffff" stroke="#cbd5e1" />

              {/* Sponsor text on wing endplate */}
              <text x="0" y="35" fill="#0f172a" fontSize="7" fontWeight="800">
                GOODYEAR
              </text>
            </g>

            {/* Car Racing Number #12 on Nose */}
            <text x="700" y="316" fill="#ffffff" fontSize="22" fontWeight="900" fontFamily="sans-serif">
              12
            </text>
          </svg>
        </div>

        {/* Layer 3: Rear Wing & Diffuser (Moves Backward / Left) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${rearWing.x}px, ${rearWing.y}px, ${rearWing.z}px)`,
          }}
        >
          {/* Shadow */}
          <div
            className="absolute bottom-8 left-16 w-[200px] h-[30px] bg-black/40 rounded-full blur-sm pointer-events-none"
            style={{ opacity: easeP * 0.6 }}
          />

          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl">
            {/* Rear Wing Pillars */}
            <path d="M 210 260 L 220 260 L 220 330 L 210 330 Z" fill="#0f172a" />
            <path d="M 240 260 L 250 260 L 250 330 L 240 330 Z" fill="#0f172a" />

            {/* Rear Wing Endplates (Red with Marlboro & #12) */}
            <rect x="140" y="195" width="130" height="95" rx="4" fill="#e10600" stroke="#b30000" strokeWidth="2" />

            {/* Rear Wing Main Planes */}
            <rect x="145" y="210" width="120" height="16" rx="2" fill="#ffffff" />
            <rect x="145" y="235" width="120" height="12" rx="2" fill="#ffffff" />

            {/* Rear Diffuser Channels */}
            <path d="M 150 330 L 260 330 L 270 355 L 140 355 Z" fill="#090d16" stroke="#1e293b" />
            <line x1="180" y1="330" x2="175" y2="355" stroke="#334155" strokeWidth="2" />
            <line x1="210" y1="330" x2="210" y2="355" stroke="#334155" strokeWidth="2" />
            <line x1="240" y1="330" x2="245" y2="355" stroke="#334155" strokeWidth="2" />

            {/* #12 on Rear Wing */}
            <text x="155" y="255" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="sans-serif">
              12
            </text>
            <text x="190" y="222" fill="#0f172a" fontSize="11" fontWeight="900" fontFamily="sans-serif">
              Marlboro
            </text>
          </svg>
        </div>

        {/* Layer 4: Engine Cover & Airbox (Lifts Upward) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${engineCover.x}px, ${engineCover.y}px, ${engineCover.z}px)`,
          }}
        >
          {/* Shadow underneath engine cover when lifted */}
          <div
            className="absolute top-[210px] left-[310px] w-[260px] h-[30px] bg-black/45 rounded-full blur-md pointer-events-none"
            style={{ opacity: easeP * 0.7 }}
          />

          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl">
            {/* Airbox Intake Scoop & Engine Cover Shell */}
            <path
              d="M 450 185 L 515 185 L 510 240 L 320 250 L 310 280 L 440 270 Z"
              fill="url(#chassisWhite)"
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Red Accents on Engine Cover */}
            <path d="M 450 185 L 515 185 L 490 220 L 440 220 Z" fill="#e10600" />

            {/* Honda V6 Turbo Engine Bay Internal Details (Revealed when exploded!) */}
            {easeP > 0.1 ? (
              <g transform="translate(340, 230)" opacity={easeP}>
                {/* Cylinder block */}
                <rect x="0" y="0" width="110" height="40" rx="4" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
                {/* Exhaust Manifold Pipes */}
                <path d="M 10 10 C 20 -10, 40 -10, 50 10" fill="none" stroke="#f97316" strokeWidth="3" />
                <path d="M 40 10 C 50 -10, 70 -10, 80 10" fill="none" stroke="#ea580c" strokeWidth="3" />
                {/* Turbocharger Turbine */}
                <circle cx="95" cy="20" r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                <text x="15" y="25" fill="#f8fafc" fontSize="9" fontWeight="900">
                  HONDA V6 TURBO
                </text>
              </g>
            ) : null}

            <text x="470" y="208" fill="#ffffff" fontSize="8" fontWeight="800">
              BOSS
            </text>
          </svg>
        </div>

        {/* Layer 5: Front Wheels & Suspension (Separates Outward) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${frontWheel.x}px, ${frontWheel.y}px, ${frontWheel.z}px)`,
          }}
        >
          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl">
            {/* Front Wishbone Suspension Arms (Expanding with scroll) */}
            {easeP > 0.05 ? (
              <g stroke="#64748b" strokeWidth="2.5" opacity={Math.min(1, easeP * 1.5)}>
                <line x1="580" y1="300" x2="680" y2="330" />
                <line x1="580" y1="320" x2="680" y2="340" />
              </g>
            ) : null}

            {/* Front Right Wheel Assembly */}
            <g transform="translate(680, 270)">
              {/* Outer Slick Tire Rubber */}
              <ellipse cx="45" cy="65" rx="42" ry="52" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />
              <ellipse cx="45" cy="65" rx="36" ry="44" fill="#1e293b" />
              {/* Black Racing Rim */}
              <circle cx="45" cy="65" r="22" fill="#090d16" stroke="#475569" strokeWidth="2" />
              {/* Wheel Nuts */}
              <circle cx="45" cy="65" r="7" fill="#e10600" />
              <circle cx="45" cy="55" r="2" fill="#94a3b8" />
              <circle cx="55" cy="65" r="2" fill="#94a3b8" />
              <circle cx="45" cy="75" r="2" fill="#94a3b8" />
              <circle cx="35" cy="65" r="2" fill="#94a3b8" />
            </g>

            {/* Front Left Wheel Assembly */}
            <g transform="translate(770, 275)">
              <ellipse cx="40" cy="55" rx="38" ry="46" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />
              <ellipse cx="40" cy="55" rx="32" ry="38" fill="#1e293b" />
              <circle cx="40" cy="55" r="18" fill="#090d16" stroke="#475569" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Layer 6: Rear Wheels & Brake Assembly (Separates Outward) */}
        <div
          className="absolute inset-0 transition-transform duration-75"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translate3d(${rearWheel.x}px, ${rearWheel.y}px, ${rearWheel.z}px)`,
          }}
        >
          <svg viewBox="0 0 1000 450" className="w-full h-full drop-shadow-2xl">
            {/* Rear Wishbones */}
            {easeP > 0.05 ? (
              <g stroke="#64748b" strokeWidth="3" opacity={Math.min(1, easeP * 1.5)}>
                <line x1="280" y1="310" x2="190" y2="330" />
                <line x1="280" y1="330" x2="190" y2="350" />
              </g>
            ) : null}

            {/* Rear Right Wide Slick Wheel Assembly */}
            <g transform="translate(180, 260)">
              {/* Massive Rear Slick */}
              <ellipse cx="50" cy="70" rx="54" ry="64" fill="#0f172a" stroke="#1e293b" strokeWidth="4" />
              <ellipse cx="50" cy="70" rx="44" ry="54" fill="#1e293b" />
              {/* Rim */}
              <circle cx="50" cy="70" r="26" fill="#090d16" stroke="#475569" strokeWidth="2" />
              {/* Center Lock Nut */}
              <circle cx="50" cy="70" r="8" fill="#e10600" />
            </g>

            {/* Rear Left Wheel */}
            <g transform="translate(110, 265)">
              <ellipse cx="45" cy="60" rx="46" ry="54" fill="#0f172a" stroke="#1e293b" strokeWidth="3" />
              <ellipse cx="45" cy="60" rx="38" ry="44" fill="#1e293b" />
              <circle cx="45" cy="60" r="22" fill="#090d16" stroke="#475569" strokeWidth="2" />
            </g>
          </svg>
        </div>

        {/* Blueprint Technical Callout Annotations (Fades in during explosion!) */}
        {easeP > 0.15 ? (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ opacity: Math.min(1, (easeP - 0.15) * 1.3) }}
          >
            {/* Callout 1: Front Wing */}
            <div className="absolute top-[320px] right-[10px] sm:right-[40px] flex items-center space-x-2">
              <div className="w-16 h-px bg-cyan-400" />
              <div className="bg-gray-950/90 border border-cyan-500/50 px-2.5 py-1 rounded text-[10px] font-mono text-cyan-300 shadow-lg">
                <span className="font-bold text-white block">FW-01 FRONT WING</span>
                High Downforce Twin-Element
              </div>
            </div>

            {/* Callout 2: Engine Bay */}
            <div className="absolute top-[70px] left-[340px] flex flex-col items-center">
              <div className="bg-gray-950/90 border border-red-500/50 px-2.5 py-1 rounded text-[10px] font-mono text-red-400 shadow-lg mb-1">
                <span className="font-bold text-white block">HONDA RA168E ENGINE</span>
                1.5L V6 Twin-Turbo (675 HP)
              </div>
              <div className="w-px h-16 bg-red-500" />
            </div>

            {/* Callout 3: Cockpit Monocoque */}
            <div className="absolute top-[180px] right-[240px] flex items-center space-x-2">
              <div className="bg-gray-950/90 border border-yellow-500/50 px-2.5 py-1 rounded text-[10px] font-mono text-yellow-300 shadow-lg">
                <span className="font-bold text-white block">KEVLAR MONOCOQUE</span>
                Senna #12 Cockpit Cell
              </div>
              <div className="w-12 h-px bg-yellow-400" />
            </div>

            {/* Callout 4: Rear Wing */}
            <div className="absolute top-[140px] left-[10px] flex items-center space-x-2">
              <div className="bg-gray-950/90 border border-red-500/50 px-2.5 py-1 rounded text-[10px] font-mono text-red-400 shadow-lg">
                <span className="font-bold text-white block">RW-04 REAR WING</span>
                Drag Reduction & Diffuser
              </div>
              <div className="w-12 h-px bg-red-500" />
            </div>

            {/* Callout 5: Goodyear Wheels */}
            <div className="absolute bottom-[20px] left-[260px] flex flex-col items-center">
              <div className="w-px h-12 bg-cyan-400" />
              <div className="bg-gray-950/90 border border-cyan-500/50 px-2 py-1 rounded text-[10px] font-mono text-cyan-300 shadow-lg mt-1">
                GOODYEAR EAGLE SLICKS
              </div>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};
