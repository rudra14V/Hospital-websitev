import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Shield, Clock, Users, CheckCircle, Star, MapPin, Phone, Mail } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8 text-rose-500" />,
      title: "Natural Healing",
      description: "Homeopathy activates your body's self-regulatory mechanism for natural healing."
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-500" />,
      title: "Safe & Non-Toxic",
      description: "No side effects, addiction, or dependency. Safe for all ages including pregnant women."
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-500" />,
      title: "20+ Years Experience",
      description: "Established clinic with decades of experience in homeopathic treatments."
    },
    {
      icon: <Users className="h-8 w-8 text-violet-500" />,
      title: "All Age Groups",
      description: "Suitable for infants to elderly. Sweet medicines easily taken by children."
    }
  ];

  const benefits = [
    "No age limit - anyone can take homeopathic treatment",
    "Life-saving medication for mild and chronic diseases",
    "Safe for pregnant and nursing women",
    "Sweet medicines, perfect for infants and children",
    "Treats root cause, not just symptoms",
    "Strengthens immunity and optimizes body functioning"
  ];

  const clinicInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-rose-500" />,
      label: "Location",
      value: "Online Consultations Available"
    },
    {
      icon: <Phone className="h-5 w-5 text-emerald-500" />,
      label: "Phone",
      value: "8309853792"
    },
    {
      icon: <Mail className="h-5 w-5 text-indigo-500" />,
      label: "Email",
      value: "163deepthi@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-indigo-50 py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-32 right-20 w-32 h-32 bg-indigo-200 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 left-32 w-16 h-16 bg-emerald-200 rounded-full opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Sri Venkateshwara</span>{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Homeopathy Clinic</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Experience natural healing with homeopathy. Get quality treatment for quality life with 
              Dr. Deepthi's expertise and 5+ years of dedicated service.
            </motion.p>
            
            {/* Clinic Info Cards */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {clinicInfo.map((info, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20"
                >
                  <div className="flex items-center space-x-2">
                    {info.icon}
                    <div>
                      <p className="text-xs text-gray-500 font-medium">{info.label}</p>
                      <p className="text-sm text-gray-700 font-semibold">{info.value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/book-appointment"
                  className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Book Appointment
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="tel:8309853792"
                  className="px-8 py-4 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Call: 8309853792
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-48 h-48 mx-auto bg-gradient-to-br from-rose-100 via-pink-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/WhatsApp Image 2025-06-12 at 13.59.47_f81ca7f9.jpg"
                  alt="Dr. Deepthi"
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-indigo-400/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Dr. Deepthi
              </motion.h3>
              <motion.p 
                className="text-rose-600 mb-2 font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                MD (Homeopathy)
              </motion.p>
              <motion.p 
                className="text-sm text-gray-500 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                Rajiv Gandhi University Karnataka
              </motion.p>
              <motion.div 
                className="flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.6 + star * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">5+ Years Experience</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clinic Hours */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-600/50 via-purple-600/50 to-pink-600/50"
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Clinic Timings
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
            <motion.div 
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-5 w-5 mr-2" />
              <span>Morning: 10:00 AM - 3:00 PM</span>
            </motion.div>
            <motion.div 
              className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-5 w-5 mr-2" />
              <span>Evening: 6:00 PM - 9:00 PM</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Homeopathy?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Homeopathy is a system of natural medicine based upon the ancient principle of "like cures like."
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
              >
                <motion.div 
                  className="mb-4"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-white to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Why Go With <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Homeopathy?</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Homeopathy Treatment"
                className="rounded-3xl shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 py-16 text-white relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-rose-600/30 via-pink-600/30 to-indigo-600/30"
          animate={{ 
            background: [
              "linear-gradient(45deg, rgba(244,63,94,0.3), rgba(236,72,153,0.3), rgba(99,102,241,0.3))",
              "linear-gradient(135deg, rgba(99,102,241,0.3), rgba(244,63,94,0.3), rgba(236,72,153,0.3))",
              "linear-gradient(225deg, rgba(236,72,153,0.3), rgba(99,102,241,0.3), rgba(244,63,94,0.3))",
              "linear-gradient(315deg, rgba(244,63,94,0.3), rgba(236,72,153,0.3), rgba(99,102,241,0.3))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Ready to Start Your Healing Journey?
            </motion.h2>
            <p className="text-xl mb-8 opacity-90">
              Get comprehensive homeopathic treatment from the comfort of your home. 
              Online consultations available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/book-appointment"
                  className="px-8 py-4 bg-white text-rose-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Book Your Appointment
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-rose-600 transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;