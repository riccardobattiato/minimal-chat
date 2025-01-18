import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Contact } from "expo-contacts";
import { Text } from "~/components/ui/text";

type Props = {
  raw: Contact;
};

const ContactAvatar = ({ raw }: Props) => {
  const avatarFallback = `${raw.firstName?.charAt(0)}${raw.lastName?.charAt(
    0,
  )}`;

  // Credits https://stackoverflow.com/a/5365036
  const fallbackBg =
    "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");

  return (
    <Avatar alt={`${raw.firstName} ${raw.lastName}'s avatar`}>
      <AvatarImage source={{ uri: "" }} />
      <AvatarFallback style={{ backgroundColor: fallbackBg }}>
        <Text className="text-destructive-foreground uppercase">
          {avatarFallback}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
};

export default ContactAvatar;
