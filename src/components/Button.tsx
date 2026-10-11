import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, Ref } from "react";
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
      return "chamfer bg-kapton text-kapton-ink hover:bg-text active:translate-y-px";
    case "secondary":
      return onPaper
        ? "rounded-sm border border-text-on-paper text-text-on-paper hover:bg-text-on-paper hover:text-paper"
        : "rounded-sm border border-line text-text hover:border-text";
    case "ghost":
      return onPaper
        ? "rounded-sm text-text-on-paper underline-offset-4 hover:underline"
        : "rounded-sm text-text underline-offset-4 hover:underline";
  }
}

/** Shared class string, for elements that must look like a button but aren't one. */
export function buttonClass(
  opts: { variant?: ButtonVariant; size?: ButtonSize; onPaper?: boolean } = {},
): string {
  const { variant = "primary", size = "md", onPaper = false } = opts;
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center font-semibold whitespace-nowrap transition-colors duration-150 select-none disabled:pointer-events-none disabled:opacity-50",
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
  const { variant = "primary", size = "md", onPaper = false, className, children } = props;
  const classes = cn(buttonClass({ variant, size, onPaper }), className);

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      onPaper: _p,
      className: _c,
      children: _ch,
      href,
      ...rest
    } = props;
    return (
      <AppLink href={href} className={classes} {...rest}>
        {children}
      </AppLink>
    );
  }
  const {
    variant: _v,
    size: _s,
    onPaper: _p,
    className: _c,
    children: _ch,
    href: _h,
    type = "button",
    ...rest
  } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
