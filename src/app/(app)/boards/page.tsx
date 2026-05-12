import { prisma } from '@/lib/prisma'
import BoardsScreen from './BoardsScreen'

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
