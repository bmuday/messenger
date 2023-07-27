import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const exp = Math.round(Date.now() / 1000) + 60 * 30;
  const options = {
    properties: {
      exp,
    },
  };

  /*
        No need to send the headers with the request when using the proxy option:
        netlify.toml takes care of that for us.
      */

  const res = await fetch("https://api.daily.co/v1/rooms/", {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_DAILY_API_KEY}`,
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
