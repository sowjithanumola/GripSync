import React from 'react';
import { SessionRecord } from '../../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  session: SessionRecord;
}

const ZONES = [
  { name: 'LOW', range: '0–35%', color: '#9AA4AC' },
  { name: 'NORMAL', range: '36–65%', color: '#4D7CFE' },
  { name: 'HIGH', range: '66–85%', color: '#C6FF00' },
  { name: 'PEAK', range: '86–100%', color: '#FF3D00' },
];

export const PressureZones: React.FC<Props> = ({ session }) => {
  const data = [
    { name: 'LOW', value: session.zones.low },
    { name: 'NORMAL', value: session.zones.normal },
    { name: 'HIGH', value: session.zones.high },
    { name: 'PEAK', value: session.zones.peak },
  ];

  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Pressure Zone Distribution</h3>
        <span className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">Demo Thresholds</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {ZONES.map((zone) => {
          const val = data.find(d => d.name === zone.name)?.value ?? 0;
          return (
            <div key={zone.name} className="p-4 bg-[#121518] border border-white/5 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: zone.color }} />
              <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1 tracking-widest">{zone.name} ({zone.range})</div>
              <div className="text-xl font-bold text-white tracking-tight">{val}%</div>
              <div className="w-full h-1 bg-white/5 mt-3 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-1000" 
                  style={{ width: `${val}%`, backgroundColor: zone.color }} 
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
            <XAxis dataKey="name" stroke="#9AA4AC" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#171B1F', border: '1px solid rgba(255,255,255,0.05)', fontSize: '10px' }}
              itemStyle={{ fontSize: '10px' }}
              labelStyle={{ display: 'none' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ZONES[index].color} fillOpacity={0.6} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[8px] text-[#9AA4AC] uppercase leading-relaxed tracking-widest text-center">
        Thresholds are configurable for specific equipment sensor calibrations.
      </p>
    </div>
  );
};
