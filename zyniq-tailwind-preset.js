/**
 * @zyniq-studio
 * @file zyniq-tailwind-preset.js
 * @description Simplified ZYNIQ Tailwind preset for backward compatibility
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        zyniq: {
          black: '#0a0a0a',
          void: '#050505',
          red: '#ea2323',
          white: '#f0f0f0',
          cyan: '#ea2323', // Alias for ZYNIQ red
          green: '#00ff88',
          amber: '#ffaa00',
          yellow: '#ffd700',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        jetbrains: ['JetBrains Mono', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
};

module.exports.ZYNIQ_PRESET_VERSION = '2.0-simplified';
