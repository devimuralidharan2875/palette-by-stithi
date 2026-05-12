'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, MapPin, Users, ChevronRight } from 'lucide-react'
import { Project } from '@/types'

interface Props { projects: Project[] }

export default function ProjectsScreen({ projects: initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects)
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState({ name: '', location: '', client: '', status: 'active' })
  const router = useRouter()

  async function createProject() {
    if (!form.name || !form.location || !form.client) return
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const data = await res.json()
      setProjects([data.data, ...projects])
      setShowNew(false)
      setForm({ name: '', location: '', client: '', status: 'active' })
    }
  }

  const statusColors: Record<string, string> = {
    active: 'var(--gn)',
    completed: 'var(--br)',
    paused: 'var(--mu)',
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3 flex items-center justify-between" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <span className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>Projects</span>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--br)', color: '#fff' }}
        >
          <Plus size={14} strokeWidth={2} /> New project
        </button>
      </div>

      {/* New project form */}
      {showNew && (
        <div className="flex-shrink-0 px-4 py-3 border-b" style={{ background: 'var(--brp)', borderColor: 'var(--brl)' }}>
          <div className="font-serif text-base font-semibold mb-2.5" style={{ color: 'var(--ink)' }}>New Project</div>
          {[
            { key: 'name', label: 'Project name', placeholder: 'e.g. Chettinad Villa' },
            { key: 'location', label: 'Location', placeholder: 'e.g. Karaikudi' },
            { key: 'client', label: 'Client', placeholder: 'e.g. Suresh Rajan' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="mb-2.5">
              <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>{label}</label>
              <input
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)', color: 'var(--ink)', fontFamily: 'var(--font-sans)' }}
              />
            </div>
          ))}
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowNew(false)} className="flex-1 py-2 rounded-xl text-xs" style={{ border: '0.5px solid var(--brl)', color: 'var(--mu)' }}>Cancel</button>
            <button onClick={createProject} className="flex-1 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--br)' }}>Create</button>
          </div>
        </div>
      )}

      {/* Project list */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-6">
        {projects.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--mu)' }}>
            No projects yet.<br />Create your first project above.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((p) => {
              const rooms = (p as any).rooms || []
              const totalMaterials = rooms.reduce((acc: number, r: any) => acc + (r.roomMaterials?.length || 0), 0)
              return (
                <button
                  key={p.id}
                  onClick={() => router.push(`/projects/${p.id}`)}
                  className="w-full text-left rounded-xl overflow-hidden transition-transform active:scale-[0.98]"
                  style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}
                >
                  <div className="h-2" style={{ background: p.color }} />
                  <div className="p-3.5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-serif text-[17px] font-semibold" style={{ color: 'var(--ink)' }}>{p.name}</div>
                      <ChevronRight size={16} strokeWidth={1.8} style={{ color: 'var(--mu)' }} />
                    </div>
                    <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--mu)' }}>
                      <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={1.8} />{p.location}</span>
                      <span className="flex items-center gap-1"><Users size={11} strokeWidth={1.8} />{p.client}</span>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <span
                        className="text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--cr)', color: statusColors[p.status] || 'var(--mu)', border: '0.5px solid var(--brl)' }}
                      >
                        {p.status}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--mu)' }}>
                        {rooms.length} rooms · {totalMaterials} materials
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
