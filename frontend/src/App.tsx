import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { ReminderProvider } from "./context/ReminderContext"; // Ensure correct import

function App() {
  return (
    <ReminderProvider>
      {" "}
      {/* Wrap the entire router with ReminderProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ReminderProvider>
  );
}

export default App;
