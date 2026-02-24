import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import RoomCard from "../components/RoomCard";
import rooms from "../data/rooms";

function Home() {

  /* ================= CATEGORY STATE ================= */

  // 🔹 Controls Hotel / Room / Partner filtering
  const [category, setCategory] = useState("all");

  /* ================= SMART FILTER STATES ================= */

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(10000);

  /* ================= INFINITE SCROLL STATE ================= */

  const [visibleCount, setVisibleCount] = useState(6);

  // 🔹 Ref for intersection observer
  const loadMoreRef = useRef(null);

  /* ================= FILTER LOGIC ================= */

  const filteredRooms = rooms.filter((room) => {

    const matchSearch =
      room.location.toLowerCase().includes(search.toLowerCase());

    const matchPrice =
      room.price <= maxPrice;

    const matchCategory =
      category === "all" ? true : room.category === category;

    return matchSearch && matchPrice && matchCategory;
  });

  // 🔹 Only show limited rooms based on scroll
  const visibleRooms = filteredRooms.slice(0, visibleCount);

  /* ================= RESET WHEN FILTER CHANGES ================= */

  useEffect(() => {
    // 🔹 Reset infinite scroll when filter/search/category changes
    setVisibleCount(6);

    // 🔹 Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  }, [search, maxPrice, category]);

  /* ================= INTERSECTION OBSERVER ================= */

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {

          // 🔹 Prevent overflow
          setVisibleCount((prev) =>
            prev + 3 > filteredRooms.length
              ? filteredRooms.length
              : prev + 3
          );
        }
      },
      { threshold: 1 }
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
      {/* 🔹 Pass category + setter to navbar */}
      <Navbar
        setCategory={setCategory}
        activeCategory={category}
      />

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

        {/* ================= SMART FILTER BAR ================= */}

        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md shadow-md py-4">

          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center">

            {/* 🔹 Location Search */}
            <input
              type="text"
              placeholder="Search location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* 🔹 Price Slider */}
            <div className="flex items-center gap-3 w-full md:w-72">
              <span className="text-sm text-gray-600">₹0</span>

              <input
                type="range"
                min="1000"
                max="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
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

          {/* 🔹 Result count */}
          <p className="mb-6 text-gray-500">
            {filteredRooms.length} rooms found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

          {/* 🔹 Infinite Scroll Trigger */}
          {visibleCount < filteredRooms.length && (
            <div
              ref={loadMoreRef}
              className="h-16 flex items-center justify-center mt-8"
            >
              <p className="text-gray-400 animate-pulse">
                Loading more rooms...
              </p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default Home;