import { Link, useNavigate } from 'react-router-dom'

export default function AlarmScreen() {
    const navigate = useNavigate()

    return (
        <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#101622] text-white font-display">
            <div className="absolute inset-0 z-0 h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#101622]/90 to-[#101622] z-10"></div>
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat blur-sm scale-105 opacity-60"
                    style={{
                        backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9LaEcqAbuLPqdyTUhF6cm4Uoe4F2EdtAfJJTjg9jkSijEXL86lJzSzq8AXs87aKTV95rvMFRaEDFkuh62ZOUv0oQE-EidGVeAcZEl-1t_0JFXnj7sx--RF5fUS9U8L38JPxOgy1cZbJo_rSkDlzmUhuRhf9xlhugm0YWNNJsyC_W09n9WlrnrVOxMLQql8q9YvSYhKQBapwRDY2MAP41tZ6fbEwZCyzlWlaWQtbMpVl0rj7NLsmGCZWskJFHPwZWZZJvC-EztYrBP")'
                    }}
                ></div>
            </div>

            <div className="relative z-20 flex h-full flex-col justify-between p-6 pb-12">
                <div className="flex flex-col items-center pt-12 animate-pulse">
                    <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-5 py-2 backdrop-blur-md border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                        <span className="material-symbols-outlined text-red-500 text-[22px] font-variation-settings-filled">warning</span>
                        <span className="text-red-100 text-sm font-extrabold tracking-wider uppercase">ALLARME RILEVATO</span>
                    </div>
                    <h1 className="text-white text-[32px] font-extrabold tracking-tight text-center leading-tight mt-6 drop-shadow-lg">
                        Movimento Sospetto
                    </h1>
                    <p className="text-gray-300 text-lg font-medium text-center mt-1">
                        Telecamera Giardino • 20:42
                    </p>
                </div>

                <div className="flex flex-col items-center justify-center flex-1 py-4">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute h-[340px] w-[340px] rounded-full border border-primary/5 bg-primary/5 animate-ping opacity-20"></div>
                        <div className="absolute h-[260px] w-[260px] rounded-full border border-primary/20 bg-primary/10"></div>
                        <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full bg-[#111722] ring-4 ring-primary/40 shadow-[0_0_50px_-10px_rgba(19,91,236,0.6)] overflow-hidden">
                            <span className="material-symbols-outlined text-white text-[64px] drop-shadow-md">gpp_maybe</span>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-[22px] font-bold text-white leading-tight">Sistema di Allarme De Biasi</p>
                        <p className="text-[#92a4c9] text-base mt-1">Rilevamento Persona</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 w-full max-w-[480px] mx-auto">
                    <Link to="/cameras/live/1" className="group relative flex h-[72px] w-full items-center justify-between overflow-hidden rounded-full bg-primary p-1.5 shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] cursor-pointer">
                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white text-primary shadow-sm z-10">
                            <span className="material-symbols-outlined text-[32px] font-bold">videocam</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pl-10">
                            <span className="text-[18px] font-bold text-white tracking-wide">Entra nell'app</span>
                        </div>
                        <div className="flex items-center pr-4 opacity-40">
                            <span className="material-symbols-outlined text-white text-[24px]">chevron_right</span>
                            <span className="material-symbols-outlined text-white text-[24px] -ml-3">chevron_right</span>
                        </div>
                    </Link>

                    <button
                        onClick={() => navigate('/')}
                        className="group relative flex h-[64px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-[#2a303c]/80 backdrop-blur-md border border-white/5 hover:bg-[#2a303c] transition-colors active:scale-[0.98] cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-red-400">notifications_off</span>
                        <span className="text-base font-bold text-gray-200">Silenzia Allarme</span>
                    </button>
                </div>

            </div>
        </div>
    )
}
