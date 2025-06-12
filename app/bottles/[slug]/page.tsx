export const dynamic = 'force-dynamic'

import BottleDisplay from '@/components/bottle/bottle-display'
import { getBottleFromSlug } from '@/lib/db/queries'
import { notFound } from 'next/navigation'

export default async function BottlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const bottle = await getBottleFromSlug(slug)

  console.log(bottle)

  if (!bottle) return notFound()

  return <BottleDisplay bottle={bottle} />
}
