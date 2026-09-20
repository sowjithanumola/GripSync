import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  RotateCcw, 
  Play, 
  ChevronRight, 
  Info, 
  Filter, 
  Calendar, 
  Smartphone,
  LayoutDashboard,
  BarChart3,
  Search,
  ArrowRightLeft,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SportType, SessionRecord } from '../types';
import { createMockSessions } from '../lib/mockData';

// Analytics Components
import { PressureTrend } from './analytics/PressureTrend';
import { GripConsistency } from './analytics/GripConsistency';
import { PatternDetection } from './analytics/PatternDetection';
import { ChangeDetection } from './analytics/ChangeDetection';
import { SessionComparison } from './analytics/SessionComparison';
import { PressureZones } from './analytics/PressureZones';
import { LiveMonitor } from './analytics/LiveMonitor';
import { SmartInsights } from './analytics/SmartInsights';
import { InsightTimeline } from './analytics/InsightTimeline';

const EQUIPMENT_OPTIONS: { id: SportType; label: string; icon: string }[] = [
  { id: 'BAT', label: 'CRICKET BAT', icon: '🏏' },
  { id: 'RACKET', label: 'TENNIS RACKET', icon: '🎾' },
  { id: 'CLUB', label: 'GOLF CLUB', icon: '🏌️' },
];

const TIME_RANGES = ['TODAY', '7 DAYS', '30 DAYS'];

