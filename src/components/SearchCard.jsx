import { useEffect, useState } from "react";

function SearchCard() {

  // 🔹 State to detect scroll for shadow effect
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-16 z-40
        transition-all duration-300
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
      `}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">

        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4">

          {/* 🔹 Responsive grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

            <input
              type="text"
              placeholder="Search location..."
              className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select className="border rounded-full px-4 py-2 focus:outline-none">
              <option>Room Type</option>
              <option>Single</option>
              <option>Double</option>
            </select>

            <input
              type="range"
              min="2000"
              max="20000"
              className="w-full"
            />

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Search
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default SearchCard;