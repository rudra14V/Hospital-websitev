import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const AppointmentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 25000); // Show after 25 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white rounded-2xl shadow-2xl z-50 p-6 border border-white/20"
        >
          <motion.button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200 transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="h-5 w-5" />
          </motion.button>

          <motion.div 
            className="flex items-center mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Calendar className="h-6 w-6 mr-2" />
            </motion.div>
            <h3 className="text-lg font-bold">Book Your Appointment!</h3>
          </motion.div>

          <motion.p 
            className="text-sm mb-4 opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Get quality homeopathic treatment from Dr. Deepthi. Online consultations available!
          </motion.p>

          <motion.div 
            className="flex space-x-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Link
                to="/book-appointment"
                onClick={handleClose}
                className="block w-full bg-white text-rose-600 px-4 py-2 rounded-xl font-medium text-center hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book Now
              </Link>
            </motion.div>
            <motion.button
              onClick={() => window.open('tel:8309853792', '_self')}
              className="flex items-center justify-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl hover:bg-white/30 transition-colors shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppointmentBanner;