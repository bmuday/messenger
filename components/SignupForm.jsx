"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "@/stores";
import { logIcons } from "@/lib/constants";
import fetchDirectus from "@/hooks/fetchDirectus";

export default function SignupForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const setUserSession = useUserStore((state) => state.setUserSession);

  const handleSignup = async (e) => {
    e.preventDefault();

    const signupEndpoint = "/users";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }),
    };
    const { data: user } = await fetchDirectus(signupEndpoint, options);

    const loginEndpoint = "/auth/login";
    const { data } = await fetchDirectus(loginEndpoint, options);

    try {
      setUser(user);
      setUserSession(data);
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
      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="firstname" className="block text-gray-600">
            Firstname
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter your firstname..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="lastname" className="block text-gray-600">
            Lastname
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter your lastname..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
          id="signup-btn"
        >
          Sign Up
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
      </div>
    </div>
  );
}
