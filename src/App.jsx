import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoomDetail from "./pages/RoomDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" element={<RoomDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;