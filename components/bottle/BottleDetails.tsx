type BottleDetailsProps = {
	bottle: any
	isAdmin?: boolean
}

export default function BottleDetails({ bottle, isAdmin = false }: BottleDetailsProps) {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			{isAdmin ? (
				<div className="absolute top-4 right-4">
					<a
						href={`/admin/bottles/${bottle.slug}/edit`}
						className="text-sm underline text-blue-600"
					>
						Edit
					</a>
				</div>
			): null}
			<main className="flex flex-col gap-[32px] row-start-2 items-center">
				<p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)] font-semibold">
				Name
				</p>
				<p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)]">
				Description
				</p>
			</main>
		</div>
	)
}
