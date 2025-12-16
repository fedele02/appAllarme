import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { alarm } from '../lib/api'
import NotificationService from '../services/NotificationService'


export default function Home() {
    const [isArmed, setIsArmed] = useState(false)
    const [loading, setLoading] = useState(true)
    const username = localStorage.getItem('username') || 'Utente'

    useEffect(() => {
        checkStatus()
        // Poll status every 5 seconds
        const interval = setInterval(checkStatus, 5000)
        return () => clearInterval(interval)
    }, [])

    const checkStatus = async () => {
        try {
            const data = await alarm.getStatus()
            const status = data?.alarm_status?.toLowerCase()
            setIsArmed(status !== 'disarmed' && status !== undefined)
        } catch (error) {
            console.error('Error fetching status:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleAlarm = async () => {
        setLoading(true)
        try {
            const result = isArmed ? await alarm.disarm() : await alarm.arm()
            if (result.success) {
                checkStatus() // Force refresh
            } else {
                alert('Operazione fallita')
            }
        } catch (error) {
            console.error('Error toggling alarm:', error)
            alert('Errore nel cambiare stato allarme')
        } finally {
            setLoading(false)
        }
    }

    const handleTestAlarm = () => {
        console.log('🔔 handleTestAlarm called in Home.jsx')
        try {
            NotificationService.sendTestNotification()
        } catch (error) {
            console.error('❌ Error in handleTestAlarm:', error)
        }
    }

    return (
        <div className="flex flex-1 flex-col px-4 h-full relative">
            {/* Header */}
            <div className="flex items-center justify-between pt-6 pb-2">
                <h1 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-tight">
                    Ciao, {username}
                </h1>
                <Link to="/settings" className="text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-[28px]">settings</span>
                </Link>
            </div>

            <div className="flex-grow flex flex-col items-center justify-center py-8 min-h-[50vh]">
                <button
                    onClick={toggleAlarm}
                    disabled={loading}
                    className={`flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-full transition-all duration-300 ease-in-out shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden ${isArmed
                        ? 'bg-red-600 shadow-red-600/40 hover:bg-red-700 hover:scale-105'
                        : 'bg-emerald-500 shadow-emerald-500/40 hover:bg-emerald-600 hover:scale-105'
                        }`}
                >
                    {/* Ripple/Pulse Effect */}
                    <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${isArmed ? 'bg-red-500' : 'bg-emerald-400'}`}></div>

                    <span
                        className="material-symbols-outlined text-white z-10 transition-transform duration-300 group-hover:scale-110"
                        style={{ fontSize: '96px', fontVariationSettings: "'FILL' 1" }}
                    >
                        {isArmed ? 'lock' : 'lock_open_right'}
                    </span>
                    <span className="mt-4 text-xl font-bold uppercase tracking-widest text-white/90 z-10">
                        {isArmed ? 'ATTIVO' : 'DISATTIVO'}
                    </span>
                </button>

                {/* Test Alarm Button */}
                <button
                    onClick={handleTestAlarm}
                    className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 active:scale-95"
                >
                    <span className="material-symbols-outlined">notifications_active</span>
                    TEST ALLARME
                </button>

                <div className="pt-6 flex flex-col items-center animate-fade-in">
                    <div className={`p-3 rounded-2xl flex items-center gap-3 ${isArmed ? 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'}`}>
                        <span className="material-symbols-outlined">
                            {isArmed ? 'security' : 'verified_user'}
                        </span>
                        <span className="font-medium">
                            {loading ? 'Sincronizzazione...' : (isArmed
                                ? 'Sistema Inserito'
                                : 'Sistema Pronto')}
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid using Icons */}
            {/* Quick Actions Grid using Icons */}
            <div className="grid grid-cols-2 gap-4 pb-8 max-w-sm mx-auto w-full">
                <Link to="/schedule" className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#1C2534] border border-gray-100 dark:border-[#232f48] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <div className="size-12 rounded-full bg-purple-50 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">event_upcoming</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Orari</span>
                </Link>

                <Link to="/contacts" className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#1C2534] border border-gray-100 dark:border-[#232f48] shadow-sm hover:shadow-md transition-all active:scale-95">
                    <div className="size-12 rounded-full bg-red-50 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center">
                        <span className="material-symbols-outlined text-2xl">sos</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">SOS</span>
                </Link>
            </div>
        </div>
    )
}
