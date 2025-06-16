import { Bottle } from '@/types/bottle'

type BottleDetailsProps = {
  bottle: Bottle
  isAdmin?: boolean
}

export default function BottleDisplay({ bottle, isAdmin = false }: BottleDetailsProps) {
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
      ) : null}
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)] font-bold">
          {bottle.batchName} {bottle.recipeName}
        </p>
        <p className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)]">
          {bottle.descriptionFun} {bottle.description}
          <br></br>
          {bottle.message}
        </p>
        <div className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)] flex flex-col gap-2 mt-4">
          <p>
            <strong>ABV:</strong> {bottle.expectedAbv}%
          </p>
          <p>
            <strong>Standard Drinks:</strong> {bottle.standardDrinks} drinks
          </p>
          {/* <p>
            <strong>Gravity:</strong> OG {bottle.gravityOriginal} → FG {bottle.gravityFinal}
          </p> */}
          <p>
            <strong>Bottled:</strong> {new Date(bottle.bottledOn).toLocaleDateString()}
          </p>
          <p>
            <strong>Volume:</strong> {Math.trunc(bottle.volumeInMl)} mL
          </p>
          <p>
            <strong>Pasteurized:</strong> {bottle.isPasteurized ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Sweetness:</strong> {bottle.sweetness}
          </p>
          <p>
            <strong>Acidity:</strong> {bottle.acidity}
          </p>
          <p>
            <strong>Carbonation:</strong> {bottle.carbination}
          </p>
          <p>
            <strong>Carbs:</strong> {bottle.carbs} g
          </p>
        </div>
        {bottle.additions.length > 0 && (
          <div className="text-sm/6 text-center font-[family-name:var(--font-geist-mono)] flex flex-col gap-1 mt-6">
            <p className="font-semibold">Additions:</p>
            {bottle.additions.map((a) => (
              <p key={a.id}>
                {a.amountInGrams}g {a.name}
                {a.type === 'sugar' &&
                  ` (${a.isReal ? 'real' : 'artificial'}, ×${a.sweetnessFactor} sweetness)`}
              </p>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
