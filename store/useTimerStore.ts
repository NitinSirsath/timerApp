import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category: string;
  status: "running" | "paused" | "completed";
  halfwayAlert: boolean;
  halfwayAlertTriggered: boolean;
}

// ✅ Define Zustand Store Type
interface TimerState {
  timers: Timer[];
  addTimer: (timer: Timer) => Promise<void>;
  updateTimer: (id: string, updates: Partial<Timer>) => Promise<void>;
  deleteTimer: (id: string) => Promise<void>;
  loadTimers: () => Promise<void>;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timers: [],

  // ✅ Load timers from AsyncStorage when the app starts
  loadTimers: async () => {
    const storedTimers = await AsyncStorage.getItem("timers");
    if (storedTimers) {
      set({ timers: JSON.parse(storedTimers) });
    }
  },

  // ✅ Add a new timer and persist it
  addTimer: async (timer) => {
    const newTimers = [...get().timers, timer];
    set({ timers: newTimers });
    await AsyncStorage.setItem("timers", JSON.stringify(newTimers));
  },

  // ✅ Update a timer and persist changes
  updateTimer: async (id, updates) => {
    const updatedTimers = get().timers.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    set({ timers: updatedTimers });
    await AsyncStorage.setItem("timers", JSON.stringify(updatedTimers));
  },

  // ✅ Delete a timer and persist changes
  deleteTimer: async (id) => {
    const remainingTimers = get().timers.filter((t) => t.id !== id);
    set({ timers: remainingTimers });
    await AsyncStorage.setItem("timers", JSON.stringify(remainingTimers));
  },
}));
