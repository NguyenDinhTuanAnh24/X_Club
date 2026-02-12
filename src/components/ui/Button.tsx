
import React from 'react';


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'brand';
    isLoading?: boolean;
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg'; // Added size optional
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', size = 'md', isLoading, fullWidth, className, disabled, ...props }, ref) => {
        // Size mapping
        const sizes = {
            sm: "h-8 px-3 text-xs",
            md: "h-12 px-4 py-2.5 text-sm",
            lg: "h-14 px-6 text-base"
        };

        const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

        const variants = {
            primary: "bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-900", // Dark Navy
            secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-400",
            danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
            ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
            outline: "bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50",
            brand: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm focus:ring-blue-500", // Project Blue
        };

        const widthClass = fullWidth ? "w-full" : "";

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`}
                disabled={isLoading || disabled}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                    </div>
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';
