/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0C10",
        panel: "#12151B",
        panel2: "#171B22",
        border: "#232832",
        text: {
          DEFAULT: "#E6E9ED",
          muted: "#7C8592",
          faint: "#4B525E",
        },
        risk: {
          low: "#3FB579",
          medium: "#D9A441",
          high: "#E5484D",
          info: "#4C8DFF",
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
