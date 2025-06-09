'use client'

import { useEffect } from 'react'
import QRCode from 'qrcode'

export default function QRPage() {
	useEffect(() => {
	  const generateAndDownloadQR = async () => {
		const urlPrefix = 'https://brewery-app-phi.vercel.app/bottles/'
		const dataUrl = await QRCode.toDataURL(urlPrefix, { margin: 1, scale: 10, errorCorrectionLevel: 'low' })

		const link = document.createElement('a')
		link.href = dataUrl
		link.download = 'qr-code.png'
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	  }

	  generateAndDownloadQR()
	}, [])

	return (
	  <div className="flex items-center justify-center h-screen">
		<p>Generating your QR code and downloading...</p>
	  </div>
	)
  }
