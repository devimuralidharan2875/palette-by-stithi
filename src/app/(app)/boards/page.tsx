import { prisma } from '@/lib/prisma'
import BoardsScreen from './BoardsScreen'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BoardsPage() {
  const boards = await prisma.board.findMany({
    include: {
      items: { include: { material: true }, orderBy: { position: 'asc' } },
      project: true,
    },
    orderBy: { createdAt: 'desc' },
  })
  return <BoardsScreen boards={boards} />
}
