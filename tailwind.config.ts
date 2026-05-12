import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F7F2EA',
          2: '#EFE8DA',
          3: '#E6DDD0',
        },
        brass: {
          DEFAULT: '#B8922A',
          light: '#E8D49A',
          pale: '#F5EDD6',
        },
        ink: {
          DEFAULT: '#1C1710',
          2: '#3D3426',
        },
        muted: '#8C7F6E',
        forest: '#2E4A2E',
        terra: '#7B3D2E',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
