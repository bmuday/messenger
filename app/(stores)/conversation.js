import { devtools, persist } from "zustand/middleware";

let conversationStore = (set) => ({
  conversation: null,
  messages: [],
  setConversation: (conversation) => set(() => ({ conversation })),
  setMessages: (messages) => set(() => ({ messages })),
});

conversationStore = devtools(conversationStore);
conversationStore = persist(conversationStore, { name: "conversation" });

export default conversationStore;
