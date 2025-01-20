import { Session } from "@supabase/supabase-js";
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "../lib/supabase";
import { AppState } from "react-native";
import { router } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const AuthContext = createContext<{
  signIn: (phoneNumber: string) => Promise<boolean> | null;
  submitOtp: (phoneNumber: string, otp: string) => void;
  signOut: () => void;
  session?: Session | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  submitOtp: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const handlePostLogin = useCallback(async (session: Session) => {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username, avatar_url")
      .eq("id", session.user.id)
      .single();

    console.log("GOT HERE WITH RESULTS", profile, profileError);
    if (profileError && profileError.code === "PGRST116") {
      // Profile not found (new user)
      console.log("New user detected. Requesting profile setup.");
      router.replace("/sign-up");
      return;
    } else if (profileError) {
      console.error("Error fetching profile:", profileError);
    }

    // Existing user
    router.replace("/");
  }, []);

  const handleLogin = useCallback(async (phoneNumber: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    setLoading(false);
    if (data && !error) return true;
    console.error("Error", error);
    return false;
  }, []);

  const handleOtp = useCallback(
    async (phoneNumber: string, otp: string) => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: "sms",
      });
      setLoading(false);
      if (session) {
        setSession(session);
        handlePostLogin(session);
      }
      if (error) {
        console.error("Error", error);
      }
    },
    [handlePostLogin],
  );

  const handleSignOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
    setSession(null);
    router.replace("/sign-in");
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: handleLogin,
        submitOtp: handleOtp,
        signOut: handleSignOut,
        session,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// TODO move all of this out of here ASAP
export async function updateUserProfile(username: string) {
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error fetching session:", sessionError);
    return;
  }

  const userId = session?.session?.user.id;

  const { error: updateError } = await supabase
    .from("profiles")
    .insert([{ id: userId, username }]);

  if (updateError) {
    console.error("Error updating profile:", updateError);
    return;
  }

  console.log("Profile updated successfully.");
}
