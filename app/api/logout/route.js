import { NextResponse } from "next/server";
import useLogout from "../../../hooks/useLogout";

export async function GET() {
  try {
    await useLogout();
  } catch (error) {
    console.log("error", error);
    return { error };
  }
}
