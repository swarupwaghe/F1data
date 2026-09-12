import React from 'react';
import type { RaceData, DriverData } from '../types/f1';
import { Trophy, User, MapPin, Calendar } from 'lucide-react';

interface RaceControlsProps {
  races: RaceData[];
  selectedRace: RaceData;
  selectedDriver1: DriverData;
  selectedDriver2: DriverData;
  onSelectRace: (race: RaceData) => void;
  onSelectDriver1: (driver: DriverData) => void;
  onSelectDriver2: (driver: DriverData) => void;
}

export const RaceControls: React.FC<RaceControlsProps> = ({
  races,
  selectedRace,
  selectedDriver1,
  selectedDriver2,
  onSelectRace,
  onSelectDriver1,
  onSelectDriver2,
}) => {
  const handleRaceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const raceId = e.target.value;
    const race = races.find((r) => r.id === raceId);
    if (race) {
      onSelectRace(race);
    }
  };

  const handleDriver1Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const driverId = e.target.value;
    const driver = selectedRace.drivers.find((d) => d.id === driverId);
    if (driver) {
      if (driver.id === selectedDriver2.id) {
        // Swap or choose alternate
        const alt = selectedRace.drivers.find((d) => d.id !== driverId);
        if (alt) onSelectDriver2(alt);
      }
      onSelectDriver1(driver);
    }
  };

  const handleDriver2Change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const driverId = e.target.value;
    const driver = selectedRace.drivers.find((d) => d.id === driverId);
    if (driver) {
      if (driver.id === selectedDriver1.id) {
        const alt = selectedRace.drivers.find((d) => d.id !== driverId);
        if (alt) onSelectDriver1(alt);
      }
      onSelectDriver2(driver);
    }
  };

  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-8">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-6">
        
        {/* Race Selector Box */}
        <div className="flex-1 space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-red-500" />
            Select Grand Prix
          </label>
          <div className="relative">
            <select
              value={selectedRace.id}
              onChange={handleRaceChange}
              className="w-full bg-[#161f30] text-white font-medium text-sm rounded-xl px-4 py-3 border border-gray-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 appearance-none transition-all cursor-pointer"
            >
              {races.map((race) => (
                <option key={race.id} value={race.id} className="bg-[#121824] text-white">
                  {race.name} ({race.year}) — {race.circuit}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
              ▼
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              {selectedRace.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              {selectedRace.totalLaps} Laps ({selectedRace.date})
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block w-px h-16 bg-gray-800" />

        {/* Driver Selectors Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Driver 1 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-cyan-400" />
                Driver 1 (Primary)
              </span>
              <span className="text-[10px] font-mono text-cyan-400">#1</span>
            </label>
            <div className="relative">
              <select
                value={selectedDriver1.id}
                onChange={handleDriver1Change}
                className="w-full bg-[#161f30] text-white font-medium text-sm rounded-xl px-4 py-3 border border-cyan-500/30 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 appearance-none transition-all cursor-pointer"
              >
                {selectedRace.drivers.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#121824] text-white">
                    #{d.number} {d.name} ({d.code}) - {d.team}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400 text-xs">
                ▼
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-0.5">
              <span
                className="w-3 h-3 rounded-full inline-block shadow-sm"
                style={{ backgroundColor: selectedDriver1.teamColor }}
              />
              <span className="text-xs text-gray-300 font-semibold">{selectedDriver1.team}</span>
            </div>
          </div>

          {/* Driver 2 */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-yellow-400" />
                Driver 2 (Rival)
              </span>
              <span className="text-[10px] font-mono text-yellow-400">#2</span>
            </label>
            <div className="relative">
              <select
                value={selectedDriver2.id}
                onChange={handleDriver2Change}
                className="w-full bg-[#161f30] text-white font-medium text-sm rounded-xl px-4 py-3 border border-yellow-500/30 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 appearance-none transition-all cursor-pointer"
              >
                {selectedRace.drivers.map((d) => (
                  <option key={d.id} value={d.id} className="bg-[#121824] text-white">
                    #{d.number} {d.name} ({d.code}) - {d.team}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-400 text-xs">
                ▼
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-0.5">
              <span
                className="w-3 h-3 rounded-full inline-block shadow-sm"
                style={{ backgroundColor: selectedDriver2.teamColor }}
              />
              <span className="text-xs text-gray-300 font-semibold">{selectedDriver2.team}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
