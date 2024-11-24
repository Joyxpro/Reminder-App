import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { ChangeEvent, useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract `name` and `value` from the event
    setFormData((prevState) => ({ ...prevState, [name]: value })); // Update state dynamically
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        navigate("/home");
      } else {
        alert("Failed to Signin");
      }
    } catch (error) {
      alert("Failed to signin");
    }
  };

  return (
    <div className="h-screen bg-[url('https://media.istockphoto.com/id/1208739424/photo/just-in-time.jpg?b=1&s=612x612&w=0&k=20&c=l_b4FjUHx5wSeXAjYwrbOEajyvgvmzeFeU3OEOhLPyM=')] bg-no-repeat bg-center bg-cover">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-30 backdrop-blur-sm p-8 w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg shadow-lg">
          <h2 className="text-4xl uppercase font-bold mb-6 text-slate-800 text-center">
            Login
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex items-center flex-col justify-center gap-6 w-full"
          >
            <InputField
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              required={true}
              placeholder="Enter your email address"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              required={true}
              placeholder="Enter your password"
            />
            <button
              type="submit"
              className="w-full sm:w-[50%] mx-auto p-3 bg-blue-500 text-slate-900 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-slate-900 text-sm mb-2">Or login with</p>
            <div className="flex gap-4">
              <button className="p-3 bg-red-500 text-slate-900 rounded-full hover:bg-red-600 transition">
                <FaGoogle size={20} />
              </button>
              <button className="p-3 bg-blue-700 text-slate-900 rounded-full hover:bg-blue-800 transition">
                <FaFacebook size={20} />
              </button>
              <button className="p-3 bg-pink-500 text-slate-900 rounded-full hover:bg-pink-600 transition">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>

          {/* Redirect to Signup */}
          <div className="mt-6 text-center">
            <p className="text-slate-900 font-semibold">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-800 font-semibold hover:underline transition"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
