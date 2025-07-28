import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Mail, MapPin, Heart, FileText, Building2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const { addAppointment } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    fatherName: '',
    email: '',
    contact: '',
    address: '',
    date: '',
    timeSlot: '',
    problemDescription: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const getAvailableTimeSlots = () => {
    const selectedDate = formData.date;
    if (!selectedDate) return timeSlots;

    const today = new Date();
    const selected = new Date(selectedDate);
    
    if (selected.toDateString() !== today.toDateString()) {
      return timeSlots;
    }

    const currentTime = today.getHours() * 60 + today.getMinutes();
    
    return timeSlots.filter(slot => {
      const [time, period] = slot.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      let slotHours = hours;
      
      if (period === 'PM' && hours !== 12) {
        slotHours += 12;
      } else if (period === 'AM' && hours === 12) {
        slotHours = 0;
      }
      
      const slotTime = slotHours * 60 + minutes;
      return slotTime > currentTime + 30;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact number is required';
    } else if (!/^\d{10}$/.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.date) {
      newErrors.date = 'Appointment date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select today or a future date';
      }
    }
    if (!formData.timeSlot) {
      newErrors.timeSlot = 'Time slot is required';
    } else {
      const availableSlots = getAvailableTimeSlots();
      if (!availableSlots.includes(formData.timeSlot)) {
        newErrors.timeSlot = 'Selected time slot is no longer available';
      }
    }
    if (!formData.problemDescription.trim()) {
      newErrors.problemDescription = 'Problem description is required';
    } else if (formData.problemDescription.trim().split(/\s+/).length > 200) {
      newErrors.problemDescription = 'Problem description must be within 200 words';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (name === 'date' && formData.timeSlot) {
      const availableSlots = getAvailableTimeSlots();
      if (!availableSlots.includes(formData.timeSlot)) {
        setFormData(prev => ({ ...prev, timeSlot: '' }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addAppointment({
        ...formData,
        age: parseInt(formData.age)
      });
      navigate('/appointment-success');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div className="min-h-screen py-8 md:py-16 bg-gradient-to-br from-rose-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-100 to-indigo-100 py-8 md:py-16 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-20 h-20 bg-rose-200 rounded-full opacity-30"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-200 rounded-full opacity-30"
        />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6 md:mb-8"
          >
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Book Your <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Appointment</span>
            </motion.h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Take the first step towards natural healing. Schedule your consultation 
              with Dr. Deepthi and experience the power of homeopathy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 border border-white/20"
          >
            <motion.div 
              className="flex items-center space-x-2 text-emerald-600"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Morning: 10AM - 3PM</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-2 text-indigo-600"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Evening: 6PM - 9PM</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clinic Information Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-rose-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                  <Building2 className="h-6 md:h-8 w-6 md:w-8 mr-3" />
                  Sri Venkateshwara Homeopathy Clinic
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">Behind the Bus Stand, U.B Road, Bhadrachalam</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">8309853792</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">163deepthi@gmail.com</span>
                  </div>
                </div>
              </div>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/vadina hospital.jpg"
                  alt="Sri Venkateshwara Homeopathy Clinic"
                  className="w-full h-auto max-h-64 object-cover rounded-xl shadow-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20"
          >
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Heart className="h-6 md:h-8 w-6 md:w-8 text-rose-500 mr-3" />
              </motion.div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Patient Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >{errors.fullName}</motion.p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age" 
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    max="120"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                      errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your age"
                  />
                  {errors.age && <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >{errors.age}</motion.p>}
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:border-rose-300"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                      errors.fatherName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >{errors.fatherName}</motion.p>}
                </motion.div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >{errors.email}</motion.p>}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                      errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.contact && <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-500"
                  >{errors.contact}</motion.p>}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none text-sm md:text-base ${
                    errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-500"
                >{errors.address}</motion.p>}
              </motion.div>

              {/* Problem Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Problem Description *
                </label>
                <textarea
                  id="problemDescription"
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none text-sm md:text-base ${
                    errors.problemDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                  }`}
                  placeholder="Please describe your health concerns, symptoms, and any relevant medical history..."
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${getWordCount(formData.problemDescription) > 180 ? 'text-red-500' : 'text-gray-500'}`}>
                    {getWordCount(formData.problemDescription)}/200 words
                  </span>
                  {getWordCount(formData.problemDescription) === 200 && (
                    <span className="text-sm text-red-500">Word limit reached</span>
                  )}
                </div>
                {errors.problemDescription && <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1 text-sm text-red-500"
                >{errors.problemDescription}</motion.p>}
              </motion.div>

              {/* Appointment Details */}
              <motion.div 
                className="border-t pt-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-rose-600" />
                  Appointment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={getMinDate()}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                        errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                      }`}
                    />
                    {errors.date && <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-500"
                    >{errors.date}</motion.p>}
                  </div>

                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base ${
                        errors.timeSlot ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                      }`}
                    >
                      <option value="">Select a time slot</option>
                      {availableTimeSlots.length > 0 ? (
                        <>
                          <optgroup label="Morning Session (10 AM - 3 PM)">
                            {availableTimeSlots.filter(slot => slot.includes('AM') || ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].includes(slot)).map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </optgroup>
                          <optgroup label="Evening Session (6 PM - 9 PM)">
                            {availableTimeSlots.filter(slot => slot.includes('PM') && !['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM'].includes(slot)).map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </optgroup>
                        </>
                      ) : (
                        <option disabled>No slots available for selected date/time</option>
                      )}
                    </select>
                    {errors.timeSlot && <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1 text-sm text-red-500"
                    >{errors.timeSlot}</motion.p>}
                    {formData.date && availableTimeSlots.length === 0 && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-sm text-orange-600"
                      >
                        No time slots available for today. Please select a future date.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white py-3 md:py-4 px-6 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Book Appointment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;