import { NextResponse } from "next/server";
import useSignup from "../../../hooks/useSignup";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { user } = await useSignup({ email, password });
    console.log("user", user);
    console.log("data", NextResponse.json(user));
    return NextResponse.json(user);
  } catch (error) {
    console.log("errorr", error);
    return { error };
  }
}
