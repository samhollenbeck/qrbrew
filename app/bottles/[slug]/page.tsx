export const dynamic = 'force-dynamic'

import BottleDetails from '@/components/bottle/BottleDetails';
import { notFound } from 'next/navigation';

export default async function BottlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const bottle = {slug: slug, sterilized: false, glassware_volume: 0, citricAcidInGrams: 0}

  if (!bottle) return notFound();

  return <BottleDetails bottle={bottle}/>;
}
