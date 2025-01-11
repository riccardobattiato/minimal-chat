import { View } from "react-native";
import type { Message } from "~/lib/types";
import ChatBubble from "./ChatBubble";
import { hideTimestampIfNeeded } from "~/lib/chat";

type Props = {
  messages: Message[];
};

const getKey = (message: Message) => `sent-${message.timestamp.toISOString()}`;

const ChatSent = ({ messages }: Props) => {
  return (
    <View className="gap-2.5 items-end">
      {messages.map((message, i) => (
        <View key={getKey(message)}>
          <ChatBubble
            content={message.content}
            timestamp={hideTimestampIfNeeded(messages, i)}
            sent
          />
        </View>
      ))}
    </View>
  );
};

export default ChatSent;
