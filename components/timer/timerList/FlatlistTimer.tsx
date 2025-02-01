import { Timer } from "@/store/useTimerStore";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { Card, IconButton, Button, Divider } from "react-native-paper";
import Animated, {
  Layout,
  FadeIn,
  FadeOut,
  BounceIn,
} from "react-native-reanimated";

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
        <Animated.View
          layout={Layout.springify()}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={styles.categoryContainer}
        >
          {/* Expand/Collapse Header */}
          <Card
            style={[styles.categoryHeader, { backgroundColor: colors.card }]}
            mode="elevated"
          >
            <Card.Title
              title={`${category} (${groupedTimers[category].length})`}
              titleStyle={[styles.categoryTitle, { color: colors.text }]}
              right={(props) => (
                <IconButton
                  {...props}
                  icon={() => (
                    <MaterialIcons
                      name={
                        expandedCategories[category]
                          ? "keyboard-arrow-up"
                          : "keyboard-arrow-down"
                      }
                      size={24}
                      color={colors.text}
                    />
                  )}
                  onPress={() => toggleCategory(category)}
                />
              )}
            />
          </Card>

          {/* Bulk Actions for Category */}
          {expandedCategories[category] && (
            <Animated.View
              entering={FadeIn.duration(300)}
              exiting={FadeOut.duration(200)}
              style={[styles.bulkActions, { backgroundColor: colors.card }]}
            >
              <Button
                mode="contained"
                onPress={() => startAllTimersInCategory(category)}
              >
                Start All
              </Button>
              <Button
                mode="contained"
                onPress={() => pauseAllTimersInCategory(category)}
              >
                Pause All
              </Button>
              <Button
                mode="contained"
                onPress={() => resetAllTimersInCategory(category)}
              >
                Reset All
              </Button>
            </Animated.View>
          )}

          {/* Timers List */}
          {expandedCategories[category] && (
            <FlatList
              data={groupedTimers[category]}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Animated.View
                  entering={FadeIn.duration(500)}
                  layout={Layout.springify()}
                >
                  <Card
                    style={[styles.timerCard, { backgroundColor: colors.card }]}
                    mode="elevated"
                  >
                    <Card.Content>
                      <Text style={[styles.timerName, { color: colors.text }]}>
                        {item.name}
                      </Text>
                      {item.remainingTime > 0 && (
                        <ProgressBar
                          progress={item.remainingTime / item.duration}
                          width={null}
                          color={colors.primary}
                        />
                      )}
                      <Text style={{ color: colors.text }}>
                        {item.remainingTime} sec remaining
                      </Text>
                    </Card.Content>

                    <Divider />

                    <Card.Actions>
                      {item.status === "paused" && (
                        <Button
                          icon="play-circle"
                          mode="elevated"
                          onPress={() => startTimer(item.id)}
                        >
                          Start
                        </Button>
                      )}
                      {item.status === "running" && (
                        <Button
                          icon="pause-circle"
                          mode="elevated"
                          onPress={() => pauseTimer(item.id)}
                        >
                          Pause
                        </Button>
                      )}
                      <Button
                        icon="restore"
                        mode="elevated"
                        onPress={() => resetTimer(item.id, item.duration)}
                      >
                        Reset
                      </Button>
                      <Button
                        icon="delete"
                        mode="text"
                        onPress={() => deleteTimer(item.id)}
                      >
                        Delete
                      </Button>
                    </Card.Actions>
                  </Card>
                </Animated.View>
              )}
            />
          )}
        </Animated.View>
      )}
    />
  );
};

export default FlatlistTimer;

const styles = StyleSheet.create({
  categoryHeader: {
    borderRadius: 10,
    marginBottom: 5,
  },

  categoryTitle: { fontSize: 18, fontWeight: "bold" },

  categoryContainer: { marginBottom: 10 },

  bulkActions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 5,
  },

  timerCard: {
    marginVertical: 6,
    borderRadius: 10,
  },

  timerName: { fontSize: 16, fontWeight: "bold" },
});
