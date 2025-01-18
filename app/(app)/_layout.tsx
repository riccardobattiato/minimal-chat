import { Text } from "react-native";
import { Redirect, Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

import { useSession } from "~/lib/auth";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contacts",
          headerRight: () => <ThemeToggle />,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: "Chat screen",
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
