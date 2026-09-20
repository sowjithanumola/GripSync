import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RotateCcw, StopCircle, Info } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis } from 'recharts';
import { cn } from '../../lib/utils';

interface LivePoint {
  time: number;
  pressure: number;
}

export const LiveMonitor: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [points, setPoints] = useState<LivePoint[]>([]);
  const [currentPressure, setCurrentPressure] = useState(0);
  const [peakPressure, setPeakPressure] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        const newPressure = Math.max(0, Math.min(100, 40 + Math.sin(Date.now() * 0.001) * 20 + (Math.random() * 10 - 5)));
        setCurrentPressure(newPressure);
        setPeakPressure(prev => Math.max(prev, newPressure));
        setDuration(prev => prev + 1);
        setPoints(prev => [...prev, { time: Date.now(), pressure: newPressure }].slice(-50));
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, isPaused]);

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setPoints([]);
    setCurrentPressure(0);
    setPeakPressure(0);
    setDuration(0);
  };

  const getZone = (p: number) => {
    if (p < 35) return { name: 'LOW', color: 'text-[#9AA4AC]' };
    if (p < 65) return { name: 'NORMAL', color: 'text-[#4D7CFE]' };
    if (p < 85) return { name: 'HIGH', color: 'text-[#C6FF00]' };
    return { name: 'PEAK', color: 'text-[#FF3D00]' };
  };

  const zone = getZone(currentPressure);

  return (
    <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={cn("w-2 h-2 rounded-full", isActive && !isPaused ? "bg-[#FF3D00] animate-pulse" : "bg-[#9AA4AC]")} />
          <h3 className="text-xs font-bold tracking-[0.3em] text-white uppercase">Live Grip Monitor</h3>
        </div>
        <div className="flex items-center gap-2 text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">
          <Info className="w-3 h-3" /> Simulated Input
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-[#121518] p-6 rounded-sm space-y-6">
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={points}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis hide dataKey="time" />
                <YAxis hide domain={[0, 100]} />
                <Area 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#C6FF00" 
                  fill="#C6FF00" 
                  fillOpacity={0.1} 
                  strokeWidth={2} 
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex justify-center gap-4">
            {!isActive ? (
              <button 
                onClick={() => setIsActive(true)}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#C6FF00] text-[#0B0D0F] text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#C6FF00]/90 transition-all"
              >
                <Play className="w-3 h-3 fill-current" /> Start Session
              </button>
            ) : (
              <>
                <button 
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#171B1F] border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-white/5 transition-all"
                >
                  {isPaused ? <><Play className="w-3 h-3 fill-current" /> Resume</> : <><Pause className="w-3 h-3 fill-current" /> Pause</>}
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FF3D00]/10 border border-[#FF3D00]/20 text-[#FF3D00] text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-[#FF3D00]/20 transition-all"
                >
                  <StopCircle className="w-3 h-3" /> End Session
                </button>
              </>
            )}
            <button 
              onClick={handleReset}
              className="px-6 py-4 bg-[#171B1F] border border-white/10 text-[#9AA4AC] text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-white/5 transition-all"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 bg-[#121518] border border-white/5 rounded-sm">
            <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-2 tracking-widest">CURRENT PRESSURE</div>
            <div className="flex items-baseline gap-2">
              <div className="text-4xl font-bold text-white tracking-tighter">{currentPressure.toFixed(0)}%</div>
              <div className={cn("text-[10px] font-bold tracking-widest uppercase", zone.color)}>{zone.name}</div>
            </div>
          </div>
          <div className="p-6 bg-[#121518] border border-white/5 rounded-sm">
            <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-2 tracking-widest">SESSION STATS</div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-[#9AA4AC] uppercase">PEAK FORCE</div>
                <div className="text-sm font-bold text-white">{peakPressure.toFixed(0)}%</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-[10px] text-[#9AA4AC] uppercase">DURATION</div>
                <div className="text-sm font-bold text-white">{(duration / 10).toFixed(1)}s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
