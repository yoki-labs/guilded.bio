module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                15: "60px",
            },
            fontFamily: {
                display: ["Gotham Narrow", "Helvetica", "Arial", "sans-serif"],
                sans: ["Gotham Narrow", "Helvetica", "Arial", "sans-serif"],
                body: ["Gotham Narrow", "Helvetica", "Arial", "sans-serif"],
                mono: ["Courier", "monospace"],
            },
            colors: {
                guilded: {
                    // https://www.guilded.gg/brand
                    gray: "#36363D",
                    black: "#111820",
                    gilded: "#F5C400",
                    // Solid colors
                    slate: "#292B32",
                    // Text
                    white: "#ececee", // chat messages
                    subtitle: "#a3a3ac", // server settings
                    link: "#ffeca0", // any hyperlink
                },
            },
        },
    },
    plugins: [],
};
