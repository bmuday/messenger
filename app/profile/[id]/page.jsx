"use client";
import { useParams } from "next/navigation";

export default function page() {
  const params = useParams();
  console.log("params", params);
  return <div>page</div>;
}
