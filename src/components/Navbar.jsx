import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/*
  Fully Responsive Navbar
  - Desktop horizontal
  - Mobile hamburger
  - Auth dynamic (Login / Logout)
*/

function Navbar({ setCategory, activeCategory }) {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /* ===== Check Auth Status ===== */
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkAuth();

    // Re-check when storage changes
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  /* ===== Logout ===== */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* ===== Logo ===== */}
        <h1
          onClick={() => {
            navigate("/");
            setCategory && setCategory("all");
            setOpen(false);
          }}
          className="text-blue-600 font-bold text-xl cursor-pointer"
        >
          RoomMitra
        </h1>

        {/* ===== Desktop Menu ===== */}
        <div className="hidden md:flex gap-6 items-center">

          <button
            onClick={() => setCategory && setCategory("hotel")}
            className={`transition ${
              activeCategory === "hotel"
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
            }`}
          >
            Hotel
          </button>

          <button
            onClick={() => setCategory && setCategory("room")}
            className={`transition ${
              activeCategory === "room"
                ? "text-blue-600 font-semibold"
                : "hover:text-blue-600"
            }`}
          >
            Room
          </button>

          <button
            onClick={() => setCategory && setCategory("partner")}
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

          {/* ===== Auth Button ===== */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </button>
          )}

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
              setCategory && setCategory("hotel");
              setOpen(false);
            }}
            className="block w-full text-left"
          >
            Hotel
          </button>

          <button
            onClick={() => {
              setCategory && setCategory("room");
              setOpen(false);
            }}
            className="block w-full text-left"
          >
            Room
          </button>

          <button
            onClick={() => {
              setCategory && setCategory("partner");
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

          {/* ===== Mobile Auth Button ===== */}
          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="w-full border border-red-500 text-red-500 py-2 rounded-full"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded-full"
            >
              Login
            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;