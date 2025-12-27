/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  safelist: [
    {
      // Keep arbitrary spacing/size/typography utilities
      pattern:
        /^(p|px|py|m|mx|my|gap|grid|text|leading|w|h|rounded|border|shadow|bg)\-\[.*\]$/,
    },
  ],
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          primary: '#5a5452',
          secondary: '#6d6765',
          tertiary: '#7a7573',
          dark: '#2a2628',
          light: '#f0eae1',
        },
        // Text colors
        text: {
          primary: '#ffffff',
          secondary: '#c2c2c2',
          tertiary: '#d4d4d4',
          muted: '#b8b8b8',
          dark: '#5a5452',
        },
        // Accent colors
        accent: {
          primary: '#00a1ff',
          secondary: '#00ff6f',
          gradient: {
            from: '#00a1ff',
            to: '#00ff6f',
          },
        },
        // Social colors
        social: {
          linkedin: '#0077b5',
          github: '#333',
          etsy: '#f16521',
          behance: '#1769ff',
        },
        // Border colors
        border: {
          default: 'rgba(255, 255, 255, 0.3)',
          light: 'rgba(255, 255, 255, 0.6)',
        },
      },
      spacing: {
        // Replace arbitrary values with tokens
        section: '24px',
        card: '24px',
        badge: '12px',
      },
      borderRadius: {
        card: '24px',
        badge: '100px',
        button: '8px',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      fontSize: {
        // Replace arbitrary values
        'display': '36px',
        'heading': '30px',
        'body': '18px',
        'small': '14px',
      },
    },
  },
};

