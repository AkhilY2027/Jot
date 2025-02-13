import { StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	KeyboardAvoidingView,
	Button, 
	TextInput,
	FlatList,
	Pressable,
	Platform} from 'react-native';
import { MajorButton } from '../components/TransitionButton';
import { scheduleJotReminder, requestNotificationPermissions, getAllScheduledNotifications } from '../components/notifications';
import { useState, useEffect } from 'react';
import Colors from '../components/colors';
// import * as RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';

export default function JotScreen( { navigation } ) {
	const [writeJot, setWriteJot] = useState('');
	const [notificationsPermitted, setNotificationsPermitted] = useState(false);

	// Add useEffect to request permissions
	useEffect(() => {
		requestNotificationPermissions().then(setNotificationsPermitted);
	}, []);

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

			// console.log(today);

			// Add new Jot to beginning of file
			const newJot = {
				// For id, do we use the length of the array or the today variable?
				id: today,
				date: today[0],
				time: today[1].split('.')[0],
				jot: writeJot,
			};
			// console.log(newJot.time);
			jots.unshift(newJot);

			// Write the file
			await FileSystem.writeAsStringAsync(
				path,
				JSON.stringify(jots, null, 2)
			);

			// Schedule reminder notification if permitted
			if (notificationsPermitted) {
				await scheduleJotReminder(writeJot);
				// await getAllScheduledNotifications();
			}
			else {
				console.log('Notifications not permitted');
			}

			setWriteJot('');
			// console.log('Jot saved');
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
			additionalStyling={{
				backgroundColor: Colors.primary,
				// marginTop: 10,
				// width: '100%',
				marginBottom: 20,
			}}
		/>
	  </KeyboardAvoidingView>
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: Colors.background,
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  paddingTop: StatusBar.currentHeight / 2,
	},
	textBoxContainer: {
	  flex: 1,
	  flexDirection: 'row',
	  width: '90%', 
	  backgroundColor: Colors.secondary,
	  borderRadius: 12,
	  padding: 10,
	  marginVertical: 10,
	  shadowColor: '#000',
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 4,
	  elevation: 3,
	},
	textBox: {
	  flex: 1,
	  borderWidth: 0,
	  padding: 15,
	  fontSize: 16,
	  color: Colors.text,
	  textAlignVertical: 'top',
	  minHeight: 100,
	}
  });
