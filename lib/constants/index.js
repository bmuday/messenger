import {
  MessageSquare,
  Users,
  Search,
  Instagram,
  Facebook,
  Twitter,
  UserPlus2,
} from "lucide-react";

// export const icons = {
//   sideBarIcons: { logout: <LogOut />, message: MessageSquare, users: Users },
//   leftBarIcons: { createGroup: UserPlus2 },
// };

export const authLinks = [
  { label: "Login", url: "/login", active: false },
  { label: "Register", url: "/register", active: true },
];
export const socialLinks = [];

export const headerLinks = [
  { label: "Rooms", url: "/search/rooms", active: false },
  { label: "Members", url: "/search//members", active: true },
  { label: "Blog", url: "/blog", active: false },
];

export const footerLinks = [
  { label: "Terms", url: "/terms", active: false },
  { label: "Legal", url: "/legal", active: true },
  { label: "Contact", url: "/contact", active: false },
];

export const sideBarLinks = [
  { label: "Rooms", url: "/rooms", icon: <Users /> },
  { label: "Messages", url: "/messages", icon: <MessageSquare /> },
  { label: "Search", url: "/search", icon: <Search /> },
  // { label: "Logout", icon: <LogOut /> },
];

export const notificationTime = 2000; // notification time in ms
