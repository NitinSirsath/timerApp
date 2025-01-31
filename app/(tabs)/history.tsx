import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useTimerStore } from "@/store/useTimerStore";

export default function TimerHistoryScreen() {
  const { timers } = useTimerStore();
  const completedTimers = timers.filter((t) => t.status === "completed");
  console.log(completedTimers, "completedTimers");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Timers</Text>
      <FlatList
        data={completedTimers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.timerName}>
              {item.name} ({item.category})
            </Text>
            <Text>Completed!</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  historyItem: { padding: 15, borderBottomWidth: 1 },
  timerName: { fontSize: 18 },
});
