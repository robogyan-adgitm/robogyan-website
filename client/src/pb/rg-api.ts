/**
 * Request and response shapes of the custom routes implemented in pb_hooks/.
 * Hand-written on purpose (the routes are not collections, so typegen cannot see them).
 * Copied verbatim into the app and the website by `npm run sync-types`.
 *
 * Errors from every route use PocketBase's standard error body (`RgErrorResponse`).
 * Request bodies are JSON; unknown fields are rejected with HTTP 400.
 *
 * This file has no imports so it can be copied next to the generated types under any name.
 * RgRole and RgCodePurpose mirror UsersRoleOptions and GateCodesPurposeOptions of the
 * generated file; types/drift.check.ts (part of `npm run check`) fails if they drift apart.
 */
export type RgRole = "pending" | "member" | "admin" | "owner";
export type RgCodePurpose = "self" | "share";

/** Paths of the custom routes, relative to the PocketBase base URL. */
export const RgRoutes = {
  issueCode: "/api/rg/issue-code",
  setPassword: "/api/rg/set-password",
  members: "/api/rg/members",
  member: (id: string) => `/api/rg/members/${encodeURIComponent(id)}`,
} as const;

/** PocketBase's standard error body. */
export interface RgErrorResponse {
  status: number;
  message: string;
  data: Record<string, { code: string; message: string }>;
}

// ---------------------------------------------------------------------------
// POST /api/rg/issue-code  (auth: member+ for "self", admin+ for "share")
// 400 bad body, 403 role, 429 more than 20 codes in the last hour, 503 clock skew.

export interface IssueCodeRequest {
  purpose: RgCodePurpose;
  /** Free text shown in the audit log, trimmed to 60 chars, control characters removed. */
  label?: string;
}

export interface IssueCodeResponse {
  /** Canonical code `T6-H8` with H8 in lowercase hex, e.g. "0ELB40-1f00945c". */
  code: string;
  /** Display form `T6-H8` with H8 upper-cased, e.g. "0ELB40-1F00945C". */
  display: string;
  /** Issue time in unix seconds (encoded in T6). */
  ts: number;
  /** Unix seconds after which the gate rejects the code: ts + gate_settings.validity_seconds. */
  expiresAt: number;
}

// ---------------------------------------------------------------------------
// POST /api/rg/set-password  (auth: any signed-in user, including pending)
// Sets the password, marks password_set = true and returns a fresh auth token
// (changing the password invalidates the previous token).

export interface SetPasswordRequest {
  /** 10..72 characters. */
  password: string;
  passwordConfirm: string;
}

/** Use as SetPasswordResponse<UsersResponse> with the generated UsersResponse. */
export interface SetPasswordResponse<TUser = Record<string, unknown>> {
  token: string;
  record: TUser;
}

// ---------------------------------------------------------------------------
// Members administration (auth: admin+). Guards (BACKEND.md section 1) apply:
// nobody changes their own role, only owners grant or revoke admin/owner,
// admins only move accounts between pending and member and cannot edit
// admins or owners, the last owner cannot be demoted.

export interface RgMember {
  id: string;
  email: string;
  name: string;
  role: RgRole;
  password_set: boolean;
  verified: boolean;
  /** team_members id or "" */
  member_of: string;
  notes: string;
  created: string;
  updated: string;
}

/** GET /api/rg/members?role=<role>  (role filter optional) */
export interface ListMembersResponse {
  items: RgMember[];
}

/** POST /api/rg/members  -> RgMember (201). 409 if the email already has an account. */
export interface CreateMemberRequest {
  email: string;
  name: string;
  /** Default "pending". Admins may only use pending or member. */
  role?: RgRole;
  member_of?: string;
  notes?: string;
}

/** PATCH /api/rg/members/{id}  -> RgMember. Send only the fields to change. */
export interface UpdateMemberRequest {
  name?: string;
  role?: RgRole;
  member_of?: string;
  notes?: string;
}
