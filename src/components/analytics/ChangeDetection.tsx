import React from 'react';
import { SessionRecord } from '../../types';
import { ArrowUpRight, ArrowDownRight, Minus, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  current: SessionRecord;
  previous?: SessionRecord;
}

export const ChangeDetection: React.FC<Props> = ({ current, previous }) => {
  if (!previous) return null;

  const getChange = (curr: number, prev: number) => {
    const diff = curr - prev;
    const percent = prev !== 0 ? (diff / prev) * 100 : 0;
    return { diff, percent };
  };

  const metrics = [
    { 
      label: 'AVERAGE PRESSURE', 
      curr: current.readings.reduce((acc, r) => acc + r.pressure, 0) / current.readings.length,
      prev: previous.readings.reduce((acc, r) => acc + r.pressure, 0) / previous.readings.length,
      unit: '%'
    },
    { label: 'PEAK PRESSURE', curr: current.peakForce, prev: previous.peakForce, unit: '%' },
    { label: 'CONSISTENCY', curr: current.consistency, prev: previous.consistency, unit: '%' },
    { label: 'VARIATION', curr: current.variation, prev: previous.variation, unit: '%' },
    { label: 'SPIKES', curr: current.spikes, prev: previous.spikes, unit: '' },
  ];

  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Change Detection Engine</h3>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#FFB300]/10 text-[#FFB300] text-[8px] font-bold rounded-sm uppercase tracking-widest">
          <AlertTriangle className="w-3 h-3" /> Notable change detected
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {metrics.map((m) => {
          const { diff, percent } = getChange(m.curr, m.prev);
          const isUp = diff > 0;
          const isNeutral = Math.abs(diff) < 0.1;

          return (
            <div key={m.label} className="p-4 bg-[#121518] border border-white/5 rounded-sm flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">{m.label}</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-xl font-bold text-white tracking-tight">{m.curr.toFixed(1)}{m.unit}</div>
                  <div className="text-[8px] text-[#9AA4AC] uppercase tracking-widest">vs {m.prev.toFixed(1)}{m.unit}</div>
                </div>
              </div>

              <div className={cn(
                "flex items-center gap-2 p-2 rounded-sm",
                isNeutral ? "bg-white/5 text-[#9AA4AC]" : isUp ? "bg-[#C6FF00]/10 text-[#C6FF00]" : "bg-[#FF3D00]/10 text-[#FF3D00]"
              )}>
                {isNeutral ? <Minus className="w-3 h-3" /> : isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                <div className="text-right">
                  <div className="text-[10px] font-bold tracking-tight">{isUp ? '+' : ''}{diff.toFixed(1)}{m.unit}</div>
                  <div className="text-[8px] font-bold opacity-80">{isUp ? '+' : ''}{percent.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
