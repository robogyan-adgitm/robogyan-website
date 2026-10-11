import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hover?: boolean;
}

export default function GlassmorphismCard({
  children,
  className,
  hover = true,
  ...props
}: GlassmorphismCardProps) {
  return (
    <motion.div
      className={cn(
        "glassmorphism rounded-xl p-6",
        hover && "card-hover cursor-pointer",
        className
      )}
      whileHover={hover ? { y: -10 } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
