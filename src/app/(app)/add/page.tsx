'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SECTIONS } from '@/lib/utils'

export default function AddPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    brand: '',
    location: '',
    category: 'int-flooring',
    subcategory: '',
    price: '',
    unit: 'sq ft',
    tags: '',
  })

  const allSubs = SECTIONS.flatMap(s => s.subs.map(sub => ({ ...sub, section: s.label })))

  async function createMaterial() {
    if (!form.name || !form.brand || !form.price) return
    
    const res = await fetch('/api/materials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      }),
    })

    if (res.ok) {
      const data = await res.json()
      router.push(`/materials/${data.data.id}`)
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <div className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>Add Material</div>
        <div className="text-[11px]" style={{ color: 'var(--mu)' }}>Add a new material to your library</div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4">
        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Material name *</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Athangudi Floor Tile"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Brand / Maker *</label>
            <input
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              placeholder="e.g. Athangudi Tile Works"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Location</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Chennai"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            >
              {allSubs.map(s => (
                <option key={s.id} value={s.id}>{s.section} — {s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Subcategory</label>
            <input
              value={form.subcategory}
              onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              placeholder="e.g. Handmade tile"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Price *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="95"
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
              />
            </div>
            <div>
              <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Unit</label>
              <select
                value={form.unit}
                onChange={(e) => setForm({ ...form, unit: e.target.value })}
                className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
                style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
              >
                <option value="sq ft">sq ft</option>
                <option value="unit">unit</option>
                <option value="litre">litre</option>
                <option value="kg">kg</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="Traditional, Handmade, Chettinad"
              className="w-full rounded-xl px-3 py-2.5 text-sm outline-none"
              style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
            />
          </div>

          <div className="pt-2">
            <button
              onClick={createMaterial}
              disabled={!form.name || !form.brand || !form.price}
              className="w-full py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: form.name && form.brand && form.price ? 'var(--br)' : 'var(--cr3)',
                color: form.name && form.brand && form.price ? '#fff' : 'var(--mu)',
              }}
            >
              Add material to library
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
