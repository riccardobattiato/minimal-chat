import { useState } from "react";
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Vibration,
} from "react-native";
import ChatReceived from "~/components/chat/ChatReceived";
import ChatSent from "~/components/chat/ChatSent";
import { Input } from "~/components/ui/input";
import type { Message } from "~/lib/types";
import SendButton from "~/components/chat/SendButton";

const received: Message[] = [
  {
    content: "Hellooo",
    timestamp: new Date("2025-01-11T14:09:30.308Z"),
  },
  {
    content:
      "Prosciutto tail tri-tip pancetta doner shank. Hamburger shank jerky jowl tongue bresaola short loin turkey bacon tenderloin tail pork loin kevin meatloaf prosciutto. Biltong boudin andouille pork chop jerky chicken, venison cupim ham.",
    timestamp: new Date("2025-01-11T14:09:30.358Z"),
  },
];

const sent: Message[] = [
  {
    content: "Bacon kebab cheddar",
    timestamp: new Date("2025-01-11T14:09:26.358Z"),
  },
  {
    content: "Sent slightly after",
    timestamp: new Date("2025-01-11T14:09:36.358Z"),
  },
  {
    content: "Sent way later",
    timestamp: new Date("2025-01-11T20:09:36.358Z"),
  },
];

export default function Screen() {
  const [value, setValue] = useState("");
  const [urgent, setUrgent] = useState(false);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const handleSend = () => {
    console.log("Send");
  };

  const toggleUrgency = () => {
    console.log("long press");
    Vibration.vibrate(30)
    setUrgent((value) => !value);
  };
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior="padding"
        className="flex-1 bg-secondary/30"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
          className="flex-1 -scale-y-100"
          contentContainerClassName="-scale-y-100 gap-5 p-6"
        >
          <ChatReceived
            contact={{
              firstName: "Lorem",
              lastName: "Ipsum",
              name: "Lorem Ipsum",
              contactType: "person",
            }}
            messages={received}
          />
          <ChatSent messages={sent} />
          <ChatReceived
            contact={{
              firstName: "Lorem",
              lastName: "Ipsum",
              name: "Lorem Ipsum",
              contactType: "person",
            }}
            messages={received}
          />
          <ChatSent messages={sent} />
        </ScrollView>
        <View className="mt-auto p-6">
          <View className="flex-row items-center gap-x-4">
            <Input
              placeholder="Write some stuff..."
              value={value}
              onChangeText={onChangeText}
              aria-labelledby="inputLabel"
              aria-errormessage="inputError"
              className="flex-1"
            />
            <View>
              <SendButton urgent={urgent} onPress={handleSend} onLongPress={toggleUrgency} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
