export interface SensorData {
  topHand: number;
  bottomHand: number;
  impact: number;
  duration: number;
}

export interface SessionRecord {
  id: string;
  time: string;
  sport: string;
  action: string;
  topHand: number;
  bottomHand: number;
  peakForce: number;
  score: number;
}

export type SportType = 'CRICKET' | 'TENNIS' | 'BADMINTON' | 'HOCKEY' | 'BASEBALL';

export interface BusinessAssumption {
  label: string;
  value: string;
  description: string;
}
