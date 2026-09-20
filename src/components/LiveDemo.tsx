import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Activity, RotateCcw, Play, Save, ChevronRight, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { cn } from '../lib/utils';
import { SensorData, SessionRecord, SportType } from '../types';

const INITIAL_DATA: SensorData = {
  topHand: 0,
  bottomHand: 0,
  impact: 0,
  duration: 0,
};

const SPORTS: SportType[] = ['CRICKET', 'TENNIS', 'BADMINTON', 'HOCKEY', 'BASEBALL'];

export const LiveDemo: React.FC = () => {
  const [data, setData] = useState<SensorData>(INITIAL_DATA);
  const [activeSport, setActiveSport] = useState<SportType>('CRICKET');
  const [chartData, setChartData] = useState<any[]>([]);
  const [history, setHistory] = useState<SessionRecord[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [viewMode, setViewMode] = useState<'LAB' | 'VIDEO'>('LAB');
  const chartRef = useRef<any[]>([]);

  // Simulate live waveform
  useEffect(() => {
    const interval = setInterval(() => {
      const newPoint = {
        time: new Date().toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
        top: data.topHand + (Math.random() * 5 - 2.5),
        bottom: data.bottomHand + (Math.random() * 5 - 2.5),
        impact: data.impact,
      };

      chartRef.current = [...chartRef.current, newPoint].slice(-30);
      setChartData([...chartRef.current]);
    }, 500);

    return () => clearInterval(interval);
  }, [data]);

  const handleReset = () => {
    setData(INITIAL_DATA);
    setIsSimulating(false);
  };

  const addSession = (name: string, top: number, bottom: number, force: number) => {
    const score = Math.floor(70 + Math.random() * 25);
    const newRecord: SessionRecord = {
      id: Math.random().toString(36).substr(2, 9),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sport: activeSport,
      action: name,
      topHand: top,
      bottomHand: bottom,
      peakForce: force,
      score: score,
    };
    setHistory([newRecord, ...history]);
    setData({ ...data, topHand: top, bottomHand: bottom, impact: force });
  };

  const getGripInsight = () => {
    const total = data.topHand + data.bottomHand;
    if (total === 0) return { label: 'IDLE', color: 'text-[#9AA4AC]', text: 'Waiting for simulated grip input.' };
    
    if (activeSport === 'CRICKET') {
      if (data.topHand > 70 && data.bottomHand < 30) {
        return { label: 'STABLE', color: 'text-[#C6FF00]', text: 'Grip distribution is currently stable in this simulation.' };
      }
      if (data.bottomHand > 70) {
        return { label: 'ATTENTION', color: 'text-[#FFB300]', text: 'Unusual bottom-hand dominance detected in this simulation.' };
      }
    }

    if (data.impact > 80) {
      return { label: 'HIGH PRESSURE', color: 'text-[#FF3D00]', text: 'High grip pressure detected in the simulated input.' };
    }

    return { label: 'ACTIVE', color: 'text-[#4D7CFE]', text: 'Sensor readings detected and being processed.' };
  };

  const insight = getGripInsight();

  return (
    <section id="live-demo" className="py-24 bg-[#0B0D0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171B1F] border border-white/5 rounded-full mb-4">
              <div className="w-2 h-2 rounded-full bg-[#C6FF00] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest text-[#C6FF00]">LIVE SYSTEM DEMONSTRATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">SYSTEM EXPERIENCE</h2>
            <p className="text-[#9AA4AC] max-w-xl mt-4">
              View the physical prototype in action or explore the interactive sensor lab to see how GripSync translates grip into data.
            </p>
          </div>

          <div className="flex bg-[#171B1F] p-1 rounded-sm border border-white/5">
            <button
              onClick={() => setViewMode('LAB')}
              className={cn(
                "px-6 py-2 text-[10px] font-bold tracking-widest transition-all rounded-sm",
                viewMode === 'LAB' ? "bg-[#C6FF00] text-[#0B0D0F]" : "text-[#9AA4AC] hover:text-white"
              )}
            >
              SENSOR LAB
            </button>
            <button
              onClick={() => setViewMode('VIDEO')}
              className={cn(
                "px-6 py-2 text-[10px] font-bold tracking-widest transition-all rounded-sm",
                viewMode === 'VIDEO' ? "bg-[#C6FF00] text-[#0B0D0F]" : "text-[#9AA4AC] hover:text-white"
              )}
            >
              VIDEO DEMO
            </button>
          </div>
        </div>

        {viewMode === 'VIDEO' ? (
          <div className="aspect-video w-full bg-[#171B1F] border border-white/5 rounded-sm flex flex-col items-center justify-center relative overflow-hidden group">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(#C6FF00_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>
            
            <div className="relative z-10 text-center space-y-6 max-w-md px-6">
              <div className="w-20 h-20 bg-[#C6FF00]/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-[#C6FF00] fill-[#C6FF00]" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Prototype Action Video</h3>
              <p className="text-[#9AA4AC] text-sm leading-relaxed uppercase">
                Video demonstration will be available here shortly. <br />
                The drive link is being processed for integration.
              </p>
              <div className="pt-8">
                <div className="inline-block px-4 py-2 border border-[#C6FF00]/30 text-[10px] font-bold text-[#C6FF00] tracking-[0.3em] uppercase">
                  Awaiting Media Link
                </div>
              </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C6FF00]/30" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#C6FF00]/30" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-[#C6FF00]/30" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C6FF00]/30" />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {SPORTS.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold tracking-widest border transition-all rounded-sm",
                    activeSport === sport 
                      ? "bg-[#C6FF00] border-[#C6FF00] text-[#0B0D0F]" 
                      : "bg-transparent border-white/10 text-[#9AA4AC] hover:border-white/20"
                  )}
                >
                  {sport}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls Panel */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm">
                  <h3 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Control Interface</h3>
                  
                  <div className="space-y-8">
                    {[
                      { label: 'TOP-HAND PRESSURE', key: 'topHand', min: 0, max: 100 },
                      { label: 'BOTTOM-HAND PRESSURE', key: 'bottomHand', min: 0, max: 100 },
                      { label: 'IMPACT FORCE', key: 'impact', min: 0, max: 100 },
                      { label: 'GRIP DURATION (s)', key: 'duration', min: 0, max: 60 },
                    ].map((slider) => (
                      <div key={slider.key} className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold tracking-widest text-[#9AA4AC] uppercase">{slider.label}</label>
                          <span className="text-xs font-bold text-[#C6FF00]">{data[slider.key as keyof SensorData].toFixed(0)}</span>
                        </div>
                        <input
                          type="range"
                          min={slider.min}
                          max={slider.max}
                          value={data[slider.key as keyof SensorData]}
                          onChange={(e) => setData({ ...data, [slider.key]: parseFloat(e.target.value) })}
                          className="w-full h-1 bg-[#121518] rounded-full appearance-none cursor-pointer accent-[#C6FF00]"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-12">
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold tracking-widest text-[#9AA4AC] hover:bg-white/5 transition-all rounded-sm"
                    >
                      <RotateCcw className="w-3 h-3" /> RESET
                    </button>
                    <button
                      onClick={() => setIsSimulating(!isSimulating)}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-[#121518] text-[10px] font-bold tracking-widest text-white hover:bg-[#121518]/80 transition-all rounded-sm"
                    >
                      <Activity className="w-3 h-3 text-[#C6FF00]" /> {isSimulating ? 'STOP' : 'LIVE VIEW'}
                    </button>
                  </div>
                </div>

                <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm">
                  <h3 className="text-xs font-bold tracking-widest text-white mb-6 uppercase">Simulation Presets</h3>
                  <div className="space-y-3">
                    {activeSport === 'CRICKET' && (
                      <>
                        <button onClick={() => addSession('Perfect Defense', 85, 20, 45)} className="w-full flex items-center justify-between p-3 bg-[#121518] hover:bg-[#121518]/70 border border-transparent hover:border-[#C6FF00]/30 transition-all group">
                          <span className="text-[10px] font-bold text-[#9AA4AC] group-hover:text-white uppercase">PERFECT DEFENSE</span>
                          <ChevronRight className="w-4 h-4 text-[#C6FF00]" />
                        </button>
                        <button onClick={() => addSession('Faulty Defense', 30, 90, 35)} className="w-full flex items-center justify-between p-3 bg-[#121518] hover:bg-[#121518]/70 border border-transparent hover:border-[#FF3D00]/30 transition-all group">
                          <span className="text-[10px] font-bold text-[#9AA4AC] group-hover:text-white uppercase">FAULTY DEFENSE</span>
                          <ChevronRight className="w-4 h-4 text-[#FF3D00]" />
                        </button>
                      </>
                    )}
                    {activeSport === 'TENNIS' && (
                      <button onClick={() => addSession('Tennis Serve', 40, 60, 95)} className="w-full flex items-center justify-between p-3 bg-[#121518] hover:bg-[#121518]/70 border border-transparent hover:border-[#C6FF00]/30 transition-all group">
                        <span className="text-[10px] font-bold text-[#9AA4AC] group-hover:text-white uppercase">POWER SERVE</span>
                        <ChevronRight className="w-4 h-4 text-[#C6FF00]" />
                      </button>
                    )}
                    <button onClick={() => addSession('General Drill', 50, 50, 60)} className="w-full flex items-center justify-between p-3 bg-[#121518] hover:bg-[#121518]/70 border border-transparent hover:border-[#4D7CFE]/30 transition-all group">
                      <span className="text-[10px] font-bold text-[#9AA4AC] group-hover:text-white uppercase">NEUTRAL LOAD</span>
                      <ChevronRight className="w-4 h-4 text-[#4D7CFE]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Visualization Panel */}
              <div className="lg:col-span-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Grip Balance Gauge */}
                  <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm flex flex-col justify-between">
                    <h3 className="text-xs font-bold tracking-widest text-white mb-8 uppercase">Grip Balance</h3>
                    <div className="relative flex-1 flex flex-col items-center justify-center py-8">
                      <div className="w-full h-4 bg-[#121518] rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ left: '50%' }}
                          animate={{ left: `${(data.topHand / (data.topHand + data.bottomHand || 1)) * 100}%` }}
                          className="absolute top-0 w-4 h-full bg-[#C6FF00] shadow-[0_0_10px_rgba(198,255,0,0.5)] z-10"
                          style={{ transform: 'translateX(-50%)' }}
                        />
                        <div className="absolute inset-0 flex">
                          <div className="flex-1 border-r border-white/5" />
                          <div className="flex-1 border-r border-white/5" />
                          <div className="flex-1 border-r border-white/5" />
                          <div className="flex-1" />
                        </div>
                      </div>
                      <div className="flex justify-between w-full mt-4">
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-[#9AA4AC] uppercase">TOP HAND</div>
                          <div className="text-2xl font-bold text-[#C6FF00]">{((data.topHand / (data.topHand + data.bottomHand || 1)) * 100).toFixed(0)}%</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-[#9AA4AC] uppercase">BOTTOM HAND</div>
                          <div className="text-2xl font-bold text-[#4D7CFE]">{((data.bottomHand / (data.topHand + data.bottomHand || 1)) * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Insight Engine */}
                  <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-xs font-bold tracking-widest text-white uppercase">Insight Engine</h3>
                      <div className={cn("text-[10px] font-bold px-2 py-0.5 rounded-sm bg-[#121518] border border-white/5", insight.color)}>
                        {insight.label}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <p className="text-sm text-[#9AA4AC] leading-relaxed">
                        {insight.text}
                      </p>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                        <div>
                          <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1">CONSISTENCY</div>
                          <div className="text-lg font-bold text-white">86%</div>
                        </div>
                        <div>
                          <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1">STABILITY</div>
                          <div className="text-lg font-bold text-white">91%</div>
                        </div>
                        <div>
                          <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1">CONTROL</div>
                          <div className="text-lg font-bold text-white">78%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Waveform Visualization */}
                <div className="bg-[#171B1F] border border-white/5 p-6 rounded-sm">
                  <h3 className="text-xs font-bold tracking-widest text-white mb-8 uppercase">Sensor Waveform</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorTop" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C6FF00" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#C6FF00" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorBottom" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4D7CFE" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4D7CFE" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="time" 
                          stroke="#9AA4AC" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#9AA4AC" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          domain={[0, 120]}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#171B1F', borderColor: '#ffffff10', fontSize: '10px' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="top" stroke="#C6FF00" fillOpacity={1} fill="url(#colorTop)" strokeWidth={2} isAnimationActive={false} />
                        <Area type="monotone" dataKey="bottom" stroke="#4D7CFE" fillOpacity={1} fill="url(#colorBottom)" strokeWidth={2} isAnimationActive={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-8 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-[#C6FF00]" />
                      <span className="text-[10px] font-bold text-[#9AA4AC] uppercase">TOP HAND</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-1 bg-[#4D7CFE]" />
                      <span className="text-[10px] font-bold text-[#9AA4AC] uppercase">BOTTOM HAND</span>
                    </div>
                  </div>
                </div>

                {/* Session History */}
                <div className="bg-[#171B1F] border border-white/5 rounded-sm overflow-hidden">
                  <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-widest text-white uppercase">Session History</h3>
                    <button onClick={() => setHistory([])} className="text-[10px] font-bold text-[#9AA4AC] hover:text-white uppercase flex items-center gap-1 transition-colors">
                      <RotateCcw className="w-3 h-3" /> CLEAR ALL
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-[#121518] text-[8px] font-bold tracking-[0.2em] text-[#9AA4AC] uppercase">
                        <tr>
                          <th className="px-6 py-4">TIME</th>
                          <th className="px-6 py-4">SPORT</th>
                          <th className="px-6 py-4">ACTION</th>
                          <th className="px-6 py-4">TOP %</th>
                          <th className="px-6 py-4">BOTTOM %</th>
                          <th className="px-6 py-4">FORCE</th>
                          <th className="px-6 py-4 text-right">SCORE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {history.length > 0 ? (
                          history.map((record) => (
                            <tr key={record.id} className="hover:bg-white/2 transition-colors">
                              <td className="px-6 py-4 text-[10px] text-white font-mono">{record.time}</td>
                              <td className="px-6 py-4 text-[10px] text-[#9AA4AC]">{record.sport}</td>
                              <td className="px-6 py-4 text-[10px] text-white">{record.action}</td>
                              <td className="px-6 py-4 text-[10px] text-[#C6FF00]">{((record.topHand / (record.topHand + record.bottomHand || 1)) * 100).toFixed(0)}%</td>
                              <td className="px-6 py-4 text-[10px] text-[#4D7CFE]">{((record.bottomHand / (record.topHand + record.bottomHand || 1)) * 100).toFixed(0)}%</td>
                              <td className="px-6 py-4 text-[10px] text-white">{record.peakForce}</td>
                              <td className="px-6 py-4 text-[10px] text-right font-bold text-[#C6FF00]">{record.score}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-[10px] text-[#9AA4AC] uppercase tracking-widest">
                              No session data recorded
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-[10px] text-[#9AA4AC]/50 flex items-center gap-2">
                  <Info className="w-3 h-3" /> ILLUSTRATIVE / SIMULATED DATA FOR PROTOTYPE PRESENTATION
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
