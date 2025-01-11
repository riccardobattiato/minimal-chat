import * as Contacts from "expo-contacts";
import { Pressable, View } from "react-native";
import { Text } from "~/components/ui/text";
import { H4 } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Link } from "expo-router";
import ContactAvatar from "./ContactAvatar";

type Props = {
  raw: Contacts.Contact;
  onPress?: (id: string) => void;
};

const ContactEntry = ({ raw, onPress }: Props) => {
  const handlePress = () => {
    if (raw.id) onPress?.(raw.id);
  };

  return (
    <Link asChild push href="/chat">
      <Pressable>
        <View className="flex-row items-center">
          <View className="mr-2">
            <ContactAvatar raw={raw} />
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
    </Link>
  );
};

export default ContactEntry;
