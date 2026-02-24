import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import rooms from "../data/rooms";

function Home() {

  /* ================= SMART FILTER STATES ================= */

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  /* ================= INFINITE SCROLL STATE ================= */

  const [visibleCount, setVisibleCount] = useState(6);

  // 🔹 Ref for last element (observer target)
  const loadMoreRef = useRef(null);

  /* ================= FILTER LOGIC ================= */

  const filteredRooms = rooms.filter((room) =>
    room.location.toLowerCase().includes(search.toLowerCase()) &&
    room.price <= maxPrice
  );

  const visibleRooms = filteredRooms.slice(0, visibleCount);

  /* ================= INTERSECTION OBSERVER ================= */

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        // 🔹 If last element visible → load more
        if (entry.isIntersecting) {
          setVisibleCount((prev) => prev + 3);
        }
      },
      {
        threshold: 1,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [filteredRooms]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

        {/* ================= HERO ================= */}

        <div className="max-w-6xl mx-auto px-4 pt-12 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Find Your Perfect Room
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Smart search • Verified listings • No brokerage
          </p>
        </div>

        {/* ================= SMART FILTER ================= */}

        <div className="sticky top-16 z-40 bg-white/70 backdrop-blur-md shadow-md py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">

            <input
              type="text"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex items-center gap-3 w-full md:w-72">
              <span className="text-sm text-gray-600">₹0</span>
              <input
                type="range"
                min="1000"
                max="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="flex-1"
              />
              <span className="text-sm font-semibold text-blue-600">
                ₹{maxPrice}
              </span>
            </div>

          </div>
        </div>

        {/* ================= ROOM GRID ================= */}

        <div className="max-w-6xl mx-auto px-4 mt-10 pb-20">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

          {/* 🔹 Invisible div to detect scroll end */}
          {visibleCount < filteredRooms.length && (
            <div ref={loadMoreRef} className="h-10 flex items-center justify-center mt-8">
              <p className="text-gray-400">Loading more rooms...</p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Home;