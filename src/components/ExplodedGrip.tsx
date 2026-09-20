import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface Layer {
  id: string;
  name: string;
  description: string;
  specs: string[];
}

const LAYERS: Layer[] = [
  {
    id: 'grip-wrap',
    name: 'LAYER 01: GRIP WRAP',
    description: "The athlete's normal grip surface. Designed to maintain the familiar tactile feel and high-performance friction of standard sports equipment.",
    specs: ['Material: Synthetic elastomer', 'Texture: Diamond-grid traction', 'Thickness: 1.5mm', 'Compatibility: Universal wrap']
  },
  {
    id: 'sensor-array',
    name: 'LAYER 02: FLEXIBLE SENSOR ARRAY',
    description: "Ultra-thin capacitive sensing elements positioned beneath the grip wrap. These elements respond to pressure changes in real-time.",
    specs: ['Technology: Printed flexible sensors', 'Response Time: <10ms', 'Sensitivity: 0-100 PSI', 'Lifecycle: >1M grip events']
  },
  {
    id: 'module',
    name: 'LAYER 03: PROCESSING MODULE',
    description: "Compact electronics for reading and processing sensor signals. Features a high-speed ADC and noise filtering for clean data.",
    specs: ['Chipset: ARM Cortex-M Series', 'Resolution: 12-bit ADC', 'Filtering: Adaptive digital filter', 'Size: 12mm x 24mm']
  },
  {
    id: 'power',
    name: 'LAYER 04: POWER + WIRELESS',
    description: "Low-power electronics and wireless communication. Integrated battery management for long-lasting training sessions.",
    specs: ['Comms: Bluetooth Low Energy 5.0', 'Battery: Li-Po Rechargeable', 'Charge Time: 45 min', 'Battery Life: 12 hours active']
  }
];

export const ExplodedGrip: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section id="solution" className="py-24 bg-[#121518]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-6">
            THE TECHNOLOGY BELONGS <br /> WHERE THE ATHLETE TOUCHES.
          </h2>
          <p className="text-[#9AA4AC] max-w-2xl mx-auto">
            "Put the sensor inside the grip—not on the athlete." GripSync uses a flexible sensing layer integrated with the equipment grip and a compact electronics module.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Exploded SVG */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center">
            <svg viewBox="0 0 600 600" className="w-full h-full">
              {/* Central Axis */}
              <line x1="100" y1="300" x2="500" y2="300" stroke="#ffffff10" strokeWidth="1" strokeDasharray="5 5" />
              
              {/* Layer 04: Power */}
              <motion.g 
                onClick={() => setActiveLayer('power')}
                className="cursor-pointer"
                animate={{ y: activeLayer === 'power' ? -20 : 0 }}
              >
                <rect x="250" y="280" width="100" height="40" rx="4" fill="#171B1F" stroke="#4D7CFE" strokeWidth={activeLayer === 'power' ? 2 : 1} />
                <text x="300" y="305" textAnchor="middle" fill="#4D7CFE" fontSize="8" fontWeight="bold">MODULE B</text>
              </motion.g>

              {/* Layer 03: Processing */}
              <motion.g 
                onClick={() => setActiveLayer('module')}
                className="cursor-pointer"
                animate={{ y: activeLayer === 'module' ? -20 : 0 }}
                transform="translate(0, -60)"
              >
                <rect x="240" y="280" width="120" height="40" rx="4" fill="#171B1F" stroke="#C6FF00" strokeWidth={activeLayer === 'module' ? 2 : 1} />
                <text x="300" y="305" textAnchor="middle" fill="#C6FF00" fontSize="8" fontWeight="bold">PROCESSOR A</text>
              </motion.g>

              {/* Layer 02: Sensors */}
              <motion.g 
                onClick={() => setActiveLayer('sensor-array')}
                className="cursor-pointer"
                animate={{ y: activeLayer === 'sensor-array' ? -20 : 0 }}
                transform="translate(0, -140)"
              >
                <rect x="180" y="280" width="240" height="40" rx="20" fill="transparent" stroke="#C6FF00" strokeWidth={activeLayer === 'sensor-array' ? 2 : 1} strokeDasharray="4 2" />
                <path d="M200 300 H400" stroke="#C6FF00" strokeWidth="0.5" opacity="0.5" />
                <text x="300" y="305" textAnchor="middle" fill="#C6FF00" fontSize="8" fontWeight="bold">SENSOR ARRAY</text>
              </motion.g>

              {/* Layer 01: Grip Wrap */}
              <motion.g 
                onClick={() => setActiveLayer('grip-wrap')}
                className="cursor-pointer"
                animate={{ y: activeLayer === 'grip-wrap' ? -20 : 0 }}
                transform="translate(0, -220)"
              >
                <rect x="150" y="280" width="300" height="50" rx="25" fill="#171B1F" stroke="#ffffff20" strokeWidth={activeLayer === 'grip-wrap' ? 2 : 1} />
                <text x="300" y="310" textAnchor="middle" fill="#9AA4AC" fontSize="8" fontWeight="bold">EXTERIOR GRIP</text>
              </motion.g>

              {/* Connection Lines */}
              <AnimatePresence>
                {activeLayer && (
                  <motion.line
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x1="300" y1="50" x2="300" y2="450"
                    stroke="#C6FF00"
                    strokeWidth="0.5"
                    strokeDasharray="4 4"
                  />
                )}
              </AnimatePresence>
            </svg>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[8px] tracking-widest text-[#9AA4AC] uppercase">
              Click a layer to expand
            </div>
          </div>

          {/* Details Panel */}
          <div className="min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeLayer ? (
                <motion.div
                  key={activeLayer}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-[#C6FF00] tracking-tight uppercase">
                      {LAYERS.find(l => l.id === activeLayer)?.name}
                    </h3>
                    <p className="text-[#9AA4AC] leading-relaxed">
                      {LAYERS.find(l => l.id === activeLayer)?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {LAYERS.find(l => l.id === activeLayer)?.specs.map((spec, i) => (
                      <div key={i} className="bg-[#171B1F] p-4 border border-white/5 rounded-sm">
                        <div className="text-[10px] font-bold text-white tracking-widest uppercase">
                          {spec}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveLayer(null)}
                    className="text-[10px] font-bold text-[#9AA4AC] hover:text-[#C6FF00] tracking-widest uppercase transition-colors"
                  >
                    ← Back to assembly
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center md:text-left"
                >
                  <div className="text-6xl font-bold text-white/5 mb-6 uppercase tracking-tighter">
                    Precision <br /> Engineering
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 uppercase">Exploded System View</h3>
                  <p className="text-[#9AA4AC] mb-8">
                    Select a component of the GripSync architecture to view technical specifications and conceptual design details.
                  </p>
                  <div className="flex flex-col gap-4">
                    {LAYERS.map((layer) => (
                      <button
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className="text-left p-4 bg-[#171B1F] border border-white/5 hover:border-[#C6FF00]/30 transition-all group"
                      >
                        <span className="text-xs font-bold text-[#9AA4AC] group-hover:text-white uppercase tracking-widest">
                          {layer.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
