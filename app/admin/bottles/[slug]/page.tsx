export const dynamic = 'force-dynamic'

import BottleDisplay from '@/components/bottle/bottle-display';
import { notFound } from 'next/navigation';

export default async function AdminBottlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const bottle = {slug: slug, sterilized: false, glassware_volume: 0, citricAcidInGrams: 0}

  if (!bottle) return notFound();

  return <BottleDisplay bottle={bottle} isAdmin={true}/>;
}
