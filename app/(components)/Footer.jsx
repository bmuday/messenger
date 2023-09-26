import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../(lib)/constants";

function Footer() {
  return (
    <footer className="flex w-full h-15 justify-around py-5">
      <Image src={"/images/logo.svg"} alt="logo" width={50} height={50} />
      <p>Chatix © Tous droits réservés</p>
      <ul className="flex items-center">
        {footerLinks?.map((l) => (
          <li className="mx-5" key={l.url}>
            <Link href={l.url}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
