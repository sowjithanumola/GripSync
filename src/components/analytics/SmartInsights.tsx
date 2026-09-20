import React from 'react';
import { Insight } from '../../types';
import { Lightbulb, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  insights: Insight[];
}

export const SmartInsights: React.FC<Props> = ({ insights }) => {
  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Data-Driven Smart Insights</h3>
        <Lightbulb className="w-4 h-4 text-[#C6FF00]" />
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div 
            key={insight.id} 
            className={cn(
              "p-4 border rounded-sm flex gap-4 items-start",
              insight.type === 'positive' ? "bg-[#C6FF00]/5 border-[#C6FF00]/10" :
              insight.type === 'warning' ? "bg-[#FFB300]/5 border-[#FFB300]/10" :
              "bg-white/5 border-white/10"
            )}
          >
            <div className="mt-0.5">
              {insight.type === 'positive' ? <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" /> :
               insight.type === 'warning' ? <AlertTriangle className="w-4 h-4 text-[#FFB300]" /> :
               <Info className="w-4 h-4 text-[#9AA4AC]" />}
            </div>
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-widest leading-relaxed",
              insight.type === 'positive' ? "text-[#C6FF00]" :
              insight.type === 'warning' ? "text-[#FFB300]" :
              "text-[#F5F7F8]"
            )}>
              {insight.text}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-[8px] text-[#9AA4AC] uppercase tracking-[0.3em] pt-4">
        Insights are algorithmically derived from session metrics.
      </p>
    </div>
  );
};
