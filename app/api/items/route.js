import { NextResponse } from "next/server";
import useFetchItems from "@/hooks/useFetchItems";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { user } = await useLogin(email, password);
    console.log("user", user);
    console.log("data", NextResponse.json(user));
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return { error };
  }
}
