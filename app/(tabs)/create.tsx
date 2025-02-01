import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { TextInput, Button, Switch, Text, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useCreate from "@/hooks/timer/useCreate";

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

  const { colors } = useTheme(); // ✅ Get theme-based colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card mode="elevated" style={styles.card}>
        <Card.Content>
          {/* ✅ Timer Name */}
          <TextInput
            label="Timer Name"
            mode="outlined"
            value={name}
            onChangeText={setName}
            placeholder="Enter Timer Name"
            placeholderTextColor={colors.text + "99"}
            style={[styles.input, { backgroundColor: colors.card }]}
            outlineColor={colors.border}
            textColor={colors.text}
          />

          {/* ✅ Duration Input */}
          <TextInput
            label="Duration (seconds)"
            mode="outlined"
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
            placeholder="Enter Duration"
            placeholderTextColor={colors.text + "99"}
            style={[styles.input, { backgroundColor: colors.card }]}
            outlineColor={colors.border}
            textColor={colors.text}
          />

          {/* ✅ Category Picker */}
          <Text style={[styles.label, { color: colors.text }]}>Category</Text>
          <View
            style={[styles.pickerContainer, { borderColor: colors.border }]}
          >
            <Picker
              selectedValue={category}
              onValueChange={setCategory}
              style={[styles.picker, { color: colors.text }]}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label="Workout" value="Workout" />
              <Picker.Item label="Study" value="Study" />
              <Picker.Item label="Break" value="Break" />
              <Picker.Item label="Custom" value="Custom" />
            </Picker>
          </View>

          {/* ✅ Halfway Alert Toggle */}
          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: colors.text }]}>
              Enable Halfway Alert
            </Text>
            <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
          </View>

          {/* ✅ Create Timer Button */}
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
    </View>
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
  },

  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
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
