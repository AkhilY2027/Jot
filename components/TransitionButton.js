import { Pressable, StyleSheet, Text} from 'react-native';

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
		fontSize: 30,
		textAlign: 'center',
		textAlignVertical: 'center',
		flex: 1,
		width: '100%',
	},
	transitionButtonContainer: {
		maxHeight: 100,
		// height: 100,
		// flex: 0.25,
		// flexShrink: 0.1,
		width: '90%',
		flexDirection: 'row',
		borderWidth: 5,
		borderColor: 'darkgray',
		padding: 10,
		backgroundColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
		marginHorizontal: 10,
	},
})

