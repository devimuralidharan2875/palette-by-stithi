import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const schema = z.object({
      name: z.string().min(1),
      area: z.number().optional(),
      notes: z.string().optional(),
      projectId: z.string().min(1),
    })
    const data = schema.parse(body)
    const room = await prisma.room.create({ data })
    return NextResponse.json({ data: room }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
