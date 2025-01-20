import { View, SafeAreaView } from "react-native";
import { useSession } from "~/context/auth";
import { H1, P } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

export default function Profile() {
  const { signIn, submitOtp, isLoading, signOut } = useSession();

  return (
    <View className="flex-1 bg-background p-6">
      <SafeAreaView className="">
        <View>
          <Text>Profile</Text>
        </View>
        <View>
          <Button variant="link" onPress={signOut}>
            <Text>Sign Out</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
