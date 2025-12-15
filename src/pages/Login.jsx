import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../lib/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        // ... same as before ... 
        e.preventDefault()
        setLoading(true)
        try {
            const data = await auth.login(email, password)
            if (data.access_token) {
                localStorage.setItem('token', data.access_token)
                // Store username for display (use username from data if available, otherwise email)
                const username = data.user?.username || data.username || email.split('@')[0]
                localStorage.setItem('username', username)
                navigate('/')
            }
        } catch (error) {
            console.error('Login failed:', error)
            const message = error.response?.data?.detail || error.message || 'Errore sconosciuto'
            alert(`Login fallito: ${message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-white">
            <div className="flex flex-col items-center justify-center p-4 min-h-screen">
                {/* ... same ... */}
                <div className="w-full max-w-md mx-auto">
                    {/* Logo... */}
                    <div className="flex justify-center mb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined text-white text-[40px]">
                                shield
                            </span>
                        </div>
                    </div>

                    <h1 className="text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6 tracking-tight">
                        Bentornato!
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
                        Accedi al tuo account De Biasi Alarm
                    </p>

                    <form onSubmit={handleLogin} className="flex flex-col gap-y-4 px-4 py-6">
                        <Input
                            label="Email / Username"
                            placeholder="Inserisci username"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            placeholder="Inserisci la tua password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            icon={
                                <span
                                    className="material-symbols-outlined cursor-pointer select-none"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            }
                        />

                        {/* Options Row */}
                        <div className="flex justify-between items-center py-2">
                            <label className="flex gap-x-3 flex-row items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="h-5 w-5 rounded border-slate-300 dark:border-slate-600 border-2 bg-transparent text-primary checked:bg-primary focus:ring-primary/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:outline-none transition-colors"
                                />
                                <p className="text-slate-700 dark:text-white text-base font-normal leading-normal">
                                    Resta collegato
                                </p>
                            </label>
                            <a
                                href="#"
                                className="text-primary text-base font-medium leading-normal hover:underline"
                            >
                                Password dimenticata?
                            </a>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4 pt-3">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Accesso in corso...' : 'Accedi'}
                            </Button>
                            <Button variant="secondary" type="button">
                                <span className="material-symbols-outlined mr-2">
                                    fingerprint
                                </span>
                                Accedi con Biometria
                            </Button>
                        </div>
                    </form>

                    {/* Footer Link */}
                    <div className="pt-2 px-4">
                        <p className="text-center text-base text-slate-500 dark:text-slate-400">
                            Non hai un account?{' '}
                            <Link
                                to="/register"
                                className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                            >
                                Registrati
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
