import {
  useCallback,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";
import { AppLink } from "./AppLink";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  /** primary = kapton fill + chamfer; secondary = 1px outline; ghost = text only. Default "primary". */
  variant?: ButtonVariant;
  /** Default "md". */
  size?: ButtonSize;
  /** Use paper-surface colours for secondary/ghost. */
  onPaper?: boolean;
  /** Pull up to 4px toward the pointer while hovered (desktop only). Default: true for primary. */
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

type AsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
    ref?: Ref<HTMLButtonElement>;
  };

type AsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps | "href"> & {
    /** Internal ("/sih") → wouter Link; external (https://) → new tab. */
    href: string;
    ref?: Ref<HTMLAnchorElement>;
  };

export type ButtonProps = AsButton | AsLink;

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm gap-1.5",
  md: "h-11 px-5 text-base gap-2",
  lg: "h-14 px-7 text-lg gap-2.5",
};

function variantClass(variant: ButtonVariant, onPaper: boolean): string {
  switch (variant) {
    case "primary":
      // Notch 12 → 20px, label nudge and the flat ink edge live in globals.css (.btn-primary).
      return "btn-primary bg-kapton text-kapton-ink active:translate-y-px";
    case "secondary":
      return onPaper
        ? "rounded-sm border border-text-on-paper text-text-on-paper hover:bg-text-on-paper hover:text-paper focus-visible:bg-text-on-paper focus-visible:text-paper active:bg-text-on-paper active:text-paper"
        : "rounded-sm border border-line text-text hover:border-text hover:bg-panel focus-visible:border-text focus-visible:bg-panel active:bg-panel";
    case "ghost":
      return onPaper
        ? "rounded-sm text-text-on-paper underline-offset-4 hover:underline focus-visible:underline"
        : "rounded-sm text-text underline-offset-4 hover:underline focus-visible:underline";
  }
}

/** Shared class string, for elements that must look like a button but aren't one. */
export function buttonClass(
  opts: { variant?: ButtonVariant; size?: ButtonSize; onPaper?: boolean } = {},
): string {
  const { variant = "primary", size = "md", onPaper = false } = opts;
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center font-semibold whitespace-nowrap transition-[color,background-color,border-color,box-shadow,clip-path] duration-150 select-none disabled:pointer-events-none disabled:opacity-50",
    sizes[size],
    variantClass(variant, onPaper),
  );
}

/**
 * Action button. Pass `href` to render a link that looks like a button:
 * `<Button href="/contact">Join the lab</Button>`,
 * `<Button variant="secondary" href="https://forms.gle/…">Register</Button>`.
 */
export function Button(props: ButtonProps) {
  return props.href !== undefined ? <LinkButton {...props} /> : <ActionButton {...props} />;
}

/** Classes, the nudging label and the cursor hint shared by both renderings. */
function buttonParts(p: BaseProps) {
  const { variant = "primary", size = "md", onPaper = false, className, children } = p;
  return {
    classes: cn(buttonClass({ variant, size, onPaper }), className),
    label: <span className="btn-label">{children}</span>,
    cursor: variant === "primary" ? "primary" : undefined,
  };
}

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as { current: T | null }).current = value;
}

/** The magnetic pull (default on for primary) merged with the caller's ref. */
function useButtonRef(p: BaseProps, userRef: Ref<HTMLElement> | undefined) {
  const magneticRef = useMagnetic<HTMLElement>(
    p.magnetic ?? (p.variant ?? "primary") === "primary",
  );
  return useCallback(
    (node: HTMLElement | null) => {
      const undo = magneticRef(node);
      assignRef(userRef, node);
      return () => {
        undo?.();
        assignRef(userRef, null);
      };
    },
    [magneticRef, userRef],
  );
}

function LinkButton({ ref, href, ...props }: AsLink) {
  const { variant, size, onPaper, magnetic, className, children, ...rest } = props;
  const base = { variant, size, onPaper, magnetic, className, children };
  const { classes, label, cursor } = buttonParts(base);
  const attach = useButtonRef(base, ref as Ref<HTMLElement> | undefined);
  return (
    <AppLink href={href} className={classes} data-cursor={cursor} {...rest} ref={attach}>
      {label}
    </AppLink>
  );
}

function ActionButton({ ref, href: _h, type = "button", ...props }: AsButton) {
  const { variant, size, onPaper, magnetic, className, children, ...rest } = props;
  const base = { variant, size, onPaper, magnetic, className, children };
  const { classes, label, cursor } = buttonParts(base);
  const attach = useButtonRef(base, ref as Ref<HTMLElement> | undefined);
  return (
    <button type={type} className={classes} data-cursor={cursor} {...rest} ref={attach}>
      {label}
    </button>
  );
}
