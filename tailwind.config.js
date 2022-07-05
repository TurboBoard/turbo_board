module.exports = {
	content: ["./app/{components,layouts,svgs}/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "2.5rem",
		},
		extend: {
			backgroundImage: {
				hero: "url('/img/hero.jpg')",
				"hero-dark": "url('/img/hero-dark.jpg')",
			},
			blur: {
				xs: "2px",
			},
			colors: {
				byzantium: "#660099",
				dark: "#171717",
				light: "#fafafa",
				pink: "#FF3399",
				teal: "#00CCCC",
				yellow: "#FFFF33",
				warning: "#F43F5E",
			},
		},
		fontFamily: {
			racing: ["Racing Sans One", "cursive"],
			sans: ["Ubuntu", "sans-serif"],
		},
	},
	plugins: [],
};
