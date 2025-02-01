import { useTimerStore } from "@/store/useTimerStore";
import { useState } from "react";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

const useCreate = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [category, setCategory] = useState("Workout"); // ✅ Default category
  const [halfwayAlert, setHalfwayAlert] = useState(false); // ✅ Toggle state for halfway alert

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
      halfwayAlert, // ✅ New property: Store user preference
      halfwayAlertTriggered: false, // ✅ Ensure it's reset on timer creation
    });

    setName("");
    setDuration("");
    setCategory("Workout"); // Reset to default
    setHalfwayAlert(false); // Reset halfway alert switch
    Alert.alert("Success", "Timer added!");
  };
  return {
    setName,
    duration,
    name,
    setDuration,
    category,
    setCategory,
    halfwayAlert,
    setHalfwayAlert,
    handleCreateTimer,
  };
};

export default useCreate;
