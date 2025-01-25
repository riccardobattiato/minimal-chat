import { AuthError, Session, User } from "@supabase/supabase-js";
import { supabase } from "~/lib/supabase";
import {
  Profile,
  ProfileCheckResult,
  ProfileCheckState,
} from "~/types/auth.types";

export async function checkSession(): Promise<Session | AuthError | null> {
  const { data, error } = await supabase.auth.getSession();
  if (data.session) return data.session;
  return error;
}

export async function signByPhone(
  phoneNumber: string,
): Promise<AuthError | null> {
  const { error } = await supabase.auth.signInWithOtp({
    phone: phoneNumber,
  });
  return error;
}

export async function checkOtp(
  phoneNumber: string,
  otp: string,
): Promise<User | AuthError | null> {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phoneNumber,
    token: otp,
    type: "sms",
  });
  if (data.user) return data.user;
  return error;
}

export async function checkProfile(
  session: Session,
): Promise<ProfileCheckResult> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .single();
  if (data) return { status: ProfileCheckState.PROFILE_FOUND, data };
  if (error && error.code === "PGRST116") {
    return { status: ProfileCheckState.PROFILE_NOT_FOUND };
  }
  return { status: ProfileCheckState.ERROR, error };
}
