import type { RgRole } from "@/pb/rg-api";

const STYLE: Record<RgRole, string> = {
  pending: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  member: "border-[hsl(150,45%,60%,0.4)] bg-[hsl(150,45%,60%,0.1)] text-[hsl(150,45%,60%)]",
  admin: "border-[hsl(235,85%,65%,0.45)] bg-[hsl(235,85%,65%,0.12)] text-[hsl(235,85%,72%)]",
  owner: "border-[hsl(275,85%,70%,0.45)] bg-[hsl(275,85%,70%,0.12)] text-[hsl(275,85%,76%)]",
};

export const ROLE_LABEL: Record<RgRole, string> = {
  pending: "Pending",
  member: "Member",
  admin: "Admin",
  owner: "Owner",
};

/** The pill's text; a pending account reads "Waiting for approval" rather than a role name. */
const PILL_TEXT: Record<RgRole, string> = { ...ROLE_LABEL, pending: "Waiting for approval" };

export function RolePill({ role }: { role: RgRole }) {
  return (
    <span
      data-testid="role-pill"
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLE[role]}`}
    >
      {PILL_TEXT[role]}
    </span>
  );
}
