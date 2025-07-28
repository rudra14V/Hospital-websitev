import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingButtons: React.FC = () => {
  const handleCall = () => {
    window.open('tel:8309853792', '_self');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918309853792', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-40">
      <motion.button
        onClick={handleWhatsApp}
        className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MessageCircle className="h-6 w-6" />
        </motion.div>
      </motion.button>

      <motion.button
        onClick={handleCall}
        className="bg-gradient-to-r from-rose-400 to-pink-600 hover:from-rose-500 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300"
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20, scale: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Phone className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingButtons;