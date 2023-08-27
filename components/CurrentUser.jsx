"use client";
import { useUserStore } from "@/stores";

export default function CurrentUser() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;
  return (
    <div>
      Hello {user.first_name} {user.last_name}
    </div>
  );
}
