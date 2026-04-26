import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="px-4 md:px-10 lg:px-20 py-16 text-gray-800"
    >

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold">
          Find by <span className="text-blue-600">Speciality</span>
        </h1>
        <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
          Browse through our trusted doctors by speciality and book your appointment easily.
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="group bg-white/80 backdrop-blur-lg border border-gray-200 
            rounded-2xl p-5 flex flex-col items-center text-center 
            shadow-md hover:shadow-xl hover:-translate-y-2 
            transition-all duration-300 cursor-pointer"
          >

            {/* IMAGE */}
            <div className="bg-blue-50 p-3 rounded-full mb-3 group-hover:scale-110 transition">
              <img
                className="w-12 h-12 object-contain"
                src={item.image}
                alt={item.speciality}
              />
            </div>

            {/* TEXT */}
            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition">
              {item.speciality}
            </p>

          </Link>
        ))}

      </div>
    </div>
  );
};

export default SpecialityMenu;