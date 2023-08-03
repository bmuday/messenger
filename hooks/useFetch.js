export default async function useFetch(url, options) {
  try {
    const res = await fetch(url, options);
    if (url.includes("logout")) return;
    const { data } = await res.json();
    return { data };
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
}
