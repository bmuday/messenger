export default function RoomsBar({ publicRooms, setSelectedRoom }) {
  return (
    <div className="flex flex-col">
      {publicRooms.map((r) => (
        <button key={r.id} onClick={() => setSelectedRoom(r)}>
          {r.name}
        </button>
      ))}
    </div>
  );
}
