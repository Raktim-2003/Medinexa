import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const months = [
    "",
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  /* ================= DATE FORMAT ================= */
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`;
  };

  /* ================= FETCH ================= */
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/appointments",
        { headers: { token } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* ================= CANCEL ================= */
  const cancelAppointment = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId: id },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment Cancelled ❌");
        getUserAppointments();
        getDoctorsData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  /* ================= FILTER ================= */
  const filteredAppointments = appointments.filter((item) => {
    if (filter === "all") return true;
    if (filter === "completed") return item.isCompleted;
    if (filter === "cancelled") return item.cancelled;
    if (filter === "upcoming") return !item.cancelled && !item.isCompleted;
  });

  /* ================= GRAPH DATA ================= */
  const getStats = () => {
    const fullMonths = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const map = {};
    fullMonths.forEach((m) => (map[m] = 0));

    appointments.forEach((a) => {
      const mIndex = a.slotDate.split("_")[1];
      const month = fullMonths[Number(mIndex) - 1];
      map[month]++;
    });

    return fullMonths.map((m) => ({
      month: m,
      visits: map[m],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef2ff] to-[#fdf4ff] p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Appointments
        </h1>

        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
          🔔 {appointments.length}
        </span>
      </div>

      {/* ================= GRAPH ================= */}
      <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
        <h3 className="text-sm font-semibold mb-3 text-gray-700">
          📊 Monthly Visits
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={getStats()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />

            <Bar
              dataKey="visits"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ================= FILTER ================= */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {["all", "upcoming", "completed", "cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              filter === t
                ? "bg-indigo-500 text-white shadow"
                : "bg-white border text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= LIST ================= */}
      <div className="grid gap-6">

        {filteredAppointments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow">
            <p className="text-gray-500 text-lg">
              No appointments found 🩺
            </p>
          </div>
        )}

        {filteredAppointments.map((item) => (
          <div
            key={item._id}
            className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row gap-5 hover:shadow-lg transition"
          >

            {/* IMAGE */}
            <img
              src={item.docData.image}
              className="w-24 h-24 rounded-xl object-cover"
              alt=""
            />

            {/* INFO */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg text-gray-800">
                {item.docData.name}
              </h2>

              <p className="text-indigo-500 text-sm">
                {item.docData.speciality}
              </p>

              <p className="text-sm mt-2 text-gray-600">
                📍 {item.docData.address.line1},{" "}
                {item.docData.address.line2}
              </p>

              <p className="text-sm mt-2 text-gray-700">
                📅 {slotDateFormat(item.slotDate)} | ⏰ {item.slotTime}
              </p>

              {/* STATUS */}
              <div className="mt-3">
                {!item.cancelled && !item.isCompleted && (
                  <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                    Upcoming
                  </span>
                )}

                {item.cancelled && (
                  <span className="px-3 py-1 text-xs bg-red-100 text-red-500 rounded-full">
                    Cancelled
                  </span>
                )}

                {item.isCompleted && (
                  <span className="px-3 py-1 text-xs bg-blue-100 text-blue-500 rounded-full">
                    Completed
                  </span>
                )}
              </div>

              {/* ⭐ RATING */}
              {item.isCompleted && (
                <div className="mt-3">
                  <p className="text-xs mb-1">Rate Doctor</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="cursor-pointer text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-2 justify-center">

              {!item.cancelled && !item.isCompleted && (
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm shadow hover:opacity-90">
                  Pay
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="border border-red-400 text-red-500 px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
              )}

              {!item.cancelled && !item.isCompleted && (
                <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100">
                  🔁 Reschedule
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;