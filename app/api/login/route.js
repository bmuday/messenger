import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const { user } = await useLogin(email, password);
    console.log("user", user);
    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return { error };
  }
}
