import { create } from "zustand";

import userStore from "./user";
import logoutStore from "./logout";
import settingsStore from "./settings";
import darkStore from "./dark";
import peerStore from "./peer";

export const useUserStore = create(userStore);
export const useLogoutStore = create(logoutStore);
export const useSettingsStore = create(settingsStore);
export const useDarkStore = create(darkStore);
export const usePeerStore = create(peerStore);
