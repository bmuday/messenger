import { devtools, persist } from "zustand/middleware";

let userStore = (set) => ({
  user: null,
  userSession: null,
  member: null,
  setUser: (user) => set(() => ({ user })),
  setUserSession: (userSession) => set(() => ({ userSession })),
  setMember: (member) => set(() => ({ member })),
});

userStore = devtools(userStore);
userStore = persist(userStore, { name: "user" });

export default userStore;
