import { assets } from "../assets/assets_frontend/assets";
import { useEffect, useState } from "react";

const About = () => {
  // ✅ FIX: Added missing state
  const [counts, setCounts] = useState({
    doctors: 0,
    users: 0,
    appointments: 0,
  });

  // ✅ FIX: Counter animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        doctors: prev.doctors < 100 ? prev.doctors + 2 : 100,
        users: prev.users < 10000 ? prev.users + 200 : 10000,
        appointments:
          prev.appointments < 5000 ? prev.appointments + 100 : 5000,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">

      {/* HERO HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-blue-600">Medinexa</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Transforming healthcare access with smart, seamless, and user-friendly solutions.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">

        <div className="flex-1">
          <img
            className="w-full rounded-2xl shadow-lg"
            src={assets.about_image}
            alt="about"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-800">Medinexa</span>, your
            trusted partner in managing healthcare needs efficiently.
          </p>

          <p>
            We simplify appointment booking and medical record management
            through a seamless and user-friendly experience.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p>
              To bridge the gap between patients and healthcare providers using
              smart technology.
            </p>
          </div>
        </div>
      </div>

      {/* 🔥 STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {counts.doctors}+
          </h2>
          <p className="text-gray-600 mt-2">Doctors</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {counts.users}+
          </h2>
          <p className="text-gray-600 mt-2">Happy Users</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {counts.appointments}+
          </h2>
          <p className="text-gray-600 mt-2">Appointments</p>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Efficiency",
            desc: "Quick and seamless appointment scheduling.",
          },
          {
            title: "Convenience",
            desc: "Access doctors anytime, anywhere.",
          },
          {
            title: "Personalization",
            desc: "Tailored healthcare experience.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/80 p-6 rounded-2xl shadow-md 
            hover:shadow-xl hover:-translate-y-2 transition"
          >
            <h3 className="font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* TEAM SECTION */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Meet Our <span className="text-blue-600">Team</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {[
          { name: "Dr. Rahul Sharma", role: "Cardiologist" },
          { name: "Dr. Priya Singh", role: "Dermatologist" },
          { name: "Dr. Amit Roy", role: "Neurologist" },
        ].map((member, i) => (
          <div
            key={i}
            className="bg-white/80 p-6 rounded-2xl shadow-md text-center 
            hover:shadow-xl hover:-translate-y-2 transition"
          >
            <img
              className="w-20 h-20 rounded-full mx-auto mb-4"
              src={assets.profile_pic}
              alt="profile"
            />
            <h3 className="font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-sm text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default About;