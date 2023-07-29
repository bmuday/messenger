"use client";
import { useParams } from "next/navigation";

export default function Room() {
  const { id } = useParams();
  return <div>{id}</div>;
}
