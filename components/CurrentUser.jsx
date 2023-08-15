"use client";

import { getCurrentUser } from "@/lib/utils";
import { useUserStore } from "@/stores";
import { useState, useEffect } from "react";

export default function CurrentUser() {
  const user = useUserStore((state) => state.user);
  const [error, setError] = useState(null);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  useEffect(() => {
    try {
      getCurrentUser(access_token);
    } catch (error) {
      setError(error);
    }
  }, []);

  // console.log("user", user);
  // console.log("userSession", userSession);

  if (user)
    return (
      <div>
        Hello {user.first_name} {user.last_name}
      </div>
    );
  // if (error) return <div>{error.errors[0].message}</div>;
  if (error) console.log("error jsx", error);
}
