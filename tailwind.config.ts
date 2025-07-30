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
        'andika': ['Andika', 'sans-serif'],
        'romanesco': ['Romanesco', 'cursive'],
        
        // Make Andika the default sans font
        'sans': ['Andika', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'andika-regular': '400',
        'andika-bold': '700',
        'romanesco-regular': '400',
      }
    },
  },
  plugins: [],
}

export default config