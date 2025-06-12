export const dynamic = 'force-dynamic'

import BottleDisplay from '@/components/bottle/bottle-display'
import { notFound } from 'next/navigation'
import { getBottleCompleteData } from '@/lib/helpers'

export default async function AdminBottlePage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const bottle = await getBottleCompleteData(slug)
  console.log(bottle)

  if (!bottle) return notFound()

  return <BottleDisplay bottle={bottle} isAdmin={true} />
}
