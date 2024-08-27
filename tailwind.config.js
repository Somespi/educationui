/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}"
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#66cd8b",
          "secondary": "#157145",
          "accent": "#fab40f",
          "neutral": "#2EAC40",
          "base-100": "#fff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
          "prime": "#66cd8b"
        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}

