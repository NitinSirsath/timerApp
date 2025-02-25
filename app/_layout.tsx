import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useThemeStore } from "@/store/useThemeStore"; // ✅ Import theme store
import NoticePopup from "@/components/notice/NoticePopup";

export {
  ErrorBoundary, // Catch any errors thrown by the Layout component.
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // ✅ Load theme preference when app starts
  const loadTheme = useThemeStore((state) => state.loadTheme);
  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const theme = useThemeStore((state) => state.theme); // ✅ Use Zustand theme

  return (
    <ThemeProvider value={theme === "dark" ? DarkTheme : DefaultTheme}>
      <NoticePopup />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
