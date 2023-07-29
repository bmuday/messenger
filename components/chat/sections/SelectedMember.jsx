import Image from "next/image";

export default function SelectedMember({ selectedMember }) {
  return (
    <div>
      <p>{selectedMember?.firstName}</p>
      <Image
        src={selectedMember?.profileImage || "/images/avatar-undefined.jpg"} // || avatar draftbit
        alt={selectedMember?.firstName}
        width={200}
        height={200}
      />
      <p>
        <span>{selectedMember?.age}</span>•<span>{selectedMember?.gender}</span>
      </p>
      <button>Envoyer un message</button>
      <button>Voir le profil</button>
      <button>Signaler</button>
      <button>Bloquer l'utilisateur</button>
    </div>
  );
}
