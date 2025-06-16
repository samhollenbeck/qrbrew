'use client'

import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

type QRPageProps = {
  slug: string
}

export default function QRPageClient({ slug }: QRPageProps) {
  const [downloaded, setDownloaded] = useState(false)

  useEffect(() => {
    const generateAndDownloadQR = async () => {
      try {
        const urlPrefix = 'https://qrbrew.com/bottles/' + slug
        const dataUrl = await QRCode.toDataURL(urlPrefix, {
          margin: 8,
          scale: 10,
          errorCorrectionLevel: 'low',
        })

        const link = document.createElement('a')
        link.href = dataUrl
        link.download = slug + '.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setDownloaded(true)
      } catch (error) {
        console.error('Failed to generate or download QR code:', error)
      }
    }

    generateAndDownloadQR()
  }, [slug])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)]">
          {downloaded
            ? 'QR Code downloaded successfully.'
            : 'Generating and downloading your QR Code...'}
        </p>
      </main>
    </div>
  )
}
