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
      // Landing pages specific: Space Grotesk alias + jetbrains alias
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
