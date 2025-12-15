import React from 'react'

export const Input = React.forwardRef(({ label, icon, ...props }, ref) => {
    return (
        <label className="flex flex-col w-full gap-2">
            {label && (
                <p className="text-slate-700 dark:text-slate-300 text-base font-medium leading-normal">
                    {label}
                </p>
            )}
            <div className="relative flex w-full items-center">
                <input
                    ref={ref}
                    className={`form-input h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border border-slate-300 bg-white p-4 text-base font-normal leading-normal text-slate-900 placeholder:text-slate-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary ${icon ? 'pr-12' : ''
                        }`}
                    {...props}
                />
                {icon && (
                    <div className="absolute right-0 flex h-14 w-14 items-center justify-center text-slate-500 dark:text-slate-400">
                        {icon}
                    </div>
                )}
            </div>
        </label>
    )
})

Input.displayName = 'Input'
