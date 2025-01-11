import * as Contacts from "expo-contacts";
import { View, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { H4 } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type Props = {
  raw: Contacts.Contact;
};

const ContactEntry = ({ raw }: Props) => {
  const avatarFallback = `${raw.firstName?.charAt(0)}${raw.lastName?.charAt(
    1
  )}`;
  return (
    <Pressable>
      <View className="flex-row items-center">
        <View className="mr-2">
          <Avatar alt={`${raw.firstName} ${raw.lastName}'s avatar`}>
            <AvatarImage source={{ uri: "" }} />
            <AvatarFallback>
              <Text className="uppercase">{avatarFallback}</Text>
            </AvatarFallback>
          </Avatar>
        </View>
        <View>
          <View>
            <H4>
              {raw.firstName} {raw.lastName}
            </H4>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ContactEntry;
