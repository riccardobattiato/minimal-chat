import { Link } from "expo-router";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { useProfile } from "~/hooks/useProfile";

type Props = {
  link?: boolean;
};

const UserAvatar = ({ link }: Props) => {
  const { userName, userAvatar } = useProfile();
  const avatarFallback =
    `${userName.charAt(0)}${userName.charAt(1)}`.toUpperCase();

  // Credits https://stackoverflow.com/a/5365036
  const fallbackBg =
    "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
  return (
    <Link href="/profile" disabled={!link}>
      <Avatar alt={`${userName}'s avatar`}>
        <AvatarImage source={{ uri: userAvatar || "" }} />
        <AvatarFallback style={{ backgroundColor: fallbackBg }}>
          <Text className="text-destructive-foreground uppercase">
            {avatarFallback}
          </Text>
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};

export default UserAvatar;
