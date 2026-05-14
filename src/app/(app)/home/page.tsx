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
    mats.map((m) => {
      const { favourites, ...rest } = m
      return {
        ...rest,
        isFavourite: favourites.length > 0,
      } as unknown as Material
    })

  return <HomeScreen materials={withFav(materials)} featured={withFav(featured)} />
}
