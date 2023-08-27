"use client";

import { fetchDirectus } from "@/lib/directus";
import { useUserStore } from "@/stores";
import { useState, useEffect } from "react";

export default function ChatLanding({ setMember, peer }) {
  const [pseudo, setPseudo] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const user = useUserStore((state) => state.user);
  const member = useUserStore((state) => state.member);
  const access_token = useUserStore((state) => state.userSession)?.access_token;

  console.log("peer2", peer);
  const createMember = async (e) => {
    e.preventDefault();

    const endpoint = `/items/member`;
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        pseudo,
        age,
        gender,
        location,
        peer_id: peer._id,
        subscription: "standard",
      }),
    };
    if (access_token) options.headers.Authorization = `Bearer ${access_token}`;
    try {
      const { data } = await fetchDirectus(endpoint, options);
      console.log("member", data);
      setMember(data);
    } catch (error) {
      console.log("error", error);
      setError(error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={createMember} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="pseudo" className="block text-gray-600">
            Pseudo
          </label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            placeholder="Enter your pseudo..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="age" className="block text-gray-600">
            Age
          </label>
          <input
            type="age"
            name="age"
            id="age"
            placeholder="Enter your age..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="gender" className="block text-gray-600">
            Gender
          </label>
          <input
            type="text"
            name="gender"
            id="gender"
            placeholder="Enter your gender..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="location" className="block text-gray-600">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button
          className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600"
          type="submit"
          id="login-btn"
        >
          Submit
        </button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
