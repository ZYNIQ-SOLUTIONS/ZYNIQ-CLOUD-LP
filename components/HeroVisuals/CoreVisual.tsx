'use client'

import { useRef, useMemo } from 'react'
import { motion, useScroll, useTransform, useTime } from 'framer-motion'

export default function CoreVisual() {
  const ref = useRef(null)
  const time = useTime()
  
  // Create a grid of "blocks" that will form our monolith structure
  const blocks = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 400,
      scale: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 2
    }))
  }, [])

  const rotateX = useTransform(time, [0, 20000], [0, 360], { clamp: false })
  const rotateY = useTransform(time, [0, 30000], [0, 360], { clamp: false })

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none perspective-[1000px]">
      {/* Background Atmosphere */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-zyniq-dark to-black opacity-90"
        style={{
          background: 'radial-gradient(circle at center, #1A1A1A 0%, #000 100%)'
        }}
      />
      
      {/* Animated Grid Floor */}
      <div className="absolute inset-0 perspective-[500px] flex items-center justify-center opacity-20">
        <motion.div 
          className="w-[200vw] h-[200vw] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[linear-gradient(rgba(234,35,35,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,35,35,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{
            transform: 'rotateX(60deg) translateY(200px)',
          }}
          animate={{
            backgroundPositionY: [0, 50],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
        />
      </div>

      {/* The Monolith / Core Structure */}
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
      >
        {/* Core Cube */}
        <div className="absolute inset-0 border-2 border-zyniq-red/30 bg-zyniq-red/5 backdrop-blur-sm transform-preserve-3d" />
        
        {/* Inner Cube */}
        <motion.div 
          className="absolute inset-[20%] border border-zyniq-red/50 bg-zyniq-red/10 transform-preserve-3d"
          animate={{ rotateX: [0, -360], rotateY: [0, -360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Data Blocks */}
        {blocks.map((block) => (
          <motion.div
            key={block.id}
            className="absolute w-4 h-4 bg-zyniq-red/40 border border-zyniq-red/60"
            style={{
              x: block.x,
              y: block.y,
              z: block.z,
            }}
            animate={{
              x: [block.x, block.x + (Math.random() - 0.5) * 50, block.x],
              y: [block.y, block.y + (Math.random() - 0.5) * 50, block.y],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: block.delay
            }}
          />
        ))}

        {/* Pulse Effect */}
        <motion.div
          className="absolute inset-0 bg-zyniq-red/20 rounded-full blur-[100px]"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      
      {/* Glitch Overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />
    </div>
  )
}
