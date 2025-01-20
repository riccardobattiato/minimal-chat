import { Redirect, Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useSession } from "~/context/auth";
import "~/global.css";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { SessionProvider } from "~/context/auth";
import UserAvatar from "~/components/profile/user-avatar";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator className="text-primary" />
      </View>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  return (
    <SessionProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Contacts",
              headerRight: () => <UserAvatar link />,
            }}
          />
          <Stack.Screen
            name="sign-up"
            options={{
              title: "Sign Up",
            }}
          />
          <Stack.Screen
            name="chat"
            options={{
              title: "Chat screen",
              headerRight: () => <UserAvatar link />,
            }}
          />
          <Stack.Screen
            name="profile"
            options={{
              title: "Profile",
              headerRight: () => <ThemeToggle />,
            }}
          />
        </Stack>
        <PortalHost />
      </ThemeProvider>
    </SessionProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
