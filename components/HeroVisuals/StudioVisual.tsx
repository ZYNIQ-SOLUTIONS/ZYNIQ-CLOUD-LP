'use client'

import { useMemo } from 'react'
import { motion, useTime, useTransform } from 'framer-motion'

export default function StudioVisual() {
  const time = useTime()

  const rotateY = useTransform(time, [0, 30000], [0, 360], { clamp: false })

  const blocks = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300,
      width: 50 + Math.random() * 100,
      height: 20 + Math.random() * 40,
      delay: i * 0.2,
    }))
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none perspective-[1000px]">
      {/* Dark Grid Background */}
      <div 
        className="absolute inset-0 bg-black opacity-95"
        style={{
          backgroundImage: 'linear-gradient(rgba(234,35,35,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(234,35,35,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Scanning Line */}
      <motion.div
        className="absolute w-full h-[2px] bg-zyniq-red/40 shadow-[0_0_15px_rgba(234,35,35,0.4)] top-[10%]"
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Central Construct */}
      <motion.div
        className="relative flex items-center justify-center transform-preserve-3d"
        style={{ rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Core Frame */}
        <div className="w-64 h-64 border-2 border-white/10 relative bg-white/[0.03] backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-zyniq-red/60" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-zyniq-red/60" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-zyniq-red/60" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-zyniq-red/60" />
            
            {/* Inner Content Simulation */}
            <motion.div 
                className="absolute inset-4 bg-white/[0.03] flex flex-col gap-2 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
            >
                <div className="h-2 w-3/4 bg-white/10 rounded" />
                <div className="h-2 w-1/2 bg-white/10 rounded" />
                <div className="h-full w-full bg-black/30 rounded mt-2 border border-white/5" />
            </motion.div>
        </div>

        {/* Floating UI Elements */}
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className="absolute border border-white/10 bg-white/[0.03] backdrop-blur-[1px]"
            style={{
              x: block.x,
              y: block.y,
              width: block.width,
              height: block.height,
              z: Math.random() * 100, // Depth
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 0.8, 0.8, 0],
              x: [block.x, block.x + 20], // subtle shift
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: block.delay,
              times: [0, 0.1, 0.9, 1]
            }}
          >
             <div className="w-full h-[1px] bg-zyniq-red/20 mt-1" />
          </motion.div>
        ))}
      </motion.div>

       {/* Floating Axis Markers */}
       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
               className="w-[600px] h-[600px] border border-dashed border-zyniq-red/10 rounded-full"
               animate={{ rotate: 360 }}
               transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
             <motion.div 
               className="absolute w-[400px] h-[400px] border border-zyniq-red/10 rounded-full"
               animate={{ rotate: -360, scale: [1, 1.05, 1] }}
               transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
       </div>

    </div>
  )
}
