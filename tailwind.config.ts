const tailwindConfig = {
	theme: {
		extend: {
			fontFamily: {
				charlie: ['"Charlie Text"', 'sans-serif'],
			},
		},
	},
	// si usás content:
	content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
}

export default tailwindConfig
