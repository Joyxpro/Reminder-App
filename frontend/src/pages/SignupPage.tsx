import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import axios from "axios";

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract `name` and `value` from the event
    setFormData((prevState) => ({ ...prevState, [name]: value })); // Update state dynamically
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        navigate("/login");
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("Singup Failed");
    }
  };

  return (
    <div className="bg-[url('https://media.istockphoto.com/id/1208739424/photo/just-in-time.jpg?b=1&s=612x612&w=0&k=20&c=l_b4FjUHx5wSeXAjYwrbOEajyvgvmzeFeU3OEOhLPyM=')] bg-no-repeat bg-center bg-cover">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-30 backdrop-blur-md p-6 w-full max-w-lg rounded-lg shadow-lg box-border">
          <h2 className="text-4xl uppercase font-bold mb-6 text-slate-800 text-center">
            Signup
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-2 h-[60vh]"
          >
            <InputField
              required={true}
              label="Email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            <InputField
              required={true}
              label="Password"
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
            <InputField
              required={false}
              label="Name"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
            />
            <InputField
              required={false}
              label="Phone Number"
              type="number"
              name="phoneNumber"
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            <button
              type="submit"
              className="w-[50%] mx-auto p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Signup
            </button>
          </form>

          {/* Social Login */}
          <div className="flex flex-col items-center mt-4">
            <p className="text-slate-900 text-sm mb-2 font-semibold ">
              Or login with
            </p>
            <div className="flex gap-4">
              <button className="p-3 bg-red-500 text-black rounded-full hover:bg-red-600 transition">
                <FaGoogle size={20} />
              </button>
              <button className="p-3 bg-blue-700 text-black rounded-full hover:bg-blue-800 transition">
                <FaFacebook size={20} />
              </button>
              <button className="p-3 bg-pink-500 text-black rounded-full hover:bg-pink-600 transition">
                <FaInstagram size={20} />
              </button>
            </div>
          </div>

          {/* Redirect to Login */}
          <div className="mt-2 text-center">
            <p className="text-slate-900 font-semibold">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-800 font-semibold hover:underline transition"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
