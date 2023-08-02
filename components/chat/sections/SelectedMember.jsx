import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function SelectedMember({
  selectedMember,
  setDisplayMembers,
  setDisplaySelectedMember,
}) {
  return (
    <div className="flex flex-col w-full bg-gray-50">
      <Button
        className="mx-10 my-2 bg-black"
        onClick={() => {
          setDisplaySelectedMember(false);
          setDisplayMembers(true);
        }}
      >
        <Undo2 />
        <span className="mx-2">Back</span>
      </Button>
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
      <button>Voir le profil</button>
      <button>Signaler</button>
      <button>Bloquer l&apos;utilisateur</button>
    </div>
  );
}
