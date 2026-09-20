import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Cpu, Battery, Radio, Power, RefreshCw } from 'lucide-react';
import { cn } from '../lib/utils';

export const CircuitSimulator: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressure, setPressure] = useState(0);

  const handlePress = () => {
    setIsPressed(true);
    setPressure(Math.floor(Math.random() * 200 + 700)); // 700-900 range
    setTimeout(() => setIsPressed(false), 200);
  };

  const handleReset = () => {
    setPressure(0);
    setIsPressed(false);
  };

  return (
    <div className="bg-[#171B1F] border border-white/5 rounded-sm p-8 overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-[#121518] rounded-sm">
            <Cpu className="w-5 h-5 text-[#C6FF00]" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-widest text-white uppercase">VIRTUAL CIRCUIT LAB</h3>
            <p className="text-[10px] text-[#9AA4AC] uppercase">Prototype Stage: Logic Validation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", pressure > 0 ? "bg-[#C6FF00] shadow-[0_0_8px_rgba(198,255,0,0.5)]" : "bg-white/10")} />
          <span className="text-[8px] font-bold tracking-widest text-[#9AA4AC] uppercase">SIGNAL STATUS</span>
        </div>
      </div>

      <div className="relative h-[300px] flex items-center justify-center">
        <svg viewBox="0 0 600 300" className="w-full h-full">
          {/* Circuit Paths */}
          <g stroke="#ffffff10" strokeWidth="1" fill="none">
            <path d="M100 150 H200" />
            <path d="M250 150 H350" />
            <path d="M400 150 H500" />
            <path d="M300 150 V220 H100" />
          </g>

          {/* Active Signal Pulses */}
          <AnimatePresence>
            {pressure > 0 && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.path
                  d="M100 150 H500"
                  stroke="#C6FF00"
                  strokeWidth="2"
                  strokeDasharray="20 480"
                  animate={{ strokeDashoffset: [-500, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Components */}
          {/* Force Sensor */}
          <g transform="translate(100, 130)">
            <rect width="50" height="40" rx="4" fill={isPressed ? "#C6FF00" : "#121518"} stroke="#C6FF00" strokeWidth="1" className="transition-colors duration-100" />
            <Zap className={cn("w-4 h-4 x-[17] y-[12]", isPressed ? "text-[#0B0D0F]" : "text-[#C6FF00]")} x="17" y="12" />
            <text x="25" y="55" textAnchor="middle" fill="#9AA4AC" fontSize="8" fontWeight="bold">SENSOR</text>
          </g>

          {/* Microcontroller */}
          <g transform="translate(250, 120)">
            <rect width="100" height="60" rx="4" fill="#121518" stroke="#4D7CFE" strokeWidth="1" />
            <rect x="10" y="10" width="80" height="40" rx="2" fill="#ffffff05" />
            <text x="50" y="35" textAnchor="middle" fill="#4D7CFE" fontSize="8" fontWeight="bold">CPU-X1</text>
            <text x="50" y="75" textAnchor="middle" fill="#9AA4AC" fontSize="8" fontWeight="bold">CONTROLLER</text>
          </g>

          {/* Wireless Out */}
          <g transform="translate(450, 130)">
            <rect width="50" height="40" rx="4" fill="#121518" stroke="#C6FF00" strokeWidth="1" />
            <Radio className="w-4 h-4 text-[#C6FF00]" x="17" y="12" />
            <text x="25" y="55" textAnchor="middle" fill="#9AA4AC" fontSize="8" fontWeight="bold">OUTPUT</text>
          </g>

          {/* Power Source */}
          <g transform="translate(100, 200)">
            <rect width="50" height="40" rx="4" fill="#121518" stroke="#4D7CFE" strokeWidth="1" />
            <Battery className="w-4 h-4 text-[#4D7CFE]" x="17" y="12" />
            <text x="25" y="55" textAnchor="middle" fill="#9AA4AC" fontSize="8" fontWeight="bold">POWER</text>
          </g>
        </svg>

        {/* Dashboard Display Overlay */}
        <div className="absolute top-0 right-0 p-4 space-y-4">
          <div className="bg-[#121518] p-3 border border-white/5 rounded-sm min-w-[120px]">
            <div className="text-[8px] font-bold text-[#9AA4AC] tracking-widest uppercase mb-1">ADC Value</div>
            <div className="text-xl font-bold text-[#C6FF00] font-mono">{pressure.toString().padStart(4, '0')}</div>
          </div>
          <div className="bg-[#121518] p-3 border border-white/5 rounded-sm min-w-[120px]">
            <div className="text-[8px] font-bold text-[#9AA4AC] tracking-widest uppercase mb-1">LED Status</div>
            <div className={cn("text-xs font-bold uppercase", pressure > 0 ? "text-[#C6FF00]" : "text-white/20")}>
              {pressure > 0 ? 'ACTIVE' : 'READY'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <button
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          className="flex items-center justify-center gap-3 px-6 py-4 bg-[#C6FF00] text-[#0B0D0F] text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[#C6FF00]/90 transition-all active:scale-95"
        >
          <Power className="w-4 h-4" /> PRESS SENSOR
        </button>
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-3 px-6 py-4 border border-white/10 text-[#9AA4AC] text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-white/5 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> RESET CIRCUIT
        </button>
      </div>
    </div>
  );
};
