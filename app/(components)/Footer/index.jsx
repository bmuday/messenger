import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../../(lib)/constants";
import styles from "./styles.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Image
        src={"/images/logo.svg"}
        alt="logo"
        width={50}
        height={50}
        className={styles.img}
      />
      <p>Chatix © Tous droits réservés</p>
      <ul className={styles.links}>
        {footerLinks?.map((l) => (
          <li className={styles.link} key={l.url}>
            <Link href={l.url}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
