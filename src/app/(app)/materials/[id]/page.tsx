import { prisma } from '@/lib/prisma'
import { Material } from '@/types'
import { notFound } from 'next/navigation'
import MaterialDetail from './MaterialDetail'

export default async function MaterialPage({ params }: { params: { id: string } }) {
  const material = await prisma.material.findUnique({
    where: { id: params.id },
    include: { favourites: true },
  })
  if (!material) notFound()
  const m: Material = { ...material, isFavourite: material.favourites.length > 0 } as Material
  return <MaterialDetail material={m} />
}
