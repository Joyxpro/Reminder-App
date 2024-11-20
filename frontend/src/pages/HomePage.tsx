import { useState } from "react";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import { useReminderContext } from "../context/ReminderContext"; // Import the context
import CreateReminderPopup from "../components/CreateReminderPopup"; // Import the popup component

const HomePage: React.FC = () => {
  const { reminders } = useReminderContext(); // Access the reminders from context
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Toggle the popup visibility
  const handleCreateReminderPopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen bg-[#001021]">
      {/* Pass the handler to Sidebar */}

      <Sidebar handleCreateReminderPopup={handleCreateReminderPopup} />

      {/* Display popup if it's open */}
      {isPopupOpen && (
        <CreateReminderPopup
          handleCreateReminderPopup={handleCreateReminderPopup}
        />
      )}

      {/* Display reminders */}
      <div className="col-span-1 p-5 overflow-y-auto w-full">
        <h2 className="text-white text-2xl font-bold mb-4">Your Reminders</h2>
        <div>
          {reminders.length === 0 ? (
            <p className="text-white">No reminders to show.</p>
          ) : (
            reminders.map((reminder, index) => (
              <div
                key={index}
                className="bg-[#1d2a3a] p-4 mb-4 rounded-lg shadow-lg text-white"
              >
                <h3 className="font-semibold">{reminder.title}</h3>
                <p>{reminder.description}</p>
                <p className="text-sm text-gray-400">
                  {reminder.dueDate} at {reminder.dueTime}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
