import { Timer } from "@/store/useTimerStore";
import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons"; // ✅ Import MaterialIcons

interface IProps {
  groupedTimers: Record<string, Timer[]>;
  toggleCategory: (category: string) => void;
  expandedCategories: { [key: string]: boolean };
  startAllTimersInCategory: (category: string) => void;
  pauseAllTimersInCategory: (category: string) => void;
  resetAllTimersInCategory: (category: string) => void;
  startTimer: (id: string) => void;
  deleteTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string, originalDuration: number) => void;
}

const FlatlistTimer = ({
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
}: IProps) => {
  const { colors } = useTheme();

  return (
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
            <MaterialIcons
              name={
                expandedCategories[category]
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              } // ✅ Proper Arrow Icons
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>

          {/* Bulk Actions for Category */}
          {expandedCategories[category] && (
            <View
              style={[styles.bulkActions, { backgroundColor: colors.card }]}
            >
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
  );
};

export default FlatlistTimer;

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  categoryTitle: { fontSize: 18, fontWeight: "bold" },

  categoryContainer: { marginBottom: 10 },
  bulkActions: {
    padding: 10,
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
});
