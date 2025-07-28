import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Heart, FileText, Building2, CheckCircle, ArrowLeft } from 'lucide-react';

interface Appointment {
  id: string;
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  fatherName: string;
  email: string;
  contact: string;
  address: string;
  date: string;
  timeSlot: string;
  problemDescription: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: Date;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'form' | 'success'>('form');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
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
    if (!formData.date) return timeSlots;

    const today = new Date();
    const selected = new Date(formData.date);
    
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
    if (!formData.age || parseInt(formData.age) < 1 || parseInt(formData.age) > 120 || isNaN(parseInt(formData.age))) {
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
      if (selectedDate < today || isNaN(selectedDate.getTime())) {
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

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        addAppointment({
          ...formData,
          age: parseInt(formData.age)
        });
        setCurrentView('success');
      } catch (error) {
        console.error('Error booking appointment:', error);
        setErrors(prev => ({
          ...prev,
          submit: 'An error occurred while booking. Please try again.'
        }));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      age: '',
      gender: 'male',
      fatherName: '',
      email: '',
      contact: '',
      address: '',
      date: '',
      timeSlot: '',
      problemDescription: ''
    });
    setErrors({});
    setCurrentView('form');
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  if (currentView === 'success') {
    return (
      <div className="min-h-screen py-16 bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 text-center border border-white/20 transform hover:scale-105 transition-all duration-500">
            <div className="mb-6">
              <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-4 animate-pulse" />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Appointment Booked Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Thank you for choosing Sri Venkateshwara Homeopathy Clinic. 
                Your appointment has been confirmed and you'll receive a confirmation call shortly.
              </p>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Appointment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p><strong>Name:</strong> {formData.fullName}</p>
                  <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {formData.timeSlot}</p>
                </div>
                <div className="text-left">
                  <p><strong>Contact:</strong> {formData.contact}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Status:</strong> Confirmed</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-blue-700 text-left space-y-1">
                <li>• You'll receive a confirmation call within 24 hours</li>
                <li>• Please arrive 15 minutes before your appointment</li>
                <li>• Bring any previous medical reports if available</li>
                <li>• Our clinic is located behind the Bus Stand, U.B Road, Bhadrachalam</li>
              </ul>
            </div>

            <button
              onClick={resetForm}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Book Another Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-16 bg-gradient-to-br from-rose-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-100 to-indigo-100 py-8 md:py-16 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 bg-rose-200 rounded-full opacity-30 animate-spin-slow"></div>
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-indigo-200 rounded-full opacity-30 animate-bounce-slow"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-6 md:mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 animate-pulse-gentle">
              Book Your <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Appointment</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Take the first step towards natural healing. Schedule your consultation 
              with Dr. Deepthi and experience the power of homeopathy.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center space-x-2 text-emerald-600 hover:scale-105 transition-transform duration-300">
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Morning: 10AM - 3PM</span>
            </div>
            <div className="flex items-center space-x-2 text-indigo-600 hover:scale-105 transition-transform duration-300">
              <Clock className="h-5 w-5" />
              <span className="font-medium text-sm md:text-base">Evening: 6PM - 9PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Information Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-rose-500 to-indigo-600 rounded-2xl p-6 md:p-8 text-white mb-8 transform hover:scale-105 transition-all duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center">
                  <Building2 className="h-6 md:h-8 w-6 md:w-8 mr-3" />
                  Sri Venkateshwara Homeopathy Clinic
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center hover:scale-105 transition-transform duration-300">
                    <MapPin className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">Behind the Bus Stand U.B Road Bhadrachalam</span>
                  </div>
                  <div className="flex items-center hover:scale-105 transition-transform duration-300">
                    <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">8309853792</span>
                  </div>
                  <div className="flex items-center hover:scale-105 transition-transform duration-300">
                    <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span className="text-sm md:text-base">163deepthi@gmail.com</span>
                  </div>
                </div>
              </div>
              <div className="relative hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Sri Venkateshwara Homeopathy Clinic"
                  className="w-full h-auto max-h-64 object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-center mb-6 md:mb-8">
              <div className="hover:scale-110 transition-transform duration-300">
                <Heart className="h-6 md:h-8 w-6 md:w-8 text-rose-500 mr-3 animate-pulse" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Patient Information</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submit && (
                <p className="text-sm text-red-500 text-center animate-fade-in">
                  {errors.submit}
                </p>
              )}
              
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="animate-slide-in-left">
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
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500 animate-fade-in">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="animate-slide-in-right">
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
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                      errors.age ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your age"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-500 animate-fade-in">
                      {errors.age}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="animate-slide-in-left">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:border-rose-300 hover:shadow-md"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="animate-slide-in-right">
                  <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                      errors.fatherName ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter father's name"
                  />
                  {errors.fatherName && (
                    <p className="mt-1 text-sm text-red-500 animate-fade-in">
                      {errors.fatherName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="animate-slide-in-left">
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
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                      errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 animate-fade-in">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="animate-slide-in-right">
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
                    className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                      errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                    }`}
                    placeholder="Your phone number"
                  />
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-500 animate-fade-in">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </div>

              <div className="animate-fade-in">
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
                  className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none text-sm md:text-base hover:shadow-md ${
                    errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                  }`}
                  placeholder="Enter your complete address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500 animate-fade-in">
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Problem Description */}
              <div className="animate-fade-in">
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
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 resize-none text-sm md:text-base hover:shadow-md ${
                    errors.problemDescription ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                  }`}
                  placeholder="Please describe your health concerns, symptoms, and any relevant medical history..."
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${getWordCount(formData.problemDescription) > 180 ? 'text-red-500' : 'text-gray-500'}`}>
                    {getWordCount(formData.problemDescription)}/200 words
                  </span>
                  {getWordCount(formData.problemDescription) >= 200 && (
                    <span className="text-sm text-red-500">
                      Word limit reached
                    </span>
                  )}
                </div>
                {errors.problemDescription && (
                  <p className="mt-1 text-sm text-red-500 animate-fade-in">
                    {errors.problemDescription}
                  </p>
                )}
              </div>

              {/* Appointment Details */}
              <div className="border-t pt-6 animate-fade-in">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 text-rose-600 mr-2" />
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
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
                        errors.date ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-rose-300'
                      }`}
                    />
                    {errors.date && (
                      <p className="mt-1 text-sm text-red-500 animate-fade-in">
                        {errors.date}
                      </p>
                    )}
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
                      className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-300 text-sm md:text-base hover:shadow-md ${
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
                    {errors.timeSlot && (
                      <p className="mt-1 text-sm text-red-500 animate-fade-in">
                        {errors.timeSlot}
                      </p>
                    )}
                    {formData.date && availableTimeSlots.length === 0 && (
                      <p className="mt-1 text-sm text-orange-600 animate-fade-in">
                        No time slots available for today. Please select a future date.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 text-white py-3 md:py-4 px-6 rounded-xl font-semibold hover:from-rose-600 hover:via-pink-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl text-sm md:text-base transform hover:scale-105 hover:-translate-y-1 animate-fade-in"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;