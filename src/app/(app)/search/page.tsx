import { prisma } from '@/lib/prisma'
import SearchScreen from './SearchScreen'

export default async function SearchPage() {
  const materials = await prisma.material.findMany({
    include: { favourites: true },
    orderBy: { name: 'asc' },
  })
  const withFav = materials.map((m) => ({ ...m, isFavourite: m.favourites.length > 0, favourites: undefined }))
  return <SearchScreen materials={withFav} />
}
