import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import ThemeToggle from "@/components/theme/ThemeToggle";

// Function to display TabBar Icons
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      {/* Home / Timer List Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Timers",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="clock-o" color={color} />
          ),
          headerRight: () => <ThemeToggle />,
        }}
      />

      {/* Create Timer Screen */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus-circle" color={color} />
          ),
        }}
      />

      {/* Timer History Screen */}
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
