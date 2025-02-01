import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import Modal from "react-native-modal";
import useIndex from "@/hooks/timer/useIndex";
import { useThemeStore } from "@/store/useThemeStore";
import { useTheme } from "@react-navigation/native"; // ✅ Import theme hook

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
  } = useIndex();

  const { colors } = useTheme(); // ✅ Get theme-based colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {timers.length === 0 && (
        <Text style={[{ color: colors.text }]}>No timers available</Text>
      )}

      <Button title="Export Timer Data" onPress={exportTimers} />

      <Modal
        isVisible={!!completedTimer}
        onBackdropPress={closeModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.card }]}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            🎉 Timer Completed!
          </Text>
          <Text style={[styles.modalText, { color: colors.text }]}>
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
              style={[styles.categoryHeader, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.categoryTitle, { color: colors.text }]}>
                {category} ({groupedTimers[category].length})
              </Text>
              <Text style={{ color: colors.text }}>
                {expandedCategories[category] ? "▲" : "▼"}
              </Text>
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
                  <View
                    style={[styles.timerCard, { backgroundColor: colors.card }]}
                  >
                    <Text style={[styles.timerName, { color: colors.text }]}>
                      {item.name}
                    </Text>
                    {item.remainingTime > 0 && (
                      <ProgressBar
                        progress={item.remainingTime / item.duration}
                        width={200}
                        color={colors.primary}
                      />
                    )}
                    <Text style={{ color: colors.text }}>
                      {item.remainingTime} sec remaining
                    </Text>
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
    borderRadius: 5,
    marginBottom: 5,
  },

  categoryTitle: { fontSize: 18, fontWeight: "bold" },

  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 5,
  },

  timerCard: {
    padding: 15,
    borderBottomWidth: 1,
  },

  timerName: { fontSize: 16, fontWeight: "bold" },

  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  modalContainer: {
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
});
