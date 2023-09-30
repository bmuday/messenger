import Link from "next/link";
import { sideBarLinks } from "../../(lib)/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import styles from "./styles.module.css";

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
          return (
            <button key={l.label} className={styles.button}>
              {l.icon}
            </button>
          );
        })}
      </div>
      <div className={styles.avatarContainer}>
        <Link href="/profile">
          <Avatar>
            <AvatarImage
              src="https://github.com/shadcn.png"
              width={50}
              height={50}
              className={styles.avatarImage}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}
