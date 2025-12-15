import { Link, useNavigate } from 'react-router-dom'

export default function Schedule() {
    const navigate = useNavigate()

    return (
        <div className="relative flex h-full min-h-[calc(100vh-80px)] w-full flex-col pb-[20px]">
            <div className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-12 shrink-0 items-center justify-start text-slate-800 dark:text-white hover:opacity-70 transition-opacity"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-white -ml-12">
                    Programma Allarme
                </h2>
            </div>

            <div className="flex flex-1 flex-col p-4 pt-2 gap-4">
                {/* Schedule Item 1 */}
                <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-[#1C2534] p-4 min-h-[72px] justify-between shadow-sm border border-gray-100 dark:border-[#232f48]">
                    <div className="flex items-center gap-4">
                        <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#232f48] shrink-0 size-12">
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-slate-900 dark:text-white text-base font-bold leading-normal line-clamp-1">
                                22:30 - 07:00
                            </p>
                            <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal leading-normal line-clamp-2">
                                Lun, Mar, Mer, Gio, Ven
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-[#232f48] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary transition-colors">
                            <div
                                className="h-full w-[27px] rounded-full bg-white shadow-sm transition-transform"
                            />
                            <input type="checkbox" defaultChecked className="hidden peer" />
                        </label>
                    </div>
                </div>

                {/* Schedule Item 2 */}
                <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-[#1C2534] p-4 min-h-[72px] justify-between shadow-sm border border-gray-100 dark:border-[#232f48]">
                    <div className="flex items-center gap-4">
                        <div className="text-slate-800 dark:text-white flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#232f48] shrink-0 size-12">
                            <span className="material-symbols-outlined">schedule</span>
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-slate-900 dark:text-white text-base font-bold leading-normal line-clamp-1">
                                08:00 - 20:00
                            </p>
                            <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-normal leading-normal line-clamp-2">
                                Sab, Dom
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0">
                        <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-slate-200 dark:bg-[#232f48] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary transition-colors">
                            <div
                                className="h-full w-[27px] rounded-full bg-white shadow-sm transition-transform"
                            />
                            <input type="checkbox" className="hidden peer" />
                        </label>
                    </div>
                </div>
            </div>

            <div className="sticky bottom-[20px] z-40 w-full px-4">
                <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]">
                    <span className="material-symbols-outlined">add</span>
                    <span className="truncate">Aggiungi Programma</span>
                </button>
            </div>
        </div>
    )
}
