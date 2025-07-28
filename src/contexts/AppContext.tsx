import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appointment, ContactForm, Doctor } from '../types';

interface AppState {
  appointments: Appointment[];
  contactForms: ContactForm[];
  isLoggedIn: boolean;
  doctor: Doctor | null;
}

interface AppContextType extends AppState {
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  updateAppointment: (id: string, appointment: Partial<Appointment>) => void;
  cancelAppointment: (id: string) => void;
  addContactForm: (form: Omit<ContactForm, 'id' | 'createdAt'>) => void;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  getTodaysAppointments: () => Appointment[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultDoctor: Doctor = {
  username: 'doctor',
  password: 'admin123',
  name: 'Dr. Deepthi',
  qualification: 'MD (Homeopathy), Rajiv Gandhi University Karnataka'
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    appointments: [],
    contactForms: [],
    isLoggedIn: false,
    doctor: null
  });

  useEffect(() => {
    const savedAppointments = localStorage.getItem('appointments');
    const savedContactForms = localStorage.getItem('contactForms');
    const savedLogin = localStorage.getItem('doctorLogin');

    setState(prev => ({
      ...prev,
      appointments: savedAppointments ? JSON.parse(savedAppointments) : [],
      contactForms: savedContactForms ? JSON.parse(savedContactForms) : [],
      isLoggedIn: savedLogin === 'true',
      doctor: savedLogin === 'true' ? defaultDoctor : null
    }));
  }, []);

  const addAppointment = (appointment: Omit<Appointment, 'id' | 'createdAt'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    const updatedAppointments = [...state.appointments, newAppointment];
    setState(prev => ({ ...prev, appointments: updatedAppointments }));
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    const updatedAppointments = state.appointments.map(app =>
      app.id === id ? { ...app, status } : app
    );
    setState(prev => ({ ...prev, appointments: updatedAppointments }));
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const updateAppointment = (id: string, updatedData: Partial<Appointment>) => {
    const updatedAppointments = state.appointments.map(app =>
      app.id === id ? { ...app, ...updatedData } : app
    );
    setState(prev => ({ ...prev, appointments: updatedAppointments }));
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const cancelAppointment = (id: string) => {
    const appointment = state.appointments.find(app => app.id === id);
    if (appointment) {
      const appointmentDate = new Date(appointment.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Allow cancellation until the day before
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      if (appointmentDate <= today) {
        throw new Error('Cannot cancel appointment on the same day');
      }

      updateAppointmentStatus(id, 'cancelled');
    }
  };

  const addContactForm = (form: Omit<ContactForm, 'id' | 'createdAt'>) => {
    const newForm: ContactForm = {
      ...form,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedForms = [...state.contactForms, newForm];
    setState(prev => ({ ...prev, contactForms: updatedForms }));
    localStorage.setItem('contactForms', JSON.stringify(updatedForms));
  };

  const login = (username: string, password: string): boolean => {
    if (username === defaultDoctor.username && password === defaultDoctor.password) {
      setState(prev => ({ ...prev, isLoggedIn: true, doctor: defaultDoctor }));
      localStorage.setItem('doctorLogin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setState(prev => ({ ...prev, isLoggedIn: false, doctor: null }));
    localStorage.removeItem('doctorLogin');
  };

  const getTodaysAppointments = (): Appointment[] => {
    const today = new Date().toISOString().split('T')[0];
    return state.appointments.filter(app => app.date === today && app.status !== 'cancelled');
  };

  const value: AppContextType = {
    ...state,
    addAppointment,
    updateAppointmentStatus,
    updateAppointment,
    cancelAppointment,
    addContactForm,
    login,
    logout,
    getTodaysAppointments
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};