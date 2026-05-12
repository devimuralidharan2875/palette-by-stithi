import { prisma } from '@/lib/prisma'
import { Material } from '@/types'
import HomeScreen from './HomeScreen'

export default async function HomePage() {
  const [materials, featured] = await Promise.all([
    prisma.material.findMany({
      orderBy: { createdAt: 'desc' },
      include: { favourites: true },
    }),
    prisma.material.findMany({
      where: { featured: true },
      include: { favourites: true },
      take: 6,
    }),
  ])

  const withFav = (mats: typeof materials): Material[] =>
    mats.map((m) => ({
      ...m,
      isFavourite: m.favourites.length > 0,
    })) as Material[]

  return <HomeScreen materials={withFav(materials)} featured={withFav(featured)} />
}
