import React from "react";

export default function AmbulanceServices() {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-12">

      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          🚑 Ambulance <span className="text-blue-600">Services</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Rapid, reliable, and ready — 24/7 emergency ambulance support at your service.
        </p>
      </div>

      {/* SERVICES */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Our Ambulance Fleet
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="Basic Life Support"
            description="For non-emergency transport with essential monitoring and first aid."
            imageUrl="https://cdn-icons-png.flaticon.com/512/2967/2967350.png"
          />
          <ServiceCard
            title="Advanced Life Support"
            description="Equipped with ventilators, defibrillators, and trained paramedics."
            imageUrl="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
          />
          <ServiceCard
            title="Neonatal Ambulance"
            description="Specialized ambulance for newborn emergency care (Free service)."
            imageUrl="https://cdn-icons-png.flaticon.com/512/3076/3076125.png"
          />
          <ServiceCard
            title="Cardiac Ambulance"
            description="Advanced cardiac monitoring and emergency heart care equipment."
            imageUrl="https://cdn-icons-png.flaticon.com/512/3771/3771476.png"
          />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Why Choose Our Service?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "24/7 emergency response",
            "GPS-enabled fastest dispatch",
            "Direct hospital coordination",
            "Fully sanitized & modern vehicles",
            "Coverage across all locations",
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 
              rounded-xl p-5 shadow-md hover:shadow-lg transition"
            >
              ✔ {item}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Service Areas
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Our ambulances are strategically positioned to ensure fast response across:
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {["Urban", "Suburban", "Highways", "Rural"].map((area, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* EMERGENCY CTA */}
      <section className="text-center bg-gradient-to-r from-red-500 to-orange-500 
      text-white p-10 rounded-2xl shadow-lg">

        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Need Immediate Help?
        </h2>

        <p className="mb-6">
          Call our 24/7 emergency hotline or book an ambulance instantly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-red-500 font-medium px-6 py-3 rounded-full 
          hover:scale-105 transition">
            📞 Call Now
          </button>

          <button className="bg-black text-white px-6 py-3 rounded-full 
          hover:scale-105 transition">
            🚑 Book Ambulance
          </button>
        </div>
      </section>

    </div>
  );
}

/* CARD */
function ServiceCard({ title, description, imageUrl }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg border border-gray-200 
    rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 
    transition duration-300 text-center">

      <img
        src={imageUrl}
        alt={title}
        className="w-16 h-16 mx-auto mb-4"
      />

      <h3 className="text-lg font-semibold text-blue-600 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
}