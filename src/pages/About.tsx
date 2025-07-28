import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, Users, Heart, BookOpen, Stethoscope, MapPin, Phone, Mail } from 'lucide-react';

const About: React.FC = () => {
  const qualifications = [
    "MD (Homeopathy) from Rajiv Gandhi University Karnataka",
    "5+ Years of Clinical Experience",
    "Specialized in Chronic Disease Management",
    "Expert in Women's Health and Pediatric Care"
  ];

  const specialties = [
    "Diabetes & Hypertension",
    "Thyroid Disorders",
    "Women's Health Issues",
    "Arthritis & Joint Pain",
    "Infertility Treatment",
    "Sinusitis & Respiratory Issues",
    "Hair & Skin Problems",
    "Allergies & Asthma",
    "Migraine & Headaches",
    "Spondylitis",
    "Children's Health"
  ];

  return (
    <div className="min-h-screen py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-blue-600">Dr. Deepthi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dedicated to providing natural healing solutions through homeopathy with 
              compassion, expertise, and personalized care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Doctor Profile Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mb-6">
                  <img
                    src="/Hospital-websitev/WhatsApp Image 2025-06-12 at 13.59.47_f81ca7f9.jpg"
                    alt="Dr. Deepthi"
                    className="w-56 h-56 rounded-full object-cover shadow-lg"
                  />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Dr. Deepthi</h3>
                <p className="text-xl text-blue-600 mb-4">MD (Homeopathy)</p>
                <div className="flex items-center justify-center space-x-6 text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>5+ Years</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>1000+ Patients</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Your Trusted Homeopathy Specialist
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Dr. Deepthi brings years of dedicated experience in homeopathic medicine, 
                holding an MD in Homeopathy from the prestigious Rajiv Gandhi University Karnataka. 
                With over 5 years of clinical experience, she has successfully treated thousands 
                of patients across various age groups and health conditions.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Her approach focuses on treating the root cause of diseases rather than just 
                the symptoms, ensuring comprehensive healing and long-term wellness. She believes 
                in the power of natural medicine to activate the body's self-healing mechanisms.
              </p>

              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="h-6 w-6 mr-2 text-blue-600" />
                  Qualifications & Experience
                </h3>
                <ul className="space-y-2">
                  {qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {qualification}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic Location Section */}
      <section className="py-16 bg-gradient-to-r from-rose-500 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Visit Our Clinic
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Located in the heart of Bhadrachalam, our clinic provides a comfortable 
              and welcoming environment for all patients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Address</h3>
                    <p className="opacity-90">Behind the Bus Stand, U.B Road, Bhadrachalam</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Phone</h3>
                    <p className="opacity-90">8309853792</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Email</h3>
                    <p className="opacity-90">163deepthi@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Clinic Hours</h3>
                    <p className="opacity-90">Morning: 10AM - 3PM | Evening: 6PM - 9PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/vadina hospital.jpg"
                alt="Sri Venkateshwara Homeopathy Clinic"
                className="w-full h-auto max-h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Areas of <span className="text-green-600">Specialization</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive homeopathic treatment for a wide range of health conditions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center">
                  <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="font-medium text-gray-800">{specialty}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Homeopathy Philosophy"
                className="rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our <span className="text-blue-600">Philosophy</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Heart className="h-8 w-8 text-red-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Holistic Healing</h3>
                    <p className="text-gray-600">
                      We believe in treating the whole person, not just the disease. Our approach 
                      considers physical, mental, and emotional well-being.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <BookOpen className="h-8 w-8 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Natural Medicine</h3>
                    <p className="text-gray-600">
                      Using the principle of "like cures like," we activate your body's natural 
                      healing abilities without harmful side effects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="h-8 w-8 text-green-500 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Patient-Centered Care</h3>
                    <p className="text-gray-600">
                      Each treatment plan is customized based on individual symptoms, constitution, 
                      and lifestyle for optimal results.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-xl opacity-90">Years Established</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-xl opacity-90">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-xl opacity-90">Happy Patients</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-xl opacity-90">Success Rate</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
