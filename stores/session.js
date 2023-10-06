import { devtools, persist } from "zustand/middleware";

let sessionStore = (set) => ({
  session: null,
  setSession: (session) => set(() => ({ session })),
});

sessionStore = devtools(sessionStore);
sessionStore = persist(sessionStore, { name: "session" });

export default sessionStore;
