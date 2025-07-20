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
  const isIntersecting = useIntersectionObserver(elementRef, { threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isIntersecting && !hasAnimated && target > 0) {
      setHasAnimated(true);
      
      const startTime = Date.now();
      const startValue = 0;
      
      const animateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smoother animation
        const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = Math.floor(startValue + (target - startValue) * easeOutExpo);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isIntersecting, target, duration, hasAnimated]);

  // Fallback: animate after a delay if intersection observer doesn't trigger
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!hasAnimated && target > 0) {
        setHasAnimated(true);
        
        const startTime = Date.now();
        const startValue = 0;
        
        const animateCount = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentCount = Math.floor(startValue + (target - startValue) * easeOutExpo);
          
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(animateCount);
          } else {
            setCount(target);
          }
        };
        
        requestAnimationFrame(animateCount);
      }
    }, 1000); // Start animation after 1 second as fallback

    return () => clearTimeout(fallbackTimer);
  }, [target, duration, hasAnimated]);

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
