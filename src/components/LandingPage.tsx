import React from 'react';
import { CinematicHero } from './CinematicHero';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterDashboard }) => {
  return (
    <div className="min-h-screen bg-black overflow-hidden select-none">
      <CinematicHero onRevUp={onEnterDashboard} />
    </div>
  );
};
