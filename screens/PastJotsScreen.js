import { StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	KeyboardAvoidingView,
	Button, 
	TextInput,
	FlatList} from 'react-native';
import TransitionButton from '../components/TransitionButton';
import { useState, useEffect } from 'react';
// import * as RNFS from 'react-native-fs'; - Does not work with Expo
import * as FileSystem from 'expo-file-system';

export default function PastJotsScreen( { navigation } ) {
	const [jots, setJots] = useState([]);

	const loadJots = async () => {
		try {
		  const path = `${FileSystem.documentDirectory}jots.json`;
		  const file = await FileSystem.readAsStringAsync(path);
		  setJots(JSON.parse(file));
		} catch (error) {
		//   console.error('Error loading jots:', error);
		  console.log('No jots to load');
		  setJots([]);
		}
	  };

	  useEffect(() => {
		loadJots();
	  }, []);

	  const formatDate = (dateString) => {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays <= 7) {
		  return date.toLocaleDateString('en-US', {
			weekday: 'long',
		  });
		} else {
		  return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		  });
		}
	  };

	  const formatTime = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleTimeString('en-US', {
		  hour: '2-digit',
		  minute: '2-digit'
		});
	  };

  return (
	<SafeAreaView style={styles.container}>
	  <StatusBar style="auto" />
	  {/* Create a button to delete all jots */}
	  <View style={styles.buttonContainer}>
		<Button
		title="Delete all Jots"
		onPress={async () => {
			try {
				const path = `${FileSystem.documentDirectory}jots.json`;
				await FileSystem.deleteAsync(path);
				setJots([]);
				loadJots();
			} catch (error) {
				// console.error('Error deleting jots:', error);
				console.log('Jots have already been deleted');
			}
		}}
		/>
	  </View>
	  <View style={styles.scollingViewContainer}>
		<FlatList
			data={jots}
			renderItem={({ item }) => (
				<View style={styles.jotCard}>
					<Text style={styles.jotText}>{item.jot}</Text>
					<Text style={styles.jotDateText}>{formatDate(item.date)}</Text>
					<Text style={styles.jotTimeText}>{formatTime(item.date)}</Text>
				</View>
			)}
			keyExtractor={(item) => item.id}
		/>
	  </View>
	  <TransitionButton
	  	text="Jot!"
		onPress={() => {
			navigation.navigate('JotScreen');
		}}
	  />
	</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: 'green',
	alignItems: 'center',
	justifyContent: 'center',
	paddingTop: StatusBar.currentHeight,
  },
  scollingViewContainer: {
	paddingHorizontal: 16,
	flex: 1,
	width: '100%',
  },
  buttonContainer: {
	height: 50,
  },
  jotCard: {
	backgroundColor: 'lightblue',
	marginVertical: 4,
	width: '100%',
	padding: 16,
	borderRadius: 8,
	borderWidth: 2,
  },
  jotText: {
	fontSize: 16,
	color: 'black',
  },
  jotDateText: {
	fontSize: 12,
	color: 'gray',
  },
  jotTimeText: {
	fontSize: 10,
	color: 'darkgray',
  }
});
