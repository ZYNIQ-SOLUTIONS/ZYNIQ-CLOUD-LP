'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

export default function CloudVisual() {
  // Generate random nodes for the network
  const nodes = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 400,
      scale: 0.5 + Math.random(),
      delay: Math.random() * 2,
    }))
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Deep Space Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 opacity-90"
        style={{
          background: 'radial-gradient(circle at center, #1e293b 0%, #000 100%)'
        }}
      />
      
      {/* Floating Network Container */}
      <div className="relative w-full h-full max-w-4xl max-h-4xl flex items-center justify-center">
        
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {nodes.map((node, i) => (
             nodes[i + 1] ? (
              <motion.line
                key={`line-${i}`}
                x1={`calc(50% + ${node.x}px)`}
                y1={`calc(50% + ${node.y}px)`}
                x2={`calc(50% + ${nodes[(i + 1) % nodes.length].x}px)`}
                y2={`calc(50% + ${nodes[(i + 1) % nodes.length].y}px)`}
                stroke="#38bdf8"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0], 
                  opacity: [0, 0.5, 0] 
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: node.delay
                }}
              />
             ) : null
          ))}
        </svg>

        {/* Network Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute rounded-full bg-cyan-500/50 blur-[2px]"
            style={{
              width: 4 * node.scale,
              height: 4 * node.scale,
              x: node.x,
              y: node.y,
            }}
            animate={{
              scale: [node.scale, node.scale * 1.5, node.scale],
              opacity: [0.3, 0.8, 0.3],
              x: [node.x, node.x + (Math.random() - 0.5) * 50, node.x],
              y: [node.y, node.y + (Math.random() - 0.5) * 50, node.y],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: node.delay
            }}
          >
             <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm" />
          </motion.div>
        ))}

        {/* Central Cloud Core */}
        <motion.div
            className="w-32 h-32 rounded-full border border-cyan-500/30 bg-cyan-900/10 backdrop-blur-md flex items-center justify-center"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
        >
             <motion.div 
               className="w-20 h-20 rounded-full border border-cyan-400/50 border-dashed"
               animate={{ rotate: 360 }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
             <motion.div 
               className="absolute w-40 h-40 rounded-full border border-cyan-800/20"
               animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
        </motion.div>
      </div>
    </div>
  )
}
