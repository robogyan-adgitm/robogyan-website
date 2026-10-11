import { useState } from "react";
import { motion } from "framer-motion";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  scaleAnimation?: boolean;
  loading?: "lazy" | "eager";
  fallback?: React.ReactNode;
}

export const ImageWithLoader = ({ 
  src, 
  alt, 
  className = "", 
  scaleAnimation = false,
  loading = "lazy",
  fallback
}: ImageWithLoaderProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-800/40 via-gray-700/30 to-gray-800/40 animate-pulse flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-white/20 border-t-[hsl(235,85%,65%)] rounded-full animate-spin"></div>
        </div>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={className}
        initial={false}
        animate={
          scaleAnimation
            ? { opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.05 }
            : { opacity: loaded ? 1 : 0 }
        }
        transition={{ duration: 0.4, ease: "easeOut" }}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
};

export default ImageWithLoader;
