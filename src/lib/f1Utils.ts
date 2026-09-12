import type { DriverData, DriverStats, ComparisonInsight } from '../types/f1';

/**
 * Converts lap duration in seconds to formatted race lap string: m:ss.ms (e.g. 94.521 -> "1:34.521")
 */
export function formatLapTime(seconds: number | null | undefined): string {
  if (seconds == null || isNaN(seconds) || seconds <= 0) return '--:--.---';
  
  const mins = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  const secs = Math.floor(remainder);
  const millis = Math.round((remainder - secs) * 1000);
  
  const paddedSecs = secs.toString().padStart(2, '0');
  const paddedMillis = millis.toString().padStart(3, '0');
  
  return `${mins}:${paddedSecs}.${paddedMillis}`;
}

/**
 * Calculates statistics for a single driver's laps
 */
export function calculateDriverStats(driver: DriverData): DriverStats {
  if (!driver || !driver.laps || driver.laps.length === 0) {
    return {
      driverId: driver?.id || 'unknown',
      driverName: driver?.name || 'Unknown Driver',
      code: driver?.code || '???',
      team: driver?.team || 'Unknown Team',
      teamColor: driver?.teamColor || '#9ca3af',
      number: driver?.number || 0,
      totalLaps: 0,
      validLaps: 0,
      fastestLap: null,
      slowestLap: null,
      averageLapTime: 0,
    };
  }

  // Filter out pit stops for average race pace calculation
  const validLaps = driver.laps.filter((l) => l.time > 0 && !l.pitStop);
  const allLaps = driver.laps.filter((l) => l.time > 0);

  if (allLaps.length === 0) {
    return {
      driverId: driver.id,
      driverName: driver.name,
      code: driver.code,
      team: driver.team,
      teamColor: driver.teamColor,
      number: driver.number,
      totalLaps: driver.laps.length,
      validLaps: 0,
      fastestLap: null,
      slowestLap: null,
      averageLapTime: 0,
    };
  }

  // Fastest Lap is minimum duration among all laps
  let fastest: { lap: number; time: number } = { lap: allLaps[0].lap, time: allLaps[0].time };
  let slowest: { lap: number; time: number } = { lap: allLaps[0].lap, time: allLaps[0].time };

  allLaps.forEach((l) => {
    if (l.time < fastest.time) {
      fastest = { lap: l.lap, time: l.time };
    }
    if (l.time > slowest.time) {
      slowest = { lap: l.lap, time: l.time };
    }
  });

  // Average lap time calculation (using valid pace laps if available, else all laps)
  const paceLaps = validLaps.length > 0 ? validLaps : allLaps;
  const totalPaceTime = paceLaps.reduce((acc, curr) => acc + curr.time, 0);
  const averageLapTime = totalPaceTime / paceLaps.length;

  return {
    driverId: driver.id,
    driverName: driver.name,
    code: driver.code,
    team: driver.team,
    teamColor: driver.teamColor,
    number: driver.number,
    totalLaps: driver.laps.length,
    validLaps: paceLaps.length,
    fastestLap: fastest,
    slowestLap: slowest,
    averageLapTime: averageLapTime,
  };
}

/**
 * Compares two drivers and produces statistics + rule-based narrative insight
 */
export function compareDrivers(driver1: DriverData, driver2: DriverData): ComparisonInsight {
  const stats1 = calculateDriverStats(driver1);
  const stats2 = calculateDriverStats(driver2);

  // Difference: Driver 1 avg - Driver 2 avg (negative means Driver 1 is faster)
  const avgDiffSeconds = stats1.averageLapTime - stats2.averageLapTime;
  const absDiffSeconds = Math.abs(avgDiffSeconds);

  const driver1IsFaster = avgDiffSeconds < 0;
  const fasterDriver = driver1IsFaster ? stats1 : stats2;
  const slowerDriver = driver1IsFaster ? stats2 : stats1;

  // Fastest lap comparison
  const fl1 = stats1.fastestLap;
  const fl2 = stats2.fastestLap;

  let fastestLapWinner = {
    driverName: stats1.driverName,
    lap: fl1?.lap || 0,
    time: fl1?.time || 0,
    margin: 0,
  };

  if (fl1 && fl2) {
    if (fl1.time <= fl2.time) {
      fastestLapWinner = {
        driverName: stats1.driverName,
        lap: fl1.lap,
        time: fl1.time,
        margin: fl2.time - fl1.time,
      };
    } else {
      fastestLapWinner = {
        driverName: stats2.driverName,
        lap: fl2.lap,
        time: fl2.time,
        margin: fl1.time - fl2.time,
      };
    }
  }

  // Lap lead count (head-to-head lap comparison)
  const maxLaps = Math.max(driver1.laps.length, driver2.laps.length);
  let d1HeadCount = 0;
  let d2HeadCount = 0;

  for (let i = 1; i <= maxLaps; i++) {
    const l1 = driver1.laps.find((l) => l.lap === i);
    const l2 = driver2.laps.find((l) => l.lap === i);
    if (l1 && l2 && !l1.pitStop && !l2.pitStop) {
      if (l1.time < l2.time) d1HeadCount++;
      else if (l2.time < l1.time) d2HeadCount++;
    }
  }

  // Rule-based insight narrative generation (PRD Section 13)
  const diffStr = absDiffSeconds.toFixed(3);
  const narrative = `${fasterDriver.driverName} was ${diffStr}s per lap faster on average than ${slowerDriver.driverName} across clean racing laps. ${
    fastestLapWinner.driverName
  } recorded the overall fastest lap of ${formatLapTime(fastestLapWinner.time)} on Lap ${fastestLapWinner.lap}.`;

  const keyTakeaways: string[] = [
    `Pace Advantage: ${fasterDriver.driverName} (+${diffStr}s/lap)`,
    `Fastest Lap: ${fastestLapWinner.driverName} (${formatLapTime(fastestLapWinner.time)} on Lap ${fastestLapWinner.lap})`,
    `Head-to-Head Laps: ${stats1.code} (${d1HeadCount} laps) vs ${stats2.code} (${d2HeadCount} laps)`,
    `Stint Consistency: ${stats1.driverName} (${stats1.validLaps} clean laps) | ${stats2.driverName} (${stats2.validLaps} clean laps)`,
  ];

  return {
    driver1Stats: stats1,
    driver2Stats: stats2,
    avgDiffSeconds,
    absDiffSeconds,
    fasterDriver,
    slowerDriver,
    fastestLapWinner,
    lapLeadCount: {
      driver1Count: d1HeadCount,
      driver2Count: d2HeadCount,
    },
    narrative,
    keyTakeaways,
  };
}
