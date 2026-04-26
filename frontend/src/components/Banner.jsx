import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 
    bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[350px] h-[350px] bg-white/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[350px] h-[350px] bg-indigo-300/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between">

        {/* LEFT */}
        <div className="flex-1 py-10 md:py-16 lg:py-20 text-white">

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br />
            <span className="text-yellow-300">
              With 100+ Trusted Doctors
            </span>
          </h1>

          <p className="mt-4 text-sm sm:text-base opacity-90 max-w-md">
            Join thousands of users who trust our platform for quick and easy
            healthcare access.
          </p>

          {/* CTA */}
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="mt-6 px-8 py-3 rounded-full text-sm sm:text-base 
            bg-white text-gray-700 font-medium 
            shadow-lg hover:scale-105 hover:shadow-xl 
            transition duration-300"
          >
            Create Account
          </button>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex md:w-1/2 justify-end">

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl">
            <img
              className="w-full max-w-sm rounded-xl object-cover"
              src={assets.appointment_img}
              alt="appointment"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Banner;