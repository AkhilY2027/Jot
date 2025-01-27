import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Can also do createStackNavigator - more customizable, but more complex + performance-heavy
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from './components/colors';
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
					backgroundColor: Colors.secondary,
					borderTopWidth: 2,
					borderTopColor: Colors.primary,
					// TODO: Scale this height based on screen size
					height: 70,
					paddingBottom: 8,
					paddingTop: 8,
					shadowColor: '#000',
					shadowOffset: { width: 0, height: -2 },
					shadowOpacity: 0.1,
					shadowRadius: 4,
					elevation: 5,
				},
				tabBarActiveTintColor: Colors.primary,
				tabBarInactiveTintColor: Colors.textLight,
				tabBarLabelStyle: {
				  fontSize: 12,
				  fontWeight: '600',
				  marginTop: 4,
				  marginBottom: 4,
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
