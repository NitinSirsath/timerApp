import { useTimerStore } from "@/store/useTimerStore";
import { useEffect, useState } from "react";

const useIndex = () => {
  const { timers, deleteTimer } = useTimerStore();
  const [completedTimer, setCompletedTimer] = useState<{ name: string } | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { exportTimers } = useTimerStore();
  const loadTimers = useTimerStore((state) => state.loadTimers);

  useEffect(() => {
    loadTimers();
  }, []);

  const [intervals, setIntervals] = useState<{
    [key: string]: NodeJS.Timeout | null;
  }>({});
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    return () => {
      Object.values(intervals).forEach(
        (interval) => interval && clearInterval(interval)
      );
    };
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const startTimer = (id: string) => {
    if (intervals[id]) return;

    const interval = setInterval(() => {
      const timer = useTimerStore.getState().timers.find((t) => t.id === id);
      if (!timer) return;

      if (timer.remainingTime > 1) {
        if (
          timer.halfwayAlert &&
          !timer.halfwayAlertTriggered &&
          timer.remainingTime <= timer.duration / 2
        ) {
          useTimerStore
            .getState()
            .updateTimer(id, { halfwayAlertTriggered: true });
          alert(`Halfway Alert: "${timer.name}" is at 50%!`);
        }

        useTimerStore.getState().updateTimer(id, {
          remainingTime: timer.remainingTime - 1,
          status: "running",
        });
      } else {
        clearInterval(interval);
        useTimerStore
          .getState()
          .updateTimer(id, { remainingTime: 0, status: "completed" });
        setCompletedTimer({ name: timer.name });
      }
    }, 1000);

    setIntervals((prev) => ({ ...prev, [id]: interval }));
  };

  const closeModal = () => {
    setCompletedTimer(null);
  };

  const pauseTimer = (id: string) => {
    clearInterval(intervals[id]!);
    setIntervals((prev) => ({ ...prev, [id]: null }));
    useTimerStore.getState().updateTimer(id, { status: "paused" });
  };

  const resetTimer = (id: string, originalDuration: number) => {
    clearInterval(intervals[id]!);
    setIntervals((prev) => ({ ...prev, [id]: null }));
    useTimerStore.getState().updateTimer(id, {
      remainingTime: originalDuration,
      status: "paused",
    });
  };

  const startAllTimersInCategory = (category: string) => {
    timers
      .filter((t) => t.category === category && t.status !== "running")
      .forEach((timer) => startTimer(timer.id));
  };

  const pauseAllTimersInCategory = (category: string) => {
    timers
      .filter((t) => t.category === category && t.status === "running")
      .forEach((timer) => pauseTimer(timer.id));
  };

  const resetAllTimersInCategory = (category: string) => {
    timers
      .filter((t) => t.category === category)
      .forEach((timer) => resetTimer(timer.id, timer.duration));
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    acc[timer.category] = [...(acc[timer.category] || []), timer];
    return acc;
  }, {} as Record<string, typeof timers>);

  const filteredGroupedTimers = selectedCategory
    ? { [selectedCategory]: groupedTimers[selectedCategory] || [] }
    : groupedTimers;
  return {
    exportTimers,
    timers,
    completedTimer,
    closeModal,
    // groupedTimers,
    toggleCategory,
    expandedCategories,
    startAllTimersInCategory,
    pauseAllTimersInCategory,
    resetAllTimersInCategory,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    selectedCategory,
    setSelectedCategory,
    groupedTimers: filteredGroupedTimers,
  };
};

export default useIndex;
