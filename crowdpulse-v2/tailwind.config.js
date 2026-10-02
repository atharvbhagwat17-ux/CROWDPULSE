/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B1015",
        panel: "#121A23",
        panel2: "#1A2530",
        panel3: "#202E3A",
        border: "#2A3947",
        text: {
          DEFAULT: "#E8EEF3",
          muted: "#A0AFBC",
          faint: "#718190",
        },
        risk: {
          low: "#42C98A",
          medium: "#F4B84F",
          high: "#F16C67",
          info: "#54A9F5",
          ai: "#5DCBE0",
          warning: "#F29B58",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": "0.6875rem",
      },
    },
  },
  plugins: [],
};
