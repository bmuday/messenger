import { apiUrl } from "@/lib/directus";
export default async function fetchDirectus(
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
