import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import SearchCard from "../components/SearchCard";
import RoomCard from "../components/RoomCard";
import rooms from "../data/rooms";

function Home() {

  // 🔹 State to store currently visible rooms
  const [visibleRooms, setVisibleRooms] = useState([]);

  // 🔹 Number of rooms to load per batch
  const roomsPerLoad = 6;

  // 🔹 Current index pointer
  const [nextIndex, setNextIndex] = useState(0);

  // 🔹 Ref for observer target (bottom trigger)
  const loaderRef = useRef(null);


  // 🔹 Load initial rooms on first render
  useEffect(() => {
    loadMoreRooms();
  }, []);


  // 🔹 Function to load more rooms
  const loadMoreRooms = () => {
    const newRooms = rooms.slice(nextIndex, nextIndex + roomsPerLoad);

    setVisibleRooms((prev) => [...prev, ...newRooms]);
    setNextIndex((prev) => prev + roomsPerLoad);
  };


  // 🔹 Infinite Scroll Logic using IntersectionObserver
  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreRooms();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };

  }, [nextIndex]);


  return (
    <>
      <Navbar />

      {/* 🔹 Hero Search Section */}
      <SearchCard />

      {/* 🔹 Main Content Wrapper */}
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-10">

          {/* 🔹 Premium Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {visibleRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}

          </div>

          {/* 🔹 Invisible Loader Trigger for Infinite Scroll */}
          <div ref={loaderRef} className="h-20 flex justify-center items-center">
            <p className="text-gray-400 text-sm">
              Loading more rooms...
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Home;