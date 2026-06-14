import { cn } from '@/lib/utils'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[10px] tracking-[0.25em] uppercase font-semibold text-luxury-black/40"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3.5 rounded-xl border border-beige bg-beige-light',
          'focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold',
          'transition-all duration-300 text-luxury-black placeholder:text-luxury-black/30 text-sm',
          error && 'border-red-400 focus:ring-red-200',
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  )
}
