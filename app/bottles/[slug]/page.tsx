export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation';

export default async function BottlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const bottle = {}

  if (!bottle) return notFound();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)] font-semibold">
          Name
        </p>
        <p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)]">
          Description
        </p>
      </main>
    </div>
  );
}
