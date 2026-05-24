'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Heart, Share2, X } from 'lucide-react'
import { Material, WhereUse, MaintenanceItem, Supplier } from '@/types'
import { getCategoryLabel } from '@/lib/utils'

const TABS = ['Specs', 'Where to use', 'Pros & Cons', 'Install', 'Suppliers']

interface Props { material: Material }

export default function MaterialDetail({ material: m }: Props) {
  const router = useRouter()
  const [tab, setTab] = useState('Specs')
  const [fav, setFav] = useState(m.isFavourite ?? false)
  const [showImageModal, setShowImageModal] = useState(false)

  async function toggleFav() {
    const res = await fetch('/api/favourites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ materialId: m.id }),
    })
    if (res.ok) {
      const data = await res.json()
      setFav(data.data.isFavourite)
    }
  }

  const whereUse = m.whereUse as WhereUse
  const maintenance = m.maintenance as MaintenanceItem[]
  const suppliers = m.suppliers as Supplier[]
  const installation = m.installation as Record<string, string>
  const specs = m.specs as Record<string, string>

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: 'var(--cr)' }}>
      {/* Hero swatch - clickable */}
      <div 
        className="relative h-[200px] flex-shrink-0 flex flex-col justify-between cursor-pointer"
        style={{ background: m.color }}
        onClick={() => m.imageUrl && setShowImageModal(true)}
      >
        <div className="chettinad-pattern" />
        <div className="relative flex items-center justify-between px-3.5 pt-4">
          <button onClick={() => router.back()} className="w-[34px] h-[34px] rounded-full flex items-center justify-center" style={{ background: 'rgba(247,242,234,.2)' }}>
            <ArrowLeft size={18} strokeWidth={1.8} color="#F7F2EA" />
          </button>
          <div className="flex gap-2">
            <button onClick={toggleFav} className="w-[34px] h-[34px] rounded-full flex items-center justify-center" style={{ background: 'rgba(247,242,234,.2)' }}>
              <Heart size={18} strokeWidth={1.8} style={{ color: '#F7F2EA', fill: fav ? '#F7F2EA' : 'none' }} />
            </button>
            <button className="w-[34px] h-[34px] rounded-full flex items-center justify-center" style={{ background: 'rgba(247,242,234,.2)' }}>
              <Share2 size={18} strokeWidth={1.8} color="#F7F2EA" />
            </button>
            {m.imageUrl && (
              <a 
                href={m.imageUrl} 
                download={`${m.name.replace(/\s+/g, '-')}.jpg`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-full flex items-center justify-center" 
                style={{ background: 'rgba(247,242,234,.2)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7F2EA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <div className="relative px-3.5 pb-3.5">
          <div className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: 'var(--brl)' }}>{getCategoryLabel(m.category)}</div>
          <div className="font-serif text-[24px] font-semibold leading-tight mb-0.5" style={{ color: '#F7F2EA' }}>{m.name}</div>
          <div className="text-[12px]" style={{ color: 'rgba(247,242,234,.65)' }}>{m.brand}</div>
          {m.imageUrl && (
            <div className="mt-2 text-[10px] uppercase tracking-wider opacity-75" style={{ color: '#F7F2EA' }}>
              Tap to view product image
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && m.imageUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28, 23, 16, 0.95)' }}
          onClick={() => setShowImageModal(false)}
        >
          <button 
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(247,242,234,.2)' }}
          >
            <X size={20} strokeWidth={1.8} color="#F7F2EA" />
          </button>
          <img 
            src={m.imageUrl}
            alt={m.name}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ border: '1px solid var(--brl)' }}
            onClick={(e) => e.stopPropagation()}
          />
          <a 
            href={m.imageUrl} 
            download={`${m.name.replace(/\s+/g, '-')}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
            style={{ background: 'var(--br)', color: '#fff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Image
          </a>
        </div>
      )}

      {/* Price row */}
      <div className="flex items-center justify-between px-4 py-3.5 flex-shrink-0" style={{ borderBottom: '0.5px solid var(--brl)' }}>
        <div>
          <div className="text-[10px] mb-0.5" style={{ color: 'var(--mu)' }}>Price</div>
          <div className="font-serif text-[22px] font-semibold" style={{ color: 'var(--ink)' }}>
            ₹{m.price.toLocaleString('en-IN')}
            <span className="text-[13px] font-normal ml-0.5" style={{ color: 'var(--mu)' }}>/{m.unit}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium" style={{ background: 'var(--gnb)', color: 'var(--gn)' }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#4A6741' }} />
          {m.availNote || (m.available ? 'Available' : 'Unavailable')}
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex overflow-x-auto no-scrollbar flex-shrink-0" style={{ background: 'var(--cr2)', borderBottom: '0.5px solid var(--brl)' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-shrink-0 px-3.5 py-3 text-xs font-medium transition-colors"
            style={{
              color: tab === t ? 'var(--br)' : 'var(--mu)',
              borderBottom: tab === t ? '2px solid var(--br)' : '2px solid transparent',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        {tab === 'Specs' && (
          <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(specs).map(([k, v]) => (
                <div key={k} className="rounded-xl p-3" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                  <div className="text-[10px] mb-1" style={{ color: 'var(--mu)' }}>{k}</div>
                  <div className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{v}</div>
                </div>
              ))}
            </div>
            {m.pairs?.length > 0 && (
              <>
                <div className="text-[11px] font-medium uppercase tracking-wider mb-2.5" style={{ color: 'var(--br)' }}>Pairs Well With</div>
                <div className="flex flex-wrap gap-1.5">
                  {m.pairs.map((p) => (
                    <span key={p} className="flex items-center gap-1 rounded-full px-3 py-1 text-xs" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink2)' }}>
                      ⟡ {p}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {tab === 'Where to use' && (
          <div className="grid grid-cols-2 gap-2.5">
            {Object.entries(whereUse || {}).map(([zone, { ok, no }]) => (
              <div key={zone} className="rounded-xl overflow-hidden" style={{ border: '0.5px solid var(--brl)' }}>
                <div className="px-2.5 py-2 text-[11px] font-medium capitalize" style={{ color: 'var(--ink2)', background: 'var(--cr2)' }}>{zone}</div>
                <div className="p-2.5">
                  {ok.map((item: string) => (
                    <div key={item} className="flex items-start gap-1.5 mb-1.5 text-[11px]" style={{ color: 'var(--mu)' }}>
                      <span style={{ color: '#4A6741' }}>✓</span> {item}
                    </div>
                  ))}
                  {no.map((item: string) => (
                    <div key={item} className="flex items-start gap-1.5 mb-1.5 text-[11px]" style={{ color: 'var(--rd)' }}>
                      <span>✗</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Pros & Cons' && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs font-medium mb-2.5" style={{ color: 'var(--gn)' }}>Pros</div>
              {m.pros?.map((p: string) => (
                <div key={p} className="flex items-start gap-1.5 mb-2 text-[12px]" style={{ color: 'var(--ink2)' }}>
                  <span className="mt-0.5" style={{ color: '#4A6741' }}>✓</span> {p}
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs font-medium mb-2.5" style={{ color: 'var(--rd)' }}>Watch out for</div>
              {m.cons?.map((c: string) => (
                <div key={c} className="flex items-start gap-1.5 mb-2 text-[12px]" style={{ color: 'var(--ink2)' }}>
                  <span className="mt-0.5" style={{ color: 'var(--rd)' }}>!</span> {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'Install' && (
          <div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(installation || {}).filter(([k]) => k !== 'notes').map(([k, v]) => (
                <div key={k} className="rounded-xl p-3" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                  <div className="text-[10px] mb-1 capitalize" style={{ color: 'var(--mu)' }}>{k}</div>
                  <div className="text-[13px] font-medium" style={{ color: 'var(--ink)' }}>{v || '—'}</div>
                </div>
              ))}
            </div>
            {installation?.notes && (
              <div className="rounded-xl p-3" style={{ background: 'var(--brp)', border: '0.5px solid var(--brl)' }}>
                <div className="text-[11px] font-medium mb-1.5" style={{ color: 'var(--br)' }}>Installation notes</div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--ink2)' }}>{installation.notes}</div>
              </div>
            )}
            {maintenance?.map((step: MaintenanceItem) => (
              <div key={step.t} className="mt-3 rounded-xl p-3" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                <div className="text-[11px] font-medium mb-1" style={{ color: 'var(--ink)' }}>{step.t}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: 'var(--mu)' }}>{step.d}</div>
              </div>
            ))}
          </div>
        )}

        {tab === 'Suppliers' && (
          <div className="flex flex-col gap-3">
            {suppliers?.map((s: Supplier) => (
              <div key={s.name} className="rounded-xl p-3.5" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                <div className="flex items-start justify-between mb-1">
                  <div className="text-[14px] font-medium" style={{ color: 'var(--ink)' }}>{s.name}</div>
                  <div className="font-serif text-[16px] font-semibold" style={{ color: 'var(--br)' }}>₹{s.price.toLocaleString('en-IN')}</div>
                </div>
                <div className="text-[12px] mb-1" style={{ color: 'var(--mu)' }}>📍 {s.loc}</div>
                <div className="text-[11px]" style={{ color: 'var(--ink2)' }}>{s.note}</div>
              </div>
            ))}
            {(!suppliers || suppliers.length === 0) && (
              <div className="text-center py-10 text-sm" style={{ color: 'var(--mu)' }}>No suppliers listed yet</div>
            )}
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  )
}
