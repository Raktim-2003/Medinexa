import { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) return toast.error("Image not selected");

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full min-h-screen px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Add Doctor</h1>
        <p className="text-gray-500 text-sm">
          Create a professional doctor profile
        </p>
      </div>

      {/* PROGRESS */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 h-2 bg-indigo-500 rounded-full"></div>
        <div className="flex-1 h-2 bg-indigo-200 rounded-full"></div>
        <div className="flex-1 h-2 bg-indigo-200 rounded-full"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl">
        {/* IMAGE UPLOAD */}
        <div className="mb-8">
          <label htmlFor="doc-img">
            <div className="border-2 border-dashed border-indigo-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-indigo-50 transition">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                className="w-20 h-20 object-cover rounded-full mb-2"
                alt=""
              />

              <p className="text-sm text-gray-500">
                Click or drag image to upload
              </p>
            </div>
          </label>

          <input
            type="file"
            id="doc-img"
            hidden
            onChange={(e) => setDocImg(e.target.files[0])}
          />
        </div>

        {/* FORM GRID */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <Input label="Doctor Name" value={name} setValue={setName} />

            <Input
              label="Email"
              value={email}
              setValue={setEmail}
              type="email"
            />

            {/* PASSWORD WITH TOGGLE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-4 cursor-pointer text-gray-400"
                >
                  👁️
                </span>
              </div>
            </div>

            <Select
              label="Experience"
              value={experience}
              setValue={setExperience}
              options={[
                "1 Year",
                "2 Year",
                "3 Year",
                "4 Year",
                "5 Year",
                "6 Year",
                "7 Year",
                "8 Year",
                "9 Year",
                "10 Year",
              ]}
            />

            <Input label="Fees" value={fees} setValue={setFees} type="number" />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <Select
              label="Speciality"
              value={speciality}
              setValue={setSpeciality}
              options={[
                "General physician",
                "Gynecologist",
                "Dermatologist",
                "Pediatricians",
                "Neurologist",
                "Gastroenterologist",
              ]}
            />

            <Input label="Education" value={degree} setValue={setDegree} />

            <Input
              label="Address Line 1"
              value={address1}
              setValue={setAddress1}
            />
            <Input
              label="Address Line 2"
              value={address2}
              setValue={setAddress2}
            />
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-6">
          <label className="text-sm font-medium text-gray-600">
            About Doctor
          </label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full mt-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
            rows={4}
            placeholder="Write about doctor..."
          />
        </div>

        {/* ACTION BUTTON */}
        <div className="mt-6 flex justify-end">
          <button className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-10 py-3 rounded-xl shadow-lg hover:scale-105 transition font-medium">
            🚀 Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;

/* REUSABLE COMPONENTS */

const Input = ({ label, value, setValue, type = "text" }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full mt-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

const Select = ({ label, value, setValue, options }) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full mt-1 border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500"
    >
      {options.map((opt, i) => (
        <option key={i} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
