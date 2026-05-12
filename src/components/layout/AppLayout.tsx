'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, LayoutGrid, StickyNote, Bot, Plus } from 'lucide-react'

const TABS = [
  { id: 'home', label: 'Home', icon: Home, href: '/home' },
  { id: 'search', label: 'Search', icon: Search, href: '/search' },
  { id: 'projects', label: 'Projects', icon: LayoutGrid, href: '/projects' },
  { id: 'boards', label: 'Boards', icon: StickyNote, href: '/boards' },
  { id: 'pal', label: 'PAL', icon: Bot, href: '/pal' },
  { id: 'add', label: 'Add', icon: Plus, href: '/add' },
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div id="app-shell">
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>

      {/* Tab Bar */}
      <nav
        className="flex flex-shrink-0 pb-safe z-50"
        style={{ background: 'var(--cr2)', borderTop: '1px solid var(--brl)' }}
      >
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href || pathname.startsWith(tab.href + '/')
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className="flex-1 flex flex-col items-center gap-0.5 py-2"
            >
              <Icon
                size={22}
                strokeWidth={1.8}
                style={{ color: isActive ? 'var(--br)' : 'var(--mu)' }}
              />
              <span
                className="text-[10px]"
                style={{
                  color: isActive ? 'var(--br)' : 'var(--mu)',
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {tab.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
