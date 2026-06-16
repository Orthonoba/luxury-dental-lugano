'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

type DocumentType = 'BUDGET' | 'REPORT' | 'XRAY' | 'PHOTO' | 'CONTRACT' | 'OTHER'

interface Doc {
  id: string
  type: DocumentType
  name: string
  description: string | null
  fileSize: number | null
  mimeType: string | null
  createdAt: string
}

function typeIcon(type: DocumentType) {
  if (type === 'XRAY') return '🩻'
  if (type === 'PHOTO') return '📷'
  if (type === 'BUDGET') return '💼'
  if (type === 'REPORT') return '📋'
  if (type === 'CONTRACT') return '📄'
  return '📁'
}

function typeColor(type: DocumentType) {
  const map: Record<DocumentType, string> = {
    BUDGET: 'text-gold bg-gold/10 border-gold/20',
    REPORT: 'text-olive-light bg-olive/10 border-olive/20',
    XRAY: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    PHOTO: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    CONTRACT: 'text-white/50 bg-white/5 border-white/10',
    OTHER: 'text-white/30 bg-white/4 border-white/8',
  }
  return map[type]
}

function formatFileSize(bytes: number | null) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export default function DocumentsPage() {
  const t = useTranslations('portal.documents')
  const [docs, setDocs] = useState<Doc[]>([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState<string | null>(null)
  const [filter, setFilter] = useState<DocumentType | 'ALL'>('ALL')

  useEffect(() => {
    fetch('/api/portal/documents')
      .then((r) => r.json())
      .then(setDocs)
      .finally(() => setLoading(false))
  }, [])

  async function handleDownload(doc: Doc) {
    setDownloading(doc.id)
    const res = await fetch(`/api/portal/documents/${doc.id}/download`)
    if (res.ok) {
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = doc.name
      a.click()
      URL.revokeObjectURL(url)
    }
    setDownloading(null)
  }

  const filtered = filter === 'ALL' ? docs : docs.filter((d) => d.type === filter)
  const types = ['ALL', ...Array.from(new Set(docs.map((d) => d.type)))] as (DocumentType | 'ALL')[]

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-white/4 border border-white/8 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{t('section')}</p>
        <h1 className="font-display text-white text-2xl font-semibold mt-1">{t('title')}</h1>
      </div>

      {docs.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4 text-xl">
            📁
          </div>
          <p className="text-white/30 text-sm">{t('empty')}</p>
        </div>
      ) : (
        <>
          {/* Type filter */}
          {types.length > 2 && (
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-full border transition-colors ${
                    filter === type
                      ? 'bg-white/10 border-white/20 text-white/70'
                      : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
                  }`}
                >
                  {type === 'ALL' ? t('filterAll') : t(`type_${type}` as 'type_BUDGET')}
                </button>
              ))}
            </div>
          )}

          {/* Document list */}
          <div className="space-y-2">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-center gap-4 hover:bg-white/6 hover:border-white/12 transition-colors"
              >
                <div className="text-2xl shrink-0">{typeIcon(doc.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/75 text-sm font-medium truncate">{doc.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className={`text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${typeColor(doc.type)}`}>
                      {t(`type_${doc.type}` as 'type_BUDGET')}
                    </span>
                    {doc.fileSize && (
                      <span className="text-white/25 text-xs">{formatFileSize(doc.fileSize)}</span>
                    )}
                    <span className="text-white/20 text-xs">
                      {new Date(doc.createdAt).toLocaleDateString('it-IT')}
                    </span>
                  </div>
                  {doc.description && (
                    <p className="text-white/30 text-xs mt-1 truncate">{doc.description}</p>
                  )}
                </div>
                <button
                  onClick={() => handleDownload(doc)}
                  disabled={downloading === doc.id}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-[10px] tracking-[0.1em] uppercase hover:border-gold/30 hover:text-gold/70 disabled:opacity-50 transition-colors"
                  aria-label={`Download ${doc.name}`}
                >
                  {downloading === doc.id ? (
                    <span className="animate-pulse">···</span>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M5.5 1v6M3 5l2.5 2.5L8 5M1.5 9.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t('download')}
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
