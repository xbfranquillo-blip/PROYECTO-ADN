import React from 'react';
import { motion } from 'motion/react';

const Bacterium = ({ style }: { style: React.CSSProperties, key?: React.Key }) => (
  <motion.div
    style={style}
    animate={{
      x: [0, 40, -30, 0],
      y: [0, -50, 30, 0],
      rotate: [0, 90, -90, 0],
    }}
    transition={{
      duration: Math.random() * 15 + 20,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none opacity-[0.3] text-rose-950"
  >
    <svg width="80" height="40" viewBox="0 0 60 30" fill="currentColor">
      <rect x="0" y="0" width="60" height="30" rx="15" />
      <circle cx="15" cy="15" r="3" fill="rgba(255,255,255,0.4)" />
      <circle cx="35" cy="12" r="2" fill="rgba(255,255,255,0.4)" />
    </svg>
  </motion.div>
);

const Virus = ({ style }: { style: React.CSSProperties, key?: React.Key }) => (
  <motion.div
    style={style}
    animate={{
      x: [0, -40, 30, 0],
      y: [0, 60, -40, 0],
      rotate: [0, -120, 120, 0],
    }}
    transition={{
      duration: Math.random() * 20 + 25,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute pointer-events-none opacity-[0.35] text-cyan-950"
  >
    <svg width="70" height="70" viewBox="0 0 50 50" fill="currentColor">
      <circle cx="25" cy="25" r="12" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 25 25)`}>
          <rect x="24" y="2" width="2" height="12" rx="1" />
          <circle cx="25" cy="4" r="3" />
        </g>
      ))}
      <circle cx="20" cy="22" r="2" fill="rgba(255,255,255,0.4)" />
      <circle cx="30" cy="28" r="2.5" fill="rgba(255,255,255,0.4)" />
    </svg>
  </motion.div>
);

export const MicroBackground = () => {
  const elements = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {elements.map((_, i) => (
        i % 2 === 0 ? (
          <Bacterium
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ) : (
          <Virus
            key={i}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        )
      ))}
    </div>
  );
};
