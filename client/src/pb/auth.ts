/**
 * Members sign-in state. The SDK's LocalAuthStore keeps the token in localStorage
 * ("pocketbase_auth"); this hook mirrors it into React and refreshes the record once per
 * page load so a role changed by an admin shows up without signing out.
 */
import { useEffect, useSyncExternalStore } from "react";
import { ClientResponseError } from "pocketbase";
import { pb } from "./client";
import type { UsersResponse } from "./types.generated";
import type { RgRole } from "./rg-api";

export type Me = UsersResponse;

// LocalAuthStore parses localStorage on every `record` read, so keep one snapshot object
// per auth change (useSyncExternalStore needs a stable value between changes).
const read = () => (pb && pb.authStore.isValid ? (pb.authStore.record as Me | null) : null);
let current = read();
pb?.authStore.onChange(() => {
  current = read();
});

function subscribe(cb: () => void) {
  return pb
    ? pb.authStore.onChange(() => {
        current = read();
        cb();
      })
    : () => {};
}

const snapshot = () => current;

let refreshed = false;

export function useMe(): Me | null {
  const me = useSyncExternalStore(subscribe, snapshot, () => null);
  useEffect(() => {
    if (!pb || !pb.authStore.isValid || refreshed) return;
    refreshed = true;
    pb.collection("users")
      .authRefresh()
      .catch((e: unknown) => {
        // 401/403/404: the token or the account is gone. Network errors keep the session.
        if (e instanceof ClientResponseError && [401, 403, 404].includes(e.status)) pb!.authStore.clear();
      });
  }, [me?.id]);
  return me;
}

export const roleOf = (me: Me | null): RgRole => (me?.role as RgRole | undefined) ?? "pending";
export const isAdmin = (role: RgRole) => role === "admin" || role === "owner";

export async function requestCode(email: string): Promise<string> {
  const res = await pb!.collection("users").requestOTP(email);
  return res.otpId;
}

export async function signInWithCode(otpId: string, code: string): Promise<void> {
  await pb!.collection("users").authWithOTP(otpId, code);
}

export async function signInWithPassword(email: string, password: string): Promise<void> {
  await pb!.collection("users").authWithPassword(email, password);
}

export function signOut(): void {
  pb?.authStore.clear();
}
