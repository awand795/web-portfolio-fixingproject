import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ── 1. MAGNETIC BUTTON WRAPPER ──
interface MagneticProps {
  children: React.ReactElement;
  range?: number;
  strength?: number;
}

export const Magnetic = ({ children, range = 45, strength = 0.3 }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      setPosition({ x: distanceX * strength, y: distanceY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 160, damping: 15, mass: 0.1 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ── 2. 3D PERSPECTIVE TILT CARD ──
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    
    // Subtly tilt within -8 to 8 degrees to keep it clean
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

// ── 3. TEXT MASK REVEAL ANIMATION ──
interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const TextReveal = ({ children, className = "", delay = 0 }: TextRevealProps) => {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};
