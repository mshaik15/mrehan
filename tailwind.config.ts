import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Your custom fonts
        'roboto-slab': ['Roboto Slab', 'serif'],
        'fugaz-one': ['Fugaz One', 'sans-serif'],
        
        // Make Roboto Slab the default sans font
        'sans': ['Roboto Slab', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'roboto-slab-regular': '400',
        'roboto-slab-bold': '700',
        'fugaz-one-regular': '400',
      }
    },
  },
  plugins: [],
}

export default config