import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "~/types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export enum ProfileCheckState {
  PROFILE_FOUND = "profile-found",
  PROFILE_NOT_FOUND = "profile-not-found",
  ERROR = "error",
}

export type ProfileCheckResult =
  | {
      status: ProfileCheckState.PROFILE_FOUND;
      data: Profile;
    }
  | { status: ProfileCheckState.PROFILE_NOT_FOUND; data?: undefined }
  | { status: ProfileCheckState.ERROR; error: PostgrestError | null };
