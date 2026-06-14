import { cn } from '@/lib/utils'
import type { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export function Textarea({ label, error, className, id, rows = 5, ...props }: TextareaProps) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-[10px] tracking-[0.25em] uppercase font-semibold text-luxury-black/40"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={cn(
          'w-full px-4 py-3.5 rounded-xl border border-beige bg-beige-light resize-none',
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
