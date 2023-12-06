/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-purple': '#5C2DD5',
                'purple': '#7945FF',
                'red': '#FD6687',
                'yellow': '#FFCE67',
            },
        },
    },
    plugins: [],
}

