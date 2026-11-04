import type { Config } from 'tailwindcss'

// Import the unified ZYNIQ Studio design system preset
// eslint-disable-next-line @typescript-eslint/no-var-requires
const zyniqPreset = require('./zyniq-tailwind-preset')

const config: Config = {
  presets: [zyniqPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-raised': 'var(--paper-raised)',
        ink: 'var(--ink)',
        'ink-muted': 'var(--ink-muted)',
        rule: 'var(--rule)',
        grid: 'var(--grid)',
        red: 'var(--red)',
      },
      fontFamily: {
        sans: ['"Inter Tight"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        display: ['"Big Shoulders Display"', '"Orbitron"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
        orbitron: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
