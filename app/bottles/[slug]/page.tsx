export const dynamic = 'force-dynamic'

import BottleDisplay from '@/components/bottle/bottle-display'
import { getBottleCompleteData } from '@/lib/helpers'
import { notFound } from 'next/navigation'

export default async function BottlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const bottle = await getBottleCompleteData(slug)
  console.log(bottle)

  if (!bottle) return notFound()

  return <BottleDisplay bottle={bottle} isAdmin={false} />
}
