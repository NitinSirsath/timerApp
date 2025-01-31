import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker"; // ✅ Import Picker
import { useTimerStore } from "@/store/useTimerStore";
import uuid from "react-native-uuid";

export default function CreateTimerScreen() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Workout"); // ✅ Default category

  const addTimer = useTimerStore((state) => state.addTimer);

  const handleCreateTimer = () => {
    if (!name || !duration || !category) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    addTimer({
      id: uuid.v4() as string, // ✅ Use react-native-uuid
      name,
      duration: Number(duration),
      remainingTime: Number(duration),
      category,
      status: "paused",
    });

    setName("");
    setDuration("");
    setCategory("Workout"); // Reset to default
    Alert.alert("Success", "Timer added!");
  };

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
});
