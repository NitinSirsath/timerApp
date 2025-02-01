import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useTimerStore } from "@/store/useTimerStore";
import { useTheme } from "@react-navigation/native";
import { Text, Card, Chip, SegmentedButtons } from "react-native-paper";

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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        Completed Timers
      </Text>
      <SegmentedButtons
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        buttons={categories.map((category) => ({
          value: category,
          label: category,
        }))}
        style={styles.filterButtons}
      />
      <FlatList
        data={filteredTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={[styles.historyItem, { backgroundColor: colors.card }]}>
            <Card.Content>
              <Text style={[styles.timerName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.timerTime, { color: colors.text }]}>
                Category: {item.category}
              </Text>

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
        )}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.text }]}>
            No completed timers found.
          </Text>
        }
      />
    </View>
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
    elevation: 3,
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
    backgroundColor: "#4CAF50",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
