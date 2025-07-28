import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import AppointmentBanner from './components/AppointmentBanner';
import Home from './pages/Home';
import About from './pages/About';
import Treatments from './pages/Treatments';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import AppointmentSuccess from './pages/AppointmentSuccess';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/treatments" element={<Treatments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/appointment-success" element={<AppointmentSuccess />} />
              <Route path="/doctor-login" element={<DoctorLogin />} />
              <Route path="/doctor-dashboard/*" element={<DoctorDashboard />} />
            </Routes>
          </main>
          <Footer />
          <FloatingButtons />
          <AppointmentBanner />
        </div>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
);