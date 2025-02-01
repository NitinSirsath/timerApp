import { View, Pressable, StyleSheet, Text } from "react-native";
import { useThemeStore } from "@/store/useThemeStore";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Pressable onPress={toggleTheme} style={styles.container}>
      <Text
        style={[styles.text, { color: theme === "dark" ? "#FFF" : "#333" }]}
      >
        {theme === "light" ? "Light mode" : "Dark mode"}
      </Text>
      <FontAwesome
        name={theme === "dark" ? "moon-o" : "sun-o"}
        size={24}
        color={theme === "dark" ? "#FFD700" : "#333"}
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
    paddingHorizontal: 15, // ✅ Increased touchable area
    gap: 8,
    borderRadius: 10, // ✅ Slightly rounded edges for better UI
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
