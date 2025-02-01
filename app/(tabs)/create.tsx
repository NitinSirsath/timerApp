import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  Switch,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTimerStore } from "@/store/useTimerStore";
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Duration (seconds):</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Workout" value="Workout" />
          <Picker.Item label="Study" value="Study" />
          <Picker.Item label="Break" value="Break" />
          <Picker.Item label="Custom" value="Custom" />
        </Picker>
      </View>

      {/* ✅ Halfway Alert Toggle */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Enable Halfway Alert:</Text>
        <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
      </View>

      <Button title="Create Timer" onPress={handleCreateTimer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginVertical: 5 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
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
