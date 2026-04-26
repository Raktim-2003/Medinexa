import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          We’re here to help. Reach out to us for any queries or support.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">

        {/* LEFT IMAGE */}
        <div className="flex-1">
          <img
            className="w-full rounded-2xl shadow-lg"
            src={assets.contact_image}
            alt="contact"
          />
        </div>

        {/* RIGHT CARD */}
        <div className="flex-1 bg-white/80 backdrop-blur-lg border border-gray-200 
        rounded-2xl p-8 shadow-md flex flex-col gap-6">

          {/* OFFICE */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Our Office
            </h3>
            <p className="text-gray-500">
              Kolkata <br />
              India
            </p>
          </div>

          {/* CONTACT INFO */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Contact Info
            </h3>
            <p className="text-gray-500">
              Tel: +91 34622038 <br />
              Email: medinexa2026@gmail.com
            </p>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Need Help?
            </h3>
            <p className="text-gray-500">
              Find trusted doctors, explore specialities, and book appointments
              easily with Medinexa.
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">

            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="flex-1 px-6 py-3 rounded-full text-sm font-medium 
              bg-gradient-to-r from-blue-600 to-indigo-500 text-white 
              shadow-md hover:scale-105 transition duration-300"
            >
              Explore Doctors
            </button>

            <button
              onClick={() => {
                navigate("/");
                scrollTo(0, 0);
              }}
              className="flex-1 px-6 py-3 rounded-full text-sm font-medium 
              border border-gray-300 text-gray-700 
              hover:bg-gray-100 transition"
            >
              Go Home
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Contact;