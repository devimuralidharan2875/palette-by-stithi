import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST: add material to room
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { materialId, notes } = await request.json()
    const rm = await prisma.roomMaterial.upsert({
      where: { roomId_materialId: { roomId: params.id, materialId } },
      create: { roomId: params.id, materialId, notes },
      update: { notes },
    })
    return NextResponse.json({ data: rm }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add material to room' }, { status: 500 })
  }
}

// DELETE: remove material from room
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { materialId } = await request.json()
    await prisma.roomMaterial.delete({
      where: { roomId_materialId: { roomId: params.id, materialId } },
    })
    return NextResponse.json({ data: { success: true } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove material from room' }, { status: 500 })
  }
}
