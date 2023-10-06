import { create } from "zustand";

import sessionStore from "./session";
import darkStore from "./dark";

export const useSessionStore = create(sessionStore);
export const useDarkStore = create(darkStore);
