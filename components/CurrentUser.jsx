"use client";

import { useUserStore } from "@/stores";

export default function CurrentUser() {
  const { user } = useUserStore((state) => state);
  if (!user) return null;
  return (
    <div>
      <p>
        Hello <span>{user?.email}</span>
      </p>
    </div>
  );
}
