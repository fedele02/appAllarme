import { useNavigate } from 'react-router-dom'

export default function Contacts() {
    const navigate = useNavigate()

    const contacts = [
        { name: 'Mario Rossi', phone: '+39 333 1234567' },
        { name: 'Giulia Bianchi', phone: '+39 345 9876543' },
        { name: 'Ufficio Sicurezza', phone: '+39 02 55558888' },
    ]

    return (
        <div className="relative mx-auto flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display pb-[90px]">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 p-4 pb-3 backdrop-blur-sm dark:bg-background-dark/80">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 shrink-0 items-center justify-start text-slate-800 dark:text-white"
                >
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
                </button>
                <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white">
                    Contatti di Emergenza
                </h1>
                <div className="flex w-10 shrink-0 items-center justify-end">
                    <p className="text-base font-bold leading-normal tracking-[0.015em] text-primary cursor-pointer hover:opacity-80">Salva</p>
                </div>
            </div>

            <div className="flex-grow px-4 pb-32">
                <p className="pb-6 pt-2 text-sm font-normal leading-normal text-slate-600 dark:text-slate-400">
                    Questi numeri saranno contattati in ordine in caso di allarme.
                </p>
                <div className="flex flex-col gap-2">
                    {contacts.map((contact, index) => (
                        <div key={index} className="flex min-h-[72px] items-center gap-4 rounded-xl bg-white dark:bg-[#1C2534] p-2 shadow-sm border border-transparent dark:border-border-dark">
                            <div className="flex size-10 shrink-0 cursor-grab items-center justify-center rounded-lg bg-slate-100 dark:bg-[#232f48] text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined">drag_indicator</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                                <p className="text-base font-medium leading-normal text-slate-900 dark:text-white line-clamp-1">{contact.name}</p>
                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-[#92a4c9] line-clamp-2">{contact.phone}</p>
                            </div>
                            <div className="shrink-0">
                                <div className="flex size-10 cursor-pointer items-center justify-center text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transaction-colors">
                                    <span className="material-symbols-outlined text-2xl">delete</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-24 right-1/2 z-30 translate-x-1/2 w-full max-w-[calc(100%-2rem)] flex justify-end px-4">
                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105 active:scale-95">
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>

        </div>
    )
}
