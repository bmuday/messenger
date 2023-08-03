import { devtools, persist } from "zustand/middleware";

let settingsStore = (set) => ({
  dark: false,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark })),
});

settingsStore = devtools(settingsStore);
settingsStore = persist(settingsStore, { name: "settings" });

export default settingsStore;
