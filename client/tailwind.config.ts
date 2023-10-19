import type { Config } from 'tailwindcss'

const config: Config = {
  mode: 'jit',
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/modals/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xxs: "450px",
      xxxs: "480px",
      xs: "550px",
      // nav_logo: "550px",
      sm: "640px",
      md: "768px",
      base: "870px",
      md_link: "980px",
      lg: "1024px",
      lg1: "1180px",
      xl: "1280px",
      xl1: "1450px",
      "2xl": "1536px",
      "3xl": "1650px",
      "4xl": "1850px",
      "5xl": "2140px",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        bannerShadow: "0.1rem 0.1rem lightgray"
      },
      boxShadow: {
        "dark-menuShadow": "0px 0px 5px 0px #2cb2b9",
        btnShadow: "0px 1px 3px 0px #5b65d1",
      },
      backgroundColor: {
        "dark-primary": "#00191a",
        "dark-secondary": "#0a2627",
        "dark-hover": "#0a2627",
        "dark-primary-btn": "#2cb2b9",
        "dark-secondary-btn": "#5ac6cc",
      },
      colors: {
        "dark-primary": "#5ac6cc",
        "dark-secondary": "#00191a"
      },
      borderColor: {
        "dark-primary": "#5ac6cc",
      }
    },
  },
  plugins: [],
}
export default config