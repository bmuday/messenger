import styles from "./styles.module.css";

export default function MainBar({ displayMessages }) {
  return (
    <div className={styles.mainbarContainer}>
      {displayMessages ? (
        <MessageChannel />
      ) : (
        <div className={styles.noMessageContainer}>
          <p className={styles.noMessage}>
            Select a chat or start a new conversation
          </p>
        </div>
      )}
    </div>
  );
}
