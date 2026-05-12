import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const section = searchParams.get('section')
    const featured = searchParams.get('featured')
    const q = searchParams.get('q')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    const where: Record<string, unknown> = {}

    if (category) where.category = category
    if (section) where.category = { startsWith: section }
    if (featured === 'true') where.featured = true
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { brand: { contains: q, mode: 'insensitive' } },
        { subcategory: { contains: q, mode: 'insensitive' } },
        { tags: { hasSome: [q] } },
      ]
    }

    const materials = await prisma.material.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
      take: limit,
      include: { favourites: true },
    })

    const withFav = materials.map(m => ({
      ...m,
      isFavourite: m.favourites.length > 0,
      favourites: undefined,
    }))

    return NextResponse.json({ data: withFav })
  } catch (error) {
    console.error('[GET /api/materials]', error)
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 })
  }
}

const CreateSchema = z.object({
  name: z.string().min(1),
  brand: z.string().min(1),
  location: z.string().min(1),
  category: z.string().min(1),
  subcategory: z.string().min(1),
  color: z.string().default('#B8922A'),
  price: z.number().positive(),
  unit: z.string().min(1),
  available: z.boolean().default(true),
  availNote: z.string().optional(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  finish: z.string().optional(),
  size: z.string().optional(),
  materialComposition: z.string().optional(),
  priceRange: z.string().optional(),
  specs: z.record(z.string()).default({}),
  whereUse: z.any().default({}),
  pros: z.array(z.string()).default([]),
  cons: z.array(z.string()).default([]),
  maintenance: z.any().default([]),
  installation: z.any().default({}),
  suppliers: z.any().default([]),
  pairs: z.array(z.string()).default([]),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = CreateSchema.parse(body)
    const material = await prisma.material.create({ data })
    return NextResponse.json({ data: material }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/materials]', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 })
  }
}
