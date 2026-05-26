'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const WEEKDAY_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const mins = 9 * 60 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

const SATURDAY_SLOTS = Array.from({ length: 8 }, (_, i) => {
  const mins = 9 * 60 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]
const DAY_NAMES = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']

interface DateTimePickerProps {
  type: 'dental' | 'facial'
  dateValue: string
  timeValue: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
  dateError?: string
  timeError?: string
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return (new Date(year, month, 1).getDay() + 6) % 7
}

function formatDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export default function DateTimePicker({
  type,
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  dateError,
  timeError,
}: DateTimePickerProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  useEffect(() => {
    if (!dateValue) return
    setLoadingSlots(true)
    setBookedSlots([])
    fetch(`/api/appointments/availability?date=${dateValue}&type=${type}`)
      .then((r) => r.json())
      .then((data: { bookedSlots: string[] }) => setBookedSlots(data.bookedSlots ?? []))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoadingSlots(false))
  }, [dateValue, type])

  const isDateDisabled = useCallback(
    (year: number, month: number, day: number): boolean => {
      const date = new Date(year, month, day)
      const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      if (date < todayMidnight) return true
      if (date.getDay() === 0) return true
      return false
    },
    [today],
  )

  const daysInMonth = getDaysInMonth(viewYear, viewMonth)
  const firstDow = getFirstDayOfWeek(viewYear, viewMonth)
  const todayKey = formatDateKey(today.getFullYear(), today.getMonth(), today.getDate())
  const isSaturday = dateValue ? new Date(`${dateValue}T12:00:00`).getDay() === 6 : false
  const slots = isSaturday ? SATURDAY_SLOTS : WEEKDAY_SLOTS

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div>
        <label className="block text-[10px] tracking-[0.25em] uppercase font-semibold text-luxury-black/40 mb-3">
          Fecha deseada
        </label>
        <div className={cn(
          'rounded-2xl border p-5 bg-beige-light',
          dateError ? 'border-red-400' : 'border-beige',
        )}>
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-olive/10 transition-colors text-luxury-black/40 hover:text-olive text-lg leading-none"
            >
              ‹
            </button>
            <span className="font-display font-semibold text-luxury-black text-sm tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-olive/10 transition-colors text-luxury-black/40 hover:text-olive text-lg leading-none"
            >
              ›
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map((d) => (
              <div key={d} className="text-center text-[10px] tracking-widest uppercase text-luxury-black/30 font-semibold py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDow }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const key = formatDateKey(viewYear, viewMonth, day)
              const disabled = isDateDisabled(viewYear, viewMonth, day)
              const selected = key === dateValue
              const isToday = key === todayKey

              return (
                <button
                  key={key}
                  type="button"
                  disabled={disabled}
                  onClick={() => { onDateChange(key); onTimeChange('') }}
                  className={cn(
                    'h-9 w-full rounded-lg text-sm font-medium transition-all duration-200',
                    selected
                      ? 'bg-olive text-white shadow-md shadow-olive/20'
                      : disabled
                        ? 'text-luxury-black/20 cursor-not-allowed'
                        : 'text-luxury-black hover:bg-olive/10 hover:text-olive cursor-pointer',
                    isToday && !selected && 'ring-1 ring-gold/50',
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
        {dateError && <p className="text-[11px] text-red-500 mt-1.5">{dateError}</p>}
      </div>

      {/* Time slots */}
      <AnimatePresence>
        {dateValue && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
          >
            <label className="block text-[10px] tracking-[0.25em] uppercase font-semibold text-luxury-black/40 mb-3">
              Horario disponible
            </label>
            {loadingSlots ? (
              <div className="flex items-center gap-2 text-luxury-black/40 text-sm py-4">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
                Comprobando disponibilidad…
              </div>
            ) : (
              <div className={cn(
                'grid grid-cols-4 sm:grid-cols-5 gap-2',
                timeError ? 'p-3 rounded-xl border border-red-400' : '',
              )}>
                {slots.map((slot) => {
                  const booked = bookedSlots.includes(slot)
                  const selected = slot === timeValue
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={booked}
                      onClick={() => onTimeChange(slot)}
                      className={cn(
                        'py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200',
                        selected
                          ? 'bg-olive text-white shadow-md shadow-olive/20'
                          : booked
                            ? 'bg-luxury-black/5 text-luxury-black/25 line-through cursor-not-allowed'
                            : 'border border-beige bg-beige-light text-luxury-black hover:border-olive/40 hover:bg-olive/5 hover:text-olive cursor-pointer',
                      )}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            )}
            {timeError && <p className="text-[11px] text-red-500 mt-1.5">{timeError}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
