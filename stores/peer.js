import { devtools, persist } from "zustand/middleware";

let peerStore = (set) => ({
  peer: null,
  setPeer: (peer) => set(() => ({ peer })),
});

peerStore = devtools(peerStore);
peerStore = persist(peerStore, { name: "peer" });

export default peerStore;
