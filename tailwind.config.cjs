const daisyui = require("daisyui");

const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {},
	},

	plugins: [daisyui],

	daisyui: {
		themes: [
			{
				dezim: {
					primary: "#1a5e45",
					"primary-content": "#ffffff",
					secondary: "#e37a32",
					"secondary-content": "#ffffff",
					accent: "#016d77",
					"accent-content": "#ffffff",
					neutral: "#3e4351",
					"neutral-content": "#ffffff",
					"base-100": "#ffffff",
				},
			},
		],
	},
};

module.exports = config;
