import { Link } from 'react-router-dom'

export default function Cameras() {
    return (
        <div className="relative flex min-h-screen w-full flex-col pb-24 overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-5 py-4 backdrop-blur-md border-b border-gray-200 dark:border-border-dark/30">
                <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-500 dark:text-[#92a4c9] uppercase tracking-wider">
                        Benvenuto
                    </span>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                        Telecamere
                    </h2>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <main className="flex flex-col gap-6 p-5">
                {/* System Status Card */}
                <section className="rounded-2xl border border-gray-200 dark:border-[#324467] bg-white dark:bg-[#192233] p-5 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 dark:bg-[#232f48] text-primary dark:text-white">
                                <span className="material-symbols-outlined text-[28px]">
                                    shield
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                                    Sistema di Allarme
                                </h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-[#92a4c9] mt-1">
                                    Stato: <span className="text-green-500">Attivo</span>
                                </p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                    Tutti i sensori monitorano la casa.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input type="checkbox" defaultChecked className="peer sr-only" />
                            <div className="h-7 w-12 rounded-full bg-gray-200 dark:bg-[#232f48] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 dark:peer-focus:ring-primary/30 peer-checked:bg-primary border border-slate-300 dark:border-slate-600 peer-checked:border-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white shadow-inner"></div>
                        </label>
                    </div>
                </section>

                {/* Devices List */}
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-[#92a4c9]">
                            I tuoi dispositivi (3)
                        </h3>
                        <button className="text-xs font-bold text-primary hover:underline">
                            Gestisci
                        </button>
                    </div>

                    {/* Camera 1 */}
                    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#192233] shadow-sm transition hover:shadow-md border border-gray-200 dark:border-transparent">
                        <div className="relative aspect-video w-full bg-black">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAQ2SuklJ3R6IlKjnZHeWw2yyPo2oAAxqPOy_K4gbi977RZrF-tkpkPcC7rq_JmL3gT-DnFcuymaRULtv8fUjzpL1hO2J-nBYJGGiMx0jEPq9EK336162XK_tSi5HuAYv5bxgc0ndE02dFsezJWDZwtcQcpYX9cyKXVVpAEyfn026GhZ2Ms_dSrxl94wC-APXkojrhwP418q8tEHlPBV-a7Pn15EJdx8cF0R_shtpytBGxKFlHn1VyH7DPQidJxJTUTbyAughqR59II")',
                                }}
                            ></div>
                            <div className="absolute left-3 top-3 flex items-center gap-2">
                                <span className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500"></span>
                                    LIVE
                                </span>
                            </div>
                            <Link to="/cameras/live/1" className="absolute inset-0" />
                        </div>
                        <div className="flex flex-col gap-3 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                                        Ingresso Principale
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                                        Online • 2K HD
                                    </p>
                                </div>
                                <Link to="/cameras/settings/1" className="rounded-full bg-gray-100 dark:bg-[#232f48] p-2 text-gray-600 dark:text-white transition hover:bg-primary hover:text-white">
                                    <span className="material-symbols-outlined text-[20px]">
                                        settings
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Camera 2 */}
                    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#192233] shadow-sm transition hover:shadow-md border border-gray-200 dark:border-transparent border-l-4 border-l-primary/0 hover:border-l-primary">
                        <div className="relative aspect-video w-full bg-black">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-90"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC1v6BqGWHtjv7nsLBzA2ajJG2BXORtkFx69pltu23nxkKvpQbtCLGuVs7jz_7In20bFKQmReKm8tVONlHmJeOKCeK5tcHA_os0vs7hyrPFwpC92ILyDXibcu79QELJtYKbRbCiDj1JQetPD_A-LiGYykDbmB5e0ooGDdT8aniAHerHRIX7tBuaKstGKr6Y0VaqvuS-fZRREKVW1fqxFqUhO_If0ZUztwGN7l71z9QoDCmMu7gbFts4F6uGdjTl5O1u5_HKh0CxKpnn")',
                                }}
                            ></div>
                            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                            <Link to="/cameras/live/2" className="absolute inset-0" />
                        </div>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <span className="material-symbols-outlined">yard</span>
                                </div>
                                <div>
                                    <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">
                                        Giardino
                                    </h3>
                                    <p className="text-xs text-slate-500 dark:text-[#92a4c9]">
                                        Registrazione in corso...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </main>
        </div>
    )
}
