import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure how notifications appear
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request notification permissions
export async function requestNotificationPermissions() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
	if (finalStatus !== 'granted') {
		console.log('Notifications not granted');
		return false;
	}

	let token = (await Notifications.getExpoPushTokenAsync(
		// { experienceId: '@jot/jot' },
		{projectId: Constants.expoConfig?.extra.eas.projectId}
	)).data;

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

    return finalStatus === 'granted';
  }
  else {
	console.log('Use a physical device - Notifications are not available');
  }
  return false;
}

// Schedule a reminder notification
	// Won't group notifications together - but can use to test
	// TODO: Group notifications together
	// TODO: Add an expo push token to push notifications even when app is closed
		// Must use firebase for this
export async function scheduleJotReminder(jotContent) {
	try {
        const notification = {
            content: {
                title: "Remember this Jot?",
                body: jotContent.substring(0, 100) + (jotContent.length > 100 ? '...' : ''),
                data: { screen: 'PastJots' },
				sound: true,
            },
            trigger: {
                seconds: 10,
            },
        };

        const id = await Notifications.scheduleNotificationAsync(notification);
        console.log('Scheduled notification with ID:', id);
        return id;
    } catch (error) {
        console.error('Error scheduling notification:', error);
        return null;
    }
}

export async function getAllScheduledNotifications() {
	const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
	console.log('Scheduled notifications:', scheduledNotifications);
	return scheduledNotifications;
}