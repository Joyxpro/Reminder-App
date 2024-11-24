import { useState, useEffect } from "react";
import { FaFolder, FaHome, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CreateReminderPopup from "./CreateReminderPopup";

interface SidebarProps {
  handleCreateReminderPopup: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleCreateReminderPopup }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Initialize with false

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Check login status from localStorage/sessionStorage when the component mounts
  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true"); // Parse the stored value
  }, []);

  const handleCreateReminder = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Clear the login status from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the state
  };

  const handleLogin = () => {
    // Set the login status in localStorage
    navigate("/login");
  };

  return (
    <div className="h-screen sm:w-[0%] lg:w-[18%] bg-[#001021] text-white flex flex-col gap-7 justify-between items-center p-5 shadow-2xl">
      <div className="text-2xl font-bold uppercase text-white">Notify</div>
      <div className="flex flex-col items-center justify-between gap-12">
        <FaHome
          size={25}
          className="cursor-pointer font-medium text-blue-400"
        />
        <FaPlus
          className="cursor-pointer font-medium text-blue-400"
          onClick={handleCreateReminderPopup}
          size={25}
        />
        <FaSearch
          size={25}
          className="cursor-pointer font-medium text-blue-400"
        />
        <FaCalendar
          size={25}
          className="cursor-pointer font-medium text-blue-400"
        />
        <FaFolder
          size={25}
          className="cursor-pointer font-medium text-blue-400"
        />
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center justify-center gap-5">
            <FaUser size={30} className="cursor-pointer" />
            <button
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleLogin}
          >
            Login
          </button>
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Popup Content */}
          <CreateReminderPopup
            handleCreateReminderPopup={handleCreateReminder}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
