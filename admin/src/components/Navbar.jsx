import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
  };

  // 🔥 TIME-BASED GREETING
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  return (
    <div className="w-full px-4 sm:px-10 py-4 bg-gray-50">

      <div className="flex justify-between items-center 
        bg-white/80 backdrop-blur-xl 
        border border-gray-200 
        rounded-2xl 
        px-6 py-3 
        shadow-[0_8px_30px_rgba(0,0,0,0.08)]">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">

          {/* LOGO */}
          <img
            src="https://res.cloudinary.com/dksiyjiby/image/upload/v1747995821/x36xthyttbyzlrkg9zqs.png"
            alt="logo"
            className="w-12 h-12 object-contain"
          />

          {/* NAME */}
          <div className="flex flex-col">

            <h1 className="text-xl font-bold text-blue-600">
              Health Bridge
            </h1>

            {/* 🔥 GREETING */}
            <p className="text-sm text-gray-500">
              {getGreeting()}{" "}
              <span className="font-medium text-gray-700">
                {aToken ? "Admin" : "Doctor"}
              </span>
            </p>

          </div>

          {/* ROLE BADGE */}
          <span
            className={`ml-2 px-3 py-1 text-xs rounded-full font-medium 
              ${aToken
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
              }`}
          >
            {aToken ? "Admin" : "Doctor"}
          </span>
        </div>

        {/* RIGHT SIDE */}
        <button
          onClick={logout}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white text-sm px-6 py-2 rounded-full 
          shadow-md hover:scale-105 transition duration-300"
        >
          Log out
        </button>

      </div>
    </div>
  );
};

export default Navbar;