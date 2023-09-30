import styles from "./styles.module.css";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function MessageCard() {
  return (
    <div className={styles.card}>
      <div>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            width={50}
            height={50}
            className={styles.avatarImage}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p>Hello</p>
      <p>11:53</p>
    </div>
  );
}
