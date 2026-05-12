'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Heart } from 'lucide-react'

interface Props { boards: any[] }

export default function BoardsScreen({ boards: initialBoards }: Props) {
  const [boards, setBoards] = useState(initialBoards)

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 px-4 pt-3.5 pb-3 flex items-center justify-between" style={{ background: 'var(--cr2)', borderBottom: '1px solid var(--brl)' }}>
        <div>
          <div className="font-serif text-xl font-semibold italic" style={{ color: 'var(--ink)' }}>Boards</div>
          <div className="text-[11px]" style={{ color: 'var(--mu)' }}>Material moodboards</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pt-3 pb-6">
        {boards.length === 0 ? (
          <div className="text-center py-16" style={{ color: 'var(--mu)' }}>
            <Heart size={40} strokeWidth={1.2} style={{ color: 'var(--brl)', margin: '0 auto 12px' }} />
            <div className="text-sm">No boards yet</div>
            <div className="text-xs mt-1">Boards are created from Projects</div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {boards.map((board) => {
              const swatches = board.items?.slice(0, 6) || []
              return (
                <div key={board.id} className="rounded-xl overflow-hidden" style={{ background: 'var(--cr2)', border: '0.5px solid var(--brl)' }}>
                  {/* Swatch grid */}
                  <div className="grid grid-cols-3 h-[100px]">
                    {swatches.length > 0 ? (
                      swatches.map((item: any, i: number) => (
                        <div
                          key={item.id}
                          className="relative"
                          style={{ background: item.material?.color || 'var(--cr3)' }}
                        >
                          <div className="chettinad-pattern" />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-3 flex items-center justify-center" style={{ background: 'var(--cr3)' }}>
                        <div className="text-[12px]" style={{ color: 'var(--mu)' }}>Empty board</div>
                      </div>
                    )}
                  </div>
                  <div className="px-3.5 py-3">
                    <div className="font-serif text-[16px] font-semibold mb-0.5" style={{ color: 'var(--ink)' }}>{board.name}</div>
                    {board.project && (
                      <div className="text-[11px] mb-1" style={{ color: 'var(--mu)' }}>
                        <Link href={`/projects/${board.project.id}`} style={{ color: 'var(--br)' }}>{board.project.name}</Link>
                      </div>
                    )}
                    {board.notes && <div className="text-[12px] italic" style={{ color: 'var(--mu)' }}>{board.notes}</div>}
                    <div className="mt-2 text-[11px]" style={{ color: 'var(--mu)' }}>
                      {board.items?.length || 0} materials
                    </div>
                    {/* Material names */}
                    {board.items?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {board.items.slice(0, 4).map((item: any) => (
                          <span
                            key={item.id}
                            className="text-[10px] px-2 py-0.5 rounded"
                            style={{ background: 'var(--cr)', border: '0.5px solid var(--brl)', color: 'var(--ink2)' }}
                          >
                            {item.material?.name}
                          </span>
                        ))}
                        {board.items.length > 4 && (
                          <span className="text-[10px] px-2 py-0.5 rounded" style={{ background: 'var(--cr)', color: 'var(--mu)' }}>
                            +{board.items.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
