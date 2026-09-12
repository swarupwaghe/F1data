import React from 'react';
import type { ComparisonInsight } from '../types/f1';
import { formatLapTime } from '../lib/f1Utils';
import { Flame, Scale, Trophy, TrendingUp } from 'lucide-react';

interface DeltaMetricsProps {
  insight: ComparisonInsight;
}

export const DeltaMetrics: React.FC<DeltaMetricsProps> = ({ insight }) => {
  const { driver1Stats, driver2Stats, absDiffSeconds, fasterDriver, lapLeadCount } = insight;

  const totalHeadLaps = lapLeadCount.driver1Count + lapLeadCount.driver2Count;
  const d1Percent = totalHeadLaps > 0 ? (lapLeadCount.driver1Count / totalHeadLaps) * 100 : 50;
  const d2Percent = totalHeadLaps > 0 ? (lapLeadCount.driver2Count / totalHeadLaps) * 100 : 50;

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-8 border border-gray-800">
      
      <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-5">
        <h3 className="text-base font-black text-white tracking-tight flex items-center gap-2">
          <Scale className="w-5 h-5 text-yellow-400" />
          PACE DELTA & BATTLE METRICS
        </h3>
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-yellow-950/60 text-yellow-300 border border-yellow-800/60">
          DELTA: {absDiffSeconds.toFixed(3)}s / LAP
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Pace Advantage Summary Card */}
        <div className="bg-[#161f30]/80 rounded-xl p-4 border border-gray-800/80 flex flex-col justify-between">
          <div className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-green-400" />
            Race Pace Advantage
          </div>
          <div>
            <div className="text-xl font-black text-white">
              {fasterDriver.driverName}
            </div>
            <div className="text-xs text-green-400 font-mono font-bold mt-1">
              -{absDiffSeconds.toFixed(3)} seconds / lap faster
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Average lap duration difference across all valid race laps.
          </p>
        </div>

        {/* Head to Head Battle Progress Bar */}
        <div className="bg-[#161f30]/80 rounded-xl p-4 border border-gray-800/80 flex flex-col justify-between">
          <div className="text-xs text-gray-400 font-semibold mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-500" />
              Lap-by-Lap Battle
            </span>
            <span className="text-[11px] font-mono text-gray-400">{totalHeadLaps} Laps</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span style={{ color: driver1Stats.teamColor }}>
                {driver1Stats.code} ({lapLeadCount.driver1Count})
              </span>
              <span style={{ color: driver2Stats.teamColor }}>
                {driver2Stats.code} ({lapLeadCount.driver2Count})
              </span>
            </div>

            {/* Split Bar */}
            <div className="w-full h-3 rounded-full bg-gray-900 overflow-hidden flex">
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${d1Percent}%`, backgroundColor: driver1Stats.teamColor }}
              />
              <div
                className="h-full transition-all duration-500"
                style={{ width: `${d2Percent}%`, backgroundColor: driver2Stats.teamColor }}
              />
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-2">
            Number of individual laps where driver recorded the faster lap time.
          </p>
        </div>

        {/* Fastest Lap Winner */}
        <div className="bg-[#161f30]/80 rounded-xl p-4 border border-gray-800/80 flex flex-col justify-between">
          <div className="text-xs text-gray-400 font-semibold mb-1 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-yellow-400" />
            Fastest Lap Winner
          </div>
          <div>
            <div className="text-xl font-black text-white">
              {insight.fastestLapWinner.driverName}
            </div>
            <div className="text-xs text-yellow-400 font-mono font-bold mt-1">
              {formatLapTime(insight.fastestLapWinner.time)} (Lap {insight.fastestLapWinner.lap})
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-2">
            Margin: +{insight.fastestLapWinner.margin.toFixed(3)}s ahead of rival's best lap.
          </p>
        </div>

      </div>

    </div>
  );
};
