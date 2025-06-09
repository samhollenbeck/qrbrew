declare module 'qrcode' {
	const toDataURL: (
	  text: string,
	  options?: {
		errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high'
		margin?: number
		scale?: number
		width?: number
		color?: {
		  dark?: string
		  light?: string
		}
	  }
	) => Promise<string>

	export { toDataURL }
  }
