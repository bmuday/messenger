// import { Directus } from "@directus/sdk";
import { rest, authentication, createDirectus } from "@directus/sdk";
export const apiUrl = process.env.DIRECTUS_API_URL;

// const client = new Directus(apiUrl);

//TODO: update to @directus/sdk v11 to use new client SDK
const client =
  apiUrl && createDirectus(apiUrl).with(rest()).with(authentication("json"));

export default client;
