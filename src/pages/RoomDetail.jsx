import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { getRoomById, getRooms } from "../api/roomService";

function RoomDetail() {

  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [nearbyRooms, setNearbyRooms] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoggedIn] = useState(false);

  /* ================= FETCH ROOM ================= */

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const res = await getRoomById(id);
      const roomData = res.data.room || res.data;

      setRoom(roomData);

      // Also fetch nearby rooms
      const listRes = await getRooms(1);
      const listData = listRes.data.rooms || [];

      const filteredNearby = listData
        .filter((r) => r._id !== id)
        .slice(0, 3);

      setNearbyRooms(filteredNearby);

    } catch (err) {
      console.error(err);
      setRoom(null);
    }
  };

  if (!room) return <div className="p-10">Room not found</div>;

  /* ================= SAFE VALUES ================= */

  const images = room.images?.length
    ? room.images.map((img) => `http://localhost:5000${img}`)
    : ["https://via.placeholder.com/800x400"];

  const lat = room.location?.coordinates?.[1] || 28.6139;
  const lng = room.location?.coordinates?.[0] || 77.2090;

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-4 py-10 pb-32">

          {/* IMAGE SLIDER */}
          <div className="relative">
            <img
              src={images[currentImage]}
              alt="Room"
              className="w-full h-[420px] object-cover rounded-3xl shadow-xl"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full shadow hover:scale-110 transition"
            >
              ⬅
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 px-3 py-2 rounded-full shadow hover:scale-110 transition"
            >
              ➡
            </button>
          </div>

          {/* BASIC INFO */}
          <div className="mt-8 bg-white rounded-3xl p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800">
              {room.title}
            </h1>

            <p className="text-gray-500 mt-2">
              📍 {room.city || "Location not available"}
            </p>

            <p className="text-2xl font-semibold text-blue-600 mt-4">
              ₹{room.price} / month
            </p>

            <div className="flex items-center gap-2 mt-4">
              <span className="text-yellow-400 text-lg">★★★★★</span>
              <span className="text-gray-600 text-sm">
                4.5 / 5
              </span>
            </div>
          </div>

          {/* OWNER SECTION */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              👤 Owner Information
            </h2>

            {isLoggedIn ? (
              <>
                <p><strong>Name:</strong> {room.owner?.name}</p>
              </>
            ) : (
              <>
                <p>Login to unlock owner contact details.</p>
                <button className="mt-4 bg-white text-blue-600 px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
                  🔒 Login to Unlock
                </button>
              </>
            )}
          </div>

          {/* MAP */}
          <div className="mt-10 bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              📍 Location Preview
            </h2>

            <iframe
              title="map"
              className="w-full h-80 rounded-2xl"
              src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
            />
          </div>

          {/* NEARBY ROOMS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              🏠 Nearby Rooms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nearbyRooms.map((nearRoom) => (
                <div
                  key={nearRoom._id}
                  className="bg-white rounded-2xl shadow p-4"
                >
                  <img
                    src={
                      nearRoom.images?.length
                        ? `http://localhost:5000${nearRoom.images[0]}`
                        : "https://via.placeholder.com/300"
                    }
                    alt=""
                    className="h-40 w-full object-cover rounded-xl"
                  />
                  <h3 className="mt-3 font-semibold">
                    {nearRoom.title}
                  </h3>
                  <p className="text-blue-600 font-medium">
                    ₹{nearRoom.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* STICKY BOOKING BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

          <div>
            <p className="text-lg font-semibold text-blue-600">
              ₹{room.price} / month
            </p>
            <p className="text-xs text-gray-500">
              Fully Furnished • Ready to Move
            </p>
          </div>

          <div className="flex gap-3">
            <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition">
              💬 Chat
            </button>

            <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow hover:scale-105 transition">
              📞 Contact
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default RoomDetail;