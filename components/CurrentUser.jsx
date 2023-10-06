"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CurrentUser({ user }) {
  const userId = user?.id;
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function fetchUsername() {
    const { data, error } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", userId)
      .single();
    if (error) {
      setError(error);
    } else if (data) {
      setUsername(data.username);
    }
  }

  useEffect(() => {
    if (user) fetchUsername();
  }, [user]);
  if (!user) return null;
  return (
    <div className="ml-5">
      {error && <div>{error.message}</div>}
      <p className="font-bold">{username}</p>
    </div>
  );
}
