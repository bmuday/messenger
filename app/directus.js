import { createDirectus, rest, authentication } from "@directus/sdk";
export const apiURL = process.env.NEXT_PUBLIC_API_URL;
const client = createDirectus(apiURL).with(rest()).with(authentication("json"));

export default client;
