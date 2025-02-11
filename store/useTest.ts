import zustand from "zustand";

interface TestStore {
  count: number;
  increaseByOne: () => void;
}

const counterStore = zustand.create<TestStore>((set) => ({
  count: 1,
  increaseByOne: () =>
    set((state) => ({
      count: state.count + 1,
    })),
  descreaseByOne: () =>
    set((state) => ({
      count: state.count - 1,
    })),
}));
