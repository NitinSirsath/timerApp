import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
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
    <SafeAreaView
      style={[styles.safeContainer, { backgroundColor: colors.background }]}
    >
      <Animated.View
        style={styles.content}
        entering={FadeIn.duration(300)}
        layout={Layout.springify()}
      >
        {timers.length === 0 && (
          <Animated.Text
            style={[styles.noTimersText, { color: colors.text }]}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)}
          >
            No timers available
          </Animated.Text>
        )}

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

        <FeedbackDialog
          completedTimer={completedTimer}
          closeModal={closeModal}
        />

        <Animated.View entering={FadeIn.duration(300).delay(200)}>
          <CategoryPicker
            groupedTimers={groupedTimers}
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        </Animated.View>

        <Animated.View layout={Layout.springify()} style={styles.timerList}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    paddingBottom: 20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  noTimersText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 10,
  },

  animatedButton: {
    marginVertical: 10,
    alignSelf: "center",
  },

  timerList: {
    flex: 1,
  },
});
