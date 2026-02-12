
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    togglePassword?: () => void;
    showPassword?: boolean;
}


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, togglePassword, showPassword, className, ...props }, ref) => {
        return (
            <div className="w-full mb-4">
                {label && (
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <input
                        ref={ref}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-royal focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-slate-900 ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'
                            } ${className}`}
                        {...props}
                    />
                    {icon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" onClick={togglePassword}>
                            {icon}
                        </div>
                    )}
                </div>
                {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
