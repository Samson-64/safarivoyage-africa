import React, { useState } from 'react';
import { motion } from 'motion/react';

interface SparkleButtonProps {
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
}

export const SparkleButton: React.FC<SparkleButtonProps> = ({
  id,
  onClick,
  children,
  className = '',
  icon,
  type = 'button',
  disabled = false,
  title,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group/sparkle-btn relative overflow-hidden rounded-full border border-white/20 bg-[#0d0e11] font-bold transition-all duration-300 shadow-xl cursor-pointer select-none active:scale-[0.98] ${className}`}
    >
      {/* Background White Fill Layer that seamlessly completes the flood */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.32,
          delay: isHovered ? 0.16 : 0,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-white pointer-events-none z-0"
      />

      {/* Sparkle Star 1 - Left large expanding 4-pointed star (Figma Smart Animate style) */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          isHovered
            ? {
                scale: [0, 1.25, 24],
                rotate: [0, 25, 45],
                opacity: [0, 1, 1],
                x: '-50%',
                y: '-50%',
              }
            : {
                scale: 0,
                rotate: 0,
                opacity: 0,
                x: '-50%',
                y: '-50%',
              }
        }
        transition={{
          duration: isHovered ? 0.55 : 0.25,
          ease: [0.16, 1, 0.3, 1],
          times: isHovered ? [0, 0.35, 1] : undefined,
        }}
        className="absolute left-[26%] top-[50%] w-7 h-7 text-white pointer-events-none z-0 origin-center"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
        </svg>
      </motion.div>

      {/* Sparkle Star 2 - Right medium expanding 4-pointed star */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          isHovered
            ? {
                scale: [0, 1.3, 22],
                rotate: [0, -30, -55],
                opacity: [0, 1, 1],
                x: '-50%',
                y: '-50%',
              }
            : {
                scale: 0,
                rotate: 0,
                opacity: 0,
                x: '-50%',
                y: '-50%',
              }
        }
        transition={{
          duration: isHovered ? 0.58 : 0.25,
          delay: isHovered ? 0.04 : 0,
          ease: [0.16, 1, 0.3, 1],
          times: isHovered ? [0, 0.35, 1] : undefined,
        }}
        className="absolute left-[74%] top-[50%] w-6 h-6 text-white pointer-events-none z-0 origin-center"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
        </svg>
      </motion.div>

      {/* Sparkle Star 3 - Center expanding 4-pointed star */}
      <motion.div
        aria-hidden="true"
        initial={false}
        animate={
          isHovered
            ? {
                scale: [0, 1.15, 20],
                rotate: [0, 40, 80],
                opacity: [0, 1, 1],
                x: '-50%',
                y: '-50%',
              }
            : {
                scale: 0,
                rotate: 0,
                opacity: 0,
                x: '-50%',
                y: '-50%',
              }
        }
        transition={{
          duration: isHovered ? 0.52 : 0.25,
          delay: isHovered ? 0.02 : 0,
          ease: [0.16, 1, 0.3, 1],
          times: isHovered ? [0, 0.35, 1] : undefined,
        }}
        className="absolute left-[50%] top-[48%] w-5 h-5 text-white pointer-events-none z-0 origin-center"
      >
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50 0 C50 27.6 27.6 50 0 50 C27.6 50 50 72.4 50 100 C50 72.4 72.4 50 100 50 C72.4 50 50 27.6 50 0 Z" />
        </svg>
      </motion.div>

      {/* Foreground Content: Text + Icon with sharp color transition */}
      <span className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'} font-semibold`}>
        {icon}
        <span>{children}</span>
      </span>
    </button>
  );
};
