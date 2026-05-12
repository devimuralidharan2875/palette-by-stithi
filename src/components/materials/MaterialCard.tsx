'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Material } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

interface Props {
  material: Material
  index?: number
  showRank?: boolean
}

export default function MaterialCard({ material: m, index = 0, showRank }: Props) {
  const [fav, setFav] = useState(m.isFavourite ?? false)

  async function toggleFav(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
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

  return (
    <div className="relative">
      {showRank && (
        <div
          className="absolute top-2.5 right-2.5 z-10 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[10px] font-medium text-white"
          style={{ background: 'var(--br)' }}
        >
          #{(index ?? 0) + 1}
        </div>
      )}
      <Link
        href={`/materials/${m.id}`}
        className="block rounded-xl overflow-hidden cursor-pointer transition-transform active:scale-[0.98]"
        style={{
          background: 'var(--cr2)',
          border: '0.5px solid var(--brl)',
          animationDelay: `${(index ?? 0) * 40}ms`,
        }}
      >
        {/* Swatch */}
        <div className="relative h-[110px] overflow-hidden" style={{ background: m.color }}>
          <div className="chettinad-pattern" />
          <div
            className="absolute top-2 left-2 text-[9px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(28,23,16,.55)', color: 'var(--brl)' }}
          >
            {m.subcategory}
          </div>
          <button
            onClick={toggleFav}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(247,242,234,.85)' }}
          >
            <Heart
              size={14}
              strokeWidth={1.8}
              style={{ color: fav ? '#C0392B' : 'var(--mu)', fill: fav ? '#C0392B' : 'none' }}
            />
          </button>
        </div>

        {/* Body */}
        <div className="px-3 py-2.5">
          <div className="font-serif text-[15px] font-semibold leading-tight mb-0.5" style={{ color: 'var(--ink)' }}>
            {m.name}
          </div>
          <div className="text-[11px] mb-2" style={{ color: 'var(--mu)' }}>{m.brand}</div>
          <div className="flex gap-1 flex-wrap mb-2">
            {m.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded"
                style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)', color: 'var(--ink2)' }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
              ₹{m.price.toLocaleString('en-IN')}
              <span className="text-[11px] font-normal ml-0.5" style={{ color: 'var(--mu)' }}>/{m.unit}</span>
            </div>
            <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--gn)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#4A6741' }} />
              {m.availNote || (m.available ? 'Available' : 'Unavailable')}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
