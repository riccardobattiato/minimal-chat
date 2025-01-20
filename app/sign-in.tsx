import { View, SafeAreaView, ActivityIndicator } from "react-native";
import { useSession } from "~/context/auth";
import { H1, P } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";

export default function SignIn() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);

  const { signIn, submitOtp, isLoading } = useSession();

  // Italian phone number (for now)
  const isValidPhoneNumber =
    phoneNumber && /^(([+]|00)39)?((3[2-9][0-9]))(\d{6,7})$/.test(phoneNumber);

  const enableSubmit = !smsSent ? isValidPhoneNumber : otpCode.length === 6;

  const handleSubmit = async () => {
    if (!smsSent) {
      const success = await signIn(phoneNumber);
      setSmsSent(!!success);
    } else {
      submitOtp(phoneNumber, otpCode);
    }
  };

  return (
    <View className="flex-1 bg-background p-6">
      <SafeAreaView className="">
        {!smsSent && (
          <Animated.View exiting={SlideOutLeft}>
            <View className="mt-4 p-4 items-center">
              <H1 className="text-foreground text-center">Your Phone</H1>
              <P className="text-foreground text-center mt-4 text-xl">
                Please enter your phone number to sign in
              </P>
            </View>
            <View className="mt-8">
              <Input
                inputMode="numeric"
                placeholder="+39 123 456 7890"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            </View>
          </Animated.View>
        )}
        {smsSent && (
          <Animated.View entering={SlideInRight}>
            <View className="mt-4 p-4 items-center">
              <H1 className="text-foreground text-center">OTP Code</H1>
              <P className="text-foreground text-center mt-4 text-xl">
                Please check your SMS and paste here the OTP code you received
              </P>
            </View>
            <View className="mt-8">
              <Input
                inputMode="numeric"
                placeholder="123456"
                value={otpCode}
                onChangeText={setOtpCode}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
                maxLength={6}
              />
            </View>
          </Animated.View>
        )}
        <View className="mt-8">
          <Button disabled={!enableSubmit} onPress={handleSubmit}>
            {!isLoading && <Text>Next</Text>}
            {isLoading && (
              <ActivityIndicator className="text-primary-foreground" />
            )}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
