"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores";
import { logIcons } from "@/lib/constants";
import fetchDirectus from "@/hooks/fetchDirectus";
import { getCurrentUser } from "@/lib/utils";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setUserSession = useUserStore((state) => state.setUserSession);

  const handleLogin = async (e) => {
    e.preventDefault();

    const endpoint = "/auth/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    try {
      const { data: userSession } = await fetchDirectus(endpoint, options);
      setUserSession(userSession);
      let user;
      if (userSession) {
        user = await getCurrentUser(userSession.access_token);
        setUser(user);
      }
      setSuccess("Connexion...");
      setTimeout(() => {
        setSuccess("");
        router.push("/");
      }, 1000);
    } catch (error) {
      if (error.message.includes("Invalid")) {
        setError("Wrong email or password.");
      } else {
        setError(error.message);
      }
    }
  };
  return (
    <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end text-xs text-gray-600">
            <Link rel="noopener noreferrer" href="/forgot-password">
              Forgot Password?
            </Link>
          </div>
        </div>
        <button
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600"
          type="submit"
          id="login-btn"
        >
          Log In
        </button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
        <p className="px-3 text-sm text-gray-600">Or with social accounts</p>
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
      </div>
      <div className="flex flex-col justify-center space-x-4">
        <div className="flex justify-center m-3 space-x-4">
          {logIcons.map((i) => (
            <button
              key={i.name}
              aria-label={`Log in with ${i.name}`}
              className="p-3 rounded-sm"
            >
              {i.icon}
            </button>
          ))}
        </div>
        <p className="text-xs text-center text-gray-600 sm:px-6">
          <span className="mr-2">Don&apos;t have an account?</span>
          <a
            rel="noopener noreferrer"
            href="/sign-up"
            className="text-gray-800 underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
