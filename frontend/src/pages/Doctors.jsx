import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowfilter] = useState(false);

  // 🔥 STATES
  const [search, setSearch] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // ✅ ORIGINAL FILTER
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  // 🔥 FINAL FILTER
  const finalDoctors = filterDoc.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(search.toLowerCase());

    const matchesAvailability = onlyAvailable ? doc.available : true;

    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="px-4 md:px-10 py-8">

      {/* TITLE */}
      <p className="text-gray-600 text-lg">
        Browse through the doctors specialist.
      </p>

      {/* 🔥 COMPACT SEARCH BAR */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mt-6 mb-6">

        {/* SEARCH */}
        <div className="relative w-full lg:w-[400px]">
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 text-sm 
            rounded-full border border-gray-300 
            focus:ring-2 focus:ring-indigo-400 focus:outline-none 
            bg-white shadow-sm"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyAvailable(!onlyAvailable)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
              onlyAvailable
                ? "bg-green-500 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {onlyAvailable ? "Available" : "All"}
          </button>

          <button
            onClick={() => {
              setSearch("");
              setOnlyAvailable(false);
            }}
            className="px-4 py-1.5 rounded-full text-xs font-medium 
            bg-red-100 text-red-500 hover:bg-red-200 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">

        {/* FILTER SIDEBAR */}
        <div
          className={`flex-col gap-3 text-sm ${
            showFilter ? "flex" : "hidden sm:flex"
          } bg-white border border-gray-200 
          p-4 rounded-xl shadow-md min-w-[220px]`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec, i) => (
            <p
              key={i}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`px-4 py-2 rounded-full cursor-pointer transition ${
                speciality === spec
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* DOCTOR GRID */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {finalDoctors.length > 0 ? (
            finalDoctors.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="bg-white rounded-2xl shadow-md overflow-hidden 
                hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
              >
                {/* IMAGE */}
                <div className="h-56 w-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    src={item.image}
                    alt=""
                  />
                </div>

                {/* CONTENT */}
                <div className="p-5 space-y-2">
                  <p className="text-xl font-bold text-gray-800">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.speciality}
                  </p>

                  <p className="text-sm text-indigo-500 font-medium">
                    🎓 MBBS
                  </p>

                  <div className="flex items-center gap-1 text-yellow-500 text-sm">
                    ⭐ ⭐ ⭐ ⭐ ⭐
                    <span className="text-gray-600 ml-1">(4.5)</span>
                  </div>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    Experienced doctor providing excellent care and consultation.
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        item.available
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </span>

                    <span className="text-xs text-blue-500 font-medium">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No doctors found 😔
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Doctors;