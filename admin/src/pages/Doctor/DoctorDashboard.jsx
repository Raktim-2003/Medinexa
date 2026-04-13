import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="w-full min-h-screen px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
        {/* ===== STATS ===== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-gradient-to-br from-indigo-100 to-indigo-50">
            <img className="w-12" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-500 text-sm">Total Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-gradient-to-br from-purple-100 to-purple-50">
            <img className="w-12" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl shadow-md bg-gradient-to-br from-green-100 to-green-50">
            <img className="w-12" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>

        {/* ===== BOOKINGS ===== */}
        <div className="mt-10 bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b bg-gray-50">
            <img className="w-5" src={assets.list_icon} alt="" />
            <p className="font-semibold text-gray-700 text-lg">
              Latest Bookings
            </p>
          </div>

          {/* Cards */}
          <div className="p-5 space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border hover:shadow-md transition"
              >
                {/* LEFT */}
                <div className="flex items-center gap-4">
                  <img
                    className="w-14 h-14 rounded-full object-cover border"
                    src={item.userData.image}
                    alt=""
                  />

                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.userData.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Age:{" "}
                      {item.userData.dob
                        ? calculateAge(item.userData.dob)
                        : "N/A"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)} | {item.slotTime}
                    </p>

                    <p className="text-xs text-gray-400">
                      Issue: {item.userData.problem || "General Checkup"}
                    </p>
                  </div>
                </div>

                {/* MIDDLE */}
                <div className="text-gray-700 font-medium">
                  {currency} {item.amount}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  {item.cancelled ? (
                    <span className="px-4 py-1 text-xs rounded-full bg-red-100 text-red-600 font-medium">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-4 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                      Completed
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => completeAppointment(item._id)}
                        className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                      >
                        Accept
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
