import { LocalNotifications } from '@capacitor/local-notifications'
import { Haptics } from '@capacitor/haptics'

class AlarmSoundService {
    constructor() {
        this.isPlaying = false
        this.notificationId = 999
        this.soundTimeout = null
        this.vibrationInterval = null
        this.channelCreated = false
    }

    async createAlarmChannel() {
        if (this.channelCreated) return

        try {
            // Create channel with CALL ringtone (not notification sound)
            await LocalNotifications.createChannel({
                id: 'alarm_channel',
                name: 'Alarm Calls',
                description: 'Critical alarm with call ringtone',
                sound: 'ringtone', // Use phone's call ringtone!
                importance: 5, // IMPORTANCE_MAX
                visibility: 1, // PUBLIC - show on lock screen
                vibration: true,
                lightColor: '#FF0000',
                lights: true,
                // This makes it behave like a phone call
                audioContentType: 'voice_call'
            })

            this.channelCreated = true
            console.log('✅ Alarm channel created with CALL ringtone')
        } catch (error) {
            console.error('Error creating channel:', error)
        }
    }

    async start() {
        console.log('🔔 AlarmSoundService.start() called')

        if (this.isPlaying) {
            console.log('⚠️ Already playing')
            return
        }

        try {
            this.isPlaying = true

            const permission = await LocalNotifications.requestPermissions()
            console.log('✅ Permission:', permission)

            if (permission.display === 'granted') {
                await this.createAlarmChannel()
                await this.triggerFullScreenAlarm()
                this.startContinuousVibration()

                // Auto-stop after 30 seconds
                this.soundTimeout = setTimeout(() => {
                    console.log('⏰ 30s timeout')
                    this.stop()
                }, 30000)

                console.log('✅ Alarm started with CALL ringtone')
            } else {
                console.error('❌ Permission not granted')
            }
        } catch (error) {
            console.error('❌ Error starting alarm:', error)
        }
    }

    async triggerFullScreenAlarm() {
        try {
            console.log('📢 Triggering FULL-SCREEN alarm')

            await LocalNotifications.cancel({
                notifications: [{ id: this.notificationId }]
            })

            // Schedule notification with full-screen intent
            // This will wake the screen and show the app even when locked!
            await LocalNotifications.schedule({
                notifications: [{
                    id: this.notificationId,
                    title: '🚨 ALLARME ATTIVATO',
                    body: 'Movimento rilevato - Scorri per gestire',
                    sound: null, // Channel handles sound
                    largeBody: 'Sistema di allarme De Biasi',
                    summaryText: 'Allarme in corso',
                    schedule: {
                        at: new Date(Date.now() + 100),
                        allowWhileIdle: true
                    },
                    channelId: 'alarm_channel',
                    ongoing: true, // Cannot be dismissed
                    autoCancel: false,
                    // This is KEY for full-screen intent!
                    extra: {
                        fullScreenIntent: true, // Wake screen
                        priority: 'max',
                        category: 'call' // Behave like phone call
                    },
                    actionTypeId: 'ALARM_ACTION',
                    attachments: null,
                    threadIdentifier: 'alarm'
                }]
            })

            console.log('✅ Full-screen alarm notification triggered')
        } catch (error) {
            console.error('❌ Error triggering alarm:', error)
        }
    }

    startContinuousVibration() {
        const vibrate = async () => {
            if (!this.isPlaying) return

            try {
                await Haptics.vibrate({ duration: 1000 })
            } catch (error) {
                console.error('Vibration error:', error)
            }

            this.vibrationInterval = setTimeout(vibrate, 1200)
        }

        vibrate()
        console.log('📳 Vibration started')
    }

    async stop() {
        console.log('🛑 Stopping alarm')

        if (!this.isPlaying) return

        try {
            this.isPlaying = false

            if (this.vibrationInterval) {
                clearTimeout(this.vibrationInterval)
                this.vibrationInterval = null
                console.log('📳 Vibration stopped')
            }

            await LocalNotifications.cancel({
                notifications: [{ id: this.notificationId }]
            })
            console.log('🔕 Notification cancelled')

            if (this.soundTimeout) {
                clearTimeout(this.soundTimeout)
                this.soundTimeout = null
            }

            console.log('✅ Alarm stopped')
        } catch (error) {
            console.error('❌ Error stopping:', error)
        }
    }

    isActive() {
        return this.isPlaying
    }
}

export default new AlarmSoundService()