export const LiveDemo: React.FC = () => {
  const [activeEquipment, setActiveEquipment] = useState<SportType>('BAT');
  const [timeRange, setTimeRange] = useState('7 DAYS');
  const [viewMode, setViewMode] = useState<'DASHBOARD' | 'LIVE' | 'VIDEO'>('DASHBOARD');
  const [selectedSessionId, setSelectedSessionId] = useState<string | 'ALL'>('ALL');

  const allSessions = useMemo(() => createMockSessions(activeEquipment), [activeEquipment]);
  
  const currentSession = useMemo(() => {
    if (selectedSessionId === 'ALL') return allSessions[allSessions.length - 1];
    return allSessions.find(s => s.id === selectedSessionId) || allSessions[allSessions.length - 1];
  }, [allSessions, selectedSessionId]);

  const previousSession = useMemo(() => {
    const currentIndex = allSessions.findIndex(s => s.id === currentSession.id);
    return currentIndex > 0 ? allSessions[currentIndex - 1] : undefined;
  }, [allSessions, currentSession]);

  const insights = useMemo(() => [
    { id: 'i1', text: "Pressure variation increased compared with the previous session.", type: 'warning' as const },
    { id: 'i2', text: "A longer stable-pressure period was observed during the power drill.", type: 'positive' as const },
    { id: 'i3', text: "Average grip pressure was higher than the previous simulated session.", type: 'neutral' as const },
  ], []);

  return (
    <section id="live-demo" className="py-24 bg-[#0B0D0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C6FF00]/10 border border-[#C6FF00]/20 rounded-full">
              <Activity className="w-3 h-3 text-[#C6FF00]" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-[#C6FF00] uppercase">GripSync Analytics Platform</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none">
              Smart Grip <span className="text-[#C6FF00]">Analytics</span>
            </h2>
            <div className="flex items-center gap-4 text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">
              <div className="flex items-center gap-2 bg-[#171B1F] px-3 py-1.5 rounded-sm border border-white/5">
                <Smartphone className="w-3 h-3" /> Connected: Simulation Mode
              </div>
              <div className="flex items-center gap-2 bg-[#171B1F] px-3 py-1.5 rounded-sm border border-white/5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF00] animate-pulse" /> Live Status: Active
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#171B1F] p-1 rounded-sm border border-white/5 flex">
              {[
                { id: 'DASHBOARD', icon: LayoutDashboard, label: 'ANALYTICS' },
                { id: 'LIVE', icon: Activity, label: 'LIVE MONITOR' },
                { id: 'VIDEO', icon: Play, label: 'DEMO VIDEO' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setViewMode(tab.id as any)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold tracking-widest transition-all rounded-sm",
                    viewMode === tab.id ? "bg-[#C6FF00] text-[#0B0D0F]" : "text-[#9AA4AC] hover:text-white"
                  )}
                >
                  <tab.icon className="w-3 h-3" /> {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FILTERS BAR */}
        {viewMode !== 'VIDEO' && (
          <div className="bg-[#171B1F] border border-white/5 p-4 rounded-sm mb-8 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <Filter className="w-3 h-3 text-[#9AA4AC]" />
                <span className="text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">Equipment</span>
                <div className="flex gap-2">
                  {EQUIPMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setActiveEquipment(opt.id)}
                      className={cn(
                        "px-3 py-1.5 text-[10px] font-bold tracking-widest border rounded-sm transition-all",
                        activeEquipment === opt.id ? "bg-[#C6FF00] border-[#C6FF00] text-[#0B0D0F]" : "border-white/10 text-[#9AA4AC] hover:border-white/20"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-6 w-px bg-white/5 hidden md:block" />

              <div className="flex items-center gap-3">
                <Calendar className="w-3 h-3 text-[#9AA4AC]" />
                <span className="text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">Range</span>
                <select 
                  value={timeRange} 
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-[10px] font-bold text-white uppercase tracking-widest border-none focus:ring-0 cursor-pointer"
                >
                  {TIME_RANGES.map(r => <option key={r} value={r} className="bg-[#171B1F]">{r}</option>)}
                </select>
              </div>

              <div className="h-6 w-px bg-white/5 hidden md:block" />

              <div className="flex items-center gap-3">
                <Search className="w-3 h-3 text-[#9AA4AC]" />
                <span className="text-[10px] font-bold text-[#9AA4AC] uppercase tracking-widest">Session</span>
                <select 
                  value={selectedSessionId} 
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                  className="bg-transparent text-[10px] font-bold text-white uppercase tracking-widest border-none focus:ring-0 cursor-pointer"
                >
                  <option value="ALL" className="bg-[#171B1F]">LATEST SESSION</option>
                  {allSessions.map(s => <option key={s.id} value={s.id} className="bg-[#171B1F]">{s.action}</option>)}
                </select>
              </div>
            </div>

            <div className="text-[8px] font-bold text-[#C6FF00] uppercase tracking-[0.4em] animate-pulse">
              SIMULATED DEMO DATA MODE
            </div>
          </div>
        )}

        {/* MAIN DASHBOARD CONTENT */}
        <AnimatePresence mode="wait">
          {viewMode === 'DASHBOARD' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* KEY METRICS GRID */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'AVERAGE PRESSURE', value: `${(currentSession.readings.reduce((acc, r) => acc + r.pressure, 0) / currentSession.readings.length).toFixed(1)}%`, icon: Target, color: 'text-[#C6FF00]' },
                  { label: 'GRIP CONSISTENCY', value: `${currentSession.consistency}%`, icon: Zap, color: 'text-[#C6FF00]' },
                  { label: 'PEAK PRESSURE', value: `${currentSession.peakForce}%`, icon: Activity, color: 'text-[#4D7CFE]' },
                  { label: 'PATTERNS DETECTED', value: currentSession.patterns.length.toString(), icon: Search, color: 'text-[#FF3D00]' },
                ].map((metric) => (
                  <div key={metric.label} className="bg-[#171B1F] border border-white/5 p-6 rounded-sm relative overflow-hidden group">
                    <metric.icon className={cn("absolute -right-4 -bottom-4 w-24 h-24 opacity-5 transition-transform group-hover:scale-110", metric.color)} />
                    <div className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-[0.3em] mb-4">{metric.label}</div>
                    <div className="text-3xl font-bold text-white tracking-tighter">{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* MAIN ANALYTICS GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-8">
                  <PressureTrend session={currentSession} previousSession={previousSession} />
                  <PressureZones session={currentSession} />
                  <SessionComparison sessions={allSessions} />
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <GripConsistency session={currentSession} />
                  <SmartInsights insights={insights} />
                  <PatternDetection patterns={currentSession.patterns} />
                  <ChangeDetection current={currentSession} previous={previousSession} />
                  <InsightTimeline events={currentSession.events} />
                </div>
              </div>
            </motion.div>
          )}

          {viewMode === 'LIVE' && (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LiveMonitor />
            </motion.div>
          )}

          {viewMode === 'VIDEO' && (
            <motion.div
              key="video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="aspect-video w-full bg-[#171B1F] border border-white/5 rounded-sm flex flex-col items-center justify-center relative overflow-hidden group"
            >
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

              <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C6FF00]/30" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-[#C6FF00]/30" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-[#C6FF00]/30" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C6FF00]/30" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-3">
          <Info className="w-3 h-3 text-[#9AA4AC]/50" />
          <p className="text-[10px] text-[#9AA4AC]/50 uppercase tracking-widest">
            Illustrative analytics based on simulated sensor input. Sensor calibration required for physical equipment integration.
          </p>
        </div>
      </div>
    </section>
  );
};
