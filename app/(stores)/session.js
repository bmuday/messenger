import { devtools, persist } from "zustand/middleware";

let sessionStore = (set) => ({
  session: null,
  user: null,
  setSession: (session) => set(() => ({ session })),
  setUser: (user) => set(() => ({ user })),
});

sessionStore = devtools(sessionStore);
sessionStore = persist(sessionStore, { name: "session" });

export default sessionStore;
