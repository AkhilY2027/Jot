import AsyncStorage from '@react-native-async-storage/async-storage';
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

// Storage keys
const STORAGE_KEYS = {
    NOTIFICATIONS_ENABLED: '@notifications_enabled',
    DARK_MODE: '@dark_mode'
};

export default function SettingsScreen() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

    // Load saved settings
    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const notificationsSetting = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
            const darkModeSetting = await AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE);
            
            if (notificationsSetting !== null) {
                setNotificationsEnabled(JSON.parse(notificationsSetting));
            }
            
            if (darkModeSetting !== null) {
                const isDarkMode = JSON.parse(darkModeSetting);
                setDarkMode(isDarkMode);
                Appearance.setColorScheme(isDarkMode ? 'dark' : 'light');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const saveNotificationSetting = async (enabled) => {
        try {
            if (enabled) {
                const permissionGranted = await requestNotificationPermissions();
                if (permissionGranted) {
                    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, JSON.stringify(true));
                    setNotificationsEnabled(true);
                } else {
                    setNotificationsEnabled(false);
                }
            } else {
                await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, JSON.stringify(false));
                setNotificationsEnabled(false);
            }
        } catch (error) {
            console.error('Error saving notification setting:', error);
        }
    };

    // In saveDarkModeSetting
	const saveDarkModeSetting = async (enabled) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(enabled));
			setDarkMode(enabled);
			Appearance.setColorScheme(enabled ? 'dark' : 'light');
			// await updateColors(); // Add this line
		} catch (error) {
			console.error('Error saving dark mode setting:', error);
		}
	};

    const resetAllSettings = async () => {
        try {
            await AsyncStorage.multiRemove([
                STORAGE_KEYS.NOTIFICATIONS_ENABLED,
                STORAGE_KEYS.DARK_MODE
            ]);
            setNotificationsEnabled(false);
            setDarkMode(false);
            Appearance.setColorScheme('light');
        } catch (error) {
            console.error('Error resetting settings:', error);
        }
    };

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

    // Rest of your component remains the same, just update the onValueChange handlers:

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
                        onValueChange={saveNotificationSetting}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>Appearance</Text>
                    <SettingItem
                        title="Dark Mode"
                        description="Use dark colors for the app theme"
                        value={darkMode}
                        onValueChange={saveDarkModeSetting}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeader}>About</Text>
                    <View style={styles.aboutContainer}>
                        <Text style={styles.aboutText}>Version 1.0.0</Text>
                        <MajorButton
                            text="Reset All Settings"
                            onPress={resetAllSettings}
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