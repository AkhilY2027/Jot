import { Appearance, useColorScheme } from "react-native";
import App from "../App";

const lightColors = {
    primary: '#2B4C7E',      // Deep navy blue
    secondary: '#88A0BC',    // Soft steel blue
    accent: '#B7D1E2',      // Light powder blue
    background: '#E6EEF5',   // Very light sky blue
    danger: '#CF4242',      // Keep red for danger/delete
    dangerBorder: '#8B2929', // Keep darker red for border
    text: '#1A1A1A',        // Keep near black for text
    textLight: '#4A4A4A',    // Keep gray for secondary text
	tabBarBorder: '#88A0BC'  // Soft steel blue for tab bar border
};

const darkColors = {
    primary: '#4C7AB3',      // Brighter blue for dark mode
    secondary: '#2C4159',    // Darker slate blue
    accent: '#6B89A8',      // Muted steel blue for dark mode
    background: '#1A1A1A',   // Keep dark background
    danger: '#E45757',      // Keep brighter red for dark mode
    dangerBorder: '#B33E3E', // Keep lighter red border
    text: '#E8E8E8',        // Keep light text for dark mode
    textLight: '#A0A0A0',    // Keep light gray for dark mode
	tabBarBorder: '#2C4159'  // Darker slate blue for tab bar border
};

Appearance.addChangeListener(({ colorScheme }) => {
    Colors = colorScheme === 'dark' ? darkColors : lightColors;
});

let Colors = Appearance.getColorScheme() === 'dark' ? darkColors : lightColors;

export default Colors;