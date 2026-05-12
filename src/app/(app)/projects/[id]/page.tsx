import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProjectDetail from './ProjectDetail'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
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
