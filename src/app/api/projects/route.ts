import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        rooms: {
          include: { roomMaterials: { include: { material: true } } }
        },
        boards: true,
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ data: projects })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

const ProjectSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  client: z.string().min(1),
  status: z.enum(['active', 'completed', 'paused']).default('active'),
  color: z.string().default('#3D2E20'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = ProjectSchema.parse(body)
    const project = await prisma.project.create({ data })
    return NextResponse.json({ data: project }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
