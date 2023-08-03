import { devtools, persist } from "zustand/middleware";

let darkStore = (set) => ({
  dark: false,
  changeMode: () => set((state) => ({ dark: !state.dark })),
});

darkStore = devtools(darkStore);
darkStore = persist(darkStore, { name: "dark" });

export default darkStore;
