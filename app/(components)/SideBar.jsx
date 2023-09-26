import Link from "next/link";
import { sideBarLinks } from "../(lib)/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../(components)/ui/avatar";

export default function SideBar() {
  return (
    <div className="w-[10%] border-r-2 border-gray-500 flex flex-col justify-between">
      <div>
        {sideBarLinks?.map((l) => {
          if (l.url)
            return (
              <Link key={l.url} href={l.url}>
                {l.icon}
              </Link>
            );
          return <button key={l.label}>{l.icon}</button>;
        })}
      </div>
      <div>
        <Link href="/profile">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
