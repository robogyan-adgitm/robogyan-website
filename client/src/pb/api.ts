/**
 * The one typed module for the backend's custom /api/rg/* routes (docs/BACKEND.md),
 * plus the members-area reads of `gate_cards` / `gate_settings` and error formatting.
 * Never logs tokens, codes or passwords.
 */
import { ClientResponseError, type RecordModel } from "pocketbase";
import { pb } from "./client";
import {
  RgRoutes,
  type CreateMemberRequest,
  type IssueCodeRequest,
  type IssueCodeResponse,
  type ListMembersResponse,
  type RgMember,
  type RgRole,
  type SetPasswordRequest,
  type SetPasswordResponse,
  type UpdateMemberRequest,
} from "./rg-api";
import type { GateCardsResponse, GateSettingsResponse, TypedPocketBase, UsersResponse } from "./types.generated";

export const GATE_SETTINGS_ID = "gatesettings0001";

export class OfflineError extends Error {
  constructor() {
    super("The members area is not connected to a server on this build.");
  }
}

function client(): TypedPocketBase {
  if (!pb) throw new OfflineError();
  return pb;
}

export async function setPassword(body: SetPasswordRequest): Promise<void> {
  const c = client();
  const res = await c.send<SetPasswordResponse<UsersResponse>>(RgRoutes.setPassword, { method: "POST", body });
  // The old token is invalid after a password change; keep the session with the new one.
  c.authStore.save(res.token, res.record as unknown as RecordModel);
}

export function listMembers(role?: RgRole): Promise<ListMembersResponse> {
  return client().send<ListMembersResponse>(RgRoutes.members, { query: role ? { role } : undefined });
}

export function createMember(body: CreateMemberRequest): Promise<RgMember> {
  return client().send<RgMember>(RgRoutes.members, { method: "POST", body });
}

export function updateMember(id: string, body: UpdateMemberRequest): Promise<RgMember> {
  return client().send<RgMember>(RgRoutes.member(id), { method: "PATCH", body });
}

export function issueCode(body: IssueCodeRequest): Promise<IssueCodeResponse> {
  return client().send<IssueCodeResponse>(RgRoutes.issueCode, { method: "POST", body });
}

export type GateCard = GateCardsResponse<{ user?: UsersResponse }>;

export function listGateCards(): Promise<GateCard[]> {
  return client().collection("gate_cards").getFullList<GateCard>({ sort: "name", expand: "user" });
}

export function getGateSettings(): Promise<GateSettingsResponse> {
  return client().collection("gate_settings").getOne(GATE_SETTINGS_ID);
}

export function updateGateValidity(validitySeconds: number): Promise<GateSettingsResponse> {
  return client().collection("gate_settings").update(GATE_SETTINGS_ID, { validity_seconds: validitySeconds });
}

/**
 * A sentence for the UI from any error: PocketBase's message plus field messages, or a
 * plain explanation for network failures and rate limits.
 */
export function errorMessage(e: unknown): string {
  if (e instanceof ClientResponseError) {
    if (e.isAbort || e.status === 0) return "Can't reach the server. Check your connection and try again.";
    if (e.status === 429) return "Too many attempts. Wait a few minutes and try again.";
    const body = e.response as { message?: string; data?: Record<string, { message?: string }> };
    const fields = Object.entries(body?.data ?? {})
      .map(([field, v]) => (v?.message ? `${field}: ${v.message}` : ""))
      .filter(Boolean);
    const base = body?.message || e.message || `Request failed (${e.status}).`;
    return fields.length ? `${base} ${fields.join("; ")}` : base;
  }
  return e instanceof Error ? e.message : "Something went wrong.";
}

export const isStatus = (e: unknown, status: number) => e instanceof ClientResponseError && e.status === status;
