import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AlarmSoundService from '../services/AlarmSoundService'

export default function AlarmScreen() {
    const navigate = useNavigate()
    const [alarmData, setAlarmData] = useState(null)

    // Dual sliders state
    const [leftSlidePos, setLeftSlidePos] = useState(0) // 0-100
    const [rightSlidePos, setRightSlidePos] = useState(0) // 0-100
    const [activeSlider, setActiveSlider] = useState(null) // 'left' or 'right'

    const leftStartX = useRef(0)
    const rightStartX = useRef(0)
    const threshold = 85 // % to complete

    useEffect(() => {
        const pendingAlarmData = sessionStorage.getItem('pendingAlarm')
        if (pendingAlarmData) {
            try {
                const data = JSON.parse(pendingAlarmData)
                sessionStorage.removeItem('pendingAlarm')
                setAlarmData(data)
                AlarmSoundService.start()
            } catch (error) {
                console.error('Error:', error)
            }
        }

        return () => {
            AlarmSoundService.stop()
        }
    }, [])

    // Left slider (Entra app)
    const handleLeftTouchStart = (e) => {
        leftStartX.current = e.touches[0].clientX
        setActiveSlider('left')
    }

    const handleLeftTouchMove = (e) => {
        if (activeSlider !== 'left') return
        const currentX = e.touches[0].clientX
        const diff = currentX - leftStartX.current
        const maxWidth = 250 // approx container width - button width
        const progress = Math.min(100, Math.max(0, (diff / maxWidth) * 100))
        setLeftSlidePos(progress)
    }

    const handleLeftTouchEnd = () => {
        if (leftSlidePos > threshold) {
            handleEnterApp()
        } else {
            setLeftSlidePos(0)
        }
        setActiveSlider(null)
    }

    // Right slider (Silenzia)
    const handleRightTouchStart = (e) => {
        rightStartX.current = e.touches[0].clientX
        setActiveSlider('right')
    }

    const handleRightTouchMove = (e) => {
        if (activeSlider !== 'right') return
        const currentX = e.touches[0].clientX
        const diff = currentX - rightStartX.current
        const maxWidth = 250
        const progress = Math.min(100, Math.max(0, (diff / maxWidth) * 100))
        setRightSlidePos(progress)
    }

    const handleRightTouchEnd = () => {
        if (rightSlidePos > threshold) {
            handleSilence()
        } else {
            setRightSlidePos(0)
        }
        setActiveSlider(null)
    }

    const handleEnterApp = () => {
        AlarmSoundService.stop()
        navigate('/sensors')
    }

    const handleSilence = () => {
        AlarmSoundService.stop()
        navigate(-1)
    }

    if (!alarmData) {
        return (
            <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
                <p className="text-white/50">In attesa di allarme...</p>
            </div>
        )
    }

    const now = new Date(alarmData.timestamp)
    const time = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1419] to-[#0a0e1a] flex flex-col items-center justify-between px-4 py-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>

            {/* Top Badge */}
            <div className="relative z-10 mt-6">
                <div className="flex items-center gap-2 bg-red-600/20 border border-red-600/30 rounded-full px-4 py-2 backdrop-blur-md">
                    <span className="material-symbols-outlined text-red-500 text-base">warning</span>
                    <span className="text-red-100 font-bold text-xs tracking-wide">ALLARME RILEVATO</span>
                </div>
            </div>

            {/* Title */}
            <div className="relative z-10 text-center mt-4">
                <h1 className="text-white text-3xl sm:text-4xl font-bold mb-2">
                    Movimento Sospetto
                </h1>
                <p className="text-white/60 text-base">
                    {alarmData.zone_name} • {time}
                </p>
            </div>

            {/* Central Circle */}
            <div className="relative z-10 flex items-center justify-center my-6">
                <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping"></div>
                    <div className="absolute inset-3 rounded-full border-2 border-blue-500/40"></div>
                    <div className="absolute inset-6 rounded-full border-2 border-blue-500/50"></div>

                    <div className="absolute inset-12 rounded-full bg-gradient-to-b from-gray-900 to-black shadow-2xl flex items-center justify-center">
                        <div className="bg-white rounded-xl p-4">
                            <span className="material-symbols-outlined text-gray-900 text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                                shield
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* System Info */}
            <div className="relative z-10 text-center mb-4">
                <h2 className="text-white text-xl font-bold mb-1">
                    Sistema di Allarme De Biasi
                </h2>
                <p className="text-white/50 text-sm">
                    Rilevamento Persona
                </p>
            </div>

            {/* Dual Sliders */}
            <div className="relative z-10 w-full max-w-md flex flex-col gap-4 mb-4">
                {/* Slider 1: Entra nell'app */}
                <div className="relative">
                    <div className="relative h-16 bg-blue-900/20 border-2 border-blue-500/30 rounded-full overflow-hidden">
                        {/* Background fill */}
                        <div
                            className="absolute inset-0 bg-blue-500/40 transition-all duration-100"
                            style={{ width: `${leftSlidePos}%` }}
                        ></div>

                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white font-bold text-sm">
                                {leftSlidePos > threshold ? '✓ Rilascia!' : 'Scorri per Entrare nell\'app →'}
                            </span>
                        </div>

                        {/* Draggable button */}
                        <div
                            className="absolute left-0 top-0 h-full w-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform"
                            style={{
                                transform: `translateX(${(leftSlidePos / 100) * 250}px)`,
                                touchAction: 'none'
                            }}
                            onTouchStart={handleLeftTouchStart}
                            onTouchMove={handleLeftTouchMove}
                            onTouchEnd={handleLeftTouchEnd}
                        >
                            <span className="material-symbols-outlined text-blue-600 text-2xl">
                                home
                            </span>
                        </div>
                    </div>
                </div>

                {/* Slider 2: Silenzia */}
                <div className="relative">
                    <div className="relative h-16 bg-orange-900/20 border-2 border-orange-500/30 rounded-full overflow-hidden">
                        {/* Background fill */}
                        <div
                            className="absolute inset-0 bg-orange-500/40 transition-all duration-100"
                            style={{ width: `${rightSlidePos}%` }}
                        ></div>

                        {/* Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-white font-bold text-sm">
                                {rightSlidePos > threshold ? '✓ Rilascia!' : 'Scorri per Silenziare →'}
                            </span>
                        </div>

                        {/* Draggable button */}
                        <div
                            className="absolute left-0 top-0 h-full w-16 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform"
                            style={{
                                transform: `translateX(${(rightSlidePos / 100) * 250}px)`,
                                touchAction: 'none'
                            }}
                            onTouchStart={handleRightTouchStart}
                            onTouchMove={handleRightTouchMove}
                            onTouchEnd={handleRightTouchEnd}
                        >
                            <span className="material-symbols-outlined text-orange-600 text-2xl">
                                volume_off
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
