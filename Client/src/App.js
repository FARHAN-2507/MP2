import './styles/global.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AppointmentsCard from './components/AppointmentsCard';
import ServicesCard from './components/ServicesCard';
import StaffAttendanceCard from './components/StaffAttendanceCard';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import UploadPage from "./pages/UploadPage";
import WhatsAppButton from "./components/WhatsAppButton";


// Lazy load other components for performance
const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Services = React.lazy(() => import('./pages/Services'));
const BookAppointment = React.lazy(() => import('./pages/BookAppointment'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/appointments" element={<AppointmentsCard  />} />
          <Route path="/servicescard" element={<ServicesCard />} />
          <Route path="/staffattendancecard" element={<StaffAttendanceCard />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/uploadpage" element={<UploadPage />} />

          {/* Catch-all route for invalid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <WhatsAppButton />
      </Suspense>
    </Router>
  );
}

export default App;
