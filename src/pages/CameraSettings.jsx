import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CameraSettings() {
    const navigate = useNavigate()
    const [motion, setMotion] = useState(true)
    const [smart, setSmart] = useState(true)

    return (
        <div className="flex flex-col gap-4 pb-20 bg-background-light dark:bg-background-dark min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-border-dark/30">
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer hover:opacity-70 transition-opacity"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
                    Impostazioni
                </h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="text-primary text-base font-bold leading-normal tracking-[0.015em] shrink-0 hover:text-primary/80 transition-colors">
                        Salva
                    </button>
                </div>
            </div>

            {/* Preview */}
            <div className="@container">
                <div className="@[480px]:px-4 @[480px]:py-3">
                    <div
                        className="relative bg-cover bg-center flex flex-col justify-end overflow-hidden bg-surface-dark @[480px]:rounded-lg min-h-[220px] shadow-lg"
                        style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWVID9gXiVswnIpWwVT7eYKc89a8tO7DPtYpdPoh6jXgLLGYEKSF8NLqi8pDEhn4ey6q-1Od-2AmJCujxaHTOllrpGjx7KFFbrtSyPCyUB0VJT_9If0DJV_c0GIAd3rGru75ZfWRilR-JcOTGtCkAuZiDHUakPzHS_FjDlgyEesnUqzOCa1pxxP4t7oHS4n_P-HX1YEGgteyXoR294T7rQkjEQ2XH5miJKTi1oleD5BBXVyPh2pbeuFIEQa0YS_gH_f3S9QntMEetc")'
                        }}
                    >
                        <div className="flex flex-col p-4 z-10">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="inline-flex items-center rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/30">
                                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-400"></span>
                                    Online
                                </span>
                            </div>
                            <p className="text-white tracking-tight text-[28px] font-bold leading-tight drop-shadow-md">
                                Telecamera Giardino
                            </p>
                            <p className="text-gray-300 text-sm font-medium mt-1">
                                Batteria: 84% • Wi-Fi Segnale Forte
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* General Section */}
            <div className="flex flex-col">
                <h3 className="text-slate-500 dark:text-[#92a4c9] text-sm font-bold uppercase leading-tight tracking-wider px-4 pb-2 pt-2">
                    Generale
                </h3>
                <div className="mx-4 bg-white dark:bg-[#192233] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-border-dark">
                    <div className="flex flex-col px-4 py-3 border-b border-gray-100 dark:border-border-dark">
                        <label className="text-slate-900 dark:text-white text-base font-medium leading-normal mb-2">Nome Dispositivo</label>
                        <input
                            className="w-full rounded-lg bg-gray-50 dark:bg-[#101622] border border-gray-200 dark:border-border-dark text-slate-900 dark:text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-gray-400"
                            defaultValue="Telecamera Giardino"
                        />
                    </div>
                </div>
            </div>

            {/* Motion Section */}
            <div className="flex flex-col">
                <h3 className="text-slate-500 dark:text-[#92a4c9] text-sm font-bold uppercase leading-tight tracking-wider px-4 pb-2 pt-4">
                    Allarme e Rilevamento
                </h3>
                <div className="mx-4 bg-white dark:bg-[#192233] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-border-dark">
                    {/* Toggle */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-border-dark">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">motion_sensor_active</span>
                            </div>
                            <span className="text-slate-900 dark:text-white font-medium">Rilevamento Movimento</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={motion} onChange={() => setMotion(!motion)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 dark:peer-focus:ring-primary/30 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                        </label>
                    </div>

                    {/* Slider */}
                    <div className="flex flex-col px-4 py-4 border-b border-gray-100 dark:border-border-dark">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-slate-900 dark:text-white font-medium">Sensibilità</span>
                            <span className="text-primary font-bold">Alta</span>
                        </div>
                        <input type="range" min="1" max="100" defaultValue="85" className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" />
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="mx-4 mt-6 mb-8 flex flex-col gap-3">
                <button className="w-full py-3.5 rounded-xl bg-white dark:bg-[#192233] border border-gray-200 dark:border-border-dark text-slate-900 dark:text-white font-bold text-base hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    Riavvia Telecamera
                </button>
                <button className="w-full py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 font-bold text-base hover:bg-red-500/20 transition-colors">
                    Rimuovi Dispositivo
                </button>
            </div>

        </div>
    )
}
