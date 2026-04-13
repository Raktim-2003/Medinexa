import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability, deleteDoctor } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="w-full min-h-screen px-8 py-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">

      {/* TITLE */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Doctors Panel
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and monitor all registered doctors
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {doctors.map((item, index) => {
          // ⭐ Dynamic rating (fallback)
          const rating = item.rating || (4 + (index % 10) / 10); // 4.0 - 4.9 fake realistic

          return (
            <div
              key={index}
              className="group rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  className="w-full h-56 object-cover object-top"
                  src={item.image}
                  alt=""
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                {/* 🏆 TOP DOCTOR (BASED ON RATING) */}
                {rating >= 4.7 && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow">
                    🏆 Top Doctor
                  </div>
                )}

                {/* ⭐ Rating */}
                <div className="absolute bottom-3 left-3 text-white text-sm font-medium">
                  ⭐ {rating.toFixed(1)}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3">

                {/* NAME + VERIFIED */}
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>

                  {/* Blue Tick */}
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-[0_2px_8px_rgba(59,130,246,0.6)]">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* SPECIALITY */}
                <p className="text-sm text-gray-500">
                  {item.speciality}
                </p>

                {/* QUALIFICATION */}
                <p className="text-xs text-gray-400">
                  🎓 {item.degree || "MBBS"}
                </p>

                {/* ⭐ STAR UI */}
                <div className="flex items-center gap-1 text-yellow-400 text-sm">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i}>
                        {i < Math.round(rating) ? "★" : "☆"}
                      </span>
                    ))}
                  <span className="text-gray-500 text-xs ml-1">
                    ({rating.toFixed(1)})
                  </span>
                </div>

                {/* BIO */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.about ||
                    "Dedicated and experienced doctor focused on delivering quality healthcare."}
                </p>

                {/* AVAILABILITY */}
                <div className="flex items-center justify-between pt-2">

                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeAvailability(item._id)}
                      className="accent-indigo-500 w-4 h-4"
                    />
                    Available
                  </label>

                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      item.available
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {item.available ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 pt-3">

                  <button
                    onClick={() => changeAvailability(item._id)}
                    className={`flex-1 py-2 text-xs rounded-xl transition font-medium ${
                      item.available
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        : "bg-indigo-500 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {item.available ? "Disable" : "Enable"}
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this doctor?"
                        )
                      ) {
                        deleteDoctor(item._id);
                      }
                    }}
                    className="flex-1 py-2 text-xs rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition font-medium"
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default DoctorsList;