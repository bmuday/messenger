import { create } from "zustand";

import sessionStore from "./session";
import conversationStore from "./conversation";
import darkStore from "./dark";

export const useSessionStore = create(sessionStore);
export const useConversationStore = create(conversationStore);
export const useDarkStore = create(darkStore);
