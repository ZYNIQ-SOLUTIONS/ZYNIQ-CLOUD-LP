'use client'

import { useMemo } from 'react'
import { motion, useTime, useTransform } from 'framer-motion'

export default function SolutionsVisual() {
  const time = useTime()

  // Generate a grid of hexagons (implied by positions)
  const hexagons = useMemo(() => {
    return Array.from({ length: 19 }).map((_, i) => {
      // Simple offset logic for hex-like distribution
      const layer = Math.floor(i / 6) + 1;
      const angle = (i % 6) * (Math.PI / 3);
      const radius = layer * 60;
      return {
        id: i,
        x: i === 0 ? 0 : Math.cos(angle) * (radius + 20),
        y: i === 0 ? 0 : Math.sin(angle) * (radius + 20),
        delay: Math.random() * 2,
        scale: 0.8 + Math.random() * 0.4
      }
    })
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none perspective-[1000px]">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 opacity-95"
      />

      {/* Hex Grid Group */}
      <div className="relative w-full h-full flex items-center justify-center">
        {hexagons.map((hex) => (
          <motion.div
            key={hex.id}
            className="absolute w-[80px] h-[92px] flex items-center justify-center" // Approx Hex ratio
            style={{
              x: hex.x,
              y: hex.y,
            }}
             initial={{ opacity: 0, scale: 0 }}
             animate={{ 
               opacity: [0.3, 0.8, 0.3],
               scale: [0.9, 1.05, 0.9],
             }}
             transition={{
                duration: 4,
                repeat: Infinity,
                delay: hex.delay,
                ease: "easeInOut"
             }}
          >
             {/* Actual SVG Hexagon */}
             <svg width="60" height="68" viewBox="0 0 100 115" fill="none" stroke="currentColor" className="text-indigo-500/50">
               <motion.path 
                 d="M50 0 L93.3 25 V75 L50 100 L6.7 75 V25 Z" 
                 strokeWidth="2"
                 fill="rgba(99, 102, 241, 0.1)"
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: [0, 1, 1, 0] }}
                 transition={{ duration: 6, repeat: Infinity, ease: 'linear', times: [0, 0.4, 0.8, 1], delay: hex.delay }}
               />
             </svg>
          </motion.div>
        ))}

        {/* Connecting Data Streams */}
        <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ rotate: 30 }}
        >
             <motion.div 
                className="w-[400px] h-[1px] bg-indigo-400/30 absolute"
                animate={{ width: [0, 400, 0], x: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
             />
             <motion.div 
                className="h-[400px] w-[1px] bg-indigo-400/30 absolute"
                animate={{ height: [0, 400, 0], y: [-200, 200] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
             />
        </motion.div>
        
        {/* Core Solution Glow */}
         <motion.div
            className="absolute w-[200px] h-[200px] bg-indigo-600/10 rounded-full blur-[60px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
         />
      </div>
    </div>
  )
}
