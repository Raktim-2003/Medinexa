import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { token, setToken, userData, setUserData } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Proper logout (FIXED)
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserData(null);
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 bg-gray-50 pt-6 pb-2">

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* NAVBAR BOX */}
        <div className="flex items-center justify-between 
          bg-white/80 backdrop-blur-xl 
          border border-gray-200 
          rounded-2xl 
          px-8 py-4 
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

          {/* LOGO */}
          <NavLink to="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src="https://res.cloudinary.com/dksiyjiby/image/upload/v1747995821/x36xthyttbyzlrkg9zqs.png"
                className="w-12 h-12"
                alt="logo"
              />
              <h1 className="text-2xl font-bold text-blue-600">
                Medinexa
              </h1>
            </div>
          </NavLink>

          {/* MENU */}
          <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
            {[
              { name: "HOME", path: "/" },
              { name: "ALL DOCTORS", path: "/doctors" },
              { name: "ABOUT", path: "/about" },
              { name: "CONTACT", path: "/contact" },
              { name: "SERVICE", path: "/service" },
              { name: "AMBULANCE", path: "/Ambulance" },
            ].map((item, i) => (
              <NavLink key={i} to={item.path}>
                {({ isActive }) => (
                  <li className="relative group cursor-pointer text-[15px]">
                    <span className={isActive ? "text-blue-600" : ""}>
                      {item.name}
                    </span>

                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </li>
                )}
              </NavLink>
            ))}
          </ul>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4 relative">

            {token ? (
              <div className="relative" ref={dropdownRef}>

                {/* PROFILE BUTTON */}
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 cursor-pointer 
                  bg-white/90 border border-gray-200 
                  px-3 py-2 rounded-full 
                  shadow-sm hover:shadow-md transition"
                >
                  <img
                    className="w-9 h-9 rounded-full object-cover"
                    src={userData?.image || "https://via.placeholder.com/40"}
                    alt="user"
                  />
                  <img
                    className="w-3 opacity-60"
                    src={assets.dropdown_icon}
                    alt="dropdown"
                  />
                </div>

                {/* DROPDOWN */}
                {showDropdown && (
                  <div className="absolute right-0 mt-4 w-52 
                    bg-white/95 backdrop-blur-lg 
                    border border-gray-200 
                    rounded-xl shadow-xl p-3 z-50">

                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setShowDropdown(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      My Profile
                    </p>

                    <p
                      onClick={() => {
                        navigate("/my-appointments");
                        setShowDropdown(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      My Appointments
                    </p>

                    <p
                      onClick={logout}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-md cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:block bg-gradient-to-r from-blue-600 to-indigo-500 
                text-white px-6 py-2 rounded-full shadow-md 
                hover:scale-105 transition duration-300"
              >
                Get Started
              </button>
            )}

            {/* MOBILE MENU BUTTON */}
            <img
              onClick={() => setShowMenu(true)}
              className="w-7 md:hidden cursor-pointer"
              src={assets.menu_icon}
              alt="menu"
            />

            {/* MOBILE MENU */}
            <div
              className={`fixed top-0 right-0 h-full w-full bg-white/95 backdrop-blur-lg z-50 transform ${
                showMenu ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 md:hidden`}
            >
              <div className="flex items-center justify-between px-5 py-6 border-b">
                <h1 className="text-xl font-bold text-blue-600">Menu</h1>
                <img
                  className="w-7 cursor-pointer"
                  onClick={() => setShowMenu(false)}
                  src={assets.cross_icon}
                  alt="close"
                />
              </div>

              <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
                {[
                  { name: "Home", path: "/" },
                  { name: "All Doctors", path: "/doctors" },
                  { name: "About", path: "/about" },
                  { name: "Contact", path: "/contact" },
                  { name: "Ambulance", path: "/Ambulance" },
                ].map((item, i) => (
                  <NavLink
                    key={i}
                    onClick={() => setShowMenu(false)}
                    to={item.path}
                  >
                    <p className="hover:text-blue-600 transition">
                      {item.name}
                    </p>
                  </NavLink>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;