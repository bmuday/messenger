import Link from "next/link";
import { sideBarLinks } from "../../(lib)/constants";
import styles from "./styles.module.css";
import { LogOut } from "lucide-react";

export default function SideBar() {
  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.linksContainer}>
        {sideBarLinks?.map((l) => {
          if (l.url)
            return (
              <Link key={l.url} href={l.url} className={styles.link}>
                {l.icon}
              </Link>
            );
        })}
      </div>
      <Link href="/" className={styles.button}>
        <LogOut />
      </Link>
    </div>
  );
}
