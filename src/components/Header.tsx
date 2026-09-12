import React from 'react';
import { Flag, Gauge, Activity, Layers } from 'lucide-react';

interface HeaderProps {
  onGoToLanding?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onGoToLanding }) => {
  return (
    <header className="w-full border-b border-gray-800 bg-[#0f1420]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/40 border border-red-500/30">
              <Gauge className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  F1 LAP TIME <span className="text-red-500 font-extrabold">ANALYZER</span>
                </h1>
                <span className="px-2 py-0.5 text-xs font-semibold uppercase tracking-wider rounded bg-red-950/80 text-red-400 border border-red-800/50">
                  MVP v1.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">
                Historical Telemetry & Lap-by-Lap Pace Comparison
              </p>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="flex items-center space-x-3">
            
            {onGoToLanding ? (
              <button
                onClick={onGoToLanding}
                className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-xs font-bold text-gray-200 border border-gray-700 transition-all cursor-pointer shadow-lg"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>3D Exploded Blueprint</span>
              </button>
            ) : null}

            <div className="hidden md:flex items-center space-x-4 bg-gray-950/60 px-4 py-2 rounded-lg border border-gray-800 text-xs text-gray-300">
              <div className="flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Real Telemetry Data</span>
              </div>
              <div className="h-4 w-px bg-gray-800" />
              <div className="flex items-center space-x-1.5">
                <Flag className="w-4 h-4 text-yellow-400" />
                <span>Interactive Analytics</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
