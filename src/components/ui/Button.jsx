import React from 'react'

export const Button = React.forwardRef(({ children, variant = 'primary', className = '', ...props }, ref) => {
    const baseStyles = "flex h-14 w-full items-center justify-center rounded-xl text-base font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
        primary: "bg-primary text-white shadow-sm hover:bg-primary/90",
        secondary: "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700",
        danger: "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20",
        ghost: "text-primary hover:bg-primary/10",
    }

    return (
        <button
            ref={ref}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'
