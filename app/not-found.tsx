'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EA2323" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Scan Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="h-px bg-red-500"
            style={{ top: `${i * 5}%` }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>

      {/* Radar Circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          width="600"
          height="600"
          viewBox="0 0 600 600"
          className="opacity-30"
        >
          {/* Concentric circles */}
          {[150, 200, 250].map((r) => (
            <circle
              key={r}
              cx="300"
              cy="300"
              r={r}
              fill="none"
              stroke="#EA2323"
              strokeWidth="1"
            />
          ))}
          
          {/* Scanning beam */}
          <motion.line
            x1="300"
            y1="300"
            x2="300"
            y2="50"
            stroke="#EA2323"
            strokeWidth="2"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: '300px 300px' }}
          />
          
          {/* Center dot */}
          <circle cx="300" cy="300" r="5" fill="#EA2323">
            <animate
              attributeName="r"
              values="5;8;5"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Error Code */}
          <div className="mb-8">
            <motion.div
              className="inline-block font-mono text-8xl md:text-[12rem] font-black text-red-500"
              animate={{
                textShadow: [
                  '0 0 20px rgba(234, 35, 35, 0.5)',
                  '0 0 40px rgba(234, 35, 35, 0.8)',
                  '0 0 20px rgba(234, 35, 35, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              404
            </motion.div>
          </div>

          {/* Glitch Text */}
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
            animate={{
              x: [-2, 2, -2, 2, 0],
              textShadow: [
                '2px 2px #EA2323, -2px -2px #00ff00',
                '-2px -2px #EA2323, 2px 2px #00ff00',
                '2px -2px #EA2323, -2px 2px #00ff00',
                '0 0 transparent',
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            SIGNAL LOST
          </motion.h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            The coordinates you entered do not exist in the ZYNIQ infrastructure matrix.
            <br />
            <span className="text-red-500 font-mono text-sm block mt-4">
              ERROR: PAGE_NOT_FOUND | STATUS: DISCONNECTED
            </span>
          </p>

          {/* Terminal-style suggestions */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="bg-black/50 border border-red-500/30 rounded p-6 text-left font-mono text-sm">
              <div className="text-red-500 mb-3">Available Routes:</div>
              <div className="space-y-2">
                <div className="text-gray-400">
                  <span className="text-green-500">→</span> /core
                  <span className="text-gray-600 ml-4"># Infrastructure & Investment</span>
                </div>
                <div className="text-gray-400">
                  <span className="text-green-500">→</span> /solutions
                  <span className="text-gray-600 ml-4"># Enterprise Services</span>
                </div>
                <div className="text-gray-400">
                  <span className="text-green-500">→</span> /studio
                  <span className="text-gray-600 ml-4"># SaaS Platform</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/core">
              <motion.button
                className="group relative px-8 py-4 bg-red-500 text-white font-bold rounded-none overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  RECALIBRATE SYSTEMS
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-black font-black z-20">
                  RECALIBRATE SYSTEMS →
                </span>
              </motion.button>
            </Link>

            <Link href="/solutions">
              <motion.button
                className="px-8 py-4 border-2 border-red-500 text-red-500 font-bold rounded-none hover:bg-red-500 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                VIEW SOLUTIONS
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Corner Markers */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
        <motion.div
          key={position}
          className={`absolute ${
            position === 'top-left'
              ? 'top-8 left-8'
              : position === 'top-right'
              ? 'top-8 right-8'
              : position === 'bottom-left'
              ? 'bottom-8 left-8'
              : 'bottom-8 right-8'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-8 border-red-500 border-t-2 border-l-2" />
        </motion.div>
      ))}
    </div>
  );
}
