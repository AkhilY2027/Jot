import { Pressable, StyleSheet, Text} from 'react-native';
import Colors from './colors';

export function MajorButton({ text, onPress, additionalStyling }) {
	return (
		<Pressable
			onPress={onPress}
			style={[styles.transitionButtonContainer, additionalStyling]}
		>
			<Text style={styles.buttonText}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	buttonText: {
	  fontSize: 18,
	  fontWeight: '600',
	  color: Colors.background,
	  textAlign: 'center',
	},
	transitionButtonContainer: {
	  height: 50,
	  width: '100%',
	  borderRadius: 25,
	  backgroundColor: Colors.primary,
	  borderWidth: 0,
	  padding: 10,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.2,
	  shadowRadius: 4,
	  elevation: 3,
	  alignItems: 'center',
	  justifyContent: 'center',
	  margin: 10,
	},
});

