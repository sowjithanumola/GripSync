import { SessionRecord, SportType, PressureReading, Pattern, TimelineEvent } from '../types';

const generateReadings = (count: number, basePressure: number): PressureReading[] => {
  return Array.from({ length: count }).map((_, i) => ({
    timestamp: Date.now() - (count - i) * 1000,
    pressure: Math.max(0, Math.min(100, basePressure + Math.sin(i * 0.2) * 5 + (Math.random() * 4 - 2))),
    topHand: Math.max(0, Math.min(100, basePressure * 0.6 + (Math.random() * 10 - 5))),
    bottomHand: Math.max(0, Math.min(100, basePressure * 0.4 + (Math.random() * 10 - 5))),
  }));
};

const MOCK_PATTERNS: Pattern[] = [
  {
    id: 'p1',
    name: 'Pressure Spike Pattern',
    frequency: 4,
    time: 'Session 1',
    status: 'detected',
    description: 'Repeated short increases in grip pressure were observed during the simulated session.'
  },
  {
    id: 'p2',
    name: 'Gradual Fatigue Pattern',
    frequency: 1,
    time: 'Session 2',
    status: 'observed',
    description: 'A slow decrease in average pressure was detected toward the end of the session.'
  }
];

const MOCK_EVENTS: TimelineEvent[] = [
  { id: 'e1', time: '10:12', type: 'Pressure Increase', description: 'Pressure increase detected' },
  { id: 'e2', time: '10:26', type: 'Stability', description: 'Stable period detected' },
  { id: 'e3', time: '10:41', type: 'Spike', description: 'Pressure spike detected' },
  { id: 'e4', time: '10:48', type: 'Variation', description: 'Variation increased' },
  { id: 'e5', time: '10:57', type: 'Recovery', description: 'Pressure returned toward average' }
];

export const createMockSessions = (sport: SportType): SessionRecord[] => {
  const sportLabel = sport === 'BAT' ? 'CRICKET' : sport === 'RACKET' ? 'TENNIS' : sport === 'CLUB' ? 'GOLF' : sport;
  
  return [
    {
      id: 's1',
      date: '2026-09-18',
      time: '10:15 AM',
      sport: sport,
      action: `${sportLabel} Drill 01`,
      topHand: 55,
      bottomHand: 45,
      peakForce: 71,
      score: 82,
      consistency: 82,
      variation: 12,
      stability: 88,
      stablePeriods: 10,
      spikes: 5,
      readings: generateReadings(50, 54),
      patterns: [MOCK_PATTERNS[0]],
      events: MOCK_EVENTS.slice(0, 3),
      zones: { low: 15, normal: 65, high: 15, peak: 5 }
    },
    {
      id: 's2',
      date: '2026-09-19',
      time: '11:30 AM',
      sport: sport,
      action: `${sportLabel} Match Prep`,
      topHand: 58,
      bottomHand: 42,
      peakForce: 76,
      score: 85,
      consistency: 85,
      variation: 10,
      stability: 90,
      stablePeriods: 12,
      spikes: 4,
      readings: generateReadings(50, 58),
      patterns: [MOCK_PATTERNS[1]],
      events: MOCK_EVENTS.slice(1, 4),
      zones: { low: 10, normal: 70, high: 15, peak: 5 }
    },
    {
      id: 's3',
      date: '2026-09-20',
      time: '09:00 AM',
      sport: sport,
      action: `${sportLabel} Power Session`,
      topHand: 62,
      bottomHand: 38,
      peakForce: 81,
      score: 89,
      consistency: 87,
      variation: 9,
      stability: 91,
      stablePeriods: 14,
      spikes: 3,
      readings: generateReadings(50, 64),
      patterns: MOCK_PATTERNS,
      events: MOCK_EVENTS,
      zones: { low: 12, normal: 61, high: 22, peak: 5 }
    }
  ];
};
