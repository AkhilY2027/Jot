import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermissions() {
  if (Device.isDevice) {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      console.log('Existing notification status:', existingStatus);
      
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        console.log('New notification status:', finalStatus);
      }

      if (finalStatus !== 'granted') {
        console.log('Failed to get notification permissions');
        return false;
      }

    //   const token = (await Notifications.getExpoPushTokenAsync({
    //     projectId: Constants.expoConfig?.extra?.eas?.projectId
    //   })).data;
    //   console.log('Expo push token:', token);

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      return true;
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  } else {
    console.log('Must use physical device for notifications');
    return false;
  }
}

export async function scheduleJotReminder(jotContent) {
  try {
    const schedulingOptions = {
      content: {
        title: "Remember this Jot?",
        body: jotContent.length > 50 ? jotContent.substring(0, 47) + "..." : jotContent,
        data: { screen: 'PastJots' },
      },
      trigger: {
        // seconds: 60 * 60 * 24, // 24 hours
		seconds: 10,
      },
    };

    const identifier = await Notifications.scheduleNotificationAsync(schedulingOptions);
    // console.log('Notification scheduled:', identifier);
    return identifier;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
}

export async function getAllScheduledNotifications() {
  try {
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    console.log('Scheduled notifications:', notifications);
    return notifications;
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return [];
  }
}