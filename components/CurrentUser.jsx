"use client";
import useFetch from "@/hooks/useFetch";
import { useUserStore } from "@/stores";
import { useState, useEffect } from "react";

export default function CurrentUser() {
  const user = useUserStore((state) => state.user);
  const userSession = useUserStore((state) => state.userSession);
  const [error, setError] = useState(null);
  console.log("user", user);
  console.log("userSession", userSession);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  const getCurrentUser = async () => {
    const endpoint = "/users/me";
    const URL = process.env.NEXT_PUBLIC_API_URL + endpoint;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };

    if (access_token) options.headers.Authorization = `Bearer ${access_token}`;
    try {
      const { data } = await useFetch(URL, options);
      console.log("data1", data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (user)
    return (
      <div>
        Hello {user.first_name} {user.last_name}
      </div>
    );
  // if (error) return <div>{error.errors[0].message}</div>;
  if (error) console.log("error jsx", error);
}
