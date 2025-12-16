import { PushNotifications } from '@capacitor/push-notifications'
import { LocalNotifications } from '@capacitor/local-notifications'
import { Haptics, ImpactStyle } from '@capacitor/haptics'

class NotificationService {
    constructor() {
        this.deviceToken = null
        this.isInitialized = false
    }

    async initialize() {
        if (this.isInitialized) return

        try {
            // Request permissions
            const permission = await PushNotifications.requestPermissions()

            if (permission.receive === 'granted') {
                await PushNotifications.register()

                // Listen for registration
                await PushNotifications.addListener('registration', (token) => {
                    console.log('Push registration success, token: ' + token.value)
                    this.deviceToken = token.value
                    this.registerWithBackend(token.value)
                })

                // Listen for registration errors
                await PushNotifications.addListener('registrationError', (error) => {
                    console.error('Error on registration: ' + JSON.stringify(error))
                })

                // Listen for push notifications
                await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
                    console.log('Push notification received: ', notification)
                    await this.handleNotification(notification)
                })

                // Listen for notification actions (when user taps)
                await PushNotifications.addListener('pushNotificationActionPerformed', async (notification) => {
                    console.log('Push notification action performed', notification)
                    await this.handleNotificationAction(notification)
                })

                this.isInitialized = true
            } else {
                console.log('Push notification permission not granted')
            }
        } catch (error) {
            console.error('Error initializing push notifications:', error)
        }
    }

    async registerWithBackend(deviceToken) {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                console.log('No auth token, skipping device registration')
                return
            }

            const API_URL = 'https://unexploitative-emmalyn-unroosting.ngrok-free.dev/api'
            const response = await fetch(`${API_URL}/notifications/register`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    device_token: deviceToken,
                    platform: 'android'
                })
            })

            if (response.ok) {
                console.log('Device registered with backend successfully')
            } else {
                console.error('Failed to register device with backend')
            }
        } catch (error) {
            console.error('Error registering device with backend:', error)
        }
    }

    async handleNotification(notification) {
        // When notification arrives while app is open
        const data = notification.data

        if (data.type === 'alarm_triggered') {
            // Trigger alarm screen
            await this.triggerAlarmScreen(data)
        }
    }

    async handleNotificationAction(notification) {
        // When user taps on notification
        const data = notification.notification.data

        if (data.type === 'alarm_triggered') {
            // Navigate to alarm screen
            window.location.href = '/alarm'
        }
    }

    async triggerAlarmScreen(data) {
        // This will be called when notification arrives
        // The alarm screen will handle ringtone and vibration
        window.dispatchEvent(new CustomEvent('alarmTriggered', { detail: data }))
    }

    async sendTestNotification() {
        console.log('🔔 TEST ALLARME button clicked')
        // Navigate to countdown screen
        window.location.href = '/alarm-countdown'
    }

    getDeviceToken() {
        return this.deviceToken
    }
}

export default new NotificationService()
