import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useCreate from "@/hooks/timer/useCreate";
import { useTheme } from "@react-navigation/native"; // ✅ Import theme hook

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
      <Text style={[styles.label, { color: colors.text }]}>Timer Name:</Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={name}
        onChangeText={setName}
        placeholder="Enter Timer Name"
        placeholderTextColor={colors.text + "99"} // ✅ Light placeholder color
      />

      <Text style={[styles.label, { color: colors.text }]}>
        Duration (seconds):
      </Text>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholder="Enter Duration"
        placeholderTextColor={colors.text + "99"}
      />

      <Text style={[styles.label, { color: colors.text }]}>Category:</Text>
      <View style={[styles.pickerContainer, { borderColor: colors.border }]}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={[styles.picker, { color: colors.text }]}
          dropdownIconColor={colors.text} // ✅ Proper dropdown styling
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
          Enable Halfway Alert:
        </Text>
        <Switch
          value={halfwayAlert}
          onValueChange={setHalfwayAlert}
          thumbColor={colors.primary} // ✅ Themed switch color
          trackColor={{ false: "#767577", true: colors.primary }}
        />
      </View>

      <Button
        title="Create Timer"
        onPress={handleCreateTimer}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  label: { fontSize: 16, marginVertical: 5 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
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
});
