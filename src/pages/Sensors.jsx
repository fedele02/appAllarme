import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { alarm } from '../lib/api'

export default function Sensors() {
    const [sensors, setSensors] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSensors()
        const interval = setInterval(fetchSensors, 5000)
        return () => clearInterval(interval)
    }, [])

    const fetchSensors = async () => {
        try {
            // User provided JSON shows zones inside /api/status response
            const data = await alarm.getStatus()
            setSensors(data.zones || [])
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Heuristic or explicit mapping for icons based on sensor name or type
    const getIcon = (sensor) => {
        const lowerName = (sensor.name || '').toLowerCase()
        if (lowerName.includes('porta') || lowerName.includes('ingresso')) return 'door_front'
        if (lowerName.includes('finestra')) return 'window'
        if (lowerName.includes('garage')) return 'garage_home'
        if (lowerName.includes('manomissione')) return 'shield' // Changed from tamper_prevention_on
        return 'sensors' // default
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-transparent dark:border-border-dark/30">
                <h1 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] flex-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-primary">grid_view</span>
                    Zone
                </h1>
                <div className="flex w-12 items-center justify-end">
                    <button onClick={fetchSensors} className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-primary/10 text-primary dark:bg-primary/20 dark:text-white hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">refresh</span>
                    </button>
                </div>
            </div>

            <div className="p-4 pt-2 flex-1 flex flex-col gap-3">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <span className="material-symbols-outlined animate-spin text-4xl text-primary/50">progress_activity</span>
                        <p className="mt-2 text-slate-500">Caricamento zone...</p>
                    </div>
                )}

                {!loading && sensors.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <span className="material-symbols-outlined text-6xl mb-4 opacity-50">sensors_off</span>
                        <p>Nessuna zona configurata.</p>
                    </div>
                )}

                {sensors.map((sensor, idx) => {
                    const isOpen = sensor.state === 'open' // Based on user JSON "state": "closed"
                    // If state is open -> Alarm/Active/Red. If closed -> Normal/Green.
                    // Usually "open" circuit = alarm for many NC sensors. "closed" = secure.
                    // Let's assume 'closed' is SECURE (Green) and 'open' is ALARM (Orange/Red).
                    const isSecure = sensor.state === 'closed'

                    return (
                        <div key={idx} className="flex items-center gap-4 bg-white dark:bg-[#1C2534] border border-slate-100 dark:border-[#232f48] p-4 rounded-2xl shadow-sm min-h-[72px] justify-between transition-all hover:shadow-md">
                            <div className="flex items-center gap-4">
                                <div className={`flex items-center justify-center rounded-2xl shrink-0 size-14 ${isSecure
                                    ? 'bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10'
                                    : 'bg-red-50 text-red-500 dark:bg-red-500/10'
                                    }`}>
                                    <span className="material-symbols-outlined text-3xl">
                                        {getIcon(sensor)}
                                    </span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight line-clamp-1">
                                        {sensor.name || `P. ${sensor.pin}`}
                                    </p>
                                    <div className="flex items-center gap-1.5 pt-0.5">
                                        <div className={`size-2 rounded-full ${isSecure ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                                        <p className={`${isSecure ? 'text-slate-500 dark:text-slate-400' : 'text-red-500 font-semibold'} text-sm leading-normal`}>
                                            {isSecure ? 'Chiuso' : 'APERTO'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="shrink-0 flex flex-col items-end gap-1">
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${sensor.enabled ? 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300' : 'bg-slate-100/50 text-slate-400'}`}>
                                    {sensor.type}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">PIN {sensor.pin}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
