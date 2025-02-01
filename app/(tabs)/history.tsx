import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTimerStore } from "@/store/useTimerStore";
import { useTheme } from "@react-navigation/native"; // ✅ Import theme hook

export default function TimerHistoryScreen() {
  const { timers } = useTimerStore();
  const completedTimers = timers.filter((t) => t.status === "completed");
  const { colors } = useTheme(); // ✅ Get theme-based colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>
        Completed Timers
      </Text>
      <FlatList
        data={completedTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.historyItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.timerName, { color: colors.text }]}>
              {item.name} ({item.category})
            </Text>
            <Text style={{ color: colors.text }}>Completed!</Text>
          </View>
        )}
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

  historyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },

  timerName: { fontSize: 18, fontWeight: "bold" },
});
