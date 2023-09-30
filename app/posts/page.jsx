"use client";
import { useState, useEffect } from "react";
import { supabase } from "../(lib)/supabase";
import { func } from "prop-types";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function createPost(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("posts")
      .insert({ name: title, description });

    if (error) console.log("error");
  }

  async function getPosts() {
    const { data, error } = await supabase.from("posts").select();
    console.log("data", data);
    if (data) setPosts(data);
    if (error) setError(error);
  }

  useEffect(() => {
    getPosts();
  }, []);

  supabase
    .channel("subscribe-posts")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "posts" },
      (payload) => {
        console.log("Change received!", payload);
        const { new: newPost } = payload;
        setPosts([...posts, newPost]);
      }
    )
    .subscribe();

  return (
    <div>
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Title..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts?.map((p, index) => (
          <div key={index}>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </ul>
      <div>{error}</div>
    </div>
  );
}
