import React from "react";

export default function AmbulanceServices() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Ambulance Services – Health Bridge Hospital
      </h1>
      <p className="text-lg text-center mb-10">
        Rapid, Reliable, and Ready – 24/7 Emergency Ambulance Support
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Ambulance Fleet</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ServiceCard
            title="Basic Life Support (BLS)"
            description="Equipped for non-emergency patient transport, first-aid, and monitoring vital signs during transit."
            imageUrl="data:image/jpeg;base64,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"
          />
          <ServiceCard
            title="Advanced Life Support (ALS)"
            description="Staffed with trained paramedics and equipped with life-saving equipment such as ventilators and defibrillators."
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqQ7YHyEAPcEP8WIv3PNI9ZzbzAnUtszIjg&s"
          />
          <ServiceCard
            title="Neonatal Ambulance (Free Service for Babies)"
            description="Specialized care and transportation for newborns requiring immediate medical attention. This service is provided free of charge for babies."
            imageUrl="https://imgs.search.brave.com/MMUUHdcrtPA6zvgZVj_nGbN9ffAaCEY8IFZJJUilizk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0LzEyLzQxLzQx/LzM2MF9GXzQxMjQx/NDExNl9IV3ZCZ1J3/YXJScXFITTVwZW9q/R21XUGtUMVF5Nk0y/RC5qcGc"
          />
          <ServiceCard
            title="Cardiac Ambulance"
            description="Outfitted with ECG, defibrillator, and cardiac monitors to handle heart-related emergencies."
            imageUrl="https://imgs.search.brave.com/r6z1AWfH-I4FhSZHZNcLwVrrHEjbDD081XKRrSgadRM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAyLzg4Lzk1LzE0/LzM2MF9GXzI4ODk1/MTQzMV9jNVpOSW51/RVpiTjRCbFljSHla/aVZTdUluSUF5OHpN/YS5qcGc"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Our Ambulance Services?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>24/7 emergency response with trained medical staff</li>
          <li>Real-time GPS tracking for faster arrival</li>
          <li>Coordination with hospital ER for seamless patient handoff</li>
          <li>Sanitized, well-maintained vehicles with modern equipment</li>
          <li>Available for hospitals, homes, highways, and public events</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Service Areas</h2>
        <p>
          Our ambulances are strategically stationed across the city to ensure the fastest possible response times. We serve:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>Urban and suburban zones</li>
          <li>Highways and industrial areas</li>
          <li>Rural and remote villages (on request)</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Need Immediate Assistance?</h2>
        <p className="mb-6">Call our 24/7 Ambulance Hotline or request a dispatch online now.</p>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
          Book for Ambulance
        </button>
      </section>
    </div>
  );
}

function ServiceCard({ title, description, imageUrl }) {
  return (
    <div className="border rounded-2xl shadow p-4 bg-white">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
