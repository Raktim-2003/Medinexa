import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-32 px-6 md:px-16">

      {/* MAIN FOOTER */}
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200 
        rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
              Medinexa
            </h1>

            <p className="text-gray-600 leading-6 text-sm">
              Medinexa is an advanced healthcare platform designed to connect
              patients with trusted doctors and medical services seamlessly.
              Our mission is to simplify healthcare access through smart
              technology and user-friendly digital solutions.
            </p>
          </div>

          {/* CENTER */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Company
            </h2>

            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 transition cursor-pointer">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                <NavLink to="/about">About</NavLink>
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Get in Touch
            </h2>

            <ul className="flex flex-col gap-3 text-gray-600 text-sm">
              <li className="hover:text-blue-600 transition cursor-pointer">
                📞 +91 34622038
              </li>
              <li className="hover:text-blue-600 transition cursor-pointer">
                ✉️ medinexa2026@gmail.com
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-10 border-t border-gray-200 pt-6 text-center">

          <p className="text-gray-500 text-sm">
            © 2026 <span className="text-blue-600 font-medium">Medinexa</span>. All rights reserved.
          </p>

        </div>
      </div>
    </div>
  );
};

export default Footer;