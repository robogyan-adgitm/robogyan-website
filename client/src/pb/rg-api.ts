/**
 * Request and response shapes of the custom routes implemented in pb_hooks/.
 * Hand-written on purpose (the routes are not collections, so typegen cannot see them).
 * Copied verbatim into the app and the website by `npm run sync-types`.
 *
 * Errors from every route use PocketBase's standard error body (`RgErrorResponse`).
 * Request bodies are JSON (join/request also accepts multipart/form-data); unknown fields are
 * rejected with HTTP 400.
 *
 * This file has no imports so it can be copied next to the generated types under any name.
 * RgRole, RgCodePurpose, RgJoinRole, RgJoinStatus and RgTicketPerms mirror the select options of
 * the generated file (UsersRoleOptions, GateCodesPurposeOptions, JoinRequestsRequestedRoleOptions,
 * JoinRequestsStatusOptions, GateTicketsPermsOptions), and CARD_FLAGS the can_*_cards fields of
 * UsersRecord; types/drift.check.ts (part of `npm run check`) fails if they drift apart.
 */
export type RgRole = "pending" | "member" | "admin" | "owner";
export type RgCodePurpose = "self" | "share";
/** Role a person may ask for when joining. */
export type RgJoinRole = "member" | "admin";
export type RgJoinStatus = "unverified" | "pending" | "approved" | "rejected";
/** Gate ticket permissions: "u" unlock only, "a" every admin command (GATE_PROTOCOL.md 9.1). */
export type RgTicketPerms = "u" | "a";

/**
 * Card permissions on a users record (booleans, default false). Admins and owners can do all of
 * this without any flag. Accounts created or promoted to member/admin/owner get can_view_cards and
 * can_claim_cards unless the request sets them. Nobody changes their own flags.
 * - can_view_cards: list/view every gate_cards row (without it: only cards whose user is you)
 * - can_add_cards: create gate_cards rows (user empty or yourself; on_gate/synced_at are ignored)
 * - can_delete_cards: delete gate_cards rows
 * - can_toggle_cards: change `enabled` (and nothing else) on any card
 * - can_claim_cards: set `user` from empty to yourself, or from yourself to empty
 * add, delete and toggle also earn an "a" gate ticket (see GateTicketResponse).
 */
export const CARD_FLAGS = ["can_view_cards", "can_add_cards", "can_delete_cards", "can_toggle_cards", "can_claim_cards"] as const;
export type RgCardFlag = (typeof CARD_FLAGS)[number];

/** Paths of the custom routes, relative to the PocketBase base URL. */
export const RgRoutes = {
  issueCode: "/api/rg/issue-code",
  setPassword: "/api/rg/set-password",
  members: "/api/rg/members",
  member: (id: string) => `/api/rg/members/${encodeURIComponent(id)}`,
  gateTicket: "/api/rg/gate-ticket",
  joinRequest: "/api/rg/join/request",
  joinVerify: "/api/rg/join/verify",
  /** GET, optional query `?status=pending|approved|rejected|all` (default pending). */
  joinList: "/api/rg/join",
  joinApprove: (id: string) => `/api/rg/join/${encodeURIComponent(id)}/approve`,
  joinReject: (id: string) => `/api/rg/join/${encodeURIComponent(id)}/reject`,
} as const;

/** PocketBase's standard error body. */
export interface RgErrorResponse {
  status: number;
  message: string;
  data: Record<string, { code: string; message: string }>;
}

// ---------------------------------------------------------------------------
// POST /api/rg/issue-code  (auth: member+ or gate_access for "self", admin+ for "share")
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
// POST /api/rg/gate-ticket  (auth: member+, gate_access or a card-management flag; GATE_PROTOCOL.md 9)
// Body {} (no fields). 403 when the account gets neither perms, 429 after 30 tickets in an hour.
// The firmware only knows "u" (unlock) and "a" (every admin command), so card management on the
// gate (add, delete, enable/disable) needs an "a" ticket: an account with can_add_cards,
// can_delete_cards or can_toggle_cards gets "a" like an admin, which on the gate also allows the
// other admin commands. can_view_cards and can_claim_cards do not change the ticket.

