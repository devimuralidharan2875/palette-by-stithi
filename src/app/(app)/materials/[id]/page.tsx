import { prisma } from '@/lib/prisma'
import { Material } from '@/types'
import { notFound } from 'next/navigation'
import MaterialDetail from './MaterialDetail'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function MaterialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const material = await prisma.material.findUnique({
    where: { id },
    include: { favourites: true },
  })
  if (!material) notFound()
  const { favourites, ...rest } = material
  const m: Material = {
    ...rest,
    isFavourite: favourites.length > 0,
  } as unknown as Material
  return <MaterialDetail material={m} />
}
