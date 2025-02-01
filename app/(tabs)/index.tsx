import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import useIndex from "@/hooks/timer/useIndex";
import { useTheme } from "@react-navigation/native";
import FeedbackDialog from "@/components/timer/timerList/FeedbackDialog";
import CategoryPicker from "@/components/timer/timerList/CategoryPicker";
import FlatlistTimer from "@/components/timer/timerList/FlatlistTimer";

export default function TimerListScreen() {
  const {
    exportTimers,
    timers,
    completedTimer,
    closeModal,
    groupedTimers,
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
  } = useIndex();

  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {timers.length === 0 && (
        <Text style={[{ color: colors.text }]}>No timers available</Text>
      )}

      <Button title="Export Timer Data" onPress={exportTimers} />

      <FeedbackDialog completedTimer={completedTimer} closeModal={closeModal} />

      <CategoryPicker
        groupedTimers={groupedTimers}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <FlatlistTimer
        groupedTimers={groupedTimers}
        toggleCategory={toggleCategory}
        expandedCategories={expandedCategories}
        startAllTimersInCategory={startAllTimersInCategory}
        pauseAllTimersInCategory={pauseAllTimersInCategory}
        resetAllTimersInCategory={resetAllTimersInCategory}
        startTimer={startTimer}
        pauseTimer={pauseTimer}
        resetTimer={resetTimer}
        deleteTimer={deleteTimer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
