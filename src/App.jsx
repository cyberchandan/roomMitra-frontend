import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 Home page */}
        <Route path="/" element={<Home />} />

        {/* 🔹 Room detail */}
        <Route path="/room/:id" element={<RoomDetail />} />

        {/* 🔹 Admin panel */}
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;