import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Phone, Home, MessageCircle } from 'lucide-react';

const AppointmentSuccess: React.FC = () => {
  return (
    <div className="min-h-screen py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-12 w-12 text-green-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4"
          >
            Appointment Booked Successfully! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-600 mb-8"
          >
            Thank you for choosing Sri Venkateshwara Homeopathy Clinic. 
            Your appointment request has been received and is being processed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 rounded-xl p-6 mb-8"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  1
                </div>
                <p className="text-gray-700">Dr. Deepthi will review your appointment request within 2-4 hours</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  2
                </div>
                <p className="text-gray-700">You'll receive a confirmation call at your provided phone number</p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                  3
                </div>
                <p className="text-gray-700">Appointment details and preparation instructions will be shared</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            <div className="bg-green-50 rounded-lg p-4">
              <Phone className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Emergency Contact</h3>
              <p className="text-sm text-gray-600">Call: 8309853792</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <MessageCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">WhatsApp</h3>
              <p className="text-sm text-gray-600">Quick queries & updates</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/"
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <button
              onClick={() => window.open('tel:8309853792', '_self')}
              className="flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Clinic
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Please keep your phone available for our confirmation call. 
              If you need to reschedule or cancel, please call us at least 24 hours in advance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;