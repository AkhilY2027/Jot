import { Appearance, useColorScheme } from "react-native";
import App from "../App";

const lightColors = {
	primary: '#2D5A27',      // Deep forest green
	secondary: '#8FBC94',    // Sage green
	accent: '#D4E09B',      // Light olive
	background: '#E8F3D6',   // Very light mint
	danger: '#CF4242',      // Muted red for delete button
	dangerBorder: '#8B2929', // Darker red for border
	text: '#1A1A1A',        // Near black for text
	textLight: '#4A4A4A'    // Gray for secondary text
};

const darkColors = {
	primary: '#4A8F42',      // Brighter forest green for dark mode
	secondary: '#2C4F2F',    // Darker sage green
	accent: '#8BA663',       // Muted olive for dark mode
	background: '#1A1A1A',   // Dark background
	danger: '#E45757',       // Brighter red for dark mode
	dangerBorder: '#B33E3E', // Lighter red border for dark mode
	text: '#E8E8E8',        // Light text for dark mode
	textLight: '#A0A0A0'    // Light gray for dark mode
};

Appearance.addChangeListener(({ colorScheme }) => {
    Colors = colorScheme === 'dark' ? darkColors : lightColors;
});

let Colors = Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;

export default Colors;