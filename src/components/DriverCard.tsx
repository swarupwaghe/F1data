import React from 'react';
import type { DriverStats } from '../types/f1';
import { formatLapTime } from '../lib/f1Utils';
import { Zap, Clock, CheckCircle2 } from 'lucide-react';

interface DriverCardProps {
  stats: DriverStats;
  isFasterOverall: boolean;
  label: string;
}

export const DriverCard: React.FC<DriverCardProps> = ({ stats, isFasterOverall, label }) => {
  return (
    <div className="glass-panel glass-panel-interactive rounded-2xl p-5 sm:p-6 relative overflow-hidden border border-gray-800">
      
      {/* Team Color Top Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: stats.teamColor }}
      />

      {/* Header Info */}
      <div className="flex items-start justify-between mb-4 pt-1">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 bg-gray-900/80 px-2 py-0.5 rounded border border-gray-800">
            {label}
          </span>
          <h3 className="text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            {stats.driverName}
            <span className="text-xs font-mono font-bold text-gray-400">#{stats.number}</span>
          </h3>
          <p className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stats.teamColor }} />
            {stats.team}
          </p>
        </div>

        {/* Faster Badge */}
        {isFasterOverall ? (
          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-green-950/80 text-green-400 border border-green-700/60 shadow-lg shadow-green-950/40 animate-pulse">
            FASTER PACE
          </span>
        ) : null}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        
        {/* Fastest Lap */}
        <div className="bg-[#161f30]/80 rounded-xl p-3 border border-gray-800">
          <div className="flex items-center space-x-1.5 text-xs text-yellow-400 font-semibold mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>Fastest Lap</span>
          </div>
          <div className="text-lg font-mono font-black text-white">
            {formatLapTime(stats.fastestLap?.time)}
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Set on <span className="font-bold text-gray-300">Lap {stats.fastestLap?.lap || '--'}</span>
          </div>
        </div>

        {/* Average Lap Time */}
        <div className="bg-[#161f30]/80 rounded-xl p-3 border border-gray-800">
          <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-semibold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Avg Race Pace</span>
          </div>
          <div className="text-lg font-mono font-black text-white">
            {formatLapTime(stats.averageLapTime)}
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            Excl. Pit Stops
          </div>
        </div>

      </div>

      {/* Footer Info: Valid Laps */}
      <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
          Valid Laps Analyzed
        </span>
        <span className="font-mono font-bold text-gray-200">
          {stats.validLaps} / {stats.totalLaps} Laps
        </span>
      </div>

    </div>
  );
};
