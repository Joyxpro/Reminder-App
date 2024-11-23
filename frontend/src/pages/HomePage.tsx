import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import CreateReminderPopup from "../components/CreateReminderPopup"; // Import the popup component
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";

const HomePage: React.FC = () => {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false); // Popup for creating reminder
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false); // Popup for delete confirmation
  const [reminderToDelete, setReminderToDelete] = useState<any>(null);
  const [reminders, setReminders] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(false); // To handle loading state

  // Toggle the create reminder popup
  const handleCreateReminderPopup = () => {
    setIsCreatePopupOpen((prev) => !prev);
  };

  // Open the delete confirmation popup
  const handleDeleteClick = (reminderId: string) => {
    setReminderToDelete(reminderId); // Store the reminder id to be deleted
    setIsDeletePopupOpen(true); // Show the delete confirmation popup
  };

  // Handle delete reminder confirmation
  const handleDeleteReminder = async (confirmDelete: boolean) => {
    if (confirmDelete && reminderToDelete) {
      try {
        // Delete the reminder from the backend
        await axios.delete(
          `http://localhost:3000/api/v1/reminder/${reminderToDelete}`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        // Remove the deleted reminder from the state
        setReminders((prev) =>
          prev.filter((reminder: any) => reminder._id !== reminderToDelete)
        );

        // Close the popup and reset the reminder to delete
        setIsDeletePopupOpen(false);
        setReminderToDelete(null);
      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    } else {
      // Close the delete confirmation popup without deleting
      setIsDeletePopupOpen(false);
      setReminderToDelete(null);
    }
  };

  // Fetch reminders from the backend (on component mount or after action)
  const fetchReminders = async () => {
    try {
      setIsFetching(true); // Start fetching
      const response = await axios.get(
        "http://localhost:3000/api/v1/reminder",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setReminders(response.data); // Update reminders
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setIsFetching(false); // Stop fetching
    }
  };

  // Fetch reminders only once on component mount
  useEffect(() => {
    fetchReminders(); // Fetch reminders on initial mount
  }, [reminders.length]); // Empty dependency array ensures it's called once on mount

  // Render the UI for each reminder
  const renderReminder = (reminder: any) => (
    <div
      key={reminder._id}
      className="bg-[#103272] text-white p-4 rounded-lg shadow-md flex items-center justify-between mt-4"
    >
      <div>
        <p className="text-3xl uppercase">{reminder.title}</p>
        <p className="text-sm text-gray-400">
          <span className="text-xl text-white">Status: </span>
          {reminder.status === "pending" ? (
            <span className="font-semibold text-xl text-yellow-600">
              Pending
            </span>
          ) : (
            <span className="font-semibold text-xl text-green-400">Done</span>
          )}
        </p>
      </div>
      <div className="flex gap-2">
        <button>
          <MdOutlineUpdate size={32} />
        </button>
        <button onClick={() => handleDeleteClick(reminder._id)}>
          <MdDelete size={32} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#001021]">
      <Toaster />
      {/* Sidebar */}
      <Sidebar handleCreateReminderPopup={handleCreateReminderPopup} />

      {/* Create Reminder Popup */}
      {isCreatePopupOpen && (
        <CreateReminderPopup
          handleCreateReminderPopup={handleCreateReminderPopup}
        />
      )}

      {/* Delete Confirmation Popup */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this reminder?
            </h3>
            <div className="flex justify-around">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDeleteReminder(true)} // Confirm delete
              >
                Delete
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={() => handleDeleteReminder(false)} // Cancel delete
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminders Display */}
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
