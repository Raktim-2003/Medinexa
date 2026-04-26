import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 md:px-10 lg:px-20 my-20">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Top <span className="text-blue-600">Doctors</span> to Book
        </h1>
        <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
          Browse through our trusted doctors and book appointments easily.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="group bg-white/80 backdrop-blur-lg 
            border border-gray-200 rounded-2xl overflow-hidden 
            shadow-md hover:shadow-2xl hover:-translate-y-2 
            transition-all duration-300 cursor-pointer flex flex-col"
          >

            {/* IMAGE */}
            <div className="relative h-52 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* CONTENT */}
            <div className="p-5 flex flex-col gap-2 flex-1">

              {/* STATUS */}
              <div
                className={`flex items-center gap-2 text-sm ${
                  item.available ? "text-green-500" : "text-gray-400"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    item.available ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                {item.available ? "Available" : "Not Available"}
              </div>

              {/* NAME */}
              <p className="text-lg font-semibold text-gray-800">
                {item.name}
              </p>

              {/* SPECIALITY */}
              <p className="text-sm text-gray-500">
                {item.speciality}
              </p>

              {/* RATING */}
              <div className="text-yellow-500 text-sm">
                ⭐ ⭐ ⭐ ⭐ ⭐ <span className="text-gray-500">(4.5)</span>
              </div>

              {/* CTA */}
              <button className="mt-auto py-2 rounded-lg text-sm font-medium 
                bg-gradient-to-r from-blue-600 to-indigo-500 text-white 
                opacity-0 group-hover:opacity-100 transition">
                Book Appointment
              </button>

            </div>
          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 
          text-white px-10 py-3 rounded-full shadow-md 
          hover:scale-105 transition"
        >
          View All Doctors
        </button>
      </div>

    </div>
  );
};

export default TopDoctors;