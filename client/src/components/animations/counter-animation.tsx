import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface CounterAnimationProps {
  target: number;
  duration?: number;
  className?: string;
}

export default function CounterAnimation({
  target,
  duration = 2000,
  className = "",
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(elementRef, { threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true);
      let start = 0;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isIntersecting, target, duration, hasAnimated]);

  return (
    <motion.div
      ref={elementRef}
      className={`font-orbitron font-bold ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.div>
  );
}
