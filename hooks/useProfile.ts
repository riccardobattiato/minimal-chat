import { useMemo } from "react";
import { useSession } from "~/context/auth";

export const useProfile = () => {
  const { session } = useSession();

  const userAvatar = useMemo<string | null>(
    () => session?.user.user_metadata.avatar_url || null,
    [session],
  );

  const userName = useMemo<string>(
    () => session?.user.user_metadata.userName || "Guest",
    [session],
  );

  return { userName, userAvatar };
};
