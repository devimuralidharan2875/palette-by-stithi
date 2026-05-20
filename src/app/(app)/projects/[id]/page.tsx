import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectDetail from './ProjectDetail'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      rooms: {
        include: { roomMaterials: { include: { material: true } } },
        orderBy: { createdAt: 'asc' },
      },
      boards: { include: { items: { include: { material: true }, orderBy: { position: 'asc' } } } },
    },
  })
  if (!project) notFound()
  return <ProjectDetail project={project} />
}
