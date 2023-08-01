import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { leftBarLinks, leftBarSubLinks } from "@/lib/constants";
import Link from "next/link";

export default function LeftBar() {
  return (
    <div className="h-full p-3 space-y-2 text-gray-800 w-60 bg-gray-50">
      <div className="flex items-center p-2 space-x-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
          <span className="flex items-center space-x-1">
            <Link
              rel="noopener noreferrer"
              href="/profile"
              className="text-xs text-gray-600 hover:underline"
            >
              View profile
            </Link>
          </span>
        </div>
      </div>
      <div className="divide-y divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {leftBarLinks.map((l) => (
            <li className="hover:text-gray-900 hover:bg-gray-100">
              <Link
                rel="noopener noreferrer"
                href={l.url}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                {l.icon}
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          {leftBarSubLinks.map((l) => (
            <li className="hover:text-gray-900 hover:bg-gray-100">
              <Link
                rel="noopener noreferrer"
                href={l.url}
                className="flex items-center p-2 space-x-3 rounded-md"
              >
                {l.icon}
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
