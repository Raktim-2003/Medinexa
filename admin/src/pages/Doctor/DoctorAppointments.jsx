import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      {/* Title */}
      <p className="text-2xl font-semibold text-gray-800 mb-6">
        All Appointments
      </p>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-white/20 ${
              index % 3 === 0
                ? "bg-gradient-to-br from-blue-50 to-indigo-100"
                : index % 3 === 1
                  ? "bg-gradient-to-br from-purple-50 to-pink-100"
                  : "bg-gradient-to-br from-green-50 to-teal-100"
            }`}
          >
            {/* Top */}
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover border"
                src={item.userData.image}
                alt=""
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {item.userData.name}
                </p>
                <p className="text-sm text-gray-600">
                  Age: {calculateAge(item.userData.dob)}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {slotDateFormat(item.slotDate)}
              </p>
              <p>
                <span className="font-medium">Time:</span> {item.slotTime}
              </p>
              <p>
                <span className="font-medium">Fee:</span> {currency}{" "}
                {item.amount}
              </p>
            </div>

            {/* Status / Actions */}
            <div className="mt-5 flex justify-between items-center">
              {item.cancelled ? (
                <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                  Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                  Completed
                </span>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm shadow"
                  >
                    <img className="w-4" src={assets.cancel_icon} alt="" />
                    Reject
                  </button>

                  <button
                    onClick={() => completeAppointment(item._id)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-sm shadow"
                  >
                    <img className="w-4" src={assets.tick_icon} alt="" />
                    Accept
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
