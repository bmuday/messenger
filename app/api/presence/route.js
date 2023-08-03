import { NextResponse } from "next/server";
import { activeMembers } from "@/dummydata";

export async function GET() {
  const endpoint = "";
  try {
    // const res = await fetch(endpoint, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   cache: "no-store",
    // });
    // const data = await res.json();

    // console.log("data", NextResponse.json(data));
    // return NextResponse.json(data);
    console.log("active", activeMembers);
    return activeMembers;
  } catch (error) {
    console.log("error", error);
  }
}
