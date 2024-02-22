import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'main-banner': 'url("/novoBannerPrincipal.jpg")'
      },
      colors: {
        'base-blue': '#2A7CA3',
        silver: '#F5F7FA',
        purple: '#7F067F',
        'title-gray': '#4D4D4D',
        'subtitle-gray': '#18191F'
      }
    }
  },
  plugins: [],
  important: true
}
export default config
