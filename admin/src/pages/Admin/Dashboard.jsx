import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
);

const Dashboard = () => {
  const { aToken, dashData, getDashData } = useContext(AdminContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  // ✅ FIXED WEEKLY DATA
  const getWeeklyData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const data = [0, 0, 0, 0, 0, 0, 0];

    dashData.latestAppointments.forEach((item) => {
      if (!item.slotDate) return;

      const parts = item.slotDate.split("_");
      if (parts.length !== 3) return;

      const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const date = new Date(formatted);

      if (!isNaN(date)) {
        const day = date.getDay();
        data[day]++;
      }
    });

    return {
      labels: days,
      datasets: [
        {
          label: "Appointments",
          data,
          borderRadius: 8,
        },
      ],
    };
  };

  // ✅ REVENUE DATA
  const getRevenueData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = [0, 0, 0, 0, 0, 0];

    dashData.latestAppointments.forEach((item) => {
      if (!item.slotDate || !item.isCompleted) return;

      const parts = item.slotDate.split("_");
      if (parts.length !== 3) return;

      const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const date = new Date(formatted);

      if (!isNaN(date)) {
        const month = date.getMonth();
        if (month < 6) {
          data[month] += item.docData?.fees || 0;
        }
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Revenue",
          data,
          tension: 0.4,
        },
      ],
    };
  };

  // ✅ MONTHLY APPOINTMENTS
  const getMonthlyAppointments = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const data = [0, 0, 0, 0, 0, 0];

    dashData.latestAppointments.forEach((item) => {
      if (!item.slotDate) return;

      const parts = item.slotDate.split("_");
      if (parts.length !== 3) return;

      const formatted = `${parts[2]}-${parts[1]}-${parts[0]}`;
      const date = new Date(formatted);

      if (!isNaN(date)) {
        const month = date.getMonth();
        if (month < 6) data[month]++;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: "Appointments Trend",
          data,
          tension: 0.4,
        },
      ],
    };
  };

  return (
    dashData && (
      <div className="w-full min-h-screen px-8 py-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview 🚀
          </h1>
          <p className="text-gray-500 text-sm">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-3 gap-5 mb-8">
          <Card title="Doctors" value={dashData.doctors} color="bg-blue-500" />
          <Card
            title="Appointments"
            value={dashData.appointments}
            color="bg-purple-500"
          />
          <Card
            title="Patients"
            value={dashData.patients}
            color="bg-green-500"
          />
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* WEEKLY */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="mb-4 font-semibold">Weekly Activity 📊</h2>
            <Bar data={getWeeklyData()} />
          </div>

          {/* REVENUE */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="mb-4 font-semibold">
              Revenue Analytics 💰 ({currency})
            </h2>
            <Line data={getRevenueData()} />
          </div>
        </div>

        {/* MONTHLY */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="mb-4 font-semibold">Monthly Appointments Trend 📈</h2>
          <Line data={getMonthlyAppointments()} />
        </div>

        {/* ACTIVITY */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="mb-4 font-semibold">Recent Activity 🔔</h2>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={item.docData.image}
                  alt=""
                />

                <div className="flex-1">
                  <p className="font-medium">{item.docData.name}</p>
                  <p className="text-xs text-gray-500">
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>

                {/* STATUS LETTER */}
                {item.cancelled ? (
                  <span className="w-7 h-7 flex items-center justify-center bg-red-100 text-red-600 rounded-full text-xs font-bold">
                    R
                  </span>
                ) : item.isCompleted ? (
                  <span className="w-7 h-7 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-xs font-bold">
                    A
                  </span>
                ) : (
                  <span className="w-7 h-7 flex items-center justify-center bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold">
                    P
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;

/* CARD */
const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-5 rounded-2xl shadow`}>
    <p className="text-sm">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);
