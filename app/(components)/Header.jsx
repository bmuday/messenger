import Image from "next/image";
import { headerLinks } from "../(lib)/constants";
import Link from "next/link";

function Header() {
  return (
    <header className="flex w-full h-15 justify-around py-5">
      <Image src={"/images/logo.svg"} alt="logo" width={50} height={50} />
      <ul className="flex items-center">
        {headerLinks?.map((l) => (
          <li className="mx-5" key={l.url}>
            <Link href={l.url}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <div></div>
    </header>
  );
}

export default Header;
