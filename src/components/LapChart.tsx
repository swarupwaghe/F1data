import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { DriverData } from '../types/f1';
import { formatLapTime } from '../lib/f1Utils';
import { Activity, ZoomIn, Eye } from 'lucide-react';

interface LapChartProps {
  driver1: DriverData;
  driver2: DriverData;
}

export const LapChart: React.FC<LapChartProps> = ({ driver1, driver2 }) => {
  const [hidePitStops, setHidePitStops] = useState<boolean>(true);
  const [zoomMode, setZoomMode] = useState<boolean>(true);

  // Prepare merged lap data for Recharts
  const chartData = useMemo(() => {
    const maxLaps = Math.max(driver1.laps.length, driver2.laps.length);
    const data = [];

    for (let i = 1; i <= maxLaps; i++) {
      const lapD1 = driver1.laps.find((l) => l.lap === i);
      const lapD2 = driver2.laps.find((l) => l.lap === i);

      const d1Time = lapD1 ? lapD1.time : null;
      const d2Time = lapD2 ? lapD2.time : null;

      // Filter out pit stops if hidePitStops is enabled to keep pace trend clean
      const isPit1 = lapD1?.pitStop;
      const isPit2 = lapD2?.pitStop;

      const finalD1 = hidePitStops && isPit1 ? null : d1Time;
      const finalD2 = hidePitStops && isPit2 ? null : d2Time;

      let gap: number | null = null;
      if (finalD1 && finalD2) {
        gap = finalD1 - finalD2;
      }

      data.push({
        lap: i,
        [driver1.code]: finalD1,
        [driver2.code]: finalD2,
        rawD1: d1Time,
        rawD2: d2Time,
        isPit1,
        isPit2,
        gap,
      });
    }

    return data;
  }, [driver1, driver2, hidePitStops]);

  // Calculate Y-Axis Domain for best visual resolution
  const yDomain = useMemo(() => {
    const validTimes: number[] = [];
    chartData.forEach((row) => {
      if (row[driver1.code]) validTimes.push(row[driver1.code] as number);
      if (row[driver2.code]) validTimes.push(row[driver2.code] as number);
    });

    if (validTimes.length === 0) return [60, 120];

    const min = Math.min(...validTimes);
    const max = Math.max(...validTimes);

    if (!zoomMode) {
      return [Math.floor(min - 2), Math.ceil(max + 5)];
    }

    // Zoomed pace view (focuses tightly on lap variability)
    return [Math.floor(min - 0.8), Math.ceil(max + 1.2)];
  }, [chartData, driver1.code, driver2.code, zoomMode]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    const row = chartData.find((r) => r.lap === label);
    if (!row) return null;

    const d1Time = row[driver1.code];
    const d2Time = row[driver2.code];

    return (
      <div className="bg-[#121824]/95 border border-gray-700/80 rounded-xl p-4 shadow-2xl backdrop-blur-md text-xs space-y-2 min-w-[220px]">
        <div className="flex items-center justify-between font-bold border-b border-gray-800 pb-2 text-white">
          <span className="text-red-400">LAP {label} TELEMETRY</span>
          {row.isPit1 || row.isPit2 ? (
            <span className="px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-mono text-[10px]">
              PIT STOP
            </span>
          ) : null}
        </div>

        {/* Driver 1 */}
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: driver1.teamColor }} />
            <span className="font-semibold text-gray-200">{driver1.name} ({driver1.code})</span>
          </span>
          <span className="font-mono font-bold text-cyan-300">
            {formatLapTime(typeof d1Time === 'number' ? d1Time : null)}
          </span>
        </div>

        {/* Driver 2 */}
        <div className="flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: driver2.teamColor }} />
            <span className="font-semibold text-gray-200">{driver2.name} ({driver2.code})</span>
          </span>
          <span className="font-mono font-bold text-yellow-300">
            {formatLapTime(typeof d2Time === 'number' ? d2Time : null)}
          </span>
        </div>

        {/* Gap Delta */}
        {d1Time && d2Time ? (
          <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
            <span className="text-gray-400 font-medium">Lap Gap:</span>
            <span className={`font-mono font-bold ${row.gap && row.gap < 0 ? 'text-cyan-400' : 'text-yellow-400'}`}>
              {row.gap && row.gap < 0
                ? `${driver1.code} -${Math.abs(row.gap).toFixed(3)}s`
                : `${driver2.code} -${Math.abs(row.gap || 0).toFixed(3)}s`}
            </span>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-8">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
            <Activity className="w-5 h-5 text-red-500" />
            LAP TIME TELEMETRY COMPARISON
          </h2>
          <p className="text-xs text-gray-400">
            Lap-by-lap timing profile for {driver1.name} vs {driver2.name}
          </p>
        </div>

        {/* Action Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setHidePitStops(!hidePitStops)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              hidePitStops
                ? 'bg-red-950/60 text-red-300 border-red-800/60'
                : 'bg-gray-800/80 text-gray-300 border-gray-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{hidePitStops ? 'Hiding Pit Laps' : 'Show All (Inc Pit Stops)'}</span>
          </button>

          <button
            onClick={() => setZoomMode(!zoomMode)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              zoomMode
                ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                : 'bg-gray-800/80 text-gray-300 border-gray-700'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>{zoomMode ? 'Race Pace Zoom ON' : 'Full Range Scale'}</span>
          </button>

        </div>
      </div>

      {/* Chart Canvas Container */}
      <div className="w-full h-[380px] sm:h-[440px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 15, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
            
            <XAxis
              dataKey="lap"
              stroke="#6b7280"
              fontSize={11}
              tickLine={false}
              label={{ value: 'Lap Number', position: 'bottom', offset: 10, fill: '#9ca3af', fontSize: 11 }}
            />

            <YAxis
              domain={yDomain}
              stroke="#6b7280"
              fontSize={11}
              tickFormatter={(val) => formatLapTime(val)}
              width={80}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />
            
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingTop: '0px', fontSize: '12px' }}
            />

            <Line
              type="monotone"
              dataKey={driver1.code}
              name={`${driver1.name} (#${driver1.number})`}
              stroke={driver1.teamColor || '#00f0ff'}
              strokeWidth={2.5}
              dot={{ r: 2.5, fill: driver1.teamColor }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
              connectNulls
            />

            <Line
              type="monotone"
              dataKey={driver2.code}
              name={`${driver2.name} (#${driver2.number})`}
              stroke={driver2.teamColor === driver1.teamColor ? '#ffb800' : driver2.teamColor || '#ffb800'}
              strokeWidth={2.5}
              strokeDasharray={driver2.teamColor === driver1.teamColor ? '5 5' : undefined}
              dot={{ r: 2.5, fill: driver2.teamColor }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
