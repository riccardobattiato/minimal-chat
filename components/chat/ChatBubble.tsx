import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { Small } from "~/components/ui/typography";
import { cn } from "~/lib/utils";

type Props = {
  sent?: boolean;
  content: string;
  timestamp: string;
};

const ChatBubble = ({ content, sent, timestamp }: Props) => {
  return (
    <View>
      <View
        className={cn("rounded-2xl px-6 py-3", {
          "bg-primary rounded-tr-none": sent,
          "bg-secondary rounded-tl-none": !sent,
        })}
      >
        <Text
          className={cn({
            "text-primary-foreground": sent,
            "text-secondary-foreground": !sent,
          })}
        >
          {content}
        </Text>
      </View>
      <View className="mt-2 items-end">
        <Small>{timestamp}</Small>
      </View>
    </View>
  );
};

export default ChatBubble;