export type GateTicketRequest = Record<string, never>;

export interface GateTicketResponse {
  /** "T1-<user id>-<T6 expiry>-<perms>", 27 chars, e.g. "T1-k2j9x8w7v6u5t4s-0ELB40-a". */
  ticket: string;
  /** K = HMAC-SHA256(seed, "RGTKT1:" + ticket) as 64 lowercase hex chars. Keep it secret. */
  key: string;
  /** Unix seconds: now + gate_settings.ticket_hours * 3600 (also encoded in the ticket). */
  expiresAt: number;
  /**
   * "a" for admin/owner or an account with can_add_cards, can_delete_cards or can_toggle_cards;
   * otherwise "u" for member+ or gate_access.
   */
  perms: RgTicketPerms;
}

// ---------------------------------------------------------------------------
// POST /api/rg/set-password  (auth: any signed-in user, including pending)
// Sets the password, marks password_set = true and returns a fresh auth token
// (changing the password invalidates the previous token). Until then password
// sign-in fails with PocketBase's generic 400 "Failed to authenticate.".

export interface SetPasswordRequest {
  /** 10..64 characters. */
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
// nobody changes their own role, gate_access or card flags, only owners grant or revoke
// admin/owner, admins only move accounts between pending and member and cannot edit
// admins or owners, the last owner cannot be demoted.
//
// Accounts edit their own profile through the collection API instead:
// PATCH /api/collections/users/records/{own id} with only name, about and picture (JSON or
// multipart; "picture-" removes the file). Any other field is a 400 with a field error.

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
  /** Opens the gate from the app even when the role does not (pending guest, alumnus). */
  gate_access: boolean;
  /** Short info, up to 500 chars. */
  about: string;
  /**
   * File name of the profile picture on the users record ("" if none). Build the URL with the
   * PocketBase file API (collection "users", this record's id, this name).
   */
  picture: string;
  /** List/view every gate_cards row (without it only cards assigned to the account). */
  can_view_cards: boolean;
  /** Create gate_cards rows (user empty or the account itself). Earns an "a" gate ticket. */
  can_add_cards: boolean;
  /** Delete gate_cards rows. Earns an "a" gate ticket. */
  can_delete_cards: boolean;
  /** Change `enabled` on any card (nothing else). Earns an "a" gate ticket. */
  can_toggle_cards: boolean;
  /** Set a card's `user` from empty to the account, or from the account to empty. */
  can_claim_cards: boolean;
  created: string;
  updated: string;
}

/** GET /api/rg/members?role=<role>  (role filter optional) */
export interface ListMembersResponse {
  items: RgMember[];
}

/**
 * POST /api/rg/members  -> RgMember (201). 409 if the email already has an account.
 * Card flags left out default to false, except can_view_cards and can_claim_cards, which default
 * to true when the role is member, admin or owner.
 */
export interface CreateMemberRequest {
  email: string;
  name: string;
  /** Default "pending". Admins may only use pending or member. */
  role?: RgRole;
  member_of?: string;
  notes?: string;
  gate_access?: boolean;
  /** Up to 500 chars. */
  about?: string;
  /** List/view every gate_cards row (without it only cards assigned to the account). */
  can_view_cards?: boolean;
  /** Create gate_cards rows (user empty or the account itself). Earns an "a" gate ticket. */
  can_add_cards?: boolean;
  /** Delete gate_cards rows. Earns an "a" gate ticket. */
  can_delete_cards?: boolean;
  /** Change `enabled` on any card (nothing else). Earns an "a" gate ticket. */
  can_toggle_cards?: boolean;
  /** Set a card's `user` from empty to the account, or from the account to empty. */
  can_claim_cards?: boolean;
}

