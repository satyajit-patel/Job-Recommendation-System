import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import {AuroraBackgroundDemo} from "./components/Aurora/AuroraBackgroundDemo";
import axios from "axios";
import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    const wakeUpSid = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.get(`${VITE_BACKEND_URL}/ping`);
      console.log(response.data.message);
    }
    wakeUpSid();
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuroraBackgroundDemo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
