import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SessionRecord } from '../../types';
import { Info } from 'lucide-react';

interface Props {
  session: SessionRecord;
  previousSession?: SessionRecord;
}

export const PressureTrend: React.FC<Props> = ({ session, previousSession }) => {
  const avgPressure = session.readings.reduce((acc, r) => acc + r.pressure, 0) / session.readings.length;
  const maxPressure = Math.max(...session.readings.map(r => r.pressure));
  const minPressure = Math.min(...session.readings.map(r => r.pressure));
  
  const chartData = session.readings.map((r, i) => ({
    time: i,
    current: r.pressure,
    previous: previousSession?.readings[i]?.pressure ?? null
  }));

  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Pressure Trend Analysis</h3>
        <div className="flex items-center gap-2 text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">
          <Info className="w-3 h-3" /> Simulated Demo Data
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'AVERAGE', value: `${avgPressure.toFixed(1)}%` },
          { label: 'PEAK', value: `${session.peakForce}%` },
          { label: 'MINIMUM', value: `${minPressure.toFixed(1)}%` },
          { label: 'VARIATION', value: `${session.variation}%` },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-[#121518] border border-white/5 rounded-sm">
            <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1 tracking-widest">{stat.label}</div>
            <div className="text-xl font-bold text-white tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C6FF00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#C6FF00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis hide dataKey="time" />
            <YAxis 
              stroke="#9AA4AC" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#171B1F', border: '1px solid rgba(255,255,255,0.05)', fontSize: '10px' }}
              itemStyle={{ fontSize: '10px' }}
              labelStyle={{ display: 'none' }}
            />
            {previousSession && (
              <Area 
                type="monotone" 
                dataKey="previous" 
                stroke="#9AA4AC" 
                fill="transparent" 
                strokeWidth={1} 
                strokeDasharray="4 4"
                name="Previous Session"
              />
            )}
            <Area 
              type="monotone" 
              dataKey="current" 
              stroke="#C6FF00" 
              fillOpacity={1} 
              fill="url(#colorCurrent)" 
              strokeWidth={2} 
              name="Current Session"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-8 pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#C6FF00]" />
          <span className="text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">Current Session</span>
        </div>
        {previousSession && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[#9AA4AC] border-t border-dashed" />
            <span className="text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">Previous Session</span>
          </div>
        )}
      </div>
    </div>
  );
};
