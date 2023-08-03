import useFetchDirectus from "@/hooks/useFetchDirectus";

export async function GET(req) {
  let authorization;
  for (const pair of req.headers.entries()) {
    if (pair[0] === "authorization") authorization = pair[1];
  }

  try {
    const { data } = await useFetchDirectus("/users/me", authorization);
    return { data };
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}
