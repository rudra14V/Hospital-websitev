import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  Clock, 
  LogOut, 
  Home,
  FileText,
  Activity,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MessageSquare,
  Edit3,
  Save,
  X
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const DoctorDashboard: React.FC = () => {
  const { 
    isLoggedIn, 
    logout, 
    appointments, 
    contactForms,
    getTodaysAppointments, 
    updateAppointmentStatus,
    updateAppointment
  } = useApp();
  const location = useLocation();
  const [editingAppointment, setEditingAppointment] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  if (!isLoggedIn) {
    return <Navigate to="/doctor-login" replace />;
  }

  const todaysAppointments = getTodaysAppointments();
  const totalAppointments = appointments.length;
  const pendingAppointments = appointments.filter(app => app.status === 'pending').length;
  const completedAppointments = appointments.filter(app => app.status === 'completed').length;

  const navItems = [
    { name: 'Dashboard', path: '/doctor-dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Today\'s Appointments', path: '/doctor-dashboard/today', icon: <Calendar className="h-5 w-5" /> },
    { name: 'All Appointments', path: '/doctor-dashboard/appointments', icon: <Users className="h-5 w-5" /> },
    { name: 'Patient History', path: '/doctor-dashboard/history', icon: <FileText className="h-5 w-5" /> },
    { name: 'Contact Forms', path: '/doctor-dashboard/contacts', icon: <MessageSquare className="h-5 w-5" /> }
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment(appointment.id);
    setEditFormData({
      fullName: appointment.fullName,
      age: appointment.age,
      gender: appointment.gender,
      fatherName: appointment.fatherName,
      email: appointment.email,
      contact: appointment.contact,
      address: appointment.address,
      date: appointment.date,
      timeSlot: appointment.timeSlot,
      problemDescription: appointment.problemDescription
    });
  };

  const handleSaveEdit = (appointmentId: string) => {
    updateAppointment(appointmentId, editFormData);
    setEditingAppointment(null);
    setEditFormData({});
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setEditFormData({});
  };

  const AppointmentCard = ({ appointment, showEdit = false }: { appointment: any, showEdit?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      {editingAppointment === appointment.id ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={editFormData.fullName}
              onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Full Name"
            />
            <input
              type="number"
              value={editFormData.age}
              onChange={(e) => setEditFormData({...editFormData, age: parseInt(e.target.value)})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Age"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Email"
            />
            <input
              type="tel"
              value={editFormData.contact}
              onChange={(e) => setEditFormData({...editFormData, contact: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Contact"
            />
          </div>
          <textarea
            value={editFormData.problemDescription}
            onChange={(e) => setEditFormData({...editFormData, problemDescription: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            rows={3}
            placeholder="Problem Description"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleSaveEdit(appointment.id)}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{appointment.fullName}</h3>
              <p className="text-gray-600 text-sm">Age: {appointment.age} | Gender: {appointment.gender}</p>
              <p className="text-gray-600 text-sm">Father: {appointment.fatherName}</p>
            </div>
            <div className="text-left md:text-right mt-2 md:mt-0">
              <p className="font-semibold text-blue-600">{formatDate(appointment.date)} - {appointment.timeSlot}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                appointment.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                appointment.status === 'completed' ? 'bg-green-100 text-green-600' :
                'bg-red-100 text-red-600'
              }`}>
                {appointment.status}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-700">{appointment.contact}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-gray-700 break-all">{appointment.email}</span>
            </div>
          </div>

          {appointment.problemDescription && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Problem Description:</h4>
              <p className="text-sm text-gray-700">{appointment.problemDescription}</p>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {appointment.status === 'pending' && (
              <>
                <button
                  onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete
                </button>
                <button
                  onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <XCircle className="h-4 w-4 mr-1" />
                  Cancel
                </button>
              </>
            )}
            {showEdit && (
              <button
                onClick={() => handleEditAppointment(appointment)}
                className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Edit3 className="h-4 w-4 mr-1" />
                Edit
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );

  const DashboardHome = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-xl p-4 md:p-6"
      >
        <h1 className="text-xl md:text-2xl font-bold mb-2">Welcome back, Dr. Deepthi! 👋</h1>
        <p className="opacity-90 text-sm md:text-base">Here's what's happening in your clinic today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Today's</p>
              <p className="text-xl md:text-2xl font-bold text-blue-600">{todaysAppointments.length}</p>
            </div>
            <Calendar className="h-6 md:h-8 w-6 md:w-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Total</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{totalAppointments}</p>
            </div>
            <Users className="h-6 md:h-8 w-6 md:w-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Pending</p>
              <p className="text-xl md:text-2xl font-bold text-orange-600">{pendingAppointments}</p>
            </div>
            <Clock className="h-6 md:h-8 w-6 md:w-8 text-orange-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-4 md:p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-xs md:text-sm">Completed</p>
              <p className="text-xl md:text-2xl font-bold text-purple-600">{completedAppointments}</p>
            </div>
            <Activity className="h-6 md:h-8 w-6 md:w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-4 md:p-6"
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Today's Appointments</h2>
        {todaysAppointments.length === 0 ? (
          <p className="text-gray-500 text-center py-8 text-sm md:text-base">No appointments scheduled for today.</p>
        ) : (
          <div className="space-y-4">
            {todaysAppointments.slice(0, 3).map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
            {todaysAppointments.length > 3 && (
              <Link 
                to="/doctor-dashboard/today"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4 text-sm md:text-base"
              >
                View all {todaysAppointments.length} appointments →
              </Link>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );

  const TodaysAppointments = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Today's Appointments</h2>
      {todaysAppointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 md:h-16 w-12 md:w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base md:text-lg">No appointments scheduled for today.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {todaysAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} showEdit={true} />
          ))}
        </div>
      )}
    </div>
  );

  const AllAppointments = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">All Appointments</h2>
      {appointments.length === 0 ? (
        <div className="text-center py-12">
          <Users className="h-12 md:h-16 w-12 md:w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base md:text-lg">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} showEdit={true} />
          ))}
        </div>
      )}
    </div>
  );

  const PatientHistory = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Patient History</h2>
      <div className="space-y-6">
        {appointments.map((appointment) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="border border-gray-200 rounded-lg p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{appointment.fullName}</h3>
                <p className="text-gray-600 text-sm">Father: {appointment.fatherName}</p>
                <p className="text-gray-600 text-sm">Age: {appointment.age} | Gender: {appointment.gender}</p>
              </div>
              <div className="text-left md:text-right mt-2 md:mt-0">
                <p className="font-semibold text-blue-600">{formatDate(appointment.date)} - {appointment.timeSlot}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                  appointment.status === 'completed' ? 'bg-green-100 text-green-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {appointment.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-700">{appointment.contact}</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-700 break-all">{appointment.email}</span>
              </div>
              <div className="text-gray-600">
                Booked: {formatDate(appointment.createdAt)}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {appointment.address}
              </p>
            </div>

            {appointment.problemDescription && (
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  <strong>Problem:</strong> {appointment.problemDescription}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  const ContactForms = () => (
    <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Contact Form Submissions</h2>
      {contactForms.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="h-12 md:h-16 w-12 md:w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-base md:text-lg">No contact form submissions yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {contactForms.map((form) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-lg p-4 md:p-6 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{form.name}</h3>
                  <p className="text-gray-600 text-sm">Submitted: {formatDateTime(form.createdAt)}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">{form.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-700 break-all">{form.email}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">Message:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">{form.message}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <a
                  href={`tel:${form.phone}`}
                  className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </a>
                <a
                  href={`mailto:${form.email}`}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 md:px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm md:text-base"
            >
              <LogOut className="h-4 md:h-5 w-4 md:w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-lg p-4">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 md:px-4 py-2 md:py-3 rounded-lg transition-colors text-sm md:text-base ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/today" element={<TodaysAppointments />} />
              <Route path="/appointments" element={<AllAppointments />} />
              <Route path="/history" element={<PatientHistory />} />
              <Route path="/contacts" element={<ContactForms />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;