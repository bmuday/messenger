export default function MainBar({ selectedRoom }) {
  const { name, nbUsers, image } = selectedRoom;
  return (
    <main className="flex items-center justify-center w-full h-full">
      <p>{name}</p>
    </main>
  );
}
