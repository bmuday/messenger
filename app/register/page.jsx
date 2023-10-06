"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSessionStore } from "@/stores";
import { socialLinks } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { notificationTime } from "@/lib/constants";

export default function Register() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setSession } = useSessionStore((state) => state);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleRegister(e) {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });

    if (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, notificationTime);
    } else {
      if (data) {
        setSession(data.session);
        return { id: data.user.id, username: usernameRef.current.value };
      }
    }
  }

  async function createProfile(id, username) {
    const { error } = await supabase.from("profiles").insert({ id, username });

    if (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, notificationTime);
    } else {
      setSuccess({ message: "You are registered!" });
      setTimeout(() => {
        setSuccess(null);
        router.push("/feed");
      }, notificationTime);
    }
  }

  return (
    <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl">
      <form
        onSubmit={(e) => {
          handleRegister(e).then(({ id, username }) =>
            createProfile(id, username)
          );
        }}
        className="space-y-6"
      >
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-gray-600">
            Username
          </label>
          <input
            ref={usernameRef}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-600">
            Email
          </label>
          <input
            ref={emailRef}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
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
        {success && <p>{success.message}</p>}
        {error && <p>{error.message}</p>}
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
        <p className="px-3 text-sm text-gray-600">Or with social accounts</p>
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
      </div>
      <div className="flex flex-col justify-center space-x-4">
        <div className="flex justify-center m-3 space-x-4">
          {socialLinks?.map((i) => (
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
