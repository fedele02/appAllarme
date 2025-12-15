import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { cameras } from '../lib/api'

export default function Cameras() {
    const [cameraList, setCameraList] = useState([])
    const [showAddForm, setShowAddForm] = useState(false)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: '',
        ip: '',
        username: '',
        password: '',
        port: '80'
    })

    useEffect(() => {
        loadCameras()
    }, [])

    const loadCameras = async () => {
        try {
            setLoading(true)
            const data = await cameras.getAll()
            setCameraList(data.cameras || data || [])
        } catch (error) {
            console.error('Error loading cameras:', error)
            alert('Errore nel caricamento delle telecamere')
        } finally {
            setLoading(false)
        }
    }

    const handleAddCamera = async (e) => {
        e.preventDefault()
        try {
            await cameras.add(formData)
            setFormData({ name: '', ip: '', username: '', password: '', port: '80' })
            setShowAddForm(false)
            loadCameras() // Reload list
        } catch (error) {
            console.error('Error adding camera:', error)
            alert('Errore nell\'aggiunta della telecamera')
        }
    }

    const handleDeleteCamera = async (id) => {
        if (confirm('Sei sicuro di voler eliminare questa telecamera?')) {
            try {
                await cameras.delete(id)
                loadCameras() // Reload list
            } catch (error) {
                console.error('Error deleting camera:', error)
                alert('Errore nell\'eliminazione della telecamera')
            }
        }
    }

    return (
        <div className="relative flex min-h-screen w-full flex-col pb-24 overflow-x-hidden">
            {/* Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-5 py-4 backdrop-blur-md border-b border-gray-200 dark:border-border-dark/30">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">videocam</span>
                    Telecamere
                </h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90 active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            <main className="flex flex-col gap-6 p-5">
                {/* Add Camera Form Modal */}
                {showAddForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white dark:bg-[#192233] rounded-2xl p-6 w-full max-w-md shadow-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Aggiungi Telecamera
                                </h3>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <form onSubmit={handleAddCamera} className="flex flex-col gap-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                                        Nome Telecamera
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="es. Ingresso Principale"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                                        Indirizzo IP Locale
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ip}
                                        onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                                        placeholder="es. 192.168.1.100"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            placeholder="admin"
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block mb-1">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    >
                                        Annulla
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                                    >
                                        Aggiungi
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <span className="material-symbols-outlined text-6xl text-primary animate-spin">
                            progress_activity
                        </span>
                        <p className="mt-4 text-slate-500">Caricamento telecamere...</p>
                    </div>
                )}

                {/* Cameras List */}
                {!loading && cameraList.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">
                            videocam_off
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                            Nessuna Telecamera
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                            Premi il pulsante + per aggiungere la tua prima Reolink
                        </p>
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">add</span>
                            Aggiungi Telecamera
                        </button>
                    </div>
                )}

                {!loading && cameraList.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between px-1">
                            <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500 dark:text-[#92a4c9]">
                                Le tue telecamere ({cameraList.length})
                            </h3>
                        </div>

                        {cameraList.map((camera) => (
                            <article
                                key={camera.id}
                                className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#192233] shadow-sm transition hover:shadow-md border border-gray-200 dark:border-transparent"
                            >
                                <div className="relative aspect-video w-full bg-black">
                                    <img
                                        src={cameras.getSnapshotUrl(camera.id)}
                                        alt={camera.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23374151"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="16"%3ECaricamento...%3C/text%3E%3C/svg%3E'
                                        }}
                                    />
                                    <div className="absolute left-3 top-3">
                                        <span className="flex items-center gap-1 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                            BACKEND PROXY
                                        </span>
                                    </div>
                                    <Link to={`/cameras/live/${camera.id}`} className="absolute inset-0" />
                                </div>
                                <div className="flex items-center justify-between p-4">
                                    <div>
                                        <h3 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">
                                            {camera.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-[#92a4c9] mt-0.5">
                                            Reolink • Via Server
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleDeleteCamera(camera.id)}
                                        className="rounded-full bg-red-50 dark:bg-red-500/10 p-2 text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-500/20"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            delete
                                        </span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}
