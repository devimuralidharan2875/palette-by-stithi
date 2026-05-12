import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const favs = await prisma.favourite.findMany({
      include: { material: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: favs.map(f => f.material) })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch favourites' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { materialId } = await request.json()
    const existing = await prisma.favourite.findUnique({ where: { materialId } })
    if (existing) {
      await prisma.favourite.delete({ where: { materialId } })
      return NextResponse.json({ data: { isFavourite: false } })
    }
    await prisma.favourite.create({ data: { materialId } })
    return NextResponse.json({ data: { isFavourite: true } }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle favourite' }, { status: 500 })
  }
}
