import Image from "next/image";
import { headerLinks } from "../../(lib)/constants";
import Link from "next/link";
import styles from "./styles.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <Image
        src={"/images/logo.svg"}
        alt="logo"
        width={50}
        height={50}
        className={styles.img}
      />
      <ul className={styles.links}>
        {headerLinks?.map((l) => (
          <li className={styles.link} key={l.url}>
            <Link href={l.url}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <div></div>
    </header>
  );
}

export default Header;
