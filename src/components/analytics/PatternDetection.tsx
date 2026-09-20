import React from 'react';
import { Pattern } from '../../types';
import { Search, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  patterns: Pattern[];
}

export const PatternDetection: React.FC<Props> = ({ patterns }) => {
  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Intelligent Pattern Detection</h3>
        <Search className="w-4 h-4 text-[#9AA4AC]" />
      </div>

      <div className="space-y-4">
        {patterns.length > 0 ? (
          patterns.map((pattern) => (
            <div key={pattern.id} className="p-6 bg-[#121518] border border-white/5 rounded-sm group hover:border-[#C6FF00]/20 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white uppercase tracking-tight">{pattern.name}</div>
                  <div className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">
                    Detected {pattern.frequency} times • {pattern.time}
                  </div>
                </div>
                <div className={cn(
                  "px-2 py-1 text-[8px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1",
                  pattern.status === 'detected' ? "bg-[#FF3D00]/10 text-[#FF3D00]" : "bg-[#C6FF00]/10 text-[#C6FF00]"
                )}>
                  {pattern.status === 'detected' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  {pattern.status}
                </div>
              </div>
              <p className="text-xs text-[#9AA4AC] leading-relaxed italic">
                "{pattern.description}"
              </p>
            </div>
          ))
        ) : (
          <div className="py-12 text-center">
            <p className="text-[10px] text-[#9AA4AC] uppercase tracking-widest">No significant patterns detected in this session.</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-[#0B0D0F]/50 rounded-sm">
        <p className="text-[8px] text-[#9AA4AC] uppercase leading-relaxed tracking-widest text-center">
          Note: Observations are derived from simulated sensor data and do not represent medically validated conclusions.
        </p>
      </div>
    </div>
  );
};
