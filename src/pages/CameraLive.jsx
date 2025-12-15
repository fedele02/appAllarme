import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { cameras } from '../lib/api'

export default function CameraLive() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [camera, setCamera] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadCamera()
    }, [id])

    const loadCamera = async () => {
        try {
            const data = await cameras.getAll()
            const cameraList = data.cameras || data || []
            const found = cameraList.find(cam => cam.id === id)
            if (found) {
                setCamera(found)
            } else {
                alert('Telecamera non trovata')
                navigate('/cameras')
            }
        } catch (error) {
            console.error('Error loading camera:', error)
            alert('Errore nel caricamento della telecamera')
            navigate('/cameras')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background-dark">
                <span className="material-symbols-outlined text-6xl text-slate-600 animate-spin">
                    progress_activity
                </span>
            </div>
        )
    }

    if (!camera) {
        return null
    }

    // Get stream URL from backend proxy
    const streamUrl = cameras.getStreamUrl(camera.id)

    return (
        <div className="bg-background-dark font-display text-white overflow-hidden min-h-screen flex flex-col">
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
                        {camera.name}
                    </h2>
                    <div className="flex items-center gap-1.5 opacity-80">
                        <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-medium text-slate-300">Live via Backend</span>
                    </div>
                </div>
                <div className="flex w-12 items-center justify-end">
                    <button className="p-2 rounded-full hover:bg-white/5">
                        <span className="material-symbols-outlined text-[20px]">refresh</span>
                    </button>
                </div>
            </div>

            {/* Video Content */}
            <div className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden no-scrollbar">
                <div className="relative w-full aspect-[4/3] bg-black group shrink-0">
                    {/* MJPEG Stream via Backend Proxy */}
                    <img
                        src={streamUrl}
                        alt="Live Stream"
                        className="absolute inset-0 w-full h-full object-contain"
                        onError={(e) => {
                            console.error('Stream load error')
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23ef4444" font-family="sans-serif" font-size="14"%3EStream non disponibile%3C/text%3E%3C/svg%3E'
                        }}
                    />

                    {/* Overlay Info */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-white border border-white/10 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">lock</span> Secure Proxy
                            </span>
                            <span className="bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[11px] font-bold text-white border border-white/10 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">wifi</span> <span className="text-green-400">Server</span>
                            </span>
                        </div>
                    </div>

                    {/* Connection Info */}
                    <div className="absolute bottom-4 left-4">
                        <span className="text-[10px] text-white/70 font-mono bg-black/40 backdrop-blur-md px-2 py-1 rounded">
                            MJPEG via Backend
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex-1 flex flex-col bg-background-dark relative z-10 border-t border-white/5">
                    <div className="grid grid-cols-4 gap-3 px-4 py-6">
                        {[
                            { icon: 'refresh', label: 'Refresh', action: () => loadCamera() },
                            { icon: 'photo_camera', label: 'Snap' },
                            { icon: 'fullscreen', label: 'Full' },
                            { icon: 'settings', label: 'Settings' }
                        ].map((action, i) => (
                            <button
                                key={i}
                                className="flex flex-col items-center gap-2 group"
                                onClick={action.action}
                            >
                                <div className="size-14 rounded-2xl bg-[#1e2736] border border-white/5 flex items-center justify-center text-white group-active:bg-primary transition-all duration-200 shadow-lg">
                                    <span className="material-symbols-outlined text-[26px]">{action.icon}</span>
                                </div>
                                <span className="text-[11px] font-bold text-slate-400 tracking-wide uppercase">{action.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Info Box */}
                    <div className="px-6 pb-6">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                            <div className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
                                <div className="flex-1">
                                    <h4 className="font-bold text-green-300 mb-1 text-sm">Connessione Sicura</h4>
                                    <p className="text-xs text-green-200/70 leading-relaxed">
                                        Stai visualizzando lo stream tramite il server backend. Le credenziali
                                        della telecamera sono protette e non vengono mai esposte all'app.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
