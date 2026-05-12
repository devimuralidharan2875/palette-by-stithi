import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, unit: string) {
  return `₹${price.toLocaleString('en-IN')}/${unit}`
}

export const SECTIONS = [
  { id: 'interior', label: 'Interior', subs: [
    { id: 'int-flooring', label: 'Flooring', desc: 'Tiles, wood, stone, vinyl, carpet' },
    { id: 'int-walls', label: 'Walls', desc: 'Paint, plaster, cladding, wallpaper' },
    { id: 'int-ceiling', label: 'Ceiling', desc: 'Gypsum, false ceiling, wood beams' },
    { id: 'int-doors', label: 'Doors & Windows', desc: 'Frames, glass, shutters, hardware' },
    { id: 'int-lighting', label: 'Lighting', desc: 'Pendant, recessed, wall, floor lamps' },
    { id: 'int-furniture', label: 'Furniture', desc: 'Seating, tables, storage, beds' },
    { id: 'int-fabric', label: 'Fabric & Soft', desc: 'Curtains, rugs, upholstery, cushions' },
    { id: 'int-sanitary', label: 'Sanitary', desc: 'Fixtures, taps, fittings, sanitaryware' },
  ]},
  { id: 'exterior', label: 'Exterior', subs: [
    { id: 'ext-flooring', label: 'Flooring', desc: 'Pavers, stone, concrete, brick' },
    { id: 'ext-walls', label: 'Walls', desc: 'Paint, plaster, stone cladding' },
    { id: 'ext-roofing', label: 'Roofing', desc: 'Tiles, sheets, waterproofing' },
    { id: 'ext-doors', label: 'Doors & Gates', desc: 'Main door, gates, grills, fencing' },
    { id: 'ext-lighting', label: 'Lighting', desc: 'Outdoor, facade, security lights' },
  ]},
  { id: 'landscaping', label: 'Landscaping', subs: [
    { id: 'land-shade', label: 'Shade Trees', desc: 'Large canopy trees for shade' },
    { id: 'land-shrub', label: 'Shrub Trees', desc: 'Medium shrubs and bush-form trees' },
    { id: 'land-indoor', label: 'Indoor Plants', desc: 'Plants for interior spaces' },
    { id: 'land-fruit', label: 'Fruit Trees', desc: 'Edible fruiting trees and plants' },
    { id: 'land-groundcover', label: 'Ground Cover', desc: 'Low-growing spreading plants' },
    { id: 'land-hedge', label: 'Hedge', desc: 'Screening, boundary and clipping plants' },
    { id: 'land-flowering', label: 'Flowering Trees', desc: 'Ornamental flowering trees' },
    { id: 'land-ornamental', label: 'Ornamental', desc: 'Accent, sculptural feature plants' },
    { id: 'land-paving', label: 'Paving', desc: 'Pathway tiles, cobblestone, gravel' },
    { id: 'land-water', label: 'Water Features', desc: 'Fountains, ponds, drainage' },
    { id: 'land-soil', label: 'Soil & Substrate', desc: 'Topsoil, mulch, fertiliser' },
    { id: 'land-structures', label: 'Structures', desc: 'Pergola, boundary wall, fencing' },
  ]},
]

export function getCategoryLabel(categoryId: string): string {
  for (const section of SECTIONS) {
    const sub = section.subs.find(s => s.id === categoryId)
    if (sub) return `${section.label} › ${sub.label}`
  }
  return categoryId
}
