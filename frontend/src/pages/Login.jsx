import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/user/register",
          {
            name,
            username,
            age,
            gender,
            email,
            password,
          }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/user/login",
          { email, password }
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-indigo-200">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[350px] h-[350px] bg-blue-300 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[350px] h-[350px] bg-indigo-400 rounded-full blur-3xl opacity-30 bottom-[-100px] right-[-100px]"></div>

      <form
        onSubmit={onSubmitHandler}
        className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl 
        border border-gray-200 rounded-2xl 
        shadow-[0_10px_40px_rgba(0,0,0,0.08)] 
        p-8 flex flex-col gap-4"
      >

        {/* TITLE */}
        <div>
          <h2 className="text-2xl font-bold">
            {state === "Sign Up" ? "Create Account" : "Welcome Back"}
          </h2>
          <p className="text-gray-500 text-sm">
            {state === "Sign Up"
              ? "Fill details to create your profile"
              : "Login to continue"}
          </p>
        </div>

        {/* SIGNUP EXTRA FIELDS */}
        {state === "Sign Up" && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Username"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Age"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <select
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        {state === "Sign Up" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {/* BUTTON */}
        <button className="w-full py-2 rounded-lg text-white 
          bg-gradient-to-r from-blue-600 to-indigo-500 
          shadow-md hover:scale-[1.02] transition">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* SWITCH */}
        <p className="text-sm text-center">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
            className="text-blue-600 cursor-pointer"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>

      </form>
    </div>
  );
};

export default Login;