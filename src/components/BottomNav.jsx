import { NavLink } from 'react-router-dom'

export default function BottomNav() {
    const navItems = [
        { name: 'Home', path: '/', icon: 'home' },
        { name: 'Sensori', path: '/sensors', icon: 'sensors' },
        { name: 'Telecamere', path: '/cameras', icon: 'videocam' },
        { name: 'Menu', path: '/menu', icon: 'menu' },
    ]

    return (
        <div className="sticky bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-background-light/95 dark:bg-[#192233]/95 backdrop-blur-md dark:border-[#232f48] pb-safe pt-2">
            <div className="flex justify-around items-center h-16 w-full max-w-md mx-auto px-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center w-full h-full transition-colors group ${isActive
                                ? 'text-primary'
                                : 'text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <span
                                    className={`material-symbols-outlined text-[26px] transition-transform group-active:scale-90 ${isActive ? 'filled' : ''
                                        }`}
                                    style={{
                                        fontVariationSettings: isActive
                                            ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                                            : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                    }}
                                >
                                    {item.icon}
                                </span>
                                <span className="text-[10px] font-medium leading-none mt-1">
                                    {item.name}
                                </span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
