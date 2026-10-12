import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { LineFollower } from "./LineFollower";

export interface LostBotProps {
  /** Robot width in px. Default 120. */
  size?: number;
  className?: string;
}

/**
 * 404 page: a line-follower that has lost the line and spins in place, sensors grey
 * ("Sensor array reads 0000"). Static with reduced motion. Decorative only; the page
 * supplies the text and the way back.
 */
export function LostBot({ size = 120, className }: LostBotProps) {
  const reduced = useReducedMotion();
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      aria-hidden="true"
      data-testid="lost-bot"
    >
      <motion.div
        animate={reduced ? undefined : { rotate: [0, 25, -20, 360] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
      >
        <LineFollower size={size} onLine={false} />
      </motion.div>
    </div>
  );
}
