import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useReminderContext } from "../context/ReminderContext";
 // Import the context

interface CreateReminderPopupProps {
  handleCreateReminderPopup: () => void;
}

const CreateReminderPopup: React.FC<CreateReminderPopupProps> = ({
  handleCreateReminderPopup,
}) => {
  const { addReminder } = useReminderContext(); // Access the addReminder function from context
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the reminder object
    const newReminder = { title, dueDate, dueTime, description };

    // Add the reminder to the global state
    addReminder(newReminder);

    // Close the popup after submission
    handleCreateReminderPopup();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-6 w-96 rounded-lg shadow-lg backdrop-filter backdrop-blur-md bg-white bg-opacity-10 border border-white border-opacity-30 text-white">
        <button
          className="absolute top-3 right-3 text-gray-200 hover:text-white"
          onClick={handleCreateReminderPopup}
        >
          <AiOutlineClose size={20} />
        </button>
        <h2 className="text-lg font-bold mb-4 text-center">Create Reminder</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Reminder Title
            </label>
            <input
              type="text"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Due Date
            </label>
            <input
              type="date"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Due Time
            </label>
            <input
              type="time"
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Description
            </label>
            <textarea
              className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-600"
              placeholder="Describe the reminder"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors"
            >
              Create Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReminderPopup;
