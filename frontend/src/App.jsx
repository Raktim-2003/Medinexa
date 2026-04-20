import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Login from "./pages/Login";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import Ambulance from "./pages/Ambulance";
import Service from "./pages/Service";

const App = () => {
  const location = useLocation();

  // 🚫 Hide navbar + footer on login page
  const hideLayout = location.pathname === "/login";

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Ambulance" element={<Ambulance />} />
        <Route path="/Service" element={<Service />} />
      </Routes>

      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;