import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Heart, Baby, Users, Zap, Shield, Flower2 } from 'lucide-react';

const Treatments: React.FC = () => {
  const treatmentCategories = [
    {
      icon: <Activity className="h-8 w-8 text-red-500" />,
      title: "Chronic Diseases",
      treatments: ["Diabetes Management", "Hypertension Control", "Thyroid Disorders", "Arthritis & Joint Pain"],
      description: "Comprehensive management of chronic conditions with natural remedies that address root causes."
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-500" />,
      title: "Women's Health",
      treatments: ["Infertility Treatment", "PCOS/PCOD", "Menstrual Disorders", "Menopause Management"],
      description: "Specialized care for women's health issues with gentle, effective homeopathic solutions."
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-500" />,
      title: "Neurological Conditions",
      treatments: ["Migraine & Headaches", "Stress & Anxiety", "Depression", "Sleep Disorders"],
      description: "Natural treatment for neurological and mental health conditions without side effects."
    },
    {
      icon: <Baby className="h-8 w-8 text-blue-500" />,
      title: "Pediatric Care",
      treatments: ["Childhood Allergies", "Growth Issues", "Behavioral Problems", "Frequent Infections"],
      description: "Safe, sweet medicines specially formulated for children's delicate systems."
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Respiratory Issues",
      treatments: ["Asthma", "Sinusitis", "Bronchitis", "Allergic Rhinitis"],
      description: "Effective treatment for respiratory conditions to improve breathing and quality of life."
    },
    {
      icon: <Flower2 className="h-8 w-8 text-green-500" />,
      title: "Skin & Hair",
      treatments: ["Eczema & Psoriasis", "Hair Loss", "Acne Treatment", "Allergic Skin Conditions"],
      description: "Natural solutions for skin and hair problems that work from within."
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-500" />,
      title: "Immunity & Allergies",
      treatments: ["Immune System Boost", "Food Allergies", "Environmental Allergies", "Autoimmune Disorders"],
      description: "Strengthen your natural immunity and manage allergic reactions effectively."
    },
    {
      icon: <Users className="h-8 w-8 text-teal-500" />,
      title: "Digestive Health",
      treatments: ["IBS & IBD", "Gastritis", "Liver Disorders", "Digestive Issues"],
      description: "Restore digestive health and improve nutrient absorption naturally."
    }
  ];

  const acuteConditions = [
    "Fever & Common Cold",
    "Diarrhea & Vomiting", 
    "Minor Infections",
    "Acute Pain Relief",
    "Emergency Care",
    "First Aid Treatment"
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
              Our <span className="text-blue-600">Treatments</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive homeopathic solutions for all your health concerns. 
              From acute conditions to chronic diseases, we provide natural healing that works.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fast-Acting Treatments */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="text-green-600">Fast-Acting</span> Treatments
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Contrary to popular belief, homeopathy can work faster than conventional medicine 
              for many acute conditions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {acuteConditions.map((condition, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500"
              >
                <div className="flex items-center">
                  <Zap className="h-6 w-6 text-green-500 mr-3" />
                  <span className="font-semibold text-gray-800">{condition}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-green-50 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">Why Choose Our Acute Care?</h3>
            <p className="text-green-700 leading-relaxed">
              Our homeopathic treatments for acute conditions often work faster than conventional medicine. 
              Conditions like diarrhea, minor infections, and fever respond quickly to our natural remedies, 
              providing relief without side effects or complications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="text-blue-600">Specialized</span> Treatment Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our clinic offers comprehensive solutions for various health conditions under one roof. 
              Each treatment is personalized to your unique constitution and symptoms.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {treatmentCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-gray-800 ml-3">{category.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.treatments.map((treatment, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 text-sm">{treatment}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Treatment Process</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every patient receives personalized care through our comprehensive treatment approach.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Detailed Consultation",
                description: "Complete health evaluation including physical, mental, and emotional aspects"
              },
              {
                step: "02", 
                title: "Case Analysis",
                description: "Thorough analysis of symptoms, constitution, and individual characteristics"
              },
              {
                step: "03",
                title: "Remedy Selection",
                description: "Careful selection of the most suitable homeopathic remedy for your condition"
              },
              {
                step: "04",
                title: "Follow-up Care",
                description: "Regular monitoring and adjustment of treatment based on your progress"
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Experience Natural Healing?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a consultation with Dr. Deepthi and discover how homeopathy can 
              transform your health naturally and safely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/book-appointment"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Book Appointment
              </motion.a>
              <motion.a
                href="tel:8309853792"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Call: 8309853792
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Treatments;