import { useNavigate } from 'react-router-dom'

export default function CameraLive() {
    const navigate = useNavigate()

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden min-h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center bg-background-dark p-4 justify-between sticky top-0 z-30 shadow-md border-b border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="text-white flex size-12 shrink-0 items-center justify-start hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                        Front Door Camera
                    </h2>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-300">Live Feed</span>
                    </div>
                </div>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex items-center justify-center text-white hover:text-primary transition-colors rounded-full size-10 active:bg-white/5">
                        <span className="material-symbols-outlined text-[24px]">settings</span>
                    </button>
                </div>
            </div>

            {/* Video Content */}
            <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden no-scrollbar">
                <div className="relative w-full aspect-[4/3] bg-black group shrink-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPiSUY26YpUWKcMgMcsdFMiTeZWXsskXGDiG3kDgsN5RM1mhFMJYdNY3WeYA65W_RR9H_3_IaHl8zcLN7pCvy_40LctPhpt0jL8FHT6Ei9kqb4e0y3Gop-NqJ8I-xa5qJSvTZ7Za5XxWX5ARfX1Q_qIxmUqOrsBbmElV77AYlW5Hy9eleB3TJC3mxjSt947pq9t3-EYVbRExgvrZtN1V9kQ_Qj06DGCkScMHtS_w6kThpnY9egseMS0y35exxsZ4tAMJVPgKPcXh1u")'
                        }}
                    ></div>
                    {/* Overlays */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-white border border-white/10 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">hd</span> Clear
                            </span>
                            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-white border border-white/10 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">wifi</span> <span className="text-green-400">Good</span>
                            </span>
                        </div>
                        <p className="text-[10px] text-white/70 font-mono">125 KB/s</p>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex-1 flex flex-col bg-background-dark relative z-10 border-t border-white/5">
                    <div className="grid grid-cols-4 gap-3 px-4 py-6">
                        {[
                            { icon: 'mic', label: 'Talk' },
                            { icon: 'fiber_manual_record', label: 'Record', color: 'red-600' },
                            { icon: 'photo_camera', label: 'Snap' },
                            { icon: 'history', label: 'Playback' }
                        ].map((action, i) => (
                            <button key={i} className="flex flex-col items-center gap-2 group">
                                <div className="size-14 rounded-2xl bg-[#1e2736] border border-white/5 flex items-center justify-center text-white group-active:bg-primary transition-all duration-200 shadow-lg">
                                    <span className="material-symbols-outlined text-[26px]">{action.icon}</span>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">{action.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* PTZ Controller */}
                    <div className="flex-1 flex flex-col px-6 pb-6 items-center justify-start gap-6">
                        <div className="w-full flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[20px]">open_with</span>
                                <h3 className="text-sm font-bold text-white tracking-wider">PTZ Controller</h3>
                            </div>
                        </div>

                        <div className="relative size-52">
                            <div className="absolute inset-0 rounded-full border border-white/5 bg-gradient-to-b from-[#1e2736] to-background-dark shadow-inner"></div>
                            <div className="absolute inset-0 m-auto size-20 rounded-full bg-[#161d2b] border border-white/5 shadow-lg flex items-center justify-center z-10">
                                <span className="material-symbols-outlined text-primary/50 text-[32px]">videocam</span>
                            </div>
                            {/* D-Pad */}
                            <div className="absolute inset-0 grid grid-rows-3 grid-cols-3 p-2">
                                <div className="col-start-2 row-start-1 flex justify-center"><button className="size-12 rounded-full text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[32px]">keyboard_arrow_up</span></button></div>
                                <div className="col-start-1 row-start-2 flex items-center justify-center"><button className="size-12 rounded-full text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[32px]">keyboard_arrow_left</span></button></div>
                                <div className="col-start-3 row-start-2 flex items-center justify-center"><button className="size-12 rounded-full text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[32px]">keyboard_arrow_right</span></button></div>
                                <div className="col-start-2 row-start-3 flex justify-center"><button className="size-12 rounded-full text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[32px]">keyboard_arrow_down</span></button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
