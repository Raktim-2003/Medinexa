import React from "react";
import Testimonials from "../components/Testimonials";

export default function Service() {
  return (
    <div className="px-4 md:px-10 lg:px-20 py-12">
      {/* HERO */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
          Medinexa <span className="text-blue-600">Services</span>
        </h1>
        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
          Streamlining healthcare operations with smart technology, precision,
          and care.
        </p>
      </div>

      {/* FEATURES */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Patient Management"
            features={[
              "Seamless patient registration and tracking",
              "Appointment scheduling & calendar integration",
              "Digital medical records and history management",
            ]}
          />

          <FeatureCard
            title="Billing & Insurance"
            features={[
              "Automated billing and invoicing",
              "Insurance claim processing and tracking",
              "Multiple payment gateways integration",
            ]}
          />

          <FeatureCard
            title="Clinical Management"
            features={[
              "Electronic Medical Records (EMR)",
              "Doctor and nurse dashboards",
              "Prescription and lab result integration",
            ]}
          />

          <FeatureCard
            title="Inventory & Pharmacy"
            features={[
              "Real-time stock monitoring",
              "Auto-alerts for low inventory",
              "Vendor management and procurement",
            ]}
          />

          <FeatureCard
            title="Reports & Analytics"
            features={[
              "Financial and operational dashboards",
              "Customizable reports",
              "Real-time data insights",
            ]}
          />

          <FeatureCard
            title="Staff & HR Management"
            features={[
              "Staff onboarding and payroll",
              "Shift scheduling and attendance",
              "Performance tracking",
            ]}
          />
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Why Choose <span className="text-blue-600">Medinexa?</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Cloud-based access anytime, anywhere",
            "Secure and compliant healthcare data",
            "Customizable for any hospital size",
            "24/7 support and onboarding",
            "Fast and smooth implementation",
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

      <Testimonials />

      {/* WHO IS IT FOR */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
          Who Is It For?
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Private Hospitals",
            "Public Hospitals",
            "Specialty Clinics",
            "Diagnostic Centers",
            "Healthcare Groups",
          ].map((item, i) => (
            <span
              key={i}
              className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="text-center bg-gradient-to-r from-blue-600 to-indigo-500 
      text-white p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          Get Started Today
        </h2>

        <p className="mb-6">
          Let Medinexa transform the way you manage healthcare.
        </p>

        <button
          className="bg-white text-blue-600 font-medium px-8 py-3 rounded-full 
        hover:scale-105 transition duration-300 shadow-md"
        >
          Book a Demo
        </button>
      </section>
    </div>
  );
}

/* FEATURE CARD */
function FeatureCard({ title, features }) {
  return (
    <div
      className="bg-white/80 backdrop-blur-lg border border-gray-200 
    rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-2 
    transition duration-300"
    >
      <h3 className="text-lg font-semibold mb-3 text-blue-600">{title}</h3>

      <ul className="space-y-2 text-gray-600 text-sm">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}
