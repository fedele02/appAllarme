import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AlarmCountdown() {
    const [countdown, setCountdown] = useState(10)
    const navigate = useNavigate()

    useEffect(() => {
        // Countdown timer
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    // Store alarm data
                    const testData = {
                        type: 'alarm_triggered',
                        zone_name: 'TEST ALLARME',
                        zone_id: 'test_1',
                        timestamp: new Date().toISOString()
                    }
                    sessionStorage.setItem('pendingAlarm', JSON.stringify(testData))
                    // Navigate to alarm
                    navigate('/alarm')
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [navigate])

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
            <div className="text-center">
                <div className="mb-8">
                    <span className="material-symbols-outlined text-orange-500 text-8xl animate-pulse">
                        alarm
                    </span>
                </div>

                <h1 className="text-white text-3xl font-bold mb-4">
                    ⏰ CHIUDI IL TELEFONO ORA!
                </h1>

                <p className="text-white/70 text-lg mb-8">
                    Allarme test tra:
                </p>

                <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-4 border-orange-500/20"></div>
                    <div
                        className="absolute inset-0 rounded-full border-4 border-orange-500 transition-all duration-1000"
                        style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((countdown / 10) * 2 * Math.PI)}% ${50 - 50 * Math.cos((countdown / 10) * 2 * Math.PI)}%, 50% 50%)`
                        }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white text-5xl font-bold">
                            {countdown}
                        </span>
                    </div>
                </div>

                <p className="text-white/50 text-sm">
                    L'allarme suonerà quando il telefono è chiuso
                </p>
            </div>
        </div>
    )
}
