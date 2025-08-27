/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // dotted grid utility used in the layout
        "grid-cyan-500/10":
          "radial-gradient(circle at 1px 1px, rgba(34,211,238,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cyan-500/10": "22px 22px",
      },
    },
  },
  plugins: [],
};
