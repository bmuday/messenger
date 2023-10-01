import Link from "next/link";
import styles from "./styles.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div></div>
      <div></div>
      <Link href="/rooms" className={styles.heroButton}>
        Go to chat
      </Link>
    </section>
  );
}
