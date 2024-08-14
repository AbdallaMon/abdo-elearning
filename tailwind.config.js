/** @type {import('tailwindcss').Config} */
const tailwind = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#5578EB", // Elegant blue with a touch of depth
                primaryAlt: "#3355D1", // Darker blue for contrast
                secondary: "#FF8C42", // Warm orange for vibrant accents
                secondaryText: "#FFA15E", // Softer orange for text
                tertiary: "#FDCB58", // Soft gold for highlights
                body: "#6E6E6E", // Neutral dark gray for body text
                bgPrimary: "#F0F4FA", // Soft light blue for backgrounds
                bgSecondary: "#E3EDF7", // Pale blue-gray for secondary backgrounds
                heading: "#222831", // Deep gray for headings
                gradient: "linear-gradient(135deg, #5578EB 0%, #42A5F5 100%)", // Gradient with smooth blue transition
                shadowLight: "0px 10px 50px 0px rgba(34, 40, 49, 0.1)",  // Light shadow with a subtle gray tone
                shadowDark: "0 10px 50px 0 rgba(34, 40, 49, .2)", // Darker shadow for depth
                bgGradient: "linear-gradient(76deg, #5578EB 0%, #3355D1 100%)", // Enhanced background gradient with elegant blues
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                      "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};

export default tailwind;