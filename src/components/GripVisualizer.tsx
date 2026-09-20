import React from 'react';
import { motion } from 'motion/react';

export const GripVisualizer: React.FC = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-[16/9] flex items-center justify-center">
      <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-[0_0_30px_rgba(198,255,0,0.2)]">
        {/* Grip Background Handle */}
        <rect x="100" y="150" width="600" height="100" rx="50" fill="#171B1F" />
        
        {/* Grip Textures (Diagonal Lines) */}
        <defs>
          <pattern id="grip-pattern" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#0B0D0F" strokeWidth="4" />
          </pattern>
        </defs>
        <rect x="100" y="150" width="600" height="100" rx="50" fill="url(#grip-pattern)" opacity="0.5" />

        {/* Sensor Layer Glow */}
        <motion.rect
          x="120" y="160" width="560" height="80" rx="40"
          fill="transparent"
          stroke="#C6FF00"
          strokeWidth="1"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Technical Lines / Sensor Pathways */}
        <path d="M150 200 L650 200" stroke="#C6FF00" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        <path d="M150 180 L650 180" stroke="#C6FF00" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
        <path d="M150 220 L650 220" stroke="#C6FF00" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

        {/* Pulsing Data Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r="2"
            fill="#C6FF00"
            initial={{ cx: 150 + i * 100, cy: 200 }}
            animate={{ cx: [150 + i * 100, 650], opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
          />
        ))}

        {/* Electronics Module */}
        <g transform="translate(350, 175)">
          <rect width="100" height="50" rx="10" fill="#121518" stroke="#4D7CFE" strokeWidth="2" />
          <text x="50" y="25" textAnchor="middle" dominantBaseline="middle" fill="#C6FF00" fontSize="10" fontWeight="bold" letterSpacing="1">
            GRIPSYNC
          </text>
          {/* Status LED */}
          <motion.circle
            cx="85" cy="15" r="3"
            animate={{ fill: ["#C6FF00", "#4D7CFE", "#C6FF00"] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </g>

        {/* Labels */}
        <g className="text-[10px] font-bold fill-[#9AA4AC]">
          <text x="150" y="140">PRESSURE: <tspan fill="#C6FF00">72%</tspan></text>
          <text x="550" y="140">SIGNAL: <tspan fill="#C6FF00">CONNECTED</tspan></text>
          <text x="150" y="275">TOP HAND: <tspan fill="#C6FF00">68%</tspan></text>
          <text x="550" y="275">BLUETOOTH: <tspan fill="#C6FF00">ACTIVE</tspan></text>
        </g>
      </svg>

      {/* Floating Info Cards */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute left-0 top-1/4 bg-[#171B1F]/80 backdrop-blur-md p-3 border border-white/5 rounded-sm"
      >
        <div className="text-[8px] uppercase tracking-widest text-[#9AA4AC] mb-1">Live Pressure</div>
        <div className="text-xl font-bold text-[#C6FF00]">642.5<span className="text-[10px] ml-1">PSI</span></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute right-0 bottom-1/4 bg-[#171B1F]/80 backdrop-blur-md p-3 border border-white/5 rounded-sm"
      >
        <div className="text-[8px] uppercase tracking-widest text-[#9AA4AC] mb-1">Balance Index</div>
        <div className="text-xl font-bold text-[#4D7CFE]">8.4<span className="text-[10px] ml-1">OPT</span></div>
      </motion.div>
    </div>
  );
};
