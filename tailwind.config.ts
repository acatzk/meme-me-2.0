// eslint-disable-next-line @typescript-eslint/no-var-requires
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans]
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1170px'
    },
    colors: {
      primary: {
        DEFAULT: '#a874fe',
        100: '#e6d7ff',
        200: '#c39fff',
        hover: '#9a5cff'
      },
      secondary: {
        DEFAULT: '#25396f',
        100: '#a4b6e1',
        200: '#8da4db',
        300: '#586ca0'
      },
      online: '#56c962',
      stroke: {
        1: '#d8e4f2',
        2: '#e1e8f3',
        3: '#e7eaf4'
      },
      heart: '#ff5775',
      fancyBlue: '#59b8ff',
      background: '#f2f5ff',
      section: {
        1: '#f6faff',
        2: '#f4f7ff'
      },
      white: '#FFFFFF',
      transparent: 'transparent'
    },
    boxShadow: {
      'default-primary': '-30px 26px 29px 6px rgba(164, 182, 225, 0.15)',
      'sm-primary': '-15px 13px 14px 4px rgba(164, 182, 225, 0.15)'
    },
    animation: {
      pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
    },
    keyframes: {
      pulse: {
        '0%, 100%': {
          opacity: 0
        },
        '50%': {
          opacity: 1
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
