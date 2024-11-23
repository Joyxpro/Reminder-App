import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD

function App() {
  return (
=======
import { ReminderProvider } from "./context/ReminderContext"; // Ensure correct import

function App() {
  return (
    <ReminderProvider>
      {" "}
      {/* Wrap the entire router with ReminderProvider */}
>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
<<<<<<< HEAD
=======
    </ReminderProvider>
>>>>>>> 7cc700bd7f2b7f5604b1541ea2a0b164dc41129c
  );
}

export default App;
