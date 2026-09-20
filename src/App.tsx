import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronDown, 
  Target, 
  Eye, 
  Layers, 
  Cpu, 
  BarChart3, 
  Users, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Settings,
  ShieldCheck,
  Package,
  Globe,
  Dna,
  Radio,
  Activity,
  ChevronRight
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { GripVisualizer } from './components/GripVisualizer';
import { ExplodedGrip } from './components/ExplodedGrip';
import { CircuitSimulator } from './components/CircuitSimulator';
import { LiveDemo } from './components/LiveDemo';
import { cn } from './lib/utils';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F5F7F8] selection:bg-[#00E5FF] selection:text-[#0B0D0F] relative">
      <Navbar />
      
      {/* Global Background Logo Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://intellectual-peach-o5okbiyz.edgeone.dev/file.png')] bg-[length:120px_auto] bg-repeat opacity-50 rotate-12 scale-110" />
      </div>

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen pt-32 pb-20 overflow-hidden flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171B1F] border border-white/5 rounded-full self-start">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[#C6FF00] uppercase">Smart Sports Technology</span>
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
              TURN EVERY <br />
              <span className="text-[#C6FF00]">GRIP</span> INTO DATA.
            </h1>
            <p className="text-lg md:text-xl text-[#9AA4AC] max-w-lg leading-relaxed">
              GripSync transforms the connection between an athlete and their equipment into measurable performance data. A smart grip concept designed to capture pressure patterns and deliver training insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#live-demo" className="px-8 py-4 bg-[#C6FF00] text-[#0B0D0F] font-bold tracking-widest text-xs uppercase hover:bg-[#C6FF00]/90 transition-all rounded-sm text-center">
                TRY THE LIVE DEMO
              </a>
              <a href="#technology" className="px-8 py-4 border border-white/10 font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-all rounded-sm text-center">
                EXPLORE THE TECHNOLOGY
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <GripVisualizer />
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-[#9AA4AC]" />
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section id="problem" className="py-24 bg-[#121518]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">THE COACHING BLIND SPOT</h2>
            <p className="text-[#9AA4AC] text-lg">
              What happens when the most important data is happening where nobody can see it? An athlete's grip can change during training, but grip pressure and hand balance are difficult to measure through observation alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                num: '01', 
                title: 'HIDDEN CHANGES', 
                desc: 'Grip patterns can change as technique, intensity, or training conditions change.',
                icon: Eye
              },
              { 
                num: '02', 
                title: 'LIMITED VISIBILITY', 
                desc: 'A coach can observe movement, but cannot directly see pressure distribution inside the athlete\'s grip.',
                icon: Target
              },
              { 
                num: '03', 
                title: 'ACCESS BARRIER', 
                desc: 'Advanced sports analytics can be expensive or designed for specialized environments.',
                icon: Layers
              }
            ].map((item) => (
              <div key={item.num} className="bg-[#171B1F] p-10 border border-white/5 rounded-sm group hover:border-[#C6FF00]/30 transition-all">
                <div className="flex justify-between items-start mb-12">
                  <span className="text-6xl font-bold text-white/5 group-hover:text-[#C6FF00]/10 transition-colors">{item.num}</span>
                  <item.icon className="w-8 h-8 text-[#C6FF00]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase">{item.title}</h3>
                <p className="text-[#9AA4AC] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-[#171B1F] border border-white/5 rounded-sm">
            <h3 className="text-center text-xs font-bold tracking-[0.5em] text-[#9AA4AC] uppercase mb-12">Systemic Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              <div className="space-y-4">
                <div className="text-xs font-bold text-white uppercase">TRADITIONAL</div>
                <div className="space-y-2 text-[10px] font-bold text-[#9AA4AC] uppercase">
                  <div>COACH OBSERVATION</div>
                  <div className="opacity-50">↓</div>
                  <div>VIDEO INTERPRETATION</div>
                </div>
              </div>
              <div className="hidden md:flex justify-center">
                <ArrowRight className="text-[#C6FF00] w-8 h-8 opacity-20" />
              </div>
              <div className="space-y-4 p-6 bg-[#121518] border border-[#C6FF00]/20">
                <div className="text-xs font-bold text-[#C6FF00] uppercase">GRIPSYNC</div>
                <div className="space-y-2 text-[10px] font-bold text-white uppercase">
                  <div>SENSOR DATA</div>
                  <div className="text-[#C6FF00]">↓</div>
                  <div>VISUAL INSIGHT</div>
                </div>
              </div>
            </div>
            <p className="text-center mt-12 text-[10px] text-[#9AA4AC] tracking-widest uppercase">
              "GripSync is designed to give coaches and athletes another layer of information."
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION: Exploded Grip Diagram */}
      <ExplodedGrip />

      {/* TECHNOLOGY SECTION */}
      <section id="technology" className="py-24 bg-[#0B0D0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">ENGINEERED FOR THE GRIP.</h2>
              <p className="text-[#9AA4AC]">The sensing architecture is designed to capture high-resolution data while maintaining the athlete's natural interface with their equipment.</p>
            </div>
            <div className="flex gap-4">
              <div className="p-4 bg-[#171B1F] border border-white/5 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-[#C6FF00]">12bit</div>
                <div className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">Resolution</div>
              </div>
              <div className="p-4 bg-[#171B1F] border border-white/5 text-center min-w-[120px]">
                <div className="text-2xl font-bold text-[#4D7CFE]">&lt;10ms</div>
                <div className="text-[8px] font-bold text-[#9AA4AC] uppercase tracking-widest">Latency</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'FLEXIBLE SENSING', desc: 'Thin sensing elements designed to fit inside a sports grip.', icon: Dna },
              { title: 'LOW-POWER ELECTRONICS', desc: 'Compact electronics designed around limited equipment space.', icon: Cpu },
              { title: 'WIRELESS CONNECTIVITY', desc: 'Bluetooth Low Energy communication with mobile devices.', icon: Radio },
              { title: 'REAL-TIME VISUALIZATION', desc: 'Live dashboard translation of sensor readings.', icon: BarChart3 },
              { title: 'MODULAR DESIGN', desc: 'Adaptable architecture for multiple grip-based sports.', icon: Package },
              { title: 'AFFORDABLE ARCHITECTURE', desc: 'Cost-sensitive components for mass-market accessibility.', icon: Zap }
            ].map((tech) => (
              <div key={tech.title} className="bg-[#171B1F] p-8 border border-white/5 rounded-sm hover:bg-[#1c2228] transition-all">
                <tech.icon className="w-6 h-6 text-[#C6FF00] mb-6" />
                <h4 className="text-sm font-bold text-white mb-2 tracking-widest uppercase">{tech.title}</h4>
                <p className="text-xs text-[#9AA4AC] leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 md:p-16 bg-[#121518] rounded-sm relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 uppercase tracking-tight">Signal Pathway Visualization</h3>
                <div className="space-y-6">
                  {[
                    { l: 'PRESSURE', v: 'Analog' },
                    { l: 'SENSOR', v: 'Piezo-Capacitive' },
                    { l: 'ADC', v: 'Digital Conversion' },
                    { l: 'BLUETOOTH', v: 'Wireless Transmission' },
                    { l: 'APPLICATION', v: 'Visualization' }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]" />
                      <div className="flex-1 text-[10px] font-bold text-[#9AA4AC] tracking-widest uppercase">{step.l}</div>
                      <div className="text-[10px] font-bold text-[#C6FF00] tracking-widest uppercase">{step.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <svg viewBox="0 0 400 200" className="w-full max-w-sm">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <g key={i}>
                      <rect x={i * 80 + 10} y="80" width="60" height="40" rx="4" fill="#171B1F" stroke="#C6FF00" strokeWidth="0.5" />
                      {i < 4 && (
                        <motion.line
                          x1={i * 80 + 70} y1="100" x2={i * 80 + 90} y2="100"
                          stroke="#C6FF00" strokeWidth="1"
                          animate={{ strokeDashoffset: [20, 0] }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          strokeDasharray="4 4"
                        />
                      )}
                    </g>
                  ))}
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://intellectual-peach-o5okbiyz.edgeone.dev/file.png')] bg-[length:100px_auto] bg-repeat rotate-12 scale-150" />
            </div>
          </div>
        </div>
      </section>

      {/* PROTOTYPE SECTION */}
      <section id="prototype" className="py-24 bg-[#121518]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">FROM IDEA TO WORKING CONCEPT</h2>
            <p className="text-[#9AA4AC]">GripSync is currently in development as a working hardware prototype and digital concept.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <CircuitSimulator />

            <div className="space-y-4">
              <h3 className="text-xs font-bold tracking-[0.3em] text-[#C6FF00] uppercase mb-8">Prototype Roadmap</h3>
              {[
                { s: '01', l: 'CONCEPT', d: 'Industrial design and ergonomic studies.', done: true },
                { s: '02', l: '3D PRODUCT DESIGN', d: 'CAD modeling of grip and module components.', done: true },
                { s: '03', l: 'CIRCUIT DESIGN', d: 'Schematic development and component selection.', done: true },
                { s: '04', l: 'SENSOR TESTING', d: 'Evaluating thin-film pressure responses.', done: false },
                { s: '05', l: 'DIGITAL SIMULATION', d: 'High-fidelity UI and data-viz testing.', done: true },
                { s: '06', l: 'FUTURE VALIDATION', d: 'Live athlete testing and accuracy verification.', done: false }
              ].map((step) => (
                <div key={step.s} className={cn(
                  "p-6 border transition-all rounded-sm flex items-center gap-6",
                  step.done ? "bg-[#171B1F] border-white/5" : "bg-transparent border-white/5 opacity-50"
                )}>
                  <div className={cn("text-2xl font-bold", step.done ? "text-[#C6FF00]" : "text-[#9AA4AC]")}>{step.s}</div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-white tracking-widest uppercase mb-1">{step.l}</div>
                    <div className="text-[10px] text-[#9AA4AC] uppercase">{step.d}</div>
                  </div>
                  {step.done ? <CheckCircle2 className="w-4 h-4 text-[#C6FF00]" /> : <div className="w-4 h-4 rounded-full border border-white/10" />}
                </div>
              ))}
              <p className="text-[10px] text-[#9AA4AC] italic pt-4">Clearly labeled: Prototype development phase.</p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DEMO SECTION */}
      <LiveDemo />

      {/* MOBILE APP CONCEPT SECTION */}
      <section className="py-24 bg-[#121518]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative w-full max-w-[320px] mx-auto aspect-[9/18.5] bg-[#0B0D0F] border-[8px] border-[#171B1F] rounded-[40px] shadow-2xl overflow-hidden p-6 flex flex-col">
                {/* Speaker/Camera Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#171B1F] rounded-b-2xl" />
                
                {/* App UI */}
                <div className="flex-1 flex flex-col pt-8">
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-[10px] font-bold text-white tracking-tighter">GRIPSYNC</div>
                    <Settings className="w-4 h-4 text-[#9AA4AC]" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-[#171B1F] rounded-xl">
                      <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-2">Daily Score</div>
                      <div className="text-3xl font-bold text-[#C6FF00]">86</div>
                      <div className="text-[8px] text-[#C6FF00] mt-1">+4% from yesterday</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 bg-[#171B1F] rounded-xl">
                        <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1">Pressure</div>
                        <div className="text-xl font-bold text-white">72%</div>
                      </div>
                      <div className="p-4 bg-[#171B1F] rounded-xl">
                        <div className="text-[8px] font-bold text-[#9AA4AC] uppercase mb-1">Balance</div>
                        <div className="text-xl font-bold text-[#C6FF00]">GOOD</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="text-[10px] font-bold text-white uppercase">Today's Insight</div>
                      <div className="p-4 bg-[#121518] border border-white/5 rounded-xl">
                        <p className="text-[10px] text-[#9AA4AC] leading-relaxed">
                          "Grip consistency changed during the simulated session. Review impact drills."
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 border-t border-white/5 pt-4">
                      <div className="flex justify-between items-end h-20 gap-1">
                        {[40, 60, 45, 90, 65, 80, 50].map((h, i) => (
                          <div key={i} className="flex-1 bg-[#4D7CFE]/20 rounded-t-sm relative group">
                            <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-[#4D7CFE] rounded-t-sm" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <span className="text-[8px] font-bold text-[#9AA4AC] tracking-[0.3em] uppercase">CONCEPT UI</span>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase leading-none">THE COACH <br /> IN YOUR POCKET.</h2>
              <p className="text-[#9AA4AC] text-lg">
                The GripSync mobile application translates complex sensor patterns into actionable training insights, scores, and historical trends.
              </p>
              <ul className="space-y-6">
                {[
                  { t: 'Live Coaching', d: 'Instant feedback during active training drills.' },
                  { t: 'Performance Scoring', d: 'Standardized metrics for comparing sessions.' },
                  { t: 'Trend Analysis', d: 'Track consistency and technique shifts over time.' }
                ].map((item) => (
                  <li key={item.t} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle2 className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white uppercase tracking-widest">{item.t}</div>
                      <div className="text-sm text-[#9AA4AC]">{item.d}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS MODEL SECTION */}
      <section id="business" className="py-24 bg-[#0B0D0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">DESIGNED FOR ACCESSIBILITY.</h2>
            <p className="text-[#9AA4AC] max-w-2xl mx-auto">
              The product concept is intended to target a more affordable price point than many specialized sports-analysis systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { l: 'TARGET COST', v: '₹300', d: 'Illustrative manufacturing estimate' },
              { l: 'TARGET RETAIL', v: '₹899', d: 'Potential accessible price point' },
              { l: 'POTENTIAL MARGIN', v: '₹599', d: 'Business model assumption' }
            ].map((item) => (
              <div key={item.l} className="bg-[#171B1F] p-8 border border-white/5 rounded-sm text-center">
                <div className="text-[10px] font-bold text-[#9AA4AC] tracking-widest uppercase mb-4">{item.l}</div>
                <div className="text-4xl font-bold text-white mb-2">{item.v}</div>
                <div className="text-[8px] font-bold text-[#C6FF00] tracking-widest uppercase">{item.d}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-4 md:px-0 bg-white/5 border border-white/10">
            {[
              { t: 'VALUE PROPOSITIONS', d: 'Affordable smart grip analytics for mass market.' },
              { t: 'CUSTOMER SEGMENTS', d: 'Student athletes, academy players, coaches.' },
              { t: 'CHANNELS', d: 'Online sales, sports retailers, partnerships.' },
              { t: 'REVENUE STREAMS', d: 'Hardware sales and optional app features.' },
              { t: 'KEY ACTIVITIES', d: 'Hardware development, testing, manufacturing.' },
              { t: 'KEY PARTNERS', d: 'Sports academies, equipment manufacturers.' }
            ].map((box) => (
              <div key={box.t} className="bg-[#121518] p-8 aspect-square flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#C6FF00] tracking-widest uppercase mb-4">{box.t}</div>
                <p className="text-xs text-[#9AA4AC] leading-relaxed uppercase">{box.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFETY + RESPONSIBLE DESIGN */}
      <section className="py-24 bg-[#121518]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-[#171B1F] p-10 border-l-4 border-[#FFB300] rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <ShieldCheck className="w-8 h-8 text-[#FFB300]" />
                <h3 className="text-xl font-bold text-white uppercase">TRAINING TECHNOLOGY. NOT MEDICAL DIAGNOSIS.</h3>
              </div>
              <p className="text-[#9AA4AC] leading-relaxed">
                GripSync is a sports-performance prototype designed to help users understand grip patterns and changes in training data. It is not intended to diagnose injuries or medical conditions.
              </p>
            </div>
            <div className="bg-[#171B1F] p-10 border-l-4 border-[#FF3D00] rounded-sm">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-8 h-8 text-[#FF3D00]" />
                <h3 className="text-xl font-bold text-white uppercase">PROFESSIONAL CONSULTATION</h3>
              </div>
              <p className="text-[#9AA4AC] leading-relaxed">
                Pain or physical discomfort should always be discussed with a parent, coach or qualified healthcare professional. GripSync is a tool for training awareness, not a clinical validation device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP SECTION */}
      <section id="roadmap" className="py-24 bg-[#0B0D0F]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-20">PROJECT ROADMAP</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 hidden md:block" />
            {[
              { t: 'NOW', d: 'Prototype concept' },
              { t: 'NEXT', d: 'Sensor validation' },
              { t: 'NEXT', d: 'Mobile application' },
              { t: 'FUTURE', d: 'Multi-sport product' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-12 h-12 bg-[#171B1F] border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#C6FF00] transition-colors">
                  <div className="w-2 h-2 rounded-full bg-[#C6FF00]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#C6FF00] tracking-[0.3em] uppercase mb-2">{step.t}</div>
                  <div className="text-sm font-bold text-white uppercase">{step.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-[#121518]">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold tracking-tighter text-white uppercase mb-12 text-center">COMMON QUESTIONS</h2>
          <div className="space-y-4">
            {[
              { q: 'What is GripSync?', a: 'A smart grip concept designed to measure and visualize grip-related training data.' },
              { q: 'Which sports can use it?', a: 'The initial concept focuses on cricket and tennis, with potential adaptation to other grip-based sports.' },
              { q: 'Does GripSync diagnose injuries?', a: 'No. GripSync is a training and performance-awareness concept, not a medical diagnostic device.' },
              { q: 'Is the data real?', a: 'The interactive website demo uses simulated data. Hardware validation would be required for real-world measurements.' }
            ].map((faq, i) => (
              <div key={i} className="bg-[#171B1F] border border-white/5 p-6 rounded-sm">
                <h4 className="text-sm font-bold text-white uppercase mb-4">{faq.q}</h4>
                <p className="text-sm text-[#9AA4AC] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 bg-[#0B0D0F] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.9] mb-12">
            THE FUTURE OF <br /> SPORTS DATA <br />
            <span className="text-[#C6FF00]">STARTS AT THE GRIP.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#live-demo" className="px-10 py-5 bg-[#C6FF00] text-[#0B0D0F] font-bold tracking-widest text-xs uppercase hover:bg-[#C6FF00]/90 transition-all rounded-sm">
              TRY THE LIVE DEMO
            </a>
            <a href="#home" className="px-10 py-5 border border-white/10 font-bold tracking-widest text-xs uppercase hover:bg-white/5 transition-all rounded-sm">
              BACK TO TOP
            </a>
          </div>
          <motion.div
            className="mt-20 h-px bg-gradient-to-r from-transparent via-[#C6FF00]/50 to-transparent"
            animate={{ scaleX: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-[#0B0D0F] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            <div className="space-y-6">
              <div className="space-y-4">
                <img 
                  src="https://intellectual-peach-o5okbiyz.edgeone.dev/file.png" 
                  alt="GripSync Logo" 
                  className="h-8 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="text-[8px] font-bold tracking-[0.4em] text-[#C6FF00] uppercase">Smart Sports Technology</div>
              </div>
              <p className="text-xs text-[#9AA4AC] leading-relaxed uppercase max-w-xs">
                "Turn Every Grip Into Data." <br />
                Pioneering the next generation of sports performance analytics through integrated sensing technology.
              </p>
            </div>
            
            <div>
              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase mb-6">SITEMAP</h5>
              <ul className="grid grid-cols-2 gap-4">
                {['HOME', 'PROBLEM', 'SOLUTION', 'TECHNOLOGY', 'PROTOTYPE'].map(link => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-[10px] text-[#9AA4AC] hover:text-[#C6FF00] transition-colors font-bold tracking-widest uppercase flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#C6FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-[10px] font-bold text-white tracking-widest uppercase mb-6">RESOURCES</h5>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  { name: 'LIVE DEMO', href: '#live-demo' },
                  { name: 'BUSINESS', href: '#business' },
                  { name: 'ROADMAP', href: '#roadmap' },
                  { name: 'FAQ', href: '#roadmap' } // Pointing to roadmap as it contains FAQ/next steps
                ].map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[10px] text-[#9AA4AC] hover:text-[#C6FF00] transition-colors font-bold tracking-widest uppercase flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-[#C6FF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8">
            <div className="text-[8px] font-bold text-[#9AA4AC]/50 tracking-[0.2em] uppercase">
              © 2026 GRIPSYNC | ALL RIGHTS RESERVED
            </div>
            <div className="text-[8px] font-bold text-[#9AA4AC]/50 tracking-[0.2em] uppercase max-w-xl md:text-right">
              GripSync is a sports-technology prototype concept. Demonstration data is simulated. No medical claims are implied or intended.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
