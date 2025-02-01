import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useIndex from "@/hooks/timer/useIndex";
import { useTheme } from "@react-navigation/native";
import FeedbackDialog from "@/components/timer/timerList/FeedbackDialog";
import CategoryPicker from "@/components/timer/timerList/CategoryPicker";
import FlatlistTimer from "@/components/timer/timerList/FlatlistTimer";
import { Button } from "react-native-paper";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

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
    <Animated.View
      style={[styles.container, { backgroundColor: colors.background }]}
      entering={FadeIn.duration(300)}
    >
      {timers.length === 0 && (
        <Animated.Text
          style={[{ color: colors.text }]}
          entering={FadeIn.duration(500)}
          exiting={FadeOut.duration(300)}
        >
          No timers available
        </Animated.Text>
      )}

      {/* Animated Export Button */}
      <Animated.View
        entering={ZoomIn.duration(200)}
        exiting={ZoomOut.duration(200)}
      >
        <Button
          mode={"contained"}
          onPress={exportTimers}
          style={styles.animatedButton}
        >
          Export Timer Data
        </Button>
      </Animated.View>

      {/* Animated Feedback Dialog */}
      <FeedbackDialog completedTimer={completedTimer} closeModal={closeModal} />

      {/* Animated Category Picker */}
      <Animated.View entering={FadeIn.duration(300).delay(200)}>
        <CategoryPicker
          groupedTimers={groupedTimers}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </Animated.View>

      {/* Animated Timer List */}
      <Animated.View layout={Layout.springify()}>
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
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  animatedButton: {
    marginVertical: 10,
    alignSelf: "center",
  },
});
