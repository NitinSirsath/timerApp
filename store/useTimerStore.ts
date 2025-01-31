import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define Timer Type
export interface Timer {
  id: string;
  name: string;
  duration: number; // Total duration in seconds
  remainingTime: number;
  category: string;
  status: "running" | "paused" | "completed";
}

// Define Zustand Store Type
interface TimerState {
  timers: Timer[];
  addTimer: (timer: Timer) => Promise<void>;
  updateTimer: (id: string, updates: Partial<Timer>) => Promise<void>;
  deleteTimer: (id: string) => Promise<void>;
  loadTimers: () => Promise<void>;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timers: [],

  addTimer: async (timer) => {
    const newTimers = [...get().timers, timer];
    set({ timers: newTimers });
    await AsyncStorage.setItem("timers", JSON.stringify(newTimers));
  },

  updateTimer: async (id, updates) => {
    set((state) => ({
      timers: state.timers.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
    await AsyncStorage.setItem("timers", JSON.stringify(get().timers));
  },

  deleteTimer: async (id) => {
    const remainingTimers = get().timers.filter((t) => t.id !== id);
    set({ timers: remainingTimers });
    await AsyncStorage.setItem("timers", JSON.stringify(remainingTimers));
  },

  loadTimers: async () => {
    const storedTimers = await AsyncStorage.getItem("timers");
    if (storedTimers) set({ timers: JSON.parse(storedTimers) });
  },
}));
