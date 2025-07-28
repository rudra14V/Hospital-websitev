export interface Appointment {
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
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export interface Doctor {
  username: string;
  password: string;
  name: string;
  qualification: string;
}