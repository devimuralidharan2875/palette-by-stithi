'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Sparkles, Heart } from 'lucide-react'
import MaterialCard from '@/components/materials/MaterialCard'
import { Material } from '@/types'
import { SECTIONS } from '@/lib/utils'

interface Props {
  materials: Material[]
  featured: Material[]
}

export default function HomeScreen({ materials, featured }: Props) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [activeSub, setActiveSub] = useState<string | null>(null)

  const filteredMats = materials.filter((m) => {
    if (activeSub) return m.category === activeSub
    if (activeSection) {
      const sec = SECTIONS.find((s) => s.id === activeSection)
      return sec?.subs.some((sub) => m.category === sub.id)
    }
    return true
  })

  const currentSection = SECTIONS.find((s) => s.id === activeSection)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top Bar */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-serif text-[22px] tracking-[4px] uppercase leading-none" style={{ color: 'var(--ink)' }}>
              Palette
            </div>
            <div className="font-serif text-[11px] italic tracking-[2px] mt-0.5" style={{ color: 'var(--br)' }}>
              by Stithi
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/search" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}>
              <Search size={18} strokeWidth={1.8} style={{ color: 'var(--ink2)' }} />
            </Link>
            <Link href="/boards" className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}>
              <Heart size={18} strokeWidth={1.8} style={{ color: 'var(--ink2)' }} />
            </Link>
          </div>
        </div>

        {/* Search pill */}
        <Link href="/search" className="flex items-center gap-2 rounded-full px-3.5 py-2 mb-2" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}>
          <Search size={16} strokeWidth={1.8} style={{ color: 'var(--mu)' }} />
          <span className="text-sm flex-1" style={{ color: 'var(--mu)' }}>Search materials, colours, plants…</span>
          <Link href="/pal" className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--brp)', border: '0.5px solid var(--brl)', color: 'var(--br)' }}>
            <Sparkles size={12} strokeWidth={1.8} style={{ color: 'var(--br)' }} />
            PAL
          </Link>
        </Link>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Section Buttons */}
        <div className="flex gap-2 px-4 py-3">
          {SECTIONS.map((sec) => (
            <button
              key={sec.id}
              onClick={() => {
                setActiveSection(activeSection === sec.id ? null : sec.id)
                setActiveSub(null)
              }}
              className="flex-1 py-2 px-1 rounded-xl text-[11px] font-medium transition-all"
              style={{
                border: '1px solid var(--brl)',
                background: activeSection === sec.id ? 'var(--ink2)' : 'var(--cr2)',
                color: activeSection === sec.id ? '#F7F2EA' : 'var(--mu)',
              }}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* Sub-categories */}
        {currentSection && (
          <div className="grid grid-cols-2 gap-2 px-4 pb-3">
            {currentSection.subs.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(activeSub === sub.id ? null : sub.id)}
                className="flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all"
                style={{
                  border: activeSub === sub.id ? '1px solid var(--br)' : '0.5px solid var(--brl)',
                  background: activeSub === sub.id ? 'var(--brp)' : 'var(--cr2)',
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[16px]"
                  style={{ background: activeSub === sub.id ? 'var(--br)' : 'var(--cr)', border: '0.5px solid var(--brl)' }}
                >
                  {sub.id.includes('floor') ? '⬡' : sub.id.includes('wall') ? '▪' : sub.id.includes('light') ? '◎' : sub.id.includes('plant') || sub.id.includes('land') ? '🌿' : '◈'}
                </div>
                <div>
                  <div className="text-[12px] font-medium" style={{ color: 'var(--ink)' }}>{sub.label}</div>
                  <div className="text-[10px] leading-tight" style={{ color: 'var(--mu)' }}>{sub.desc}</div>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="brass-rule" />

        {/* Featured carousel */}
        {!activeSection && (
          <>
            <div className="flex items-baseline justify-between px-4 pt-3.5 pb-2.5">
              <span className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>Featured</span>
              <Link href="/search" className="text-xs" style={{ color: 'var(--br)' }}>See all</Link>
            </div>
            <div className="flex gap-3 px-4 pb-4 overflow-x-auto no-scrollbar">
              {featured.map((m) => (
                <Link
                  key={m.id}
                  href={`/materials/${m.id}`}
                  className="w-[260px] flex-shrink-0 rounded-xl overflow-hidden"
                  style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}
                >
                  <div className="relative h-[140px]" style={{ background: m.color }}>
                    <div className="chettinad-pattern" />
                    <div className="absolute top-2.5 left-2.5 text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full" style={{ background: 'var(--br)' }}>Featured</div>
                    <div className="absolute bottom-2.5 left-3 font-serif text-[11px] italic" style={{ color: 'rgba(247,242,234,.75)' }}>{m.subcategory}</div>
                  </div>
                  <div className="p-3.5">
                    <div className="font-serif text-[17px] font-semibold mb-0.5" style={{ color: 'var(--ink)' }}>{m.name}</div>
                    <div className="text-[11px] mb-2" style={{ color: 'var(--mu)' }}>{m.brand} · {m.location}</div>
                    <div className="flex gap-1 flex-wrap mb-2.5">
                      {m.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)', color: 'var(--ink2)' }}>{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">₹{m.price.toLocaleString('en-IN')}<span className="text-[11px] font-normal ml-0.5" style={{ color: 'var(--mu)' }}>/{m.unit}</span></div>
                      <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--gn)' }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4A6741' }} />
                        {m.availNote}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Materials list */}
        <div className="flex items-baseline justify-between px-4 pt-2 pb-2.5">
          <span className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>
            {activeSub
              ? SECTIONS.flatMap((s) => s.subs).find((s) => s.id === activeSub)?.label
              : activeSection
                ? SECTIONS.find((s) => s.id === activeSection)?.label
                : 'All materials'}
          </span>
          <span className="text-xs" style={{ color: 'var(--mu)' }}>{filteredMats.length} items</span>
        </div>

        <div className="flex flex-col gap-2.5 px-4 pb-6">
          {filteredMats.length === 0 ? (
            <div className="text-center py-10 text-sm" style={{ color: 'var(--mu)' }}>
              No materials in this category yet.<br />
              <span className="text-xs">Add the first one using the + tab.</span>
            </div>
          ) : (
            filteredMats.map((m, i) => <MaterialCard key={m.id} material={m as Material} index={i} />)
          )}
        </div>
      </div>
    </div>
  )
}
