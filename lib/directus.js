import { rest, authentication, createDirectus } from "@directus/sdk";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//TODO: update to @directus/sdk v11 to use new client SDK
export const client =
  apiUrl && createDirectus(apiUrl).with(rest()).with(authentication("json"));

export async function fetchDirectus(
  endpoint,
  options = {},
  queryParameters = {}
) {
  if (!options.method) options.method = "GET";
  const query = apiUrl + endpoint;

  if (queryParameters) {
    let fields;
    let filter;
    let sort;
    let grouping;

    Object.entries(queryParameters).map((p) => console.log("p", p));
    //  query = `query?fields=${query?fields=${queryPa}&}`query?{ fields, filter, sort };
  }

  try {
    const res = await fetch(query, options);
    if (endpoint.includes("logout")) return;
    const { data } = await res.json();
    return { data };
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}
