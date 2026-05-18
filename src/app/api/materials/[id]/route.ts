import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const material = await prisma.material.findUnique({
      where: { id: params.id },
      include: { favourites: true },
    })
    if (!material) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const { favourites, ...rest } = material
    return NextResponse.json({ data: { ...rest, isFavourite: favourites.length > 0 } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const material = await prisma.material.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json({ data: material })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.material.delete({ where: { id: params.id } })
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 })
  }
}
