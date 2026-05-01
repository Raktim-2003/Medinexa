import { assets } from "../assets/assets_frontend/assets";
import { useEffect, useState } from "react";
import doc1 from "../assets/assets_frontend/doc1.jpg";
import doc2 from "../assets/assets_frontend/doc2.jpg";
import doc3 from "../assets/assets_frontend/doc3.jpg";
import doc4 from "../assets/assets_frontend/doc4.jpg";
import doc5 from "../assets/assets_frontend/doc5.jpg";
/* ---------------- TEAM DATA ---------------- */
const teamData = [
  {
    name: "Dr. Raktim Mondal",
    role: "Neurologist",
    img: doc1,
    verified: true,
  },
  {
    name: "Dr. Puja Ghosh",
    role: "Dermatologist",
    img: doc2,
    verified: true,
  },
  {
    name: "Dr. Pritam Ghosh",
    role: "General physician",
    img: doc3,
    verified: false,
  },
  {
    name: "Dr. Shilpa Maity",
    role: "Gynecologist",
    img: doc4,
    verified: true,
  },
  {
    name: "Dr. Rupam Bhattcharya",
    role: "Gastroenterologist",
    img: doc5,
    verified: false,
  },
];

/* ---------------- TEAM SECTION ---------------- */
const TeamSection = () => {
  return (
    <div className="my-16 overflow-hidden">
      {/* TITLE */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800">
          Meet Our <span className="text-blue-600">Team</span>
        </h2>
      </div>

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[...teamData, ...teamData].map((member, i) => (
            <div
              key={i}
              className="min-w-[250px] bg-white/90 backdrop-blur-xl 
              p-6 rounded-2xl shadow-md text-center 
              hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <img
                className="w-28 h-28 rounded-full mx-auto mb-4 object-cover object-top border-2 border-blue-300 shadow-sm"
                src={member.img}
                alt=""
              />

              <div className="flex items-center justify-center gap-2">
                <h3 className="font-semibold text-gray-800">{member.name}</h3>

                {member.verified && (
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                    ✔
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- MAIN ABOUT ---------------- */
const About = () => {
  const [counts, setCounts] = useState({
    doctors: 0,
    users: 0,
    appointments: 0,
  });

  // COUNTER ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) => ({
        doctors: prev.doctors < 100 ? prev.doctors + 2 : 100,
        users: prev.users < 10000 ? prev.users + 200 : 10000,
        appointments: prev.appointments < 5000 ? prev.appointments + 100 : 5000,
      }));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          About <span className="text-blue-600">Medinexa</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Transforming healthcare access with smart, seamless solutions.
        </p>
      </div>

      {/* ABOUT SECTION */}
      <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-1">
          <img
            className="w-full rounded-2xl shadow-lg"
            src={assets.about_image}
            alt=""
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 text-gray-600">
          <p>
            Welcome to <b>Medinexa</b>, your trusted healthcare platform.
          </p>

          <p>
            We simplify appointment booking and healthcare management through a
            seamless experience.
          </p>

          <h3 className="font-semibold text-gray-800">Our Vision</h3>
          <p>
            Bridging the gap between patients and doctors using smart
            technology.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {counts.doctors}+
          </h2>
          <p className="text-gray-600 mt-2">Doctors</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-600">{counts.users}+</h2>
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
        <h2 className="text-2xl font-bold text-gray-800">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          { title: "Efficiency", desc: "Quick and seamless booking." },
          { title: "Convenience", desc: "Access doctors anytime." },
          { title: "Personalization", desc: "Tailored healthcare experience." },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/80 p-6 rounded-2xl shadow-md 
            hover:shadow-xl hover:-translate-y-2 transition"
          >
            <h3 className="font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* TEAM SECTION */}
      <TeamSection />
    </div>
  );
};

export default About;
