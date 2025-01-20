import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { useSession } from "~/context/auth";
import { Text } from "~/components/ui/text";
import { H1, P } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const { signIn, submitOtp, isLoading } = useSession();

  const handleSubmit = () => {
    console.log(username);
  };

  return (
    <View className="flex-1 bg-background p-6">
      <SafeAreaView className="">
        <View className="mt-4 p-4 items-center">
          <H1 className="text-foreground text-center">Your Profile</H1>
          <P className="text-foreground text-center mt-4 text-xl">
            Pick a username
          </P>
        </View>
        <View className="mt-4">
          <Label nativeID="username">Username</Label>
          <Input
            placeholder="Pick a nice name..."
            value={username}
            onChangeText={setUsername}
            aria-labelledby="inputLabel"
            aria-errormessage="inputError"
            className="mt-2"
          />
        </View>
        <View className="mt-8">
          <Button disabled={!username} onPress={handleSubmit}>
            {!isLoading && (
              <Text className="text-primary-foreground">Next</Text>
            )}
            {isLoading && (
              <ActivityIndicator className="text-primary-foreground" />
            )}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
