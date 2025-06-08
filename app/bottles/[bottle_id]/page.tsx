import { notFound } from 'next/navigation';

async function getBottleFromDB(id: string) {
  const fakeBottleDB = [
    { id: '00000000', name: 'Bottle #0', description: 'This is a slightly carbonated and sweet bottle of cider.' },
    { id: '8asd5ga1', name: 'Bottle #1', description: 'This is a flat and sweet bottle of cider.' },
    { id: '43nciq3d', name: 'Bottle #2', description: 'This is a highly carbonated and dry bottle of cider.' },
  ];

  return fakeBottleDB.find((bottle) => bottle.id === id) || null;
}

export default async function BottlePage({
  params,
}: {
  params: Promise<{ bottle_id: string }>;
}) {
  const bottle_id = (await params).bottle_id;

  const bottle = await getBottleFromDB(bottle_id);

  if (!bottle) return notFound();

  return (
    <div>
      <h1>{bottle.name}</h1>
      <p>{bottle.description}</p>
    </div>
  );
}
