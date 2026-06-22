import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  show: boolean;
  label: string;
}

const BackToTop = ({ show, label }: BackToTopProps) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={label}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_6px_28px_rgba(124,58,237,0.6)] transition-all duration-300 bg-gradient-primary"
      >
        <ArrowUp size={20} />
      </motion.button>
    )}
  </AnimatePresence>
);

export default BackToTop;
