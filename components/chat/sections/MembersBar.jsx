export default function MembersBar({
  roomMembers,
  setDisplayMembers,
  setDisplaySelectedMember,
  setSelectedMember,
}) {
  return (
    <div className="flex flex-col">
      {roomMembers.map((m) => (
        <button
          key={m.id}
          onClick={() => {
            setDisplayMembers(false);
            setDisplaySelectedMember(true);
            setSelectedMember(m);
          }}
        >
          {m.firstName}
        </button>
      ))}
    </div>
  );
}
