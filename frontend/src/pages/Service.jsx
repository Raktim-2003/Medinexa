import React from "react";

export default function Service() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">
        Medinexa 
      </h1>
      <p className="text-lg text-center mb-10">
        Streamlining Healthcare Operations with Precision & Care
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeatureCard title="Patient Management" features={[
            "Seamless patient registration and tracking",
            "Appointment scheduling & calendar integration",
            "Digital medical records and history management"
          ]} />

          <FeatureCard title="Billing & Insurance" features={[
            "Automated billing and invoicing",
            "Insurance claim processing and tracking",
            "Multiple payment gateways integration"
          ]} />

          <FeatureCard title="Clinical Management" features={[
            "Electronic Medical Records (EMR)",
            "Doctor and nurse dashboards",
            "Prescription and lab result integration"
          ]} />

          <FeatureCard title="Inventory & Pharmacy" features={[
            "Real-time stock monitoring",
            "Auto-alerts for low inventory",
            "Vendor management and procurement"
          ]} />

          <FeatureCard title="Reports & Analytics" features={[
            "Financial and operational dashboards",
            "Customizable reports",
            "Real-time data for informed decision-making"
          ]} />

          <FeatureCard title="Staff & HR Management" features={[
            "Staff onboarding and payroll",
            "Shift scheduling and attendance",
            "Credential and performance tracking"
          ]} />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Health Bridge?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Cloud-based, accessible anywhere, anytime</li>
          <li>Fully compliant with healthcare data regulations (HIPAA, GDPR)</li>
          <li>Customizable for any hospital size or specialty</li>
          <li>24/7 technical support and onboarding assistance</li>
          <li>Fast implementation with minimal disruption</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Who Is It For?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Private & Public Hospitals</li>
          <li>Specialty Clinics</li>
          <li>Diagnostic Centers</li>
          <li>Multi-location Healthcare Groups</li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
        <p className="mb-6">Let Health Bridge transform the way you manage your hospital.</p>
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full transition duration-300">
          Request a Free Demo
        </button>
      </section>
    </div>
  );
}

function FeatureCard({ title, features }) {
  return (
    <div className="border rounded-2xl shadow p-4 bg-white">
      <h3 className="text-xl font-semibold mb-2 text-blue-600">{title}</h3>
      <ul className="list-disc list-inside space-y-1">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}
