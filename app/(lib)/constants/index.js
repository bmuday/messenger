import {
  LogOut,
  MessageSquare,
  Users,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

export const headerLinks = [
  { label: "Rooms", url: "/rooms", active: false },
  { label: "Members", url: "/members", active: true },
  { label: "Blog", url: "/blog", active: false },
];

export const footerLinks = [
  { label: "Terms", url: "/terms", active: false },
  { label: "Legal", url: "/legal", active: true },
  { label: "Contact", url: "/contact", active: false },
];

export const sideBarLinks = [
  { label: "Messages", url: "/messages", icon: <MessageSquare /> },
  { label: "Users", url: "/users", icon: <Users /> },
  { label: "Logout", icon: <LogOut /> },
];

// export const leftBarLinks = [
//   { label: "Posts", url: "/posts", icon: <Newspaper /> },
//   { label: "Chat", url: "/chat", icon: <MessageSquare /> },
//   { label: "Polls", url: "/polls", icon: <PieChart /> },
//   { label: "Events", url: "/events", icon: <CalendarDays /> },
//   { label: "Map", url: "/map", icon: <MapPin /> },
//   { label: "Marketplace", url: "/marketplace", icon: <Store /> },
//   { label: "Games", url: "/games", icon: <Gamepad2 /> },
// ];
