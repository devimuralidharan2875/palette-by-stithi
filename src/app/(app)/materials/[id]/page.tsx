import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import MaterialDetail from './MaterialDetail'

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const material = await prisma.material.findUnique({
    where: { id: params.id },
    include: { favourites: true },
  })
  if (!material) notFound()
  const m = { ...material, isFavourite: material.favourites.length > 0, favourites: undefined }
  return <MaterialDetail material={m} />
}
