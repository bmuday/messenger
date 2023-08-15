import { rest, authentication, createDirectus } from "@directus/sdk";
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//TODO: update to @directus/sdk v11 to use new client SDK
const client =
  apiUrl && createDirectus(apiUrl).with(rest()).with(authentication("json"));

export default client;
