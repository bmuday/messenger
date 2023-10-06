import { devtools, persist } from "zustand/middleware";

let userStore = (set) => ({
  user: null,
  session: null,
  member: null,
  setUser: (user) => set(() => ({ user })),
  setSession: (session) => set(() => ({ session })),
  setMember: (member) => set(() => ({ member })),
});

userStore = devtools(userStore);
userStore = persist(userStore, { name: "user" });

export default userStore;
