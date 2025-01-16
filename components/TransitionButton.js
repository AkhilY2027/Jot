import { Pressable, StyleSheet, Text} from 'react-native';

export default function TransitionButton({ text, onPress }) {
	return (
		<Pressable
			onPress={onPress}
			style={styles.transitionButtonContainer}
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
		height: 100,
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

