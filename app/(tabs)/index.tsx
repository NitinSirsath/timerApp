import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTimerStore } from "@/store/useTimerStore";
import { Bar as ProgressBar } from "react-native-progress";
import Modal from "react-native-modal";

export default function TimerListScreen() {
  const { timers, updateTimer, deleteTimer } = useTimerStore();
  const [completedTimer, setCompletedTimer] = useState<{ name: string } | null>(
    null
  );
  const { exportTimers } = useTimerStore();
  const loadTimers = useTimerStore((state) => state.loadTimers);

  useEffect(() => {
    loadTimers(); // ✅ Load timers from AsyncStorage when the app starts
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
        // ✅ Trigger halfway alert if applicable
        if (
          timer.halfwayAlert &&
          !timer.halfwayAlertTriggered &&
          timer.remainingTime <= timer.duration / 2
        ) {
          useTimerStore
            .getState()
            .updateTimer(id, { halfwayAlertTriggered: true });
          alert(`⏳ Halfway Alert: "${timer.name}" is at 50%!`);
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

  // 🔹 Bulk Actions for a Category
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

  // 🔹 Group timers by category
  const groupedTimers = timers.reduce((acc, timer) => {
    acc[timer.category] = [...(acc[timer.category] || []), timer];
    return acc;
  }, {} as Record<string, typeof timers>);

  return (
    <View style={styles.container}>
      {timers.length === 0 && <Text>No timers available</Text>}
      <Button title="Export Timer Data" onPress={exportTimers} />
      <Modal
        isVisible={!!completedTimer}
        onBackdropPress={closeModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>🎉 Timer Completed!</Text>
          <Text style={styles.modalText}>
            Great job! Your timer **{completedTimer?.name}** has completed.
          </Text>
          <Button title="OK" onPress={closeModal} />
        </View>
      </Modal>

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(category) => category}
        renderItem={({ item: category }) => (
          <View style={styles.categoryContainer}>
            {/* Expand/Collapse Header */}
            <TouchableOpacity
              onPress={() => toggleCategory(category)}
              style={styles.categoryHeader}
            >
              <Text style={styles.categoryTitle}>
                {category} ({groupedTimers[category].length})
              </Text>
              <Text>{expandedCategories[category] ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {/* Bulk Actions for Category */}
            {expandedCategories[category] && (
              <View style={styles.bulkActions}>
                <Button
                  title="Start All"
                  onPress={() => startAllTimersInCategory(category)}
                />
                <Button
                  title="Pause All"
                  onPress={() => pauseAllTimersInCategory(category)}
                />
                <Button
                  title="Reset All"
                  onPress={() => resetAllTimersInCategory(category)}
                />
              </View>
            )}

            {/* Timers List */}
            {expandedCategories[category] && (
              <FlatList
                data={groupedTimers[category]}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.timerCard}>
                    <Text style={styles.timerName}>{item.name}</Text>
                    {item.remainingTime > 0 && (
                      <ProgressBar
                        progress={item.remainingTime / item.duration}
                        width={200}
                        color="blue"
                      />
                    )}
                    <Text>{item.remainingTime} sec remaining</Text>
                    <View style={styles.buttonGroup}>
                      {item.status === "paused" && (
                        <Button
                          title="Start"
                          onPress={() => startTimer(item.id)}
                        />
                      )}
                      {item.status === "running" && (
                        <Button
                          title="Pause"
                          onPress={() => pauseTimer(item.id)}
                        />
                      )}
                      <Button
                        title="Reset"
                        onPress={() => resetTimer(item.id, item.duration)}
                      />
                      <Button
                        title="Delete"
                        onPress={() => deleteTimer(item.id)}
                        color="red"
                      />
                    </View>
                  </View>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  categoryContainer: { marginBottom: 10 },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 5,
  },
  categoryTitle: { fontSize: 18, fontWeight: "bold" },
  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },
  timerCard: { padding: 15, borderBottomWidth: 1 },
  timerName: { fontSize: 16, fontWeight: "bold" },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
});
