'use client'

import { useState, useMemo } from 'react'
import { Search, X, Sparkles, MapPin } from 'lucide-react'
import MaterialCard from '@/components/materials/MaterialCard'
import { Material } from '@/types'

const AI_HINTS: Record<string, string> = {
  'green tile': 'Found green tiles. Athangudi needs sealing for wet use — vitrified Emerald Gloss is easier to maintain in bathrooms.',
  'bathroom': 'Showing bathroom-safe materials. Wet zone badges = no special treatment needed.',
  'chettinad': 'Traditional Chettinad materials — Athangudi tiles, lime plaster, teak wood and brass.',
  'wood': 'Showing wood options. Teak is the gold standard for Chettinad homes.',
  'plant': 'Showing plants to bring life into spaces.',
}

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'int-flooring', label: 'Flooring' },
  { id: 'int-walls', label: 'Walls' },
  { id: 'int-furniture', label: 'Furniture' },
  { id: 'int-lighting', label: 'Lighting' },
  { id: 'land-shade', label: 'Trees' },
  { id: 'land-indoor', label: 'Plants' },
]

const LOCATIONS = [
  { id: 'all', label: 'All Cities' },
  { id: 'chennai', label: 'Chennai' },
  { id: 'bangalore', label: 'Bangalore' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'cochin', label: 'Cochin' },
]

const SUGGESTIONS = ['Athangudi tiles', 'Teak flooring', 'Brass fixtures', 'Lime plaster', 'Indoor plants', 'Shade trees']

interface Props { materials: Material[] }

export default function SearchScreen({ materials }: Props) {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [location, setLocation] = useState('all')
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  const hint = useMemo(() => {
    const ql = q.toLowerCase()
    for (const [k, v] of Object.entries(AI_HINTS)) {
      if (ql.includes(k)) return v
    }
    return q ? `Searching all materials for "${q}"` : null
  }, [q])

  // Autocomplete suggestions - triggers after 3 characters
  const autocompleteSuggestions = useMemo(() => {
    if (q.length < 3) return []
    
    const ql = q.toLowerCase()
    const suggestions = new Set<string>()
    
    materials.forEach(m => {
      // Match material names
      if (m.name.toLowerCase().includes(ql)) {
        suggestions.add(m.name)
      }
      // Match brands
      if (m.brand.toLowerCase().includes(ql)) {
        suggestions.add(m.brand)
      }
      // Match tags
      m.tags.forEach(tag => {
        if (tag.toLowerCase().includes(ql)) {
          suggestions.add(tag)
        }
      })
      // Match subcategory
      if (m.subcategory.toLowerCase().includes(ql)) {
        suggestions.add(m.subcategory)
      }
    })
    
    return Array.from(suggestions).slice(0, 8) // Max 8 suggestions
  }, [q, materials])

  const results = useMemo(() => {
    let r = materials
    
    // Filter by search query
    if (q) {
      const ql = q.toLowerCase()
      r = r.filter((m) =>
        m.name.toLowerCase().includes(ql) ||
        m.brand.toLowerCase().includes(ql) ||
        m.subcategory.toLowerCase().includes(ql) ||
        m.tags.some((t) => t.toLowerCase().includes(ql))
      )
    }
    
    // Filter by category
    if (filter !== 'all') r = r.filter((m) => m.category === filter)
    
    // Filter by location
    if (location !== 'all') {
      r = r.filter((m) => m.location.toLowerCase().includes(location.toLowerCase()))
    }
    
    return r
  }, [materials, q, filter, location])

  const handleSearchChange = (value: string) => {
    setQ(value)
    setShowAutocomplete(value.length >= 3)
  }

  const selectSuggestion = (suggestion: string) => {
    setQ(suggestion)
    setShowAutocomplete(false)
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search top bar */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        {/* Location filter */}
        <div className="flex items-center gap-2 mb-2.5">
          <MapPin size={16} strokeWidth={1.8} style={{ color: 'var(--br)' }} />
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1">
            {LOCATIONS.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setLocation(loc.id)}
                className="flex-shrink-0 px-3 py-1 rounded-full text-xs transition-all"
                style={{
                  border: '0.5px solid var(--brl)',
                  background: location === loc.id ? 'var(--br)' : 'var(--cr)',
                  color: location === loc.id ? '#fff' : 'var(--mu)',
                  fontWeight: location === loc.id ? 500 : 400,
                }}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Search bar with autocomplete */}
        <div className="relative mb-2.5">
          <div className="flex items-center gap-2 rounded-full px-3.5 py-2" style={{ background: 'var(--cr)', border: '1px solid var(--br)' }}>
            <Search size={16} strokeWidth={1.8} style={{ color: 'var(--br)' }} />
            <input
              autoFocus
              value={q}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => q.length >= 3 && setShowAutocomplete(true)}
              onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
              placeholder="Search materials, rooms, colours…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
            {q && (
              <button onClick={() => { setQ(''); setShowAutocomplete(false); }} className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--mu)' }}>
                <X size={11} strokeWidth={2} color="white" />
              </button>
            )}
          </div>
          
          {/* Autocomplete dropdown */}
          {showAutocomplete && autocompleteSuggestions.length > 0 && (
            <div 
              className="absolute top-full left-0 right-0 mt-1 rounded-xl overflow-hidden shadow-lg z-10"
              style={{ background: 'var(--cr)', border: '1px solid var(--brl)' }}
            >
              {autocompleteSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2"
                  style={{ 
                    borderBottom: idx < autocompleteSuggestions.length - 1 ? '0.5px solid var(--brl)' : 'none',
                    color: 'var(--ink2)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--brp)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Search size={14} strokeWidth={1.8} style={{ color: 'var(--mu)' }} />
                  <span dangerouslySetInnerHTML={{
                    __html: suggestion.replace(
                      new RegExp(`(${q})`, 'gi'),
                      '<strong style="color: var(--br)">$1</strong>'
                    )
                  }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {hint && (
          <div className="flex gap-2 items-start rounded-xl p-2.5 mb-2.5" style={{ background: 'var(--brp)', border: '0.5px solid var(--brl)' }}>
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--br)' }}>
              <Sparkles size={12} strokeWidth={1.8} color="white" />
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ink2)' }}>{hint}</p>
          </div>
        )}

        {/* Filter pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="flex-shrink-0 px-3 py-1 rounded-full text-xs transition-all"
              style={{
                border: '0.5px solid var(--brl)',
                background: filter === f.id ? 'var(--br)' : 'var(--cr)',
                color: filter === f.id ? '#fff' : 'var(--mu)',
                fontWeight: filter === f.id ? 500 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between px-4 py-2.5">
          <span className="text-xs" style={{ color: 'var(--mu)' }}>
            <strong style={{ color: 'var(--ink)' }}>{results.length}</strong>{' '}
            results{q ? ` for "${q}"` : ''}
            {location !== 'all' && ` in ${LOCATIONS.find(l => l.id === location)?.label}`}
          </span>
        </div>

        {!q && !filter && location === 'all' && (
          <div className="flex flex-wrap gap-2 px-4 pb-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => setQ(s)}
                className="px-3.5 py-1.5 rounded-full text-[13px]"
                style={{ border: '0.5px solid var(--brl)', background: 'var(--cr2)', color: 'var(--ink2)' }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {results.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--mu)' }}>
            No results for &quot;{q}&quot;
            {location !== 'all' && ` in ${LOCATIONS.find(l => l.id === location)?.label}`}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5 px-4 pb-6">
            {results.map((m, i) => (
              <MaterialCard key={m.id} material={m as Material} index={i} showRank />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
