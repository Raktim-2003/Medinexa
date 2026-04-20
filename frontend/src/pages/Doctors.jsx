import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowfilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

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

  return (
    <div className="px-4 md:px-10 py-8">

      {/* TITLE */}
      <p className="text-gray-600 text-lg">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">

        {/* FILTER */}
        <div
          className={`flex-col gap-3 text-sm ${
            showFilter ? "flex" : "hidden sm:flex"
          } bg-white/70 backdrop-blur-lg border border-gray-200 
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

          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white/90 backdrop-blur-xl border border-gray-200 
              rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
              transition-all duration-300 cursor-pointer"
            >

              {/* IMAGE */}
              <div className="h-60 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  src={item.image}
                  alt=""
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-2">

                {/* NAME */}
                <p className="text-xl font-bold text-gray-800">
                  {item.name}
                </p>

                {/* SPECIALITY */}
                <p className="text-sm text-gray-500">
                  {item.speciality}
                </p>

                {/* DEGREE */}
                <p className="text-sm text-indigo-500 font-medium">
                  🎓 MBBS
                </p>

                {/* RATING */}
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  ⭐ ⭐ ⭐ ⭐ ⭐
                  <span className="text-gray-600 ml-1">(4.5)</span>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-gray-500 line-clamp-2">
                  Experienced doctor providing excellent care and consultation
                  for patients with modern treatment techniques.
                </p>

                {/* STATUS */}
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
                    View Profile →
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Doctors;