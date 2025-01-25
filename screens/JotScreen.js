import { StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	KeyboardAvoidingView,
	Button, 
	TextInput,
	FlatList,
	Pressable} from 'react-native';
import { MajorButton } from '../components/TransitionButton';
import { useState, useEffect } from 'react';
// import * as RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export default function JotScreen( { navigation } ) {
	const [writeJot, setWriteJot] = useState('');

	const saveJot = async () => {
		try {
			if (writeJot === '') {
				console.log('No jot to save');
				return;
			}
			const today = new Date().toISOString().split('T');
			const path = `${FileSystem.documentDirectory}jots.json`;
			// console.log(path);
			let jots = [];

			try {
				const file = await FileSystem.readAsStringAsync(path);
				jots = JSON.parse(file);
			} catch (error) {
				// File doesn't exist yet, start with empty array
				jots = [];
			}

			// Add new Jot to beginning of file
			const newJot = {
				// For id, do we use the length of the array or the today variable?
				id: today,
				date: today[0],
				time: today[1].split('.')[0],
				jot: writeJot,
			};
			jots.unshift(newJot);

			// Write the file
			await FileSystem.writeAsStringAsync(
				path,
				JSON.stringify(jots, null, 2)
			);

			setWriteJot('');
			console.log('Jot saved');
		} catch (error) {
			console.error('Error saving jot:', error);
		}
	};

  return (
	<SafeAreaView style={styles.container}>
	  <KeyboardAvoidingView style={{ alignItems: 'center', justifyContent: 'center' }} behavior="padding">
		<StatusBar style="auto" />
		<View style={styles.textBoxContainer}>
			{/* Here, add a huge text box that takes up the screen */}
			<TextInput
				style={styles.textBox}
				multiline={true}
				placeholder="Jot down your thoughts here"
				value={writeJot}
				onChangeText={setWriteJot}
			/>
		</View>
		<MajorButton
			text="Save Jot"
			onPress={() => {
				saveJot();
			}}
		/>
	  </KeyboardAvoidingView>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: 'green',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: StatusBar.currentHeight / 2,
  },
  textBoxContainer: {
	flexDirection: 'row',
	flex: 3,
	backgroundColor: 'lightgreen',
	// padding: 20,
	// borderRadius: 10,
	// flex: 3,
	// borderWidth: 1,
	// // Shadows
	// shadowColor: 'black',
	// shadowOpacity: 0.2,
	// shadowRadius: 4,
	// shadowOffset: { width: 0, height: 2 },
	// elevation: 5,
  },
  textBox: {
	flex: 1,
	borderWidth: 2,
	padding: 10,
	margin: 10,
	borderRadius: 5,
	textAlignVertical: 'top',
	minHeight: 100,
	color: 'black',
  },
  saveButtonContainer: {
	maxHeight: 100,
	alignItems: 'center',
	justifyContent: 'center',
	padding: 10,
	margin: 10,
	width: '100%',
  },
});
