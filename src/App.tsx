import React, { useState, useMemo } from 'react';
import f1RacesData from './data/f1_races.json';
import type { RaceData, DriverData } from './types/f1';
import { compareDrivers } from './lib/f1Utils';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { RaceControls } from './components/RaceControls';
import { DriverCard } from './components/DriverCard';
import { DeltaMetrics } from './components/DeltaMetrics';
import { LapChart } from './components/LapChart';
import { PerformanceInsight } from './components/PerformanceInsight';
import { Gauge } from 'lucide-react';

export const App: React.FC = () => {
  // Navigation State: 'landing' (3D Exploded Blueprint) vs 'dashboard' (Data Analytics)
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const races = f1RacesData as RaceData[];

  const [selectedRace, setSelectedRace] = useState<RaceData>(races[0]);
  const [selectedDriver1, setSelectedDriver1] = useState<DriverData>(
    races[0].drivers[0]
  );
  const [selectedDriver2, setSelectedDriver2] = useState<DriverData>(
    races[0].drivers[1] || races[0].drivers[0]
  );

  // Handle Race selection update (auto-updates drivers list for new race)
  const handleSelectRace = (newRace: RaceData) => {
    setSelectedRace(newRace);
    setSelectedDriver1(newRace.drivers[0]);
    setSelectedDriver2(newRace.drivers[1] || newRace.drivers[0]);
  };

  // Compare Insight Calculation
  const insight = useMemo(() => {
    return compareDrivers(selectedDriver1, selectedDriver2);
  }, [selectedDriver1, selectedDriver2]);

  if (currentView === 'landing') {
    return <LandingPage onEnterDashboard={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="min-h-screen carbon-bg flex flex-col selection:bg-red-500 selection:text-white animate-fade-in">
      
      {/* Header */}
      <Header onGoToLanding={() => setCurrentView('landing')} />

      {/* Main Content Dashboard */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Race & Driver Selection Bar */}
        <RaceControls
          races={races}
          selectedRace={selectedRace}
          selectedDriver1={selectedDriver1}
          selectedDriver2={selectedDriver2}
          onSelectRace={handleSelectRace}
          onSelectDriver1={setSelectedDriver1}
          onSelectDriver2={setSelectedDriver2}
        />

        {/* Driver Statistics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DriverCard
            stats={insight.driver1Stats}
            isFasterOverall={insight.fasterDriver.driverId === selectedDriver1.id}
            label="Driver 1"
          />
          <DriverCard
            stats={insight.driver2Stats}
            isFasterOverall={insight.fasterDriver.driverId === selectedDriver2.id}
            label="Driver 2"
          />
        </div>

        {/* Delta Pace & Battle Metrics Bar */}
        <DeltaMetrics insight={insight} />

        {/* Main Telemetry Lap Line Chart */}
        <LapChart driver1={selectedDriver1} driver2={selectedDriver2} />

        {/* Automated Performance Insight Engine Panel */}
        <PerformanceInsight insight={insight} />

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#0a0d14] py-6 text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-red-500" />
            <span className="font-bold text-gray-400">F1 Lap Time Comparison Dashboard MVP</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with React, Next.js / Vite, TypeScript & Recharts</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
