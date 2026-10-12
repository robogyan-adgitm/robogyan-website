import { useState, type FormEvent } from "react";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PB_URL, pb } from "@/pb/client";
import { errorMessage, isStatus, setPassword } from "@/pb/api";
import { isAdmin, requestCode, roleOf, signInWithCode, signInWithPassword, signOut, useMe, type Me } from "@/pb/auth";
import { RolePill } from "@/features/members/RolePill";
import { AdminPanel } from "@/features/members/AdminPanel";
import { useToast } from "@/hooks/use-toast";

const CODE_LENGTH = 8;
const PRIMARY =
  "bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:opacity-90 font-semibold";

/** /members: sign in for Robogyan members; the admin control panel for admins and owners. */
export default function Members() {
  const me = useMe();
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6" data-testid="members-page">
      <div className={me ? "container mx-auto max-w-5xl" : "mx-auto max-w-md"}>
        <h1 className="font-russo text-3xl sm:text-4xl text-[hsl(150,45%,60%)] neon-text mb-3">Members only</h1>
        <p className="text-gray-400 mb-8" data-testid="members-hint">
          For Robogyan members. Accounts are created by the team; there is no sign-up.
        </p>
        {!pb ? <Offline /> : me ? <SignedIn me={me} /> : <SignIn />}
      </div>
    </div>
  );
}

function Offline() {
  return (
    <GlassmorphismCard hover={false}>
      <p className="text-gray-300">
        Sign-in is not available on this copy of the site: it is not connected to the Robogyan server.
      </p>
    </GlassmorphismCard>
  );
}

