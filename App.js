import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Can also do createStackNavigator - more customizable, but more complex + performance-heavy
import JotScreen from './screens/JotScreen';
import PastJotsScreen from './screens/PastJotsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
	<NavigationContainer>
		{/* Rest of app code */}
		<Stack.Navigator
			initialRouteName='JotScreen'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen
				name="JotScreen"
				component={JotScreen}
				// options= {{
				// 	headerShown: false,
				// }}
			/>
			<Stack.Screen
				name="PastJotsScreen"
				component={PastJotsScreen}
				// options= {{
				// 	headerShown: false,
				// }}
			/>
		</Stack.Navigator>
	</NavigationContainer>
  );
}
