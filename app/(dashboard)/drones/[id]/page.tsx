export default async function DronePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Drone Detail View</h1>
      <p>Viewing Drone ID: {id}</p>
    </div>
  );
}
