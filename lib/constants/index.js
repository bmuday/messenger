import {
  CalendarDays,
  Gamepad2,
  LogOut,
  MapPin,
  MessageSquare,
  Settings,
  Store,
  PieChart,
  Newspaper,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const headerLinks = [
  { label: "Log In", url: "/login", active: false },
  { label: "Sign Up", url: "/sign-up", active: true },
];

export const leftBarLinks = [
  { label: "Posts", url: "/posts", icon: <Newspaper /> },
  { label: "Chat", url: "/chat", icon: <MessageSquare /> },
  { label: "Polls", url: "/polls", icon: <PieChart /> },
  { label: "Events", url: "/events", icon: <CalendarDays /> },
  { label: "Map", url: "/map", icon: <MapPin /> },
  { label: "Marketplace", url: "/marketplace", icon: <Store /> },
  { label: "Games", url: "/games", icon: <Gamepad2 /> },
];

export const leftBarSubLinks = [
  { label: "Settings", url: "/settings", icon: <Settings /> },
  { label: "Exit", url: "/", icon: <LogOut /> },
];

export const footerLinks = [
  { label: "Terms of use", url: "/terms" },
  { label: "Legal", url: "/legal" },
  { label: "Contact", url: "/contact" },
];

export const socialLinks = [
  { label: "Instagram", url: "#", image: <Instagram /> },
  { label: "Facebook", url: "#", image: <Facebook /> },
  { label: "Twitter", url: "#", image: <Twitter /> },
];

export const logIcons = [
  {
    name: "Google",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5 fill-current"
      >
        <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    icon: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 1024 1024"
        height="1.6em"
        width="1.6em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"></path>
      </svg>
    ),
  },
  {
    name: "Facebook",
    icon: (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 24 24"
        height="1.6em"
        width="1.6em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
      </svg>
    ),
  },
  {
    name: "Twitter",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-5 h-5 fill-current"
      >
        <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
      </svg>
    ),
  },
];
