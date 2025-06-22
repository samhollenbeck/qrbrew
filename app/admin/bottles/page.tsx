export const dynamic = 'force-dynamic'
// export const revalidate = 300

import Link from 'next/link'
import { getAllBottles } from '@/lib/db/queries'

export default async function BottlesPage() {
  const bottles = await getAllBottles()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="row-start-2 w-full max-w-5xl overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse font-[family-name:var(--font-geist-mono)]">
          <thead className="border-b border-gray-300 text-xs uppercase tracking-widest text-gray-500">
            <tr>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">Recipe</th>
              <th className="px-4 py-2">ABV</th>
              <th className="px-4 py-2">Volume</th>
              <th className="px-4 py-2">Bottled On</th>
              <th className="px-4 py-2">QRCode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bottles.map((b) => (
              <tr key={b.id} className="tracking-[-.01em] text-center sm:text-left">
                <td className="px-4 py-2 text-blue-600 hover:underline text-left">
                  <Link href={`/admin/bottles/${b.slug}`}>#{b.slug}</Link>
                </td>
                <td className="px-4 py-2">{b.batchName}</td>
                <td className="px-4 py-2">{b.recipeName}</td>
                <td className="px-4 py-2">{b.expectedAbv}%</td>
                <td className="px-4 py-2">{Math.trunc(b.volumeInMl)} mL</td>
                <td className="px-4 py-2">
                  {new Date(b.bottledOn).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-2 text-blue-600 hover:underline text-left">
                  <a
                    href={`/admin/bottles/${b.slug}/qrcode`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}
