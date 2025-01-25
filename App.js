import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Can also do createStackNavigator - more customizable, but more complex + performance-heavy
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JotScreen from './screens/JotScreen';
import PastJotsScreen from './screens/PastJotsScreen';
import { Ionicons } from '@expo/vector-icons';

// const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {

  return (
	<NavigationContainer>
		<Tab.Navigator
			initialRouteName='Jots'
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: 'lightgreen',
					borderTopWidth: 2,
					borderTopColor: 'black',
					paddingBottom: 5,
					paddingTop: 5,
					height: 60,
					shadowColor: 'black',
				},
				tabBarActiveTintColor: 'darkgreen',
				tabBarInactiveTintColor: 'gray',
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: 'bold'
				}
			}}
			backBehavior='initialRoute'
		>
		<Tab.Screen
			name="Jots"
			component={JotScreen}
			options={{
			tabBarIcon: ({ focused, color, size }) => (
				<Ionicons 
				name={focused ? 'create' : 'create-outline'} 
				size={24} 
				color={color} 
				/>
			)}}
		/>
		<Tab.Screen
			name="PastJots"
			component={PastJotsScreen}
			options={{
			tabBarIcon: ({ focused, color, size }) => (
				<Ionicons 
					name={focused ? 'calendar' : 'calendar-outline'} 
					size={24} 
					color={color} 
				/>
			)}}
		/>
		</Tab.Navigator>
	</NavigationContainer>
  );
}
