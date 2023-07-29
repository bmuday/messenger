export default function MainBar({ selectedRoom }) {
  const { name, nbUsers, image } = selectedRoom;
  return (
    <main>
      <p>{name}</p>
    </main>
  );
}
