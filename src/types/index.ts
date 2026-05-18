export interface Material {
  id: string
  name: string
  brand: string
  location: string
  category: string
  subcategory: string
  color: string
  imageUrl?: string | null
  price: number
  unit: string
  available: boolean
  availNote?: string | null
  featured: boolean
  tags: string[]
  finish?: string | null
  size?: string | null
  materialComposition?: string | null
  priceRange?: string | null
  specs: Record<string, string>
  whereUse: WhereUse
  pros: string[]
  cons: string[]
  maintenance: MaintenanceItem[]
  installation: InstallationInfo
  suppliers: Supplier[]
  pairs: string[]
  createdAt: Date
  updatedAt: Date
  isFavourite?: boolean
}

export interface WhereUse {
  residential: { ok: string[]; no: string[] }
  commercial: { ok: string[]; no: string[] }
  institutional: { ok: string[]; no: string[] }
  exterior: { ok: string[]; no: string[] }
}

export interface MaintenanceItem {
  t: string
  d: string
}

export interface InstallationInfo {
  bed: string
  joint: string
  waste: string
  cure: string
  notes: string
}

export interface Supplier {
  name: string
  loc: string
  price: number
  note: string
}

export interface Project {
  id: string
  name: string
  location: string
  client: string
  status: string
  color: string
  rooms?: Room[]
  boards?: Board[]
  createdAt: Date
  updatedAt: Date
}

export interface Room {
  id: string
  name: string
  area?: number | null
  notes?: string | null
  projectId: string
  roomMaterials?: RoomMaterial[]
}

export interface RoomMaterial {
  id: string
  roomId: string
  materialId: string
  notes?: string | null
  material?: Material
}

export interface Board {
  id: string
  name: string
  notes?: string | null
  projectId?: string | null
  items?: BoardItem[]
  createdAt: Date
  updatedAt: Date
}

export interface BoardItem {
  id: string
  boardId: string
  materialId: string
  position: number
  notes?: string | null
  material?: Material
}

export interface PalMessage {
  role: 'user' | 'pal'
  content: string
  timestamp: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
}
