import { View } from "react-native";
import ChatReceived from "~/components/chat/ChatReceived";
import ChatSent from "~/components/chat/ChatSent";
import { Text } from "~/components/ui/text";
import { Message } from "~/lib/types";

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
  return (
    <View className="flex-1 gap-5 p-6 bg-secondary/30">
      <Text>Chat screen</Text>
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
    </View>
  );
}
