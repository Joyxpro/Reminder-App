import React, { createContext, useState, useContext } from "react";

// Define the structure of the reminder object
interface Reminder {
  title: string;
  dueDate: string;
  dueTime: string;
  description: string;
}

// Define context value type
interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Reminder) => void;
}

// Create context with default values
const ReminderContext = createContext<ReminderContextType | undefined>(
  undefined
);

// Provider component to wrap around the app and provide the state
export const ReminderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Function to add a reminder to the state
  const addReminder = (reminder: Reminder) => {
    setReminders((prev) => [...prev, reminder]);
  };

  return (
    <ReminderContext.Provider value={{ reminders, addReminder }}>
      {children}
    </ReminderContext.Provider>
  );
};
// Custom hook to use the context
export const useReminderContext = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error(
      "useReminderContext must be used within a ReminderProvider"
    );
  }
  return context;
};
