import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTimerStore } from "@/store/useTimerStore";
import { useTheme } from "@react-navigation/native";
import { Text, Card, Chip, SegmentedButtons } from "react-native-paper";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated"; // ✅ Import animation functions

export default function TimerHistoryScreen() {
  const { timers } = useTimerStore();
  const completedTimers = timers.filter((t) => t.status === "completed");
  const { colors } = useTheme();

  const categories = [
    "All",
    ...new Set(completedTimers.map((t) => t.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTimers =
    selectedCategory === "All"
      ? completedTimers
      : completedTimers.filter((t) => t.category === selectedCategory);

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.background }]}
      entering={FadeIn.duration(300)} // ✅ Animate when screen loads
    >
      <Text style={[styles.header, { color: colors.text }]}>
        Completed Timers
      </Text>

      {/* ✅ Category Filter with Animation */}
      <Animated.View entering={FadeIn.duration(300)}>
        <SegmentedButtons
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          buttons={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          style={styles.filterButtons}
        />
      </Animated.View>

      {/* ✅ Timer List */}
      <FlatList
        data={filteredTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            layout={Layout.springify()} // ✅ Spring animation when filtering
            entering={FadeIn.duration(400)}
            exiting={FadeOut.duration(300)}
          >
            <Card
              style={[styles.historyItem, { backgroundColor: colors.card }]}
              mode="elevated"
            >
              <Card.Content>
                <Text style={[styles.timerName, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.timerTime, { color: colors.text }]}>
                  Category: {item.category}
                </Text>

                {/* ✅ Category & Status Chips */}
                <View style={styles.chipContainer}>
                  <Chip mode="outlined" style={styles.chip}>
                    {item.category}
                  </Chip>
                  <Chip
                    mode="outlined"
                    style={[styles.chip, styles.completedChip]}
                  >
                    Completed
                  </Chip>
                </View>
              </Card.Content>
            </Card>
          </Animated.View>
        )}
        ListEmptyComponent={
          <Animated.View entering={FadeIn.duration(500)}>
            <Text style={[styles.emptyText, { color: colors.text }]}>
              No completed timers found.
            </Text>
          </Animated.View>
        }
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  filterButtons: {
    marginBottom: 15,
  },

  historyItem: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3, // ✅ Adds elevation for depth effect
  },

  timerName: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  timerTime: { fontSize: 14, marginBottom: 5 },

  chipContainer: {
    flexDirection: "row",
    gap: 6,
    marginTop: 5,
  },

  chip: {
    alignSelf: "flex-start",
  },

  completedChip: {
    backgroundColor: "#4CAF50", // ✅ Green for completed status
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
