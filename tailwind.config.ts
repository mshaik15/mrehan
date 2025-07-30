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
        'comic': ['Comic Relief', 'system-ui', 'sans-serif'],
        'romanesco': ['Romanesco', 'cursive'],
        
        // Keep existing sans as fallback
        'sans': ['Comic Relief', 'system-ui', 'sans-serif'], // Makes Comic Relief the default
      },
      fontWeight: {
        'comic-regular': '400',
        'comic-bold': '700',
        'romanesco-regular': '400',
      }
    },
  },
  plugins: [],
}

export default config