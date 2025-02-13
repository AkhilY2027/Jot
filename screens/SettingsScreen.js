import { 
	StyleSheet,
Text,
View,
StatusBar,
SafeAreaView,
Switch,
ScrollView,
Platform
} from 'react-native';
import { useState, useEffect } from 'react';
import Colors from '../components/colors';
import { requestNotificationPermissions } from '../components/notifications';
import { Appearance } from 'react-native';
import { MajorButton } from '../components/TransitionButton';

export default function SettingsScreen() {
const [notificationsEnabled, setNotificationsEnabled] = useState(false);
const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

useEffect(() => {
	// Check notification permissions on mount
	requestNotificationPermissions().then(setNotificationsEnabled);
}, []);

const SettingItem = ({ title, description, value, onValueChange }) => (
		<View style={styles.settingItem}>
		<View style={styles.settingTextContainer}>
			<Text style={styles.settingTitle}>{title}</Text>
			<Text style={styles.settingDescription}>{description}</Text>
		</View>
		<Switch
			value={value}
			onValueChange={onValueChange}
			trackColor={{ false: Colors.secondary, true: Colors.primary }}
			thumbColor={Platform.OS === 'ios' ? undefined : Colors.background}
		/>
		</View>
	);

	return (
		<SafeAreaView style={styles.container}>
		<StatusBar style="auto" />
		<ScrollView style={styles.scrollView}>
			<View style={styles.section}>
			<Text style={styles.sectionHeader}>Notifications</Text>
			<SettingItem
				title="Enable Notifications"
				description="Receive reminders about your past Jots"
				value={notificationsEnabled}
				onValueChange={async () => {
				const result = await requestNotificationPermissions();
				setNotificationsEnabled(result);
				}}
			/>
			</View>

			<View style={styles.section}>
			<Text style={styles.sectionHeader}>Appearance</Text>
			<SettingItem
				title="Dark Mode"
				description="Use dark colors for the app theme"
				value={darkMode}
				onValueChange={(value) => {
				setDarkMode(value);
				Appearance.setColorScheme(value ? 'dark' : 'light');
				}}
			/>
			</View>

			<View style={styles.section}>
			<Text style={styles.sectionHeader}>About</Text>
			<View style={styles.aboutContainer}>
				<Text style={styles.aboutText}>Version 1.0.0</Text>
				<MajorButton
				text="Reset All Settings"
				onPress={() => {
					setNotificationsEnabled(false);
					setDarkMode(false);
					Appearance.setColorScheme('light');
				}}
				additionalStyling={{
					backgroundColor: Colors.danger,
					marginTop: 20,
				}}
				/>
			</View>
			</View>
		</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingTop: StatusBar.currentHeight / 2,
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 16,
	},
	section: {
		marginBottom: 24,
	},
	sectionHeader: {
		fontSize: 20,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 12,
	},
	settingItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.secondary,
		padding: 16,
		borderRadius: 12,
		marginBottom: 8,
	},
	settingTextContainer: {
		flex: 1,
		marginRight: 16,
	},
	settingTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: Colors.text,
		marginBottom: 4,
	},
	settingDescription: {
		fontSize: 14,
		color: Colors.textLight,
	},
	aboutContainer: {
		backgroundColor: Colors.secondary,
		padding: 16,
		borderRadius: 12,
		alignItems: 'center',
	},
	aboutText: {
		fontSize: 16,
		color: Colors.text,
	}
});