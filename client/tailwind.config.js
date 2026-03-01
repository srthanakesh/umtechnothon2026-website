import { color } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lightBg:"#fafdff",
                primaryBlue:"#1e2372",
                trailDark: "#0b0e14",
                trailPink:"#ff66c4",
                umAzure:"#5da4cf",

                darkBg:"#0b0e14",
                darkTrailAzure:"#2dcefb",
                darkMagenta:"#e151af",
            },
        },
    },
}