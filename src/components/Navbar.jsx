import { useNavigate } from "react-router-dom";
import { useState } from "react";

/*
  Fully Responsive Navbar
  - Desktop horizontal
  - Mobile hamburger
  - Fix overflow issue
*/

function Navbar({ setCategory, activeCategory }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* ===== Logo ===== */}
        <h1
          onClick={() => {
            navigate("/");
            setCategory("all");
            setOpen(false);
          }}
          className="text-blue-600 font-bold text-xl cursor-pointer"
        >
          RoomMitra
        </h1>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden md:flex gap-6 items-center">

          <button
            onClick={() => setCategory("hotel")}
            className={`transition ${
              activeCategory === "hotel"
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
            }`}
          >
            Hotel
          </button>

          <button
            onClick={() => setCategory("room")}
            className={`transition ${
              activeCategory === "room"
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
            }`}
          >
            Room
          </button>

          <button
            onClick={() => setCategory("partner")}
            className={`transition ${
              activeCategory === "partner"
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
            }`}
          >
            Room Partner
          </button>

          <button
            onClick={() => navigate("/admin")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition"
          >
            List Your Room
          </button>
        </div>

        {/* ===== Mobile Hamburger ===== */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* ===== Mobile Dropdown ===== */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">

          <button
            onClick={() => {
              setCategory("hotel");
              setOpen(false);
            }}
            className="block w-full text-left"
          >
            Hotel
          </button>

          <button
            onClick={() => {
              setCategory("room");
              setOpen(false);
            }}
            className="block w-full text-left"
          >
            Room
          </button>

          <button
            onClick={() => {
              setCategory("partner");
              setOpen(false);
            }}
            className="block w-full text-left"
          >
            Room Partner
          </button>

          <button
            onClick={() => {
              navigate("/admin");
              setOpen(false);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full"
          >
            List Your Room
          </button>

        </div>
      )}

    </nav>
  );
}

export default Navbar;