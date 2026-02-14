import { useState } from "react";
import { motion } from "framer-motion";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  scaleAnimation?: boolean;
  fallback?: React.ReactNode;
}

export const ImageWithLoader = ({ 
  src, 
  alt, 
  className = "", 
  scaleAnimation = false,
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
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-800/10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(235,85%,65%)]"></div>
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </>
  );
};

export default ImageWithLoader;
