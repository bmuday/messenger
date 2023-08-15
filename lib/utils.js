import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import fetchDirectus from "@/hooks/fetchDirectus";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const getCurrentUser = async (access_token) => {
  const endpoint = "/users/me";
  let options;
  if (access_token)
    options = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
  try {
    const { data } = await fetchDirectus(endpoint, options);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};
