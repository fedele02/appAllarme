import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../lib/api'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        phone: '',
        password: '',
        repeatPassword: '',
        houseCode: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.repeatPassword) {
            alert("Le password non coincidono")
            return
        }
        setLoading(true)
        try {
            await auth.register(formData)
            alert("Registrazione completata! Ora puoi accedere.")
            navigate('/login')
        } catch (error) {
            console.error('Registration failed:', error)
            alert('Registrazione fallita. Riprova.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-white">
            {/* Top App Bar */}
            <header className="flex shrink-0 items-center justify-between p-4 pb-2">
                <Link
                    to="/login"
                    className="flex size-12 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-800 dark:text-white"
                >
                    <span className="material-symbols-outlined text-2xl">
                        arrow_back_ios_new
                    </span>
                </Link>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-tight">
                    Registra Nuovo Account
                </h1>
                <div className="size-12"></div>
            </header>

            {/* Form Section */}
            <main className="flex flex-1 flex-col p-4 w-full max-w-md mx-auto">
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <Input
                        label="Email"
                        name="email"
                        placeholder="Inserisci la tua email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="flex flex-wrap items-end gap-4">
                        <div className="flex-1 min-w-[140px]">
                            <Input label="Nome" name="name" placeholder="Il tuo nome" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div className="flex-1 min-w-[140px]">
                            <Input label="Cognome" name="surname" placeholder="Il tuo cognome" value={formData.surname} onChange={handleChange} required />
                        </div>
                    </div>

                    <Input
                        label="Numero di telefono"
                        name="phone"
                        placeholder="Il tuo numero di telefono"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        label="Password"
                        name="password"
                        placeholder="Crea una password sicura"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        icon={
                            <span className="material-symbols-outlined cursor-pointer select-none">
                                visibility
                            </span>
                        }
                    />

                    <Input
                        label="Ripeti password"
                        name="repeatPassword"
                        placeholder="Ripeti la password"
                        type="password"
                        value={formData.repeatPassword}
                        onChange={handleChange}
                        required
                        icon={
                            <span className="material-symbols-outlined cursor-pointer select-none">
                                visibility_off
                            </span>
                        }
                    />

                    <Input
                        label={
                            <span className="flex items-center gap-2">
                                <span>Codice Casa</span>
                                <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                                    (Opzionale)
                                </span>
                            </span>
                        }
                        name="houseCode"
                        value={formData.houseCode}
                        onChange={handleChange}
                        placeholder="Inserisci il codice casa"
                    />

                    {/* Spacer */}
                    <div className="mt-4"></div>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-4 pb-8">
                        <p className="text-center text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                            Creando un account, accetti i nostri{' '}
                            <a href="#" className="font-medium text-primary hover:underline">
                                Termini di Servizio
                            </a>{' '}
                            e la nostra{' '}
                            <a href="#" className="font-medium text-primary hover:underline">
                                Informativa sulla Privacy
                            </a>.
                        </p>

                        <Button type="submit" disabled={loading}>
                            {loading ? 'Registrazione...' : 'Registra'}
                        </Button>

                        <p className="text-base text-slate-600 dark:text-slate-400">
                            Hai già un account?{' '}
                            <Link
                                to="/login"
                                className="font-bold text-primary hover:underline hover:text-primary/80 transition-colors"
                            >
                                Accedi
                            </Link>
                        </p>
                    </div>
                </form>
            </main>
        </div>
    )
}
