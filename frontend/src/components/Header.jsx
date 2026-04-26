import { assets } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl px-6 md:px-10 2xl:px-20 py-12 
    bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-white/20 rounded-full blur-3xl top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-300/30 rounded-full blur-3xl bottom-[-100px] right-[-100px]"></div>

      <div className="relative flex flex-col md:flex-row items-center">

        {/* LEFT SIDE */}
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-white">

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Book Appointment <br />
            <span className="text-yellow-300">
              With Trusted Doctors
            </span>
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm opacity-90">
            <img className="w-28" src={assets.group_profiles} alt="" />
            <p className="max-w-md">
              Browse through our list of verified doctors and schedule your
              appointment easily and securely.
            </p>
          </div>

          {/* CTA BUTTON */}
          <a
            href="#speciality"
            className="flex items-center gap-2 bg-white text-gray-700 
            px-6 py-3 rounded-full text-sm font-medium 
            shadow-lg hover:scale-105 hover:shadow-xl 
            transition-all duration-300"
          >
            Book Appointment
            <img className="w-3" src={assets.arrow_icon} alt="" />
          </a>

        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-1/2 relative mt-10 md:mt-0 flex justify-center">

          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl shadow-xl">
            <img
              className="w-full max-w-md rounded-xl object-cover"
              src={assets.header_img}
              alt="header"
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Header;