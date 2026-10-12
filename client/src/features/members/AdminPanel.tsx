import { useMemo, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  createMember,
  errorMessage,
  getGateSettings,
  listGateCards,
  listMembers,
  updateGateValidity,
  updateMember,
} from "@/pb/api";
import type { Me } from "@/pb/auth";
import type { RgMember, RgRole } from "@/pb/rg-api";
import { ROLE_LABEL, RolePill } from "./RolePill";

const ALL_ROLES: RgRole[] = ["pending", "member", "admin", "owner"];
const ORDER: Record<RgRole, number> = { pending: 0, owner: 1, admin: 2, member: 3 };

/**
 * Roles `myRole` may give `target` (BACKEND.md section 1): nobody edits their own role,
 * admins only move accounts between pending and member, owners may set any role.
 * null = read-only. The server enforces the same rules; its errors are shown as is.
 */
function roleChoices(myRole: RgRole, meId: string, target: RgMember): RgRole[] | null {
  if (target.id === meId) return null;
  if (myRole === "owner") return ALL_ROLES;
  if (myRole === "admin" && (target.role === "pending" || target.role === "member")) return ["pending", "member"];
  return null;
}

const membersKey = ["rg", "members"] as const;

export function AdminPanel({ me, role }: { me: Me; role: RgRole }) {
  return (
    <div className="space-y-8">
      <MembersSection me={me} role={role} />
      <GateSection />
    </div>
  );
}

function SectionTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
      <h2 className="font-russo text-2xl text-white">{title}</h2>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------- members

