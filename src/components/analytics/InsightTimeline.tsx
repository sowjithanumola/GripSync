import React from 'react';
import { TimelineEvent } from '../../types';
import { Clock } from 'lucide-react';

interface Props {
  events: TimelineEvent[];
}

export const InsightTimeline: React.FC<Props> = ({ events }) => {
  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Detected Event Timeline</h3>
        <Clock className="w-4 h-4 text-[#9AA4AC]" />
      </div>

      <div className="relative space-y-6">
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/5" />
        
        {events.map((event) => (
          <div key={event.id} className="relative pl-8 group">
            <div className="absolute left-0 top-1.5 w-6 h-6 bg-[#121518] border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#C6FF00] transition-colors z-10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="text-[10px] font-bold text-white tracking-widest uppercase min-w-[60px]">{event.time}</div>
              <div className="p-3 bg-[#121518] border border-white/5 rounded-sm flex-1 group-hover:border-white/10 transition-all">
                <div className="text-[8px] font-bold text-[#C6FF00] uppercase tracking-[0.2em] mb-1">{event.type}</div>
                <div className="text-[10px] text-[#9AA4AC] uppercase tracking-widest leading-relaxed">
                  {event.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
