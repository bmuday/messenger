import styles from "./styles.module.css";
import { useConversationStore, useSessionStore } from "@/app/(stores)";
import { supabase } from "@/app/(lib)/supabase";

export default function RoomCard({ conversation }) {
  const { user } = useSessionStore((state) => state);
  const { setConversation } = useConversationStore((state) => state);

  async function getProfile(id) {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .match({ id: id });
    if (data) console.log("profile", data);
    if (error) console.log("error", error);
  }
  // Get interlocutor profile
  // if (conversation.host !== user.id) getProfile(conversation.host);
  // if (conversation.guest !== user.id) getProfile(conversation.guest);
  return (
    <div className={styles.card} onClick={() => setConversation(conversation)}>
      <Image
        src="https://github.com/shadcn.png"
        width={50}
        height={50}
        className={styles.avatarImage}
      />
      <p className={styles.lastMessage}>{conversation.id}</p>
      <p className={styles.date}>11:53</p>
    </div>
  );
}
