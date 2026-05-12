import { prisma } from '@/lib/prisma'
import { Material } from '@/types'
import SearchScreen from './SearchScreen'

export default async function SearchPage() {
  const materials = await prisma.material.findMany({
    include: { favourites: true },
    orderBy: { name: 'asc' },
  })
  const withFav: Material[] = materials.map((m) => ({
    ...m,
    isFavourite: m.favourites.length > 0,
  })) as Material[]
  return <SearchScreen materials={withFav} />
}
