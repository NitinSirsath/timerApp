import { Pressable, StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";
import { MaterialIcons } from "@expo/vector-icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === "dark";

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <Text style={[styles.text, { color: isDarkMode ? "#FFF" : "#333" }]}>
        {isDarkMode ? "Dark mode" : "Light mode"}
      </Text>
      <MaterialIcons
        name={isDarkMode ? "dark-mode" : "light-mode"}
        size={24}
        color={isDarkMode ? "#FFD700" : "#333"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 8,
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
