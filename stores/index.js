import { create } from "zustand";

import userStore from "./user";
import settingsStore from "./settings";
import darkStore from "./dark";
import errorStore from "./error";

export const useUserStore = create(userStore);
export const useSettingsStore = create(settingsStore);
export const useDarkStore = create(darkStore);
export const useErrorStore = create(errorStore);
