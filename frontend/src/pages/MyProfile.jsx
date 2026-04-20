import { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  /* 🔥 BMI */
  const bmi =
    userData?.height && userData?.weight
      ? (
          userData.weight /
          ((userData.height / 100) * (userData.height / 100))
        ).toFixed(1)
      : "--";

  /* 📊 VISIT GRAPH (SAFE BACKEND) */
  const getVisitData = () => {
    if (!userData?.appointments) return [];

    const map = {};

    userData.appointments.forEach((a) => {
      if (!a.slotDate) return;

      const month = new Date(a.slotDate).toLocaleString("default", {
        month: "short",
      });

      map[month] = (map[month] || 0) + 1;
    });

    return Object.keys(map).map((m) => ({
      month: m,
      visits: map[m],
    }));
  };

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("blood", userData.blood || "");
      formData.append("emergency", userData.emergency || "");
      formData.append("height", userData.height || "");
      formData.append("weight", userData.weight || "");
      formData.append("notes", userData.notes || "");
      formData.append("bio", userData.bio || "");
      formData.append("countryCode", userData.countryCode || "+91");

      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );

      if (data.success) {
        toast.success("Profile Updated ✅");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-2xl text-white flex items-center gap-6 shadow-lg">
              {isEdit ? (
                <label htmlFor="image">
                  <img
                    className="w-24 h-24 rounded-full border-4 border-white cursor-pointer hover:scale-105 transition"
                    src={image ? URL.createObjectURL(image) : userData.image}
                  />
                  <input
                    hidden
                    id="image"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
              ) : (
                <img
                  className="w-24 h-24 rounded-full border-4 border-white"
                  src={userData.image}
                />
              )}

              <div>
                {isEdit ? (
                  <input
                    className="bg-transparent border-b text-2xl outline-none"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((p) => ({
                        ...p,
                        name: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{userData.name}</h2>
                )}
                <p className="opacity-80">Patient Profile</p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-6 text-lg">Contact Info</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* EMAIL */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Email</p>
                  <p className="text-indigo-600 font-medium">
                    {userData.email}
                  </p>
                </div>

                {/* PHONE WITH COUNTRY */}
                <div>
                  <p className="text-gray-500 text-sm mb-1">Phone</p>

                  {isEdit ? (
                    <div className="flex items-center border rounded-xl overflow-hidden shadow-sm">
                      {/* Country Dropdown */}
                      <select
                        className="bg-gray-100 px-3 py-2 text-sm outline-none"
                        value={userData.countryCode || "+91"}
                        onChange={(e) =>
                          setUserData((p) => ({
                            ...p,
                            countryCode: e.target.value,
                          }))
                        }
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>

                      {/* Phone Input */}
                      <input
                        className="w-full p-2 outline-none"
                        type="tel"
                        maxLength={12}
                        value={userData.phone || ""}
                        onChange={(e) =>
                          setUserData((p) => ({
                            ...p,
                            phone: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Enter phone number"
                      />
                    </div>
                  ) : (
                    <p className="font-medium">
                      {userData.countryCode || "+91"} {userData.phone || "-"}
                    </p>
                  )}
                </div>

                {/* BIO (🔥 NEW IMPORTANT FIELD) */}
                <div className="md:col-span-2">
                  <p className="text-gray-500 text-sm mb-1">🧠 Bio</p>

                  {isEdit ? (
                    <textarea
                      rows={3}
                      className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="Write something about your health, lifestyle, allergies..."
                      value={userData.bio || ""}
                      onChange={(e) =>
                        setUserData((p) => ({
                          ...p,
                          bio: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-gray-700">
                      {userData.bio || "No bio added"}
                    </p>
                  )}
                </div>
              </div>
            </div>
            {/* MEDICAL */}
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-5">Medical Info</h3>

              <div className="grid md:grid-cols-2 gap-5">
                {/* Gender FIXED */}
                <div>
                  <p className="text-gray-500 mb-2">Gender</p>
                  {isEdit ? (
                    <div className="flex gap-3">
                      {["Male", "Female"].map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() =>
                            setUserData((p) => ({ ...p, gender: g }))
                          }
                          className={`px-4 py-2 rounded-lg border ${
                            userData.gender === g
                              ? "bg-indigo-500 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p>{userData.gender || "-"}</p>
                  )}
                </div>

                {/* Blood */}
                <div>
                  <p className="text-gray-500 mb-2">🩸 Blood Group</p>

                  {isEdit ? (
                    <select
                      className="input"
                      value={userData.blood || ""}
                      onChange={(e) =>
                        setUserData((p) => ({
                          ...p,
                          blood: e.target.value,
                        }))
                      }
                    >
                      <option value="">Select</option>

                      {/* Positive */}
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="O+">O+</option>
                      <option value="AB+">AB+</option>

                      {/* Negative */}
                      <option value="A-">A-</option>
                      <option value="B-">B-</option>
                      <option value="O-">O-</option>
                      <option value="AB-">AB-</option>
                    </select>
                  ) : (
                    <p>{userData.blood || "-"}</p>
                  )}
                </div>

                {/* Height */}
                <div>
                  <p className="text-gray-500">📏 Height (cm)</p>
                  {isEdit ? (
                    <input
                      className="input"
                      type="number"
                      value={userData.height || ""}
                      onChange={(e) =>
                        setUserData((p) => ({
                          ...p,
                          height: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p>{userData.height || "-"}</p>
                  )}
                </div>

                {/* Weight */}
                <div>
                  <p className="text-gray-500">⚖️ Weight (kg)</p>
                  {isEdit ? (
                    <input
                      className="input"
                      type="number"
                      value={userData.weight || ""}
                      onChange={(e) =>
                        setUserData((p) => ({
                          ...p,
                          weight: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p>{userData.weight || "-"}</p>
                  )}
                </div>
                {/* Emergency */}
                <div className="md:col-span-2">
                  <p className="text-gray-500">📞 Emergency Contact</p>

                  {isEdit ? (
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      {/* Country Select */}
                      <select
                        className="bg-gray-100 px-2 py-2 text-sm outline-none"
                        value={userData.countryCode || "+91"}
                        onChange={(e) =>
                          setUserData((p) => ({
                            ...p,
                            countryCode: e.target.value,
                          }))
                        }
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>

                      {/* Input */}
                      <input
                        className="w-full p-2 outline-none"
                        type="tel"
                        maxLength={12}
                        value={userData.emergency || ""}
                        onChange={(e) =>
                          setUserData((p) => ({
                            ...p,
                            emergency: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Enter emergency number"
                      />
                    </div>
                  ) : (
                    <p>
                      {userData.countryCode || "+91"}{" "}
                      {userData.emergency || "-"}
                    </p>
                  )}
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <p className="text-gray-500">📝 Medical Notes</p>
                  {isEdit ? (
                    <textarea
                      className="input"
                      rows={3}
                      value={userData.notes || ""}
                      onChange={(e) =>
                        setUserData((p) => ({
                          ...p,
                          notes: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p>{userData.notes || "No notes added"}</p>
                  )}
                </div>
              </div>
            </div>
            {/* BUTTON */}
            <div className="text-center">
              {isEdit ? (
                <button
                  onClick={updateUserProfileData}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-lg shadow"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-indigo-500 px-8 py-3 rounded-lg"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* RIGHT SIDE DASHBOARD */}
          <div className="space-y-5">
            {/* BMI */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-5 rounded-xl shadow-lg">
              <p>BMI</p>
              <h1 className="text-3xl font-bold">{bmi}</h1>
            </div>

            {/* WEIGHT GRAPH */}
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-sm font-semibold mb-2">Weight Trend</h3>

              <ResponsiveContainer width="100%" height={160}>
                <LineChart
                  data={[
                    { m: "Jan", w: 60 },
                    { m: "Feb", w: 62 },
                    { m: "Mar", w: 61 },
                    { m: "Apr", w: userData.weight || 65 },
                  ]}
                >
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="w" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
