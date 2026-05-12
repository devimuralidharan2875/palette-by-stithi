'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Layers } from 'lucide-react'
import Link from 'next/link'

interface Props { project: any }

export default function ProjectDetail({ project: initialProject }: Props) {
  const [project, setProject] = useState(initialProject)
  const [showAddRoom, setShowAddRoom] = useState(false)
  const [roomForm, setRoomForm] = useState({ name: '', area: '', notes: '' })
  const router = useRouter()

  async function addRoom() {
    if (!roomForm.name) return
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: roomForm.name, area: roomForm.area ? parseFloat(roomForm.area) : undefined, notes: roomForm.notes, projectId: project.id }),
    })
    if (res.ok) {
      const data = await res.json()
      setProject({ ...project, rooms: [...project.rooms, { ...data.data, roomMaterials: [] }] })
      setShowAddRoom(false)
      setRoomForm({ name: '', area: '', notes: '' })
    }
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => router.back()} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)' }}>
            <ArrowLeft size={16} strokeWidth={1.8} style={{ color: 'var(--ink2)' }} />
          </button>
          <div>
            <div className="font-serif text-xl font-semibold" style={{ color: 'var(--ink)' }}>{project.name}</div>
            <div className="text-[11px]" style={{ color: 'var(--mu)' }}>{project.client} · {project.location}</div>
          </div>
        </div>
        <button
          onClick={() => setShowAddRoom(!showAddRoom)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ background: 'var(--br)', color: '#fff' }}
        >
          <Plus size={14} strokeWidth={2} /> Add room
        </button>
      </div>

      {showAddRoom && (
        <div className="flex-shrink-0 px-4 py-3 border-b" style={{ background: 'var(--brp)', borderColor: 'var(--brl)' }}>
          <div className="font-serif text-base font-semibold mb-2.5">New Room</div>
          {[
            { key: 'name', label: 'Room name', placeholder: 'e.g. Master Bedroom' },
            { key: 'area', label: 'Area (sq ft)', placeholder: 'e.g. 250' },
            { key: 'notes', label: 'Notes', placeholder: 'Any notes…' },
          ].map(({ key, label, placeholder }) => (
            <div key={key} className="mb-2">
              <label className="text-[11px] font-medium block mb-1" style={{ color: 'var(--mu)' }}>{label}</label>
              <input
                value={roomForm[key as keyof typeof roomForm]}
                onChange={(e) => setRoomForm({ ...roomForm, [key]: e.target.value })}
                placeholder={placeholder}
                className="w-full rounded-xl px-3 py-2 text-sm outline-none"
                style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)', fontFamily: 'var(--font-sans)' }}
              />
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <button onClick={() => setShowAddRoom(false)} className="flex-1 py-2 rounded-xl text-xs" style={{ border: '0.5px solid var(--brl)', color: 'var(--mu)' }}>Cancel</button>
            <button onClick={addRoom} className="flex-1 py-2 rounded-xl text-xs font-medium text-white" style={{ background: 'var(--br)' }}>Create room</button>
          </div>
        </div>
      )}

      {/* Rooms */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-6">
        {project.rooms.length === 0 ? (
          <div className="text-center py-16 text-sm" style={{ color: 'var(--mu)' }}>No rooms yet. Add your first room above.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {project.rooms.map((room: any) => (
              <div key={room.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                <div className="flex items-center justify-between px-3.5 py-2.5" style={{ borderBottom: '0.5px solid var(--brl)' }}>
                  <div>
                    <div className="font-serif text-[15px] font-semibold" style={{ color: 'var(--ink)' }}>{room.name}</div>
                    {room.area && <div className="text-[11px]" style={{ color: 'var(--mu)' }}>{room.area} sq ft</div>}
                  </div>
                  <div className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--mu)' }}>
                    <Layers size={12} strokeWidth={1.8} /> {room.roomMaterials?.length || 0} materials
                  </div>
                </div>
                <div className="p-3">
                  {room.notes && <div className="text-[12px] mb-2.5 italic" style={{ color: 'var(--mu)' }}>{room.notes}</div>}
                  {room.roomMaterials?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {room.roomMaterials.map((rm: any) => (
                        <Link
                          key={rm.id}
                          href={`/materials/${rm.materialId}`}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px]"
                          style={{ background: rm.material?.color || 'var(--cr3)', color: 'var(--ink)' }}
                        >
                          <div className="w-2 h-2 rounded-full" style={{ background: rm.material?.color || 'var(--mu)' }} />
                          {rm.material?.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px]" style={{ color: 'var(--mu)' }}>No materials added yet</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
