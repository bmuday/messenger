import Link from "next/link";
import { footerLinks, socialLinks } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="flex items-center justify-around py-4 text-gray-600 bg-white">
      <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-violet-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-5 h-5 rounded-full text-gray-50"
        >
          <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
        </svg>
      </div>
      <p>© 2023 Chatix - All rights reserved.</p>
      <ul className="flex flex-wrap px-4">
        {footerLinks?.map((link, index) => (
          <li key={index} className="flex">
            <Link
              rel="noopener noreferrer"
              href={link.url}
              className="flex items-center px-4 -mb-1 border-b-2 border-transparent"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap space-x-4 sm:space-x-8">
        {socialLinks?.map((link, index) => (
          <li key={index} className="flex">
            <Link
              rel="noopener noreferrer"
              href={link.url}
              className="flex items-center -mb-1 border-b-2 border-transparent"
            >
              {link.image}
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
