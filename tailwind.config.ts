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
      },
      colors: {
        // Custom palette using CSS variables
        theme: {
          // Background shades
          'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
          'bg-secondary': 'rgb(var(--color-bg-secondary) / <alpha-value>)',
          'bg-tertiary': 'rgb(var(--color-bg-tertiary) / <alpha-value>)',
          'bg-hover': 'rgb(var(--color-bg-hover) / <alpha-value>)',
          
          // Text colors
          'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
          'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
          'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
          
          // Accent colors
          'accent-primary': 'rgb(var(--color-accent-primary) / <alpha-value>)',
          'accent-hover': 'rgb(var(--color-accent-hover) / <alpha-value>)',
          
          // Border colors
          'border-primary': 'rgb(var(--color-border-primary) / <alpha-value>)',
          'border-secondary': 'rgb(var(--color-border-secondary) / <alpha-value>)',
          'border-hover': 'rgb(var(--color-border-hover) / <alpha-value>)',
        }
      }
    },
  },
  plugins: [],
}

export default config