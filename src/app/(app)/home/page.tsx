import { prisma } from '@/lib/prisma'
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

  const withFav = (mats: typeof materials) =>
    mats.map((m) => ({ ...m, isFavourite: m.favourites.length > 0, favourites: undefined }))

  return <HomeScreen materials={withFav(materials)} featured={withFav(featured)} />
}
