import { devtools, persist } from "zustand/middleware";

let logoutStore = (set) => ({
  error: "",
  setError: () => set((error) => ({ error })),
});

logoutStore = devtools(logoutStore);
logoutStore = persist(logoutStore, { name: "logout" });

export default logoutStore;
