export const dynamic = 'force-dynamic'

import { getBottleFromSlug } from '@/lib/db/queries'
import BottleDisplay from '@/components/bottle/bottle-display'
import { notFound } from 'next/navigation'

export default async function AdminBottlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const bottle = await getBottleFromSlug(slug)

  console.log(bottle)

  if (!bottle) return notFound()

  return <BottleDisplay bottle={bottle} isAdmin={true} />
}
