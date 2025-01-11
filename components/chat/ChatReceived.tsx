import { View } from "react-native";
import type { Message } from "~/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import ChatBubble from "./ChatBubble";
import { cn } from "~/lib/utils";
import { hideTimestampIfNeeded } from "~/lib/chat";
import ContactAvatar from "../contacts/ContactAvatar";
import { Contact } from "expo-contacts";
import { Large } from "~/components/ui/typography";

type Props = {
  contact: Contact;
  messages: Message[];
};

const getKey = (message: Message) =>
  `received-${message.timestamp.toISOString()}`;

const ChatReceived = ({ contact, messages }: Props) => {
  return (
    <View className="flex-row gap-3">
      <View>
        <ContactAvatar raw={contact} />
      </View>
      <View className="flex-1">
        <Large>
          {contact.firstName} {contact.lastName}
        </Large>
        <View className="mt-3 gap-2.5 items-start">
          {messages.map((message, i) => (
            <View key={getKey(message)}>
              <ChatBubble
                content={message.content}
                timestamp={hideTimestampIfNeeded(messages, i)}
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ChatReceived;
