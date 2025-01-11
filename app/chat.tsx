import { useEffect, useState } from "react";
import { View } from "react-native";
import ChatBubble from "~/components/chat/ChatBubble";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      <Text>Chat screen</Text>
      <ChatBubble content="Lorem ipsum" timestamp="00:00 AM" />
      <ChatBubble content="Bacon kebab cheddar" sent timestamp="00:00 AM" />
    </View>
  );
}
