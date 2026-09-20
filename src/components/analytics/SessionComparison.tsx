import React from 'react';
import { SessionRecord } from '../../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Props {
  sessions: SessionRecord[];
}

export const SessionComparison: React.FC<Props> = ({ sessions }) => {
  const comparisonData = sessions.map(s => ({
    name: s.action.split(' ').pop(),
    avg: s.readings.reduce((acc, r) => acc + r.pressure, 0) / s.readings.length,
    consistency: s.consistency,
    peak: s.peakForce
  }));

  const radarData = [
    { subject: 'AVG PRESSURE', A: sessions[0]?.score ?? 0, B: sessions[sessions.length - 1]?.score ?? 0, fullMark: 100 },
    { subject: 'CONSISTENCY', A: sessions[0]?.consistency ?? 0, B: sessions[sessions.length - 1]?.consistency ?? 0, fullMark: 100 },
    { subject: 'STABILITY', A: sessions[0]?.stability ?? 0, B: sessions[sessions.length - 1]?.stability ?? 0, fullMark: 100 },
    { subject: 'CONTROL', A: 80, B: 85, fullMark: 100 },
    { subject: 'PEAK FORCE', A: sessions[0]?.peakForce ?? 0, B: sessions[sessions.length - 1]?.peakForce ?? 0, fullMark: 100 },
  ];

  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Multi-Session Comparison</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="name" stroke="#9AA4AC" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#9AA4AC" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#171B1F', border: '1px solid rgba(255,255,255,0.05)', fontSize: '10px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Legend iconType="rect" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
              <Bar dataKey="avg" name="Avg Pressure" fill="#4D7CFE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="consistency" name="Consistency" fill="#C6FF00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#ffffff10" />
              <PolarAngleAxis dataKey="subject" stroke="#9AA4AC" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} hide />
              <Radar 
                name="Earliest Session" 
                dataKey="A" 
                stroke="#4D7CFE" 
                fill="#4D7CFE" 
                fillOpacity={0.4} 
              />
              <Radar 
                name="Latest Session" 
                dataKey="B" 
                stroke="#C6FF00" 
                fill="#C6FF00" 
                fillOpacity={0.4} 
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', paddingTop: '20px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
