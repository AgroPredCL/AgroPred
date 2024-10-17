/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			fontFamily: {
				kanit: ['Kanit', 'sans-serif'],
			},
			colors: {
				deficiente: '#154FAD',
				bajo: '#41AEE8',
				adecuado: '#6CBE35',
				alto: '#E89F41',
				excesivo: '#E04E3E',
				agro: '#96C21F',
				agroSecondary: '#669900',
				pred: '#8A5D13',
				predSecondary: '#b97200',
			},
		},
	},
	plugins: [],
};
