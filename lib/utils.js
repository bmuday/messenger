import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fetchDirectus } from "./directus";

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

export const setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const deleteCookie = (name) => {
  document.cookie = name + "=; Max-Age=0";
};
