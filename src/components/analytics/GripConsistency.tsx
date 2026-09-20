import React from 'react';
import { SessionRecord } from '../../types';
import { Target, Info } from 'lucide-react';

interface Props {
  session: SessionRecord;
}

export const GripConsistency: React.FC<Props> = ({ session }) => {
  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Grip Consistency Analysis</h3>
        <Target className="w-4 h-4 text-[#C6FF00]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - session.consistency / 100)}
              className="text-[#C6FF00] transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white">{session.consistency}%</div>
            <div className="text-[10px] font-bold text-[#C6FF00] tracking-widest uppercase">STABLE</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'PRESSURE STABILITY', value: `${session.stability}%` },
            { label: 'VARIATION PERCENTAGE', value: `${session.variation}%` },
            { label: 'STABLE PERIODS', value: session.stablePeriods.toString() },
            { label: 'PRESSURE SPIKES', value: session.spikes.toString() },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-[#121518] border border-white/5 rounded-sm flex justify-between items-center group hover:border-[#C6FF00]/20 transition-all">
              <span className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">{item.label}</span>
              <span className="text-sm font-bold text-white tracking-tight">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-[#121518] border border-white/5 rounded-sm flex gap-4 items-start">
        <Info className="w-4 h-4 text-[#9AA4AC] mt-0.5" />
        <p className="text-[10px] text-[#9AA4AC] leading-relaxed uppercase tracking-widest">
          Grip consistency measures how stable pressure remains during a simulated session. Higher percentages indicate fewer abrupt changes in grip intensity.
        </p>
      </div>
    </div>
  );
};