function FormError({ children }: { children: string | null }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-sm text-red-400" data-testid="form-error">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------- sign in

type Mode = "code" | "password";

function SignIn() {
  const [mode, setMode] = useState<Mode>("code");
  const [email, setEmail] = useState("");
  const [password, setPw] = useState("");
  const [otpId, setOtpId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  const sendCode = (e?: FormEvent) => {
    e?.preventDefault();
    void run(async () => {
      try {
        setOtpId(await requestCode(email.trim()));
        setSentTo(email.trim());
        setCode("");
      } catch (err) {
        setError(errorMessage(err));
      }
    });
  };

  const submitCode = (value: string) => {
    if (!otpId || value.length !== CODE_LENGTH) return;
    void run(async () => {
      try {
        await signInWithCode(otpId, value);
      } catch (err) {
        setCode("");
        setError(
          isStatus(err, 400)
            ? "That code is wrong or has expired. Check the latest email, or send a new code."
            : errorMessage(err),
        );
      }
    });
  };

  const submitPassword = (e: FormEvent) => {
    e.preventDefault();
    void run(async () => {
      try {
        await signInWithPassword(email.trim(), password);
      } catch (err) {
        setError(
          isStatus(err, 400)
            ? "Wrong email or password. No password yet? Sign in with an email code and set one."
            : errorMessage(err),
        );
      }
    });
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setOtpId(null);
  };

  return (
    <GlassmorphismCard hover={false} className="space-y-6">
      <div role="tablist" aria-label="Sign-in method" className="grid grid-cols-2 gap-1 rounded-lg bg-black/40 p-1">
        {(
          [
            ["code", "Email code"],
            ["password", "Password"],
          ] as const
        ).map(([m, label]) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={mode === m}
            onClick={() => switchMode(m)}
            className={`rounded-md py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(235,85%,65%)] ${
              mode === m ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "code" && !otpId && (
        <form onSubmit={sendCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="members-email">Email</Label>
            <Input
              id="members-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <FormError>{error}</FormError>
          <Button type="submit" disabled={busy || !email.trim()} className={`w-full ${PRIMARY}`}>
            {busy ? "Sending…" : "Send code"}
          </Button>
          <p className="text-xs text-gray-500">
            We email an {CODE_LENGTH}-digit code to the address on your account. It works for 5 minutes.
          </p>
        </form>
      )}

      {mode === "code" && otpId && (
        <div className="space-y-4">
          <p className="text-sm text-gray-300">
            If <span className="text-white">{sentTo}</span> has an account, a code is on its way. Enter it below.
          </p>
          <div className="space-y-2">
            <Label htmlFor="members-code">Code</Label>
            <InputOTP
              id="members-code"
              maxLength={CODE_LENGTH}
              inputMode="numeric"
              pattern="^[0-9]*$"
              autoFocus
              autoComplete="one-time-code"
              value={code}
              onChange={setCode}
              onComplete={submitCode}
              disabled={busy}
              data-testid="otp-input"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3].map((i) => (
                  <InputOTPSlot key={i} index={i} className="h-11 w-9 sm:w-10 text-base" />
                ))}
              </InputOTPGroup>
              <InputOTPSeparator className="text-gray-600" />
              <InputOTPGroup>
                {[4, 5, 6, 7].map((i) => (
                  <InputOTPSlot key={i} index={i} className="h-11 w-9 sm:w-10 text-base" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <FormError>{error}</FormError>
          <Button
            type="button"
            disabled={busy || code.length !== CODE_LENGTH}
            onClick={() => submitCode(code)}
            className={`w-full ${PRIMARY}`}
          >
            {busy ? "Signing in…" : "Sign in"}
          </Button>
          <div className="flex justify-between text-sm">
            <button type="button" className="text-gray-400 hover:text-white" onClick={() => sendCode()} disabled={busy}>
              Send a new code
            </button>
            <button
              type="button"
              className="text-gray-400 hover:text-white"
              onClick={() => {
                setOtpId(null);
                setError(null);
              }}
            >
              Use a different email
            </button>
          </div>
        </div>
      )}

      {mode === "password" && (
        <form onSubmit={submitPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="members-email-pw">Email</Label>
            <Input
              id="members-email-pw"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="members-password">Password</Label>
            <Input
              id="members-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <FormError>{error}</FormError>
          <Button type="submit" disabled={busy || !email.trim() || !password} className={`w-full ${PRIMARY}`}>
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>
      )}
    </GlassmorphismCard>
  );
}

// ---------------------------------------------------------------------------- signed in

function SignedIn({ me }: { me: Me }) {
  const role = roleOf(me);
  const [pwOpen, setPwOpen] = useState(false);
  return (
    <div className="space-y-8">
      <GlassmorphismCard hover={false} data-testid="profile">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="font-russo text-xl text-white truncate">{me.name || me.email}</h2>
              <RolePill role={role} />
            </div>
            <p className="text-gray-400 text-sm truncate">{me.email}</p>
            {role === "pending" && (
              <p className="mt-3 text-sm text-amber-300" data-testid="pending-note">
                Your account is waiting for approval. An admin will let you in; until then there is nothing else here.
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={() => setPwOpen(true)}>
              {me.password_set ? "Change password" : "Set password"}
            </Button>
            <Button variant="ghost" onClick={signOut} className="text-gray-300">
              Sign out
            </Button>
          </div>
        </div>
      </GlassmorphismCard>

      {isAdmin(role) && (
        <>
          <p className="text-sm text-gray-400">
            Site content (team, projects, events, SIH, gallery, facts) is edited in the PocketBase dashboard at{" "}
            <a
              href={`${PB_URL}/_/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(235,85%,65%)] hover:underline"
            >
              {PB_URL}/_/
            </a>
            , with a dashboard account.
          </p>
          <AdminPanel me={me} role={role} />
        </>
      )}

      <PasswordDialog open={pwOpen} onOpenChange={setPwOpen} hasPassword={me.password_set} />
    </div>
  );
}

function PasswordDialog({
  open,
  onOpenChange,
  hasPassword,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasPassword: boolean;
}) {
  const [password, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const verb = hasPassword ? "Change password" : "Set password";

  const close = (o: boolean) => {
    if (!o) {
      setPw("");
      setConfirm("");
      setError(null);
    }
    onOpenChange(o);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 10 || password.length > 64) return setError("Use 10 to 64 characters.");
    if (password !== confirm) return setError("The two passwords differ.");
    setBusy(true);
    setError(null);
    try {
      await setPassword({ password, passwordConfirm: confirm });
      toast({ title: hasPassword ? "Password changed" : "Password set" });
      close(false);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="bg-[hsl(0,0%,7%)] border-white/10">
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>{verb}</DialogTitle>
            <DialogDescription>
              Then you can sign in with your email and password as well as with an email code.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
            />
            <p className="text-xs text-gray-500">10 to 64 characters.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Repeat it</Label>
            <Input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <FormError>{error}</FormError>
          <DialogFooter>
            <Button type="submit" disabled={busy || !password} className={PRIMARY}>
              {busy ? "Saving…" : verb}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
