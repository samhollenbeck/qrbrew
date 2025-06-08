export default function BottlesPage() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		  <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
			<ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
			  <li className="mb-2 tracking-[-.01em]">
			  Scan your bottle and learn everything you&apos;d like to know.
			  </li>
			  <li className="tracking-[-.01em]">
				Enjoy responsibly and delightfully.
			  </li>
			</ol>
		  </main>
		</div>
	);
}
