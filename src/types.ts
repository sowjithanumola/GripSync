export interface SensorData {
  topHand: number;
  bottomHand: number;
  impact: number;
  duration: number;
}

export interface SessionRecord {
  id: string;
  time: string;
  date: string;
  sport: SportType;
  action: string;
  topHand: number;
  bottomHand: number;
  peakForce: number;
  score: number;
  consistency: number;
  variation: number;
  stability: number;
  stablePeriods: number;
  spikes: number;
  readings: PressureReading[];
  patterns: Pattern[];
  events: TimelineEvent[];
  zones: {
    low: number;
    normal: number;
    high: number;
    peak: number;
  };
}

export interface PressureReading {
  timestamp: number;
  pressure: number;
  topHand: number;
  bottomHand: number;
}

export interface Pattern {
  id: string;
  name: string;
  frequency: number;
  time: string;
  status: 'observed' | 'detected' | 'variation';
  description: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  type: string;
  description: string;
}

export interface Insight {
  id: string;
  text: string;
  type: 'positive' | 'warning' | 'neutral';
}

export type SportType = 'CRICKET' | 'TENNIS' | 'BADMINTON' | 'HOCKEY' | 'BASEBALL' | 'BAT' | 'RACKET' | 'CLUB';

export interface BusinessAssumption {
  label: string;
  value: string;
  description: string;
}