function MembersSection({ me, role }: { me: Me; role: RgRole }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const members = useQuery({ queryKey: membersKey, queryFn: () => listMembers(), staleTime: 0 });
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);

  const update = useMutation({
    mutationFn: ({ id, role: next }: { id: string; role: RgRole; name: string }) => updateMember(id, { role: next }),
    onSuccess: (m, v) => {
      setRowError(null);
      toast({ title: `${v.name || m.email} is now ${ROLE_LABEL[m.role].toLowerCase()}` });
      void qc.invalidateQueries({ queryKey: membersKey });
    },
    onError: (e, v) => setRowError({ id: v.id, message: errorMessage(e) }),
  });

  const rows = useMemo(
    () =>
      [...(members.data?.items ?? [])].sort(
        (a, b) => ORDER[a.role] - ORDER[b.role] || (a.name || a.email).localeCompare(b.name || b.email),
      ),
    [members.data],
  );
  const pending = rows.filter((m) => m.role === "pending").length;

  return (
    <section aria-labelledby="members-title" data-testid="members-admin">
      <SectionTitle title="Members">
        <span id="members-title" className="text-sm text-gray-400">
          {members.data ? `${rows.length} accounts${pending ? `, ${pending} waiting for approval` : ""}` : ""}
        </span>
      </SectionTitle>
      <GlassmorphismCard hover={false} className="space-y-6">
        <AddMember role={role} />
        {members.isError && <p className="text-sm text-red-400">{errorMessage(members.error)}</p>}
        {members.isLoading && <p className="text-sm text-gray-400">Loading members…</p>}
        {members.data && (
          <div className="overflow-x-auto -mx-2">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="text-right">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((m) => {
                  const choices = roleChoices(role, me.id, m);
                  const busy = update.isPending && update.variables?.id === m.id;
                  return (
                    <TableRow key={m.id} className="border-white/5 hover:bg-white/[0.03]" data-testid="member-row">
                      <TableCell className="text-white">
                        {m.name || <span className="text-gray-500">No name</span>}
                        {m.id === me.id && <span className="ml-2 text-xs text-gray-500">you</span>}
                        {rowError?.id === m.id && (
                          <p role="alert" className="mt-1 text-xs text-red-400">
                            {rowError.message}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300">{m.email}</TableCell>
                      <TableCell>
                        {choices ? (
                          <Select
                            value={m.role}
                            disabled={busy}
                            onValueChange={(next) => update.mutate({ id: m.id, role: next as RgRole, name: m.name })}
                          >
                            <SelectTrigger className="h-8 w-[120px] bg-black/40" aria-label={`Role of ${m.name || m.email}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {choices.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {ROLE_LABEL[r]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <RolePill role={m.role} />
                        )}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">{m.password_set ? "Set" : "Email code only"}</TableCell>
                      <TableCell className="text-right">
                        {m.role === "pending" && choices && (
                          <Button
                            size="sm"
                            disabled={busy}
                            onClick={() => update.mutate({ id: m.id, role: "member", name: m.name })}
                            className="h-8 bg-[hsl(150,45%,60%,0.15)] text-[hsl(150,45%,65%)] border border-[hsl(150,45%,60%,0.4)] hover:bg-[hsl(150,45%,60%,0.25)]"
                          >
                            Approve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </GlassmorphismCard>
    </section>
  );
}

function AddMember({ role }: { role: RgRole }) {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [newRole, setNewRole] = useState<RgRole>("member");
  const [error, setError] = useState<string | null>(null);
  const roles: RgRole[] = role === "owner" ? ALL_ROLES : ["pending", "member"];

  const create = useMutation({
    mutationFn: () => createMember({ email: email.trim(), name: name.trim(), role: newRole }),
    onSuccess: (m) => {
      toast({ title: `Added ${m.name || m.email}`, description: "They can now sign in with an email code." });
      setEmail("");
      setName("");
      setError(null);
      void qc.invalidateQueries({ queryKey: membersKey });
    },
    onError: (e) => setError(errorMessage(e)),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    create.mutate();
  };

  return (
    <form onSubmit={submit} className="space-y-2" aria-label="Add a member">
      <div className="grid gap-3 sm:grid-cols-[1fr_1fr_130px_auto] sm:items-end">
        <div className="space-y-1.5">
          <Label htmlFor="add-email">Email</Label>
          <Input
            id="add-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/40"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="add-name">Name</Label>
          <Input id="add-name" required value={name} onChange={(e) => setName(e.target.value)} className="bg-black/40" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="add-role">Role</Label>
          <Select value={newRole} onValueChange={(v) => setNewRole(v as RgRole)}>
            <SelectTrigger id="add-role" className="bg-black/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {ROLE_LABEL[r]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          disabled={create.isPending || !email.trim() || !name.trim()}
          className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:opacity-90"
        >
          {create.isPending ? "Adding…" : "Add member"}
        </Button>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------------- gate

const UNITS = { minutes: 60, hours: 3600, days: 86400 } as const;
type Unit = keyof typeof UNITS;
const MIN_S = 60;
const MAX_S = 2592000;

/** The largest unit that divides `seconds` evenly, for a readable default. */
function split(seconds: number): { amount: number; unit: Unit } {
  if (seconds % UNITS.days === 0) return { amount: seconds / UNITS.days, unit: "days" };
  if (seconds % UNITS.hours === 0) return { amount: seconds / UNITS.hours, unit: "hours" };
  return { amount: Math.round(seconds / UNITS.minutes), unit: "minutes" };
}

const date = (iso: string) => (iso ? new Date(iso.replace(" ", "T")).toLocaleString() : "Never");

function GateSection() {
  const cards = useQuery({ queryKey: ["rg", "gate_cards"], queryFn: listGateCards, staleTime: 0 });
  return (
    <section aria-labelledby="gate-title" data-testid="gate-admin">
      <SectionTitle title="Gate cards">
        <span id="gate-title" className="text-sm text-gray-400">
          Cards are added and synced from the app at the gate.
        </span>
      </SectionTitle>
      <GlassmorphismCard hover={false} className="space-y-6">
        <GateValidity />
        {cards.isError && <p className="text-sm text-red-400">{errorMessage(cards.error)}</p>}
        {cards.isLoading && <p className="text-sm text-gray-400">Loading cards…</p>}
        {cards.data && cards.data.length === 0 && (
          <p className="text-sm text-gray-400">No cards yet. Enrol one with the app's Add card at the gate.</p>
        )}
        {cards.data && cards.data.length > 0 && (
          <div className="overflow-x-auto -mx-2">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Name</TableHead>
                  <TableHead>UID</TableHead>
                  <TableHead>Carried by</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>On the gate</TableHead>
                  <TableHead>Last sync</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cards.data.map((c) => (
                  <TableRow key={c.id} className="border-white/5 hover:bg-white/[0.03]">
                    <TableCell className="text-white">{c.name}</TableCell>
                    <TableCell className="tabular-nums text-gray-300">{c.uid}</TableCell>
                    <TableCell className="text-gray-300">
                      {c.expand?.user?.name || c.expand?.user?.email || <span className="text-gray-500">Nobody</span>}
                    </TableCell>
                    <TableCell className={c.enabled ? "text-[hsl(150,45%,60%)]" : "text-gray-500"}>
                      {c.enabled ? "Enabled" : "Disabled"}
                    </TableCell>
                    <TableCell className="text-gray-300">{c.on_gate ? "Yes" : "Not found at last sync"}</TableCell>
                    <TableCell className="text-gray-400 text-sm">{date(c.synced_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </GlassmorphismCard>
    </section>
  );
}

function GateValidity() {
  const qc = useQueryClient();
  const { toast } = useToast();
  const settings = useQuery({ queryKey: ["rg", "gate_settings"], queryFn: getGateSettings, staleTime: 0 });
  const [draft, setDraft] = useState<{ amount: string; unit: Unit } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const current = settings.data ? split(settings.data.validity_seconds) : null;
  const shown = draft ?? (current ? { amount: String(current.amount), unit: current.unit } : null);

  const save = useMutation({
    mutationFn: (seconds: number) => updateGateValidity(seconds),
    onSuccess: (s) => {
      const { amount, unit } = split(s.validity_seconds);
      toast({ title: "Code validity saved", description: `New codes work for ${amount} ${unit}.` });
      setDraft(null);
      setError(null);
      void qc.invalidateQueries({ queryKey: ["rg", "gate_settings"] });
    },
    onError: (e) => setError(errorMessage(e)),
  });

  if (settings.isError) return <p className="text-sm text-red-400">{errorMessage(settings.error)}</p>;
  if (!shown) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const seconds = Math.round(Number(shown.amount) * UNITS[shown.unit]);
    if (!Number.isFinite(seconds) || seconds < MIN_S || seconds > MAX_S) {
      setError("Choose between 1 minute and 30 days.");
      return;
    }
    save.mutate(seconds);
  };

  return (
    <form onSubmit={submit} className="space-y-2" aria-label="Gate code validity">
      <Label htmlFor="validity-amount">Door codes work for</Label>
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          id="validity-amount"
          type="number"
          min={1}
          step="any"
          value={shown.amount}
          onChange={(e) => setDraft({ ...shown, amount: e.target.value })}
          className="w-24 bg-black/40"
        />
        <Select value={shown.unit} onValueChange={(u) => setDraft({ ...shown, unit: u as Unit })}>
          <SelectTrigger className="w-[120px] bg-black/40" aria-label="Unit">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(UNITS) as Unit[]).map((u) => (
              <SelectItem key={u} value={u}>
                {u}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline" disabled={!draft || save.isPending}>
          {save.isPending ? "Saving…" : "Save"}
        </Button>
      </div>
      <p className="text-xs text-gray-500">Applies to codes issued from now on. 1 minute to 30 days.</p>
      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
