import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ Define Zustand Store Type
interface ThemeState {
  theme: "light" | "dark";
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: "light", // Default theme

  // ✅ Load theme from AsyncStorage
  loadTheme: async () => {
    const storedTheme = await AsyncStorage.getItem("theme");
    if (storedTheme) {
      set({ theme: storedTheme as "light" | "dark" });
    }
  },

  // ✅ Toggle and persist theme
  toggleTheme: async () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    set({ theme: newTheme });
    await AsyncStorage.setItem("theme", newTheme);
  },
}));
