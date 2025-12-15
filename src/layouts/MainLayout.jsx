import { Outlet, useLocation } from 'react-router-dom'
import BottomNav from '../components/BottomNav'

export default function MainLayout() {
    const location = useLocation()
    // Determine if we show navigation. Some detail pages might hide it? 
    // For now, show on main tabs.
    const showNav = ['/', '/cameras', '/sensors', '/menu'].includes(location.pathname) || true // Always show for now

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white transition-colors duration-300">
            <main className="flex-1 flex flex-col relative overflow-x-hidden">
                <Outlet />
            </main>
            {showNav && <BottomNav />}
        </div>
    )
}
