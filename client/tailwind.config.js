/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         height: {
            header: "560px",
            rate: "400px",
         },
         fontSize: {
            h1: "2.6rem",
         },
         screens: {
            xs: "475px",
         },
         colors: {
            main: "#0A1128", // Deep Midnight Blue (for primary backgrounds)
            subMain: "#FF4500", // Vibrant Red-Orange (for accents and highlights)
            dry: "#1C2541", // Rich Navy Blue (for secondary backgrounds)
            star: "#FFC300", // Golden Yellow (for star ratings or highlights)
            text: "#EAEAEA", // Soft White (for primary text)
            border: "#374151", // Neutral Charcoal Gray (for borders and dividers)
            dryGray: "#F5F5F5", // Light Cool Gray (for subtle background elements)
            editBtn: "#3BB143", // Fresh Green (for action buttons like edit)
            hover: "#FF6347", // Tomato Red (for hover states)
            cardBg: "#14213D", // Dark Slate Blue (for card backgrounds)
            link: "#1E90FF", // Dodger Blue (for hyperlinks)
            highlight: "#FFD700", // Bright Gold (for special highlights)
            shadow: "#2E3A59", // Steel Blue (for shadows and depth effects)
         },
      },
   },
   plugins: [require("@tailwindcss/line-clamp")],
};
