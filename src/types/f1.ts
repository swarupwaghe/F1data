export interface LapData {
  lap: number;
  time: number; // Duration in seconds (e.g. 81.452)
  pitStop?: boolean;
  compound?: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET';
}

export interface DriverData {
  id: string;
  name: string;
  code: string; // e.g. "LEC", "PIA", "VER", "NOR"
  number: number;
  team: string;
  teamColor: string; // Hex color (e.g. "#E8002D" for Ferrari)
  laps: LapData[];
}

export interface RaceData {
  id: string;
  name: string;
  year: number;
  circuit: string;
  location: string;
  totalLaps: number;
  date: string;
  drivers: DriverData[];
}

export interface DriverStats {
  driverId: string;
  driverName: string;
  code: string;
  team: string;
  teamColor: string;
  number: number;
  totalLaps: number;
  validLaps: number;
  fastestLap: { lap: number; time: number } | null;
  slowestLap: { lap: number; time: number } | null;
  averageLapTime: number; // in seconds
}

export interface ComparisonInsight {
  driver1Stats: DriverStats;
  driver2Stats: DriverStats;
  avgDiffSeconds: number; // positive if driver1 is faster, negative if driver2 is faster
  absDiffSeconds: number;
  fasterDriver: DriverStats;
  slowerDriver: DriverStats;
  fastestLapWinner: {
    driverName: string;
    lap: number;
    time: number;
    margin: number;
  };
  lapLeadCount: {
    driver1Count: number;
    driver2Count: number;
  };
  narrative: string;
  keyTakeaways: string[];
}
