import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export default function Settings() {
    const navigate = useNavigate()
    const username = localStorage.getItem('username') || 'Utente'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        navigate('/login')
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden pb-24">
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-transparent dark:border-border-dark/30">
                <h1 className="text-slate-900 dark:text-white text-[28px] font-bold leading-tight tracking-[-0.015em] flex-1 flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl text-primary">settings</span>
                    Impostazioni
                </h1>
            </div>

            <div className="p-4 pt-6 flex-1 flex flex-col gap-6">
                {/* User Info */}
                <div className="bg-white dark:bg-[#1C2534] border border-slate-100 dark:border-[#232f48] p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-4xl">person</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                {username}
                            </h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Amministratore
                            </p>
                        </div>
                    </div>
                </div>

                {/* Settings Options */}
                <div className="flex flex-col gap-3">
                    <div className="bg-white dark:bg-[#1C2534] border border-slate-100 dark:border-[#232f48] p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">notifications</span>
                            <span className="font-medium text-slate-900 dark:text-white">Notifiche</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                    </div>

                    <div className="bg-white dark:bg-[#1C2534] border border-slate-100 dark:border-[#232f48] p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">dark_mode</span>
                            <span className="font-medium text-slate-900 dark:text-white">Tema Scuro</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                    </div>

                    <div className="bg-white dark:bg-[#1C2534] border border-slate-100 dark:border-[#232f48] p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">info</span>
                            <span className="font-medium text-slate-900 dark:text-white">Info App</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                    </div>
                </div>

                {/* Logout Button */}
                <div className="pt-6">
                    <Button
                        onClick={handleLogout}
                        variant="secondary"
                        className="w-full"
                    >
                        <span className="material-symbols-outlined mr-2">logout</span>
                        Esci dall'account
                    </Button>
                </div>
            </div>
        </div>
    )
}
