import { StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	KeyboardAvoidingView,
	Button, 
	TextInput,
	FlatList} from 'react-native';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Can also do createStackNavigator - more customizable, but more complex + performance-heavy
import JotScreen from './screens/JotScreen';
import PastJotsScreen from './screens/PastJotsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
	<NavigationContainer>
		{/* Rest of app code */}
		<Stack.Navigator>
			<Stack.Screen
				name="JotScreen"
				component={JotScreen}
			/>
			<Stack.Screen
				name="PastJotsScreen"
				component={PastJotsScreen}
			/>
		</Stack.Navigator>
	</NavigationContainer>
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