/**
 * PATCH /api/rg/members/{id}  -> RgMember. Send only the fields to change.
 * Every field follows the role-change target rules (admins: pending/member accounts and
 * themselves; owners: anyone); nobody changes their own role, gate_access or card flags (403).
 * Promoting a pending account to member/admin/owner turns on can_view_cards and can_claim_cards
 * unless the same request sets them.
 */
export interface UpdateMemberRequest {
  name?: string;
  role?: RgRole;
  member_of?: string;
  notes?: string;
  gate_access?: boolean;
  /** Up to 500 chars. */
  about?: string;
  /** List/view every gate_cards row (without it only cards assigned to the account). */
  can_view_cards?: boolean;
  /** Create gate_cards rows (user empty or the account itself). Earns an "a" gate ticket. */
  can_add_cards?: boolean;
  /** Delete gate_cards rows. Earns an "a" gate ticket. */
  can_delete_cards?: boolean;
  /** Change `enabled` on any card (nothing else). Earns an "a" gate ticket. */
  can_toggle_cards?: boolean;
  /** Set a card's `user` from empty to the account, or from the account to empty. */
  can_claim_cards?: boolean;
}

// ---------------------------------------------------------------------------
// Self-registration (BACKEND.md 6.1). join/request and join/verify need no auth;
// list, approve and reject need admin+.

/**
 * POST /api/rg/join/request  -> JoinRequestResponse. Always 200 { sent: true }, whether the
 * email is free, already has an account or already has an open request, and when rate limited.
 * Send JSON, or multipart/form-data with the same fields plus an optional `picture` file
 * (image, at most 4 MB). 400 only for a malformed body (bad email, empty name, bad picture).
 * A verification code (8 digits, valid 15 minutes) is mailed to the address.
 */
export interface JoinRequestRequest {
  email: string;
  name: string;
  /** Short info, up to 500 chars. */
  about?: string;
  /** Default "member". */
  requested_role?: RgJoinRole;
}

export interface JoinRequestResponse {
  sent: true;
}

/**
 * POST /api/rg/join/verify  -> JoinVerifyResponse. 400 for a wrong or expired code; after 5
 * wrong codes the code is void and the person must send join/request again (a resend).
 */
export interface JoinVerifyRequest {
  email: string;
  /** The 8-digit code from the mail (spaces and hyphens are ignored). */
  code: string;
}

export interface JoinVerifyResponse {
  status: "pending";
}

/** A verified join request as admins see it. Dates are PocketBase date strings ("" if unset). */
export interface RgJoinRequest {
  id: string;
  /** For building the picture URL with the PocketBase file API. */
  collectionId: string;
  collectionName: "join_requests";
  email: string;
  name: string;
  about: string;
  /** File name ("" if none). */
  picture: string;
  requested_role: RgJoinRole;
  /** Never "unverified" in replies. */
  status: RgJoinStatus;
  verified_at: string;
  /** users id of the reviewing admin, or "". */
  reviewed_by: string;
  reviewed_at: string;
  decision_note: string;
  /** users id of the account created on approval, or "". */
  user: string;
  created: string;
  updated: string;
}

/** GET /api/rg/join?status=pending|approved|rejected|all  (default pending; newest first, at most 500). */
export interface ListJoinRequestsResponse {
  items: RgJoinRequest[];
}

/**
 * POST /api/rg/join/{id}/approve  -> RgMember (201). Creates the account like
 * POST /api/rg/members and copies name, about and picture. role defaults to requested_role and
 * follows the role matrix (admins may only grant pending or member, 403 otherwise).
 * 404 unknown request, 409 if the request is not pending or the email already has an account.
 */
export interface ApproveJoinRequest {
  role?: RgRole;
  gate_access?: boolean;
}

/** POST /api/rg/join/{id}/reject  -> RejectJoinResponse. 404 unknown, 409 not pending. */
export interface RejectJoinRequest {
  /** Mailed to the person; up to 500 chars. */
  note?: string;
}

export interface RejectJoinResponse {
  ok: true;
}
