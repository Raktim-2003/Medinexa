import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  // 🔍 Filter + Search
  const filteredAppointments = appointments.filter((item) => {
    const nameMatch = item.userData.name
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "All") return nameMatch;
    if (filter === "Completed") return item.isCompleted && nameMatch;
    if (filter === "Cancelled") return item.cancelled && nameMatch;
    if (filter === "Pending")
      return !item.cancelled && !item.isCompleted && nameMatch;

    return true;
  });

  // 📊 Stats
  const total = appointments.length;
  const completed = appointments.filter((a) => a.isCompleted).length;
  const cancelled = appointments.filter((a) => a.cancelled).length;
  const pending = total - completed - cancelled;

  return (
    <div className="w-full min-h-screen px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Appointments Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Smart management of all bookings
        </p>
      </div>

      {/* STATS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <Stat title="Total" value={total} color="bg-blue-100 text-blue-600" />
        <Stat
          title="Pending"
          value={pending}
          color="bg-yellow-100 text-yellow-600"
        />
        <Stat
          title="Completed"
          value={completed}
          color="bg-green-100 text-green-600"
        />
        <Stat
          title="Cancelled"
          value={cancelled}
          color="bg-red-100 text-red-600"
        />
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
        />

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Completed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === f
                  ? "bg-indigo-500 text-white shadow"
                  : "bg-white border text-gray-600 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-2xl shadow-lg p-5">
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {filteredAppointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border hover:shadow-md transition"
            >
              {/* PATIENT */}
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={item.userData.image}
                  alt=""
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {item.userData.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Age: {calculateAge(item.userData.dob) || "N/A"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
              </div>

              {/* DOCTOR */}
              <div className="flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.docData.image}
                  alt=""
                />
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.docData.name}
                  </p>
                  <p className="text-xs text-gray-400">Doctor</p>
                </div>
              </div>

              {/* FEES */}
              <div className="font-semibold text-gray-700">
                {currency} {item.docData.fees}
              </div>

              {/* STATUS */}
              <Status item={item} />

              {/* ACTION */}
              {!item.cancelled && !item.isCompleted && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;

/* 🔹 COMPONENTS */

const Stat = ({ title, value, color }) => (
  <div className={`p-4 rounded-xl shadow ${color}`}>
    <p className="text-sm font-medium">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const Status = ({ item }) => {
  if (item.cancelled)
    return (
      <span className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded-full font-medium">
        Cancelled
      </span>
    );

  if (item.isCompleted)
    return (
      <span className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full font-medium">
        Completed
      </span>
    );

  return (
    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-600 rounded-full font-medium">
      Pending
    </span>
  );
};
