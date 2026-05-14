import { prisma } from '@/lib/prisma'
import ProjectsScreen from './ProjectsScreen'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    include: {
      rooms: { include: { roomMaterials: { include: { material: true } } } },
      boards: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  return <ProjectsScreen projects={projects} />
}
