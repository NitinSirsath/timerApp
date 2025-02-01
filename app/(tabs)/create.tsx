import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TextInput, Button, Switch, Text, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useCreate from "@/hooks/timer/useCreate";
import Animated, { FadeIn } from "react-native-reanimated";

export default function CreateTimerScreen() {
  const {
    setName,
    duration,
    name,
    setDuration,
    category,
    setCategory,
    halfwayAlert,
    setHalfwayAlert,
    handleCreateTimer,
  } = useCreate();

  const { colors, dark } = useTheme();

  return (
    <Animated.View
      style={[styles.container, { backgroundColor: colors.background }]}
      entering={FadeIn.duration(500)}
    >
      <Animated.View entering={FadeIn.duration(500).springify()}>
        <Card
          mode="elevated"
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <Card.Content>
            <TextInput
              label="Timer Name"
              mode="outlined"
              value={name}
              onChangeText={setName}
              placeholder="Enter Timer Name"
              placeholderTextColor={colors.text + "99"}
              style={[
                styles.input,
                {
                  backgroundColor: dark ? "#333" : colors.card,
                  color: colors.text,
                },
              ]}
              outlineColor={colors.border}
              textColor={colors.text}
            />

            <TextInput
              label="Duration (seconds)"
              mode="outlined"
              value={duration}
              onChangeText={setDuration}
              keyboardType="numeric"
              placeholder="Enter Duration"
              placeholderTextColor={colors.text + "99"}
              style={[
                styles.input,
                {
                  backgroundColor: dark ? "#333" : colors.card,
                  color: colors.text,
                },
              ]}
              outlineColor={colors.border}
              textColor={colors.text}
            />

            <Text style={[styles.label, { color: colors.text }]}>Category</Text>
            <View
              style={[
                styles.pickerContainer,
                {
                  borderColor: colors.border,
                  backgroundColor: dark ? "#333" : colors.card,
                },
              ]}
            >
              <Picker
                selectedValue={category}
                onValueChange={setCategory}
                style={[styles.picker, { color: colors.text }]}
                dropdownIconColor={colors.text}
              >
                <Picker.Item
                  label="Workout"
                  value="Workout"
                  color={colors.text}
                />
                <Picker.Item label="Study" value="Study" color={colors.text} />
                <Picker.Item label="Break" value="Break" color={colors.text} />
              </Picker>
            </View>

            <View style={styles.switchContainer}>
              <Text style={[styles.label, { color: colors.text }]}>
                Enable Halfway Alert
              </Text>
              <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
            </View>

            <Button
              mode="contained"
              onPress={handleCreateTimer}
              style={styles.button}
              labelStyle={{ fontSize: 16 }}
            >
              Create Timer
            </Button>
          </Card.Content>
        </Card>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  card: {
    borderRadius: 10,
  },

  input: {
    marginBottom: 12,
    fontSize: 16,
    borderRadius: 8,
  },

  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },

  picker: {
    height: 50,
    width: "100%",
  },

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },

  label: {
    fontSize: 16,
    marginBottom: 5,
  },

  button: {
    marginTop: 15,
    borderRadius: 8,
  },
});
